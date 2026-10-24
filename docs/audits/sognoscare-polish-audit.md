# SognosCare — Production Polish Audit

> **Route:** `/products/sognoscare` · `app/(marketing)/products/sognoscare/page.tsx`
> **Benchmark:** <https://www.angellist.com/fund-administration/spvs> (rendered DOM inspected 2026-10-24)
> **Mode:** Audit → HTML mockups → approval → fix. Layout / spacing / type / hierarchy / interaction / responsive only. No copy or colour changes.
> **Status:** STEP 3 applied 2026-10-24 to Hero, Trust strip, Sub-nav, Problems/Solution, Editions, Advantages. **Features and Customer Stories excluded by request.**

---

## 0. Verification

### Docs
- `DESIGN_MIGRATION_STATE.md` is **archived** (`docs/archive/`). Live state is `docs/PROJECT_STATE.md`; it says so itself (§9) and CLAUDE.md makes it authoritative.
- PROJECT_STATE §7: SognosCare is the **sandbox** for the print-aligned system — Sofia Pro (Typekit) + weight ladder (`font-bold` H1, `font-semibold` H2, `font-light` body on dark) + alpha bump (`text-white/85`), applied to **Hero + Problems only**. Features / Editions / Advantages / Stories are marked untouched (§4.2).
- Last CHANGELOG entries (About pass, ISO badge, KH Presentation) don't touch SognosCare.

### Rule conflicts between the brief and the repo
The brief's "hard rules" predate the 2026-08-07 consolidation. PROJECT_STATE §2 wins per repo CLAUDE.md, so this audit and the mockups follow it:

| Brief | PROJECT_STATE §2 (applied) |
|---|---|
| `rounded-lg` only | `rounded` (4px) base; `rounded-lg` for hero-scale surfaces; buttons `rounded-full` |
| Grey sections `bg-gray-200/70` | **Phased out** — `bg-white` or `bg-sognos-tint` |
| Palette navy `#1e293b`, green `#10b981`, amber `#f59e0b`, blue `#3b82f6` | Not the live palette. Live: `--sognos-care-dark #0f1936`, `--sognos-care-base #3b6fe0`, `--sognos-blue-accent #1d96fc`, edition tokens. Kept as-is. |
| Brand wave motif + image mask system (wave / diagonal) | Not present in the redesign codebase. Nothing to preserve or apply. |
| Next.js 15, `app/products/...` | Next.js 16.2.2, `app/(marketing)/products/...` |
| Container `max-w-7xl`, gaps `gap-3 lg:gap-4`, "Book a Demo" | Same — applied. |

### Build
`npm run build` — **pass**, exit 0, no warnings (dev server stopped for the build, `.next` cleared and dev restarted after).

### Dependency tree

| Node | File | Shared? (consumers) |
|---|---|---|
| Page | `app/(marketing)/products/sognoscare/page.tsx` | — |
| Data | `getSognoscarePageContent()` · `lib/sanity/queries.ts` | Page-only query · **FENCED** (GROQ) |
| Typekit `<link>` (Sofia Pro) | in page | page-only |
| Hero | `sognoscare/Hero.tsx` | page-local |
| ↳ `AnimatedEyebrow` | `components/ui/AnimatedEyebrow` | **shared (18)** |
| Trust strip | `ProductTrustStrip.tsx` (+ `getLogoStripContent`, `urlFor`) | **shared (3: Care, Roster, Genogram)** |
| Problems | `sognoscare/Problems.tsx` | page-local |
| ↳ Sub-nav | `components/ui/ProductSubNav.tsx` | **shared (4: Care, Roster, Genogram, DigPacks)** |
| Features | `sognoscare/Features.tsx` | page-local wrapper |
| ↳ `ProductFeaturesScroll` | `ProductFeaturesScroll.tsx` (+ `PlaceholderBox`) | **shared (5: Care, Roster, Genogram, DigPacks, EditionPageTemplate)** |
| ↳ `FeaturePlaceholderImage` | `FeaturePlaceholderImage.tsx` | shared (3 product Features) |
| Editions | `sognoscare/Editions.tsx` | page-local |
| ↳ `EditionCards` | `sognoscare/EditionCards.tsx` | **shared (2: Editions, EditionPageTemplate → 6 edition pages)** |
| ↳ `SOGNOSCARE_EDITIONS` | `lib/constants.ts` | fallback data |
| Advantages | `sognoscare/Advantages.tsx` | page-local |
| Stories | `sognoscare/Stories.tsx` → `ProductCustomerStories.tsx` (Embla) | **shared (9 consumers)** |
| Motion wrapper | `components/ui/ScrollReveal` | **shared (6)** |
| Global chrome (not in scope) | Navbar, CTABand, Footer via `(marketing)/layout.tsx` | — |

Not imported (orphans in the same folder): `sognoscare/Proof.tsx`, `sognoscare/Integration.tsx`.

---

## 1. Benchmark patterns (AngelList SPVs, rendered DOM)

| Pattern | Measured |
|---|---|
| Container | `max-w-[1536px]`, `px-5 sm:px-9 md:px-10 xl:px-12`, 12-col grid, `gap-8` |
| Section rhythm | Every content section `pt-20 pb-20` (80px); dense list sections `pb-[120px]`; pricing/compact `py-12` |
| Section label | **Left rail**, `lg:col-span-2`, sticky (`top-header + 8`), dot + sentence-case label at **18px / weight 400**, muted gold. Content in `lg:col-[3/-1]`. Used on Key features, How it works, FAQs. |
| Hero | Centred, `max-w-[886px]`, `gap-4`, bordered pill tag (`h-11 rounded-full border`), display headline **51px / weight 400 / tracking −0.015em / lh 1.15**, one primary CTA, visual full-width below. |
| H2 | Display face **41px / weight 400 / tracking −0.005em / lh 1.2**. Hero-scale H2 51px. |
| H3 (card) | 25.5px / 400. Spotlight H3 32–41px / 400. |
| Weights in use | Display 400 only; UI 400/500. **No bold/semibold headings anywhere.** |
| Logo strip | Centred heading (H3 32px/400), 6-col grid, hairline `border-l` separators via `before:` |
| Key features | Header H2 + `h-12` spacer; **stacked feature cards** (`rounded-lg`, `p-8`, alternating two near-white tints, `sm:grid-cols-2` text/visual), sticky; sticky jump list sits in the left gutter. |
| How it works | H2 + lede, `h-20` spacer, `md:grid-cols-4` steps, each `border-l` hairline + `pl-8`, 14px body. |
| FAQ | `border-t` list, rows `border-b`, button `py-6 pr-6` 18px, chevron right. |
| CTAs | One primary per section max; hero has a single "Get started". |

---

## 2. Findings

Severity: **P0** broken / misleading / a11y failure · **P1** visible inconsistency vs benchmark/rules · **P2** polish / hygiene.

### Page-level

| # | Section | Component | Issue | Sev | Benchmark pattern | Proposed fix | Shared? |
|---|---|---|---|---|---|---|---|
| G1 | All | page + sections | **Two typefaces on one page**: Sofia Pro on Hero + Problems (sandbox), AngelList on Features → Stories. The switch lands mid-page between Problems and Features. | P0 | One display face throughout | Resolve via **QUESTION Q1** (retire sandbox on Care, or extend to all sections). Mockups show both. | No |
| G2 | All | — | Heading weights in use: `bold` (H1), `semibold` (Problems H2s), `medium` (Features/Editions/Advantages H2), `normal` (Stories H2, Trust H3) = **4 weights**. | P1 | Display 400 only | Collapse to one H2 weight (`font-medium` per §2.2, or 400 per benchmark — Q1). | No |
| G3 | All | 4 components | **Four eyebrow treatments**: `AnimatedEyebrow` (Hero, Editions), `text-xs tracking-[0.08em] text-sognos-blue-accent` (Problems), `…text-sognos-muted` (Solution, Features rail), `…text-white/50` (Advantages). | P1 | One label treatment (left rail) | Single treatment: `AnimatedEyebrow` (§2.2 says use it). | AnimatedEyebrow not modified |
| G4 | All | — | **Alignment flips** centred → left-rail → centred → left-rail: Problem (centred), Solution (rail), Features (rail-ish, own flex rail), Editions (centred), Advantages (rail), Stories (left, no rail). | P1 | Centred hero + logo strip only; every content section on the 2/10 left rail | Put Problem, Editions and Stories headers on the rail. | Stories shared → page-local variant prop |
| G5 | All | — | No FAQ, no How-it-works steps, no pricing/plan card — benchmark's conversion scaffolding. | — | — | **SUGGESTION S1/S2** (needs new copy → not in this pass). | — |

### 1. Hero — `sognoscare/Hero.tsx`

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| H1 | **"Book a Demo" button has no handler** ("UNWIRED for now") — primary CTA does nothing. | P0 | Primary CTA live | Wire to `useBookDemo().openModal("sognoscare")` (pattern used on DigPacks hero). | No |
| H2 | **"Learn More" `href="#"`** — dead link that jumps to top. | P0 | — | Point at `#problems` (first section after the strip). Label unchanged. | No |
| H3 | H1 uses `leading-14` / `lg:leading-20` (56px / 80px on 48/60px type) — `lg` line-height 1.33 is loose for display. | P1 | lh 1.15 | `leading-[1.1]` → token `leading-tight` (1.25) or 1.1 via scale; drop arbitrary leading. | No |
| H4 | H1 `font-bold` vs benchmark 400. | P1 | 400 | Per Q1. | No |
| H5 | Parallax `y: 0→160` + fade to 0 at 70% — content translates 160px; benchmark hero is static. Layout-adjacent motion on the LCP block. | P2 | Static | Reduce to `0→60` (Roster/Genogram value) for parity. | No |
| H6 | Panel is logo-only placeholder (`aspect-[2.4/1]`), video pending. | P2 | Product visual | No change (asset). Aspect locked ✔. | No |

### 2. Trust strip — `ProductTrustStrip.tsx` (shared ×3)

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| T1 | Title is an `<h3>` directly after the page `<h1>` — **heading level skip**. | P1 | (their strip also uses H3 — but follows an H2 hero) | Render the title as `<p>` (it's a caption, not a section heading). Same change is correct for Roster + Genogram. | **Shared** — all 3 consumers benefit; no visual change |
| T2 | `mb-8` on title **plus** `mt-15` on the logo row = 92px between title and logos; arbitrary `mt-15`. | P2 | `gap-10 md:gap-16` | Single `mt-10 md:mt-12`. | **Shared** — identical change for 3 consumers (all use the same strip) |
| T3 | Container `max-w-5xl` while every other section is `max-w-7xl`. | P2 | Grid constrained `max-w-252` inside full container | Keep `max-w-5xl` for the logo row (benchmark also narrows it) — no change. | — |

### 3. Problems — `sognoscare/Problems.tsx`

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| P1 | Dark half: problem block then sub-nav at `mt-24 md:mt-32` (96/128px) — orphaned gap before the pill nav. | P1 | Consistent 64–80px internal gaps | `mt-16 md:mt-20`. | No |
| P2 | One `<section>` carries **two H2s** in different alignments (centred problem → left-rail solution). | P1 | One idea per section | Keep both (copy) but put the problem statement on the rail too (option B) or keep centred as a "statement band" (option A). See mockup 03 A/B. | No |
| P3 | Capability cards are `bg-white` on a `bg-white` section with `gap-1` — the "cards" are invisible; at `lg:grid-cols-5` inside `col-span-10` each column is ~170px, titles wrap to 3 lines. | P1 | How-it-works: `grid-cols-4`, `border-l` hairline, `pl-8`, no card | Type-first columns: `border-l border-sognos-line pl-6`, `md:grid-cols-3 lg:grid-cols-5` with `gap-3 lg:gap-4`; drop the invisible card. | No |
| P4 | Numbers in `font-mono` — the only monospace on the page. | P2 | Numerals in body face | `font-heading tabular-nums`. | No |
| P5 | Accent bar **replays on every entry** (comment notes it's deliberately not `once`) — only non-latching reveal on the site. | P2 | One-shot entrances | `once: true`. | No |
| P6 | Problem label colour `text-sognos-blue-accent` on dark vs `text-white/80` eyebrow ladder (§2.3). | P2 | Muted label | `AnimatedEyebrow` with `text-white/80` (G3). | No |

### 4. Sub-nav — `ProductSubNav.tsx` (shared ×4)

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| N1 | Section is fine visually. "Schedule a Call" is a second contact CTA alongside "Book a Demo". | P2 | Single primary CTA | **QUESTION Q4** (copy decision). No change. | Shared |

### 5. Features — `sognoscare/Features.tsx` → `ProductFeaturesScroll.tsx` (shared ×5)

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| F1 | **`tagline` and `capabilities` are passed in but never rendered** — Sanity content (4 capability bullets per feature) silently dropped; `header.eyebrow` ignored, rail label hard-coded "Features". | P1 | Feature card: title, body, detail list | Render `tagline` above title and `capabilities` as a hairline list under the body — **content already exists, no new copy**. Gate behind a `showDetails` prop so Roster/Genogram/DigPacks/editions are unchanged until opted in. | **Shared** → opt-in prop, other consumers unchanged |
| F2 | Card surfaces `bg-gray-100` / `bg-gray-50` — phased out (§2.8). | P1 | Two near-white tints alternating | `bg-sognos-tint` / `bg-white border border-sognos-line`. | **Shared** — visual change on 5 consumers (all approved surfaces) → **QUESTION Q2** |
| F3 | Rail buttons use `aria-selected` on plain `<button>` — invalid ARIA (only valid on tab/option/row). | P1 | — | `aria-current="true"` on the active item. | Shared — a11y fix, no visual change |
| F4 | Inactive rail `text-gray-400`, body `text-gray-600`, H2 `text-sognos-body` (not heading), `tracking-[-0.03em]` arbitrary. | P2 | — | `text-sognos-muted` / `text-sognos-body` / `text-sognos-heading` / `tracking-tight`. | Shared — token swap, near-identical render |
| F5 | Rail sits in its own flex (`w-44`) rather than the 2/10 grid the other rail sections use — rail and Solution/Advantages labels don't line up vertically. | P1 | Rail in `lg:col-span-2` gutter | Move to `lg:grid-cols-12` with rail `lg:col-span-2`. | Shared — layout change → Q2 |
| F6 | Placeholder visuals (`/product/feature-0X.webp`) are generic stock. | P2 | Product UI | Asset, out of scope. | — |

### 6. Editions — `sognoscare/Editions.tsx` + `EditionCards.tsx` (shared ×2)

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| E1 | **Every card renders its description and its `<h3>` twice** (hover layer + resting layer, neither `aria-hidden`) — screen readers announce each edition twice; 12 H3s for 6 editions. | P0 | — | `aria-hidden="true"` on the hover overlay (it's presentational) and drop the invisible duplicate `<p>`. | Shared — a11y fix, no visual change; edition pages benefit |
| E2 | Description hidden at rest and only revealed on hover — **invisible on touch** (comment flags it). | P1 | Body always readable | Show description at rest below `lg`; keep hover reveal on pointer devices (`lg:` + `@media (hover:hover)`). | Shared |
| E3 | Card surface `bg-gray-200/60` on a `bg-sognos-tint` section — phased-out grey, muddy against tint. | P1 | Card on near-white | `bg-white` card on tint (§2.1). | Shared |
| E4 | Header centred while neighbours are on the rail (G4). H2 colour `text-sognos-navy` vs `text-sognos-heading` elsewhere. | P1 | Rail | Rail header; `text-sognos-heading`. | No |
| E5 | Slider arrow hover `hover:bg-gray-200/70` (phased out). | P2 | — | `hover:bg-sognos-tint`. | Shared |
| E6 | Card `lg:aspect-[3/4]` + `w-[82vw]` mobile — tall cards, 1.2 cards visible on mobile. | P2 | — | Keep (slider is a deliberate pattern). | — |

### 7. Advantages — `sognoscare/Advantages.tsx`

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| A1 | Intro paragraph `text-white` — body on dark should be `/75` (alpha ladder §2.3). | P2 | Secondary text muted | `text-white/75`. | No |
| A2 | Rows striped `bg-white/5` without dividers; Roster's equivalent uses `divide-y divide-white/10` + `rounded` — siblings diverge. | P1 | Hairline lists | `divide-y divide-white/20 border-y border-white/20`, drop stripes (type-first list, like FAQ rows). | No |
| A3 | `max-w-[600px]` arbitrary. | P2 | — | `max-w-2xl`. | No |
| A4 | Rail label falls back to "Advantages" while Sanity heading is "Key Advantages" — label and H2 say the same thing. | — | — | **SUGGESTION S4** (copy). | — |

### 8. Stories — `sognoscare/Stories.tsx` → `ProductCustomerStories.tsx` (shared ×9)

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| S1 | Section padding `pt-16 lg:pt-24` / `pb-16 lg:pb-24` — the only section off `py-20 md:py-28`. | P1 | 80px rhythm | Page-local `className` override via a `variant`/`padding` prop; shared default untouched. | Shared → prop |
| S2 | "Read full story" button `rounded-sm` — phased out (§2.8, buttons are `rounded-full`). | P1 | — | `rounded-full`. | **Shared (9)** — rule fix, applies everywhere |
| S3 | H2 `font-normal` vs `font-medium` H2s elsewhere on the page (G2). | P1 | — | Resolve with Q1/G2. | Shared |
| S4 | No left-rail label (G4). | P1 | Rail | Optional rail via prop (`rail="Customer Stories"`). | Shared → prop |

### Motion
- Entrances: `ScrollReveal` wrappers on Trust, Editions, Advantages, Stories; none on Problems/Features (they animate internally). Durations 0.5–0.9s, easing `[0.22,1,0.36,1]` consistent ✔. Reduced motion respected in Hero, Problems, Advantages ✔. Exceptions: P5 (replaying bar), H5 (160px parallax).

### Responsive (DOM/class review — no screenshots)
- No fixed widths wider than the viewport; Edition slider `w-[82vw]` scrolls inside its own track ✔.
- Tap targets: slider arrows `h-10 w-10` (40px) — below 44px. **P2** → `size-11`. Sub-nav pills `py-2.5` + text ≈ 44px ✔.
- Problems capabilities at 375px: `grid-cols-2` with 5 items leaves an orphan; type-first columns (P3) stack 1-col on mobile.

### Accessibility summary
- Single `<h1>` ✔. Heading order: H1 → H3 (T1 ✖) → H2…
- E1 duplicate headings/descriptions ✖ (P0).
- F3 invalid `aria-selected` ✖.
- Hero CTA non-functional ✖ (H1).
- Contrast: `text-gray-400` rail labels on white ≈ 2.5:1 (flag; F4 swaps to `text-sognos-muted` ≈ 4.9:1 — token swap, not a palette change).

### Code hygiene
Arbitrary values: `leading-14/20`, `tracking-[0.08em]` ×4, `tracking-[-0.03em]`, `max-w-[720px]`, `max-w-[600px]`, `mt-15`, `top-[100px]` ×3 (matches the fixed 80px bar + 20 — keep), `w-[82vw]` (keep). `logoSrc` prop on Hero is accepted and unused (documented). Orphans `Proof.tsx`, `Integration.tsx` (already listed in PROJECT_STATE §4.5).

---

## 3. SUGGESTION / QUESTION (batched)

**QUESTION Q1 — Typeface on SognosCare.** The page currently switches from Sofia Pro to AngelList between Problems and Features (G1).
- **A (recommended):** retire the sandbox on Care — AngelList throughout, H1 `font-normal`, H2 `font-medium` per §2.2 (benchmark-aligned, matches every other page). Closes PROJECT_STATE §7 decision as "retire".
- B: extend Sofia Pro + weight ladder to all Care sections (Features → Stories), keeping the experiment coherent.
- C: leave as is (not recommended — the switch is visible).
Mockups default to **A**; `01-hero-b.html` shows B for comparison.

**QUESTION Q2 — Shared component changes.** F2 / F5 / E3 change the look of shared components (feature cards on 5 pages, edition cards on 7 pages).
- **A (recommended):** apply globally — they are design-rule fixes (phased-out greys), and the other consumers are also pre-Pass.
- B: page-local variant props now, roll out later.

**QUESTION Q3 — Problems section structure** (P2). Mockups `03-problems-a.html` (centred statement band, then rail solution — current shape, tightened) and `03-problems-b.html` (both on the rail). **Recommend A** — the centred dark band is the page's one deliberate tension moment.

**QUESTION Q4 — "Schedule a Call" in the sub-nav** duplicates the contact intent next to "Book a Demo". Keep / relabel to "Book a Demo" (opens modal) / remove. Recommend relabel (copy change → needs approval).

**SUGGESTION S1 — FAQ section** before Stories (benchmark has one; funding/compliance questions are the main objection). Trade-off: needs new copy + a Sanity field.
**SUGGESTION S2 — "How it works" 4-step strip** (Intake → Plan → Deliver → Report) using the benchmark's hairline-column pattern. Trade-off: new copy.
**SUGGESTION S3 — Render the Sanity `capabilities` lists** (F1) — 24 bullets of approved content currently invisible; biggest density win with zero new copy.
**SUGGESTION S4 — Advantages label/heading duplication** ("Advantages" / "Key Advantages"): set the Sanity heading to the default "Why care providers choose SognosCare". Copy → approval.
**SUGGESTION S5 — Delete orphans** `sognoscare/Proof.tsx` (unsourced 99%/75% stats) and `Integration.tsx`.

---

## 4. Fix log (STEP 3 — 2026-10-24)

Approved: mockups as iterated (H2 36px, descriptions 16px, Editions without rail, Routable sub-nav bar, 4 solution steps) with Q1-A (AngelList, sandbox retired on Care), Q2-A (shared fixes applied), Q3-A (centred problem band). **Features + Customer Stories excluded.**

| Item | Status | Note |
|---|---|---|
| G1 typeface split | **Fixed** | Typekit link removed; Hero + Problems on AngelList. |
| G2 heading weights | **Fixed** (except Features) | All H2s 400 via `TYPE.h2`; Features H2 still 500 (excluded). |
| G3 label treatments | **Fixed** (except Features/Stories) | New `components/ui/SectionLabel.tsx` (18px accent, square marker). |
| G4 alignment | **Fixed** | Problem centred band (Q3-A); Solution + Advantages on the rail; Editions full-width by request. |
| H1 Book a Demo unwired | **Fixed** | `openModal("sognoscare")`. |
| H2 Learn More `#` | **Fixed** | → `#problems`. |
| H3/H4 hero type | **Fixed** | `TYPE.h1` (400, lh 1.05). |
| H5 parallax 160px | **Fixed** | 60px (Roster/Genogram parity). |
| T1 trust title H3 | **Fixed** | `<p>` caption (shared — Roster/Genogram also benefit). |
| T2 double gap | **Fixed** | `mt-10 md:mt-12`. |
| P1 sub-nav gap | **Fixed** | Sub-nav moved out of the band entirely (bar under navbar). |
| P2 two H2s | Kept | Q3-A centred band + rail solution. |
| P3 invisible cards | **Fixed** | Hairline numbered columns, 4 steps (5th removed by request). |
| P4 mono numerals | **Fixed** | `TYPE.numeral`. |
| P5 replaying bar | **Fixed** | Bars removed; one-shot column reveal. |
| P6 label colour | **Fixed** | `SectionLabel`. |
| N1 "Schedule a Call" | Deferred | Copy decision (Q4). |
| Sub-nav (new) | **Fixed** | `ProductSubNav variant="bar"` portals into a new Navbar slot (`#navbar-subnav`); pill stays default for Roster/Genogram/DigPacks. |
| F1–F6 Features | **Deferred** | Excluded by request. |
| E1 duplicate titles/descriptions | **Fixed** | Hover layer removed; one title + one description. |
| E2 hidden on touch | **Fixed** | Visible below lg, hover reveal from lg. |
| E3 grey card | **Fixed** | `bg-white` + 4px edition-colour rule. |
| E4 header | **Fixed** | Full-width header (no rail, by request), `text-sognos-heading`. |
| E5 arrow hover / 40px tap target | **Fixed** | `size-11`, `hover:bg-white`. |
| A1–A3 Advantages | **Fixed** | Hairline 2-col rows, `text-white/75` intro, `max-w-[770px]` head. |
| S1–S4 Stories | **Deferred** | Excluded by request. |

**Divergences from the mockups**
- Sub-nav bar follows the real header's dark theme (transparent → `bg-sognos-navy-dark` on scroll), not the mockup's white scrolled state — on dark-hero pages the header itself never turns white.
- Edition cards keep the 28% width (4th card peeks) instead of exact thirds — slider affordance.
- The edition-card sibling-dim on hover (`group/cards`) is gone with the old overlay.

**Resolved — Features under the section bar (2026-10-24)**
- `ProductFeaturesScroll` gains `stickyOffset="default" | "sectionBar"`. SognosCare passes `sectionBar`: rail `top-36` (144px), jump + scroll-spy offset 146px, section `scroll-mt-32`. Other consumers keep `top-[100px]` / 96px.
