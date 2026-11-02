// Home · Solutions — Inspector option C "Editorial · cards" (2026-11-02):
// header with the "Explore all Solutions" link, then all eight solutions as
// editorial cards on Sognos tint (the SognosCare Features card): alternating
// sides (first image right), 1 : 1, eyebrow + title at the top, copy with an
// accent left border and the Explore link at the foot. Each card carries the
// solution's motion graphic (home/SolutionVisuals.tsx).
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import SolutionVisual, {
  SolutionsBackgroundProvider,
} from "@/components/layout/sections/home/SolutionVisuals";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import { SOLUTIONS } from "@/lib/constants";
import { getSolutionContent } from "@/lib/solutions-content";

export default function SolutionsSection({
  heading = "Solutions that extend the platform",
  description = "Supporting engagements that extend SognosCare and SognosRoster — from field service and CRM through to Power Platform and rapid deployment.",
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section id="solutions" className={`bg-white ${LAYOUT.section}`}>
      <SolutionsBackgroundProvider>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionLabel>Solutions</SectionLabel>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>{heading}</h2>
              <p className={`${TYPE.lede} text-sognos-body`}>{description}</p>
            </div>
            <Link
              href="/solutions"
              className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-sognos-line bg-white px-5 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
            >
              Explore all Solutions
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-4 lg:gap-6">
            {SOLUTIONS.map((s, i) => {
              const content = getSolutionContent(s.slug);
              if (!content) return null;
              // Alternate: odd cards put the graphic first (left from md).
              const visualLeft = i % 2 === 1;
              return (
                <article
                  key={s.slug}
                  className="grid grid-cols-1 items-center gap-6 rounded-lg bg-sognos-tint p-6 md:grid-cols-2 md:gap-12 md:p-8 lg:p-10"
                >
                  <div className="flex min-w-0 flex-col justify-between gap-8 self-stretch">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-sognos-blue-accent">
                        {s.name}
                      </p>
                      <h3
                        className={`${TYPE.h3} text-balance text-sognos-heading`}
                      >
                        {content.hero.headline}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p
                        className={`max-w-[46ch] border-l-2 border-sognos-blue-accent pl-4 ${TYPE.body} text-pretty text-sognos-body`}
                      >
                        {content.hero.subtext}
                      </p>
                      <Link
                        href={s.href}
                        className="group inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-sognos-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
                      >
                        Explore {s.name}
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`min-w-0 ${visualLeft ? "md:order-first" : ""}`}
                  >
                    <SolutionVisual id={s.slug} index={i} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SolutionsBackgroundProvider>
    </section>
  );
}
