import { CTA_VARIANT_STYLES } from "@/lib/content/ctaSection";
import type { StoryStat } from "@/lib/customerStoryBrand";

// Closing stats for a customer story — the dark two-up that lands at the end of
// the article, after the reference set (routable.com/customers/excel-plumbing).
// There is deliberately no stat row in the hero: the figures appear once, at
// the point the reader has been given the context to read them.
//
// Cell styling comes from CTA_VARIANT_STYLES rather than being restated here,
// so the house stat block has exactly one definition and these cannot drift
// from the ones on the CTA. Static, not counted up: values like "On time" have
// no number to animate, and a server component keeps the article free of a
// client boundary it doesn't otherwise need.

export default function StoryResultStats({
  stats,
  className = "",
}: {
  stats: StoryStat[];
  className?: string;
}) {
  if (stats.length === 0) return null;

  const v = CTA_VARIANT_STYLES.dark;

  return (
    <div className={`mt-16 grid grid-cols-2 gap-3 lg:gap-4 ${className}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-6 lg:p-8 ${v.bgClass}`}
        >
          <p
            className={`font-heading text-4xl font-medium leading-none tracking-tight lg:text-5xl ${v.textClass}`}
          >
            {stat.value}
          </p>
          <p
            className={`mt-8 text-xs font-semibold uppercase tracking-widest lg:mt-10 ${v.labelClass}`}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
