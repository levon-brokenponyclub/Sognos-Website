# Claude Execution Control — Sognos React

## 1. Project Understanding

### What Sognos Is
Sognos is an **Field Service Innovations with Microsoft Dynamics** built on Microsoft Dynamics 365. It enables organisations to deliver services efficiently, coordinate complex workforces, and maintain compliance.

**Positioning:** Product-led SaaS platform. NOT a consulting or Microsoft partner site.

### Product System

| Product | Role |
|---------|------|
| **SognosCare** | Care operations & compliance — case management, service delivery tracking, compliance & reporting |
| **SognosRoster** | Workforce scheduling & optimisation — staff allocation, scheduling & routing, real-time optimisation |
| **SognosGenogram** | Relationship & family context mapping — embeds support networks, histories, and family structures into case records |

**Relationship:** SognosCare manages services. SognosRoster coordinates the workforce that delivers them. SognosGenogram enriches case records with relational context. All three are standalone — they can be implemented independently or together.

### Architecture Layers

| Layer | Purpose | Examples |
|-------|---------|---------|
| **Products** | Primary positioning | SognosCare, SognosRoster, SognosGenogram |
| **Solutions** | Supporting engagements | Frontline, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start |
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
| **Phase 5b** | SognosGenogram — product page, routing, nav wiring | ✅ Complete |
| **Phase 6** | Cohere scaffold clone — homepage ✅, solutions pages 🔄, product/industry/blog pending | 🔄 In Progress |
| **Phase 7** | UI polish & motion — Navbar ✅, scroll ✅, SubNav ✅, Hero zoom ✅, Editions ✅, Footer mobile ✅, nav transitions ✅, mobile/tablet nav ✅, Care Problems dark ✅, Care colour ✅ | 🔄 In Progress |
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
          /child-and-family-services/page.tsx ✅
      /sognosroster
        page.tsx                   ✅
      /sognosgenogram
        page.tsx                   ✅

    /solutions
      page.tsx                     ✅ Solutions Hub
      /[slug]/page.tsx             ✅ (7 static routes — frontline, crm, insights, experience, service, power-platform, quick-start)

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

## 4. Homepage Composition (Live — Cohere scaffold, 2026-06-09)

```tsx
<Hero />            {/* "Own your AI" — centered, fadeInUp, white-pill + underline */}
<LogoStrip />       {/* "Trusted by…" */}
<HowSognosWorks />  {/* NEW — "Safe. Flexible. Independent." 3 blocks */}
<SognosCareCard />  {/* NEW — "Your sovereign AI workplace" full-bleed product card */}
<SognosRosterCard />{/* NEW — "Developer resources" full-bleed product card */}
<IndustrySection /> {/* "Powering progress…" arrow snap-scroll square cards */}
<SolutionsSection />{/* "Our models. Your business." */}
<NewsInsightSection />{/* "The latest news" — 3 callout cards w/ morphing SVG notch */}
<CTABand />         {/* NEW — "Ready to put AI to work?" text + dual logo marquees */}
```

**Scaffold context:** Homepage cloned section-by-section from Cohere (`docs/Cohere/`, live `cohere.com` in Dia) as a testing scaffold — Cohere images/branding are placeholder, NOT shipping. See memory `session-2026-06-09-cohere-scaffold.md` for full mapping, conventions, and accepted design-system deviations (solid card bg for SVG notch, container 1380px). `CTASection.tsx` is the SHARED booking-calendar/modal — never gut it; homepage CTA is the separate `CTABand`.

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
/products/sognoscare/editions/child-and-family-services  ✅
/products/sognosroster                               ✅
/products/sognosgenogram                             ✅
/solutions                                           ✅
/solutions/frontline                                 ✅
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
Products       → SognosCare, SognosRoster, SognosGenogram
Solutions      → Frontline, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start
Industries     → Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities
Customers
Knowledge Hub  → Blog, News, Customer Stories
Company        → About, Social Responsibility, Careers
```

CTAs: `Contact Sales` | `Book a Demo`

---

## 7. Design System (Active — applied inline)

- **Headings:** Inter Tight, weight 400 default
- **Body:** Inter
- **Cards:** card tokens, no gradients on standard cards or subcards
- **Radius:** `rounded-lg` everywhere — no exceptions. Never `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[Xrem]`
- **Gradients:** hero and deliberate highlight surfaces only
- **Container:** `max-w-7xl`
- **Components:** Server Components by default; Client Components only when interaction is required
- **Section backgrounds (gray):** always `bg-gray-50` — never `bg-[#FAFAFA]`, `bg-slate-50`, `bg-gray-100`, `bg-gray-200`, `bg-gray-200/70`
  - Superseded `bg-gray-200/70` on 2026-08-02. **Applies to new and edited sections only — do not sweep existing greys.** Other values are still in use across the codebase by choice; leave them unless the section is being worked on for another reason.
- **Shadows:** NEVER. No `shadow-sm`, `shadow-md`, `shadow-xl`, `shadow-2xl` anywhere
- **Dark color default:** `bg-sognos-navy` is the default dark surface. Only use `bg-sognos-navy-dark` or `bg-sognos-navy-darkest` when explicitly instructed
- **Gaps:** `gap-3 lg:gap-4` as standard grid/flex gap
- **Stat blocks:** always match CTASection.tsx stat block pattern exactly:
  - Container: `grid grid-cols-2 gap-3 lg:gap-4`
  - Each cell: `relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden {bgClass}`
  - Number: `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none {textClass}`
  - Label: `text-xs font-semibold uppercase tracking-widest {labelClass}`
  - Color variants: `bg-prussian-blue-800 / text-[#8E9EBB]`, `bg-[#1D96FC] / text-blue-100`, `bg-white text-[#0A1629] / text-neutral-500`

---

## 8. Current Task

**Phase 6 + Phase 7 running in parallel (as of 2026-06-12)**

### Colour Token Rollout — ✅ Complete (2026-06-12)

Four-phase migration from old `sognos-brand`/`sognos-accent`/`prussian-blue-*` system to lean `sognos-*` tokens.

- [x] **Phase 1** — Additive token layer: `--sognos-navy`, `--sognos-blue-accent`, `--sognos-heading/body/muted/line`, per-product dark/base/gradient pairs. Navy bridge: `prussian-blue-800/900/950` re-pointed to new vars.
- [x] **Phase 2** — Mechanical rename: semantic utility → new names, `prussian-blue-*` utilities → `sognos-navy*`, hardcoded `[#1D96FC]` / `[#052048]` → tokens.
- [x] **Phase 3** — Per-product theming: Care/Roster/Genogram hero backgrounds, gradients, accent hexes → product tokens.
- [x] **Phase 4** — Final migration + dead token purge: `*-brand` → `*-sognos-blue-accent`, `(--sognos-accent)` → `sognos-blue-accent`, globals.css @theme + @layer base repointed, ~40 dead semantic tokens deleted, `@theme` ramp forwards for prussian-blue/cornflower-ocean/true-cobalt removed, orphan `components/sections/tokens.css` deleted.

**Token system state:** `app/tokens.css` is now lean — primitive ramps kept only as raw CSS vars for gradient tokens; all semantic colours use `--sognos-*` lean tokens.

### Phase 6 — Cohere Scaffold Clone

Cloning each page section-by-section from Cohere exports (`docs/Cohere/`) + live `cohere.com`, keeping Sognos copy/assets. Full conventions + accepted deviations in memory `session-2026-06-09-cohere-scaffold.md`.

- [x] **Homepage** — DONE (see §4). New components: `HowSognosWorks`, `SognosCareCard`, `SognosRosterCard`, `CTABand`. Reworked: `Hero`, `IndustrySection`, `NewsInsightSection` (morphing SVG notch). Container token → 1380px.
- [ ] **Solutions pages** — `app/(marketing)/solutions/[slug]/page.tsx` (7 solutions). Still uses pre-scaffold `rounded-xl`/`shadow-md`/`bg-white py-24`. **Need per-section Cohere mapping before refactoring — ask, don't guess.**
- [ ] **Product pages** — pending after solutions
- [ ] **Industry pages** — pending
- [ ] **Blog / Customer Stories** — pending

### Phase 7 — UI Polish & Motion (started 2026-06-10)

- [x] **Navbar full rewrite** — `AnimatePresence mode="popLayout"` cross-fade, hover intent (100ms open / 150ms close), `grid grid-cols-[1fr_auto_1fr]`, mobile accordion + orange dot.
- [x] **Scroll behavior — persistent bar** (supersedes the three-state `top` → `hidden` → `peek` model, removed 2026-08-01 in `df77a59`) — the header no longer translates. The announcement banner slides up (`-translate-y-full`) and the header animates `top` from the banner offset to `0`. `HIDE_AFTER`, `DELTA_MIN`, `headerHidden`, `mobileOpenRef` and `lastScrollYRef` are gone; the rAF-throttled handler now only sets `scrolled`.
- [x] **Nav transitions overhaul** — `duration-300` unified; logo `transition-[filter]`; `pt-3` hover bridge; `mode="popLayout"` + `position: "absolute"` exit.
- [x] **Mobile/tablet nav improvements** — hamburger right-aligned; content row is `h-20` (80px, all breakpoints — the old `h-[76px] lg:h-[68px]` no longer exists); tablet panel `md:w-[380px]`; "Book a Demo" `hidden sm:inline-flex lg:hidden`; backdrop-blur overlay with 72% CSS mask.
- [x] **ProductSubNav → pills-only** — IntersectionObserver scroll-spy, `layoutId="subnav-pill"`. Removed dock/sticky/logo/button machinery.
- [x] **SognosCare brand colour** — `#11102B` → `#03112f` across all affected files.
- [x] **SognosCare Hero — cinematic scroll** — `useScroll`/`useTransform`: scale 0.9→1, y 0→−160px, opacity fade; all-four-corner rounding.
- [x] **SognosCare Editions — CalloutCard style** — morphing notch, accent gradient bay, white logo, "Read more" arrow; IndustrySection slider; EditionsDrawer removed from `ProductSection`.
- [x] **SognosCare Editions section** — `#03112f` bg, white heading + `text-white/70` intro, eyebrow pill removed.
- [x] **SognosCare Problems dark bg** — `#03112f` bg, inverted text, `subNav` slot.
- [x] **Footer mobile accordions** — `FooterColumns.tsx` as `"use client"`, Framer Motion height/opacity, acknowledgement own row.
- [ ] **ProductSubNav dock-from-bottom** — reappears fixed under navbar when scrolled past in-section position. See `features.md`.
- [ ] **Roster + Genogram Problems dark sections** — same pattern; Roster `#3990c5`, Genogram `#250438`. See `features.md`.

---

## 9. Next Tasks (Ordered)

1. **ProductSubNav dock-from-bottom** — reappears fixed under navbar when scrolled past its in-section position (Phase 7)
2. **Solutions pages Cohere port** — section-by-section refactor of `solutions/[slug]/page.tsx` (Phase 6); ask for per-section mapping first
3. **Roster + Genogram Problems dark sections** — same `#PROBLEM_BG` + inverted text pattern as SognosCare (Phase 7); use `--sognos-roster-dark` / `--sognos-genogram-dark` tokens
4. **Edition token pass** — reconcile old `--sognos-edition-green/orange/lime/coral/purple/pink` vs new lean `--sognos-edition-*` tokens; migrate `EditionCards.tsx`
5. **Build customers hub and case study pages** — `/customers`, `/customers/[slug]`

---

## 10. Technical Gotchas

- **Linter strips code between saves** — always re-read file before multi-step edits; bento overlay was removed twice by the formatter
- **Card backgrounds** — never use `style={{ background: "" }}`; use `bg-white` class. Empty string = transparent card = orbs invisible
- **FlyonUI is NOT installed** — when user pastes FlyonUI snippets, translate to React state + Tailwind + Framer Motion
- **Component reference sources** — Aceternity UI and Magic UI are the preferred sources for animated bento/card components; do not hand-build from Stripe HTML
- **Interactive sections** — any section using useState/hooks needs `"use client"` at the top; ProductSection is already a client component
- **`@property --shine-angle`** — requires Chrome 85+ / Safari 15.4+; see globals.css for full shine border implementation
- **Framer Motion drawer pattern** — established in ProductSection: `AnimatePresence` wraps conditional render, outer `motion.div` fades, inner panel uses `y: "100%" → 0` spring (`damping: 30, stiffness: 300`)
- **Next.js 15 async params** — page components receiving `params` must be `async`; use `const { slug } = await params` before accessing route segments
- **Bulk identical class swaps** — use `sed -i '' 's/old/new/g' file1 file2 file3` rather than individual Edits across multiple files
- **EditionCards.tsx vs ProductCard.tsx** — editions slider lives in `components/layout/sections/sognoscare/EditionCards.tsx`; `ProductCard.tsx` is the homepage product card — do not confuse
- **Drawer scroll isolation** — requires both `document.body.style.overflow = "hidden"` on expand AND `overscroll-contain` on the inner scroll div; both are needed
- **ProductCustomerStories** — shared customer stories component at `components/layout/sections/ProductCustomerStories.tsx`; product `Stories.tsx` files are thin wrappers around it
- **Knowledge Hub post template** — `app/(marketing)/knowledge-hub/[slug]/page.tsx`; all 6 posts hardcoded for dev, `twoCol: true` enables sticky-meta + scrollable-content layout
- **Navbar scroll model** — one persistent bar. The header is `fixed` with an `h-20` (80px) content row and never translates on scroll; only its `top` animates, from the banner offset to `0`, as the announcement banner slides itself up on first scroll. A single `scrolled` flag (`window.scrollY > 8`) drives the banner slide plus the bar's background/border swap. The old three-state `top` → `hidden` → `peek` model, and its `HIDE_AFTER` / `DELTA_MIN` / `headerHidden` state and the effect that force-revealed the bar when a dropdown opened, were removed in `df77a59` — do not reintroduce them. State lives in `Navbar.tsx`; do not add per-section `data-header-dark` listeners back.
- **80px is a fixed offset** — because the bar no longer hides, anything positioning beneath it can rely on a constant 80px. Already assumed by `SolutionUseCases` (`TOP_BASE`) and `ArticleScrollNav` (`MOBILE_BAR_TOP`, sticky `top-20`). Changing the navbar height means updating those.
- **ProductSubNav sections prop** — shape is `{ label: string; id: string; href?: string }[]` (matches `SubNavSection` exported from `ProductSubNav.tsx`). `href` is optional — defaults to `#${id}` if omitted.

---

## Hard Rules

- Products are primary — always lead with SognosCare + SognosRoster
- Solutions are supporting — never primary positioning
- Industries are separate from solutions — never merge
- Platform is embedded proof only — never a nav item, never a standalone page layer
- CTA label: **"Book a Demo"** everywhere
- Doc sync: any routing, permalink, or page title change must update `project-overview.md` and `project-plan.md` in the same task
- Server Components by default
- Claude = Builder + Architect only (NOT designer)
- - If you cannot locate a file on the first attempt, stop and ask — do not keep searching and burning tokens
- Always ask instead of guessing — if unsure about anything (file path, intent, scope), ask for clarification
- Before starting a task, suggest which model to use (Opus for complex/architectural work, Sonnet for straightforward edits, Haiku for simple lookups)
- Always ask instead of guessing — if unsure about anything (file path, intent, scope), ask for clarification
- Before starting a task, suggest which model to use (Opus for complex/architectural work, Sonnet for straightforward edits, Haiku for simple lookups)
- Do not add features, abstractions, or complexity beyond what the task requires — keep it minimal

## Source of truth & session loop
- `docs/DESIGN_MIGRATION_STATE.md` is the authoritative state of record. Read it at the START of every task.
- At the END of every task: update DESIGN_MIGRATION_STATE.md to reflect reality, and append one entry to `docs/CHANGELOG.md` (date · what changed · files · why).
- `docs/FEATURE_LOG.md` is the granular backlog. `docs/archive/` holds superseded audits/plans — historical only, never current.
