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
    title:
      "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    excerpt:
      "Today marks a major milestone – 9 years of Sognos Solutions. Since our founding in Australia, our journey through digital transformation has been shaped by bold thinking, trusted partnerships, and a passion for delivering impactful technology solutions.",
    href: "/knowledge-hub/sognos-9-years",
    image: "/images/news/sognos-9-years.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "north-sydney-office",
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    excerpt:
      "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.",
    href: "/knowledge-hub/north-sydney-office",
    image: "/images/news/north-sydney-office.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "new-zealand-launch",
    category: "News",
    title:
      "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    excerpt:
      "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This expansion was marked by a milestone event at Microsoft's Auckland offices.",
    href: "/knowledge-hub/new-zealand-launch",
    image: "/images/news/new-zealand-launch.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "india-office",
    category: "News",
    title: "New Beginnings | Office Premises in India",
    excerpt:
      "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India — expanding our delivery capability and global footprint.",
    href: "/knowledge-hub/india-office",
    image: "/images/news/india-office.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "fsm-summit-2024",
    category: "Events",
    title:
      "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    excerpt:
      "The Field Service Management (FSM) Summit 2024 in Sydney brought together industry innovators. Sognos participated as a Microsoft partner specialising in field service technology.",
    href: "/knowledge-hub/fsm-summit-2024",
    image: "/images/news/fsm-summit-2024.webp",
    industry: "Facilities Management",
    useCase: "Frontline",
  },
  {
    slug: "participant-care-webinar",
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    excerpt:
      "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    href: "/knowledge-hub/participant-care-webinar",
    image: "/images/news/participant-care-webinar.webp",
    industry: "Health & Social Care",
    useCase: "Care Operations",
  },
  {
    slug: "smarter-facilities-management-with-dynamics-365",
    category: "Insights",
    title: "Smarter facilities management with Dynamics 365",
    excerpt:
      "Facilities management can often be an intricate balancing act. You're balancing assets, people, contractors, compliance, and customer expectations across multiple sites, often with work that can't wait until tomorrow.",
    href: "/knowledge-hub/smarter-facilities-management-with-dynamics-365",
    image: "/images/news/smarter-facilities-mngmt-scaled.avif",
    industry: "Facilities Management",
    useCase: null,
  },
  {
    slug: "from-chaos-to-control-modernising-field-services",
    category: "Insights",
    title: "From chaos to control: Modernising field services",
    excerpt:
      "Field services do not usually fall into chaos overnight. It creeps in. A handful of urgent jobs arrive, priorities change mid-day, and the schedule gets stitched together with phone calls, spreadsheets, and best guesses.",
    href: "/knowledge-hub/from-chaos-to-control-modernising-field-services",
    image: "/images/news/chaos-to-calm-scaled.avif",
    industry: null,
    useCase: null,
  },
  {
    slug: "the-aged-care-quality-standards-whats-changing-in-2026-and-how-to-implement",
    category: "Insights",
    title:
      "The aged care quality standards: What's changing in 2026, and how to implement",
    excerpt:
      "Under the strengthened Aged Care Quality Standards brought in on November 1, 2025, quality of care is judged less by intent and more by what you can demonstrate in everyday records.",
    href: "/knowledge-hub/the-aged-care-quality-standards-whats-changing-in-2026-and-how-to-implement",
    image: "/images/news/innovation-aged-care-scaled.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "innovation-in-aged-care-what-australia-can-learn-from-systems-already-under-strain",
    category: "Insights",
    title:
      "Innovation in aged care: What Australia can learn from systems already under strain",
    excerpt:
      "Australia has entered a new era in aged care. With the rights-based Aged Care Act and the Support at Home program now in place, expectations are shifting from 'having policies' to consistently demonstrating safe, person-centred care.",
    href: "/knowledge-hub/innovation-in-aged-care-what-australia-can-learn-from-systems-already-under-strain",
    image: "/images/news/NDIS-768x513.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "data-residency-in-australian-healthcare-sorting-fact-from-fiction",
    category: "Insights",
    title: "Data residency in Australian healthcare: Sorting fact from fiction",
    excerpt:
      "A persistent myth in healthcare IT is that data must stay onshore to stay safe. Many providers — especially in mental health, disability, and aged care — are told that hosting data overseas is non-compliant or even illegal.",
    href: "/knowledge-hub/data-residency-in-australian-healthcare-sorting-fact-from-fiction",
    image: "/images/news/data-residency-768x512.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "compliance-without-the-paperwork-finding-the-right-ndis-reporting-tools-for-your-organisation",
    category: "Insights",
    title:
      "Compliance without the paperwork: Finding the right NDIS reporting tools for your organisation",
    excerpt:
      "If you lead a disability service today, you can feel it — compliance is back at the centre of everything. The NDIS Commission expects every provider to run a working incident management system, document outcomes, and respond to audits with confidence.",
    href: "/knowledge-hub/compliance-without-the-paperwork-finding-the-right-ndis-reporting-tools-for-your-organisation",
    image: "/images/news/Good-compliance-768x511.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "aged-care-reform-2025-26-what-providers-need-to-do-now",
    category: "Insights",
    title: "Aged care reform 2025/26: What providers need to do now",
    excerpt:
      "Reform has landed. Now the real work begins. The new Aged Care Act and Support at Home program came into force, reshaping how aged care operates, funds and proves quality. It is the most significant structural change in a generation.",
    href: "/knowledge-hub/aged-care-reform-2025-26-what-providers-need-to-do-now",
    image: "/images/news/aged-care-reform-768x512.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "admin-overload-in-care-why-its-burning-out-frontline-workers",
    category: "Insights",
    title: "Admin overload in care: Why it's burning out frontline workers",
    excerpt:
      "Across Australia and New Zealand, frontline teams in care and community services are under pressure. Time with people is shrinking as screens take over the workday — and it's pushing good workers out the door.",
    href: "/knowledge-hub/admin-overload-in-care-why-its-burning-out-frontline-workers",
    image: "/images/news/admin-overload-768x405.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "mobile-care-app-solutions-empowering-your-frontline-workforce-with-dataverse",
    category: "Insights",
    title:
      "Mobile care app solutions: Empowering your frontline workforce with Dataverse",
    excerpt:
      "Frontline care relies on connection — between people, information, and place. Yet for many teams, mobile tools still slow things down. Coverage drops. Logins fail. Notes get written on paper and entered hours later.",
    href: "/knowledge-hub/mobile-care-app-solutions-empowering-your-frontline-workforce-with-dataverse",
    image: "/images/news/mobile-care-app-solutions-768x512.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "mental-health-and-disability-workforce-burnout-a-growing-crisis",
    category: "Insights",
    title: "Mental health and disability workforce burnout: A growing crisis",
    excerpt:
      "Across Australia, providers in mental health and disability care are facing a growing crisis. Recruitment is harder. Retention is slipping. Rosters are stretched thin — and the people who remain are carrying more than they should.",
    href: "/knowledge-hub/mental-health-and-disability-workforce-burnout-a-growing-crisis",
    image: "/images/news/Heathcare-burnout_blog-768x576.avif",
    industry: "Health & Social Care",
    useCase: null,
  },
  {
    slug: "reducing-administrative-burden-through-automated-compliance-tracking",
    category: "Insights",
    title:
      "Reducing Administrative Burden Through Automated Compliance Tracking in Field Service",
    excerpt:
      "In highly regulated industries like utilities, healthcare, and infrastructure, compliance isn't optional — it's a daily operational necessity. Yet many field service organisations still rely on manual compliance tracking.",
    href: "/knowledge-hub/reducing-administrative-burden-through-automated-compliance-tracking",
    image: "/images/news/admin-blog-768x576.webp",
    industry: null,
    useCase: null,
  },
  {
    slug: "power-apps-in-action-customising-your-fsm-for-industry-specific-needs",
    category: "Insights",
    title:
      "Power Apps in Action – Customising Your FSM for Industry-Specific Needs",
    excerpt:
      "One-size-fits-all rarely works in field service management. Industries like utilities, healthcare, logistics, and infrastructure have unique operational needs, compliance requirements, and customer expectations.",
    href: "/knowledge-hub/power-apps-in-action-customising-your-fsm-for-industry-specific-needs",
    image: "/images/news/power-app-blog-2-768x576.webp",
    industry: null,
    useCase: null,
  },
];

const CATEGORIES = ["Milestone", "News", "Events", "Webinar", "Insights"] as const;
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
        <h3 className="font-heading text-base font-medium leading-snug tracking-tight text-prussian-blue-800 line-clamp-3">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sognos-text-body line-clamp-2">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#052048] transition-colors duration-200 group-hover:text-[#052048]/70">
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
  initialCategory = null,
}: {
  initialCategory?: string | null;
} = {}) {
  const safeInitialCategory =
    initialCategory &&
    (CATEGORIES as readonly string[]).includes(initialCategory)
      ? initialCategory
      : null;
  const [activeCategory, setActiveCategory] = useState<string | null>(
    safeInitialCategory,
  );
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const filtered = ARTICLES.filter((a) => {
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
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-text-heading tracking-tight mb-6">
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
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
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
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
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
