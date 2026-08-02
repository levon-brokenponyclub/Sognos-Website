import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";
import AnimatedDivider from "@/components/layout/sections/shared/AnimatedDivider";

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
    <Link
      href={article.href}
      // The divider rides the card's own leading edge, so the card is the
      // positioning context and carries the inset that keeps content off it.
      className="group relative flex flex-col pt-4 md:pt-0 md:pl-6"
    >
      <AnimatedDivider />

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

      <h3 className="mt-3 font-heading text-lg lg:text-xl lg:leading-snug font-normal leading-snug tracking-tight text-sognos-heading text-balance transition-colors duration-200 group-hover:text-sognos-blue-accent">
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
            The latest from Sognos
          </h2>
          <SlideFillLink
            href="/knowledge-hub"
            label="View more resources"
            className="max-sm:hidden"
          />
        </div>

        {/* Same track as the customer-stories archive grid. The column gap is
            24px rather than that grid's 32px so it matches each card's 24px
            leading inset — the divider then sits optically centred in the
            channel between two cards instead of hugging the right-hand one. */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug ?? article.href} article={article} />
          ))}
        </div>

        <SlideFillLink
          href="/knowledge-hub"
          label="View more resources"
          className="mt-8 sm:hidden"
        />
      </div>
    </section>
  );
}
