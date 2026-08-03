# Sognos Design Migration - State of Record

> **Last reconciled:** 2026-07-30 against the live `redesign` worktree and
> [`CHANGELOG.md`](./CHANGELOG.md).
>
> This is the current implementation record. Historical implementation detail
> belongs in the changelog. Update this document when routes, shared patterns,
> tokens, or known migration debt change.
>
> **Related docs:** [`SLIDER_PATTERN.md`](./SLIDER_PATTERN.md) for shared
> carousel behavior and [`CONTENT_AUDIT.md`](./CONTENT_AUDIT.md) for the Sanity
> article/customer-story content inventory.

---

## 1. Current Baseline

Sognos is a marketing site for a Microsoft Dynamics 365-based service-operations
platform. The current stack is:

- Next.js **16.2.2**, App Router, Turbopack
- React, TypeScript, Tailwind CSS v4 (CSS-first)
- Framer Motion for interaction and scroll-linked motion
- Sanity CMS for marketing, legal, article, customer-story, footer, and CTA content
- Supabase and Resend for the event-registration workflow
- shadcn-compatible UI structure under `components/ui`

The migration direction combines a restrained Sognos design system with
AngelList-inspired product/content layouts and selected modern interaction
patterns. The homepage is no longer a direct Cohere clone; the live code is the
authority for section order and behavior.

## 2. Reconciliation Flags

These are current discrepancies, incomplete migrations, or operational risks.

| Priority | Flag                                           | Current reality                                                                                                                                                                                                                                  |
| -------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| High     | Design hard rules are not fully enforced       | Live marketing/UI files still contain `rounded-xl`, `rounded-2xl`, `bg-gray-100`, and shadow utilities. Treat the rules below as the target for new work, not a claim that migration is complete. The About page's Partners / Social Responsibility / Careers sections were swept on 2026-08-02 and are clean; the rest of the page and site are not audited. Two invalid classes (`text`, `text-md`) turned up in that sweep — worth grepping for elsewhere, since they fail silently. |
| High     | Partner logo assets have opaque backgrounds    | All four files in `public/logos/partners/` carry a baked-in background rather than transparency — Microsoft `#FFFFFF`, SoftwareOne `#000000`, Ingram Micro `#1570EF`, Resco `#0066CC`. The About page partner cards now show **the logo alone, centred on navy**, as their resting state, so each one reads as a coloured rectangle floating on the card. Needs transparent PNG/SVG replacements, or a deliberate per-logo plate. Inverting does not help: inverting an opaque image inverts the whole rectangle. The Ingram file is additionally cropped at its own edges. |
| Medium   | Social Responsibility pillar tabs are dead UI  | `SocialResponsibilitySection.tsx` renders its three-pillar tab row inside a container carrying `hidden`. `setActiveSR` is only called from there, so `activeSR` is permanently `0`: two of the three pillars are unreachable and the component is a Client Component whose state can never change. Decide whether to restore the tabs, show all pillars statically, or delete the tab markup and make it a Server Component. |
| High     | Old edition tokens remain live                 | `--sognos-edition-green` is still used by product, industry, solution, and integration surfaces. The legacy `orange`, `coral`, and `purple` definitions also remain in `app/tokens.css`. Do not purge these tokens until all references migrate. |
| Medium   | Workhorse tokens remain                        | `app/globals.css` still exposes temporary `--color-wh-*`, `--radius-wh-*`, and `--shadow-wh-*` tokens. Their consumers must be audited before removal.                                                                                           |
| Medium   | Product feature visuals are mixed              | Several feature/flow components remain placeholders or scaffolds. `PlaceholderBox`, hard-coded green values, and visual prototypes still exist alongside production content.                                                                     |
| Medium   | `CTASection.tsx` is now live in a variant flow | The component is no longer merely an unused 25 KB scaffold: its drawer-style `bare + hideStats` variant was redesigned on 2026-07-23. Confirm all intended call sites before deleting or simplifying it.                                         |
| Low      | Solution image cleanup pending                 | The tracked solution image mapping uses remote per-solution imagery. Two local files, `CustomerServiceHero.webp` and `FrontlineHero.webp`, remain untracked and are not part of the current committed implementation.                            |
| Low      | Typography scale remains provisional           | The `--text-*` values are still Tailwind defaults. Page-level compositions establish the practical hierarchy, but a final token lock pass has not happened.                                                                                      |

Resolved items:

- Article routes rendering as a blank white page on first click. `PageTransition`
  gated the Navbar and the whole page behind a Framer `AnimatePresence
  mode="wait"` enter animation, which raced the router commit on the slowest
  routes and stranded the wrapper at `opacity: 0`. It is now a CSS animation
  with no fill mode, so a transition that fails to run leaves the page visible.
  **Only reproducible in a production build** — dev never showed it.
- The project is on Next.js 16 and uses `proxy.ts`; `middleware.ts` was removed.
- The navbar banner no longer performs synchronous `setState` inside an effect.
- Customer-story/article 404s were traced to an unreadable local Sanity env
  symlink; `.env.local` is now a real local file.
- The deprecated Sanity image builder default import was replaced with
  `createImageUrlBuilder`.
- SognosGenogram naming is normalized across tracked UI, metadata, forms,
  navigation, content, and docs.
- Roster and SognosGenogram problem sections use their dark product themes.
- The style guide now reflects the live lean token system and current
  production component treatments.

## 3. Conventions

### Section system (locked 2026-08-03)

Applied across the homepage and all three product pages. Each value is the one
already most common in the codebase; Routable was used only to calibrate the
vertical rhythm.

| Concern | Value |
|---|---|
| Section rhythm | `py-20 md:py-28` |
| Section `h2` | `font-heading text-3xl font-medium tracking-tight md:text-4xl` |
| Statement `h2` | as above but `md:text-5xl` — `HeadlineCTA`, `SolutionsSection` only |
| Hero `h1` | `font-normal`, one tier above section headings |
| Container | `mx-auto max-w-7xl px-6` |
| Radius | `rounded-lg` on surfaces · `rounded-full` on **buttons only** |
| Body measure | `max-w-2xl` body · `max-w-3xl` hero sub |
| Light section bg | `bg-sognos-tint` |

Not yet applied to: solutions, industries, Knowledge Hub, customer stories,
edition sub-pages.

### Tailwind v4 CSS-first

- There is no `tailwind.config.js`.
- Primitive and semantic CSS variables live in `app/tokens.css`.
- Tailwind mappings live in `@theme inline` in `app/globals.css`.
- `--color-{name}` mappings generate `bg-*`, `text-*`, and `border-*`
  utilities.
- Dynamic class construction is avoided where Tailwind cannot statically detect
  the class.
- **A new `@theme` key needs a full rebuild, not a dev-server restart.** Adding
  `--color-sognos-tint` produced no utility until `.next` was deleted entirely
  and the project rebuilt; restarting the server and clearing `.next/cache` both
  failed. Verify by grepping the built CSS in `.next/static/chunks/*.css`, not
  by eye.

### Layout target

- Main content container: `max-w-7xl` (`1380px`) with `px-6`.
- Standard section rhythm: generally `py-20`, `py-24`, or `lg:py-28`.
- Standard production card radius: `rounded-lg` or smaller.
- Standard grid gap: `gap-3 lg:gap-4`, unless a composition deliberately needs
  more editorial breathing room.
- Preferred light section surface: white or the explicitly selected neutral
  band used by that route. Existing `gray-50/100/200` differences are still
  being reconciled.
- Avoid decorative shadows on ordinary content cards; use borders and surface
  contrast first.
- Primary lead-generation label: `Book a Demo` or `Book a demo` according to
  the component's established copy casing.

### Motion references

- `ProductFeaturesScroll.tsx` and `SolutionsSection.tsx`: sticky rail plus
  requestAnimationFrame-throttled scroll-spy.
- `ArticleScrollNav.tsx`: shared article heading nav for Knowledge Hub and
  Customer Stories; supports either its own track or a page-level full-height
  rail. Responsive by breakpoint — sidebar rail from `lg`, sticky collapsible
  dropdown below it, both driven by one scroll-spy. Both call sites wrap it in
  a `contents lg:block` element so the sticky mobile bar is bounded by the
  full-height body grid rather than a self-sized column.
  - Desktop rail spacing and type follow `mintlify.com/customers/coinbase`:
    mono uppercase label flush to the column edge, items at `pl-7` with
    `gap-2` and `text-sm leading-6`, list capped at `max-h-[50vh]` and
    scrollable. Colours stay on the Sognos tokens.
  - The active marker is `inset-y-0 w-[1.5px]`, not a fixed-height tab. The
    existing `layoutId` animates the whole box, so it grows and shrinks to
    each item's line count with no measurement code — do not give it a fixed
    height.
  - **One treatment for both templates.** The rail looks the same on Knowledge
    Hub and Customer Stories, and both now sit in the same right-hand column
    with `ShareIcons` beneath.
- `ArticleProgressLine.tsx`: read-progress line in the column between the meta
  rail and the prose on both article families. Full-height track with the fill
  inside a viewport-tall sticky box, scaled from its top edge so the indicator
  stays compact rather than trailing the full scrolled length behind. Takes a
  `top` prop (default 144) that must match the sticky offset of the rail beside
  it. Distinct from `scroll-progress.tsx`, which is the fixed page-top bar.
- `scroll-progress.tsx`: fixed, spring-smoothed page progress indicator shared
  by Knowledge Hub posts and customer stories.
- `AboutHeroImage.tsx`: full-width image that shrinks to the main container with
  scroll-linked parallax and reduced-motion handling.
- Product heroes: `useScroll`/`useTransform` fade and vertical movement with a
  reduced-motion guard.
- `Advantages.tsx`: staggered `whileInView` checklist.
- `ProductCustomerStories.tsx`: one-up card capped at three stories, swapped in
  place by `AnimatePresence` with per-element curves (split-testimonial
  pattern), three indicator blocks below carrying a `layoutId` outline, and
  `TimerCardDeck`'s exported `ProgressButton` ring driving autoplay off a
  single rAF clock. No carousel library.
- `Hero.tsx` primary CTA: work-button-style bottom-up accent fill.
- `StoryHeroMedia.tsx`: customer-story hero video. Logo rises in (0.6s), holds
  (2.6s), falls away (0.5s) while the video crossfades up over 0.9s — the
  overlap keeps the panel from ever being empty. Video is never autoplayed.
- `Hero.tsx` blur layers: three glow images at the foot of the section, each
  resolving out of `blur(24px)` as it rises, staggered back to front; wrapper
  is `isolate` so their z-values stay under the content.
- `AnimatedEyebrow.tsx`: reduced-motion-aware square-marker and text entrance,
  with independently configurable dot and text colours.
- `HowSognosWorks.tsx`: auto-advancing three-step timeline with manual
  selection and reduced-motion handling.
- `TimerCardDeck` image panel: all slides share one grid cell; the incoming
  image rises from `translate-y-full` as the outgoing one drops back to it,
  both fading over 800ms. Frame ratio comes from `panelAspect`.
- Navbar dropdown: measured content-fit panel, directional content transition,
  hover-intent timers, and a two-level full-screen mobile menu.

## 4. Design Tokens

Source of truth: `app/tokens.css`, surfaced to Tailwind by `app/globals.css`.

### Core brand

| Token                   | Value     | Primary use                                   |
| ----------------------- | --------- | --------------------------------------------- |
| `--sognos-navy-darkest` | `#060e28` | CTA band / deepest surface                    |
| `--sognos-navy-dark`    | `#0f1936` | Dark product and content surfaces             |
| `--sognos-navy`         | `#152248` | Homepage hero, logo strip, body brand surface |
| `--sognos-blue-accent`  | `#1d96fc` | CTA, active state, link, and bullet accent    |

### Text and lines

| Token                | Value                      | Primary use                 |
| -------------------- | -------------------------- | --------------------------- |
| `--sognos-heading`   | `#0f1936`                  | Headings                    |
| `--sognos-body`      | `#152248`                  | Body copy                   |
| `--sognos-muted`     | `#68706f`                  | Secondary copy and metadata |
| `--sognos-line`      | `#e2e8f0`                  | Borders and dividers        |
| `--sognos-border`    | `var(--color-neutral-200)` | shadcn border/input bridge  |
| `--sognos-bg-sunken` | `var(--color-neutral-200)` | Legacy sunken surface       |

### Product identity

| Product        | Dark      | Base      | Gradient                     |
| -------------- | --------- | --------- | ---------------------------- |
| SognosCare     | `#0f1936` | `#122e58` | `--sognos-care-gradient`     |
| SognosRoster   | `#191e41` | `#59bbf7` | `--sognos-roster-gradient`   |
| SognosGenogram | `#250438` | `#91278c` | `--sognos-genogram-gradient` |

### Canonical SognosCare edition tokens

| Sector                     | Base token                                   | Dark token                                        |
| -------------------------- | -------------------------------------------- | ------------------------------------------------- |
| Residential Aged Care      | `--sognos-edition-aged-care`                 | `--sognos-edition-aged-care-dark`                 |
| Allied Health              | `--sognos-edition-allied-health`             | `--sognos-edition-allied-health-dark`             |
| Support at Home            | `--sognos-edition-support-at-home`           | `--sognos-edition-support-at-home-dark`           |
| Hospital in the Home       | `--sognos-edition-hospital-in-the-home`      | `--sognos-edition-hospital-in-the-home-dark`      |
| Child & Family Services    | `--sognos-edition-child-and-family-services` | `--sognos-edition-child-and-family-services-dark` |
| Disability & Mental Health | `--sognos-edition-disability`                | `--sognos-edition-disability-dark`                |

Legacy `green`, `orange`, `coral`, and `purple` edition tokens remain until the
references listed in the reconciliation flags are migrated.

### Status tokens

`success`, `warning`, `error`, and `info` each have base/light semantic tokens.
Do not substitute a status colour for a product or decorative accent.

## 5. Typography

The live default font is the local variable **AngelList** face:

```css
--font-sans: angellist, ui-sans-serif, system-ui, sans-serif;
--font-heading: angellist, ui-sans-serif, system-ui, sans-serif;
```

`Inter` remains available as `--font-inter-stack` for development/fallback
testing. Bureau Sans has been removed.

`--text-xs` (0.75rem) is the smallest step in the scale. A `--text-xxs`
(0.65rem) token was added and then removed — it fell below the 12px many
accessibility guidelines treat as a floor, and the one place it was used reads
fine at `text-xs`.

Worth knowing when adding a step: Tailwind v4 **inlines** these values rather
than emitting `var(--text-*)`, and only emits a utility once something uses it,
so a new token produces no CSS at all until it is referenced.

The practical hierarchy currently used across the refreshed pages is:

| Role                   | Current convention                                                            |
| ---------------------- | ----------------------------------------------------------------------------- |
| Eyebrow                | `text-xs font-semibold uppercase tracking-widest`                             |
| Marketing hero         | `text-5xl md:text-6xl lg:text-7xl`, normal/medium weight                      |
| Standard H1 / legal H1 | `text-4xl lg:text-5xl` target; legal renderer currently caps at `lg:text-4xl` |
| Section H2             | `text-3xl md:text-4xl`, medium weight                                         |
| H3 / feature heading   | `text-2xl md:text-3xl`, medium weight                                         |
| Body                   | `text-base leading-relaxed`; introductory copy may use `text-lg`              |
| Metadata               | `text-xs` or `text-sm`, commonly uppercase with wide tracking                 |
| Article prose measure  | shared `ARTICLE_PROSE_MAX_W = "max-w-[46rem]"`                                |

The Tailwind `--text-*` values are still default values and remain provisional.

## 6. Shared Component State

| Component                                          | State                       | Current behavior                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Navbar.tsx`                                       | Production                  | Fixed 80px header, transparent dark-hero mode, persistent bar (no hide/peek — see §10), measured desktop dropdown, two-level mobile menu, and an event announcement banner that inverts against the hero. Dropdowns end in a featured column driven by `lib/featuredNav.ts`; groups absent from that map keep the gradient placeholder, except where the columns are self-contained. Products is three `variant: "product"` columns (name, tagline, "Learn more", rule, section links) with no panel; Knowledge Hub is a leading promo card (`position: "start"`), one link column, then a three-row featured feed (`trailingItems`) mixing the newest posts with the next Sanity event, each row labelled with its own type; Solutions is `[Solutions ×7][Industries ×5][Featured use case]`, ending in the `variant: "useCase"` card — a promo carrying two actions so the Flourish PDF is reachable from the menu; Industries is `[Industries ×5][Products ×3]`, ending in a `variant: "suite"` column of tile-and-copy rows. The cross-list runs Solutions → Industries only. Below `md` the banner drops its CTA and marquees the title inside a single 44px tap target; the whole mobile group is the event link and re-applies `bannerTheme.text`, since the base layer styles every `a` as `text-sognos-blue-accent`. Dismissal persists per event payload; `useSyncExternalStore` keeps localStorage state React-safe. |
| `Footer.tsx` / `FooterColumns.tsx`                 | Production                  | Sanity-backed columns with client-side mobile accordions. The Company column is normalized to About, Social Responsibility, Knowledge Hub, News, Events, Customer Stories, Careers, Contact.                                                                                                                                                                                              |
| `CTABand.tsx`                                      | Production                  | Global dark band rendered by the marketing layout. `Book a demo` opens the shared modal; background uses `sognos-navy-darkest`.                                                                                                                                                                                                                                                           |
| `CTASection.tsx`                                   | Active variant              | Drawer-style lead form exists for `bare + hideStats`; its details step shares field styling, descriptive product radio rows, benefits, compact top spacing, and trust-logo sizing with the contact experience.                                                                                                                                                                            |
| `BookDemoModal.tsx`                                | Production                  | Shared wide drawer modal, managed by `BookDemoContext`.                                                                                                                                                                                                                                                                                                                                   |
| `CookieBanner.tsx` / `cookie-banner-1.tsx`         | Production                  | Compact floating preference panel. Necessary cookies are locked; functional, analytics, and marketing preferences persist. Existing `cookie_consent` cookie and `router.refresh()` flow are preserved.                                                                                                                                                                                    |
| `Hero.tsx`                                         | Production                  | Navy homepage hero with staggered entrance, three blur glow layers rising out of focus at its foot, Book a Demo modal trigger, bottom-up CTA hover fill, and supporting copy aligned to the shared wide body measure.                                                                                                                                                                     |
| `HomeProductCards.tsx`                             | Production with polish debt | Three product cards, swipe/peek on mobile and three columns on desktop. SognosGenogram imagery remains an area to verify.                                                                                                                                                                                                                                                                 |
| `LogoStrip.tsx`                                    | Production                  | Sanity-backed CSS marquee on `bg-sognos-navy`; title is semantic `h3`. Shared constants govern title and logo limit.                                                                                                                                                                                                                                                                      |
| `HowSognosWorks.tsx`                               | Production                  | Interactive three-step process with auto-advance, a stacked image panel that swaps with the active card, desktop timeline progress, mobile controls, active accent cards, Microsoft platform branding, and reduced-motion handling.                                                                                                                                                       |
| `SolutionsSection.tsx`                             | Production                  | Sticky scroll-spy rail with seven flowing solution rows and per-solution imagery shared with detail pages.                                                                                                                                                                                                                                                                                |
| `IndustrySection.tsx`                              | Production                  | Horizontal industry card slider; reusable on detail pages with exclusion support.                                                                                                                                                                                                                                                                                                         |
| `ProductCustomerStories.tsx`                       | Production                  | Middesk testimonial port — white card on `bg-gray-50`, media left, quote right, capped at three stories with three indicator blocks and a shared countdown ring; reusable `SeeMoreLink`.                                                                                                                                                                                                  |
| `KnowledgeHubArchive.tsx`                          | Production                  | Anchored, tabbed archive on the Routable reference. Four always-rendered sections — News, Insights, Events & Webinars, Milestones — with a sticky tab band that scrolls to a section rather than filtering to it (`window.scrollTo`, offset by the navbar plus the measured band). IntersectionObserver spy at `-30% 0px -60% 0px`. Inline "View all" per section, all four targets still unbuilt. Search dialog retained; customer stories removed; upcoming events only, past ones held for `/events`.                                        |
| `knowledge-hub-search-dialog.tsx`                  | Production                  | Focused archive-search modal with overlay and keyboard dismissal, query filtering, empty state, and recent article, event, and customer-story results.                                                                                                                                                                                                                                    |
| `ContactForm.tsx`                                  | Production                  | Validated three-step journey for details, enquiry reason, and product interest. Descriptive radio rows replace compact selects and preserve step-level error focus.                                                                                                                                                                                                                       |
| `EditionCards.tsx`                                 | Production                  | Horizontal edition slider with configurable controls. Hover/focus reveals the edition colour from left to right, exposes the description, preserves the base logo, and dims inactive siblings to 60% opacity.                                                                                                                                                                             |
| `AnimatedEyebrow.tsx`                              | Production                  | Shared square-dot eyebrow entrance with reduced-motion support and configurable container, dot, and text classes.                                                                                                                                                                                                                                                                         |
| `sognoscare/Hero.tsx`                              | Production                  | Dark product hero with shared animated eyebrow, restored supporting copy, HLS media panel, and current heading/card-radius treatment.                                                                                                                                                                                                                                                     |
| `sognosroster/Hero.tsx`                            | Production                  | Gradient product hero with a timed logo entrance and four-second hold before crossfading into a looping, screen-blended local conversation video.                                                                                                                                                                                                                                         |
| `LegalPageRenderer.tsx`                            | Production                  | Sticky legal-page rail, Portable Text document layout, normalized headings/body, blue-square unordered lists, semantic ordered lists, and hidden duplicate privacy-policy intro.                                                                                                                                                                                                          |
| `AboutHeroImage.tsx`                               | Production                  | Reusable About/Careers/Social Responsibility scroll-shrink image with `src`/`alt` overrides.                                                                                                                                                                                                                                                                                              |
| `ArticleScrollNav.tsx`                             | Production                  | Shared customer-story and Knowledge Hub heading nav with active-section scroll-spy, accessible current-state semantics, and optional external full-height track ownership. Sidebar rail from `lg`; sticky collapsible dropdown below `lg` (overlay panel, `grid-template-rows` accordion, breakpoint-derived scroll offset).                                                              |
| `ArticleProseFooter.tsx`                           | Production                  | Shared post-conversion-panel footer with compact spacing, back-to-index navigation, and exported copy/share controls from `ShareIcons`.                                                                                                                                                                                                                                                   |
| `ArticleProgressLine.tsx`                          | Production                  | Read-progress line for the middle column of the article body grid. Full-height track, fill in a viewport-tall sticky box scaled from its top edge; `top` prop (default 144) aligns it with the rail beside it. Shared by Knowledge Hub and customer stories.                                                                                                                              |
| `scroll-progress.tsx`                              | Production                  | Fixed blue page-progress bar with spring-smoothed scroll motion, used by both dynamic article families.                                                                                                                                                                                                                                                                                   |
| `StoryMetaRail.tsx` / `ShareIcons`                 | Production                  | Customer-story metadata rail; exported share controls provide copy-link feedback plus an X, LinkedIn, and Facebook dropdown for the shared article footer.                                                                                                                                                                                                                                |
| `TeamSection.tsx`                                  | Production                  | Responsive leadership card grid with expanded modal profiles, Escape dismissal, focus management, and LinkedIn actions.                                                                                                                                                                                                                                                                   |
| `SolutionHeroDemoButton.tsx`                       | Production                  | Shared client-side Book Demo modal trigger with configurable label and class overrides for solution heroes and article conversion panels.                                                                                                                                                                                                                                                 |
| `PullQuote.tsx`, `QuoteCallout.tsx`, `StatRow.tsx` | Ready                       | Portable Text content blocks registered for articles and customer stories; authoring adoption remains content-dependent.                                                                                                                                                                                                                                                                  |

## 7. Route Map

### Global marketing layout

`app/(marketing)/layout.tsx` renders:

```text
CtaContentProvider
  BookDemoProvider
    Navbar
    PageTransition          (keyed on pathname)
      route content
    CTABand
    Footer
    BookDemoModal
```

Cookie consent is handled at the root layout using the request cookie forwarded
through `proxy.ts`.

`PageTransition` fades the routed content in on each client-side navigation
using the `.page-fade-in` CSS animation, keyed on `usePathname()`. Two rules
govern it:

- **It stays CSS, not Framer.** The animation carries no `fill-mode`, so the
  element's own `opacity: 1` applies whenever it does not run — a transition
  that fails leaves the page visible. Its previous Framer `AnimatePresence
  mode="wait"` implementation had no such floor and stranded the article routes
  at `opacity: 0`; see §2.
- **The Navbar stays outside it.** It is persistent chrome, so a navigation no
  longer remounts it, and the fade cannot take the whole site with it.

The route entered on does not animate, so the server-rendered first paint is
not held back. Navigating back to that one route therefore also skips the fade.

### Homepage

`app/(marketing)/page.tsx` currently renders:

```text
Hero
HomeProductCards
LogoStrip
HowSognosWorks
IndustrySection
SolutionsSection
CustomerStories
NewsInsightSection
```

Knowledge Hub posts are fetched from Sanity and mapped into the news section.

### Products

- `/products`: product overview and Better Together composition.
- `/products/sognoscare`: Hero, Trust Strip, Problems/SubNav, Features,
  Editions, Advantages, Stories.
- `/products/sognoscare/editions/*`: six sector pages using
  `EditionPageTemplate`. Related Editions uses a left label rail and a
  right-column heading, introduction, inline slider controls, and cards. The
  embedded calendar CTA is removed and the customer-story section is
  temporarily gated off.
- `/products/sognosroster`: Hero, Trust Strip, dark SubNav/Problems, Features,
  Advantages, Stories.
- `/products/sognosgenogram`: Hero, Trust Strip, dark SubNav/Problems, Features,
  Stories.

All tracked product-facing labels use **SognosGenogram** without a space.

### Solutions

- `/solutions`: solution overview.
- `/solutions/[slug]`: seven statically generated detail routes:
  `frontline`, `crm`, `insights`, `experience`, `service`, `power-platform`,
  `quick-start`.
- Detail content comes from `lib/solutions-content.ts`.
- Each detail hero uses its own configured image.
- The trusted-logo strip sits after the dark problem section.
- Capabilities use `SolutionUseCases` on the navy surface.
- Homepage `SolutionsSection` uses the same image mapping.

### Industries

- `/industries`: five-industry overview.
- `/industries/[slug]`: generated from `lib/industries-content.ts`.
- Current detail composition: image-led hero, dark numbered challenge grid,
  autoplay/reduced-motion workflow tabs, product/platform section, filtered
  customer stories, and other-industries slider.
- `IndustryChallengeStack`, `IndustryHowTabs`, and `IndustryPlatformSection`
  are the shared detail-page building blocks.

### Knowledge Hub and customer stories

- `/knowledge-hub`: Sanity archive with category controls, featured/latest
  article handling, modal search across recent articles/events/customer
  stories, upcoming events, and customer-story promotion.
- `/knowledge-hub/[slug]`: dark hero — back link, title, 16:8 featured image,
  no metadata. Body is the **same three tracks as the customer story
  template** (`[260px_1fr_260px]`): sticky meta rail, prose constrained to
  `ARTICLE_PROSE_MAX_W`, sticky TOC with the `ShareIcons` control beneath it.
  Plus fixed page-progress indicator, post-prose demo/contact conversion panel,
  end-of-prose back navigation, Portable Text custom blocks, and latest
  articles.
  - **The two article families share one body layout again.** The temporary
    split — where this template kept `[TOC][line][prose]` — is over. Keep them
    in step, and keep the two side tracks equal so the prose stays on the
    container's centre line with the hero title and image.
  - Category / Published / Read Time moved out of the hero into meta rail rows.
    Category was a pill on the dark hero; on the white body it is a plain value
    like the other rows. The rows are inline markup rather than a shared
    component — three rows of static JSX did not justify one.
  - **No `ArticleProgressLine`.** Dropped from both templates; the component is
    now unused by any page.
- `/customer-stories`: light left-aligned hero using the Knowledge Hub headline
  and subcopy treatment, then a featured block and an archive grid.
  - Featured is two equal columns over two rows with the lead spanning both on
    the left (after `anam.ai/blog`). Rows are auto rather than fixed so long
    titles cannot clip; the lead's image flexes to match the column height. One
    `FeaturedCard` serves all three slots — the lead stacks image over text, the
    other two run image-left / text-right from `lg` and stack below it.
  - Archive cards follow `middesk.com`'s "Explore more stories": no card
    surface, just image, mono meta row (chip · date, read time right-aligned),
    title, and Read More on the section background.
  - `FEATURED_COUNT` drives both slices, so the archive excludes whatever the
    featured block already showed and no story appears twice.
  - **Still a hardcoded `STORIES` array** while `/customer-stories/[slug]` is
    Sanity-driven. The two are in sync today but nothing enforces it — a story
    added in Sanity will not appear here. Migrating to
    `getCustomerStoryArchive()` pairs naturally with adding a `featured` flag,
    which is what replaces the current first-three selection.
- `/customer-stories/[slug]`: dark centred hero — breadcrumb, title, a 16:8
  brand panel carrying the client logo on a radial gradient in their own
  colour, then a centred pull-quote with `Name / ROLE` attribution. Body is a
  three-column grid from `lg` (`[260px_1fr_260px]`) after
  `mintlify.com/customers/coinbase`: sticky metadata rail, prose, sticky TOC.
  Plus fixed page-progress indicator, post-prose demo/contact conversion panel,
  shared end-of-prose navigation/sharing, Portable Text blocks, callouts, and
  related reading.
  - **No `ArticleProgressLine` here.** It briefly sat in the right column and
    was dropped. The component stays in the repo — the Knowledge Hub template
    still uses it — so this page keeps only the fixed `ScrollProgress` bar.
  - **The two side tracks must stay equal.** Equal side columns put the prose on
    the container's centre line so it shares an axis with the centred hero
    title, brand panel and pull-quote. Narrowing one without the other breaks
    that alignment.
  - The right column carries the TOC and, below it, the same `ShareIcons`
    copy-link/share control the prose footer uses. Desktop only — below `lg`
    the wrapper is `contents` and the nav is a sticky bar, so there is no
    column to sit under. The control therefore appears twice on the page.
  - `StoryMetaRail` renders six labelled rows in a fixed order: Company,
    Industry, State, Size, Product, About. Company and About come straight from
    the `company` and `description` (Sanity "Short description") fields already
    in `STORY_BY_SLUG_QUERY`; Industry / State / Size / Product come from the
    `sidebar` array via `sidebarValue()`. Empty rows drop out.
  - **The Knowledge Hub template uses the same three tracks.** Keep the two in
    step — they briefly diverged and were brought back together.
  - Every grid child is placed explicitly with `col-start`/`row-start`, because
    DOM order is the *mobile* order and no longer matches the column order. The
    nav has to come first so its sticky mobile dropdown sits above the article,
    but it belongs in the last column. Mobile order stays TOC → meta → prose.
  - `ArticleProgressLine` shares the right column's grid cell with the TOC but
    sits **outside** the sticky wrapper, at `lg:w-12 lg:justify-self-start`. It
    measures progress against its own height, so it has to stretch to the full
    row; inside the sticky box it would shrink to the nav's height and read
    100% immediately.
  - Brand panel colour resolves `story.brandColor` → `BRAND_BG[company]` →
    `#1d96fc`, the same precedence the customer-story slider uses. The gradient
    drops to `--sognos-navy-dark` at the edges so the white logo keeps a dark
    field whatever hue the client brings; all four current clients clear the
    3:1 non-text contrast floor, Penrith closest at 3.15:1.
  - `story.heroImage` is still queried and still populated, but the detail page
    no longer renders it — the brand panel replaced it. The archive cards and
    related-reading list continue to use it.
- Both dynamic content families depend on readable local Sanity configuration:
  `NEXT_PUBLIC_SANITY_PROJECT_ID=vg117fxr` and dataset `production`.

### Company and legal

- `/company/about`: white image-led hero, tightened story/stats composition,
  consolidated navy Mission/Vision/Beliefs band, modal leadership grid, partner
  grid, social-responsibility content, and shared animated section eyebrows.
- `/company/careers`: About-style hero, benefits, Life at Sognos bento
  testimonials, and open-position rows with an inset hover/focus transition and
  responsive Apply action.
- `/company/social-responsibility`: About-style hero image and dark numbered
  responsibility pillars.
- `/company/privacy-policy`, `/company/privacy-collection-notice`,
  `/company/isms-policy`: shared `LegalPageRenderer` with sticky left
  navigation.
- The privacy-policy route suppresses the redundant CMS intro and begins at the
  document body.

### Events and contact

- `/events/nfp-real-care`: complete event landing page for “Designing Services
  Around Real Lives, Not System Boundaries.”
- Registration uses `EventRegistrationContext`, a focus-managed modal, a Server
  Action, Supabase `event_registrations`, and Resend notification email.
- `/contact`: dark split-screen lead-generation page with a normally scrolling
  left introduction, benefits, 3x2 trust-logo grid, and a validated three-step
  contact form.
- The navbar announcement ribbon links to the event and remains dismissed after
  close or click for the current event payload.
- The event now also exists as a Sanity `event` document (`nfp-real-care`), but
  **nothing on the live site reads it yet**. Three hardcoded copies still drive
  what ships: `lib/upcomingEvent.ts` (consumed by `Navbar.tsx` and
  `lib/featuredNav.ts`), `KnowledgeHubArchive.tsx:36`, and the page itself.
  Rewiring those, plus a standalone `/events` archive for past and upcoming, is
  the next pass. `/events` has no index route — only the one child page.

### Other

- `/dhf-conversation`: retained campaign/conversation route.
- `/style-guide`: production-aligned reference for the live lean tokens,
  typography, weights, radii, shadows, layout metrics, and common actions.

## 8. Recently Completed

### 2026-08-03 (later)

- Homepage section rebuild, layout and structure only. Hero now contains the
  product cards and the trust strip; `LogoStrip` restored to its pre-marquee
  static row, no background of its own, capped at 5 logos by a local constant.
- `ElegantDarkPattern` extracted from `HeadlineCTA` into `shared/` and used by
  the customer-story track. Applied to the hero and then commented out there.
- `IndustrySection` rebuilt as a tab showcase after middesk.com — 6/6 grid,
  `aspect-[676/496]` picture, 8s autoplay on a shared rAF clock with
  `ProgressButton`. **The sticky card stack is gone.**
- `ProductCustomerStories` rebuilt as an arrow-paged testimonial track after
  routable.com, on the dark pattern. Autoplay, countdown ring, indicator blocks
  and the `MAX_STORIES = 3` cap all removed. New optional `highlight` field for
  the per-word emphasis. Two previous builds in `ProductCustomerStories.backup.tsx`.
- `NewsInsightSection` scaffolded on Middesk's bento — two grids, 70/30 then
  50/50. **Structure only, no styling yet**; icon and excerpt slots are empty
  pending an `excerpt` field.
- Knowledge Hub events and story band fed from Sanity; `endDate` added to the
  event schema and deployed.

### 2026-08-03

- Events became CMS content: `getUpcomingEvents()`, `getEventArchive()` and
  `getAllEventSlugs()` added, a `format` eyebrow field added to the schema, and
  `nfp-real-care` seeded into the production dataset with its hero asset.
  Webinars are events with a `format`, not a post category.
- `getHomeFeed()` normalises upcoming events, customer stories and knowledge
  posts into one `HomeFeedItem[]`, upcoming events banded first.
- `BentoGrid` built against that feed and parked at `/dev/bento-preview` —
  a throwaway, unlinked, `noindex` route. Not wired to the homepage;
  `NewsInsightSection` is still what ships.
- Customer-story panel rebuilt: brand-gradient panel, navy wedge after
  `mgghealth.com`, masked white client logos anchored bottom-right, and the
  `--text-quote` 28px type token.

### 2026-07-30

- Refined the About page story area, consolidated Mission, Vision, and Beliefs
  into the navy values band, and removed the final belief-card right divider.
- Rebuilt the leadership section as a responsive grid with expanded modal
  profiles, focus handling, Escape dismissal, and LinkedIn actions.
- Refactored shared article `ShareIcons` into copy-link feedback plus an X,
  LinkedIn, and Facebook dropdown with complete hover, active, focus, and
  dismissal states.

### 2026-07-29

- Rebuilt the contact form as a validated three-step journey and aligned the
  Book Demo details step with the same field and descriptive radio-row family.
- Refined the contact and demo left columns, benefits, spacing, and trusted-logo
  sizing while preserving normal page scrolling into the global CTA and footer.
- Rebuilt How Sognos Works as an interactive, auto-advancing timeline and added
  Dynamics 365, Microsoft Solutions Partner, and Copilot branding.
- Added the shared `AnimatedEyebrow` motion primitive and applied it across
  homepage, product, About, Social Responsibility, and Careers labels.
- Refined homepage and product-hero typography and supporting-copy measures;
  updated SognosCare to the shared eyebrow treatment and added the delayed
  logo-to-video handoff to the SognosRoster media panel.
- Added the Knowledge Hub search dialog with recent article, event, and
  customer-story results.
- Refined Knowledge Hub and customer-story detail pages with shared fixed
  scroll progress, editorial hero adjustments, constrained featured media,
  improved article rails, and the reusable `ArticleProseFooter` backed by the
  existing `ShareIcons`.
- Added matching post-prose conversion panels to Knowledge Hub posts and
  customer stories, reusing the demo modal trigger alongside a direct sales
  contact path; tightened footer and share-control presentation beneath them.
- Updated navbar border behavior, footer acknowledgement layout, Careers
  testimonial composition, and Open Roles hover/focus interactions.
- Reworked SognosCare edition-card interactions and Related Editions layout;
  removed the edition-template calendar CTA and temporarily hid its customer
  story.
- Rebuilt the style guide around the live token and production component system.
- Ran targeted ESLint checks, `npx tsc --noEmit`, and the Next.js production
  build; the running homepage returned HTTP `200` from
  `http://localhost:3001/`.

### 2026-07-24

- Refactored all three legal pages to the shared document layout; normalized
  Portable Text typography and list handling; fixed the invalid ordered-list
  renderer; hid the duplicate Privacy Policy intro.
- Locked the footer Company links and normalized SognosGenogram naming
  repository-wide.
- Added per-solution hero imagery to detail pages and the homepage solutions
  section.
- Polished solution hero/problem/trust/capability rhythm.
- Added work-button hover motion to the homepage Book a Demo CTA.
- Refined Knowledge Hub event and customer-story promotions, including the
  Gentari excerpt.
- Added and stabilized the navbar event ribbon, persistent dismissal, and
  header-spacing compensation.
- Replaced the cookie bar with the compact preference panel.
- Verified the completed batches with `npm run build`.

### 2026-07-23

- Launched the NFP Real Care event page and end-to-end registration flow.
- Added events and latest customer-story promotion to Knowledge Hub.
- Rebuilt the contact page and related CTA/modal surfaces.
- Migrated `middleware.ts` to Next.js 16 `proxy.ts`.
- Introduced `sognos-navy-darkest` and adjusted core/product dark surfaces.
- Repaired local Sanity env loading and restored dynamic article/story routes.
- Rebuilt Careers, Social Responsibility, About partner/belief sections,
  industry detail sections, and article/customer-story presentation.
- Added Events and Customer Stories to Resources navigation.

### Earlier completed foundations

- Shared article rail, Portable Text heading helpers, and shared 46rem prose
  measure.
- PullQuote, QuoteCallout, StatRow, and square-bullet content blocks.
- AngelList-style product, customer-story, article, navbar, and edition
  patterns.
- Product-token split, dark product problem sections, and edition token set.
- Bureau Sans removal and local AngelList variable font registration.

## 9. Pending / Next

1. Run a focused visual QA pass across desktop and mobile for the navbar ribbon
   and header-border transition, contact/demo step journeys, Knowledge Hub search
   dialog, How Sognos Works timeline, edition-card interactions, legal rail,
   cookie preferences, event modal, and all seven solution hero images.
2. Decide whether to track/use or remove the two untracked local solution hero
   files.
3. Reconcile remaining production radii, neutral surfaces, and shadows with the
   stated design rules, using the refreshed style guide as the current
   reference.
4. Migrate remaining `--sognos-edition-green` consumers to semantic product or
   sector tokens, then remove old edition tokens.
5. Audit and remove unused Workhorse tokens.
6. Replace remaining placeholders/scaffolds and hard-coded green visual values
   with final assets/tokens.
7. Lock the custom typography scale after page-level hierarchy is approved.
8. Author Sanity content that exercises PullQuote, QuoteCallout, and StatRow,
   then verify those blocks with real documents.
9. Reconcile customer-story industry labels so filtered industry-detail story
   sections do not silently hide valid stories.

## 10. Source Map

| Concern                          | Source                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primitive/semantic tokens        | `app/tokens.css`                                                                                                                                                                |
| Tailwind mappings and global CSS | `app/globals.css`                                                                                                                                                               |
| Design-system reference          | `app/style-guide/page.tsx`                                                                                                                                                      |
| Root consent/analytics handling  | `app/layout.tsx`, `proxy.ts`                                                                                                                                                    |
| Marketing composition            | `app/(marketing)/layout.tsx`                                                                                                                                                    |
| Navigation                       | `components/layout/Navbar.tsx`, `lib/navigation.ts`                                                                                                                             |
| Footer                           | `components/layout/Footer.tsx`, `components/layout/FooterColumns.tsx`, `lib/content/footer.ts`, `lib/sanity/queries.ts`                                                         |
| CTA/contact                      | `CTABand.tsx`, `CTASection.tsx`, `BookDemoModal.tsx`, `app/(marketing)/contact/*`                                                                                               |
| Cookie UI                        | `components/ui/CookieBanner.tsx`, `components/ui/cookie-banner-1.tsx`                                                                                                           |
| Shared eyebrow motion            | `components/ui/AnimatedEyebrow.tsx`                                                                                                                                             |
| Homepage process timeline        | `components/layout/sections/HowSognosWorks.tsx`                                                                                                                                 |
| Knowledge Hub search             | `components/ui/knowledge-hub-search-dialog.tsx`, `components/layout/sections/KnowledgeHubArchive.tsx`                                                                           |
| Product content                  | `lib/constants.ts`, `lib/content/editions.ts`, product route folders                                                                                                            |
| Edition cards/templates          | `components/layout/sections/sognoscare/EditionCards.tsx`, `components/layout/sections/sognoscare/EditionPageTemplate.tsx`, `components/layout/sections/sognoscare/Editions.tsx` |
| Solution content                 | `lib/solutions-content.ts`                                                                                                                                                      |
| Industry content                 | `lib/industries-content.ts`                                                                                                                                                     |
| Article layout/parser            | `lib/articleLayout.ts`, `lib/portableText.ts`                                                                                                                                   |
| Sanity integration               | `lib/sanity/client.ts`, `lib/sanity/image.ts`, `lib/sanity/queries.ts`                                                                                                          |
| Event workflow                   | `app/(marketing)/events/nfp-real-care`, `components/layout/sections/events/nfp-real-care`, `app/actions/event-registration.ts`, `lib/EventRegistrationContext.tsx`              |
| State history                    | `docs/CHANGELOG.md`                                                                                                                                                             |
