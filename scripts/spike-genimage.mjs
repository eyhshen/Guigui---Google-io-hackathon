// Spike: generate ONE product image in the EltaMD cartoon style, transparent bg.
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: ".env.local", override: true });
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const STYLE_REF = "/Users/elainesyh/.claude/image-cache/a06549b9-70d8-4e08-ba4b-3e79c2dcd26b/3.png";
const OUT = "/private/tmp/claude-501/-Users-elainesyh-Documents-GitHub-Guigui---Google-io-hackathon/a06549b9-70d8-4e08-ba4b-3e79c2dcd26b/scratchpad";

const hasStyle = fs.existsSync(STYLE_REF);
const styleB64 = hasStyle ? fs.readFileSync(STYLE_REF).toString("base64") : null;
console.log(hasStyle ? "style ref: loaded" : "style ref: MISSING (text-only style)");

const product = {
  brand: "CeraVe",
  name: "Moisturizing Lotion",
  desc: "A tall white plastic pump bottle with a white pump dispenser. Oval front label, white background, dark navy-blue text. 'CeraVe' wordmark in blue, 'Moisturizing Lotion' below, 'Developed with dermatologists' tagline, small MVE technology graphic. Clean clinical drugstore look.",
};

const styleDesc = hasStyle
  ? `Look at the attached reference image. It is a soft hand-painted gouache/watercolor cartoon ILLUSTRATION of a skincare bottle on a fully transparent background. Study its art style: gentle soft shading, subtle gradients, clean rounded silhouette, faithfully hand-lettered label text, matte finish, no harsh outlines, no photographic realism.\n\nNow create a NEW illustration, in that EXACT same art style, of this real product:`
  : `Create a soft hand-painted gouache/watercolor cartoon ILLUSTRATION (gentle soft shading, subtle gradients, clean rounded silhouette, faithfully hand-lettered label text, matte finish, no harsh outlines, NOT photographic) of this real product:`;

const prompt = `${styleDesc}
Brand: ${product.brand}
Product: ${product.name}
Appearance: ${product.desc}

Requirements:
- Match the real ${product.brand} ${product.name} packaging at ~80% accuracy (correct bottle silhouette, cap/pump type, real brand colors, readable brand name on the label). It does not need every fine detail.
- Same soft gouache cartoon style as the reference.
- FULLY TRANSPARENT background (alpha channel). No background color, no drop shadow, no ground plane, no reflection.
- Single product, centered, upright, entire product visible with a little margin.
- Output a PNG image.`;

const MODEL = process.argv[2] || "gemini-3.1-flash-image";
console.log("Using model:", MODEL);
const parts0 = [{ text: prompt }];
if (styleB64) parts0.push({ inlineData: { mimeType: "image/png", data: styleB64 } });
const res = await ai.models.generateContent({
  model: MODEL,
  contents: [{ role: "user", parts: parts0 }],
  config: { responseModalities: ["IMAGE"] },
});

const parts = res?.candidates?.[0]?.content?.parts || [];
console.log("parts:", parts.map(p => p.inlineData ? `IMAGE(${p.inlineData.mimeType})` : `TEXT(${(p.text||"").slice(0,80)})`).join(" | "));
const img = parts.find(p => p.inlineData);
if (!img) { console.error("NO IMAGE RETURNED"); process.exit(1); }

const buf = Buffer.from(img.inlineData.data, "base64");
const mime = img.inlineData.mimeType || "image/png";
const ext = mime.includes("png") ? "png" : mime.includes("jpeg") ? "jpg" : "bin";
const outfile = path.join(OUT, `spike-cerave.${ext}`);
fs.writeFileSync(outfile, buf);

const isPng = buf[0] === 0x89 && buf[1] === 0x50;
const colorType = isPng ? buf[25] : null;
console.log(`saved: ${outfile} (${buf.length} bytes), mime=${mime}` +
  (isPng ? `, PNG colorType=${colorType} (${colorType === 6 ? "RGBA/has-alpha" : colorType === 4 ? "GrayA" : "NO-alpha"})` : `, NOT PNG -> no transparency possible`));
