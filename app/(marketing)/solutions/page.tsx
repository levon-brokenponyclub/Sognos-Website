import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { SOLUTIONS } from "@/lib/constants";

export const metadata = {
  title: "Solutions — Sognos",
  description:
    "Supporting engagements built on Microsoft Dynamics 365. From Field Service and CRM to Power Platform and Quick Start — Sognos delivers the right solution for your operations.",
};

export default function SolutionsPage() {
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
              Solutions
            </span>
          </div>
          <h1 className="mx-auto mb-6 max-w-3xl font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
            Supporting engagements built for service operations
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/60">
            Sognos solutions are built on Microsoft Dynamics 365 and Power
            Platform. They support the specific capability areas your
            organisation needs — independently or alongside our core products.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              All solutions
            </p>
            <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
              Seven capability areas. One platform.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <Link
                key={solution.slug}
                href={solution.href}
                className="group flex flex-col justify-between rounded-2xl border border-(--sognos-card-border) bg-white p-8 transition-shadow duration-200 hover:shadow-md"
              >
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                    Solution
                  </p>
                  <h3 className="mb-3 font-heading text-xl font-normal text-sognos-text-heading">
                    {solution.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-sognos-text-body">
                    {solution.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-brand transition-all duration-200 group-hover:gap-3">
                  Learn more
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not sure which solution fits your operation?"
        subtext="Our team works with service providers across sectors. Book a call and we&apos;ll help you identify the right starting point."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
