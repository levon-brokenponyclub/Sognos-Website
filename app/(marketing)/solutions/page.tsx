import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { SOLUTIONS } from "@/lib/constants";

export const metadata = {
  title: "Solutions — Sognos",
  description:
    "Supporting engagements built on Microsoft Dynamics 365. From Frontline and CRM to Power Platform and Quick Start — Sognos delivers the right solution for your operations.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-gradient-hero pb-24 pt-36"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              Solutions
            </div>
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
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
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium mb-6">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              All solutions
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-text-heading tracking-tight mb-6">
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
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium mb-6">
                    <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
                    Solution
                  </div>
                  <h2 className="mb-3 font-heading text-xl font-normal text-sognos-text-heading">
                    {solution.name}
                  </h2>
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
        subtext="Our team works with service providers across sectors. Book a call and we'll help you identify the right starting point."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
