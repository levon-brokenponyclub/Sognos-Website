# Home Hero + Product Cards — production polish audit

> **Targets:** `components/layout/sections/Hero.tsx`, `components/layout/sections/HomeProductCards.tsx` (+ `LogoStrip.tsx`, rendered inside the hero).
> **Mode:** audit → HTML mockups (`docs/mockups/home/`) → approval → port. Nothing in `.tsx` changed.
> **Date:** 2026-10-25. Measured on `localhost:3000/` (DOM metrics, event banner on).

## STEP 0 — verification

| Check | Result |
|---|---|
| State doc | `DESIGN_MIGRATION_STATE.md` is archived (`docs/archive/`); `docs/PROJECT_STATE.md` is current and §2 is authoritative (user decision 2026-10-25). |
| Prior work | Hero + `HomeProductCards` + `LogoStrip` restored from `f2776ef` on 2026-10-24 (`bbd269e`). The 2026-08-07 motion hero is parked. Navbar is transparent over `/` (`DARK_HERO_PATHS`). |
| Dependency tree | **Hero** → `framer-motion` (motion, useScroll, useTransform, useReducedMotion), `next/image`, `next/link`, `useBookDemo` (`lib/BookDemoContext`), `ElegantDarkPattern` (imported, render commented out), 3 glow AVIFs `/images/home/{bottom,middle,top}-blur-dp.avif`. **HomeProductCards** → `next/image`, `next/link`, `/logos/sognos-care-logo.svg`, `/logos/sognos-roster-logo.svg`, `/logos/SognosGenogram-logo.svg`; `bgImage` per product unused (render commented out; two Unsplash URLs). **LogoStrip** (async Server) → `getLogoStripContent` (Sanity), `urlFor`, `DEFAULT_LOGOS` / `LOGO_STRIP_TITLE` (`lib/content/logoStrip`). No Button / Container / Card primitive, no Lottie, no mask component. |
| Consumers | `Hero.tsx` — `app/(marketing)/page.tsx` only (**home-only**). `HomeProductCards.tsx` — home only. `LogoStrip.tsx` — home **and** `solutions/[slug]/page.tsx` (**shared**). `ElegantDarkPattern` — Hero (commented), `HeadlineCTA`, KH category page (**shared**). `useBookDemo` — app-wide (**shared**, read-only use). |
| Navbar | Fixed `z-50`, `h-20` (80px) + event banner (45px) = 125px when the banner shows. `scrolled` flips at `scrollY > 8` (bar bg only). Hero `pt-40` (160px) → H1 top at 220px, 95px clear of the bar. |
| Section below | `HowSognosWorks` on `bg-sognos-tint` (#f9fafe) — hard navy → tint edge; the hero glow layers fade to navy above it. |
| Build | `npm run build` passes (90/90 pages, no warnings) on the current tree. |
| References | No home mockups exist. Agreed references (user, 2026-10-25): **hero** = `docs/mockups/sognoscare/01m-hero-a.html` (+ `hero_a()` in the Care generator: dark hero, centred column, CTA pairing, trust row); **cards** = `docs/mockups/frontline/index.html` → *Works with* A (3-up grid, Base / Paraform image sets). |
| Rule conflicts | Prompt says `rounded-lg` only + `bg-gray-200/70`; PROJECT_STATE §2 says `rounded` base (lg on hero-scale surfaces) + `bg-white` / `bg-sognos-tint`. **§2 wins** (user decision). Prompt palette (#1e293b / #10b981 / #f59e0b / #3b82f6), wave motif, masks and Lottie do not exist in these components — live tokens (`sognos-navy` #152248, accents #1d96fc / #59bbf7 / #91278c) are the no-drift baseline; wave/mask/Lottie checks are N/A. |

### Reference patterns extracted (1:1 targets)

- **Hero (Care `hero_a`)** — section `pt-44 pb-12 md:pt-52 md:pb-20`; centred column `max-w-3xl`; H1 `font-heading text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05] tracking-[-0.02em] text-balance`, two `block` spans; sub `mt-4 md:mt-5 max-w-[35rem] text-lg leading-relaxed text-white/80 text-pretty`; CTA row `mt-6 md:mt-8 flex flex-col sm:flex-row gap-4`; primary `min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium` (hover accent fill); secondary text link `min-h-11 … ↗` hover `opacity-80`; focus `outline-2 outline-offset-4 outline-white`; trust row `grid-cols-4/5`, cells `h-20 px-8 lg:px-12 border-l border-white/10`, mobile edge-faded marquee 28s; page scale `T.h1` = `text-5xl md:text-6xl lg:text-7xl` (PROJECT_STATE §2).
- **Cards (Frontline Works-with A, grid)** — card `rounded-lg p-3`, graphic panel `rounded` on top, copy below `p-5` (`gap-6`); accent bar `h-1 w-10 rounded-full`; title `T.h3` → `text-xl` at 3-up; link `min-h-11`. Base set = product tint/gradient panel; Paraform set = product photo (`/product/{Care,Roster,Geno}Bg.avif`) under a `160deg` wash `deep 55% → mid 35%`. Grid `gap-3 lg:gap-4`.

## Hero.tsx

| Area | Issue | Sev | Mockup reference | Proposed fix | Shared? |
|---|---|---|---|---|---|
| Above the fold | 1280×800: H1/sub/CTA land (CTA bottom 524px), but the product cards start at 572px — only 228px of them show. 375×812: H1 runs **6 lines** at 48px; Book a Demo bottom 767px, "Explore products" falls below the fold. | P0 | Care `hero_a` H1 `text-4xl sm:text-5xl` | Mobile H1 `text-4xl sm:text-5xl`; hard `<br>` only from `md`; tighter sub/CTA rhythm (`mt-4/5`, `mt-6/8`). Option B (split header) lifts the cards ~120px at 1280. | Home-only |
| H1 scale | `text-5xl lg:text-6xl` — off the §2 hero scale (`… md:text-6xl lg:text-7xl`); no `leading`/tracking tokens (`tracking-tight`). `max-w-[1128px]` arbitrary. | P1 | `T.h1`; Care H1 classes | `T.h1` scale with the Care mobile step; measure via `max-w-4xl`. | Home-only |
| Sub | `max-w-3xl text-lg text-white/80` — Care sub is `max-w-[35rem]`/`max-w-2xl` + `text-pretty`. | P2 | Care sub | `max-w-2xl text-pretty`. | Home-only |
| Primary CTA | `rounded-sm` + slide-up `rounded-[50px]` fill — §2 buttons are `rounded-full`; no `focus-visible` style; arbitrary radius. | P1 | Care `HERO_CTAS` | `min-h-11 rounded-full bg-white px-7 py-3.5`, hover accent fill, white focus ring. | Home-only |
| Secondary CTA | 25.6px tall — under the 44px tap target; no focus style. | P1 | Care "Learn More ↗" link | `min-h-11 rounded-full px-2`, focus ring. Label unchanged ("Explore products ↗"). | Home-only |
| Hierarchy | One claim, one sub, one primary, one secondary — correct. | — | — | Keep. | — |
| Alignment | `text-left` below `lg`, centred from `lg` — the CTA row stays `items-center` on mobile, so a left H1 sits over a centred button. | P1 | Care: centred at all sizes | Centre at every size (A) or left at every size (B). | Home-only |
| Entrance motion | fadeUp 0.5s staggered 0.1s; glow layers blur-in 1.2s — subtle and reduced-motion aware. Scroll drift (`y` 0→160, fade) on the copy. | P2 | Care: rise .1/.2/.5/.7s | Keep; align easing/timings with Care; cards join the stagger. | Home-only |
| Visual / CLS | Glow AVIFs `unoptimized` with intrinsic sizes — no CLS. No Lottie/poster needed. | — | — | Keep. | Home-only |
| Background | `ElegantDarkPattern` import kept but render commented out — dead import. | P2 | — | Remove the import at port (component stays for `HeadlineCTA`). | Shared (import only) |
| Navbar overlap | 95px clear at 125px bar+banner; bar contrast white-on-navy fine. | — | Care `pt-44 md:pt-52` | Keep `pt-40`; `md:pt-44` once H1 grows. | Home-only |
| Section seam | Hero ends navy → `HowSognosWorks` tint with no transition. | P2 | — | SUGGESTION S3. | — |

## HomeProductCards.tsx

| Area | Issue | Sev | Mockup reference | Proposed fix | Shared? |
|---|---|---|---|---|---|
| Card anatomy | Identical anatomy ×3 (logo on a flat navy panel, description) — consistent, but nothing tells the products apart except the logo; `bgImage` and the product `name` (title) are commented out. | P1 | Works A: accent bar + title + panel per product | Per-product panel (Base gradient or Paraform photo), accent bar, product name as heading, existing description. | Home-only |
| Differentiation | Accents (`#1d96fc` / `#59bbf7` / `#91278c`) only appear on the arrow hover fill. | P1 | Works A `PSTYLE` | Accent bar + panel wash per product (existing colours only). | Home-only |
| Image | Panels have no image (Unsplash URLs commented); Genogram flagged "placeholder". Local `/product/{Care,Roster,Geno}Bg.avif` exist and are the Works-with Paraform photos. | P1 | Works A Paraform set | Use the local `*Bg.avif` (drop Unsplash). | Home-only |
| Heading order | Cards carry no heading; the trust strip title is an `h3` straight after the H1 (skips h2). | P1 | — | Product names as `h2` (card-scale type); trust title → `<p>`. | `LogoStrip` shared — see FENCE |
| Alt text | Logo `alt` is the tagline ("One platform. From intake to outcome.") not the product name. | P1 | — | `alt="SognosCare"` etc. | Home-only |
| States | Whole card is one `<Link>` (no nested `<a>`) ✓. Hover: overlay + arrow fill. No `focus-visible`, no active state. `group-hover/solutions` targets a group that does not exist here. | P1 | Works C: `focus-visible:outline-2 outline-offset-4` | Focus ring on the card, border lift on hover, `active:scale-[.99]`; drop the stray `group-hover/solutions`. | Home-only |
| Grid | Mobile snap rail 82vw ✓; `md:grid-cols-3` at 768px gives ~230px cards. `gap-2` (off rule `gap-3 lg:gap-4`); `max-w-6xl` vs `max-w-7xl` hero. | P1 | Works grid `gap-3 lg:gap-4` | Rail below `lg`, 3-up from `lg`; `gap-3 lg:gap-4`; `max-w-7xl`. | Home-only |
| Card surface | No card surface — hairline `border-b border-white/25` only. Radius `rounded-lg` on the panel (hero-scale, allowed). | P2 | Works A: `rounded-lg p-3` frame | `rounded-lg border border-white/10 bg-white/[.04] p-3`, inner panel `rounded`. | Home-only |
| Type | Description `text-base tracking-tight leading-normal` — body is `leading-relaxed`, no tracking. | P2 | `T.body` | `T.body`. | Home-only |
| Dead code | `"use client"` without hooks; commented title + bgImage blocks; `name` field only used as the (wrong) alt. | P2 | — | Server Component; remove the dead blocks at port. | Home-only |
| Transition | Cards → trust strip → glow; cards sit at `pt-16` under the CTAs. | — | Care: 80px to visual | `mt-14 md:mt-20`. | Home-only |

## LogoStrip.tsx (inside the hero)

| Area | Issue | Sev | Mockup reference | Proposed fix | Shared? |
|---|---|---|---|---|---|
| Heading | `h3` title (see above); `mt-15` + `mb-8` stacked spacing; `max-w-5xl` vs hero `max-w-7xl`. | P1 | Care trust row | Title `<p>` at `T.h3`; one spacing token; row width = card grid. | **Shared** with `solutions/[slug]` — variant prop, not a default change. |
| Mobile | Wraps into a ragged 2-col stack. | P2 | Care mobile marquee | Edge-faded marquee below `md` (reduced-motion static). | Shared — variant |

## Both

- Type: hero H1 / card titles / trust title will sit on one scale (`T.h1`, `T.h3sm`→`text-xl`, `T.h3`).
- Arbitrary values to remove: `max-w-[1128px]`, `rounded-[50px]`, `aspect-[334/354]` (→ `aspect-[4/3]` per reference), `mt-15`.
- Accessibility: single H1 ✓; heading order (above); alt text (above); secondary CTA tap target (above). Contrast: white/70 description on navy ≈ 8:1 ✓.
- Responsive: no horizontal scroll at 375 / 1280 ✓ (rail scrolls inside its own track).

## STEP 2 — mockups (`docs/mockups/home/`)

`01-hero-a.html` (centred), `01-hero-b.html` (split), `02-product-cards-a.html` (3-up), `02-product-cards-b.html` (Care + Roster featured), `index.html` (switchers: hero / cards / image set). Measured by DOM:

| | Live | Mock A | Mock B |
|---|---|---|---|
| 1280×800: H1 size · lines | 60px · 2 | 60px · 2 | 48px · 2 |
| 1280×800: CTA bottom / cards top | 524 / 572 | 481 / 561 | 356 / 436 |
| 375×812: H1 lines | 6 (48px) | 4 (36px) | 4 (36px) |
| 375×812: secondary CTA bottom | below fold | 596 | 604 |
| Secondary CTA height | 25.6px | 44px | 44px |

Hero H1 follows the Care `hero_a` scale (stops at `md:text-6xl`): `T.h1`'s `lg:text-7xl` wraps the live headline to 4 lines at 1280 and pushes the cards to 721px. No horizontal scroll at 375 / 768 / 1280; no broken images.

## SUGGESTIONS
- **S1** — Card titles: show the product *name* (SognosCare / SognosRoster / SognosGenogram) as the card heading, not the commented-out taglines. Clearer at a glance; trade-off: the taglines ("One platform. From intake to outcome.") disappear unless used as the lead.
- **S2** — Lead with Care + Roster (hard rule "products are primary — lead with SognosCare + SognosRoster"): cards option B gives them the two large slots and Genogram a full-width band. Trade-off: Genogram looks secondary.
- **S3** — Soften the navy → tint seam with a 64px navy→tint fade at the hero foot, or start `HowSognosWorks` with a navy top band. Trade-off: one more gradient (hero surface only, allowed).
- **S4** — Make `HomeProductCards` read from `lib/constants` `PRODUCTS` instead of its own array (logos, accents, hrefs already live there). Trade-off: small refactor, removes a duplicate source.

## QUESTIONS
- **Q1** — Hero layout: **A centred** (recommended — matches Care, keeps the brand moment) / B split header (H1 left, sub + CTAs right; lifts cards ~120px at 1280).
- **Q2** — Cards layout: **A uniform 3-up** (recommended) / B Care + Roster large + Genogram band.
- **Q3** — Card image set: **Paraform** (recommended — product photos under a product wash) / Base (product gradient + logo).
- **Q4** — `LogoStrip` changes (heading → `<p>`, marquee) need a `variant="hero"` prop because `solutions/[slug]` also renders it: **add the variant** (recommended) / leave `LogoStrip` untouched this pass.

## STEP 3–4 — status (2026-10-25)

Approved: Q1 hero A, Q2 cards A, Q3 Paraform, Q4 LogoStrip `variant="hero"`. S1 (product names as card headings) shipped as part of the approved mockup.

| Item | Status |
|---|---|
| Above the fold (P0) | **Fixed.** At 1280×800 the CTA bottom is 526px. At 375×812 the H1 is 4 lines and both CTAs are above the fold (642px). |
| H1 scale / measure, sub, CTA radius, secondary tap target, alignment (P1) | **Fixed.** |
| Entrance motion (P2) | **Fixed.** The cards join the stagger (0.3s + 0.08s per card); reduced motion is respected. |
| `ElegantDarkPattern` dead import (P2) | **Fixed.** Removed from `Hero.tsx`; the component stays for `HeadlineCTA` / KH. |
| Card anatomy, differentiation, image, alt text, states, grid, surface, type (P1/P2) | **Fixed.** |
| Heading order (P1) | **Fixed.** The order is now H1 → card h2s, and the trust title is a `<p>` (hero variant only). |
| Dead code in cards (P2) | **Partly fixed.** The commented blocks, Unsplash URLs and stray `group-hover/solutions` are gone. The component stays `"use client"` for the entrance motion. |
| LogoStrip heading + mobile marquee | **Fixed** (hero variant). The default variant is unchanged. |
| Section seam (S3) | **Deferred.** Suggestion, not approved. |
| `PRODUCTS` from `lib/constants` (S4) | **Deferred.** Suggestion, not approved. |

**Divergences from the mockup**
- No sr-only "Products" `h2`. The card `h2`s carry the structure, and it avoids adding hidden copy.
- At 1280×800 the cards start 45px lower than in the mockup (606 vs 561) because the live event banner takes up space in the page flow. The mockup's banner stub was fixed-position.
