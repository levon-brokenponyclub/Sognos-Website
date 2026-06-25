"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
};

const CATEGORIES = [
  "Milestone",
  "News",
  "Events",
  "Webinar",
  "Insights",
] as const;

const INDUSTRIES = [
  "Health & Social Care",
  "Facilities Management",
  "Local Government",
  "Industrial Services",
  "Energy & Utilities",
];

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Insights: "bg-violet-50 text-violet-700 border-violet-100",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col overflow-hidden rounded-lg bg-white p-2"
    >
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-3 left-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            BADGE_STYLES[article.category] ??
            "bg-neutral-50 text-neutral-600 border-neutral-100"
          }`}
        >
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-3 pb-1">
        <h3 className="font-heading text-base font-medium leading-snug tracking-tight text-sognos-body line-clamp-3">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sognos-body line-clamp-2">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-sognos-body transition-colors duration-200 group-hover:text-sognos-body/70">
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
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
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    if (activeCategory && a.category !== activeCategory) return false;
    if (activeIndustry && a.industry !== activeIndustry) return false;
    return true;
  });

  const hasFilter = activeCategory || activeIndustry;

  return (
    <section className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-heading tracking-tight mb-6">
            {activeCategory ?? "All Articles"}
          </h2>

          <div className="flex items-center gap-3">
            {/* Industry dropdown */}
            <div className="relative">
              <select
                value={activeIndustry ?? ""}
                onChange={(e) => setActiveIndustry(e.target.value || null)}
                className="appearance-none cursor-pointer rounded-full border border-(--sognos-line) bg-white py-2.5 pl-4 pr-9 text-xs font-semibold uppercase tracking-widest text-sognos-body focus:border-sognos-navy-dark focus:outline-none"
              >
                <option value="">Select by Industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sognos-muted"
              />
            </div>

            {hasFilter && (
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setActiveIndustry(null);
                }}
                className="text-xs font-medium text-sognos-muted underline hover:text-sognos-body"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Body: sidebar + grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Col 1: Category filters - sticky */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
              <button
                onClick={() => setActiveCategory(null)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 text-left",
                  activeCategory === null
                    ? "border-sognos-navy-dark bg-sognos-navy-dark text-white"
                    : "border-(--sognos-line) bg-white text-sognos-body hover:border-sognos-navy-dark/40",
                ].join(" ")}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 text-left",
                    activeCategory === cat
                      ? "border-sognos-navy-dark bg-sognos-navy-dark text-white"
                      : "border-(--sognos-line) bg-white text-sognos-body hover:border-sognos-navy-dark/40",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Col 2-3: Cards */}
          <div>
            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-(--sognos-line) bg-white px-8 py-16 text-center">
                <p className="font-heading text-xl text-sognos-heading">
                  No articles match those filters
                </p>
                <p className="mt-2 text-sm text-sognos-muted">
                  Try removing a filter to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
