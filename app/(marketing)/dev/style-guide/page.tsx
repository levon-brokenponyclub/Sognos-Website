import type { Metadata } from "next";
import Image from "next/image";

// Throwaway preview route for a lightweight style guide extracted from
// the Sognos print collateral + brand-assets folder. See
// docs/BRAND_MATERIALS_AUDIT.md for the full audit.
//
// Six elements: palette, typography, sector tints, logo lockups, icon
// system, gradient library. Nothing links here and it is noindex'd.
// Delete when the guide is promoted (or dropped) — it is not a page.
export const metadata: Metadata = {
  title: "Style guide — preview",
  robots: { index: false, follow: false },
};

// Logo lockups — sourced from Project Docs/Brand Assets, mirrored into
// public/brand-assets/ so the dev page can load them.
const LOGOS = [
  {
    name: "Sognos",
    src: "/brand-assets/sognos-logo.png",
    note: "Master wordmark · custom geometric type · subtle inner blue gradient",
  },
  {
    name: "SognosCare",
    src: "/brand-assets/sognoscare-logo.png",
    note: "Heart-with-hand mark · celebratory multi-colour burst accent",
  },
  {
    name: "SognosRoster",
    src: "/brand-assets/sognosroster-logo.png",
    note: "Split-tone lockup · `roster` in accent light-blue · calendar-with-avatar mark",
  },
  {
    name: "SognosGenogram",
    src: "/brand-assets/sognosgenogram-logo.png",
    note: "Split-tone lockup · `genogram` in magenta · connected-nodes mark",
  },
];

// Sample icons from the 78-strong Icons_Colour library. Every icon in
// the set uses the same two-tone treatment: deep navy primary +
// sognos-blue-accent highlight.
const ICONS = [1, 5, 15, 25, 40, 60];

// Image treatments — masks + photo treatments extracted from the eBook
// pages. Wave = signature cover mask (S-curve dividing photo from navy
// panel). Corner cut = the "editorial flag" motif on content pages.
// Rounded rect = standard content photo. Full-bleed = editorial spreads.
// Photography library — 14 sample photos representing the brand's Style
// 1 aesthetic (real people, on-site light, authentic subjects across
// healthcare / field service / editorial contexts).
const PHOTO_LIBRARY = [
  "17", "22", "26", "27", "28", "30", "31",
  "32", "33", "41", "45", "58", "61", "62",
].map((n) => `/brand-assets/photos/${n}.webp`);

const WAVE_MASK_STYLE = {
  WebkitMaskImage:
    "url(/brand-assets/waves/mask.svg), linear-gradient(#fff, #fff)",
  maskImage:
    "url(/brand-assets/waves/mask.svg), linear-gradient(#fff, #fff)",
  WebkitMaskSize: "100% 100%, 100% 100%",
  maskSize: "100% 100%, 100% 100%",
  WebkitMaskRepeat: "no-repeat, no-repeat",
  maskRepeat: "no-repeat, no-repeat",
  WebkitMaskPosition: "center, center",
  maskPosition: "center, center",
  maskMode: "luminance, luminance",
  WebkitMaskComposite: "source-out",
  maskComposite: "exclude",
};

const IMAGE_TREATMENTS = [
  {
    name: "Field · frontline",
    subtitle: "Wave mask · navy backdrop",
    image: "/brand-assets/photos/style-guide-photo-1.webp",
    note: "On-site worker with hi-vis, warm dusk light, real environment (power lines, laptop in the field). The signature wave mask reveals the bg-sognos-navy backdrop while preserving the subject area.",
    style: WAVE_MASK_STYLE,
    previewClassName: "aspect-[1217/631]",
    snippet: `mask-image:
  url(/brand-assets/waves/mask.svg),
  linear-gradient(#fff, #fff);
mask-composite: exclude;
background: bg-sognos-navy;`,
  },
  {
    name: "Care · human",
    subtitle: "Wave mask · navy backdrop",
    image: "/brand-assets/photos/style-guide-photo-2.webp",
    note: "Clinician + elderly client, warm indoor light, physical contact (holding hands). The wave mask applies the same cover treatment to the Care photography reference.",
    style: WAVE_MASK_STYLE,
    previewClassName: "aspect-[1217/631]",
    snippet: `mask-image:
  url(/brand-assets/waves/mask.svg),
  linear-gradient(#fff, #fff);
mask-composite: exclude;
background: bg-sognos-navy;`,
  },
  {
    name: "Rounded rectangle",
    subtitle: "Contained content photo",
    image: "/images/about/sognos-team.webp",
    note: "The eBook uses ~24px on inline content photos. On the web, CLAUDE.md §2 limits us to rounded (4px) by default; md (6px) or lg (8px) with justification. The print 24px is documented here as reference — production content photos should use rounded (4px) unless the surface is hero-scale.",
    style: {
      borderRadius: "24px",
    },
    snippet: `border-radius: 24px;
/* Print reference only.
   Web default: rounded (4px)
   per CLAUDE.md §2. */`,
  },
  {
    name: "Full-bleed",
    subtitle: "Editorial spread · no mask",
    image: "/images/about/sognos-team.webp",
    note: "Hard rectangular edge, image runs to its container. Used across the eBook article spreads (Clinical Decisions, Logistics) where copy sits beside a photo. Simple, still on-brand — the surrounding layout does the work.",
    style: {},
    snippet: `/* no clip-path
   no border-radius
   overflow: hidden on parent */`,
  },
];

// Master brand gradient + sub-brand gradient.
const GRADIENTS = [
  {
    name: "Master brand gradient",
    src: "/brand-assets/gradient-master.png",
    note: "Bright electric blue → deep navy · diagonal · primary hero surface treatment",
  },
  {
    name: "Sub-brand gradient",
    src: "/brand-assets/gradient-sub-brands.png",
    note: "Product-family gradients (Care · Roster · Genogram variants live in the source folder)",
  },
];

// Product tokens — merged from /style-guide, values reconciled against
// the actual `app/tokens.css` (root guide had stale hex for Care base
// and Roster dark).
const PRODUCTS = [
  {
    name: "SognosCare",
    dark: { token: "--sognos-care-dark", hex: "#0f1936" },
    base: { token: "--sognos-care-base", hex: "#3b6fe0" },
    gradient: "--sognos-care-gradient",
  },
  {
    name: "SognosRoster",
    dark: { token: "--sognos-roster-dark", hex: "#1d96fc" },
    base: { token: "--sognos-roster-base", hex: "#59bbf7" },
    gradient: "--sognos-roster-gradient",
  },
  {
    name: "SognosGenogram",
    dark: { token: "--sognos-genogram-dark", hex: "#250438" },
    base: { token: "--sognos-genogram-base", hex: "#91278c" },
    gradient: "--sognos-genogram-gradient",
  },
];

// SognosCare edition palette — six sector pairs (base + dark variant).
const EDITIONS = [
  { label: "Residential Aged Care", base: "#caa4ff", dark: "#af82f0", token: "aged-care" },
  { label: "Allied Health", base: "#ffad6e", dark: "#f38c3d", token: "allied-health" },
  { label: "Support at Home", base: "#ff8e90", dark: "#ef6a6c", token: "support-at-home" },
  { label: "Hospital in the Home", base: "#cbdd61", dark: "#9aad2c", token: "hospital-in-the-home" },
  { label: "Child & Family Services", base: "#ff7dbc", dark: "#e95ca0", token: "child-and-family-services" },
  { label: "Disability & Mental Health", base: "#00a98f", dark: "#039b84", token: "disability" },
];

// Radius scale — CURRENT rules only. `xl` / `2xl` / `3xl` and arbitrary
// values (`rounded-[Xrem]`) are explicitly phased out by CLAUDE.md §2
// and deliberately excluded from this guide.
const RADII = [
  {
    name: "Default",
    className: "rounded",
    px: "4px",
    note: "The base and standard. All surfaces, cards, images, pills.",
  },
  {
    name: "Medium",
    className: "rounded-md",
    px: "6px",
    note: "Justified only. Ask and confirm before using.",
  },
  {
    name: "Large",
    className: "rounded-lg",
    px: "8px",
    note: "Justified only. Hero components, large product cards.",
  },
  {
    name: "Full",
    className: "rounded-full",
    px: "9999px",
    note: "Buttons only. Never on surfaces.",
  },
];

// Layout tokens — values pulled from live tokens.css and CLAUDE.md §2
// gotchas (nav height in tokens.css says 64px but the live implementation
// uses 80px per the navbar scroll model — showing the live value here).
const LAYOUT = [
  { name: "Container width", value: "1280px", token: "--sognos-container-width", note: "max-w-7xl" },
  { name: "Container gutter", value: "24px", token: "—", note: "px-6" },
  { name: "Section rhythm", value: "80 / 112px", token: "—", note: "py-20 md:py-28" },
  { name: "Grid gap", value: "12 / 16px", token: "—", note: "gap-3 lg:gap-4" },
  { name: "Nav height", value: "80px", token: "(live)", note: "h-20 · fixed offset" },
];

// Palette — core brand tokens + print-only accents documented from the
// eBook and brochure.
const CORE_PALETTE = [
  { name: "sognos-navy-darkest", hex: "#060e28", token: true },
  { name: "sognos-navy", hex: "#152248", token: true },
  { name: "sognos-blue-accent", hex: "#1d96fc", token: true },
  { name: "sognos-tint", hex: "#f0eff2", token: true },
  { name: "sognos-heading", hex: "#0f1936", token: true },
  { name: "sognos-muted", hex: "#68706f", token: true },
];

const PRINT_PALETTE = [
  { name: "Print navy", hex: "#002040", note: "eBook + brochure primary" },
  { name: "Print cream", hex: "#e0e0c0", note: "eBook light surface" },
  { name: "Warm coral", hex: "#c08040", note: "eBook accent · site-absent" },
];

// Sector coding — five industries + their tint colours. Mint / ice /
// cream / rose already documented in tokens.css comments; sage proposed
// as new token for Energy & Utilities.
const SECTORS = [
  { name: "Health & Social Care", tint: "#f7edf3", note: "rose" },
  { name: "Facilities Management", tint: "#ebfbe3", note: "mint" },
  { name: "Industrial Services", tint: "#f4f8f9", note: "ice" },
  { name: "Government Sectors", tint: "#f5f6ee", note: "cream" },
  { name: "Energy & Utilities", tint: "#dfeacd", note: "sage · proposed" },
];

function Swatch({
  name,
  hex,
  token = false,
  note,
}: {
  name: string;
  hex: string;
  token?: boolean;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="aspect-[4/3] w-full rounded border border-sognos-line"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="font-heading text-sm font-medium text-sognos-heading">
          {name}
        </p>
        <p className="mt-0.5 font-mono text-xs uppercase text-sognos-muted">
          {hex}
          {token && (
            <span className="ml-2 rounded border border-sognos-line px-1.5 py-0.5 text-[10px] font-semibold not-italic tracking-widest text-sognos-blue-accent">
              TOKEN
            </span>
          )}
        </p>
        {note && (
          <p className="mt-1 text-xs text-sognos-muted">{note}</p>
        )}
      </div>
    </div>
  );
}

export default function StyleGuidePreview() {
  return (
    <main className="bg-white">
      {/* Sofia Pro via Adobe Typekit — page-scoped resource load. React
          19 / Next 16 hoists this into <head> automatically thanks to
          the `precedence` prop, and dedupes across component tree.
          Sofia Pro is the LEGACY print face (eBook + brochure);
          available here as `font-family: sofia-pro` for reference
          comparisons only. If it fails to render, check the Adobe
          Fonts web-project domain whitelist for localhost:3000. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://use.typekit.net/aoi4bxt.css"
        precedence="default"
      />
      {/* Preview header */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Preview &middot; not linked, not indexed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-light tracking-tight text-sognos-heading">
          Style guide &mdash; based on the Sognos print collateral
        </h1>
        <p className="mt-2 max-w-2xl text-base text-sognos-body">
          Three-element reference extracted from the eBook + brochure. See
          <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
            docs/BRAND_MATERIALS_AUDIT.md
          </code>
          for the full audit and application ideas.
        </p>
      </div>

      {/* Element 1 — Palette */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 1
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Palette
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Core brand tokens live in
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                app/tokens.css
              </code>
              . Print-only colours are documented from the PDFs and are
              candidates for adding to the token library.
            </p>
          </div>

          {/* Core brand */}
          <div className="mb-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
              Core brand · site tokens
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {CORE_PALETTE.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </div>
          </div>

          {/* Print-only */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
              Print-only &middot; documented from PDFs
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
              {PRINT_PALETTE.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 2 — Typography */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 2
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Typography
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              AngelList variable font on both body and heading. Print uses
              SofiaPro &mdash; a deliberate swap, not a mismatch.
            </p>
          </div>

          <div className="space-y-8 border-y border-sognos-line py-10">
            {/* Hero H1 */}
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <p className="pt-3 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Hero H1
              </p>
              <div>
                <h3 className="font-heading text-5xl font-normal tracking-tight text-sognos-heading md:text-6xl">
                  Field service, coordinated.
                </h3>
                <p className="mt-2 font-mono text-xs text-sognos-muted">
                  font-heading &middot; text-5xl md:text-6xl &middot;
                  font-normal &middot; tracking-tight
                </p>
              </div>
            </div>

            {/* Section H2 */}
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Section H2
              </p>
              <div>
                <h3 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
                  Purpose-built for service-intensive sectors.
                </h3>
                <p className="mt-2 font-mono text-xs text-sognos-muted">
                  font-heading &middot; text-3xl md:text-4xl &middot;
                  font-medium &middot; tracking-tight
                </p>
              </div>
            </div>

            {/* Subsection H3 */}
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <p className="pt-1.5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Subsection H3
              </p>
              <div>
                <h3 className="font-heading text-xl font-medium tracking-tight text-sognos-heading md:text-2xl">
                  Coordinate mobile teams
                </h3>
                <p className="mt-2 font-mono text-xs text-sognos-muted">
                  font-heading &middot; text-xl md:text-2xl &middot;
                  font-medium
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <p className="pt-1 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Body
              </p>
              <div>
                <p className="max-w-2xl text-base leading-relaxed text-sognos-body md:text-lg">
                  Sognos is a specialist Dynamics 365 partner for frontline
                  service organisations. Since 2016 we&apos;ve helped
                  healthcare, government and essential-services teams turn
                  complex operations into coordinated delivery.
                </p>
                <p className="mt-2 font-mono text-xs text-sognos-muted">
                  text-base md:text-lg &middot; leading-relaxed &middot;
                  text-sognos-body
                </p>
              </div>
            </div>

            {/* Eyebrow */}
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <p className="pt-1 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Eyebrow
              </p>
              <div>
                <span className="inline-flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-[9px] bg-sognos-blue-accent"
                  />
                  <span className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                    Industries
                  </span>
                </span>
                <p className="mt-2 font-mono text-xs text-sognos-muted">
                  text-xs &middot; font-semibold &middot; uppercase &middot;
                  tracking-widest &middot; 9px square dot
                </p>
              </div>
            </div>
          </div>

          {/* Print reference — Sofia Pro (legacy print face, loaded
              from Typekit above). Shown at the same H2 + body sizes as
              the AngelList specimens above, on a tinted plate so it
              reads as a comparison rather than a live spec. */}
          <div className="mt-8 rounded border border-sognos-line bg-sognos-tint p-6 md:p-8">
            <div className="mb-6 flex items-baseline gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                Print reference
              </p>
              <p
                className="text-xs font-medium text-sognos-muted"
                style={{ fontFamily: "sofia-pro, sans-serif" }}
              >
                Sofia Pro · loaded via Adobe Typekit · legacy only
              </p>
            </div>

            <div className="space-y-6">
              {/* Sofia Pro Section H2 */}
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  Section H2
                </p>
                <div>
                  <p
                    className="text-3xl leading-tight tracking-tight text-sognos-heading md:text-4xl"
                    style={{ fontFamily: "sofia-pro, sans-serif", fontWeight: 500 }}
                  >
                    Purpose-built for service-intensive sectors.
                  </p>
                  <p className="mt-2 font-mono text-xs text-sognos-muted">
                    sofia-pro &middot; weight 500 (SofiaPro Medium)
                  </p>
                </div>
              </div>

              {/* Sofia Pro Body */}
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <p className="pt-1 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  Body
                </p>
                <div>
                  <p
                    className="max-w-2xl text-base leading-relaxed text-sognos-body md:text-lg"
                    style={{ fontFamily: "sofia-pro, sans-serif", fontWeight: 300 }}
                  >
                    Sognos is a specialist Dynamics 365 partner for frontline
                    service organisations. Since 2016 we&apos;ve helped
                    healthcare, government and essential-services teams turn
                    complex operations into coordinated delivery.
                  </p>
                  <p className="mt-2 font-mono text-xs text-sognos-muted">
                    sofia-pro &middot; weight 300 (SofiaPro Light) &middot;
                    matches the eBook body face
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weight ladder proposal — direct side-by-side of current
              vs. print-aligned weights. Same content on both sides so
              the difference is legible at a glance. Documents the
              recommendation drawn from the Sofia Pro comparison above:
              print leans on Bold 700 headings + Light 300 body
              (Δ ~400); web currently uses Medium 500 + Regular 400
              (Δ ~100). This block proposes moving statement headings
              to SemiBold 600 and body to Light 300 — a middle ground
              that lifts brand alignment without going full Bold. */}
          <div className="mt-6 rounded border border-sognos-line bg-sognos-tint p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                Weight ladder &middot; proposal
              </p>
              <p className="text-xs font-medium text-sognos-muted">
                Current vs print-aligned &middot; same copy, different
                weights
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-6">
              {/* CURRENT */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded border border-sognos-line bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sognos-muted">
                    Current
                  </span>
                  <span className="font-mono text-[10px] text-sognos-muted">
                    H2 500 &middot; body 400 &middot; &Delta; 100
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-medium leading-tight tracking-tight text-sognos-heading md:text-4xl">
                  Stop managing complexity. Start delivering outcomes.
                </h3>
                <p className="mt-4 max-w-lg text-base font-normal leading-relaxed text-sognos-body">
                  Sognos is a specialist Dynamics 365 partner for
                  frontline service organisations. Since 2016 we&apos;ve
                  helped healthcare, government and essential-services
                  teams turn complex operations into coordinated
                  delivery.
                </p>
                <p className="mt-3 font-mono text-[10px] text-sognos-muted">
                  font-medium &middot; font-normal
                </p>
              </div>

              {/* PROPOSED */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded border border-sognos-blue-accent/50 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sognos-blue-accent">
                    Proposed
                  </span>
                  <span className="font-mono text-[10px] text-sognos-muted">
                    H2 600 &middot; body 300 &middot; &Delta; 300
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-sognos-heading md:text-4xl">
                  Stop managing complexity. Start delivering outcomes.
                </h3>
                <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-sognos-body">
                  Sognos is a specialist Dynamics 365 partner for
                  frontline service organisations. Since 2016 we&apos;ve
                  helped healthcare, government and essential-services
                  teams turn complex operations into coordinated
                  delivery.
                </p>
                <p className="mt-3 font-mono text-[10px] text-sognos-muted">
                  font-semibold &middot; font-light
                </p>
              </div>
            </div>

            {/* Application notes */}
            <div className="mt-6 border-t border-sognos-line pt-4">
              <p className="text-xs leading-relaxed text-sognos-muted">
                <strong className="text-sognos-heading">
                  Statement H2:
                </strong>{" "}
                <code className="rounded bg-white px-1 font-mono">
                  font-medium
                </code>{" "}
                &rarr;{" "}
                <code className="rounded bg-white px-1 font-mono">
                  font-semibold
                </code>{" "}
                &mdash; only on pitch moments (HeadlineCTA,
                IndustrySection, SolutionsSection). Regular section H2s
                stay on font-medium.
                <br />
                <strong className="text-sognos-heading">Body:</strong>{" "}
                <code className="rounded bg-white px-1 font-mono">
                  font-normal
                </code>{" "}
                &rarr;{" "}
                <code className="rounded bg-white px-1 font-mono">
                  font-light
                </code>{" "}
                &mdash; test on dark navy surfaces first; Light weights
                can lose contrast against dark backgrounds. If it fails,
                keep body at font-normal on dark sections and drop to
                font-light only on light surfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 3 — Sector tints */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 3
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Sector coding
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Five industries, each with a dedicated pastel tint from the
              brochure&rsquo;s &ldquo;Tailored Solutions&rdquo; spread.
              Under-applied on the redesign &mdash; candidate for the
              live
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                IndustrySection
              </code>
              treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {SECTORS.map((s) => (
              <div
                key={s.name}
                className="flex aspect-[3/4] flex-col justify-between rounded border border-sognos-line p-6"
                style={{ backgroundColor: s.tint }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                    {s.note}
                  </p>
                  <p className="mt-1 font-mono text-xs text-sognos-muted">
                    {s.tint}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-lg font-medium leading-snug tracking-tight text-sognos-heading text-balance">
                    {s.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 4 — Logos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 4
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Logo lockups
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Master wordmark + three product lockups. Each product uses
              its own accent colour for the sub-name and its own mark,
              hung off the shared Sognos wordmark for family continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {LOGOS.map((l) => (
              <div
                key={l.name}
                className="flex flex-col overflow-hidden rounded border border-sognos-line bg-white"
              >
                <div className="flex aspect-[3/2] items-center justify-center bg-white p-6">
                  <Image
                    src={l.src}
                    alt={`${l.name} logo`}
                    width={800}
                    height={400}
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                  />
                </div>
                <div className="border-t border-sognos-line p-4">
                  <p className="font-heading text-sm font-medium text-sognos-heading">
                    {l.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-sognos-muted">
                    {l.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dark-surface treatment — logos are supplied in white variants for
              use on navy backgrounds. Show one plate to demonstrate. */}
          <div className="mt-6 rounded border border-sognos-line bg-sognos-navy-darkest p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
              On navy · white variants available
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 py-4 opacity-70">
              {LOGOS.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={l.src}
                    alt=""
                    width={200}
                    height={100}
                    className="h-8 w-auto brightness-0 invert md:h-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 5 — Icon system */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 5
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Icon system
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              78-icon library shipping in the brand assets folder. Every
              icon uses the same two-tone treatment: deep navy primary +
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                sognos-blue-accent
              </code>
              highlight. Six samples shown below &mdash; identical style
              across all 78.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:gap-4">
            {ICONS.map((n) => (
              <div
                key={n}
                className="flex aspect-square items-center justify-center rounded border border-sognos-line bg-white p-6"
              >
                <Image
                  src={`/brand-assets/icons/icon-${n}.png`}
                  alt=""
                  width={160}
                  height={160}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-sognos-muted">
            Colour · Gradient Circle · white-blue-no-background variants
            all exist in the source folder. The Icons_Colour set is the
            primary treatment for light surfaces.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 6 — Gradients */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 6
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Gradients
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Master brand gradient (electric blue &rarr; deep navy)
              anchors hero surfaces. Each sub-brand ships its own gradient
              variant &mdash; Care leans deeper navy, Roster stays in the
              blue family, Genogram introduces magenta. Per CLAUDE.md
              gradients are permitted only on hero and deliberate
              highlight surfaces &mdash; not on standard cards or
              subcards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
            {GRADIENTS.map((g) => (
              <div
                key={g.name}
                className="flex flex-col overflow-hidden rounded border border-sognos-line"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-sognos-line bg-white p-4">
                  <p className="font-heading text-sm font-medium text-sognos-heading">
                    {g.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-sognos-muted">
                    {g.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 7 — Product colours (merged from /style-guide) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 7
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Product colours
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Each product has one dark surface, one base accent, and one
              approved gradient. Product components derive their identity
              from this three-token family. Values reconciled against
              live
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                app/tokens.css
              </code>
              &mdash; the root style-guide page has stale hex for Care
              base and Roster dark.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
            {PRODUCTS.map((p) => (
              <article
                key={p.name}
                className="overflow-hidden rounded border border-sognos-line"
              >
                {/* Gradient hero band — pulled from live CSS var */}
                <div
                  className="relative flex min-h-40 flex-col justify-between p-6 text-white"
                  style={{ backgroundImage: `var(${p.gradient})` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ backgroundColor: p.base.hex }}
                  />
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/65">
                    Product identity
                  </p>
                  <div>
                    <h3 className="font-heading text-2xl font-medium text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-white/60">
                      {p.gradient}
                    </p>
                  </div>
                </div>

                {/* Dark + base tokens */}
                <div className="grid grid-cols-2 divide-x divide-sognos-line border-t border-sognos-line">
                  {[p.dark, p.base].map((t, i) => (
                    <div key={t.token} className="p-4">
                      <div
                        className="mb-3 h-10 rounded border border-sognos-line"
                        style={{ backgroundColor: t.hex }}
                      />
                      <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                        {i === 0 ? "Dark" : "Base"}
                      </p>
                      <p className="mt-1 font-mono text-xs uppercase text-sognos-heading">
                        {t.hex}
                      </p>
                      <p className="mt-1 break-all font-mono text-[10px] leading-relaxed text-sognos-muted">
                        {t.token}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 8 — Edition colours */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 8
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              SognosCare editions
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Six semantic edition pairs. Base carries identity; dark
              variant supports stronger section contrast (white text on
              dark).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {EDITIONS.map((e) => (
              <article
                key={e.label}
                className="overflow-hidden rounded border border-sognos-line bg-white"
              >
                <div className="grid h-24 grid-cols-2">
                  <div
                    className="flex items-end p-4"
                    style={{ backgroundColor: e.base }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-sognos-heading/70">
                      Base
                    </span>
                  </div>
                  <div
                    className="flex items-end p-4"
                    style={{ backgroundColor: e.dark }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/85">
                      Dark
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-heading text-sm font-medium text-sognos-heading">
                    {e.label}
                  </p>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] text-sognos-muted">
                        --sognos-edition-{e.token}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-sognos-heading">
                        {e.base}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] text-sognos-muted">
                        --sognos-edition-{e.token}-dark
                      </span>
                      <span className="font-mono text-[10px] uppercase text-sognos-heading">
                        {e.dark}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 9 — Radius */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 9
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Radius
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Current rules only per CLAUDE.md &sect;2.
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                rounded
              </code>
              (4px) is the default;
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                md
              </code>
              /
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                lg
              </code>
              require justification.
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                xl
              </code>
              /
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                2xl
              </code>
              /
              <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono text-sm">
                3xl
              </code>
              and arbitrary values are phased out and omitted from this
              guide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {RADII.map((r) => (
              <article
                key={r.className}
                className="border border-sognos-line bg-white p-5"
                style={{ borderRadius: r.px }}
              >
                <div
                  className="h-20 bg-sognos-navy"
                  style={{ borderRadius: r.px }}
                />
                <p className="mt-4 font-heading text-sm font-medium text-sognos-heading">
                  {r.name}
                </p>
                <p className="mt-1 font-mono text-xs text-sognos-muted">
                  {r.className} · {r.px}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-sognos-muted">
                  {r.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 10 — Layout */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 10
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Layout
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Anchors for site-wide width and rhythm. Reconciled against
              CLAUDE.md &sect;2 &mdash; the root guide lists
              container 1380px and nav 64px, both stale (live values are
              1280 and 80).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {LAYOUT.map((l) => (
              <article
                key={l.name}
                className="flex flex-col justify-between rounded border border-sognos-line bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  {l.name}
                </p>
                <p className="mt-6 font-heading text-2xl font-medium tabular-nums text-sognos-blue-accent">
                  {l.value}
                </p>
                <p className="mt-2 font-mono text-[10px] text-sognos-muted">
                  {l.token}
                </p>
                <p className="mt-1 font-mono text-[10px] text-sognos-heading">
                  {l.note}
                </p>
              </article>
            ))}
          </div>

          {/* Container visualization — matches the root guide's mental
              model without copying its `rounded-lg bg-gray-50` chrome. */}
          <div className="mt-10 overflow-hidden rounded border border-sognos-line bg-sognos-tint p-4 sm:p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
              Container · 1280px · px-6 · gap-3 lg:gap-4
            </p>
            <div className="mx-auto max-w-full border-x border-dashed border-sognos-blue-accent/50 bg-white px-6 py-10">
              <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex min-h-24 items-end rounded bg-sognos-navy p-4 text-white"
                  >
                    <span className="text-sm font-medium">
                      Column {String(n).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 11 — Components */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 11
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Component foundations
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Buttons, pills, and content cards. Semantic colours, border
              logic, and radius all derive from the tokens above &mdash;
              no shadows on any surface (phased out per CLAUDE.md).
            </p>
          </div>

          {/* Row 1 — hero actions + status pills */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Hero actions
              </p>
              <div className="rounded bg-sognos-navy px-6 py-8">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    className="group/demo relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300"
                  >
                    <span className="absolute bottom-0 left-0 h-40 w-full origin-bottom translate-y-full rounded-[50px] bg-sognos-blue-accent transition-transform duration-300 ease-out group-hover/demo:translate-y-12" />
                    <span className="relative z-10 transition-colors duration-300 group-hover/demo:text-white">
                      Book a Demo
                    </span>
                  </button>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
                  >
                    Explore products
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
                <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/55">
                  Primary is a white pill with bottom-up blue-accent fill
                  on hover. Secondary is a text link. Both live on
                  <code className="mx-1 font-mono text-xs text-white/80">
                    bg-sognos-navy
                  </code>
                  hero surfaces.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Labels and states
              </p>
              <div className="flex flex-wrap items-center gap-2 rounded border border-sognos-line bg-white p-6">
                <span className="rounded-full bg-sognos-navy px-3 py-1.5 text-xs font-medium text-white">
                  SognosCare
                </span>
                <span className="rounded-full bg-sognos-blue-accent/10 px-3 py-1.5 text-xs font-medium text-sognos-blue-accent">
                  Upcoming event
                </span>
                <span className="rounded bg-[var(--sognos-success-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-success)]">
                  Live
                </span>
                <span className="rounded bg-[var(--sognos-warning-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-warning)]">
                  Pending
                </span>
                <span className="rounded bg-[var(--sognos-error-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-error)]">
                  Error
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-sognos-muted">
                Rounded-full for identity chips &middot; rounded (4px)
                for status pills.
              </p>
            </div>
          </div>

          {/* Row 2 — card variants (default / accent / dark) */}
          <p className="mt-10 mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
            Card variants
          </p>
          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {[
              {
                eyebrow: "Default card",
                title: "One platform. Clear operational context.",
                body: "White surface, sognos-line border, no decorative shadow.",
                surface: "bg-white",
                dark: false,
              },
              {
                eyebrow: "Accent card",
                title: "Actions remain easy to find.",
                body: "The blue accent is reserved for interaction, emphasis, and active state.",
                surface: "bg-sognos-blue-accent",
                dark: true,
              },
              {
                eyebrow: "Dark card",
                title: "High contrast for decisive moments.",
                body: "Navy surfaces pair with white content and restrained opacity steps.",
                surface: "bg-sognos-navy",
                dark: true,
              },
            ].map((c) => (
              <article
                key={c.eyebrow}
                className={`flex min-h-60 flex-col justify-between rounded border border-sognos-line p-6 ${c.surface}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-widest ${
                    c.dark ? "text-white/65" : "text-sognos-muted"
                  }`}
                >
                  {c.eyebrow}
                </p>
                <div>
                  <h3
                    className={`font-heading text-xl font-medium leading-snug tracking-tight ${
                      c.dark ? "text-white" : "text-sognos-heading"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      c.dark ? "text-white/70" : "text-sognos-muted"
                    }`}
                  >
                    {c.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 12 — Image treatments */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 12
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Image treatments
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Two photography references + two container treatments. The
              first two cards apply the signature wave mask to the print
              collateral&rsquo;s Style 1 photography (Field / Care), revealing
              the bg-sognos-navy backdrop. Cards three and four demonstrate
              the container treatments
              (rounded rect, full-bleed).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
            {IMAGE_TREATMENTS.map((t) => (
              <article
                key={t.name}
                className="overflow-hidden rounded border border-sognos-line bg-white"
              >
                {/* Preview — image sits on navy backdrop so any mask
                    cutaways read as intentional negative space against
                    brand. */}
                <div
                  className={`relative ${
                    t.previewClassName ?? "aspect-[16/10]"
                  } w-full overflow-hidden bg-sognos-navy`}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={t.style}
                  >
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Meta + implementation snippet */}
                <div className="border-t border-sognos-line p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                    {t.name}
                  </p>
                  <p className="mt-1 font-heading text-base font-medium text-sognos-heading">
                    {t.subtitle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-sognos-muted">
                    {t.note}
                  </p>
                  <pre className="mt-3 overflow-x-auto whitespace-pre rounded bg-sognos-tint px-3 py-2 font-mono text-[10px] leading-relaxed text-sognos-heading">
                    {t.snippet}
                  </pre>
                </div>
              </article>
            ))}
          </div>

          {/* Wave mask demo — real SVG mask from
              /brand-assets/waves/mask.svg applied via CSS mask-image.
              Aspect ratio locked to the mask's native 1217×631 viewBox
              so the wave shape reads accurately without stretching.
              One brand-style healthcare photograph shown behind the
              mask; navy backdrop reveals where the mask hides
              the image. */}
          <div className="mt-6 overflow-hidden rounded border border-sognos-line bg-white">
            <div className="relative aspect-[1217/631] w-full overflow-hidden bg-sognos-navy">
              <div
                className="absolute inset-0"
                style={{
                  // Inverted: XOR the wave mask against a solid-white
                  // base so the visible/hidden areas of the mask.svg
                  // flip. Wave shape now HIDES the image; surround
                  // shows.
                  WebkitMaskImage:
                    "url(/brand-assets/waves/mask.svg), linear-gradient(#fff, #fff)",
                  maskImage:
                    "url(/brand-assets/waves/mask.svg), linear-gradient(#fff, #fff)",
                  WebkitMaskSize: "100% 100%, 100% 100%",
                  maskSize: "100% 100%, 100% 100%",
                  WebkitMaskRepeat: "no-repeat, no-repeat",
                  maskRepeat: "no-repeat, no-repeat",
                  WebkitMaskPosition: "center, center",
                  maskPosition: "center, center",
                  maskMode: "luminance, luminance",
                  WebkitMaskComposite: "source-out",
                  maskComposite: "exclude",
                }}
              >
                <Image
                  src="/brand-assets/photos/28.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="border-t border-sognos-line p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                Wave &middot; SVG mask
              </p>
              <p className="mt-1 font-heading text-base font-medium text-sognos-heading">
                Real brand asset applied to 1 photograph guide
              </p>
              <p className="mt-2 text-xs leading-relaxed text-sognos-muted">
                Sourced from
                <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono">
                  /brand-assets/waves/mask.svg
                </code>
                via CSS
                <code className="mx-1 rounded bg-sognos-tint px-1.5 py-0.5 font-mono">
                  mask-image
                </code>
                . Container aspect locked to the mask&rsquo;s native
                1217&thinsp;&times;&thinsp;631 viewBox so the wave
                shape reads accurately. Navy backdrop shows
                through where the mask hides the image.
              </p>
              <pre className="mt-3 overflow-x-auto whitespace-pre rounded bg-sognos-tint px-3 py-2 font-mono text-[10px] leading-relaxed text-sognos-heading">
{`/* Inverted mask — XOR against solid white
   so wave shape hides, surround shows. */
mask-image:
  url(/brand-assets/waves/mask.svg),
  linear-gradient(#fff, #fff);
mask-size: 100% 100%, 100% 100%;
mask-repeat: no-repeat, no-repeat;
mask-mode: luminance, luminance;
mask-composite: exclude;
-webkit-mask-composite: source-out;`}
              </pre>
            </div>
          </div>

          {/* Application matrix — quick section-by-section reference */}
          <div className="mt-10 rounded border border-sognos-line bg-sognos-tint p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              Application matrix
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-sognos-line/70 text-xs uppercase tracking-widest text-sognos-muted">
                    <th className="pb-3 pr-4 font-semibold">Section</th>
                    <th className="pb-3 pr-4 font-semibold">Treatment</th>
                    <th className="pb-3 font-semibold">Aspect</th>
                  </tr>
                </thead>
                <tbody className="text-sognos-body">
                  <tr className="border-b border-sognos-line/50">
                    <td className="py-3 pr-4 font-medium text-sognos-heading">
                      Hero + covers
                    </td>
                    <td className="py-3 pr-4">Wave</td>
                    <td className="py-3 font-mono text-xs">16 : 9</td>
                  </tr>
                  <tr className="border-b border-sognos-line/50">
                    <td className="py-3 pr-4 font-medium text-sognos-heading">
                      Content page &middot; header photo
                    </td>
                    <td className="py-3 pr-4">Corner cut</td>
                    <td className="py-3 font-mono text-xs">4 : 3</td>
                  </tr>
                  <tr className="border-b border-sognos-line/50">
                    <td className="py-3 pr-4 font-medium text-sognos-heading">
                      Feature grid card
                    </td>
                    <td className="py-3 pr-4">Rounded rect</td>
                    <td className="py-3 font-mono text-xs">1 : 1</td>
                  </tr>
                  <tr className="border-b border-sognos-line/50">
                    <td className="py-3 pr-4 font-medium text-sognos-heading">
                      Editorial spread &middot; article body
                    </td>
                    <td className="py-3 pr-4">Full-bleed</td>
                    <td className="py-3 font-mono text-xs">1 : 1 / 3 : 4</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-sognos-heading">
                      Team &middot; testimonial avatar
                    </td>
                    <td className="py-3 pr-4">Rounded rect (16 px)</td>
                    <td className="py-3 font-mono text-xs">1 : 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-sognos-muted">
              Mobile fallback: any wave or corner-cut treatment softens
              to standard{" "}
              <code className="rounded bg-white px-1 font-mono">rounded</code>{" "}
              (4 px) under 640 px &mdash; the shapes read cluttered at
              small widths.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Element 13 — Photography library */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
              &sect; 13
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Photography library
            </h2>
            <p className="mt-3 max-w-2xl text-base text-sognos-body">
              Sample set of {PHOTO_LIBRARY.length} photos representing
              the brand&rsquo;s Style 1 aesthetic &mdash; real people,
              on-site light, subjects across healthcare, field service,
              and editorial contexts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
            {PHOTO_LIBRARY.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded border border-sognos-line bg-sognos-tint"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
