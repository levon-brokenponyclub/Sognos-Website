import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import type { INDUSTRIES } from "@/lib/constants";
import IndustryStat, { type IndustryStatData } from "@/components/layout/sections/industries/IndustryStat";

// Industry photo card — shared by IndustryOthersSlider (industry pages) and
// HomeIndustriesGrid (homepage), 2026-11-02: white card, the industry's hero
// photo under a navy wash with a hairline frame, a sector rule, name,
// description and Explore. `className` sizes the card, `mediaClassName` the
// photo (fixed height in the slider, 16:10 in the grid). `stat` (homepage)
// adds the HSC stat over the photo on hover (IndustryStat).

// Sector rule colours (mockup); Health & Social Care takes the brand accent.
const SECTOR_RULE: Record<string, string> = {
  "health-social-care": "#1d96fc",
  "facilities-management": "#58b368",
  "local-government": "#b9b26a",
  "industrial-services": "#6a9fb5",
  "energy-utilities": "#8fae5a",
};

export default function IndustryCard({
  industry,
  className,
  mediaClassName,
  sizes,
  stat,
}: {
  industry: (typeof INDUSTRIES)[number];
  stat?: IndustryStatData;
  className?: string;
  mediaClassName?: string;
  sizes: string;
}) {
  return (
    <Link
      href={industry.href}
      className={cn(
        "group flex flex-col gap-5 rounded-lg bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded", mediaClassName)}>
        <Image
          src={industry.image}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-sognos-care-dark/40 via-transparent to-sognos-care-dark/30"
        />
        {/* Hairline frame. With a stat (homepage) it draws in from the
            centre on hover, as in the HSC mockup; otherwise always shown. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-[6%] rounded border border-white/60",
            stat &&
              "opacity-0 [clip-path:inset(50%_round_4px)] transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(.23,1,.32,1)] group-hover:opacity-100 group-hover:[clip-path:inset(0_round_4px)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_round_4px)] motion-reduce:[clip-path:none]",
          )}
        />
        {stat && (
          <>
            {/* Deepens the wash under the stat so white type holds on light photos. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-sognos-care-dark/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <IndustryStat {...stat} />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3">
        <span
          aria-hidden="true"
          className="mb-3 h-1 w-10 rounded-full"
          style={{ background: SECTOR_RULE[industry.slug] ?? "#1d96fc" }}
        />
        <h3 className={`${TYPE.h3Small} text-sognos-heading`}>{industry.name}</h3>
        <p className={`mt-2 line-clamp-3 ${TYPE.small} text-sognos-body`}>
          {industry.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-sognos-heading group-hover:text-sognos-blue-accent">
          Explore
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
