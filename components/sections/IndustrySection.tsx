"use client";

import Link from "next/link";
import { INDUSTRIES } from "@/lib/constants";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<string, () => React.ReactNode> = {
  "health-social-care": () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 19.5C11 19.5 2.5 14 2.5 8.5a4.5 4.5 0 019-0a4.5 4.5 0 019 0C20.5 14 11 19.5 11 19.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "facilities-management": () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="12"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="3"
        y="12"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="12"
        y="12"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  "local-government": () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 2l8 4v2H3V6l8-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5 8v9M9 8v9M13 8v9M17 8v9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M3 17h16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "industrial-services": () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11 2v3M11 17v3M2 11h3M17 11h3M4.22 4.22l2.12 2.12M15.66 15.66l2.12 2.12M4.22 17.78l2.12-2.12M15.66 6.34l2.12-2.12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "energy-utilities": () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 2L4 13h7l-2 7 9-11h-7l2-7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ─── Industry card ────────────────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const Icon = ICONS[industry.slug];
  return (
    <Link
      href={industry.href}
      className="group flex flex-col gap-5 rounded-2xl border border-sognos-border-subtle bg-white p-7 transition-all duration-200 hover:border-brand/20 hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sognos-border-subtle bg-neutral-50 text-neutral-400 group-hover:border-brand/20 group-hover:text-brand transition-colors">
          {Icon && <Icon />}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-neutral-200 group-hover:text-brand transition-colors mt-1"
          aria-hidden="true"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-medium text-neutral-900 leading-snug tracking-tight">
          {industry.name}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-500">
          {industry.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {industry.products.map((p) => (
          <span
            key={p}
            className="inline-flex items-center rounded-full border border-sognos-border-subtle bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-500"
          >
            {p}
          </span>
        ))}
      </div>
    </Link>
  );
}

// ─── Stand-out card ───────────────────────────────────────────────────────────

function StandOutCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-neutral-900 p-7 text-white">
      <div>
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          Any sector
        </span>
        <h3 className="mt-3 font-heading font-medium text-white leading-snug tracking-tight">
          Not seeing your sector?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          If your team coordinates workforce and manages service delivery at
          scale, Sognos fits. We work across sectors not listed here.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
        >
          Get in touch
          <svg
            width="14"
            height="14"
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
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function IndustrySection() {
  // Build the 6-slot grid: industries 0–3, stand-out, industry 4
  const slots = [
    ...INDUSTRIES.slice(0, 4).map((ind) => ({
      type: "industry" as const,
      industry: ind,
    })),
    { type: "standout" as const },
    { type: "industry" as const, industry: INDUSTRIES[4] },
  ];

  return (
    <section className="w-full border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Industries
            <br />
            Built for service-intensive operations
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, i) =>
            slot.type === "industry" ? (
              <IndustryCard key={slot.industry.slug} industry={slot.industry} />
            ) : (
              <StandOutCard key="standout" />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
