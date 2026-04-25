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
| **Sognos Genogram** | Relationship & family context mapping — embeds support networks, histories, and family structures into case records |

**Relationship:** SognosCare manages services. SognosRoster coordinates the workforce that delivers them. Sognos Genogram enriches case records with relational context. All three are standalone — they can be implemented independently or together.

### Architecture Layers

| Layer | Purpose | Examples |
|-------|---------|---------|
| **Products** | Primary positioning | SognosCare, SognosRoster, Sognos Genogram |
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
| **Phase 4** | Product pages — `/products/sognoscare` + `/products/sognosroster` | ✅ Complete |
| **Phase 5** | Solutions & industry pages | ✅ Complete |
| **Phase 5b** | Sognos Genogram — product page, routing, nav wiring | ✅ Complete |
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
      page.tsx                     ✅ Product Hub
      /sognoscare
        page.tsx                   ✅
      /sognosroster
        page.tsx                   ✅
      /sognosgenogram
        page.tsx                   ✅

    /solutions
      page.tsx                     ✅ Solutions Hub
      /[slug]/page.tsx             ✅ (7 static routes — field-service, crm, insights, experience, service, power-platform, quick-start)

    /industries
      page.tsx                     ✅ Industries Hub
      /[slug]/page.tsx             ✅ (5 static routes — health-social-care, facilities-management, local-government, industrial-services, energy-utilities)

    /customers
      page.tsx                     🔲
      /[slug]/page.tsx             🔲

    /knowledge-hub/page.tsx        ✅ (renamed from /resources)
    /company/about/page.tsx        🔲
    /company/careers/page.tsx      🔲
    /contact/page.tsx              ✅

/components
  /layout
    Navbar.tsx                     ✅ (data-driven from navigation.ts)
    Footer.tsx                     ✅ (data-driven from constants.ts)

  /sections
    Hero.tsx                       ✅ (full-width brand bg, FlowCanvas, single-column layout)
    LogoStrip.tsx                  ✅ (infinite CSS marquee, uniform color filter)
    HowSognosWorksPreview.tsx      ✅ (includes SystemFlowDiagram)
    ProductSection.tsx             ✅
    HowItWorks.tsx                 ✅
    SolutionsSection.tsx           ✅ (dark bg, Framer Motion drag slider)
    IndustrySection.tsx            ✅ (data-driven from constants.ts, Industrial Services video always autoplays)
    NewsInsightSection.tsx         ✅ (Framer Motion drag slider, real article data)
    CustomerStories.tsx            ✅ (3 active case studies: Auckland Airport, Flourish Australia, Penrith City Council)
    KnowledgeHubArchive.tsx        ✅ (sticky sidebar filters, 3-col grid, 6 real articles)
    ProofSection.tsx               ✅ (video bg compliance card, image bg 1100+ card, bento grid)
    CTASection.tsx                 ✅

  /ui
    ParticleCanvas.tsx             ✅ (radial + arc variants, canvas-based)
    FlowDiagram.tsx                ✅ (SMIL animated beams, used in HowItWorks)
    Button.tsx                     🔲
    Card.tsx                       🔲
    Container.tsx                  🔲
    Grid.tsx                       🔲
    Badge.tsx                      🔲

/lib
  navigation.ts                    ✅
  constants.ts                     ✅ (SITE, PRODUCTS, SOLUTIONS, INDUSTRIES)
  solutions-content.ts             ✅ (full page content for all 7 solutions)
  industries-content.ts            ✅ (full page content for all 5 industries)

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
<SolutionsSection />
<HowItWorks />
<IndustrySection />
<ProofSection />
<CTASection />
```

---

## 5. Sitemap (Final)

```
/                                                    ✅
/products                                            ✅
/products/sognoscare                                 ✅
/products/sognosroster                               ✅
/products/sognosgenogram                             ✅
/solutions                                           ✅
/solutions/field-service                             ✅
/solutions/customer-relationship-management          ✅
/solutions/customer-insights                         ✅
/solutions/customer-experience                       ✅
/solutions/customer-service                          ✅
/solutions/power-platform                            ✅
/solutions/quick-start                               ✅
/industries                                          ✅
/industries/health-social-care                       ✅
/industries/facilities-management                    ✅
/industries/local-government                         ✅
/industries/industrial-services                      ✅
/industries/energy-utilities                         ✅
/customers                                           🔲
/customers/[slug]                                    🔲
/knowledge-hub                                       ✅ (renamed from /resources)
/company/about                                       🔲
/company/careers                                     🔲
/contact                                             ✅
```

---

## 6. Navigation (Live)

```
Products       → SognosCare, SognosRoster, Sognos Genogram
Solutions      → Field Service, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start
Industries     → Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities
Customers
Knowledge Hub  → Blog, News, Customer Stories
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

**Phase 6 — Design System Application**

Phase 5b complete. Contact page live. Knowledge Hub live.

Pending:
- [ ] `/customers` hub + `/customers/[slug]` — referenced by CustomerStories and nav
- [ ] `/company/about` and `/company/careers`
- [ ] Phase 6 — design system pass across all pages

---

## 9. Next Tasks (Ordered)

1. Phase 6 — design system application pass
2. Build customers hub and case study pages (`/customers`, `/customers/[slug]`)
3. Phase 7 — UI polish and motion
4. `/company/about` and `/company/careers` pages

---

## 10. Technical Gotchas

- **Linter strips code between saves** — always re-read file before multi-step edits; bento overlay was removed twice by the formatter
- **Card backgrounds** — never use `style={{ background: "" }}`; use `bg-white` class. Empty string = transparent card = orbs invisible
- **FlyonUI is NOT installed** — when user pastes FlyonUI snippets, translate to React state + Tailwind + Framer Motion
- **Component reference sources** — Aceternity UI and Magic UI are the preferred sources for animated bento/card components; do not hand-build from Stripe HTML
- **Interactive sections** — any section using useState/hooks needs `"use client"` at the top; ProductSection is already a client component
- **`@property --shine-angle`** — requires Chrome 85+ / Safari 15.4+; see globals.css for full shine border implementation
- **Framer Motion drawer pattern** — established in ProductSection: `AnimatePresence` wraps conditional render, outer `motion.div` fades, inner panel uses `y: "100%" → 0` spring (`damping: 30, stiffness: 300`)

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
