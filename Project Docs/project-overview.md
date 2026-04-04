# Sognos Website — Project Overview

## Project Name
Sognos Website Rebuild

## What This Project Is
A full redesign and rebuild of the Sognos website into a modern, product-led SaaS platform experience.

Sognos is being repositioned from a consulting-first / Microsoft partner website into a product platform company.

## Design Benchmark
- Stripe: structure, hierarchy, system thinking
- Luno: visual quality, calm trust, premium simplicity

All UX and design decisions must align to this benchmark and must not replicate the current Sognos site structure.

Current site for reference: https://sognos.com.au/

## What We Are Building
- High-performance marketing website
- Product-first SaaS experience
- Scalable component-based frontend

Stack:
- Next.js (App Router)
- React
- Tailwind CSS

## Core Positioning and Architecture
Sognos is a service operations platform built around two standalone products:

- SognosCare: care operations and compliance
- SognosRoster: workforce scheduling and optimisation

Relationship:
SognosCare manages services. SognosRoster coordinates the workforce that delivers them.

Supporting architecture:
- Solutions are supporting/customised engagements
- Industries are sector-specific entry points
- Platform references (Dynamics 365, Copilot, Power Platform) are embedded supporting proof only

Hard rule: no standalone Platform nav or page layer.

## Final Taxonomy
Products:
- SognosCare
- SognosRoster

Solutions:
- Field Service
- Customer Relationship Management
- Customer Insights
- Customer Experience
- Customer Service
- Power Platform
- Quick Start

Industries:
- Health & Social Care
- Facilities Management
- Local Government
- Industrial Services
- Energy & Utilities

## Final Sitemap
- `/`
- `/products`
- `/products/sognoscare`
- `/products/sognosroster`
- `/solutions`
- `/solutions/field-service`
- `/solutions/customer-relationship-management`
- `/solutions/customer-insights`
- `/solutions/customer-experience`
- `/solutions/customer-service`
- `/solutions/power-platform`
- `/solutions/quick-start`
- `/industries`
- `/industries/[slug]`
- `/customers`
- `/customers/[slug]`
- `/resources`
- `/company/about`
- `/company/careers`
- `/contact`

## Final Navigation
- Products
  - SognosCare
  - SognosRoster
- Solutions
  - Field Service
  - Customer Relationship Management
  - Customer Insights
  - Customer Experience
  - Customer Service
  - Power Platform
  - Quick Start
- Industries
  - Health & Social Care
  - Facilities Management
  - Local Government
  - Industrial Services
  - Energy & Utilities
- Customers
- Resources
- Company
  - About
  - Careers

Header CTAs:
- Contact Sales
- Book a Demo

## Homepage Source of Truth
The homepage renders in this order:

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

Section rules:
- `HowSognosWorksPreview` is visual-first system overview
- `HowItWorks` is detailed operational flow
- `SolutionsSection` must not include industries
- `IndustrySection` must include Industrial Services and Energy & Utilities

## Current Status
In build phase.

Homepage shell and section structure are implemented. Current execution priority is product page build and architecture/doc alignment maintenance.

## Success Metrics
Conversion:
- increase demo bookings
- reduce drop-off from key pages

Engagement:
- time on site
- scroll depth

Performance:
- Core Web Vitals
- mobile responsiveness

Clarity:
- users can identify what Sognos is
- users can distinguish SognosCare vs SognosRoster

Business impact:
- higher quality inbound leads
- faster sales conversations

## Definition of Done
A page is complete when:
- structure matches spec
- messaging is product-first
- UI quality meets premium SaaS benchmark
- mobile responsive
- no placeholder content
- CTA is functional

## Non-Negotiables
- products are primary
- solutions are supporting
- industries are separate from solutions
- do not force solution-to-product mapping
- no standalone platform layer
- no generic template UI
- maintain premium quality benchmark (Stripe/Luno)

## Guiding Principle
Build a product website, not a services website.

Every page should clearly communicate:
- what the product is
- how it works
- why it matters
