import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

const problems = [
  {
    title: "Fragmented compliance records",
    description:
      "Care documentation scattered across spreadsheets, emails, and disconnected systems makes audits slow and compliance unpredictable.",
  },
  {
    title: "Manual case coordination",
    description:
      "Assigning cases, tracking service status, and chasing updates by hand consumes hours of operational time every day.",
  },
  {
    title: "Reporting delays",
    description:
      "Funding claims, outcome reports, and regulatory submissions are delayed when data isn't captured at the point of delivery.",
  },
  {
    title: "No single source of truth",
    description:
      "Without a unified record, supervisors can't see service status, compliance gaps, or caseload imbalances at a glance.",
  },
];

const features = [
  {
    title: "Case management",
    description:
      "Structured intake, assessment, and case assignment workflows ensure every service request is captured, prioritised, and tracked from start to finish.",
  },
  {
    title: "Service delivery tracking",
    description:
      "Live visibility into every service visit, task, and interaction — so you always know what's been delivered and what's outstanding.",
  },
  {
    title: "Compliance management",
    description:
      "Automated compliance checkpoints, documentation prompts, and audit trails built into every workflow — not bolted on after the fact.",
  },
  {
    title: "Outcome recording",
    description:
      "Capture outcomes, notes, and evidence directly at the point of delivery — feeding instantly into reports, funding claims, and regulatory submissions.",
  },
  {
    title: "Reporting & analytics",
    description:
      "Configurable dashboards and reports give management real-time visibility into service performance, compliance status, and caseload distribution.",
  },
  {
    title: "AI-powered insights",
    description:
      "Copilot AI surfaces patterns, flags compliance risks, and highlights workload imbalances before they escalate — embedded directly into your daily workflows.",
  },
];

const complianceCapabilities = [
  "Automated documentation prompts at point of care",
  "Audit trail for every case action and service event",
  "Configurable compliance checkpoints per service type",
  "Funding and outcome reporting aligned to regulatory requirements",
  "Real-time compliance dashboards for supervisors",
  "Incident recording and escalation workflows",
];

export const metadata = {
  title: "SognosCare — Care Operations & Compliance | Sognos",
  description:
    "Manage service delivery, maintain compliance, and report with confidence — all in one platform built on Microsoft Dynamics 365.",
};

export default function SognosCarePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="SognosCare overview"
        className="bg-brand text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
              {PRODUCTS.care.name}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white mb-6">
              Care operations &amp; compliance.{" "}
              <span className="text-accent">All in one platform.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-10">
              {PRODUCTS.care.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white"
              >
                Book a Demo
              </Link>
              <Link
                href={PRODUCTS.roster.href}
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                See SognosRoster →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What SognosCare solves ────────────────────────────────────────── */}
      <section aria-label="Problems SognosCare solves">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <h2>What SognosCare solves</h2>
            <p className="mt-4">
              Most care organisations are managing operations across too many
              disconnected systems. SognosCare replaces the patchwork with one
              connected platform.
            </p>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-label="Problems addressed"
          >
            {problems.map((problem) => (
              <li key={problem.title}>
                <article className="card-standard h-full">
                  <h3 className="text-lg font-medium text-sognos-text-heading mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{problem.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section
        aria-label="SognosCare features"
        className="bg-sognos-bg-surface border-y border-sognos-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <h2>What&apos;s inside SognosCare</h2>
            <p className="mt-4">
              Every capability in SognosCare is designed for regulated service
              delivery — where accuracy, traceability, and speed all matter.
            </p>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="SognosCare features"
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

      {/* ── Compliance ───────────────────────────────────────────────────── */}
      <section aria-label="Compliance capabilities">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2>Built for compliance — not just compatible with it</h2>
              <p className="mt-4 leading-relaxed">
                SognosCare treats compliance as a first-class operational
                requirement. Checkpoints, documentation, and audit trails are
                embedded into workflows so your team never has to choose between
                speed and compliance.
              </p>
              <p className="mt-4 leading-relaxed">
                Whether you&apos;re operating under NDIS, aged care standards,
                local government frameworks, or sector-specific regulations —
                SognosCare is configured to reflect your compliance environment.
              </p>
            </div>

            <ul
              role="list"
              className="space-y-3"
              aria-label="Compliance capabilities"
            >
              {complianceCapabilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-sognos-success-light flex items-center justify-center"
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
                        stroke="#10b981"
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

      {/* ── Integration with SognosRoster ────────────────────────────────── */}
      <section
        aria-label="SognosCare and SognosRoster integration"
        className="bg-sognos-bg-surface border-y border-sognos-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-sognos-text-muted mb-4">
              Better together
            </p>
            <h2>Pair SognosCare with SognosRoster</h2>
            <p className="mt-4 leading-relaxed">
              SognosCare manages the service — SognosRoster coordinates the
              people who deliver it. Together, they give you complete end-to-end
              visibility across your entire service operation: from intake and
              case management through to workforce scheduling and field delivery.
            </p>
            <Link
              href={PRODUCTS.roster.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              Explore SognosRoster
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
        headline="See SognosCare in action"
        subtext="Book a personalised walkthrough and see how SognosCare can transform your care operations, compliance, and reporting."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
        variant="product"
      />
    </>
  );
}
