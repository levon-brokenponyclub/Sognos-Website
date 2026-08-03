# Component Inventory

> **What this is.** A record of the components that exist, mapped exactly as they are
> today — not as they should be. It is the reference that answers "does this pattern
> already exist?" before anything new gets built.
>
> **Rule it enforces:** reuse before invent. If a pattern is not in here, it does not
> exist, and adding it needs a conversation first.
>
> **Status:** in progress. Product pages first.
> Started 2026-08-03. Values read from source, not remembered.

---

## 1. `/products/sognoscare`

### Page composition

`app/(marketing)/products/sognoscare/page.tsx` — Server Component, content from
`getSognoscarePageContent()` (Sanity).

| # | Component | Path | Wrapped in `ScrollReveal` |
|---|---|---|---|
| 1 | `SognoscareHero` | `sections/sognoscare/Hero.tsx` | no |
| 2 | `ProductTrustStrip` | `sections/ProductTrustStrip.tsx` | yes |
| 3 | `SognoscareProblems` | `sections/sognoscare/Problems.tsx` | no |
| 4 | `SognoscareFeatures` | `sections/sognoscare/Features.tsx` | no |
| 5 | `SognoscareEditions` | `sections/sognoscare/Editions.tsx` | yes |
| 6 | `SognoscareAdvantages` | `sections/sognoscare/Advantages.tsx` | yes |
| 7 | `SognoscareStories` | `sections/sognoscare/Stories.tsx` | yes |

`ProductSubNav` is passed into `Problems` as a `subNav` slot — it is not a sibling
section.

### Section-by-section

#### 1 · Hero — 160 lines
```
section   relative overflow-hidden pb-0 md:pb-0 bg-sognos-care-dark
container mx-auto max-w-7xl px-6 pt-40 pb-0 text-center
h1        mx-auto mt-4 font-heading font-normal text-white leading-14
          text-5xl tracking-tight text-balance lg:text-6xl lg:leading-20
sub       mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80
button    rounded-full bg-white px-7 py-3.5 text-base font-medium
          text-sognos-care-dark transition-opacity hover:opacity-90
```
Props: `logoSrc`, `headline`, `subtext`.
Dark, centred, no bottom padding — runs straight into the trust strip.
**Note:** button is `rounded-full`, not `rounded-lg`.

#### 2 · ProductTrustStrip
See §3 — shared across all three product pages.
Called here with `className="bg-sognos-care-dark"` and `dark`.

#### 3 · Problems — 172 lines
```
section   bg-sognos-care-dark pt-20 md:pt-28 pb-20 md:pb-28
container mx-auto max-w-7xl px-4          ← px-4, not px-6
inner     mx-auto max-w-4xl text-center
h2        mt-4 font-heading text-3xl md:text-3xl font-normal tracking-tight
          leading-10 text-white/70 text-balance
body      mt-6 max-w-5xl text-lg leading-relaxed text-white/60 text-pretty
```
Props: `subNav` (ReactNode slot).
**Note:** container is `px-4` here and `px-6` everywhere else.
**Note:** heading is `text-white/70`, not full white.

#### 4 · Features — 133 lines
Types: `FeatureItem`, `SectionHeader { eyebrow?, heading }`, `ScrollFeature`.
Props: `header`, `features`.
Scroll-driven; no single section wrapper — see source.

#### 5 · Editions — 46 lines
```
section   id="editions"  bg-gray-50 py-24
container mx-auto max-w-7xl px-6
inner     flex flex-col items-center text-center
eyebrow   <AnimatedEyebrow className="justify-center">
h2        mt-4 max-w-5xl text-balance font-heading text-3xl font-medium
          tracking-tight leading-tight text-sognos-navy md:text-4xl
body      mt-4 max-w-2xl text-lg leading-relaxed text-sognos-body
```
Props: `editions`. Delegates cards to `EditionCards.tsx`.
Reads `SOGNOSCARE_EDITIONS` from `lib/constants`.

#### 6 · Advantages — 129 lines
```
section   w-full bg-sognos-care-dark text-white
container mx-auto max-w-7xl px-6 py-20 lg:py-28
h2        font-heading text-3xl font-medium tracking-tight text-white md:text-4xl
```
Props: `header`, `advantages`.

#### 7 · Stories — 11 lines
Thin wrapper around `ProductCustomerStories`. Props: `stories`.

---

## 2. Observations — inconsistencies found while mapping

These are recorded, **not fixed**. Each needs a decision.

| # | Inconsistency | Where |
|---|---|---|
| 1 | Container padding is `px-4` in Problems, `px-6` in every other section | `Problems.tsx` |
| 2 | Section padding varies: `py-24` (Editions), `py-20 lg:py-28` (Advantages), `pt-20 md:pt-28 pb-20 md:pb-28` (Problems) — three different rhythms | across |
| 3 | Heading weight varies: `font-normal` (Hero, Problems) vs `font-medium` (Editions, Advantages) | across |
| 4 | Heading size varies: `text-3xl md:text-3xl` (Problems — no step up) vs `text-3xl md:text-4xl` (Editions, Advantages) | `Problems.tsx` |
| 5 | Hero CTA is `rounded-full`; house rule is `rounded-lg` only | `Hero.tsx` |
| 6 | `ScrollReveal` wraps 4 of 7 sections — Hero, Problems and Features are not wrapped | `page.tsx` |
| 7 | Editions uses `bg-gray-50`; the brand's own collateral uses a five-tint pastel family that appears nowhere in the codebase | `Editions.tsx` |

---

## 3. Shared components used by product pages

### `ProductTrustStrip`
`components/layout/sections/ProductTrustStrip.tsx`

Used by all three product pages. Props: `title`, `dark`, `className`.
Layout matched to the homepage `LogoStrip` (2026-08-03). Logos resolved from
Sanity **by name** — Deloitte, Water NSW, NECA, Sandvik, APM — so a CMS reorder
cannot silently swap them.

Call sites:
| Page | Props |
|---|---|
| sognoscare | `className="bg-sognos-care-dark"`, `dark` |
| sognosroster | none — defaults to `bg-white`, light |
| sognosgenogram | none — defaults to `bg-white`, light |

### `ProductSubNav`
`components/ui/ProductSubNav.tsx`. Pills only, IntersectionObserver scroll-spy,
`layoutId="subnav-pill"`. Sections prop: `{ label, id, href? }[]`.

### `ScrollReveal`
`components/ui/ScrollReveal.tsx` — Client Component. Wrapper; `y` prop for offset.

### `AnimatedEyebrow`
`components/ui/AnimatedEyebrow.tsx` — small caps label above section headings.

### `ProductCustomerStories`
`components/layout/sections/ProductCustomerStories.tsx` — shared story track.
Product `Stories.tsx` files are thin wrappers.

---

## Still to map

- [ ] `/products/sognosroster`
- [ ] `/products/sognosgenogram`
- [ ] Homepage sections
- [ ] Solutions pages
- [ ] Industries pages
- [ ] Knowledge Hub + article pages
- [ ] Customer stories
- [ ] `components/ui/*` primitives
