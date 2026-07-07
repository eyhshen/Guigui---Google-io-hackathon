# GuiGui MVP Implementation Batches

## Purpose

This document breaks the MVP functional adjustment into execution batches.
It is intended for actual code work on the current React + Vite + Express prototype.

Use this document to answer:

- what to change first
- which files are likely affected
- what should be verified after each batch
- what should not be mixed into the same pass

This plan assumes the product rules defined in:

- `tasks/20260706-mvp-functional-adjustment-spec.md`
- `tasks/20260706-guigui-mini-design-pack-template.md`

## Current Technical Baseline

Observed structure:

- `src/App.tsx` contains most app state, routing logic, summary logic, and large sections of UI
- `src/components/Scanner.tsx` handles scan capture and upload
- `src/components/Shelf.tsx` renders cabinet products
- `src/api.ts` wraps scan, verdict, and travel API calls
- `src/types.ts` defines profile, product, and AI response types
- `server.ts` exposes `/api/scan`, `/api/verdict`, and `/api/travel`

Current practical constraints:

- no auth
- no persistence layer
- no weather API
- no dedicated onboarding state model
- heavy product logic centralized in one screen file

## Execution Principle

Do not start with visual polish.
First make the app behavior coherent.

Execution order should be:

1. state and flow correctness
2. screen structure and UX clarity
3. visual refinement
4. optional auth and persistence expansion

## Batch 1: Home State Split

### Goal

Split home behavior between:

- empty cabinet users
- returning users with products

### Intended Product Outcome

- new users see one obvious first action
- returning users see cabinet plus a light summary

### Likely Files

- `src/App.tsx`
- possibly a new `src/components/EmptyCabinetState.tsx`
- possibly a new `src/components/HomeSummary.tsx`

### Concrete Changes

- derive `isEmptyCabinet` from inventory length
- replace one-size-fits-all home summary with conditional home sections
- ensure scan remains visible as the primary action in both states
- avoid showing dense stats when there is no inventory

### Verification

- run app locally
- verify first render with demo inventory still works
- temporarily test empty inventory state
- confirm no broken navigation between home, scan, and add-date flow

### Exit Criteria

- empty and non-empty homes are functionally distinct
- first action is obvious in empty state
- returning state still exposes cabinet and summary correctly

## Batch 2: Guest-First Entry Rules

### Goal

Make guest-first usage explicit in the MVP behavior, even if auth is not implemented.

### Intended Product Outcome

- users can use core flows without login
- the product already reflects deferred sign-up logic

### Likely Files

- `src/App.tsx`
- possibly a new `src/types.ts` addition for onboarding or account prompt state

### Concrete Changes

- introduce explicit app-level state for account prompt timing
- define placeholder sign-up triggers after value moments
- do not implement real Google or Apple auth in this batch
- add UI placeholders only where the future prompt should appear

### Verification

- confirm no login wall exists on first open
- confirm first add flow completes without blocked state
- confirm prompt logic does not interrupt scan success path

### Exit Criteria

- guest-first behavior is reflected in the product flow
- future account prompt locations are structurally clear in code

## Batch 3: Progressive Profile Completion

### Goal

Move profile collection into a progressive model instead of treating it as already complete.

### Intended Product Outcome

- profile data improves recommendations
- profile is helpful but not blocking

### Likely Files

- `src/App.tsx`
- `src/types.ts`
- possibly new components for profile prompt or profile completion sheet

### Concrete Changes

- define profile completeness states
- distinguish required-now versus improve-later fields
- ask for skin type and sensitivities after first value moment or before AI recommendations
- keep city or location optional and later

### Verification

- confirm AI and travel still work with partial profile
- confirm prompts are additive, not blocking
- verify copy clearly explains why more info helps

### Exit Criteria

- profile can be incomplete without breaking core flows
- personalization prompts occur at sensible moments

## Batch 4: Daily Summary Rules

### Goal

Turn home summary from a static card into a product-relevant daily layer.

### Intended Product Outcome

- summary becomes useful, not decorative
- home highlights what matters today

### Likely Files

- `src/App.tsx`
- possibly a new `src/components/HomeSummary.tsx`

### Concrete Changes

- define summary priority order
- show expiry warnings first when present
- support simple daily guidance copy
- prepare structure for future weather-aware messages
- avoid real location integration in this batch unless required

### Verification

- test with expiring products
- test with no expiring products
- confirm summary still reads cleanly on mobile

### Exit Criteria

- summary behavior matches actual product priorities
- summary can later accept location or weather without structural rewrite

## Batch 5: AI and Travel Framing Cleanup

### Goal

Clarify what the AI and travel features are for within the cabinet-first model.

### Intended Product Outcome

- AI feels like inventory-aware guidance
- travel feels like packing from owned products

### Likely Files

- `src/App.tsx`
- `src/api.ts`
- `server.ts`

### Concrete Changes

- tighten prompt suggestions and explanatory copy
- improve empty-state handling when inventory is too small
- clarify relationship between profile data and recommendation quality
- optionally adjust API prompt wording if current outputs feel too generic

### Verification

- test AI query with current demo inventory
- test travel suggestion with different durations
- confirm failure paths still show safe fallback messages

### Exit Criteria

- AI and travel are clearly supporting the cabinet loop
- outputs feel aligned with the product, not generic assistant behavior

## Batch 6: Structure Extraction Before UI Polish

### Goal

Reduce `src/App.tsx` complexity enough that later UI work is safe and faster.

### Intended Product Outcome

- screen logic becomes easier to change
- UI refinement no longer requires editing one giant file

### Likely Files

- `src/App.tsx`
- new home-related components
- new prompt or profile components

### Concrete Changes

- extract home summary
- extract empty home state
- extract account prompt placeholder
- extract progressive profile UI

### Verification

- run lint
- run build
- click through core flows manually

### Exit Criteria

- `App.tsx` is materially smaller and easier to reason about
- later design iteration can target components instead of one monolith

## Deferred Batches

These should not be mixed into the current functional adjustment unless explicitly approved later.

### Deferred A: Real Auth

- Google sign-in
- Apple sign-in
- account linking
- saved session handling

### Deferred B: Persistence

- local storage state survival
- backend user inventory storage
- profile persistence

### Deferred C: Real Context Signals

- location permission flow
- weather API integration
- daily climate-aware recommendation logic

### Deferred D: Full Visual Redesign

- refined material system
- full token pass
- motion polish
- final card and typography system

## Recommended Code Order

When implementation starts, the safest order is:

1. Batch 1
2. Batch 2
3. Batch 3
4. Batch 4
5. Batch 5
6. Batch 6

Reason:

- Batch 1 fixes the most visible product confusion
- Batch 2 locks the onboarding philosophy
- Batch 3 and 4 shape the recommendation logic surface
- Batch 5 clarifies support features
- Batch 6 prepares the codebase for deeper UI work

## Suggested Verification Routine Per Batch

After each batch:

1. run `npm run lint`
2. run `npm run build`
3. manually verify:
   - first open
   - scan entry
   - add-date confirmation
   - return to home
   - AI flow
   - travel flow

If a batch changes AI prompt behavior, also verify:

- safe failure states
- empty or partial profile behavior
- low-inventory behavior

## What Should Happen Next

Do not start broad refactors and design polish together.
The next implementation turn should likely begin with `Batch 1: Home State Split`.
