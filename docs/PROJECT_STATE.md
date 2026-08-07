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

**Product colours (live in `app/tokens.css`):**
- SognosCare: `--sognos-care-dark #0f1936`, `--sognos-care-base #3b6fe0`, `--sognos-care-gradient`.
- SognosRoster: `--sognos-roster-dark #1d96fc`, `--sognos-roster-base #59bbf7`, `--sognos-roster-gradient`.
- SognosGenogram: `--sognos-genogram-dark #250438`, `--sognos-genogram-base #91278c`, `--sognos-genogram-gradient`.

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
- **CMS:** Sanity (`next-sanity`, `@sanity/vision`, `@sanity/color-input`,
  `@sanity/image-url`). Studio runs both embedded at `/studio` (reads
  `NEXT_PUBLIC_SANITY_*`) and standalone via `sanity dev` (reads
  `SANITY_STUDIO_*`); `sanity.config.ts` resolves both. Production Studio:
  `sognos.com.au/studio/`. Sanity project `vg117fxr`.
- **Product datasheets:** managed via Sanity file fields (`datasheet` on each
  product page schema). GROQ resolves `datasheet.asset->url`; static fallback
  in `public/datasheets/`. Download button rendered by `ProductSubNav`.
- **Backend:** Supabase + Resend power the event-registration flow; a
  keep-alive route (`app/api/ping`) + GitHub Actions cron keeps the free-tier
  DB awake.
- **Structure:** routes under `app/(marketing)/…`; global chrome (Navbar,
  PageTransition, CTABand, Footer, BookDemoModal) via
  `app/(marketing)/layout.tsx`. Shared components in
  `components/layout/sections/*`, `components/ui/*`,
  `components/portable-text/*`. Content/data in `lib/*`.
- **Note:** `embla-carousel-react` is installed but **unused** by the live
  sliders (they use native scroll-snap). Keep-or-drop decision in §6.

---

## 4. Application status — per page

Per-page snapshot of what's actually on the site. **Update this table
whenever a pattern is applied.** Don't overpromise: if a section is
untouched, mark ❌.

### 4.1 Homepage

| Section | Status | Notes |
|---|---|---|
| Hero | ✅ live | Sandbox reverted 2026-08-07; kept `rounded-sm` → `rounded-full` button fix (§2.8 compliance). Centrepiece now `SognosPipeline` (2026-08-07 — HomeProductCards archived). |
| LogoStrip | ✅ live | Trust marquee, Sanity-backed. |
| HowSognosWorks | ✅ live | Pipeline addition proposal parked. |
| ProductsSection | 🟡 scaffold | Reuses `PartnerCard` verbatim on `bg-sognos-tint` + dashed-border static logo strip. Awaiting Pass. |
| SolutionsSection | 🟡 scaffold | 7 stacked `FeatureRow`s. Awaiting Pass. |
| IndustrySection | 🟡 scaffold | 5-card `FeatureRail` with per-sector inline hex tints. Awaiting Pass + sector token migration. |
| HeadlineCTA | ⚠️ pending fix | `rounded-sm` button violation flagged, not fixed. |
| CustomerStories | ✅ live | Embla gutter-inset slider, product-dark palette. |
| NewsInsightSection | ⚠️ structure only | Styling pending; feature-tile scrim bug flagged, not fixed. |

### 4.2 Products

| Page | Sofia Pro | Weight ladder | Alpha ladder | Video panel | Notes |
|---|---|---|---|---|---|
| **SognosCare Hero** | ✅ | ✅ `font-bold` H1 | ✅ `text-white/85` | ❌ hidden — logo-only in gradient panel | **Sandbox.** Video pattern documented; Care asset not finalised. |
| **SognosCare Problems** | ✅ | ✅ `font-semibold` H2, `font-light` body (dark half) | ✅ `text-white/85` dark half | — | **Sandbox.** Tokenised `text-gray-600` → `text-sognos-body`, `rounded-xl` → `rounded`. |
| SognosCare Features / Editions / Advantages / Stories | ❌ | ❌ | ❌ | — | Untouched. |
| SognosRoster Hero | ❌ | ❌ | ❌ | ✅ live (canonical) | Reference implementation for the video/logo crossfade pattern. |
| SognosRoster other sections | ❌ | ❌ | ❌ | — | Untouched. Broken Sanity `stories` query (§5). |
| SognosGenogram (all sections) | ❌ | ❌ | ❌ | ❌ N/A | Sandbox experiment reverted 2026-08-07 — restored to original design system. No `sognosgenogramPage` Sanity schema exists. |

### 4.3 About page

| Section | Status | Notes |
|---|---|---|
| Hero (H1) | ✅ Pass done | Copy rewritten. About-only H1 override kept (`text-5xl lg:text-6xl`). |
| AboutHeroImage | ⚠️ open | Mobile `pt-[100vw]` + global-scrollY parallax bug — fix drafted in archived audit. |
| AboutStoryTimeline | ✅ live | Wired in — replaces old Our Story block. |
| AboutValues | ✅ Refresh + numbered beliefs | Applied 2026-08-06. |
| TeamSection | ✅ Pass done | Live 3-card grid — untouched. |
| AboutLeadershipEditorial | 📦 scaffold at `/dev/story-timeline` | Not wired live. Decision: promote to replace `TeamSection`, or retire. |
| AboutStats | ⚠️ payload | Current 3 stats have redundancy (Founded 2016 / 10+ Years / 3 Countries); needs real numbers. |
| Partners + Accreditations | ✅ Pass done | Ingram / Resco baked-in blue logos remain — needs transparent replacements or white-plate treatment (§6). |
| SocialResponsibility | ⚠️ open | Audit findings not applied: `py-24 lg:py-32` (off-system), centred H2 (isolates from left-aligned rhythm), `text-white/65` (off-ladder), six identical link destinations. |
| Careers band (bottom) | ✅ Pass done | Duplication with Hero resolved. |

### 4.4 Solutions / Industries / Knowledge Hub / Customer Stories

| Page family | Scaffold | Approve | Pass | Refine | Notes |
|---|---|---|---|---|---|
| Solutions `[slug]` | ✅ | ✅ | ⚠️ outstanding | ⚠️ outstanding | Pre-scaffold `rounded-xl`/`shadow-md` still present; Pass required before Refine. Sole page family still off the design system — top priority (§5). |
| Industries `[slug]` | in progress | — | — | — | H2 conflict: uses `font-normal` with inconsistent responsive stepping; matches neither standard nor statement H2 (§6). |
| Knowledge Hub | ✅ | ✅ | 🔄 in progress | — | Matched to routable.com/resources. Done: SectionShell, Insights `ArticleCard`, News lead + Events/Webinars title bumps, meta hierarchy. Remaining: masthead, tab band, News/Milestone card review. New route `/knowledge-hub/category/[category]` scaffolded 2026-08-06. |
| Customer Stories | ✅ | ✅ | 🔄 in progress | — | `[slug]` token Pass done. Dark navy hero kept (deliberate). |

### 4.5 Orphaned components (deletion decision needed)

Built but imported nowhere: `AboutBeliefs`, `AboutHeroGrid`, `ComingSoonHero`,
`HomepageOutcomes`, `HomepageProblem`, `HowSognosWorksPreview`, `PlatformFlow`,
`PlatformPillars`, `ProductSection`, `ProofSection`, `ArticleProgressLine`.
Plus 4 `.backup.tsx` files (`KnowledgeHubArchive`, `NewsInsightSection`,
`ProductCustomerStories`, `LogoStrip`). `BentoGrid` renders only at the
throwaway `/dev/bento-preview`.

Orphan stat components with unsourced placeholder %s that would mislead a
grep: `ProofSection.tsx`, `sognoscare/Proof.tsx` (`99% / 75% / 60% / 12,000+`),
`sognosroster/Proof.tsx` (`40% / 1,100+ / 95% / <1hr`). Delete or move to
`docs/archive/`.

### 4.6 Not started

`/customers` hub + `/customers/[slug]`; a real `/events` index; edition-token
migration; Workhorse token (`--color-wh-*` etc.) removal.

---

## 5. Next steps (priority order)

Design + code work, ordered by impact.

1. **Refine Solutions `[slug]` on Routable.** The 7-route template still uses
   pre-scaffold `rounded-xl` / `shadow-md` / `bg-white py-24`. Only page
   family still off the design system. **Decision:** needs Routable section
   mapping approved before build.

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

11. **Fix `AboutHeroImage`** — element-relative `useScroll` + saner mobile
    aspect than `pt-[100vw]`. Draft in archived About audit.

12. **`AboutStats` payload rewrite** — three stats currently duplicate
    ("Founded 2016" + "10+ Years" = same fact). Needs real numbers from
    founders. Decision: 3 or 4 stats.

13. **SocialResponsibility fixes** — `py-20 md:py-28`, left-align header,
    alpha ladder (`text-white/75` not `/65`), fragment-target links per
    pillar instead of six identical destinations.

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

---

## 6. Open decisions

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
- **Retone `bg-sognos-tint`?** Currently `#f0eff2` (cool grey-pink); print
  cream is `#e0e0c0` (warmer green-cream). Alternative: keep current tint for
  UI, introduce `--sognos-cream` only for editorial contexts (pull-quotes,
  testimonials, long-form KH posts).
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
- **Ingram Micro + Resco partner logos** — baked-in blue backgrounds on
  `bg-sognos-tint` cards. Get transparent PNG/SVG replacements from
  vendors, or ship interim white-plate treatment (§2.1 already codified as
  a rule).
- **Industries H2 conflict** — currently uses `font-normal` with inconsistent
  responsive stepping. Matches neither standard H2 (`font-medium ... md:text-4xl`)
  nor statement H2 (`font-medium ... md:text-5xl`). Bring into line, or is
  `font-normal` intentional for industries?
- **Orphan / backup deletion** (§4.5) — approve deleting the 11 orphaned
  components + 4 `.backup.tsx` files, or keep any as intended WIP.
- **Embla** — keep the dependency for future sliders, or drop it since the
  live sliders are native scroll-snap.
- **Duplicated content arrays** — extract SR pillars (SR page ↔ About
  section) and accreditations (Footer ↔ About) into `lib/content`, or keep
  hand-synced.
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

**Currently applied — SognosCare only:**
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
