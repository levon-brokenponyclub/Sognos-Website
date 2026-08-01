# Changelog

## 2026-08-02 — Nav featured columns, event schema, mobile banner

- **Event document type** (`sanity/schemas/event.ts`, new): listing-level `event` — title, slug, excerpt, date, location, meta, heroImage, registrationOpen — registered in the schema index and surfaced as **Posts → Events** beside Customer Stories and Knowledge Hub.
  - **Listing-level only, deliberately.** The event pages are hand-built (`/events/nfp-real-care` is 564 lines with agenda, speakers, partner logos and a Supabase/Resend registration form) and their bullet lists are keyed to lucide **icon components**, which Sanity cannot store. A full migration needs a decision on storing icon names and mapping them client-side. `body` is present but unused so page content can move later without a schema migration.
  - `scripts/seed-events.ts` seeds the NFP Real Care document and uploads its hero image. Idempotent — `createOrReplace` against a fixed `_id`.
  - **The seed has not been run.** `SANITY_API_WRITE_TOKEN` is absent from `.env.local`, and it writes to the production dataset that preview and production share. The type also won't appear in the production Studio until `redesign` merges to `main` — the Studio bundle ships with the app, same as `brandColor`.

- **Featured columns in the nav dropdowns** (`lib/featuredNav.ts`, new): the dropdowns previously ended in an empty gradient placeholder.
  - **Knowledge Hub** — three stacked rows: latest insight, latest customer story, upcoming event.
  - **Why Sognos** — a single image-backed promo for Social Responsibility, after `diffblue.com`'s card: full-bleed photo with copy and an arrow over it.
  - Navbar is a client component and cannot fetch, so the marketing layout resolves the items server-side and passes them down; the two archives join the existing `getCtaSectionContent()` in one `Promise.all`.
  - Entries are keyed by nav group label and carry a `variant` (`list` | `promo`), so Products / Solutions / Industries are a map entry with **no Navbar change**. Groups absent from the map keep the gradient.
  - Two deviations from the reference: `rounded-lg` rather than its 3px radius (design rules), and a **gradient scrim it does not have** — white text on a light photo would otherwise be unreadable over `social-responsibility-hero-img.webp`.
  - Titles are the destination pages' own h1 copy so menu and page agree.

- **`UPCOMING_EVENT` moved** from `Navbar.tsx` to `lib/upcomingEvent.ts`. It had to: Navbar is `"use client"`, and importing a value from a client file into a Server Component yields a client reference rather than the object — the trap `lib/customerStoryBrand.ts` already records.

- **Mobile announcement banner** (`components/layout/Navbar.tsx`): below `md` the banner drops the "View event" link, uses `text-xxs`, and marquees the title right-to-left since it cannot fit. Desktop is unchanged apart from the label now being uppercase.
  - The whole mobile group is the link, so removing the CTA doesn't strand the event, and it's `self-stretch` for a **44px tap target** rather than the 20px the text alone gave — under the 24px WCAG minimum.
  - Title rendered twice so the shared `trust-marquee-scroll` keyframe loops seamlessly; both copies `aria-hidden` with one `sr-only` copy, or screen readers announce it twice. `.banner-marquee-track` reuses that keyframe rather than adding another and carries the same `prefers-reduced-motion` guard.

- **`--text-xxs` (0.65rem)** added to the type scale in `app/globals.css` with a paired line-height. Verified it compiles to `font-size: .65rem` — worth knowing Tailwind v4 **inlines** token values rather than emitting `var(--text-*)`, and only emits a utility once something uses it, so a new token produces no CSS until referenced.

- **Files:** `sanity/schemas/event.ts`, `sanity/schemas/index.ts`, `sanity.config.ts`, `scripts/seed-events.ts`, `lib/featuredNav.ts`, `lib/upcomingEvent.ts`, `app/(marketing)/layout.tsx`, `components/layout/Navbar.tsx`, `app/globals.css`.

## 2026-08-01 — Customer stories index rebuilt as featured grid + archive

- **Hero** (`app/(marketing)/customer-stories/page.tsx`): the dark centred hero — pill badge, "Real outcomes from real organisations", subcopy — is replaced by a light left-aligned one using the Knowledge Hub headline and subcopy treatment. The headline is now the page name, matching how Knowledge Hub uses its own; the former headline's descriptive line became the subcopy. `data-header-dark` dropped, since the hero is light and those per-section listeners are already recorded as removed.

- **Featured block** after `middesk.com/customers` and `anam.ai/blog`: two equal columns over two rows with the lead spanning both on the left, per anam's `repeat(2, minmax(50px, 1fr))` with `grid-row: span 2`.
  - Rows are **auto**, not the fixed 311px the reference uses — titles here run to three lines and would clip. The lead's image flexes instead (`min-h-[16rem] lg:min-h-[26rem]`), so its card still matches the column height.
  - One `FeaturedCard` serves all three slots so they cannot drift apart. The lead stacks image over text; the other two run image-left / text-right from `lg` and stack below it, which takes their titles from six lines to three at 375px.
  - Gap follows the house `gap-3 lg:gap-4` rather than the reference's 20px.

- **Archive** now excludes the featured stories. Previously all eight rendered in both places, so every featured story appeared twice on the page. A `FEATURED_COUNT` constant drives both slices so they cannot fall out of step.

- **Archive cards** follow middesk's "Explore more stories": the white card surface and grey meta block are gone, leaving image, mono meta row (chip · date, read time right-aligned), title, and Read More directly on the section background. Image moves 3/2 → 16/9 and the title to `text-lg lg:text-xl font-normal`, so the archive matches the featured cards above it. The logo overlay is **kept**, unlike the reference's plain photos — the featured cards and the detail-page brand panels both carry the client mark.

- **Images**: featured lead and archive cards moved to `next/image`; the lead takes `priority` as the page's LCP element. This cleared the file's two pre-existing `no-img-element` warnings — it now lints at zero.

- **Known gap:** the index still reads a hardcoded 8-story `STORIES` array while the detail pages are Sanity-driven. They match today but nothing enforces it. Featured selection is `slice(0, 3)`; a `featured` flag in Sanity replaces it, and that change pairs naturally with migrating the index to `getCustomerStoryArchive()`.

- **Cookie banner** (`components/ui/CookieBanner.tsx`): title changed to "We value your privacy".

- **Files:** `app/(marketing)/customer-stories/page.tsx`, `components/ui/CookieBanner.tsx`.

## 2026-08-01 — Customer story rebuilt on the Pallet layout

- **Hero** (`app/(marketing)/customer-stories/[slug]/page.tsx`): replaced the two-column `[24rem_1fr]` grid and its bordered left meta rail with a single centred column — breadcrumb, title, brand panel, pull-quote.
  - Title dropped `text-8xl` → `text-5xl`; centred at the old size it overwhelmed the panel below it.
  - Pull-quote centred with `sognos-blue-accent` quote marks; attribution collapsed to Pallet's single `Name / ROLE` line.
  - "Back to Customer Stories" removed, replaced by a `Customer Stories / Company` breadcrumb. The first crumb is a link — without it, removing the back link would leave no route to the index.

- **Brand panel replaces the hero image.** A 16:8 `rounded-lg` panel with the client logo centred on a radial gradient in the client's own colour:
  `radial-gradient(circle at 25% 20%, color-mix(in oklab, {brand} 65%, white) 0%, {brand} 40%, var(--sognos-navy-dark) 100%)`.
  - Colour resolves `story.brandColor` → `BRAND_BG[company]` → `#1d96fc`, matching the precedence the customer-story slider already used. Both inputs existed; neither was used on this page.
  - The navy floor keeps the white logo on a dark field regardless of hue. Measured white-on-brand contrast: Auckland Airport 14.89:1, Gentari 9.26:1, Flourish 3.54:1, Penrith 3.15:1 — all clear the 3:1 non-text threshold, and logos are exempt from contrast requirements anyway. A future client lighter than `#f26522` would drop below 3:1.
  - `color-mix()` needs Safari 16.2+ / Chrome 111+ — newer than the `@property` floor recorded in CLAUDE.md's gotchas.
  - `story.heroImage` is no longer rendered on the detail page; archive cards and related reading still use it.

- **Body → three columns** (`[300px_48px_1fr]`), the same tracks as the Knowledge Hub template, so both article families now share one body layout. Rail sticky offset moved to `top-36` to line up with the progress line, and `ArticleScrollNav` lost its own track since the progress line now owns the vertical rule.

- **`ArticleProgressLine` rewritten** (`components/layout/sections/shared/ArticleProgressLine.tsx`): was a full-height fill scaled across the whole row, leaving thousands of pixels of filled line behind the reader. Now the fill sits in a viewport-tall sticky box and scales from its top edge. Added a `top` prop (default 144) because the two article templates used different sticky offsets, and the `resize` listener the previous version lacked — the progress maths depends on viewport height. **Shared component, so Knowledge Hub articles get the new behaviour too.**

- **Industry moved to `StoryMetaRail`** via the `industry` prop it already had but the page never passed. `StoryMetaRail` also dropped its internal `lg:sticky lg:top-[104px]` — the grid column wrapping it is already sticky, so it was nesting one pinned element inside another.

- **Not included:** Pallet's three-up stats row. `customerStory` has no metrics field, and deriving one from the generic `sidebar` array would conflate metadata with results.

- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/layout/sections/shared/ArticleProgressLine.tsx`, `components/layout/sections/customer-stories/StoryMetaRail.tsx`.

## 2026-08-01 — Mobile dropdown TOC for article scroll nav

- **`ArticleScrollNav.tsx` is now responsive** rather than desktop-only. The `lg` sidebar rail is unchanged; below `lg` it renders a sticky collapsible dropdown driven by the same `activeId` scroll-spy, so there is one source of truth for the active section at every breakpoint.
  - Sticky at `top-20` / `z-40`, matching the navbar's `h-20` (80px) content row and sitting under the `z-50` header so the peeking bar covers it.
  - Toggle row with a rotating `ChevronDown`; tapping a link scrolls to the heading and closes the panel.
  - `variant="dark"` now covers the dropdown too — added `panelBg` / `panelText` / `panelBorder` to the existing `colors` map. No call site passes `dark` yet; this is correctness-for-later.

- **Panel overlays instead of displacing.** The links panel is `absolute inset-x-0 top-full` inside a `relative` bar, so opening it no longer pushes the article body down ~500px mid-read.

- **Accordion animates `grid-template-rows` 0fr→1fr, not `height: auto`.** Deliberate deviation from the `FooterColumns.tsx` pattern: Framer measures an `auto` keyframe by reflowing and then calling `window.scrollTo()` to restore position. That restore landed *after* `scrollToSection()` and cancelled its smooth scroll — tapping a link closed the panel but never moved the page. The `fr` interpolation needs no measurement, so the scroll survives. Verified via a patched `window.scrollTo` capturing the offending call from `measureAllKeyframes`.

- **Scroll offset is now breakpoint-derived** (`landingOffset()`). Below `lg` the sticky bar overlays the article top, so the old fixed `-112` landed headings ~21px behind the bar. Offset is computed from the bar's own height (`MOBILE_BAR_TOP + offsetHeight + SCROLL_GAP`) rather than its current possibly-unstuck position, so it is stable wherever the click happens; `offsetParent === null` detects the `display:none` desktop case and falls back to the original 112.

- **Scroll-spy checkpoint follows the same offset.** Was a fixed `scrollY + 140`, which sat *above* the mobile landing position — so immediately after tapping a link the TOC highlighted the previous section. Now `max(SPY_CHECKPOINT, landingOffset() + 1)`; desktop keeps its original 140 exactly.

- **Call sites: `contents lg:block`.** Both pages previously wrapped the component in `hidden lg:block`, which would have suppressed the mobile block entirely. Replaced with `contents` below `lg` so the wrapper creates no box and the sticky bar is bounded by the full-height body grid rather than a self-sized column — without this the bar scrolls out of view immediately instead of tracking the article. Desktop-only siblings (`ArticleProgressLine`, the customer-story divider) stay `hidden lg:block`.

- **Verified** at 375 / 768 / 1280px on both article families: dropdown open/close, link scroll landing 16px below the bar, active-entry sync, desktop rail + marker + progress line unchanged, no console errors. `tsc --noEmit` and `eslint` clean.

- **Files:** `components/layout/sections/shared/ArticleScrollNav.tsx`, `app/(marketing)/knowledge-hub/[slug]/page.tsx`, `app/(marketing)/customer-stories/[slug]/page.tsx`.

## 2026-08-01 — Page transitions, About hero grid, and motion/token refinements

- **Page transition wrapper** (`components/layout/PageTransition.tsx`, new):
  - Client component wrapping `<Navbar>` + `<main>` in the marketing layout with `AnimatePresence mode="wait"` keyed on `usePathname()`.
  - 0.36s opacity fade-in (`ease: [0.33, 1, 0.68, 1]`) / 0.3s fade-out; `useReducedMotion` guard passes children through as-is.
  - `CTABand`, `Footer`, and `BookDemoModal` sit outside the wrapper so they do not participate in page transitions.
  - `app/(marketing)/layout.tsx`: wrapped `<Navbar>` + `<main>` in `<PageTransition>`.

- **About hero grid** (`components/layout/sections/AboutHeroGrid.tsx`, new):
  - Replaced the scroll-parallax `<AboutHeroImage />` on the About page hero with a full-width mosaic brand-pillar grid.
  - Grid: 7 × 10 columns/rows on mobile, 22 × 9 on desktop; 2px `bg-sognos-navy` divider lines on both axes.
  - 5 icon + label tiles (Care teams, Field service, Connected operations, Better decisions, People first) with staggered slide-and-fade entrances (`delay: 0.2 + index × 0.1`, 1.3s spring ease `[0.16, 1, 0.3, 1]`).
  - 3 photography panels (hero-img, sognos-team, iStock) revealed with a left-to-right `clipPath` wipe (`delay: 0.55 + index × 0.18`).
  - `useReducedMotion` guard disables all entrance animations and shows tiles/images at rest state.
  - 3 new surface tokens added to `app/tokens.css`: `--sognos-about-blue-light: #c9d8ff`, `--sognos-about-purple-light: #d9ccff`, `--sognos-about-amber: #e4ae72`. Registered in `app/globals.css` `@theme inline`.

- **`ScrollReveal` wrapper removal on two surfaces**:
  - `app/(marketing)/page.tsx`: commented out the `<ScrollReveal y={40} duration={0.7}>` wrapper on `<LogoStrip>` (trust band now renders without a deferred entrance).
  - `app/(marketing)/solutions/[slug]/page.tsx`: commented out `<ScrollReveal>` wrapper on `<SolutionUseCases>`.

- **Navbar event banner label chip** (`components/layout/Navbar.tsx`):
  - Changed from a transparent outline pill to a white-fill, `text-sognos-heading`-text solid chip with `bg-white px-3 py-2.5 tracking-wider`; previously `border-white/25` with no fill.

- **`AboutHeroImage.tsx` shrink width**:
  - Max-width shrink target shifted from `80rem` to `84rem` — image holds slightly wider at full scroll depth.

- **`globals.css` base**:
  - Removed `scroll-smooth` from the `html` base rule; native scroll is now the default and scroll-smooth can be scoped per-element.

- **Files:** `components/layout/PageTransition.tsx` (new), `components/layout/sections/AboutHeroGrid.tsx` (new), `app/(marketing)/layout.tsx`, `app/(marketing)/company/about/page.tsx`, `app/tokens.css`, `app/globals.css`, `app/(marketing)/page.tsx`, `app/(marketing)/solutions/[slug]/page.tsx`, `components/layout/Navbar.tsx`, `components/layout/sections/AboutHeroImage.tsx`.

## 2026-07-30 — About-page leadership polish and article sharing controls

- **Company/About page refinements**:
  - Reworked the About page story section into a tighter three-column composition with the active animated eyebrow treatment, stronger lead paragraph, and adjusted stats flow.
  - Replaced the previous sticky Mission/Vision cards with a single navy values band covering Mission, Vision, and Beliefs, including inline belief cards with the final right divider removed.
  - Removed the older standalone `AboutBeliefs` render path now that beliefs are consolidated into `AboutValues`.
- **Leadership section**:
  - Rebuilt `TeamSection` from autoplay/slider variants into a responsive leadership grid with card hover states, profile expansion, keyboard Escape dismissal, focus management, and a full modal profile view.
  - Added leadership location metadata and retained LinkedIn access inside the expanded profile experience.
- **Article sharing controls**:
  - Refactored exported `ShareIcons` into the compact two-button pattern: copy-link feedback with a `Copied link` confirmation and a share menu for X, LinkedIn, and Facebook.
  - Added explicit hover, active, focus-visible, outside-click, and Escape-key states for the share controls reused by the shared article prose footer.

## 2026-07-29 — Form journeys, design-system consolidation, content search, and interaction polish

- **Style guide and migration state**:
  - Rebuilt `app/style-guide/page.tsx` around the live lean token system from `app/tokens.css`, covering core, product, and edition colours plus typography, weights, radii, shadows, and layout metrics.
  - Replaced the legacy configurable palette and outdated action examples with production-aligned component samples, including the bottom-up `Book a Demo` fill treatment and lightweight `Explore products` link.
  - Reconciled `docs/DESIGN_MIGRATION_STATE.md` into a clearer current baseline covering the stack, conventions, route/component inventory, completed work, and known migration debt.
- **Contact and demo form journeys**:
  - Reworked `ContactForm.tsx` into a validated three-step flow: `Details`, `What are you interested in?`, and `Product interest`.
  - Replaced compact selects with descriptive radio rows for enquiry reasons and SognosCare, SognosRoster, SognosGenogram, and `Not sure yet`; removed the standalone Dynamics 365 and Power Platform product options.
  - Standardized contact inputs, helper text, focus states, navigation controls, error handling, and mobile-visible actions around the current Sognos form family.
  - Refined the contact-page split layout with a non-sticky left introduction, benefits, and correctly sized 3x2 trusted-logo grid while retaining normal page scrolling into the CTA and footer.
  - Updated the Book Demo details step in `CTASection.tsx` to use the same field styling and descriptive product radio rows, and aligned its left-column copy, spacing, benefits, and trusted-logo sizing with the contact page.
- **Homepage and shared section interactions**:
  - Rebuilt `HowSognosWorks.tsx` as an interactive, auto-advancing three-step process with desktop timeline progress, mobile step controls, active accent cards, reduced-motion handling, and Dynamics 365, Microsoft Solutions Partner, and Copilot branding.
  - Replaced the previous selectable employee testimonial layout with a responsive `LifeAtSognos` bento grid containing one featured testimonial and four supporting cards.
  - Added the reusable `AnimatedEyebrow` component with a square marker, staggered entrance, configurable text/dot colours, and reduced-motion support; applied it across homepage, SognosCare, About, Social Responsibility, and Careers section labels.
  - Widened and tightened the homepage hero supporting copy to the shared three-quarter-width measure and current body-text treatment.
  - Refined the About and Careers compositions and added a V7-style Open Roles hover/focus interaction with a smooth row inset, light surface transition, and responsive `Apply` action.
- **Product hero refinement**:
  - Updated the SognosCare hero with the shared animated eyebrow, restored supporting copy, tightened heading rhythm, and aligned its media panel radius with the current card system.
  - Refined the SognosRoster hero headline and supporting-copy measure, then added a delayed logo-to-video handoff: the logo fades in, holds for four seconds, and crossfades into a looping simulated-conversation video.
  - Converted the supplied roster conversation asset to browser-compatible H.264 and used screen blending so its baked black field reveals the existing roster gradient.
- **Knowledge Hub, navigation, and footer**:
  - Added `KnowledgeHubSearchDialog`, opened from the archive’s inline search icon, with a modal overlay, keyboard/overlay dismissal, query filtering, empty state, and recent article, event, and customer-story results.
  - Updated the Navbar so its bottom border is transparent at page load and returns with the correct light/dark colour after scrolling.
  - Added the requested acknowledgement line break in `Footer.tsx` and standardized the acknowledgement row as centered, compact supporting text.
- **Article and customer-story detail pages**:
  - Added the shared fixed `ScrollProgress` indicator to Knowledge Hub posts and customer stories.
  - Reworked Knowledge Hub article heroes into a wider editorial title/excerpt composition, moved the featured image into the article grid, and constrained it to the shared `ARTICLE_PROSE_MAX_W` measure used by the prose.
  - Extended `ArticleScrollNav` with optional external-track rendering so Knowledge Hub articles can use an Amigo-style full-height rail while retaining the shared active-section marker and scroll-spy behavior.
  - Moved customer-story company logos above the hero title, refined quote/author spacing, and added bordered list-row treatment to story body bullets.
  - Added a Sognos blue conversion panel after the prose on every Knowledge Hub post and customer story, with a white `Book a demo` modal trigger and `Talk to Sales` contact link.
  - Extended `SolutionHeroDemoButton` with class overrides so server-rendered article routes can reuse the existing client-side demo-modal trigger with context-specific styling.
  - Added the shared `ArticleProseFooter` after both article bodies with back-to-index navigation and the existing LinkedIn, X, and Facebook `ShareIcons`.
  - Exported `ShareIcons` from `StoryMetaRail` for reuse, removed its duplicate in-rail share block, switched the icon surfaces to white, and tightened the footer spacing beneath the new conversion panel.
  - Retuned the global `text-8xl` size to `2.5rem` with `1.1` line-height for the updated article hero treatment.
- **Spacing refinements**:
  - Reduced the Customer Stories heading-to-carousel gap and removed excess top padding from the drawer-style Book Demo introduction.
- **SognosCare editions**:
  - Reworked edition-card hover/focus states into a left-to-right full-card colour reveal above the base logo, with description, white title, white action surface, navy arrow, and 60% opacity on non-active sibling cards.
  - Added configurable slider-control positioning and refactored Related Editions into a left eyebrow rail with a right-column heading, introduction, inline controls, and card slider.
  - Removed the embedded calendar CTA from edition templates and temporarily gated the edition customer-story section off.
  - Simplified edition Advantages lists by removing the outer dividers/radius, softening alternating rows, vertically centering items, and using white check icons.
- **Assets and verification**:
  - Added the Microsoft Solutions Partner logo used by the new platform strip, prepared local Frontline and Customer Service solution hero assets, and added the optimized SognosRoster conversation video.
  - Repeated targeted ESLint checks, `npx tsc --noEmit`, and the Next.js production build passed during the implementation; the running homepage returned HTTP `200` from `http://localhost:3001/`.

## 2026-07-24 — Legal-page typography pass, footer company links, and SognosGenogram naming

- **Legal pages refactor and typography audit** (`components/layout/sections/LegalPageRenderer.tsx`):
  - Replaced the old gradient-hero legal-page layout with a document-style two-column layout using a sticky left rail that links `Privacy Policy`, `Privacy Collection Notice`, and `ISMS Policy`.
  - Standardized legal-page typography across headings, paragraphs, links, metadata, and footer notes to the current Sognos type scale and spacing rhythm.
  - Updated unordered lists to use the Sognos blue-square bullet treatment and kept ordered lists on a styled semantic `<ol>` after fixing the invalid Portable Text list-item render path.
  - Hid the introductory privacy-policy title/subhead block so `/company/privacy-policy` opens directly into the legal content body.
- **Footer / navigation content corrections**:
  - `lib/content/footer.ts` and `lib/sanity/queries.ts`: locked the footer `Company` column to the required site links and order: `About`, `Social Responsibility`, `Knowledge Hub`, `News`, `Events`, `Customer Stories`, `Careers`, `Contact`.
  - Normalized footer link labels sourced from Sanity so any legacy `Sognos Genogram` label is rendered as `SognosGenogram`.
- **Repo-wide product naming normalization**:
  - Updated product names, metadata, CTA copy, navigation labels, content strings, and supporting docs to consistently use `SognosGenogram` instead of `Sognos Genogram`.
  - Touched the shared product constants/navigation plus the SognosGenogram product page and related marketing surfaces so the naming is consistent across UI, forms, and internal documentation.
- **Verification during the work**:
  - `npm run build` passed on Friday, July 24, 2026.

## 2026-07-24 — Solution-page presentation polish + archive CTA refinements

- **Solution landing/detail page polish**:
  - `app/(marketing)/solutions/[slug]/page.tsx`: tightened the hero typography and spacing, swapped hard-coded gray text to Sognos tokens, moved the trusted-logo strip below the dark “The problem” section, and aligned the section eyebrow styling with the current uppercase/wide-tracking system.
  - Replaced the shared solution hero placeholder with per-solution imagery by moving hero image URLs into `lib/solutions-content.ts` and rendering `content.hero.image` on each solution detail page.
  - `components/layout/sections/SolutionHeroDemoButton.tsx`: restyled the hero CTA to the brighter Sognos blue accent treatment with tighter pill padding.
  - `components/layout/sections/SolutionUseCases.tsx`: moved the capabilities section onto the navy background token and normalized the section eyebrow styling to match the rest of the updated marketing pages.
- **Homepage / hero CTA motion**:
  - `components/layout/sections/Hero.tsx`: replaced the plain hover color swap on `Book a Demo` with a work-button style bottom-up accent fill animation while preserving the existing button size and layout.
- **Knowledge Hub archive + event/story promo polish** (`components/layout/sections/KnowledgeHubArchive.tsx`):
  - Added a reusable excerpt for the featured Gentari customer story and rendered it beneath the dark-band promo title.
  - Tightened the customer-story promo spacing, upgraded the hover treatment from opacity-only to text-color emphasis, and normalized the date/read-time metadata styling.
  - Refined the upcoming-event card typography and spacing: smaller eyebrow label, sharper heading scale, tighter metadata treatment, and slightly reduced minimum height.
  - Swapped featured-article excerpt copy from generic gray text to the standard `text-sognos-body` token.
- **Section background / typography consistency**:
  - `components/layout/sections/SolutionsSection.tsx`: updated the homepage solutions cards to use the same per-solution hero imagery as the corresponding detail pages.
  - `components/layout/sections/LogoStrip.tsx`: promoted the logo-strip heading from paragraph markup to an `h3` and strengthened it to full white on the navy band.
  - `components/layout/sections/NewsInsightSection.tsx`: shifted the section background from white to `bg-gray-50`.
  - `components/layout/sections/ProductCustomerStories.tsx`: removed the bottom border from the customer-story carousel wrapper.
  - `components/layout/sections/industries/IndustryChallengeStack.tsx` and `components/layout/sections/industries/IndustryHowTabs.tsx`: updated the section eyebrow labels to the heavier uppercase tracking style used across the rest of the redesign.
- **Verification during the work**:
  - `npm run build` passed on Friday, July 24, 2026.

## 2026-07-24 — Announcement banner, cookie-consent panel, and section polish

- **Navbar announcement banner** (`components/layout/Navbar.tsx`):
  - Added a sticky top-of-page event banner for the upcoming **Designing Services Around Real Lives, Not System Boundaries** event, with left-aligned label, centered title/date metadata, right-aligned `View event` CTA, and dismiss control.
  - Wired the CTA and close button to persist dismissal in `localStorage`, so the banner stays hidden after either action for that event payload.
  - Shifted the desktop backdrop blur, fixed header, and mobile menu overlay down while the banner is visible, then collapses them back to `top-0` once dismissed.
  - Replaced the effect-driven banner dismissal state with `useSyncExternalStore` over `localStorage` plus a custom window event, removing the React cascading-render warning from Friday, July 24, 2026.
  - Added an in-flow 56px banner spacer so pages keep the same visual gap beneath the fixed header when the event ribbon is visible.
- **Cookie consent UI replacement** (`components/ui/CookieBanner.tsx`, `components/ui/cookie-banner-1.tsx`):
  - Replaced the old full-width bottom bar with a compact floating cookie panel using the new shadcn-style component structure under `components/ui`.
  - Added inline preference controls for `Functional`, `Analytics`, and `Marketing` cookies while keeping `Strictly necessary` locked on.
  - Preserved the app’s existing consent flow by continuing to write the `cookie_consent` cookie and calling `router.refresh()`, so `app/layout.tsx` still governs analytics loading and banner visibility from request headers.
  - Added preference persistence via `localStorage`, plus links to `/company/privacy-policy` and `/company/privacy-collection-notice`.
- **Section refinements**:
  - `components/layout/sections/LogoStrip.tsx`: aligned the trusted-organisations band with the current homepage navy by switching the section background from `bg-sognos-navy-dark` to `bg-sognos-navy`.
  - `components/layout/sections/SolutionUseCases.tsx`: removed the extra left rule on each use-case row and normalized button/content padding for a cleaner stacked-accordion rhythm.
- **Verification during the work**:
  - `npm run build` passed on Friday, July 24, 2026.

## 2026-07-23 — Events launch, CTA/contact redesign, proxy migration, and local Sanity repair

- **New event landing page + registration flow**:
  - Added `app/(marketing)/events/nfp-real-care/page.tsx`: a full marketing/event page for **“Designing Services Around Real Lives, Not System Boundaries”** with hero, event metadata cards, challenge/why-attend sections, speaker profile, agenda timeline, attendee-role chips, Sognos/Microsoft context, location/travel guidance, and repeated registration CTAs.
  - Added `lib/EventRegistrationContext.tsx`, `components/layout/sections/events/nfp-real-care/{RegisterButton,EventRegistrationModal,EventRegistrationForm}.tsx`, and `app/actions/event-registration.ts`.
  - Registration is handled via a Server Action that validates the form, writes to Supabase `event_registrations`, and emails the internal events/contact recipients through Resend.
  - Added the supporting event assets under `public/images/events/nfp-real-care/`.
- **Knowledge Hub now promotes events + latest customer story** (`components/layout/sections/KnowledgeHubArchive.tsx`):
  - Added a new **Upcoming Events** section linked to `/events/nfp-real-care`.
  - Replaced the old placeholder case-study band with a linked **Customer Story** promo for Gentari using the real image/logo treatment.
  - Changed the featured-grid heading from `All articles` to `Latest articles`.
  - Added `INITIAL_ARTICLE_LIMIT = 4` with a **Load all articles** button in the featured state.
  - Reset the article-limit state whenever the user switches archive pills.
- **Contact page rebuilt as a dark split-screen lead form** (`app/(marketing)/contact/page.tsx`):
  - Replaced the old gradient hero + office/sidebar layout with a full-height dark hero/form composition.
  - Added a left-column benefits list and a 3×2 trust-logo grid sourced from CTA/Logo Strip content.
  - Simplified the right side to a single `Get in touch.` form surface and removed the previous office / ABN / LinkedIn panels from the page layout.
- **CTA surfaces reworked around the same lead-gen layout**:
  - `components/layout/sections/CTASection.tsx`: added a new **drawer-style** layout for the bare+hideStats variant, including the same four demo benefits, trust-logo grid, and roomier white form panel.
  - `components/layout/sections/CTABand.tsx`: the `Book a demo` button is live again and opens the shared Book Demo modal instead of being disabled.
  - `components/ui/BookDemoModal.tsx`: darkened the backdrop and widened the drawer container to a `max-w-7xl` blue-surface treatment.
  - `lib/content/ctaSection.ts`, `lib/content/logoStrip.ts`, and `lib/sanity/queries.ts`: introduced `trustLogos`, centralized `LOGO_STRIP_TITLE` / `LOGO_STRIP_LOGO_LIMIT`, and wired CTA trust logos to the Logo Strip CMS/default content.
  - `components/layout/sections/LogoStrip.tsx`: now reads the shared title/logo-limit constants instead of hardcoding them locally.
- **Navigation/runtime cleanup for Next.js 16**:
  - Deleted `middleware.ts` and added `proxy.ts`, keeping the same cookie-consent and pathname header forwarding while moving to the new Next.js 16 file/function convention.
  - `components/layout/Navbar.tsx`: treats `/contact` as a dark-hero route, respects `variant === "dark"` when deciding transparent mode, and uses a `requestAnimationFrame` reveal when menus open so the bar reliably unhides.
- **Colour/token updates**:
  - `app/tokens.css` / `app/globals.css`: introduced `--sognos-navy-darkest`, darkened `--sognos-navy-dark`, and shifted the SognosCare dark/base tokens deeper.
  - `components/layout/sections/Hero.tsx` and `HomeProductCards.tsx`: switched the home hero/product-card section backgrounds from `bg-sognos-navy-dark` to `bg-sognos-navy`.
  - `components/layout/sections/CTABand.tsx`: moved the band background to `bg-sognos-navy-darkest`.
- **Sanity/local-env repair + diagnostics**:
  - Root-caused the customer-story/article 404s to a local Sanity env load failure: the workspace could not open the previous symlinked `.env.local`, so slug fetches returned `null` and detail routes fell through to `notFound()`.
  - Replaced the broken symlink with a real local `.env.local` using `NEXT_PUBLIC_SANITY_PROJECT_ID=vg117fxr` and `NEXT_PUBLIC_SANITY_DATASET=production`, restoring Sanity-backed routes in local dev.
  - `lib/sanity/client.ts`: added dev-only warnings for missing Sanity config and dev-only error logging around failed fetches.
  - `lib/sanity/image.ts`: migrated from the deprecated default `@sanity/image-url` export to the named `createImageUrlBuilder` export.
- **Verification during the work**:
  - Local dev restarted successfully with `.env.local` loading.
  - Verified `200 OK` for `/customer-stories/flourish-australia`, `/knowledge-hub/north-sydney-office`, and `/knowledge-hub`.
- **Files:** `app/(marketing)/events/nfp-real-care/page.tsx`, `app/actions/event-registration.ts`, `components/layout/sections/events/nfp-real-care/{RegisterButton,EventRegistrationModal,EventRegistrationForm}.tsx`, `lib/EventRegistrationContext.tsx`, `components/layout/sections/{KnowledgeHubArchive,CTASection,CTABand,LogoStrip,Hero,HomeProductCards}.tsx`, `app/(marketing)/contact/page.tsx`, `components/ui/BookDemoModal.tsx`, `lib/content/{ctaSection,logoStrip}.ts`, `lib/sanity/{client,image,queries}.ts`, `proxy.ts`, `middleware.ts` (deleted), `app/{globals,tokens}.css`, `components/layout/Navbar.tsx`, `public/images/events/nfp-real-care/*`.

## 2026-07-23 — Company, careers, social responsibility, industry and content-section refinements

- **Careers page hero and image rhythm** (`app/(marketing)/company/careers/page.tsx`):
  - Replaced the old centered gradient hero with the About-page style white hero: eyebrow, large left-column heading, intro copy, right-aligned `Open Positions` CTA, and the scroll-shrinking `<AboutHeroImage />` below.
  - Updated hero JSX apostrophes to HTML entities so the page passes `react/no-unescaped-entities`.
- **Careers benefits section** (`app/(marketing)/company/careers/page.tsx`):
  - Replaced the previous five “Our People - Our Planet” values with four benefits: `Collaborative culture`, `Continuous learning`, `Work-life balance`, and `Equal opportunity`.
  - Changed the section from the old 3×2 dashed-grid treatment to a dark navy left-intro plus 2×2 benefit-card layout.
- **Open roles section** (`components/layout/sections/OpenRoles.tsx`):
  - Refactored from a client-side filtered roles list to a server-rendered AngelList-style open-positions layout.
  - Removed department/location filters and client state.
  - Added the `SognosCare Advantages`-style left rail, large `Open positions` heading, divided job rows, work-type pills, right-aligned locations, and retained `mailto:careers@sognos.com.au` role links.
- **Life at Sognos testimonials** (`components/layout/sections/LifeAtSognos.tsx`):
  - Replaced old testimonial data with Brian Kasmara, Mrigul Arora, Mayank Raval, Rishit Patel, and Arayen Desai.
  - Switched images from remote `sognos.com.au` URLs to local `/images/team/*.webp` assets.
  - Migrated raw `<img>` usage to `next/image`, added avatar thumbnails, a large active employee image, tab semantics, and animated image/quote transitions.
  - Updated the section background to `bg-sognos-navy`.
- **Social responsibility page** (`app/(marketing)/company/social-responsibility/page.tsx`):
  - Rebuilt the hero to match the About-page hero layout: white background, eyebrow, large heading, intro copy, right-aligned `Contact us` CTA, and a hero image below.
  - Wired the hero image to `/images/about/social-responsibility-hero-img.webp`.
  - Replaced the static image block with `<AboutHeroImage src="...">` so the image uses the same scroll shrink/parallax effect as the About hero.
  - Refactored the pillars grid from a light bordered grid into a dark navy `IndustryChallengeStack`-style section with centered intro and responsive numbered cards.
- **Shared hero image component** (`components/layout/sections/AboutHeroImage.tsx`):
  - Added optional `src` and `alt` props while preserving the default About/Careers image behavior.
  - Kept the existing scroll-linked max-width shrink, border-radius interpolation, and vertical parallax behavior.
- **About page and beliefs layout**:
  - `app/(marketing)/company/about/page.tsx`: refactored the partners block into a sticky left rail plus 2-column partner cards; updated the label/heading copy to `Our Partners` and `Let's build. Together.`
  - `components/layout/sections/AboutBeliefs.tsx`: changed the beliefs section to a dark navy grid with a title/intro cell and numbered card-style belief items.
- **Industry detail pages**:
  - `app/(marketing)/industries/[slug]/page.tsx`: restored the industry hero image column, changed the challenge section to a dark card-grid section, added the industry slider for “Explore other industries,” and replaced the older product-card block with the new platform section.
  - `components/layout/sections/industries/IndustryChallengeStack.tsx`: changed from sticky stacked cards to a reusable centered-heading plus numbered responsive-card grid; accepts `heading` and `description`.
  - `components/layout/sections/industries/IndustryHowTabs.tsx`: expanded the simple tab view into an autoplaying, reduced-motion-aware dark workflow panel with vertical desktop tabs, mobile accordions, animated content, and a workflow mockup.
  - `components/layout/sections/industries/IndustryPlatformSection.tsx` added: product/platform cards for SognosCare, SognosRoster, SognosGenogram, Dynamics 365 Field Service, and Microsoft Cloud context.
  - `components/layout/sections/IndustrySection.tsx`: added optional `heading` and `excludeSlug` props for reuse on industry detail pages; tightened card rounding/overlay treatment.
- **Knowledge Hub and Customer Story pages**:
  - `app/(marketing)/knowledge-hub/[slug]/page.tsx`: reworked the post hero so meta/title sit on a left rail and the featured image aligns below with the content column; changed the “Latest articles” footer into a heading/link row using `SeeMoreLink`.
  - `app/(marketing)/customer-stories/[slug]/page.tsx`: widened the hero rail, changed the label from `Case Study` to `Customer Story`, increased quote spacing, and reduced the pull-quote desktop size.
  - `components/layout/sections/ProductCustomerStories.tsx`: made `SeeMoreLink` reusable with optional `href` and `label`.
- **Homepage/product and section polish**:
  - `components/layout/sections/HomeProductCards.tsx`: tightened product-card copy and reduced the section bottom padding.
  - `components/layout/sections/HowSognosWorks.tsx`: increased desktop card gap, changed card accent bars to `bg-sognos-blue-accent`, and disabled the placeholder icon image.
  - `app/(marketing)/solutions/[slug]/page.tsx`: tightened the “The problem” eyebrow tracking.
- **Navigation** (`lib/navigation.ts`):
  - Added `Events` and restored `Customer Stories` in the Resources menu.
- **New local assets**:
  - Added About/social images: `public/images/about/sognos-team.webp`, `public/images/about/social-responsibility-hero-img.webp`, `public/images/about/iStock-1391579515-scaled.webp`.
  - Added team testimonial images: `public/images/team/{Arayen-Desai,Brian-Kasmara,Mayank-Raval,Mrigul-Arora,Rishit-Patel}.webp`.
- **Verification run during the work:** targeted ESLint passed for `LifeAtSognos.tsx`, `OpenRoles.tsx`, `AboutHeroImage.tsx`, `careers/page.tsx`, and `social-responsibility/page.tsx`. Local dev server ran on `http://localhost:3002` after port `3000` was occupied.

## 2026-07-07 — Article content blocks: PullQuote, QuoteCallout, StatRow + square bullets

Four reusable Portable Text elements (Pallet-style, Sognos tokens), usable in both Knowledge Hub posts and Customer Stories. All render inside the article prose column (inherit `max-w-[46rem]`; no width classes inside the components).

- **New components in `components/portable-text/`** (Server Components):
  - `PullQuote.tsx` — accent-stripe quote (`border-l-2 border-sognos-blue-accent pl-6`), `text-xl md:text-2xl` heading, optional author/role. Props `{ text, author?, role? }`.
  - `QuoteCallout.tsx` — dark `bg-sognos-navy rounded-lg p-8 lg:p-10` block, decorative `aria-hidden` open-quote (`text-white/30`), optional author photo (`urlFor(photo).width(80).height(80).fit("crop")` → `next/image fill` in a `size-10 rounded-full` mask), author/role. Props `{ text, author?, role?, photo? }`.
  - `StatRow.tsx` — 2–4 stats side-by-side; `border-t border-sognos-line pt-8`, `grid sm:grid-cols-2 md:grid-cols-{n}` via a static class map (Tailwind can't compile `md:grid-cols-${n}`); each cell = `size-2 bg-sognos-blue-accent` square + `text-4xl lg:text-5xl` number + `text-sm` label. Props `{ stats }`.
- **Sanity schemas** — added `pullQuote`, `quoteCallout` (+ `photo` image), and `statRow` (with nested `stat` `{number,label}`, `min(2).max(4)`) object types to **both** `knowledgePost.body` and `customerStory.body`. Previews configured (StatRow uses a custom `prepare` → "Stat Row (N stats)").
- **Renderers registered** in `portableComponents.types` on both pages: `pullQuote`/`quoteCallout`/`statRow` → `<Component {...value} />`. **No GROQ change** — both `body` projections are unfiltered, so the new types (incl. `quoteCallout.photo` image ref, resolved by `urlFor`) pass through.
- **Bulleted lists → square markers** (both pages): `list.bullet` `<ul>` dropped `list-disc pl-6` → `mb-6 space-y-2`; `listItem.bullet` `<li>` → `flex items-start gap-3` with an `aria-hidden` `mt-2 size-1.5 shrink-0 bg-sognos-blue-accent` square + `<span>` content. **Numbered lists untouched** (still `list-decimal pl-6`).
- **Necessary PROSE edit (flagged deviation):** the spec said "keep PROSE unchanged" _and_ "remove `list-disc`/`pl-6` from the `<ul>`" — these conflict, because `PROSE`'s descendant selectors `[&_ul]:list-disc [&_ul]:pl-6` re-applied disc + 24px indent to the new lists (the disc dot didn't show since the `<li>` is now `display:flex`, but the extra `pl-6` indent did). Removed **only** those two selectors from `PROSE` on both pages (kept `[&_ul]:mb-6 [&_ul]:space-y-2` + all `[&_p]`/`[&_li]` rules) so the square-marker lists render as specified.
- **Marker alignment:** kept the spec's `mt-2` (not visually fine-tuned — no screenshots per task; ±0.5 tweak available if it reads off in-browser).
- **Verified:** `npm run build` green, `tsc` clean. Live production server (`next start`): flourish-australia (9 bullets) renders 9 square markers, **no `list-disc`, no extra `pl-6`**; KH post likewise; numbered lists intact. The three new block types have **0 live uses yet** (per the content audit) so their rendered output isn't DOM-observable until content is authored — verified instead that files exist, renderers are registered, schema types are added to both bodies, and the unfiltered `body` projection passes them through.
- **Files:** `components/portable-text/{PullQuote,QuoteCallout,StatRow}.tsx` (new), `sanity/schemas/{knowledgePost,customerStory}.ts`, `app/(marketing)/{knowledge-hub,customer-stories}/[slug]/page.tsx`.

## 2026-07-07 — Article content-width consistency (shared `ARTICLE_PROSE_MAX_W`)

- **New `lib/articleLayout.ts`** — single source of truth: `export const ARTICLE_PROSE_MAX_W = "max-w-[46rem]"`. (New focused module rather than folding into `lib/portableText.ts`, which is parsing-only — layout width is a separate concern.)
- **Knowledge Hub featured image** (`knowledge-hub/[slug]/page.tsx`) — was full-width `lg:col-span-3` (`w-full`). Wrapper now `ml-auto ${ARTICLE_PROSE_MAX_W}` so the image constrains to the prose measure and **right-aligns** flush with the `max-w-7xl` edge. Inner `relative h-[60vh] lg:h-[80vh] w-full` sizing, `object-cover object-top`, priority, sizes — all unchanged (the `w-full` now fills the constrained parent).
- **Customer Story hero pull-quote** (`customer-stories/[slug]/page.tsx`) — `<blockquote>` `max-w-3xl` (48rem) → `${ARTICLE_PROSE_MAX_W}` (46rem). Typography unchanged.
- **Customer Story `<figcaption>`** (logo + author/role) — was **unconstrained** (no `max-w`); added `${ARTICLE_PROSE_MAX_W}` so the attribution aligns with the quote.
- **Both prose columns** (KH + CS) — inline `max-w-[46rem]` swapped to `${ARTICLE_PROSE_MAX_W}`; `PROSE` strings untouched. **5 usages** now reference the constant.
- **Out of scope (kept):** the CS hero `<h1>` still uses `max-w-3xl` (it's a title, not in the change list) — flagged; can align in a follow-up if wanted.
- **Verified (DOM, no screenshots per task):** `npm run build` green (Tailwind still generates `max-w-[46rem]` from the literal in `articleLayout.ts`), `tsc` clean. DOM confirmed: KH image wrapper `max-w-[46rem] ml-auto`; KH + CS prose `max-w-[46rem]`; CS pull-quote `max-w-[46rem]` (old `max-w-3xl` on the quote gone); CS figcaption now `max-w-[46rem]`.
- **Files:** `lib/articleLayout.ts` (new), `app/(marketing)/knowledge-hub/[slug]/page.tsx`, `app/(marketing)/customer-stories/[slug]/page.tsx`.

## 2026-07-07 — Content audit: Knowledge Hub + Customer Stories (read-only)

- **New `docs/CONTENT_AUDIT.md`** — read-only inventory + reusable-component opportunity report. Data pulled live from Sanity (`vg117fxr`/`production`) across all published docs: **19 Knowledge Hub posts, 8 Customer Stories**. No code/schema changed.
- **Part A inventory** — Portable Text block/mark/list/custom-type frequencies, image usage (40 inline images, all alt'd, no caption field), blockquote usage (0 in both bodies), structure (KH 62–1251 words, 5 flat posts; CS uniformly 3–4 `h2`, 150–369 words), metadata (KH categories/author/optional fields; CS sidebar population + product/industry map).
- **Key flags:** no missing renderers (clean); KH `blockquote` style defined but **0 uses**; new `calloutBlock` (CS) **0 uses** and absent from `knowledgePost`; **CS `heroImage` populated 8/8 but no longer rendered** (Amigo hero dropped it → dead data / empty right column has an obvious fill); sidebar label drift (`Product` vs `Products`); `neca` missing its product; KH `useCase` near-dead (2/19).
- **Part B — top recommendations (prioritised):** (1) **HIGH `ProductSpotlight`** end-of-article product card, sourced from `sidebar.Product` (7/8 CS), **extracted from the industry-page product card** (no new build); (2) **HIGH** decide the unused CS `heroImage` (use vs deprecate); (3) **MED** roll `calloutBlock` out to `knowledgePost`; (4) **MED `ImageWithCaption`** (add `caption` to `inlineImage`, 40 images); (5) **MED `PullQuoteBlock`** (new type, both bodies). Stat/related/CTA/comparison blocks = **LOW** (data doesn't justify yet).
- **Files:** `docs/CONTENT_AUDIT.md` (new).

## 2026-07-06 — Knowledge Hub post page → customer-story pattern + shared article-nav extraction

- **Hero rebuilt** (`app/(marketing)/knowledge-hub/[slug]/page.tsx`). `bg-white`, `pt-32 lg:pt-40`, no bottom padding. Full-width **back-link** ("Back to Knowledge Hub") above; then `lg:grid-cols-5`: **left `col-span-2`** = `border-l border-sognos-line pl-6` (line starts at the meta row, below the back-link) with an inline **Amigo-style meta row** — Category `|` date `|` read time, `text-xs font-semibold uppercase tracking-widest text-sognos-muted`, new `formatMetaDate` → "Month D, YYYY" — then `<h1>` (unchanged `text-3xl lg:text-5xl`). **Right `col-span-3`** = featured image (`post.heroImage`) at `h-[60vh] lg:h-[80vh]` `object-cover object-top` — large fixed height so it breaks past the fold (crops the bottom, the intended off-screen effect); empty column when no image (no placeholder). Left column ~40% / right ~60%.
- **Body** = same two-col as customer story (`lg:grid-cols-3`): col 1 = `lg:sticky lg:top-[100px]` scroll-spy nav, col 2 = `max-w-[46rem]` Portable Text prose; `h2` renderer now emits `id={slugify(blockPlainText(value))}` + `scroll-mt` for scroll-spy targets. "Latest articles" 3-up unchanged.
- **Removed entirely:** the old sticky `aside` (Category badge + `BADGE_STYLES` map, "Written by" author avatar/name, `ShareIcons` LinkedIn/X/Facebook), the excerpt paragraph, the date-below-title line, and the below-title `aspect-[16/10]` hero image. `ShareIcons` was only used here — deleted with the file (no other references).
- **Shared extraction (reported):** moved `customer-stories/StoryArticleNav.tsx` → **`components/layout/sections/shared/ArticleScrollNav.tsx`** (renamed default export) — now shared by customer-story + knowledge-hub. Extracted the heading helpers (`slugify`, `blockPlainText`, `extractHeadings`, `PortableBlock`, `ArticleSection`) into **`lib/portableText.ts`**. Updated the customer-story page to import both from the new locations and dropped its local helper copies. Old `StoryArticleNav.tsx` deleted.
- **Marker widened** (`ArticleScrollNav.tsx`, applies to both pages): active rectangle indicator `h-6 w-0.5` → **`h-6 w-1`** (2px → 4px) so it reads as a proper marker on the 1px rail. Height unchanged.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. KH post: back-link, border-line meta row ("December 10, 2024" formatted), `h-[80vh]` featured image, scroll-spy nav, `h-6 w-1` marker — and all removed items absent (ShareIcons/BADGE_STYLES/author/excerpt/old hero image all 0). Customer story: shared nav renders, `h-6 w-1` marker present, old `w-0.5` gone.
- **Files:** `app/(marketing)/knowledge-hub/[slug]/page.tsx`, `components/layout/sections/shared/ArticleScrollNav.tsx` (new/moved), `lib/portableText.ts` (new), `app/(marketing)/customer-stories/[slug]/page.tsx` (imports), `components/layout/sections/customer-stories/StoryArticleNav.tsx` (deleted).

## 2026-07-06 — Industry detail page: full refactor (varied section rhythm)

Rebuilt `app/(marketing)/industries/[slug]/page.tsx` from "three sections of cards" into a varied SaaS page. 3 new components under `components/layout/sections/industries/`.

- **1. Hero** — now matches the Solutions detail hero exactly: `bg-white pt-32 pb-20 lg:pt-40 lg:pb-24`, `grid lg:grid-cols-12` left `col-span-7` = eyebrow `<Link href="/industries">{meta.name}</Link>` + `<h1>` (`text-5xl md:text-6xl lg:text-7xl`) + subtext (`text-gray-600`) + `<SolutionHeroDemoButton>`; no image (dropped per spec). Removed the old `bg-gradient-hero` dark hero + dead `data-header-dark` — navbar now light-themed on the white hero.
- **2. The Challenge → stacking sticky cards** (`industries/IndustryChallengeStack.tsx`, Server Component). **Copied** the AboutValues sticky mechanics (not extracted — inner layout differs): per-index `top = 80 + i*56`, `zIndex = (i+1)*10`, `rounded-t-lg`; **handles 2–5 challenges**. Cards alternate `bg-sognos-navy-dark`/`bg-sognos-navy`, number `01/02` (`text-white/30`), title `text-4xl lg:text-6xl`, body. Section eyebrow once above the stack.
- **3. How Sognos helps → interactive tabs** (`industries/IndustryHowTabs.tsx`, `"use client"`). Horizontal `role="tablist"` scroll-row (`scrollbar-hide`, `border-b border-sognos-line`); active tab `text-sognos-blue-accent` + **spring `layoutId="how-tab-underline"` underline** (30/300); content pane **`AnimatePresence mode="wait"` opacity crossfade 0.25s**; `lg:grid-cols-2` = white text card + **empty bordered `min-h-[220px]` placeholder** (no lorem/filler). Section `bg-gray-200/70`; title restyled to `text-sognos-heading` (not blue — tabs carry the accent). Mobile = the same scroll-row (Knowledge-Hub pills treatment).
- **4. What we deploy → product feature blocks.** 2-col (`lg:grid-cols-2 gap-3 lg:gap-4`) `rounded-lg border border-sognos-line bg-white p-8 lg:p-10 hover:border-sognos-blue-accent/40` cards: full-colour logo (`/logos/sognos-{care,roster}-logo-color.svg`) + name + tagline + `PRODUCTS[].description` + "Explore {product} →". Energy special case: SognosCare slot → Microsoft Dynamics 365 card (Microsoft icon + tagline).
- **5. Customer stories** (`industries/IndustryCustomerStories.tsx`, `"use client"`). Filters `ALL_STORIES` by `industry === meta.name`, renders `ProductCustomerStories` (Shape-3 carousel) with the filtered set, **hides when none** (client wrapper so the `ALL_STORIES` value from the "use client" module resolves).
- **6. CTA band** — the global `<CTABand>` (marketing layout) is unchanged; sits below section 5.
- **Data gaps (reported, not filled — no AI filler):** (a) no per-product-per-industry bullets exist — `INDUSTRIES[].features` is industry-wide, not split by product; product cards use the product `description` instead. (b) `ALL_STORIES.industry` still labels Auckland `"Transport"` (vs the normalized `"Facilities Management"`), so Facilities Management + Industrial Services match no story and hide section 5 until the taxonomy is reconciled. (c) The tab content pane's right column is a deliberate empty placeholder awaiting a decision (screenshot / illustration / stat block / related-product link).
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. HSC: white hero + eyebrow link + `lg:text-7xl` h1 + demo button; 3 stacking cards alternating navy tones + `01/02/03`; `role="tablist"` + 3 tabs + placeholder; 2 product cards (care + roster colour logos, hover border); customer-stories `id="stories"` present; old `bg-gradient-hero` gone. Facilities: 6 tabs, intro rendered, 1 product (roster), customer-stories hidden.
- **Files:** `app/(marketing)/industries/[slug]/page.tsx`, `components/layout/sections/industries/IndustryChallengeStack.tsx` (new), `IndustryHowTabs.tsx` (new), `IndustryCustomerStories.tsx` (new).

## 2026-07-06 — Customer story page: Amigo-style hero pull-quote + rail redesign + callout blocks

Refactor of `app/(marketing)/customer-stories/[slug]/page.tsx` + rail components + Sanity, modelled on amigo.ai's Eucalyptus case study (layout only; Sognos keeps its navy hero + type scale).

- **Hero refactor.** Removed `story.description`, `story.heroImage` (both fully deleted, not hidden), the 3-col image/meta grid, and the `Industry/State/Size` stats block. New two-up `lg:grid-cols-[16rem_1fr]`: **left rail** — hero-only vertical line (`border-l border-white/20 pl-6`, stretches full hero-content height via grid stretch, does **not** extend into the body) with `Case Study` eyebrow (`text-white/60`) + Industry value (`text-white/80`); **right** — `<h1>` (unchanged type scale) + **pull-quote** (`<blockquote>` `text-2xl md:text-3xl lg:text-4xl`, smart-quote glyphs `&ldquo;/&rdquo;`) with a `<figcaption>` attribution row: `companyLogo` (`brightness-0 invert`) + `quoteAuthor` / `quoteRole` (via existing `parseQuoteAuthor`). Back link kept at top; `HeroScrollFade` + spacing unchanged.
- **Body nav rail redesign (`StoryArticleNav.tsx`).** Added a full-height vertical rail line (`absolute inset-y-0 left-0 w-px bg-sognos-line`, sibling of the items). Active indicator: bullet dot → **thin rectangle marker** (`h-6 w-0.5 bg-sognos-blue-accent`, `layoutId="article-rail-marker"`, spring `damping:30/stiffness:300`) flush on the line, springs between rows. Items `pl-4` to clear the line/marker; active/inactive text colours unchanged. Sticky (`lg:sticky lg:top-[100px]` on the col-1 wrapper) unchanged — locks the nav+line+marker as one unit; standard `position:sticky`, no code change needed.
- **Meta rail** (`StoryMetaRail`, call-site only — no component change): now passed `state` / `size` / `product` (Industry moved to the hero rail; Customer dropped). Renders State / Size / Product / Download / Share.
- **End-of-body quote card — removed** (the pull-quote replaces it). Deleted now-unused `QUOTE_CARD_BG`, `quoteCardBg`, `brandBg`, `category`, `stats`, and the `BRAND_BG` import.
- **Portable Text `calloutBlock`.** New Sanity block type on `customerStory.body` (`sanity/schemas/customerStory.ts`): `text` (required text) + `color` radio enum (orange/teal/blue/purple/coral). Renderer registered at `portableComponents.types.calloutBlock` — full-width `w-full rounded-lg p-8 lg:p-10`, `font-heading text-xl lg:text-2xl text-white`. **Colour map:** `orange→bg-orange-600`, `teal→bg-teal-600`, `blue→bg-sognos-blue-accent`, `purple→bg-purple-600`, `coral→bg-rose-500`; **fallback `bg-sognos-blue-accent`** when `color` is null/unmapped. No query change — `STORY_BY_SLUG_QUERY.body` is an unfiltered projection so the block passes through. (Studio needs the schema deployed for editors to author callouts — `postbuild` deploys when `SANITY_AUTH_TOKEN` is set; Preview skips it.)
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. On `/customer-stories/flourish-australia`: hero left rail + line + Industry + pull-quote + inverted logo present; old hero image (0) + description (0) gone; nav vertical line + rectangle marker present, old bullet gone (0); quote card gone (0).
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/layout/sections/customer-stories/StoryArticleNav.tsx`, `sanity/schemas/customerStory.ts`.

## 2026-07-06 — Navy token split + homepage Hero heading treatment

- **`--sognos-navy` `#060e28` → `#152248`** (`app/tokens.css`). It had drifted to the same value as `--sognos-navy-dark` (`#060e28`); restored to the distinct medium navy (`#152248`) — which is what DESIGN_MIGRATION_STATE's colour table already documented. Two-tone navy is back: **`navy` = `#152248`** (medium — section bands like `bg-sognos-navy`) vs **`navy-dark` = `#060e28`** (near-black — deepest surfaces). Token-value change cascades with no rebuild; touches every `bg-sognos-navy`/`text-sognos-navy` surface (SolutionsSection, CTABand section, About Values Vision card, etc.).
- **Homepage Hero heading** (`components/layout/sections/Hero.tsx`): alignment `text-center` → **`text-left lg:text-center`** (left on mobile, centred desktop); `<h1>` scale `text-6xl leading-[1.02] -tracking-[1.2px]` → **`text-5xl tracking-tight text-balance lg:text-6xl`** (responsive size, standard tight tracking, dropped the custom line-height).
- **Files:** `app/tokens.css`, `components/layout/sections/Hero.tsx`.

## 2026-07-06 — ProductCustomerStories: Shape 3 center-focus slider + Shape 2 deprecation

- **`ProductCustomerStories` slider → SLIDER_PATTERN Shape 3 (center-focus peek).** Replaced the trailing-peek mechanics: **removed** the `paddingLeft: max(1.5rem, calc(...))` gutter-inset inline style, the `aria-hidden` trailing spacer div, and the per-slide `mr-6 sm:mr-8` margins. Slides are now `min-w-0 flex-[0_0_100%] pl-3 lg:flex-[0_0_50%] lg:pl-4` on a `flex -ml-3 lg:-ml-4` container (Embla padding-gutter convention, `gap-3 lg:gap-4` = 12/16px). With the **unchanged** Embla config (`{loop:false, align:"center", containScroll:"trimSnaps"}`), `basis-1/2` on `lg` + center-align now renders the active card centred with **both** the previous (left) and next (right) card peeking (~half each). Below `lg`: `basis-full`, no peek (matches the shadcn `lg:basis-1/2` reference's default responsiveness — noted; no mobile peek added). Modelled on shadcn's `<Carousel><CarouselItem lg:basis-1/2>` layout math but on raw Embla (site convention), not shadcn wrappers.
- **Unchanged:** `StoryCard` visual design, `AUTOPLAY_MS=10000`, Autoplay `stopOnInteraction`, dots (active `w-4 h-2 bg-sognos-navy-dark`), arrow chrome (`size-12 rounded-full` sliding-fill), section header, `showChrome` single-story fallback, `ALL_STORIES`/`SeeMoreLink`/`BRAND_BG`, and all `selectedIndex`/`canPrev`/`canNext`/`scrollPrev`/`scrollNext`/`scrollTo` + `on("select"|"reInit")` wiring.
- **Docs:** `SLIDER_PATTERN.md` gains **Shape 3** (center-focus peek, `ProductCustomerStories` canonical) and **deprecates Shape 2** (trailing-peek; only `TeamSection` mobile still uses it, migratable separately); "When to apply" now defaults new sliders to Shape 3 or Shape 1.
- **Card-proportion flag (reported, not fixed per prompt):** at `basis-1/2` each card is ~half its former width; the `StoryCard` `md:grid-cols-12` split + quote scaling to `lg:text-3xl` (`min-h-[360px] md:min-h-[460px]`) will likely wrap tighter / feel cramped at the narrower width — worth a follow-up styling pass (e.g. drop the quote to `lg:text-2xl` and/or adjust the internal grid). Not touched here.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. On `/products/sognoscare`: new `flex -ml-3 lg:-ml-4` container + `flex-[0_0_100%] pl-3 lg:flex-[0_0_50%] lg:pl-4` slides present, old `paddingLeft:max(...)` / `w-[calc(100vw-3rem)] lg:w-[calc(100vw-12rem)]` / trailing spacer all gone (0), dots + arrow chrome intact.
- **Files:** `components/layout/sections/ProductCustomerStories.tsx`, `docs/SLIDER_PATTERN.md`.

## 2026-07-06 — CTABand: dot-grid background (Deck-style)

- Added the decorative dot-grid `/images/cta-bg.svg` (1900×200, 2500 white dots + near-black backing + gradient) to `components/layout/sections/CTABand.tsx`, anchored to the bottom of the navy section (`absolute inset-x-0 bottom-0 w-full`, `pointer-events-none`, `aria-hidden`, decorative `<img alt="">`). **`mix-blend-screen`** drops the SVG's `#0D100F` backing (screen against navy ≈ navy) so only the white dots read over `bg-sognos-navy` — no harsh dark band. Section made `overflow-hidden`; content wrapper `relative z-10` to sit above the texture. Matches the Deck.co reference's textured dark footer.
- **Verified:** `tsc` clean; browser-confirmed the dots fade in along the bottom of the navy section (below the blue Book-a-Demo card, above the footer), full-width, `mix-blend-mode: screen` applied; no console errors.
- **Files:** `components/layout/sections/CTABand.tsx`.

## 2026-07-06 — TeamSection: restore active-name marker (offset from rail)

- **Re-added the `layoutId` active-name marker** (dropped in the prior build). A small `h-2 w-2 bg-sognos-blue-accent` sharp square rendered only in the active row's button (`{isActive && <motion.span layoutId="team-nav-marker" transition={{ type:"spring", damping:30, stiffness:300 }} />}`) — springs between rows on active change, same pattern as `StoryArticleNav`.
- **Positioned to avoid the earlier clash:** the previous version sat on the rail (`left-0`, `-translate-x-[3.5px]`) and blended into the fill. This one is offset to **`left-3` (12px)** — into the gap between the 2px rail (`left-0`) and the name (`pl-8` = 32px), vertically centred (`top-1/2 -translate-y-1/2`) — so it coexists with the per-item blue fill and blue active text without overlapping the rail. `aria-hidden` (decorative; `aria-current` on the button already conveys active).
- **Kept unchanged:** per-item eased rail, autoplay, 0.3s crossfade, mobile conditional-render slider.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. SSR: marker present on exactly the active row (1 instance), inside the `aria-current="true"` button. **Runtime click confirmed** (desktop viewport 1457px): marker at row 0 → click Miloni → row 2 → click Kunal → row 0. Autoplay-tick moves it via the same `setActive`-driven `{isActive && …}` render.
- **Files:** `components/layout/sections/TeamSection.tsx`.

## 2026-07-06 — TeamSection: corrected per-item eased rail + conditional-render mobile

Brings `TeamSection` in line with `docs/SLIDER_PATTERN.md` Shape 1 (supersedes the earlier continuous-cumulative-rail build).

- **Progress rail — now per-item eased, not cumulative.** The rAF loop tracks elapsed **within the current item's 10s window** (`itemStartRef`), advancing `active = (i+1)%len` when it passes `AUTOPLAY_MS` and resetting `itemStartRef` (autoplay derived from the same loop). Each frame maps `p = elapsed/AUTOPLAY_MS` → `easeOutCubic` (`1-(1-p)³`, fast early / decelerating) → `barRef.style.transform = translateY(-(1-eased)*100%)`. Structure now matches the Diffblue DOM: one full-height `w-[2px] overflow-hidden bg-sognos-line` track + one `absolute inset-0 bg-sognos-blue-accent` overlay, reset to `translateY(-100%)` at each item start and easing to `0%`. Manual `select(i)` sets `itemStartRef=null` → next frame restarts the window (rail snaps to "just started" **and** the autoplay interval resets from that item — kept the Sognos reset-on-click deviation).
- **`layoutId` square marker — dropped (reported).** Re-evaluated against the corrected full-height fill: a same-blue square at the active name blends into the rail as it fills past that row, so it clashed. The blue active-name text is the sole active indicator.
- **Card crossfade — 300ms `ease`.** `AnimatePresence mode="wait"`, `opacity 0→1`, `transition = { duration: 0.3, ease: [0.25,0.1,0.25,1] }` (CSS-default `ease`, was 0.25s/custom).
- **Mobile — conditional render (DOM removal), not CSS-hidden.** New `useIsMobile()` (`matchMedia("(max-width: 1023.98px)")`) drives a hard swap: `isMobile === true ? <MobileLeadership/> : <DesktopLeadership/>`. Pre-mount/SSR → desktop (team names in SSR HTML for SEO; verified the mobile slider is absent from SSR DOM). Desktop nav+rAF and the mobile Embla live in separate child components, so the inactive layout is fully unmounted (nav removed from DOM on mobile; no rAF running on mobile; no Embla on desktop).
- **Mobile slider** = SLIDER_PATTERN Shape 2 / `ProductCustomerStories` convention: `useEmblaCarousel({ loop:false, align:"start", containScroll:"trimSnaps" }, [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction:true })])`, `paddingLeft:1.5rem` + trailing spacer, cards `basis-[70%] max-w-[380px] mr-6` → slidesPerView ≈1.43, peek ≈30% (in the 28–44% spec band), `mr-6` = 24px gutter. Image (`aspect-[4/5]`) + name + role + LinkedIn.
- **Section `overflow-hidden` removed** — it was breaking the desktop sticky nav (overflow-hidden ancestor kills `position:sticky`). Overflow is now contained by the mobile Embla viewport's own `overflow-hidden`, which only mounts on mobile (no sticky there).
- **Kept:** `TEAM`, `LinkedInIcon`, 10s autoplay, first-paragraph + `line-clamp-4` bio, white section / title / no eyebrow.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. SSR-confirmed: rail track + `translateY(-100%)` overlay present, cumulative `scaleY` gone, section not `overflow-hidden`, sticky nav present, mobile slider absent from SSR (conditional render), Kunal active/blue, bio clamp. **Live rail frame-sampling not possible** in the backgrounded automation tab (browser pauses `requestAnimationFrame`); the easing is deterministic and standard-rAF.
- **Files:** `components/layout/sections/TeamSection.tsx`.

## 2026-07-06 — Docs: shared slider/carousel pattern reference

- **New `docs/SLIDER_PATTERN.md`** — codifies one reusable slider pattern so every card slider defaults to the same values (prevents prompt-by-prompt drift). Shared values: 10s autoplay, **no** hover-pause, **reset-on-interaction** (deliberate Sognos deviation from Diffblue), 300ms/`ease` transitions, loop. **Shape 1 (nav rail)** — sticky nav + crossfading pane; **per-item eased rail** (resets to ~-96/-100% and eases to 0% per active item, `translateY` on a same-height bar in an `overflow-hidden` wrapper, `bg-sognos-line` track / `bg-sognos-blue-accent` overlay); hard-swaps to Shape 2 below `lg` (conditional render, nav removed from DOM). **Shape 2 (peek carousel)** — `slide`, ~1.5 slidesPerView, 28–44% peek (proportional, not hardcoded px), 24px / `gap-3 lg:gap-4` gutter, dots (`ProductCustomerStories` canonical: active `w-4 h-2 bg-sognos-navy-dark`, inactive `bg-sognos-navy-dark/25`). Canonical examples: `ProductCustomerStories` (Shape 2, already conformant), `TeamSection` (Shape 1 desktop / Shape 2 mobile). **Sync note in-doc:** `TeamSection`'s current rail is continuous-cumulative; a later prompt will bring it to the per-item eased Shape 1 spec — doc is source of truth until then.
- Linked from `docs/DESIGN_MIGRATION_STATE.md` top-level "Related docs" pointer.
- **Docs-only** — no component code touched (`ProductCustomerStories.tsx`/`TeamSection.tsx` untouched per task).
- **Files:** `docs/SLIDER_PATTERN.md` (new), `docs/DESIGN_MIGRATION_STATE.md`, `docs/CHANGELOG.md`.

## 2026-07-06 — TeamSection: continuous progress rail, card crossfade, mobile peek slider

Follow-up fixes to the Leadership section (`components/layout/sections/TeamSection.tsx`).

- **Progress rail rebuilt — one continuous, time-driven bar** (was independent per-item `scaleY` segments that reset/snapped). Now a single full-height `w-[2px] bg-sognos-line` track (spans the whole nav) with one `origin-top bg-sognos-blue-accent` overlay. A `requestAnimationFrame` loop computes `progress = (anchorProgress + elapsed / (AUTOPLAY_MS × TEAM.length))` wrapped to `[0,1)` and sets `barRef.current.style.transform = scaleY(progress)` **imperatively every frame** (no per-frame React re-render). `active` index is _derived_ (`Math.floor(progress × TEAM.length)`) and only `setActive`d when it changes — so the old `setInterval` autoplay is gone; the rAF loop is the single time source. Reveal is smooth top→bottom across all leaders, loops to 0 at the first name. Manual `select(i)` sets `anchorProgress = i/len` and nulls `anchorTime` (next frame restarts elapsed at 0) → jumps the fill to that item and restarts. Matches the Diffblue `translateY(-X%)`-continuous-rail reference (used `scaleY`/origin-top as the cleaner equivalent).
- **`layoutId` square marker dropped** — with the continuous rail reading correctly, the springing square was redundant (the prior build had flagged it as one active-cue too many). Cues now = rail fill + blue active name.
- **Card crossfade added** — the desktop card content is wrapped in `AnimatePresence mode="wait"` with `opacity 0→1` enter/exit, **0.25s** each, keyed on `member.name` (was a hard swap).
- **Mobile peek slider added** — below `lg`, the nav+card is replaced by a full-section-width Embla carousel reusing the `ProductCustomerStories` convention: `useEmblaCarousel({ loop:false, align:"start", containScroll:"trimSnaps" }, [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction:true })])`, `paddingLeft:1.5rem` gutter + trailing `1.5rem` spacer so the last card ends flush; cards `basis-[80%] sm:basis-[55%] max-w-[360px]` with `mr-4` so the next card peeks. Each card = image (`aspect-[4/5]`) + name + role + LinkedIn icon. **Breakpoint: `lg`** (not `md`) — the desktop card's inner `md:grid-cols-2` (photo + text) needs the width; at `md` it'd be cramped, so the slider covers `< lg` and nav+card is `lg+`.
- **Kept:** `TEAM` data, `LinkedInIcon`, `AUTOPLAY_MS = 10000`, first-paragraph + `line-clamp-4` bio, white section / title / no eyebrow.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. Confirmed 1 continuous rail track + 1 `scaleY` overlay (initial `scaleY(0)`), zero old per-item fills, zero `layoutId` marker, desktop `hidden lg:grid`, mobile `lg:hidden` full-width slider with 3 `basis-[80%]` cards + gutter spacer, `AnimatePresence` card, `line-clamp-4` bio. **Runtime rail advancement could not be frame-sampled** — the automation browser tab runs backgrounded, where the browser pauses `requestAnimationFrame` (a rAF probe timed out while `setTimeout` still resolved and the bar held `scaleY(0)`); the fill is deterministic and standard-rAF, verified structurally.
- **Files:** `components/layout/sections/TeamSection.tsx`.

## 2026-07-06 — About page: Leadership section → nav + auto-playing profile card

Full rewrite of `components/layout/sections/TeamSection.tsx` (replaces the 3-card grid + bottom-drawer modal).

- **Section:** `bg-sognos-navy` → **white**; eyebrow pill ("● Leadership") removed; title "Senior Leadership Team" → **"Meet our senior leadership team"** (sole heading).
- **Layout:** `grid lg:grid-cols-[300px_1fr]` — nav left (sticky `lg:top-[120px]`), active-leader card right. Modal/drawer, backdrop, `active` modal state, and the card grid all deleted.
- **Nav (col 1):** vertical name list; each row has a `w-[3px] bg-sognos-line` rail segment. **Active segment fills** via a `motion.span` `scaleY 0→1`, `ease:"linear"`, `duration: AUTOPLAY_MS/1000` (10s) — **time-driven, not scroll-driven**; keyed by a `cycle` counter so it remounts and restarts on every advance/click. A `layoutId="team-nav-marker"` square springs to the active name (StoryArticleNav bullet pattern). Active name `text-sognos-blue-accent`, inactive grey, uppercase `tracking-[0.15em]`.
- **Autoplay:** local `setInterval` at `AUTOPLAY_MS = 10000` (no embla — this is state-driven active-index, not a scroll carousel). Advances `active = (i+1) % TEAM.length` + bumps `cycle`. Manual `select(i)` sets active, bumps `cycle`, and calls `startTimer()` to reset the 10s window (stopOnInteraction-equivalent).
- **Card (col 2):** `border border-sognos-line rounded-lg`, inner `md:grid-cols-2` — col 1 `flex justify-between` (LinkedIn icon top-left → `member.linkedin`; name + role + bio pinned bottom), col 2 photo `fill object-cover` full-height (`min-h-[340px]` both sides so the row equalises). Keyed `motion.div` opacity fade on member change.
- **Bio handling (flagged):** the `TEAM[].bio` entries are long/multi-paragraph; the card shows the **first paragraph only** (`bio.split("\\n\\n")[0]`) with **`line-clamp-4`** so card height stays consistent across leaders. No copy edited.
- **Nav-fill vs reference (flagged):** the Diffblue reference implies a continuous multi-segment line; per the prompt I used the **simpler independent-per-item segment** approach (each active segment fills on its own), not one continuous line.
- **Kept:** `TEAM` data + `LinkedInIcon` unchanged.
- **Verified (DOM, no screenshots per task):** `npm run build` green, `tsc` clean. Confirmed white section, title, no eyebrow pill, 3 nav names (Kunal active blue / others grey), `origin-top bg-sognos-blue-accent` fill, `layoutId` marker, 3× `sognos-line` rail tracks, LinkedIn hrefs, `line-clamp-4` bio, modal fully removed.
- **Files:** `components/layout/sections/TeamSection.tsx`.

## 2026-07-05 — About page: "Our Values" stacking cards → 2-col restructure

- **`components/layout/sections/AboutValues.tsx`.** Removed the section-level `<h2>Our Values</h2>` block (scrolled away before the cards pinned). `CARDS` data: per-card `eyebrow` ("Our Mission"/"Our Vision") → shared `eyebrow: "Our Values"` + new `title` ("Mission"/"Vision"); `number` ("01"/"02") field dropped. Each card's inner layout → equal-width `lg:grid-cols-2` (About Sognos pattern), vertically centred within the existing `min-h-[520px]`/`lg:min-h-[56vh]`: col 1 = eyebrow (`text-xs uppercase tracking-widest text-white/70`) + title (`font-heading text-3xl md:text-4xl lg:text-5xl text-white`); col 2 = the `statement` copy as body text (`text-base leading-relaxed text-white/80`, down from the old `text-3xl…lg:text-5xl` statement size). Number badge removed from the top row. Sticky/stacking mechanics (`sticky`, `top`, `zIndex`, min-heights), per-card `bg`, and `statement` copy unchanged.
- **Verified:** `tsc` clean, `npm run build` green; DOM-confirmed (h2 removed, eyebrow "Our Values" ×2, titles Mission/Vision, `lg:grid-cols-2` ×2 cards, no number badges).
- **Files:** `components/layout/sections/AboutValues.tsx`.

## 2026-07-05 — About page: hero CTA reposition + "Our Story" 2-col restructure

Both in `app/(marketing)/company/about/page.tsx`.

- **Hero — "Explore Careers" CTA repositioned.** Was stacked below the intro paragraph inside a single `lg:col-span-7` column. Now the eyebrow + `h1` + intro stay in the left `lg:col-span-7` column and the CTA moves to a right `lg:col-span-5` column, **right-aligned** (`flex lg:justify-end`) and **bottom-aligned with the intro paragraph** (grid `items-center` → `items-end`). Button styling (navy pill, hover to blue-accent) and `AboutHeroImage` below are unchanged.
- **"About Sognos" section → equal-width 2-col ("Our Story" pattern).** Grid `lg:grid-cols-[200px_1fr]` → **`lg:grid-cols-2`**. Column 1 = eyebrow (**"About Sognos" → "Our Story"**) + the `h2` (title moved up from column 2, same copy/scale, `mt-6` under the eyebrow). Column 2 = the four body paragraphs + `<AboutStats />` (paragraphs lost their `mt-8` so they top-align with the eyebrow across the gutter — matches the Pallet "Our Story" reference). Body copy + `AboutStats` component unchanged. Stats read fine at half-width (3 stats + `border-r` dividers, room to spare — not cramped).
- **Verified:** `npm run build` green; `tsc --noEmit` clean; browser-confirmed CTA bottom-aligned right in the hero, and the 50/50 "Our Story" split with stats comfortable in the right column.
- **Files:** `app/(marketing)/company/about/page.tsx`.

## 2026-07-05 — Knowledge Hub archive: "Featured" pill + three-way pill-driven header/grid

Extends the same-day header/featured entry below. All in `components/layout/sections/KnowledgeHubArchive.tsx`.

- **New "Featured" pill, first in order** (Featured → All Articles → Milestone → News → Events → Webinar → Insights). Featured + All Articles are special pills (no count badge); category pills keep counts. Extracted a `pillClass(isActive)` helper so all three pill types share one styling recipe.
- **Three-way state model.** `activeCategory: string | null` → `type PillSelection = "featured" | "all" | (typeof CATEGORIES)[number]` (`null` could no longer mean both "all" and "featured"). **Default `"featured"`** (assumption — one-line change if wrong). `initialCategory` prop resolves through `resolveSelection()`: `"featured"` / `"all"` / a valid category → itself, anything else → `"featured"`. Parent page (`knowledge-hub/page.tsx`) still passes `initialCategory={category ?? null}` from `searchParams.category` — unchanged, now three-way-aware.
- **Behavior per selection:**
  - **Featured** — featured block shown; header shows page `title` + `description`; grid = `articles.slice(1)` (all-but-featured, unfiltered); "All articles" heading shown.
  - **All Articles** — featured block hidden; header title = "All Articles", description hidden; grid = full `articles` (unfiltered); "All articles" heading hidden.
  - **A category** — featured block hidden; header title = the category label, description hidden; grid = full `articles` filtered by category; "All articles" heading hidden.
- **Header layout revisions (per follow-up feedback):** pills moved **below** the title/description (reverted the same-row layout — pills no longer `lg:justify-end`, now `mt-10` under the copy). When the description is hidden (non-featured states) an **eyebrow "Knowledge Hub"** (`inline-block text-xs font-semibold uppercase tracking-tight text-sognos-muted`) renders above the title. The title zone is a `flex flex-col lg:min-h-[160px]` container so the pills row **never shifts position** between states; in the non-featured states `lg:justify-end` bottom-aligns the eyebrow+title (title moves down, eyebrow above it) to fill the reserved height.
- **Unchanged:** pill styling (active/inactive colours, count badges, mobile horizontal-scroll slider), `ArticleCard`, featured article internal layout, Case Study dark band.
- **Verified:** `npm run build` green; `tsc --noEmit` clean. SSR-confirmed all three states (`/knowledge-hub`, `?category=all`, `?category=News`): correct title, eyebrow presence, description hidden (class-signature check), `lg:justify-end` + `lg:min-h-[160px]` present.
- **Files:** `components/layout/sections/KnowledgeHubArchive.tsx`, `app/(marketing)/knowledge-hub/page.tsx`.

## 2026-07-05 — Knowledge Hub archive: title/pills same row + featured article alignment

- **Title + category pills now share one row (`components/layout/sections/KnowledgeHubArchive.tsx` + `app/(marketing)/knowledge-hub/page.tsx`).** Was: parent page rendered the "Knowledge Hub" `<h1>` + description in its own hero `<section>`, pills sat in a full-width row below inside the archive. Now: the title/description block (left) and the pills (right) sit in one `flex flex-col gap-y-8 lg:flex-row lg:items-end lg:justify-between` row. **Approach — props (not lifting pills up):** the pills own `activeCategory` state + counts inside the client `KnowledgeHubArchive`, so title/description are passed _down_ as new `title: string` / `description?: string` props (same prop-drilling pattern the page already uses for `articles`/`initialCategory`) and rendered beside the pills. Parent page's hero `<section>` removed; header section now owns the navbar-clearance padding (`pt-32 lg:pt-40 pb-10`). Pills markup/behaviour unchanged (active state, counts, mobile `-mx-6 overflow-x-auto` scroll slider, `md:flex-wrap`); added `lg:justify-end` so they right-align. `<h1>` keeps the exact hero type scale (`text-5xl md:text-6xl lg:text-7xl`).
- **Featured article — top-align + bottom-pinned meta, author removed.** Outer `Link` grid `items-center` → `items-start` (image + meta both start at top). Meta column restructured to `flex h-full flex-col justify-between`: category/title/excerpt grouped in a top `<div>`, `<ArticleMeta>` (date — read time) pinned to the **bottom**, level with the bottom of the `aspect-[16/10]` image. The `{featured.author && …}` avatar-initial + name block **deleted entirely**. `ArticleMeta` content/format untouched — only its position changed.
- **Unchanged:** category filter logic/state (`activeCategory`, counts, `CATEGORIES`), `ArticleCard` grid component, "All articles" 4-up grid, Case Study dark band.
- **Verified:** `npm run build` green; `tsc --noEmit` clean; browser-confirmed the one-row header (title left / pills right, right-aligned, counts + active pill intact) and the featured meta (category/title/excerpt top, date bottom-aligned with image, no author).
- **Files:** `components/layout/sections/KnowledgeHubArchive.tsx`, `app/(marketing)/knowledge-hub/page.tsx`.

## 2026-07-05 — Customer story body: "What to read next", quote-card move, meta-rail trim, motion swap

Builds on the same-day scroll-spy nav entry (below). All changes in `app/(marketing)/customer-stories/[slug]/page.tsx` unless noted.

- **"What to read next" 3-up header.** Replaced the `● Customer Stories` eyebrow line with the `ProductCustomerStories` heading-block pattern: `flex items-end justify-between` row with an `<h2>` ("What to read next", `font-heading text-3xl md:text-4xl font-normal tracking-tight text-sognos-heading text-balance`) + `SeeMoreLink` (right, `max-sm:hidden`). Section bg `bg-gray-200/70` → **`bg-gray-100`**; **dropped** the `border-t border-gray-200` (the white→gray-100 change already separates it, and the reference section has no top border). Card grid mapping unchanged.
- **`SeeMoreLink` reuse — exported.** Was a local fn in `ProductCustomerStories.tsx`; now `export function SeeMoreLink` and imported here. Follows the same convention as the `ArticleCard` reuse (exported from the client `KnowledgeHubArchive.tsx`, imported into this server page) rather than extracting to a new shared module.
- **Quote card — moved + logo removed.** Relocated from above the prose to the **end of the content column** (after `PortableText`). Removed the `companyLogoUrl` `<Image>` and its now-unused `const companyLogoUrl`. Quote text/author/role unchanged; author/role block now stands alone (no `justify-between` logo row).
- **`StoryMetaRail` trim + Customer field (`components/layout/sections/customer-stories/StoryMetaRail.tsx`).** Call site dropped `company`, `description`, `product`; **added `customer={story.company}`**. Component: `company` made optional and the heading/description/leading-divider block guarded behind `{(company || description) && …}` so the rail degrades cleanly (no stray leading hairline). `meta` array now leads with `{ label: "Customer", value: customer }` above Industry/State/Size (Product still declared, filtered out when absent). Rail is now visually lean: Customer → Industry → State → Size → Download → Share.
- **Dividers → `bg-sognos-line`.** New hairline added between the article nav and the meta rail (`<div className="my-6 h-px bg-sognos-line" />`); `StoryMetaRail`'s three internal dividers migrated `bg-gray-200` → `bg-sognos-line` for consistency. The col-1 nav/meta separator moved from a `border-b` on the nav wrapper to this explicit divider.
- **Font sizes.** Article nav items `text-sm` (kept); nav header, meta labels/values, and "Share" label left at their original `text-xs`/`text-sm`. "Share" label recoloured `text-sognos-body/40` → `text-sognos-muted`.
- **Motion swap.** Removed Framer Motion from `StoryMetaRail` — `motion.aside` → plain `<aside>`, dropped `"use client"` + `useReducedMotion` (now a pure Server Component, no client JS). Added the reveal to the **content column** instead: wrapped prose + quote card in `<ScrollReveal y={24} className="min-w-0 md:col-span-2">` (site-canonical `components/ui/ScrollReveal` — fade + 24px slide-up, `whileInView once`).
- **Verified:** `npm run build` green; `tsc --noEmit` clean. Live DOM confirmed the new header, gray-100 bg, relocated quote card (no logo), and the Customer meta row.
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/layout/sections/customer-stories/StoryMetaRail.tsx`, `components/layout/sections/customer-stories/StoryArticleNav.tsx`, `components/layout/sections/ProductCustomerStories.tsx` (SeeMoreLink export).

## 2026-07-05 — Customer story scroll-spy article nav + Navbar hide/peek restore

- **Customer story — scroll-spy "In This Article" nav (`app/(marketing)/customer-stories/[slug]/page.tsx` + new `components/layout/sections/customer-stories/StoryArticleNav.tsx`).** Column 1 of the body grid now stacks a sticky article-heading nav above `StoryMetaRail`. Structure/behaviour reuse the Solutions/`ProductFeaturesScroll` rail verbatim — `getDocTop()` checkpoint at `scrollY + 140`, rAF-throttled, `motion.span layoutId="article-rail-bullet"` spring bullet (unique id so it never fights the Solutions rail's `"solutions-rail-bullet"`), `text-sognos-blue-accent` active state. Nav label: **"In This Article"**.
  - **Heading extraction — server pre-pass** (chosen over client DOM query: deterministic, and lets nav + rendered `h2` derive the exact same slug id from the same helper). `extractHeadings(story.body)` filters Portable Text `block`s with `style === "h2"`, joins child spans to plain text, `slugify()`s to an id. The `portableComponents.block.h2` serializer now attaches `id={slugify(blockPlainText(value))}` + `scroll-mt-28 md:scroll-mt-32` so the same ids exist on the rendered headings for scroll-spy + smooth-scroll targeting. Click → `scrollTo` with `-112` offset (clears the sticky navbar).
  - **Column 1 layout** — both nav and meta rail wrapped in one `lg:sticky lg:top-[100px] lg:self-start` container so the two never fight over sticky positioning (each component keeps its own markup; their inner stickies go inert inside the sticky parent). A `lg:border-b lg:border-gray-200 lg:pb-8 lg:mb-10` separator divides the nav from the meta rail. Nav + separator are `hidden lg:block` (mobile shows meta rail only — no scroll-spy needed on a single-column mobile read). Reads clean, not cluttered — the border + spacing give clear separation.
  - **Unchanged:** `StoryMetaRail` (content + behaviour), hero, quote card, prose, "Customer Stories" 3-up.
- **Navbar hide-on-scroll / peek-on-scroll-up restored (`components/layout/Navbar.tsx`).** The three-state scroll model (top → hidden → peek) had been overwritten back to always-visible. Re-applied: `HIDE_AFTER = 80`, `DELTA_MIN = 6`, `headerHidden` state, rAF-throttled `scrollY`-direction detection (down past `HIDE_AFTER` hides via `-translate-y-full`, up peeks), `will-change-transform` + `transition-[transform,background-color,border-color]`. Guard: never hides while `openMenu`/`mobileOpen` (both a ref check in the handler and a reactive `useEffect` that reveals on open).
- **Verified:** `npm run build` green; `tsc` clean. Live DOM confirmed matching `h2` ids (`the-situation`/`the-solution`/`the-impact`/`looking-ahead`) and nav labels; browser scroll-through confirmed the active bullet advances and click smooth-scrolls to the heading; navbar peek confirmed on scroll-up.
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/layout/sections/customer-stories/StoryArticleNav.tsx` (new), `components/layout/Navbar.tsx`.

## 2026-07-05 — Customer story single page: Diffblue-style header refactor + Careers link in Navbar & Footer

- **Customer story hero — full layout refactor (`app/(marketing)/customer-stories/[slug]/page.tsx`).** Replaced the sidebar-heavy `aside + main col-span-2` block with a stacked → 3-col shape mirroring the Diffblue "Goldman Sachs" reference (layout only; navy bg + white text preserved):
  1. **Back link** — "Back to Customer Stories" retained with `ArrowLeft` + hover slide.
  2. **Category label** — was `<span border rounded-lg bg-white/10 px-2 py-1>` pill, now a simplified small-caps line (`text-xs font-semibold uppercase tracking-widest text-white/50`). Same content ("Case Study"), no filled pill.
  3. **`<h1>`** — unchanged type scale (`text-3xl lg:text-5xl font-medium leading-tight tracking-tight text-white`).
  4. **3-col grid below title** — `lg:grid-cols-3 lg:gap-16 xl:gap-20`:
     - **Meta col (`lg:col-span-1`)** — `story.description` top; `Industry / State / Size` bottom-anchored via `lg:mt-auto lg:pt-16`. Stats stack in a `<dl>` with hairline `border-b border-white/10`, label left / value right per row. Top hairline on the `<dl>` itself.
     - **Image col (`lg:col-span-2`)** — `story.heroImage` in `aspect-[16/10] rounded-lg overflow-hidden bg-white/5` fallback, `next/image` `fill priority sizes="(max-width: 1024px) 100vw, 66vw"`.
- **Removed from render.** `story.downloadUrl` block, `Product` sidebar field, and the `HeroShareIcons` component instance — all deleted from the hero. `story.companyLogo` no longer rendered above the title.
- **Dead code purge.** Deleted `HeroShareIcons` helper (only the hero consumed it) and the `formatDate` helper (its only call site was already inside a `{/* ... */}` block — pre-existing dead code, tidied while adjacent). `companyLogoUrl` derivation kept — still used by the quote card in the body section below (unchanged). `postUrl` retained for `StoryMetaRail`.
- **Unchanged (per spec).** Quote card, PortableText body, "Customer Stories" 3-up section, and the sticky `StoryMetaRail` in the body block. Font sizes across the page. Dark navy hero background + `HeroScrollFade` wrapper. Sanity data shape.
- **`HeroScrollFade` open question — retained.** The wrapper still holds up visually after stripping the sidebar; the scroll-parallax fade animates the whole hero (title + 3-col grid). No visible breakage in local build. Recommendation: keep unless a QA pass shows the empty-sidebar geometry causes an offset glitch — no signal it does.
- **Navbar Careers link (`lib/navigation.ts`).** Uncommented + reordered `{ name: "Careers", href: "/company/careers" }` in the "Why Sognos → Company" mega-menu column, sitting between Customer Stories and Contact.
- **Footer Careers link (`lib/content/footer.ts`).** Added `{ label: "Careers", href: "/company/careers" }` to the Company column between Customer Stories and Knowledge Hub. `DEFAULT_FOOTER_CONTENT` is the fallback consumed by `getFooterContent()` — if Sanity is publishing a `siteFooter` doc with its own `columns`, Studio needs the same insertion for prod parity.
- **Verified:** `npm run build` clean — 66 routes generated.
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `lib/navigation.ts`, `lib/content/footer.ts`.

## 2026-07-05 — Customer story card two-panel port + homepage section swap + Customer Stories "See more"

- **Homepage section order.** Swapped `NewsInsightSection` and `CustomerStories` on `app/(marketing)/page.tsx` — Customer Stories now renders directly after `SolutionsSection`, News below it. No prop/data changes.
- **`CustomerStories` "See more" header.** New `SeeMoreLink` in `ProductCustomerStories.tsx` mirroring `NewsInsightSection`'s arrow-glyph link — "See more customer stories" → `/customer-stories`. Header shell rebuilt as `flex items-end justify-between … max-sm:flex-col` so the link sits inline with the H2 on `sm+`, hidden below. Mobile fallback link injected inside the existing chrome / single-story bottom container so bottom padding stays a single stack (no doubled `pb-16`).
- **StoryCard refactor — two-panel layout.** Body rebuilt in `ProductCustomerStories.tsx > StoryCard`:
  - Left panel (product-dark bg, `md:col-span-7`, ~58% width): **logo top-left** (white via `brightness-0 invert`, `h-8 object-left`), **`Read full story` outline button top-right** (`inline-flex h-10 rounded-lg border border-white/40 px-4 text-sm text-white hover:bg-white/10 hover:border-white/60`), quote pushed to the bottom via `mt-auto pt-8`, and a **single-line author,role,company** below the quote (`text-sm text-white/70`) built by `[author, role].filter(Boolean).join(", ")` — the existing `role` field already carries `Role, Company`.
  - Right panel (`md:col-span-5`, ~42%): image/video full-bleed, `bg-white/5` fallback preserved for no-media stories.
  - Card outer `rounded overflow-hidden` → **`rounded-lg overflow-hidden`** (design-system compliance).
  - `sizes` on the right image updated `40vw → 42vw` to reflect the new split.
- **Removed from render, retained in data.** Stats (`companySize`/`industry`) are **not** rendered in the card (were already not rendered — confirmed pre-edit). Fields stay on the `CaseStudy` type + `ALL_STORIES` entries + Sanity mapping — untouched.
- **Untouched (per spec).** Embla slider mechanics (gutter-inset, both-side peek, autoplay, arrows, dots, single-story guard), product-dark palette rotation (`bg-sognos-care-dark`/`roster-dark`/`genogram-dark`), white section, navy heading, Sanity `brandColor` wire-up.
- **Verified:** `npm run build` clean — all 66 routes generated, no type/lint errors.
- **Files:** `app/(marketing)/page.tsx`, `components/layout/sections/ProductCustomerStories.tsx`.

## 2026-07-03 — About hero parallax + resize, Navbar Book-a-Demo hover, hero h1 unification

Third session of the day. All work Preview-only (redesign branch).

- **`AboutHeroImage` — combined AngelList parallax + desktop width-shrink.** Single scroll driver: `progress = useTransform(scrollY, [0, 600], [0, 1], { clamp: true })` — feeds all three motion values so they animate in lockstep. Outer `motion.div`: `maxWidth: calc(100vw - ((100vw - 80rem) * progress))` (100vw → 80rem) + `borderRadius: 0 → 12px`. Inner `motion.div`: `y: -70 → 0` (matches the AngelList `translateY(-70.9442px) → transform: none` values from devtools). Container padding-based aspect kept: `pt-[100vw] sm:pt-[35vw] xl:pt-[590px]`. Image element unchanged (`min-h-[calc(100%+60px)] w-full object-cover`, `width={2016} height={768}`, `priority`, `sizes="100vw"`). Mobile shrink is invisible for free — at `100vw < 80rem`, the max-width cap doesn't restrict. Dropped the `clipPath` polygon (redundant with `overflow-hidden` and would fight `border-radius`). Earlier same-session iterations that used `useScroll({ target, offset: ["start start", "end start"] })` were reverted — that offset only fires while the image top is above the viewport top, which on mobile is a band users can't reach before scrolling past the whole section.
- **Navbar `Book a Demo` hover — blue-accent, both themes.** `THEMES.light.primaryBtn` and `THEMES.dark.primaryBtn` both hover to `bg-sognos-blue-accent hover:text-white`. Rest state unchanged (light: navy-dark bg, dark: white bg). Same hover applied to the mobile-menu footer "Book a Demo" pill (`MobileFooter`) for consistency. Matches the pattern the linter/design pass applied to the About page's `Explore Careers` CTA (`hover:bg-sognos-blue-accent`).
- **Hero h1 unification (linter pass).** About + `solutions/[slug]` h1 both moved from `font-medium text-[#1A1A1A] tracking-[-0.02em]` → `font-normal text-sognos-header tracking-tight text-balance`. Consistent typographic voice across content hero pages. Also on the About page: `Explore Careers` CTA bg swapped from `bg-[#1A1A1A]` to `bg-sognos-navy` (token). Applied to `app/(marketing)/company/about/page.tsx` + `app/(marketing)/solutions/[slug]/page.tsx`. `/company/about` re-added to `DARK_HERO_PATHS` in `Navbar.tsx` (linter pass) — About uses the transparent-over-hero mode again; nothing else's theme changed.
- **Verified:** `npx tsc --noEmit` clean throughout.
- **Files:** `components/sections/AboutHeroImage.tsx`, `components/layout/Navbar.tsx`, `app/(marketing)/company/about/page.tsx`, `app/(marketing)/solutions/[slug]/page.tsx`.

## 2026-07-03 — Homepage section swaps (Solutions, News, LogoStrip) + About hero rework

Second session of the day. All work Preview-only (redesign branch); production untouched.

- **`SolutionsSection` — full refactor.** Replaced the dark navy tab-switcher/carousel pattern with the `ProductFeaturesScroll` shape: sticky left scroll-spy rail with "Solutions" eyebrow + 7-item vertical menu (`motion.span layoutId="solutions-rail-bullet"` spring bullet, `text-sognos-blue-accent` active state), and a right column of stacked cards. Grid template is **`md:grid-cols-[1fr_minmax(0,360px)]`** — image LEFT (wider `1fr`, matches features image width), text RIGHT (`360px` cap). Text column is `flex flex-col gap-4` with title → copy → `Explore {label}` link — no left border on copy, no `justify-between`. Card bg dropped entirely (was alternating gray, then user requested no bg). Section went `bg-sognos-navy-dark text-white` → `bg-white border-b border-gray-100`. Each of the 7 solutions gets one of `/product/feature-01…06.webp` cycled; Quick Start reuses `feature-01`. Deleted all Phosphor icons and the animated `SolutionVisual` component along with `accent`/`rows`/`badge` data fields.
- **`NewsInsightSection` — full refactor.** Backed up to `NewsInsightSection.backup.tsx` verbatim. Cohere-style `CalloutCard` (tinted panel, `aspect-[2/1]` image, morphing SVG notch footer) → **`ArticleCard`** from `KnowledgeHubArchive.tsx` — the exact same card used on the knowledge-hub post page's "Latest articles" grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8`). `NewsInsightArticle` type extended with optional `slug` + `readTime`; `app/(marketing)/page.tsx` mapping updated to pass both. Kept the "The latest news" heading + "See more on the blog" `SeeMoreLink` header row. Local `formatDate` + morphing-notch SVG deleted.
- **`LogoStrip` — full refactor.** Backed up to `LogoStrip.backup.tsx` verbatim. Marquee (`.trust-marquee-wrap` / `.trust-marquee-track`) → static **`ProductTrustStrip`** layout: title `"Trusted by industry leaders and professionals worldwide"` (`text-white/70` on dark), single-row flex with vertical dividers (`md:border-l md:border-white/15`). Section bg **`bg-sognos-navy-dark`**; logos forced white via inline `filter: brightness(0) invert(1); opacity: 0.75` (grayscale wasn't enough for dark bg). Sanity fetch retained; sliced to `MAX_LOGOS = 5` to match the ProductTrustStrip row density (default fallback has 12, would crush at `md:flex-nowrap`). Homepage comment updated ("developers" → "professionals") to match new title. Old CSS classes on `.trust-marquee-*` are now orphaned in `globals.css` — left for a quick revert path.
- **About hero — matches `solutions/[slug]` hero.** Two-column dark navy hero (heading + intro + Book a Demo) → single-column white hero. Wrapped content in `grid lg:grid-cols-12 lg:col-span-7` (same shell as solutions) so h1 wraps naturally to 2 lines. Added eyebrow **`About Sognos`** (`text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]`, rendered as `<p>` not `<Link>`). H1 rewritten from _"Building smarter automation for modern teams"_ → **_"Smarter automation for modern teams"_** (5 words, reliable 2-line wrap at `text-7xl`) with `text-balance`. Added dark CTA `Explore Careers` → `/company/careers` (same class recipe as `SolutionHeroDemoButton`, rendered as `<Link>` since it navigates). Intro paragraph + Book a Demo removed. Padding matched to solutions: `pt-32 pb-20 lg:pt-40 lg:pb-24`.
- **New: `AboutHeroImage.tsx`** — client component; AngelList `/careers`-style scroll effect. `useScroll` on window `scrollY`; `[0, 500]` → progress `[0, 1]` (clamped). `useMotionTemplate` on `max-width: calc(100vw - ((100vw - 80rem) * progress))` — 100vw at rest, 80rem (max-w-7xl) at full scroll; `borderRadius: 0 → 12px` in sync. Rendered outside the hero's `max-w-7xl` container so the 100vw state actually reaches the viewport edges. Image at `/public/images/about/hero-img.webp` (new asset), `aspect-[21/9]`, `priority` (LCP on this page).
- **Navbar — light theme on `/company/about`.** Removed `"/company/about"` from `DARK_HERO_PATHS` (Navbar.tsx). With the hero now white, the derived `useTransparent` flag flips to `false`, which resolves `THEMES.light` — dark logo, dark nav labels, dark "Book a Demo" pill button, solid white bar from first paint. Every other page's theme unchanged.
- **Verified:** `npx tsc --noEmit` clean throughout.
- **Files:** `components/sections/SolutionsSection.tsx`, `NewsInsightSection.tsx` (+ `.backup.tsx` new), `LogoStrip.tsx` (+ `.backup.tsx` new), `AboutHeroImage.tsx` (new); `components/layout/Navbar.tsx`; `app/(marketing)/page.tsx`, `app/(marketing)/company/about/page.tsx`; `public/images/about/hero-img.webp` (new asset).

## 2026-07-03 — Home card polish, Sanity brandColor wire-up, arrow-icon normalization

- **Sanity `brandColor` → frontend.** Read `brandColor.hex` in `SOGNOSCARE_PAGE_QUERY.featuredStories[]` and `STORY_BY_SLUG_QUERY`; surface it through `mapStory`/`CaseStudy` and the customer-story detail page. Both the slider card bg (`ProductCustomerStories`) and the detail quote card (`customer-stories/[slug]`) now use `story.brandColor ?? BRAND_BG[story.company]` — Sanity wins, hardcoded map is fallback for unset docs.
- **HomeProductCards — full pass.** Product data restructured (`overview` → `lead` + `rest`; taglines-as-titles); SognosCare bg swapped to an Unsplash URL; `next.config.ts` allowlists `plus.unsplash.com` + `images.unsplash.com` in `images.remotePatterns`. Image card `aspect-[3/4]` → `aspect-[4/5]` + `max-h-[430px]`; product logo repositioned top-left → centered; dark overlay `bg-sognos-navy-dark/45` now uses a **named group `group/cards`** on the container so non-hovered cards dim to `/70` while the hovered card brightens to `/25` (via `group-hover:!bg-…` for cascade priority). Description paragraph: `<span text-white>{lead}</span>{rest}` inside `text-white/70` for a bright lead-in over a muted trailing sentence.
- **Hero CTA restyle.** `AnimatedButton variant="white"` → plain white pill matching SognosCare hero (`rounded-full bg-white px-7 py-3.5 text-sognos-navy-dark`), later refined by the user to hover-swap to `bg-sognos-blue-accent text-white`. Secondary CTA: underlined text link → text link with `↗` glyph. `openModal()` wrapped `() => openModal()` to satisfy `MouseEventHandler` (openModal takes an optional `ProductKey`).
- **Section gutter follow-up.** Every remaining `max-w-7xl px-6 lg:px-10` container was collapsed to bare `px-6` last session; this session's edits kept that convention across new/touched components.
- **Arrow icon normalization.** Every remaining `<ArrowIcon>` call site swapped to the inline SVG template used by `EditionCards.ArrowButton` (viewBox `0 0 14 14`, path `M3 7h8M7 3l4 4-4 4`, `stroke="currentColor"`). Local `ArrowIcon` helpers removed from `HomeProductCards.tsx`, `NewsInsightSection.tsx`, and `EditionCards.tsx` (each file had its own copy). Per-site sizing (`w-3`, `w-4`, `h-5 w-5`) and colours preserved via className.
- **HowSognosWorks icon → image.** All three blocks' Phosphor `<Icon size={40} weight="thin">` replaced with `<Image src="/solutions/Inon.avif" width={40} height={40} className="h-10 w-10 object-contain" />`. `Icon` field removed from BLOCKS; `@phosphor-icons/react` import dropped. **Flag:** all three blocks currently share the same image; the three original icons provided visual differentiation — worth revisiting when Sognos has three distinct icon assets.
- **Small design fixes.**
  - `Navbar.tsx` dark-theme `navGroup` bg: `bg-white/10` → `bg-sognos-navy` — restores solid navy pill on dark-hero pages.
  - `SolutionUseCases.tsx` `SECTION_BG`: `#1d96fc` (blue accent) → `#152248` (`sognos-navy`).
  - `solutions/[slug]/page.tsx` `SECTION_BG`: `#1F1147` (dark purple) → `#152248` (`sognos-navy`), plus the "What it solves" band `bg-sognos-blue-accent` → `bg-sognos-navy` — unifies the section tone across both solution surfaces.
  - `HowSognosWorksPreview.tsx` heading: `lg:text-[28px]` → `lg:text-4xl`, and the "Start delivering outcomes." span kept on one line.
- **Verified:** `npx tsc --noEmit` clean throughout. Sanity Studio brandColor field remains behind the same auth (Preview scope only for `NEXT_PUBLIC_SANITY_*`).
- **Files:** `next.config.ts`; `lib/sanity/queries.ts`; `components/layout/Navbar.tsx`; `components/sections/Hero.tsx`, `HomeProductCards.tsx`, `HowSognosWorks.tsx`, `HowSognosWorksPreview.tsx`, `NewsInsightSection.tsx`, `ProductCustomerStories.tsx`, `SolutionUseCases.tsx`, `sognoscare/EditionCards.tsx`; `app/(marketing)/customer-stories/[slug]/page.tsx`, `solutions/[slug]/page.tsx`.

## 2026-07-02 — Customer story detail: hero rework, sticky info rail, scroll parallax + site-wide gutter

Builds on the earlier same-day AngelList case-study refactor (below).

- **Hero image removed; stat row anchored bottom.** Hero main column is now `flex flex-col lg:min-h-[440px]`: logo → title → date at top, **Industry / State / Size** stat row pushed to the bottom via `lg:mt-auto` (AngelList rhythm). Hero left rail keeps back-link + Category + Product + Download (conditional) + Share (dark-styled).
- **Sticky content rail is now a full info panel** — `components/sections/customer-stories/StoryMetaRail.tsx` (new client component). Contains: Customer Name → intro (the `description` pulled out of the hero) → stacked **Industry / State / Size / Product** (uppercase label above value) → **Download Customer Story** (only renders when `downloadUrl` is set in Sanity) → **Share**. Kept narrow (rail column stays `[200px_1fr]`/`[220px_1fr]`, not widened). Fades/slides in on entry via `whileInView` (`opacity`/`y`, `once:true`, reduced-motion guard) and is `lg:sticky lg:top-[104px]` so it stays visible through the whole body.
- **Quote card moved into the content column** — out of the full-width section into the `1fr` column, aligned with the body (not spanning the rail). Product-mapped dark tone (`sognos-care-dark` / `sognos-roster-dark` / `sognos-genogram-dark`, navy-dark fallback), author/role/logo row, matches the `ProductCustomerStories` card body minus the image column.
- **Hero scroll parallax + fade** — `components/sections/customer-stories/HeroScrollFade.tsx` (new client wrapper). Same transforms as SognosCare hero: `useScroll` offset `["start start","end start"]`, `y: [0,1]→[0,160]`, `opacity: [0,0.7]→[1,0]`, `useReducedMotion` guard. Hero content wrapped in the animated `motion.div`; navy bg static; `relative overflow-hidden` clips the downward translate. Page stays a Server Component — only the two wrappers are `"use client"`.
- **Industry taxonomy normalized in Sanity (published).** All 8 `customerStory` docs' `Industry` sidebar values remapped to the canonical 5-category taxonomy (Health & Social Care / Facilities Management / Local Government / Industrial Services / Energy & Utilities). Judgment calls: Auckland Airport → Facilities Management, NECA → Industrial Services. Live-data change via Sanity MCP, not code.
- **Section gutter `lg:px-10` → `px-6` site-wide.** All `max-w-7xl`/`max-w-6xl` section containers had `lg:px-10` swapped to match the navbar's `px-6`, so section edges align with the logo (left) and Book a Demo (right). Collapsed the resulting redundant `px-6 … lg:px-6` back to a bare `px-6`. 16 files: about, customer-stories `[slug]`, knowledge-hub (+`[slug]`), solutions `[slug]`, AboutBeliefs, AboutValues, Hero, HomeProductCards, KnowledgeHubArchive, NewsInsightSection, ProductTrustStrip, EditionPageTemplate, and the Care/Roster/Genogram Heros. Left intentionally: `px-4 lg:px-6` (NewsInsightSection), `pb-10 lg:px-6` (KnowledgeHubArchive lg-only), `px-4 sm:px-8 lg:px-6` (ComingSoonHero).
- **New query** `getCustomerStoryArchive()` (`STORY_ARCHIVE_QUERY`, `order(date desc)`) added earlier for the "Customer Stories" 3-up; still used here.
- **Verified:** `npm run build` green, `tsc` clean. Scroll transforms DOM-confirmed animating; sticky rail confirmed pinned at `top:104px`; no horizontal scroll (desktop/mobile).
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/sections/customer-stories/StoryMetaRail.tsx` (new), `components/sections/customer-stories/HeroScrollFade.tsx` (new), + 15 files for the gutter swap.

## 2026-07-02 — Customer story detail page: AngelList case-study layout (dark navy hero)

- **Dark hero + sticky rail:** `app/(marketing)/customer-stories/[slug]/page.tsx` rebuilt on a `bg-sognos-navy` hero with `lg:grid-cols-[200px_1fr]` shell — sticky left rail (`lg:sticky lg:top-[104px]`) with back-link, a static "Case Study" category pill (no Sanity category field exists for customer stories), the existing `story.sidebar` label/value pairs (Industry/State/Size/Product), the "Download Customer Story" button restyled for dark (`bg-white text-sognos-navy-dark`), and dark-variant share icons (`bg-white/10` vs the light `bg-sognos-navy/5` used elsewhere). Main column: company label → big white title → description as subtitle → date/read-time meta → hero image (with company logo overlay, unchanged) — the two-up text/image header is gone.
- **Navbar dark-hero support for dynamic routes:** `DARK_HERO_PATHS` only did exact-string matching, which can't cover `/customer-stories/<slug>`. Added `DARK_HERO_PATH_PREFIXES = ["/customer-stories/"]` and an `Array.some(pathname.startsWith(...))` check alongside the existing `Set.has()` lookup in `components/layout/Navbar.tsx`.
- **Quote card:** the plain full-bleed blue quote band is now a `rounded-lg bg-sognos-blue-accent` card sitting in the white flow below the hero (kept the blue-accent tone — no other product-dark tone requested). `quoteAuthor` (a single Sanity string like "Name, Role") is split into author/role lines via a local `parseQuoteAuthor` helper (mirrors the private one in `lib/sanity/queries.ts`, not exported — duplicated locally rather than widening that module's API for one caller).
- **Body prose restyled** to match the Knowledge Hub article page's treatment: narrower measure, `blockquote` upgraded to an accent-coloured pull-quote. Portable Text source/serializer registration unchanged.
- **NEXT/prev removed → "Customer Stories" 3-up:** replaced with a `bg-gray-200/70` band showing the latest 3 other stories (`gap-3 lg:gap-4`), reusing the Knowledge Hub `ArticleCard` (already exported from the earlier KH article refactor). Added `getCustomerStoryArchive()` + `STORY_ARCHIVE_QUERY` (ordered `date desc`) to `lib/sanity/queries.ts` — the existing `getCustomerStoryNav()` only returns `slug`/`company`, not enough for a card.
- **Fields used vs missing:** no stat-row data, no quote-author avatar field, no per-story category field (hardcoded "Case Study"). `productLogo` is fetched by the existing Sanity query but still unused/unrendered (pre-existing, not introduced here).
- **Verified:** `npm run build` green, no TypeScript errors. DOM-confirmed: dark hero + sticky rail render, navbar `bg-transparent` over the hero (dark-hero prefix match works), quote card renders with parsed author/role, "Customer Stories" 3-up shows exactly 3 cards excluding the current slug with correct `gap-3 lg:gap-4`/`bg-gray-200/70`, no horizontal scroll at desktop (1440px) or mobile (375px).
- **Files:** `app/(marketing)/customer-stories/[slug]/page.tsx`, `components/layout/Navbar.tsx`, `lib/sanity/queries.ts`

## 2026-07-02 — Font system: Bureau Sans removed, Inter unified across sans + heading; AngelList variable font registered

- **Bureau Sans purged.** `next/font/local` block loading `bureau-sans-book.woff2` + `bureau-sans-medium.woff2` deleted from `app/layout.tsx`. Both woff2 files removed from `public/fonts/`. `--font-bureau-sans` CSS variable no longer emitted.
- **Inter is now single-instance.** Old setup had TWO Google Fonts references: `interHeading` (variable `--font-inter-heading`) for headings + Bureau Sans local files for body. New: one `Inter` from `next/font/google` (variable `--font-inter`) drives BOTH body and headings. One font download instead of two.
- **`globals.css` @theme:** `--font-sans: var(--font-bureau-sans, sans-serif)` → `var(--font-inter), ui-sans-serif, system-ui, sans-serif`. `--font-heading: var(--font-inter-heading), …` → `var(--font-inter), …`. Both now resolve to the same Inter instance.
- **New: AngelList variable font.** Added `@font-face { font-family: angellist; src: url("/app/AngelList.woff2"); font-display: swap; font-weight: 400 700; font-style: normal; }` and `--font-angellist` @theme token → `font-angellist` Tailwind utility. Used on the SognosCare Hero h1.
- **Verified:** grep confirms zero remaining references to `bureau-sans`, `bureauSans`, `interHeading`, or `--font-inter-heading` across `*.tsx | *.ts | *.css | *.js | *.json`. `npx tsc --noEmit` clean. `npm run build` green.
- **Files:** `app/layout.tsx`, `app/globals.css`, `public/fonts/bureau-sans-book.woff2` (deleted), `public/fonts/bureau-sans-medium.woff2` (deleted), `public/app/AngelList.woff2` (added).

## 2026-07-02 — Knowledge Hub article page: AngelList blog-article layout

- **Layout overhaul:** two-column shell (`lg:grid-cols-[200px_1fr]`) replacing the old two-up hero. Left rail is `lg:sticky lg:top-[104px]` with back-link, category badge, "Written by" avatar + name, and share icons (LinkedIn/X/Facebook, moved from the old inline row). Main column is centered prose at `max-w-[46rem]`: title, excerpt as subtitle, `DATE — READ TIME` meta row, hero image, then the body.
- **Body prose restyled:** narrower measure, `blockquote` upgraded from a plain italic border-left quote to a large `text-xl lg:text-2xl` accent-coloured pull-quote (`border-l-2 border-sognos-blue-accent`). Portable Text source/serializer registration unchanged — only rendered output restyled.
- **NEXT/prev removed → "Latest articles" 3-up:** the old previous/next link buttons are gone. Replaced with a `bg-gray-200/70` band showing the latest 3 posts (excluding the current slug) via `getKnowledgePostArchive()`, rendered with the **same `ArticleCard`** used in the archive's "All articles" grid — exported from `components/sections/KnowledgeHubArchive.tsx` instead of duplicated.
- **Fields used vs missing:** `author` is a plain string (no role/avatar object) — rail shows initial-letter avatar + name only, no role line. No dedicated Sanity "quote" block type exists — pull-quote styling is applied to the existing `blockquote` serializer. `excerpt` doubles as the subtitle.
- **Verified:** `npm run build` green. DOM/accessibility-tree confirmed sticky rail, prose column, and 3 correct "Latest articles" cards (excluding current post) render; screenshot tool was flaky mid-session (blank captures on scroll) but content was confirmed present, styled, and legible via computed-style inspection.
- **Incidental fix:** `ArticleCard`'s image wrapper in `KnowledgeHubArchive.tsx` used `rounded` instead of `rounded-lg` (pre-existing, violates the rounded-lg-only rule) — corrected.
- **Files:** `app/(marketing)/knowledge-hub/[slug]/page.tsx`, `components/sections/KnowledgeHubArchive.tsx`

## 2026-07-02 — ProductCustomerStories: card body ported to AngelList layout

- **Grid:** `md:grid-cols-11` (7 / gap / 3) → `md:grid-cols-12` (8 / 4). Text:image ratio ~2:1. No gap column — image column sits flush against text column.
- **Left col:** removed h3 company title. Order now: `blockquote → "Read Customer Story" link → (mt-auto spacer) → author + role bottom-LEFT | logo bottom-RIGHT`. Bottom row is `flex items-end justify-between gap-6`. Quote sized up `text-lg lg:text-[22px]` → `text-xl md:text-2xl`. Author/role `text-sm text-white/70` → `text-base text-white` (bolder pairing that reads at AngelList weight). Logo `h-7` → `h-14`, `brightness-0 invert flex-shrink-0`.
- **Right col:** now full-bleed image. Removed `p-4 lg:p-6` outer padding, removed inner `rounded-lg overflow-hidden mb-4` wrapper. `Image fill object-cover` sits inside `relative md:col-span-4 min-h-[280px] md:min-h-0 bg-white/5` — image clips to the card's outer `rounded-lg overflow-hidden` on right/top/bottom edges.
- **Stats block removed:** Company Size / Industry stack + `border-white/15` hairline removed entirely from card render. `CaseStudy` type retains `companySize`/`industry` fields — data preserved, just not displayed.
- **Card min-height reduced:** `min-h-[420px] md:min-h-[480px]` → `min-h-[360px] md:min-h-[440px]` for a more compact card without cropping the quote-dominant layout.
- **No-image degradation:** right col `bg-white/5` reveals a subtle accent panel if both `panelVideo` and `panelImage` are absent (all current stories have `panelImage`, so this is defensive only).
- **Untouched:** Embla mechanics (gutter-inset padding-left + trailing spacer + `mr-` between slides), both-side peek, arrows/dots/autoplay, `showChrome` single-story guard, `TESTIMONIAL_PALETTE` rotation (Care / Roster / Genogram dark), white text.
- **Verified:** `npm run build` green + `npx tsc --noEmit` clean. Panel images render slowly in dev (Next.js `/_next/image` optimization queue) but request status is `pending` not error — source files exist on disk; production build resolves.
- **Files:** `components/sections/ProductCustomerStories.tsx`

## 2026-07-02 — Navbar: AngelList exact-spec desktop dropdown rewrite

- **Architecture overhaul:** removed `panelX`/`panelWidthMV` motion values, `triggerRefs`, `panelWidths`, `prevOpenMenuRef`, `containerRef`, `DROPDOWN_SPRING`, `EDGE`, and JS x-positioning `useLayoutEffect`. Removed `useMotionValue`/`animate` from framer-motion imports.
- **CSS-transition sizing:** `dropdownWidth`/`dropdownHeight` state set from hidden measurer divs in `useLayoutEffect` (synchronous before paint). Card uses `transition: width 0.3s / height 0.3s cubic-bezier(0.4,0,0.2,1)` — no JS animation for dimensions.
- **Full-width centering:** dropdown `AnimatePresence` moved outside `max-w-7xl` container, placed directly in `<header>` as `absolute inset-x-0 top-full mt-4 flex justify-center pointer-events-none` — card centers on viewport width, matching AngelList.
- **Fixed-key outer panel:** `AnimatePresence` keyed `"dropdown-panel"` — never re-mounts between items. Open: `rotateX(-10deg) scale(0.9) opacity:0 → identity` (0.2s `[0.16,1,0.3,1]`). Close: inverse `scale(0.95)`.
- **Directional content slide:** `AnimatePresence mode="popLayout"` inside card, keyed on `openMenu`. `slideDirectionRef` + `prevOpenIndexRef` set in `recordDirection()` before every `setOpenMenu` call. Forward: enter from `x:200`, exit to `x:-200`. Backward: reversed. 0.25s `[0.4,0,0.2,1]`.
- **Measurer padding:** `p-8 → p-6` (matches AngelList's 24px content padding).
- **THEMES cleanup:** removed unused `dropdownCard`, `mobilePanel`, `mobileDivider` keys.
- **Verified:** Products open/close ✓ · switch to Solutions width+height transition ✓ · directional slide ✓ · no console errors ✓
- **Files:** `components/layout/Navbar.tsx`

## 2026-07-02 — Navbar: AngelList two-level full-screen mobile menu

- **Replaced accordion** (`AccordionItem` component + `openAccordion` state) with a two-level full-screen slide pattern modelled on AngelList mobile nav.
- **Level 1 (Root):** full-viewport fixed overlay (`z-[51]`, `fixed inset-0 bg-white`). Header row: logo left, × right. Nav list: each group as full-width row `px-6 py-5`, `text-xl font-medium`, `border-b border-gray-100`, `→` arrow on groups with dropdowns, no arrow on plain links. Footer pinned: `bg-sognos-navy-dark` "Book a Demo" + `bg-gray-100` "Contact Sales" side-by-side, equal width, `rounded-lg`.
- **Level 2 (Sub-panel):** slides in from right (`x: 100% → 0`), Level 1 exits left (`x: 0 → -100%`). Header: `← Back` text-button left, × right. Content: `bg-gray-50` section heading bands, link rows with `border-b border-gray-100`, gradient card (first 2 items as thumbnails + labels). `AnimatePresence mode="wait"` with `SLIDE = { duration: 0.25, ease: [0.4, 0, 0.2, 1] }`.
- **Direction tracking:** `mobilePanelDirectionRef` (`forward` | `back`) drives Level 1 enter `initial` so back-navigation slides from left.
- **Mobile backdrop blur removed** — full-screen white overlay makes it unnecessary. Desktop backdrop blur untouched.
- **Desktop nav untouched:** all hover-intent, `panelX` spring, `AnimatePresence mode="wait"` dropdown, scroll states, `layoutId="nav-hover-pill"` — zero changes.
- **Verified:** Level 1 renders ✓ · Level 2 slides in on tap ✓ · Back returns to root ✓ · desktop zero console errors ✓
- **Files:** `components/layout/Navbar.tsx`

## 2026-07-02 — Edition pages: Advantages dark token variants + inline style bypass

- **6 dark edition tokens added** to `tokens.css` (`:root` raw CSS vars, not `@theme inline`): `--sognos-edition-aged-care-dark` `#2d1a5c`, `--sognos-edition-allied-health-dark` `#6b2d00`, `--sognos-edition-support-at-home-dark` `#660e10`, `--sognos-edition-hospital-in-the-home-dark` `#2a3605`, `--sognos-edition-child-and-family-services-dark` `#5c0a33`, `--sognos-edition-disability-dark` `#003d34`. Corresponding `--color-*` aliases added to `@theme inline` in `globals.css`.
- **Tailwind utility bypass**: new `bg-sognos-edition-*-dark` utility classes failed to generate in both dev and prod (content scanner did not pick up new `@theme inline` entries for brand-new token names). Switched to `style={{ backgroundColor: "var(--sognos-edition-*-dark)" }}` — bypasses Tailwind entirely, reads directly from CSS vars on `:root`.
- **`EditionData` type**: added `advantagesBg?: string` field (replaces dropped `advantagesBgClass` approach). Template uses `style={{ backgroundColor: data.advantagesBg ?? "var(--sognos-care-dark)" }}` as fallback.
- **6 edition pages updated**: `advantagesBgClass: "bg-sognos-edition-*-dark"` → `advantagesBg: "var(--sognos-edition-*-dark)"` in all data objects.
- **Verified**: `#advantages` on `residential-aged-care` renders `background-color: rgb(45, 26, 92)` = `#2d1a5c` ✓
- **Files**: `app/tokens.css`, `app/globals.css`, `components/sections/sognoscare/EditionPageTemplate.tsx`, all 6 edition `page.tsx` files

## 2026-07-02 — Edition pages: Key Advantages section bg → per-edition colour token

- **Mechanism**: `EditionPageTemplate.tsx` internal `Advantages` function — section className changed from `"w-full bg-sognos-care-dark text-white"` to `` `w-full ${data.accentBgClass} text-white` ``. Reuses the existing `accentBgClass` field already on `EditionData`, which holds the per-edition `bg-sognos-edition-*` utility class. No new prop, no new field.
- **Main SognosCare product page unaffected**: uses standalone `components/sections/sognoscare/Advantages.tsx` — not `EditionPageTemplate`. Remains `bg-sognos-care-dark`.
- **Per-edition mapping applied**:
  - `residential-aged-care` → `bg-sognos-edition-aged-care` (`#caa4ff`)
  - `allied-health` → `bg-sognos-edition-allied-health` (`#ffad6e`)
  - `support-at-home` → `bg-sognos-edition-support-at-home` (`#ff8e90`)
  - `hospital-in-the-home` → `bg-sognos-edition-hospital-in-the-home` (`#cbdd61`)
  - `disability-mental-health` → `bg-sognos-edition-disability` (`#00a98f`)
  - `child-and-family-services` → `bg-sognos-edition-child-and-family-services` (`#ff7dbc`)
- **hospital-in-the-home canonicalised**: `accentBgClass` was `bg-[#c6da4c]` (raw hex). Updated to `bg-sognos-edition-hospital-in-the-home`. `accentHex`/`accentTextClass`/`accentBorderClass` left as raw hex — out of scope.
- **⚠️ Contrast flag (not fixed — out of scope)**: Pale/mid tokens (`#caa4ff` aged-care, `#ffad6e` allied-health, `#ff8e90` support-at-home, `#cbdd61` hospital-in-the-home, `#ff7dbc` child-and-family`) render white text + `bg-white/10` rows on light backgrounds. Contrast ratios on these pale tokens will not meet WCAG AA for body text. Decision deferred to Levon.
- **Files**: `components/sections/sognoscare/EditionPageTemplate.tsx`, `app/(marketing)/products/sognoscare/editions/hospital-in-the-home/page.tsx`

## 2026-07-02 — About page: Our Values full-bleed stacking cards

- **Full-bleed cards**: removed inner `mx-auto max-w-7xl px-6 pb-3 lg:px-10` wrapper. Sticky div IS the card bg — full viewport width, no side gutters. Inner content wrapped in `mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-10 lg:pt-8 lg:pb-16` for gutter-aligned text.
- **Stacking reveal**: card 1 sticks at `top: 80px` (navbar height). Card 2 sticks at `top: 136px` (80 + 56px reveal). 56px sliver of card 1 stays visible above card 2 when stacked — reveals "● OUR MISSION / 01" eyebrow strip. Card inner `pt-6` (24px) ensures eyebrow text clears the pin offset.
- **Top-only rounding**: `rounded-lg` → `rounded-t-lg`. Bottom corners square — card 2 bottom meets Beliefs section with no bump.
- **Scroll buffer removed**: `h-[40vh]` white buffer deleted. Vision card (`bg-sognos-navy`) flows directly into Beliefs (`bg-sognos-navy`) — seamless same-colour junction, no gap.
- **No horizontal overflow**: sticky div uses default `w-full` — no `w-screen` or negative-margin technique. `document.body.scrollWidth === window.innerWidth` confirmed.
- **Files**: `components/sections/AboutValues.tsx`

## 2026-07-02 — About page: body paragraphs, AboutStats count-up, AboutValues stacking cards, simplified AboutBeliefs

- **Body paragraphs**: 4 paragraphs added to About section (`space-y-5 max-w-3xl text-sognos-muted`) between h2 and stats.
- **AboutStats (new)**: `components/sections/AboutStats.tsx` — `"use client"`, 3 stats (2016 Founded / 10+ Years / 3 Countries served). `CountUpStat`: `IntersectionObserver` threshold 0.4, fires once; `requestAnimationFrame` ease-out cubic (1100ms); year starts from `Math.floor(value * 0.97)`, small numbers from 0; `useReducedMotion()` guard shows final value immediately. Dividers: `border-r border-(--sognos-line)` on all but last stat, `pl-10 md:pl-12` on all but first. Removed 4th "Built on Microsoft" stat.
- **AboutValues (new)**: `components/sections/AboutValues.tsx` — Server Component. Two stacking sticky cards: Mission (`bg-sognos-blue-accent`, z-10, `top: 80`) and Vision (`bg-sognos-navy`, z-20, `top: 80`). `min-h-[520px] lg:min-h-[56vh]`. Content: eyebrow top-left, "01"/"02" top-right, large statement bottom. Inset `mx-auto max-w-7xl px-6 pb-3 lg:px-10` wrapper on each card. Section title "Our Values" above cards in `bg-white` section. `h-[40vh]` scroll buffer after last card.
- **AboutBeliefs simplified**: rewrote from 5-tab client component to static Server Component. Single `rounded-lg border-white/10 bg-white/5 p-10 lg:p-14` card inside `bg-sognos-navy py-20` section. Two-col grid: left = "Our Beliefs" h2 + intro; right = 3 values (`space-y-8 lg:border-l lg:border-white/15 lg:pl-16`). No tabs, no slider, no dots, no `"use client"`.
- **About page**: added `<AboutValues />` between About section and `<AboutBeliefs />`.
- **Files**: `components/sections/AboutStats.tsx` (new), `components/sections/AboutValues.tsx` (new), `components/sections/AboutBeliefs.tsx` (rewritten), `app/(marketing)/company/about/page.tsx`

## 2026-07-02 — About page: AngelList engineering/careers layout (hero + mission + beliefs)

- **Hero replaced**: removed `bg-gray-200/50` bento grid (shine-pill eyebrow, centered layout, stat tiles, images). New dark two-up: `bg-sognos-navy`, left h1 "Building smarter automation…" (`text-5xl lg:text-6xl`), right intro paragraph + white "Book a Demo" `rounded-full` link to `/contact`.
- **Navbar transparency**: `/company/about` added to `DARK_HERO_PATHS` — navbar transparent white at scroll-top over the new dark hero. Verified: `header bg = rgba(0,0,0,0)` at page top.
- **Mission section (new)**: replaced `bg-sognos-blue-accent` section. New `bg-white py-20 lg:py-28` two-col layout: `lg:grid-cols-[200px_1fr]` — left eyebrow `● About Sognos`, right large heading "Healthcare First. Field Service Always. AI at the Centre." + 4-stat row (2016/Founded, 10+/Years, 3/Countries served, Built on Microsoft/Dynamics 365 Native). Stats separated by `border-l border-(--sognos-line)`. 4th "Built on Microsoft" stat: `text-xl lg:text-2xl` (smaller than numeric stats — text phrase, not a number).
- **Beliefs section (new)**: `components/sections/AboutBeliefs.tsx` — client component. `bg-sognos-navy`. Heading "Our Beliefs" + intro. Pill row: replicated ProductSubNav visual (track `bg-white/10 p-1.5 rounded-full`, active `motion.span layoutId="beliefs-pill" bg-white`, inactive `text-white/70`). 5 tabs: Our Mission, Our Vision, Respect for the individual, Value to our customers, Excellence in all that we do. Card: `rounded-lg border-white/10 bg-white/5` + two-col split (title left, `lg:border-l lg:border-white/15`, body right). Crossfade mechanic: `AnimatePresence mode="wait"` keyed on `active` index (`y: 8→0, opacity: 0→1, duration: 0.18s`). Dot indicators: 5 dots, active `w-4 h-1.5 bg-white`, inactive `w-1.5 h-1.5 bg-white/30`.
- **Removed from page**: old `VALUES` data (reintegrated into `AboutBeliefs.tsx` BELIEFS array), `bg-sognos-blue-accent` section, all bento markup. Kept unchanged: `PARTNERS` data, Partners section, `<TeamSection />`, `<SocialResponsibilitySection />`, commented-out Careers section.
- **Files**: `components/layout/Navbar.tsx`, `components/sections/AboutBeliefs.tsx` (new), `app/(marketing)/company/about/page.tsx`

## 2026-07-02 — Knowledge Hub: date/readTime/author + uniform pills + card borders + grid spacing

- **Category pills unified**: removed per-category colour map (`BADGE_STYLES`). All pills now `bg-gray-100 text-gray-600 rounded-lg` — no border, no colour variants. Applies to grid cards and featured article.
- **Date + read time added**: `ArticleMeta` helper formats `publishedAt` ("YYYY-MM-DD" → "JUN 30, 2026") + uppercases `readTime` string; renders `"JUN 30, 2026 — 3 MIN READ"` below title on both grid cards and featured. Gracefully omitted if either field is null.
- **Author added to featured**: initial-letter avatar circle (`bg-gray-200`) + author name. Omitted if `author` null. Sanity schema: `author` is a plain string (no role/image); initial is `charAt(0).toUpperCase()`.
- **Grid card bottom border**: each card now `pb-6 border-b border-gray-200`.
- **Grid spacing**: `gap-3 lg:gap-4` → `gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12`. "● All articles" label `mb-6` → `mb-8`.
- **Sanity query + type updated**: `KNOWLEDGE_POST_ARCHIVE_QUERY` now fetches `readTime` and `author`. `KnowledgePostArchive` type gains `readTime?: string | null` and `author?: string | null`.
- **Article type extended**: `publishedAt?`, `readTime?`, `author?` added as optional nullable strings. Fully backwards-compatible — all existing page mappings unaffected.
- **Files**: `lib/sanity/queries.ts`, `app/(marketing)/knowledge-hub/page.tsx`, `components/sections/KnowledgeHubArchive.tsx`

## 2026-07-02 — Knowledge Hub archive refactored to AngelList /blog layout

- **`app/(marketing)/knowledge-hub/page.tsx` — hero replaced**: removed `data-header-dark`, dark gradient hero, eyebrow pill, centred layout. New light hero: `bg-white pt-32 pb-12 lg:pt-40 lg:pb-16`, left-aligned `h1`, `max-w-2xl` intro paragraph. Navbar now solid over Knowledge Hub (correct — not in `DARK_HERO_PATHS`).
- **`KnowledgeHubArchive.tsx` — complete rewrite**: Removed sticky sidebar, industry dropdown, 3-col grid, card excerpts/Read More, `rounded-2xl` empty state. New AngelList pattern: (1) horizontal pill row — All + 5 category pills + Clear; (2) featured two-up `lg:grid-cols-2` — always article[0], unfiltered; (3) `<hr>` divider; (4) `● All articles` 4-up grid `lg:grid-cols-4` with `gap-3 lg:gap-4`; (5) navy Case Study band `bg-sognos-navy` — hardcoded Flourish Australia placeholder. `ArticleCard`: `aspect-[16/10] rounded-lg` image, BADGE_STYLES colour-coded category pill, title only. Empty state `rounded-lg`. Schema flag: `Article` type lacks `date`/`readTime`/`author` fields — deferred to future Sanity schema update.
- **Files**: `app/(marketing)/knowledge-hub/page.tsx`, `components/sections/KnowledgeHubArchive.tsx`

## 2026-07-02 — ProductSubNav layout unified; TrustStrip dividers; Hero scroll transforms restored

- **ProductSubNav layout unified across all three product pages**: Care was the reference (SubNav embedded inside Problems section with `flex justify-center` + `pt-20 md:pt-28` above, `mb-16` below). Roster/Genogram had bare wrapper divs with no padding. Fix: wrapper divs on Roster + Genogram page.tsx updated to `flex justify-center px-6 pt-20 pb-16 md:pt-28`; Roster Problems `py-20 md:py-28` → `pb-20 md:pb-28`; Genogram Problems `py-24` → `pb-24` (top padding stripped — wrapper now owns it).
- **ProductTrustStrip dividers**: vertical `border-l border-gray-200` hairline between logos on desktop (`md:`). `divide-x` skipped (Tailwind v4 child-selector not generating); per-item `index > 0` conditional class used instead. Mobile: `gap-x-12` wrap unchanged, no dividers. Desktop: `md:flex-1 md:px-10` per-logo wrapper + `md:gap-x-0` on row.
- **Hero scroll transforms restored — all three product heroes**: Roster + Genogram heroes converted from Server Components to Client Components. All three now match: `useScroll({ target: heroRef, offset: ["start start","end start"] })`, `y: [0,1]→[0,60]`, `opacity: [0,0.7]→[1,0]`. `useReducedMotion()` guard on all three — no transform when OS prefers reduced motion. Roster/Genogram placeholder cards: `rounded-t-2xl` → `rounded-lg`.
- **Files**: `components/sections/ProductTrustStrip.tsx`, `components/sections/sognoscare/Hero.tsx`, `components/sections/sognosroster/Hero.tsx`, `components/sections/sognosgenogram/Hero.tsx`, `components/sections/sognosroster/Problems.tsx`, `components/sections/sognosgenogram/Problems.tsx`, `app/(marketing)/products/sognosroster/page.tsx`, `app/(marketing)/products/sognosgenogram/page.tsx`

## 2026-07-02 — ProductTrustStrip wired to Roster + Genogram; Roster Advantages rewrite

- **`ProductTrustStrip` wired to Roster + Genogram pages**: added `<ProductTrustStrip />` after Hero (wrapped in `<ScrollReveal>`) in `sognosroster/page.tsx` and `sognosgenogram/page.tsx`. Strip stays `bg-white` / `grayscale` logos on all three product pages — consistent across Care/Roster/Genogram.
- **`sognosroster/Advantages.tsx` rewritten**: replaced old bento-grid layout with the Care Advantages pattern — `bg-sognos-roster-base` bg, AngelList sticky-rail checklist, Framer Motion stagger (`containerVariants`/`itemVariants`), white `CheckIcon`, `odd:bg-white/10` striped rows. New Roster-specific copy (6 items).
- **Files**: `components/sections/ProductTrustStrip.tsx`, `components/sections/sognosroster/Advantages.tsx`, `app/(marketing)/products/sognosroster/page.tsx`, `app/(marketing)/products/sognosgenogram/page.tsx`

## 2026-06-15 — Navbar: nav items py-3 + all CTA elements h-14 (56px)

- **Nav items `py-2 → py-3`**: both the dropdown `<button>` trigger and the non-dropdown nav `<Link>` get `px-4 py-3 rounded-full`. Taller hit target, more breathing room in the pill group.
- **Book a Demo (desktop): `h-14` + drop `py-*`**: `inline-flex items-center justify-center h-14 rounded-full px-5` — fixed 56px, no padding-dependent height. Applies to the `hidden lg:flex` desktop CTA.
- **Contact Sales (desktop): `inline-flex items-center h-14`**: was `px-4 py-2`; now `inline-flex items-center h-14 px-4`. Vertically centred at 56px, matches Book a Demo.
- **Book a Demo (sm/tablet): `h-14` + drop `py-*`**: `hidden sm:inline-flex lg:hidden items-center justify-center h-14 rounded-full px-4`.
- **Linter note**: `THEMES.dark.navGroup` auto-corrected `px-1` → `p-1`, adding 4px uniform padding on the transparent-state nav group — correct behaviour.
- **DOM verified**: `navGroupHeight: 56`, `primaryBtnHeight: 56`, `secondaryLinkHeight: 56` — all 56px in both transparent (homepage) and solid (`/company/about`) states. Mobile panel Book a Demo left as `py-3` (intentional).
- Files: `components/layout/Navbar.tsx`

## 2026-06-15 — Navbar: full-width 80px bar + transparency-over-hero

- **Structure**: `<header>` loses `px-4 pt-4` (floating capsule margin). Now `fixed inset-x-0 top-0 z-50`, flush full-width, square. Inner `<div ref={containerRef} class="relative mx-auto max-w-7xl px-6">` unchanged width — dropdown x/width math resolves against the same `max-w-7xl` container as before.
- **Height**: `h-20` (80px). Was `h-16` (64px) on the old pill bar.
- **Bar background**: `bg-transparent` at `scrollState === "top"` with dark-hero pages; `bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]` when scrolled. All-around `pillShadow` replaced with bottom-edge hairline.
- **Transparency-over-hero**: `DARK_HERO_PATHS = { "/", "/products/sognoscare", "/products/sognosroster", "/products/sognosgenogram" }`. Derived via `usePathname()` inside Navbar — no layout restructuring needed. Prop `transparentOverHero?: boolean` accepted for explicit override. Non-dark-hero pages always solid white.
- **`isTransparent`**: `useTransparent && scrollState === "top"`. Dropdown-open state does NOT switch the bar (stays in its current state — transparent if at top, white if scrolled).
- **Effective theme**: `t = isTransparent ? THEMES.dark : THEMES.light`. `THEMES.dark` values used for transparent-top: white logo (`brightness(0) invert(1)`), `text-white/80` nav text, `bg-white/10` nav-group + hover pill, `bg-white text-sognos-navy-dark` primary CTA, `text-white/65` secondary, `text-white/80` hamburger.
- **Mobile**: Hamburger `text-white/80 hover:text-white` over dark hero at top; `text-sognos-heading/60` when solid. Mobile panel always uses `THEMES.light.mobilePanel` (solid white — always readable).
- **Dropdown**: Always uses `THEMES.light.dropdownCard` (white card) regardless of bar transparency — readable on any bar state.
- **`THEMES` cleanup**: removed `pill`/`pillShadow` fields (bar bg now on `<header>`); filled `THEMES.dark.navGroup` from `""` → `"bg-white/10 rounded-full px-1"`.
- **`transition-[transform,opacity,background-color,box-shadow] duration-300`** on `<header>` for smooth bg + shadow transition.
- DOM verified: homepage top — `bg: rgba(0,0,0,0)`, `logoFilter: brightness(0) invert(1)`, `navGroup: bg-white/10`, `height: 80px`, hamburger `text-white/80`. `/company/about` top — `bg: rgb(255,255,255)`, `logoFilter: none`, `navGroup: bg-gray-100`. `/products/sognoscare` top — same as homepage (transparent, white). Build green.
- Files: `components/layout/Navbar.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: arrow fill-slide-up hover effect

- **Arrow buttons upgraded**: plain `hover:bg-gray-200/70` colour-swap replaced with the fill-slide-up mechanic from edition cards. Structure: `group/btn relative isolate overflow-hidden rounded-full` outer; `absolute inset-0 translate-y-full rounded-full bg-sognos-navy-dark transition-transform duration-300 group-hover/btn:translate-y-0` inner fill span; icon `relative z-10 transition-colors group-hover/btn:text-white`.
- **Contrast**: context is white section → navy fill (#0f1936) + white icon on hover. Inverse of editions (which use light pastel fills + dark icon). Rest state unchanged: navy icon, bordered circle.
- **Disabled guard**: `disabled:pointer-events-none` added so hover fill cannot fire on the disabled (start/end) arrow. `disabled:opacity-30` retained.
- **Hover scope**: named group `group/btn` scoped per-button — no conflict with card-level `group` in `StoryCard`.
- **Applies to**: `ProductCustomerStories` (product pages) + homepage `CustomerStories` wrapper (which delegates to it).
- DOM verified: fill `translate: 0px 100%` at rest; fill bg `rgb(15, 25, 54)` (#0f1936); disabled prev `pointer-events: none`. Build green.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — EditionCards: token rewire + partial purge + 140px logo + arrow contrast fix

- **`SOGNOSCARE_EDITIONS` accentColor → CSS var refs** (before→after per edition):
  - Disability & Mental Health: `#36b19a` → `var(--sognos-edition-disability)`
  - Allied Health: `#fea65d` → `var(--sognos-edition-allied-health)`
  - Hospital in the Home: `#c6da4c` → `var(--sognos-edition-hospital-in-the-home)`
  - Support at Home: `#ff8184` → `var(--sognos-edition-support-at-home)`
  - Residential Aged Care: `#c49aff` → `var(--sognos-edition-aged-care)`
  - Child & Family Services: `#ff6db4` → `var(--sognos-edition-child-and-family-services)`
    Token is now the single source of truth; prop interface unchanged.
- **Old edition token partial purge**: `--sognos-edition-lime` (#c6da4c) and `--sognos-edition-pink` (#ff6db4) removed from `tokens.css` — zero live references confirmed. Four remaining old tokens kept: `green/orange/coral/purple` still referenced in live files (see DESIGN_MIGRATION_STATE for full blocklist).
- **Logo bump**: `h-8 w-8` (32px) → `w-[140px]` container + `Image width={140} height={40}`. Verified rendered width = 140px.
- **Arrow contrast fix**: `group-hover:text-white` → `group-hover:text-sognos-heading`. All 6 new accent values are light pastels; white arrow was near-invisible (worst: `#cbdd61` at ~1.3:1 WCAG). Dark navy arrow reads well on every fill.
- DOM verified: 6 cards, glow resolves `rgb(0, 169, 143)` (#00a98f = disability token) on card 0. Build green.
- Files: `lib/constants.ts`, `components/sections/sognoscare/EditionCards.tsx`, `app/tokens.css`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — CustomerStories: rebuild as thin wrapper + page restore + type cleanup

- **`CustomerStories.tsx` rewritten**: 9-line thin wrapper that renders `<ProductCustomerStories stories={ALL_STORIES} />`. Replaced the old CSS scroll-snap carousel (overlaid-quote on image, IntersectionObserver active-slide, pill indicator, stats below card). Zero slider logic duplication — single source of truth in `ProductCustomerStories`.
- **Homepage `page.tsx` restored**: `<CustomerStories />` added back after `<NewsInsightSection>` — it had been dropped during the Cohere scaffold migration.
- **`CaseStudy` type cleaned up**: removed 10 legacy `*Class` fields (`panelClass`, `quoteClass`, `authorClass`, `roleClass`, `quoteIconColor`, `contentBorderClass`, `buttonBorderClass`, `buttonTextClass`, `buttonHoverClass`, `buttonIconBgClass`) that existed solely for the old `CustomerStories` layout. All 4 entries in `ALL_STORIES` updated accordingly.
- **DOM verified**: `#stories` section present on homepage, `bg-white`, heading "Customer Stories", `TESTIMONIAL_PALETTE` rotation confirmed (`bg-sognos-care-dark` / `bg-sognos-roster-dark` / `bg-sognos-genogram-dark`), gutter formula active (`max(1.5rem, -41.625rem + 50vw)`). Build green.
- Files: `components/sections/CustomerStories.tsx`, `components/sections/ProductCustomerStories.tsx`, `app/(marketing)/page.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: product-dark palette + border adjustments

- **Palette → product-dark tokens**: `TESTIMONIAL_PALETTE` is now 3 entries — `bg-sognos-care-dark` (#03112f) / `bg-sognos-roster-dark` (#0b3a66) / `bg-sognos-genogram-dark` (#250438) — rotated by `i % 3`. Replaces the prior 4-tone navy array.
- **Stat hairlines restored**: `border-b border-white/15` between Company Size and Industry rows (`pb-3` / `pt-3` pairing). AngelList stat-stack look.
- **Logo border removed**: `border-t border-white/15` on the logo wrapper removed — logo sits flush in the card.
- **Column divider removed**: `border-t border-white/15 md:border-t-0 md:border-l md:border-white/15` removed from right panel — no rule between text and image columns.
- **Net rules on card**: only the single stat hairline between the two stat rows.
- DOM verified: bg colours correct (`#03112f`/`#0b3a66`/`#250438`/`#03112f`), `logoBorder=0px`, `columnBorder=0px`, `statHairline=1px`. Build green.
- Tone audit: all 3 product-dark tones are dark enough for white text. No flags.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: per-card colour rotation + remove stat hairlines

- **`TESTIMONIAL_PALETTE`**: 4-entry array `["bg-[#0f1936]", "bg-[#1b3462]", "bg-[#0b3a66]", "bg-[#2e0a44]"]` (deep navy / mid navy-blue / slate-teal / plum). Applied by `i % 4` to each slide. Homepage `CustomerStories` will reuse this pattern.
- **Dark cards on white section**: `bg-white border border-sognos-line` removed from `StoryCard`. Card now takes `bg` prop (rotated palette class). All text → white: title, quote, author, link. Role → `text-white/70`. Stat labels → `text-white/60`.
- **Logo**: `brightness-0 invert` applied — renders white on all dark tones.
- **Internal dividers**: logo row `border-t border-sognos-line` → `border-t border-white/15`; right panel `border-l border-sognos-line` → `border-l border-white/15`.
- **Stat hairlines removed**: `pb-3 border-b border-sognos-line` between Company Size / Industry replaced with `flex flex-col gap-4` wrapper and plain `<div>` rows — no rules.
- **`StoryCard` signature**: now accepts `bg: string` prop in addition to `study`.
- **Single-story path**: also passes `TESTIMONIAL_PALETTE[0]` to `StoryCard`.
- **Type fields retained**: `CaseStudy` shape unchanged (homepage `CustomerStories` still consumes `*Class` fields); `*Class` props simply not consumed in this layout.
- DOM verified: all 4 bg colours correct, `hasWhiteText: true`, `logoFilter: brightness(0) invert(1)`, `statBorder: 0px`. Build green.
- Tone audit: all 4 are deep/saturated dark tones; white text contrast is comfortable on all. No flags.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: last slide right-gutter inset

- **Root cause**: browsers exclude trailing `paddingRight` from flex container `scrollWidth`. Embla computed `maxScroll = scrollWidth - viewportWidth = 4472 - 1280 = 3192`, which placed the last slide's right edge flush to the viewport. A zero-width spacer also failed (browsers skip zero-width items in scrollWidth calculation).
- **Fix**: removed `gap-6 sm:gap-8` from the flex container; replaced with `mr-6 sm:mr-8` on each slide EXCEPT the last. This eliminates automatic spacing before the trailing spacer div. The spacer (`width = max(1.5rem, calc((100vw - 86.25rem) / 2 + 1.5rem))`) now contributes exactly its own width to scrollWidth (no preceding gap), giving `scrollWidth = 4496`, `maxScroll = 3216`. At scroll=3216: last slide right = 1256px, right gap = 24px = gutter. ✓
- **Verified at 1280px**: `scrollWidth=4496`, `maxScroll=3216`, `lastSlide.right=1256`, `rightGap=24`, `slide0Left=24`. All three states screenshot-confirmed. Build green.
- Files: `components/sections/ProductCustomerStories.tsx`

## 2026-06-15 — ProductCustomerStories: gutter-inset first/last slides

- **Container gutter padding**: Embla flex container gets `paddingLeft/Right: max(1.5rem, calc((100vw - 86.25rem) / 2 + 1.5rem))` inline style — mirrors the `max-w-7xl px-6` formula for all viewport widths.
- **Slide max-width**: updated `lg:max-w-[1380px]` → `max-w-[1332px]` (= 1380 - 2×24 = container minus gutters).
- **Result**: first slide left edge = 24px at 1280px viewport, aligned to "Customer Stories" heading. Last slide right edge mirrors symmetrically. Middle slides retain both-side peek.
- **Verification**: `slide0Left=24`, `translateX=0`, no body horizontal scroll. Screenshot confirmed: Flourish Australia card starts at heading gutter, Auckland Airport peeks right.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: full-viewport-width peek slider

- **Full-bleed breakout**: Embla viewport moved to section level (outside `max-w-7xl`) — `relative overflow-hidden` div spans full section width. Heading + chrome remain in `max-w-7xl` wrappers.
- **Slide width**: `w-[calc(100vw-3rem)] lg:w-[calc(100vw-12rem)] lg:max-w-[1380px]`. On 1280px desktop → 1088px slide → **64px visible neighbour peek per side** for centered middle slides.
- **`align: "center"`** (was `"start"`) — active card centers in viewport; neighbours peek equally left and right.
- **`containScroll: "trimSnaps"`** clamps ends: slide 1 flush left (right-only peek), middle slides both-side peek, last slide flush right (left-only peek).
- **`loop: false`** — autoplay stops at last slide (no reset to first).
- **`StoryCard`** extracted as local component to avoid repeating card JSX for single-story path.
- DOM verified: first slide prevDisabled ✓, last slide nextDisabled ✓, no body horizontal scroll ✓, 64px peek at 1280px ✓. Build green.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: full-width slider + white/navy restyle

- **Embla config**: `loop: false`, `align: "start"`, `containScroll: "trimSnaps"` (was `loop: true`, `align: "center"`).
- **Slide width**: `w-full shrink-0` — one full-width card per view (was `sm:w-[95%] xl:w-[91%]` peek). Gap `gap-6 sm:gap-8` reveals next card's edge at right.
- **Autoplay at end**: stops on last slide, does not reset (no loop). `stopOnInteraction: true` retained.
- **Arrow bounds**: prev disabled on first slide, next disabled on last — via `canScrollPrev()` / `canScrollNext()` tracked on `select` + `reInit` events. Disabled state: 30% opacity, `cursor-not-allowed`.
- **Section**: `bg-gradient-hero` → `bg-white`. `data-header-dark` removed — navbar renders light treatment.
- **Heading**: eyebrow pill removed. `h2` retains "Customer Stories" copy, colour → `text-sognos-navy-dark`.
- **Card**: `bg-gray-200/70` → `bg-white border border-sognos-line` (hairline for definition on white section).
- **Text**: all card text → `text-sognos-navy-dark` (heading, quote, author, stats values).
- **Logo**: `brightness-0` removed — natural colour logo on white background.
- **Dots**: `bg-white` / `bg-white/35` → `bg-sognos-navy-dark` / `bg-sognos-navy-dark/25`. Arrow borders: `border-white/30` → `border-sognos-line`. Arrow hover: `hover:bg-white/10` → `hover:bg-gray-200/70`.
- DOM verified: first slide → prevDisabled true, nextDisabled false, selectedDot 0. Last slide → nextDisabled true, prevDisabled false, selectedDot 3.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: Embla slider rewrite

- **Replaced** crossfade + logo-tab row + progress bar mechanic with Embla carousel (`embla-carousel-react` + `embla-carousel-autoplay`).
- **Carousel config**: `loop: true`, `align: "center"`, autoplay 10s `stopOnInteraction: true`. Slide width: `w-full sm:w-[95%] xl:w-[91%]` — next card peeks at edge.
- **Chrome**: dot indicators (centered, active dot pill-expands `w-4 h-2`, inactive `w-2 h-2 opacity-35`) + prev/next chevron arrow buttons `size-12 rounded-full border border-white/30` (desktop only, `hidden lg:flex`).
- **Single-story guard**: `showChrome = total > 1`. With 1 story, Embla ref/plugins not attached, chrome hidden. Verified on SognosCare (1 Sanity story → no chrome).
- **Card edits**: `bg-white` → `bg-gray-200/70`. `AnimatedButton` removed → plain `Link` with `underline underline-offset-4 hover:opacity-60`. `QuoteIcon` removed. "Read Customer Story" link positioned below author/role (above logo row).
- **Logo row**: moved fully to bottom with `border-t border-sognos-line`. No CTA button alongside it.
- Removed imports: `AnimatePresence`, `motion`, `AnimatedButton`, `cn`. Added: `useEmblaCarousel`, `Autoplay`, `Link`, `useCallback`.
- DOM verified: 4 cards + 4 dots on SognosRoster (4 ALL_STORIES). 1 card + 0 dots on SognosCare (1 Sanity story).
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — ProductCustomerStories: AngelList two-panel card layout

- **Card body restructured** from left-image-panel / right-quote-panel to AngelList two-column: text left (`md:col-span-7`) + portrait image + stats right (`md:col-span-3 md:col-start-9`) in an `md:grid-cols-11` grid. 1-column gap built in via `col-start-9`.
- **Left column** (top→bottom): company name h3 (`font-heading text-2xl md:text-3xl font-medium tracking-tight`) → QuoteIcon → blockquote → author/role → bottom row: logo left (`brightness-0`) + AnimatedButton CTA right, separated by `border-t border-sognos-line`.
- **Right column**: portrait image (`relative flex-1 rounded-lg overflow-hidden mb-4`) + stats below (`Company Size` / `Industry`, border-divided rows).
- **Card bg**: `bg-white rounded-lg overflow-hidden` (unchanged). Section stays `bg-gradient-hero`. Per-product colour flagged as follow-up.
- **Logo**: moved to bottom-left of text column with `brightness-0` (dark logo on white). Previously centered on dark image panel.
- **Image shape**: portrait `rounded-lg` filling available height (not `rounded-full`). Flagged AngelList `rounded-full` as too aggressive for customer photos.
- **Stats**: two rows (Company Size + Industry). Third metric flagged — needs Sanity schema field + backfill before it can be rendered.
- **No-image degradation**: right column renders stats only if `panelImage`/`panelVideo` absent (flex-1 div collapses; stats remain). Not explicitly tested since all stories have images.
- **Autoplay / tab row / crossfade**: unchanged. `buttonClassName` / `*Class` props: still consumed (consistent values across all stories).
- **Note**: SognosCare page passes CMS stories (1 live in Sanity dev). `ALL_STORIES` fallback has 4 stories. Homepage `CustomerStories.tsx` is next to match same layout.
- DOM verified: h3, quote, stat labels, logo in left col, `col-start-9` right col all confirmed.
- Files: `components/sections/ProductCustomerStories.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — Homepage: remove SognosCareCard + SognosRosterCard

- Removed `<SognosCareCard />` and `<SognosRosterCard />` render calls + imports from `app/(marketing)/page.tsx`.
- Deleted component files: `components/sections/SognosCareCard.tsx`, `components/sections/SognosRosterCard.tsx`.
- Both were homepage-only (grep confirmed). Standard framework imports only (`next/link`, `next/image`) — no shared helpers.
- Orphaned images (`SognosCareImg.png`, `SognosRosterImg.png` in `public/images/home/`) left in place — `public/` assets don't affect build. Bg images (`SognosCare-bg.avif`, `SognosRoster-bg.png`) still used by `HomeProductCards` — untouched.
- Homepage section order now: `Hero → HomeProductCards → LogoStrip → HowSognosWorks → IndustrySection → SolutionsSection → NewsInsightSection`.
- DOM verified: no `SognosCareCard`/`SognosRosterCard` sections in render tree. Build green.
- Files: `app/(marketing)/page.tsx`, `docs/DESIGN_MIGRATION_STATE.md`, `docs/CHANGELOG.md`

## 2026-06-15 — SognoscareAdvantages: sticky left label

- Added `lg:sticky lg:top-[100px] lg:self-start` to the left `lg:col-span-2` label column.
- `self-start` required — grid stretches items to full row height by default, making sticky a no-op without it.
- `top-[100px]` matches the offset used across all sticky rails in the project (Editions, ProductFeaturesScroll etc.).
- Desktop only (`lg:` prefix); mobile layout unchanged (label sits above checklist in stacked column flow).
- DOM verified: `position: sticky`, `labelY: 100px` while `sectionTop: -14px sectionBottom: 689px` (section scrolling past).
- Files: `components/sections/sognoscare/Advantages.tsx`, `docs/CHANGELOG.md`

## 2026-06-15 — SognosCare Editions: revert to single-column layout

- Removed two-column Features-style layout (left sticky "Editions" rail + right column).
- Section is now a single full-width column: heading + intro above the `EditionCards` slider.
- Deleted: `flex gap-10 lg:flex-row` wrapper, left rail div (`lg:w-44 xl:w-52 lg:sticky lg:top-[100px]`), right `flex-1 min-w-0` wrapper.
- Heading (`text-3xl md:text-4xl font-medium tracking-tight`), intro (`mt-2 max-w-2xl text-lg text-sognos-muted`), `mb-12` spacing before slider — all unchanged, now at root level.
- Section bg `bg-gray-200/70 py-24`, `max-w-7xl px-6`, `EditionCards` `showSliderButtons` all preserved.
- Files: `components/sections/sognoscare/Editions.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — HomeProductCards: fix mobile card width (aspect-ratio intrinsic sizing)

- **Root cause:** `min-w-[82vw]` (and prior `min-w-[82%]`) was not the issue — the card's actual width was driven past `min-width` by the `aspect-[3/4]` div. When an element has `aspect-ratio` set and no explicit dimensions, the browser uses it in intrinsic size calculation, which the flex algorithm then honours as the item's "hypothetical main size". This made the card ~570px on a 390px viewport.
- **Fix:** Replaced `min-w-[82vw]` with explicit `w-[82vw]` on mobile + `md:w-auto` on desktop reset. An explicit `width` pins the card dimension; the aspect div then sizes correctly off the card width (319.8px → image height 426px ✓).
- **Verified:** cardW: 319.8px, imgDivH: 426px (3/4 ratio), cardH: 579px — all in proportion. Desktop grid unchanged.
- Files: `components/sections/HomeProductCards.tsx`

## 2026-06-15 — HomeProductCards: mobile swipe slider

- Container changed from `grid grid-cols-1` → `flex snap-x snap-mandatory overflow-x-auto scroll-px-6 scrollbar-hide gap-3` on mobile, reverting to `md:grid md:grid-cols-3 md:overflow-visible lg:gap-4` on desktop.
- Each card gains `min-w-[82%] shrink-0 snap-start` (mobile: 82% width, one card + next peeks) + `md:min-w-0 md:shrink` reset (desktop: grid cell, no width constraint).
- Uses existing `scrollbar-hide` utility from `globals.css` (`@utility scrollbar-hide`).
- Desktop: 3-column grid unchanged. Mobile: horizontal snap slider with peek. Both verified by screenshot.
- Build clean. FLAG noted: dot indicators deferred to styling pass.
- Files: `components/sections/HomeProductCards.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — HomeProductCards: AngelList column layout + hover = button only

- Restructured each product column to: top hairline (`border-t border-white/15`) → `pt-4` → title (h3 above image) → `aspect-[3/4] rounded-lg` image card → description (always visible, `mt-5 text-lg text-white/70`) → `pb-6` → bottom hairline (`border-b border-white/15`).
- Title moved OUT of image card, sits above it. Description moved OUT of image card, always visible below it — hover-reveal removed entirely.
- Radial accent glow removed completely.
- Arrow button restyled: `border border-white/30` transparent base (was `bg-white/10`); accent fill still slides up on `group-hover`. Arrow stays white. This is the sole hover effect.
- Logo stays absolute top-left inside image card. Bg image + dark overlay unchanged.
- DOM-confirmed: `border-t`/`border-b` present, glow removed, description always visible, arrow button present, 3 cards.
- Build clean. Screenshot: titles peeking below hero at load; top hairlines visible.
- Files: `components/sections/HomeProductCards.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — Homepage: navy hero + HomeProductCards (3-product AngelList card section)

- `Hero.tsx` reworked: `bg-white` → `bg-sognos-navy-dark`; two-card panel + `useRef`/`useScroll`/`useTransform` removed; `pt-40 pb-20` text-only block; heading/subtext → `text-white`/`text-white/70`; primary CTA → `variant="white"`; secondary link → white/30 border + `text-white/70`. Stagger fadeUp entrance retained on individual `motion.h1`/`motion.p`/`motion.div` elements.
- `HomeProductCards.tsx` created: new section, `bg-sognos-navy-dark pb-24`, seamless navy zone with hero (cards peek above fold). `grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4`. AngelList fund-admin card pattern: `min-h-[400px] rounded-lg`, bg image (opacity-20 with dark overlay), top-left accent radial glow (opacity-0 → group-hover), white-inverted logo (`brightness-0 invert`), hover-revealed description, circular arrow button (accent fill-up on hover). Per-product accents: Care `#1d96fc`, Roster `#59bbf7`, Genogram `#91278c`. FLAGs: Genogram bg = Care bg placeholder; description hover-only on mobile.
- `page.tsx` updated: `HomeProductCards` inserted between `Hero` and `LogoStrip`.
- **Flags noted:** `SognosCareCard` + `SognosRosterCard` full-bleed sections later on page are now redundant with this card section — left in place, flagged for separate decision.
- DOM-confirmed: 3 cards (`/products/sognoscare`, `/products/sognosroster`, `/products/sognosgenogram`), glow + arrow button present, `md:grid-cols-3` grid. Screenshot confirms navy hero + cards peeking.
- Build clean (exit code 0).
- Files: `components/sections/Hero.tsx`, `components/sections/HomeProductCards.tsx`, `app/(marketing)/page.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — SognosCare Editions: heading + intro moved into right column

- Left rail trimmed to "Editions" label only (removed "Six editions. One platform." subline).
- Right column gains heading ("Choose the Right SognosCare Edition for Your Service") + intro paragraph (`max-w-2xl text-lg text-sognos-muted`, `mb-12`) above the `EditionCards` slider.
- Copy hardcoded — no prop reintroduced.
- DOM-confirmed: rail has no `h2`, right `h2` + intro present, 6 cards, build clean.
- Files: `components/sections/sognoscare/Editions.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-15 — SognosCare Editions: two-column section restructure (Features-style rail)

- `Editions.tsx` rewritten to two-column layout: left sticky rail (`lg:w-44 xl:w-52 lg:sticky lg:top-[100px]`) with "Editions" eyebrow pill + "Six editions. One platform." heading; right `flex-1 min-w-0` column holds the `EditionCards` slider. Mobile collapses to `flex-col` (rail stacks above cards).
- Removed old single-column heading block ("Choose the Right SognosCare Edition…" + intro) — editions carry their own title + description on each card.
- Removed `header` prop and `SectionHeader` type from the component interface; removed `header={content.editionsHeader}` from `sognoscare/page.tsx` call site.
- `bg-gray-200/70` section bg, slider buttons, and all slider mechanics unchanged.
- DOM-confirmed: `hasTwoCol: true`, rail "Six editions. One platform.", 6 cards, slider buttons present.
- Build clean (exit code 0).
- Files: `components/sections/sognoscare/Editions.tsx`, `app/(marketing)/products/sognoscare/page.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-13 — SognosCare EditionCards: AngelList fund-admin card pattern (scaffold)

- `EditionCard` fully rewritten: `aspect-[3/4]` tall card, top-left radial glow per edition `accentColor` (opacity-0 → group-hover:opacity-100, 700ms), hover-revealed description (translate-y-2/opacity-0 → group-hover, 300ms), bottom row with edition title + circular arrow button (accent fill slides up via translateY+scale from `accentColor`). Slider wrapper, `ArrowButton`, `ArrowIcon` unchanged.
- `dark` prop retained for `EditionPageTemplate` compat but not applied to new card style.
- `Editions.tsx`: removed dark `SECTION_BG` const; section bg → `bg-gray-200/70 py-24`; heading + intro text → `text-sognos-heading` / `text-sognos-muted`. Slider header rail preserved.
- DOM-confirmed: 6 white cards on `/products/sognoscare`, section bg correct; `RelatedEditions` on edition page renders 5 cards with transparent bg (correct).
- FLAGs in code for styling pass: swap logo placeholder to per-edition icon; make description always-visible on mobile. Edition token migration pending (separate task).
- Build clean.
- Files: `components/sections/sognoscare/EditionCards.tsx`, `components/sections/sognoscare/Editions.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-13 — Navbar: light-theme bar styling (AngelList — 80px, gray nav group, navy hover pill)

- Height bumped from `h-14` (72px total) → `h-16` (64px capsule + 16px `pt-4` = **80px total**).
- Scroll shadow now **conditional**: `scrollState !== "top" ? theme.pillShadow : ""` + `transition-shadow duration-300`. No shadow at page top; soft lift shadow on scroll-up (peek) and scroll-down (hidden) states.
- Added `navGroup` key to `NavTheme` interface. `THEMES.light.navGroup: "bg-gray-100 rounded-full px-1"` — persistent light-gray pill container behind the centered desktop nav group. `THEMES.dark.navGroup: ""` (structural addition, no visual change to dark).
- `THEMES.light.hoverPill` changed from `"bg-gray-100"` → `"bg-sognos-navy-dark"`.
- Active nav item text: `isActive ? "text-white" : theme.text` — text flips to white over the navy pill.
- Nav items: `text-sm` → `text-base`, `tracking-[-0.002em]` added, `duration-150` → `duration-200`.
- Dropdown panel, mobile menu, `THEMES.dark` visual values unchanged.
- Build clean.
- Files: `components/layout/Navbar.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-13 — SognosCare hero: move scroll transform from panel → whole-hero wrapper (AngelList pattern)

- Removed the `motion.div` that was only wrapping the blue panel — this caused the panel to detach and slide off the dark background on scroll, exposing white body bg below.
- Introduced a single `motion.div style={{ y, opacity }}` that wraps ALL hero content: eyebrow, headline, subtext, CTAs, and panel. Everything fades/translates as one block.
- `<section>` retains `bg-sognos-care-dark` as a static background that never transforms — the body's white bg is never exposed.
- Panel downgraded from `motion.div` to a plain `<div>` inside the animated wrapper.
- Transform values/ranges unchanged (`y: [0, -60]`, `opacity: [0.5,1]→[1,0.7]`).
- Roster and Genogram heroes unchanged (no scroll transforms applied, confirmed).
- Build clean.
- Files: `components/sections/sognoscare/Hero.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

## 2026-06-12 — Navbar: single-panel dropdown morph (fm v12 width fix)

- Replaced per-item `layoutId="nav-dropdown"` (caused flash + squash) with a single content-fit panel living outside `nav.map`.
- Hidden measurer elements (off-screen, `position:absolute; left:-9999px`) measure each dropdown group's natural width at mount; stored in `panelWidths` ref.
- `panelX` (`useMotionValue`) spring-animates the x transform between items via imperative `animate()`. On first open: `panelX.set()` (snap, no slide from edge).
- `panelWidth` (`useState`) replaces the previous `panelW = useMotionValue(0)`. Root cause of the zero-width bug: framer-motion v12 routes `animate(motionValue, target, spring)` for non-transform CSS properties (like `width`) through `AsyncMotionValueAnimation` — an async resolver path — so the DOM style never updated synchronously. React state set inside `useLayoutEffect` flushes before browser paint, giving instant correct width with zero flicker.
- Content crossfades via `AnimatePresence mode="wait"` keyed on `openMenu`; panel box holds its measured width while content swaps.
- No CSS `transform` on the panel element; panel is positioned `absolute left-0 top-full` and moved entirely via the `x` motion value.
- `rounded-2xl` on dropdown card noted as design-system violation (`rounded-lg` hard rule) — left intentionally for styling phase.
- Build clean.
- Files: `components/layout/Navbar.tsx`, `docs/DESIGN_MIGRATION_STATE.md`

> Append-only. Newest entries at the top. One entry per task: date · what · files · why.

## 2026-06-12 — SognosCare Problems: Lumos-style layout rewrite

- `Problems.tsx` fully rewritten: replaced sticky scroll-spy rail + Problem/Solution card pairs with Lumos layout — problem statement → `mt-28 md:mt-40` breath → solution reveal → 5 slim capability columns.
- Section bg changed from dark `bg-sognos-care-dark` to light `bg-white`.
- Capability columns: `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`; `border-t border-sognos-line` cap line; `lg:divide-x lg:divide-sognos-line` vertical dividers; `absolute bottom-0` static `bg-sognos-blue-accent` accent bar per column (scaleX reveal target for follow-up motion pass).
- `subNav` slot preserved: centred above problem block (`mb-16 flex justify-center`).
- All props remain optional with sensible defaults — call site updated only to drop the now-removed `header` and `problems` Sanity props; `subNav={<ProductSubNav …>}` unchanged.
- Scroll-spy rail + Problem/Solution card pairs archived verbatim to `docs/archive/sognoscare-Problems.scrollspy-rail.tsx` for reuse on Roster/Genogram.
- Static pass (no entrance motion); Lumos choreography planned in follow-up prompt.
- Build clean (`✓ Compiled successfully in 28.9s`).
- Files: `components/sections/sognoscare/Problems.tsx`, `app/(marketing)/products/sognoscare/page.tsx`, `docs/archive/sognoscare-Problems.scrollspy-rail.tsx`

## 2026-06-12 — Navbar: AngelList morph dropdown + chevrons + content-fit width

- `layoutId="nav-dropdown"` added to per-item dropdown panel — Framer springs panel position + size from item to item on switch (AngelList morph, no close/reopen).
- Dropdown moved from `absolute left-0 right-0` (full-width) to `absolute top-full left-1/2 -translate-x-1/2 w-max` — panel anchors under active item and sizes to content.
- `openOnHover` updated: instant switch (`setOpenMenu` directly) when `openMenuRef.current !== null`; 100ms intent delay kept for initial open.
- `DropdownContent` changed from `grid grid-cols-N` to `flex gap-8` with `w-max` link columns + `w-48 min-h-[280px]` gradient; enables natural content-fit panel widths.
- Chevrons added to all dropdown buttons (`motion.svg`, `rotate: 0→180` when open, `duration: 0.2`).
- `navigation.ts`: TEMP marker comments on col2/col3 of "Why Sognos" + "Knowledge Hub" (both were already empty; comments make intent explicit, reversible).
- Transition: `layout: spring/bounce:0.15/0.4s`, `opacity+y: 0.15s`.
- `openMenuRef` mirror ref added for stale-closure safety in `openOnHover`.
- Build clean. DOM-confirmed: morph panel under Products/Why Sognos, content-fit `w-max`, instant switch, chevrons rendered.
- Files: `components/layout/Navbar.tsx`, `lib/navigation.ts`

## 2026-06-12 — Navbar: Aceternity pill + hover-pill framework

Full rewrite of `components/layout/Navbar.tsx`:

- Floating pill bar (`rounded-full`, `h-14`, `px-4 pt-4`, `max-w-7xl` centered, `border border-black/5`, dark shadow)
- `layoutId="nav-hover-pill"` spring-animated sliding highlight — tracks `hovered` state, falls back to `openMenu` item when cursor moves to dropdown
- Dark-shadow dropdown card (`rounded-2xl`, `AnimatePresence` opacity/scale/y) — uses existing `DropdownContent` unchanged
- `variant: "light" | "dark"` prop seam via `THEMES` object — dark slot filled with placeholder values for future use
- Retired: transparent-over-hero text-switching, `showWhiteBar` colour logic, `data-header-dark`
- Kept: three-state scroll (`top`/`hidden`/`peek`), hover-intent timers (100ms/150ms), mobile accordion, `useBookDemo`, body-scroll-lock, backdrop-blur, click-outside/scroll-to-close
- Build + TypeScript clean. DOM-confirmed: pill classes, 5 nav buttons, both CTAs rendered.
- Files: `components/layout/Navbar.tsx`

## 2026-06-12 — SognosCare: hero gap + Problems section rewrite

- `sognoscare/Hero.tsx`: `pb-8 md:pb-12` → `pb-4 md:pb-0` (achieves 5rem total visual gap to `ProductTrustStrip` which carries fixed `pt-16/pt-20`).
- `sognoscare/Problems.tsx`: full rewrite — crossfade/autoplay removed; replaced with sticky scroll-spy rail (desktop-only `hidden lg:block`) + flowing problem/solution card pairs; `problem-rail-bullet` spring `layoutId`; `subNav` slot at `mt-20`; `label?` optional, falls back to `problem` text (Sanity data has no `label`). Dark `bg-sognos-care-dark` and `border-sognos-blue-accent` accent retained.
- Files: `components/sections/sognoscare/Hero.tsx`, `components/sections/sognoscare/Problems.tsx`

## 2026-06-12 — Home hero: product-hero layout (two-card panel)

- Hero replaced with product-hero layout in light skin: `pt-40` centered text block + `mt-16` `lg:grid-cols-3` two-card panel (left `col-span-2`, right `col-span-1`) with `useScroll` parallax/fade. Cards are placeholder slots.
- `HeroOutcomes.tsx` removed (was untracked; deleted).
- Pre-existing typo fixed: `headlinae` → `headline` in `sognoscare/Hero.tsx` DEFAULTS (was blocking build).
- Files: `components/sections/Hero.tsx`, `components/sections/sognoscare/Hero.tsx` (typo), `app/(marketing)/page.tsx`

## 2026-06-12 — Home hero reframe + HeroOutcomes bridge section

- Hero reframed to light bg (`bg-white`); `data-header-dark` removed; bg image removed; gradient headline span removed; dark text tokens applied; `AnimatedButton variant="brand"`; secondary CTA darkened to `text-sognos-navy-dark`.
- `HeroOutcomes.tsx` created: `lg:grid-cols-3` 2/3+1/3 bridge section; three-part field-first tagline with stagger; 3 navy stat cells (TODO values, CTASection pattern); commented placeholder visual slot.
- `page.tsx`: `HeroOutcomes` inserted between `Hero` and `LogoStrip`.
- Files: `components/sections/Hero.tsx`, `components/sections/HeroOutcomes.tsx`, `app/(marketing)/page.tsx`

## 2026-06-12 — ProductSubNav dock-from-bottom

- `ProductSubNav.tsx` rewritten: `IntersectionObserver` on in-section sentinel; fixed bar at `top-[76px] lg:top-[68px] z-40` with `AnimatePresence` slide-in; `dockBg` prop for per-product theming; separate `layoutId` prefixes for inline vs docked pills; dual `navRef` for mobile scroll-into-view on both states.
- Files: `components/ui/ProductSubNav.tsx`

## 2026-06-12 — Docs consolidation

- Established `docs/` structure; moved feature backlog → `docs/FEATURE_LOG.md`.
- Archived historical audits + PHASE6 plan under `docs/archive/` with superseded banners.
- Rewrote `README.md` from boilerplate; added source-of-truth/session-loop rules to `CLAUDE.md`.
- Removed `docs/` from `.gitignore` so the directory is tracked.
- Removed `PHASE7_REDESIGN.md` (abandoned `redesign` direction).
- Created `docs/CHANGELOG.md` (this file).
- Updated `docs/DESIGN_MIGRATION_STATE.md`: §8 backlog pointer, §2 hard-rules canonical-source note, §10 file map rows for new docs.
