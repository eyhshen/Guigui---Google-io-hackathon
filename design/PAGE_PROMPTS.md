# 夜虹 / Night Prism — Page Generation Prompts

> **How to use:** first paste `DESIGN_SYSTEM.md` into Claude design so the system
> exists. Then paste any block below to generate that screen *in* the system.
> Each block is standalone. Behavior contracts from Batch 1 are baked in — do not
> generate anything that violates them (see `BEHAVIOR_CONTRACTS.md`).
>
> Legend: 🟢 stable in Batch 1 · 🟣 from the 夜虹 mockup · 🔵 already in `main` — restyle existing

---

## Confirmed data contract (partner PR #6 — design against this)

Field decisions are settled ([reply from partner, 2026-07-09](../tasks/DESIGN_field_decisions_for_partner.md)):

- `SkinProfile` gains **`concerns: string[]`** (fixed preset enum, chip multi-select, **max 2**, never free-text) and **`safetyFlags: string[]`** (independent from `sensitivities`).
- `skinType` stays **4 values** (`dry|oily|combination|normal`); 「敏感」→ `sensitivities`.
- Weather is **front-end mock only** (上海/北京/洛杉矶/伦敦), no real API, no backend.
- `VerdictResult` stays `{ recommendedIds, avoidIds, reason }` — **not** expanded for v1. Screen 7 renders as 推荐/避免 two columns + one reason paragraph (no per-item why / env card / AM-PM structure yet).

Note: PR #6 lands `concerns`/`safetyFlags` in upstream `types.ts` + `server.ts` mirror, but the profile modal in `App.tsx` has **no UI** for them yet — the onboarding design fills that gap; just pass the two fields into `setProfile`.

---

## 0 · Onboarding 🟣  `建档`

```
Generate the onboarding flow in the 夜虹 design system. A short, warm, 5-step
profile builder — "多告诉我一点,推得越准". It is skippable ("先逛逛,以后再建档").
A slim prism progress bar + step label sit at the top; one prism CTA at the bottom.

Screens in the flow:
- Intro: a soft glowing moon, thin display headline, one line on why (5 steps:
  肤质 · 困扰 · 在用成分 · 城市天气 · 安全), and a quiet "skip for now" link.
- Skin type (single-select): 干性/油性/混合/中性 as prism-selectable tiles (FOUR only —
  「敏感」is NOT a skin type; it lives in `sensitivities`), plus a collapsible
  "不确定?自测 2 题" self-test (紧绷? 出油?) that infers a type. → `skinType`.
- Concerns (multi, **max 2**): pick from a FIXED preset list — 冒痘/泛红/干燥/暗沉/
  出油/毛孔粗大 (chips only, no free-text input). Note when 泛红 is picked
  ("后面会默认帮你避开酸类/A醇"). → stored to `concerns: string[]` (must be values from
  this enum; partner constraint, PR #6).
- Actives in use (multi): A醇/酸类/维C/都没有, plus a wide "容易敏感/有过敏史" toggle
  (the toggle + any specific-ingredient allergies → `sensitivities`).
- City (single): 上海/北京/洛杉矶/伦敦 → reveals a live weather card (temp, 湿度,
  UV, 季节, a plain-language climate tag) with a note that recs adjust to it.
- Safety (multi, honest): 孕期/哺乳 · 正在看皮肤科/用处方药 · 严重痘/破损/感染 ·
  以上都没有. If any serious box is checked, show an amber warning that the app will
  route to a dermatologist and strip strong actives from recommendations.
  → stored to `safetyFlags: string[]` (its own field, kept separate from `sensitivities`;
  partner constraint, PR #6, so the derm-routing / strip-actives logic stays clean).
- Done: "档案建好了" with the profile summarised as chips.

Selected tiles/chips use the prism fill with #16141F text. Warnings use --amber,
safety flags use --rose. Keep copy warm and plain.
```

---

## 1 · Home — empty cabinet 🟢  `空柜首页`  *(Batch-1 contract)*

```
Generate the EMPTY-CABINET home in the 夜虹 system — what a brand-new user sees
before they have any products. This is a dedicated screen, not the returning home
with an empty list.

- Header: eyebrow "NIGHT PRISM · SHELFIE", time-aware thin greeting
  (晚上好,<b>该护肤了</b> with the last word in prism).
- Center: a calm empty state — a single faint ghost bottle, one warm line
  ("架子还空着。把你已有的产品拍进来,我就能开始帮你挑。").
- The clear primary action is SCAN. Make "拍一下 · 加进架子" the dominant prism CTA,
  full-width, unmistakable. A secondary ghost link can point to Explore
  ("还没有?看看该补什么").
- No summary stats, no recommender entry yet — nothing to recommend from.
CONTRACT: empty users must land here, and scan must be the single obvious next step.
```

---

## 2 · Home — returning user 🟢  `回访首页`  *(Batch-1 contract)*

```
Generate the RETURNING-USER home in the 夜虹 system — summary + cabinet.

- Same header (eyebrow + time-aware greeting) with a "重新建档" ghost button top-right.
- Sub-line: "我的架子 · N 件 · <城市> <季节>".
- Profile chips row (skin type, concerns, city+temp+climate tag; a rose chip if a
  safety flag is set).
- "USE IT UP" nudge card (amber) when anything is within ~2 months of PAO expiry —
  tapping it pulses those bottles.
- The shelf itself: bottles grouped into rows under labels "SKINCARE · 基础护肤"
  and "TREATMENT + 彩妆", 4 per row, each a gradient bottle glyph + name, with a
  "剩N个月" amber tag on expiring items. Tapping a bottle opens the product sheet.
- Bottom dock: prism CTA "该用哪瓶?" (opens recommender) + ghost "拍一下·加进架子".
CONTRACT: returning users see summary + cabinet; scan stays a primary action.
```

---

## 3 · Scan 🟢  `扫描`  *(Batch-1 contract — primary action)*

```
Generate the SCAN screen in the 夜虹 system — the app's clearest primary action.
Full-bleed dark viewfinder on an even darker ground (#0D0C13).

- A rounded viewfinder with four bright corner brackets framing the target.
- A soft mint→blue scan-line sweeping top↔bottom. A faint ghost bottle centered.
- Hint line: "对准瓶身,让它认出这是什么". Eyebrow "SCAN · GEMINI 读瓶身".
- Bottom: a large prism-ring camera shutter, centered. A small "识别是模拟的 · demo"
  aside. Back link "← 架子".
Keep it uncluttered — the shutter is the hero. On capture it shows a "识别中…
Gemini 在读瓶身" state, then opens the recognized sheet (prompt 4).
CONTRACT: scan is the main action across the app; keep it the most prominent path.
```

---

## 4 · Scan — recognized sheet 🟣  `识别结果`

```
Generate the RECOGNIZED bottom sheet in the 夜虹 system (slides over the scan view,
blurred dark mask behind).

- Eyebrow "识别到 · RECOGNIZED" in mint.
- Product row: gradient bottle glyph + name + "品牌 · 品类 · 关键成分".
- A glass info card: what it's good for (适合:泛红/熬夜后…) and a one-line why,
  ending "加进架子后,「该用哪瓶」就会把它算进候选。".
- Two actions: ghost "取消" + prism "＋ 加进架子". Confirming continues into the
  ADD-DATE step (prompt 5) — do not silently add without capturing opened date.
```

---

## 5 · Add opened date 🟢🔵  `补开封日期`  *(Batch-1 contract — stays in add flow)*

```
Generate the ADD-DATE step in the 夜虹 system — the moment right after a product is
recognized (from scan) or chosen (from explore), where the user sets when it was
opened so PAO expiry can be computed.

- Centered card: the product's bottle glyph, brand chip, name, category.
- A glass block showing the read-back facts: PAO (开封保质期) months + key
  ingredient chips.
- One input: 开封时间 (month picker, defaults to this month). One line explains PAO
  ("开封后 N 个月内用完最好").
- Actions: ghost "放弃" + prism "加入架子 ✓". On confirm → returning home with the
  new bottle, and a toast "「<name>」上架啦 ✓".
CONTRACT: add-date lives inside the add flow (scan→date and explore→date); never
add a product to the cabinet without passing through it.
```

---

## 6 · 该用哪瓶 — intro 🟣  `推荐·选困扰`

```
Generate the recommender INTRO in the 夜虹 system — "该用<b>哪瓶?</b>".
- Eyebrow "ONLY FROM YOUR SHELF". Sub: "选一个当下的困扰/场合,我只从你架子上有的里挑。"
- A wrap of concern chips: 冒痘 泛红 干燥 熬夜后 上妆前 换季偏干 毛孔. Selected chip
  glows rose.
- Below, a hint card: if profiled, "按你的档案(混合肤 · 泛红/冒痘 · 上海)+ 架子上
  这 N 件来挑"; if not, invite building a profile ("建档后会按你的肤质、在用成分和
  当地天气调整,更准") with a small prism "先建档" button.
- Picking a chip shows a brief "在你的架子上挑…" thinking bar, then the result
  (prompt 7).
```

---

## 7 · 该用哪瓶 — result 🟣  `推荐·结果`  *(the hero screen)*

```
Generate the recommender RESULT in the 夜虹 system — the app's smartest, most
screenshot-worthy screen. Everything reveals fade-up in sequence.

- Environment card (if city known): "环境 · 上海 33°C 梅雨/夏" + a mint evidence tag
  ("高温→皮脂 +10%/°C · T1"), and a plain-language climate steer
  ("当地闷热易出汗——选清爽质地,别过度清洁。") with key words in mint.
- Note cards (contextual): sensitive-skin acids moved to skip; active-ingredient
  stacking warning; a --rose safety note routing to a dermatologist if flagged.
- "用这些" section: up to 3 product rows (bottle glyph + name·brand + one-line why;
  an italic env-boost reason when climate bumps its rank).
- "先别用" section: skip rows with a rose "今晚跳过" badge + the reason.
- "简单早晚" section: AM / PM routine as two soft cards (adjusted for today's
  concern and safety, e.g. "今晚避开酸类和A醇").
- Persistent legal line at the bottom: "仅供参考,非医疗建议。严重痘痘/感染/过敏/
  术后不适请及时就医。"
Only ever recommends products the user owns. Empty case: a gentle "架子上暂时没有
对口的——先做基础保湿+防晒,下次扫新品时我帮你对着买。".
```

---

## 8 · Explore / 该补什么 🔵  `发现·该补什么`  *(restyle existing — `explore` tab in `main`)*

```
Generate an EXPLORE screen in the 夜虹 system — a small curated catalog of products
the user does NOT yet own, matched to their profile. This is the "what to buy next"
counterpart to the shelf-only recommender.

- Header: eyebrow "MATCHED TO YOU", thin heading "该补<b>什么?</b>", sub-line
  "按你的肤质和成分敏感库精选,不盲目跟风。".
- A hero pick card (raised glass, a large bottle glyph) for the top match.
- A list of curated product cards, each: bottle glyph, brand eyebrow, name, a mint
  "契合度 92%" match pill, a one-line description, small ingredient/benefit tags,
  and a round prism "＋" quick-add on the right.
- Quick-add routes into the ADD-DATE flow (prompt 5), then to the cabinet.
Keep it clearly distinct from the recommender: explore = new products to acquire,
recommender = decide among products owned.
```

---

## 9 · Travel / 出行收纳 🔵  `出行·智能收纳`  *(restyle existing — `routine` tab / `RoutineTravelTab` in `main`)*

```
Generate a TRAVEL PACKING screen in the 夜虹 system — pack from what's on the shelf
for a trip, adjusted for the destination's climate.

- Header: eyebrow "PACK SMART", thin heading "出行<b>收纳</b>".
- A glass form: 目的地 (text, e.g. 三亚) + 旅行天数 (number). A prism CTA
  "生成行李收纳清单" with a plane icon; shows a brief thinking state.
- Result card (amber-tinted, warm): a short climate-aware reason
  ("三亚高温高湿高 UV——重点防晒 + 清爽保湿,酸类减量。") + a packing list of the
  user's own products as chips, each with a suggested amount/notes.
- Same persistent non-medical legal line.
Only packs products the user already owns; mirror the recommender's evidence tone.
```

---

## 10 · Product sheet 🟣  `产品详情`

```
Generate the PRODUCT DETAIL bottom sheet in the 夜虹 system (slides over home,
blurred mask, grab handle).

- Top row: large gradient bottle glyph + name + "品牌 · 品类 · 护肤/彩妆".
- A blue-tinted info card: 关键成分/规格 + one-line why it's on the shelf.
- PAO block: "开封 N 个月 · PAO M 个月" left, "还剩约 K 个月" right (bold), then the
  mint→amber PAO meter. If K ≤ 2, an amber "⏳ 快到开封保质期了——优先用它,别浪费。"
- Adaptive tags: "适合 · <concern>" in mint outline; "<concern>时先别用" in rose
  outline for its avoid conditions.
- One prism "知道了" to close. (A destructive "移除该产品" can live as a quiet text
  link if edit is in scope.)
```

---

## 11 · Profile / 肤质档案 🔵  `肤质档案`  *(optional — main has an editor; 夜虹 re-runs onboarding)*

```
Generate a PROFILE screen in the 夜虹 system — a readable summary of the user's skin
profile with inline edit, as a lighter alternative to re-running onboarding.

- Profile summary as chips (skin type, concerns, actives-in-use, city+climate, any
  safety flag in rose).
- Editable sections mirroring onboarding steps (skin type tiles, concern chips,
  actives, city+weather card, safety), each saving in place.
- A quiet note that changing this re-tunes every recommendation.
- Prism "保存" ; ghost "重新建档" to run the full flow.
Keep parity with onboarding's fields so the two never diverge.
```

---

### Coverage map

| Screen | Source | Batch-1 |
|---|---|---|
| Onboarding | 夜虹 | — |
| Home · empty cabinet | 夜虹 + contract | 🟢 |
| Home · returning | 夜虹 + contract | 🟢 |
| Scan | 夜虹 + contract | 🟢 |
| Scan · recognized sheet | 夜虹 | — |
| Add opened date | contract | 🟢 |
| 该用哪瓶 · intro | 夜虹 | — |
| 该用哪瓶 · result | 夜虹 | — |
| Explore · 该补什么 | GuiGui `main` (`explore` tab) | 🔵 in main — restyle |
| Travel · 出行收纳 | GuiGui `main` (`RoutineTravelTab`) | 🔵 in main — restyle |
| Product sheet | 夜虹 | — |
| Profile · 肤质档案 | GuiGui `main` (`ProfileCompletionPrompt`) | 🔵 in main — restyle |
