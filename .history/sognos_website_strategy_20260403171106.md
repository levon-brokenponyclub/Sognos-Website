

# Sognos Website — Product-Led Architecture & Build Spec

## 1. Overview

This document defines the **final architecture, UX structure, and build specification** for the Sognos website.

### Objective
Transform Sognos from:
- Consulting / Microsoft partner site  

Into:
- **Product-led SaaS platform**

---

## 2. Core Positioning

### What Sognos Is

Sognos is an **AI-powered service operations platform** built on Microsoft Dynamics 365.

It enables organisations to:
- Deliver services efficiently  
- Coordinate complex workforces  
- Maintain compliance  

---

## 3. Product System

### SognosCare
**Care operations & compliance platform**

- Case management  
- Service delivery tracking  
- Compliance & reporting  

---

### SognosRoster
**Workforce scheduling & optimisation engine**

- Staff allocation  
- Scheduling & routing  
- Real-time workforce optimisation  

---

### Relationship

> SognosCare manages services.  
> SognosRoster coordinates the workforce that delivers them.

---

## 4. Architecture Model

```txt
Product Layer (WHAT)
- SognosCare
- SognosRoster

Platform Layer (HOW)
- Dynamics 365
- Copilot AI
- Power Platform

Industry Layer (WHO)
- Health & Social Care
- Facilities
- Government
- Industrial
```

---

## 5. Sitemap (Final)

```
/ (Home)

/products
  /products/sognoscare
  /products/sognosroster

/platform
  /platform/dynamics-365
  /platform/copilot-ai
  /platform/power-platform

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

---

## 6. Navigation

### Header

**Left:**
- Logo

**Center:**
- Products
  - SognosCare
  - SognosRoster
- Platform
- Industries
- Customers
- Resources
- Company

**Right:**
- Contact Sales (secondary)
- Book Assessment (primary CTA)

---

## 7. Homepage Structure

### 1. Hero

Headline:
Run your entire service operation on one intelligent platform.

Sub:
Sognos combines care management and workforce scheduling on Microsoft Dynamics 365.

CTAs:
- Book Free Assessment
- Explore Platform

---

### 2. What Sognos Is

Sognos is an AI-powered service operations platform that unifies:
- Care management
- Workforce coordination

---

### 3. Product Section

#### SognosCare
- Care operations & compliance  
- CTA: Explore SognosCare

#### SognosRoster
- Workforce scheduling & optimisation  
- CTA: Explore SognosRoster

---

### 4. How It Works

1. Capture service demand  
2. Schedule workforce  
3. Deliver services  
4. Record outcomes  
5. Optimise performance  

---

### 5. Platform / AI

Built on:
- Dynamics 365  
- Copilot  
- Power Platform  

---

### 6. Industries

- Health & Social Care  
- NDIS & Aged Care  
- Facilities  
- Local Government  
- Industrial  

---

### 7. Proof

- Client logos  
- Case studies  

---

### 8. Final CTA

Ready to transform your service operations?

---

## 8. Product Pages

### SognosCare

Sections:
- Hero
- What it solves
- Features
- Compliance capabilities
- Integration with SognosRoster
- CTA

---

### SognosRoster

Sections:
- Hero
- Scheduling challenges
- Features
- Optimisation logic
- Integration with SognosCare
- CTA

---

## 9. Platform Pages

Purpose:
Explain underlying system (not dominate narrative)

Sections:
- Overview
- Capability explanation
- Integration
- Benefits

---

## 10. Industry Pages

Structure:
- Hero (problem-focused)
- Industry challenges
- How Sognos solves it
- Products used (Care + Roster)
- Case studies
- CTA

---

## 11. Customers

- Filterable grid
- Case studies
- Tags:
  - Industry
  - Product used

---

## 12. Contact

- Embedded form or scheduler
- No mailto links
- CRM integration via API

---

## 13. Component System

### Core Components

- Navbar
- HeroSection
- ProductCard
- FeatureGrid (Bento)
- TestimonialCard
- CTASection
- IndustryCard
- AccordionFAQ

---

## 14. Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- shadcn/ui

---

## 15. Design Principles

- Product-first storytelling  
- Visual system (not text-heavy)  
- Large spacing (breathing room)  
- Strong typography hierarchy  
- Real UI visuals (not stock images)  

---

## 16. Key Rules

- No “Solutions” as top-level  
- Always position products first  
- Always connect Care ↔ Roster  
- Platform supports, not leads  
- Avoid generic Microsoft language  

---

## 17. Outcome

A scalable, modern SaaS website that:
- Clearly communicates product value
- Converts effectively
- Feels like a premium software company

---


# Sognos Next.js Build Structure (App Router)

## 1. Project Structure

```
/app
  /(marketing)
    layout.tsx
    page.tsx                 # Homepage

    /products
      page.tsx               # Product Hub
      /sognoscare
        page.tsx
      /sognosroster
        page.tsx

    /platform
      page.tsx
      /dynamics-365
        page.tsx
      /copilot-ai
        page.tsx
      /power-platform
        page.tsx

    /industries
      page.tsx
      /[slug]
        page.tsx

    /customers
      page.tsx
      /[slug]
        page.tsx

    /resources
      page.tsx

    /company
      /about
        page.tsx
      /careers
        page.tsx

    /contact
      page.tsx

/components
  /layout
    Navbar.tsx
    Footer.tsx

  /sections
    Hero.tsx
    WhatIsSognos.tsx
    ProductSection.tsx
    HowItWorks.tsx
    PlatformSection.tsx
    IndustrySection.tsx
    ProofSection.tsx
    CTASection.tsx

  /ui
    Button.tsx
    Card.tsx
    Container.tsx
    Grid.tsx
    Badge.tsx

/lib
  constants.ts
  navigation.ts

/styles
  globals.css

/public
  /images
```

---

## 2. Layout Setup

### `/app/(marketing)/layout.tsx`

- Wrap all pages
- Includes:
  - `<Navbar />`
  - `<Footer />`

---

## 3. Homepage Composition

### `/app/(marketing)/page.tsx`

```
<Hero />
<WhatIsSognos />
<ProductSection />
<HowItWorks />
<PlatformSection />
<IndustrySection />
<ProofSection />
<CTASection />
```

---

## 4. Product Pages

### `/products/sognoscare/page.tsx`

Sections:
- Hero
- Problem
- Features
- Compliance
- Integration (Roster link)
- CTA

### `/products/sognosroster/page.tsx`

Sections:
- Hero
- Scheduling Challenges
- Features
- Optimisation Logic
- Integration (Care link)
- CTA

---

## 5. Product Hub

### `/products/page.tsx`

```
Hero
Product Comparison (Care vs Roster)
Better Together Section
System Diagram
CTA
```

---

## 6. Dynamic Routes

### Industries

`/industries/[slug]/page.tsx`

- Fetch industry config
- Render:
  - Hero
  - Problems
  - Product Mapping
  - Case Studies
  - CTA

### Customers

`/customers/[slug]/page.tsx`

- Case study template

---

## 7. Navbar Logic

### `/lib/navigation.ts`

```
export const nav = {
  products: [
    { name: "SognosCare", href: "/products/sognoscare" },
    { name: "SognosRoster", href: "/products/sognosroster" }
  ],
  platform: [
    { name: "Dynamics 365", href: "/platform/dynamics-365" },
    { name: "Copilot AI", href: "/platform/copilot-ai" }
  ]
}
```

---

## 8. Core Components

### Hero.tsx
- Headline
- Subtext
- CTA group
- Visual slot

### ProductSection.tsx
- Two product blocks
- Handles layout logic

### CTASection.tsx
- Reusable CTA block

---

## 9. Styling Approach

- Tailwind CSS
- Use utility classes only
- Central container width: `max-w-7xl`

---

## 10. Dev Notes

- Use Server Components by default
- Use Client Components only when needed (interactions)
- All content should be easily replaceable

---

## 11. Key Rule

- Product-first at every level
- Never reintroduce “solutions” structure
- Always link Care ↔ Roster