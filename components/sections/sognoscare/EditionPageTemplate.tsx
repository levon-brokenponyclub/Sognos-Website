import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";
import FlowCanvas from "@/components/ui/FlowCanvas";
import EditionCards from "@/components/sections/sognoscare/EditionCards";
import { SOGNOSCARE_EDITIONS } from "@/lib/constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

function flowColorsFromHex(hex: string): [string, string, string] {
  const [r, g, b] = hexToRgb(hex);
  const light = (c: number) => Math.round(Math.min(255, c + (255 - c) * 0.55));
  const dark = (c: number) => Math.round(Math.max(0, c * 0.4));
  return [
    `rgba(${light(r)}, ${light(g)}, ${light(b)}, 0.45)`,
    `rgba(${r}, ${g}, ${b}, 0.5)`,
    `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, 0.55)`,
  ];
}

// Edition name → white logo path (for dark hero background)
const EDITION_LOGOS: Record<string, string> = {
  "Allied Health": "/logos/sognoscare-edition-ahc-white.svg",
  "Disability & Mental Health": "/logos/sognoscare-edition-dmh-white.svg",
  "Residential Aged Care": "/logos/sognoscare-edition-rac-white.svg",
  "Support at Home": "/logos/sognoscare-edition-sah-white.svg",
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type Problem = {
  label: string;
  description: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type ProofQuote = {
  quote: string;
  attribution: string;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  // Optional rich-card fields (CustomerStories layout)
  company?: string;
  companySize?: string;
  industry?: string;
  logo?: string;
  panelImage?: string;
  panelVideo?: string;
  quote?: string;
  author?: string;
  role?: string;
};

export type EditionData = {
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  accentHex: string;
  accentTextClass: string;
  accentBgClass: string;
  accentBorderClass: string;
  problems: Problem[];
  features: Feature[];
  advantages: string[];
  aiTools: string[];
  proofQuotes: ProofQuote[];
  caseStudy: CaseStudy;
};

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero({ data }: { data: EditionData }) {
  const flowColors = flowColorsFromHex(data.accentHex);
  const logoSrc = EDITION_LOGOS[data.name];

  return (
    <section
      data-header-dark
      className="relative flex flex-col bg-white overflow-hidden text-white h-[100svh] lg:h-[100vh] p-2"
    >
      <div className="bg-gradient-hero h-full overflow-hidden text-white rounded-2xl relative">
        <FlowCanvas colors={flowColors} />

        {/* Accent radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 30% 0%, ${data.accentHex} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-8 lg:px-6 pt-25 sm:pt-27.5 lg:pt-25">
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-2 lg:px-0">
              {logoSrc && (
                <Image
                  src={logoSrc}
                  alt={`SognosCare for ${data.name}`}
                  width={150}
                  height={64}
                  priority
                  className="mb-14 h-10 w-auto lg:h-19"
                />
              )}
              <h1 className="text-3xl font-heading font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
                {data.tagline}
              </h1>
              {/* <p
                className="mt-4 text-base font-medium lg:text-lg"
                style={{ color: data.accentHex }}
              >
                {data.tagline}
              </p> */}
              <p className="mt-6 max-w-5xl text-balance text-lg text-white/80 lg:text-[22px]">
                {data.description}
              </p>
            </div>
          </div>

          {/* The problem — bottom-aligned card inside the hero */}
          <div className="relative z-10 pb-4 lg:pb-0">
            <div className="relative bg-white max-w-6xl flex justify-between items-center gap-14 mx-auto rounded-t-md px-8 py-7 pb-5">
              <div className="flex flex-col gap-2 max-w-xl">
                <h2 className="text-left font-heading text-2xl md:text-[22px] font-medium tracking-normal text-prussian-blue-800">
                  Built for {data.name}
                </h2>
                <p className="text-left text-base text-prussian-blue-800/75 text-balance">
                  {data.tagline}
                </p>
              </div>

              <div className="flex flex-row gap-2">
                <AnimatedButton href="/contact">Book a Demo</AnimatedButton>
                <Link
                  href="/products/sognoscare"
                  className="inline-flex items-start justify-center rounded-md px-8 py-3 font-medium text-prussian-blue-800 border border-white/0 transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  Back to SognosCare
                </Link>
              </div>

              {/* Concave curve transitions */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -left-[20px] h-[20px] w-[20px] bg-white"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 0% 0%, transparent 19px, black 20px)",
                  maskImage:
                    "radial-gradient(circle at 0% 0%, transparent 19px, black 20px)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -right-[20px] h-[20px] w-[20px] bg-white"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 100% 0%, transparent 19px, black 20px)",
                  maskImage:
                    "radial-gradient(circle at 100% 0%, transparent 19px, black 20px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: What it solves ──────────────────────────────────────────────────

function WhatItSolves({ data }: { data: EditionData }) {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            What it solves
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            What SognosCare Fixes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {data.problems.map((problem, i) => (
            <div
              key={problem.label}
              className={`p-8 border-t border-sognos-border-subtle ${
                i % 3 !== 2 ? "lg:border-r" : ""
              } ${i % 2 !== 1 ? "border-r sm:border-r lg:border-r-0" : ""} lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0`}
            >
              {/* Problem icon — numbered */}
              <span
                className="inline-block text-xs font-mono font-bold mb-3"
                style={{ color: data.accentHex }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-heading text-base font-semibold text-prussian-blue-800">
                {problem.label}
              </p>
              <p className="mt-1.5 text-sm text-sognos-text-body leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: data.accentHex }}
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Features ────────────────────────────────────────────────────────

function Features({ data }: { data: EditionData }) {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: `${data.accentHex}1a` }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left column — sticky, vertically centered in viewport */}
          <div className="lg:col-span-5 lg:sticky lg:top-1/2 lg:-translate-y-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
              Features
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-medium text-prussian-blue-800 tracking-tight mb-6">
              Core Features
            </h2>
            <p className="text-lg text-sognos-text-body leading-relaxed max-w-md">
              Purpose-built for {data.name.toLowerCase()} providers — every
              capability is engineered to remove friction from frontline service
              delivery.
            </p>
          </div>

          {/* Right column — numbered feature list with accent fill on hover */}
          <ul className="lg:col-span-7">
            {data.features.map((feature, i) => (
              <li
                key={feature.title}
                style={
                  {
                    "--accent": data.accentHex,
                    borderBottomColor: data.accentHex,
                  } as React.CSSProperties
                }
                className="group relative overflow-hidden border-b after:content-[''] after:absolute after:inset-x-0 after:-bottom-full after:h-full after:bg-[var(--accent)] after:transition-[bottom] after:duration-500 after:ease-out hover:after:bottom-0"
              >
                <div className="relative z-10 grid grid-cols-[auto_1fr] gap-6 lg:gap-10 py-8 lg:py-10 px-2 lg:px-4">
                  <span className="font-heading text-sm font-medium text-gray-400 group-hover:text-white/70 transition-colors duration-500 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-heading text-2xl lg:text-3xl font-medium tracking-tight text-prussian-blue-800 group-hover:text-white transition-colors duration-500">
                      {feature.title}
                    </h4>
                    <p className="mt-3 text-base text-sognos-text-body group-hover:text-white/85 transition-colors duration-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Advantages ──────────────────────────────────────────────────────

// Deterministic 8-cell pattern matching the reference image:
// row 1: white, accent, dark, dark
// row 2: dark, dark, accent, white
// Repeats every 8 cells.
type CellVariant = "white" | "dark" | "accent";
const ADVANTAGE_PATTERN: CellVariant[] = [
  "white",
  "accent",
  "dark",
  "dark",
  "dark",
  "dark",
  "accent",
  "white",
];

function Advantages({ data }: { data: EditionData }) {
  return (
    <section className="w-full bg-gray-200/70">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        {/* Heading */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Advantages
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-medium text-prussian-blue-800 tracking-tight">
            Key Advantages
          </h2>
        </div>

        {/* Block grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {data.advantages.map((adv, i) => {
            const variant = ADVANTAGE_PATTERN[i % ADVANTAGE_PATTERN.length];
            const isWhite = variant === "white";
            const isDark = variant === "dark";
            const isAccent = variant === "accent";

            return (
              <div
                key={adv}
                className={`rounded-lg p-6 lg:p-8 min-h-[180px] lg:min-h-[260px] flex ${
                  isWhite
                    ? "bg-white text-prussian-blue-800"
                    : isDark
                      ? "bg-prussian-blue-800 text-white"
                      : "text-white"
                }`}
                style={
                  isAccent ? { backgroundColor: data.accentHex } : undefined
                }
              >
                <p
                  className={`font-heading text-base lg:text-lg font-medium leading-snug ${
                    isWhite ? "text-prussian-blue-800" : "text-white"
                  }`}
                >
                  {adv}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Proof Stories ───────────────────────────────────────────────────

function QuoteIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-7 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProofStories({ data }: { data: EditionData }) {
  const cs = data.caseStudy;
  // Fallbacks: pull quote/author from proofQuotes if rich fields not provided
  const firstProof = data.proofQuotes[0];
  const quote = cs.quote ?? firstProof?.quote ?? cs.description;
  const attribution = cs.author ?? firstProof?.attribution ?? cs.eyebrow;
  // Author / role split: if rich author provided use cs.author + cs.role,
  // otherwise treat full attribution as the author and leave role blank.
  const author = cs.author ?? attribution;
  const role = cs.role ?? (cs.author ? "" : "");
  const industry = cs.industry ?? `SognosCare for ${data.name}`;
  const companySize = cs.companySize ?? "—";
  const company = cs.company ?? data.name;

  return (
    <section className="w-full bg-gray-200/70 overflow-hidden border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Section header */}
        <div className="mb-8 flex flex-col items-center lg:items-start gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: data.accentHex }}
            />
            Customers
          </div>
          <h2 className="text-3xl md:text-4xl text-prussian-blue-800 text-center lg:text-left font-heading font-medium tracking-tight">
            Customer Stories
          </h2>
        </div>

        {/* Card */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 min-w-0 bg-white rounded-lg p-2 h-auto lg:h-[500px]">
          {/* Left — image with logo + stats */}
          <div className="w-full lg:w-[40%] lg:shrink-0 relative rounded-lg overflow-hidden flex flex-col h-[260px] lg:h-auto bg-prussian-blue-800/10">
            {cs.panelVideo ? (
              <video
                src={cs.panelVideo}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : cs.panelImage ? (
              <Image
                src={cs.panelImage}
                alt={company}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 35vw"
              />
            ) : null}

            {/* White logo — centered */}
            {cs.logo && (
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <Image
                  src={cs.logo}
                  alt={company}
                  width={160}
                  height={56}
                  className="w-auto max-w-[220px] object-contain brightness-0 invert"
                />
              </div>
            )}

            {/* Stats — bottom */}
            <div className="relative z-10 mt-auto p-6 flex gap-8 justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mb-1">
                  Company Size
                </p>
                <p className="font-heading text-2xl font-medium leading-none tracking-tight text-white">
                  {companySize}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mb-1">
                  Industry
                </p>
                <p className="font-heading text-lg font-medium leading-snug tracking-tight text-white">
                  {industry}
                </p>
              </div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          </div>

          {/* Right — quote panel */}
          <div className="flex-1 bg-white rounded-lg p-5 lg:p-7 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <QuoteIcon className="text-prussian-blue-800/20" />
              <blockquote className="mt-4">
                <p className="font-heading text-lg lg:text-[26px] font-normal leading-snug tracking-tight text-prussian-blue-800">
                  {quote}
                </p>
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-semibold text-prussian-blue-800">
                  {author}
                </p>
                {role && (
                  <p className="text-sm mt-0.5 text-prussian-blue-800/75">
                    {role}
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 lg:mt-8 flex justify-center lg:justify-end">
              <Link
                href={cs.href}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-prussian-blue-800 text-prussian-blue-800 text-sm font-semibold hover:bg-prussian-blue-800/8 transition-colors"
              >
                Read case study
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-800 text-white shrink-0">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Related Editions ─────────────────────────────────────────────────────────

function RelatedEditions({ data }: { data: EditionData }) {
  // Filter out the current edition from SOGNOSCARE_EDITIONS
  const relatedEditions = SOGNOSCARE_EDITIONS.filter(
    (edition) => edition.label !== data.name,
  );

  return (
    <section className="w-full bg-gray-200">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Explore other editions
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            Other SognosCare Editions
          </h2>
        </div>

        {/* Editions slider */}
        <EditionCards editions={relatedEditions} />
      </div>
    </section>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function EditionPageTemplate({ data }: { data: EditionData }) {
  return (
    <main className="w-full bg-white">
      <Hero data={data} />
      <WhatItSolves data={data} />
      <Features data={data} />
      <Advantages data={data} />
      <ProofStories data={data} />
      <RelatedEditions data={data} />
    </main>
  );
}
