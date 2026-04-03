

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