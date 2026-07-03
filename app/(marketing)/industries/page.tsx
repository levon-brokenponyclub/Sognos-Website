import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Industries - Sognos",
  description:
    "Sognos serves health and social care, facilities management, local government, industrial services, and energy and utilities organisations.",
};

const PRODUCT_COLOUR: Record<string, string> = {
  SognosCare: "bg-(--sognos-edition-green)",
  SognosRoster: "bg-sognos-blue-accent",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-gradient-hero pb-18 pt-40"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
              Industries
            </div>
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
            Built for organisations that deliver services in the field
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80">
            Sognos is configured for the operational complexity of your sector -
            not adapted from a generic platform after the fact.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
              Sectors we serve
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-heading tracking-tight mb-6">
              Five industries. One platform.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={industry.href}
                className="group flex flex-col justify-between rounded-2xl border border-(--sognos-line) bg-white p-8 transition-shadow duration-200 hover:shadow-md"
              >
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                    <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                    Industry
                  </div>
                  <h2 className="mb-3 font-heading text-xl font-normal text-sognos-heading">
                    {industry.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-sognos-body">
                    {industry.description}
                  </p>
                </div>

                {/* Product chips */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {industry.products.map((product) => (
                    <span
                      key={product}
                      className="inline-flex items-center gap-1.5 rounded-full border border-(--sognos-line) bg-(--sognos-bg-sunken) px-3 py-1"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${PRODUCT_COLOUR[product] ?? "bg-sognos-navy"}`}
                      />
                      <span className="text-xs font-medium text-sognos-body">
                        {product}
                      </span>
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1.5 text-sm font-medium text-sognos-blue-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-(--sognos-line) px-8 py-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-sognos-muted">
                All industries run on
              </span>
              <span className="text-sm font-semibold text-sognos-heading">
                Microsoft Dynamics 365
              </span>
              <span className="text-sognos-muted">·</span>
              <span className="text-sm font-semibold text-sognos-heading">
                Copilot AI
              </span>
              <span className="text-sognos-muted">·</span>
              <span className="text-sm font-semibold text-sognos-heading">
                Power Platform
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href={PRODUCTS.care.href}
                className="text-sm font-medium text-sognos-blue-accent transition-colors duration-200 hover:text-sognos-navy-dark"
              >
                SognosCare →
              </Link>
              <Link
                href={PRODUCTS.roster.href}
                className="text-sm font-medium text-sognos-blue-accent transition-colors duration-200 hover:text-sognos-navy-dark"
              >
                SognosRoster →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
