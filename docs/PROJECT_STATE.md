# Project State — Sognos Marketing Site

> **Current source of truth (2026-08-06).** Where the project actually is and
> what comes next. `DESIGN_MIGRATION_STATE.md` has been retired to
> `docs/archive/`; this doc replaces it. `CLAUDE.md` has been trimmed to
> execution rules only (2026-08-06) and defers to this doc.
> `docs/CHANGELOG.md` remains the append-only history.

---

## 1. Design reference

- **Current, and only: Routable** — <https://www.routable.com>.
- **What we take from it:** layout, sizing, and spacing language — section
  composition, card anatomy (title → dashed rule → copy → `Read more →`),
  light inset panels, drawer/slider mechanics. Structure and mechanic only.
- **Sognos copy and assets always ship.** The reference's branding/imagery never
  does.
- **Earlier references have been retired.** Any history lives in `docs/archive/`
  and `docs/CHANGELOG.md`; nothing current points to them, and no live doc or
  new work should reintroduce them.

## 2. Current design rules (authoritative)

Contradictions resolved in favour of the most recent decision.

| Concern | Rule |
|---|---|
| Container | `max-w-7xl` = **1280px** (via `--sognos-container-width` in `app/tokens.css`), `px-6`. |
| Radius | `rounded-lg` on surfaces; `rounded-full` on **buttons only**. Never `xl`/`2xl`/`3xl` or `rounded-[Xrem]`. |
| Shadows | **None, ever.** Separate with borders and tonal steps. |
| Light section surface | **`bg-sognos-tint`**. (Resolves the old `bg-gray-50` / `bg-gray-200/70` variants — both superseded for new/edited work.) |
| Dark surface default | `bg-sognos-navy`. Use `-dark` / `-darkest` only when specified. |
| Grid/flex gap | `gap-3 lg:gap-4` standard. |
| Section rhythm | `py-20 md:py-28`. |
| Section H2 | `font-heading text-3xl font-medium tracking-tight md:text-4xl`; statement H2 (`HeadlineCTA`, `SolutionsSection`) `md:text-5xl`. |
| Hero H1 | `font-normal`, `text-5xl md:text-6xl lg:text-7xl`. |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` (`AnimatedEyebrow`, square dot). |
| Body measure | `max-w-2xl` body, `max-w-3xl` hero sub, `max-w-[46rem]` article prose (`ARTICLE_PROSE_MAX_W`). |
| Stat blocks | Match the `CTASection.tsx` pattern exactly. |
| Primary CTA label | **"Book a Demo."** |
| Components | Server Components by default; `"use client"` only where interaction/motion needs it. |
| Sliders | Native scroll-snap for drag+arrows shapes. The fuller pattern reference is archived at `docs/archive/SLIDER_PATTERN.md`. |

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
  `SANITY_STUDIO_*`); `sanity.config.ts` resolves both.
- **Backend:** Supabase + Resend power the event-registration flow; a keep-alive
  route (`app/api/ping`) + GitHub Actions cron keeps the free-tier DB awake.
- **Structure:** routes under `app/(marketing)/…`; global chrome (Navbar,
  PageTransition, CTABand, Footer, BookDemoModal) via
  `app/(marketing)/layout.tsx`. Shared components in
  `components/layout/sections/*`, `components/ui/*`,
  `components/portable-text/*`. Content/data in `lib/*`.
- **Note:** `embla-carousel-react` is installed but **unused** — the live
  sliders use native scroll-snap. Keep-or-drop decision in §6.

## 4. Component status

### In use and done (on the current reference or reference-neutral)
Navbar, Footer/FooterColumns, CTABand, CTASection (variant flow), BookDemoModal,
CookieBanner, Hero, HomeProductCards, LogoStrip, HowSognosWorks, HeadlineCTA,
SolutionsSection, KnowledgeHubArchive (+ search dialog), LegalPageRenderer,
AboutHeroImage, AboutStats, AboutValues, **AboutPartnersSlider**,
**SocialResponsibilitySection** (six-pillar), **TeamSection** (Routable card +
right drawer), LifeAtSognos, OpenRoles, SolutionUseCases, SolutionHeroDemoButton,
ProductTrustStrip, ProductFeaturesScroll, EditionCards, AnimatedEyebrow,
ArticleScrollNav, ArticleProseFooter, ShareIcons/StoryMetaRail, scroll-progress,
PullQuote/QuoteCallout/StatRow, product-page sections (Care/Roster/Genogram).

### In use, but built in an earlier pass — not yet aligned to Routable
- `IndustrySection` — tab showcase.
- `NewsInsightSection` — bento; **structure only, styling pending**.
- `ProductCustomerStories` — arrow-paged testimonial; verify against Routable.
- `customer-stories` index `FeaturedCard` — "Explore more stories" archive card.

### Orphaned — built but imported nowhere (deletion decision needed)
`AboutBeliefs`, `AboutHeroGrid`, `ComingSoonHero`, `HomepageOutcomes`,
`HomepageProblem`, `HowSognosWorksPreview`, `PlatformFlow`, `PlatformPillars`,
`ProductSection`, `ProofSection`, and `ArticleProgressLine` (listed Production in
the old doc but rendered by no page). Plus 4 `.backup.tsx` files
(`KnowledgeHubArchive`, `NewsInsightSection`, `ProductCustomerStories`,
`LogoStrip`). `BentoGrid` renders only at the throwaway `/dev/bento-preview`.

### Not started
`/customers` hub + `/customers/[slug]`; a real `/events` index; edition-token
migration; Workhorse token (`--color-wh-*` etc.) removal.

## 5. Next steps (priority order)

1. **Refine Solutions `[slug]` on Routable.** *What:* the 7-route template still
   uses pre-scaffold `rounded-xl` / `shadow-md` / `bg-white py-24`. *Why next:*
   it's the only page family still off the design system. *Done:* no
   `rounded-xl`/`shadow-md`, section system applied, sections mapped to Routable
   (mapping-table-first). *Decision:* needs the Routable section mapping approved
   before build.
2. **Finish the homepage NewsInsight/bento.** *What:* `NewsInsightSection` is
   structure-only; the bento is parked at `/dev/bento-preview`. *Why:* front-door
   section left unfinished. *Done:* NewsInsight styled on Routable, and the bento
   is either wired in or dropped. *Decision:* wire bento vs drop it.
3. **Align the earlier-pass sections to Routable** (`IndustrySection`,
   `ProductCustomerStories`, customer-stories `FeaturedCard`). *Why:* they're the
   last live sections not yet aligned to the current reference. *Done:* each
   matches a Routable analogue or is explicitly confirmed to keep as-is.
4. **Cleanup pass — orphans, backups, dead deps.** *What:* delete the 11
   orphaned components + 4 backups; decide Embla. *Why:* they mislead the
   inventory and the docs. *Done:* tree contains only live components. *Decision:*
   confirm the delete list (some may be intended WIP).
5. **Roster + Genogram Problems dark sections.** *What:* apply the SognosCare
   dark-Problems pattern with each product's dark token. *Done:* both render on
   their dark product theme.
6. **Token debt.** *What:* migrate remaining `--sognos-edition-green` consumers,
   then purge legacy edition tokens; audit/remove Workhorse tokens. *Done:* no
   legacy edition/Workhorse tokens remain in `app/tokens.css`/`globals.css`.
7. **Build `/customers` hub + `[slug]`, and a real `/events` index.** *Why:* the
   only fully unbuilt routes. *Done:* both route families render from their data.
8. **Trim `CLAUDE.md`.** *Done 2026-08-06.* File reduced to execution rules
   only (project understanding, design rules, technical gotchas, hard rules,
   source-of-truth pointers). State/plan/roadmap moved here.

## 6. Open decisions

- **Grey background:** confirm `bg-sognos-tint` is the single answer for light
  sections (recorded as such in §2; supersedes `bg-gray-50` and
  `bg-gray-200/70`).
- **Orphan/backup deletion:** approve deleting the 11 orphaned components + 4
  `.backup.tsx` files, or keep any as intended WIP.
- **Embla:** keep the dependency for future sliders, or drop it since the live
  sliders are native scroll-snap.
- **Bento:** wire `BentoGrid` into the homepage or drop it (and `/dev/bento-preview`).
- **Duplicated content arrays:** extract SR pillars (SR page ↔ About section) and
  accreditations (Footer ↔ About) into `lib/content`, or keep hand-synced.
- **Partner logo assets:** Ingram Micro and Resco ship white-on-solid-blue with
  no transparent variant, so they read as blue plates on the light card — who
  provides transparent PNG/SVG replacements.
- **Doc ownership:** `PROJECT_STATE.md` is now the canonical plan and
  `DESIGN_MIGRATION_STATE.md` is retired to `docs/archive/`. Remaining call:
  reduce `CLAUDE.md` to execution rules only (step 8), or leave its planning
  content in place.
