# Products mockup — "Products · sections & colours" panel audit

> **Date:** 2026-10-26 · **File:** `docs/mockups/products/index.html` · Measured in the browser at 1440.
> The panel has grown one request at a time. This audit proposes one consolidated layout. Nothing is rebuilt until approved.

## Current state

| Metric | Value |
|---|---|
| Controls on the main tab | **274 buttons** |
| Content height vs visible height | **4,260px vs 463px** (≈9 screens of scrolling) |
| Panel | Fixed bottom-right, 416px wide, open by default, covers page content |
| Tabs | 2: *Layout & variations*, *Colour editor* (the editor is a separate place from the section it edits) |

Main-tab groups:

| Group | Buttons |
|---|---|
| Product | 4 |
| Direction | 3 |
| 6 sections × (layouts + rail + 10 tones) | 15–20 each |
| Header start / scroll | 8 / 9 |
| Sub-nav style / position | 8 / 2 |
| 6 footer rows × (7 styles + 10 tones) | 17–18 each |
| Graphic panel background | 3 |
| Feature panel colours | 37 |
| DigPacks panels | 2 |

## Findings

| # | Issue | Impact |
|---|---|---|
| 1 | Every option is always expanded: 12 rows repeat the same 10-tone list (120 tone buttons). | Long scroll; hard to see what is set. |
| 2 | Current state is only visible as a pressed pill somewhere in a long row; there is no per-section summary. | You can't tell at a glance how a page is configured. |
| 3 | The colour editor is a separate tab with Product + Area dropdowns, away from the section it edits. | Two places to manage one section; context switching. |
| 4 | Tones are text pills, with no swatch. | Colour choices are made by name, not by look. |
| 5 | Rail is two buttons (on / off) instead of a switch. | Extra clicks, unclear state. |
| 6 | Product-only options (Care / Roster gallery heroes, DigPacks panels) sit among generic controls. | Noise for the other products. |
| 7 | Panel covers the bottom-right of the page and opens by default. | Hides content you are judging. |
| 8 | No link between page and panel: you can't click a section on the page to edit it. | Slow to target the right section. |
| 9 | No presets, undo, or "reset this section"; export covers colours only, not layout / tone choices. | Hard to compare or hand off a full configuration. |
| 10 | Feature panel colours (37) mix a product ladder with five gallery sets in one wall of pills. | Hard to scan. |

## Proposed layout — "Inspector" drawer

```
┌ Products · Inspector ───────────────── [⟲ Undo] [⋯] [×] ┐
│ Product  [Care][Roster][Genogram][DigPacks]              │
│ Preset   [Split ▾]  [Save as…] [Export all]              │
├─ Page ───────────────────────────────────────────────────┤
│ ▸ Header        Transparent navy → White on scroll       │
│ ▸ Sub-nav       White · below hero                       │
│ ▾ Hero          A · Split · Glow · Rail off      [◎]     │
│     Layout  [Split][Immersive][Editorial][Motion 1…]     │
│     Tone    ● ● ● ● ● ● ● ● ● ●  (swatch row + tooltip)   │
│     Rail    (switch)                                     │
│     Colours ▸ Background · Headings · Body · Cards …     │
│             (inline role rows; Solid / Linear / Radial)  │
│     [Reset section]  [Copy to all products]              │
│ ▸ Problem       B · Immersive · Auto                     │
│ ▸ Features      …  Panels: Product tints · Paraform      │
│ ▸ …                                                      │
├─ Footer ─────────────────────────────────────────────────┤
│ ▸ CTA band      A2 · Tint panel · Auto                   │
│ ▸ Menu          …                                        │
└──────────────────────────────────────────────────────────┘
```

1. **One accordion list mirroring the page:** Header, Sub-nav, each section, then each footer row. Collapsed rows show a one-line summary ("A · Split · Glow · Rail off"). Expanding one section collapses the others.
2. **Edit in place:** each expanded row holds layout, tone, rail and its colour roles (the editor moves inline). The separate editor tab goes away.
3. **Tones as swatches:** one row of colour dots with name tooltips, including gradient and glow previews. A "Custom…" swatch opens the Solid / Linear / Radial editor for the background.
4. **Switch for Rail**, segmented control for layouts.
5. **Context-aware options:** gallery heroes appear only on Care and Roster. Feature panel options (background mode + palette) live inside **Features**. DigPacks screen/graphic shows only on DigPacks.
6. **Palettes grouped:** a dropdown of palette sets (Product ladder / SognosCare / SognosRoster / Frontline / Home Solutions / Home Industries / Custom), then that set's A–F swatches.
7. **Page ↔ panel link:** hovering a row outlines its section on the page; clicking a section on the page (with Inspect mode on) opens its row.
8. **Docking:** a right-side drawer, full height, collapsible to a 48px tab, closed by default. Page content is not covered when it is collapsed.
9. **Presets + history:** Direction becomes a preset picker (Split / Immersive / Editorial / custom saved presets). Undo/redo covers the last 20 changes, plus "Reset section" and "Reset all".
10. **One export:** a JSON of layout, tone, rail, header, sub-nav, footer rows and colours, plus the CSS preview. This is the single hand-off I port into code.

**Expected result:** roughly 25–35 visible controls at a time instead of 274, and no scrolling to find a section.

## QUESTIONS

- **Q1** — Build the Inspector drawer as proposed? Or keep the current panel and only apply the quick wins (collapsible groups, swatch tones, rail switch, context-aware options)?
- **Q2** — Should click-to-inspect on the page be included? It adds an "Inspect" toggle.
- **Q3** — Presets: should saved presets be browser-only, or also importable from an exported JSON file, so you can share configurations?

## Status — 2026-10-26

Built as proposed (Q1 Inspector, Q2 click-to-inspect: yes, Q3 presets: browser + JSON import). See CHANGELOG for verification.
