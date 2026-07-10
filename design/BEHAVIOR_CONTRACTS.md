# Behavior Contracts — preserve across the design/UI lane

These are the Batch-1 behaviors that are **stable and must not change** while the
design/UI work happens. The design lane (layout, spacing, typography, card styling,
motion, polish) may restyle anything, but must keep every contract below true.

Source: Batch-1 handoff (PR
[Phat-Po/Guigui---Google-io-hackathon#3](https://github.com/Phat-Po/Guigui---Google-io-hackathon/pull/3)).
`main` is now at **#5** (screen sections extracted into components); these contracts
still hold and now map onto `src/components/ShelfTab.tsx` (empty + returning home,
shelf, scan entry), `AiAdvisorTab.tsx` (recommender), and `RoutineTravelTab.tsx`
(routine + travel).

## Contracts

1. **Empty users see a dedicated empty-cabinet home.** A brand-new user (no
   products) lands on a purpose-built empty home — not the returning home showing
   an empty list. See `PAGE_PROMPTS.md` §1.

2. **Returning users see summary + cabinet.** Once products exist, home shows the
   summary (count, profile chips, expiry nudge) and the shelf. See §2.

3. **Scan stays the main action.** Scan is the most prominent path in the app,
   on both home states. Do not demote it behind other actions. See §3.

4. **Add-date stays in the add flow.** Every path that puts a product in the
   cabinet — `scan → recognized → add-date` and `explore → add-date` — passes
   through the opened-date step. Never add a product without it. See §5.

## Also verified stable in Batch 1

- Home is split into empty-cabinet vs. returning-user states.
- `explore → add-date → cabinet` flow works.
- `empty → add first product → returning home` transition works.

## Lane boundaries

- ✅ In scope for this lane: layout, spacing, typography, card styling, color
  application, motion, empty/loading/error visuals, overall polish — all within the
  夜虹 design system.
- 🚫 Out of scope: changing any Batch-1 behavior contract, route structure, or the
  add-flow ordering.
- 🌿 Always on a branch, never directly on `main`. Design changes reach `main` only
  via PR.
