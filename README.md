# 柜柜 GuiGui

会看的护肤柜。打开相机扫一遍护肤柜，AI 识别产品、记录 PAO 开封后保质期，并在新品裁决、今日肤况、旅行打包这些时刻，从你已经拥有的产品里给出建议。

This is a Google AI Studio / Google I/O hackathon MVP built with React, Vite, Express, and Gemini.

## What It Does

- Scan skincare products with Gemini multimodal recognition.
- Extract product name, brand, category, key ingredients, PAO months, and bottle shape/color.
- Build a digital shelf with expiry badges.
- Ask what to use or avoid for a self-reported skin condition.
- Generate a lightweight travel packing list from products already on the shelf.

GuiGui provides organization and skincare routine suggestions based on self-reported information. It is not medical advice.

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from the example and add your Gemini API key:

   ```bash
   cp .env.example .env.local
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

The local server runs at [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Environment

Do not commit `.env.local`.

```bash
GEMINI_API_KEY="your Gemini API key"
```
