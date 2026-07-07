# GuiGui

`GuiGui` is a cabinet-first AI skincare companion. The current repo is a Google I/O hackathon MVP built with `React`, `Vite`, `Express`, and `Gemini`.

The product direction is now locked around one core loop:

1. scan a product
2. add it to your cabinet
3. understand whether and when to use it

This repo is not login-first and not ecommerce-first. The MVP is guest-first and cabinet-first.

## Current MVP State

Implemented now:

- cabinet home split into `empty cabinet` and `returning user`
- persistent scan CTA on both home states
- explore-to-add flow with opened-date confirmation
- AI advisor and routine / travel prototype surfaces

Not implemented yet:

- auth
- persistence
- cloud sync
- production weather integration
- production-ready scan verification flow

Important current limitation:

- real Gemini scan requires `GEMINI_API_KEY`
- in-app preview smoke tests passed for home-state behavior, explore add flow, and empty-to-returning transitions
- full camera scan end-to-end was not verified in this session because local preview had no Gemini key and iframe camera access was limited

## Stack

- `React 19`
- `Vite 6`
- `TypeScript`
- `Express`
- `Gemini API`

## Run Locally

Prerequisites:

- `Node.js 20+`
- a Gemini API key for real scan behavior

Install:

```bash
npm install
cp .env.example .env.local
```

Set:

```bash
GEMINI_API_KEY="your-key"
```

Start:

```bash
npm run dev
```

App URL:

- [http://localhost:3000](http://localhost:3000)

Checks:

```bash
npm run lint
npm run build
```

## Repo Rules

This repo is now being used by multiple collaborators. Follow these rules:

1. Do not edit `.env*` unless explicitly asked.
2. Do not commit secrets.
3. Do not push directly from ongoing feature work to `main`.
4. Do not mix UI polish work with new product behavior unless the task explicitly says so.
5. Put planning, handoff, and phased execution docs under [`tasks/`](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks).
6. Treat `main` as the integration branch, not the scratchpad.

## Collaboration Workflow

Use branches, not direct edits on `main`.

Recommended flow:

1. sync local `main`
2. create a feature branch
3. keep scope narrow
4. open a PR back into `main`

Example:

```bash
git checkout main
git pull origin main
git checkout -b ui/home-state-polish
```

Suggested branch naming:

- `ui/...` for UI-only work
- `feature/...` for behavior work
- `fix/...` for bug fixes
- `docs/...` for README or process docs

More collaboration details live in [CONTRIBUTING.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/CONTRIBUTING.md).

## Current Build Split

The repo can now support parallel work:

- UI track: improve visual quality, spacing, hierarchy, motion, and component styling without changing Batch 1 behavior
- product track: continue the remaining behavior batches

UI changes should preserve these Batch 1 behavior contracts:

- empty users see a dedicated empty-cabinet home
- returning users see summary plus cabinet
- scan remains the clearest primary action
- add-date stays in the add flow

## Remaining Batches

`Batch 1` is complete.

Still remaining:

1. `Batch 2: Guest-First Entry Rules`
   - add explicit post-value account prompt timing
   - keep sign-up deferred, not blocking
2. `Batch 3: Progressive Profile Completion`
   - make profile completion additive instead of assumed
   - prompt for skin type and sensitivities at the right moments
3. `Batch 4: Daily Summary Rules`
   - make the home summary genuinely useful
   - prioritize expiry and daily guidance logic
4. `Batch 5: AI and Travel Framing Cleanup`
   - tighten cabinet-aware AI and travel behavior
   - improve empty / partial inventory handling
5. `Batch 6: Structure Extraction Before UI Polish`
   - reduce `src/App.tsx` complexity
   - extract safer seams for future UI work

See:

- [tasks/20260706-mvp-functional-adjustment-spec.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md)
- [tasks/20260706-mvp-implementation-batches.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md)
- [STATUS.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/STATUS.md)

## Upstream

Upstream source:

- [Phat-Po/Guigui---Google-io-hackathon](https://github.com/Phat-Po/Guigui---Google-io-hackathon)
