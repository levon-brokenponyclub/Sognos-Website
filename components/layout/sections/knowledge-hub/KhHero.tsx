import Image from "next/image";
import Link from "next/link";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { formatDate } from "@/lib/formatDate";
import { FOCUS, newsletterLinkProps, type KhPost } from "./types";

// Hero · option 1 "Light + featured": title and description beside the search
// field, then the newest post as a featured card on a tint panel.

export default function KhHero({
  title,
  description,
  featured,
  query,
  onQuery,
}: {
  title: string;
  description?: string;
  featured?: KhPost;
  query: string;
  onQuery: (q: string) => void;
}) {
  return (
    <section className="bg-white pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-6 md:grid-cols-2">
        <div>
          {/* Caps at 6xl (TYPE.h1 goes to 7xl at lg) — matches the other ported heroes. */}
          <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-sognos-heading md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className={`mt-5 ${TYPE.heroSub} text-sognos-body`}>{description}</p>
          )}
        </div>
        <label className="relative block w-full md:max-w-md md:justify-self-end">
          <span className="sr-only">Search the Knowledge Hub</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-sognos-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search articles"
            className="h-12 w-full rounded-full border border-sognos-line bg-white pr-4 pl-11 text-sm text-sognos-heading outline-none transition-colors placeholder:text-sognos-muted focus:border-sognos-heading"
          />
        </label>
      </div>

      {featured && (
        <div className="mx-auto mt-14 max-w-7xl px-6">
          <Link
            href={featured.href}
            {...newsletterLinkProps(featured.category)}
            className={`group grid grid-cols-1 items-stretch gap-3 rounded-lg bg-sognos-tint p-3 md:grid-cols-[3fr_2fr] lg:gap-4 ${FOCUS}`}
          >
            {/* From md the row height comes from the copy column; a fixed
                aspect there would widen the image past its track. */}
            <div className="relative aspect-[2/1] overflow-hidden rounded bg-white md:aspect-auto">
              {featured.imageLarge && (
                <Image
                  src={featured.imageLarge}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              )}
            </div>
            <div className="flex flex-col justify-between gap-8 p-5 lg:p-8">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-sognos-heading">
                  <span aria-hidden="true" className="size-1.5 bg-sognos-blue-accent" />
                  Featured &middot; {featured.category}
                </p>
                <h2 className={`mt-6 ${TYPE.h2} text-sognos-heading`}>{featured.title}</h2>
                <p className={`mt-4 line-clamp-4 ${TYPE.body} text-sognos-body`}>
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-sognos-line pt-5">
                <span className="text-sm text-sognos-muted">
                  {[
                    featured.author ?? "Sognos Solutions",
                    featured.publishedAt ? formatDate(featured.publishedAt) : null,
                    featured.readTime,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sognos-heading group-hover:text-sognos-roster-ink">
                  Read more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
