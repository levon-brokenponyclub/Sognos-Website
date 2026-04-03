# Claude Execution Control — Sognos React

## 1. Project Understanding

### What Sognos Is
Sognos is an **AI-powered service operations platform** built on Microsoft Dynamics 365. It enables organisations to deliver services efficiently, coordinate complex workforces, and maintain compliance.

**Positioning:** Product-led SaaS platform (NOT a consulting or Microsoft partner site).

### Product System

| Product | Role |
|---------|------|
| **SognosCare** | Care operations & compliance — case management, service delivery tracking, compliance & reporting |
| **SognosRoster** | Workforce scheduling & optimisation — staff allocation, scheduling & routing, real-time optimisation |

**Relationship:** SognosCare manages services. SognosRoster coordinates the workforce that delivers them.

### Core Objective
Transform Sognos from a Microsoft partner / consulting website into a **product-led platform company** — Stripe/Luno quality, SaaS-level UX, conversion-focused.

---

## 2. Build Plan (Phase-by-Phase)

| Phase | Goal | Status |
|-------|------|--------|
| **Phase 1** | Foundation & setup — Next.js scaffold, Navbar, Footer, navigation | 🟡 In Progress |
| **Phase 2** | Homepage structure — all 8 sections, no heavy styling | 🔲 Pending |
| **Phase 3** | Product pages — `/products/sognoscare` + `/products/sognosroster` | 🔲 Pending |
| **Phase 4** | Platform & supporting pages — /platform, /industries, /customers, /resources | 🔲 Pending |
| **Phase 5** | Design & UI enhancement — typography, spacing, gradient system (Gemini) | 🔲 Pending |
| **Phase 6** | Interaction & motion — hover states, Framer Motion animations | 🔲 Pending |
| **Phase 7** | Conversion & integrations — contact form, CRM, scheduler embed | 🔲 Pending |
| **Phase 8** | QA & optimisation — responsive, Core Web Vitals, accessibility | 🔲 Pending |
| **Phase 9** | Launch — Vercel deploy, domain, analytics | 🔲 Pending |
| **Phase 10** | Iteration — A/B testing, conversion optimisation | 🔲 Pending |

---

## 3. File Structure Plan

```
/app
  /(marketing)
    layout.tsx                   # Wraps all pages — Navbar + Footer
    page.tsx                     # Homepage

    /products
      page.tsx                   # Product Hub
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
    Navbar.tsx                   # Product-first nav — Care + Roster always visible
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
  navigation.ts                  # Nav config — products + platform links

/styles
  globals.css

/public
  /images
```

---

## 4. Current Task

**Phase 1 — Foundation & Setup**

- [x] Read all project docs
- [x] Create claude.md
- [ ] Initialize Next.js App Router project
- [ ] Install framer-motion + shadcn/ui
- [ ] Clean boilerplate
- [ ] Create `/lib/navigation.ts`
- [ ] Create `Navbar.tsx`
- [ ] Create `Footer.tsx`
- [ ] Create `/app/(marketing)/layout.tsx`

---

## 5. Next Tasks (Ordered)

1. **Phase 1 complete** → Confirm scaffold + navigation renders
2. **Phase 2 start** → Build all 8 homepage sections in `/components/sections/`
3. **Phase 2 complete** → Wire homepage `page.tsx` with all sections
4. **Phase 3 start** → Build SognosCare + SognosRoster product pages

---

## Hard Rules

- Product-first at ALL times
- SognosCare + SognosRoster always visible in navigation
- NO "solutions" structure — ever
- Care ↔ Roster cross-linking is mandatory
- Platform layer supports, never leads
- No generic Microsoft language
- Server Components by default — Client Components only when needed
- Claude = Builder/Architect only — NOT designer
