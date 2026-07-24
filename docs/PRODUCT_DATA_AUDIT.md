# Product Data Audit — Stats · Customer Stories · Client Logos

> **Read-only audit.** No components, content, lib files, or Sanity documents were modified. This document only catalogues what exists and where it lives, so a decision can be made about what to surface on the SognosCare, SognosRoster, and SognosGenogram product pages.
>
> **Authoritative source of truth:** the 8 `.md` files in `Project Docs/Site Content/Customer Stories/`. The currently-wired content in `CustomerStories.tsx` / `ProductCustomerStories.tsx` / per-product `Stories.tsx` is the *general/placeholder* set the homepage and product pages fall back to — it has 4 of the 8 stories and **no product link beyond a hardcoded image path on the hub page**.

---

## 0. Top Matrix — availability read

| Product | Stats | Stories (product-linked?) | Client logos |
|---------|-------|---------------------------|--------------|
| **SognosCare** | ✓ — 1 real story stat wired (Flourish `1,100+`); 4 more in docs not wired. Edition pages have placeholder `35% / 40% / 100% / 99% / 3×` literals. No standalone stat block on the page itself. | ✓ — 1 docs-mapped story (Flourish) currently wired via shared default. Sanity has `featuredStories[]` ref on the product page doc — that's the link, **product→story**. | ✓ — `ProductTrustStrip` wired with 5 hardcoded customer logos (Flourish, Auckland, Penrith, Gentari, NPS). No per-product Sanity field — static array. |
| **SognosRoster** | ✓ — 4 real story stats reachable in docs (Penrith `25 min → 10 sec`, Auckland `100% adoption`, Gentari `10,000+ assets`, NPS `5,000+ contracts`). None of these are wired as stat tiles. Currently shows: shared `companySize` values + one in-prose `20–30%` placeholder. Orphan `sognosroster/Proof.tsx` has `40% / 1,100+ / 95% / <1hr` but is **not rendered**. | ✓ — 4 docs-mapped stories exist (Penrith, Auckland, Gentari, plus APP/ASC/NPS). Currently wired via shared default (same 4 as Care). Sanity query is **broken/stale** — `getSognosrosterPageContent` selects `stories` but the schema field is `featuredStories`. | ✗ — `ProductTrustStrip` **not imported on the Roster page**. No logo strip rendered at all. |
| **SognosGenogram** | ✗ (new product) → propose fallback: qualitative capability highlights; the only story metric remotely adjacent is Flourish's `1,100+` mental-health staff. | ✗ — no story in the docs describes a relationship-mapping workflow. Closest adjacency is Flourish (mental health). Currently wired via shared default (same 4). **No `sognosgenogramPage` Sanity schema exists.** | ✗ — no logo strip wired. No customer overlap to draw a strip from. → propose fallback: re-use the global `LogoStrip` set, or a Microsoft/platform trust signal. |

---

## 1. Customer Stories — Master List (from Project Docs)

**Source folder:** `/Users/levongravett/Desktop/BPC/Sites/sognos-react-redesign/Project Docs/Site Content/Customer Stories/` (read in full).

The product mapping below is derived from each doc's *industry*, *"The Solution"* content, and named D365 modules (Field Service = scheduling/dispatch → Roster; CRM/case management/compliance → Care; relationship mapping → Genogram). The "Wired?" column reflects current code state.

| # | Story | Industry / Size | **Product** (from docs) | Key real stats (verbatim) | Headline quote | Currently wired? |
|---|-------|------------------|--------------------------|----------------------------|----------------|------------------|
| 1 | **Flourish Australia** (`FlourishAustralia.md`) | Mental Health / Community Services · 1,100+ staff · National AU | **SognosCare** — explicit Enquiry→Intake→Support Delivery→Billing→Claiming; NDIS PRODA; participant management. No scheduling/genogram language. | `1,100+ users on single system`; `single source of truth for all operational and reporting needs` | "Congratulations and WELL DONE…You should all be very proud of the quality of work you produce." — Susan McCarthy, COO | ✓ Homepage `CustomerStories`, ✓ shared `ProductCustomerStories` default, ✓ `/customer-stories` hub (productLogo = `sognos-care-logo.svg`). |
| 2 | **Penrith City Council** (`PenrithCityCouncil.md`) | Local Government · 300+ technicians · NSW | **SognosRoster** — Resource Crew movements; 3-click coordinator workflow; team-allocation pain. D365 Field Service. | `25 minutes → ~10 seconds` per task; `300 technicians`; high system adoption from previously resistant users | (no attributed quote in source) | ✓ Homepage, ✓ shared default, ✓ hub (productLogo = `sognos-roster-logo.svg`). |
| 3 | **Auckland Airport** (`AucklandAirport.md`) | Transport / Infrastructure · 350+ · NZ | **SognosRoster** — "custom-built scheduling workflow to automatically assign jobs based on fault type, priority, technician skillsets." Skill-based dispatch. D365 FS. | `100% business and end-user adoptability`; `Delivered on time and on budget`; unified platform across engineering | "Thank you to the Sognos team…Looking forward to a continued successful partnership with Sognos as our Field Service support partners!" — Anthony Hart, Operations Delivery Lead | ✓ Homepage, ✓ shared default, ✓ hub (productLogo = `sognos-roster-logo.svg`). |
| 4 | **Gentari Solar Australia** (`Gentari.md`) | Renewable Energy / Utilities · 30–50 staff · 10,000+ assets · National AU | **SognosRoster** — automated preventive maintenance scheduling; mobile-first tools for field teams; in-house techs + subcontractors. D365 FS + Business Central. | `10,000+ components on the farm`; `Over a year into using D365 FS, adoption rates remain high`; `5+ years using the system` | "We have over 10,000 components on the farm…D365 FS has not disappointed us in any of our key requirements. It has been over five years…the techs love it, and so do we." — Gentari | ✓ Homepage, ✓ shared default, ✓ hub (productLogo = `sognos-roster-logo.svg`). |
| 5 | **NECA** (`NECA.md`) | Not-for-Profit / Membership · 6,000+ member businesses · National AU | **None of the three products fit cleanly.** CRM + member portal + payments — Solutions-layer (CRM / Customer Service), not a product story. | `6,000+ electrical & communications contracting businesses`; faster reconciliation via integrated CRM + online payments | (none) | ✓ Hub only — **no productLogo** assigned. Not on any product page. |
| 6 | **Asset Security Concepts** (`AssetSecurityConcepts.md`) | Intelligent Security Solutions (SECOM Group) · 50–70 · National AU | **SognosRoster** — replaced whiteboards for job scheduling; push jobs to techs; D365 FS + Business Central. | `Now over 2 years into D365 journey`; `near-zero paper-based work` | (none) | ✓ Hub only (productLogo = `sognos-roster-logo.svg`). **Not on Roster page.** |
| 7 | **All Purpose Pumps** (`AllPurposePumps.md`) | Industrial / Pumping · 100–150 · VIC | **SognosRoster** — running behind schedule on PM jobs; quote-to-work-order; van-stock visibility; D365 FS + Sales. | (no discrete %s) qualitative outcomes only | (none) | ✓ Hub only (productLogo = `sognos-roster-logo.svg`). **Not on Roster page.** |
| 8 | **Natural Power Solutions** (`NPS.md`) | Power & Lighting Protection · 30–50 · National AU | **SognosRoster** — 5,000+ PM contracts in Excel; no work-order visibility; D365 FS + Sales. | `5,000+ PM contracts managed in Excel (before)`; `360-degree view of each customer`; increased sales due to advanced reporting | "By implementing this system, we've been able to demonstrate that value by talking to the customer, showing them what they have, showing them what they need…" — Daniel Sargent, Head of Sales | ✓ Hub only (productLogo = `sognos-roster-logo.svg`). **Not on Roster page.** Featured on `Industries/IndustrialServices.md` copy. |

**SognosGenogram:** none of the 8 stories describe a relationship-mapping workflow. Flourish is the only adjacent client (mental health). No Genogram-specific story exists.

### 1a. Product → story mapping summary

| Product | Stories that fit (from docs) | Currently wired on the product page |
|---------|------------------------------|--------------------------------------|
| SognosCare | Flourish Australia (1) | Flourish only via shared default fallback. Sanity `featuredStories[]` would replace if populated. |
| SognosRoster | Penrith, Auckland, Gentari, ASC, APP, NPS (6) | Generic shared default (Flourish, Auckland, Penrith, Gentari) — **3 of 6 Roster-fit stories**. ASC, APP, NPS not wired. Sanity query is **broken/stale** (selects `stories`; schema is `featuredStories`). |
| SognosGenogram | none (0) | Generic shared default (same 4 as everywhere else). |
| Unassigned | NECA (1) | Hub only. |

---

## 2. Stats — Detail

### 2.1 SognosCare — stats currently visible on `/products/sognoscare`

| Value | Label / context | Where on page | Source | Real vs Placeholder |
|-------|------------------|----------------|--------|---------------------|
| `01–05` | Capability index numbers | Problems — 5 capability columns | `sognoscare/Problems.tsx` L22–53 | index-only (not a metric) |
| `01–04` | Problem-card index numbers | Problems — problem cards | `lib/content/sognoscarePage.ts` L102–143 (`number` field) | index-only |
| `1,100+` | Company Size — Flourish | Stories (shared) | `ProductCustomerStories.tsx` L37 default; or Sanity `featuredStories[].sidebar.Size` | **real** (Flourish) |
| `350+` | Company Size — Auckland Airport | Stories (shared) | same | **real** (Auckland) |
| `300+` | Company Size — Penrith | Stories (shared) | same | **real** (Penrith) |
| `10,000+` | Company Size — Gentari | Stories (shared) | same | **real** (Gentari) |

**No standalone stat block on the SognosCare page.** Hero, Features, Editions, Advantages, Stories — none contains a `text-4xl/5xl tracking-tight leading-none` stat tile.

#### Reachable on edition slug pages (`/products/sognoscare/editions/*`) — *not on the parent product page*

| Value | Edition | Source | Real vs Placeholder |
|-------|---------|--------|---------------------|
| `35%` (referral wait time dropped by 35%) | Allied Health | `editions/allied-health/page.tsx` L109 (in-quote, unattributed) | general placeholder |
| `100%` (Built 100% on Microsoft Dynamics 365) | Disability & Mental Health | `editions/disability-mental-health/page.tsx` L92 | general placeholder |
| `40%` (Reduces admin by up to 40%) | Disability & Mental Health, Residential Aged Care | `disability-mental-health/page.tsx` L95, `residential-aged-care/page.tsx` L94 | general placeholder |
| `300+` | several editions | `editions/*/page.tsx` L126 (`caseStudy.companySize`) | placeholder (duplicates Penrith number) |
| `Multi-team` | Child & Family Services, Hospital in the Home | `editions/*/page.tsx` L126 | placeholder (text, not numeric) |
| `3× Faster Compliance Reporting` | All editions via `<CTASection defaultProduct="sognoscare" />` | `lib/content/ctaSection.ts` L31–36 (Sanity-overridable) | general placeholder |
| `99% Quality Standard Compliance` | All editions via CTASection | `lib/content/ctaSection.ts` L37–42 (Sanity-overridable) | general placeholder |

#### Real stats from docs that could be wired (currently absent from the page)

| Value | Source story | Where it could go |
|-------|---------------|--------------------|
| `1,100+ users on single system` | Flourish | a real stat tile / Proof section / hero proof line |
| `single source of truth across operations` (qualitative) | Flourish | Advantages / outcome quote |

### 2.2 SognosRoster — stats currently visible on `/products/sognosroster`

| Value | Label / context | Where on page | Source | Real vs Placeholder |
|-------|------------------|----------------|--------|---------------------|
| `01–04` | Problem-row index numbers | Problems | `sognosroster/Problems.tsx` L1–42 (hidden via `{/* number hidden */}` L75) | index-only |
| `20–30%` | "Workforce managers in high-volume environments spend 20–30% of their week on scheduling…" | Problems — problem 01 body copy | `sognosroster/Problems.tsx` L6 | **general placeholder** (in-prose copywriter claim, no source) |
| `1,100+` | Company Size — Flourish | Stories (shared default) | `ProductCustomerStories.tsx` L37 | real (Flourish — but Flourish maps to **Care**, not Roster — wrong product association) |
| `350+` | Company Size — Auckland Airport | Stories (shared default) | same | **real** (Auckland — correct fit for Roster) |
| `300+` | Company Size — Penrith | Stories (shared default) | same | **real** (Penrith — correct fit) |
| `10,000+` | Company Size — Gentari | Stories (shared default) | same | **real** (Gentari — correct fit) |

#### Orphan — `sognosroster/Proof.tsx` exists but is NOT rendered

| Value | Label | Verdict |
|-------|-------|---------|
| `40%` | Reduction in scheduling time | general placeholder |
| `1,100+` | Workers coordinated daily | general placeholder |
| `95%` | Shift coverage rate | general placeholder |
| `< 1hr` | Average reoptimisation time | general placeholder |

#### Real stats from docs that could be wired

| Value | Source story | Quality |
|-------|---------------|---------|
| `25 min → ~10 sec` per coordinator task | Penrith | strong — verbatim quantified outcome |
| `100% user adoption` | Auckland Airport | strong |
| `10,000+ assets / components` managed | Gentari | strong |
| `5,000+ PM contracts` previously in Excel | NPS | strong |
| `300 technicians` operating Roster workflows | Penrith | strong (company size) |
| `near-zero paper-based work` | ASC | qualitative |
| `delivered on time and on budget` | Auckland | qualitative |

### 2.3 SognosGenogram — stats currently visible on `/products/sognosgenogram`

| Value | Label / context | Where on page | Source | Real vs Placeholder |
|-------|------------------|----------------|--------|---------------------|
| `1–3` | Pain-point card index numbers | Problems | `sognosgenogram/Problems.tsx` L38 (`{i + 1}`) | index-only |
| `1,100+` / `350+` / `300+` / `10,000+` | shared default Company Size values | Stories (shared default) | `ProductCustomerStories.tsx` | real but **none of these clients are Genogram clients** — mis-associated |

#### No real Genogram stats exist in the docs

The Genogram product copy (`Products/SognosGenogram/SognosGenogramCopy.md`) describes capabilities (Relationship Mapping, Support Network Visibility, Risk & Dynamics Insight, Integrated Client Context, Real-Time Updates, AI-supported insights) but contains no quantified outcomes.

### 2.4 Orphan stat components (NOT imported by any page — would mislead a grep)

| File | Contents | Status |
|------|----------|--------|
| `components/sections/ProofSection.tsx` | `40% / 99% / 3× / 1,100+` | not imported anywhere |
| `components/sections/sognoscare/Proof.tsx` | `99% / 75% / 60% / 12,000+` | exists but not rendered by `sognoscare/page.tsx` |
| `components/sections/sognoscare/Integration.tsx` | (scaffolded, status unverified) | not rendered |
| `components/sections/sognosroster/Proof.tsx` | `40% / 1,100+ / 95% / <1hr` | exists but not rendered by `sognosroster/page.tsx` |
| `components/sections/sognosroster/Integration.tsx` | (scaffolded) | not rendered |
| `components/sections/sognosgenogram/Integration.tsx` | (scaffolded) | not rendered |

These contain the most heavily-quantified content in the repo but **all values are general placeholders without source citation**. They would be misleading if surfaced as-is.

### 2.5 Stats outside customer stories (scan of `Project Docs/Site Content/Products/`, `Industries/`, `Solutions/`, `Home/`)

| Value (verbatim) | Source | Product/area |
|-------------------|--------|--------------|
| `10 languages to provide translations if required` | `Industries/HealthAndSocialCare.md` | Care / Microsoft Cloud for Healthcare capability |
| `24/7 access to technical resources` | `Industries/HealthAndSocialCare.md` | Care (general) |
| `D365 FS runs efficiently 24/7` | `Industries/FacilitiesManagement.md` | Roster / Facilities |
| `5 to 50 field agents` (QuickStart target) | `Solutions/Solution_QuickStart.md` | QuickStart Solution |
| `in as little as four weeks` (QuickStart timeline) | `Solutions/Solution_QuickStart.md` | QuickStart Solution |
| `Four Tailored Editions` | `Products/SognosCare/SognosCare.md` | Care (editions count) |

No standalone `% reduction / X hours saved / Y× faster` claims exist outside the customer-story files. All hard outcome stats live inside the case studies.

---

## 3. The Story↔Product Link Mechanism

### 3.1 Verdict — one sentence

**There is no formal, queryable `story→product` link in the codebase.** `customerStory.ts` (the Sanity schema) has a `productLogo` *image* field (not a slug, not a reference, not an enum), and the link is inverted: each product-page document (`sognoscarePage`, `sognosrosterPage`) carries a `featuredStories[]` array of references to `customerStory` documents (**product→story** direction).

### 3.2 Evidence (verbatim)

**`sanity/schemas/customerStory.ts` — closest thing to a product field is an image:**

```ts
defineField({
  name: "productLogo",
  title: "Product logo (SognosCare / SognosRoster)",
  type: "image",
}),
```

No `product` / `products` / `relatedProduct` / `category` / `tags` / `productSlug` / `productRef` field exists on `customerStory`. Full field list: `company`, `slug`, `title`, `description`, `date`, `readTime`, `order`, `heroImage`, `companyLogo`, `productLogo` (image), `quote`, `quoteAuthor`, `sidebar`, `downloadFile`, `body`.

**`sognoscarePage.ts` L192–199 — product→story (inverted) link:**

```ts
defineField({
  name: "featuredStories",
  title: "Featured customer stories",
  type: "array",
  group: "sections",
  of: [{ type: "reference", to: [{ type: "customerStory" }] }],
  description: "Optional. If omitted, the page falls back to the global story rotation.",
}),
```

**`sognosrosterPage.ts` L175–182 — same pattern on Roster:**

```ts
defineField({
  name: "featuredStories",
  …same shape…
}),
```

**`edition.ts` L184–193 — editions also use product→story direction:**

```ts
defineField({
  name: "customerStories",
  …array of references to customerStory…
}),
```

**No `sognosgenogramPage` Sanity schema exists.** Genogram has no Sanity document at all, so it cannot embed featured stories.

**`ProductCustomerStories.tsx` props — product-agnostic:**

```ts
interface ProductCustomerStoriesProps { stories?: CaseStudy[]; }
export default function ProductCustomerStories({ stories = ALL_STORIES }) { … }
```

No `product` prop, no filter logic, no awareness of which product it's rendering for. The caller passes stories explicitly or accepts the global fallback.

**`lib/sanity/queries.ts` L86–94 — only SognosCare query actually pulls stories:**

```groq
"featuredStories": featuredStories[]->{
  "slug": slug.current, company, quote, quoteAuthor,
  sidebar, heroImage, companyLogo
},
```

**`getSognosrosterPageContent()` (L353–355) — broken/stale:** selects `stories` but the Roster schema field is `featuredStories`. Result: Roster Sanity stories never reach the page; the hardcoded shared default is always rendered.

### 3.3 The one place a story is visibly tied to a product

`app/(marketing)/customer-stories/page.tsx` is **fully hardcoded** (no Sanity at all). Its `STORIES: StoryCard[]` array carries an optional `productLogo` string path per story — the only place in the codebase where a story-to-product association is expressed.

| Client | `productLogo` path | Implied product |
|--------|---------------------|------------------|
| Flourish Australia | `/logos/sognos-care-logo.svg` | SognosCare |
| Auckland Airport | `/logos/sognos-roster-logo.svg` | SognosRoster |
| Penrith City Council | `/logos/sognos-roster-logo.svg` | SognosRoster |
| Gentari Solar Australia | `/logos/sognos-roster-logo.svg` | SognosRoster |
| All Purpose Pumps | `/logos/sognos-roster-logo.svg` | SognosRoster |
| Asset Security Concepts | `/logos/sognos-roster-logo.svg` | SognosRoster |
| NECA | (none) | unspecified |
| Natural Power Solutions | `/logos/sognos-roster-logo.svg` | SognosRoster |

**These hardcoded mappings match the docs exactly.** And critically — the `StoryCard` render function (L125–171) **never reads `productLogo`**. It is dead data right now: defined, set, never displayed, never filtered against. Same on the Sanity detail route — the GROQ projection selects `productLogo` but the render path (`[slug]/page.tsx` L98–383) never reads `story.productLogo`.

### 3.4 Implication

To build a *"stories by product"* UI without a content-model change you must either (a) aggregate every product/edition page document's `featuredStories[]` refs and derive a story→product map at build time, or (b) rely on the homepage hub's hardcoded `productLogo` string paths as a soft tag. The clean fix is to add a real `products` field to `customerStory.ts` — either an array of string options (`["sognoscare","sognosroster","sognosgenogram"]`) or an array of references to a new `product` document type — so the link is queryable in both directions in a single GROQ call.

---

## 4. Client Logos — Detail

### 4.1 Components

| Component | Data source | Per-product? | Currently wired |
|-----------|-------------|---------------|-----------------|
| `LogoStrip.tsx` | Sanity `logoStrip` doc → `getLogoStripContent()`; fallback `DEFAULT_LOGOS` in `lib/content/logoStrip.ts` (12 generic clients from `/logos/clients/`) | **Global only** — schema has no product discriminator | Homepage (`(marketing)/page.tsx:34`) and **all 7** `/solutions/[slug]` pages |
| `ProductTrustStrip.tsx` | Hardcoded `DEFAULT_LOGOS` array (5 customer logos); accepts optional `logos?` prop | **Could** accept per-product set via prop; currently uses default everywhere | **Only** SognosCare product page (`products/sognoscare/page.tsx:31`). Roster + Genogram pages do not import it. |
| `CTABand.tsx` | `DEFAULT_CTA_CONTENT.logos` from `lib/content/ctaSection.ts` (Microsoft/platform set) | Global (Microsoft, not customers) | Marketing layout — every marketing page |

### 4.2 ProductTrustStrip — the 5 hardcoded logos

```
/logos/flourish-australia-logo.png     → Flourish Australia
/logos/auckland-airport-logo.png       → Auckland Airport
/logos/penrith-city-council-logo.png   → Penrith City Council
/logos/gentari-logo-rect.webp          → Gentari Solar Australia
/logos/nps-logo.webp                   → Natural Power Solutions
```

Notable: **the static strip excludes ASC and All Purpose Pumps**, even though logos exist for both (`asc-logo.webp`, `all-purpose-pumps-logo.webp`) and both are Roster-fit stories.

### 4.3 LogoStrip fallback (`DEFAULT_LOGOS` in `lib/content/logoStrip.ts`) — 12 generic clients

`client-01.png`, `asc-secom.png`, `client-03.webp`, `nci.webp`, `countplus.png`, `water-nsw.webp`, `sa.webp`, `mcs.webp`, `neca.webp`, `nps.webp`, `deloitte.webp`, `apm.webp`. **Drives homepage and all solutions pages identically.**

### 4.4 Sanity `logoStrip.ts` schema

```ts
defineField({
  name: "logos", type: "array",
  of: [{ type: "object", fields: [image, alt] }],
  validation: (Rule) => Rule.min(1).required(),
})
```

**One global document, no product discriminator.** Returned by `*[_type == "logoStrip"][0]` — single record, single set.

### 4.5 Per-product logo fields on product page schemas

Neither `sognoscarePage.ts` nor `sognosrosterPage.ts` defines a `logos` / `trustStrip` / `clientLogos` array. The only logo-shaped field is `hero.logo` — a single image for the product wordmark in the hero. **There is no per-product customer-logo array anywhere in Sanity.**

### 4.6 Logo asset inventory

#### Customer / client logos (referenced)

| File | Used by |
|------|---------|
| `flourish-australia-logo.png` | `ProductTrustStrip`, `CustomerStories`, `ProductCustomerStories`, `EditionPageTemplate`, hub |
| `auckland-airport-logo.png` | `ProductTrustStrip`, `CustomerStories`, `ProductCustomerStories`, hub |
| `penrith-city-council-logo.png` | `ProductTrustStrip`, `CustomerStories`, `ProductCustomerStories`, hub, all 4 edition pages |
| `gentari-logo-rect.webp` | `ProductTrustStrip`, `CustomerStories`, `ProductCustomerStories`, hub |
| `nps-logo.webp` | `ProductTrustStrip`, hub |
| `asc-logo.webp` | hub only |
| `all-purpose-pumps-logo.webp` | hub, `ProductCustomerStories` |
| `neca-logo.webp` | hub only |
| Plus 11 referenced logos under `/logos/clients/` driving the global `LogoStrip` fallback |

#### Unused / dead weight (would mislead asset surfacing)

- **8 Cohere-scaffold logos** in `/logos/`: `aceternity-ui.png`, `asteroid-kit.png`, `gamity.png`, `granola.webp`, `hostit.png`, `openai.webp`, `oracle.webp`, `portola.webp` — all unreferenced.
- 11 `client-XX.webp` files in `/logos/clients/` — unreferenced.
- 4 partner logos in `/logos/partners/` — unreferenced (`Crayon.webp`, `One-Software.png`, `Resco.webp`, `digpacks_logo.png`, `mslogo.1419972748.png`).
- `auckland-airport.webp`, `flourish.webp`, `gentari-logo.webp` in `/logos/clients/` — dupes of top-level versions; not referenced.
- `icon-sognos-care.png/svg`, `Sognos-Solutions-Solutions-Partner.webp` — unreferenced brand assets.

#### Other folders

- `public/customer-stories/` — contains only `Sognos_Flourish_Customer-Story.pdf` (4 MB download asset). **No logo files.**

### 4.7 Scope verdict — one paragraph

There are **two parallel, independent customer-logo systems, both global, with no per-product set anywhere in code or Sanity.** (1) The Sanity-backed `LogoStrip` is the global trust marquee — its schema returns a single document `*[_type == "logoStrip"][0]` with no product discriminator, with a 12-logo `DEFAULT_LOGOS` fallback in `lib/content/logoStrip.ts`. It renders identically on the homepage and on all 7 `/solutions/[slug]` pages. (2) `ProductTrustStrip` is a static React component whose hardcoded `DEFAULT_LOGOS` lists 5 customer logos (Flourish, Auckland, Penrith, Gentari, NPS). It exposes an optional `logos?` prop so it *could* accept a per-product set, but **it is currently wired only on the SognosCare product page with no override** — Roster and Genogram pages do not import it at all. Neither `sognoscarePage` nor `sognosrosterPage` Sanity schemas define a logo-array field. The source of truth is therefore split: the global Sanity `logoStrip` document drives homepage and solutions; a hardcoded static array inside `ProductTrustStrip.tsx` drives the SognosCare product page only. `CTABand` is not a customer-logo system — its two marquees pull from a Microsoft/platform set (Dynamics 365, Copilot, Power BI, Power Automate, Power Apps, Power Pages, Dataverse).

---

## 5. Gaps & Recommendations

### 5.1 SognosCare

| Gap | Detail | Recommendation |
|-----|--------|----------------|
| Only 1 docs-fit story (Flourish) wired; default shows Flourish + 3 Roster stories | Roster stories (Auckland, Penrith, Gentari) currently appear on the Care page because the shared default isn't product-filtered. | (a) Add a real `products` field to `customerStory.ts` and filter in `ProductCustomerStories`; or (b) populate `sognoscarePage.featuredStories[]` in Sanity with Flourish only and live with one story until more Care customers are added. |
| No standalone stat tile | Edition pages have placeholder `3×/99%` from CTASection; the parent product page has no quantified proof block. | If a stat block is desired, source values from Flourish (`1,100+ users on single system`, `single source of truth across operations`) — the only Care-fit story available. |
| Edition placeholder stats (`35% / 40% / 100%`) are unattributed copy | Each edition's `ProofQuote` and Advantages bullets contain claim-style %s with no source. | Either remove until sourced, or replace with the Care-fit Flourish numbers, clearly attributed. |

### 5.2 SognosRoster

| Gap | Detail | Recommendation |
|-----|--------|----------------|
| 6 Roster-fit stories in docs, only 3 wired (Auckland, Penrith, Gentari via default) | ASC, APP, NPS have logos and full stories in docs, but are not on the Roster product page. | Populate `sognosrosterPage.featuredStories[]` in Sanity OR pass a `stories` prop to the Roster `Stories.tsx` wrapper. |
| Sanity query for Roster is broken/stale | `getSognosrosterPageContent()` selects `stories` but schema field is `featuredStories` — no Sanity stories ever reach the page. | Fix the GROQ projection (one-line change in `lib/sanity/queries.ts`). |
| `ProductTrustStrip` not wired on Roster | Roster has 4 strong client logos (Auckland, Penrith, Gentari, NPS — plus ASC, APP if added). | Wire `<ProductTrustStrip className="bg-sognos-roster-dark" logos={ROSTER_LOGOS} />`. |
| No real stat tiles | Orphan `sognosroster/Proof.tsx` exists with placeholders (`40% / 95% / <1hr`); real outcomes (`25 min → 10 sec` Penrith, `100% adoption` Auckland, `10,000+ assets` Gentari, `5,000+ contracts` NPS) sit unused in docs. | Replace the placeholder Proof with a real stat block sourced verbatim from Penrith, Auckland, Gentari, NPS — attribute each to the client. |
| Roster Problems body has unattributed `20–30%` | Inline prose claim with no source. | Replace or attribute. |

### 5.3 SognosGenogram (new — expected empty, confirmed empty)

| Gap | Detail | Proposed fallback (no fabrication) |
|-----|--------|------------------------------------|
| No stats anywhere — no docs, no real numbers | The docs describe capabilities only; the page shows shared default stats from other clients. | **Proposal:** remove the Stories section entirely OR re-frame as platform-level/parent-Sognos signal: "Built on Microsoft Dynamics 365 · used by 1,100+ frontline staff across the Sognos platform" — uses the Flourish number as Sognos-platform context. Mark as proposal pending sign-off. |
| No customer stories | None of the 8 stories describe a relationship-mapping workflow. Flourish (mental health) is closest adjacency only. | **Proposal:** swap the Stories slot for either (a) a one-card "Built alongside SognosCare for Flourish-style mental-health teams" qualitative reference, or (b) an explicit "Early adopter program — be the first to bring relational context to your case records" CTA. Do not fake-attach unrelated logos. |
| No customer logos | No Genogram customer overlap exists. | **Proposal:** replace `ProductTrustStrip` with either (a) the global `LogoStrip` (same Sanity-backed marquee as the homepage), or (b) a Microsoft/platform trust signal ("Built on Microsoft Dynamics 365" + Copilot/Power Platform logos — sourced from the existing `CTABand` set). Both are non-fabricated re-uses of assets already in the codebase. |
| No `sognosgenogramPage` Sanity schema exists | Genogram has no CMS document at all — page content is fully hardcoded. | If Sanity-managed content is needed before launch, mirror `sognosrosterPage.ts` schema for Genogram. Out of audit scope; flagged for awareness. |

### 5.4 Cross-cutting

| Item | Action |
|------|--------|
| Orphan stat files (`ProofSection.tsx`, `sognoscare/Proof.tsx`, `sognosroster/Proof.tsx`) contain unsourced placeholders and would mislead a future contributor scanning the repo. | Delete the files or move under `docs/archive/` per the project pattern. |
| `customerStory.productLogo` field is set but never rendered anywhere (hub list nor detail page). | Either (a) render it (fast), or (b) remove the field and replace with a real `products` array field (clean fix). |
| Hub list (`/customer-stories/page.tsx`) is fully hardcoded — bypasses Sanity entirely. | Migrate to read from Sanity (matches detail route) so a CMS edit updates both list and detail. Out of audit scope; flagged. |

---

## 6. Sanity Status

- **Schema read:** ✓ (`sanity/schemas/{customerStory,sognoscarePage,sognosrosterPage,edition,logoStrip,siteSettings,knowledgePost,legalPage,footer,ctaSection,index}.ts`).
- **Live document read:** skipped — no read-token presence verified inside this audit and the brief was read-only. To populate live counts/values, run:
  - `npx sanity exec scripts/list-customer-stories.ts` (would need to be authored) or
  - From a Studio session: GROQ `*[_type == "customerStory"]{ company, slug, sidebar, productLogo }` and `*[_type == "sognoscarePage"][0]{ featuredStories[]-> }` / `*[_type == "sognosrosterPage"][0]{ featuredStories[]-> }`.
- **Known broken query:** `getSognosrosterPageContent()` in `lib/sanity/queries.ts` L353–355 selects `stories`; the Roster schema field is `featuredStories`. Roster stories from Sanity never reach the page.
- **Missing schema:** there is no `sognosgenogramPage` Sanity document type.

---

## 7. Knowledge Hub WXR — Findings

The live WordPress site was exported on 2026-05-21 as WXR. Mined for additional stories, stats, logos, and any product taxonomy.

### 7.1 Inventory

42 `<item>` blocks total: **7 published `post`s** + **35 image attachments**. No custom post types (`customer_story`, `case_study`, `knowledge_post`, `resource` — none exist). One category only: `NEWS`. Tags used in practice: `sognos-solutions` (3 posts), `sognoscare` (3), `auckland` (1), `north-sydney` (1). **Zero structured taxonomy for SognosRoster, Genogram, solutions, industries, or customer names.**

### 7.2 All 7 published posts

| Date | Slug | Topic | Tags |
|------|------|-------|------|
| 2024-02-26 | `sognos-brings-renewed-energy-to-australian-electrical-body` | ARN press reprint on NECA digital transformation | none |
| 2024-08-13 | `sognos-webinar-series-reinventing-patient-and-participant-care` | Embedded Vimeo webinar with Microsoft + Flourish Australia | none |
| 2024-08-30 | `sognos-at-fsm-summit-2024-driving-the-future-of-field-service-in-sydney` | FSM Summit Sydney event recap | none |
| 2024-09-11 | `new-beginnings-office-premises-in-india` | India office opening (Pooja ceremony) | none |
| 2024-12-05 | `sognos-solutions-expands-to-new-zealand-with-official-launch-at-microsoft-house-in-auckland` | NZ launch event; introduces SognosCare for Allied Health/Social Care in NZ | `auckland`, `sognos-solutions`, `sognoscare` |
| 2025-04-07 | `sognos-solutions-moves-to-new-office-in-north-sydney` | Office relocation to 1 Denison Street | `north-sydney`, `sognos-solutions`, `sognoscare` |
| 2025-05-09 | `sognos-solutions-celebrates-9-years-of-growth-innovation-and-microsoft-dynamics-365-expertise` | 9-year company anniversary; presence in AU / NZ / India / emerging UAE | `sognos-solutions`, `sognoscare` |

**Verdict:** this is a 7-post corporate news feed, not a Knowledge Hub. 5 of 7 posts are company milestones (offices, anniversary, event recaps). 2 are syndicated/event content (ARN reprint, webinar). No thought-leadership articles, no product deep-dives, no industry analysis.

### 7.3 Customer stories — no additions

**Zero dedicated customer-story posts.** No post type, category, or slug matches the 8 stories already catalogued in §1. The ARN reprint is a narrative version of the existing **NECA** engagement, not a new story. The webinar post co-features **Flourish Australia + Microsoft**. The NZ launch post lists **APM Group, Auckland Airport, Function10, Microsoft NZ** as attendees (logo opportunity, not a story).

### 7.4 Stats / outcome claims (verbatim from post bodies)

All from the **NECA / ARN reprint** post — these are NECA's scale, not Sognos platform outcomes:

| Stat | Verbatim quote |
|------|----------------|
| `140 years` | "The advent of commercially-available electricity…140 years ago and NECA became its gatekeeper not long after." |
| `~5,000 members` | "Today it is responsible for nearly 5,000 members" |
| `100,000-person workforce` | "boasts a 100,000-person workforce" |
| `700 contractors` | "trains and employs 700 electrical contractors to hire out to member organisations" |
| `up to 6 platforms` (before Sognos) | "contractors had to remember up to six different platforms to access information" |
| `9 years` | "9 years of Sognos Solutions" (anniversary post) |

**Frame carefully** — the 5,000 / 100,000 / 700 numbers describe NECA's scale, not Sognos outcomes. Use as customer-context, never as platform proof.

### 7.5 Logos / clients / partners (additions to inventory)

| Name | Source post | Use case |
|------|-------------|----------|
| **APM Group** | NZ launch | Attended NZ launch — possible event-logo strip |
| **Function10** | NZ launch | Attended NZ launch — possible event-logo strip |
| **Microsoft NZ** | NZ launch + 9-year | Already in platform set |

Reconfirms: Flourish Australia, Auckland Airport, NECA, Microsoft.

### 7.6 Product associations in XML

**No structured product taxonomy exists.** No category, taxonomy term, ACF field, or custom-field meta key ties content to a specific product. The only signal is the `sognoscare` post_tag, applied loosely:

```xml
<category domain="post_tag" nicename="sognoscare"><![CDATA[SognosCare]]></category>
```

Applied to 3 posts (NZ launch, North Sydney move, 9-year anniversary) — only the NZ launch post substantively mentions SognosCare ("our purpose-built Accelerator solution for the Allied Health and Social Care sector"). **Zero references to SognosRoster or Genogram anywhere in the XML.**

### 7.7 Implications for the redesign

1. There is **no migrating Knowledge Hub** — any "blog/insights" content the redesign exposes is net-new authorship, not a migration.
2. The audit's customer-story master list is **complete** — the live WP site contributes no additional stories.
3. SognosRoster and Genogram have **zero published Knowledge Hub content** to feature.
4. The single substantive SognosCare KH touchpoint is one sentence in the NZ launch post — usable as a footnote, not as a feature article.
5. The existing 6 hardcoded Knowledge Hub posts in `app/(marketing)/knowledge-hub/[slug]/page.tsx` (per state doc) are not derived from this WP export — they're new content authored for the redesign.

---

## 8. Source file index (read during this audit)

### Project Docs (authoritative)

```
Project Docs/Site Content/Customer Stories/01 - Customer Stories.md
Project Docs/Site Content/Customer Stories/{AllPurposePumps,AssetSecurityConcepts,AucklandAirport,FlourishAustralia,Gentari,NECA,NPS,PenrithCityCouncil}.md
Project Docs/Site Content/Home/HomePage.md
Project Docs/Site Content/Industries/{HealthAndSocialCare,FacilitiesManagement,IndustrialServices,LocalGovernment}.md
Project Docs/Site Content/Products/SognosCare/SognosCare.md
Project Docs/Site Content/Products/SognosGenogram/SognosGenogramCopy.md
Project Docs/Site Content/Solutions/*.md (8 files)
Project Docs/Site Content/Knowledge Hub/sognossolutions.WordPress.2026-05-21.xml
```

### Code

```
app/(marketing)/page.tsx
app/(marketing)/products/{sognoscare,sognosroster,sognosgenogram}/page.tsx
app/(marketing)/products/sognoscare/editions/*/page.tsx
app/(marketing)/customer-stories/page.tsx
app/(marketing)/customer-stories/[slug]/page.tsx
components/sections/{CustomerStories,ProductCustomerStories,LogoStrip,ProductTrustStrip,CTABand,ProofSection,ProductFeaturesScroll}.tsx
components/sections/sognoscare/{Hero,Problems,Features,Advantages,Editions,EditionCards,Integration,Proof,Stories,EditionPageTemplate}.tsx
components/sections/sognosroster/{Hero,Problems,Features,Advantages,Integration,Proof,Stories}.tsx
components/sections/sognosgenogram/{Hero,Problems,Features,Integration,Stories}.tsx
lib/{constants,solutions-content,industries-content}.ts
lib/content/{ctaSection,logoStrip,sognoscarePage,sognosrosterPage,footer}.ts
lib/sanity/{client,queries,image}.ts
sanity/schemas/{customerStory,sognoscarePage,sognosrosterPage,edition,logoStrip,siteSettings,knowledgePost,legalPage,footer,ctaSection,index}.ts
public/logos/* (top-level + clients/ + partners/ + platform/)
public/customer-stories/ (single PDF, no logos)
```
