import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────

type CTASectionProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
};

// ─── Proof stats ────────────────────────────────────────────────────────────

const STATS = [
  {
    value: "1,100+",
    label: "Workers Coordinated Daily",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "40%",
    label: "Reduction in Scheduling Time",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    value: "3×",
    label: "Faster Compliance Reporting",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    value: "99%",
    label: "Quality Standard Compliance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

// ─── Section ────────────────────────────────────────────────────────────────

export default function CTASection({
  headline = "Ready to transform your service operations?",
  subtext = "See how Sognos can unify your care management and workforce scheduling — and what that means for your organisation.",
  primaryCTA = { label: "Book a Demo", href: "/contact" },
  secondaryCTA = { label: "Contact Sales", href: "/contact" },
}: CTASectionProps) {
  return (
    <section className="w-full">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24 border-x border-dashed border-sognos-border-subtle">
        <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — CTA */}
            <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 py-12 lg:px-10 lg:py-20 lg:pr-12">
              <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                Get started
              </p>

              <h2 className="mt-4 font-heading font-medium tracking-tight text-white text-3xl md:text-4xl max-w-md">
                {headline}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-neutral-400 max-w-sm">
                {subtext}
              </p>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-3">
                <Link
                  href={primaryCTA.href}
                  className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
                >
                  {primaryCTA.label}
                </Link>
                {secondaryCTA && (
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
                  >
                    {secondaryCTA.label}
                  </Link>
                )}
              </div>

              <p className="mt-6 text-xs text-neutral-600 max-w-sm">
                No commitment required. Assessments are free, confidential, and specific to your operations.
              </p>
            </div>

            {/* Right — Stats 2×2 */}
            <div className="grid grid-cols-2 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    "flex flex-col justify-between gap-8 p-5 lg:p-8",
                    // right border for col 0
                    i % 2 === 0 ? "border-r border-white/10" : "",
                    // bottom border for row 0
                    i < 2 ? "border-b border-white/10" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-400">
                    {stat.icon}
                  </div>

                  {/* Value + label */}
                  <div>
                    <p className="font-heading text-3xl lg:text-4xl font-medium tracking-tight text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
