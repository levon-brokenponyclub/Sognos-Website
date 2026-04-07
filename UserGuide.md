# Sognos React — User Guide

Quick reference for settings you can update without touching the core build.

---

## 1. Tab Section — HowSognosWorksPreview

**File:** `components/sections/HowSognosWorksPreview.tsx`

### Autoplay speed
```ts
const AUTOPLAY_MS = 4000; // milliseconds per tab (4000 = 4s)
```
Change this one number to adjust how long each tab stays before auto-advancing.

### Tab labels and descriptions
```ts
const TABS = [
  { id: "demand",    label: "Manage demand",       description: "..." },
  { id: "workforce", label: "Coordinate workforce", description: "..." },
  { id: "outcomes",  label: "Track outcomes",       description: "..." },
]
```
Edit `label` and `description` directly. The diagram for each tab is wired by index (0, 1, 2) — don't change the `id` values.

### Section heading and subtext
Find the `<h2>` and `<p>` inside the `text-center pb-10` div. Edit the text directly.

---

## 2. Workforce Diagram — Animation Timing

**File:** `components/ui/Workforce.tsx`

```ts
const MATCHING_DELAYS = [1080, 1240, 1400]; // ms — when each row enters "Matching" state
const MATCHED_DELAYS  = [1680, 2080, 2580]; // ms — when each row flips to "Matched"
```

- `MATCHING_DELAYS` — how long after the tab triggers before each row starts matching (staggered)
- `MATCHED_DELAYS` — when each row flips to green "Matched" badge
- The gap between matching and matched = `MATCHED_DELAYS[i] - MATCHING_DELAYS[i]` (currently 500ms)

### Match ring — when it appears and how fast it animates
The ring appears the moment a row enters `"matching"` phase — so `MATCHING_DELAYS` controls when each ring activates.

Inside the `MatchRing` function, two values control animation speed:

```ts
// 1. Count-up number speed — default duration in useCountUp (seconds)
function useCountUp(to, trigger, duration = 1.9)

// 2. Ring arc fill speed — duration on motion.circle
transition={{ duration: 1.7, ease: E }}
```

**Key rule:** `MATCHED_DELAYS[i]` must always equal `MATCHING_DELAYS[i] + (arc duration in ms)`.
Currently: `MATCHING_DELAYS + 1700ms = MATCHED_DELAYS`

If you change the arc duration, recalculate:
```
MATCHED_DELAYS[i] = MATCHING_DELAYS[i] + (arc duration × 1000)
```
Example: arc 1.7s, MATCHING_DELAYS[0] = 1600 → MATCHED_DELAYS[0] = 1600 + 1700 = 3300

### Worker and job data
```ts
const ITEMS = [
  {
    id: "round",
    worker: { name: "Emma Clarke", role: "Care Worker", avatar: "/images/avatar-emma.png", accent: "#1E40AF" },
    job:    { label: "Morning Round", detail: "Meadowbrook — 08:00" },
    matchPct: 97,
    y: 60,
  },
  // ... 2 more rows
]
```
Update `name`, `role`, `job.label`, `job.detail`, `matchPct` freely.
`avatar` must be a file in `/public/images/`. `y` controls vertical position (viewBox height is 360 — keep rows at ~60, 180, 300).

---

## 3. ProcessFlow Diagram — Animation Timing

**File:** `components/ui/ProcessFlow.tsx`

```ts
const ASSIGN_DELAYS = [1.1, 1.6, 2.1]; // seconds — when each row flips from Waiting → Assigned
```
Change the numbers to speed up or slow down each row's assignment animation.

### Request row labels
```ts
const ITEMS = [
  { id: "referral",  label: "Service Referral", Icon: IconReferral },
  { id: "careplan",  label: "Care Plan",         Icon: IconCarePlan },
  { id: "workorder", label: "Work Order",        Icon: IconWorkOrder },
]
```
Edit `label` to rename each row. Icons are inlined SVGs — ask the dev to swap them if needed.

---

## 4. Outcomes Dashboard — KPI Numbers

**File:** `components/ui/OutcomesFlow.tsx`

### Utilisation tile
```ts
function UtilisationTile({ trigger }) {
  const hrs     = useCountUp(8420, ...)  // main headline number (HRS)
  const trend   = useCountUp(43, ...)    // % trend badge
  const plans   = useCountUp(847, ...)   // Active Care Plans row
  const workers = useCountUp(124, ...)   // Workers Scheduled row
```
Change the first argument of each `useCountUp` call to update the stat.

### Compliance tile
- `"0"` — incidents this quarter (hardcoded, line ~172)
- `"98%"` — ring fill percentage (hardcoded, line ~101 and ~97 as `circ * 0.02`)
- `"12 consecutive months CQC clean"` — streak label (line ~182)

To update the ring fill: change `circ * 0.02` to `circ * (1 - X/100)` where X is the compliance percentage (e.g. `circ * 0.01` = 99%, `circ * 0.02` = 98%).

### Cost & Coverage tile
```ts
function CostTile({ trigger }) {
  const saving  = useCountUp(31, ...)   // cost reduction %
  const workers = useCountUp(124, ...)  // workers active
  const visits  = useCountUp(99, ...)   // visit completion %
```

---

## 5. Case Study Cards

**File:** `components/sections/CustomerStories.tsx`

Each entry in `caseStudies` array:
```ts
{
  company:    "Meridian Care Group",
  industry:   "Health & Social Care",
  logo:       "/images/logos/meridian-care.svg",   // drop file in /public/images/logos/
  stat1:      "↑ 43%",
  stat1Label: "Care worker utilisation",
  stat2:      "18",
  stat2Label: "Locations live",
  quote:      "Sognos gave us full visibility...",
  author:     "Sarah Mitchell",
  role:       "Director of Operations",
  href:       "/customers/meridian-care-group",
}
```

**Adding a logo:** Place the file in `/public/images/logos/` and update the `logo` path. SVG preferred. The logo renders at `h-6` (24px tall) with `grayscale opacity-60` — if a logo looks too faint, ask the dev to adjust per-logo.

**Adding a new card:** Copy an existing entry, update all fields, and add it to the array. The slider handles any number of cards automatically.

---

## 6. Hero Section

**File:** `components/sections/Hero.tsx`

### Default headline and subtext
```ts
headline = (
  <>
    Run your entire service operation
    <br />
    <span className="text-accent">on one intelligent platform.</span>
  </>
),
subtext = "Built for regulated industries who need to spend less time on admin and more time on outcomes.",
```
Edit text directly. The `<span className="text-accent">` wraps the accent-coloured portion — keep that wrapper if you want the blue highlight.

### CTA buttons
- Primary CTA — sourced from `lib/navigation.ts` → `navCTA.primary` → `{ name: "Book a Demo", href: "/contact" }`
- Secondary CTA — hardcoded in Hero: `{ name: "View platform", href: "#" }`

To update the primary CTA label or link, edit `lib/navigation.ts`.

---

## 7. Microsoft Platform Badge

**File:** `components/sections/HowSognosWorksPreview.tsx`

The dark pill badge shows three logos from `/public/logos/`:
```tsx
<img src="/logos/Dynamics365.svg"                      className="h-7 w-auto" />
<img src="/logos/Sognos-Solutions-Solutions-Partner.webp" className="h-8 w-auto" />
<img src="/logos/copilot-logo.png"                     className="h-9 w-auto" />
```
To swap a logo, replace the file in `/public/logos/` keeping the same filename, or update the `src` path. Adjust `h-7`/`h-8`/`h-9` per logo if sizes need rebalancing.

---

## 8. Navigation & CTAs

**File:** `lib/navigation.ts`

All nav items, mega-menu content, and the global CTA buttons ("Book a Demo", "Contact Sales") live here. Safe to edit labels and hrefs — don't change the TypeScript types.

---

## 9. Site-Wide Constants

**File:** `lib/constants.ts`

Contains `PRODUCTS`, `SOLUTIONS`, `INDUSTRIES` arrays used to populate the footer, nav dropdowns, and industry/solution section cards. Add or rename items here and they propagate automatically.

---

## 10. Design Tokens

**File:** `app/tokens.css`

Key values:
```css
--sognos-brand:        #122348;   /* dark navy — primary brand colour */
--sognos-accent:       #1e96fc;   /* blue — accent/highlight */
--sognos-brand-subtle: #006490;   /* mid blue — used in gradients */
```
Changing these updates every component that uses `text-brand`, `bg-brand`, `text-accent` etc. across the whole site.

---

## 11. Adding / Replacing Images

| Asset type | Location | Notes |
|---|---|---|
| Avatar images | `/public/images/` | Used in Workforce diagram. Name: `avatar-[name].png` |
| Client logos (case studies) | `/public/images/logos/` | SVG preferred, rendered at h-6 grayscale |
| Product logos | `/public/logos/` | SVG. `sognos-care-logo.svg`, `sognos-roster-logo.svg` |
| Microsoft logos | `/public/logos/` | `Dynamics365.svg`, `copilot-logo.png`, `Sognos-Solutions-Solutions-Partner.webp` |
| Hero background | Controlled via CSS class `bg-gradient-hero` in `app/tokens.css` | |
