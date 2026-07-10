#!/usr/bin/env python
"""Generate transparent cartoon product images for all Shelfie products.

Pipeline per product: Gemini image gen (gouache-cartoon style, on white)
-> rembg background cutout -> autocrop to content + pad -> save public/products/<id>.png
"""
import io, os, sys, time
from concurrent.futures import ThreadPoolExecutor
from google import genai
from google.genai import types
from PIL import Image
from rembg import remove, new_session

API_KEY = os.environ["GEMINI_API_KEY"]
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "products")
MODEL = "gemini-3.1-flash-image"
client = genai.Client(api_key=API_KEY)
_rembg = new_session("u2net")

STYLE = ("a soft hand-painted gouache / watercolor cartoon ILLUSTRATION — gentle soft shading, "
         "subtle smooth gradients, clean rounded silhouette, faithfully hand-lettered readable label "
         "text, matte finish, no harsh black outlines, NOT a photograph")

# id -> real-product appearance description (these are all globally famous products)
PRODUCTS = {
    "1": "Estée Lauder Advanced Night Repair serum: an iconic small dark amber-brown translucent glass bottle, taller than wide, with a brown dropper-pump cap and a slim silver/gold accent ring. Minimal label reads 'ESTÉE LAUDER' and 'Advanced Night Repair' in fine text. Deep amber-brown glass.",
    "2": "Biologique Recherche Lotion P50: a plain opaque off-white / cream cylindrical plastic bottle with a small matching flip cap. Austere French-pharmacy label: white background, black typewriter-style text 'BIOLOGIQUE RECHERCHE' with a large 'P50', a thin red/orange border stripe. Minimalist apothecary look.",
    "3": "CeraVe Moisturizing Lotion: a tall white plastic pump bottle with a white pump dispenser. Oval front label, white with dark navy-blue text: 'CeraVe' wordmark, 'Moisturizing Lotion', 'Developed with dermatologists', a small round MVE technology badge, and a diagonal navy panel on the right. Clean clinical drugstore look.",
    "4": "Drunk Elephant B-Hydra Intensive Hydration Serum: a short squat cylindrical airless pump bottle with a flat pump top. White / translucent body with a bright turquoise-teal cap and turquoise accents. Playful colorful lowercase typography 'drunk elephant' and 'B-Hydra'. Modern, cute-clinical.",
    "5": "Supergoop! Unseen Sunscreen SPF 40: a soft squeeze tube, frosted white / off-white body with a bright yellow-gold cap, and the Supergoop sunburst star logo. Text 'supergoop!' and 'unseen sunscreen SPF 40'. Clean and sunny.",
    "6": "innisfree Green Tea Seed Serum: a frosted translucent fresh-green pump bottle with a pump dispenser. Minimalist lowercase 'innisfree' logo and 'Green Tea Seed Serum'. Natural, fresh Korean-skincare look.",
    "cur-1": "SKIN1004 Madagascar Centella Ampoule: a clear glass dropper bottle with a beige/tan dropper cap, pale liquid visible. Minimalist beige-and-white label 'SKIN1004' and 'Centella Ampoule' with a subtle green leaf accent. Calm and dermatological.",
    "cur-2": "Anua Heartleaf cleansing foam: a soft squeeze tube, off-white / cream body with dark green and black minimalist text 'Anua' and 'Heartleaf', a small heartleaf plant motif. Clean Korean-skincare aesthetic.",
    "cur-3": "innbeauty project vitamin C serum: a small dropper bottle with a bright coral-orange color theme and playful bubbly rounded lowercase typography 'innbeauty project'. Fun, youthful, colorful modern skincare.",
    "cur-4": "Anua Heartleaf 77% Soothing Toner (the iconic Korean toner): a tall clear/white plastic bottle with a white flip cap, faint mint-green tint, minimalist label 'Anua' and 'Heartleaf 77% Soothing Toner' with a small heartleaf motif. Fresh and soothing.",
    "cur-5": "Beauty of Joseon Relief Sun rice + probiotics sunscreen: a soft squeeze tube with an elegant cream/beige body and refined serif 'Beauty of Joseon' branding in gold/black, traditional Korean hanji-inspired minimal design. Premium, understated beige.",
}

def prompt_for(desc):
    return (f"Create {STYLE}.\n\nSubject — this real skincare product, rendered at about 85% accuracy "
            f"(correct bottle silhouette, correct cap/pump type, real brand colours, and a readable brand "
            f"name on the label):\n{desc}\n\nComposition: a SINGLE upright product, centered, the entire "
            f"product visible with a little margin, on a plain PURE WHITE background. No other objects, no "
            f"caption text, no ground shadow. Soft even lighting. Output one clean product illustration.")

def generate_jpeg(desc):
    cfg_variants = [
        types.GenerateContentConfig(response_modalities=["IMAGE"], image_config=types.ImageConfig(aspect_ratio="3:4")),
        types.GenerateContentConfig(response_modalities=["IMAGE"]),
    ]
    last = None
    for cfg in cfg_variants:
        for attempt in range(3):
            try:
                r = client.models.generate_content(model=MODEL, contents=prompt_for(desc), config=cfg)
                for p in r.candidates[0].content.parts:
                    if getattr(p, "inline_data", None) and p.inline_data.data:
                        return p.inline_data.data
                last = "no image part"
            except Exception as e:
                last = str(e)
                if "429" in last or "RESOURCE_EXHAUSTED" in last:
                    time.sleep(8 * (attempt + 1))
                else:
                    break
    raise RuntimeError(f"generation failed: {last}")

def cut_and_crop(jpeg_bytes, target_h=640, pad_frac=0.06):
    img = Image.open(io.BytesIO(jpeg_bytes)).convert("RGBA")
    cut = remove(img, session=_rembg)               # RGBA with alpha matte
    bbox = cut.getchannel("A").getbbox()
    if bbox:
        cut = cut.crop(bbox)
    pad = int(max(cut.size) * pad_frac)
    canvas = Image.new("RGBA", (cut.size[0] + 2 * pad, cut.size[1] + 2 * pad), (0, 0, 0, 0))
    canvas.paste(cut, (pad, pad), cut)
    if canvas.size[1] > target_h:
        w = round(canvas.size[0] * target_h / canvas.size[1])
        canvas = canvas.resize((w, target_h), Image.LANCZOS)
    return canvas

def one(item):
    pid, desc = item
    try:
        jpeg = generate_jpeg(desc)
        png = cut_and_crop(jpeg)
        out = os.path.join(OUT_DIR, f"{pid}.png")
        png.save(out, "PNG", optimize=True)
        a = png.getchannel("A"); px = a.getdata(); n = len(px)
        transp = sum(1 for v in px if v < 8) * 100 // n
        return pid, f"OK {png.size[0]}x{png.size[1]} transp={transp}% {os.path.getsize(out)//1024}KB"
    except Exception as e:
        return pid, f"FAIL {e}"

def main():
    only = sys.argv[1:] or list(PRODUCTS.keys())
    items = [(k, PRODUCTS[k]) for k in only]
    print(f"Generating {len(items)} products -> {os.path.abspath(OUT_DIR)}")
    # generate concurrently (API is I/O bound); rembg runs inside each and is fine at low concurrency
    with ThreadPoolExecutor(max_workers=4) as ex:
        for pid, msg in ex.map(one, items):
            print(f"  [{pid}] {msg}")

if __name__ == "__main__":
    main()
