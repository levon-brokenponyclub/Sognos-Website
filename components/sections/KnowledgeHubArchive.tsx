"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  industry: string | null;
  useCase: string | null;
  publishedAt?: string | null;
  readTime?: string | null;
  author?: string | null;
};

const CATEGORIES = [
  "Milestone",
  "News",
  "Events",
  "Webinar",
  "Insights",
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${day}, ${year}`;
}

function ArticleMeta({
  publishedAt,
  readTime,
}: {
  publishedAt?: string | null;
  readTime?: string | null;
}) {
  if (!publishedAt && !readTime) return null;
  return (
    <p className="mt-10 text-xs font-base tracking-wide text-sognos-heading uppercase">
      {publishedAt && (
        <span className="text-sognos-muted">{formatDate(publishedAt)}</span>
      )}
      {publishedAt && readTime && " — "}
      {readTime && readTime.toUpperCase()}
    </p>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col pb-4 border-b border-gray-200"
    >
      <div className="relative max-h-52 aspect-[16/10] w-full overflow-hidden rounded">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-200/70" />
        )}
      </div>
      <div className="mt-4 flex flex-col flex-1">
        <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 h-6.5 py-1 text-xs font-normal text-sognos-body">
          {article.category}
        </span>
        <h3 className="mt-4 font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading line-clamp-2 transition-colors group-hover:text-sognos-blue-accent">
          {article.title}
        </h3>
        <ArticleMeta
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />
      </div>
    </Link>
  );
}

// ─── Archive ──────────────────────────────────────────────────────────────────

export default function KnowledgeHubArchive({
  articles,
  initialCategory = null,
}: {
  articles: Article[];
  initialCategory?: string | null;
}) {
  const safeInitialCategory =
    initialCategory &&
    (CATEGORIES as readonly string[]).includes(initialCategory)
      ? initialCategory
      : null;
  const [activeCategory, setActiveCategory] = useState<string | null>(
    safeInitialCategory,
  );

  const featured = articles[0] ?? null;
  const grid = articles
    .slice(1)
    .filter((a) => (activeCategory ? a.category === activeCategory : true));

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat] = articles.filter((a) => a.category === cat).length;
      return acc;
    },
    {},
  );

  return (
    <>
      {/* Category pills */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl pb-10 lg:px-6">
          {/* Mobile: horizontal scroll snap slider. md+: wrap. */}
          <div className="scrollbar-hide -mx-6 flex flex-nowrap items-center gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <button
              onClick={() => setActiveCategory(null)}
              className={[
                "shrink-0 rounded px-2.5 py-1 text-sm font-normal transition-colors duration-150",
                activeCategory === null
                  ? "bg-sognos-navy text-white"
                  : "bg-gray-100 text-sognos-body hover:bg-gray-200",
              ].join(" ")}
            >
              All Articles
            </button>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className={[
                    "shrink-0 rounded px-2.5 py-1 text-sm font-normal transition-colors duration-150",
                    isActive
                      ? "bg-sognos-navy text-white"
                      : "bg-gray-100 text-sognos-body hover:bg-gray-200",
                  ].join(" ")}
                >
                  {cat}
                  {count > 0 && (
                    <span
                      className={`ml-1.5 text-xs ${
                        isActive ? "text-white/70" : "text-sognos-blue-accent"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured article — two-up: image left, meta right */}
      {featured && (
        <section className="bg-white pb-12 lg:pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={featured.href}
              className="group grid items-center gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                {featured.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200/70" />
                )}
              </div>
              {/* Meta */}
              <div>
                <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 h-6.5 py-1 text-xs font-normal text-sognos-body">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading transition-colors group-hover:text-sognos-navy-dark/70 md:text-3xl lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-sognos-muted">
                  {featured.excerpt}
                </p>
                <ArticleMeta
                  publishedAt={featured.publishedAt}
                  readTime={featured.readTime}
                />
                {featured.author && (
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
                      {featured.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-sognos-heading">
                      {featured.author}
                    </span>
                  </div>
                )}
              </div>
            </Link>
            <hr className="mt-12 border-gray-200" />
          </div>
        </section>
      )}

      {/* All articles — 4-up grid */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-sm font-semibold text-sognos-heading">
            <span className="mr-1.5 text-sognos-blue-accent">●</span>All
            articles
          </p>
          {grid.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
              {grid.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-(--sognos-line) bg-white px-8 py-16 text-center">
              <p className="font-heading text-xl text-sognos-heading">
                No articles match those filters
              </p>
              <p className="mt-2 text-sm text-sognos-muted">
                Try removing a filter to see more results.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Case Study — full-bleed dark band */}
      <section className="bg-sognos-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
                <span className="mr-1.5 text-sognos-blue-accent">●</span>Case
                Study
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
                Sognos helps Flourish Australia modernise service delivery with
                a single Dynamics 365 platform
              </h2>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-white/50">January 2025</span>
                <span className="text-white/30">·</span>
                <span className="text-sm text-white/50">5 min read</span>
              </div>
            </div>
            {/* Right — cover image placeholder */}
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              <span className="text-sm font-medium text-gray-400">
                Cover image — placeholder
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
