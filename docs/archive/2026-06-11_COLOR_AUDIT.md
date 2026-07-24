> **ARCHIVED — historical reference.** Point-in-time audit generated 2026-06-11, describing the colour state BEFORE the Phase 4 colour-token rollout. Superseded by `docs/DESIGN_MIGRATION_STATE.md`. Kept for forensic detail only; do not treat as current.

# Colour Usage & Token Coverage Audit
> Read-only. No files edited. Generated 2026-06-11.

---

## Summary Table

| Category | Total | Notes |
|----------|-------|-------|
| Semantic tokens — **live** | 9 tokens active | `text-heading`, `text-body`, `text-muted`, `border-subtle`, `brand`, `brand-dark`, `background`, `foreground`, `card-border` |
| Semantic tokens — **dead** | 11 tokens zero usage | `text-soft`, `text-link`, `border-strong`, `card-bg`, `subcard-bg`, `card-border-soft`, `accent-blue`, `brand-light`, `accent`, `highlight`, `surface-100` |
| Primitive ramp usage (Cat 2) | 311 + 55 = **366** | Almost entirely `prussian-blue-800` (311) + `neutral-*` (55); rest = 1 |
| Hardcoded hex in Tailwind `[#]` (Cat 3a) | **229** instances, 33 distinct hex values | |
| Hardcoded colour in `style={{}}` (Cat 3b) | **33** instances across 10 files | |
| shadcn alias usage (Cat 4) | **~60** instances, 20 files | Mostly `text-muted` (likely wrong — see §4) |

---

## Category 1 — Semantic Token Usage

### Live tokens

| Token | Total | Top files |
|-------|-------|-----------|
| `text-sognos-text-heading` | **63** | ProductCustomerStories (implied via prussian-blue — see §2), HowSognosWorksPreview (8), CustomerStories (7), industries/[slug] (6), NewsInsightSection (5) |
| `text-sognos-text-body` | **54** | KnowledgeHubArchive (5), ProductSection (4), industries/[slug] (4), dhf-conversation (4), about (4), EditionPageTemplate (3) |
| `text-sognos-text-muted` | **41** | OpenRoles (7), products/page (4), contact (4), KnowledgeHubArchive (3), industries (3) |
| `border-sognos-border-subtle` | **43** | OpenRoles (7), contact (6), ProofSection (4), social-responsibility (4), careers (4) |
| `text-brand` / `bg-brand` | **42** | Navbar (5), about (4), ProductDrawer (3), AnimatedButton (3), knowledge-hub/[slug] (3), industries (3) |
| `bg-background` | **8** | scattered |
| `text-foreground` | **4** | scattered |
| `text-brand-dark` | **3** | scattered |
| `border-sognos-card-border` | **1** | industries/[slug] |

### Dead tokens (zero usages — candidates to drop in the rename)

| Token | Defined as | Verdict |
|-------|-----------|---------|
| `text-sognos-text-soft` | `var(--color-neutral-400)` | Dead — components use `text-gray-400` directly |
| `text-sognos-text-link` | `var(--color-cornflower-ocean-500)` | Dead — components use `text-brand` or hardcoded hex |
| `border-sognos-border-strong` | `var(--color-cornflower-ocean-500)` | Dead |
| `bg-sognos-card-bg` | `#ffffff` | Dead — components use `bg-white` |
| `bg-sognos-subcard-bg` | `var(--color-neutral-50)` | Dead |
| `border-sognos-card-border-soft` | `var(--color-neutral-200)` | Dead |
| `bg-sognos-accent-blue` | `var(--color-prussian-blue-800)` | Dead |
| `text-brand-light` | `var(--color-cornflower-ocean-300)` | Dead |
| `bg-accent` / `text-accent` | `var(--color-cornflower-ocean-500)` | Dead |
| `text-highlight` | `var(--color-cornflower-ocean-400)` | Dead |
| `bg-surface-100` | `var(--color-neutral-100)` | Dead |

---

## Category 2 — Direct Palette Ramp Usage

### Per-ramp totals

| Ramp | Total (main) | Style-guide |
|------|-------------|-------------|
| `prussian-blue-*` | **311** | 0 |
| `neutral-*` | **55** | 17 |
| `cornflower-ocean-*` | **1** | 0 |
| `true-cobalt`, `seagrass`, `grapefruit-pink`, `sandy-brown`, `bright-lavender` | **0 each** | — |

### `prussian-blue` per-file breakdown (top 20)

| File | Count | Note |
|------|-------|------|
| `components/sections/ProductCustomerStories.tsx` | 40 | All `prussian-blue-800` — should be `text-sognos-text-body` |
| `components/sections/sognoscare/EditionPageTemplate.tsx` | 19 | |
| `app/(marketing)/dhf-conversation/page.tsx` | 19 | |
| `app/(marketing)/knowledge-hub/[slug]/page.tsx` | 16 | |
| `app/(marketing)/customer-stories/[slug]/page.tsx` | 14 | |
| `components/sections/OpenRoles.tsx` | 9 | |
| `app/(marketing)/contact/page.tsx` | 9 | |
| `components/sections/SolutionsSection.tsx` | 8 | |
| `components/sections/TeamSection.tsx` | 7 | |
| `components/ui/ProductDrawer.tsx` | 6 | |
| `components/sections/sognosroster/Features.tsx` | 6 | |
| `components/sections/sognosgenogram/Features.tsx` | 6 | |
| `components/sections/sognoscare/Proof.tsx` | 6 | |
| `components/sections/sognoscare/Features.tsx` | 6 | |
| `components/sections/sognoscare/Advantages.tsx` | 6 | |
| `components/sections/KnowledgeHubArchive.tsx` | 6 | |
| `app/(marketing)/industries/[slug]/page.tsx` | 6 | |
| `components/sections/sognosroster/Advantages.tsx` | 5 | |
| `app/(marketing)/contact/ContactForm.tsx` | 5 | |
| `app/(marketing)/company/about/page.tsx` | 5 | |

(+11 more files with 1–4 each; total > 40 files)

**Note:** `prussian-blue-800` = `#052048` = what `--sognos-text-body` resolves to. Nearly every usage here should be `text-sognos-text-body` or `text-sognos-text-heading`.

### `neutral` per-file

| File | Count |
|------|-------|
| `components/ui/OutcomesFlow.tsx` | 27 |
| `components/ui/ProcessFlow.tsx` | 9 |
| `components/ui/Workforce.tsx` | 7 |
| `app/(marketing)/customer-stories/[slug]/page.tsx` | 2 |
| `app/(marketing)/knowledge-hub/[slug]/page.tsx` | 1 |
| `components/sections/KnowledgeHubArchive.tsx` | 1 |
| `components/sections/CTASection.tsx` | 1 |

Concentrated in three diagram/UI components — likely intentional for visual design mock data.

---

## Category 3 — Hardcoded Colours

### 3a. Arbitrary Tailwind classes `[#hex]` — 229 instances

#### Top files by count

| File | Count |
|------|-------|
| `app/(marketing)/company/about/page.tsx` | 15 |
| `components/sections/sognosgenogram/Features.tsx` | 12 |
| `components/sections/ProofSection.tsx` | 12 |
| `components/layout/Navbar.tsx` | 12 |
| `components/sections/sognosroster/Proof.tsx` | 11 |
| `components/sections/sognoscare/Features.tsx` | 10 |
| `components/sections/CTASection.tsx` | 10 |
| `app/(marketing)/solutions/[slug]/page.tsx` | 9 |
| `app/(marketing)/dhf-conversation/page.tsx` | 9 |
| `components/sections/sognosroster/Features.tsx` | 7 |
| `components/sections/SocialResponsibilitySection.tsx` | 7 |
| `components/sections/TeamSection.tsx` | 6 |
| `components/sections/sognoscare/EditionPageTemplate.tsx` | 5 |

#### Distinct hex values

| Hex | Count | Meaning |
|-----|-------|---------|
| `#1D96FC` | **91** | **SognosCare accent** — appears across Features, CTASection, Navbar. No semantic token. Highest-frequency hardcoded colour in the codebase. |
| `#052048` | **41** | `prussian-blue-800` raw hex — duplicate of the ramp, likely copy-pasted. Should use `prussian-blue-800` utility or a semantic token. |
| `#92278d` | **25** | **Genogram purple accent** — all in `sognosgenogram/` components. No semantic token. |
| `#03112f` | **12** | **SognosCare hero BG** (`HERO_BG` const in Hero.tsx). Per-product BG. |
| `#3990c5` | **8** | **Roster blue accent** — in `sognosroster/` components. No semantic token. |
| `#10B981` | **7** | Success / emerald green (same as Tailwind `emerald-500`). |
| `#1A1A1A` | **6** | Near-black heading text on white sections (solutions, solutions page). No token. |
| `#F2EAEF` / `#EEE8F4` / `#E9E2F7` | **5 each** | Solutions hero gradient trio. Lavender-blush tones. |
| `#ff6db4` / `#c6da4c` | **3 each** | Edition accent colours (pink / lime) — in EditionCards. |
| `#173465` | **3** | Deep navy — in ProofSection bento. |
| `#6B7280` | **2** | Gray-500 (Tailwind `gray-500`). |
| `#122E58` | **2** | Dark navy variant. |
| `#FAFAFA` / `#F7F8FA` / `#F1F9FF` | **1 each** | Near-white backgrounds. |
| `#8acaea` / `#5aa0ff` / `#4a1670` / `#7b3fa8` | **1 each** | Roster/Genogram gradient components. |
| `#4B5563` / `#3b6fe0` / `#1f2a78` / `#1a4d68` / `#1a0224` | **1 each** | Gradient fills and visual accents. |
| `#250438` / `#203E71` / `#146FEE` / `#0F172A` / `#0A1629` / `#0065CC` | **1 each** | One-off product / section BGs. |

### 3b. Inline `style={{}}` colour props — 33 instances

#### Per-file

| File | Count |
|------|-------|
| `app/(marketing)/solutions/[slug]/page.tsx` | 12 |
| `components/ui/FlowDiagram.tsx` | 5 |
| `components/sections/SolutionUseCases.tsx` | 4 |
| `components/ui/SognosWorkflow.tsx` | 3 |
| `components/sections/sognoscare/Hero.tsx` | 2 |
| `components/sections/sognosroster/Hero.tsx` | 2 |
| `components/sections/sognosgenogram/Hero.tsx` | 2 |
| `components/ui/ParticleCanvas.tsx` | 1 |
| `components/sections/sognosroster/Advantages.tsx` | 1 |
| `components/sections/sognoscare/Advantages.tsx` | 1 |

#### Distinct inline hex values (non-diagram)

| Hex | Where | Note |
|-----|-------|------|
| `#03112f` (×3) | SognosCare Hero, Advantages | Product hero BG |
| `#1A1A1A` (×4) | solutions page | Near-black headings on white |
| `#6B7280` (×2) | solutions page | Muted gray text |
| `#4B5563` (×2) | solutions page | Gray body text |
| `#B7A9D9` (×2) | solutions page | Lavender on dark band |
| `#FFFFFF` (×4) | solutions page | White on dark band |
| `#1F1147` (×1) | solutions page | Dark purple section BG |
| `#59bbf7` (×1) | Roster Hero | Hover accent |
| `#0b5dab` (×1) | Roster Hero | Hero BG |
| `#250438` (×1) | Genogram Hero | Hero BG |

#### Inline rgba values

| Value | Count | Where |
|-------|-------|-------|
| `rgba(255,255,255,0.6)` | 4 | Hero eyebrow text (×3 products + solutions) |
| `rgba(255,255,255,0.7)` | 3 | Hero subtext (×3 products) |
| `rgba(255,255,255,0.72)` | 2 | Dark-band body text (solutions + SolutionUseCases) |
| `rgba(255,255,255,0.85)` / `rgba(0,0,0,0.12)` | 1 each | Misc |
| Various glow rgba | 6 | FlowDiagram / ParticleCanvas — intentional canvas colours |

**Diagram-component hex** (`FlowDiagram.tsx`, `SognosWorkflow.tsx`) contains many one-off palette values for data-vis colouring (node colours, edge colours). These are intentional and should remain inline — flag for review only:
`#ffaa40`, `#9c40ff`, `#f97316`, `#ec4899`, `#8b5cf6`, `#3b82f6`, `#22c55e`,
`#dcdfe6`, `#5D64FE`, `#F17463`, `#6264a7`, `#1e96fc`, `#00b7c3`, `#0078d4`

---

## Category 4 — shadcn Alias Usage

**~60 instances across 20 files.** Dominated by `text-muted`.

### By alias

| Alias | Count | Files |
|-------|-------|-------|
| `text-muted` | **~37** | OpenRoles (7), products (4), contact (4), KnowledgeHubArchive (3), CustomerStories (3), industries (3), ContactForm (3), various (1-2 each) |
| `bg-muted` / `ring-/border-/bg-destructive` | **~12** | `button.tsx` only |
| `bg-primary` / `text-primary-foreground` | **3** | `button.tsx` |
| `bg-secondary` / `text-secondary-foreground` | **5** | `button.tsx`, `shimmer-text.tsx` |
| `bg-input` / `border-input` | **3** | `button.tsx` |

### ⚠️ Likely bug — `text-muted`

In this project's `@theme` block: `--color-muted: var(--sognos-neutral-100)`. This resolves `text-muted` → `color: var(--color-muted)` → a **near-white background neutral** (not text-appropriate). Components using `text-muted` for label/description text almost certainly intend `text-muted-foreground`, which maps to `--sognos-text-muted` (a legible neutral-500 grey). This affects ~37 instances across 20+ files.

---

## Category 5 — Canonical-page Colour Coverage

### SognosCare (`components/sections/sognoscare/*`)

**Semantic tokens:**
- `prussian-blue-800` (45×) — inline ramp, should be token
- `text-sognos-text-heading` (4), `text-sognos-text-body` (4), `border-sognos-border-subtle` (2), `text-sognos-text-muted` (1)

**Tailwind arbitrary hex:**
- `[#1D96FC]` (14) — **Care accent** (must become `color-care-accent` token)
- `[#10B981]` (7) — success green
- `[#03112f]` (1), `[#052048]` (1) — BG + text
- `[#5aa0ff]`, `[#3b6fe0]`, `[#1f2a78]`, `[#0F172A]` — hero gradient fills (visual-only)

**Inline style:**
- `#03112f` (3) — hero BG constant → **product BG token needed**
- `rgba(255,255,255,0.6)`, `rgba(255,255,255,0.7)` — white text overlays → can token as `text-white/60`, `text-white/70`

**Standard utilities:** heavy `text-white`, `bg-white`, `border-gray-100`, `text-gray-400/500`, `bg-gray-200/70`

---

### SognosRoster (`components/sections/sognosroster/*`)

**Semantic tokens:**
- `prussian-blue-800` (15×)
- `text-sognos-text-body` (3), `text-sognos-text-heading` (1)

**Tailwind arbitrary hex:**
- `[#052048]` (15) — raw hex of prussian-blue-800, should be the ramp utility or token
- `[#3990c5]` (8) — **Roster accent** → must become `color-roster-accent` token
- `[#1D96FC]` (3), `[#8acaea]` (1), `[#1a4d68]` (1), `[#0A1629]` (1)

**Inline style:**
- `#0b5dab` — Roster hero BG → **product BG token needed**
- `#59bbf7` — hover bg → Roster hover accent

**Standard utilities:** `text-white` (17), `bg-white` (12), `border-gray-100` (8), `text-gray-400` (11)

---

### SognosGenogram (`components/sections/sognosgenogram/*`)

**Semantic tokens:**
- `prussian-blue-800` (7), `prussian-blue-950` (1)
- **No sognos-* tokens used at all** — most isolated product from the token layer

**Tailwind arbitrary hex:**
- `[#92278d]` (23) — **Genogram purple accent** → must become `color-genogram-accent` token
- `[#7b3fa8]` (1), `[#4a1670]` (1), `[#250438]` (1), `[#1a0224]` (1) — purple gradient stops
- `[#1D96FC]` (1)

**Inline style:**
- `#250438` — Genogram hero BG → **product BG token needed**

**Standard utilities:** `bg-white` (8), `text-white` (6), `border-gray-100` (6), `text-gray-400/500` (8)

---

### Solutions pages (`solutions/[slug]/page.tsx` + `SolutionUseCases.tsx`)

**Tailwind arbitrary hex:**
- `[#1A1A1A]` (5) — dark heading text on white sections → no token
- `[#6B7280]` (2) — muted gray text
- `[#F7F8FA]` (1), `[#E9E2F7]`/`[#EEE8F4]`/`[#F2EAEF]` (1 each) — panel BG + hero gradient

**Inline style hex:**
- `#1A1A1A` (4), `#6B7280` (2), `#4B5563` (2) — text colours on white sections
- `#FFFFFF` (4), `#B7A9D9` (2), `rgba(255,255,255,0.72)` (2) — white/lavender on dark band
- `#1F1147` (1) — dark purple section BG (`SECTION_BG` const)

**Semantic:** `text-sognos-text-muted` (2), `text-brand` (2), `prussian-blue-800` (3)

**New tokens needed from this page:** `--color-solutions-section-bg: #1F1147`, `--color-text-on-dark-muted: rgba(255,255,255,0.72)`, heading-on-white as a token (`#1A1A1A`), eyebrow-on-white (`#6B7280`).

---

## Palette Checklist — New Brand Must Cover

The following are the actual colours in live use on canonical pages. The new palette definition must resolve or replace each:

### Product accent colours (no tokens yet)
| Colour | Hex | Usage |
|--------|-----|-------|
| SognosCare accent | `#1D96FC` | 91 Tailwind + inline uses |
| SognosRoster accent | `#3990c5` | 8 uses |
| SognosGenogram accent | `#92278d` | 25 uses |

### Product hero backgrounds (inline `HERO_BG` consts)
| Product | Hex |
|---------|-----|
| SognosCare | `#03112f` |
| SognosRoster | `#0b5dab` |
| SognosGenogram | `#250438` |

### Text-on-white (solutions pages, not using token layer)
- Heading: `#1A1A1A`
- Body: `#4B5563`
- Muted: `#6B7280`

### Section BG colours
- Solutions dark band: `#1F1147`
- Platform panel: `#F7F8FA`
- Solutions hero gradient: `#E9E2F7` → `#EEE8F4` → `#F2EAEF`

### White-text overlays (hero sections, all products)
- Eyebrow: `rgba(255,255,255,0.6)`
- Subtext: `rgba(255,255,255,0.7)`
- Body on dark band: `rgba(255,255,255,0.72)`

### Success / status
- Success green: `#10B981` (used directly, not via token)

---

## Closing Read — Where the Effort Concentrates

1. **`prussian-blue-800` is the single biggest rollout target** — 311 raw ramp usages across 40+ files. Almost all should be `text-sognos-text-body` (prussian-blue-800 = `#052048`). `ProductCustomerStories.tsx` alone has 40, making it the #1 priority file. The fact that `#052048` appears 41 times as a hardcoded hex (separate from the ramp utility) means there's a total of ~350 redundant expressions of the same value.

2. **Three product accent colours have no token at all** — `#1D96FC` (SognosCare), `#3990c5` (Roster), `#92278d` (Genogram). `#1D96FC` alone has **91** arbitrary hex instances — the highest frequency hardcoded colour in the codebase. Until these get tokens (`--color-care-accent`, `--color-roster-accent`, `--color-genogram-accent`), every per-product section is a rollout blocker.

3. **11 of 20 semantic tokens are completely dead** — the token layer as defined covers ~55% of what's actually needed, but the components only use ~30–40% of the defined layer. The dead tokens (`text-soft`, `text-link`, `border-strong`, `card-bg`, etc.) were defined but never adopted; the live colours bypass them.

4. **`text-muted` shadcn alias is likely wrong across 37 instances** — maps to near-white background neutral, not legible muted text. Likely needs to be `text-muted-foreground` everywhere it's used as a text descriptor.

5. **Genogram is the most isolated** — zero `sognos-*` token usage. All its colour comes from `prussian-blue-800` ramp, `[#92278d]` hardcoded hex, and `text-white`. It's the cleanest rollout target once a `--color-genogram-accent` token exists.

6. **Diagram components (`FlowDiagram`, `SognosWorkflow`, `OutcomesFlow`)** carry many one-off data-vis hex and neutral-ramp values that are intentional — these should be audited separately and likely left as-is or wrapped in a component-scoped CSS custom property.
