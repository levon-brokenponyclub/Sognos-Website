# Claude Execution Control — Sognos React

## 1. Project Understanding

### What Sognos Is
Sognos is an **AI-powered service operations platform** built on Microsoft Dynamics 365. It enables organisations to deliver services efficiently, coordinate complex workforces, and maintain compliance.

**Positioning:** Product-led SaaS platform. NOT a consulting or Microsoft partner site.

### Product System

| Product | Role |
|---------|------|
| **SognosCare** | Care operations & compliance — case management, service delivery tracking, compliance & reporting |
| **SognosRoster** | Workforce scheduling & optimisation — staff allocation, scheduling & routing, real-time optimisation |

**Relationship:** SognosCare manages services. SognosRoster coordinates the workforce that delivers them. Both products are standalone — they can be implemented independently or together.

### Architecture Layers

| Layer | Purpose | Examples |
|-------|---------|---------|
| **Products** | Primary positioning | SognosCare, SognosRoster |
| **Solutions** | Supporting engagements | Field Service, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start |
| **Industries** | Sector entry points | Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities |
| **Platform** | Embedded proof only — never top-level | Dynamics 365, Copilot AI, Power Platform |

### Core Objective
Transform Sognos from a Microsoft partner / consulting website into a **product-led platform company** — Stripe/Luno quality, SaaS-level UX, conversion-focused.

---

## 2. Build Plan

| Phase | Goal | Status |
|-------|------|--------|
| **Phase 1** | Foundation — Next.js scaffold, layout, Navbar, Footer, navigation | ✅ Complete |
| **Phase 2** | Homepage — all sections built and wired | ✅ Complete |
| **Phase 3** | Alignment & source-of-truth cleanup | ✅ Complete |
| **Phase 4** | Product pages — `/products/sognoscare` + `/products/sognosroster` | 🔲 Next |
| **Phase 5** | Solutions & industry pages | 🔲 Pending |
| **Phase 6** | Design system application | 🔲 Pending |
| **Phase 7** | UI polish & motion | 🔲 Pending |
| **Phase 8** | Conversion & integrations | 🔲 Pending |
| **Phase 9** | QA & launch | 🔲 Pending |

---

## 3. File Structure

```
/app
  /(marketing)
    layout.tsx                     ✅
    page.tsx                       ✅ Homepage

    /products
      page.tsx                     🔲 Product Hub
      /sognoscare
        page.tsx                   🔲
      /sognosroster
        page.tsx                   🔲

    /solutions
      /field-service/page.tsx      🔲
      /customer-relationship-management/page.tsx  🔲
      /customer-insights/page.tsx  🔲
      /customer-experience/page.tsx 🔲
      /customer-service/page.tsx   🔲
      /power-platform/page.tsx     🔲
      /quick-start/page.tsx        🔲

    /industries
      page.tsx                     🔲
      /[slug]/page.tsx             🔲 (covers all 5 industries)

    /customers
      page.tsx                     🔲
      /[slug]/page.tsx             🔲

    /resources/page.tsx            🔲
    /company/about/page.tsx        🔲
    /company/careers/page.tsx      🔲
    /contact/page.tsx              🔲

/components
  /layout
    Navbar.tsx                     ✅ (data-driven from navigation.ts)
    Footer.tsx                     ✅ (data-driven from constants.ts)

  /sections
    Hero.tsx                       ✅
    LogoStrip.tsx                  ✅
    HowSognosWorksPreview.tsx      ✅ (includes SystemFlowDiagram)
    ProductSection.tsx             ✅
    HowItWorks.tsx                 ✅
    SolutionsSection.tsx           ✅
    IndustrySection.tsx            ✅ (data-driven from constants.ts)
    ProofSection.tsx               ✅
    CTASection.tsx                 ✅

  /ui
    Button.tsx                     🔲
    Card.tsx                       🔲
    Container.tsx                  🔲
    Grid.tsx                       🔲
    Badge.tsx                      🔲

/lib
  navigation.ts                    ✅
  constants.ts                     ✅ (SITE, PRODUCTS, SOLUTIONS, INDUSTRIES)

/styles
  globals.css                      ✅
```

---

## 4. Homepage Composition (Live)

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

---

## 5. Sitemap (Final)

```
/
/products/sognoscare
/products/sognosroster
/solutions/field-service
/solutions/customer-relationship-management
/solutions/customer-insights
/solutions/customer-experience
/solutions/customer-service
/solutions/power-platform
/solutions/quick-start
/industries/[slug]  →  health-social-care, facilities-management, local-government, industrial-services, energy-utilities
/customers/[slug]
/resources
/company/about
/company/careers
/contact
```

---

## 6. Navigation (Live)

```
Products       → SognosCare, SognosRoster
Solutions      → Field Service, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start
Industries     → Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities
Customers
Resources
Company        → About, Careers
```

CTAs: `Contact Sales` | `Book a Demo`

---

## 7. Design System (Approved — Phase 6)

- **Headings:** Inter Tight, weight 400 default
- **Body:** Inter
- **Cards:** card tokens, no gradients on standard cards or subcards
- **Radius:** sm 4px / md 8px / lg 12px / xl 16px / 2xl 20px / full 9999px
- **Gradients:** hero and deliberate highlight surfaces only
- **Container:** `max-w-7xl`
- **Components:** Server Components by default; Client Components only when interaction is required

---

## 8. Current Task

**Phase 4 — Product Pages**

- [ ] `/products/sognoscare/page.tsx` — Hero, What it solves, Features, Compliance, Integration (Roster link), CTA
- [ ] `/products/sognosroster/page.tsx` — Hero, Scheduling challenges, Features, Optimisation logic, Integration (Care link), CTA
- [ ] `/products/page.tsx` — Product Hub (comparison, Better Together, CTA)

---

## 9. Next Tasks (Ordered)

1. Build SognosCare product page
2. Build SognosRoster product page
3. Build product hub (`/products`)
4. Begin Phase 5 — solutions and industry pages
5. Phase 6 — apply design system

---

## Hard Rules

- Products are primary — always lead with SognosCare + SognosRoster
- Solutions are supporting — never primary positioning
- Industries are separate from solutions — never merge
- Platform is embedded proof only — never a nav item, never a standalone page layer
- CTA label: **"Book a Demo"** everywhere
- Doc sync: any routing, permalink, or page title change must update `project-overview.md` and `project-plan.md` in the same task
- Server Components by default
- No styling decisions until Phase 6
- Claude = Builder + Architect only (NOT designer)
