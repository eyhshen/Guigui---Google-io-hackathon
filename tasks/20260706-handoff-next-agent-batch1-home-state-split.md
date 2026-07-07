# GuiGui Handoff — Start Batch 1 Home State Split

Project root:

- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon`

## What happened in this session

This session did planning and product-direction locking only.
No runtime behavior changed.
No UI implementation work started yet.

Completed artifacts:

- updated design direction template:
  - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-guigui-mini-design-pack-template.md`
- new MVP functional spec:
  - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md`
- new implementation batch plan:
  - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md`

## Locked product decisions

These are already decided and should not be re-debated unless the operator changes direction:

- `GuiGui` is `cabinet-first`, not login-first
- the MVP should be `guest-first`
- first value should happen before sign-up
- home behavior must split between:
  - empty cabinet users
  - returning users with products
- the first implementation priority is functionality, not polished UI
- `Explore` is not the primary loop right now; it is secondary to:
  - Cabinet
  - Scan
  - AI Advisor
  - Routine / Travel

## Current code reality

The MVP is still structurally simple and heavily centralized:

- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/App.tsx`
  - holds most app state, main navigation, summary logic, and large UI sections
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/components/Scanner.tsx`
  - handles camera/upload scan flow
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/components/Shelf.tsx`
  - renders product cabinet items
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/types.ts`
  - product/profile/AI result types
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/api.ts`
  - frontend wrappers for scan/verdict/travel APIs
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/server.ts`
  - Express API routes for Gemini-backed scan, verdict, and travel

Important product-state facts from the current code:

- home tabs are still `shelf | explore | ai | routine`
- there is no auth flow
- there is no persistence
- there is no real location/weather integration
- current inventory starts from demo data, so empty-state logic does not exist yet

## What the next agent should do

Start with:

- `Batch 1: Home State Split`

Source of truth:

- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md`
- `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md`

Exact goal for the next coding turn:

1. derive explicit empty-cabinet behavior from inventory state
2. make home render differently for empty users versus returning users
3. keep scan as the clearest primary action in both states
4. avoid mixing in auth, persistence, or deep UI polish in the same pass

## Recommended execution order

1. Read the three task docs in this order:
   - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md`
   - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md`
   - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-guigui-mini-design-pack-template.md`
2. Inspect current implementation in:
   - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/App.tsx`
   - `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/components/Shelf.tsx`
3. Implement only Batch 1
4. Verify with:
   - `npm run lint`
   - `npm run build`
   - manual click-through of:
     - empty home
     - returning home
     - scan
     - add-date confirmation
     - return to home

## Constraints

- Do not touch `.env*`
- Do not push
- Do not add auth in the Batch 1 pass
- Do not treat `Explore` as the first product loop to improve
- Do not start visual redesign until home-state behavior is stable

## What was deliberately not done

- no code changes
- no component extraction yet
- no sign-up placeholder UI yet
- no profile-flow rewrite yet
- no weather logic

## Current git state before snapshot

At handoff creation time, the only pending changes are planning and handoff artifacts.
No runtime files are pending before the upcoming snapshot commit.

## Minimum reading list

If context is tight, read only these first:

1. `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-functional-adjustment-spec.md`
2. `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/tasks/20260706-mvp-implementation-batches.md`
3. `/Volumes/轻松打爆你/VIBE CODING/10_PROJECTS_ACTIVE/20260706__web__guigui-google-io-hackathon/src/App.tsx`

## First commands the next agent should run

```bash
git status --short
rg -n "const \\[tab|const \\[view|const \\[inventory|soonCount|tab === 'explore'|tab === 'shelf'" src/App.tsx
npm run lint
```

Then continue with Batch 1 only.
