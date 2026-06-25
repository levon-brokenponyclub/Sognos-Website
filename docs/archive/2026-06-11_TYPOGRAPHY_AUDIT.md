> **ARCHIVED — historical reference.** Point-in-time audit generated 2026-06-11, describing the type state BEFORE the type-scale refactor (e.g. it lists `text-2xl` as 1.75rem; current value is the Tailwind default). Superseded by `docs/DESIGN_MIGRATION_STATE.md`. Kept for forensic detail only.

# Typography & Non-Standard Utility Audit
> Read-only. No files edited. Generated 2026-06-11.

---

## Summary

| Category | Finding | Total |
|----------|---------|-------|
| 1. Inline typographic `style={{}}` | 73 instances across 6 files | **73** |
| 2. Overridden standard utilities | `text-2xl` 37×, `max-w-7xl` 91×, shadows 35× (incl. style-guide), `rounded-3xl` 0× | **163** |
| 3. Additive custom text tokens | ALL ZERO — none of the pixel/heading tokens (`text-10`, `text-h1`, etc.) are in use | **0** |
| 4. Heading elements | 135 total across h1–h4; ~18 bare h2s depend on the `globals.css` base rule | **~18 bare** |
| 5. Font variable wiring | CLEAN — both variables aligned, no mismatch | **✅** |
| 6. `wh-` workhorse tokens | 52 instances across 5 legacy scaffold components | **52** |

---

## Category 1 — Inline typographic `style={{}}`

**73 total instances** across 6 files. All occurrences use JS object notation (`fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`).

| File | Count |
|------|-------|
| `app/(marketing)/solutions/[slug]/page.tsx` | 20 |
| `app/style-guide/page.tsx` | 14 (intentional demo — low priority) |
| `components/sections/SolutionUseCases.tsx` | 12 |
| `components/sections/sognosroster/Hero.tsx` | 9 |
| `components/sections/sognosgenogram/Hero.tsx` | 9 |
| `components/sections/sognoscare/Hero.tsx` | 9 |
| **Total** | **73** |

### Top-file examples

**`app/(marketing)/solutions/[slug]/page.tsx`** — 3 distinct JS style objects defined at the top of the file, applied inline throughout:
```tsx
// eyebrow
fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em"
// hero h1 (clamp)
fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.02em"
// section heading (clamp)
fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em"
```

**`components/sections/sognoscare/Hero.tsx`** (and Roster/Genogram Hero — identical pattern):
```tsx
fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em"
fontSize: "19px", lineHeight: 1.5
fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em"
```

**Pattern observed:** Every Hero and the solutions page shares a three-element structure: eyebrow (13px/600/0.08em), hero display head (clamp, medium, tight), body intro (17–19px/1.5). These are good candidates for named Tailwind utilities or component classes.

---

## Category 2 — Overridden standard utilities

### `text-2xl` — 37 total instances, 23 files
(In this repo, `text-2xl` is redefined to `1.75rem` in the `@theme` block, not Tailwind's default `1.5rem`.)

| File | Count |
|------|-------|
| `app/(marketing)/company/about/page.tsx` | 6 |
| `components/sections/sognoscare/Problems.tsx` | 2 |
| `components/sections/sognoscare/EditionPageTemplate.tsx` | 2 |
| `components/sections/SolutionsSection.tsx` | 2 |
| `components/sections/LegalPageRenderer.tsx` | 2 |
| `app/style-guide/page.tsx` | 2 |
| `app/(marketing)/knowledge-hub/[slug]/page.tsx` | 2 |
| `app/(marketing)/customer-stories/[slug]/page.tsx` | 2 |
| `app/(marketing)/contact/page.tsx` | 2 |
| 14 more files | 1 each |

### `max-w-7xl` — 91 total instances
Redefined to `1380px` (Tailwind default: `1280px`). Pervasive — effectively every layout container. No action needed unless the container width changes again.

### Shadow utilities — 35 total instances (includes style-guide)
`shadow-sm` 12, `shadow-md` 10, `shadow-xl` 9, `shadow-lg` 4.
Style-guide accounts for ~7 (deliberate demos in `ShadowSwatch`). **Non-style-guide violations across 13 files:**

| File | Utilities |
|------|-----------|
| `components/sections/sognoscare/Proof.tsx` | `shadow-sm` ×2, `shadow-xl` ×2 |
| `components/layout/Navbar.tsx` | `shadow-xl` ×2 (dropdown + mobile panel) |
| `components/sections/CTASection.tsx` | `shadow-sm`, `shadow-md` ×2 |
| `components/ui/IconOrbit.tsx` | `shadow-md`, `shadow-lg` |
| `components/ui/Workforce.tsx` | `shadow-sm` ×2 |
| `app/(marketing)/industries/[slug]/page.tsx` | `hover:shadow-md` |
| `app/(marketing)/industries/page.tsx` | `hover:shadow-md` |
| `components/sections/CustomerStories.tsx` | `shadow-md`, `drop-shadow-md` |
| `components/sections/HowSognosWorksPreview.tsx` | `shadow-lg` |
| `components/ui/ProductSubNav.tsx` | `shadow-sm` |
| `components/ui/SognosWorkflow.tsx` | `shadow-sm` |
| `components/ui/HubNode.tsx` | `shadow-xl` |
| `components/sections/SocialResponsibilitySection.tsx` | `shadow-sm` |

### `rounded-3xl` — 0 instances
Not used anywhere. No action needed.

---

## Category 3 — Additive custom text tokens

All zero. None of the following appear anywhere in `components/`, `app/`, or `lib/`:

`text-10`, `text-12`, `text-14`, `text-15`, `text-16`, `text-18`, `text-20`, `text-32`, `text-40`, `text-50`, `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-sognos-eyebrow`, `text-sognos-text-sm`

If any of these are defined in the `@theme` block, they are dead tokens. Safe to remove from the stylesheet when cleaning up.

---

## Category 4 — Heading elements vs global base rule

| Element | Total occurrences | With explicit `text-*` size class | Bare (depend on global) |
|---------|--------------------|-----------------------------------|-------------------------|
| `<h1` | 22 | ~20 | ~2 |
| `<h2` | 78 | ~60 | **~18** |
| `<h3` | 28 | ~24 | ~4 |
| `<h4` | 7 | ~5 | ~2 |

`globals.css` line 264 contains:
```css
h2 {
  /* base rule — defines default size for bare <h2> elements */
}
```

**Impact:** ~18 bare `<h2>` elements depend on the global rule. Changing or removing that rule would reflow those headings silently. The 60 `<h2>` elements with explicit `text-*` classes are immune to base-rule changes.

Note: The 60/78 split was detected via single-line scan; multi-line JSX with `className` on the next line (~4 cases) may shift the bare count slightly lower.

---

## Category 5 — Font variable wiring

**Status: ✅ Clean — no mismatch.**

`app/layout.tsx`:
```tsx
const bureauSans  = localFont({ variable: "--font-bureau-sans", ... })
const interHeading = Inter({ variable: "--font-inter-heading", ... })
// Applied to <html>: ${bureauSans.variable} ${interHeading.variable}
```

`app/globals.css` (`@theme inline`):
```css
--font-sans:    var(--font-bureau-sans, sans-serif);
--font-heading: var(--font-inter-heading), ui-sans-serif, system-ui, sans-serif;
```

Both variable names produced by `next/font` match exactly what the `@theme` block consumes. No orphaned variable names found. `font-sans` and `font-heading` are the two active utility classes.

---

## Category 6 — `wh-` workhorse tokens

**52 total instances across 5 files.** These are scaffold-era components from an earlier design iteration (pre-Cohere scaffold).

| File | Count | Tokens used |
|------|-------|-------------|
| `components/sections/HomepageProblem.tsx` | ~14 | `text-wh-text`, `text-wh-text-soft`, `text-wh-text-muted`, `border-wh-border`, `rounded-wh-md`, `bg-wh-bg` |
| `components/sections/PlatformFlow.tsx` | ~12 | `text-wh-text`, `text-wh-text-soft`, `text-wh-text-muted`, `border-wh-border`, `bg-wh-bg` |
| `components/sections/HomepageOutcomes.tsx` | ~12 | `text-wh-text`, `text-wh-text-muted`, `border-wh-border`, `rounded-wh-md`, `bg-wh-card` |
| `components/sections/PlatformPillars.tsx` | ~6 | `text-wh-text`, `text-wh-blue`, `rounded-wh-md`, `rounded-wh-pill` |
| *(others)* | ~8 | misc. |

These components appear to be orphaned or pre-scaffold. If they're not rendered on any current page, the entire token set (`wh-*`) is safe to remove from globals.css along with the components.

---

## Where the real effort is concentrated

1. **Biggest refactor target: inline `style={{}}` in Hero components (×3) + solutions page + `SolutionUseCases.tsx`.** All share the same eyebrow/display-head/body-intro triple pattern — a single set of 3 named Tailwind utilities would replace ~60 of the 73 instances with zero semantic change.

2. **Widest blast radius: `text-2xl` (37 uses, 23 files).** If the `@theme` override ever changes, 37 elements reflow silently. Worth auditing whether all 37 intend `1.75rem` or if some should be `text-3xl` instead.

3. **Shadow violations are numerous but shallow.** 28 real (non-style-guide) shadow usages across 13 files — most are single instances. Mechanical find-and-remove once the design decision is confirmed.

4. **~18 bare `<h2>` elements** are silently coupled to the `globals.css` base rule. Low risk now, but a refactor that removes or changes that rule would require auditing each one.

5. **`wh-` tokens and additive pixel tokens are safe to purge** — 0 pixel/heading tokens in use, and the 5 `wh-` component files appear to be scaffold leftovers not wired into active pages.
