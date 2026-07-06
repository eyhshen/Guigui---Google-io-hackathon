# 夜虹 / Night Prism — Design System Prompt

> **Purpose:** paste this whole file into Claude design (or any generative design
> tool) as the *first* step. It establishes the reusable design system — tokens,
> type, components, motion — that every page prompt in `PAGE_PROMPTS.md` builds on.
> It is distilled directly from the shipped reference implementation
> (`design/reference/night-prism.app.html`), so it is exact, not aspirational.

---

## Prompt to paste

```
Create a reusable design system called "夜虹 / Night Prism" for a mobile-first
skincare app. Mobile web, single column, max-width 480px, iOS safe-area aware
(respect env(safe-area-inset-*)). It is a calm, premium, DARK aesthetic — quiet
by default, with one iridescent accent that does all the shouting.

Produce the system as reusable tokens + components, not a one-off screen.

────────────────────────────────────────
1 · GROUND & SURFACES
────────────────────────────────────────
- App background: #16141F (deep violet-black). Secondary panel base: #1B1828.
- Glass surfaces: rgba(255,255,255,.05) default, rgba(255,255,255,.08) raised.
- Hairline borders: rgba(255,255,255,.13). Dividers: rgba(255,255,255,.14).
- Two soft "prism beam" light sources sit behind all content, blurred ~30px,
  opacity .24–.42, drifting slowly. One top-right, one bottom-left.
- A faint monochrome film-grain overlay (SVG fractalNoise) covers everything at
  ~28% opacity, mix-blend-mode: overlay. It is the texture that makes it premium.

────────────────────────────────────────
2 · THE ACCENT — prism gradient (use sparingly, it is the whole brand)
────────────────────────────────────────
--prism: linear-gradient(100deg,#F5C0CB, #F7DDB2 30%, #BEEBD1 60%, #B4D6F5 85%, #D3BDF2);
Use ONLY for:
- primary CTA fills (black text #16141F sits on top),
- the emphasized word inside a heading (background-clip:text),
- progress-bar fills, active-state glows, the camera shutter ring.
Never use it as a background wash or on more than one element per viewport.

────────────────────────────────────────
3 · SEMANTIC COLORS (meaning, never decoration — and never the accent)
────────────────────────────────────────
--mint  #A7E8C0  good · "use this" · ready
--rose  #F08A9B  caution · "skip this" · safety flag
--amber #F5C377  expiry / "use it up" · warmth
--blue  #92C4F2  info · neutral fact
--lilac #C7A8F0  treatment / actives
Text: --ink #F1EDF7 · --muted #9C94B3 · --dim #6E6884.

────────────────────────────────────────
4 · TYPOGRAPHY
────────────────────────────────────────
Family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif.
- Display headings: LARGE + THIN. font-weight 200, letter-spacing .10em.
  The one emphasized word is weight 700 with --prism clipped into the text.
  (e.g. 该用<b>哪瓶?</b> — "哪瓶" carries the gradient.)
- Body: 12–13px, line-height 1.7–1.8, color --muted for secondary text.
- Eyebrows: tiny UPPERCASE English, 9–10px, letter-spacing .30–.42em, --muted.
  (e.g. "ONLY FROM YOUR SHELF", "NIGHT PRISM · SHELFIE".)
- Numbers/data that line up: tabular-nums.

────────────────────────────────────────
5 · COMPONENTS (build each as a reusable component)
────────────────────────────────────────
- Radius language: pills (999px) and soft cards (16–26px). No sharp corners.
- Button / prism: pill, --prism fill, #16141F text, weight 700, min-height 50px,
  soft lilac glow shadow. :active scale .97.
- Button / ghost: pill, glass fill, 1px hairline border, --ink text.
- Chip: pill, glass, 1px border; when active → tinted fill + colored border +
  outer glow in the relevant semantic color.
- Card: glass surface, hairline border, 16–20px radius, 14–16px padding.
- Eyebrow + display heading pair (the standard screen header).
- Bottle glyph: flat SVG icon per product category, filled with a per-category
  linear gradient (mint/blue/amber/lilac/rose). Categories → cleanser, serum,
  moisturizer, sunscreen, treatment, toner, makeup.
- PAO meter: thin rounded track, fill = linear-gradient(90deg, --mint, --amber),
  width = remaining/total. Pairs with a "还剩约 N 个月" label.
- Bottom sheet: slides up from bottom over a blurred dark mask
  (rgba(8,7,14,.6) + backdrop-filter blur 3px), 26px top radius, grab handle.
- Toast: centered pill, dark glass, appears above the dock.
- Evidence tag: tiny mint-outlined pill for research citations
  (e.g. "高温→皮脂 +10%/°C · T1"). This is a signature trust element — keep it.

────────────────────────────────────────
6 · MOTION (gentle; always honor prefers-reduced-motion → kill all of it)
────────────────────────────────────────
- Prism beams drift on a 26–32s loop. Film grain is static.
- Content reveals fade-up in sequence on screen enter (stagger ~70ms).
- Scan viewfinder has a soft scan-line sweeping top↔bottom.
- Sheets slide up with a cubic-bezier(.32,.72,.28,1) ease.

────────────────────────────────────────
7 · VOICE & ETHICS (the words are part of the design)
────────────────────────────────────────
- Warm, plain-spoken Simplified Chinese, second person ("你的架子", "该护肤了").
- Confident but honest: it recommends only from what the user already owns.
- Always non-medical: a persistent quiet disclaimer, and a hard safety path that
  routes pregnancy / prescription / infection cases to "see a dermatologist".
- Advice carries evidence tags where possible; never sound like it is guessing.

Deliverables: color + type + spacing tokens, and the components listed in §5,
each in default / hover / active / disabled where applicable, on the #16141F
ground. Show a one-screen sample composing them so the system reads as a whole.
```

---

## Token quick-reference (for hand-tuning in Claude design)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#16141F` | app ground |
| `--bg2` | `#1B1828` | panel base |
| `--surface` | `rgba(255,255,255,.05)` | glass |
| `--surface2` | `rgba(255,255,255,.08)` | raised glass |
| `--line` | `rgba(255,255,255,.13)` | hairline border |
| `--ink` | `#F1EDF7` | primary text |
| `--muted` | `#9C94B3` | secondary text |
| `--dim` | `#6E6884` | tertiary / legal |
| `--prism` | `linear-gradient(100deg,#F5C0CB,#F7DDB2 30%,#BEEBD1 60%,#B4D6F5 85%,#D3BDF2)` | **the** accent |
| `--mint` | `#A7E8C0` | good / use |
| `--rose` | `#F08A9B` | caution / skip |
| `--amber` | `#F5C377` | expiry |
| `--blue` | `#92C4F2` | info |
| `--lilac` | `#C7A8F0` | treatment |

See `reference/night-prism.app.html` for the exact CSS, and `reference/screens/`
for how each token reads in context.
