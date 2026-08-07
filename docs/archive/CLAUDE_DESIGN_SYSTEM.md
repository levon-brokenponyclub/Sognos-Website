# Claude Design System — Reference

> **Status:** WIP · reference-only. Do not apply site-wide from this doc.
> This is the working export from `/dev/style-guide` for use as context in
> future Claude sessions. Live source of truth remains `app/tokens.css`,
> `app/globals.css`, and `CLAUDE.md` §2.
>
> **When Claude reads this:** treat marked-`LIVE` items as canonical, marked-
> `PROPOSED` as under-consideration (do not apply without user confirmation),
> and marked-`PHASED OUT` as explicit non-goals.
>
> **Live preview:** `http://localhost:3000/dev/style-guide` (13 sections).
> **Source:** `app/(marketing)/dev/style-guide/page.tsx`.
> **Date:** 2026-08-07.

---

## 0 · Rules of engagement

- **CLAUDE.md §2 is authoritative.** If this doc conflicts, CLAUDE.md wins.
- **Never modify `app/tokens.css` from this doc alone.** Any token addition
  must be approved explicitly.
- **Never sweep production files** to match `PROPOSED` items in this doc.
- **Every visual change** to a production section should reference the
  relevant `LIVE` block below, and if a `PROPOSED` block applies, it needs
  a user opt-in before rollout.

---

## 1 · Core palette (LIVE)

Live tokens in `app/tokens.css`. Access via Tailwind semantic classes.

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--sognos-navy-darkest` | `#060e28` | `bg-sognos-navy-darkest` | Deepest CTA, modal, hero backdrop |
| `--sognos-navy-dark` | `#0f1936` | `bg-sognos-navy-dark` | Dark product surfaces |
| `--sognos-navy` | `#152248` | `bg-sognos-navy` | Primary brand surface |
| `--sognos-blue-accent` | `#1d96fc` | `bg-sognos-blue-accent` | Primary action, active state |
| `--sognos-heading` | `#0f1936` | `text-sognos-heading` | Heading text |
| `--sognos-body` | `#152248` | `text-sognos-body` | Body text |
| `--sognos-muted` | `#68706f` | `text-sognos-muted` | Secondary text, metadata |
| `--sognos-line` | `#e2e8f0` | `border-sognos-line` | Borders, dividers |
| `--sognos-tint` | `#f0eff2` | `bg-sognos-tint` | Light section surface |

### Dark-surface alpha ladder (LIVE — introduced 2026-08-06 About Values)

On any `bg-sognos-navy*` surface:

| Role | Class |
|---|---|
| Primary body / heading | `text-white` |
| Secondary body | `text-white/75` |
| Muted / meta | `text-white/50` |
| Dividers | `border-white/20` |

**Do not use** `text-white/65` — sits between two ladder steps.
On `font-light` body over dark navy, bump secondary to `text-white/85` for
readability (see Weight ladder proposal §13).

---

## 2 · Print-only palette (PROPOSED — not in tokens.css)

Documented from eBook + brochure. Candidates for tokenization if we want
to align web to print warmth.

| Name | Hex | Origin | Proposed use |
|---|---|---|---|
| Print navy | `#002040` | eBook + brochure primary | Alternative dark surface, warmer than `sognos-navy-darkest` |
| Print cream | `#e0e0c0` | eBook light surface | Editorial contexts (Knowledge Hub, testimonials) — warmer than `sognos-tint` |
| Warm coral | `#c08040` | eBook accent | Secondary warm accent — site is currently all-cool |

---

## 3 · Sector coding (LIVE tokens · UNDER-APPLIED)

Five industries from `INDUSTRIES` constant. Each has its own pastel tint
already in `tokens.css` comments. **Currently the live `IndustrySection`
treats all five identically — biggest ROI opportunity in the audit.**

| Sector | Tint hex | Token status | Slug |
|---|---|---|---|
| Health & Social Care | `#f7edf3` (rose) | Documented in tokens.css comment | `health-social-care` |
| Facilities Management | `#ebfbe3` (mint) | Documented | `facilities-management` |
| Industrial Services | `#f4f8f9` (ice) | Documented | `industrial-services` |
| Government Sectors | `#f5f6ee` (cream) | Documented | `local-government` |
| Energy & Utilities | `#dfeacd` (sage) | **PROPOSED — needs token** | `energy-utilities` |

**Application idea:** left-border accent in the sector's tint on the active
`IndustrySection` tab, or a small `bg-sector-tint` chip on the image
caption. Do not commit without approval.

---

## 4 · Product colours (LIVE)

Each product has one dark surface, one base accent, and one approved
gradient. Product components derive identity from this three-token family.

| Product | Dark | Base | Gradient |
|---|---|---|---|
| SognosCare | `--sognos-care-dark` `#0f1936` | `--sognos-care-base` `#3b6fe0` | `--sognos-care-gradient` |
| SognosRoster | `--sognos-roster-dark` `#1d96fc` | `--sognos-roster-base` `#59bbf7` | `--sognos-roster-gradient` |
| SognosGenogram | `--sognos-genogram-dark` `#250438` | `--sognos-genogram-base` `#91278c` | `--sognos-genogram-gradient` |

**Note:** `/style-guide` (root) has stale hex for Care base and Roster
dark — use tokens.css values above.

---

## 5 · Editions (LIVE — SognosCare)

Six sector-identity pairs. Base carries identity; dark supports white-text
contrast on section headers.

| Edition | Token slug | Base | Dark |
|---|---|---|---|
| Residential Aged Care | `aged-care` | `#caa4ff` | `#af82f0` |
| Allied Health | `allied-health` | `#ffad6e` | `#f38c3d` |
| Support at Home | `support-at-home` | `#ff8e90` | `#ef6a6c` |
| Hospital in the Home | `hospital-in-the-home` | `#cbdd61` | `#9aad2c` |
| Child & Family Services | `child-and-family-services` | `#ff7dbc` | `#e95ca0` |
| Disability & Mental Health | `disability` | `#00a98f` | `#039b84` |

---

## 6 · Radius (LIVE — CLAUDE.md §2)

**Strict rules. Do not deviate without user opt-in.**

| Scale | Class | Value | Rule |
|---|---|---|---|
| Default | `rounded` | 4px | Base and standard for all surfaces, cards, images, pills |
| Medium | `rounded-md` | 6px | Justified only — ask and confirm before use |
| Large | `rounded-lg` | 8px | Justified only — hero components, large product cards |
| Full | `rounded-full` | 9999px | **Buttons only.** Never on surfaces |

**PHASED OUT — do not reintroduce:** `rounded-xl`, `rounded-2xl`,
`rounded-3xl`, arbitrary `rounded-[Xrem]`.

---

## 7 · Layout tokens (LIVE — reconciled with CLAUDE.md §2)

Root `/style-guide` has stale values for container (1380 → 1280) and nav
height (64 → 80). Use these:

| Element | Value | Class / token |
|---|---|---|
| Container width | 1280px | `max-w-7xl` · `--sognos-container-width` |
| Container gutter | 24px | `px-6` |
| Section rhythm | 80 / 112px | `py-20 md:py-28` |
| Grid gap | 12 / 16px | `gap-3 lg:gap-4` |
| Nav height | 80px (live) | `h-20` — fixed offset relied on by `SolutionUseCases` (`TOP_BASE`) and `ArticleScrollNav` (`sticky top-20`) |

---

## 8 · Typography (LIVE) + weight ladder (PROPOSED)

### 8.1 Live scale (AngelList variable font)

| Role | Class combo |
|---|---|
| Hero H1 | `font-heading font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight` |
| Section H2 | `font-heading font-medium text-3xl md:text-4xl tracking-tight` |
| Statement H2 | `font-heading font-medium text-3xl md:text-5xl tracking-tight` (HeadlineCTA, SolutionsSection, IndustrySection) |
| Subsection H3 | `font-heading font-medium text-xl md:text-2xl tracking-tight` |
| Body | `text-base md:text-lg leading-relaxed text-sognos-body` |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` + 9px square dot |

### 8.2 Weight ladder — PROPOSED (print-aligned)

Print collateral runs 400-unit weight contrast (SofiaPro Bold 700 heading
+ Light 300 body); web currently runs 100-unit (Medium 500 + Regular 400).
Proposed selective changes:

| Element | Current | Proposed | Where to apply |
|---|---|---|---|
| Statement H2 | `font-medium` (500) | `font-semibold` (600) | Only pitch moments: `HeadlineCTA`, `SolutionsSection`, `IndustrySection` |
| Section H2 | `font-medium` (500) | **no change** | Regular section headers stay |
| Body | `font-normal` (400) | `font-light` (300) | **Test on dark navy first** — Light may lose contrast on `bg-sognos-navy*`. Fallback: keep 400 on dark, drop to 300 only on light surfaces |
| Hero H1 (display) | `font-normal` (400) | `font-bold` (700) | Only if going full print alignment — currently applied only on SognosGenogram Hero/Problems as a live demo |

### 8.3 Sofia Pro (LEGACY print face — not for web)

SofiaPro is the print face (eBook + brochure). AngelList is the web
replacement. Sofia Pro is loaded on `/dev/style-guide` and
`/products/sognosgenogram` (via Adobe Typekit `use.typekit.net/aoi4bxt.css`)
for reference/demo only. **Do not roll to other pages.**

If demo requires Sofia Pro:

```tsx
<link
  rel="stylesheet"
  href="https://use.typekit.net/aoi4bxt.css"
  precedence="default"
/>
// then:
style={{ fontFamily: "sofia-pro, sans-serif" }}
```

---

## 9 · Logo lockups (LIVE assets)

Master wordmark + three product lockups. Assets mirrored to
`public/brand-assets/`; originals live in `Project Docs/Brand Assets/`.

| Logo | Path | Notes |
|---|---|---|
| Sognos master | `/brand-assets/sognos-logo.png` | Custom geometric wordmark, subtle inner blue gradient |
| SognosCare | `/brand-assets/sognoscare-logo.png` | Heart-with-hand mark, celebratory multi-colour burst accent (green/purple/orange/coral) |
| SognosRoster | `/brand-assets/sognosroster-logo.png` | Split-tone — `sognos` navy, `roster` in light blue; calendar-with-avatar mark |
| SognosGenogram | `/brand-assets/sognosgenogram-logo.png` | Split-tone — `sognos` navy, `genogram` in magenta (`#91278c`); connected-nodes mark |

Dark-surface use: invert via `brightness-0 invert` for on-navy variants.

### "First in Field Service" tagline (RESURRECTION PROPOSED)

Print consistently locks `First in Field Service` under the Sognos
wordmark. Site currently does not. Either reinstate (Footer first) or
formally retire.

---

## 10 · Icon system (LIVE assets · UNUSED on site)

78-icon library in `Project Docs/Brand Assets/Brand Guide/Icons_Colour no
Background/`. Sample icons mirrored to `public/brand-assets/icons/`.

Every icon uses the **two-tone treatment**: deep navy primary +
`sognos-blue-accent` highlight. Consistent across the whole set.

Variants ship in the source folder: `Colour` · `Gradient Circle` ·
`white-blue-no-background`.

**Current site status:** unused. Placeholder generic icons in
`SolutionsSection`, lucide-react elsewhere. Candidate for import as
sector icons (one per industry).

---

## 11 · Gradients (LIVE assets · HERO-ONLY per CLAUDE.md)

Master brand gradient and sub-brand gradients ship as PNGs. Do not apply
to standard cards or subcards.

| Gradient | Path | Use |
|---|---|---|
| Master brand | `/brand-assets/gradient-master.png` | Bright electric blue → deep navy · diagonal · hero surfaces only |
| Sub-brand | `/brand-assets/gradient-sub-brands.png` | Product-family gradients — Care leans deeper navy, Roster stays in blue family, Genogram introduces magenta |

**PROPOSED token:** `--sognos-gradient-master: linear-gradient(135deg, #1d96fc 0%, #0f1936 100%)` — approximate, not yet in tokens.css.

### Wave overlays (LIVE assets · UNUSED)

`Project Docs/Brand Assets/Brand Guide/image-wave-*.svg` — 3 variants ×
4 waves each (gray-overlay / lightgray / white). Ready-to-drop background
decoration for dark hero surfaces.

---

## 12 · Image treatments

Four documented treatments extracted from the eBook, plus one SVG mask
demo. See `/dev/style-guide` §12 for live rendering.

### 12.1 Field · frontline (Wave mask)
Photo: `/brand-assets/photos/style-guide-photo-1.webp`
Treatment: SVG wave mask from `/brand-assets/waves/mask.svg`, XOR-inverted
via `mask-composite: exclude`.

### 12.2 Care · human (Wave mask)
Photo: `/brand-assets/photos/style-guide-photo-2.webp`
Same wave mask treatment as 12.1.

### 12.3 Rounded rectangle
Print uses ~24px. **Web should use `rounded` (4px)** per §6 unless the
surface is hero-scale (then `rounded-lg` with justification).

### 12.4 Full-bleed
Hard rectangular edge; no mask, no radius. Editorial spread pattern.

### 12.5 Wave SVG mask (LIVE brand asset)

Source: `/brand-assets/waves/mask.svg` (1217×631 viewBox)
Applied via CSS:

```css
mask-image:
  url(/brand-assets/waves/mask.svg),
  linear-gradient(#fff, #fff);
mask-size: 100% 100%, 100% 100%;
mask-repeat: no-repeat, no-repeat;
mask-mode: luminance, luminance;
mask-composite: exclude;
-webkit-mask-composite: source-out;
```

Lock aspect ratio to `aspect-[1217/631]` so the wave shape reads accurately
without stretching. Backdrop should be `bg-sognos-navy-darkest` so the
masked-out area shows navy through.

### 12.6 Corner cut (documented, not currently applied)

```css
clip-path: polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%);
```

Small diagonal chip on bottom-right; borrowed from the eBook page-corner
navy flag motif. Keep the cut subtle — 8–12% depth reads deliberate,
larger reads broken.

### 12.7 Application matrix

| Section | Treatment | Aspect |
|---|---|---|
| Hero + covers | Wave | 16:9 |
| Content page header photo | Corner cut | 4:3 |
| Feature grid card | Rounded rect | 1:1 |
| Editorial spread · article body | Full-bleed | 1:1 / 3:4 |
| Team · testimonial avatar | Rounded rect (16px) | 1:1 |

**Mobile fallback:** any wave or corner-cut softens to standard `rounded`
(4px) under 640px — the shapes read cluttered at small widths.

---

## 13 · Photography library (LIVE assets)

14 sample photos in `/brand-assets/photos/` representing Style 1
aesthetic — real people, on-site light, subjects across healthcare, field
service, editorial contexts.

Filenames: `17`, `22`, `26`, `27`, `28`, `30`, `31`, `32`, `33`, `41`,
`45`, `58`, `61`, `62` — all `.webp`.

Additional brand photos: `style-guide-photo-1.webp` (field worker),
`style-guide-photo-2.webp` (care).

### Photography direction (spec)

- Real workers, real environments (hi-vis, hard-hats, healthcare uniforms)
- Warm outdoor or authentic indoor light — not office-stock
- Diverse subjects across age, ability, sector
- Composition emphasises dignity + physical presence (holding hands, on-site tools)

**Reference:** brochure covers (p1 solar-panel worker, p7 hi-vis team) +
eBook cover (healthcare pro portrait).

---

## 14 · Component foundations (LIVE)

### Buttons

**Primary CTA — "Book a Demo"** (label is standardised everywhere per CLAUDE.md hard rules)

```tsx
<button className="group/demo relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300">
  <span className="absolute bottom-0 left-0 h-40 w-full origin-bottom translate-y-full rounded-[50px] bg-sognos-blue-accent transition-transform duration-300 ease-out group-hover/demo:translate-y-12" />
  <span className="relative z-10 transition-colors duration-300 group-hover/demo:text-white">
    Book a Demo
  </span>
</button>
```

Rules:
- `rounded-full` (buttons only per §6)
- Hover swipe: `sognos-blue-accent` from bottom
- Lives on `bg-sognos-navy*` hero surfaces

### Pills

| Type | Class |
|---|---|
| Identity chip (product name) | `rounded-full bg-sognos-navy px-3 py-1.5 text-xs font-medium text-white` |
| Accent chip (upcoming event) | `rounded-full bg-sognos-blue-accent/10 px-3 py-1.5 text-xs font-medium text-sognos-blue-accent` |
| Status pill (Live) | `rounded bg-[var(--sognos-success-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-success)]` |
| Status pill (Pending) | `rounded bg-[var(--sognos-warning-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-warning)]` |
| Status pill (Error) | `rounded bg-[var(--sognos-error-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-error)]` |

Identity chips use `rounded-full`; status pills use `rounded` (4px).

### Card variants

Standard content cards use `rounded border border-sognos-line`, no shadow.
Three variants:

| Variant | Surface | Text |
|---|---|---|
| Default | `bg-white` | `text-sognos-heading` / `text-sognos-muted` |
| Accent | `bg-sognos-blue-accent` | `text-white` / `text-white/70` |
| Dark | `bg-sognos-navy` | `text-white` / `text-white/70` |

### Hero panel · video + logo crossfade (LIVE reference on Roster)

The signature product-hero visual pattern. A gradient-tinted panel sits
below the hero H1/subtext, hosting a looping video that plays INSIDE the
product's brand gradient. A centered logo anchors the panel initially,
then crossfades out to reveal the video.

**Canonical implementation:** `components/layout/sections/sognosroster/Hero.tsx`.

#### Container
- Outer wrapper: `mx-auto mt-16 max-w-6xl px-6` — matches all product hero panel widths.
- Inner panel: `relative aspect-[2.4/1] w-full overflow-hidden rounded-lg bg-sognos-{product}-gradient`

#### Video layer (behind)
- `absolute inset-0 h-full w-full object-cover`
- **`mix-blend-screen`** — critical. Lets the product's brand gradient show through the video's dark areas, tinting the whole panel in the brand palette. Do NOT drop this class — it's what makes the video read as "inside" the gradient rather than a floating rectangle.
- Source: MP4 for Roster (`/videos/simulated-conversations.mp4`); Mux HLS for Care (`stream.mux.com/...m3u8`, needs `hls.js` lazy-load — Safari plays natively).
- `motion.video` with `initial={{ opacity: 0 }}` and `animate={{ opacity: showVideo ? 1 : 0 }}`.

#### Logo layer (in front)
- `absolute inset-0 flex items-center justify-center`
- SVG at `220x48` (`h-12 sm:h-14 lg:h-16`)
- `motion.div` with `initial={{ opacity: 0 }}` and `animate={{ opacity: showVideo ? 0 : 1 }}` — appears first, fades out when video takes over.

#### Timing

```ts
const LOGO_FADE_SECONDS = 0.3;
const LOGO_HOLD_MS = 4000;

useEffect(() => {
  const timeout = window.setTimeout(
    () => {
      void videoRef.current?.play();
      setShowVideo(true);
    },
    LOGO_FADE_SECONDS * 1000 + LOGO_HOLD_MS,
  );
  return () => window.clearTimeout(timeout);
}, []);
```

Hold constants are shared across products so the rhythm reads coherent
between product pages.

#### When to use the pattern
- Any product hero panel visual.
- Not for mid-page content — panels sit only in the hero rhythm.
- If the video asset isn't ready, ship logo-only inside the same gradient
  panel (no video element). Don't reach for a placeholder image.

### Signature editorial patterns (introduced 2026-08-06)

- **Numbered enumerable-list marker** — `font-heading font-light tabular-nums` at low alpha (`text-white/25` on dark, `text-sognos-heading/10` on light). Structural weight, not shouting. Used on About Beliefs (01/02/03), Leadership Editorial numeral, Story Timeline years.
- **Type-first columns (no boxes)** — hairline `border-l border-white/20` between columns + uniform padding. Kills "3 boxes in a row" default when content is an enumerable list.
- **Signature pull-quote** — display-face line hung off a 3px vertical `sognos-blue-accent` bar. Reads as marked-up quote without quote marks. Used on About Leadership Editorial.
- **Notched-rule motif** — 72×8 SVG notch riding on a hairline rule. Used on About Stats + Story Timeline. Same geometry both places.
- **Beacon pulse** — motion.span that scales+fades in a loop (2.6s cycle, `opacity: [0.55, 0, 0.55]`, `scale: [1, 2.6/3.2, 1]`). Reads as sonar ping. Used on Story Timeline "current" milestone.

---

## 15 · Phased out — DO NOT reintroduce

Explicit non-goals. If a Claude session sees these patterns, they should
be removed or replaced.

- **Shadows anywhere** — CLAUDE.md §2: "None, ever. Separate with borders and tonal steps."
- **`rounded-xl` / `rounded-2xl` / `rounded-3xl` / `rounded-[Xrem]`** — see §6
- **`rounded-sm` on buttons** — buttons should be `rounded-full` (violation was in HeadlineCTA)
- **`text-white/65`** — off-ladder, use `/75` or `/50` (see §1)
- **`bg-gray-200/70` / `bg-gray-50`** on new or edited sections — use `bg-sognos-tint`
- **Gradients on standard cards or subcards** — gradients are hero-only
- **SofiaPro on production pages** — Sofia Pro is print/reference only; web is AngelList
- **The three-state Navbar scroll model** (`top` → `hidden` → `peek`) — removed in `df77a59`, do not reintroduce
- **`data-header-dark` per-section listeners** — see CLAUDE.md gotchas

---

## 16 · Open decisions / WIP

- [ ] **Weight ladder rollout** — hard-coded on `/products/sognosgenogram` as a live demo. Roll to other products / retire if it doesn't hold.
- [ ] **Print palette tokenization** — decide whether to add `--sognos-print-navy`, `--sognos-cream`, `--sognos-warm-coral` to `tokens.css`.
- [ ] **Sector-tinted `IndustrySection`** — approval pending; sage token (`#dfeacd`) needs adding for Energy & Utilities.
- [ ] **Icon library integration** — 78 icons ship in brand assets, currently unused. Decide subset to import as SVGs.
- [ ] **Master gradient token** — currently PNG-only. Tokenize as CSS gradient?
- [ ] **"First in Field Service" tagline** — reinstate under wordmark, or formally retire.
- [ ] **`AboutStats` payload** — current 3 stats (Founded 2016 / 10+ Years / 3 Countries) have redundancy; needs real numbers.
- [ ] **`AboutStoryTimeline` waypoints** — 2016 / 2019 / 2022 / 2025 events are placeholder; confirm with Kunal / Rick.
- [ ] **Leadership editorial vs. current TeamSection** — parked at `/dev/story-timeline`; decide keep / promote / retire.
- [ ] **KH hero pattern** — user selected Option C (left list + right image); scaffold not yet built.

---

## 17 · Live audits / related docs

- `docs/BRAND_MATERIALS_AUDIT.md` — full audit of eBook + brochure
- `docs/HOMEPAGE_INDUSTRIES_SOLUTIONS_AUDIT.md` — Industries + Solutions sections
- `docs/ABOUT_PAGE_AUDIT.md` — About page section-by-section
- `docs/PROJECT_STATE.md` — component status + next steps
- `docs/CHANGELOG.md` — session-by-session history
- `docs/COMPONENT_INVENTORY.md` — reuse-before-invent reference
- `CLAUDE.md` — execution rules + design rules authority

---

## 18 · Preview routes (dev-only, noindex)

Living examples of design decisions in this doc. Do not link publicly.

| Route | Shows |
|---|---|
| `/dev/style-guide` | This doc rendered visually (13 sections) |
| `/dev/story-timeline` | About Story Timeline + Leadership Editorial |
| `/dev/hiw-roster` | HowSognosWorks Roster panel (chat-narrator storyboard C2) |
| `/dev/ai-pipeline` | AI Agent Pipeline component (21st.dev original + Sognos-refined) |
| `/dev/bento-preview` | Homepage bento grid scaffold (legacy) |

---

---

## 19 · Application status (real progress log)

Per-page snapshot of what's **actually** been applied to production.
This is an interim design system &mdash; not everything has landed on
every page. **Update this table whenever a pattern is applied.** Do
not overpromise: if something is untouched, mark ❌.

**Sandbox rule (2026-08-07):** the new print-aligned design system
(Sofia Pro + weight ladder + alpha ladder) is being validated on
**SognosCare only**. Everything else runs the original live design
system (AngelList, `font-medium` H2, `font-normal` body, standard
alpha values). Bug fixes (e.g. phased-out `rounded-sm` on buttons)
land as **standalone fixes** on other pages, separate from the
sandbox experiment.

### Product pages

| Page section | Sofia Pro | Weight ladder | Alpha ladder | Video panel | Notes |
|---|---|---|---|---|---|
| **SognosCare Hero** | ✅ | ✅ font-bold H1 | ✅ text-white/85 | ❌ hidden — logo-only in gradient panel | **Sandbox.** Video pattern documented (§14); Care asset not finalised |
| **SognosCare Problems** | ✅ | ✅ font-semibold H2 · font-light body (dark half) | ✅ text-white/85 dark half | — | **Sandbox.** Also tokenised `text-gray-600` → `text-sognos-body`; `rounded-xl` → `rounded` |
| SognosCare Features / Editions / Advantages / Stories | ❌ | ❌ | ❌ | — | Untouched |
| SognosRoster Hero | ❌ | ❌ | ❌ | ✅ live (canonical) | Reference implementation for video/logo crossfade — see §14 |
| SognosRoster other sections | ❌ | ❌ | ❌ | — | Untouched |
| SognosGenogram Hero | ❌ | ❌ | ❌ | ❌ N/A (no video slot) | Sandbox experiment reverted 2026-08-07 — restored to original design system |
| SognosGenogram Problems | ❌ | ❌ | ❌ | — | Sandbox experiment reverted 2026-08-07 — restored to original design system |
| SognosGenogram other sections | ❌ | ❌ | ❌ | — | Untouched |

### Homepage

| Section | Sofia Pro | Weight ladder | Alpha ladder | Notes |
|---|---|---|---|---|
| Hero | ❌ | ❌ | ❌ | Sandbox experiment reverted 2026-08-07. **Kept:** `rounded-sm` button → `rounded-full` (standalone bug fix, §15 PHASED OUT compliance) |
| HomeProductCards | ❌ | ❌ | — | Untouched |
| LogoStrip | ❌ | ❌ | — | Untouched |
| HowSognosWorks | ❌ | ❌ | — | Pipeline addition proposed, not shipped |
| IndustrySection | ❌ | ❌ | — | See HOMEPAGE_INDUSTRIES_SOLUTIONS_AUDIT.md — not applied |
| HeadlineCTA | ❌ | ❌ | — | `rounded-sm` button violation flagged in audit — not fixed |
| SolutionsSection | ❌ | ❌ | — | Card content rewrite proposed — not applied |
| CustomerStories | ❌ | ❌ | — | Untouched |
| NewsInsightSection | ❌ | ❌ | — | Feature-tile scrim bug flagged — not fixed |

### About page

| Section | Editorial pattern | Notes |
|---|---|---|
| Hero | — | Copy rewritten (external edit) |
| AboutStoryTimeline | ✅ live | Wired in — replaces old Our Story block |
| AboutValues | ✅ Refresh + numbered beliefs | Applied 2026-08-06 |
| TeamSection | — | Live 3-card grid — untouched |
| AboutLeadershipEditorial | 📦 scaffold at /dev/story-timeline | Not wired live |
| Partners + Accreditations | — | Untouched since audit |
| SocialResponsibility | — | Audit findings not applied |
| Careers band | — | Untouched |

### Preview routes (dev-only)

| Route | Purpose | Status |
|---|---|---|
| /dev/style-guide | 13-section design reference | Actively maintained |
| /dev/story-timeline | About Timeline + Leadership Editorial scaffolds | Awaiting decision |
| /dev/hiw-roster | HowSognosWorks C2 storyboard | Awaiting decision |
| /dev/ai-pipeline | AI Agent Pipeline preview (21st.dev + Sognos-refined) | Awaiting decision |

---

**Rule when updating:** don't overpromise. If a page section is
untouched, mark ❌. If a pattern is applied to one component in a
section but not others, note it. **This table is the source of truth
for "what's actually on the site" vs "what's still in the doc /
proposed."**

---

**End of reference.** For Claude sessions: read the relevant section
before making changes, and if in doubt, defer to CLAUDE.md §2 or ask.
