"use client";

import Link from "next/link";
import {
  HeartStraight,
  CalendarCheck,
  ShieldCheck,
  UsersThree,
  MapPin,
  ChartBar,
} from "@phosphor-icons/react";

const CAPABILITIES = [
  { label: "Care Management", icon: HeartStraight },
  { label: "Workforce Scheduling", icon: CalendarCheck },
  { label: "Compliance Tracking", icon: ShieldCheck },
  { label: "CRM", icon: UsersThree },
  { label: "Frontline", icon: MapPin },
  { label: "Reporting & Insights", icon: ChartBar },
] as const;

export default function HomepageHero() {
  return (
    <section className="relative w-full bg-wh-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Eyebrow announcement */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-wh-pill bg-wh-card border border-wh-border pl-1 pr-4 py-1 text-sm">
            <span className="inline-flex items-center gap-1 rounded-wh-pill bg-wh-blue px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider">
              New
            </span>
            <span className="text-wh-text">
              Sognos Genogram is here — see context like never before
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-center text-wh-text font-medium tracking-tight leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] max-w-5xl mx-auto">
          Run your entire service operation in one place
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-center text-wh-text-muted text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Plan the work, schedule your team, and see what's actually happening —
          without jumping between systems.
        </p>

        {/* Two-column area: badges left, proof + CTA right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Capability badges grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CAPABILITIES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-wh-md bg-wh-card border border-wh-border px-4 py-3 text-sm font-medium text-wh-text"
              >
                <Icon size={18} weight="regular" className="text-wh-text shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          {/* Proof + CTA */}
          <div className="flex flex-col items-start lg:items-start gap-6 lg:border-l lg:border-wh-border lg:pl-12">
            <p className="text-base lg:text-lg text-wh-text leading-relaxed">
              Flourish Australia uses Sognos to support 1,100+ staff across
              their national mental health network — on a single source of
              truth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-wh-pill bg-wh-text text-white px-8 py-3 text-sm font-medium hover:bg-wh-text/90 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
