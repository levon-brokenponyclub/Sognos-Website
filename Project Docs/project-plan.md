# Sognos Website — Project Plan

> Alignment note: Updated during the architecture-alignment pass to remove legacy scaffold instructions and reflect the current implementation phase and approved content layers.

## Current Status

Phases 1–5 are complete. All core marketing pages are built and statically generated.

Immediate focus:
- Phase 6 — design system application pass
- Phase 8 (early) — contact page (all CTAs reference `/contact`, currently 404)
- Customers pages (`/customers`, `/customers/[slug]`) referenced by Stories sections

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
- `/solutions/[slug]` — Dynamic solution pages, 7 static routes: Field Service, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start
- `/industries` — Industries hub (grid of 5 industries with product chips)
- `/industries/[slug]` — Dynamic industry pages, 5 static routes: Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities
- `lib/solutions-content.ts` — full hero/pain points/capabilities/platform/worksWithCare/worksWithRoster per solution
- `lib/industries-content.ts` — full hero/challenges/howSognosHelps per industry
- "Works with" product chips on solution pages — shown only where genuine relationship exists
- 22 total routes, all statically generated

### Phase 6: Design System Application

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

## Working Rules

- Update docs in the same task as any structural code change
- Do not introduce a top-level Platform content layer
- Do not add industries to `SolutionsSection`
- Keep products primary in nav, homepage, and page hierarchy
