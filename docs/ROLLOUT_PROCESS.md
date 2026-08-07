# Rollout Process — How We Redesign a Page

> The repeatable loop for taking a page from its current state to the
> finished redesign. It was run implicitly for the homepage and the solutions
> pages before being written down here; this doc makes it reusable so nothing
> gets lost between pages again.
>
> **Reference-agnostic.** The reference site has changed over the project;
> the current one is **Routable**. The steps below have not.
>
> **Rules and per-page status live elsewhere.**
> - Design rules → `docs/PROJECT_STATE.md` §2 (single source of truth)
> - Per-page application status → `docs/PROJECT_STATE.md` §4
> - Session history → `docs/CHANGELOG.md`

---

## The loop, per page

### 1. Scaffold — structure and mechanic, not styling
Clone each section's **layout and interaction** from the current reference
site, keeping **Sognos copy and Sognos assets**. Get the structure and the
mechanic right; do **not** polish yet. Scaffold-stage deviations from the
design system are allowed and expected — they get resolved in the Pass step.

Governing principle, from the original homepage session:
> "We will come back and refine each section styling once scaffold is complete."

Before touching any page, present a **reference → Sognos section mapping
table** and get it approved — ask, don't guess.

### 2. Approve — eyeball each section live
The user reviews each scaffolded section in the browser (`localhost`) and
either confirms or corrects it. Corrections are small and specific (spacing,
alignment, copy choice). Nothing moves on until the section is approved.

### 3. Pass — token and consistency normalisation
Once scaffolded and approved, apply the design rules from
`PROJECT_STATE.md` §2 to every section — paying particular attention to
**pre-existing components** that predate the scaffold process and were never
token-checked.

Freshly scaffolded sections should already carry correct tokens by
construction; the Pass confirms that and corrects any drift.

The Pass is **interactive and advisory** — never silent:
- **State what was found** — e.g. "This h3 is `text-lg` but the design system
  specifies `text-xl md:text-2xl font-medium` for sub-section H3s"
- **Make a clear recommendation** — what it should change to and why
- **Ask before applying** — confirm before making the change
- **Share an opinion** — if something looks wrong even if it technically
  passes, say so

If a Routable reference is supplied for a specific section during the Pass,
match the heading size, text size, and card padding shown there — then map
onto Sognos tokens, never arbitrary values.

**What the Pass does NOT do:** change copy or assets, add new components, or
start styling polish — that is Refine.

### 4. Refine — full front-end polish
Once the whole page has passed, apply the finishing layer: real imagery,
real video, Framer Motion animation refinement, final colour and surface
decisions. This is the step that turns a structurally correct page into
shipping design.

### 5. Roll out — repeat on the next page
Move to the next page family and run the same loop. Lead with a
**reference → Sognos section mapping table** the user approves first, then
scaffold → approve → pass → refine. The page order and its reasoning live
in `CLAUDE.md`.

---

## Rules that hold across every step

- **Mapping-table-first on each new page.** Before touching a page, present
  the reference → Sognos section mapping and get it approved.
- **Reuse before invent.** Check what already exists in
  `components/layout/sections/*` and `components/ui/*` before building
  anything new. If a pattern isn't there and the task is more than a trivial
  variant, ask before adding.
- **Sognos copy and assets always.** The reference gives structure and
  mechanic only; its branding/imagery never ships.
- **Verify without building per edit.** `npx tsc --noEmit` and a live DOM
  check; a full `npm run build` at batch boundaries, not per section.
- **Record as you go.** Append `docs/CHANGELOG.md` and update
  `docs/PROJECT_STATE.md` §4 (application status) at the end of each batch.

---

## Standing rule — Pass is a design discussion, not a token checklist

During the Pass stage, Claude must go beyond verifying values against the
design rules table in `PROJECT_STATE.md` §2. The point of Pass is to make
the page actually look right — consistent, well-weighted, that clean SaaS
feel — not just technically compliant.

Think of it as the site without the paint: Scaffold and Pass get the bones
and proportions right. Refine is where the colour goes on. Pass must make
sure the structure is sound before that happens.

This means:
- If something matches the documented token but still looks wrong (a heading
  reads too large, spacing feels heavy, hierarchy feels off), say so.
  Passing the token check is not the same as passing the eye test.
- If the user asks for a specific size or value (e.g. from a screenshot or a
  reference), and it would break consistency, read poorly, or clash with
  what is used elsewhere, push back and explain why before applying it.
  This is a discussion, not a rubber stamp.
- Share an opinion even when not asked directly. If a section technically
  passes every rule but still feels off, flag it anyway.
- The end goal of every Pass is a judgment call, made together with the
  user, about what actually looks right on the page. Token consistency is a
  tool toward that goal, not the goal itself.
