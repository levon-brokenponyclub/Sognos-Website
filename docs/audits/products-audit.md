# Product pages audit — SognosCare, SognosRoster, SognosGenogram, DigPacks

> **Date:** 2026-10-26 · **Inputs:** the four live pages (`app/(marketing)/products/*`), `app/tokens.css`, DigPacks Brand Guidelines v1.0 (Mar 2025).
> **Mockups:** `docs/mockups/products/index.html` (product + direction switchers) and `care.html`, `roster.html`, `genogram.html`, `digpacks.html`. No `.tsx` changed.
> **Decisions (user, 2026-10-26):** 3 system directions across all four pages · DigPacks aligned to the guide · Sognos type kept · colour refined within each product hue.

## Current state

| Page | Sections (live) | Surfaces |
|---|---|---|
| SognosCare | Hero (motion stage) · Problem + Solution pillars · Features (6, motion visuals) · Editions (6) · Advantages (6) · Stories | care-dark · white · tint · care-dark · white |
| SognosRoster | Hero (video) · Trust strip · Problems (3) · Features (6, visuals) · Advantages (6) · Stories | roster gradient · white · roster-dark · white · blue-accent · white |
| SognosGenogram | Hero · Trust strip · Problems (3) · Features (6, accordion) · Stories | genogram-dark · white · genogram-dark · white |
| DigPacks | Hero (partnership) · Outcomes (4 stats) · Solutions (6) · Why / Who / Localisation · Asset Booker | digpacks-dark · white · digpacks-dark · white · digpacks-base · tint |

## Findings

| # | Issue | Sev | Fix (in mockups) |
|---|---|---|---|
| 1 | The four pages share a template, but each one has its own surface rhythm, hero type and section order. They read as four sites rather than one family. | P1 | One system per direction (A/B/C), applied identically to all four pages. |
| 2 | Product colour is carried only by hero and section backgrounds, with no ladder. Accent text, tints, soft panels and glows are improvised per section (for example `bg-sognos-blue-accent` on Roster Advantages). | P1 | Per-product token ladder (below). |
| 3 | DigPacks tokens drift from the guide: base `#b6065a` vs guide `#B8166E`, dark `#2a0517` vs the guide's plum `#5A1E4A`. The guide's secondary blue `#005EB8` and grey `#4C4C4C` are unused. | P1 | Ladder rebuilt from the guide, with blue as the second accent. |
| 4 | Genogram has no Advantages section, and its feature bodies sit in an accordion (hidden by default). | P2 | Features always visible. A Genogram Advantages section needs copy (Q3). |
| 5 | The trust strip appears on Roster and Genogram only. | P2 | Removed from all three directions; the footer accreditations and the Stories section carry proof. Q4. |
| 6 | Genogram hero subtext duplicates SognosCare's ("Manage cases, track service delivery…"). | P2 | Kept verbatim (no copy drift); S1. |
| 7 | Stories repeat the same four quotes on every product page. | P2 | Same quotes, per-direction treatment; S2 (per-product stories). |

## Proposed tokens (additive)

Per product (`[data-product]`): `--p-deep`, `--p-dark`, `--p-base`, `--p-accent`, `--p-soft` (≈6% tint), `--p-tint` (≈12%), `--p-ink` (small-text accent on white, AA), `--p-glow`, `--p-grad`, `--p-second`.

| Product | deep | dark | base | accent | soft | ink | second |
|---|---|---|---|---|---|---|---|
| Care | #0b1430 | #0f1936 | #3b6fe0 | #8ea8f0 | #eef3fd | #2a55c4 | #1d96fc |
| Roster | #03112f | #104b90 | #1d96fc | #59bbf7 | #eef8fe | #0b6fc4 | #59bbf7 |
| Genogram | #1a0224 | #3a0f45 | #91278c | #d9a6d6 | #f8eef8 | #7a1f75 | #c084c9 |
| DigPacks | #2a0a22 | #5a1e4a | **#b8166e** | #e8a6c8 | #fbeef5 | #9a1259 | **#005eb8** |

The DigPacks gradient follows the guide cover: `#B8166E → #8A1A5E → #5A1E4A`. At port time these become `--sognos-{product}-*` tokens in `app/tokens.css`, added alongside the existing ones (no existing value is changed until the swap is approved).

## Directions

- **A · Product Light:**
  - White and tint surfaces, with the product colour as accent only.
  - Split hero (photo + floating card); numbered problem list beside a sticky header.
  - 3-col feature cards, checklist advantages, quote cards.
  - Calm, editorial, closest to the current Solutions/Industries ports.
- **B · Immersive Dark:**
  - Product-deep surfaces throughout.
  - Glow and grid hero with centred copy and a wide image stage.
  - Glass problem cards, bento features, product-gradient advantages tiles, a spotlight quote.
  - Most "product launch" feel.
- **C · Signature:**
  - Product-soft hero with a gradient orb, 8/4 split with a feature index.
  - Sticky split problem, alternating feature rows, editions slider, big-numeral advantages index.
  - Most distinctive, and the longest pages.

## QUESTIONS

- **Q1** — Direction: **A** / B / C. Mixing is fine, e.g. B hero + A body.
- **Q2** — Feature panels: motion graphics for all four products are now in the mockups. Genogram and DigPacks are new; DigPacks can also show its real screens. Port graphics, screens (DigPacks), or both?
- **Q3** — Genogram Advantages: write 6 advantages (copy needed) or leave the section out?
- **Q4** — Trust strip: drop it from the product pages (as mocked) or restore it on all four?

## SUGGESTIONS

- **S1** — Give SognosGenogram its own hero subtext (it currently reuses SognosCare's).
- **S2** — Filter Customer Stories per product (Care stories on Care, and so on).
- **S3** — Replace the generic DigPacks white logo with the guide's circle-D mark on dark heroes (the circle mark reads better at small sizes).
