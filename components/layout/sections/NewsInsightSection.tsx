import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

export type NewsInsightArticle = {
  slug?: string;
  category: string;
  title: string;
  href: string;
  image: string;
  date?: string;
  readTime?: string;
};

// Matches the customer-stories archive card's format so the two read the same.
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

// Article card, matching `StoryCard` in the customer-stories archive: no card
// surface — 16:9 image, mono meta row, title, Read More, sitting directly on
// the section background.
//
// Two departures from that card, both because these are articles rather than
// customer stories: there is no company logo to centre over the image, and so
// no gradient scrim either — a scrim with nothing over it is decoration on a
// card, which the card rules do not allow. The chip carries the article's own
// category rather than a fixed "Customer Story".
function ArticleCard({ article }: { article: NewsInsightArticle }) {
  return (
    <Link href={article.href} className="group flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sognos-muted">
        <span className="border border-sognos-line px-2 py-1">
          {article.category}
        </span>
        {article.date && <span>{formatDate(article.date)}</span>}
        {article.readTime && (
          <span className="ml-auto flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" />
            {article.readTime}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg lg:text-xl font-normal leading-snug tracking-tight text-sognos-heading text-balance transition-colors duration-200 group-hover:text-sognos-blue-accent">
        {article.title}
      </h3>

      <span className="mt-4 text-sm font-medium text-sognos-body transition-colors duration-200 group-hover:text-sognos-blue-accent">
        Read More{" "}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
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

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start lg:mb-12">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
            The latest news
          </h2>
          <SeeMoreLink className="max-sm:hidden" />
        </div>

        {/* Same track and gaps as the customer-stories archive grid. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug ?? article.href} article={article} />
          ))}
        </div>

        <SeeMoreLink className="mt-8 sm:hidden" />
      </div>
    </section>
  );
}
