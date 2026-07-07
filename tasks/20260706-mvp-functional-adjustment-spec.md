# GuiGui MVP Functional Adjustment Spec

## Purpose

This document defines how the current MVP should behave before deeper UI refinement.
It exists to separate product logic decisions from visual design decisions.

Use this document to answer:

- what the MVP should do on first open
- what changes for new versus returning users
- what functions are available without login
- when sign-up should appear
- what profile and context data should be collected, and when

This document should be read together with:

- `tasks/20260706-guigui-mini-design-pack-template.md`

## Current MVP Baseline

The current app already contains these main flows:

- `Cabinet / Shelf`
- `Scan`
- `AI Advisor`
- `Routine / Travel`

The current MVP also has these practical constraints:

- no auth flow
- no real user persistence
- no real weather or location integration
- no distinction between empty users and returning users
- profile is editable, but treated as already available demo data
- product and UI state are mostly centralized inside `src/App.tsx`

## Product Goal For This Adjustment Pass

The goal of this pass is not to make the app fully production-ready.
The goal is to make the MVP's core behavior coherent and testable.

Success means:

- a first-time user can understand the main action immediately
- a user can get value before being asked to register
- the home experience changes based on whether the cabinet is empty
- profile and context inputs are requested at the right moment, not too early
- the app feels like a cabinet-first skincare companion, not a generic AI tool

## Non-Goals For This Pass

Do not treat these as required in this adjustment pass:

- full Google or Apple sign-in
- cloud sync
- production database integration
- push notifications
- precise real-time weather integration
- advanced recommendation explainability UI
- final polished visual system

## Product Positioning Rule

`GuiGui` is a cabinet-first skincare companion.
Its first value comes from:

1. scanning a product
2. placing it into the cabinet
3. understanding whether and when to use it

It is not a login-first utility.
It is not an ecommerce-first discovery app.
It is not a clinical diagnosis product.

## Core User States

The MVP should support these product states explicitly.

### State A: New User, Empty Cabinet

Definition:

- no saved products yet
- profile may be incomplete
- user has not experienced value yet

Home priority:

- one obvious primary action: scan or add first product
- minimal explanation
- no dense summary

What the user should be able to do:

- open app directly
- scan a product
- manually confirm opened date
- see the product added to the cabinet
- optionally set basic profile later

What should not happen yet:

- forced sign-in wall
- long onboarding questionnaire
- weather or routine summary before there is inventory

### State B: Returning User, Non-Empty Cabinet

Definition:

- at least one product exists in cabinet

Home priority:

- show cabinet as the main asset
- show a light daily summary above or near it
- preserve scan as a persistent action

The summary layer may include:

- expiring products count
- a simple daily recommendation hint
- optional weather-aware routine hint

### State C: Returning User, Personalization Incomplete

Definition:

- user has products
- profile inputs such as skin type, sensitivities, or city are missing or partial

Behavior:

- do not block core cabinet use
- prompt to improve recommendations with progressive completion
- position this as an enhancement, not a requirement

## Entry Strategy

The MVP should use `guest-first` behavior.

### Rules

- user can use the basic app without account creation
- first value must happen before sign-up is requested
- sign-up is presented as save, sync, and personalize
- sign-up should appear only after a meaningful interaction

### Value Moment Definition

A value moment is reached when at least one of these happens:

- the user successfully scans and adds a product
- the user sees a useful cabinet summary
- the user gets an AI recommendation from current inventory
- the user generates a travel or routine suggestion

### Sign-Up Trigger Candidates

The MVP should support one or more of these later prompts:

- after first successful product add: save your cabinet
- before cross-session persistence: create account to keep your shelf
- before reminders: create account to enable alerts
- before deeper personalization: save your skin type and sensitivity profile

In this pass, sign-up can remain a product rule and UI placeholder.
It does not need full auth implementation yet.

## Home Screen Logic

The home screen should behave differently by cabinet state.

### Empty Home

Must show:

- one clear scan or add action
- a simple empty-cabinet visual area
- a short explanation of what happens next

Should avoid:

- too many tabs competing for attention
- detailed counts with no data
- recommendation language before any products exist

### Returning Home

Must show:

- cabinet view
- expiring items if any
- a light summary of what matters today
- persistent scan or add action

Should avoid:

- turning into an analytics dashboard
- surfacing low-value stats
- hiding the add-product action

## Functional Priority By Feature

### 1. Cabinet

This remains the primary feature.

Must support:

- viewing owned products
- basic category filtering
- seeing expiry state
- viewing product detail

Should improve in this pass:

- empty-state behavior
- clearer summary behavior
- stronger role as the app home

### 2. Scan and Add

This is the primary entry action.

Must support:

- photo capture or upload
- AI extraction
- opened-date confirmation
- product insertion into cabinet

Should improve in this pass:

- clearer first-use guidance
- better post-add success state
- stronger transition back into home or cabinet

### 3. AI Advisor

This should be framed as inventory-aware guidance, not open-ended chat.

Must support:

- asking how to use current products
- asking what to avoid for a reported condition

Should improve in this pass:

- stronger prompt suggestions
- clearer relationship to profile data
- optional nudges to complete skin type or sensitivity inputs

### 4. Routine and Travel

This should stay useful but lightweight.

Must support:

- destination and duration input
- AI-selected packing suggestion from owned products

Should improve in this pass:

- clearer separation between daily routine and travel mode
- better explanation of why products were selected

### 5. Explore

Current status:

- present in the MVP
- visually developed
- not central to the cabinet-first strategy

Decision for this pass:

- do not treat Explore as a primary loop
- keep it secondary or consider deprioritizing it in later restructuring

Reason:

At the current MVP stage, discovery is weaker product value than scan, cabinet, AI advice, and travel planning.

## Profile and Context Data Strategy

These inputs matter, but they should not appear as a first-open wall.

### Skin Type

Importance:

- high
- directly affects recommendation trust

Collection timing:

- after first product add
- before or during first AI advice flow

### Sensitivities or Allergens

Importance:

- high
- directly supports cautionary guidance

Collection timing:

- same stage as skin type
- ask as a simple optional input first

### Current Actives

Importance:

- medium to high
- useful for layering advice

Collection timing:

- after first value moment
- can be editable later in profile

### City or Location

Importance:

- medium in this MVP phase
- useful for weather-informed suggestions

Collection timing:

- never on first open
- request only when user wants daily routine recommendations
- if location permission feels too heavy, allow manual city entry first

## Recommended MVP Information Architecture

For this adjustment pass, the product should feel centered on four loops:

1. Home / My Cabinet
2. Scan
3. AI Advisor
4. Routine / Travel

Recommended interpretation:

- `Home / My Cabinet` is the main landing state
- `Scan` is the primary action, not just another tab
- `AI Advisor` is context-aware guidance
- `Routine / Travel` is planning from owned inventory

`Explore` should remain secondary until the core loop is stronger.

## Product Rules To Implement Before Major UI Polish

These are the functional rules that should be true before major visual refinement:

- empty cabinet and returning cabinet states must behave differently
- guest-first usage must be possible
- scan must remain the most obvious entry action
- sign-up must be deferred until after value
- profile completion must be progressive
- home summary must be useful, not decorative

## Open Decisions For Later

These should stay open until the functional pass is implemented and reviewed:

- whether sign-up prompt appears after first add or after second value moment
- whether weather is mock-only or partially real in MVP
- whether Explore stays in bottom navigation
- whether skin profile lives in modal, sheet, or dedicated setup flow

## Recommended Next Artifact

After this document, implementation should follow a batch plan, not ad hoc edits.
See:

- `tasks/20260706-mvp-implementation-batches.md`
