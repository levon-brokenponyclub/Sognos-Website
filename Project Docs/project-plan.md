# Sognos Website — Project Plan

> Alignment note: Updated during the architecture-alignment pass to remove legacy scaffold instructions and reflect the current implementation phase and approved content layers.

## Current Status

Phases 1–5b complete. 27 routes live and statically generated.

Also complete outside the original phase plan:
- `/contact` page — built and live
- `/knowledge-hub` — renamed from `/resources`, includes KnowledgeHubArchive with sticky filters + 6 real articles
- Homepage polish: LogoStrip → infinite CSS marquee, ProofSection bento grid with video/image bg tiles, IndustrySection always-on video, SolutionsSection dark bg, CustomerStories trimmed to 3 active

Immediate focus:
- Phase 6 — design system application pass (in progress, started 2026-05-01)
- `/customer-stories` hub + `/customer-stories/[slug]` — live (8 case study slugs)
- Legacy URL redirects from `sognos.com.au` — wired in `next.config.ts` (23 × 301)

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

### Phase 6: Design System Application — In Progress (started 2026-05-01)

Apply the agreed design system:
- Inter Tight for headings
- Inter for body
- heading weight 400 by default
- card tokens for standard cards
- no gradients on standard cards or subcards
- radius tokens:
  - `sm` 4px
  - `md` 8px
  - `lg` 12px
  - `xl` 16px
  - `2xl` 20px
  - `full` 9999px

### Phase 7: UI Polish and Motion

Add:
- premium visual refinement
- system diagrams and product visuals
- measured motion and transitions

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
