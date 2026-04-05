import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

const challenges = [
  {
    title: "Reactive scheduling",
    description:
      "Filling shifts manually in response to demand — rather than planning ahead — means you're always playing catch-up with availability and compliance requirements.",
  },
  {
    title: "Skills and compliance gaps",
    description:
      "Manually matching workers to services without visibility into qualifications, certifications, and restrictions creates compliance risk and service failures.",
  },
  {
    title: "Geographic inefficiency",
    description:
      "Without route optimisation, field teams spend hours in transit between services — increasing costs and reducing the number of services that can be delivered each day.",
  },
  {
    title: "Real-time visibility gaps",
    description:
      "When supervisors can't see what's happening in the field — who's running late, what's been completed, where capacity exists — operational decisions are made blind.",
  },
];

const features = [
  {
    title: "Automated staff matching",
    description:
      "SognosRoster automatically matches available, qualified workers to each service — factoring in skills, certifications, availability, location, and client preferences.",
  },
  {
    title: "Real-time schedule optimisation",
    description:
      "The scheduling engine continuously recalculates the optimal allocation as conditions change — so your roster reflects reality, not yesterday's plan.",
  },
  {
    title: "Route and travel optimisation",
    description:
      "Built-in geographic optimisation minimises travel time between services, reducing operational costs and increasing the number of services your team can deliver.",
  },
  {
    title: "Availability and capacity management",
    description:
      "Live visibility into worker availability, contracted hours, and service demand — so you can plan ahead, manage peaks, and avoid under or over-servicing.",
  },
  {
    title: "Compliance-aware scheduling",
    description:
      "Every schedule is built with compliance at its core — mandatory qualifications, working-time rules, and service-specific requirements are validated automatically.",
  },
  {
    title: "AI-powered workforce insights",
    description:
      "Copilot AI identifies patterns in workforce utilisation, highlights recurring scheduling conflicts, and surfaces opportunities to improve efficiency across your operation.",
  },
];

const optimisationPoints = [
  "Skills and qualification matching per service type",
  "Real-time availability across permanent, casual, and contractor staff",
  "Geographic clustering to minimise travel and maximise field hours",
  "Automatic conflict detection for overlapping bookings or rule violations",
  "Dynamic reallocation when workers are unavailable or late",
  "Continuous learning from historical schedule performance",
];

export const metadata = {
  title: "SognosRoster — Workforce Scheduling & Optimisation | Sognos",
  description:
    "Allocate the right people, at the right time, to the right services — automatically. Built on Microsoft Dynamics 365.",
};

export default function SognosRosterPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="SognosRoster overview"
        className="bg-brand text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
              {PRODUCTS.roster.name}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white mb-6">
              Workforce scheduling &amp; optimisation.{" "}
              <span className="text-accent">Automated and intelligent.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-10">
              {PRODUCTS.roster.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white"
              >
                Book a Demo
              </Link>
              <Link
                href={PRODUCTS.care.href}
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                See SognosCare →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scheduling challenges ─────────────────────────────────────────── */}
      <section aria-label="Workforce scheduling challenges">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <h2>The scheduling challenges SognosRoster eliminates</h2>
            <p className="mt-4">
              For organisations managing complex, high-volume workforces,
              manual scheduling is a strategic liability. SognosRoster replaces
              it with an intelligent, automated engine.
            </p>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-label="Scheduling challenges addressed"
          >
            {challenges.map((challenge) => (
              <li key={challenge.title}>
                <article className="card-standard h-full">
                  <h3 className="text-lg font-medium text-sognos-text-heading mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section
        aria-label="SognosRoster features"
        className="bg-sognos-bg-surface border-y border-sognos-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <h2>What&apos;s inside SognosRoster</h2>
            <p className="mt-4">
              SognosRoster is engineered for high-complexity service
              environments — where getting the right person to the right place
              at the right time is a non-negotiable operational requirement.
            </p>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="SognosRoster features"
          >
            {features.map((feature) => (
              <li key={feature.title}>
                <article className="card-standard h-full">
                  <h3 className="text-base font-medium text-sognos-text-heading mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{feature.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Optimisation logic ───────────────────────────────────────────── */}
      <section aria-label="Scheduling optimisation logic">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2>An optimisation engine built for real-world complexity</h2>
              <p className="mt-4 leading-relaxed">
                SognosRoster doesn&apos;t just fill gaps in a roster — it
                solves a multi-variable optimisation problem across your entire
                workforce. Every schedule accounts for skills, location,
                compliance requirements, worker preferences, and service
                criticality.
              </p>
              <p className="mt-4 leading-relaxed">
                And because conditions change — workers call in sick, services
                run over time, new requests come in — SognosRoster adapts in
                real time, recalculating the optimal allocation without manual
                intervention.
              </p>
            </div>

            <ul
              role="list"
              className="space-y-3"
              aria-label="Optimisation capabilities"
            >
              {optimisationPoints.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-sognos-info-light flex items-center justify-center"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-sognos-text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Integration with SognosCare ───────────────────────────────────── */}
      <section
        aria-label="SognosRoster and SognosCare integration"
        className="bg-sognos-bg-surface border-y border-sognos-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-sognos-text-muted mb-4">
              Better together
            </p>
            <h2>Pair SognosRoster with SognosCare</h2>
            <p className="mt-4 leading-relaxed">
              SognosRoster schedules the workforce — SognosCare manages the
              services they deliver. Together, they form a complete operational
              loop: from service intake and case management, through to
              workforce allocation, field delivery, and compliance reporting.
            </p>
            <Link
              href={PRODUCTS.care.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              Explore SognosCare
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        headline="See SognosRoster in action"
        subtext="Book a personalised walkthrough and see how SognosRoster can automate your workforce scheduling and optimise service delivery."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
        variant="product"
      />
    </>
  );
}
