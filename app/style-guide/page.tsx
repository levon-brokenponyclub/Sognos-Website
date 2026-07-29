import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design System | Sognos",
  description:
    "The current Sognos design tokens, typography, surfaces, and component foundations.",
};

type ColorToken = {
  name: string;
  value: string;
  note: string;
  text?: "light" | "dark";
};

type ScaleToken = {
  name: string;
  value: string;
  token: string;
};

const NAV_ITEMS = [
  { id: "core-colours", label: "Core colours" },
  { id: "product-colours", label: "Products" },
  { id: "edition-colours", label: "Editions" },
  { id: "typography", label: "Typography" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "layout", label: "Layout" },
  { id: "components", label: "Components" },
] as const;

const CORE_COLOURS: ColorToken[] = [
  {
    name: "--sognos-navy-darkest",
    value: "#060e28",
    note: "Deepest CTA and modal surface",
    text: "light",
  },
  {
    name: "--sognos-navy-dark",
    value: "#0f1936",
    note: "Dark product and content surface",
    text: "light",
  },
  {
    name: "--sognos-navy",
    value: "#152248",
    note: "Primary brand surface",
    text: "light",
  },
  {
    name: "--sognos-blue-accent",
    value: "#1d96fc",
    note: "Primary action and active state",
    text: "light",
  },
  {
    name: "--sognos-heading",
    value: "#0f1936",
    note: "Heading text",
    text: "light",
  },
  {
    name: "--sognos-body",
    value: "#152248",
    note: "Body text",
    text: "light",
  },
  {
    name: "--sognos-muted",
    value: "#68706f",
    note: "Secondary text and metadata",
    text: "light",
  },
  {
    name: "--sognos-line",
    value: "#e2e8f0",
    note: "Borders and dividers",
    text: "dark",
  },
];

const PRODUCT_COLOURS = [
  {
    product: "SognosCare",
    dark: { name: "--sognos-care-dark", value: "#0f1936" },
    base: { name: "--sognos-care-base", value: "#122e58" },
    gradient: "--sognos-care-gradient",
  },
  {
    product: "SognosRoster",
    dark: { name: "--sognos-roster-dark", value: "#191e41" },
    base: { name: "--sognos-roster-base", value: "#59bbf7" },
    gradient: "--sognos-roster-gradient",
  },
  {
    product: "SognosGenogram",
    dark: { name: "--sognos-genogram-dark", value: "#250438" },
    base: { name: "--sognos-genogram-base", value: "#91278c" },
    gradient: "--sognos-genogram-gradient",
  },
] as const;

const EDITION_COLOURS = [
  {
    label: "Residential Aged Care",
    base: {
      name: "--sognos-edition-aged-care",
      value: "#caa4ff",
    },
    dark: {
      name: "--sognos-edition-aged-care-dark",
      value: "#af82f0",
    },
  },
  {
    label: "Allied Health",
    base: {
      name: "--sognos-edition-allied-health",
      value: "#ffad6e",
    },
    dark: {
      name: "--sognos-edition-allied-health-dark",
      value: "#f38c3d",
    },
  },
  {
    label: "Support at Home",
    base: {
      name: "--sognos-edition-support-at-home",
      value: "#ff8e90",
    },
    dark: {
      name: "--sognos-edition-support-at-home-dark",
      value: "#ef6a6c",
    },
  },
  {
    label: "Hospital in the Home",
    base: {
      name: "--sognos-edition-hospital-in-the-home",
      value: "#cbdd61",
    },
    dark: {
      name: "--sognos-edition-hospital-in-the-home-dark",
      value: "#9aad2c",
    },
  },
  {
    label: "Child & Family Services",
    base: {
      name: "--sognos-edition-child-and-family-services",
      value: "#ff7dbc",
    },
    dark: {
      name: "--sognos-edition-child-and-family-services-dark",
      value: "#e95ca0",
    },
  },
  {
    label: "Disability & Mental Health",
    base: {
      name: "--sognos-edition-disability",
      value: "#00a98f",
    },
    dark: {
      name: "--sognos-edition-disability-dark",
      value: "#039b84",
    },
  },
] as const;

const TYPE_SCALE: ScaleToken[] = [
  { name: "Display", value: "5.5rem / 1.03", token: "text-8xl" },
  { name: "Hero", value: "4.5rem / 1.05", token: "text-7xl" },
  { name: "H1", value: "3.75rem / 1.05", token: "text-6xl" },
  { name: "H2 large", value: "3rem / 1.1", token: "text-5xl" },
  { name: "H2", value: "2.25rem / 1.15", token: "text-4xl" },
  { name: "H3", value: "1.875rem / 1.2", token: "text-3xl" },
  { name: "H4", value: "1.5rem / 1.3", token: "text-2xl" },
  { name: "Lead", value: "1.125rem / 1.6", token: "text-lg" },
  { name: "Body", value: "1rem / 1.5rem", token: "text-base" },
  { name: "Small", value: "0.875rem / 1.25rem", token: "text-sm" },
  { name: "Label", value: "0.75rem / 1rem", token: "text-xs" },
];

const RADII: ScaleToken[] = [
  { name: "Small", value: "0.25rem", token: "--sognos-radius-sm" },
  { name: "Medium", value: "0.375rem", token: "--sognos-radius-md" },
  { name: "Large", value: "0.5rem", token: "--sognos-radius-lg" },
  { name: "Extra large", value: "0.75rem", token: "--sognos-radius-xl" },
  { name: "2XL", value: "1rem", token: "--sognos-radius-2xl" },
  { name: "3XL", value: "28px", token: "--sognos-radius-3xl" },
  { name: "Pill", value: "9999px", token: "--sognos-radius-full" },
];

const SHADOWS: ScaleToken[] = [
  {
    name: "Small",
    value: "0 1px 3px rgb(5 32 72 / 0.08)",
    token: "--sognos-shadow-sm",
  },
  {
    name: "Medium",
    value: "0 8px 24px rgb(5 32 72 / 0.08)",
    token: "--sognos-shadow-md",
  },
  {
    name: "Large",
    value: "0 20px 48px rgb(5 32 72 / 0.1)",
    token: "--sognos-shadow-lg",
  },
  {
    name: "Extra large",
    value: "0 24px 60px rgb(5 32 72 / 0.12)",
    token: "--sognos-shadow-xl",
  },
];

const LAYOUT_TOKENS: ScaleToken[] = [
  {
    name: "Container width",
    value: "1380px",
    token: "--sognos-container-width",
  },
  {
    name: "Section padding",
    value: "88px",
    token: "--sognos-section-padding",
  },
  {
    name: "Card padding",
    value: "24px",
    token: "--sognos-card-padding",
  },
  {
    name: "Navigation height",
    value: "64px",
    token: "--sognos-nav-height",
  },
];

const WEIGHTS: ScaleToken[] = [
  { name: "Regular", value: "400", token: "--sognos-font-weight-regular" },
  { name: "Medium", value: "500", token: "--sognos-font-weight-medium" },
  { name: "Semibold", value: "600", token: "--sognos-font-weight-semibold" },
  { name: "Bold", value: "700", token: "--sognos-font-weight-bold" },
];

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 border-t border-sognos-line py-14 lg:py-18"
    >
      <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium leading-tight tracking-tight text-sognos-heading md:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-2xl self-end text-base leading-relaxed text-sognos-muted">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function TokenName({ children }: { children: ReactNode }) {
  return (
    <code className="break-all font-mono text-[11px] leading-relaxed text-sognos-muted">
      {children}
    </code>
  );
}

function ColourSwatch({ token }: { token: ColorToken }) {
  const lightText = token.text === "light";

  return (
    <article className="overflow-hidden rounded-lg border border-sognos-line bg-white">
      <div
        className={[
          "flex aspect-[5/3] flex-col justify-between p-5",
          lightText ? "text-white" : "text-sognos-heading",
        ].join(" ")}
        style={{ backgroundColor: `var(${token.name})` }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
          {token.value}
        </span>
        <span className="text-sm font-medium">{token.note}</span>
      </div>
      <div className="px-4 py-3">
        <TokenName>{token.name}</TokenName>
      </div>
    </article>
  );
}

function ProductTokenCard({
  product,
  dark,
  base,
  gradient,
}: (typeof PRODUCT_COLOURS)[number]) {
  return (
    <article className="overflow-hidden rounded-lg border border-sognos-line bg-white">
      <div
        className="relative flex min-h-64 flex-col justify-between overflow-hidden p-6 text-white"
        style={{ backgroundImage: `var(${gradient})` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: `var(${base.name})` }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-widest text-white/65">
          Product identity
        </p>
        <div className="relative">
          <h3 className="font-heading text-3xl font-medium text-white">
            {product}
          </h3>
          <p className="mt-2 text-sm text-white/70">{gradient}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-sognos-line">
        {[dark, base].map((token) => (
          <div key={token.name} className="p-4">
            <div
              className="mb-3 h-10 rounded-md border border-black/5"
              style={{ backgroundColor: `var(${token.name})` }}
            />
            <p className="text-xs font-medium text-sognos-heading">
              {token.value}
            </p>
            <TokenName>{token.name}</TokenName>
          </div>
        ))}
      </div>
    </article>
  );
}

function EditionTokenCard({
  label,
  base,
  dark,
}: (typeof EDITION_COLOURS)[number]) {
  return (
    <article className="overflow-hidden rounded-lg border border-sognos-line bg-white">
      <div className="grid h-32 grid-cols-2">
        <div
          className="p-4"
          style={{ backgroundColor: `var(${base.name})` }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-sognos-heading/70">
            Base
          </span>
        </div>
        <div
          className="p-4"
          style={{ backgroundColor: `var(${dark.name})` }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-sognos-heading/70">
            Dark
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium text-sognos-heading">{label}</h3>
        <div className="mt-3 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <TokenName>{base.name}</TokenName>
            <span className="shrink-0 font-mono text-[11px] text-sognos-muted">
              {base.value}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <TokenName>{dark.name}</TokenName>
            <span className="shrink-0 font-mono text-[11px] text-sognos-muted">
              {dark.value}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function MetricCard({ item }: { item: ScaleToken }) {
  return (
    <article className="rounded-lg border border-sognos-line bg-white p-5">
      <p className="text-sm font-medium text-sognos-heading">{item.name}</p>
      <p className="mt-6 font-heading text-3xl font-medium text-sognos-blue-accent">
        {item.value}
      </p>
      <div className="mt-2">
        <TokenName>{item.token}</TokenName>
      </div>
    </article>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen bg-white text-sognos-body">
      <header className="bg-sognos-navy px-6 pt-16 pb-14 text-white lg:pt-20 lg:pb-18">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                State of record · 24 July 2026
              </p>
              <h1 className="mt-5 max-w-4xl font-heading text-5xl font-normal leading-tight tracking-tight text-white md:text-6xl">
                Sognos Design System
              </h1>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/70 lg:justify-self-end">
              The live semantic tokens and shared visual foundations defined in
              <code className="mx-1 font-mono text-sm text-white">
                app/tokens.css
              </code>
              and mapped through Tailwind v4.
            </p>
          </div>
        </div>
      </header>

      <div className="border-b border-sognos-line bg-white">
        <nav
          aria-label="Style guide sections"
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-3 scrollbar-hide"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-sognos-muted transition-colors hover:bg-gray-100 hover:text-sognos-heading"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Section
          id="core-colours"
          eyebrow="Foundation"
          title="Core colours"
          description="The lean semantic palette used by production marketing surfaces. Core tokens describe intent; primitive palette names should not be introduced into new component APIs."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {CORE_COLOURS.map((token) => (
              <ColourSwatch key={token.name} token={token} />
            ))}
          </div>
        </Section>

        <Section
          id="product-colours"
          eyebrow="Identity"
          title="Product colours"
          description="Each product has one dark surface, one base accent, and one approved gradient. Product components should derive their visual identity from this three-token family."
        >
          <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
            {PRODUCT_COLOURS.map((product) => (
              <ProductTokenCard key={product.product} {...product} />
            ))}
          </div>
        </Section>

        <Section
          id="edition-colours"
          eyebrow="SognosCare"
          title="Edition colours"
          description="The six semantic edition pairs replace the legacy green, orange, coral, and purple model. Base values carry identity; dark variants support stronger section contrast."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 lg:gap-4">
            {EDITION_COLOURS.map((edition) => (
              <EditionTokenCard key={edition.label} {...edition} />
            ))}
          </div>
        </Section>

        <Section
          id="typography"
          eyebrow="Type system"
          title="Typography"
          description="AngelList is the current sans and heading family. The Tailwind type scale remains the shared size source, while heading leading, tracking, and weight are controlled by Sognos tokens."
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
            <div className="divide-y divide-sognos-line border-y border-sognos-line">
              {TYPE_SCALE.map((item, index) => {
                const sampleClasses = [
                  "text-8xl",
                  "text-7xl",
                  "text-6xl",
                  "text-5xl",
                  "text-4xl",
                  "text-3xl",
                  "text-2xl",
                  "text-lg",
                  "text-base",
                  "text-sm",
                  "text-xs",
                ];

                return (
                  <div
                    key={item.name}
                    className="grid gap-4 py-5 sm:grid-cols-[130px_1fr] sm:items-baseline"
                  >
                    <div>
                      <p className="text-sm font-medium text-sognos-heading">
                        {item.name}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-sognos-muted">
                        {item.token} · {item.value}
                      </p>
                    </div>
                    <p
                      className={`${sampleClasses[index]} overflow-hidden font-heading font-normal tracking-heading text-sognos-heading`}
                    >
                      Sognos
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="border-l-2 border-sognos-blue-accent pl-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  Heading defaults
                </p>
                <p className="mt-4 font-heading text-4xl font-normal leading-heading tracking-heading text-sognos-heading">
                  Clear hierarchy for complex service operations.
                </p>
                <p className="mt-5 text-base leading-relaxed text-sognos-body">
                  Body copy uses the same family with a relaxed measure and
                  standard semantic text colours.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                {WEIGHTS.map((weight) => (
                  <article
                    key={weight.name}
                    className="rounded-lg border border-sognos-line p-4"
                  >
                    <p
                      className="text-2xl text-sognos-heading"
                      style={{ fontWeight: Number(weight.value) }}
                    >
                      Aa
                    </p>
                    <p className="mt-3 text-sm font-medium text-sognos-heading">
                      {weight.name}
                    </p>
                    <TokenName>
                      {weight.value} · {weight.token}
                    </TokenName>
                  </article>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-sognos-line p-5">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-sognos-muted">
                      Heading line height
                    </dt>
                    <dd className="font-mono text-xs text-sognos-heading">
                      1.05
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-sognos-muted">
                      Heading tracking
                    </dt>
                    <dd className="font-mono text-xs text-sognos-heading">
                      -0.02em
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-sognos-muted">Eyebrow size</dt>
                    <dd className="font-mono text-xs text-sognos-heading">
                      0.8rem
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-sognos-muted">
                      Compact text size
                    </dt>
                    <dd className="font-mono text-xs text-sognos-heading">
                      0.85rem
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="radius"
          eyebrow="Shape"
          title="Radius"
          description="All component radii derive from this scale. Standard production cards use the 8px large token; pills and circular controls use the full token."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {RADII.map((radius) => (
              <article
                key={radius.token}
                className="border border-sognos-line bg-white p-5"
                style={{ borderRadius: `var(${radius.token})` }}
              >
                <div
                  className="h-24 bg-sognos-navy"
                  style={{ borderRadius: `var(${radius.token})` }}
                />
                <p className="mt-4 text-sm font-medium text-sognos-heading">
                  {radius.name}
                </p>
                <p className="mt-1 font-mono text-[11px] text-sognos-muted">
                  {radius.value}
                </p>
                <TokenName>{radius.token}</TokenName>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="shadows"
          eyebrow="Elevation"
          title="Shadows"
          description="The scale is reserved for floating controls, overlays, drawers, and modal surfaces. Standard content cards should generally rely on border and surface contrast."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {SHADOWS.map((shadow) => (
              <article
                key={shadow.token}
                className="rounded-lg border border-sognos-line/60 bg-white p-6"
                style={{ boxShadow: `var(${shadow.token})` }}
              >
                <div className="mb-12 h-1 w-10 bg-sognos-blue-accent" />
                <p className="text-sm font-medium text-sognos-heading">
                  {shadow.name}
                </p>
                <p className="mt-1 line-clamp-2 min-h-8 font-mono text-[10px] leading-relaxed text-sognos-muted">
                  {shadow.value}
                </p>
                <TokenName>{shadow.token}</TokenName>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="layout"
          eyebrow="Spatial system"
          title="Layout"
          description="These values anchor the site-wide content width and primary spacing rhythm. Tailwind utilities may express responsive variants, but they should resolve back to these foundations."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {LAYOUT_TOKENS.map((item) => (
              <MetricCard key={item.token} item={item} />
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-sognos-line bg-gray-50 p-4 sm:p-6">
            <div className="mx-auto max-w-full border-x border-dashed border-sognos-blue-accent/50 bg-white px-6 py-10">
              <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-32 items-end rounded-lg bg-sognos-navy p-5 text-white"
                  >
                    <span className="text-sm font-medium">
                      Column {String(item).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="components"
          eyebrow="Component family"
          title="Shared component foundations"
          description="Buttons, badges, controls, and content cards share the same semantic colours, border logic, and radius scale. These samples reflect the current production family."
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-sognos-muted">
                Hero actions
              </h3>
              <div className="mt-5 rounded-lg bg-sognos-navy px-6 py-8">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    className="group/demo relative overflow-hidden rounded-sm bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300"
                  >
                    <span className="absolute bottom-0 left-0 h-40 w-full origin-bottom translate-y-full rounded-[50px] bg-sognos-blue-accent transition-transform duration-300 ease-out group-hover/demo:translate-y-12" />
                    <span className="relative z-10 transition-colors duration-300 group-hover/demo:text-white">
                      Book a Demo
                    </span>
                  </button>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
                  >
                    Explore products
                    <span aria-hidden="true">&#8599;</span>
                  </Link>
                </div>
                <div className="mt-6 border-t border-white/15 pt-4">
                  <p className="text-xs leading-relaxed text-white/55">
                    White primary surface with a bottom-up blue accent fill;
                    secondary navigation remains a lightweight text link.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-sognos-muted">
                Labels and states
              </h3>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sognos-navy px-3 py-1.5 text-xs font-medium text-white">
                  SognosCare
                </span>
                <span className="rounded-full bg-sognos-blue-accent/10 px-3 py-1.5 text-xs font-medium text-sognos-blue-accent">
                  Upcoming event
                </span>
                <span className="rounded-md bg-[var(--sognos-success-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-success)]">
                  Live
                </span>
                <span className="rounded-md bg-[var(--sognos-warning-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-warning)]">
                  Pending
                </span>
                <span className="rounded-md bg-[var(--sognos-error-light)] px-2.5 py-1 text-xs font-medium text-[var(--sognos-error)]">
                  Error
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3 lg:gap-4">
            {[
              {
                eyebrow: "Default card",
                title: "One platform. Clear operational context.",
                body: "White surface, Sognos line border, large radius, and no decorative shadow.",
                className: "bg-white",
              },
              {
                eyebrow: "Accent card",
                title: "Actions remain easy to find.",
                body: "The blue accent is reserved for interaction, emphasis, and active state.",
                className: "bg-sognos-blue-accent text-white",
              },
              {
                eyebrow: "Dark card",
                title: "High contrast for decisive moments.",
                body: "Navy surfaces pair with white content and restrained opacity steps.",
                className: "bg-sognos-navy text-white",
              },
            ].map((card) => {
              const dark = card.className.includes("text-white");

              return (
                <article
                  key={card.eyebrow}
                  className={`flex min-h-72 flex-col justify-between rounded-lg border border-sognos-line p-6 ${card.className}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      dark ? "text-white/65" : "text-sognos-muted"
                    }`}
                  >
                    {card.eyebrow}
                  </p>
                  <div>
                    <h3
                      className={`font-heading text-2xl font-medium leading-snug ${
                        dark ? "text-white" : "text-sognos-heading"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        dark ? "text-white/70" : "text-sognos-muted"
                      }`}
                    >
                      {card.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      </div>

      <footer className="bg-sognos-navy-darkest px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">Sognos Design System</p>
          <p className="font-mono text-xs text-white/55">
            Source: app/tokens.css · Tailwind v4
          </p>
        </div>
      </footer>
    </main>
  );
}
