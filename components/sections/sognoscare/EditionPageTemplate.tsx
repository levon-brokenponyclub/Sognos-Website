import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="relative w-full min-h-[520px] overflow-hidden flex items-center">
      {/* Gradient bg */}
      <Image
        src={data.gradient}
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-prussian-blue-900/40" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
            SognosCare Edition
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            SognosCare for{" "}
            <span style={{ color: data.accentHex }}>{data.name}</span>
          </h1>
          <p className="mt-4 text-base font-medium" style={{ color: data.accentHex }}>
            {data.tagline}
          </p>
          <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-xl">
            {data.description}
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-prussian-blue-800 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Demo
            </Link>
            <Link
              href="/products/sognoscare"
              className="text-sm text-white/70 hover:text-white transition-colors font-medium"
            >
              ← Back to SognosCare
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: What it solves ──────────────────────────────────────────────────

function WhatItSolves({ data }: { data: EditionData }) {
  return (
    <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
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
    <section className="w-full border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Features
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            Core Features
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.features.map((feature, i) => (
            <div
              key={feature.title}
              className={`rounded-xl border border-sognos-border-subtle p-7 flex flex-col ${
                i === 0 ? "text-white" : "bg-white"
              }`}
              style={i === 0 ? { backgroundColor: data.accentHex } : undefined}
            >
              <p
                className={`font-heading text-base font-semibold tracking-tight ${
                  i === 0 ? "text-white" : "text-prussian-blue-800"
                }`}
              >
                {feature.title}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  i === 0 ? "text-white/80" : "text-sognos-text-body"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Advantages ──────────────────────────────────────────────────────

function Advantages({ data }: { data: EditionData }) {
  return (
    <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — advantages list */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
              Advantages
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-10">
              Key Advantages
            </h2>
            <ul className="space-y-0">
              {data.advantages.map((adv) => (
                <li
                  key={adv}
                  className="flex items-start gap-4 border-t border-sognos-border-subtle py-5"
                >
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: data.accentHex }}
                  />
                  <p className="text-sm text-prussian-blue-800 leading-relaxed">{adv}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — AI tools bar */}
          <div
            className="rounded-2xl p-8 text-white"
            style={{ backgroundColor: data.accentHex }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 mb-6">
              AI-Powered Tools
            </p>
            <div className="space-y-4">
              {data.aiTools.map((tool, i) => (
                <div key={tool} className="flex items-start gap-3">
                  {i < data.aiTools.length - 1 ? (
                    <>
                      <p className="text-sm font-medium text-white">{tool}</p>
                      <span className="text-white/40 text-sm ml-auto shrink-0">+</span>
                    </>
                  ) : (
                    <p className="text-sm font-medium text-white">{tool}</p>
                  )}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ color: data.accentHex }}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Proof Stories ───────────────────────────────────────────────────

function ProofStories({ data }: { data: EditionData }) {
  return (
    <section className="w-full border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
          Proof
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-16">
          What our Customers are Achieving with Sognos
        </h2>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {data.proofQuotes.map((q) => (
            <div
              key={q.attribution}
              className="rounded-xl border border-sognos-border-subtle bg-white p-8"
            >
              <p className="font-heading text-xl font-medium text-prussian-blue-800 leading-snug tracking-tight">
                &ldquo;{q.quote}&rdquo;
              </p>
              <p
                className="mt-5 text-sm font-semibold uppercase tracking-[0.1em]"
                style={{ color: data.accentHex }}
              >
                — {q.attribution}
              </p>
            </div>
          ))}
        </div>

        {/* Case study card */}
        <div className="rounded-xl border border-sognos-border-subtle bg-slate-50 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${data.accentHex}20`, color: data.accentHex }}
            >
              Case Study
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sognos-text-muted mb-2">
              {data.caseStudy.eyebrow}
            </p>
            <h3 className="font-heading text-lg font-semibold text-prussian-blue-800 tracking-tight mb-2">
              {data.caseStudy.title}
            </h3>
            <p className="text-sm text-sognos-text-body leading-relaxed max-w-xl">
              {data.caseStudy.description}
            </p>
            <Link
              href={data.caseStudy.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: data.accentHex }}
            >
              Read the Case Study →
            </Link>
          </div>
          <div className="shrink-0 w-32 h-32 rounded-xl bg-prussian-blue-800 flex items-center justify-center">
            <span className="text-xs font-semibold text-white/50 text-center leading-tight px-2">
              sognos<br />care
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA({ data }: { data: EditionData }) {
  return (
    <section className="w-full" style={{ backgroundColor: data.accentHex }}>
      <div className="max-w-7xl w-full mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight">
          Let&apos;s Talk
        </h2>
        <p className="mt-4 text-white/80 max-w-lg mx-auto leading-relaxed">
          We&apos;ll show you how SognosCare makes life easier for your team and better for
          the people you support.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ color: data.accentHex }}
          >
            Book a Demo
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Contact Sales →
          </Link>
        </div>
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
      <CTA data={data} />
    </main>
  );
}
