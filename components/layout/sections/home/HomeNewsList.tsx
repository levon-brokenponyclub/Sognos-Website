import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import type { NewsInsightArticle } from "@/components/layout/sections/NewsInsightSection";

// Home · News & Insights — Inspector option C "Editorial" (2026-11-02):
// header with "View more resources", then the latest items as hairline rows:
// date, category, title, arrow.

// Posts carry ISO dates; events arrive pre-formatted.
function displayDate(date?: string) {
  if (!date || !/^\d{4}-\d{2}-\d{2}/.test(date)) return date ?? "";
  return new Date(date).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Australia/Sydney",
  });
}

export default function HomeNewsList({ articles }: { articles: NewsInsightArticle[] }) {
  return (
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-3xl flex-col gap-4">
            <SectionLabel>Knowledge Hub</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>The latest from Sognos</h2>
            <p className={`${TYPE.lede} text-sognos-body`}>
              News, insights and milestones from across care operations,
              workforce scheduling and the sectors we serve.
            </p>
          </div>
          <Link
            href="/knowledge-hub"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sognos-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
          >
            View more resources
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
        <ol className="mt-12 border-b border-sognos-line">
          {articles.map((a) => (
            <li key={`${a.kind}-${a.slug}`}>
              <Link
                href={a.href}
                // Newsletters are full email HTML pages: new tab, as in the Knowledge Hub.
                {...(a.category === "Newsletter" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-1 items-baseline gap-2 border-t border-sognos-line py-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent md:grid-cols-[9rem_10rem_1fr_auto] md:gap-8"
              >
                <span className="text-sm tabular-nums text-sognos-muted">{displayDate(a.date)}</span>
                {/* Ink #0b6fc4 (the Sognos brand ink; same value as roster-ink)
                    for AA on tint — the accent is only 3:1 at 12px. */}
                <span className="text-xs font-medium tracking-widest text-sognos-roster-ink uppercase">
                  {a.category}
                </span>
                <span className="font-heading text-xl text-balance text-sognos-heading transition-colors group-hover:text-sognos-blue-accent md:text-2xl">
                  {a.title}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-sognos-blue-accent transition-transform group-hover:translate-x-0.5 md:block"
                >
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
