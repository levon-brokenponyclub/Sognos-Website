# Sognos Website — Project Plan

> Alignment note: Updated during the architecture-alignment pass to remove legacy scaffold instructions and reflect the current implementation phase and approved content layers.

## Current Status

The project already has the marketing shell and homepage section structure in place.

Immediate focus:
- maintain architecture alignment
- remove outdated taxonomy and page-layer assumptions
- keep docs in sync with implementation

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
<HowItWorks />
<SolutionsSection />
<IndustrySection />
<ProofSection />
<CTASection />
```

### Phase 3: Alignment and Source-of-Truth Cleanup

In progress:
- align core documentation with the live architecture
- remove standalone Platform references from shared content/navigation surfaces
- normalize solution and industry taxonomy
- ensure footer and shared constants reflect the final spec

Exit criteria:
- docs, shared constants, footer, and homepage taxonomy all agree
- no contradictory nav or sitemap references remain

### Phase 4: Product Pages

Next build work:
- `/products/sognoscare`
- `/products/sognosroster`

Each page should include:
- hero
- what it solves
- features
- integration context
- CTA

### Phase 5: Solutions and Industries Pages

Build:
- solution pages for the seven approved solutions
- dynamic industry pages for the five approved industries
- supporting customers/resources coverage

Rules:
- solutions are not products
- industries are not merged into solutions
- solution pages must not force a product dependency

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
