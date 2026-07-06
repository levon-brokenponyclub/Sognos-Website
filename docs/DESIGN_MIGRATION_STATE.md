# Sognos Design Migration — State of Record

> **Workflow note:** The design-review partner cannot see the live repo. This document is the authoritative source of truth. Update it at the end of every work session. All values are pulled directly from the code — not from memory or the SEED context.
>
> **Related docs:** [`SLIDER_PATTERN.md`](./SLIDER_PATTERN.md) — shared slider/carousel pattern (autoplay/transition/peek/dot defaults; Shape 1 nav-rail, Shape 2 peek-carousel). New sliders default to it.

---

## ⚠️ Reconciliation flags

Items where the SEED context conflicts with, or is silent about, the actual code state. These are the most actionable findings.

| # | Flag | SEED belief | Reality |
|---|------|-------------|---------|
| 1 | **Old edition tokens partially purged** | Colour system "complete, all built green" | `lime` and `pink` purged. **All 6 edition pages now use new `--sognos-edition-*` canonical tokens** for `accentBgClass` (hospital-in-the-home was `bg-[#c6da4c]` raw hex — canonicalised to `bg-sognos-edition-hospital-in-the-home` 2026-07-02). `accentHex`/`accentTextClass`/`accentBorderClass` on hospital-in-the-home still use raw hex — not yet migrated. Old `green/orange/coral/purple` tokens still live in `tokens.css` — referenced in: `Integration.tsx`, `industries/[slug]/page.tsx`, `industries/page.tsx`, `solutions/[slug]/page.tsx`, `products/page.tsx`, `style-guide/page.tsx`. Purge blocked until those files migrate. |
| 2 | **`CTASection.tsx` file still exists** | Not mentioned | The component file `components/layout/sections/CTASection.tsx` was NOT deleted — it was only removed from all page imports. The file remains on disk at 25 KB. |
| 3 | ~~**Roster + Genogram Problems NOT dark**~~ | ~~pending~~ | **RESOLVED 2026-07-02** — Roster Problems `bg-sognos-roster-dark`, Genogram Problems `bg-sognos-genogram-dark`, full text inversion applied to both. |
| 4 | **`#10B981` hardcoded (5 spots, not 7)** | "~7 hardcoded spots" | Code grep finds exactly 5 occurrences, all in `components/layout/sections/sognoscare/Features.tsx` inside the `FeatureVisual` placeholder components (which will be replaced by Lotties — so these may be moot). |
| 5 | **Workhorse tokens still in `@theme`** | Not mentioned | `globals.css` contains a `/* WORKHORSE TOKENS */` block with `--color-wh-blue`, `--color-wh-teal`, `--color-wh-bg`, `--color-wh-text`, `--color-wh-border`, `--color-wh-card`, `--color-wh-pink`, `--color-wh-green`, `--radius-wh-*`, `--shadow-wh-*`. Comment says "swap values to Sognos brand after layout is locked." Not yet swapped. |
| 6 | **Type scale: default Tailwind values, not custom** | "VALUES are placeholders pending a lock pass" | Confirmed — all `--text-*` values in `@theme` are standard Tailwind v4 defaults (no custom Sognos scale yet). Mark all as PLACEHOLDER. |
| 7 | **Features: stacking IS removed** | "stacking being removed" (stated as in-progress) | Removal is complete as of this session. Cards are in `space-y-8 lg:space-y-12` normal flow. Sticky per-card is gone. |
| 8 | **`CTABand` button disabled (not linked to `/contact`)** | "interim until `/book-demo` exists" | `disabled` attribute confirmed. No `href` to `/contact` — intentionally left disabled. |
| 9 | **`--sognos-border` survives as utility token** | Not mentioned | `tokens.css` still defines `--sognos-border: var(--color-neutral-200)` (used by `section-border` CSS class in globals.css) and `--sognos-bg-sunken` (used in 12 component refs). Both intentionally kept per Phase 4 survival analysis. |

---

## 1. Overview

Sognos is a product-led SaaS platform built on Microsoft Dynamics 365, targeting care providers, facilities managers, and government bodies. The marketing site is a **Next.js 15 App Router** project using **Tailwind CSS v4 CSS-first** (no `tailwind.config.js`), **Framer Motion**, **TypeScript**, and **Sanity CMS** for content. The visual design is migrating from a legacy Microsoft-partner aesthetic toward modern SaaS patterns — specifically **Cohere** (section-by-section homepage clone) and **AngelList** (pricing/advantages layouts). The goal is Stripe/Luno quality with conversion-focused UX.

---

## 2. Conventions

### Tailwind v4 CSS-first
- **No `tailwind.config.js`** — confirmed absent.
- Theme lives entirely in `@theme inline {}` block in `app/globals.css`.
- Primitive values (raw CSS vars) live in `app/tokens.css`, imported via `@import "./tokens.css"` in globals.css.
- **Editing a token value cascades with no rebuild.** Only adding a NEW token name to `@theme inline` requires a rebuild to generate the utility class.
- `--color-{name}` entries in `@theme inline` generate `bg-{name}`, `text-{name}`, `border-{name}` utilities.
- `--background-image-{name}` entries generate `bg-{name}` gradient utilities.

### Motion — canonical references
- **`ProductFeaturesScroll.tsx`** — sticky left rail with `motion.span layoutId="feature-rail-bullet"` spring pill + rAF-throttled scroll-spy (`getDocTop()` walk). Canonical scroll-spy rail pattern. `SolutionsSection.tsx` was refactored 2026-07-03 to the same shape (`layoutId="solutions-rail-bullet"`) — the previous tab-switcher/crossfade pattern is gone; if you need it back, reach for `AnimatePresence mode="wait"` + `motion.span layoutId="…"` from the pre-refactor version in git history. `StoryArticleNav.tsx` (customer-story body, 2026-07-05) reuses the same rail (`layoutId="article-rail-bullet"`) sourced from a server pre-pass over Portable Text `h2` blocks — each `layoutId` must stay unique per component or two rails on screen fight over the shared layout animation.
- **`AboutHeroImage.tsx`** — window `scrollY` + `useMotionTemplate` on a `calc()` string: `max-width: calc(100vw - ((100vw - 80rem) * progress))`. Canonical pattern for a scroll-linked breakout-to-container image (AngelList `/careers` shape). Deterministic (works from page-load state 0), no target ref needed.
- **`Advantages.tsx`** — `motion.ul` / `motion.li` with `containerVariants` (stagger) + `itemVariants` (y: 30→0, opacity) + `whileInView`. Canonical pattern for staggered scroll-in lists.
- **Navbar** — Aceternity pill + hover-pill: `rounded-full` pill bar, `layoutId="nav-hover-pill"` sliding highlight. Dropdown (AngelList exact-spec): outer `AnimatePresence key="dropdown-panel"` (fixed key — never re-mounts on item switch) with `rotateX(-10→0) scale(0.9→1) opacity` open/close at `perspective:800 transformOrigin:top center`. Card is `absolute inset-x-0 top-full mt-4 flex justify-center` inside `<header>` (full viewport-width centering). Card dimensions driven by `dropdownWidth`/`dropdownHeight` state from hidden measurer refs, set in synchronous `useLayoutEffect`; `transition: width 0.3s / height 0.3s cubic-bezier(0.4,0,0.2,1)` on the card div. Inner `AnimatePresence mode="popLayout"` keyed on `openMenu` with directional `x: ±200` slide (`slideDirectionRef` + `prevOpenIndexRef` + `recordDirection()`). Hover timers: 60ms open / 100ms close. Mobile: two-level full-screen slide (`AnimatePresence mode="wait"`, `mobilePanel` state, `mobilePanelDirectionRef`). `THEMES` covers `text / hoverPill / navGroup / logoFilter / primaryBtn / secondaryText / hamburger`.

### Design hard rules

> Canonical hard-rules source: CLAUDE.md §9. (Mirrored here for design-partner convenience.)

- `rounded-lg` everywhere — no `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[Xrem]`.
- Section gray bg: always `bg-gray-200/70` — never `bg-gray-100`, `bg-slate-50`, `bg-[#FAFAFA]`.
- No `shadow-sm/md/xl/2xl` anywhere.
- Grid gaps: `gap-3 lg:gap-4`.
- Container: `max-w-7xl` (mapped to `--sognos-container-width: 1380px`).
- Section gutter: `px-6` (no `lg:` override) so section edges align with the navbar's `px-6` container — i.e. the logo (left) and Book a Demo (right). The legacy `lg:px-10` gutter was retired site-wide 2026-07-02. Exceptions where a smaller base intentionally scales up: `px-4 lg:px-6` (NewsInsightSection), `pb-10 lg:px-6` (KnowledgeHubArchive pills, lg-only), `px-4 sm:px-8 lg:px-6` (ComingSoonHero).
- CTA label: **"Book a Demo"** everywhere.

---

## 3. Colour tokens

All values from `app/tokens.css`. Utilities generated via `@theme inline` in `app/globals.css`.

### Core brand

| Token | Value | Tailwind utility |
|-------|-------|-----------------|
| `--sognos-navy-dark` | `#0f1936` | `bg-sognos-navy-dark`, `text-sognos-navy-dark` |
| `--sognos-navy` | `#152248` | `bg-sognos-navy`, `text-sognos-navy` |
| `--sognos-blue-accent` | `#1d96fc` | `bg-sognos-blue-accent`, `text-sognos-blue-accent` |

### Content / text / lines

| Token | Value | Usage |
|-------|-------|-------|
| `--sognos-heading` | `#0f1936` | `h1–h6` via `@layer base` |
| `--sognos-body` | `#152248` | `p` via `@layer base` |
| `--sognos-muted` | `#64748b` | Secondary text |
| `--sognos-line` | `#e2e8f0` | Borders, dividers |

### Utility survivors (kept from Phase 4)

| Token | Value | Notes |
|-------|-------|-------|
| `--sognos-brand-foreground` | `#ffffff` | Used by `--color-primary-foreground` |
| `--sognos-bg-sunken` | `var(--color-neutral-200)` | 12 component refs, no replacement token defined |
| `--sognos-border` | `var(--color-neutral-200)` | Used by `section-border` CSS class |

### Per-product

| Product | Token | Value |
|---------|-------|-------|
| SognosCare | `--sognos-care-dark` | `#03112f` |
| SognosCare | `--sognos-care-base` | `#152248` |
| SognosCare | `--sognos-care-gradient` | `linear-gradient(to bottom right, #5aa0ff, #3b6fe0, #1f2a78)` |
| SognosRoster | `--sognos-roster-dark` | `#0b3a66` |
| SognosRoster | `--sognos-roster-base` | `#59bbf7` |
| SognosRoster | `--sognos-roster-gradient` | `linear-gradient(to bottom right, #6fc6fb, #2f97d6, #0e4f86)` |
| Sognos Genogram | `--sognos-genogram-dark` | `#250438` |
| Sognos Genogram | `--sognos-genogram-base` | `#91278c` |
| Sognos Genogram | `--sognos-genogram-gradient` | `linear-gradient(to bottom right, #7b3fa8, #4a1670, #1a0224)` |

### Edition sector tokens (NEW — these are the canonical set)

| Token | Value | Sector |
|-------|-------|--------|
| `--sognos-edition-aged-care` | `#caa4ff` | Residential Aged Care |
| `--sognos-edition-allied-health` | `#ffad6e` | Allied Health |
| `--sognos-edition-support-at-home` | `#ff8e90` | Support at Home |
| `--sognos-edition-hospital-in-the-home` | `#cbdd61` | Hospital in the Home |
| `--sognos-edition-child-and-family-services` | `#ff7dbc` | Child & Family Services |
| `--sognos-edition-disability` | `#00a98f` | Disability & Mental Health |

### Edition dark variants (Advantages section backgrounds)

> Added 2026-07-02. Used via `style={{ backgroundColor: "var(--token)" }}` — NOT Tailwind utilities (utility generation failure for new `@theme inline` entries; bypass confirmed working). Raw CSS vars on `:root` from `tokens.css`.

| Token | Value | Sector |
|-------|-------|--------|
| `--sognos-edition-aged-care-dark` | `#2d1a5c` | Residential Aged Care |
| `--sognos-edition-allied-health-dark` | `#6b2d00` | Allied Health |
| `--sognos-edition-support-at-home-dark` | `#660e10` | Support at Home |
| `--sognos-edition-hospital-in-the-home-dark` | `#2a3605` | Hospital in the Home |
| `--sognos-edition-child-and-family-services-dark` | `#5c0a33` | Child & Family Services |
| `--sognos-edition-disability-dark` | `#003d34` | Disability & Mental Health |

### Edition tokens (OLD — partial purge done 2026-06-15)

⚠️ `lime` and `pink` purged. `green/orange/coral/purple` still needed — referenced in live files listed below. Purge blocked until those files migrate to the NEW token set above.

| Token | Value | Status |
|-------|-------|--------|
| `--sognos-edition-green` | `#36b19a` | **Keep** — referenced in: `Integration.tsx` ×3 (Care/Roster/Genogram), `industries/[slug]/page.tsx`, `industries/page.tsx`, `solutions/[slug]/page.tsx`, `disability-mental-health/page.tsx`, `products/page.tsx`, `style-guide/page.tsx` |
| `--sognos-edition-orange` | `#fea65d` | **Keep** — referenced in: `style-guide/page.tsx` only (edition pages migrated) |
| `--sognos-edition-coral` | `#ff8184` | **Keep** — referenced in: `style-guide/page.tsx` only (edition pages migrated) |
| `--sognos-edition-purple` | `#c49aff` | **Keep** — referenced in: `style-guide/page.tsx` only (edition pages migrated) |
| ~~`--sognos-edition-lime`~~ | ~~`#c6da4c`~~ | **Purged** — zero live references |
| ~~`--sognos-edition-pink`~~ | ~~`#ff6db4`~~ | **Purged** — zero live references |

### Status tokens

| Token | Value |
|-------|-------|
| `--sognos-success` | `#10b981` |
| `--sognos-success-light` | `#d1fae5` |
| `--sognos-warning` | `#f59e0b` |
| `--sognos-error` | `#ef4444` |
| `--sognos-info` | `var(--color-cornflower-ocean-500)` |

---

## 4. Typography scale

From `@theme inline` in `app/globals.css`. All values are standard Tailwind v4 defaults — **PLACEHOLDER** pending a Sognos-specific lock pass.

| Step | Size | Line-height | Status |
|------|------|-------------|--------|
| `--text-xs` | `0.75rem` | `1rem` | PLACEHOLDER |
| `--text-sm` | `0.875rem` | `1.25rem` | PLACEHOLDER |
| `--text-base` | `1rem` | `1.5rem` | PLACEHOLDER |
| `--text-lg` | `1.125rem` | `1.6` | PLACEHOLDER |
| `--text-xl` | `1.25rem` | `1.6` | PLACEHOLDER |
| `--text-2xl` | `1.5rem` | `1.3` | PLACEHOLDER |
| `--text-3xl` | `1.875rem` | `1.2` | PLACEHOLDER |
| `--text-4xl` | `2.25rem` | `1.15` | PLACEHOLDER |
| `--text-5xl` | `3rem` | `1.1` | PLACEHOLDER |
| `--text-6xl` | `3.75rem` | `1.05` | PLACEHOLDER |
| `--text-7xl` | `4.5rem` | `1.05` | PLACEHOLDER |
| `--text-8xl` | `5.5rem` | `1.03` | PLACEHOLDER |

### Heading defaults (`@layer base`)
All `h1–h6` get: `font-heading text-sognos-heading tracking-heading leading-heading font-weight: 400`

Heading tokens: `--leading-heading: 1.05`, `--tracking-heading: -0.02em`

### Fonts
| Token | Value |
|-------|-------|
| `--font-sans` | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` |
| `--font-heading` | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` |
| `--font-angellist` | `angellist, ui-sans-serif, system-ui, sans-serif` |

**Loading:** `app/layout.tsx` uses a single `Inter` from `next/font/google` exposing `--font-inter`. Both `--font-sans` and `--font-heading` resolve to the same instance — one font download. `angellist` is a variable font (weight range 400–700) loaded via `@font-face` in `globals.css` from `/public/app/AngelList.woff2`. Bureau Sans has been fully removed (2026-07-02) — files deleted, CSS variable dropped.

### In-use conventions

| Role | Classes |
|------|---------|
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.08em]` |
| Hero display | `text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em]` |
| Section h2 | `font-heading text-3xl md:text-4xl font-medium tracking-tight` |
| Feature card h3 | `font-heading text-2xl md:text-3xl font-medium tracking-tight leading-snug` |
| Body | `text-base leading-relaxed` or `text-lg leading-relaxed` |
| Accent description | `border-l-2 border-sognos-blue-accent pl-4 text-base leading-relaxed` |
| Card stat number | `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none` |

---

## 5. Component inventory

| Component | Path | Status | Notes |
|-----------|------|--------|-------|
| **Navbar** | `components/layout/Navbar.tsx` | done | **Full-width 80px bar (AngelList style, 2026-06-15).** `<header>` is `fixed inset-x-0 top-0 z-50` — no `px-4 pt-4`, no `rounded-full`, edge-to-edge. Height: `h-20` (80px). Bottom-edge hairline `shadow-[0_1px_0_rgba(0,0,0,0.08)]` when solid (replaces old all-around pill shadow). Inner `<div ref={containerRef} class="relative mx-auto max-w-7xl px-6">` unchanged — dropdown x/width math resolves against this same div. `containerRef` still on `max-w-7xl` inner wrapper. `THEMES` object drives all colour decisions; `pill`/`pillShadow` keys removed; `THEMES.dark` now sets `navGroup: "bg-white/10 rounded-full px-1"` (retains inner pill), `dropdownCard: "bg-white ..."` (always white, always readable), `hamburger: "text-white/80 hover:text-white"`. **Transparency-over-hero:** `DARK_HERO_PATHS = { "/", "/products/sognoscare", "/products/sognosroster", "/products/sognosgenogram" }` (exact-match `Set`; `/company/about` removed 2026-07-05 — its hero is now white/light) plus `DARK_HERO_PATH_PREFIXES = ["/customer-stories/"]` (2026-07-02, `Array.some(pathname.startsWith(...))`) for dynamic routes whose pages always render a dark hero — `Set.has()` alone can't match a resolved dynamic path like `/customer-stories/flourish-australia`. `useTransparent` derived from `usePathname()` inside Navbar (it is already a client component). Explicit opt-out via `transparentOverHero?: boolean` prop. `isTransparent = useTransparent && scrollState === "top"`. Bar stays transparent even when a dropdown opens — does NOT switch to solid on hover/open. `t = isTransparent ? THEMES.dark : THEMES.light`. **Transparent-top state:** `bg-transparent`, white logo (`brightness(0) invert(1)`), `text-white/80` nav items, `bg-white text-sognos-navy-dark` primary CTA, `text-white/65` secondary, hamburger `text-white/80`. **Solid state:** `bg-white shadow-[0_1px_0...]`, dark logo, `bg-gray-100` nav-group, `text-sognos-heading` items. **Mobile menu (2026-07-02 — AngelList two-level slide):** `AccordionItem` + `openAccordion` removed. `fixed inset-0 z-[51] bg-white` overlay; `AnimatePresence mode="wait"` swaps root panel (exits x:-100%) and sub-panel (enters x:100%). `mobilePanelDirectionRef` drives root `initial.x` on back-navigation. Always `THEMES.light` colours. `transition-[transform,opacity,background-color,box-shadow] duration-300` on `<header>`. Three-state scroll model retained (`top`/`hidden`/`peek`). `AnimatePresence mode="popLayout"` dropdown crossfade, `panelX` motion value, `panelWidth` React state, single content-fit panel — all unchanged. Build green + DOM verified. |
| **Footer** | `components/layout/Footer.tsx` | done | Mobile accordions; `FooterColumns.tsx` split as `"use client"` for Framer Motion height/opacity |
| **FooterColumns** | `components/layout/FooterColumns.tsx` | done | Client component handling mobile accordion animation |
| **Hero (homepage)** | `components/layout/sections/Hero.tsx` | done | **Reworked to navy.** `bg-sognos-navy-dark`; two-card panel + `useScroll`/parallax removed; `pt-40 pb-20` text-only block; heading/subtext → `text-white`/`text-white/70`; primary CTA → `AnimatedButton variant="white"`; secondary link → `text-white/70 border-white/30`. Stagger fadeUp entrance retained. Cards below peek above fold at load. **Heading treatment (2026-07-06):** container `text-left lg:text-center` (left on mobile, centred desktop); `<h1>` `text-5xl tracking-tight text-balance lg:text-6xl` (was `text-6xl leading-[1.02] -tracking-[1.2px]`). |
| **HomeProductCards** | `components/layout/sections/HomeProductCards.tsx` | styling-pending | **AngelList column layout + mobile slider.** Navy bg (`bg-sognos-navy-dark pb-24`) seamless with hero. **Mobile**: `flex snap-x snap-mandatory overflow-x-auto scroll-px-6 scrollbar-hide gap-3`; each card `min-w-[82%] shrink-0 snap-start` (one card fills 82% viewport, next peeks). **Desktop (`md`+)**: `md:grid md:grid-cols-3 md:overflow-visible lg:gap-4`; cards reset `md:min-w-0 md:shrink`. Per column: top + bottom hairline (`border-white/15`), `pt-4 pb-6`. Structure: h3 title → `aspect-[3/4] rounded-lg` image card (bg image opacity-20, dark overlay, logo top-left, arrow button bottom-right) → always-visible description `mt-5 text-lg text-white/70`. Hover = arrow button accent fill only (no glow). Accents: Care `#1d96fc`, Roster `#59bbf7`, Genogram `#91278c`. FLAG: Genogram bg = Care placeholder. FLAG: dot indicators — noted as refinement. |
| **LogoStrip** | `components/layout/sections/LogoStrip.tsx` | done | Sanity-backed infinite CSS marquee; `trust-marquee-track` CSS animation; do NOT modify |
| **HowSognosWorks** | `components/layout/sections/HowSognosWorks.tsx` | done | 3-block "Safe. Flexible. Independent." |
| **IndustrySection** | `components/layout/sections/IndustrySection.tsx` | done | Arrow snap-scroll square cards; Industrial Services video autoplays always |
| **SolutionsSection** | `components/layout/sections/SolutionsSection.tsx` | done | Animated tab-switcher, `motion.span layoutId`, `AnimatePresence`. **Canonical motion reference.** |
| **NewsInsightSection** | `components/layout/sections/NewsInsightSection.tsx` | done | 3 callout cards with morphing SVG notch (`.callout-card__svg`), Framer Motion drag slider |
| **CTABand** | `components/layout/sections/CTABand.tsx` | done | Globally rendered in marketing layout above `<Footer />`. Book a Demo button `disabled` — interim until `/book-demo` page built. `useBookDemo` modal wiring removed. **Dot-grid bg (2026-07-06):** decorative `/images/cta-bg.svg` (1900×200 dot band) `absolute inset-x-0 bottom-0 w-full` on the navy section, `mix-blend-screen` so the SVG's near-black backing drops out and only the dots read over navy (Deck-style textured footer); section is `overflow-hidden`, content wrapper `relative z-10`. |
| **CTASection** | `components/layout/sections/CTASection.tsx` | scaffolded | File exists (25 KB) but removed from all page imports. Retained for now; can be deleted later. |
| **ProductTrustStrip** | `components/layout/sections/ProductTrustStrip.tsx` | done | Static 5-logo strip. Always `bg-white`, `grayscale opacity-70` logos. Wired to SognosCare, SognosRoster, and Sognos Genogram pages (after Hero, wrapped in `<ScrollReveal>`). **Dividers added (2026-07-02):** `border-l border-gray-200` on each logo wrapper except first (`index > 0`), hidden on mobile, `md:flex-1 md:px-10` per-logo wrapper for breathing room. `divide-x` utility was skipped (Tailwind v4 child-selector issue); per-item conditional class used instead. |
| **ProductFeaturesScroll** | `components/layout/sections/ProductFeaturesScroll.tsx` | styling-pending | Side-by-side cards (text left / `PlaceholderBox` right). Stacking removed — normal `space-y-8 lg:space-y-12` flow. Sticky left rail + scroll-spy intact. Lottie wiring pending export-size decision. |
| **PlaceholderBox** | `components/ui/PlaceholderBox.tsx` | done | Self-measuring `ResizeObserver` box showing live W×H + aspect ratio. Temporary — will be replaced by `LottieInView` player. |
| **SognosCare Hero** | `components/layout/sections/sognoscare/Hero.tsx` | done | **AngelList pattern:** single `motion.div` wraps all content; `<section>` owns static `bg-sognos-care-dark`. `useScroll({ target: heroRef, offset: ["start start","end start"] })`. `y: [0,1]→[0,60]` (content pushes DOWN on scroll — parallax). `opacity: [0,0.7]→[1,0]` (fades to 0 by 70% scroll-through). `useReducedMotion()` guard: both y and opacity set to no-op ranges when reduced motion preferred. `pb-4 md:pb-0`. |
| **SognosCare Problems** | `components/layout/sections/sognoscare/Problems.tsx` | done | Lumos-style layout: problem statement → `mt-28 md:mt-40` breath → solution reveal → 5 slim capability columns with vertical dividers (`lg:divide-x`) + static `bg-sognos-blue-accent` accent bars at bottom of each column. **Light section** (`bg-white`). `subNav` slot centred above problem block. Static — no entrance motion yet (follow-up choreography prompt planned). Scroll-spy rail + Problem/Solution card pairs archived to `docs/archive/sognoscare-Problems.scrollspy-rail.tsx`. |
| **SognosCare Features** | `components/layout/sections/sognoscare/Features.tsx` | styling-pending | Data + `FeatureVisual` placeholder nodes hardcode `#10B981` (5 spots) — will be replaced by Lottie |
| **SognosCare Editions** | `components/layout/sections/sognoscare/Editions.tsx` | done | **Single-column layout.** Heading ("Choose the Right SognosCare Edition…") + intro (`mt-2 max-w-2xl text-lg text-sognos-muted`) full-width above `EditionCards` slider (`mb-12` gap). Left sticky rail removed. Section bg `bg-gray-200/70 py-24`, `max-w-7xl px-6`, `showSliderButtons` all intact. Copy hardcoded, no `header` prop. |
| **SognosCare EditionCards** | `components/layout/sections/sognoscare/EditionCards.tsx` | done | **AngelList fund-admin card pattern:** `aspect-[3/4]` tall card, top-left radial glow (edition `accentColor`, opacity-0 → group-hover:opacity-100), hover-revealed description (translate-y-2/opacity-0 → group-hover), bottom row with circular arrow button (fill slides up via translateY+scale from `accentColor`). 6 cards, `bg-white`. `dark` prop kept for compat (not applied). **Token wired:** `accentColor` prop now holds `var(--sognos-edition-*)` CSS var refs — resolves at runtime. **Logo 140px:** `w-[140px]` container + `Image width={140} height={40}`. **Arrow contrast:** `group-hover:text-sognos-heading` (was `text-white` — invisible on light pastels). FLAGs in code: description always-visible on mobile still pending. `RelatedEditions` on edition pages: 5 cards, transparent bg (correct). |
| **SognosCare Advantages** | `components/layout/sections/sognoscare/Advantages.tsx` | done | AngelList checklist: dark `bg-sognos-care-dark`, striped `odd:bg-white/10`, framer stagger, `CheckIcon` `text-sognos-blue-accent` |
| **SognosCare Stories** | `components/layout/sections/sognoscare/Stories.tsx` | done | Thin wrapper around `ProductCustomerStories` |
| **SognosCare Integration** | `components/layout/sections/sognoscare/Integration.tsx` | scaffolded | Exists; styling status unverified |
| **SognosCare Proof** | `components/layout/sections/sognoscare/Proof.tsx` | scaffolded | Exists; styling status unverified |
| **SognosCare EditionPageTemplate** | `components/layout/sections/sognoscare/EditionPageTemplate.tsx` | done | Shared template: Hero/WhatItSolves/Features/Advantages/ProofStories. **Advantages bg per-edition (2026-07-02):** `Advantages` section className uses `data.accentBgClass` — each edition page supplies its `bg-sognos-edition-*` token via this existing field. Main product page unaffected (uses standalone `Advantages.tsx`). ⚠️ Contrast flag: pale tokens (`aged-care`, `allied-health`, `support-at-home`, `hospital-in-the-home`, `child-and-family`) render white text on light backgrounds — deferred. |
| **Roster Hero** | `components/layout/sections/sognosroster/Hero.tsx` | done | **Matches SognosCare Hero pattern (2026-07-02).** `"use client"` + Framer Motion. Same `useScroll`/`useTransform`/`useReducedMotion` wiring as Care Hero. `y: [0,1]→[0,60]`, `opacity: [0,0.7]→[1,0]`. Placeholder card: `rounded-t-2xl` → `rounded-lg`. bg `bg-sognos-roster-dark`, gradient `bg-sognos-roster-gradient`. |
| **Roster Problems** | `components/layout/sections/sognosroster/Problems.tsx` | done | `bg-sognos-roster-dark`. All text inverted to `text-white`/`text-white/60`. Tab switcher: `bg-white/10 border-white/20`; active-without `bg-white text-sognos-heading`; active-with `bg-sognos-blue-accent`. Grid dividers `border-white/10`. Accent bar → `bg-sognos-roster-base`. **Top padding removed (2026-07-02):** `py-20 md:py-28` → `pb-20 md:pb-28` — top space handled by SubNav wrapper in page.tsx (`pt-20 pb-16 md:pt-28`) to match Care's SubNav-inside-section rhythm. |
| **Roster Features** | `components/layout/sections/sognosroster/Features.tsx` | scaffolded | |
| **Roster Advantages** | `components/layout/sections/sognosroster/Advantages.tsx` | done | Rewritten to match Care Advantages pattern — `bg-sognos-roster-base`, AngelList checklist, Framer Motion stagger, white CheckIcon, striped rows. |
| **Genogram Hero** | `components/layout/sections/sognosgenogram/Hero.tsx` | done | **Matches SognosCare Hero pattern (2026-07-02).** `"use client"` + Framer Motion. Same `useScroll`/`useTransform`/`useReducedMotion` wiring as Care Hero. `y: [0,1]→[0,60]`, `opacity: [0,0.7]→[1,0]`. Placeholder card: `rounded-t-2xl` → `rounded-lg`. bg `bg-sognos-genogram-dark`, gradient `bg-sognos-genogram-gradient`. |
| **Genogram Problems** | `components/layout/sections/sognosgenogram/Problems.tsx` | done | `bg-sognos-genogram-dark`. All text inverted. Cards: `rounded-lg bg-white/5 border-white/10`. Number badge: `bg-sognos-genogram-base/30 text-sognos-genogram-base`. Fixed `rounded-xl` → `rounded-lg`, `gap-5` → `gap-3 lg:gap-4`. **Top padding removed (2026-07-02):** `py-24` → `pb-24` — same rhythm fix as Roster Problems. |
| **Genogram Features** | `components/layout/sections/sognosgenogram/Features.tsx` | scaffolded | |
| **CustomerStories** | `components/layout/sections/CustomerStories.tsx` | done | **Thin wrapper** — renders `<ProductCustomerStories stories={ALL_STORIES} />`. All slider, card, and palette logic is in `ProductCustomerStories`; zero duplication. Added back to homepage `app/(marketing)/page.tsx` after `<NewsInsightSection>`. |
| **ProductCustomerStories** | `components/layout/sections/ProductCustomerStories.tsx` | done | **AngelList two-panel layout + Embla full-bleed peek slider with gutter-inset first/last slides.** Section: `bg-white overflow-hidden`, no `data-header-dark`. Three-layer structure: (1) heading `max-w-7xl` constrained; (2) Embla viewport full-bleed (`relative overflow-hidden`, breaks out of container); (3) chrome `max-w-7xl` constrained. Flex container: `paddingLeft` only (inline `max(1.5rem, calc((100vw - 86.25rem) / 2 + 1.5rem))`); no `paddingRight` (browsers exclude trailing padding from `scrollWidth`). Slides: `shrink-0 min-w-0 w-[calc(100vw-3rem)] lg:w-[calc(100vw-12rem)] max-w-[1332px]` with `mr-6 sm:mr-8` on all slides EXCEPT the last (no gap prop — using margin-right avoids auto-gap before trailing spacer). Trailing spacer div (`aria-hidden`, `width = gutter formula`) extends `scrollWidth` by exactly the gutter, clamping last slide's right edge to the right gutter. Embla: `loop: false`, `align: "center"`, `containScroll: "trimSnaps"`, autoplay 10s `stopOnInteraction`. Verified at 1280px: `scrollWidth=4496`, `maxScroll=3216`, `slide0Left=24`, `lastSlide.right=1256`, `rightGap=24`. First slide: left at gutter, no left peek. Middle slides: both-side peek. Last slide: right at gutter, no right peek. Arrows disable at bounds. **Arrow hover:** fill-slide-up mechanic — `group/btn` scoped per-button, `absolute inset-0 translate-y-full bg-sognos-navy-dark` fill span slides to `translate-y-0` on hover; icon `group-hover/btn:text-white` (dark fill = white icon, inverse of light-pastel editions). `disabled:pointer-events-none` blocks fill on disabled arrows. **Cards:** `TESTIMONIAL_PALETTE = ["bg-sognos-care-dark", "bg-sognos-roster-dark", "bg-sognos-genogram-dark"]` assigned by `i % 3`. `StoryCard` takes `bg` prop. All text white; role `text-white/70`; stat labels `text-white/60`. Logo `brightness-0 invert`. **Borders:** stat hairline only — `border-b border-white/15` between Company Size / Industry (`pb-3`/`pt-3`); no logo border; no column divider. **`CaseStudy` type:** legacy `*Class` fields removed — type is now minimal (company/companySize/industry/logo/panelImage/panelVideo?/quote/author/role/href). `ALL_STORIES` is the canonical data array, shared by both `CustomerStories` (homepage) and `sognoscare/Stories.tsx` wrappers. No body horizontal scroll. Build green. **Card body restructured to AngelList layout (2026-07-02):** grid `md:grid-cols-11` → `md:grid-cols-12`, split `7 / gap / 3` → `8 / 4` (~2:1 text:image, no gap column). Left col: removed h3 company title; order is now `blockquote → "Read Customer Story" link → (mt-auto spacer) → author + role bottom-LEFT | logo bottom-RIGHT` (bottom row `flex items-end justify-between gap-6`). Quote sized up `text-lg lg:text-[22px]` → `text-xl md:text-2xl`. Author/role `text-sm text-white/70` → `text-base text-white`. Logo `h-7` → `h-14`, `brightness-0 invert flex-shrink-0`. Right col: full-bleed image — removed `p-4 lg:p-6` padding, removed inner `rounded-lg overflow-hidden mb-4`, removed the stats block entirely (Company Size + Industry + `border-white/15` hairline). Image is now `relative md:col-span-4 min-h-[280px] md:min-h-0 bg-white/5` with `Image fill object-cover` (or `<video>`), clipped flush to card's outer `rounded-lg overflow-hidden` on the right/top/bottom edges. Card min-h reduced `min-h-[420px] md:min-h-[480px]` → `min-h-[360px] md:min-h-[440px]`. `CaseStudy` type retains `companySize`/`industry` fields — data preserved for future use, just not rendered here. Graceful no-image degradation: `bg-white/5` shows as subtle accent panel if `panelImage` and `panelVideo` are both absent. Build green. **Slider → SLIDER_PATTERN Shape 3 (center-focus, 2026-07-06):** the trailing-peek mechanics above are superseded — removed the `paddingLeft: max(...)` gutter-inset, the trailing spacer div, and the per-slide `mr-6 sm:mr-8`. Slides are now `min-w-0 flex-[0_0_100%] pl-3 lg:flex-[0_0_50%] lg:pl-4` on a `flex -ml-3 lg:-ml-4` container; with the unchanged `align:"center"` this centres the active card and peeks prev/next on **both** sides (`basis-1/2` on lg). Embla config (`loop:false`, `align:"center"`, `containScroll:"trimSnaps"`), Autoplay 10s, dots, arrow chrome, `showChrome`/single-story path, and all state/handlers unchanged. **Card-proportion flag:** at half width the `md:grid-cols-12` card + `lg:text-3xl` quote likely wraps tighter — not addressed here, pending a styling pass. |
| **AboutBeliefs** | `components/layout/sections/AboutBeliefs.tsx` | done | **Simplified to static Server Component (2026-07-02).** `bg-sognos-navy py-20 lg:py-28`. Single `rounded-lg border-white/10 bg-white/5 p-10 lg:p-14` card. Two-col grid: left = h2 "Our Beliefs" (`text-3xl lg:text-4xl`) + intro `text-white/60`; right = 3 VALUES (`space-y-8 lg:border-l lg:border-white/15 lg:pl-16`). Values: "Respect for the individual", "Value to our customers", "Excellence in all that we do". No tabs, no pills, no slider, no dots, no `"use client"`. |
| **AboutValues** | `components/layout/sections/AboutValues.tsx` | done | **New component (2026-07-02), full-bleed stacking sticky cards.** Server Component. Section `bg-white`. Title "Our Values" in `mx-auto max-w-7xl` before cards. Two cards: Mission (`bg-sognos-blue-accent`, z-10, `top: 80px`) + Vision (`bg-sognos-navy`, z-20, `top: 136px`). **Full-bleed**: sticky div IS the card bg (no max-w wrapper around card bg). Inner content: `mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-10 lg:pt-8 lg:pb-16 flex flex-col justify-between min-h-[520px] lg:min-h-[56vh]`. **Reveal**: 56px sliver of card 1 visible above card 2 when stacked (top-136 − top-80 = 56; pt-6=24px so 32px of eyebrow text shows). **Corners**: `rounded-t-lg` only — top rounded, bottom square. No scroll buffer — Vision card flows directly into `<AboutBeliefs />`. No horizontal overflow: `w-full` default, no `w-screen`. **Restructured 2026-07-05:** section-level `<h2>Our Values</h2>` block removed; each card's inner content is now equal-width `lg:grid-cols-2` centred within the min-height — col 1 = shared eyebrow "Our Values" (`text-white/70`) + per-card title "Mission"/"Vision" (`lg:text-5xl text-white`); col 2 = `statement` as body copy (`text-base leading-relaxed text-white/80`, no longer the large statement type). `number` field + badge dropped. Sticky/`bg`/`statement` copy unchanged. |
| **AboutStats** | `components/layout/sections/AboutStats.tsx` | done | **New component (2026-07-02).** `"use client"`. 3 stats: 2016/Founded, 10+/Years, 3/Countries served. `CountUpStat`: `IntersectionObserver` threshold 0.4 (fires once); `requestAnimationFrame` ease-out cubic 1100ms; year starts from `Math.floor(value * 0.97)`, small numbers from 0; `useReducedMotion()` guard. Dividers: `border-r border-(--sognos-line)` on non-last, `pl-10 md:pl-12` on non-first. Rendered inside About section after body paragraphs. |
| **KnowledgeHubArchive** | `components/layout/sections/KnowledgeHubArchive.tsx` | done | **Refactored to AngelList /blog pattern (2026-07-02).** Removed: sticky sidebar, industry dropdown, 3-col grid, excerpt on cards, `rounded-2xl` empty state, `bg-(--sognos-bg-sunken)` section bg. New structure: (1) horizontal pill row (All + 5 categories + Clear) — `rounded-full` pills, active = `border-sognos-navy-dark bg-sognos-navy-dark text-white`; (2) featured article two-up `lg:grid-cols-2` — always first/newest, unfiltered; (3) `<hr>` divider; (4) `● All articles` 4-up grid `lg:grid-cols-4` — filtered by active pill, `gap-3 lg:gap-4`; (5) navy Case Study band `bg-sognos-navy` — hardcoded Flourish Australia placeholder with left-text + right `aspect-[4/3] rounded-lg` image slot. `ArticleCard`: `aspect-[16/10] rounded-lg` image, category badge (colour-coded per BADGE_STYLES), title only (no excerpt). Empty state: `rounded-lg` (was `rounded-2xl`). **Date/readTime/author added (2026-07-02):** `Article` type extended with `publishedAt?`, `readTime?`, `author?`. `KNOWLEDGE_POST_ARCHIVE_QUERY` fetches `readTime` + `author` from Sanity (both plain strings). `ArticleMeta` helper: `"MMM D, YYYY — N MIN READ"`. Featured: date + readTime + initial-avatar + author name. Grid cards: date + readTime + `pb-6 border-b border-gray-200`. Grid gap → `gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12`. Pills: all `bg-gray-100 text-gray-600 rounded-lg`, per-category `BADGE_STYLES` removed. Case Study band hardcoded `January 2025 · 5 min read`. **Header + featured revised (2026-07-05):** page `<h1>`/description moved out of the parent hero into the archive header — passed down as new `title: string` / `description?: string` props (parent `knowledge-hub/page.tsx` now renders only `<KnowledgeHubArchive>`); header section owns navbar clearance `pt-32 lg:pt-40 pb-10`. Featured article: grid `items-center` → `items-start`; meta column `flex h-full flex-col justify-between` (category/title/excerpt grouped top, `<ArticleMeta>` date/read-time bottom-pinned level with the image); **author avatar+name block removed**. **"Featured" pill + three-way state (2026-07-05):** pills = Featured → All Articles → Milestone → News → Events → Webinar → Insights (Featured + All Articles are special, no count; categories keep counts; shared `pillClass(isActive)` helper). State `type PillSelection = "featured" \| "all" \| category`, default `"featured"`, `initialCategory` resolved via `resolveSelection()`. **Featured:** featured block + intro `title`/`description` shown, grid `articles.slice(1)`, "All articles" heading shown. **All Articles / a category:** featured block hidden, header title = pill label + eyebrow "Knowledge Hub" (`text-xs uppercase text-sognos-muted`) above it, description hidden, grid = full `articles` (filtered for a category), "All articles" heading hidden. Header title zone is `flex flex-col lg:min-h-[160px]` (reserves height so pills never shift); non-featured adds `lg:justify-end` (title drops down, eyebrow above). Pills sit **below** the title/description (`mt-10`, not right-aligned). |
| **ProofSection** | `components/layout/sections/ProofSection.tsx` | done | Video bg compliance card, image bg bento grid |
| **TeamSection** | `components/layout/sections/TeamSection.tsx` | done | **Rebuilt 2026-07-06 — nav + auto-playing profile card** (was photo-cards + drawer modal). `"use client"`, `bg-white`, no eyebrow pill, title "Meet our senior leadership team". `grid lg:grid-cols-[300px_1fr]`. **Conforms to `SLIDER_PATTERN.md` Shape 1** (corrected 2026-07-06). Hard DOM swap at `lg` via `useIsMobile()` (`matchMedia("(max-width:1023.98px)")`) — `isMobile ? <MobileLeadership/> : <DesktopLeadership/>` in separate child components (inactive layout fully unmounted; SSR/pre-mount → desktop). **Desktop** = **Col 1 nav** (sticky `lg:top-[120px]`): names uppercase `tracking-[0.15em]`, active `text-sognos-blue-accent`/grey; **per-item eased rail** — one full-height `w-[2px] overflow-hidden bg-sognos-line` track + one `absolute inset-0 bg-sognos-blue-accent` overlay whose `translateY` is set imperatively per rAF frame: elapsed **within the current item's** 10s window → `p=elapsed/AUTOPLAY_MS` → `easeOutCubic` → `translateY(-(1-eased)*100%)`, **resets to `-100%` each item** (autoplay derived from the same loop; `select(i)` nulls `itemStartRef` to restart window + rail). **`layoutId="team-nav-marker"` active-name marker** (`h-2 w-2 bg-sognos-blue-accent` square, spring `damping:30/stiffness:300`) rendered `{isActive && …}` — offset to `left-3` (into the gap between the 2px rail at `left-0` and the name at `pl-8`) so it coexists with the fill without overlapping (restored 2026-07-06 after the offset fix). **Col 2 card**: `border border-sognos-line rounded-lg`, `AnimatePresence mode="wait"` opacity crossfade **0.3s `ease` (`[0.25,0.1,0.25,1]`)**, inner `md:grid-cols-2` — LinkedIn top-left + name/role/bio (first paragraph, `line-clamp-4`) `justify-between` left, photo `fill` right (`min-h-[340px]`). Section is **not** `overflow-hidden` (would break the sticky nav). **Mobile** = full-section-width Embla peek slider (**Shape 2, now deprecated** — last remaining Shape 2 user after `ProductCustomerStories` moved to Shape 3 2026-07-06; can migrate to Shape 3 separately): `{loop:false, align:"start", containScroll:"trimSnaps"}`, `Autoplay delay=AUTOPLAY_MS stopOnInteraction`, `paddingLeft:1.5rem` + trailing spacer, cards `basis-[70%] max-w-[380px] mr-6` → slidesPerView ≈1.43 / peek ≈30%, image+name+role+LinkedIn — own `overflow-hidden`. `AUTOPLAY_MS=10000`, `TEAM` + `LinkedInIcon` unchanged. |
| **LifeAtSognos** | `components/layout/sections/LifeAtSognos.tsx` | done | Careers page — 3-col tabs/image/quote |
| **OpenRoles** | `components/layout/sections/OpenRoles.tsx` | done | Filterable roles list |
| **SocialResponsibilitySection** | `components/layout/sections/SocialResponsibilitySection.tsx` | done | |
| **ProductSection** | `components/layout/sections/ProductSection.tsx` | done | Client component; Framer Motion drawer pattern |
| **LegalPageRenderer** | `components/layout/sections/LegalPageRenderer.tsx` | done | Sanity-backed legal page renderer |
| **HowSognosWorksPreview** | `components/layout/sections/HowSognosWorksPreview.tsx` | done | Includes `SystemFlowDiagram` |
| **ProductCard** | `components/layout/sections/ProductCard.tsx` | done | Homepage product card |
| **SolutionUseCases** | `components/layout/sections/SolutionUseCases.tsx` | scaffolded | |
| **SolutionHeroDemoButton** | `components/layout/sections/SolutionHeroDemoButton.tsx` | scaffolded | |
| **PlatformFlow** | `components/layout/sections/PlatformFlow.tsx` | scaffolded | |
| **PlatformPillars** | `components/layout/sections/PlatformPillars.tsx` | scaffolded | |
| **HomepageOutcomes** | `components/layout/sections/HomepageOutcomes.tsx` | scaffolded | |
| **HomepageProblem** | `components/layout/sections/HomepageProblem.tsx` | scaffolded | |
| **ComingSoonHero** | `components/layout/sections/ComingSoonHero.tsx` | scaffolded | |

---

## 6. Route / page map

### Homepage — `app/(marketing)/page.tsx`

```
<Hero />               // Navy, text-only block — heading/subtext/CTAs, cards peek below
<HomeProductCards />   // 3-product AngelList cards (Care/Roster/Genogram) — navy bg, continuous zone
<LogoStrip />          // Sanity marquee — "Trusted by…"
<HowSognosWorks />     // "Safe. Flexible. Independent." — 3 blocks
<IndustrySection />    // Snap-scroll square industry cards
<SolutionsSection />   // "Our models. Your business." tab-switcher
<NewsInsightSection /> // "The latest news" — callout cards
// [CTABand injected by layout]
// [Footer injected by layout]
```

### SognosCare — `app/(marketing)/products/sognoscare/page.tsx`

```
<SognoscareHero />
<ProductTrustStrip className="bg-sognos-care-dark" />
<SognoscareProblems subNav={<ProductSubNav … />} />
<SognoscareFeatures />
<SognoscareEditions />
<SognoscareAdvantages />
<SognoscareStories />
// [CTABand + Footer via layout]
```

### Solutions hub — `app/(marketing)/solutions/page.tsx`

Simple grid of solution cards; no CTASection (removed).

### Solutions detail — `app/(marketing)/solutions/[slug]/page.tsx`

Dynamic route; 7 static slugs: `frontline`, `crm`, `insights`, `experience`, `service`, `power-platform`, `quick-start`. Content from `lib/solutions-content.ts`. CTASection removed.

### Industries hub — `app/(marketing)/industries/page.tsx`

Grid of 5 industry cards. CTASection removed.

### Industries detail — `app/(marketing)/industries/[slug]/page.tsx`

5 static slugs. Content from `lib/industries-content.ts`. CTASection removed.

### Products hub — `app/(marketing)/products/page.tsx`

Product grid + `BetterTogether`. CTASection removed.

### SognosRoster — `app/(marketing)/products/sognosroster/page.tsx`

Sections: Hero, Problems (white bg — dark pending), Features, Advantages, Stories.

### Sognos Genogram — `app/(marketing)/products/sognosgenogram/page.tsx`

Sections: Hero, SubNav, Problems (white bg — dark pending), Features, Stories.

### Other routes

| Route | Notes |
|-------|-------|
| `/knowledge-hub` | `KnowledgeHubArchive` — title/description + category pills in one header row (props-driven, 2026-07-05), featured two-up (author removed, bottom-pinned meta), 4-up grid, navy case-study band |
| `/knowledge-hub/[slug]` | **Refactored 2026-07-02 — AngelList blog-article layout.** `lg:grid-cols-[200px_1fr]` shell: sticky left rail (`lg:sticky lg:top-[104px]`) with back-link, category badge, "Written by" avatar+name, share icons (LinkedIn/X/Facebook); centered `max-w-[46rem]` prose column with title, excerpt subtitle, date/read-time meta, hero image, styled Portable Text body (upgraded blockquote → large accent-coloured pull-quote). NEXT/prev links removed — replaced with "Latest articles" 3-up grid reusing the archive's `ArticleCard` (now exported from `KnowledgeHubArchive.tsx`), sourced via `getKnowledgePostArchive()` filtered to exclude the current slug, latest 3. |
| `/company/about` | **Refactored 2026-07-02, hero + About restructured 2026-07-05.** (1) Hero: now **`bg-white`, light theme** (removed from `DARK_HERO_PATHS`). `grid items-end lg:grid-cols-12`: left `lg:col-span-7` = eyebrow "About Sognos" + `h1` (`lg:text-7xl`) + intro paragraph; right `lg:col-span-5` = "Explore Careers" pill (`flex lg:justify-end`, `bg-sognos-navy` hover `bg-sognos-blue-accent`), bottom-aligned with the intro via `items-end`. `<AboutHeroImage>` below (full-viewport → parallax on scroll). (2) About section (`bg-white`): **`lg:grid-cols-2` equal-width** — col 1 = eyebrow **"Our Story"** + `h2` "Healthcare First…" (`lg:text-5xl`); col 2 = 4 body paragraphs (top-aligned with the eyebrow, no `mt-8`) + `<AboutStats />`. (3) `<AboutValues />` — full-bleed stacking sticky cards (Mission blue-accent top:80, Vision navy top:136, `rounded-t-lg`, no buffer, flows into Beliefs); inner cards restructured to `lg:grid-cols-2` (eyebrow "Our Values" + title left, statement right) 2026-07-05. (4) `<AboutBeliefs />` — static Server Component, single card, 3 values. (5) `<TeamSection />` — rebuilt 2026-07-06 to a sticky nav + auto-playing profile card (see component row). Unchanged: Partners, `<SocialResponsibilitySection />`. |
| `/company/careers` | `LifeAtSognos`, `OpenRoles` |
| `/company/social-responsibility` | `SocialResponsibilitySection` |
| `/contact` | `ContactForm` |
| `/customer-stories` | Hub — hardcoded `STORIES` array (not Sanity-backed), `data-header-dark` gradient hero (pre-dates `DARK_HERO_PATHS`) |
| `/customer-stories/[slug]` | **Refactored 2026-07-02, extended 2026-07-05.** Server Component. Route matched via `DARK_HERO_PATH_PREFIXES` (transparent-over-navy navbar). Components now live under `components/layout/sections/customer-stories/`. **Hero** = `<HeroScrollFade>` client wrapper (`relative overflow-hidden bg-sognos-navy`) with SognosCare-style scroll parallax/fade (`useScroll` `["start start","end start"]`, `y:[0,1]→[0,160]`, `opacity:[0,0.7]→[1,0]`, reduced-motion guard). Hero: back-link + Category label + `<h1>` + 3-col grid (image `lg:col-span-2` + meta col with `Industry/State/Size` bottom-anchored via `lg:mt-auto`). **Body** (`bg-white`, `lg:grid-cols-3`): **col 1** = one `lg:sticky lg:top-[100px]` wrapper stacking (a) `<StoryArticleNav>` scroll-spy rail ("In This Article", server pre-pass over `h2` blocks → `layoutId="article-rail-bullet"`, nav items `text-sm`, `getDocTop()` checkpoint at `scrollY+140`), (b) a `bg-sognos-line` hairline, (c) `<StoryMetaRail>`. **`StoryMetaRail` is now a plain Server Component** (2026-07-05 — motion removed, `motion.aside`→`<aside>`, `"use client"` dropped); renders `Customer` (= `story.company`) → Industry → State → Size → Download (if `downloadUrl`) → Share, dividers `bg-sognos-line`, "Share" label `text-sognos-muted`. `company`/`description`/`product` props no longer passed (heading/description block guards behind `{(company||description)&&…}`). **col 2** = `<ScrollReveal y={24}>` (fade+slide-up on scroll-in) wrapping Portable Text prose (`max-w-[46rem]`) then the **quote card at the end of content** (product-mapped dark tone or Sanity `brandColor.hex`, author/role, **no company logo** — removed 2026-07-05). `h2` serializer emits `id={slugify(text)}` + `scroll-mt-28 md:scroll-mt-32` for scroll-spy targets. **Bottom 3-up** = "What to read next" (`ProductCustomerStories` heading-block pattern: h2 + exported `SeeMoreLink`) on `bg-gray-100` (no top border), `ArticleCard` grid via `getCustomerStoryArchive()`. New components (2026-07-05): `StoryArticleNav.tsx`. Quote card bg driven by Sanity `brandColor.hex` (falls back to `lib/customerStoryBrand.ts` map, then product-dark tone). |
| `/company/privacy-policy` etc. | `LegalPageRenderer` (Sanity) |

### Marketing layout — `app/(marketing)/layout.tsx`

Wraps all marketing routes. Provides: `CtaContentProvider`, `BookDemoProvider`, `<Navbar />`, `<main>{children}</main>`, `<CTABand />`, `<Footer />`, `<BookDemoModal />`.

---

## 7. Recently completed

- **Phase 4 colour rollout** — 4-phase migration from `sognos-brand/accent/prussian-blue-*` → lean `sognos-*` tokens. Dead token purge. `tokens.css` is clean lean file. `@theme inline` repointed. Navy bridge kept (`prussian-blue-800/900/950` → `var(--sognos-navy)`).
- **SognosCare Hero motion refactor** — scale zoom removed; parallax softened; bottom padding cut to `pb-8 md:pb-12`.
- **SognosCare Problems** — full rewrite to Lumos-style layout: problem block → generous whitespace → solution reveal → 5 slim capability columns. Light `bg-white` section. Scroll-spy rail archived to `docs/archive/`. Static pass — entrance motion in follow-up.
- **SognosCare Advantages** — full replacement with AngelList checklist: dark bg, striped rows, framer stagger.
- **ProductTrustStrip** — new global/reusable trust strip with 5 white logos. Wired to SognosCare page.
- **CTABand global promotion** — moved from homepage-only to marketing layout (above Footer). `useBookDemo` modal removed; button `disabled` interim.
- **CTASection removed** from all marketing page imports (file retained on disk).
- **ProductFeaturesScroll refactor** — side-by-side `lg:grid-cols-2` cards; per-card sticky stacking removed; `PlaceholderBox` in visual column.
- **PlaceholderBox** — self-measuring `ResizeObserver` component for Lottie slot sizing.

---

## 8. Pending / next

> Granular per-feature backlog with implementation notes lives in FEATURE_LOG.md.

**Ordered per `CLAUDE.md` §9:**

1. ~~**ProductSubNav dock-from-bottom**~~ — ✅ Done. Fixed bar slides in from under navbar; `IntersectionObserver` on sentinel; `dockBg` prop for per-product theming.
2. **Solutions pages Cohere port** — section-by-section refactor of `solutions/[slug]/page.tsx`. Ask for per-section mapping before starting. Phase 6.
3. **Roster + Genogram Problems dark sections** — apply `bg-sognos-roster-dark` / `bg-sognos-genogram-dark` + inverted text pattern. Reference: archived scroll-spy rail (`docs/archive/sognoscare-Problems.scrollspy-rail.tsx`). Phase 7.
3a. **SognosCare Problems entrance motion** — Lumos choreography: sequenced label→statement→detail reveal, left→right column stagger, accent-bar `scaleX` reveal, `useReducedMotion` gating. Follow-up prompt after layout is approved.
4. **Lottie wiring** — replace `PlaceholderBox` with `LottieInView` player once export dimensions confirmed from live render.
5. **Edition token reconciliation** — purge old `--sognos-edition-green/orange/lime/coral/purple/pink` tokens; migrate `EditionCards.tsx` from hex-prop pattern to new `--sognos-edition-*` tokens.
6. **Status colour `#10B981` → `--sognos-success`** — 5 hardcoded instances in `Features.tsx` `FeatureVisual` (likely moot if replaced by Lotties, but should be cleaned regardless).
7. **Type scale lock pass** — replace standard Tailwind defaults in `@theme inline` with custom Sognos values.
8. **Workhorse token purge** — swap `--color-wh-*` / `--radius-wh-*` / `--shadow-wh-*` to Sognos tokens once layout is locked.
9. **`/book-demo` dedicated page** — build the page, then replace `CTABand` disabled button with `<Link href="/book-demo">`.
10. **Build customers hub** — `/customers`, `/customers/[slug]`.
11. **AngelList nav refinement** — on top of the Cohere rewrite, per sprint plan.

---

## 9. Known token TODOs / risks

| Item | Risk | Action |
|------|------|--------|
| Dual edition token sets in `tokens.css` | Confusion about canonical source; `EditionCards` bypasses both | Purge old 6 tokens; update `EditionCards` to consume `--sognos-edition-*` |
| `#10B981` hardcoded (5×) | Diverges from `--sognos-success` | Fix when Features FeatureVisual is replaced by Lottie |
| `--sognos-bg-sunken` in 12 refs | Needs a lean replacement token or inline Tailwind class | Define replacement or inline at call sites |
| Workhorse tokens in `@theme` | May generate unwanted Tailwind utilities | Purge after layout is locked |
| Type scale is Tailwind defaults | No Sognos-specific typographic rhythm | Lock pass needed; update DESIGN_MIGRATION_STATE after |
| `CTASection.tsx` file on disk | Could confuse future contributors | Delete the file explicitly once confirmed unused |
| ~~`--font-bureau-sans`~~ | ~~Unclear if Bureau Sans is licensed/loaded for production~~ | **RESOLVED 2026-07-02** — Bureau Sans purged. Inter (via `next/font/google`) is now the single font for both body and heading; AngelList variable font added for accent use. |

---

## 10. File map

| File | Purpose |
|------|---------|
| `app/globals.css` | Tailwind v4 entry; `@theme inline` for all token names + type scale; `@layer base` defaults; CSS keyframes for marquees, callout-card notch, SFD diagram, mega-menu |
| `app/tokens.css` | All `:root` CSS variable values — primitive palette ramps, lean `--sognos-*` system, edition colours, gradients, shadows, radius, layout, typography tokens |
| `app/(marketing)/layout.tsx` | Shared marketing layout: `BookDemoProvider`, `CtaContentProvider`, `Navbar`, `CTABand`, `Footer`, `BookDemoModal` |
| `app/(marketing)/page.tsx` | Homepage — 8 sections |
| `components/layout/Navbar.tsx` | Aceternity pill navbar: floating `rounded-full` pill, `layoutId="nav-hover-pill"` hover highlight, single content-fit dropdown panel (measurer → `panelX` spring + `panelWidth` state), `variant` prop seam, 3-state scroll, **AngelList two-level full-screen mobile menu** (2026-07-02): `fixed inset-0 z-[51] bg-white`, `AnimatePresence mode="wait"` root↔sub slide, `mobilePanelDirectionRef` for directional enter |
| `components/layout/Footer.tsx` | Footer with `FooterColumns` client split |
| `components/layout/FooterColumns.tsx` | Client component for mobile accordion Framer Motion |
| `components/layout/sections/CTABand.tsx` | Global "Book a Demo" band with dual logo marquees. `disabled` button. |
| `components/layout/sections/ProductTrustStrip.tsx` | Reusable trust strip (5 white logos, static). Used on product pages. |
| `components/layout/sections/ProductFeaturesScroll.tsx` | Features scroll: sticky left rail + scroll-spy + side-by-side cards. Lottie slot pending. |
| `components/ui/PlaceholderBox.tsx` | Self-measuring Lottie placeholder with live W×H display. Temporary. |
| `components/layout/sections/SolutionsSection.tsx` | Animated tab-switcher. **Canonical motion reference.** |
| `components/layout/sections/sognoscare/Hero.tsx` | SognosCare hero — AngelList pattern: static dark section bg, single motion.div wraps all content |
| `components/layout/sections/sognoscare/Problems.tsx` | Lumos-style light section: problem→solution blocks + 5 capability columns |
| `components/layout/sections/sognoscare/Advantages.tsx` | AngelList checklist — dark bg, framer stagger |
| `components/layout/sections/sognoscare/EditionCards.tsx` | Editions slider — AngelList fund-admin card pattern (scaffold); `accentColor` hex prop (token migration pending) |
| `components/layout/sections/sognoscare/EditionPageTemplate.tsx` | Shared template for all 6 edition pages |
| `lib/navigation.ts` | Navbar data — all nav items and mega-menu content |
| `lib/constants.ts` | `SITE`, `PRODUCTS`, `SOLUTIONS`, `INDUSTRIES` constants |
| `lib/solutions-content.ts` | Full page content for all 7 solutions |
| `lib/industries-content.ts` | Full page content for all 5 industries |
| `docs/DESIGN_MIGRATION_STATE.md` | This file — source of truth for design partner |
| `docs/FEATURE_LOG.md` | Granular feature backlog with implementation notes |
| `docs/CHANGELOG.md` | Append-only change history (date · what · files · why) |
| `docs/archive/` | Superseded audits and phase plans — historical only |
