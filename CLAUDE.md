# Claude Execution Control — Sognos React

> **Execution rules only.** Project state, plan, roadmap and progress live in
> `docs/PROJECT_STATE.md`. The redesign loop lives in
> `docs/ROLLOUT_PROCESS.md`. Read those at the start of every task. This file
> is the discipline that governs *how* work happens; those two are the *what*
> and the *why*.

---

## 1. Project understanding

Sognos is a **product-led SaaS platform** built on Microsoft Dynamics 365 for
Field Service Innovations. Not a consulting site, not a Microsoft-partner site.

### Product system

| Product | Role |
|---|---|
| **SognosCare** | Care operations & compliance — case management, service delivery tracking, compliance & reporting. |
| **SognosRoster** | Workforce scheduling & optimisation — allocation, routing, real-time optimisation. |
| **SognosGenogram** | Relationship & family context mapping — embeds support networks, histories, and family structures into case records. |

Care manages services. Roster coordinates the workforce that delivers them.
Genogram enriches case records with relational context. All three are standalone
and can be implemented independently or together.

### Architecture layers

| Layer | Purpose |
|---|---|
| **Products** | Primary positioning — SognosCare, SognosRoster, SognosGenogram. |
| **Solutions** | Supporting engagements — Frontline, CRM, Customer Insights, Customer Experience, Customer Service, Power Platform, Quick Start. |
| **Industries** | Sector entry points — Health & Social Care, Facilities Management, Local Government, Industrial Services, Energy & Utilities. |
| **Platform** | Embedded proof only — Dynamics 365, Copilot AI, Power Platform. Never a nav layer, never a standalone page. |

---

## 2. Design rules (authoritative)

The current design reference is **Routable** (<https://www.routable.com>).
Only structure and mechanic are taken from the reference — Sognos copy and
assets always ship. Full context in [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md).

| Concern | Rule |
|---|---|
| Typeface | Local **AngelList** variable font on both body and heading (`--font-sans`, `--font-heading`). |
| Container | `max-w-7xl` = **1280px** via `--sognos-container-width`, `px-6`. |
| Radius | `rounded-lg` on surfaces; `rounded-full` on **buttons only**. Never `xl` / `2xl` / `3xl` / `rounded-[Xrem]`. |
| Shadows | **None, ever.** Separate with borders and tonal steps. |
| Light section surface | **`bg-sognos-tint`**. Supersedes `bg-gray-50` and `bg-gray-200/70` for new/edited sections. |
| Dark surface default | `bg-sognos-navy`. `-dark` / `-darkest` only when specified. |
| Gap | `gap-3 lg:gap-4` standard. |
| Section rhythm | `py-20 md:py-28`. |
| Section H2 | `font-heading text-3xl font-medium tracking-tight md:text-4xl`; statement H2 (`HeadlineCTA`, `SolutionsSection`) `md:text-5xl`. |
| Hero H1 | `font-normal`, `text-5xl md:text-6xl lg:text-7xl`. |
| Eyebrow | `text-xs font-semibold uppercase tracking-widest` (`AnimatedEyebrow`, square dot). |
| Body measure | `max-w-2xl` body, `max-w-3xl` hero sub, `max-w-[46rem]` article prose (`ARTICLE_PROSE_MAX_W`). |
| Gradients | Hero and deliberate highlight surfaces only — never on standard cards or subcards. |
| Stat blocks | Match `CTASection.tsx` exactly: grid `grid-cols-2 gap-3 lg:gap-4`; cell `relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden {bg}`; number `font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none`; label `text-xs font-semibold uppercase tracking-widest`. |
| Primary CTA label | **"Book a Demo"** everywhere. |
| Components | Server Components by default; `"use client"` only where interaction/motion demands it. |

If these ever conflict with `docs/PROJECT_STATE.md` §2, **PROJECT_STATE wins.**

---

## 3. Technical gotchas

- **Linter strips code between saves** — always re-read a file before multi-step
  edits; the bento overlay was silently removed twice by the formatter.
- **Card backgrounds** — never `style={{ background: "" }}`; use `bg-white`.
  Empty string = transparent card = orbs invisible.
- **FlyonUI is NOT installed** — translate any pasted FlyonUI snippet to React
  state + Tailwind + Framer Motion.
- **Interactive sections** — any section using `useState`/hooks needs
  `"use client"` at the top.
- **`@property --shine-angle`** — requires Chrome 85+ / Safari 15.4+. See
  `app/globals.css` for the full shine-border implementation.
- **Framer Motion drawer pattern** — `AnimatePresence` wraps the conditional
  render; outer `motion.div` fades; inner panel uses `y: "100%" → 0` spring
  (`damping: 30, stiffness: 300`).
- **Drawer scroll isolation** — requires BOTH
  `document.body.style.overflow = "hidden"` on expand AND `overscroll-contain`
  on the inner scroll div. Both are needed.
- **Next.js 16 async `params`** — page components receiving `params` must be
  `async`; use `const { slug } = await params` before accessing segments.
- **Bulk identical class swaps** — use
  `sed -i '' 's/old/new/g' file1 file2 file3` rather than one-off Edits across
  many files.
- **EditionCards.tsx vs ProductCard.tsx** — editions slider is
  `components/layout/sections/sognoscare/EditionCards.tsx`; `ProductCard.tsx`
  is the homepage product card. Don't confuse them.
- **ProductCustomerStories** — shared component at
  `components/layout/sections/ProductCustomerStories.tsx`; per-product
  `Stories.tsx` files are thin wrappers.
- **Knowledge Hub post template** — `app/(marketing)/knowledge-hub/[slug]/page.tsx`;
  posts hardcoded for dev; `twoCol: true` enables the sticky-meta +
  scrollable-content layout.
- **Navbar scroll model — one persistent bar.** The header is `fixed` with an
  `h-20` (80px) content row and never translates on scroll. Only its `top`
  animates, from the announcement-banner offset to `0`, as the banner slides
  itself up on first scroll. A single `scrolled` flag (`window.scrollY > 8`)
  drives both the banner slide and the bar's background/border swap. The old
  three-state `top` → `hidden` → `peek` model, its `HIDE_AFTER` / `DELTA_MIN`
  / `headerHidden` state and the effect that force-revealed the bar on dropdown
  open were removed in `df77a59` — **do not reintroduce them.** Do not add
  per-section `data-header-dark` listeners back.
- **80px is a fixed offset** — because the bar no longer hides, anything
  positioning beneath it can rely on a constant 80px. Assumed by
  `SolutionUseCases` (`TOP_BASE`) and `ArticleScrollNav` (`MOBILE_BAR_TOP`,
  sticky `top-20`). Changing the navbar height means updating those.
- **`ProductSubNav` sections prop** — shape is
  `{ label: string; id: string; href?: string }[]` (matches `SubNavSection`
  exported from `ProductSubNav.tsx`); `href` defaults to `#${id}` if omitted.

---

## 4. Hard rules

- Products are primary — always lead with SognosCare + SognosRoster.
- Solutions are supporting — never primary positioning.
- Industries are separate from solutions — never merge.
- Platform is embedded proof only — never a nav item, never a standalone page.
- CTA label: **"Book a Demo"** everywhere.
- Server Components by default.
- Claude = Builder + Architect only (**not** designer).
- If you cannot locate a file on the first attempt, **stop and ask** — do not
  keep searching and burning tokens.
- Ask instead of guessing — if unsure about a file path, intent, or scope, ask.
- Before starting a task, suggest the model tier to use (Opus for complex /
  architectural work, Sonnet for straightforward edits, Haiku for simple
  lookups).
- Doc sync: any routing, permalink, or page-title change must update
  `docs/PROJECT_STATE.md` and append an entry to `docs/CHANGELOG.md` in the
  same task.

---

## 5. Source of truth & session loop

- **`docs/PROJECT_STATE.md`** is the authoritative state of record — reference,
  design rules, stack, component status, next steps, open decisions. Read at
  the **start** of every task; update at the **end** of every task.
- **`docs/ROLLOUT_PROCESS.md`** is the per-page redesign loop
  (scaffold → approve → refine → roll out). Follow it for any new page.
- **`docs/CHANGELOG.md`** is append-only history — one entry per task
  (date · what changed · files · why).
- **`docs/COMPONENT_INVENTORY.md`** answers "does this pattern already exist?"
  — read before building anything new (reuse before invent).
- **`docs/archive/`** holds superseded audits/plans (including the retired
  `DESIGN_MIGRATION_STATE.md`, `FEATURE_LOG.md`, `SLIDER_PATTERN.md`, and the
  Cohere-era mapping docs) — **historical only, never current.**
