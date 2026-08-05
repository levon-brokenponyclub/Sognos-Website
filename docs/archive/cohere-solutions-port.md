# Cohere Solution-Page Port — Session Log

**Date:** 2026-06-10
**Reference page:** https://cohere.com/solutions/energy-and-utilities
**Target template:** `app/(marketing)/solutions/[slug]/page.tsx` (shared by all 7 solution slugs)
**Intent:** Throwaway visual scaffold — make Sognos solution pages *look like* Cohere. Keep all Sognos copy, routing, and data. No new Tailwind tokens. No `globals.css` edits.

---

## Port discipline (rule for every section touched)

If Cohere doesn't use it, don't keep it. That means:

- No pill eyebrows with cyan dot + Prussian-blue border.
- No `bg-gray-200/70` section bands.
- No bordered card chrome around tab lists.
- No status-pill / badge patterns inside section headers.

Eyebrow pattern across every ported section: small uppercase letter-spaced text, `13px`, `font-weight 600`, `letter-spacing 0.08em`, color `#6B7280`.

---

## Files changed

| File | Status | Purpose |
|------|--------|---------|
| `app/(marketing)/solutions/[slug]/page.tsx` | Edited | Hero restyled, `LogoStrip` mounted below hero, `SolutionHeroDemoButton` imported |
| `components/sections/SolutionHeroDemoButton.tsx` | New | Client button — solid dark pill wired to `useBookDemo().openModal` |
| `components/sections/SolutionUseCases.tsx` | Rewritten | Capabilities section ported to Cohere look |

No other files touched. No copy, route, or data changes.

---

## 1. Hero — DONE

### Before
- `data-header-dark` section, `bg-gradient-hero`, centered single-column.
- Breadcrumb pill ("Solutions / [name]") on dark background.
- H1 white, weight normal, no CTA.

### After
- White background, two-column desktop layout (text col-span-7, visual col-span-5), stacks on mobile.
- Eyebrow: uppercase letter-spaced solution name only, links back to `/solutions`.
- H1 inline-styled: `clamp(48px, 6vw, 72px)`, weight 500, line-height 1.05, letter-spacing `-0.02em`, color `#1A1A1A`.
- Subhead: 19px, line-height 1.5, color `#4B5563`, max-width 600px.
- Primary CTA: `SolutionHeroDemoButton` — `bg-[#1A1A1A]`, `rounded-full`, `px-7 py-3.5`, opens existing Book-a-Demo modal via `useBookDemo`.
- Visual placeholder: `aspect-[5/4]` panel, `rounded-lg`, solid `bg-[#16314e]`.
- `LogoStrip` rendered directly below the hero (existing component reused, no edits).
- `data-header-dark` removed.

### Validation
- Desktop 1440×900: two-col layout, CTA renders, panel solid `#16314e`, LogoStrip below.
- Mobile 375×812: text → CTA → panel stack.
- No console errors.

---

## 2. Capabilities (`SolutionUseCases`) — DONE

### Before
- `bg-gray-200/70 py-24` section.
- Pill eyebrow ("Capabilities", cyan dot + Prussian-blue border).
- 50/50 grid: empty image placeholder left, bordered tab list + content card right.
- Active tab = Prussian-blue filled chip; content in a separate white card.

### After
- `bg-white py-24 lg:py-32` section.
- Eyebrow: uppercase letter-spaced text (`Capabilities`), no pill.
- H2 inline-styled: `clamp(32px, 4vw, 48px)`, weight 500, line-height 1.1, letter-spacing `-0.02em`, color `#1A1A1A`.
- Layout: 4/8 col grid — vertical tab list left (≈33%), content panel right (≈67%).
- Tabs: no container chrome. Each item is a left-bordered button.
  - Active: `border-l-2 border-[#1D96FC]`, text `#1A1A1A`, weight 500.
  - Inactive: transparent left border (preserves alignment), text `#6B7280`, weight 400, hover → `#1A1A1A`.
- Content panel: no card chrome. H3 `clamp(24px, 2.6vw, 32px)`, body 17px / line-height 1.55 / color `#4B5563`, max-width 640px.

### Validation
- Active tab confirmed: `border-left 2px rgb(29, 150, 252)`, color `#1A1A1A`, weight 500.
- Inactive tabs: transparent border, color `#6B7280`, weight 400.
- Click tab → accent moves, panel H3 + body update.

---

## 3. Not yet ported (still pre-scaffold Sognos chrome)

These sections in `[slug]/page.tsx` still use the old look — pill eyebrows, `bg-gray-200/70`, bordered cards. They are the next port targets, in order:

1. **What it solves** — 3 pain-point cards (currently pill eyebrow + `bg-white py-24` + 3 cards in `bg-gray-200/70`).
2. **Platform** — single dark Prussian-blue card with pill eyebrow.
3. **Related Solutions** — 3-col grid with white cards on `bg-gray-200/70` band.
4. **Works with** — chips linking to SognosCare / SognosRoster, pill eyebrow.
5. **CTASection** — shared booking section (likely kept as-is; confirm before touching).

For each, apply the same discipline: drop pills → uppercase eyebrow, drop band backgrounds → white, drop card borders unless Cohere uses them, drop status dots, restyle H2/body to match the hero scale.

---

## Open questions for the user

1. Confirm whether to keep the placeholder panel as solid `bg-[#16314e]` long-term or replace with a real product visual.
2. Confirm `CTASection` (shared booking section) is in-scope or out-of-scope for this port pass.
3. For each remaining section, point me at the Cohere block on `energy-and-utilities` to mirror.
