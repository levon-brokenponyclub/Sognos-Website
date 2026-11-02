import Link from "next/link";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Home · CTA band — Inspector option C "Editorial" (2026-11-02): an oversized
// statement (8) beside a short line and the CTAs (4), between hairlines. On
// white so it separates the tinted Solutions and Industries sections.

export default function HomeCtaBand() {
  return (
    <section className={`border-y border-sognos-line bg-white ${LAYOUT.section}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-6 lg:grid-cols-12">
        <h2 className="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-sognos-heading md:text-6xl lg:col-span-8">
          Stop managing complexity.
          <br className="hidden sm:block" /> Start delivering outcomes.
        </h2>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <p className={`${TYPE.body} text-sognos-body`}>
            A 30-minute walkthrough with a Sognos specialist, on your own
            service model.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SolutionHeroDemoButton className="min-h-11 px-7 py-3.5 transition-colors hover:bg-sognos-heading hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent" />
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-sognos-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
            >
              Talk to Sales <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
