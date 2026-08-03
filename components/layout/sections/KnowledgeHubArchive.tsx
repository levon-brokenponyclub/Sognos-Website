"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KnowledgeHubSearchDialog,
  type KnowledgeHubSearchItem,
} from "@/components/ui/knowledge-hub-search-dialog";

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

// `Events` and `Webinar` stay for now, deliberately. Both are becoming `event`
// documents with a `format`, but until `/events` exists there is nowhere else
// for a reader to find them, so the pills remain as a transition. Drop them to
// `["Milestone", "News", "Insights"]` once the events archive ships and the two
// posts still carrying those categories have been re-authored.
const CATEGORIES = [
  "Milestone",
  "News",
  "Events",
  "Webinar",
  "Insights",
] as const;

const INITIAL_ARTICLE_LIMIT = 4;

/** One upcoming event row. Strings, already formatted — this is a Client
 *  Component, so the timezone-sensitive formatting happens on the server. */
export type UpcomingEvent = {
  slug: string;
  format: string;
  title: string;
  href: string;
  /** e.g. "17 Sep 2026" */
  date: string;
  /** e.g. "8:30 am - 10:30 am", or just the start when the event has no end. */
  time: string;
  location: string;
  image: string;
};

/** The most recent customer story, for the dark band. */
export type FeaturedStory = {
  slug: string;
  company: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string | null;
  image: string;
  logo: string;
};

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

// Renders nothing when there is nothing upcoming — an "Upcoming Events" rail
// over an empty column is worse than no section at all, and unlike the
// hardcoded version this can now genuinely be empty.
function EventsSection({ events }: { events: UpcomingEvent[] }) {
  if (events.length === 0) return null;

  return (
    <section className="w-full border-b border-sognos-line bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — label rail */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="inline-flex items-center gap-3 text-base font-medium text-sognos-muted">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-sognos-blue-accent"
              />
              Upcoming Events
            </p>
          </div>

          {/* Right — event rows */}
          <div className="lg:col-[3/-1]">
            <div className="divide-y divide-white">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={event.href}
                  className="group grid min-h-[400px] rounded overflow-hidden bg-gray-50 transition-colors duration-200 hover:bg-gray-100 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,1fr)]"
                >
                  <div className="flex min-h-[360px] flex-col justify-between p-7 md:p-9 lg:p-10">
                    <div>
                      <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                        {event.format}
                      </p>

                      <h2 className="mt-5 max-w-4xl font-heading text-3xl font-normal tracking-tight leading-tight text-sognos-heading text-balance group-hover:text-sognos-blue-accent md:text-4xl lg:text-4xl">
                        {event.title}
                      </h2>
                    </div>

                    <dl className="border-t border-sognos-line text-xs font-semibold uppercase tracking-widest">
                      <div className="grid grid-cols-[120px_1fr] gap-6 border-b border-sognos-line py-4">
                        <dt className="text-sognos-muted">Date</dt>
                        <dd className="text-right text-sognos-body">
                          {event.date}
                          <span className="mx-4 text-sognos-body">-</span>
                          {event.time}
                        </dd>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] gap-6 py-4">
                        <dt className="text-sognos-muted">Location</dt>
                        <dd className="text-right font-medium text-sognos-body">
                          {event.location}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Archive ──────────────────────────────────────────────────────────────────

export default function KnowledgeHubArchive({
  articles,
  upcomingEvents = [],
  featuredStory = null,
  initialCategory = null,
  title,
  description,
}: {
  articles: Article[];
  upcomingEvents?: UpcomingEvent[];
  featuredStory?: FeaturedStory | null;
  initialCategory?: string | null;
  title: string;
  description?: string;
}) {
  const [selection, setSelection] = useState<PillSelection>(() =>
    resolveSelection(initialCategory),
  );
  const [showAllArticles, setShowAllArticles] = useState(false);

  const isFeatured = selection === "featured";
  const featured = articles[0] ?? null;

  // Featured: all-but-first, unfiltered. All: full array, unfiltered.
  // Category: full array, filtered (no featured card takes a slot here).
  const grid = isFeatured
    ? articles.slice(1)
    : selection === "all"
      ? articles
      : articles.filter((a) => a.category === selection);
  const shouldLimitArticles = isFeatured && !showAllArticles;
  const visibleGrid = shouldLimitArticles
    ? grid.slice(0, INITIAL_ARTICLE_LIMIT)
    : grid;
  const hasMoreArticles = isFeatured && grid.length > visibleGrid.length;

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

  const articleSearchItems: KnowledgeHubSearchItem[] = articles.map(
    (article) => ({
      href: article.href,
      title: article.title,
      category: article.category,
      meta: [
        article.publishedAt ? formatDate(article.publishedAt) : null,
        article.readTime,
      ]
        .filter(Boolean)
        .join(" · "),
      image: article.image,
      keywords: [
        article.excerpt,
        article.industry,
        article.useCase,
        article.author,
      ],
    }),
  );
  const eventSearchItems: KnowledgeHubSearchItem[] = upcomingEvents.map(
    (event) => ({
      href: event.href,
      title: event.title,
      category: "Event",
      meta: `${event.date} · ${event.location}`,
      image: event.image,
      keywords: [event.format, event.time],
    }),
  );
  const customerStorySearchItem: KnowledgeHubSearchItem | null = featuredStory
    ? {
        href: `/customer-stories/${featuredStory.slug}`,
        title: featuredStory.title,
        category: "Customer Story",
        meta: [featuredStory.date, featuredStory.readTime]
          .filter(Boolean)
          .join(" · "),
        image: featuredStory.image,
        keywords: [featuredStory.company, featuredStory.excerpt],
      }
    : null;
  const searchItems = [
    ...articleSearchItems,
    ...eventSearchItems,
    ...(customerStorySearchItem ? [customerStorySearchItem] : []),
  ];
  const recentSearchItems = [
    articleSearchItems[0],
    eventSearchItems[0],
    customerStorySearchItem,
  ].filter((item): item is KnowledgeHubSearchItem => Boolean(item));

  return (
    <>
      {/* Header — title/description, then category pills below */}
      <section className="bg-white pt-32 pb-8 lg:pt-40">
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
              <p className="mb-16 inline-block text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Knowledge Hub
              </p>
            )}
            <h1 className="font-heading font-normal text-sognos-heading text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
              {headerTitle}
            </h1>
            {isFeatured && description && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Category pills — below title/description. Mobile: horizontal scroll slider. md+: wrap. */}
          <div className="mt-10 flex items-center gap-3 ">
            <div className="scrollbar-hide -ml-6 flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto pl-6 md:ml-0 md:flex-wrap md:overflow-visible md:pl-0">
              {/* Special pills — no count badge */}
              <button
                onClick={() => {
                  setSelection("featured");
                  setShowAllArticles(false);
                }}
                className={pillClass(selection === "featured")}
              >
                Featured
              </button>
              <button
                onClick={() => {
                  setSelection("all");
                  setShowAllArticles(false);
                }}
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
                    onClick={() => {
                      setSelection(cat);
                      setShowAllArticles(false);
                    }}
                    className={pillClass(isActive)}
                  >
                    {cat}
                    {count > 0 && (
                      <span
                        className={`ml-1.5 text-xs ${
                          isActive
                            ? "text-white/70"
                            : "text-sognos-blue-accent"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="shrink-0">
              <KnowledgeHubSearchDialog
                items={searchItems}
                recentItems={recentSearchItems}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured article — two-up: image left, meta right (Featured state only) */}
      {isFeatured && featured && (
        <section className="bg-white p-10 border-b border-t border-sognos-line mb-12 lg:mb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={featured.href}
              className="group grid items-start gap-8 lg:grid-cols-[920px_1fr] lg:gap-8"
            >
              {/* Image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-lg">
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
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-sognos-body">
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
              Latest articles
            </p>
          )}
          {grid.length > 0 ? (
            <>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
                {visibleGrid.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
              {hasMoreArticles && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllArticles(true)}
                    className="rounded bg-sognos-navy px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Load all articles
                  </button>
                </div>
              )}
            </>
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

      {/* Case Study — full-bleed dark band. The newest story from Sanity; this
          was hardcoded to Gentari (Nov 2024) while the CMS held eight. */}
      {featuredStory && (
        <section className="bg-sognos-navy py-16 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={`/customer-stories/${featuredStory.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Left */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                  Customer Story
                </p>
                <h2 className="mt-6 font-heading text-3xl font-normal tracking-tight leading-tight text-white text-balance group-hover:text-sognos-blue-accent md:text-4xl lg:text-4xl ">
                  {featuredStory.title}
                </h2>
                <p className="mt-5 max-w-2xl line-clamp-3 text-base leading-relaxed text-white/80 text-balance">
                  {featuredStory.excerpt}
                </p>
                <div className="mt-10 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {featuredStory.date}
                  </span>
                  {featuredStory.readTime && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        {featuredStory.readTime}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* Right — customer story cover image */}
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={featuredStory.company}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={featuredStory.image}
                />
                {featuredStory.logo && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={featuredStory.company}
                      className="h-14 w-auto max-w-[180px] object-contain brightness-0 invert"
                      src={featuredStory.logo}
                    />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <EventsSection events={upcomingEvents} />
    </>
  );
}
