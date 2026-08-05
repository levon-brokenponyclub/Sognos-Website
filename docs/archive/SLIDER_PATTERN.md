# Sognos Shared Slider / Carousel Pattern

> **Purpose:** One shared, reusable slider pattern so every card slider in the codebase defaults to the same timing and behaviour unless a prompt explicitly overrides it. This prevents the prompt-by-prompt drift we kept correcting.
>
> **How to reference:** A prompt building a new slider should say _"use the shared slider pattern (`docs/SLIDER_PATTERN.md`), Shape 3"_ (or Shape 1) instead of re-specifying autoplay/transition/peek/dot values. Deviations are allowed but must be **called out explicitly as intentional overrides**, never left as silent drift.

Canonical implementations:

| Shape | Canonical example | Also used by |
|-------|-------------------|--------------|
| **Shape 1 — Nav rail** | `TeamSection` (desktop) | — |
| **Shape 3 — Center-focus peek carousel** | `ProductCustomerStories` | — |
| **Shape 2 — Trailing-peek carousel** _(deprecated)_ | — | `TeamSection` (mobile, `< lg`) — last user |

> ✅ **Conformance (2026-07-06):** `TeamSection` matches Shape 1 (per-item eased rail, reset-on-click, no hover-pause, `lg` conditional-render swap). `ProductCustomerStories` was migrated Shape 2 → **Shape 3** (center-focus, both-side peek). **Shape 2 is deprecated** — only `TeamSection` mobile still uses it and can be migrated to Shape 3 separately.

---

## Shared values (apply to ALL shapes)

| Value | Setting | Notes |
|-------|---------|-------|
| **Autoplay duration** | **10s** per item | `AUTOPLAY_MS = 10000` |
| **Pause on hover** | **No** | Autoplay never pauses on hover. Confirmed against the Diffblue reference this pattern was reverse-engineered from. |
| **Reset on manual interaction** | **Yes** | Clicking a nav item/dot or manually advancing resets the 10s timer to 0 for the newly-active item. **Deliberate Sognos deviation** from the Diffblue reference (which never resets) — chosen for better UX. In Embla terms: `Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true })` (`stopOnInteraction` resets/stops the timer on interaction). |
| **Transition duration** | **300ms** | |
| **Transition easing** | `ease` (CSS default) for crossfades; standard Embla/swipe physics for slide gestures | |
| **Loop** | **Yes** | Wraps back to the first item after the last. |

Token pair for gutters where a slider uses gap-based spacing: **`gap-3 lg:gap-4`**.

---

## Shape 1 — "Nav rail" slider

Desktop nav + content pane. Canonical: `TeamSection` (once corrected).

**Layout**
- **Sticky vertical nav list** (names / labels) on the left; a **content pane** on the right that **crossfades** between items.
- Content pane transition: `effect: fade` / `crossFade: true` equivalent — **300ms**, `ease`. (In framer-motion: `AnimatePresence mode="wait"` with `opacity 0→1`, `transition={{ duration: 0.3, ease: [/* default ease */] }}`.)

**Progress indicator — per-item eased rail (NOT cumulative)**
- It is a **per-item** eased countdown, **not** a bar that fills cumulatively across the whole list.
- Every time a new item becomes active, the rail **resets to ~`-96%`/`-100%`** and then **eases (non-linear, decelerating)** toward **`0%`** over the 10s duration — i.e. it "fills" the active row's rail once per item, then resets on the next.
- **Implementation:** a full-height **track** (`bg-sognos-line`, `2px` wide) with a same-height **overlay bar** (`bg-sognos-blue-accent`) inside an **`overflow-hidden`** wrapper, animated via **`translateY(-X%)`** (or an equivalent transform-based reveal). The `overflow-hidden` wrapper + `translateY` on a same-height bar is what creates the "filling" illusion for the active row **without needing per-row DOM elements** — one track + one bar, repositioned/reset per active item.
- Easing is **decelerating** (e.g. ease-out), not linear — the fill slows as it approaches `0%`.

**Breakpoint**
- Switches to **Shape 2 (peek carousel)** below **`lg` (1024px)**.
- This is a **hard layout swap — conditional render, not just CSS**: the nav is **fully removed from the DOM** on mobile (e.g. `hidden lg:...` on the desktop block AND the mobile slider rendered separately), not merely visually hidden.

---

## Shape 3 — "Center-focus peek carousel"

Full-bleed horizontal slider where the **active card sits centred** and both the previous card (left) and next card (right) **peek**. Canonical: `ProductCustomerStories` (migrated from Shape 2, 2026-07-06). Modelled on shadcn's `<Carousel><CarouselItem className="lg:basis-1/2">` layout math — but built on **raw Embla** (the site's convention in this file + `TeamSection`), not shadcn's `Carousel`/`Button`/CVA wrappers.

**Layout / behaviour**
- **Effect:** `slide` — real horizontal swipe/drag, touch enabled.
- **Slide sizing:** desktop (`lg:`+) each slide `flex-[0_0_50%]` (= `basis-1/2`); mobile (`< lg`) `flex-[0_0_100%]` (basis-full, no peek by default).
- **`align: "center"`** produces the both-side peek: the centred half-width card leaves ~25% on each side, showing ~half of each neighbour. First/last snaps trimmed by `containScroll: "trimSnaps"` (first left-aligns, last right-aligns).
- **Between-slide gutter:** Embla padding convention — negative margin on the flex container + `pl-*` on each item (`-ml-3 lg:-ml-4` + `pl-3 lg:pl-4`, the `gap-3 lg:gap-4` token pair). **No** `paddingLeft: max(...)` gutter-inset, **no** trailing spacer, **no** per-slide `mr-*` (those were Shape 2's trailing-flush trick — not needed here).

**Embla config**
```ts
const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: false, align: "center", containScroll: "trimSnaps" },
  [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true })],
);
```
> `loop: false` is the same intentional override as Shape 2 (kept for this component). Autoplay 10s, reset-on-interaction — shared values.

**Progress indicator — dots** (identical to Shape 2's): active `w-4 h-2 bg-sognos-navy-dark`, inactive `w-2 h-2 bg-sognos-navy-dark/25 hover:bg-sognos-navy-dark/50`, clickable (`scrollTo(i)`).

**Arrow chrome** — same as `ProductCustomerStories`': `size-12 rounded-full` buttons, `border-sognos-line`, sliding navy-fill-up-on-hover with white chevron, `disabled` at edges. Dots centred, arrows right on `lg:`.

---

## Shape 2 — "Trailing-peek carousel" _(deprecated — use Shape 3)_

> ⚠️ **Deprecated (2026-07-06).** Superseded by Shape 3 (center-focus). Do not use for new builds. Only `TeamSection` mobile still uses it (`basis-[70%] max-w-[380px]`); it can be migrated to Shape 3 in a follow-up. Kept here for reference.

Full-bleed horizontal slider with the next card peeking at the trailing edge only.

**Layout / behaviour**
- **Effect:** `slide` (not fade) — real horizontal swipe/drag. Touch/swipe **enabled**.
- **`slidesPerView`: ~1.5** — the next card visibly **peeks** at the trailing edge.
- **Peek amount:** ~**28–44%** of one card's width visible at the edge (≈ **80–90px** at common mobile widths). **Scale proportionally — do not hardcode px** across all screen sizes. (`ProductCustomerStories` sizes slides in `vw`/`%` with a gutter-inset padding + trailing spacer so the last card ends flush; `TeamSection` mobile uses `basis-[80%] sm:basis-[55%] max-w-[360px]`.)
- **`spaceBetween` / gutter:** **24px** between slides — or the codebase's **`gap-3 lg:gap-4`** token pair where a slider uses gap-based spacing instead of Embla's `spaceBetween`.

**Progress indicator — dots (NOT a rail)**
- One dot per item. Match `ProductCustomerStories`' existing dot styling as the canonical example:
  - **Active:** elongated pill — `w-4 h-2 bg-sognos-navy-dark`.
  - **Inactive:** `w-2 h-2 bg-sognos-navy-dark/25 hover:bg-sognos-navy-dark/50`.
  - (Where a section's palette calls for it, an active `bg-sognos-blue-accent` fill is an acceptable alternative tone — but default to the navy-dark canonical above.)
- Dots are clickable and jump to that slide (`emblaApi.scrollTo(i)`), which **resets** the autoplay timer per the shared value above.

**Reference Embla config** (`ProductCustomerStories`)
```ts
const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: false, align: "center", containScroll: "trimSnaps" },
  [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true })],
);
```
> Note: the shared value says **Loop: yes**; `ProductCustomerStories` currently uses `loop: false` with a gutter-inset + trailing-spacer technique so the first/last cards sit flush. New Shape 2 sliders should default to `loop: true` unless the flush-gutter technique is specifically wanted; call out `loop: false` as an intentional override if used.

---

## When to apply

- Any **new** slider/carousel component defaults to these values — **Shape 3** (center-focus peek carousel) or **Shape 1** (nav-rail). **Shape 2 (trailing-peek) is deprecated — not for new builds.**
- A prompt should reference this doc rather than re-specifying values.
- **Deviations are allowed but must be explicit** ("intentional override: X because Y"), not silent.
