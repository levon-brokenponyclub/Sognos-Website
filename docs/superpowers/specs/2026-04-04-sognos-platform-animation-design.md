# Sognos Platform Animation — Design Spec
**Date:** 2026-04-04
**Status:** Approved
**Component:** `components/sections/HowSognosWorksPreview.tsx` → `SystemFlowDiagram`

---

## Overview

Replace the stub `SystemFlowDiagram` component with a fully animated flow diagram modelled on the Stripe developer-systems animation. The diagram communicates how service demand flows through the Sognos Platform to produce outcomes and compliance outputs.

**Layout:** Top-to-bottom (not left/right). Three zones: Demand → Platform → Outcomes.

---

## Visual Structure

```
┌─────────────────────────────────────────┐
│            [dot grid background]        │
│                                         │
│  Zone label: SERVICE DEMAND             │
│  ┌──────────────┐  ┌──────────────┐     │
│  │  Referrals   │  │  Field Jobs  │     │  ← 2 cycling cards
│  │  ──────────  │  │  ──────────  │     │
│  │  Care Plans  │  │  Schedules   │     │
│  └──────────────┘  └──────────────┘     │
│         ╲                ╱              │
│          SVG dashed paths + pulse dots  │
│         ╱                ╲              │
│  ┌──────────────────────────────────┐   │
│  │  ● Sognos Platform               │   │  ← platform block
│  └──────────────────────────────────┘   │
│    ╲       ╲       ╱       ╱            │
│     SVG dashed paths × 4 + pulse dots  │
│    ╱       ╱       ╲       ╲            │
│  Zone label: OUTCOMES & COMPLIANCE      │
│  [Audit]  [Compliance]  [Outcome]  [Alerts] │  ← staggered reveal
└─────────────────────────────────────────┘
```

---

## Zones

### Zone 1 — Service Demand (top)

Two cards displayed side by side. Each card cycles between two service labels via a cross-fade animation. The two cards are offset by ~2.5s so they never cycle in sync.

| Card | Service A | Service B |
|------|-----------|-----------|
| Left | Referrals | Care Plans |
| Right | Field Jobs | Schedules |

- Card entrance: fade + slide down, staggered 150ms apart
- Cycle animation: cross-fade over ~5s loop per card
- Shimmer sweep: horizontal gradient sweep on a loop
- Card style: `#111d54` background, `1px rgba(93,100,254,0.3)` border, `border-radius: 10px`

### Zone 2 — Sognos Platform (centre)

Single block. Brand name only — no sub-layer badges.

- Entrance: scale-in from 0.97 → 1.0, fade, 250ms delay
- Contains a small pulsing dot (box-shadow pulse, 2s loop) beside the "Sognos Platform" label
- Style: `#0e1a50` background, `1px rgba(93,100,254,0.3)` border, `border-radius: 12px`

### Zone 3 — Outcomes & Compliance (bottom)

Four tiles revealed one at a time with 400ms stagger between each.

| # | Label |
|---|-------|
| 1 | Audit Trails |
| 2 | Compliance Reports |
| 3 | Outcome Records |
| 4 | Real-time Alerts |

- Entrance animation: slide up + fade + scale from 0.95, delay starts at 1.0s
- Shimmer sweep per tile, each offset by 0.7s
- Style: same as demand cards but lighter border at `rgba(93,100,254,0.2)`

---

## Connectors (SVG)

### Top connector (Demand → Platform)

Two curved paths from approximately the position of each demand card converging to the centre of the platform block.

- Base path: `#1a2460`, `stroke-dasharray: 4 4` (static, visible always)
- Animated overlay: `#5D64FE`, `stroke-dasharray: 4 4`, `stroke-dashoffset` animating at ~1.4s loop
- Pulse dots: `<circle>` with `<animateMotion>` along each path, 1.8s duration, offset by 0.9s between the two

### Bottom connector (Platform → Outcomes)

Four paths fanning out from the platform centre to each outcome tile position.

- Same base + animated overlay pattern
- Pulse dots on each path, staggered 0.45s apart
- Animated overlay paths staggered 0.35s apart

---

## Background

Dot grid: `radial-gradient(circle, rgba(93,100,254,0.15) 1px, transparent 1px)` at `20px 20px` spacing, positioned absolutely behind the diagram, `border-radius: 16px`.

---

## Colour Reference

| Token | Value | Usage |
|-------|-------|-------|
| Primary blue | `#5D64FE` | Path strokes, pulse dots, zone labels, borders |
| Deep navy | `#0a0f2e` | Section background |
| Card bg | `#111d54` | Demand + outcome tiles |
| Platform bg | `#0e1a50` | Platform block |
| Static path | `#1a2460` | Base connector lines |
| Text muted | `#9ba8ff` | Tile label text |
| Text white | `#ffffff` | Platform brand label |

---

## Implementation Notes

- **Component:** Replace `SystemFlowDiagram` in `HowSognosWorksPreview.tsx`
- **Server Component:** No `"use client"` needed. CSS `@keyframes` and SVG `<animateMotion>` are declarative and run natively in the browser without React state or effects.
- **CSS approach:** Add all `@keyframes` and component-specific class styles to `app/globals.css`. Use className strings in the TSX. No new files, no CSS modules, no Tailwind config changes.
- **SVG paths:** Hardcoded `viewBox` with `overflow: visible`. Path coordinates are relative to connector zone dimensions. No dynamic calculation.
- **Accessibility:** `aria-hidden="true"` on all SVGs. `role="img"` + `aria-label` on the wrapper div. Zone text (Service Demand, Outcomes & Compliance, tile labels) stays in real DOM elements.
- **No JS required** — all animation via CSS `@keyframes` and SVG `<animateMotion>`. No `useEffect`, no `requestAnimationFrame`.
- **Mobile (`< 640px`):** The 2 demand cards stack vertically (flex-col). Connector SVGs are replaced with a single centred vertical dashed line. Outcome tiles wrap to a 2-column grid. The platform block spans full width.
