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

// Three-way pill state: "featured" (default) shows the featured block + intro
// copy; "all" and each category filter the grid and swap the page title.
type PillSelection = "featured" | "all" | (typeof CATEGORIES)[number];

function resolveSelection(initial?: string | null): PillSelection {
  if (initial === "featured") return "featured";
  if (initial === "all") return "all";
  if (initial && (CATEGORIES as readonly string[]).includes(initial)) {
    return initial as (typeof CATEGORIES)[number];
  }
  return "featured";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pillClass(isActive: boolean): string {
  return [
    "shrink-0 rounded px-2.5 py-1 text-sm font-normal transition-colors duration-150",
    isActive
      ? "bg-sognos-navy text-white"
      : "bg-gray-100 text-sognos-body hover:bg-gray-200",
  ].join(" ");
}

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
  title,
  description,
}: {
  articles: Article[];
  initialCategory?: string | null;
  title: string;
  description?: string;
}) {
  const [selection, setSelection] = useState<PillSelection>(() =>
    resolveSelection(initialCategory),
  );

  const isFeatured = selection === "featured";
  const featured = articles[0] ?? null;

  // Featured: all-but-first, unfiltered. All: full array, unfiltered.
  // Category: full array, filtered (no featured card takes a slot here).
  const grid = isFeatured
    ? articles.slice(1)
    : selection === "all"
      ? articles
      : articles.filter((a) => a.category === selection);

  // Header title tracks the pill: intro title in Featured, else the pill label.
  const headerTitle = isFeatured
    ? title
    : selection === "all"
      ? "All Articles"
      : selection;

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat] = articles.filter((a) => a.category === cat).length;
      return acc;
    },
    {},
  );

  return (
    <>
      {/* Header — title/description, then category pills below */}
      <section className="bg-white pt-32 pb-10 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          {/* Title zone — fixed height so the pills below never shift between
              states. Featured: title + intro copy, top-aligned. Non-featured:
              eyebrow + title pushed to the bottom (title moves down, eyebrow
              above it), description hidden. */}
          <div
            className={`flex flex-col lg:min-h-[160px] ${
              isFeatured ? "" : "lg:justify-end"
            }`}
          >
            {!isFeatured && (
              <p className="mb-4 inline-block text-xs font-semibold uppercase tracking-tight text-sognos-muted">
                Knowledge Hub
              </p>
            )}
            <h1 className="font-heading font-normal text-sognos-header text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
              {headerTitle}
            </h1>
            {isFeatured && description && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Category pills — below title/description. Mobile: horizontal scroll slider. md+: wrap. */}
          <div className="scrollbar-hide -mx-6 mt-10 flex flex-nowrap items-center gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {/* Special pills — no count badge */}
            <button
              onClick={() => setSelection("featured")}
              className={pillClass(selection === "featured")}
            >
              Featured
            </button>
            <button
              onClick={() => setSelection("all")}
              className={pillClass(selection === "all")}
            >
              All Articles
            </button>
            {/* Category pills — keep counts */}
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isActive = selection === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelection(cat)}
                  className={pillClass(isActive)}
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

      {/* Featured article — two-up: image left, meta right (Featured state only) */}
      {isFeatured && featured && (
        <section className="bg-white pb-12 lg:pb-16 border-b border-sognos-line mb-12 lg:mb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={featured.href}
              className="group grid items-start gap-8 lg:grid-cols-[760px_1fr] lg:gap-12"
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
                  <div className="h-full w-full bg-gray-100" />
                )}
              </div>
              {/* Meta — category/title/excerpt top, date/read-time bottom */}
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex w-fit items-center rounded bg-gray-100 px-2.5 h-6.5 py-1 text-xs font-normal text-sognos-heading">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-normal tracking-tight text-sognos-heading text-pretty md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-600">
                    {featured.excerpt}
                  </p>
                </div>
                <ArticleMeta
                  publishedAt={featured.publishedAt}
                  readTime={featured.readTime}
                />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All articles — 4-up grid */}
      <section className="bg-white pb-12 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {isFeatured && (
            <p className="mb-8 font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
              All articles
            </p>
          )}
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
