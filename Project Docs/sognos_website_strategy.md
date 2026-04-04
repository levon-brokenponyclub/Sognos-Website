# Sognos Website — Product-Led Architecture and Build Spec

> Alignment note: Updated during the architecture-alignment pass to make this file match the live homepage composition, approved industry list, and embedded-platform rule.

## Overview

This document is the working architecture spec for the Sognos website rebuild.

Objective:
- present Sognos as a modern, premium, product-led SaaS-style company
- lead with products, not consulting services
- show platform depth as supporting proof, not as the site structure

## Core Positioning

Sognos is a service operations platform experience built around two standalone products:

- `SognosCare` for care operations and compliance
- `SognosRoster` for workforce scheduling and optimisation

These products can work independently or together.

Relationship:

`SognosCare` manages services. `SognosRoster` coordinates the workforce that delivers them.

## Final Architecture Model

```txt
Products (primary)
- SognosCare
- SognosRoster

Solutions (supporting engagements)
- Field Service
- Customer Relationship Management
- Customer Insights
- Customer Experience
- Customer Service
- Power Platform
- Quick Start

Industries (sector entry points)
- Health & Social Care
- Facilities Management
- Local Government
- Industrial Services
- Energy & Utilities
```

Rules:
- products are primary
- solutions are supporting
- industries are separate from solutions
- solutions do not require forced mapping to a product
- platform references stay embedded, never top-level

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

There is no `/platform` section in the sitemap.

## Final Navigation

Header structure:

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

Right-side CTAs:
- Contact Sales
- Book a Demo

## Homepage Source of Truth

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

### Section Intent

#### Hero

Lead with the platform outcome and product-led positioning.

#### LogoStrip

Reusable trust layer that can move above or below the hero later.

#### HowSognosWorksPreview

Visual system overview only.

Requirements:
- visual-first, not paragraph-first
- shows the operating loop clearly
- uses platform references as embedded proof

#### ProductSection

Introduce:
- SognosCare
- SognosRoster

Each product must stand on its own while still showing the system relationship.

#### HowItWorks

Detailed operational flow:
1. capture service demand
2. coordinate services and workflows
3. schedule and optimise workforce
4. deliver services in the field
5. record outcomes and compliance
6. optimise performance with AI insights

Platform proof appears here as supporting context:
- built on Dynamics 365
- enhanced with Copilot
- powered by Power Platform automation

#### SolutionsSection

Purpose:
- provide outcome-led entry points for customised engagements

Rules:
- must not include industries
- must not read like Microsoft documentation
- must not displace product-led positioning

#### IndustrySection

Approved industries only:
- Health & Social Care
- Facilities Management
- Local Government
- Industrial Services
- Energy & Utilities

#### ProofSection

Proof layer may include:
- logos
- results
- case studies
- testimonials

#### CTASection

Close on conversion with a clear next action.

## Product and Supporting Page Logic

### Product Pages

Build first:
- `/products/sognoscare`
- `/products/sognosroster`

Each page should explain:
- what the product solves
- how it works
- why it matters
- how it relates to the broader system

### Solution Pages

Solution pages describe customised engagements.

Rules:
- they are not products
- they may be delivered independently, alongside products, or in broader engagements
- they should focus on outcomes and implementation value

### Industry Pages

Industry pages are sector-specific entry points.

Rules:
- they should not become disguised solution pages
- they should reflect operational context, compliance pressure, and service-delivery complexity

## Design-System Rules

Typography:
- headings use Inter Tight
- body uses Inter
- headings default to weight 400 unless explicitly overridden

Card system:
- use card tokens
- no gradients on standard cards or subcards
- gradients only on hero or deliberate highlight surfaces

Radius tokens:
- `sm` 4px
- `md` 8px
- `lg` 12px
- `xl` 16px
- `2xl` 20px
- `full` 9999px

## Current Build Priority

Before new page implementation:
- keep docs aligned with code
- keep shared constants aligned with the approved taxonomy
- keep footer and other reusable navigation surfaces aligned with the final architecture

This avoids routing drift, page-layer contradictions, and repeated cleanup later.
