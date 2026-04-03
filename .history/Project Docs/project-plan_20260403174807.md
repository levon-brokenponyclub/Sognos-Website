# Sognos Website — Project Phases

## Phase 1: Foundation & Setup

**Goal:** Establish project structure and core environment

- Initialize Next.js project (App Router)
- Configure Tailwind CSS
- Setup folder structure (`/app`, `/components`, `/lib`)
- Implement global layout (`layout.tsx`)
- Setup Navbar + Footer (basic structure)
- Configure routing and navigation config

---

## ⚙️ Setup Requirements (Mandatory)

Use the following setup commands and constraints:

1. Create project:
   `npx create-next-app@latest sognos-react`

2. Ensure configuration:
   - App Router enabled
   - TypeScript enabled
   - Tailwind CSS enabled
   - NO `/src` directory (use root)

3. Install additional packages:
   - `shadcn/ui` (setup only, no components yet)
   - `framer-motion`

4. Clean default boilerplate:
   - Remove sample content
   - Keep minimal layout structure only

---

## 📁 Structure Rule

You MUST follow the structure defined in the architecture spec.

- Do NOT invent a new structure
- Do NOT use Pages Router
- Do NOT introduce unnecessary folders

---

**Output:**

- Working app scaffold
- Navigation visible

---

## Phase 2: Core Homepage Build

**Goal:** Build full homepage structure (no heavy styling)

- Hero section
- What Sognos Is
- Product section (Care + Roster)
- How It Works
- Platform section
- Industries section
- Proof section
- CTA section

---

### 🧩 Phase 2 Build Checklist (MANDATORY)

Claude must build the homepage using the defined component system.

#### Required Components

Create the following components in `/components/sections/`:

- `Hero.tsx`
- `WhatIsSognos.tsx`
- `ProductSection.tsx`
- `HowItWorks.tsx`
- `PlatformSection.tsx`
- `IndustrySection.tsx`
- `ProofSection.tsx`
- `CTASection.tsx`

---

#### Page Composition

Update:
`/app/(marketing)/page.tsx`

Must include EXACTLY:

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

#### Content Rules

- Use content from strategy document
- Maintain product-first messaging
- Must include BOTH:
  - SognosCare
  - SognosRoster

---

#### Structure Rules

- No styling decisions
- No visual enhancements
- Focus on layout + semantic structure
- Components must be reusable

---

#### Cross-Linking Requirement

- Product section must include links to:
  - `/products/sognoscare`
  - `/products/sognosroster`

---

#### Success Criteria (Phase 2)

- All sections exist
- Components are created and wired
- Homepage renders correctly
- Content is complete (no placeholders)

---

**Output:**

- Fully structured homepage
- All content in place

---

## Phase 3: Product Pages

**Goal:** Build core product pages

- `/products/sognoscare`
- `/products/sognosroster`

Each includes:

- Hero
- Problem
- Features
- Integration (cross-linking)
- CTA

**Output:**

- Both product pages live

---

## Phase 4: Platform & Supporting Pages

**Goal:** Build supporting content layer

- Platform pages (`/platform/...`)
- Industries dynamic pages
- Customers (case studies)
- Resources pages

**Output:**

- Full site navigation coverage

---

## Phase 5: Design & UI Enhancement

**Goal:** Apply premium UI (Stripe/Luno level)

- Typography system
- Spacing + layout refinement
- Gradient + visual system
- Card styles + interactions
- Product UI mock visuals

**Output:**

- Visually polished site

---

## Phase 6: Interaction & Motion

**Goal:** Add micro-interactions and polish

- Hover states
- Transitions
- Framer Motion animations
- Product card interactions

**Output:**

- Smooth, modern UX

---

## Phase 7: Conversion & Integrations

**Goal:** Enable lead capture and tracking

- Contact form (API route)
- CRM integration (HubSpot or similar)
- Scheduler embed (Calendly/Chili Piper)

**Output:**

- Conversion-ready site

---

## Phase 8: QA & Optimization

**Goal:** Prepare for launch

- Responsive testing
- Performance optimization
- SEO metadata
- Accessibility checks

**Output:**

- Production-ready site

---

## Phase 9: Launch

**Goal:** Deploy and go live

- Deploy to Vercel
- Domain setup
- Analytics (GA, tracking)

**Output:**

- Live website

---

## Phase 10: Iteration

**Goal:** Improve based on data

- Track conversions
- A/B test sections
- Optimize messaging

**Output:**

- Continuous improvement loop
