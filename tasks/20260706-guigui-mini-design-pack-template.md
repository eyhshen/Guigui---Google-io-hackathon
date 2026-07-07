# GuiGui Mini Design Pack Template

## Purpose

This document is the working template for the next design pass of `GuiGui`.
It is intentionally lighter than a full design deck.
The goal is to produce enough direction and structure to guide UI work and later development without over-designing the product before core flows are stabilized.

## Project Positioning

### Product Definition

`GuiGui` is a cabinet-first AI skincare companion for people who already own skincare products and want help using them with more confidence and less friction.
It helps users:

- scan and identify products quickly
- organize what they already own in one cabinet view
- understand expiry, opened-date, and routine context
- ask lightweight AI questions about fit, layering, and conflicts
- generate practical routine or travel suggestions based on existing products first

The first value should come before account creation.
Users should be able to open the app, scan a product, add it to the cabinet, and understand what the product is for before being asked to register.

This is not:

- a login-first utility
- a clinical skin diagnosis app
- a beauty ecommerce storefront
- a content-heavy social app

### Product Journey Priority

The product should prioritize this flow:

1. Open app
2. Understand the main action immediately
3. Scan or add a product
4. See it placed into the cabinet
5. Get useful context such as expiry, suitability, or routine relevance
6. Only then invite the user to create an account for saving, syncing, reminders, and personalized recommendations

The main product loops in phase one are:

- cabinet management
- product scan and input
- AI skincare questions
- routine and travel suggestions

### Product Feeling

The product should feel:

- calm and breathable
- translucent but readable
- premium but approachable
- softly intelligent
- tidy, feminine, and modern
- immediately usable without explanation

The product should not feel:

- cyberpunk
- dashboard-heavy
- medical
- over-decorated
- loud or neon
- complicated on first open
- gated before value is shown

## Design Direction

### One-Sentence Aesthetic Definition

`A soft premium skincare companion with misty layered surfaces, warm light, spacious typography, and quiet AI guidance.`

### Entry Strategy

The app should use a guest-first experience in the first pass.

- Do not force Google or Apple login before the user can try the core flow
- Let first-time users access basic scan and cabinet functions immediately
- Ask for sign-up only after the user has experienced value
- Use account creation as a save-and-personalize step, not as a gate

Sign-up prompts should be tied to clear benefits such as:

- saving the cabinet
- syncing across devices
- enabling expiry reminders
- storing skin type and allergy preferences
- improving AI and travel recommendations

### Reference Translation

Based on the images in `assets/App Design Ref/`, the visual language should be translated into the app as:

- frosted and misty surfaces, not hard solid cards
- milk-white or warm off-white base layers
- low-saturation gradients in butter yellow, powder blue, blush pink, pale green
- large rounded corners
- soft shadows with low contrast
- generous whitespace
- large, calm headlines
- restrained icon usage

### Home Screen Logic

The home screen should change emphasis based on user state.

For new users with an empty cabinet:

- the primary focus is one obvious scan or add action
- the cabinet area can appear as a light empty-stage or shelf preview
- do not overload the screen with summary information before there is data

For returning users with products already added:

- the primary focus becomes a light daily summary plus the cabinet view
- surface only the most useful context such as weather, routine guidance, and expiry alerts
- keep scan or add available as a persistent primary action

The home screen should not feel like a dense dashboard.
It should feel like a calm control center with one clear next step.

### Material Rules

- Use translucency as an accent, not everywhere
- Keep text surfaces more opaque than decorative surfaces
- Favor soft edge definition with light borders
- Use blur to separate layers, not as a gimmick
- Avoid heavy glass effects behind long text blocks

### Typography Rules

- Headings: large, clean, modern, minimal
- Body: highly readable, light and calm
- Chinese and English should feel balanced
- Keep line length short on mobile
- Prefer visual rhythm over density

### Suggested Type Tone

- Heading tone: modern, friendly, premium
- Body tone: neutral, readable, soft
- Labels and metadata: light but still crisp

## Deliverables

This mini design pack should contain exactly these five sections.

### 1. Design Brief

One page only.

Include:

- product definition
- guest-first onboarding strategy
- new-user versus returning-user home logic
- target emotional tone
- user goal priority
- what this app is not
- visual risks to avoid
- when and why sign-up should appear

### 2. Visual Direction Board

One page only.

Include:

- 6 to 10 reference crops from `assets/App Design Ref/`
- 3 to 5 texture or material keywords
- 3 to 5 typography keywords
- 1 color atmosphere statement
- 1 short explanation of the intended visual language

### 3. Key Screen Mockups

Create 4 key screens only.
These should be the most important product moments, not every screen in the app.

The four screens should reflect the phase-one product loops:

- Home / My Cabinet
- Scan
- AI Advisor
- Routine / Travel

### 4. Light UI Spec

One page only.

Include:

- color tokens
- spacing scale
- radius scale
- shadow and blur rules
- typography scale
- button styles
- card styles

### 5. Build Notes

One page only.

Include:

- what must be reflected in code
- what can be simplified
- what should be postponed
- mobile implementation cautions

Build notes should explicitly separate:

- what is required for guest-first usage
- what can wait until account creation
- what profile data should be asked later, not on first open

## Key Screens

Design only these four screens in the first pass.

### Screen 1: Home / My Cabinet

#### Role

This is the app control center.
It should answer:

- what I own
- what needs attention
- what I can do next

#### Content Priority

1. top summary
2. scan action
3. category filter
4. cabinet grid
5. expiry warning

#### Desired Feeling

- organized
- breathable
- smart but calm

#### Visual Direction

- translucent summary cards
- soft category pills
- more elegant floating scan CTA
- product cards feel like light shelf objects, not admin tiles

#### Avoid

- dense stats
- heavy borders
- business dashboard layout

### Screen 2: Scan

#### Role

This is the app's key wow moment.
It should make scanning feel magical but simple.

#### Content Priority

1. camera frame
2. primary capture action
3. fallback upload action
4. very short guidance

#### Desired Feeling

- focused
- premium
- confident

#### Visual Direction

- darker translucent overlay to frame the camera view
- clean scan guide region
- glowing or softly elevated main shutter action
- minimal copy, low technical noise

#### Avoid

- industrial scanner look
- too many lines or diagnostics
- aggressive warning UI

### Screen 3: AI Advisor

#### Role

This is the emotional intelligence screen.
It should feel like a skincare companion, not a generic chatbot.

#### Content Priority

1. assistant tone and intro
2. current question
3. AI answer
4. recommended or avoid product chips
5. lightweight prompt suggestions

#### Desired Feeling

- warm
- conversational
- trustworthy

#### Visual Direction

- airy chat layout
- soft assistant anchor visual
- chips that feel like curated suggestion tokens
- recommendation blocks more like soft cards than plain text bubbles

#### Avoid

- generic LLM chat clone
- overly dark input bar
- too much black

### Screen 4: Routine / Travel

#### Role

This is the action layer.
It should turn advice into simple, practical steps.

#### Content Priority

For routine:

1. today's routine summary
2. step sequence
3. product per step

For travel:

1. destination and days
2. compact packing recommendation
3. selected products

#### Desired Feeling

- composed
- practical
- tidy

#### Visual Direction

- timeline or checklist feeling
- compact cards
- lower emotional drama than AI screen
- clearer utilitarian structure

#### Avoid

- combining too many concepts on one page
- long explanation-heavy layout

## Suggested Token Starter

These are not final values.
They are a starting point for design alignment.

### Color Roles

- `bg-base`: warm milk white
- `bg-surface`: soft off-white
- `bg-glass`: translucent white
- `text-primary`: soft charcoal
- `text-secondary`: muted warm gray
- `accent-lavender`: low-saturation lavender
- `accent-blue`: mist blue
- `accent-pink`: blush glow
- `accent-green`: pale skincare green
- `warning`: soft amber
- `danger`: muted rose

### Radius Scale

- small controls: 12px
- pills and chips: 999px
- cards: 20px to 28px
- hero cards: 28px to 32px

### Shadow Rules

- prefer soft spread and low contrast
- avoid hard black drop shadows
- keep layered depth subtle

### Blur Rules

- use blur for hero cards, overlays, and floating controls
- do not blur long reading regions heavily
- keep text contrast stronger than decorative glass

### Typography Scale

- hero title: dominant, high breathing room
- section title: clear and soft
- body copy: mobile-safe readability
- helper text: light but legible

## Systematic Build Process

Use this order.
Do not skip directly from inspiration to coded UI.

### Phase 1: Direction Lock

Output:

- design brief
- visual direction board
- one sentence aesthetic definition

Decision gate:

- confirm the product tone
- confirm the visual language
- confirm what the first-pass screens are

### Phase 2: Key Screen Mockups

Output:

- 4 mobile mockups

Decision gate:

- confirm layout hierarchy
- confirm scan CTA prominence
- confirm cabinet and AI screen feel

### Phase 3: Light UI Spec

Output:

- token page
- components page

Decision gate:

- confirm type scale
- confirm card treatment
- confirm button language

### Phase 4: Dev Handoff Planning

Output:

- component tree
- implementation notes
- phased engineering batch list

Decision gate:

- confirm what is visual-only
- confirm what requires logic refactor
- confirm what is postponed

## Component Tree For Implementation

This is the recommended first-pass component map.

### App Structure

- `AppShell`
- `GradientBackdrop`
- `FloatingTabBar`
- `GlassCard`
- `SectionHeader`

### Home / Cabinet

- `CabinetHomeScreen`
- `CabinetSummaryCard`
- `ExpiryAlertCard`
- `CategoryFilterPills`
- `ProductShelfGrid`
- `ProductShelfCard`

### Scan

- `ScanScreen`
- `CameraFrameOverlay`
- `ScanPrimaryAction`
- `UploadFallbackButton`
- `ScanResultSheet`

### AI Advisor

- `AdvisorScreen`
- `AdvisorIntroCard`
- `ChatMessageList`
- `AdvisorSuggestionChips`
- `VerdictProductTags`
- `AdvisorInputBar`

### Routine / Travel

- `RoutineScreen`
- `RoutineStepList`
- `RoutineStepCard`
- `TravelPlannerForm`
- `TravelResultCard`

### Modals / Sheets

- `ProfileSheet`
- `ProductDetailSheet`
- `AddExploreProductSheet`

## Development Batches

Use these batches after design direction is approved.

### Batch 1: Visual Foundation

Goal:

- establish design tokens
- rebuild page shells
- restyle cards, buttons, pills, and tab bar

Likely files:

- `src/index.css`
- `src/App.tsx`
- new shared UI components under `src/components/`

This batch should not change product logic yet beyond what is needed for layout.

### Batch 2: Screen Decomposition

Goal:

- split the oversized `App.tsx`
- move each tab into its own screen component
- move sheets and overlays into dedicated components

Likely files:

- `src/App.tsx`
- `src/components/*`
- new `src/screens/*`

This batch improves maintainability and makes design iteration faster.

### Batch 3: Interaction Consistency

Goal:

- align profile editing behavior with save/cancel expectations
- improve chat loading and duplicate-send behavior
- replace blocking alerts with inline feedback

Likely files:

- `src/App.tsx`
- `src/api.ts`
- relevant screen components

### Batch 4: Data and Recommendation Correctness

Goal:

- fix expiry-state derivation
- ensure routine recommendations do not use stale product state
- ensure AI requests use trustworthy inventory metadata

Likely files:

- `src/App.tsx`
- `src/types.ts`
- `src/api.ts`

### Batch 5: Scan Reliability

Goal:

- stabilize image format handling
- make upload and camera flows robust on mobile
- improve server-side validation and feedback

Likely files:

- `src/components/Scanner.tsx`
- `src/api.ts`
- `server.ts`

### Batch 6: Environment and Local Run Reliability

Goal:

- align `.env.local` usage with runtime
- improve startup and missing-key error states
- ensure local instructions match actual behavior

Likely files:

- `server.ts`
- `README.md`

## What The Next Design Agent Should Produce

The next design pass should deliver:

1. one-page design brief
2. one-page visual direction board using the current references
3. four mobile key-screen mockups
4. one-page light UI spec
5. one-page engineering handoff notes

## What The Next Development Agent Should Not Do Yet

Until the design direction is approved, do not:

- redesign every screen in code
- add animation-heavy flourishes
- build a full design system
- attempt an iOS app rewrite
- restructure backend architecture beyond immediate reliability fixes

## Review Checklist

Use this before moving from design to implementation.

- Does the app feel like a premium skincare companion rather than a dashboard?
- Is the scan action visually the most important primary action?
- Is translucency helping hierarchy instead of hurting readability?
- Is the AI page warmer and more conversational than the current version?
- Are routine and travel screens more practical than decorative?
- Can engineering implement the first pass without guessing the rules?
