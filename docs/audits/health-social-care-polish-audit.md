# Industries / Health & Social Care — Production Polish Audit

> **Route:** `/industries/health-social-care` · `app/(marketing)/industries/[slug]/page.tsx`
> **Template scope:** the page is the shared `industries/[slug]` template — **every finding applies to all 5 industry routes** (health-social-care, facilities-management, local-government, industrial-services, energy-utilities). Only the copy differs (`lib/industries-content.ts`, `INDUSTRIES` in `lib/constants.ts`).
> **Benchmarks:** <https://www.angellist.com/fund-administration/spvs> (measurements in `docs/audits/sognoscare-polish-audit.md` §1) and the visuals gallery `docs/mockups/sognoscare/04b-feature-visuals.html` (graphic language, panel colours, motion).
> **Mode:** Audit → HTML mockups → approval → fix. No copy or colour changes without approval.
> **Status:** STEP 1–2 complete. Awaiting mockup approval. Nothing in `.tsx` changed.

---

## 0. Verification

- **Docs:** `DESIGN_MIGRATION_STATE.md` is archived (`docs/archive/`); `docs/PROJECT_STATE.md` is authoritative. §4.4 lists Industries `[slug]` as **in progress** with an open H2 conflict ("uses `font-normal` with inconsistent responsive stepping", §6 open question). Last three CHANGELOG entries are Frontline Platform mockup work — nothing industry-specific done or deferred.
- **Rules applied:** PROJECT_STATE §2 over the brief's older hard rules — same conflict table as the SognosCare audit §0: `rounded` base (buttons `rounded-full`), surfaces `bg-white` / `bg-sognos-tint` (not `bg-gray-200/70`), live palette (the brief's `#1e293b / #10b981 / #f59e0b / #3b82f6` are not this site's tokens). Mockups reuse the SognosCare / Frontline system: `SectionLabel`, page type scale (`TYPE`), 2/10 rail, gallery `.fv` panels, Works-with product cards.
- **Build:** `npm run build` — **pass**, exit 0, no warnings (dev stopped, `.next` cleared, dev restarted).

### Dependency tree

| Node | File | Shared? (consumers) |
|---|---|---|
| Page | `app/(marketing)/industries/[slug]/page.tsx` | template for 5 routes |
| Content | `getIndustryContent` / `getIndustryMeta` · `lib/industries-content.ts`; `INDUSTRIES`, `PRODUCTS` · `lib/constants.ts` | static TS (no Sanity) |
| Eyebrow | `components/ui/AnimatedEyebrow` | **shared (16)** |
| Hero CTA | `SolutionHeroDemoButton.tsx` | **shared (4: solutions, industries, customer-stories, KH posts)** |
| Challenge | `industries/IndustryChallengeStack.tsx` | page-only |
| How Sognos helps | `industries/IndustryHowTabs.tsx` (client, Framer Motion) | page-only |
| Other industries | `IndustrySection.tsx` → `components/ui/FeatureRail` | **shared (homepage, style-guide, NewsInsightSection)** |
| ↳ media | `/public/dev/*` mock SVG/AVIF pool | shared with homepage |
| Customer stories | `industries/IndustryCustomerStories.tsx` → `ProductCustomerStories` | **ProductCustomerStories shared (10+)** |
| Platform | `industries/IndustryPlatformSection.tsx` | page-only |
| CTA band + Footer | layout | global (not audited) |

Rendered order (DOM, 2026-10-25): Hero (white) → Challenge (navy) → How Sognos helps (navy) → Other industries (white) → Customer stories (white) → Platform (navy-dark) → global CTA (navy-darkest).

---

## 1. Findings

### Page-level

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| G1 | **Third-party mock art** — "Other industries" renders `/public/dev/*` assets (Routable "PO matching" screens etc.) as each industry's media. | **P0** | Product visuals | Page-local media: the Home · Industries gallery graphics (built in 04b) per sector. | Shared `IndustrySection` — page-local `media` override, homepage untouched |
| G2 | **`shadow-2xl shadow-black/30`** on the How-tabs mock card — breaks the no-shadow rule. | **P0** | Borders for elevation | Remove; border-only card. | Page-only |
| G3 | **Surface rhythm**: two navy sections back to back (Challenge → How), then white → white, then navy-dark → navy-darkest CTA. | P1 | Alternating surfaces | white → navy → tint → white → white(stories) → navy, or as Q2. | — |
| G4 | **Four label treatments**: `AnimatedEyebrow` (hero, platform), uppercase accent `<p>` (challenge, how), none (other industries). | P1 | One label | `SectionLabel` throughout. | — |
| G5 | **Five H2 styles**: `text-4xl lg:text-4xl font-normal` (challenge, how — redundant step), `md:text-5xl font-medium` (other industries), `md:text-5xl font-normal` (platform), plus PROJECT_STATE §6 open conflict. | P1 | One H2 | `TYPE.h2` (400, 30→36px) — answers the §6 question. | — |
| G6 | Container drift: platform uses `max-w-6xl` (rule `max-w-7xl`). | P1 | 1280 container | `max-w-7xl`. | — |
| G7 | Arbitrary / off-system values: inline `style={{maxWidth:"42.5rem"}}`, `lg:max-w-[628px]`, `bg-white/[0.055]`, `text-white/65` / `/70` / `/72` (ladder is /75, /50, /80), `font-mono` numerals. | P2 | Tokens | Scale classes, alpha ladder, display-face numerals. | — |
| G8 | Hero eyebrow links the industry name to **`/solutions`** — wrong destination (copy unchanged, link only). | P1 | Breadcrumb | "Industries / Health & Social Care" breadcrumb, first part → `/industries` (**Q5**). | — |

### 1. Hero

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| H1 | Image frame `bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]` — off-palette purple carried from the scaffold (same as Frontline H1). | P1 | Frame `bg-sognos-tint`; image fills (local `/images/industries/health-social-care.webp`). |
| H2 | H1 `text-5xl lg:text-6xl` — off the page scale; sub `leading-normal`. | P2 | H1 on the scale; sub `TYPE.heroSub`. |
| H3 | Single CTA, no route into the page. | P2 | Secondary "See how Sognos helps ↓" text link (copy → **S2**). |
| H4 | 7/5 split puts copy and image at different optical centres. | P2 | Option A keeps 7/5 with bottom-aligned CTA; B adds a gallery card floating over the image (**Q1**). |

### 2. The challenge — `IndustryChallengeStack`

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| C1 | Header centred while every other polished page uses the rail / left header. | P2 | Left header on the rail (or keep centred — both mocked under A). |
| C2 | Cards `min-h-[340px]` with numeral pinned top, copy bottom — large dead middle at lg. | P2 | `min-h-[300px]`. |
| C3 | `font-mono` numerals; `text-white/70` body; label uppercase accent. | P2 | Display-face numeral at /25, `/75` body, `SectionLabel tone="dark"`. |
| C4 | Gap `gap-4 sm:gap-6` (rule `gap-3 lg:gap-4`). | P2 | Rule gap. |

### 3. How Sognos helps — `IndustryHowTabs`

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| T1 | G2 — `shadow-2xl` on the mock card. | **P0** | Border-only. |
| T2 | **Navy card inside a navy section** — the rounded `bg-sognos-navy` wrapper is invisible; the section reads as unframed. | P1 | Section surface change (Q2) or a visible frame. |
| T3 | **Auto-rotates every 4s with no pause** (WCAG 2.2.2) and the tablist has **no arrow-key navigation**. | P1 | Rotate only in view, pause on hover/focus, ArrowUp/Down/Home/End; or drop auto-rotate. |
| T4 | Placeholder mock: fake `2s…6s` timing chips, "Sognos operations" avatar "S", generic "Live records / Audit trail" chips; previews 5 rows when HSC has 3 items. | P1 | Per-item gallery graphic (compliance audit trail, worker match, live reporting) — **Q1/S3**. |
| T5 | Active body text duplicated (left `motion.p` + card). | P2 | One instance. |
| T6 | Mobile accordion has no `aria-controls`; `+` glyph rotates (fine). | P2 | Add `aria-controls`. |

### 4. Other industries — `IndustrySection` (shared)

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| O1 | G1 — `/dev/` third-party media. | **P0** | Page-local media (Home · Industries gallery graphics). |
| O2 | Section padding `pt-10 pb-10` (scaffold, noted in the file) — the tightest section on the page. | P1 | `py-20 md:py-28` via a page-local wrapper / prop. |
| O3 | H2 `md:text-5xl font-medium` + inline max-width styles. | P1 | `TYPE.h2`. |

### 5. Customer stories — `ProductCustomerStories` (shared)

Renders the Flourish Australia story only (HSC filter). Shared component — **out of scope**; note that a single-story carousel still shows slider chrome (P2, shared — note only).

### 6. Platform — `IndustryPlatformSection`

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| P1 | G6 — `max-w-6xl`. | P1 | `max-w-7xl`. |
| P2 | **Product description only on hover** — invisible on touch, and the card reads empty at rest (logo block + name). | P1 | Always-visible description; Works-with product card pattern (**Q4**). |
| P3 | `bgImage` per product (incl. an **Unsplash+ premium** URL) is defined but never rendered — dead data. | P2 | Remove, or use for the Paraform image style (Q4). |
| P4 | "Powered by" dividers `bg-sognos-navy/30` on navy — invisible. "Manage demand - Coordinate workforce - Track outcomes" uses hyphens as separators (copy — **S4**). | P2 | Visible dividers; separators as copy suggestion. |
| P5 | Grid `gap-2` (rule `gap-3 lg:gap-4`); H2 `md:text-5xl` with a redundant inner `<span class="text-white">`. | P2 | Rule gap, `TYPE.h2`. |

### Accessibility / responsive / motion
- Single H1 ✔. H2 order ✔. Tabs: roles ✔, keyboard ✖ (T3). Hover-only content ✖ (P2).
- Motion: How-tabs respects reduced motion for rotation ✔; FeatureRail / stories inherit their own behaviour.
- 375px: challenge stacks ✔; tabs → accordion ✔; platform cards 1-col ✔; no horizontal scroll observed in DOM (overflow-hidden on sections).

---

## 2. SUGGESTION / QUESTION (batched)

**QUESTION Q1 — Hero.** **A (recommended):** light split, polished (breadcrumb, tint frame, scale). B: same split with a gallery card (Home · Industries Health graphic) floating over the image — more product, more motion.

**QUESTION Q1b — Paraform-direction heroes** (added 2026-10-25, after paraform.com/for-companies): **P1** split — H1 last phrase at 40% ink, lede + CTA pinned low, framed photo with a counted stat and a frosted customer card (live Flourish Australia story title); **P2** photo-led — wide photo, frosted copy panel, floating live care-team card, stat chip; **P3** centred editorial — centred copy, 16:7 framed photo with three frosted cards. Stat values are **illustrative** — real figures needed before shipping. Each industry's hero photo is reused on its *Explore other industries* card (`04-other-industries-photo.html`, switcher "Industries · photo").

**QUESTION Q2 — Surface rhythm.** **A (recommended):** Challenge navy → How Sognos helps tint → Other industries white → Stories white → Platform navy. B: keep both navy and frame the tabs as a white card on navy.

**QUESTION Q3 — How Sognos helps layout.** **A (recommended):** vertical tab rail + one gallery graphic per item (audit trail / worker match / live reporting). B: three numbered cards, each with its graphic, no tabs (simpler; HSC has 3 items, but facilities / local government have 6 — B would need 2 rows there).

**QUESTION Q4 — Platform.** **A (recommended):** Works-with product cards (logo, live byline + description always visible, product graphic, Explore link) — same system as the Frontline mockup. B: keep the current hover cards, make the description permanent and fix the container.

**SUGGESTION S6 — "All industries" link** beside the Other industries heading (new copy) — mocked, marked as a suggestion.

**QUESTION Q5 — Hero breadcrumb link** `/solutions` → `/industries` (link fix, no copy change). Approve?

**SUGGESTION S1 — Swap Customer stories above Other industries** — proof sits next to the pitch; cross-links move to the end. Trade-off: departs from the template order shared by 5 pages (all move together).
**SUGGESTION S2 — Secondary hero link** "See how Sognos helps ↓" (copy).
**SUGGESTION S3 — Per-industry graphics for How Sognos helps.** The mockup ships Health & Social Care's three; the other four industries need their sets (or a neutral panel) before the template change ships.
**SUGGESTION S4 — Platform tagline separators** "Manage demand · Coordinate workforce · Track outcomes" (copy).
**SUGGESTION S5 — Move industry content to Sanity** (currently static TS) — out of scope, noted.

---

## 3. Fix log (STEP 3)

_Not started — awaiting mockup approval._

### Mockups (STEP 2)
`docs/mockups/health-social-care/` — `01-hero-a/b`, `02-challenge`, `03-how-a/b`, `04-other-industries`, `06-platform-a/b`, `index.html` (all sections, switcher for Q1 / Q3 / Q4). Customer stories shown as a placeholder (shared, unchanged). Checked at 1440 and 375: no broken images, no horizontal scroll, no console errors.
