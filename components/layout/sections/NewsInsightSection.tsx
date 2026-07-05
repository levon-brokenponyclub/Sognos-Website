import Link from "next/link";
import { ArticleCard, type Article } from "./KnowledgeHubArchive";

export type NewsInsightArticle = {
  slug?: string;
  category: string;
  title: string;
  href: string;
  image: string;
  date?: string;
  readTime?: string;
};

function SeeMoreLink({ className }: { className?: string }) {
  return (
    <Link
      href="/knowledge-hub"
      className={`group inline-flex items-center gap-x-1 text-base font-medium text-sognos-heading ${className ?? ""}`}
    >
      <span>See more on the blog</span>
      <span className="ml-1 inline-flex transition-all duration-300 ease-in-out group-hover:ml-2">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="w-3">
          <path
            d="M3 7h8M7 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function NewsInsightSection({
  articles,
}: {
  articles: NewsInsightArticle[];
}) {
  if (articles.length === 0) return null;

  const cards: Article[] = articles.slice(0, 3).map((a) => ({
    slug: a.slug ?? a.href,
    category: a.category,
    title: a.title,
    excerpt: "",
    href: a.href,
    image: a.image,
    industry: null,
    useCase: null,
    publishedAt: a.date ?? null,
    readTime: a.readTime ?? null,
    author: null,
  }));

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start lg:mb-12">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
            The latest news
          </h2>
          <SeeMoreLink className="max-sm:hidden" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <SeeMoreLink className="mt-8 sm:hidden" />
      </div>
    </section>
  );
}
