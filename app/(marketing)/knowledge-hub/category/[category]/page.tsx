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
  news: {
    label: "News",
    category: "News",
    description: "Company updates, partnership announcements, and the latest from the Sognos team.",
  },
  insights: {
    label: "Insights",
    category: "Insights",
    description: "Deep dives into care operations, workforce scheduling, and the technology shaping field service.",
  },
  milestones: {
    label: "Milestones",
    category: "Milestone",
    description: "Key moments in the Sognos journey — product launches, team growth, and the wins worth celebrating.",
  },
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
      {/* 1 — dark masthead with category description and article count. */}
      <section className="relative overflow-hidden bg-sognos-navy-darkest pb-16 pt-32 lg:pt-40 md:pb-20">
        <ElegantDarkPattern />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <AnimatedEyebrow
            dotClassName="bg-sognos-blue-accent"
            textClassName="text-white/70"
          >
            Knowledge Hub
          </AnimatedEyebrow>
          <h1 className="mt-5 font-heading font-normal text-white text-5xl tracking-tight text-balance md:text-6xl lg:text-7xl">
            {cfg.label}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            {cfg.description}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/30">
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </p>
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

      {/* 3 — lead feature + grid. */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {articles.length > 0 ? (
            <>
              {/* Lead article — wide card with image */}
              {articles[0] && (
                <Link
                  href={articles[0].href}
                  className="group mb-14 grid grid-cols-1 gap-6 border-b border-sognos-line pb-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-sognos-tint">
                    {articles[0].image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={articles[0].image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="h-full w-full bg-sognos-tint" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
                      {articles[0].category}
                    </span>
                    <h2 className="mt-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent md:text-3xl">
                      {articles[0].title}
                    </h2>
                    {articles[0].excerpt && (
                      <p className="mt-3 line-clamp-3 text-base leading-relaxed text-sognos-body">
                        {articles[0].excerpt}
                      </p>
                    )}
                    {articles[0].publishedAt && (
                      <p className="mt-6 text-xs uppercase tracking-wide text-sognos-muted">
                        {formatDate(articles[0].publishedAt)}
                        {articles[0].readTime && ` · ${articles[0].readTime}`}
                      </p>
                    )}
                  </div>
                </Link>
              )}

              {/* Remaining articles */}
              {articles.length > 1 && (
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
                  {articles.slice(1).map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-sognos-muted">Nothing here yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
