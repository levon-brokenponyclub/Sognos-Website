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
Sognos is a service operations platform built around three standalone products:

- SognosCare: care operations and compliance
- SognosRoster: workforce scheduling and optimisation
- SognosGenogram: relationship and family context mapping — embeds support networks, histories, and family structures into case records

Relationship:
SognosCare manages services. SognosRoster coordinates the workforce that delivers them. SognosGenogram enriches case records with relational context. All three are standalone.

Supporting architecture:
- Solutions are supporting/customised engagements
- Industries are sector-specific entry points
- Platform references (Dynamics 365, Copilot, Power Platform) are embedded supporting proof only

Hard rule: no standalone Platform nav or page layer.

## Final Taxonomy
Products:
- SognosCare
- SognosRoster
- SognosGenogram

Solutions:
- Frontline
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
- `/` ✅
- `/products` ✅
- `/products/sognoscare` ✅
- `/products/sognosroster` ✅
- `/products/sognosgenogram` ✅
- `/solutions` ✅
- `/solutions/frontline` ✅
- `/solutions/customer-relationship-management` ✅
- `/solutions/customer-insights` ✅
- `/solutions/customer-experience` ✅
- `/solutions/customer-service` ✅
- `/solutions/power-platform` ✅
- `/solutions/quick-start` ✅
- `/industries` ✅
- `/industries/health-social-care` ✅
- `/industries/facilities-management` ✅
- `/industries/local-government` ✅
- `/industries/industrial-services` ✅
- `/industries/energy-utilities` ✅
- `/knowledge-hub` ✅ (renamed from /resources)
- `/contact` ✅
- `/customer-stories` ✅
- `/customer-stories/[slug]` ✅ (auckland-airport, flourish-australia, penrith-city-council, gentari, all-purpose-pumps, asset-security-concepts, neca, natural-power-solutions)
- `/company/about` ✅
- `/company/social-responsibility` ✅
- `/company/careers` ✅
- `/dhf-conversation` ✅

## Final Navigation
- Products
  - SognosCare
  - SognosRoster
  - SognosGenogram
- Solutions
  - Frontline
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
- Knowledge Hub
  - Blog
  - News
  - Customer Stories
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
<SolutionsSection />
<HowItWorks />
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
Phases 1–5b complete. 27 routes live and statically generated.

Live routes:
- `/` — Homepage (9 sections)
- `/products`, `/products/sognoscare`, `/products/sognosroster`, `/products/sognosgenogram`
- `/solutions`, `/solutions/[slug]` × 7
- `/industries`, `/industries/[slug]` × 5
- `/knowledge-hub` — KnowledgeHubArchive with sticky sidebar + 6 real articles
- `/contact`

Current focus: Phase 6 design system pass — in progress (started 2026-05-01). Then `/customers` hub + case study pages.

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

## Legacy URL Redirects

All redirects are wired in `next.config.ts` as 301 (permanent) for SEO preservation from the legacy `sognos.com.au` site.

| Legacy URL | New URL | Reason |
|------------|---------|--------|
| `/start-the-conversation` | `/dhf-conversation` | Funnel rename |
| `/dhf-conversation/` | `/dhf-conversation` | Trailing slash |
| `/about-us` | `/company/about` | Restructured |
| `/about-us/our-team` | `/company/about` | Merged |
| `/about-us/partners` | `/company/about` | Merged |
| `/about-us/social-responsibility` | `/company/social-responsibility` | Restructured |
| `/about-us/careers` | `/company/careers` | Restructured |
| `/contact-us` | `/contact` | Renamed |
| `/news-updates` | `/knowledge-hub` | Consolidated |
| `/industry-insights` | `/knowledge-hub` | Consolidated |
| `/industries/health-and-social-care` | `/industries/health-social-care` | Slug change |
| `/solutions/power-platform-solutions` | `/solutions/power-platform` | Slug change |
| `/sognoscare` | `/products/sognoscare` | Restructured |
| `/sognos-genogram` | `/products/sognosgenogram` | Restructured |
| `/first-in-field-service` | `/` | Old landing |
| `/privacy-collection-notice` | `/company/privacy-collection-notice` | Restructured |
| `/isms-policy` | `/` | Removed |
| `/customers` | `/customer-stories` | Section renamed |
| `/customers/:slug` | `/customer-stories/:slug` | Section renamed (all slugs) |
| `/customer-stories/gentari-case-study` | `/customer-stories/gentari` | Slug normalised |
| `/customer-stories/penrith-city-council-case-study` | `/customer-stories/penrith-city-council` | Slug normalised |
| `/customer-stories/nps-case-study` | `/customer-stories/natural-power-solutions` | Slug renamed |
| `/customer-stories/neca-case-study` | `/customer-stories/neca` | Slug normalised |
| `/customer-stories/asset-security-concepts-case-study` | `/customer-stories/asset-security-concepts` | Slug normalised |
| `/customer-stories/all-purpose-pumps-case-study` | `/customer-stories/all-purpose-pumps` | Slug normalised |

Note: `/customer-stories/auckland-airport`, `/customer-stories/flourish-australia`, and `/customer-stories/` retain their original paths — no redirect required.
