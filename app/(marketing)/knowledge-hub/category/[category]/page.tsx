import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArticleCard,
  type Article,
} from "@/components/layout/sections/KnowledgeHubArchive";
import {
  KnowledgeHubSearchDialog,
  type KnowledgeHubSearchItem,
} from "@/components/ui/knowledge-hub-search-dialog";
import { getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/formatDate";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";
import ElegantDarkPattern from "@/components/layout/sections/shared/ElegantDarkPattern";

// Scaffold — Knowledge Hub category page, after
// routable.com/resources/category/articles.
//
// One dynamic route (`/knowledge-hub/category/[category]`) serves every
// post-based category. It sits in its own `category` segment rather than
// directly under `/knowledge-hub` so it never collides with
// `/knowledge-hub/[slug]` (the post detail).
//
// The masthead and tab band are duplicated from `KnowledgeHubArchive` for now
// — extracting them into shared components is a Refine-stage job. The "All
// topics" filter is a disabled placeholder: the content model has no
// topic/tag field to filter by yet.

// slug → { label shown, `knowledgePost.category` value to match }
const CATEGORIES = {
  news: { label: "News", category: "News" },
  insights: { label: "Insights", category: "Insights" },
  milestones: { label: "Milestones", category: "Milestone" },
} as const;
type CategorySlug = keyof typeof CATEGORIES;

// Tab band in link mode: the four Knowledge Hub sections as links to their
// category pages. Events & Webinars has no category page yet, so it points
// back to that section on the archive.
const TABS: { slug: string; label: string; href: string }[] = [
  { slug: "news", label: "News", href: "/knowledge-hub/category/news" },
  {
    slug: "insights",
    label: "Insights",
    href: "/knowledge-hub/category/insights",
  },
  { slug: "events", label: "Events & Webinars", href: "/knowledge-hub#events" },
  {
    slug: "milestones",
    label: "Milestones",
    href: "/knowledge-hub/category/milestones",
  },
];

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cfg = CATEGORIES[category as CategorySlug];
  if (!cfg) return {};
  return {
    title: `${cfg.label} - Knowledge Hub - Sognos`,
    description: `${cfg.label} from across care operations, workforce scheduling, compliance, and the sectors Sognos serves.`,
  };
}

export const revalidate = 60;

export default async function KnowledgeHubCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cfg = CATEGORIES[category as CategorySlug];
  if (!cfg) notFound();

  const posts = await getKnowledgePostArchive();
  const articles: Article[] = posts
    .filter((p) => p.category === cfg.category)
    .map((p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      excerpt: p.excerpt,
      href: `/knowledge-hub/${p.slug}`,
      image: p.heroImage
        ? urlFor(p.heroImage).width(720).auto("format").url()
        : "",
      industry: p.industry ?? null,
      useCase: p.useCase ?? null,
      publishedAt: p.date ?? null,
      readTime: p.readTime ?? null,
      author: p.author ?? null,
    }));

  const searchItems: KnowledgeHubSearchItem[] = articles.map((a) => ({
    href: a.href,
    title: a.title,
    category: a.category,
    meta: [a.publishedAt ? formatDate(a.publishedAt) : null, a.readTime]
      .filter(Boolean)
      .join(" · "),
    image: a.image,
    keywords: [a.excerpt, a.industry, a.useCase, a.author],
  }));
  const recentItems = searchItems.slice(0, 2);

  return (
    <>
      {/* 1 — dark masthead: the category name, left-aligned after the
          reference, over the shared elegant-dark background. */}
      <section className="relative overflow-hidden bg-sognos-navy-darkest pb-12 pt-10 text-dark md:pb-32 md:pt-12">
        <ElegantDarkPattern />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <AnimatedEyebrow
                dotClassName="bg-sognos-blue-accent"
                textClassName="text-sognos-muted"
              >
                Knowledge Hub
              </AnimatedEyebrow>
              <h1 className="mt-5 font-heading font-normal text-white text-5xl tracking-tight text-balance lg:text-6xl">
                {cfg.label}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — tab band, sticky under the navbar. Link mode: each tab navigates
          to its sibling category page. */}
      <div className="sticky top-20 z-20 border-b border-dotted border-sognos-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6">
          <nav
            aria-label="Knowledge Hub"
            className="scrollbar-hide flex min-w-0 flex-1 gap-6 overflow-x-auto"
          >
            {TABS.map((tab) => {
              const isActive = tab.slug === category;
              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className="flex shrink-0 items-center gap-2 py-4 text-sognos-heading"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-sognos-blue-accent" : "bg-transparent"
                    }`}
                  />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0">
            <KnowledgeHubSearchDialog
              items={searchItems}
              recentItems={recentItems}
            />
          </div>
        </div>
      </div>

      {/* 3 — filter + grid. */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* "All topics" — disabled placeholder. No topic/tag field exists in
              the content model yet, so there is nothing to filter by. Kept for
              structural parity with the reference; wire it up when a topic
              field lands. */}
          <div className="mb-10 md:mb-12">
            <label htmlFor="topic-filter" className="sr-only">
              Filter by topic
            </label>
            <select
              id="topic-filter"
              defaultValue="all"
              disabled
              className="w-fit border-0 border-b-2 border-sognos-line bg-transparent pr-8 pb-1 text-base text-sognos-heading disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="all">All topics</option>
            </select>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-sognos-muted">Nothing here yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
