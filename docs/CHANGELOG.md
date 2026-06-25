# Changelog

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
