# 夜虹 / Night Prism — Design Source of Truth

This folder is the canonical home for GuiGui / Shelfie's **夜虹 (Night Prism)**
design language. It exists so the design can be tweaked in **Claude design** with
consistent, repeatable prompts — and so the language itself is version-controlled
and won't drift.

## What's here

| File | What it's for |
|---|---|
| `DESIGN_SYSTEM.md` | **Step 1.** Paste into Claude design to build the reusable design system (tokens, type, components, motion). |
| `PAGE_PROMPTS.md` | **Step 2.** One paste-ready prompt per screen, built on the system. |
| `BEHAVIOR_CONTRACTS.md` | Batch-1 behaviors the design lane must preserve. |
| `reference/night-prism.app.html` | The shipped reference mockup — a complete, working single-file prototype the system was distilled from. Open it in a browser to click through. |
| `reference/screens/*.png` | 12 screenshots of that mockup at phone resolution (393×852 @2×), the demo flow in order. |

## Workflow in Claude design

1. Paste **all of `DESIGN_SYSTEM.md`** first → get the reusable 夜虹 system.
2. Then paste any block from **`PAGE_PROMPTS.md`** → generate that screen in the system.
3. Tweak visually in Claude design. When a change is worth keeping, fold it back
   into these prompts (or the reference file) so this folder stays the source of truth.

## Guardrails (collaboration)

- Design/UI work happens **on a branch**, never on `main`; it reaches `main` via PR.
- Do not break anything in `BEHAVIOR_CONTRACTS.md`.
- Fork/PR flow: branch off latest `upstream/main` on the fork
  (`eyhshen/Guigui---Google-io-hackathon`), PR into `Phat-Po/Guigui---Google-io-hackathon:main`.

## Fidelity note

The reference screenshots were rendered with the WenQuanYi CJK font (no ultra-thin
weight), so the thin (weight-200) prism headings look slightly heavier than they do
on a real iPhone with PingFang SC. On device, and in Claude design, they read more
delicate — that is the intended look.
