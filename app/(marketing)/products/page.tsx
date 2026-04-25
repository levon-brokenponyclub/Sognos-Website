import Link from "next/link";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import CTASection from "@/components/sections/CTASection";
import { PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Products — SognosCare, SognosRoster & Sognos Genogram | Sognos",
  description:
    "Three products built for service operations. SognosCare for care management, SognosRoster for workforce scheduling, and Sognos Genogram for relationship and family context.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_DETAIL = [
  {
    key: "care",
    logo: "/logos/sognos-care-logo.svg",
    accentDot: "bg-(--sognos-edition-green)",
    accentText: "text-(--sognos-edition-green)",
    capabilities: [
      "Case management end-to-end",
      "Service delivery tracking",
      "Compliance & audit trail",
      "Reporting & analytics",
      "Copilot AI documentation",
    ],
    badge: "4 care-sector editions",
    href: PRODUCTS.care.href,
    name: PRODUCTS.care.name,
    tagline: PRODUCTS.care.tagline,
  },
  {
    key: "roster",
    logo: "/logos/sognos-roster-logo.svg",
    accentDot: "bg-(--sognos-accent)",
    accentText: "text-(--sognos-accent)",
    capabilities: [
      "Demand-driven scheduling",
      "Skills & compliance matching",
      "Route optimisation",
      "Real-time reoptimisation",
      "Mobile worker app",
    ],
    badge: null,
    href: PRODUCTS.roster.href,
    name: PRODUCTS.roster.name,
    tagline: PRODUCTS.roster.tagline,
  },
  {
    key: "genogram",
    logo: "/logos/SognosGenogram-logo.svg",
    accentDot: "bg-[#92278d]",
    accentText: "text-[#92278d]",
    capabilities: [
      "Interactive genogram builder",
      "Support network mapping",
      "Risk & protective factor tagging",
      "Embedded in the case record",
      "Copilot AI narrative generation",
    ],
    badge: null,
    href: PRODUCTS.genogram.href,
    name: PRODUCTS.genogram.name,
    tagline: PRODUCTS.genogram.tagline,
  },
] as const;

// ─── Product card ──────────────────────────────────────────────────────────────

function ProductCard({
  logo,
  accentDot,
  accentText,
  capabilities,
  badge,
  href,
  name,
  tagline,
}: Omit<(typeof PRODUCT_DETAIL)[number], "key">) {
  return (
    <div className="flex flex-col rounded-2xl border border-(--sognos-card-border) bg-white overflow-hidden">
      {/* Top strip */}
      <div className="bg-prussian-blue-950 px-8 pt-8 pb-10">
        <Image
          src={logo}
          alt={name}
          width={140}
          height={36}
          className="h-9 w-auto object-contain brightness-0 invert"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-8 px-8 py-8">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
            {name}
          </p>
          <h2 className="font-heading text-2xl font-normal text-sognos-text-heading">
            {tagline}
          </h2>
        </div>

        {/* Capabilities */}
        <ul className="space-y-3">
          {capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-3">
              <svg
                className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-sognos-text-body">{cap}</span>
            </li>
          ))}
        </ul>

        {/* Badge */}
        {badge && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-3 py-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} />
            <span className="text-xs font-medium text-sognos-text-body">{badge}</span>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto">
          <AnimatedButton href={href} variant="brand">
            Explore {name}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

// ─── Better Together ──────────────────────────────────────────────────────────

function BetterTogether() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl bg-prussian-blue-950">
          <div className="grid lg:grid-cols-[1fr_1px_1fr]">
            {/* Left */}
            <div className="px-10 py-14 lg:px-14 lg:py-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                Better together
              </p>
              <h2 className="mb-5 font-heading text-3xl font-normal text-white lg:text-4xl">
                One operating system for the full service loop
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/60">
                SognosCare and SognosRoster are designed to work independently —
                but they&apos;re built to work together. When combined, they close
                the loop from service intake to workforce delivery to compliance
                outcome, without the gaps that come from disconnected systems.
              </p>
              <p className="text-base leading-relaxed text-white/60">
                Care manages what needs to be delivered. Roster manages who
                delivers it — and when, and where.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden bg-white/5 lg:block" />

            {/* Right — flow */}
            <div className="flex items-center justify-center border-t border-white/5 px-10 py-14 lg:border-t-0 lg:px-14">
              <div className="w-full max-w-xs space-y-3">
                {[
                  { label: "Service intake & case setup", product: "SognosCare" },
                  { label: "Service plan & compliance checks", product: "SognosCare" },
                  { label: "Workforce allocation & scheduling", product: "SognosRoster" },
                  { label: "Field delivery & attendance capture", product: "SognosRoster" },
                  { label: "Outcome recording & audit trail", product: "SognosCare" },
                  { label: "AI insights & optimisation", product: "Both" },
                ].map((step, i) => {
                  const isCare = step.product === "SognosCare";
                  const isBoth = step.product === "Both";
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/4 px-4 py-3"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          isBoth
                            ? "bg-white/40"
                            : isCare
                            ? "bg-(--sognos-edition-green)"
                            : "bg-(--sognos-accent)"
                        }`}
                      />
                      <span className="flex-1 text-xs text-white/70">{step.label}</span>
                      <span
                        className={`text-[10px] font-semibold ${
                          isBoth
                            ? "text-white/40"
                            : isCare
                            ? "text-(--sognos-edition-green)/80"
                            : "text-(--sognos-accent)/80"
                        }`}
                      >
                        {step.product}
                      </span>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="flex items-center gap-5 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-(--sognos-edition-green)" />
                    <span className="text-[10px] text-white/40">SognosCare</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-(--sognos-accent)" />
                    <span className="text-[10px] text-white/40">SognosRoster</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative bg-prussian-blue-950 pb-24 pt-36 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-prussian-blue-700) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Products
            </span>
          </div>
          <h1 className="mx-auto mb-6 max-w-3xl font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
            Three products. One operating system for service delivery.
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/60">
            SognosCare, SognosRoster, and Sognos Genogram are built to stand
            alone — and designed to work together. All run on Microsoft Dynamics
            365, enhanced with Copilot AI.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {PRODUCT_DETAIL.map(({ key, ...rest }) => (
              <ProductCard key={key} {...rest} />
            ))}
          </div>

          {/* Platform callout */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-(--sognos-card-border) bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-sm text-sognos-text-muted">
                All products run on
              </span>
              <span className="text-sm font-semibold text-sognos-text-heading">
                Microsoft Dynamics 365
              </span>
              <span className="text-sognos-text-muted">·</span>
              <span className="text-sm font-semibold text-sognos-text-heading">
                Copilot AI
              </span>
              <span className="text-sognos-text-muted">·</span>
              <span className="text-sm font-semibold text-sognos-text-heading">
                Power Platform
              </span>
            </div>
            <Link
              href="/contact"
              className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark"
            >
              Talk to us about implementation →
            </Link>
          </div>
        </div>
      </section>

      <BetterTogether />

      <CTASection
        headline="Not sure which product fits your operation?"
        subtext="Our team works with care and service providers across sectors. Book a call and we'll help you identify the right starting point."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
