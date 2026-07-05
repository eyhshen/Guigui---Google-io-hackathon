import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  // --- API Routes ---

  app.post("/api/scan", async (req, res) => {
    try {
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
    try {
      const { profile, inventory, condition } = req.body;

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
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/travel", async (req, res) => {
    try {
      const { profile, inventory, destination, days } = req.body;

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
      res.status(500).json({ error: error.message });
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
