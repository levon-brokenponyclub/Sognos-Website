import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

export const metadata = {
  title: "Solutions - Sognos",
  description:
    "Supporting engagements built on Microsoft Dynamics 365. From Frontline and CRM to Power Platform and Quick Start - Sognos delivers the right solution for your operations.",
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
            <span className="h-2 w-2 rounded-full bg-sognos-blue-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Solutions
            </span>
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
            Supporting engagements built for service operations
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/60">
            Sognos solutions are built on Microsoft Dynamics 365 and Power
            Platform. They support the specific capability areas your
            organisation needs - independently or alongside our core products.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="bg-sognos-tint py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
              All solutions
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-heading tracking-tight mb-6">
              Seven capability areas. One platform.
            </h2>
          </div>

          <div className="grid gap-3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <Link
                key={solution.slug}
                href={solution.href}
                className="group flex flex-col justify-between rounded-lg border border-(--sognos-line) bg-white p-8 transition-colors duration-200 hover:border-sognos-navy/30"
              >
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                    <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                    Solution
                  </div>
                  <h2 className="mb-3 font-heading text-xl font-normal text-sognos-heading">
                    {solution.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-sognos-body">
                    {solution.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-sognos-blue-accent transition-all duration-200 group-hover:gap-3">
                  Learn more
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
