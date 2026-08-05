> Granular feature backlog. High-level status lives in PROJECT_STATE.md.

# Sognos React — Feature Log

Running list of features to build, revisit, or decide on. Add as you go. No priority order unless noted.

---

## Navbar / Header

- [x] **Full mega-menu rewrite** — desktop mega-menu with `AnimatePresence mode="popLayout"` cross-fade, hover intent (100ms open / 150ms close grace), `grid grid-cols-[1fr_auto_1fr]` centred layout, mobile accordion with Framer Motion height animation + orange dot. (`Navbar.tsx`)
- [x] **Three-state scroll behavior** — `top` (transparent) → `hidden` (slides up on scroll down past 80px, DELTA_MIN=6) → `peek` (white bar on scroll up). rAF-throttled. (`Navbar.tsx`)
- [x] **Backdrop blur overlay** — desktop: `hidden lg:block z-40`, fades with `openMenu`; mobile: `lg:hidden z-40`, fades with `mobileOpen`, 72% mask (extends further down). (`Navbar.tsx`)
- [x] **Nav transitions overhaul** — all transitions unified at `duration-300 ease-in-out`; logo `transition-[filter]`; `pt-3` bridge kills dead hover gap; `mode="popLayout"` + `position: "absolute"` exit kills blank-frame cross-fade.
- [x] **Mobile/tablet improvements** — hamburger right-aligned (`flex justify-between` below `lg`); taller mobile header (`h-[76px] lg:h-[68px]`); tablet compact panel (`md:ml-auto md:w-[380px]`); "Book a Demo" left of hamburger on `sm`–`lg` (`hidden sm:inline-flex lg:hidden`).
- [ ] **Restore product hover-swap** — hovering a product name swaps the right column to show that product's sections. Marked `RESTORE_FLAG` in `Navbar.tsx`.
- [ ] **Restore chevron icons** — down-arrow chevrons on desktop nav labels. Marked `RESTORE_FLAG` in `Navbar.tsx`.
- [ ] **Transparent header on light-hero pages** — transparent state assumes dark hero. Light-hero pages (Solutions, Industries) need `data-hero-light` flag to switch text/pill to dark. Flagged in `Navbar.tsx`.

---

## ProductSubNav

- [x] **Pills-only rewrite** — IntersectionObserver scroll-spy, `layoutId="subnav-pill"` Framer Motion indicator, `group/card` hover; removed dock machinery, sticky bar, logo, Book-a-Demo button. (`ProductSubNav.tsx`)
- [x] **Embedded in Problems section** — `subNav` prop on `SognoscareProblems`, renders between heading and content on dark brand bg. (`sognoscare/Problems.tsx`, `sognoscare/page.tsx`)
- [ ] **Dock-from-bottom on scroll** — reappears fixed under navbar when scrolled past in-section position. Needs dark pill-container backdrop for legibility over lighter sections.
- [ ] **Per-product colours (Roster + Genogram)** — Roster `#3990c5`, Genogram `#250438`. Need dark bg + inverted text in their Problems sections (same pattern as SognosCare).

---

## Product Pages — SognosCare

- [x] **Hero cinematic zoom + parallax** — `useScroll` / `useTransform`: scale 0.9→1 (first 45%), y 0→−160px, opacity 1→0.2 (45%–100%); all four corners rounded; `pb-24 md:pb-32` prevents next-section overlap. (`sognoscare/Hero.tsx`)
- [x] **Editions — CalloutCard style** — morphing notch SVG, accent gradient bay (per-edition colour), white logo centred, title/description/`line-clamp-2`, "Read more" + arrow footer. (`sognoscare/EditionCards.tsx`)
- [x] **Editions — IndustrySection slider** — `scrollerRef`, `canPrev/canNext`, `updateArrows()`, `scrollByCard()` (offsetWidth + gap-5), `data-card` selector, solid-border `ArrowButton`, disabled/edge behaviour. (`sognoscare/EditionCards.tsx`)
- [x] **Editions section — dark brand bg** — `#03112f` bg, white heading, `text-white/70` intro, eyebrow pill removed. (`sognoscare/Editions.tsx`)
- [x] **EditionsDrawer removed** — drawer component, `drawerOpen` state, `onOpenDrawer` prop, "View all editions" trigger, `SOGNOSCARE_EDITIONS`/`EditionCards` imports all removed from `ProductSection.tsx`.
- [x] **Problems section dark bg** — `#03112f` bg, inverted text, `subNav` slot renders pill nav centred between heading and content. (`sognoscare/Problems.tsx`)
- [ ] **SognosRoster Problems dark section** — `#3990c5` bg + inverted text (same pattern).
- [ ] **SognosGenogram Problems dark section** — `#250438` bg + inverted text (same pattern).

---

## Solutions Pages

- [ ] **Routable refine** — `app/(marketing)/solutions/[slug]/page.tsx` (7 routes) still uses pre-scaffold `rounded-xl` / `shadow-md` / `bg-white py-24`. Needs a section-by-section Routable mapping before refactoring — ask, don't guess.

---

## Footer

- [x] **Mobile accordions** — tap-to-expand columns, Framer Motion height/opacity, independent toggles. Extracted `FooterColumns.tsx` as `"use client"` to preserve server async fetch in `Footer.tsx`.
- [x] **Acknowledgement separated** — own `border-t` row above copyright/legal row.

---

## Customer Stories

- [x] **Per-client brand card/quote colours** — client brand hex drives the ProductCustomerStories slider card bg and the customer-story detail quote card bg. Currently hardcoded in `lib/customerStoryBrand.ts` (`BRAND_BG`, keyed by company name): Flourish `#0096a9`, Auckland Airport `#151c6b`, Penrith City Council `#f26522`, Gentari Solar Australia `#60269e`. Product-dark tone / `TESTIMONIAL_PALETTE` as fallback.
- [x] **Move brand colour into Sanity** — 2026-07-03. `customerStory.brandColor` (`@sanity/color-input`, `disableAlpha: true`) added to the schema (Studio wired 2026-07-02). `brandColor.hex` surfaced via `STORY_BY_SLUG_QUERY` and `SOGNOSCARE_PAGE_QUERY.featuredStories[]`; `mapStory`/`CaseStudy` pass it through; consumed by `ProductCustomerStories` slider card and `customer-stories/[slug]` quote card as `story.brandColor ?? BRAND_BG[story.company]`. Hardcoded `lib/customerStoryBrand.ts` map retained as fallback.
- [ ] **Contrast/text-colour toggle on customer brand cards** — teal (`#0096a9`) and orange (`#f26522`) fail AA against white body text. Consider a paired text-colour field on the schema, or a computed lightness check.
- [ ] **Retire the `lib/customerStoryBrand.ts` fallback map** — once every `customerStory` doc has a `brandColor` set in Sanity.

---

## Other

- [ ] **Customers hub** — `/customers` hub + `/customers/[slug]` case study pages.
- [ ] **COMPLIANCE_VIDEO placeholder** — swap Shutterstock URL in `ProofSection` before launch.
- [ ] **SognosCare AVIF** — `SognosCare-logo-dark.avif` over-sized (300×96 displayed at 175×56), needs re-encode.
