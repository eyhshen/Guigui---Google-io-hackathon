# Contributing

This repo is now in parallel build mode.

The short version:

- do not work directly on `main`
- create a branch
- keep the change scope tight
- open a PR back into `main`

## Branch Policy

Do not use `main` for in-progress feature work.

Use:

- `ui/...` for visual and interaction polish that should not change product behavior
- `feature/...` for new product behavior
- `fix/...` for bugs
- `docs/...` for repo or process docs

Examples:

```bash
git checkout main
git pull origin main
git checkout -b ui/home-cabinet-visual-pass
```

```bash
git checkout -b feature/guest-first-prompts
```

## Scope Rules

If you are changing UI only, do not change these Batch 1 behaviors:

1. empty users must see a dedicated empty-cabinet home
2. returning users must see summary plus cabinet
3. scan must stay the clearest primary action
4. add-date must remain part of the add-product flow

If you need to change product behavior, isolate it in a dedicated branch and call out the batch explicitly.

## What Not To Touch

- `.env*`
- secret-bearing configs
- push-to-main shortcuts
- unrelated batch logic

## Current Product Status

Completed:

- `Batch 1: Home State Split`

Remaining:

1. `Batch 2: Guest-First Entry Rules`
2. `Batch 3: Progressive Profile Completion`
3. `Batch 4: Daily Summary Rules`
4. `Batch 5: AI and Travel Framing Cleanup`
5. `Batch 6: Structure Extraction Before UI Polish`

## Local Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

For real Gemini scan behavior, set `GEMINI_API_KEY` in `.env.local`.

## Before Opening A PR

Run:

```bash
npm run lint
npm run build
```

For UI changes, also do a manual click-through of the affected surface.

## Key Project Docs

- [README.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/README.md)
- [STATUS.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/STATUS.md)
- [tasks/20260706-mvp-functional-adjustment-spec.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md)
- [tasks/20260706-mvp-implementation-batches.md](/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md)
