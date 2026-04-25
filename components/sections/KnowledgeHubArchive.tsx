"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  industry: string | null;
  useCase: string | null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    slug: "sognos-9-years",
    category: "Milestone",
    title: "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    excerpt: "Today marks a major milestone – 9 years of Sognos Solutions. Since our founding in Australia, our journey through digital transformation has been shaped by bold thinking, trusted partnerships, and a passion for delivering impactful technology solutions.",
    href: "https://sognos.com.au/sognos-solutions-celebrates-9-years-of-growth-innovation-and-microsoft-dynamics-365-expertise/",
    image: "/images/news/sognos-9-years.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "north-sydney-office",
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    excerpt: "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.",
    href: "https://sognos.com.au/sognos-solutions-moves-to-new-office-in-north-sydney/",
    image: "/images/news/north-sydney-office.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "new-zealand-launch",
    category: "News",
    title: "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    excerpt: "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This expansion was marked by a milestone event at Microsoft's Auckland offices.",
    href: "https://sognos.com.au/sognos-solutions-expands-to-new-zealand-with-official-launch-at-microsoft-house-in-auckland/",
    image: "/images/news/new-zealand-launch.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "india-office",
    category: "News",
    title: "New Beginnings | Office Premises in India",
    excerpt: "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India — expanding our delivery capability and global footprint.",
    href: "https://sognos.com.au/new-beginnings-office-premises-in-india/",
    image: "/images/news/india-office.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "fsm-summit-2024",
    category: "Events",
    title: "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    excerpt: "The Field Service Management (FSM) Summit 2024 in Sydney brought together industry innovators. Sognos participated as a Microsoft partner specialising in field service technology.",
    href: "https://sognos.com.au/sognos-at-fsm-summit-2024-driving-the-future-of-field-service-in-sydney/",
    image: "/images/news/fsm-summit-2024.webp",
    industry: "Facilities Management",
    useCase: "Field Service",
  },
  {
    slug: "participant-care-webinar",
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    excerpt: "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    href: "https://sognos.com.au/sognos-webinar-series-reinventing-patient-and-participant-care/",
    image: "/images/news/participant-care-webinar.webp",
    industry: "Health & Social Care",
    useCase: "Care Operations",
  },
];

const CATEGORIES = ["Milestone", "News", "Events", "Webinar"] as const;
const INDUSTRIES = [
  "Health & Social Care",
  "Facilities Management",
  "Local Government",
  "Industrial Services",
  "Energy & Utilities",
];
const USE_CASES = [
  "Care Operations",
  "Workforce Scheduling",
  "Compliance",
  "Family Context Mapping",
  "Field Service",
];

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-(--sognos-card-border) bg-white transition-shadow duration-200 hover:shadow-md"
    >
      <div className="h-44 w-full shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            BADGE_STYLES[article.category] ??
            "bg-neutral-50 text-neutral-600 border-neutral-100"
          }`}
        >
          {article.category}
        </span>
        <h3 className="font-heading text-base font-medium leading-snug tracking-tight text-sognos-text-heading line-clamp-3">
          {article.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-sognos-text-body line-clamp-2">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 group-hover:text-brand/70">
          Read More
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

export default function KnowledgeHubArchive() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);

  const filtered = ARTICLES.filter((a) => {
    if (activeCategory && a.category !== activeCategory) return false;
    if (activeIndustry && a.industry !== activeIndustry) return false;
    if (activeUseCase && a.useCase !== activeUseCase) return false;
    return true;
  });

  const hasFilter = activeCategory || activeIndustry || activeUseCase;

  return (
    <section className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
            {activeCategory ?? "All Articles"}
          </h2>

          <div className="flex items-center gap-3">
            {/* Industry dropdown */}
            <div className="relative">
              <select
                value={activeIndustry ?? ""}
                onChange={(e) => setActiveIndustry(e.target.value || null)}
                className="appearance-none cursor-pointer rounded-full border border-(--sognos-card-border) bg-white py-2.5 pl-4 pr-9 text-xs font-semibold uppercase tracking-widest text-sognos-text-body focus:border-prussian-blue-950 focus:outline-none"
              >
                <option value="">Select by Industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sognos-text-muted"
              />
            </div>

            {/* Use Case dropdown */}
            <div className="relative">
              <select
                value={activeUseCase ?? ""}
                onChange={(e) => setActiveUseCase(e.target.value || null)}
                className="appearance-none cursor-pointer rounded-full border border-(--sognos-card-border) bg-white py-2.5 pl-4 pr-9 text-xs font-semibold uppercase tracking-widest text-sognos-text-body focus:border-prussian-blue-950 focus:outline-none"
              >
                <option value="">Select by Use Case</option>
                {USE_CASES.map((uc) => (
                  <option key={uc} value={uc}>{uc}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sognos-text-muted"
              />
            </div>

            {hasFilter && (
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setActiveIndustry(null);
                  setActiveUseCase(null);
                }}
                className="text-xs font-medium text-sognos-text-muted underline hover:text-sognos-text-body"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Body: sidebar + grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[160px_1fr]">

          {/* Col 1: Category filters — sticky */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
              <button
                onClick={() => setActiveCategory(null)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 text-left",
                  activeCategory === null
                    ? "border-prussian-blue-950 bg-prussian-blue-950 text-white"
                    : "border-(--sognos-card-border) bg-white text-sognos-text-body hover:border-prussian-blue-950/40",
                ].join(" ")}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 text-left",
                    activeCategory === cat
                      ? "border-prussian-blue-950 bg-prussian-blue-950 text-white"
                      : "border-(--sognos-card-border) bg-white text-sognos-text-body hover:border-prussian-blue-950/40",
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
              <div className="rounded-2xl border border-(--sognos-card-border) bg-white px-8 py-16 text-center">
                <p className="font-heading text-xl text-sognos-text-heading">
                  No articles match those filters
                </p>
                <p className="mt-2 text-sm text-sognos-text-muted">
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
