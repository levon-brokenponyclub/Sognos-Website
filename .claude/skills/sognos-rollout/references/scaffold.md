# Scaffold — Full Instructions

## Purpose
Clone the layout, proportions, spacing, and interactions from the Routable
reference site (https://www.routable.com). Sognos copy and assets always ship.
The output is a structurally correct, token-compliant page skeleton — no paint yet.

---

## Step 0 — Read first
- `docs/ROLLOUT_PROCESS.md` — Global Layout Defaults (authoritative, extracted
  from live codebase — do not use remembered or assumed values)
- `docs/COMPONENT_INVENTORY.md` — what already exists (reuse before inventing)
- `CLAUDE.md` — page rollout order and any page-specific notes

---

## Step 1 — Build a mapping table
Before writing a single line of code, produce this table and share it with the
user. Wait for confirmation before proceeding.

| Routable section | Sognos equivalent | Layout notes | Motion notes | Components to reuse |
|---|---|---|---|---|
| [section name] | [Sognos section name] | [padding/grid/gap] | [animation] | [component names] |

Extract real values from Routable by inspecting the live page directly.
Never guess from memory.

---

## Step 2 — Scaffold the page

Apply the Global Layout Defaults from `docs/ROLLOUT_PROCESS.md` on the way in.
Key values as of last extraction (always defer to the doc if in doubt):

- **Container:** `mx-auto max-w-7xl px-6`
- **Section rhythm:** `py-20 md:py-28` (heroes add `pt-32`/`pt-40` for navbar clearance — expected)
- **Hero/intro two-column gap:** `gap-12 lg:gap-10`
- **Card/feature grid gap:** `gap-3 lg:gap-4`
- **Hero H1:** `font-heading font-normal text-5xl md:text-6xl lg:text-7xl`
- **Section H2 (standard):** `font-heading text-3xl font-medium tracking-tight md:text-4xl`
- **Section H2 (statement — HeadlineCTA, SolutionsSection):** `font-heading text-3xl font-medium tracking-tight md:text-5xl`
- **Eyebrow:** `text-xs font-semibold uppercase tracking-widest` via AnimatedEyebrow component
- **Body measure:** `max-w-2xl` body / `max-w-3xl` hero sub
- **Light surface:** `bg-sognos-tint` or `bg-white` (both valid — alternate sections)
- **Dark surface:** `bg-sognos-navy` default
- **Border radius — surfaces:** `rounded-lg` only — never `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- **Border radius — buttons:** `rounded-full` only
- **Shadow:** none, ever — separate with borders and tonal steps
- **CTA label:** "Book a Demo"
- **Server Components by default** — `"use client"` only where interaction or motion demands it

### Known open violations (do not propagate into new scaffold work)
- `rounded-[50px]` on homepage Hero.tsx / HeadlineCTA.tsx hover-fill circles
- `rounded-xl` on sognoscare/Problems.tsx capability card
- `rounded-sm` on the homepage "Book a Demo" button itself (Hero.tsx, HeadlineCTA.tsx)
- `shadow-2xl shadow-black/30` on industries/IndustryHowTabs.tsx

### Open conflicts (flag, do not resolve without user input)
- **Industries H2:** uses `font-normal` instead of `font-medium` — intentional or drift? Needs a call.
- **AnimatedEyebrow component:** defaults to `font-normal`, not `font-semibold` — under-weighted relative to the global default. Recommend fixing the component default, but blast radius is sitewide — needs explicit go-ahead.
- **Industries "Book a Demo" CTA:** no local CTA found in scanned files — may be covered by global Navbar/CTABand, but worth confirming it's not a gap.

---

## Step 3 — Type check
Run `npx tsc --noEmit` and fix any errors. Do not start a dev server.

---

## Step 4 — Notify and stop
Tell the user the Scaffold is complete. List the files created/modified.
Append to `docs/CHANGELOG.md` and update the status table in `docs/ROLLOUT_PROCESS.md`.
Stop — do not proceed to Approve automatically. Do not run `npm run build` or `npm run dev`.
