import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { INDUSTRIES, PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Industries — Sognos",
  description:
    "Sognos serves health and social care, facilities management, local government, industrial services, and energy and utilities organisations.",
};

const PRODUCT_COLOUR: Record<string, string> = {
  SognosCare: "bg-(--sognos-edition-green)",
  SognosRoster: "bg-(--sognos-accent)",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-prussian-blue-950 pb-24 pt-36"
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
              Industries
            </span>
          </div>
          <h1 className="mx-auto mb-6 max-w-3xl font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
            Built for organisations that deliver services in the field
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/60">
            Sognos is configured for the operational complexity of your sector —
            not adapted from a generic platform after the fact.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              Sectors we serve
            </p>
            <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
              Five industries. One platform.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={industry.href}
                className="group flex flex-col justify-between rounded-2xl border border-(--sognos-card-border) bg-white p-8 transition-shadow duration-200 hover:shadow-md"
              >
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                    Industry
                  </p>
                  <h3 className="mb-3 font-heading text-xl font-normal text-sognos-text-heading">
                    {industry.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-sognos-text-body">
                    {industry.description}
                  </p>
                </div>

                {/* Product chips */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {industry.products.map((product) => (
                    <span
                      key={product}
                      className="inline-flex items-center gap-1.5 rounded-full border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-3 py-1"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${PRODUCT_COLOUR[product] ?? "bg-prussian-blue-800"}`}
                      />
                      <span className="text-xs font-medium text-sognos-text-body">
                        {product}
                      </span>
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform strip */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-(--sognos-card-border) px-8 py-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-sognos-text-muted">
                All industries run on
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
            <div className="flex items-center gap-6">
              <Link
                href={PRODUCTS.care.href}
                className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark"
              >
                SognosCare →
              </Link>
              <Link
                href={PRODUCTS.roster.href}
                className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark"
              >
                SognosRoster →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Which industry are you in?"
        subtext="Our team has experience across all five sectors. Book a call and we&apos;ll show you how Sognos fits your specific operational context."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
