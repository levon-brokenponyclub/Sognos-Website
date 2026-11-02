# Project State — Sognos Marketing Site

> **Single source of truth (2026-08-07).** State + design rules + per-page
> application status + open work. Absorbs the retired
> `CLAUDE_DESIGN_SYSTEM.md`, `COMPONENT_INVENTORY.md`, and the four audit docs
> (About / Brand Materials / Product Data / Content) — all now in
> `docs/archive/`. `docs/CHANGELOG.md` remains the append-only history.
> `docs/ROLLOUT_PROCESS.md` remains the per-page workflow.
>
> **Interim design system:** a print-aligned experiment (Sofia Pro + weight
> ladder + alpha ladder) is validated on **SognosCare only**. All other pages
> run the original live design system. See §7.

---

## 1. Design reference

- **Current, and only: Routable** — <https://www.routable.com>.
- **What we take from it:** layout, sizing, spacing, section composition,
  card anatomy (title → dashed rule → copy → `Read more →`), light inset
  panels, drawer/slider mechanics. **Structure and mechanic only.**
- **Sognos copy and assets always ship.** The reference's branding never does.
- **Earlier references retired.** History lives in `docs/archive/` and
  `docs/CHANGELOG.md`; no live work should reintroduce them.

---

## 2. Design rules (authoritative)

The one rules table. If any other doc drifts, this doc wins.

### 2.1 Layout, surface, radius, shadow

| Concern | Rule |
|---|---|
| Container | `max-w-7xl` = **1280px** via `--sognos-container-width`, `px-6`. |
| Section rhythm | `py-20 md:py-28`. Heroes may add `pt-32`/`pt-40` for fixed-navbar clearance — standing exception. |
| Grid/flex gap — card grid | `gap-3 lg:gap-4` standard. |
| Grid/flex gap — hero/intro two-column | `gap-12 lg:gap-10`. |
| Radius — surfaces | **`rounded`** (4px) is the base for all surfaces, cards, images, pills. `rounded-md` (6px) / `rounded-lg` (8px) only when a treatment demands it — ask and confirm first. Hero-scale surfaces may take `rounded-lg`. Never `xl` / `2xl` / `3xl` / `rounded-[Xrem]`. |
| Radius — buttons | `rounded-full` only. |
| Shadows | **None, ever.** Separate with borders and tonal steps. |
| Light section surfaces | **`bg-white` OR `bg-sognos-tint`** — both valid, different tones. `bg-sognos-tint` is the tonal separator when you want a soft warmth against white. **Phased out:** `bg-gray-50` and `bg-gray-200/70` — replace with `bg-white` or `bg-sognos-tint` on edited sections. |
| Dark surface default | `bg-sognos-navy`. Use `-dark` / `-darkest` only when specified. Products may use their own dark token (`bg-sognos-care-dark` etc.) — expected under per-product theming. |
| Gradients | Hero and deliberate highlight surfaces only. **Never** on standard cards or subcards. |
| Section rhythm — alternation | Alternate light / dark. Never two consecutive same-surface sections. |
| Third-party logos on tinted surfaces | Sit on bordered white plates. Prevents baked-in-background logos reading as coloured rectangles. Precedent: About Accreditations sub-band. |
| Sliders | Native scroll-snap for drag+arrows shapes. Embla only where already used (`ProductCustomerStories`). |

### 2.2 Typography

| Element | Classes |
|---|---|
| Hero H1 | `font-heading font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight`. About Hero overrides to `text-5xl lg:text-6xl` — deliberate. |
| Section H2 (standard) | `font-heading text-3xl font-medium tracking-tight md:text-4xl`. |
| Statement H2 (`HeadlineCTA`, `SolutionsSection`, `IndustrySection`) | `font-heading text-3xl font-medium tracking-tight md:text-5xl`. |
| Sub-section H3 | `font-heading text-xl md:text-2xl font-medium tracking-tight text-sognos-heading`. One step below section H2. Use inside sections for sub-bands (Accreditations under Partners, etc.). |
| Row / Feature H3 | `font-heading text-2xl md:text-3xl font-medium leading-tight tracking-tight text-sognos-heading`. One step above sub-section H3. Use inside repeating `FeatureRow` / feature-row shapes where each row headline is a display moment (e.g. `SolutionsSection` rows, product feature rows). |
| Body | `text-base md:text-lg leading-relaxed text-sognos-body`. |
| Body measure | `max-w-2xl` body, `max-w-3xl` hero sub, `max-w-[46rem]` article prose (`ARTICLE_PROSE_MAX_W`). |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` + 9px square dot. Use `AnimatedEyebrow` — its default is `font-semibold`. Eyebrows sit above headings; don't use them as an orphaned title. |
| Typeface | Local **AngelList variable font** on body and headings (`--font-sans`, `--font-heading`). |

### 2.3 Dark-surface text alpha ladder

On any `bg-sognos-navy*` surface:

| Role | Class |
|---|---|
| Primary body / heading | `text-white` |
| Secondary body | `text-white/75` |
| Muted / meta | `text-white/50` |
| Eyebrow accent | `text-white/80` |
| Dividers | `border-white/20` |

**Do not use** `text-white/65` — sits between two ladder steps. On `font-light`
body over dark navy, bump secondary to `text-white/85` for readability
(sandbox — SognosCare only, see §7).

### 2.4 Stat blocks

Match `CTASection.tsx` exactly:

- Grid: `grid-cols-2 gap-3 lg:gap-4`
- Cell: `relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden {bg}`
- Number: `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none`
- Label: `text-xs font-semibold uppercase tracking-widest`

### 2.5 Signature editorial patterns (introduced 2026-08-06)

Reserve for deliberate signature moments — About page + editorial spreads.

- **Numbered enumerable-list marker** — `font-heading font-light tabular-nums`
  at low alpha (`text-white/25` on dark, `text-sognos-heading/10` on light).
  Structural weight, not shouting. Used on About Beliefs (01/02/03), Story
  Timeline years.
- **Type-first columns (no boxes)** — hairline `border-l border-white/20`
  between columns + uniform padding. Kills the "3 boxes in a row" default
  when content is an enumerable list.
- **Signature pull-quote** — display-face line hung off a 3px vertical
  `sognos-blue-accent` bar. Reads as marked-up quote without quote marks.
  Used on About Leadership Editorial.
- **Notched-rule motif** — 72×8 SVG notch riding on a hairline rule. Used on
  About Stats + Story Timeline. Same geometry both places.
- **Beacon pulse** — `motion.span` scales+fades in a loop (2.6s cycle,
  `opacity: [0.55, 0, 0.55]`, `scale: [1, 2.6/3.2, 1]`). Sonar-ping read.
  Used on Story Timeline "current" milestone.

### 2.6 Product / edition / sector tokens

**Product colours (live in `app/tokens.css`, 2026-11-02 — from the Products Inspector ladders in `docs/mockups/products`):**
each product has `deep → dark → base → accent` (colour) plus `soft → tint` (light fills) and `ink` (text on light), as `--sognos-<product>-<step>` / `bg-sognos-<product>-<step>`. `--sognos-<product>-gradient` keeps its live stops (the mockup's 135° deep → base gradients are pending sign-off).

| Product | deep | dark | base | accent | soft | tint | ink |
|---|---|---|---|---|---|---|---|
| SognosCare | `#0b1430` | `#0f1936` | `#3b6fe0` | `#8ea8f0` | `#eef3fd` | `#dfe7fb` | `#2a55c4` |
| SognosRoster | `#03112f` | `#104b90` | `#1d96fc` | `#59bbf7` | `#eef8fe` | `#d9effd` | `#0b6fc4` |
| SognosGenogram | `#1a0224` | `#3a0f45` | `#91278c` | `#d9a6d6` | `#f8eef8` | `#efdcee` | `#7a1f75` |
| DigPacks (partner) | `#2a0a22` | `#5d1e4c` | `#b8166e` | `#e8a6c8` | `#fbeef5` | `#f3d3e4` | `#9a1259` |

DigPacks base doubles as text/CTA colour, so it stays dark enough for white text and for text on white. `--sognos-line-strong #b7becc` is the stronger hairline (story-stage tabs and controls).

**Editions — SognosCare (live in `app/tokens.css`):** six sector-identity
pairs — Aged Care, Allied Health, Support at Home, Hospital in the Home,
Child & Family Services, Disability & Mental Health.

**Sector tint tokens — documented in `tokens.css` comments, under-applied on
the live site.** IndustrySection currently treats all five identically.
Five sectors + tints:

| Sector | Tint (hex) | Token status |
|---|---|---|
| Health & Social Care | `#f7edf3` (rose) | Comment only |
| Facilities Management | `#ebfbe3` (mint) | Comment only |
| Industrial Services | `#f4f8f9` (ice) | Comment only |
| Local Government | `#f5f6ee` (cream) | Comment only |
| Energy & Utilities | `#dfeacd` (sage) | **Needs token added** |

Rollout is an open decision (§6). Do not apply site-wide without approval.

### 2.7 Primary CTA + components

- **Primary CTA label: "Book a Demo."** Everywhere.
- **Server Components by default.** `"use client"` only where interaction /
  motion needs it.

### 2.8 Phased out — do not reintroduce

- **Shadows anywhere.** Separate with borders and tonal steps.
- **`rounded-xl` / `rounded-2xl` / `rounded-3xl` / arbitrary `rounded-[Xrem]`.**
- **`rounded-sm` on buttons** — buttons are `rounded-full`.
- **`text-white/65`** — off-ladder, use `/75` or `/50`.
- **`bg-gray-50` / `bg-gray-200/70`** on new or edited sections — use
  `bg-white` or `bg-sognos-tint`.
- **Gradients on standard cards or subcards** — gradients are hero-only.
- **SofiaPro on production pages** — Sofia Pro is print/reference/sandbox
  only; web is AngelList.
- **The three-state Navbar scroll model** (`top` → `hidden` → `peek`) —
  removed in `df77a59`, do not reintroduce.
- **`data-header-dark` per-section listeners** — see `CLAUDE.md` gotchas.

---

## 3. Stack & structure

- **Framework:** Next.js **16.2.2** (App Router, Turbopack). React **19.2.4**,
  TypeScript. Request middleware is `proxy.ts` (not `middleware.ts`).
- **Styling:** Tailwind CSS **v4**, CSS-first. **No `tailwind.config.js`.**
  Primitive + semantic tokens in `app/tokens.css`; Tailwind mappings in
  `@theme inline` in `app/globals.css`.
- **Animation:** Framer Motion 12 (reduced-motion guarded throughout).
- **CMS:** Sanity **v6.20** (`next-sanity` 13.4, `@sanity/vision` 6.20,
  `@sanity/color-input`, `@sanity/image-url`, `@sanity/preview-url-secret`).
  Upgraded 2026-10-24 — **redesign only; prod stays on v5**. Studio runs both
  embedded at `/studio` (reads `NEXT_PUBLIC_SANITY_*`) and standalone via
  `sanity dev` (reads `SANITY_STUDIO_*`); `sanity.config.ts` resolves both.
  Production Studio: `sognos.com.au/studio/`. Sanity project `vg117fxr`.
- **Datasets:** `production` = prod site + prod Studio; **`development`** =
  redesign (local `.env.local` + Vercel Preview scope). One-way re-seed only
  (production → development). See §5 #16, #18.
- **Draft preview:** events have a Studio **Preview** action + the
  **Presentation** tool (events only), both via Next draft mode
  (`/api/draft-mode/enable|disable`). Draft reads use `previewClient`
  (Viewer token `SANITY_API_READ_TOKEN`, stega for click-to-edit, value keys
  skipped). Token lives in redesign `.env.local` + Vercel Preview
  (`redesign` branch) only.
- **Product datasheets:** managed via Sanity file fields (`datasheet` on each
  product page schema). GROQ resolves `datasheet.asset->url`; static fallback
  in `public/datasheets/`. Download button rendered by `ProductSubNav`.
- **Backend:** Supabase + Resend power the event-registration flow; a
  keep-alive route (`app/api/ping`) + GitHub Actions cron keeps the free-tier
  DB awake.
- **Structure:** routes under `app/(marketing)/…`; global chrome (Navbar,
  PageTransition, Footer, BookDemoModal) via `app/(marketing)/layout.tsx`.
  Footer (Products Inspector rows, 2026-11-02; option B kept in
  `.backups/footer-b-2026-11-02/`) lives in `components/layout/footer/`
  (Footer, FooterBottomBar, footer.data.ts). The rows are: `CTABand
  variant="strip"` on the accent (defaults: `lib/content/ctaBand.ts`), then on
  the brand tint menu C (index rows: Products chips with product dots, then
  Solutions, Industries, Resources, Company), accreditations A2 (white card),
  acknowledgement A2, legals A2 (copyright + Sanity legal links) and the Sognos
  wordmark graphic A2 (navy mask). The groups are regrouped in code from the
  Sanity footer columns (Sanity is read-only). `FooterLinkGroup` is unused.
  Navbar on dark-hero pages: transparent with white text at the top, then white
  with navy text once scrolled. Shared components in
  `components/layout/sections/*`, `components/ui/*`,
  `components/portable-text/*`. Content/data in `lib/*`.
- **Note:** `embla-carousel-react` is installed but **unused** by the live
  sliders (they use native scroll-snap). Keep-or-drop decision in §6.

---

## 4. Application status — per page

Per-page snapshot of what's actually on the site. **Update this table
whenever a pattern is applied.** Don't overpromise: if a section is
untouched, mark ❌.

### 4.1 Homepage (Inspector + hero-stack ports, 2026-11-02)

| Section | Status | Notes |
|---|---|---|
| Header | ✅ 2026-11-02 | Transparent over the navy hero, then **navy** (not white) on scroll, with white text, logo and button (`DARK_SCROLLED_PATHS` in `Navbar.tsx`). |
| Hero | ✅ 2026-11-02 | Hero-stack mockup (`docs/mockups/home/hero-stack.html`, after angellist.com). Plain navy (blur glow removed), centred H1 `md:text-6xl` with the second line in the accent, Book a Demo + Talk to Sales (`/contact`). |
| Trust row | ✅ 2026-11-02 | `LogoStrip variant="hero"`: a stat cell (**"4.9 / Rated by operations leaders": placeholder, needs a source**) and 5 Sanity logos, a 2/3/6 grid with hairlines from `lg`. |
| Product stack | ✅ 2026-11-02 | `home/HomeProductStack.tsx`: three overlapping cards with rounded tops (`rounded-t-[40px]`, a flagged radius exception), alternating white and tint; Paraform panel (`ParaformPanel` from `ProductWorksCard`) at square size; covered card drifts at half speed (scroll-driven CSS). Copy is placeholder; feature links go to the product page. |
| How Sognos Works | ✅ unchanged | Current deck (tint). |
| Solutions | ✅ 2026-11-02 | D · graphic cards (white), first four solutions. |
| CTA band | ✅ 2026-11-02 | `home/HomeCtaBand.tsx`: C · editorial, between hairlines. |
| Industries | ✅ 2026-11-02 | `IndustryOthersSlider tone="tint"`: all five sectors. |
| Customer Stories | ✅ 2026-11-02 | `home/HomeStoryColumns.tsx`: D · expanding columns (navy-darkest). |
| News & Insights | ✅ 2026-11-02 | `home/HomeNewsList.tsx`: C · editorial rows (tint). |

Now unused on the homepage (kept until sign-off): `HomeProductColumns`, `HomeProductCards`, `HeadlineCTA`, `CustomerStories`, `IndustrySection`, the `NewsInsightSection` component (only its type is used), and `/images/home/*-blur-dp.avif`.

### 4.2 Products

| Page | Sofia Pro | Weight ladder | Alpha ladder | Video panel | Notes |
|---|---|---|---|---|---|
| **SognosCare (whole page)** | ❌ retired | — | ✅ `/75` | ❌ no panel — trust logos at the hero foot | **Products Inspector port 2026-11-02** (`docs/mockups/products/care.html`, export `care.json`): Hero B Immersive on the Care gradient (glow + grid, photo, floating card; trust logos kept); white sticky sub-nav after the hero (`ProductSubNav variant="sticky"`: logo, links right, Schedule a Call + Datasheet); Problem A Split on Care base; Features C cards (alternate, visual left first, tint, ink eyebrow + rule, scroll-spy rail); Editions C dot cards in the rail on tint; Advantages C numeral rows on Care base; Stories D tabbed story stage (`ProductStoryStage`). Page-local type scale `sognoscare/typeScale.ts`; `SectionLabel` takes a marker colour. |
| **SognosRoster / SognosGenogram (whole pages)** | ❌ | — | ✅ | ❌ no panel — trust logos at the hero foot (`ProductTrustStrip` section removed from both pages) | **Products Inspector port 2026-11-02** (`roster.json`, `genogram.json`) on the shared product sections in `components/layout/sections/product/` (`ProductHero`, `ProductProblemSplit`, `ProductAdvantagesIndex`, `theme.ts`) + `ProductStoryStage`; SognosCare uses the same sections. Same layouts as SognosCare; Care's colour set applies to both (decision 2026-11-02). Roster's "product" tone uses `roster-dark` (white on Roster base fails AA). Genogram gains Key Advantages (mockup copy; heading is a suggestion) and its sub-nav link; Genogram feature cards drop the eyebrow and carry the Genogram motion graphics (`sognosgenogram/FeatureVisuals.tsx`). Roster hero video + logo crossfade and the With / Without Sognos problem tabs are retired. |
| DigPacks (`/products/digpacks`, all sections) | ❌ | — | ✅ full white on base | ❌ N/A | Added 2026-10-24; static, no Sanity schema. Copy is verbatim from prod `/digpacks`. It is in the Products mega menu (4th column) and has a partner card under the `/products` grid. `/digpacks` and `/products/digpacks-contact` 308 → `/products/digpacks`. **Products Inspector port 2026-11-02** (`digpacks.json`): Hero C Editorial on the mockup gradient (solutions index, photo band; white Book a Demo); white sticky sub-nav with a Book a Demo button (`actions="button"`); Outcomes = Problem A stats on base; Solutions = Features B bento on product soft with the DigPacks motion graphics (`digpacks/FeatureVisuals.tsx`); Why B on deep (three panels, gradient localisation panel); Asset Booker C on base, graphic off (live bottom drawer kept). The Partnership section is removed from the page (not in the mockup). |

### 4.3 About page

| Section | Status | Notes |
|---|---|---|
| Hero (H1) | ✅ Pass done | About-only H1 override kept (`text-5xl lg:text-6xl`). Intro measure `max-w-3xl` (2026-10-24). Copy + Careers-only CTA are an open content decision. |
| AboutHeroImage | ✅ fixed 2026-10-24 | Element-relative `useScroll`, 16:10 mobile crop, radius capped at 8px, alt text. |
| AboutStoryTimeline | ✅ live | Headline is the `h3`, year a visual marker; double stats margin removed (2026-10-24). Milestone copy still placeholder. |
| AboutValues | ✅ Refresh + numbered beliefs | Applied 2026-08-06. |
| TeamSection | ✅ Pass done | Live 3-card grid — untouched. |
| AboutLeadershipEditorial | 📦 scaffold at `/dev/story-timeline` | Not wired live. Decision: promote to replace `TeamSection`, or retire. |
| AboutStats | ⚠️ payload | Current 3 stats have redundancy (Founded 2016 / 10+ Years / 3 Countries); needs real numbers. |
| Partners + Accreditations | ✅ Pass done | 2026-10-24: transparent logos (Microsoft keyed, Ingram + Resco as blue positives), `PartnerCard` → `rounded`, arrows `rounded-full`. Accreditations read the shared `lib/content/accreditations.ts` (with Footer; adds ISO 27001). |
| SocialResponsibility | ✅ Pass done 2026-10-24 | `py-20 md:py-28`, left label rail, `text-white/75`, type-first numbered pillars (no cards), one "Read our commitment" link. |
| Careers band (bottom) | ✅ Pass done | Duplication with Hero resolved. |

### 4.4 Solutions / Industries / Knowledge Hub / Customer Stories

| Page family | Scaffold | Approve | Pass | Refine | Notes |
|---|---|---|---|---|---|
| Solutions `[slug]` | ✅ | ✅ | ✅ 2026-10-25 | 🟡 Frontline only | **Solutions Inspector port 2026-11-02** (`Solutions.json` + config 4), all 7 routes. Header starts transparent with navy text, then white on scroll (`LIGHT_TRANSPARENT_PATH_PREFIXES` in `Navbar.tsx`). Hero A: 6/6 split, breadcrumb label, H1 `md:text-6xl`, Book a Demo + Talk to Sales, photo under a navy→accent wash. The floating card is the live capability index for Frontline (`solutions/HeroCapabilityCard.tsx`) and a name + description card for the others. Problem B: sticky header beside numbered rows on navy, chips flip "Issue today" → "✓ {solution} fixes" (`solutions/SolutionProblem.tsx`). Capabilities A grid (tint). Platform C on navy with the rail: three `bg-white/5` cards with `white/10` borders on every solution (`platformCards()`; card 1 names the solution's platform). Works with A on tint with the rail: white product cards in a 3-column grid (1–2 sit left at a third of the width), the white product logo over the graphic in the panel (Graphic 3, Paraform, no pill), then the accent bar, tagline and link; per `worksWith*` flags. Related B: list rows on navy with the rail and a hero-image hover preview, the 3 curated `relatedSlugs`. The footer stays site-wide C. Frontline's capability and platform motion graphics stand in on the other solutions as placeholders; the hero capability card is Frontline-only. `shared/PlatformLogoRow.tsx` is unused. `SolutionUseCases.tsx` is unused. |
| Industries `[slug]` | ✅ | ✅ | ✅ 2026-11-02 | — | **Industries Inspector port 2026-11-02**, all 5 routes: Hero A split; Challenge on navy, laid out like DigPacks Outcomes (01–03 accent numerals under `white/15` rules); How Sognos helps A tabs with a `#edf6ff` graphic panel; Platform B cards on navy (`white/5`); product cards from Solutions Works with (`ProductWorksCard`); Other industries D slider on the accent (white-on-accent text fails AA, flagged). Stories hidden. |
| Knowledge Hub | ✅ | ✅ | ✅ 2026-11-02 | — | **Knowledge Hub Inspector port 2026-11-02** (`docs/mockups/knowledge-hub/options.html`), sections in `components/layout/sections/knowledge-hub/`: Hero 1 light (H1 `md:text-6xl`, search, featured = latest News or Insights post); sticky tabs All · News · Insights · Newsletters; Mixed grid (12 + Load more); Events 1 upcoming + past with the rail; Newsletter dark band (**form is visual only, no sign-up backend**); Milestone rows. The search filters grid, past events and milestones. `/knowledge-hub/category/[category]` is unchanged (old layout). The `KnowledgeHubArchive` default export is now unused; its named exports are still used by 4 pages. |
| Customer Stories | ✅ | ✅ | 🔄 in progress | — | `[slug]` token Pass done. Dark navy hero kept (deliberate). |
| Events `/events` + `/events/[slug]` | ✅ | ✅ | — | — | Built 2026-10-23/24 from Sanity (option C template: hero, sticky section menu, content + sticky event card). Index: Events + Webinars rails with Upcoming / Past tabs (tabs only when populated). Static `/events/nfp-real-care` retired (seeded in Sanity). |

### 4.5 Orphaned components (deletion decision needed)

Built but imported nowhere: `AboutBeliefs`, `AboutHeroGrid`, `ComingSoonHero`,
`HomepageOutcomes`, `HomepageProblem`, `HowSognosWorksPreview`, `PlatformFlow`,
`PlatformPillars`, `ProductSection`, `ProofSection`, `ArticleProgressLine`.
Plus 4 `.backup.tsx` files (`KnowledgeHubArchive`, `NewsInsightSection`,
`ProductCustomerStories`, `LogoStrip`). `BentoGrid` renders only at the
throwaway `/dev/bento-preview`.

`FeaturePlaceholderImage` is a neutral panel since 2026-10-24 (the old `public/product/feature-0X.webp` were third-party UI — removed). Care and Roster Features now use gallery motion graphics (`sognoscare/FeatureVisuals.tsx`, `sognosroster/FeatureVisuals.tsx`, shared `components/ui/visuals/primitives.tsx`) with a review-only panel palette picker (hidden on production; Care default C · Care blues, Roster default A · Roster tints). Genogram still on the placeholder.

Orphan stat components with unsourced placeholder %s that would mislead a
grep: `ProofSection.tsx`, `sognoscare/Proof.tsx` (`99% / 75% / 60% / 12,000+`),
`sognosroster/Proof.tsx` (`40% / 1,100+ / 95% / <1hr`). Delete or move to
`docs/archive/`.

### 4.6 Not started

`/customers` hub + `/customers/[slug]`; edition-token
migration; Workhorse token (`--color-wh-*` etc.) removal.

---

## 5. Next steps (priority order)

**Where we are (2026-11-02):** the Inspector ports are done and on preview (`redesign`) for Products (Care, Roster, Genogram, DigPacks), Solutions (all 8), Industries (all 5), Home (hero-stack + Inspector sections), Knowledge Hub and the header/footer. Still to do:

- **Sign-offs:** Home, Knowledge Hub.
- **Content to confirm:** the homepage stat ("4.9"), the product stack copy, the Genogram advantages heading.
- **Decisions:** the 40px stack radius, a newsletter sign-up provider, and whether category pages get the new Knowledge Hub layout.
- **Not ported yet:** Customer Stories, Events, About, Contact, Careers.
- **Clean-up:** delete the components listed as unused in §4.1 and §4.5 once pages are signed off.

1. **Solutions `[slug]` — per-solution visual sets.** Layout ported from the
   approved Frontline mockup (2026-10-25). The other 6 solutions need their
   own symptom / capability / platform graphics before they match Frontline.

2. **Homepage Products / Solutions / Industries — advance Scaffold → Pass.**
   Three sections scaffolded 2026-08-07 (§4.1), awaiting Pass and sector
   token migration for Industries.

3. **Finish the homepage NewsInsight/bento.** `NewsInsightSection` is
   structure-only; feature-tile scrim bug flagged. Bento parked at
   `/dev/bento-preview`. **Decision:** wire bento vs drop it.

4. **Align earlier-pass sections to Routable** (`IndustrySection` legacy
   showcase, `ProductCustomerStories`, customer-stories `FeaturedCard`).

5. **Cleanup pass** — delete 11 orphaned components + 4 backups + 3 orphan
   proof files; decide Embla keep-or-drop. **Decision:** confirm the delete
   list (some may be intended WIP).

6. **Roster + Genogram Problems dark sections** — apply the SognosCare
   dark-Problems pattern with each product's dark token.

7. **Fix the broken Roster stories query.** `getSognosrosterPageContent()`
   selects `stories`; schema field is `featuredStories`. Roster Sanity
   stories never reach the page — hardcoded shared default is always
   rendered. One-line GROQ fix in `lib/sanity/queries.ts`.

8. **Wire `ProductTrustStrip` on Roster.** Currently not imported; Roster has
   4 strong client logos (Auckland, Penrith, Gentari, NPS; ASC + APP if
   added). Populate `sognosrosterPage.featuredStories[]` in Sanity or pass a
   `stories` prop.

9. **Token debt.** Migrate remaining `--sognos-edition-green` consumers, then
   purge legacy edition tokens; audit/remove Workhorse tokens.

10. **Build `/customers` hub + `[slug]`, and a real `/events` index.** Only
    fully unbuilt routes.

11. **Fix `AboutHeroImage`** — **Done 2026-10-24.**

12. **`AboutStats` payload rewrite** — three stats currently duplicate
    ("Founded 2016" + "10+ Years" = same fact). Needs real numbers from
    founders. Decision: 3 or 4 stats.

13. **SocialResponsibility fixes** — **Done 2026-10-24** (single link
    rather than per-pillar fragments).

14. **Content-model additions (Sanity):**
    - Extract `ProductSpotlight` from industries page → wire to Customer
      Story via `sidebar.Product` (fixes the end-of-article dead-end for
      7/8 stories). Also fix `neca` missing product + `Products` → `Product`
      label drift.
    - Add `calloutBlock` type + renderer to `knowledgePost` (parity with
      `customerStory`).
    - Add `caption` (+ optional `credit`) to the `inlineImage` object.
    - Decide the Customer-Story `heroImage` question: wire to the empty
      right column of the Amigo hero, or deprecate the field.
    - Add a real `products` field to `customerStory.ts` so the story→product
      link is queryable in both directions (either enum of slugs or refs to
      a new `product` document type).

15. **Trim `CLAUDE.md`.** **Done 2026-08-07.** File reduced to execution
    rules + gotchas; design rules moved here (§2). Consolidation absorbed
    `CLAUDE_DESIGN_SYSTEM.md`, `COMPONENT_INVENTORY.md`, four audit docs.

16. **Separate Sanity dataset for the redesign.** **Done 2026-10-24** —
    `development` dataset (public) seeded from `production` (57 docs, 170
    assets); redesign `.env.local` and Vercel **Preview** scope point at it;
    Production scope unchanged. Re-seed one-way only (production →
    development) with `sanity dataset export` / `import --replace`.
    Original note, added 2026-10-23: Prod
    and the redesign Studio both write to `vg117fxr/production` (the only
    dataset), so test content created on localhost (e.g. the "Morbi
    sodales…" event) lands in production and shows in the prod Studio.
    Plan: create a `development` dataset (public ACL), seed it with
    `sanity dataset export production` → `import … development`, point the
    redesign `.env.local` (`NEXT_PUBLIC_SANITY_DATASET`,
    `SANITY_STUDIO_DATASET`) and Vercel **Preview** scope at it; Production
    scope untouched. Then unpublish/delete the localhost test event in
    `production`. **Decision:** approve Sanity + Vercel changes; check the
    plan's dataset limit. Re-seed from production as needed (one-way only).

18. **Event schema divergence (redesign ≠ prod) — migrate before cutover.**
    Added 2026-10-24. The redesign event schema moved fields that prod still
    reads; `development` was migrated, `production` was not:
    `hero.description` → `overview`; `eventMeta.date|time|venueName` →
    `displayDate|displayTime|displayVenueName`. Hero heading/subtitle are now
    optional overrides (fallback: title / excerpt) and event cards show
    `coalesce(hero.heading, title)`. When the redesign replaces prod, run the
    same copy + unset on `production` in the same release.

17. **Single event page (`/events/[slug]`) — port + standardise.** **Built
    2026-10-23** (option C, see CHANGELOG). Remaining: populate `mode`,
    `speakers[]`, `recording` on existing events; decide whether to retire the
    static `/events/nfp-real-care` page; Add to calendar / Share are visual
    only.

---

## 6. Open decisions

- **Hero motion asset — posture + production.** *Parked 2026-10-24: the
  homepage hero was restored to the `f2776ef` version, which has no motion
  panel. Reopen only if the motion hero comes back.* Mechanic (drift + scale) is
  built; missing piece is a layered abstracted-UI panel of the Sognos
  interface (Figma vector composition, fake data, animatable per layer).
  Posture choice pending: Attio "product working" (record assembles, statuses
  tick) vs Mercury "product presiding" (keynote-still dashboard, one element
  moving at a time). Reference shortlist per product group lives in the
  2026-08-08 changelog entry (Ripplix cross-reference). Genogram has no
  Ripplix reference — needs an off-directory source.
- **Sector-tinted `IndustrySection` treatment** — brochure already codes the
  five sectors with pastel tints + line icons. Live section treats all five
  identically. Biggest ROI opportunity in the audits. Needs approval on
  application depth (left-border accent / caption chip / full panel wash)
  and the Energy & Utilities sage token added.
- **"First in Field Service" tagline** — print locks it under the Sognos
  wordmark; site currently doesn't. Reinstate (Footer first) or formally
  retire.
- **Print palette tokenization** — decide whether to add `--sognos-print-navy`
  (`#002040`), `--sognos-cream` (`#e0e0c0`-family), `--sognos-warm-coral`
  (`#c08040`) to `tokens.css`. Site currently reads all-cool; print is
  warmer.
- **`bg-sognos-tint` retoned** to `#f9fafe` (2026-10-24, from `#f0eff2`) to
  match the approved visuals gallery. Print cream (`#e0e0c0`) remains an
  open option as a separate `--sognos-cream` for editorial contexts.
- **Weight ladder rollout** — hard-coded on SognosCare as sandbox (§7). Roll
  to other products, or retire if it doesn't hold.
- **Icon library integration** — 78-icon two-tone library ships in brand
  assets, currently unused. Decide subset to import as SVGs; sector-icon
  candidates for the industries.
- **Master gradient token** — currently PNG-only. Tokenize as CSS gradient
  (`linear-gradient(135deg, #1d96fc 0%, #0f1936 100%)` approximate)?
- **Photography direction as a written brief** — brochure covers set the
  world (real workers, on-site light, hi-vis + healthcare uniforms). Add as
  `docs/PHOTOGRAPHY_DIRECTION.md`, or fold into a section here?
- **Sofia Pro on retained print materials?** — AngelList is the current web
  face. Any surviving material still using Sofia Pro, or full replacement?
- **Ingram Micro + Resco partner logos** — *Resolved 2026-10-24:* blue
  positives generated from the supplied white-on-blue files. Swap for vendor
  originals if they arrive.
- **Industries H2 conflict** — currently uses `font-normal` with inconsistent
  responsive stepping. Matches neither standard H2 (`font-medium ... md:text-4xl`)
  nor statement H2 (`font-medium ... md:text-5xl`). Bring into line, or is
  `font-normal` intentional for industries?
- **Orphan / backup deletion** (§4.5) — approve deleting the 11 orphaned
  components + 4 `.backup.tsx` files, or keep any as intended WIP.
- **Embla** — keep the dependency for future sliders, or drop it since the
  live sliders are native scroll-snap.
- **Duplicated content arrays** — accreditations extracted to
  `lib/content/accreditations.ts` (2026-10-24). SR pillars (SR page ↔ About
  section) still hand-synced.
- **AboutStats payload** — 3 stats or 4? Needs real numbers before decision.
- **Story Timeline waypoints** — 2016 / 2019 / 2022 / 2025 events are
  placeholder; confirm with Kunal / Rick.
- **Leadership editorial vs. current TeamSection** — parked at
  `/dev/story-timeline`. Decide keep / promote / retire.
- **KH hero pattern** — user selected Option C (left list + right image);
  scaffold not yet built.
- **SognosGenogram customer proof** — no docs-fit story exists (Flourish
  adjacency only). Decide: (a) remove Stories section, (b) re-frame as
  Sognos-platform signal ("1,100+ frontline staff across the Sognos
  platform"), or (c) launch an "early adopter" CTA in the slot.

---

## 7. Sandbox — SognosCare-only print-aligned experiment

The **print-aligned design system** (Sofia Pro + weight ladder + alpha
ladder) is being validated on **SognosCare only**. All other pages run the
original live design system (AngelList, `font-medium` H2, `font-normal`
body, standard alpha values).

**Bug fixes** (e.g. phased-out `rounded-sm` on buttons) land as **standalone
fixes** on other pages, separate from the sandbox experiment.

**Retired on SognosCare 2026-10-24** (polish pass, Q1-A): Typekit link and
Sofia Pro / weight ladder removed from Hero + Problems. No page now runs the
sandbox; decision effectively closed as "retire" unless reopened.

**Previously applied — SognosCare only (history):**
- **Sofia Pro** via Adobe Typekit (`use.typekit.net/aoi4bxt.css`) on Hero + Problems.
- **Weight ladder:** `font-bold` (700) H1, `font-semibold` (600) H2,
  `font-light` (300) body on dark surfaces.
- **Alpha ladder bump:** `text-white/85` on dark navy (instead of `/75`) to
  keep `font-light` body readable.

**SognosGenogram sandbox experiment was reverted 2026-08-07** — restored to
the original design system. Do not re-apply Sofia Pro / weight ladder to any
page other than SognosCare Hero + Problems without approval.

**Decision to reach:** roll the ladder to other products (Roster, Genogram
full), retire the ladder entirely, or hold the experiment on SognosCare
indefinitely.

---

## 8. Preview routes (dev-only, noindex)

Living examples of design decisions. Do not link publicly.

| Route | Shows |
|---|---|
| `/dev/style-guide` | Design system rendered visually (13 sections). Source: `app/(marketing)/dev/style-guide/page.tsx`. |
| `/dev/story-timeline` | About Story Timeline + Leadership Editorial scaffolds. |
| `/dev/hiw-roster` | HowSognosWorks Roster panel (chat-narrator storyboard C2). |
| `/dev/ai-pipeline` | AI Agent Pipeline component (21st.dev original + Sognos-refined). |
| `/dev/bento-preview` | Homepage bento grid scaffold (legacy). |

---

## 9. Related docs

- **`CLAUDE.md`** — session execution rules + technical gotchas. Points to
  this doc for design rules.
- **`docs/ROLLOUT_PROCESS.md`** — the per-page workflow loop
  (Scaffold → Approve → Pass → Refine → Roll out).
- **`docs/CHANGELOG.md`** — append-only session history.
- **`docs/archive/`** — retired references: `CLAUDE_DESIGN_SYSTEM.md`,
  `COMPONENT_INVENTORY.md`, `ABOUT_PAGE_AUDIT.md`,
  `BRAND_MATERIALS_AUDIT.md`, `PRODUCT_DATA_AUDIT.md`, `CONTENT_AUDIT.md`,
  plus earlier docs (`DESIGN_MIGRATION_STATE.md`, `SLIDER_PATTERN.md`,
  `FEATURE_LOG.md`, etc.). Historical only.
