# Brand Materials Audit — eBook + Brochure

> **What this is.** Findings from a full read of the two current Sognos
> print/PDF collateral pieces: the 16-page AI-in-Healthcare eBook (May
> 2024) and the 8-page Field Service brochure (Aug 2024). The purpose is
> to document what visual and verbal language the brand is *already*
> using in print, so decisions on the redesign site can either extend
> that language or deliberately diverge from it — with the divergence
> known and logged.
>
> **Status:** reference / audit-only. No code changes proposed here — the
> application ideas at the bottom are candidate directions, not commits.
>
> **Date:** 2026-08-07
> **Files reviewed:**
> - `Sognos_eBook_AI-in-Healthcare_singles1.pdf` (16pp, landscape 612×432pt)
> - `Sognos_Brochure_singles.pdf` (8pp, A4 portrait 595×842pt)

---

## Executive summary

The print collateral is meaningfully more finished than most agency-tier
B2B SaaS material. Three findings that matter for the redesign:

1. **The brand already has a legible sector-coding system** — five
   industries, each rendered on its own pastel tint with a matching line
   icon. This is the strongest single takeaway. The current live
   `IndustrySection` component names the same five sectors but treats
   them structurally identical. The pastels + icons exist already; the
   site is under-using them.

2. **The palette is warmer than the live site.** Print leans on cream
   (`#e0e0c0`-family), coral (`#c08040`-family) and pastel tints as
   secondary surfaces. The redesign has adopted `bg-sognos-tint`
   (`#f0eff2`) as the light surface — close, but cooler and greyer than
   the print cream. Worth a decision: match print, or stay cooler.

3. **Tagline mismatch.** Print tagline is **"First in Field Service"** —
   consistently locked under the Sognos wordmark on every cover and
   footer. The redesign site does not use this tagline anywhere. Either
   a deliberate retirement or an oversight.

The typography is a full swap-out (`SofiaPro` in print vs. `AngelList` on
the site) and is not worth trying to reconcile — AngelList is the newer,
more distinctive choice.

---

## eBook — "Revolutionising Healthcare"

**16 pages · landscape 612×432pt (8.5″×6″ singles) · SofiaPro throughout · authored by Tracy Weller-McCormack**

### Content structure

Long-form article, structured as a magazine feature. Chapters:

1. Introduction
2. Clinical Decisions (accuracy · faster diagnosis · treatment planning)
3. Clinical Documentation (automated data entry · reduced errors · streamlined records)
4. Patient Engagement (personalised care · remote monitoring · education)
5. Logistics and Resources (inventory · resource allocation · predictive maintenance)
6. Reduced Administrative Burden (scheduling · billing · data management)
7. Increased Efficiency and Productivity (six sub-topics as a bulleted list)
8. Utilising AI in Field Service Management (FSM) — the payoff chapter
9. About Sognos + references

### Verbal tone

Corporate-professional, third-person, high-density paragraphs. Six or
seven paragraphs per topic, no bullet lists until Chapter 7. Reads like
a thought-leadership white paper rather than a product brochure. Voice
is Australian-English (`optimise`, `analyse`, `personalised`).

Sample cadence:

> *"AI-powered decision support systems can help healthcare professionals
> stay up to date with the latest research and best practices. These
> systems can analyse scientific literature, clinical trials, and
> treatment guidelines to provide evidence-based recommendations."*

**Signature phrase:** *"The future of healthcare is AI-powered, and the
possibilities are endless."* — repeated on p13 (chapter opener) and p14
(chapter close). It's the eBook's tagline moment.

### Typography

Single family: **SofiaPro** (Bold, Regular, Light, SemiBold, Medium).
Geometric humanist sans. Not on the redesign — the site uses AngelList.

### Palette (extracted from rendered pages)

Dominant across all 16 pages:

| Colour | Hex | Role |
|---|---|---|
| Deep navy | `#002040` | Primary brand anchor · cover panels, chapter dividers, footer |
| Navy blue | `#000040` | Deeper accent used for the "AI at the centre" spread (p13) |
| Blue-grey mid | `#406080` / `#606080` / `#8080a0` | Photography tint, secondary panels |
| Cream / eggshell | `#e0e0c0` | Warm off-white — used as light section surface |
| Coral / burnt sienna | `#c08040` / `#a06020` / `#e0a060` | Warm accent (headings, small graphic elements) |
| Sky blue | `#60a0e0` / `#80c0e0` / `#4080c0` | Tech-forward accent — appears on p12 (the AI-imagery spread) |

**Observation:** the eBook does NOT use the pastel edition palette
(`caa4ff` lavender · `ffad6e` amber · `ff8e90` coral · etc.) that the
brochure uses. eBook is navy + cream + coral. Brochure is navy + pastel
sector tints. Different visual worlds within the same brand.

### Cover treatment (p1)

- **Full-bleed portrait photograph** (professional healthcare worker, warm smile, stethoscope)
- Left panel (~40% width): navy `#002040` block
- Title in white SofiaPro Bold, subhead in SofiaPro Light
- Sognos wordmark bottom-right on the photo half (white, `First in Field Service` sub-lock)

### Signature spread (p12)

Full-bleed tech-imagery photograph (doctor + AI circuit overlay). No
type. The **quiet page** in the middle of the article. This kind of
"one clean visual, no words" moment is a stronger editorial move than
the redesign currently uses anywhere.

### What the site can extend from the eBook

- The **long-form article treatment** — the Knowledge Hub post template
  should aspire to this level of typographic craft.
- The **coral-on-cream accent** — currently absent from the site.
  Would give warmth to a section that today reads all cool-blue.
- The **"quiet page" concept** — one full-bleed image, no text, mid-scroll.
  Could work on `/company/about` or product pages as a breather.
- The **repeated tagline phrase** — the eBook uses one sentence twice as
  a rhythm device. Copywriting move worth stealing for hero sections.

### What does NOT translate

- **SofiaPro typography** — retired. AngelList is the current face.
- **The white-paper voice** — the site copy is tighter, more product-led.
- **The specific claim set** ("AI-powered decision support systems...")
  is 2024 content and reads dated in places — needs a refresh before
  being repurposed as web copy.

---

## Brochure — "Empowering People, Customers and Processes"

**8 pages · A4 portrait 595×842pt · SofiaPro throughout · image-based (no extractable text, all set as outlines)**

### Cover (p1)

- Sognos wordmark top-right on a navy panel, **"First in Field Service"** lock beneath
- Full-bleed portrait photograph — solar-panel field worker in hi-vis, warm outdoor light
- Bottom-third overlay: navy panel with title in white
  - **Title:** "Empowering People, Customers and Processes"
  - **Sub:** "Dynamics 365 for Field Service Management"
- Microsoft Partner badge bottom-right

### Sector-coding spread (p3 and p5) — **the strongest single asset in the collateral**

Five industries rendered as vertically stacked blocks. Each block:

- A dedicated **pastel tint** as the block background
- A dedicated **line icon** (roughly 40×40px in the brochure geometry)
- Sector name in SofiaPro Bold, dark navy
- 2–3 line supporting copy in SofiaPro Regular

The five sectors + their tint families:

| # | Sector | Tint (approx) | Icon subject |
|---|---|---|---|
| 1 | Health & Social Care | Rose / pink `#f7edf3`-family | Heart with medical cross |
| 2 | Facilities Management | Mint / eggshell green `#ebfbe3`-family | Building silhouette |
| 3 | Industrial Services | Ice / cool blue `#f4f8f9`-family | Hard-hat |
| 4 | Government Sectors | Cream / warm white `#f5f6ee`-family | Columned building |
| 5 | Energy & Utilities | Green tint (slightly darker) | Lightbulb / bolt |

**This is exactly the palette family already logged in `app/tokens.css`
comments** as the "AI-in-Healthcare eBook + brochure" family. The
tokens exist. Nothing on the redesign site currently uses them for the
sector treatment — despite the sectors being live on `/industries/*`
and shown in `IndustrySection` on the homepage.

### Photography

Real people, warm outdoor / on-site light, hi-vis + hard-hat + healthcare
uniforms. Not stock-desk-with-laptop, not office-abstract. **Field
service is depicted as literally in-the-field.** This is a deliberate
brand posture worth preserving on the site — currently the homepage
`Hero` and product pages use more abstract/product-mockup imagery.

### Trust markers

- **Sognos wordmark + "First in Field Service" sub-lock** — every cover and footer
- **Microsoft Partner badge** — bottom-right of every page it appears on
- Contact block (p7): AU + NZ addresses, `www.sognos.com.au` / `www.sognos.co.nz`, LinkedIn CTA

### Structural composition

- **Full-bleed photography** dominates the covers (p1 front, p7 CTA)
- **Cream/pastel section blocks** for content pages (p3, p5)
- **Navy accent panels** for CTAs and footers
- **Two-tone consistent** — always navy + one pastel tint per block

### What the site should extend from the brochure

1. **Sector-coloured `IndustrySection` treatment.** The active tab or
   sector card gets its sector tint as a subtle background hint. Icons
   already sit in the brochure — could be traced as SVGs and dropped
   into the token library. **Biggest ROI in this audit.**
2. **"First in Field Service" as a lockup.** Consider adding to the
   footer or Navbar as a wordmark sub-line. It's a strong three-word
   positioning line and it's already on every piece of physical
   collateral.
3. **Photography direction spec.** Whoever briefs future photography
   should be handed the brochure — the visual world is set. Real
   workers, real sites, warm outdoor light. Not office/laptop clichés.
4. **CTA panel treatment** (p7). Full-bleed photo + navy footer overlay
   with contact + LinkedIn is a strong pattern — the site's current
   `CTABand` could be re-cut to match.

---

## Cross-material findings — what's consistent

| Element | Print | Redesign site | Verdict |
|---|---|---|---|
| Wordmark | Sognos + "First in Field Service" sub-lock | Sognos wordmark only, no sub-line | **Mismatch — worth resolving** |
| Primary dark | `#002040` navy | `bg-sognos-navy-darkest` `#060e28` / `bg-sognos-navy` `#152248` | Close but the print navy is warmer and slightly lighter |
| Primary light surface | Cream `#e0e0c0` | `bg-sognos-tint` `#f0eff2` (cooler grey-pink) | Different — decision needed |
| Typeface | SofiaPro | AngelList | Deliberate swap — no reconciliation needed |
| Accent for tech/AI | Sky blue `#60a0e0`-family | `sognos-blue-accent` `#1d96fc` | Close — both bright cyan-leaning blues |
| Warm accent | Coral / burnt sienna | Absent | **Missing from redesign — could add warmth** |
| Sector tints | Pink · mint · ice · cream · green | Present as tokens (`--sognos-tint`, edition colors), unused for sectors | **Under-applied on redesign** |
| Trust anchor | Microsoft Partner badge on every page | Present on trust strip and product pages | Consistent |
| Photography style | Real workers, on-site, warm light | Mixed — hero abstract, team page real | **Inconsistent — brochure sets the standard** |

---

## Application ideas — how to leverage these findings on the redesign

Ranked by impact + effort. All ideas below are candidate directions,
not commits.

### 1 · Sector-coloured `IndustrySection` treatment · high impact · low effort

The five sectors already exist in `INDUSTRIES` constant. Each already
has a `slug`. Map each slug to its brochure tint. On the active tab:

- Left column tab row gets a subtle left-border in the sector's tint
- Right column image caption gets a small pastel chip: `sector: HEALTH & SOCIAL CARE`
- Alternate: the whole `bg-white` inner panel picks up a `bg-sector-tint`
  wash — depending on how strong the client wants the differentiation

Extends the brochure's own language into the interactive live tab
component. Two-line data addition, one Tailwind variant per sector.

### 2 · Add coral / burnt-sienna as a secondary accent · medium impact · low effort

The site is currently all-cool. Adding `--sognos-warm-coral: #c08040`
(or similar warmth from the eBook) as a **secondary accent** — used
sparingly on section eyebrows, callout pills, or article dividers —
would visually reconnect the site to the print's warmth without
retooling the primary palette.

Where it could land first: `AboutStats` labels, `CTABand` accent tick,
or the "01/02/03" numeral marker family (currently blue accent).

### 3 · Resurrect "First in Field Service" · high impact · low effort

Add as a sub-line under the Sognos wordmark in `Footer`. Small change,
big brand consistency with printed collateral. Then decide separately
whether it makes sense in the `Navbar` too.

### 4 · Retone `bg-sognos-tint` to match brochure cream · medium impact · medium effort

Currently `#f0eff2` — cool grey-pink. Print cream is `#e0e0c0` — warmer
green-cream. Would need to test across every existing tint surface on
the redesign (About Team, Careers band, Solutions section, etc.). Not
a small change but the payoff is real visual continuity.

Alternative: keep current tint for UI surfaces, introduce a `--sognos-cream`
token for editorial contexts (article pull-quotes, testimonial cards,
long-form Knowledge Hub posts).

### 5 · Photography direction as a written brief · medium impact · low effort

Take the brochure covers (p1 solar-panel worker, p7 hi-vis team portrait)
+ one eBook cover (healthcare pro portrait) and make them the reference
sheet for any future commissioned photography. Add to `docs/` as
`PHOTOGRAPHY_DIRECTION.md`. Prevents drift toward stock-office cliché
imagery next time content needs photos.

### 6 · Import the brochure sector icons · high impact · medium effort

The five brochure sector icons (heart+cross, building, hard-hat, columns,
lightbulb) are the exact icons the site should use for its industries.
Trace as SVG (or ask the original designer for source), drop into
`public/icons/industries/`. Would replace whatever placeholder or
lucide-react icons the industry pages currently reach for.

### 7 · Reuse eBook long-form for Knowledge Hub · low impact · low effort

The eBook is already published as a PDF. Consider splitting its
chapters into 3–4 Knowledge Hub posts. Content refresh needed (2024
claims read dated), but the structure and voice give a Knowledge Hub
category (`Insights`) real depth beyond what's currently there.

---

## Open decisions to raise with Kunal / Rick

1. **"First in Field Service" tagline** — kept, retired, or evolving?
   The site currently has no tagline lock beyond the Sognos wordmark.
2. **Print vs. web palette** — should the redesign warm up to match
   the brochure's cream + coral, or is the cooler `sognos-tint`
   deliberate for the digital experience?
3. **SofiaPro** — is there any surviving material still using it, or
   has AngelList fully replaced the brand face? (Affects whether the
   PDFs should be re-typeset on next revision.)
4. **Sector iconography** — do you have the source SVGs for the five
   brochure icons, or should we trace / redraw them?
5. **eBook refresh** — the 2024 claims about AI in healthcare are
   already reading dated. Refresh the eBook, or spin its chapters out
   as new Knowledge Hub posts and retire the PDF?
