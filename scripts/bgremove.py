#!/usr/bin/env python
"""Read an image from stdin, cut out the background (rembg u2net),
autocrop to content + pad, cap height, write a transparent PNG to stdout.
Used by the server's /api/product-image endpoint for scanned products."""
import sys, io
from rembg import remove, new_session
from PIL import Image

def main():
    data = sys.stdin.buffer.read()
    img = Image.open(io.BytesIO(data)).convert("RGBA")
    cut = remove(img, session=new_session("u2net"))
    bbox = cut.getchannel("A").getbbox()
    if bbox:
        cut = cut.crop(bbox)
    pad = int(max(cut.size) * 0.06)
    canvas = Image.new("RGBA", (cut.size[0] + 2 * pad, cut.size[1] + 2 * pad), (0, 0, 0, 0))
    canvas.paste(cut, (pad, pad), cut)
    if canvas.size[1] > 640:
        w = round(canvas.size[0] * 640 / canvas.size[1])
        canvas = canvas.resize((w, 640), Image.LANCZOS)
    buf = io.BytesIO()
    canvas.save(buf, "PNG", optimize=True)
    sys.stdout.buffer.write(buf.getvalue())

if __name__ == "__main__":
    main()
