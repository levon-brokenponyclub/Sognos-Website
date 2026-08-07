# About Page — Design Audit

> **Status:** discussion / pre-build. Findings only — no files changed by this
> document. Every code block is illustrative. Hand off to the build skill after
> the priority list is approved.
>
> **Date:** 2026-08-06
> **Page:** `app/(marketing)/company/about/page.tsx`
> **Framing:** the page has already been through the compliance Pass
> (2026-08-02) and the Leadership Pass (2026-08-06). This is polish + honest
> bug-hunting + asking whether the page **says anything about Sognos** or just
> executes the design rules well.

---

## Three headline issues (fix before polish)

### 1. The Hero is a Careers headline, not an About headline. **Bug.**

`app/(marketing)/company/about/page.tsx:97–116`

```tsx
<AnimatedEyebrow ...>Careers</AnimatedEyebrow>
<h1 ...>Join Sognos to drive innovation together.</h1>
<p ...>We're not just a company — we're a community of passionate individuals...</p>
<Link href="#positions">Open Positions</Link>
```

Then the last section on the page (line 236–260) says the exact same thing again:

```tsx
<AnimatedEyebrow>Careers</AnimatedEyebrow>
<h2>Join Sognos to drive innovation together.</h2>
<p>We're a community of passionate individuals committed to driving innovation...</p>
<Link href="/company/careers">View open roles →</Link>
```

Same eyebrow. Same H1/H2. Same paragraph opener. The `#positions` anchor doesn't exist on this page. This looks like it was pasted from the Careers page and never rewritten.

The page has **no thesis line** for Sognos as a company. "Our Story" starts nine hundred pixels down, buried under a hero image. A reader lands on `/company/about` and reads "Join Sognos to drive innovation together" — they think they're on the careers page. Then they scroll and get the actual story.

**Fix — rewrite the Hero to open on the About thesis, kill the anchor, and let the bottom Careers band be the one Careers moment.**

```tsx
{/* Hero — the thesis, not a Careers restatement */}
<section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <AnimatedEyebrow dotClassName="bg-sognos-blue-accent" textClassName="text-sognos-muted">
          About Sognos
        </AnimatedEyebrow>
        <h1 className="mt-5 font-heading font-normal text-sognos-heading text-5xl tracking-tight text-balance lg:text-6xl">
          The specialist Dynamics&nbsp;365 partner
          <br className="hidden md:inline" />
          for frontline service organisations.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-normal text-sognos-body md:text-lg">
          Since 2016, we've helped healthcare, government and essential-services
          teams turn complex frontline operations into connected, intelligent
          systems built around real work.
        </p>
      </div>
      <div className="flex lg:col-span-4 lg:justify-end">
        {/* Real primary CTA, not a broken anchor. Uses the house Book-a-Demo label. */}
        <button
          type="button"
          data-book-demo
          className="inline-flex items-center justify-center rounded-full bg-sognos-navy px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
        >
          Book a Demo
        </button>
      </div>
    </div>
  </div>
  <div className="mt-16 lg:mt-20">
    <AboutHeroImage />
  </div>
</section>
```

Ships without introducing anything new — reuses `AnimatedEyebrow`, the existing `rounded-full` CTA pattern, house eyebrow/H1 tokens. Kills the broken `#positions` anchor. Frees the bottom Careers band to actually be about careers.

**Why it matters:** the page currently has two Careers CTAs and zero About CTAs. That is a page that does not know what it is.

---

### 2. The stats undersell the company. **Working but weak.**

`components/layout/sections/AboutStats.tsx:12–16`

```ts
const STATS = [
  { value: 2016, suffix: "",  label: "Founded" },
  { value: 10,   suffix: "+", label: "Years" },
  { value: 3,    suffix: "",  label: "Countries served" },
] as const;
```

"Founded 2016" and "10+ Years" are the same fact told twice — the reader mentally computes 2026 − 2016 the moment they read the first one. "3 Countries served" without a project or client anchor reads defensive.

The rolling-digit mechanic is genuinely nice (real character, not stock count-up) — don't touch the mechanic. Change the payload.

**Fix — three stats that each add a distinct proof point.**

```ts
const STATS = [
  { value: 2016, suffix: "",  label: "Founded in Sydney" },
  { value: 40,   suffix: "+", label: "Frontline deployments" }, // placeholder — needs real number
  { value: 3,    suffix: "",  label: "Countries" },
] as const;
```

Or, if a fourth is available (users on the platform, hours saved, records under management), extend the STATS array — the `md:grid-cols-3` becomes `md:grid-cols-2 lg:grid-cols-4`:

```tsx
// AboutStats.tsx:135
className="mt-16 flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-4"
```

Four ruled columns with notches is even more distinctive than three (the layout carries better rhythm at 4).

**Decision needed:** real numbers from the founders. This audit lists the placeholder pattern; slot in truth.

---

### 3. `AboutHeroImage` — mobile is a 100vw-tall square, and the parallax is fired off global `scrollY` before the image is even on screen. **Bug + UX cost.**

`components/layout/sections/AboutHeroImage.tsx:29–41`

```tsx
const { scrollY } = useScroll();
const progress = useTransform(scrollY, [0, 600], [0, 1], { clamp: true });
// ...
<div className="relative overflow-hidden pt-[100vw] sm:pt-[35vw] xl:pt-[590px]">
```

Two problems:

- **`pt-[100vw]` on mobile** = the image is a full square (100% viewport width both dimensions). On a 390-wide iPhone that's a 390px-tall block. The Hero above is ~640px. The user scrolls a full screen before reaching Our Story. This is the tallest single element on the page and it's a team photo.
- **Global `scrollY`** — by the time the image enters the viewport (Hero is taller than 600px), progress is already `1`. The container is at its narrowest, radius is `12`, image parallax is at rest. The effect never plays.

**Fix — element-relative scroll, and a saner mobile aspect.**

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function AboutHeroImage({
  src = "/images/about/sognos-team.webp",
  alt = "",
}: { src?: string; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Element-relative: play from "image top hits viewport bottom" to
  // "image top hits viewport top" — the collapse actually runs on entry.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const maxWidth = useMotionTemplate`calc(100vw - ((100vw - 84rem) * ${scrollYProgress}))`;
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [-70, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ maxWidth, borderRadius }}
      className="mx-auto w-full overflow-hidden"
    >
      {/* Mobile: 16:10 crop, not a full square. Portrait phones no longer
          eat a full viewport of team photo before the story starts. */}
      <div className="relative overflow-hidden pt-[62.5%] sm:pt-[35vw] xl:pt-[590px]">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            width={2016}
            height={768}
            priority
            sizes="100vw"
            className="absolute left-0 top-0 min-h-[calc(100%+60px)] w-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
```

Same mechanic, correct trigger, mobile that doesn't punish the reader.

---

## Section-by-section

### Hero
**State:** wrong copy (see #1). Structurally fine — grid, tokens, eyebrow, CTA button pattern all correct. `pt-32 lg:pt-40` gives the fixed navbar its space. Grid `lg:col-span-7 / lg:col-span-5` is a nice asymmetric split.

**Also:** the Hero H1 uses `text-5xl lg:text-6xl` — the changelog notes this is an **intentional About-only override** of the shared Hero H1 rule (`text-5xl md:text-6xl lg:text-7xl`). Keep the override, but consider promoting it: if the About Hero is 6xl, the SolutionsHero and other pages at 7xl start to feel loud by comparison. Log this as an open decision.

**Verdict:** normalized structurally, broken narratively.

---

### AboutHeroImage
**State:** bug (see #3). Once fixed: nice signature — the tokens `84rem` (max-w-7xl) and `-70px` translate come straight off the AngelList inspection in the code comment. Keep.

---

### "Our Story" block (inline, lines 125–183)
**State:** dense. Four full paragraphs at `text-lg leading-relaxed` totaling ~320 words. On desktop that's four 500–600px vertical blocks of prose in a single column. `max-w-2xl` keeps measure comfortable, but the reader has to earn every stat.

The `lg:mt-12` offset on the eyebrow column matching the lead paragraph's `lg:mt-12` — clever but fragile (as the code comment warns). Anyone changing one without the other breaks the top alignment. That's a small system smell.

**Findings:**

| # | Issue | Where |
|---|---|---|
| 1 | Four paragraphs is a wall — Routable's /about opens with a single statement + supporting graf, not four | inline |
| 2 | `text-2xl font-medium lg:mt-12` on the lead — no `md:` step, and `font-medium` at 24px on AngelList reads slightly muddy. Try `text-2xl md:text-[26px] font-normal`, or promote it to `text-3xl md:text-[28px]` and drop it to `font-normal` for a real display-quote feel | inline |
| 3 | The `mt-12` mirror between columns is documented but brittle — replace with an `items-baseline` grid or align on a shared row | inline |
| 4 | Body copy repeats *"organisations"* five times in three paragraphs. Language, not layout, but every audit should flag it | copy |

**Fix — tighten to two paragraphs + a numbered pull-quote row:**

```tsx
<section className="bg-white py-20 pt-0 md:pb-28">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid grid-cols-1 items-baseline gap-8 lg:grid-cols-3 lg:gap-10">
      <div className="lg:col-span-1">
        <AnimatedEyebrow className="flex w-fit" textClassName="text-sognos-muted">
          Our Story
        </AnimatedEyebrow>
        <h2 className="mt-4 max-w-5xl font-heading text-3xl font-medium leading-snug tracking-tight text-sognos-heading text-balance md:text-4xl">
          Healthcare first. Field service always. AI at the centre.
        </h2>
      </div>
      <div className="lg:col-span-2">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-sognos-body">
          <p className="font-heading text-2xl font-normal leading-snug tracking-tight text-sognos-heading md:text-[28px]">
            Since 2016 we've partnered with healthcare, social care and
            essential-services teams to modernise how they deliver care every
            day.
          </p>
          <p>
            As a specialist Microsoft Dynamics 365 partner, we combine deep
            operational understanding with modern business applications — turning
            complex service delivery into connected, intelligent operations that
            frontline teams actually use.
          </p>
        </div>
        <AboutStats />
      </div>
    </div>
  </div>
</section>
```

Kills paragraphs 2 and 3 (they say the same thing twice). Promotes the lead paragraph to a heading-face pull-quote (still `font-normal`, still AngelList — carries the personality of the display face without the pull-quote being an italic serif cliché). `items-baseline` replaces the brittle `mt-12` twin.

**COULD-DO — the numbered timeline:** if we want a distinctive About moment (see "Signature" below), the story block is where it lives.

---

### AboutValues (Mission / Vision / Beliefs)
**State:** solid on structure. Three rails stacked, dividers on `border-white/20`, `AnimatedEyebrow` in the left column, statement in the right. The 3-column belief cards with `border-r border-white/20` dividers are a nice riff on the CTA-style stat block.

**Findings:**

| # | Issue | Fix |
|---|---|---|
| 1 | Beliefs cards use `bg-white/0` — deliberate transparent, but reads unfinished; the `border-r` alone is doing all the work. Once the reader parses the pattern it works, but the reveal is slow | Drop `bg-white/0` (it's a no-op); or **add a `pt-8` top rule so each belief has its own notch**, matching the AboutStats language (bring the whole page onto a "notched rule" motif) |
| 2 | `py-20 lg:py-0` on the section — mobile has `py-20`, desktop has zero section padding and only relies on the `lg:py-14` per row. Fine, but the desktop transition into `TeamSection` (`py-20 md:py-28`) feels abrupt because there's no bottom breathing room on the last belief row | Replace `lg:py-0` with `lg:pt-0 lg:pb-8` — hairline sign-off before the section change |
| 3 | Belief `<h3>` is `text-sm md:text-base` — that's smaller than the belief body (`text-lg`). Intentional (title as label, body as statement) but the size relationship is unusual. AngelList's own hierarchy typically keeps title ≥ body. Worth testing `text-base md:text-lg` for the title | `text-base md:text-lg` |
| 4 | The `Mission → Vision → Beliefs` progression has no visual sequencing. Three rails with identical eyebrow treatment. Numbering (`01 · Mission`) would encode that this is a sequence, not three parallel things | See below |

**Fix — small numbered marker on the eyebrows, encoding the actual sequence:**

```tsx
{/* Row 1 */}
<div className="lg:col-span-2">
  <AnimatedEyebrow textClassName="text-white/80">
    <span className="mr-2 tabular-nums text-white/40">01</span>
    Our Mission
  </AnimatedEyebrow>
</div>
```

Only justified because Mission → Vision → Beliefs **is** a logical sequence (why we exist → where we're going → what we believe). Numbering encodes real information, not decoration.

**COULD-DO:** the three rails could pin/stack on scroll (sticky), giving the page a real reading rhythm on the value statements. Uses the existing `SolutionsSection` sticky pattern — reusable component check clears. Ask before recommending the switch — it's a bigger structural move.

---

### TeamSection
**State:** the strongest section on the page. Already went through the Pass. Portrait as primary target, dashed-bounded action row (`border-y border-dashed border-sognos-line py-2 sm:py-2.5`), name flat `text-2xl font-medium`, LinkedIn chip `size-7 rounded bg-sognos-tint`. All from Routable, all correctly tokenized.

The drawer is `w-full max-w-md`, right-side slide-in, `TRANSITION` `{stiffness: 220, damping: 28, mass: 0.9}` — solid spring feel. Escape and backdrop-click both close. Focus goes to the close button on open. `useId` for `aria-labelledby`. This is the Apple-level bit already.

**Two small nitpicks:**

| # | Issue | Fix |
|---|---|---|
| 1 | Card role paragraph uses `sm:mt-2 md:text-lg` — the `sm` and `md` breakpoints do different things and the `sm:mt-2` fires below the `md:text-lg`, so at `sm` widths the role text is 16px with 8px top margin, at `md`+ it's 18px with 8px margin. Not wrong, but the stagger is arbitrary | Unify to `mt-2 text-base md:text-lg` |
| 2 | LinkedIn chip hover is `hover:bg-sognos-navy-dark hover:text-white` — everywhere else on the page hover accents to `sognos-blue-accent`. Two different hover models in the same section | Change to `hover:bg-sognos-blue-accent hover:text-white` for pattern consistency |

**Verdict:** ship as-is once nitpicks land.

---

### Partners + Accreditations
**State:** section rebuilt 2026-08-05, well-formed. Slider is native scroll-snap (not Embla — correct), drag + arrows, `basis-full sm:basis-[calc((100%-12px)/2)] lg:basis-[calc((100%-32px)/3)]` — the gap-math is precise.

**Two real issues, one open, one fixable.**

**Issue A — the partner logo backgrounds (open, documented in changelog 2026-08-02).**

The card face is `bg-sognos-tint` (a pink-tinted grey). The logos:
- Ingram Micro `.png` — baked-in `#1570EF` blue background
- Resco `resco-blue-bg.png` — baked-in blue

On tint, Ingram lands as a blue rectangle on a pink rectangle. Fugly. This is a known asset problem, not a code problem — but the audit isn't complete without it.

**Two paths:**

1. **Get transparent PNG/SVG replacements from the vendors.** Best outcome. Kunal/Rick ask.
2. **Interim: individual white logo plates.** Add a plate around every logo (uniform treatment — don't call out only the offenders). This works with any logo file, transparent or opaque:

```tsx
// AboutPartnersSlider.tsx:97 and 113 — replace the bare span with a white plate
<span className="mt-auto flex h-11 max-w-[55%] items-center rounded border border-sognos-line bg-white px-2">
  <Image
    src={partner.logo}
    alt=""
    width={160}
    height={44}
    className="h-auto max-h-8 w-auto max-w-full object-contain"
  />
</span>
```

Every logo now sits on a small white plate — Microsoft still reads correctly, Ingram Micro's blue is visually contained inside a controlled cell, SoftwareOne's black-on-transparent gets a subtle border, Resco's blue is contained. It's the accreditations sub-band pattern (which already uses `bordered white plate` for exactly this reason). Consistency **and** cover for the bad assets. Add as a new rule:

> **New rule proposal — Third-party logos on tinted surfaces sit on bordered white plates.** Prevents baked-in-background logos from reading as coloured rectangles on the surface. Precedent: Accreditations sub-band (About page).

**Issue B — the "Accreditations & Memberships" sub-band uses an eyebrow as its title.**

`page.tsx:203`:

```tsx
<AnimatedEyebrow className="mb-8" textClassName="text-sognos-muted">
  Accreditations &amp; Memberships
</AnimatedEyebrow>
<ul className="flex flex-wrap gap-3 lg:gap-4">
  {/* logos */}
</ul>
```

The `AnimatedEyebrow` component is documented as a small-caps label **above section headings** (§ CLAUDE.md eyebrow rule). Here it's the sole title of a sub-band — no H3 follows. Structurally it's an orphaned label.

**Fix — a real sub-heading, with the eyebrow above it if we want the animated entrance:**

```tsx
<div className="mt-16 border-t border-sognos-line pt-12 lg:mt-24 lg:pt-16">
  <AnimatedEyebrow className="mb-4" textClassName="text-sognos-muted">
    Credentials
  </AnimatedEyebrow>
  <h3 className="mb-8 font-heading text-xl font-medium tracking-tight text-sognos-heading md:text-2xl">
    Accreditations & memberships
  </h3>
  <ul className="flex flex-wrap gap-3 lg:gap-4">
    {/* ... */}
  </ul>
</div>
```

Restores the eyebrow to its actual job (label above title). Introduces a sub-heading scale (`text-xl md:text-2xl`) — worth codifying:

> **New rule proposal — Sub-section H3 scale.** `font-heading text-xl md:text-2xl font-medium tracking-tight text-sognos-heading`. Use inside sections for sub-bands (Accreditations under Partners, etc.). One step below section H2 (`text-3xl md:text-4xl`).

---

### SocialResponsibilitySection
**State:** structure fine, tone off.

**Findings:**

| # | Issue | Fix |
|---|---|---|
| 1 | Section padding `py-24 lg:py-32` — the house rule is `py-20 md:py-28`. Off-system | `py-20 md:py-28` |
| 2 | Body text is `text-white/65` (header sub) and `text-white/65` (card body). `AboutValues` uses full `text-white` for its statements. Two different white-alpha models on the same navy surface = inconsistent feel | Bring both onto one system — see below |
| 3 | Header is centred with `max-w-3xl text-center` — everything else on the page is left-aligned. Centred H2 here isolates the section visually | Left-align to match the page rhythm |
| 4 | Six pillar cards all link to `/company/social-responsibility` (one destination). Six identical destinations on one grid = every card is the same click. Either give each pillar a fragment target on the SR page (`#community-engagement`, etc.) or drop the six-way link pretence | Fragment targets |

**Fix:**

```tsx
<section className="w-full bg-sognos-navy py-20 md:py-28">
  <div className="mx-auto max-w-7xl px-6">
    {/* Left-aligned header, matches AboutValues + partners rhythm */}
    <div className="max-w-2xl">
      <AnimatedEyebrow className="mb-5" textClassName="text-white/80">
        Social Responsibility
      </AnimatedEyebrow>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-white text-balance md:text-4xl">
        Our commitment to community and planet.
      </h2>
      <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
        Social responsibility is at the core of our values — we are committed to
        making a difference where we live, work, and do business.
      </p>
    </div>

    {/* Grid unchanged, but each card links to its own anchor and the body
        uses the same white/75 as the header sub (single alpha model) */}
    <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-14">
      {PILLARS.map((pillar) => (
        <Link
          key={pillar.title}
          href={`/company/social-responsibility#${slugify(pillar.title)}`}
          className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
        >
          <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-white lg:text-2xl">
            {pillar.title}
          </h3>
          <div className="my-5 border-t border-dashed border-white/20" />
          <p className="text-base leading-relaxed text-white/75 line-clamp-3">
            {pillar.body}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-sognos-blue-accent">
            Read more
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>
```

Codify the dark-surface alpha ladder while we're here:

> **New rule proposal — Dark-surface text alpha ladder.** On `bg-sognos-navy` / `-dark` / `-darkest`:
> - Primary body: `text-white`
> - Secondary body: `text-white/75`
> - Muted / meta: `text-white/50`
> - Dashed rules / dividers: `border-white/20`
>
> Do not use `text-white/65` — it's between two steps. `text-white/80` on eyebrows is fine as an accent within the ladder.

---

### Careers band (bottom)
**State:** good execution once the duplication with the Hero is resolved (see #1). The `rounded-lg bg-sognos-tint p-8 lg:p-14` inset panel with copy left, benefit-titles-only list right is a clean Routable-analogous pattern.

**Two nitpicks:**

| # | Issue | Fix |
|---|---|---|
| 1 | The View open roles link is `text-sm font-semibold` — everywhere else on the page these arrow-links are `text-base` (partners "Learn more", card "Read more" links use `text-sm` on subcards, `text-base` on primary CTAs). Fine to keep `text-sm` here since it's a secondary CTA, but flag for consistency | Choose one: `text-sm` if secondary, `text-base` if primary. Recommended: `text-base` — this is the primary Careers CTA on the About page |
| 2 | Benefit `<li>` uses `border-b border-sognos-line pb-4 last:border-b-0 last:pb-0`. `sognos-line` on `sognos-tint` is `#e2e8f0` on `#f0eff2` — the line is barely visible against the tint. The dividers do very little work | Bump to `border-sognos-heading/8` or `border-white` for a hairline that reads on tint |

**Small COULD-DO:** the benefit list is title-only. Every AngelList/Routable benefit list of this form includes a one-line supporting phrase. Currently the four titles float alone:

- Collaborative culture
- Continuous learning
- Work-life balance
- Equal opportunity

They're generic enough to read as template. Either add supporting one-liners (Routable does exactly this) or shrink to three real ones with weight (`Equity every quarter` beats `Equal opportunity`). The current list is not embarrassing — it's just not memorable.

---

## New design system rules — summary

Four rules to add to `docs/PROJECT_STATE.md` §2 if any of the above land:

| # | Rule | Where used |
|---|---|---|
| 1 | **Sub-section H3 scale** — `font-heading text-xl md:text-2xl font-medium tracking-tight text-sognos-heading`. One step below section H2 | Accreditations sub-band, any future sub-band in a section |
| 2 | **Dark-surface text alpha ladder** — `white / white/75 / white/50`, dividers `border-white/20`. No `white/65` | AboutValues, SocialResponsibility, all `bg-sognos-navy*` sections |
| 3 | **Third-party logos on tinted surfaces sit on bordered white plates** — prevents baked-in-background logos reading as coloured rectangles | Partners cards, any future logo grid on `bg-sognos-tint` |
| 4 | **Notched-rule motif is a page-family signal** — where a page uses `AboutStats`'s notched top rule, extend it to Beliefs cards (and other stat/rail elements in the same page) so the motif reads deliberate, not one-off | About page (potential extension to Beliefs) |

---

## One signature moment — the risk worth taking

The About page currently executes design rules well but says nothing memorable about Sognos. Every section could belong to any healthcare SaaS partner site. Here is the one bold choice worth proposing — and the argument for spending the boldness here rather than scattered across sections.

**Turn "Our Story" into a numbered scroll-progression timeline.**

Not a decorative timeline. A vertical rail with three real waypoints:

```
2016  ─ Kunal + Rick see the Field-Service gap in the Microsoft partner
        ecosystem. Sognos is founded in Sydney.

2020  ─ Healthcare specialisation. First deployment of what will become
        SognosCare, built for aged-care providers under the new standards.

2025  ─ SognosCare + SognosRoster + SognosGenogram ship as a connected
        platform. AI at the centre.
```

Why this and not another feature grid:
- It's **actually a sequence** — the only place on the page where numbering is honest.
- Uses **content that only Sognos has** — the founders, the year, the sector shift, the platform.
- Rests on tokens already in the system — `AboutStats`'s notched rule, the dashed borders from SR cards, the eyebrow, `sognos-blue-accent` for the accent tick.
- Sits in the copy space that's currently occupied by four repetitive paragraphs.

**Working example — desktop rail, tokenised:**

```tsx
{/* Replace the current "Our Story" copy column with this */}
<ol className="max-w-2xl">
  {[
    {
      year: "2016",
      body: "Kunal Joshi and Rick Vosila see the Field Service gap in the Microsoft partner ecosystem. Sognos is founded in Sydney.",
    },
    {
      year: "2020",
      body: "Healthcare specialisation. First deployment of what becomes SognosCare, built for aged-care providers under the new standards.",
    },
    {
      year: "2025",
      body: "SognosCare, SognosRoster and SognosGenogram ship as a connected platform. AI at the centre.",
    },
  ].map((entry) => (
    <li
      key={entry.year}
      className="relative grid grid-cols-[80px_1fr] gap-6 border-t border-sognos-line py-6 last:border-b"
    >
      {/* Notched marker — the same 72×8 notch AboutStats uses, scaled to a marker */}
      <svg
        width="16" height="8" viewBox="0 0 72 8"
        aria-hidden="true"
        className="absolute -top-1 left-0 fill-sognos-blue-accent"
      >
        <path d="M72 8L65.3171 2.03269C63.851 0.723577 61.9543 0 59.9888 0H2C0.895431 0 0 0.895431 0 2V8H72Z" />
      </svg>
      <span className="font-heading text-2xl font-medium tabular-nums tracking-tight text-sognos-heading md:text-3xl">
        {entry.year}
      </span>
      <p className="pt-1 text-lg leading-relaxed text-sognos-body">
        {entry.body}
      </p>
    </li>
  ))}
</ol>
```

**What this costs:** the current wall-of-text disappears. Founders get named (they're not currently named anywhere on this page above Team). Three real waypoints replace three abstractions.

**Where it can fail:** if the true story doesn't have three clean waypoints, this dies fast. If Sognos doesn't want to name years, dies fast. Ask Kunal/Rick before we build.

**Trade-off honesty:** this replaces documented, tested copy. It's the one place where the audit proposes more than a fix — it's a re-scoping. Everything else in this audit is polish; this is a design choice.

---

## Priority order for execution

1. **Hero rewrite + kill Careers duplication** (Bug — highest impact, ~15 min)
2. **AboutHeroImage — element-relative scroll + mobile aspect** (Bug — behaviour is currently broken)
3. **Partners logo plates** (Fixes the ugliest visible artifact on the page)
4. **AboutValues alpha ladder + `border-r` beliefs micro-polish + optional numbering** (Rhythm)
5. **SocialResponsibility — section rhythm, alpha ladder, left-align, fragment links** (Consistency)
6. **AboutStats payload rewrite** (Needs real numbers)
7. **Accreditations sub-band — proper H3 + eyebrow** (Structural correctness)
8. **TeamSection nitpicks** (Cosmetic)
9. **Our Story timeline** (Signature — decide only after 1–8 land)

Nothing above ~4 hours of work end-to-end if all approved. Items 1–3 ship regardless — the rest are worth walking through with the team.

---

## Open questions to resolve before build

1. **Hero copy direction** — the About-thesis copy above is a stand-in. Real positioning needed before it ships.
2. **Real stat numbers** — deployments count, users on platform, hours saved, or any other concrete proof point.
3. **Timeline waypoints** — do the three years (2016 / 2020 / 2025) and events map to reality?
4. **Careers benefit list** — keep as title-only, add one-liners, or replace with three specific ones?
5. **Partner asset chase** — Ingram Micro + Resco transparent PNG/SVG requests raised with vendors? Or should we ship the interim white-plate treatment first?
