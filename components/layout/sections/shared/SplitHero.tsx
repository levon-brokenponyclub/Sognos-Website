import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Inspector Hero A "Split" (Frontline layout, 2026-11-02): breadcrumb label,
// H1, subtext and CTAs (6) beside a 540px photo under a navy → accent wash
// with a floating card (6). Used by the Industries detail pages.

export default function SplitHero({
  crumb,
  name,
  headline,
  subtext,
  image,
  card,
}: {
  crumb: { label: string; href: string };
  name: string;
  headline: string;
  subtext: string;
  image: string;
  /** Floating card over the photo (absolutely positioned by the caller). */
  card?: ReactNode;
}) {
  return (
    <section className="bg-white pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:col-span-6">
          <SectionLabel>
            <Link
              href={crumb.href}
              className="text-sognos-muted underline-offset-4 transition-colors hover:text-sognos-blue-accent hover:underline"
            >
              {crumb.label}
            </Link>
            <span aria-hidden="true" className="text-sognos-muted">
              /
            </span>
            {name}
          </SectionLabel>
          <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-sognos-heading md:text-6xl">
            {headline}
          </h1>
          <p className={`${TYPE.heroSub} text-sognos-body`}>{subtext}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <SolutionHeroDemoButton className="min-h-11 bg-sognos-heading px-7 py-3.5 transition-colors hover:bg-sognos-blue-accent hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent" />
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-sognos-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
            >
              Talk to Sales <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] max-h-[540px] w-full overflow-hidden rounded-lg bg-sognos-tint lg:aspect-auto lg:h-[540px]">
            <Image
              src={image}
              alt={`${name} preview`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in srgb, var(--sognos-navy-dark) 55%, transparent), color-mix(in srgb, var(--sognos-blue-accent) 30%, transparent))",
              }}
            />
            {card}
          </div>
        </div>
      </div>
    </section>
  );
}
