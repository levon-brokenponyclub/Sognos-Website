---
name: sognos-rollout
description: >
  Runs the Sognos site rollout process — Scaffold, Approve, Pass, or Refine —
  on any page or section of the Sognos Next.js 15 / Tailwind v4 codebase.
  Use this skill whenever the user says things like "scaffold the About page",
  "run Pass on Solutions", "do the whole rollout for Industries", "Refine the
  hero", "start the rollout", "do Scaffold then Pass", or any combination of
  stage names and page/section targets. Also triggers on "run the rollout
  process", "what stage is X on", or "update the rollout status table".
---

# Sognos Rollout Skill

Four-stage process for building and polishing pages on the Sognos site.
Each stage can be run individually or chained.

**Always read `docs/ROLLOUT_PROCESS.md` in full before starting any stage.**
It is the single authoritative source for design tokens, global defaults,
known violations, open conflicts, and standing rules. Never rely on memory
for token values — the doc was extracted from the live codebase and is
the only source of truth.

---

## Quick reference — stage purposes

| Stage | What it does | Output |
|---|---|---|
| **Scaffold** | Clone layout/mechanics from Routable reference; Sognos copy/assets; mapping table first | Working page skeleton, token-correct by construction |
| **Approve** | Eyeball in Dia, catch anything wrong before going further | Verbal sign-off or correction list |
| **Pass** | Normalize against global defaults; section-by-section design conversation | Clean, consistent, well-weighted page before paint |
| **Refine** | Full polish — imagery, motion, colour, final feel | Finished page |

---

## How to invoke

- "Scaffold the About page" → run Scaffold only on About
- "Pass on Solutions" → run Pass only on Solutions
- "Do Scaffold then Pass on Industries" → run both in sequence, stop after Pass
- "Do the whole thing on Knowledge Hub" → run all four stages in sequence
- "What stage is About on?" → read the status table in `docs/ROLLOUT_PROCESS.md` and report

**When chaining stages**, complete each stage fully and notify the user before
moving to the next. Never silently skip ahead.

---

## Before starting any stage

1. Read `docs/ROLLOUT_PROCESS.md` in full
2. Read `docs/COMPONENT_INVENTORY.md` — reuse before inventing
3. Confirm the target page file(s) exist

---

## Stage instructions

### SCAFFOLD
Full instructions → `references/scaffold.md`

Summary: mapping table first → clone structure/mechanics from Routable →
apply Global Layout Defaults on the way in → `npx tsc --noEmit` → notify and stop.

### APPROVE
Full instructions → `references/approve.md`

Summary: user-driven eyeball in Dia → apply any corrections → confirm before
moving to Pass.

### PASS
Full instructions → `references/pass.md`

Summary: section by section — fix mechanical tokens immediately, report what
changed, share an opinion, open the floor ("what are you thinking? any
references?"), respond to direction, make a call together, move to next section.

**Pass is a design discussion, not a token checklist.** If something matches
the token but looks wrong, say so. Push back if a requested value will break
consistency or read poorly. Have an opinion. The goal is a page that looks
right — that clean SaaS feel — not one that just checks out mechanically.
Think: site without the paint. Bones and proportions must be right before
Refine goes on.

### REFINE
Full instructions → `references/refine.md`

Summary: full polish — imagery, motion, colour, final visual feel. Operates
on an already-Passed page. Do not re-litigate token decisions.

---

## Standing rules (all stages)

- **No automatic builds** — never run `npm run build` or `npm run dev`.
  `npx tsc --noEmit` for type-checking only. If a full build is genuinely
  needed, ask first.
- **Verify without building per edit** — `npx tsc --noEmit` + live DOM check
  per section; a full build only at batch boundaries, and only if asked.
- **No screenshots** — verify via DOM/rendered HTML.
- **Reuse before inventing** — check `docs/COMPONENT_INVENTORY.md` first.
- **Record as you go** — append to `docs/CHANGELOG.md`, update
  `docs/PROJECT_STATE.md` and the status table in `docs/ROLLOUT_PROCESS.md`
  at the end of each stage.
- **Matching a supplied reference** — open it directly, extract real values,
  map to Sognos tokens. Never copy raw values verbatim. Report the mapping.
- **Dev tools** — never ask the user to open dev tools. Use whatever is
  available; flag uncertainty; confirm after applying.
- **Known conflicts** — do not resolve the Industries H2 `font-normal` conflict,
  the AnimatedEyebrow `font-normal` default, or other flagged open items
  unilaterally. Surface them and get a call from the user.

---

## Status table (mirror of `docs/ROLLOUT_PROCESS.md`)

| Page family | Scaffold | Approve | Pass | Refine | Notes |
|---|---|---|---|---|---|
| Homepage | ✅ done | ✅ done | ✅ done | in progress | Some sections predate the current Routable reference |
| Product | ✅ done | ✅ done | ✅ done | in progress | |
| Solutions `[slug]` | ✅ done | ✅ done | ⚠️ outstanding | ⚠️ outstanding | Pre-scaffold `rounded-xl`/`shadow-md` present; Pass required before Refine |
| About | ✅ done | ✅ done | ⚠️ outstanding | — | Section padding not corrected; Pass required |
| Knowledge Hub | in progress | — | — | — | |
| Customer Stories | in progress | — | — | — | |
| Industries `[slug]` | in progress | — | — | — | |

After completing any stage, update the real status table in `docs/ROLLOUT_PROCESS.md`
(this copy in the skill is for quick reference only — do not edit it here).

---

## Reference files

- `references/scaffold.md` — full Scaffold instructions + real token values + known violations
- `references/pass.md` — full Pass instructions + section loop + known open conflicts
- `references/refine.md` — full Refine instructions
- `references/approve.md` — Approve checklist
