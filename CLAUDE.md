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
        /editions
          /disability-mental-health/page.tsx  ✅
          /allied-health/page.tsx             ✅
          /support-at-home/page.tsx           ✅
          /residential-aged-care/page.tsx     ✅
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
    /company/about/page.tsx        ✅
    /company/social-responsibility/page.tsx  ✅
    /company/careers/page.tsx      ✅
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
    LifeAtSognos.tsx               ✅ (careers page — 3-col tabs|image|quote, IndustrySection pattern)
    OpenRoles.tsx                  ✅ (careers page — filterable roles list, Department + Location filters)
    TeamSection.tsx                ✅ (about page — photo cards + Read More dialog modal, 2-col layout)
    sognoscare/EditionPageTemplate.tsx  ✅ (shared template: Hero/WhatItSolves/Features/Advantages/ProofStories)

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
/products/sognoscare/editions/disability-mental-health  ✅
/products/sognoscare/editions/allied-health          ✅
/products/sognoscare/editions/support-at-home        ✅
/products/sognoscare/editions/residential-aged-care  ✅
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
/company/about                                       ✅
/company/social-responsibility                       ✅
/company/careers                                     ✅
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
Company        → About, Social Responsibility, Careers
```

CTAs: `Contact Sales` | `Book a Demo`

---

## 7. Design System (Approved — Phase 6)

- **Headings:** Inter Tight, weight 400 default
- **Body:** Inter
- **Cards:** card tokens, no gradients on standard cards or subcards
- **Radius:** `rounded-lg` everywhere — no exceptions. Never `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[Xrem]`
- **Gradients:** hero and deliberate highlight surfaces only
- **Container:** `max-w-7xl`
- **Components:** Server Components by default; Client Components only when interaction is required
- **Section backgrounds (gray):** always `bg-gray-200/70` — never `bg-[#FAFAFA]`, `bg-slate-50`, `bg-gray-100`, `bg-gray-200`
- **Shadows:** NEVER. No `shadow-sm`, `shadow-md`, `shadow-xl`, `shadow-2xl` anywhere
- **Gaps:** `gap-3 lg:gap-4` as standard grid/flex gap
- **Stat blocks:** always match CTASection.tsx stat block pattern exactly:
  - Container: `grid grid-cols-2 gap-3 lg:gap-4`
  - Each cell: `relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden {bgClass}`
  - Number: `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none {textClass}`
  - Label: `text-xs font-semibold uppercase tracking-widest {labelClass}`
  - Color variants: `bg-prussian-blue-800 / text-[#8E9EBB]`, `bg-[#1D96FC] / text-blue-100`, `bg-white text-[#0A1629] / text-neutral-500`

---

## 8. Current Task

**Phase 6 — Mobile Refactor (Homepage → all pages)**

Homepage mobile refactor in progress. Pattern is documented in `Project Docs/mobile-refactor-pattern.md`.

Homepage sections complete:
- [x] Hero — 100vh, vertically centred content, crossfade trust bar/logo strip, scroll-driven navbar padding
- [x] Navbar — scroll padding collapse, colorMode-conditional px, h-14/h-12 height
- [x] LogoStrip, HowSognosWorksPreview, ProductSection, SolutionsSection, HowItWorks
- [x] IndustrySection — scroll-stacked cards (sticky), HEADER_H 112px, PEEK 18px
- [x] ProofSection, CTASection, Footer

**Awaiting homepage sign-off before applying pattern to product/solution/industry pages.**

Pending:
- [ ] Homepage sign-off
- [ ] Apply mobile pattern to all product, solution, and industry pages
- [ ] `/customers` hub + `/customers/[slug]` — referenced by CustomerStories and nav
- [ ] Phase 6 — design system pass across all pages

---

## 9. Next Tasks (Ordered)

1. Build customers hub and case study pages (`/customers`, `/customers/[slug]`)
2. Phase 6 — design system application pass
3. Phase 7 — UI polish and motion

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
- - If you cannot locate a file on the first attempt, stop and ask — do not keep searching and burning tokens
- Always ask instead of guessing — if unsure about anything (file path, intent, scope), ask for clarification
- Before starting a task, suggest which model to use (Opus for complex/architectural work, Sonnet for straightforward edits, Haiku for simple lookups)
- Always ask instead of guessing — if unsure about anything (file path, intent, scope), ask for clarification
- Before starting a task, suggest which model to use (Opus for complex/architectural work, Sonnet for straightforward edits, Haiku for simple lookups)
- Do not add features, abstractions, or complexity beyond what the task requires — keep it minimal
