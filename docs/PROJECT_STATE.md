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

**Product colours (live in `app/tokens.css`):**
- SognosCare: `--sognos-care-dark #0f1936`, `--sognos-care-base #3b6fe0`, `--sognos-care-gradient`.
- SognosRoster: `--sognos-roster-dark #1d96fc`, `--sognos-roster-base #59bbf7`, `--sognos-roster-gradient`.
- SognosGenogram: `--sognos-genogram-dark #250438`, `--sognos-genogram-base #91278c`, `--sognos-genogram-gradient`.
- DigPacks (partner): `--sognos-digpacks-dark #2a0517`, `--sognos-digpacks-base #b6065a`, `--sognos-digpacks-gradient`. Base doubles as text/CTA colour, so it stays dark enough for white text and for text on white.

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

### 4.1 Homepage (Hero + How Sognos Works restored to `f2776ef` on 2026-10-24)

| Section | Status | Notes |
|---|---|---|
| Hero | ✅ restored | `f2776ef` version: H1 "Your entire service operation…" + Book a Demo / Explore products, with `HomeProductCards` (Care / Roster / Genogram) and the trust `LogoStrip` inside the hero. The 2026-08-07 motion-panel scaffold is gone from the page (history in `39552a1`). |
| LogoStrip | ✅ live | Trust marquee with title ("Trusted by industry leaders…"), Sanity-backed. `showTitle` prop removed with the restore. |
| HowSognosWorks | ✅ restored | `f2776ef` version: "Healthcare First. Field Services Always. AI at the Centre." + platform logos + timer deck (Manage demand / Coordinate workforce / Track outcomes). No `ScrollReveal` wrapper. |
| ProductsSection | ⏸ parked | Commented out of the page pending review; PartnerCard scaffold survives in the file. |
| SolutionsSection | 🟡 scaffold | Routable global-payouts rescaffold: sticky gutter labels, 4 rows (first 4 solutions), centered header. 2026-10-24: /dev/ payout art replaced by Sognos motion graphics (`home/SolutionVisuals.tsx`); review toggle Panel colour / Hero photo + palettes A–F (hidden on production). Awaiting Pass. |
| IndustrySection | 🟡 scaffold | Routable swiper rescaffold: 628px cards, per-sector inline hex tints. Awaiting Pass + sector token migration. |
| HeadlineCTA | ⚠️ pending fix | `rounded-sm` button violation flagged, not fixed. |
| CustomerStories | ✅ live | Embla gutter-inset slider, product-dark palette. |
| NewsInsightSection | ⚠️ structure only | Styling pending; feature-tile scrim bug flagged, not fixed. |

### 4.2 Products

| Page | Sofia Pro | Weight ladder | Alpha ladder | Video panel | Notes |
|---|---|---|---|---|---|
| **SognosCare Hero / Sub-nav / Problems / Editions / Advantages** | ❌ retired | — | ✅ `/75` | ❌ no panel — trust logos in the hero (option A, 2026-10-24); separate trust strip removed | **Polish pass 2026-10-24** (`docs/audits/sognoscare-polish-audit.md`). AngelList throughout; page-local type scale `sognoscare/typeScale.ts` (H2 400 / 30→36px, ledes 16px); `SectionLabel`; Routable sub-nav bar (`ProductSubNav variant="bar"` → Navbar slot); 4 solution steps; edition cards rebuilt. Hero motion stage = option 3 "Day in motion" (`sognoscare/HeroStage.tsx`, 560px; budget card + notification stack; demo data). |
| SognosCare Features / Stories | ❌ | ❌ | ❌ | — | Excluded from the polish pass. Features rail/jump offsets clear the section bar via `stickyOffset="sectionBar"` (2026-10-24). |
| SognosRoster Hero | ❌ | ❌ | ❌ | ✅ live (canonical) | Reference implementation for the video/logo crossfade pattern. |
| SognosRoster other sections | ❌ | ❌ | ❌ | — | Untouched. Broken Sanity `stories` query (§5). |
| SognosGenogram (all sections) | ❌ | ❌ | ❌ | ❌ N/A | Sandbox experiment reverted 2026-08-07 — restored to original design system. No `sognosgenogramPage` Sanity schema exists. |
| DigPacks (`/products/digpacks`, all sections) | ❌ | ❌ | ❌ | ❌ N/A | Added 2026-10-24. Partner page on the product template (Hero, Partnership, sub-nav, Outcomes, Solutions via `ProductFeaturesScroll`, Why, Asset Booker). Copy ported verbatim from prod `/digpacks`. Static — no Sanity schema. Listed in the Products mega menu (4th column) and as a partner card under the `/products` grid. `/digpacks` + `/products/digpacks-contact` 308 → `/products/digpacks`. |

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
| Solutions `[slug]` | ✅ | ✅ | ⚠️ outstanding | ⚠️ outstanding | Pre-scaffold `rounded-xl`/`shadow-md` still present; Pass required before Refine. Sole page family still off the design system — top priority (§5). |
| Industries `[slug]` | in progress | — | — | — | H2 conflict: uses `font-normal` with inconsistent responsive stepping; matches neither standard nor statement H2 (§6). |
| Knowledge Hub | ✅ | ✅ | 🔄 in progress | — | Matched to routable.com/resources. Done: SectionShell, Insights `ArticleCard`, News lead + Events/Webinars title bumps, meta hierarchy. Remaining: masthead, tab band, News/Milestone card review. New route `/knowledge-hub/category/[category]` scaffolded 2026-08-06. |
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
