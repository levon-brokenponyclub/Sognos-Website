# Sognos Website — Project Plan

> Alignment note: Updated during the architecture-alignment pass to remove legacy scaffold instructions and reflect the current implementation phase and approved content layers.

## Current Status

Phases 1–5b complete. 27 routes live and statically generated. Phase 6 (Cohere scaffold) in progress — homepage done, solutions/product/industry pages pending. Phase 7 (UI polish) in progress — major items completed this sprint.

Also complete outside the original phase plan:
- `/contact` page — built and live
- `/knowledge-hub` — renamed from `/resources`, includes KnowledgeHubArchive with sticky filters + 6 real articles
- Homepage Cohere scaffold — full section-by-section port, new components: `HowSognosWorks`, `SognosCareCard`, `SognosRosterCard`, `CTABand`; reworked: `Hero`, `IndustrySection`, `NewsInsightSection`
- Sanity CMS integration — CMS-driven across products, posts, global content, legals, footer, site settings

Immediate focus:
- Phase 7 — ProductSubNav dock-from-bottom
- Phase 6 — Solutions pages Cohere port (`solutions/[slug]/page.tsx`)
- Phase 7 — Roster + Genogram Problems dark sections

## Phase Plan

### Phase 1: Foundation and Setup

Completed:
- Next.js App Router scaffold
- global layout
- marketing route group
- navbar and footer shell
- initial shared constants

### Phase 2: Homepage Structure

Completed:
- `Hero`
- `LogoStrip`
- `HowSognosWorksPreview`
- `ProductSection`
- `HowItWorks`
- `SolutionsSection`
- `IndustrySection`
- `ProofSection`
- `CTASection`

Current homepage composition:

```tsx
<Hero />
<LogoStrip />
<HowSognosWorksPreview />
<ProductSection />
<SolutionsSection />
<HowItWorks />
<IndustrySection />
<ProofSection />
<CTASection />
```

### Phase 3: Alignment and Source-of-Truth Cleanup

Completed:
- align core documentation with the live architecture
- remove standalone Platform references from shared content/navigation surfaces
- normalize solution and industry taxonomy
- ensure footer and shared constants reflect the final spec

Exit criteria:
- docs, shared constants, footer, and homepage taxonomy all agree
- no contradictory nav or sitemap references remain

### Phase 4: Product Pages

Completed:
- `/products/sognoscare` — Hero, Problems, Features, Editions (4 care-sector), Proof, Stories, Compliance, Integration, CTA
- `/products/sognosroster` — Hero, Problems, Features, Proof, Stories, Integration, CTA
- `/products` — Product hub with comparison cards and Better Together section
- SognosCare Editions: Disability & Mental Health, Allied Health, Support at Home, Residential Aged Care
- Edition-specific CSS tokens: `--sognos-edition-green/orange/coral/purple`
- Tailwind v4 CSS variable syntax applied across all components (`bg-(--token)`)

### Phase 5: Solutions and Industries Pages

Completed:
- `/solutions` — Solutions hub (grid of 7 solutions)
- `/solutions/[slug]` — Dynamic solution pages, 7 static routes: Frontline, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start
- `/industries` — Industries hub (grid of 5 industries with product chips)
- `/industries/[slug]` — Dynamic industry pages, 5 static routes: Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities
- `lib/solutions-content.ts` — full hero/pain points/capabilities/platform/worksWithCare/worksWithRoster per solution
- `lib/industries-content.ts` — full hero/challenges/howSognosHelps per industry
- "Works with" product chips on solution pages — shown only where genuine relationship exists
- 22 total routes, all statically generated

### Phase 5b: SognosGenogram ✅ Complete

SognosGenogram added as third primary product.

Delivered:
- `genogram` added to `lib/constants.ts` PRODUCTS
- Genogram added to `lib/navigation.ts` under Products dropdown
- `/products/sognosgenogram/page.tsx` scaffolded
- `ctaLink` and `story.href` in ProductSection wired to `/products/sognosgenogram`
- Genogram card in product hub `/products/page.tsx`
- Logo: `/public/logos/SognosGenogram-logo.svg`

### Phase 6: Cohere Scaffold Clone — In Progress (started 2026-06-09)

Cloning each page section-by-section from Cohere as a design scaffold, keeping Sognos copy/assets.

Completed:
- **Homepage** — full section-by-section port. New: `HowSognosWorks`, `SognosCareCard`, `SognosRosterCard`, `CTABand`. Reworked: `Hero`, `IndustrySection`, `NewsInsightSection` (morphing SVG notch). Container token → 1380px.

Pending:
- **Solutions pages** — `app/(marketing)/solutions/[slug]/page.tsx` (7 routes). Pre-scaffold code still uses `rounded-xl`/`shadow-md`/`bg-white py-24`. Need per-section Cohere mapping before starting.
- **Product pages** — after solutions
- **Industry pages** — after product pages
- **Blog / Customer Stories** — pending

### Phase 7: UI Polish and Motion — In Progress (started 2026-06-10)

Completed:
- **Navbar full rewrite** — Cohere mega-menu, `AnimatePresence mode="popLayout"` cross-fade, hover intent (100ms open / 150ms close), `grid grid-cols-[1fr_auto_1fr]`, mobile accordion + orange dot
- **Three-state scroll behavior** — `top` / `hidden` / `peek`, `HIDE_AFTER=80`, `DELTA_MIN=6`, rAF-throttled
- **Nav transitions overhaul** — `duration-300` unified; logo `transition-[filter]`; `pt-3` hover bridge; `mode="popLayout"` + `position: "absolute"` exit kills blank-frame cross-fade
- **Mobile/tablet nav improvements** — hamburger right-aligned; `h-[76px] lg:h-[68px]`; tablet compact panel `md:w-[380px]`; "Book a Demo" `hidden sm:inline-flex lg:hidden`; backdrop-blur overlay with 72% CSS mask
- **ProductSubNav → pills-only** — IntersectionObserver scroll-spy, `layoutId="subnav-pill"` Framer Motion, removed dock/sticky/logo/button machinery
- **SognosCare Problems dark bg** — `#03112f` bg, inverted text, `subNav` slot
- **SognosCare brand colour** — `#11102B` → `#03112f` across all affected files
- **SognosCare Hero — cinematic scroll animation** — `useScroll`/`useTransform`: scale 0.9→1, y 0→−160px, opacity 1→0.2; all-four-corner rounding; `pb-24 md:pb-32`
- **SognosCare Editions — CalloutCard style** — morphing notch SVG, per-edition accent gradient bay, white logo, "Read more" arrow footer; IndustrySection-style slider; EditionsDrawer removed from `ProductSection`
- **SognosCare Editions section** — `#03112f` bg, white heading + `text-white/70` intro, eyebrow pill removed
- **Footer mobile accordions** — `FooterColumns.tsx` as `"use client"`, Framer Motion height/opacity, acknowledgement separated into own row

Pending:
- **ProductSubNav dock-from-bottom** — reappears fixed under navbar when scrolled past in-section position
- **Roster + Genogram Problems dark sections** — `#3990c5` / `#250438` bg + inverted text

### Phase 8: Conversion and Integration

Add:
- contact flow
- CRM or scheduling integrations
- conversion tracking

### Phase 9: QA and Launch

Complete:
- responsive QA
- accessibility review
- performance review
- deployment and launch setup

## Legacy URL Redirects

301 redirects from legacy `sognos.com.au` URLs are configured in `next.config.ts` to preserve SEO equity through the rebuild. Full mapping is documented in `project-overview.md` under "Legacy URL Redirects". 23 total redirects covering:

- Conversation funnels (`/start-the-conversation`, `/dhf-conversation/`)
- Company restructure (`/about-us/*`, `/contact-us`)
- Knowledge Hub consolidation (`/news-updates`, `/industry-insights`)
- Slug changes (`/industries/health-and-social-care`, `/solutions/power-platform-solutions`)
- Product restructure (`/sognoscare`, `/sognos-genogram`)
- Customer story slug normalisation (`-case-study` suffix dropped; `nps` → `natural-power-solutions`)
- Legal/policy (`/privacy-collection-notice`, `/isms-policy`)
- Old landing page (`/first-in-field-service`)

## Working Rules

- Update docs in the same task as any structural code change
- Do not introduce a top-level Platform content layer
- Do not add industries to `SolutionsSection`
- Keep products primary in nav, homepage, and page hierarchy
- Any new route or slug change must be paired with a `next.config.ts` redirect from the legacy URL
