"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "@phosphor-icons/react";

const PRODUCTS = [
  {
    id: "care",
    name: "SognosCare",
    tagline: "Plan the work",
    description:
      "SognosCare captures every referral, care plan, and service request - with compliance tracking built into every step.",
    features: [
      "Care plan and case management",
      "NDIS and funder compliance tracking",
      "Service delivery scheduling",
      "Participant and carer records",
      "Incident and outcome reporting",
    ],
    href: "/products/sognoscare",
    editions: [
      { label: "Disability & Mental Health", href: "/products/sognoscare/editions/disability-mental-health" },
      { label: "Allied Health", href: "/products/sognoscare/editions/allied-health" },
      { label: "Support at Home", href: "/products/sognoscare/editions/support-at-home" },
      { label: "Residential Aged Care", href: "/products/sognoscare/editions/residential-aged-care" },
    ],
  },
  {
    id: "roster",
    name: "SognosRoster",
    tagline: "Assign the right people",
    description:
      "SognosRoster matches the right worker to every job - based on skills, location, availability, and compliance.",
    features: [
      "Intelligent worker-to-job matching",
      "Real-time schedule optimisation",
      "Mobile app for field workers",
      "Live tracking and job updates",
      "Automated conflict detection",
    ],
    href: "/products/sognosroster",
    editions: null,
  },
  {
    id: "genogram",
    name: "Sognos Genogram",
    tagline: "Understand the full picture",
    description:
      "Sognos Genogram embeds support networks, family structures, and care histories directly into every case record.",
    features: [
      "Family and relationship mapping",
      "Support network visualisation",
      "Historical context in case records",
      "Multi-generational care tracking",
      "Shared context across care team",
    ],
    href: "/products/sognosgenogram",
    editions: null,
  },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

export default function PlatformPillars() {
  const [active, setActive] = useState<ProductId>("care");
  const product = PRODUCTS.find((p) => p.id === active)!;

  return (
    <section className="w-full bg-wh-text py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            The platform
          </p>
          <h2 className="font-heading text-white font-medium tracking-tight leading-[1.1] text-[clamp(1.75rem,4vw,2.75rem)] max-w-xl">
            Three products. One connected system.
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex gap-0 border-b border-white/10 mb-10">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                active === p.id
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Tab content - 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: content */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                {product.tagline}
              </p>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                  <Check size={14} weight="bold" className="text-wh-blue mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {product.editions && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-3">
                  Already configured for your care environment
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.editions.map((ed) => (
                    <Link
                      key={ed.href}
                      href={ed.href}
                      className="inline-flex items-center rounded-wh-pill border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {ed.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={product.href}
              className="inline-flex items-center justify-center w-fit rounded-wh-pill border border-white/20 px-6 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-wh-text transition-colors"
            >
              Learn more about {product.name}
            </Link>
          </div>

          {/* Right: illustration placeholder */}
          <div className="w-full aspect-[4/3] rounded-wh-md border border-white/10 flex items-center justify-center">
            <span className="text-xs text-white/30">{product.name} - illustration</span>
          </div>

        </div>

        {/* Closing line */}
        <p className="mt-16 text-white/30 text-sm lg:text-base text-center">
          It's not three tools. It's one system that connects all of it.
        </p>

      </div>
    </section>
  );
}
