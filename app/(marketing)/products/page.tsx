import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import CTASection from "@/components/sections/CTASection";

const comparison = [
  {
    capability: "Case management",
    care: true,
    roster: false,
  },
  {
    capability: "Service delivery tracking",
    care: true,
    roster: false,
  },
  {
    capability: "Compliance management",
    care: true,
    roster: false,
  },
  {
    capability: "Outcome and audit recording",
    care: true,
    roster: false,
  },
  {
    capability: "Workforce scheduling",
    care: false,
    roster: true,
  },
  {
    capability: "Staff matching and allocation",
    care: false,
    roster: true,
  },
  {
    capability: "Route and travel optimisation",
    care: false,
    roster: true,
  },
  {
    capability: "Real-time capacity management",
    care: false,
    roster: true,
  },
  {
    capability: "Field delivery visibility",
    care: true,
    roster: true,
  },
  {
    capability: "AI-powered insights",
    care: true,
    roster: true,
  },
  {
    capability: "Reporting and analytics",
    care: true,
    roster: true,
  },
];

const betterTogether = [
  {
    title: "Connected service lifecycle",
    description:
      "SognosCare captures service demand and case details. SognosRoster schedules the right worker to deliver it. Every step is connected — no handoffs, no gaps.",
  },
  {
    title: "Compliance at every stage",
    description:
      "Compliance requirements flow from SognosCare into SognosRoster's scheduling logic — ensuring only qualified, available workers are allocated to each service.",
  },
  {
    title: "One source of truth",
    description:
      "With both products on the same platform, supervisors see the complete picture — service status, workforce allocation, and compliance in a single view.",
  },
  {
    title: "AI across the full operation",
    description:
      "Copilot AI works across both products — surfacing insights that span service delivery and workforce performance, so you can optimise the whole operation, not just parts of it.",
  },
];

export const metadata = {
  title: "Products — SognosCare & SognosRoster | Sognos",
  description:
    "Two products. One platform. SognosCare manages care operations and compliance. SognosRoster optimises workforce scheduling. Together, they cover your entire service operation.",
};

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section aria-label="Products overview" className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
              Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white mb-6">
              Two products.{" "}
              <span className="text-accent">One complete platform.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              SognosCare manages your service operations and compliance.
              SognosRoster optimises your workforce scheduling. Use either
              independently — or together for end-to-end operational control.
            </p>
          </div>
        </div>
      </section>

      {/* ── Product cards ─────────────────────────────────────────────────── */}
      <section aria-label="Products">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <ul
            role="list"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            aria-label="Sognos products"
          >
            {/* SognosCare */}
            <li>
              <article className="card-standard h-full flex flex-col">
                <p className="text-xs font-medium tracking-widest uppercase text-sognos-text-muted mb-3">
                  {PRODUCTS.care.name}
                </p>
                <h2 className="text-2xl font-medium text-sognos-text-heading mb-3">
                  {PRODUCTS.care.tagline}
                </h2>
                <p className="text-sm leading-relaxed mb-6 flex-1">
                  {PRODUCTS.care.description}
                </p>
                <ul
                  role="list"
                  className="space-y-2 mb-8"
                  aria-label="SognosCare capabilities"
                >
                  {[
                    "Case management & service tracking",
                    "Compliance management & audit trails",
                    "Outcome recording & reporting",
                    "AI-powered operational insights",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-sognos-text-body">
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sognos-text-muted flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={PRODUCTS.care.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
                >
                  Explore SognosCare
                  <svg
                    width="14"
                    height="14"
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
              </article>
            </li>

            {/* SognosRoster */}
            <li>
              <article className="card-standard h-full flex flex-col">
                <p className="text-xs font-medium tracking-widest uppercase text-sognos-text-muted mb-3">
                  {PRODUCTS.roster.name}
                </p>
                <h2 className="text-2xl font-medium text-sognos-text-heading mb-3">
                  {PRODUCTS.roster.tagline}
                </h2>
                <p className="text-sm leading-relaxed mb-6 flex-1">
                  {PRODUCTS.roster.description}
                </p>
                <ul
                  role="list"
                  className="space-y-2 mb-8"
                  aria-label="SognosRoster capabilities"
                >
                  {[
                    "Automated staff matching & allocation",
                    "Route and travel optimisation",
                    "Real-time capacity management",
                    "Compliance-aware scheduling",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-sognos-text-body">
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sognos-text-muted flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={PRODUCTS.roster.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
                >
                  Explore SognosRoster
                  <svg
                    width="14"
                    height="14"
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
              </article>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Comparison ────────────────────────────────────────────────────── */}
      <section
        aria-label="Product capability comparison"
        className="bg-sognos-bg-surface border-y border-sognos-border"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <h2>What each product covers</h2>
            <p className="mt-4">
              Both products are built on the same platform and can be
              implemented independently or together. Here&apos;s what each one
              handles.
            </p>
          </header>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm border-collapse"
              aria-label="Capability comparison between SognosCare and SognosRoster"
            >
              <thead>
                <tr className="border-b border-sognos-border">
                  <th
                    scope="col"
                    className="text-left py-3 pr-6 font-medium text-sognos-text-heading"
                  >
                    Capability
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3 px-6 font-medium text-sognos-text-heading"
                  >
                    {PRODUCTS.care.name}
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3 px-6 font-medium text-sognos-text-heading"
                  >
                    {PRODUCTS.roster.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.capability}
                    className="border-b border-sognos-card-border-soft"
                  >
                    <td className="py-3 pr-6 text-sognos-text-body">
                      {row.capability}
                    </td>
                    <td className="py-3 px-6 text-center" aria-label={row.care ? "Included" : "Not included"}>
                      {row.care ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sognos-success-light" aria-hidden="true">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-block w-4 h-px bg-sognos-border" aria-hidden="true" />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center" aria-label={row.roster ? "Included" : "Not included"}>
                      {row.roster ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sognos-info-light" aria-hidden="true">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2 6l3 3 5-5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-block w-4 h-px bg-sognos-border" aria-hidden="true" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Better Together ───────────────────────────────────────────────── */}
      <section aria-label="Better together — using both products">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-sognos-text-muted mb-4">
              Better together
            </p>
            <h2>The complete operational loop</h2>
            <p className="mt-4">
              When SognosCare and SognosRoster are implemented together, they
              form a closed operational loop — connecting every step from
              service demand to delivery to optimisation.
            </p>
          </header>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-label="Benefits of using both products"
          >
            {betterTogether.map((item) => (
              <li key={item.title}>
                <article className="card-standard h-full">
                  <h3 className="text-base font-medium text-sognos-text-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to see the platform?"
        subtext="Book a personalised walkthrough of SognosCare, SognosRoster, or both — and see what Sognos can do for your organisation."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
        variant="product"
      />
    </>
  );
}
