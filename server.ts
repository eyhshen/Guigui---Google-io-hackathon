import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";

dotenv.config({ path: ".env.local", override: true });
dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  keyIngredients: string[];
  paoMonths: number;
  openedDate: string;
  expiryDate: string;
  bottle: {
    shape: string;
    colorHex: string;
  };
  status: "active" | "expiring" | "expired";
};

type SkinProfile = {
  skinType: "dry" | "oily" | "combination" | "normal" | null;
  sensitivities: string[];
  currentActives: string[];
  city: string;
};

const categoryPriority = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];

function mockVerdict(profile: SkinProfile, inventory: Product[], condition: string) {
  const lowerCondition = condition.toLowerCase();
  const recommended = new Set<string>();
  const avoid = new Set<string>();

  const sunscreen = inventory.find((product) => product.category === "Sunscreen");
  const moisturizer = inventory.find((product) => product.category === "Moisturizer");
  const toner = inventory.find((product) => product.category === "Toner");
  const cleanser = inventory.find((product) => product.category === "Cleanser");
  const serums = inventory.filter((product) => product.category === "Serum");

  if (lowerCondition.includes("热") || lowerCondition.includes("油") || lowerCondition.includes("晒")) {
    if (cleanser) recommended.add(cleanser.id);
    if (sunscreen) recommended.add(sunscreen.id);
    serums.slice(1).forEach((product) => avoid.add(product.id));
  } else if (lowerCondition.includes("敏感") || lowerCondition.includes("红") || lowerCondition.includes("紧绷")) {
    if (moisturizer) recommended.add(moisturizer.id);
    if (toner) recommended.add(toner.id);
    const fragranceSensitive = profile.sensitivities.some((item) => item.toLowerCase().includes("fragrance") || item.includes("香精"));
    if (fragranceSensitive) {
      serums.slice(1).forEach((product) => avoid.add(product.id));
    }
  } else {
    if (cleanser) recommended.add(cleanser.id);
    if (moisturizer) recommended.add(moisturizer.id);
    if (sunscreen) recommended.add(sunscreen.id);
  }

  if (recommended.size === 0) {
    inventory
      .slice()
      .sort((left, right) => categoryPriority.indexOf(left.category) - categoryPriority.indexOf(right.category))
      .slice(0, 2)
      .forEach((product) => recommended.add(product.id));
  }

  return {
    recommendedIds: Array.from(recommended),
    avoidIds: Array.from(avoid),
    reason: "当前为本地 mock AI 建议，用于无 key 状态下测试交互。建议优先使用温和、保湿和日间防护类产品；补充真实 Gemini key 后可获得更细的个性化分析。",
  };
}

function mockTravel(profile: SkinProfile, inventory: Product[], destination: string, days: number) {
  const selectedIds = categoryPriority
    .map((category) => inventory.find((product) => product.category === category))
    .filter((product): product is Product => Boolean(product))
    .slice(0, 5)
    .map((product) => product.id);

  return {
    selectedIds,
    reason: `当前为本地 mock travel 建议，用于无 key 状态下测试。已按 ${days} 天出行优先保留清洁、保湿、防晒和一到两个精华类产品；补上真实 Gemini key 后会再结合目的地 ${destination} 输出更细的说明。`,
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  // --- API Routes ---

  app.post("/api/scan", async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API 未配置。请在 .env.local 设置 GEMINI_API_KEY 后再测试真实扫描。",
        });
      }

      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing imageBase64" });
      }

      // Strip the data URL prefix if present
      const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Analyze this skincare product image. Extract its details and return a JSON object strictly matching this schema. 
                - paoMonths: Look for the PAO (Period After Opening) symbol (e.g., "12M", "6M"). If found, extract the number. If not found, guess based on product category (e.g., serums typically 6-12, creams 12, cleansers 12).
                - shape: Classify the container shape into one of: 'pump', 'tube', 'jar', 'dropper', 'spray', 'stick', 'bottle'.
                - colorHex: Identify the dominant color of the packaging (excluding white/black if there's a distinct color) as a hex code.
                - category: e.g., 'Toner', 'Serum', 'Moisturizer', 'Cleanser', 'Sunscreen'.
                
                Respond ONLY with valid JSON.`
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              brand: { type: Type.STRING },
              category: { type: Type.STRING },
              keyIngredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Key active ingredients (max 6)"
              },
              paoMonths: { type: Type.INTEGER },
              bottle: {
                type: Type.OBJECT,
                properties: {
                  shape: { type: Type.STRING, enum: ['pump', 'tube', 'jar', 'dropper', 'spray', 'stick', 'bottle'] },
                  colorHex: { type: Type.STRING }
                },
                required: ["shape", "colorHex"]
              }
            },
            required: ["name", "brand", "category", "keyIngredients", "paoMonths", "bottle"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("No response from Gemini");
      
      const result = JSON.parse(resultText);
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/scan:", error);
      res.status(500).json({ error: error.message || "Failed to scan product" });
    }
  });

  app.post("/api/verdict", async (req, res) => {
    const { profile, inventory, condition } = req.body;
    try {
      if (!ai) {
        return res.json(mockVerdict(profile, inventory, condition));
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `Profile: ${JSON.stringify(profile)}
            Inventory: ${JSON.stringify(inventory)}
            Condition today: "${condition}"
            
            Return a JSON object with 'recommendedIds' (array of product IDs to use), 'avoidIds' (array of product IDs to NOT use), and 'reason' (a 1-2 sentence explanation in Chinese).` }]
          }
        ],
        config: {
          systemInstruction: `You are 'GuiGui', an expert skincare assistant. 
            RULES:
            - Provide advice based ONLY on the user's provided self-reported skin profile, current inventory, and stated condition.
            - DO NOT provide medical advice. If the condition sounds severe (pain, pus, severe redness, allergic reaction) or mentions prescription drugs, MUST output a disclaimer: "这个情况建议咨询皮肤科专业人士" and decline product advice.
            - Phrase advice safely: "通常不建议叠用", "可能不适合你自述的敏感状况", "建议错开早晚使用".
            - DO NOT use words like "会导致", "治疗", "安全/不安全".
            - Recommend products from their inventory to use, and products to avoid.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedIds: { type: Type.ARRAY, items: { type: Type.STRING } },
              avoidIds: { type: Type.ARRAY, items: { type: Type.STRING } },
              reason: { type: Type.STRING }
            },
            required: ["recommendedIds", "avoidIds", "reason"]
          }
        }
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Error in /api/verdict:", error);
      res.status(500).json({ error: error.message || "Failed to get verdict" });
    }
  });

  app.post("/api/travel", async (req, res) => {
    const { profile, inventory, destination, days } = req.body;
    try {
      if (!ai) {
        return res.json(mockTravel(profile, inventory, destination, days));
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `Profile: ${JSON.stringify(profile)}
            Inventory: ${JSON.stringify(inventory)}
            Destination: ${destination}
            Duration: ${days} days
            
            Determine the likely climate for the destination right now (assume current month). 
            Based on the climate and user profile, select the essential products from their inventory for this trip.
            Keep the list minimal but complete (cleanser, moisturizer, SPF, plus 1-2 treatments).
            Return JSON: 'selectedIds' (array of product IDs), 'reason' (explanation in Chinese mentioning the climate and why these were picked).` }]
          }
        ],
        config: {
          systemInstruction: `You are 'GuiGui', a skincare packing assistant.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              selectedIds: { type: Type.ARRAY, items: { type: Type.STRING } },
              reason: { type: Type.STRING }
            },
            required: ["selectedIds", "reason"]
          }
        }
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Error in /api/travel:", error);
      res.status(500).json({ error: error.message || "Failed to get travel list" });
    }
  });

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
