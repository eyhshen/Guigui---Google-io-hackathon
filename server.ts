import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

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
  concerns: string[];
  safetyFlags: string[];
};

const categoryPriority = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];

// Fixed enum agreed with the design partner — front-end onboarding must only ever write these values.
const NO_SAFETY_FLAG = "以上都没有";
const STRONG_ACTIVE_KEYWORDS = [
  "水杨酸", "果酸", "杏仁酸", "乳酸", "甘醇酸", "复合酸",
  "视黄醇", "维A醇", "A醇", "维A酸",
  "维生素C", "左旋C", "维C",
];

function getProfileQualityNote(profile: SkinProfile) {
  const missingFields = [
    profile.skinType ? null : "肤质",
    profile.sensitivities.length > 0 ? null : "敏感成分",
  ].filter(Boolean);

  return missingFields.length > 0
    ? `由于还缺少${missingFields.join("和")}，本次建议会更保守。`
    : "已结合你的肤质和敏感项做取舍。";
}

function hasSafetyTrigger(profile: SkinProfile): boolean {
  return profile.safetyFlags.some((flag) => flag.trim().length > 0 && flag !== NO_SAFETY_FLAG);
}

function isStrongActiveProduct(product: Product): boolean {
  return product.keyIngredients.some((ingredient) =>
    STRONG_ACTIVE_KEYWORDS.some((keyword) => ingredient.includes(keyword))
  );
}

function getConcernsNote(profile: SkinProfile): string {
  return profile.concerns.length > 0 ? `长期困扰：${profile.concerns.join("、")}。` : "";
}

const SAFETY_REFERRAL_NOTE = "检测到安全项，建议先咨询皮肤科医生，已为你避开强效成分。";

function mockVerdict(profile: SkinProfile, inventory: Product[], condition: string) {
  if (inventory.length === 0) {
    return {
      recommendedIds: [],
      avoidIds: [],
      reason: "你的柜子还没有产品。GuiGui 的 AI 建议只会围绕已添加产品做取舍，请先扫码添加产品。",
    };
  }

  const lowerCondition = condition.toLowerCase();
  const recommended = new Set<string>();
  const avoid = new Set<string>();
  const profileQualityNote = getProfileQualityNote(profile);

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

  const safetyTriggered = hasSafetyTrigger(profile);
  if (safetyTriggered) {
    inventory
      .filter((product) => isStrongActiveProduct(product))
      .forEach((product) => {
        recommended.delete(product.id);
        avoid.add(product.id);
      });
  }

  const safetyNote = safetyTriggered ? `${SAFETY_REFERRAL_NOTE} ` : "";
  const concernsNote = getConcernsNote(profile);

  return {
    recommendedIds: Array.from(recommended),
    avoidIds: Array.from(avoid),
    reason: `${safetyNote}当前为本地 mock AI 建议，用于无 key 状态下测试交互。${concernsNote}${profileQualityNote} 建议只从你的柜子里选择温和、保湿和日间防护类产品；补充真实 Gemini key 后可获得更细的个性化分析。`,
  };
}

function mockTravel(profile: SkinProfile, inventory: Product[], destination: string, days: number) {
  if (inventory.length === 0) {
    return {
      selectedIds: [],
      reason: "你的柜子还没有产品。出行收纳会从已拥有的产品里生成清单，请先扫码添加至少 1 件产品。",
    };
  }

  const safetyTriggered = hasSafetyTrigger(profile);
  const eligibleInventory = safetyTriggered
    ? inventory.filter((product) => !isStrongActiveProduct(product))
    : inventory;

  const selectedIds = categoryPriority
    .map((category) => eligibleInventory.find((product) => product.category === category))
    .filter((product): product is Product => Boolean(product))
    .slice(0, 5)
    .map((product) => product.id);

  const safetyNote = safetyTriggered ? `${SAFETY_REFERRAL_NOTE} ` : "";
  const concernsNote = getConcernsNote(profile);

  return {
    selectedIds,
    reason: `${safetyNote}当前为本地 mock travel 建议，用于无 key 状态下测试。${concernsNote}${getProfileQualityNote(profile)} 已按 ${days} 天前往 ${destination} 的出行场景，只从你已拥有的产品里优先保留清洁、保湿、防晒和一到两个精华类产品。`,
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
      if (!Array.isArray(inventory) || inventory.length === 0) {
        return res.json(mockVerdict(profile, [], condition || ""));
      }

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
            Long-term concerns (profile.concerns): ${JSON.stringify(profile.concerns || [])}
            Safety flags (profile.safetyFlags): ${JSON.stringify(profile.safetyFlags || [])}

            Return a JSON object with 'recommendedIds' (array of product IDs to use), 'avoidIds' (array of product IDs to NOT use), and 'reason' (a 1-2 sentence explanation in Chinese).
            If inventory is empty, return empty arrays and explain that GuiGui needs cabinet products before giving inventory-aware advice.
            If profile.skinType or profile.sensitivities is missing, mention that the recommendation is more conservative until those fields are completed.
            Treat profile.concerns as long-term skin concerns context, and weight recommendations toward inventory items that address them.
            If profile.safetyFlags contains any value other than "以上都没有", treat this as a hard safety gate: move any product whose keyIngredients suggest a strong active (酸类去角质成分、视黄醇/维A醇/维A酸、高浓度维生素C) out of recommendedIds and into avoidIds, and start 'reason' with "检测到安全项，建议先咨询皮肤科医生，已为你避开强效成分。"` }]
          }
        ],
        config: {
          systemInstruction: `You are 'GuiGui', an expert skincare assistant.
            RULES:
            - Provide advice based ONLY on the user's provided self-reported skin profile, current inventory, and stated condition.
            - GuiGui is cabinet-first: do not answer as a general skincare chatbot and do not recommend products that are not in Inventory.
            - If Inventory has fewer than 3 items, acknowledge that the advice is limited by the small cabinet.
            - DO NOT provide medical advice. If the condition sounds severe (pain, pus, severe redness, allergic reaction) or mentions prescription drugs, MUST output a disclaimer: "这个情况建议咨询皮肤科专业人士" and decline product advice.
            - If profile.safetyFlags contains any value other than "以上都没有" (pregnancy/nursing, seeing a dermatologist or on prescription medication, severe acne/broken skin/infection), this is a HARD safety gate: you MUST exclude strong actives (chemical exfoliating acids, retinol/retinoid, high-strength vitamin C) from recommendedIds and place them in avoidIds instead, and the reason MUST begin with "检测到安全项，建议先咨询皮肤科医生，已为你避开强效成分。" This overrides all other recommendation logic.
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
      res.json(mockVerdict(profile, inventory || [], condition || ""));
    }
  });

  app.post("/api/travel", async (req, res) => {
    const { profile, inventory, destination, days } = req.body;
    try {
      if (!Array.isArray(inventory) || inventory.length === 0) {
        return res.json(mockTravel(profile, [], destination || "", Number(days) || 0));
      }

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
            Long-term concerns (profile.concerns): ${JSON.stringify(profile.concerns || [])}
            Safety flags (profile.safetyFlags): ${JSON.stringify(profile.safetyFlags || [])}

            Determine the likely climate for the destination right now (assume current month).
            Based on the climate and user profile, select the essential products from their inventory for this trip. Never recommend products outside Inventory.
            Keep the list minimal but complete (cleanser, moisturizer, SPF, plus 1-2 treatments).
            Treat profile.concerns as long-term skin concerns context and prefer inventory items that address them (e.g. soothing/repair items for redness).
            If profile.safetyFlags contains any value other than "以上都没有", this is a hard safety gate: exclude any product whose keyIngredients suggest a strong active (chemical exfoliating acids, retinol/retinoid, high-strength vitamin C) from selectedIds, and start 'reason' with "检测到安全项，建议先咨询皮肤科医生，已为你避开强效成分。"
            Return JSON: 'selectedIds' (array of product IDs), 'reason' (explanation in Chinese mentioning the climate, cabinet constraint, and why these owned products were picked).
            If inventory is empty, return an empty selectedIds array and explain that the user needs to add products first.
            If profile.skinType or profile.sensitivities is missing, mention that profile completion will improve packing confidence.` }]
          }
        ],
        config: {
          systemInstruction: `You are 'GuiGui', a cabinet-first skincare packing assistant. Select only owned products from Inventory and keep advice concise, practical, and non-medical. If profile.safetyFlags contains any value other than "以上都没有", you MUST exclude strong actives (chemical exfoliating acids, retinol/retinoid, high-strength vitamin C) from selectedIds and start 'reason' with "检测到安全项，建议先咨询皮肤科医生，已为你避开强效成分。" This overrides all other packing logic.`,
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
      res.json(mockTravel(profile, inventory || [], destination || "", Number(days) || 0));
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
