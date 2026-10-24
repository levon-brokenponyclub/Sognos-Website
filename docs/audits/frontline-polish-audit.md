# Solutions / Frontline — Production Polish Audit

> **Route:** `/solutions/frontline` · `app/(marketing)/solutions/[slug]/page.tsx`
> **Template scope:** the page is the shared `solutions/[slug]` template — **every finding applies to all 8 solution routes** (frontline, CRM, customer insights, customer experience, customer service, power platform, quick start, finance & operations). Only the copy differs (`lib/solutions-content.ts`).
> **Benchmark:** <https://www.angellist.com/fund-administration/spvs> — measurements as recorded in `docs/audits/sognoscare-polish-audit.md` §1 (same page, inspected 2026-10-24).
> **Mode:** Audit → HTML mockups → approval → fix. No copy or colour changes without approval.
> **Status:** STEP 1–2 complete. Awaiting mockup approval. Nothing in `.tsx` changed.

---

## 0. Verification

- **Docs:** `DESIGN_MIGRATION_STATE.md` is archived; `docs/PROJECT_STATE.md` is authoritative. §4.4 lists Solutions `[slug]` as "Pass ⚠️ outstanding · Refine ⚠️ outstanding" and §5 #1 calls it the **top priority — only page family still off the design system**. Last CHANGELOG entries are the SognosCare pass; nothing solution-specific deferred.
- **Rules applied:** PROJECT_STATE §2 (not the brief's older hard rules) — same conflict table as the SognosCare audit §0 (`rounded` base, `bg-white` / `bg-sognos-tint`, live palette). The SognosCare pass also introduced `SectionLabel` (18px label, square accent marker) and a page-local type scale; the mockups reuse both so solution pages read as one system with the products.
- **Build:** `npm run build` — **pass**, exit 0, no warnings (dev stopped, `.next` cleared, dev restarted).

### Dependency tree

| Node | File | Shared? (consumers) |
|---|---|---|
| Page | `app/(marketing)/solutions/[slug]/page.tsx` | template for 8 routes |
| Content | `getSolutionContent` / `getSolutionMeta` · `lib/solutions-content.ts`; `SOLUTIONS`, `PRODUCTS` · `lib/constants.ts` | static TS (no Sanity) |
| Eyebrow | `components/ui/AnimatedEyebrow` | **shared (18)** |
| Hero CTA | `SolutionHeroDemoButton.tsx` | **shared (4: solutions, industries, customer-stories, KH posts)** |
| Problem band | inline in page | page |
| Capabilities | `SolutionUseCases.tsx` (sticky stacking cards) | page-only |
| ↳ images | `public/solutions/solutionTab-Image{,-2,-3}.avif` | page-only |
| Platform | inline + `shared/PlatformLogoRow.tsx` | page-only |
| Trust logos | `LogoStrip.tsx` (+ `getLogoStripContent`, `lib/content/logoStrip`) | **shared (2: homepage hero, solutions)** |
| Works with / Related | inline in page | page |
| Motion | `components/ui/ScrollReveal` | shared (6) |

---

## 1. Findings

### Page-level

| # | Issue | Sev | Benchmark | Proposed fix | Shared? |
|---|---|---|---|---|---|
| G1 | **Trust logo strip is invisible.** `LogoStrip` has no background by design (it lives inside the dark homepage hero) and renders white title + white-filtered logos. On solution pages it sits on the white body → white on white. | **P0** | Logo strip on a contrasting band | Wrap it in a page-local `bg-sognos-navy` section on solution pages (no change to the shared component). | Shared — page-side fix only |
| G2 | **Capability images are another product's UI** — `solutionTab-Image*.avif` show a "Hospital Policy Agent" chat (purple, endoscopy protocol) from the earlier reference scaffold. Unrelated to any solution; on all 8 routes. | **P0** | Product visuals | Replace with Sognos visuals (mockups use the Frontline capability motion graphics) or a neutral panel meanwhile. | Page-only |
| G3 | **Four consecutive white sections** — Capabilities → Platform → (invisible) Logos → Works with → Related all `bg-white`. | P1 | Alternating surfaces | White → navy → tint → white → navy (logos) → white → tint. | — |
| G4 | **Four eyebrow treatments**: `AnimatedEyebrow` (hero), `text-sognos-blue-accent` uppercase (problem), `text-sognos-muted` uppercase (capabilities), inline `style={{color:"#6B7280"}}` (works with, related). | P1 | One label | `SectionLabel` throughout. | — |
| G5 | **Five H2 styles**: `font-medium tracking-[-0.02em] md:text-4xl` (problem, platform, works, related) vs `md:text-5xl` (capabilities) vs inline `#1A1A1A`. | P1 | One H2 | `TYPE.h2` (400, 30→36px). | — |
| G6 | **Hard-coded hex via inline `style`** — `#6B7280`, `#1A1A1A`, `#4B5563` (×6) instead of tokens. | P1 | — | `text-sognos-muted` / `text-sognos-heading` / `text-sognos-body`. | — |
| G7 | No left rail — every section header is stacked; the product pages now use the 2/10 rail. | P1 | Rail on content sections | Rail on Capabilities, Platform, Works with, Related. | — |

### 1. Hero

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| H1 | Image is a remote `plus.unsplash.com/premium_photo…` (Unsplash+ premium licence) in a `bg-gradient-to-br from-[#E9E2F7]…` frame — the purple gradient is a leftover reference colour, off-palette. | P1 | Local image (`/images/industries/industrial-services.webp`) or a product visual; frame `bg-sognos-tint`. Licence of the remote image to confirm (**QUESTION Q3**). |
| H2 | Eyebrow is a link back to `/solutions` styled as a label — fine functionally, but it's the only label that's a link and has no affordance. | P2 | Keep as breadcrumb: "Solutions / Frontline" with the first part linked. |
| H3 | H1 `text-5xl lg:text-6xl` with no line control; sub `max-w-xl text-base md:text-lg leading-normal`. | P2 | H1 on the scale; sub `TYPE.heroSub`. |
| H4 | One CTA only — no route into the page. | P2 | Secondary "Explore capabilities ↓" text link (copy → **SUGGESTION S2**). |
| H5 | `SolutionHeroDemoButton` opens the demo modal with no product preselected. | P2 | Leave (solutions span products). |

### 2. Problem band

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| P1 | Body `text-white/70` — off the alpha ladder (`/75`). | P2 | `/75`. |
| P2 | Numbers `font-mono` (only monospace on the page). | P2 | `font-heading tabular-nums`. |
| P3 | Cards `min-h-[380px]` with numeral pinned top and copy bottom — on a 2x2 the empty middle reads as dead space at lg. | P2 | `min-h-[300px]`, keep the split. |
| P4 | Label uppercase accent text (fails nothing on navy, but G4). | P1 | `SectionLabel tone="dark"`. |

### 3. Capabilities — `SolutionUseCases`

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| C1 | G2 — third-party UI images. | **P0** | Capability motion graphics (mockup) / neutral panel. |
| C2 | **Five of six capability bodies are never readable at rest** — each sticky card covers the previous body; only the last card's copy shows unless the user scrolls slowly. | P1 | Option A: 3-col card grid, all copy visible (recommended). Option B: keep the stack but put the body in the 80px header strip. **QUESTION Q1.** |
| C3 | H2 `md:text-5xl` (statement scale) vs `md:text-4xl` elsewhere (G5). | P1 | `TYPE.h2`. |
| C4 | Sticky offset `TOP_BASE = 80` — correct today; if solutions adopt the section bar (S1) it becomes 126. | P2 | Note only. |
| C5 | Tail spacer `(n-1)*80+200` px of empty scroll after the stack. | P2 | Goes with option A. |

### 4. Platform

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| L1 | `PlatformLogoRow` logos `h-7 sm:h-5` — **smaller on larger screens**. | P2 | `h-6 sm:h-7`. |
| L2 | Commented-out heading block left in `PlatformLogoRow` (dead code). | P2 | Remove. |
| L3 | H2 "Platform" + H3 "Built on …" side by side — the H2 is a label doing a heading's job. | P1 | "Platform" → `SectionLabel` on the rail; "Built on …" becomes the H2. (No copy change.) |

### 5. Trust logos — G1 (P0). Also: title is an `<h3>` (outline skip) — `LogoStrip` is shared with the homepage hero; leave the shared component, note only.

### 6. Works with

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| W1 | "View →" only appears on hover — invisible on touch; card has no other affordance. | P1 | Always visible arrow. |
| W2 | Care dot uses legacy `--sognos-edition-green` (PROJECT_STATE §5 #9 token debt); Roster dot uses the generic accent, not `--sognos-roster-base`. | P2 | Product tokens: `bg-sognos-care-base`, `bg-sognos-roster-base` (colour change → **QUESTION Q4**). |
| W3 | G6 inline hex. | P1 | Tokens. |

### 7. Related solutions

| # | Issue | Sev | Proposed fix |
|---|---|---|---|
| R1 | "Explore →" hover-only (W1). | P1 | Always visible. |
| R2 | `gap-4` (rule `gap-3 lg:gap-4`). | P2 | Rule gap. |
| R3 | Body is each related page's hero subtext — long; cards uneven heights. | P2 | `line-clamp-3`. |

### Accessibility / responsive / motion
- Single H1 ✔. LogoStrip H3 after H2s (shared — note). Hover-only affordances (W1, R1) ✖.
- `ScrollReveal` on every section except Capabilities (commented out) — consistent enough; reduced motion respected by the wrapper ✔.
- Tap targets: hero CTA `py-3` ≈ 48px ✔; Works-with cards ✔.
- 375px: problem 2x2 collapses to 1-col ✔; sticky capability stack at 375 shows only header strips (C2).

---

## 2. SUGGESTION / QUESTION (batched)

**QUESTION Q1 — Capabilities layout.**
- **A (recommended):** 3-col grid of compact capability cards (visual + title + body) — all six bodies readable, reuses the Frontline capability motion graphics.
- B: keep the sticky stack, body moved into the always-visible header strip, visual replaced.

**QUESTION Q2 — Hero direction.**
- **A (recommended):** light hero (current structure) polished — solutions are *supporting* positioning (CLAUDE.md hard rule), so a quieter hero than the products is correct.
- B: dark Aria-style motion hero (`01m`-family, photo + Job dispatched + live status) — matches the product pages, louder.

**QUESTION Q3 — Hero image.** The remote image is Unsplash+ (premium licence). Keep (confirm licence) / swap to local `industries/industrial-services.webp` (mockup default) / product visual.

**QUESTION Q4 — Works-with product dots** to the product tokens (Care base blue, Roster base) — a small colour change; approve or keep.

**SUGGESTION S1 — Section bar on solution pages** (Capabilities / Platform / Works with / Related). Trade-off: shorter page than products; may be overkill.
**SUGGESTION S2 — Secondary hero link** "Explore capabilities ↓" (copy).
**SUGGESTION S3 — Per-solution capability visuals.** The mockup ships Frontline's six; the other 7 solutions need their own sets (or a neutral panel) before the template change goes live — otherwise they'd show Frontline visuals.
**SUGGESTION S4 — Move solution content to Sanity** (currently static TS) — out of scope, noted.

---

## 3. Fix log (STEP 3)

_Not started — awaiting mockup approval._
