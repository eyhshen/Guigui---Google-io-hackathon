# Partner UI Agent Instructions

## Purpose

This file is for the partner agent working from:

- `https://github.com/eyhshen/Guigui---Google-io-hackathon`

The goal is to apply visual design work onto the current upstream structure without replacing the app architecture.

## Source Of Truth

Use upstream `main` from:

- `https://github.com/Phat-Po/Guigui---Google-io-hackathon`

as the source of truth before making UI changes.

Recommended sync flow:

```bash
git remote add upstream https://github.com/Phat-Po/Guigui---Google-io-hackathon.git
git fetch upstream
git checkout elaine/design-system
git rebase upstream/main
```

If `upstream` already exists, skip the `git remote add upstream ...` step.

## Architecture Rule

Preserve the current structure:

- `src/App.tsx` owns app state, navigation, product flow, API calls, modal state, and high-level screen composition.
- `src/components/*` owns visual presentation and local component layout.
- `src/types.ts` owns shared data contracts.
- `src/api.ts` and `server.ts` own API behavior.

Do not replace `src/App.tsx` wholesale with a design-version file. If the design branch has a different `App.tsx`, extract the useful visual JSX, styles, and component ideas into the existing component structure instead.

## Preferred UI Edit Targets

Primary UI work should happen in:

- `src/components/EmptyCabinetState.tsx`
- `src/components/HomeSummary.tsx`
- `src/components/Shelf.tsx`
- `src/components/ProfileCompletionPrompt.tsx`
- `src/components/GuestAccountPrompt.tsx`
- `src/components/Bottle.tsx`

Secondary UI work may touch:

- `src/App.tsx`

but only for wiring existing components, adding minimal props, or moving a visual block into a component.

Avoid touching these unless there is a clear contract need:

- `server.ts`
- `src/api.ts`
- `src/types.ts`

If a UI change needs new data, add the smallest possible prop or type change and explain it in the commit or PR description.

## Component Contract Rules

Keep existing component props working unless the parent flow is updated in the same commit.

Important current contracts:

- `HomeSummary` receives product counts, expiry counts, missing category labels, and `onScan`.
- `Shelf` receives inventory, product click handling, and optional highlighted IDs.
- `EmptyCabinetState` must keep scan as the primary action.
- Account and profile prompt components must remain non-blocking placeholders, not real auth.

## Product Behavior That Must Stay Intact

The app is cabinet-first and guest-first:

- first-time users should be able to scan or add a product without login
- returning users should see cabinet plus daily summary
- profile completion should improve recommendations but not block core usage
- account prompts are placeholders after value moments, not a login wall
- scan remains the main add-product action

Do not add real auth, persistence, weather, or database behavior in the UI design pass.

## Validation Required

After UI changes, run:

```bash
npm run lint
npm run build
```

Then manually check:

- empty cabinet home
- returning cabinet home
- scan entry
- add-date confirmation
- AI advisor view
- routine/travel view
- mobile-sized layout

## PR Guidance

Open the PR back to upstream `main`.

In the PR description, include:

- which components were visually changed
- whether `src/App.tsx` was touched and why
- whether any props or types changed
- lint/build result

