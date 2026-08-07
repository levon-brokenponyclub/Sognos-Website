# Claude Execution Control — Sognos React

> **Execution rules + gotchas only.** Design rules, state, roadmap, and
> per-page status live in **`docs/PROJECT_STATE.md`** — read it at the start
> of every task. The redesign loop lives in `docs/ROLLOUT_PROCESS.md`.
> Session history lives in `docs/CHANGELOG.md`. This file is the discipline
> that governs *how* work happens; those three are the *what*, *how*, and
> *when*.

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

## 2. Design rules — see `docs/PROJECT_STATE.md` §2

The full rules table (layout, radius, shadow, surfaces, typography,
dark-alpha ladder, stat blocks, signature patterns, phased-out items) lives
in `docs/PROJECT_STATE.md` §2. **That is authoritative.** Read it before
touching any UI.

Fast pointers only, so this file stands alone for the gotchas below:

- **Design reference:** Routable. Structure + mechanic only; Sognos copy +
  assets always ship.
- **Typeface:** local **AngelList** variable font (`--font-sans`,
  `--font-heading`).
- **Radius:** `rounded` (4px) is the base for surfaces / cards / images /
  pills; `rounded-full` is buttons only; never `xl` / `2xl` / `3xl` /
  `rounded-[Xrem]`.
- **No shadows, ever.** Separate with borders and tonal steps.
- **Light section surfaces:** `bg-white` OR `bg-sognos-tint` — both valid,
  different tones.
- **Primary CTA label:** **"Book a Demo"** everywhere.
- **Server Components by default.**

Anything else — check `docs/PROJECT_STATE.md` §2. Don't guess.

---

## 3. Technical gotchas

- **Linter strips code between saves** — always re-read a file before
  multi-step edits; the bento overlay was silently removed twice by the
  formatter.
- **Card backgrounds** — never `style={{ background: "" }}`; use `bg-white`.
  Empty string = transparent card = orbs invisible.
- **FlyonUI is NOT installed** — translate any pasted FlyonUI snippet to
  React state + Tailwind + Framer Motion.
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
- **Sanity Roster stories query is broken** — `getSognosrosterPageContent()`
  selects `stories`; schema field is `featuredStories`. Roster Sanity stories
  never reach the page. One-line GROQ fix in `lib/sanity/queries.ts`.

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

- **`docs/PROJECT_STATE.md`** — authoritative for design rules (§2), stack
  (§3), per-page application status (§4), next steps (§5), open decisions
  (§6), the SognosCare sandbox scope (§7), preview routes (§8). Read at the
  **start** of every task; update at the **end** of every task.
- **`docs/ROLLOUT_PROCESS.md`** — the per-page redesign loop
  (Scaffold → Approve → Pass → Refine → Roll out). Follow it for any new
  page.
- **`docs/CHANGELOG.md`** — append-only history — one entry per task
  (date · what changed · files · why).
- **`docs/archive/`** — retired: `CLAUDE_DESIGN_SYSTEM.md`,
  `COMPONENT_INVENTORY.md`, `ABOUT_PAGE_AUDIT.md`,
  `BRAND_MATERIALS_AUDIT.md`, `PRODUCT_DATA_AUDIT.md`, `CONTENT_AUDIT.md`,
  plus earlier docs (`DESIGN_MIGRATION_STATE.md`, `SLIDER_PATTERN.md`,
  `FEATURE_LOG.md`, Cohere-era mapping docs). **Historical only, never
  current.** Live state lives in `PROJECT_STATE.md`.

---

## 6. Session start + session end

### Start of every session

Read `docs/PROJECT_STATE.md` (state · rules · status) and skim the last
2–3 entries of `docs/CHANGELOG.md`. Confirm with the user in a brief
overview — **no question list**, no "here's what I need to know before I
start." Three lines, one topic each:

> **Where we were:** [last session's outcome + any in-progress work]
> **Style we're going for:** [active design posture — Routable, sandbox scope, current phase]
> **Consistency check:** [any live rule shift, open decision, or blocker that matters right now]

Then proceed with the user's ask. Only ask a clarifying question if the
docs genuinely don't answer it.

### End of every session

Append a `docs/CHANGELOG.md` entry with this shape:

- `## YYYY-MM-DD — <short scope title>`
- One-line intro (why this session mattered — outcome, not activity).
- Subsections per work chunk (`### Subsection` — files · what changed · why).
- `**Session ID:** <uuid>` — from the transcript filename at
  `~/.claude/projects/-<escaped-cwd>/<uuid>.jsonl`. Run
  `ls -t ~/.claude/projects/*/*.jsonl | head -1` if not visible.
- `**Ended at:** <one line>` — where the work stopped + what comes next.

Keep it dense. One section per work chunk, no filler. Match the existing
changelog voice.
