# GuiGui — Status

## ▲ Current

## 2026-07-06 | Batch 1 complete, repo prepared for parallel UI + product work

Done this session:

- implemented `Batch 1: Home State Split`
- split home behavior into:
  - `empty cabinet`
  - `returning user`
- kept `scan` as the clearest action in both states
- added lightweight returning-home summary behavior
- verified the main non-auth MVP flows with local smoke testing
- updated repo docs for branch-based collaboration and push discipline

Current behavior state:

- returning users land on summary + cabinet
- empty users land on a dedicated empty-cabinet home
- explore can still add a product with opened-date confirmation
- adding from explore returns the user to cabinet
- UI is now stable enough for a parallel visual pass

Smoke test status:

- `npm run lint` passed
- `npm run build` passed
- manual preview validation passed for:
  - returning home render
  - `home -> scan -> back -> home`
  - `explore -> add-date -> cabinet`
  - `empty cabinet` render
  - `empty -> explore -> add -> returning`

Known limitation:

- full real scan with Gemini was not end-to-end verified in this session
- local preview had no `GEMINI_API_KEY`
- in-app browser preview also had limited camera access

Recommended current split:

1. UI track
   - improve hierarchy, spacing, typography, card styling, motion, and responsive polish
   - preserve Batch 1 behavior contracts
2. product track
   - continue the remaining implementation batches without blocking UI work

Next product batches:

1. `Batch 2: Guest-First Entry Rules`
   - add explicit post-value sign-up prompt timing
   - keep the app usable without login
2. `Batch 3: Progressive Profile Completion`
   - stop assuming the profile is already complete
   - request skin type and sensitivities progressively
3. `Batch 4: Daily Summary Rules`
   - make home summary useful instead of generic
   - prioritize expiry and today-relevant guidance
4. `Batch 5: AI and Travel Framing Cleanup`
   - make AI and travel more cabinet-aware
   - improve empty or low-inventory handling
5. `Batch 6: Structure Extraction Before UI Polish`
   - reduce `src/App.tsx` complexity
   - extract safer seams for later UI and feature work

Collaboration note:

- collaborators should branch off `main`
- do not develop directly on `main`
- UI-only work should use `ui/...` branches and preserve Batch 1 flow behavior

## ■ Milestones

- `Batch 1: Home State Split` complete

## ▼ Archive

## 2026-07-06 | Locked product direction and prepared MVP execution docs

Done in that phase:

- locked `guest-first`, `cabinet-first`, and new-user vs returning-user direction
- wrote the functional adjustment spec
- wrote the batch implementation plan
- prepared the next-agent handoff for Batch 1 execution
