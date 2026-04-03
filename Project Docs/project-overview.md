# Sognos Website — Project Overview

> Alignment note: Updated during the architecture-alignment pass to restore the current homepage order, final taxonomy, and the no-Platform-layer rule.

## Project

Sognos website rebuild for a modern, premium, product-led SaaS-style presence.

Stack:
- Next.js App Router
- React
- Tailwind CSS

Benchmarks:
- Stripe for structure and system thinking
- Luno for calm, premium visual quality

## Core Positioning

Sognos is presented as a service operations platform with two primary products:

- SognosCare
- SognosRoster

Supporting layers:

- Solutions for customised engagements
- Industries for sector-specific entry points

Platform context:

- Dynamics 365
- Copilot
- Power Platform

The platform is embedded as supporting proof within the experience. It is not a top-level navigation item or standalone page layer.

## Architecture Rules

### Products

Primary positioning:
- SognosCare
- SognosRoster

### Solutions

Supporting engagements:
- Field Service
- Customer Relationship Management
- Customer Insights
- Customer Experience
- Customer Service
- Power Platform
- Quick Start

### Industries

Separate sector entry points:
- Health & Social Care
- Facilities Management
- Local Government
- Industrial Services
- Energy & Utilities

Critical rules:
- Products are primary
- Solutions are supporting
- Industries are separate from solutions
- Do not force solution-to-product mapping
- Do not introduce a standalone Platform nav or page layer
- System understanding should be visual-first, not paragraph-first

## Final Sitemap

```txt
/

/products
  /products/sognoscare
  /products/sognosroster

/solutions
  /solutions/field-service
  /solutions/customer-relationship-management
  /solutions/customer-insights
  /solutions/customer-experience
  /solutions/customer-service
  /solutions/power-platform
  /solutions/quick-start

/industries
  /industries/[slug]

/customers
  /customers/[slug]

/resources

/company
  /company/about
  /company/careers

/contact
```

## Final Navigation

```txt
Products
  - SognosCare
  - SognosRoster

Solutions
  - Field Service
  - Customer Relationship Management
  - Customer Insights
  - Customer Experience
  - Customer Service
  - Power Platform
  - Quick Start

Industries
  - Health & Social Care
  - Facilities Management
  - Local Government
  - Industrial Services
  - Energy & Utilities

Customers
Resources
Company
  - About
  - Careers
```

CTAs:
- Contact Sales
- Book Assessment

## Homepage Structure

The homepage must render in this order:

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

Notes:
- `HowSognosWorksPreview` is the visual system overview
- `HowItWorks` is the detailed operational flow
- `LogoStrip` is reusable and should stay movable
- `SolutionsSection` must not include industries
- `IndustrySection` must include Industrial Services and Energy & Utilities

## Current State

Built:
- Marketing layout shell
- Homepage section components
- Navigation config
- Initial footer and shared constants

Current priority:
- Keep docs and shared source-of-truth files aligned with the live architecture before new page implementation

## Non-Negotiables

- Product-first at all times
- Products lead and solutions support
- Industries remain a separate content layer
- Platform stays embedded as proof, never standalone
- No contradictory naming, slugs, or nav references across docs and code
