# HANDOFF — GuiGui / 夜虹 design work

> For a fresh Claude Code (terminal) session picking up this work. Read top to
> bottom; it is self-contained. Written 2026-07-06.

## TL;DR — current status

- **Goal of this workstream:** take the GuiGui skincare app's functionality and
  express it in a new dark/iridescent design language called **夜虹 / Night Prism**,
  make every screen presentable/screenshottable, and hand Elaine repeatable
  **prompts** so she can iterate the design in **Claude design** (not in code).
- **Done:** captured the reference mockup as 12 phone-res screenshots; wrote a
  design-system prompt + per-screen page prompts + behavior contracts; committed
  them to the fork on branch `elaine/design-system`; that branch is **already
  PR'd into `Phat-Po/Guigui---Google-io-hackathon:main`** (Elaine opened the PR).
- **Right now:** Elaine is pasting the design-system prompt into Claude design and
  linking the reference mockup as the code example. She will tweak visuals there.
- **Open thread:** whether to also build the two missing screens (Explore /该补什么
  and Travel /出行收纳) into the reference mockup HTML. Not yet done.

## The collaboration setup (important — don't break these)

- Elaine (`eyhshen`) and **Phat-Po** are co-contributors. Workflow is **fork + PR**.
- **Upstream** (the real project): `Phat-Po/Guigui---Google-io-hackathon`.
- **Elaine's fork** (this repo's `origin`): `eyhshen/Guigui---Google-io-hackathon`.
- There is ALSO a **separate** repo `eyhshen/google-io-hackathon` — the original
  Google AI-Studio export where the 夜虹 mockup was first made (with Fable). It is
  NOT a fork of upstream; different git lineage. The mockup was copied from there
  into this fork's `design/reference/`.

### Hard rules (always)
1. **Never** push to upstream `Phat-Po/...` (its push URL is physically disabled).
2. **Never** push to any repo's `main`.
3. Only push to **`origin`** (the fork) on **feature branches** named `elaine/<feature>`.
4. All changes reach upstream `main` via **PR** only.
5. Branch off the latest **`upstream/main`**.
6. Creating a PR from the platform may be denied → give Elaine the **compare link**,
   she clicks it in the browser.
7. **Design/UI lane only** here — do NOT change Batch-1 behavior contracts (below).

## Git state

Remotes in this working copy:
```
origin    → eyhshen/Guigui---Google-io-hackathon  (fetch + push OK)
upstream  → Phat-Po/Guigui---Google-io-hackathon  (fetch OK; push = DISABLED)
```
Branches:
- `elaine/design-system` — the design docs (this handoff was branched from here).
  **Pushed to origin, PR open into Phat-Po.**
- `elaine/handoff` — this HANDOFF.md (kept off the PR branch on purpose).
- `elaine/fork-pr-workflow` — pre-existing, adds CONTRIBUTING.md (can ignore).
- `elaine/fable-mockup` — lives in the OTHER repo `eyhshen/google-io-hackathon`,
  holds the original mockup (`shelfie/app.html`) + planning docs.

Upstream `main` is still just the 3 original commits — **Batch 1 (PR #3) is NOT
merged yet**. So base new branches on `upstream/main` and expect Batch-1 code to
arrive later.

## Batch-1 behavior contracts (must preserve — from Phat-Po's handoff / PR #3)

1. Empty users see a **dedicated empty-cabinet home** (not a returning home with an
   empty list).
2. Returning users see **summary + cabinet**.
3. **Scan stays the main action.**
4. **Add-date stays inside the add flow** (`scan→recognized→add-date`,
   `explore→add-date`). Never add a product without capturing opened date.

Full text: `design/BEHAVIOR_CONTRACTS.md`.

## The 夜虹 / Night Prism design language (one paragraph)

Dark premium skincare UI. Ground `#16141F`; glass surfaces `rgba(255,255,255,.05–.08)`
with hairline borders. ONE accent — the **prism gradient**
`linear-gradient(100deg,#F5C0CB,#F7DDB2 30%,#BEEBD1 60%,#B4D6F5 85%,#D3BDF2)` —
used only on primary CTAs, one emphasized heading word (background-clip:text),
progress fills, and glows. Semantic colors: mint=use, rose=skip/safety, amber=expiry,
blue=info, lilac=treatment. Thin (weight-200) wide-tracked display headings + tiny
uppercase English eyebrows. Ambient blurred "prism beams" + film-grain overlay.
Warm plain-spoken Chinese, non-medical, evidence-tagged advice.

## Files created this session (all on `elaine/design-system` / `elaine/handoff`)

```
design/
├── README.md                      how to use these in Claude design + guardrails
├── DESIGN_SYSTEM.md               ★ STEP-1 prompt: builds the reusable 夜虹 system
├── PAGE_PROMPTS.md                ★ STEP-2 prompts: one per screen (11 screens)
├── BEHAVIOR_CONTRACTS.md          Batch-1 contracts to preserve
└── reference/
    ├── night-prism.app.html       the working mockup the system was distilled from
    └── screens/                   12 phone-res screenshots (393×852 @2×), demo order
        ├── 01-onboarding-intro.png … 05-onboarding-done.png
        ├── 06-home-shelf.png
        ├── 07-rec-intro.png · 08-rec-redness.png · 09-rec-acne.png
        ├── 10-scan-viewfinder.png · 11-scan-recognized.png
        └── 12-product-sheet.png
HANDOFF.md                         this file
```

The **paste-ready design-system prompt** is the fenced block inside
`design/DESIGN_SYSTEM.md` (under "## Prompt to paste"). The per-screen prompts are
the fenced blocks in `design/PAGE_PROMPTS.md`.

## Claude design workflow (what Elaine is doing)

1. In Claude design's setup form: Company = "Guigui"; paste the design-system prompt
   into "Any other notes?".
2. **Link code = the single reference file only.** On her Mac:
   `…/google-io-hackathon/shelfie/app.html` (identical to
   `design/reference/night-prism.app.html`). Do NOT link the whole fork — its `src/`
   is the OLD warm-stone GuiGui design and will muddy the system. (Elaine considered
   deleting `src/` to avoid this — advised against it; `src/` is the real app and
   deleting it breaks the build + would wreck the PR. Selecting one file solves it.)
3. Skip .fig (none) and fonts (system fonts).
4. Then paste page prompts from `PAGE_PROMPTS.md` per screen.

## Open threads / possible next steps

- [ ] **Build Explore /该补什么 + Travel /出行收纳 into `design/reference/night-prism.app.html`**
      in the 夜虹 style (they exist in GuiGui `main` but not in the mockup), wire into
      nav, then re-screenshot. Prompts for both already exist in `PAGE_PROMPTS.md`.
- [ ] Optionally commit `DESIGN_SYSTEM.md` etc. is done; could also add the design
      language doc to upstream via the existing PR.
- [ ] If asked to watch the Phat-Po PR: this session's GitHub scope is limited to the
      two `eyhshen` repos, so the Phat-Po PR can't be monitored from here — add the
      repo to scope or have Elaine paste CI/review output.

## Environment notes (for re-running the screenshots)

- We are in a cloud sandbox: **no access to Elaine's LAN or Mac filesystem**
  (`192.168.0.50`, `/Users/...` are unreachable). That's why the mockup had to be
  pushed to GitHub and pulled here.
- Screenshots were made with headless Chromium via Playwright:
  - `playwright-core` installed in the session scratchpad (not the repo).
  - Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
  - Script: `scratchpad/shots.js` — loads the mockup `file://`, drives each screen
    via `page.evaluate`, captures at 393×852 @2× with `reducedMotion:'reduce'`
    (so the fade-up reveals render fully and beams freeze).
  - CJK renders via WenQuanYi Zen Hei (no ultra-thin weight, so weight-200 headings
    look slightly heavier than on a real iPhone/PingFang).
  - NOTE: scratchpad is session-local and may not exist in a new session; re-create
    `shots.js` from `design/reference/night-prism.app.html` if you need to recapture.

## Quick orientation commands

```bash
git fetch origin && git checkout elaine/design-system   # the design docs
ls design/ design/reference/screens/
git remote -v                                            # confirm origin/upstream + disabled push
git log --oneline -5 upstream/main                       # confirm Batch-1 not merged yet
```
