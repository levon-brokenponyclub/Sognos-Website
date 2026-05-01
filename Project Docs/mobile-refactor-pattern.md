# Mobile Refactor Pattern — Phase 6

Reference for porting any homepage/marketing section to mobile. Apply these conventions consistently so the next section refactor is mechanical.

Breakpoint convention: `lg` (1024px) is the desktop boundary used throughout. Below `lg` is "mobile". `md` is rarely used as a layout switch.

---

## 0. Design system non-negotiables

These apply to every section on every page — not just mobile refactors.

| Rule | Value |
|------|-------|
| Border radius | `rounded-lg` only. Never `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[Xrem]` |
| Gray section bg | `bg-gray-200/70` — never `bg-[#FAFAFA]`, `bg-slate-50`, `bg-gray-100` |
| Shadows | **Never.** No `shadow-sm`, `shadow-md`, `shadow-xl`, `shadow-2xl` |
| Grid/flex gap | `gap-3 lg:gap-4` |
| Stat blocks | Match CTASection.tsx exactly (see §0a below) |

### §0a Stat block reference (CTASection.tsx)

```tsx
<div className="grid grid-cols-2 gap-3 lg:gap-4">
  {STATS.map((stat) => (
    <div className={`relative flex flex-col justify-between h-full p-6 lg:p-8 rounded-lg overflow-hidden ${stat.bgClass}`}>
      <p className={`font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none ${stat.textClass}`}>
        {stat.value}{stat.suffix}
      </p>
      <p className={`text-xs font-semibold uppercase tracking-widest ${stat.labelClass}`}>
        {stat.label}
      </p>
    </div>
  ))}
</div>
```

Color variants:
- Dark: `bg-prussian-blue-800` / `text-white` / `text-[#8E9EBB]`
- Brand: `bg-[#1D96FC]` / `text-white` / `text-blue-100`
- Light: `bg-white` / `text-[#0A1629]` / `text-neutral-500`

---

## 1. Section padding

```
py-24            →  py-16 lg:py-24
```

Apply on the inner `max-w-7xl` wrapper. If a section has split header/track padding (e.g. `pt-24 pb-8` on header + `pb-24` on cards), tighten both halves.

---

## 2. Section heading block

Standardised across IndustrySection, ProductSection, SolutionsSection, CustomerStories, NewsInsightSection.

Structure:
```tsx
<div className="flex flex-col items-center lg:items-start gap-4 mb-8 lg:mb-5">
  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm {badgeColors} font-medium">
    <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
    {Section label}
  </div>
  <h2 className="text-3xl md:text-4xl {headingColor} text-center lg:text-left font-heading font-medium tracking-tight">
    {Heading}
  </h2>
</div>
```

Badge color variants:
- Light bg → `border-prussian-blue-800/30 text-prussian-blue-800`
- Dark bg  → `border-white/30 text-white`

Heading color variants:
- Light bg → `text-prussian-blue-800`
- Dark bg  → `text-white`

---

## 3. Two-column section → mobile stack

Pattern:
```
<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch lg:items-start">
  <div className="w-full lg:w-[Xpct] lg:shrink-0 ..."> ... </div>
  <div className="flex-1 min-w-0 ..."> ... </div>
</div>
```

`min-w-0` on the flex-1 child is required when its content is a horizontal slider — otherwise the track grows past viewport.

---

## 4. Cards with image + content panel

Desktop: 40/60 split row. Mobile: image on top, content below.

```
<article className="flex flex-col lg:flex-row gap-2 lg:gap-4 h-auto lg:h-[500px]">
  <div className="w-full lg:w-[40%] lg:shrink-0 h-[260px] lg:h-auto"> ... </div>
  <div className="flex-1 p-5 lg:p-7"> ... </div>
</article>
```

Use a fixed mobile height for media (`h-[185px]` to `h-[300px]` depending on card scale) instead of aspect ratios — gives predictable rhythm in stacked lists.

---

## 5. Heavy display text

Drop down for mobile. Examples in use:

```
text-[26px]                 →  text-lg lg:text-[26px]
text-2xl  on byline         →  text-2xl lg:text-3xl  (already existed)
text-2xl card title         →  text-xl lg:text-2xl
fixed clamp height          →  h-auto lg:h-[4.5rem]
```

If `line-clamp-N` is set, drop the fixed-height utility on mobile (`h-auto`) so titles wrap naturally without mid-line cropping.

---

## 6. Sliders

### Pattern
- 1 card per view on mobile, no peek (set `cardWidth = containerWidth` in measure step)
- 2 cards per view on desktop
- Horizontal arrows hidden on mobile (`hidden lg:flex`)
- Mobile arrow row added below the slider, right-aligned, dashed border style

Mobile arrow row template:
```tsx
<div className="flex lg:hidden items-center justify-end gap-3 mt-6">
  <button className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed {borderColor} {textColor} ...">
    <ArrowLeft size={16} />
  </button>
  <button className="..."><ArrowRight size={16} /></button>
</div>
```

If a primary CTA also belongs near the arrows, change to `justify-between` and put the CTA on the left.

### Card width measure

```ts
const isMobile = window.innerWidth < 1024;
const cw = isMobile
  ? containerWidth
  : (containerWidth - GAP) / 2;
```

---

## 7. Tab strips (e.g. CustomerStories logos)

Mobile: 2 tabs visible, horizontal swipe.
```tsx
<div ref={tabsContainerRef}
     className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory gap-4 lg:gap-10 -mx-6 px-6 lg:mx-0 lg:px-0">
  {items.map((s, i) => (
    <button
      ref={(el) => { tabRefs.current[i] = el; }}
      className="shrink-0 basis-[calc(50%-0.5rem)] snap-start lg:shrink lg:basis-auto ...">
      ...
    </button>
  ))}
</div>
```

The `-mx-6 px-6 lg:mx-0 lg:px-0` extends the scrollable area to the section edges so tabs scroll edge-to-edge on mobile while resetting on desktop.

---

## 8. Auto-scroll active item

**Never use `el.scrollIntoView()`** for syncing autoplay state — it scrolls the page, causing the section to anchor on initial mount.

Use the container ref directly:
```ts
const container = tabsContainerRef.current;
const el = tabRefs.current[index];
if (!container || !el) return;
container.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
```

This scrolls only the horizontal strip, never the page.

---

## 9. CTA button row

```
flex flex-wrap items-center gap-3
  → flex flex-wrap justify-center lg:justify-start items-center gap-3
```

For card-internal CTAs alignment:
- text + button block: `items-center text-center lg:items-start lg:text-left`
- button row only:     `flex justify-center lg:justify-end`

---

## 10. Hero (special case)

- `min-h-[100vh] lg:h-X` → `h-[100svh] lg:h-[100vh]` (svh avoids mobile browser bar height jumps; vh on desktop for full coverage)
- **Vertical centering on mobile**: wrap centre content in `flex-1 lg:flex-none flex items-center justify-center` inside a `flex flex-col lg:justify-between` container — content centres in remaining space, bottom bar stays anchored
- **Bottom bar layout**: mobile stacked/animated, desktop `justify-between` with logos left, trust bar right
- **Crossfade cycle between two elements** (e.g. trust bar ↔ logo strip):
  ```tsx
  // "use client" required
  const [showB, setShowB] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setShowB(v => !v), 3000);
    return () => clearInterval(id);
  }, []);

  // Container: relative fixed-height, both children absolute
  <div className="relative lg:hidden flex justify-center items-center h-16">
    <div className={`absolute transition-all duration-700 ease-in-out ${showB ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}>
      <ElementA />
    </div>
    <div className={`absolute transition-all duration-700 ease-in-out ${showB ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
      <ElementB />
    </div>
  </div>
  ```
  `pointer-events-none` on the hidden element prevents invisible click targets.

---

## 11. Navbar

- Outer padding: `px-6` → `px-4 lg:px-6` so navbar aligns with section content gutter
- Bar height: scroll-driven, `h-14 lg:h-17` default, `h-12 lg:h-13` when `scrolled`
- Logo: `h-8 lg:h-9` default, `h-7 lg:h-8` when scrolled, `transition-[height]`
- Hamburger icon: `w-7 h-7` (was `w-5 h-5`)
- Bottom border: omit when `colorMode === "dark" && scrolled` so dark hero stays seamless
- **Scroll-driven padding collapse**: extra top padding on mobile (e.g. `pt-4`) collapses to `py-2` on scroll. Add `padding` to the transition property list:
  ```tsx
  scrolled ? "py-2" : "pt-4 pb-2",
  "transition-[background-color,border-color,padding] duration-300",
  ```
- **colorMode-conditional horizontal padding**: use `px-2` when `bg-white` is active (`colorMode === "light"` or `scrolled`), `px-5` on dark hero:
  ```tsx
  `${scrolled || colorMode === "light" ? "px-2" : "px-5"} lg:px-6`
  ```

---

## 12. Scroll-stacked cards (e.g. IndustrySection mobile)

Cards that stack on top of each other as the user scrolls — later cards slide up and cover earlier ones.

**Critical**: `position: sticky` is broken by ANY `overflow` value other than `visible` on any ancestor. This includes `overflow-x: hidden`. Do not add overflow to the section or any ancestor that wraps sticky children.

```tsx
const HEADER_H = 112; // px from top of viewport where first card sticks
const PEEK = 18;      // px each card peeks above the one covering it

{items.map((item, i) => (
  <div
    key={item.slug}
    style={{ top: HEADER_H + i * PEEK, zIndex: (i + 1) * 10 }}
    className="sticky mb-3 last:mb-0 ..."
  >
    ...
  </div>
))}
```

- Earlier cards have lower `top` (stick higher, visible in the stack)
- Later cards have higher `z-index` (visually on top)
- `HEADER_H` = navbar height + desired gap from top of viewport

---

## 13. Footer

- Padding: `py-16` → `py-12 lg:py-16`
- Grid gap: `gap-8` → `gap-x-6 gap-y-10`
- Brand block: `col-span-2 md:col-span-3 lg:col-span-2` so it spans the full mobile row
- On gradient/dark bg: replace `border-gray-200` with `border-white/10` or `border-white/15`

---

## Apply checklist for any new section

1. Tighten outer padding `py-16 lg:py-24`
2. Replace heading block with the standard badge + `text-3xl md:text-4xl text-center lg:text-left font-heading font-medium tracking-tight` pattern
3. If two-column on desktop, switch to `flex flex-col lg:flex-row` and add `min-w-0` to the slider/wide child
4. Stack cards: image fixed-height top, content below, center text
5. Drop heavy display text sizes on mobile
6. Hide horizontal arrows; add a mobile arrow row below the slider
7. For tabs: convert grid to horizontal-scroll with `snap-x snap-mandatory` and `basis-[calc(50%-0.5rem)]`
8. Sync active item with `container.scrollTo({ left })`, never `scrollIntoView`
9. Center CTAs on mobile, left-align on desktop
10. **Never add `overflow: hidden` or `overflow-x: hidden` to any section that contains `position: sticky` children**

---

## Status

Homepage sections confirmed complete (pending user sign-off before applying to other pages):

| Section | Mobile done |
|---------|-------------|
| Hero | ✅ |
| Navbar | ✅ |
| LogoStrip | ✅ |
| HowSognosWorksPreview | ✅ |
| ProductSection | ✅ |
| SolutionsSection | ✅ |
| HowItWorks | ✅ |
| IndustrySection | ✅ |
| ProofSection | ✅ |
| CTASection | ✅ |
| Footer | ✅ |

**Pattern is locked to homepage.** Once user confirms homepage is complete, apply this document to product, solution, and industry pages.
