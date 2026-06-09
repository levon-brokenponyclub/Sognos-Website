# Phase 7 — Sognos Frontend Redesign

## Goal
Complete frontend replacement on the Sognos React app. New look and feel derived from `Sites/style/pages/clean/Home.html` (Paraform layout, Dashfluence blue, deep navy). Backend, routing, data flow, and integrations preserved exactly as-is.

## Branch & Worktree
- Branch: `redesign` (off `main` at `0b04600`)
- Worktree: `~/Desktop/BPC/Sites/sognos-react-redesign/`
- Main worktree (`~/Desktop/BPC/Sites/sognos-react/`) continues active development on `main` — never touched by this branch
- Sync cadence: rebase onto `main` weekly to absorb backend changes

## Source of Truth
| Layer | Source |
|---|---|
| Layout / composition | `/Users/levongravett/Desktop/BPC/Sites/style/pages/clean/Home.html` |
| Tokens (colours, type scale, spacing) | `/Users/levongravett/Desktop/BPC/Sites/style/pages/clean/app.css` `:root` block |
| Typography assets | `/Users/levongravett/Desktop/BPC/Sites/style/pages/clean/fonts/` |
| Reference components | `/Users/levongravett/Desktop/BPC/Sites/style/pages/clean/components/*.html` |

## Palette
| Token | Value | Purpose |
|---|---|---|
| Brand primary | `#239bff` | CTAs, accents, links, focus |
| Deep navy (heading) | `#041a3a` | Headings, brand-dark text |
| Mid navy (text/surfaces) | `#052048` | Body text, dark sections |
| Page background | `#f5f8f6` | Warm grey-green base |
| Surface 2 | `#eff2f0` | Cards, elevated surfaces |
| Surface 3 | `#e3e5e4` | Borders, dividers |

## Typography
| Family | Source | Use |
|---|---|---|
| `bureauSans` | Self-hosted woff2 (400 + 500 weights) | Body, UI |
| `bureauSerif` | Self-hosted woff2 (400) | Headings |

Inter / Inter Tight removed. `next/font/google` calls dropped from `app/layout.tsx`.

## What stays unchanged
- `sanity/`, `sanity.config.ts`, `schema.json`, `lib/sanity/queries.ts`
- `lib/supabase/*`
- `middleware.ts`
- `next.config.ts`, `netlify.toml`
- Route filenames (URL paths preserved)
- Section component data interfaces (Sanity content keeps flowing)
- Auth, contact, form submission logic
- `@vercel/analytics`, `@vercel/speed-insights` wiring
- Editions colour identities (`--sognos-edition-*` — sector colours, not brand)

## Layered execution
| Layer | Scope | Status |
|---|---|---|
| **1** | Token system swap + font swap | 🔄 In progress |
| **2** | Primitive components — Button, Card, Container, Grid, Badge | Pending |
| **3** | Layout chrome — Navbar, Footer | Pending |
| **4** | Section components rebuild — map Paraform layout patterns onto existing Sognos section files | Pending |
| **5** | Page composition — re-sequence homepage and product pages to match Paraform's flow | Pending |
| **6** | Visual QA + rebase from `main` + merge PR | Pending |

## Token strategy (Layer 1)
**Decision: keep palette family NAMES alive, re-point VALUES.**

51 existing components reference `prussian-blue-*`, `cornflower-ocean-*`, etc. as Tailwind utility classes. Removing those names would break all 51 in a single diff. Instead:

- **`prussian-blue-*`** → re-pointed to a coherent navy scale anchored at `prussian-blue-800: #052048` (already matches)
- **`cornflower-ocean-*`** → re-pointed to the new `#239bff` brand scale
- **`true-cobalt-*`, `seagrass-*`, `grapefruit-pink-*`, `sandy-brown-*`, `bright-lavender-*`** → kept as-is (edition / accent identity colours, not brand)
- **`--sognos-brand`, `--sognos-text-*`, etc.** → re-pointed to new primitives
- **Layer 4** will rename component classes to semantic names (`text-brand-dark`, `bg-surface-elevated`, etc.) and finally drop the legacy palette family aliases

This produces immediate visual change with zero component edits in Layer 1.

## Known issues / decisions deferred
| Item | Resolution |
|---|---|
| `components/sections/tokens.css` (9.1 KB) is **not imported anywhere** — dead duplicate of `app/tokens.css` | Flag for deletion at end of Layer 1 |
| Old `claude.md` Hard Rules ("no shadows", "rounded-lg only", "Inter / Inter Tight", "`#1D96FC` brand") are superseded | Rewrite `claude.md` design system section at end of redesign, before merge |
| `PHASE6_SLATE_PALETTE.md` is historical | Leave untouched, label as superseded in PR |
| `phase6-slate-palette` branch | Already merged to `main` (empty divergence) — safe to delete after redesign ships |
| IBM Plex Mono (99e60927 woff2) | Not used in new design — skipped |
| Type scale (h1–h6, body sizes) not ported in Layer 1 | **Deferred to Layer 4** — sized per section as components are rebuilt, then consolidated into `@theme inline` tokens at end of Layer 4. Until then headings render at old Sognos sizes (h1: 46px, h2: 40px, h3: 32px, h4: 28px). |

## Out of scope
- Other 8 style/extract pages (About, Careers, Customers, Demo, Products, Components, SinglePage, SingleProduct) — Home is the canonical reference; remaining Sognos pages reuse the new section components
- `main` branch edits of any kind
- Sanity schema, Supabase tables, backend logic
- New routes or URL changes

## Rollback
- Single-file: `git checkout main -- <path>`
- Full revert: delete the `redesign` worktree + branch, `main` is untouched
