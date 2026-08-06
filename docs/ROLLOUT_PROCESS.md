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
are allowed and expected — they get resolved in the Pass step.

Governing principle, from the original homepage session:
> "We will come back and refine each section styling once scaffold is complete."

Before touching any page, present a **reference → Sognos section mapping table**
and get it approved — ask, don't guess.

### 2. Approve — eyeball each section live
The user reviews each scaffolded section in the browser (`localhost`) and either
confirms or corrects it. Corrections are small and specific (spacing, alignment,
copy choice). Nothing moves on until the section is approved.

### 3. Pass — token and consistency normalisation
Once scaffolded and approved, apply the **Global Layout Defaults** (below) to
every section — paying particular attention to **pre-existing components** that
predate the scaffold process and were never token-checked.

Freshly scaffolded sections should already carry correct tokens by construction;
the Pass confirms that and corrects any drift.

The Pass is **interactive and advisory** — never silent:
- **State what was found** — e.g. "This h3 is `text-lg` but the design system
  specifies `text-xl font-medium` for card headings"
- **Make a clear recommendation** — what it should change to and why
- **Ask before applying** — confirm before making the change
- **Share an opinion** — if something looks wrong even if it technically passes,
  say so

If a Routable reference is supplied for a specific section during the Pass,
match the heading size, text size, and card padding shown there — then map onto
Sognos tokens, never arbitrary values.

**What the Pass does NOT do:** change copy or assets, add new components, or
start styling polish — that is Refine.

### 4. Refine — full front-end polish
Once the whole page has passed, apply the finishing layer: real imagery, real
video, Framer Motion animation refinement, final colour and surface decisions.
This is the step that turns a structurally correct page into shipping design.

### 5. Roll out — repeat on the next page
Move to the next page family and run the same loop. Lead with a
**reference → Sognos section mapping table** the user approves first, then
scaffold → approve → pass → refine. The page order and its reasoning live in
`CLAUDE.md`.

---

## Global Layout Defaults
> Single source of truth for the Pass step. Extracted 2026-08-06 by scanning
> the homepage, products (SognosCare), solutions `[slug]`, industries
> `[slug]`, and contact page families — 28 files, entry points plus one level
> of imports. A value counts as a **global default** only where it is verified
> identical across 2+ of those families; everything else here is marked as a
> local pattern, an open conflict, or not present in the scanned scope. See
> `docs/CHANGELOG.md` (2026-08-06) for the full findings report this table was
> built from.

### Layout
| Property | Value | Evidence |
|---|---|---|
| Container | `mx-auto max-w-7xl px-6` | All 5 families. |
| Section vertical rhythm | `py-20 md:py-28` | 4 of 5 families (contact is a compact form layout and doesn't use it — not a violation). Heroes add extra `pt-32`/`pt-40` for fixed-navbar clearance; that's a standing exception, not drift. |
| Grid / flex gap — hero/intro two-column | `gap-12 lg:gap-10` | solutions + industries, verbatim identical string. |
| Grid / flex gap — card/feature grid | **`gap-3 lg:gap-4`** — kept as the documented default, but only verified once inside this specific 5-family scan (solutions `[slug]`). It's the dominant value everywhere else in the codebase (Footer, CTASection, About page, AboutStats/AboutPartnersSlider, solutions hub, the NFP event page). Treat bringing the other 4 families' card grids onto it as an open Pass backlog item, not settled fact. | 1 of 5 scanned families directly; 15+ occurrences repo-wide outside scope. |

### Typography
| Element | Classes | Evidence |
|---|---|---|
| Hero `h1` | `font-heading font-normal text-5xl md:text-6xl lg:text-7xl` | Confirmed, unconflicted. |
| Section `h2` (standard) | `font-heading text-3xl font-medium tracking-tight md:text-4xl` | products (4×) + solutions (2×, solutions uses `tracking-[-0.02em]` instead of `tracking-tight` — a small arbitrary-value drift worth closing). |
| Section `h2` (statement — HeadlineCTA, SolutionsSection) | `font-heading text-3xl font-medium tracking-tight md:text-5xl` | Homepage only (5 identical instances) — expected, matches the documented statement carve-out. |
| **Industries `h2` — CONFLICT** | Uses `font-normal` (not `font-medium`) with inconsistent responsive stepping (`text-4xl ... lg:text-4xl` with no actual step, or `text-3xl ... md:text-5xl`). Matches neither pattern above. **Needs your call:** bring in line with `font-medium`, or is `font-normal` intentional for industries? | IndustryChallengeStack, IndustryHowTabs, IndustryPlatformSection — all 3 industries H2s. |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` | solutions (4×) + industries (3×) hand-coded, plus the shared `AnimatedEyebrow` component. |
| Eyebrow weight — RESOLVED 2026-08-06 | `AnimatedEyebrow.tsx` now defaults to `font-semibold` (was `font-normal`), matching the standard above. Every eyebrow rendered through the shared component is now correct at the source. | — |
| Body measure | `max-w-2xl` body | homepage + products + industries, 6 instances. `max-w-3xl` hero sub / `max-w-[46rem]` article prose — carried forward from prior documentation, not directly re-verified in this scan (not present in the 5 scanned families' body copy). |
| Typeface | AngelList variable font — `--font-sans` body, `--font-heading` headings | Unconflicted, carried forward. |

### Surfaces and colour
| Property | Rule | Evidence |
|---|---|---|
| Light section surface | `bg-sognos-tint` **and** `bg-white` — both in active cross-family use as valid light surfaces, not one superseding the other. `bg-sognos-tint` still supersedes `bg-gray-50`/`bg-gray-200/70` (zero instances of either found anywhere in scope). | `bg-sognos-tint`: homepage + products. `bg-white`: homepage + solutions. |
| Dark section surface | `bg-sognos-navy` default; `-dark`/`-darkest` only when specified | solutions + industries (bare navy). Products uses its own `bg-sognos-care-dark` product token instead of the generic navy — expected under the per-product theming system, not a violation. |
| Section rhythm | Alternate light / dark — never two consecutive same-surface sections | Carried forward; not independently re-verified this pass. |
| Gradients | Hero and deliberate highlight surfaces only — **never** on standard cards or subcards | Carried forward; no violations found in scope. |
| Colour tokens | `sognos-navy`, `sognos-navy-dark`, `sognos-navy-darkest`, `sognos-blue-accent`, `sognos-tint`, `sognos-heading`, `sognos-body`, `sognos-muted`, `sognos-line`, plus product-specific dark tokens (`sognos-care-dark`, etc.) | Product tokens added — confirmed real and in active use. |
| `sognos-edition-green` | SognosCare references only | Carried forward. |

### Cards and surfaces
| Property | Value | Evidence |
|---|---|---|
| Border radius — surfaces | `rounded-lg` — **never** `rounded-xl`, `rounded-2xl`, `rounded-3xl`, or `rounded-[Xrem]` | All 5 families. **Violations found, not fixed by this pass:** `rounded-[50px]` ×2 on the homepage "Book a Demo" button's hover-fill circle (Hero.tsx, HeadlineCTA.tsx); `rounded-xl` on sognoscare/Problems.tsx's capability card. |
| Border radius — buttons | `rounded-full` only | All 5 families. **Violation:** the homepage "Book a Demo" button itself renders `rounded-sm` at both Hero.tsx and HeadlineCTA.tsx — the site's primary CTA is currently off-token on the homepage. |
| Shadow | **None, ever** — separate with borders and tonal steps | Holds everywhere except one confirmed violation: `shadow-2xl shadow-black/30` on industries/IndustryHowTabs.tsx:66. |
| Card padding | **Not present in the scanned scope** — no card in these 5 families matches `p-6` / `p-6 lg:p-8`. The pattern is real and live elsewhere (About page partner cards, accreditation plates, Careers panel) but isn't exercised by any of the 5 scanned families as currently built. Kept as the documented target, not re-derived from this scan. | n/a within scope. |

### Stat blocks
**Not present in the scanned scope.** The `CTASection.tsx` pattern below is real and used elsewhere (About page's `AboutStats`, Footer) but does not appear anywhere in the homepage, products, solutions, industries, or contact page families as currently built — verified by direct string search, zero matches. The only numeric display within scope (sognoscare/Problems.tsx's `cap.number`) is a different pattern entirely (a small feature-index label), not a metric callout, and itself carries the `rounded-xl` violation above plus a hardcoded `text-gray-600` on the same card.

Kept as the documented pattern for where stat blocks *are* built:
- Grid: `grid-cols-2 gap-3 lg:gap-4`
- Cell: `relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden {bg}`
- Number: `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none`
- Label: `text-xs font-semibold uppercase tracking-widest`

### Grid columns
No fixed default — column count is correctly content-driven (3-up for 3 products, 3-up for 3 pillars, 2-up for paired use-cases) in every instance checked. Not worth encoding as a token.

### Components
- **Server Components by default** — `"use client"` only where interaction or motion demands it
- **CTA label: "Book a Demo"** — confirmed as a literal default/label in 4 of 5 families (homepage, products, solutions, contact). **Industries currently has no local "Book a Demo" CTA in any of its 5 scanned files** — may be covered entirely by the global Navbar/CTABand (out of this scan's scope), but worth confirming it isn't a gap.

---

## Rules that hold across every step
- **Mapping-table-first on each new page.** Before touching a page, present the
  reference → Sognos section mapping and get it approved.
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

| Page family | Scaffold | Approve | Pass | Refine | Notes |
|---|---|---|---|---|---|
| Homepage | ✅ done | ✅ done | ✅ done | in progress | Some sections predate the current Routable reference. |
| Product | ✅ done | ✅ done | ✅ done | in progress | |
| Solutions `[slug]` | ✅ done | ✅ done | ⚠️ outstanding | ⚠️ outstanding | Pre-scaffold `rounded-xl`/`shadow-md` still present; Pass required before Refine. |
| About | ✅ done | ✅ done | 🔄 in progress | — | Section-by-section Pass underway. Done: Hero H1, Leadership (`TeamSection`), event card. Remaining: Our Story, AboutValues, Partners, Accreditations, Social Responsibility, Careers. |
| Knowledge Hub | in progress | — | — | — | |
| Customer Stories | in progress | — | — | — | |
| Industries `[slug]` | in progress | — | — | — | |

Other page families follow the `CLAUDE.md` roll-out order.

---

## Standing rule — Pass is a design discussion, not just a token checklist

During the Pass stage, Claude must go beyond verifying values against the
Global Layout Defaults table. The point of Pass is to make the page actually
look right — consistent, well-weighted, that clean SaaS feel — not just
technically compliant.

Think of it as the site without the paint: Scaffold and Pass get the bones and
proportions right. Refine is where the colour goes on. Pass must make sure the
structure is sound before that happens.

This means:
- If something matches the documented token but still looks wrong (a heading
  reads too large, spacing feels heavy, hierarchy feels off), say so. Passing
  the token check is not the same as passing the eye test.
- If the user asks for a specific size or value (e.g. from a screenshot or a
  reference), and it would break consistency, read poorly, or clash with what
  is used elsewhere, push back and explain why before applying it. This is a
  discussion, not a rubber stamp.
- Share an opinion even when not asked directly. If a section technically
  passes every rule but still feels off, flag it anyway.
- The end goal of every Pass is a judgment call, made together with the user,
  about what actually looks right on the page. Token consistency is a tool
  toward that goal, not the goal itself.
