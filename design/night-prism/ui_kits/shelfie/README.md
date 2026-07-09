# Shelfie UI Kit — 夜虹 Night Prism

High-fidelity recreation of the **GuiGui 柜柜 / Shelfie** app, restyled in the Night Prism dark direction, composing the design-system primitives from `components/`.

**Ground truth:** upstream `github.com/Phat-Po/Guigui---Google-io-hackathon` (`src/App.tsx` + `src/components/*`, read July 2026). The shipped app is **light** (cream/stone + green `#3D7D52`); this kit is the *target* Night Prism treatment applied onto that exact structure — see the root `readme.md` → "REAL APP (GuiGui) — architecture & integration".

## Architecture (mirrors upstream App.tsx)
Two-level nav: bottom `TabBar` with 4 tabs (`shelf · explore · ai · routine`) + full-screen sub-views (`scan`, `add-date`). Cabinet-first, guest-first, non-blocking profile.

- `index.html` — orchestrator: tab/view state, inventory, profile, sheets, account-prompt logic, header (柜柜 skān + profile pill), PrismBackground, Toast. Boots on the **shelf** tab.
- `icons.jsx` — `Icon` helper reading the Lucide UMD (`window.lucide.icons[Name]`) — the app's real lucide-react set, mirrored 1:1.
- `shelfie-ui.jsx` — mid-level composites (Night Prism dark) mirroring upstream components: `HomeSummary` (今日摘要 priority card), `EmptyCabinet`, `ProfileCompletionPrompt`, `AccountPromptCard`. Also exports `np_dock`.
- `ShelfieShelf.jsx` — **shelf tab**: profile/account prompts + HomeSummary + category filter + product grid (`ShelfGrid`, 3-col, expiry badges 已过期/临期, highlight ring).
- `ShelfieExplore.jsx` — **explore tab**: K-Beauty hero + 5 curated product cards (+ → add-date).
- `ShelfieAI.jsx` — **ai advisor tab**: chat bubbles + verdict cards (建议使用 mint / 建议避开 rose) + quick chips + `Textarea` composer (Enter-to-send). `getVerdict` runs as a local mock (`data.js`).
- `ShelfieRoutine.jsx` — **routine tab**: `SegmentedControl` (每日护肤日常 / 出行智能收纳) → 5-step routine timeline OR travel form (`TextField` destination + days) → mock packing list.
- `ShelfieScan.jsx` — **scan** viewfinder (sweep + shutter, mock recognition) + **add-date** form (month input → PAO expiry preview → into cabinet).
- `ShelfieSheets.jsx` — bottom-sheet bodies: `ProductSheetBody` (PAO meter, ingredients, remove), `ProfileModalBody` (skin-type segments + sensitivity/actives/city inputs), `AccountSheetBody` (guest-first benefits).
- `ShelfieOnboarding.jsx` + `onboarding.html` — an **extended** 5-step warm profile builder (moon intro → skin type + self-test → concerns → actives → city + weather → safety → done). Not in upstream (which uses the lightweight profile modal); kept as an optional deep-建档 alternative and its own card.
- `data.js` — real `demoInventory` + `curatedProducts` + categoryLabels + routine steps + account-prompt copy, ported from upstream; plus **local mock** `mockVerdict` / `mockTravel` (the app calls `/api/verdict` · `/api/travel`) and date helpers.
- `tweaks-panel.jsx` — Tweaks shell (host protocol + controls). The shelf greeting exposes **字号 Size · 粗细 Thickness · 字距 Spacing · 光晕 Glow · 字色 Color** controls (toggle Tweaks from the toolbar) so the 晚安 hero can be dialed live.

## Data contract (upstream `src/types.ts`, kept intact)
`Product { id, name, brand, category, keyIngredients[], paoMonths, openedDate, expiryDate, bottle:{shape,colorHex}, status }` · `ProductShape = pump|tube|jar|dropper|spray|stick|bottle` · `SkinProfile { skinType, sensitivities[], currentActives[], city }` · `AccountPromptTrigger = first-product|ai-advice|travel-plan`.

## Interactions covered
Tab nav; empty→scan/explore; scan → add-date → cabinet (unlocks first-product prompt); explore + → add-date; AI ask (chip or textarea) → verdict (unlocks ai-advice); travel form → packing list (unlocks travel-plan); profile pill → editor modal; account prompt card → sheet → dismiss; product tile → detail sheet → remove. All prompts are dismissible and never block core usage.

> Mocks only: no real auth / persistence / weather / DB, matching the upstream "UI design pass" rule.
