# Rollout Process — How We Redesign a Page

> The repeatable loop for taking a page from its current state to the finished
> redesign. It was run implicitly for the homepage and the solutions pages
> before being written down here; this doc makes it reusable so nothing gets
> lost between pages again.
>
> **Reference note:** the loop is reference-agnostic. The *reference site* has
> changed over the project; the current one is **Routable**. The steps below
> have not.

---

## The loop, per page

### 1. Scaffold — structure and mechanic, not styling

Clone each section's **layout and interaction** from the current reference site,
keeping **Sognos copy and Sognos assets**. Get the structure and the mechanic
right; do **not** polish yet. Scaffold-stage deviations from the design system
are allowed and expected — they get resolved in the Refine step.

Governing principle, from the original homepage session:

> "We will come back and refine each section styling once scaffold is complete."

Work **section by section**, not whole-page-at-once. For each section the user
supplies the reference→Sognos mapping (or approves a proposed one) — **ask,
don't guess.**

### 2. Approve — eyeball each section live

The user reviews each scaffolded section in the browser (Dia, `localhost`) and
either confirms or corrects it before the next section starts. Corrections are
small and specific (spacing, alignment, copy choice). Nothing moves on until the
section is approved.

### 3. Refine — styling pass onto the real design system

Once the whole page is scaffolded and approved, go back **section by section**
and do the styling polish: replace every scaffold-stage deviation with the live
design system (radii, surfaces, type scale, real imagery, tokens). This is the
step that turns a structural clone into shipping design.

### 4. Roll out — repeat on the next page

Move to the next page family and run the same loop. Lead with a
**reference-section → Sognos-section mapping table the user approves first**,
then scaffold → approve → refine. The page order and its reasoning live in
`CLAUDE.md`.

---

## Rules that hold across every step

- **Mapping-table-first on each new page.** Before touching a page, present the
  reference→Sognos section mapping and get it approved.
- **Reuse before invent.** Check `docs/COMPONENT_INVENTORY.md` before building
  anything new.
- **Sognos copy and assets always.** The reference gives structure and mechanic
  only; its branding/imagery never ships.
- **Verify without building per edit.** `npx tsc --noEmit` and a live DOM check;
  a full `npm run build` at batch boundaries, not per section.
- **Record as you go.** Append `docs/CHANGELOG.md` and update
  `docs/PROJECT_STATE.md` at the end of each batch.

---

## Where this has been applied

| Page family | Scaffold | Approve | Refine | Notes |
|---|---|---|---|---|
| Homepage | done | done | in progress | Refine still in progress; some sections predate the current Routable reference. |
| Solutions `[slug]` | done | done | **outstanding** | An earlier mapping is archived; a fresh Routable mapping is needed. Still on pre-scaffold `rounded-xl`/`shadow-md`. |
| About | done | done | done | Rebuilt directly on Routable (2026-08-05). |

Other page families follow the `CLAUDE.md` roll-out order.
