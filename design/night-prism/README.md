# 夜虹 Night Prism — Shelfie UI Kit (runnable design)

High-fidelity Night Prism recreation of GuiGui / Shelfie, mirroring upstream
`src/App.tsx` + `src/components/*`. This is the **target visual treatment** — the
shipped app is light (cream/green); this kit is the dark 夜虹 direction applied onto
the exact same structure. Imported from the Claude Design project
`夜虹 Night Prism Design System` (`4de317c9`).

## How to run (it needs a server — the kit loads `.jsx` via Babel)

```bash
cd design/night-prism
python3 -m http.server 8199
# then open http://localhost:8199/ui_kits/shelfie/index.html
```

Boots on the **shelf** tab. Bottom dock switches: shelf · explore · ai · routine ·
(scan is a full-screen sub-view). Everything is a local mock — no auth, no
persistence, no real weather, no DB — matching the "UI design pass" rule.

## What's here

- `ui_kits/shelfie/` — the app recreation (index.html orchestrator + per-tab JSX).
- `_ds_bundle.js` — compiled Night Prism design-system primitives (Button, Chip,
  PrismBackground, TabBar, BottleGlyph, PaoMeter, BottomSheet, Card, Toast, …).
- `styles.css` + `tokens/*.css` — the design tokens (color, type, spacing, effects).
- `assets/` — logo mark.

## Two cosmetic gaps (both degrade gracefully — not blockers)

Imported over the Claude Design MCP, whose file-read caps at 256 KB. Two binaries
exceeded that and couldn't transfer intact:

- **`assets/guigui-logo.png`** — substituted with a vector rasterization of
  `assets/app-icon.svg` (the same prism-bottle mark). To restore the exact original,
  drop the real `guigui-logo.png` from the Claude Design project into `assets/`.
- **`assets/fonts/LogoSCUnboundedSans-Regular.ttf`** — the 晚安 greeting face. Absent
  here, so the greeting falls back to Noto Serif SC (declared in `tokens/fonts.css`).
  Drop the `.ttf` into `assets/fonts/` to restore it.

Everything else — every screen, component, color, and interaction — renders exactly
as designed.

## Data contract

Mirrors upstream `src/types.ts`. Note: partner PR #6 adds `concerns: string[]` and
`safetyFlags: string[]` to `SkinProfile` — the onboarding/profile UI here still needs
to write those two fields (see `../PAGE_PROMPTS.md` → "Confirmed data contract" and
the "Build Status" card in the Claude Design project's Handoff group).
