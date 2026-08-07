import Image from "next/image";
import Link from "next/link";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";
import { formatDate } from "@/lib/formatDate";

// SCAFFOLD — structure only for icon treatment; post/event content now
// matches KnowledgeHubArchive's ArticleCard/EventCard.
//
// Bento grid after middesk.com's "Built for regulated industries" block.
//
//   ┌───────────────────────────────┬─────────────┐
//   │  0  feature (picture behind)  │  1          │   row 1 — 70fr / 30fr
//   ├───────────────────────────────┼─────────────┤
//   │  2                            │  3          │   row 2 — 50 / 50
//   └───────────────────────────────┴─────────────┘
//
// Two grids, not one twelve-column grid with spans. That is how the reference
// does it — its first row is
// `md:grid-cols-[var(--bento-left)_var(--bento-right)]` with the two tracks set
// inline as `70fr` and `30fr`, and the second row is its own grid. Keeping the
// split inline means the ratio is a value rather than a class, so it can be
// retuned without touching the markup or hunting for the matching span.
//
// Both rows use the reference's `gap-4` and `min-h-[340px]`.
//
// The three-up card row this replaces — its `AnimatedDivider`, the mono meta
// line and the `Read More` affordance — is preserved in
// NewsInsightSection.backup.tsx.
//
// One thing the reference has that the data does not: every tile carries a
// 104×104 icon. Nothing fills that slot yet.
//
// Post tiles reuse ArticleCard's pill/title/meta classes exactly (same
// KnowledgeHubArchive component), but pill sits above the title here rather
// than below it, and an excerpt line is added — a deliberate divergence, not
// an oversight.

export type NewsInsightArticle = {
  slug?: string;
  /** Which card body to render: pill/title/excerpt/date+readTime for a post,
   *  or EventCard's top pill+title / bottom two-row Date+Location meta for an
   *  event. */
  kind?: "post" | "event";
  category: string;
  title: string;
  href: string;
  image: string;
  /** Post: raw ISO (formatted in-tile). Event: pre-formatted display date. */
  date?: string;
  readTime?: string;
  /** Event only — pre-formatted time, folded into the Date row's value. */
  time?: string;
  /** Event only — the Location row value. */
  location?: string;
  excerpt?: string;
};

const TILE_COUNT = 4;

function Tile({
  article,
  feature = false,
  surface = "border border-sognos-line",
  dark = false,
}: {
  article: NewsInsightArticle;
  feature?: boolean;
  /** Tile background (+ border) classes. */
  surface?: string;
  /** Invert the copy colours for a dark/coloured surface. */
  dark?: boolean;
}) {
  const isEvent = article.kind === "event";

  // Copy colours swap with the surface so the same tile works on white, navy
  // or the accent.
  const pillClass = dark
    ? "bg-white/15 text-white"
    : "bg-sognos-muted/15 text-sognos-body";
  const titleClass = dark
    ? "text-white group-hover:text-white/70"
    : "text-sognos-heading group-hover:text-sognos-blue-accent";
  const metaLabel = dark ? "text-white/60" : "text-sognos-muted";
  const metaValue = dark ? "text-white" : "text-sognos-heading";
  const metaRule = dark ? "border-white/25" : "border-sognos-line";

  return (
    <Link
      href={article.href}
      className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded ${surface}`}
    >
      {/* The reference nests a padded flex wrapper inside the article rather
          than padding the article itself, so the picture can fill the tile
          edge to edge behind it. */}
      <span className="relative flex flex-1 flex-col p-6">
        {feature && article.image && (
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover"
          />
        )}

        {/* 8px accent square, inset by the tile's own padding. */}
        <span aria-hidden="true" data-slot="accent" />

        <div className="relative z-20 flex flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Icon slot — 104×104 in the reference. Nothing in the article
                data fills it yet. */}
            <div aria-hidden="true" data-slot="icon" />

            {isEvent ? (
              /* Event tile — EventCard's content layout: pill + title pinned
                 to the top, a two-row Date / Location meta pinned to the
                 bottom (`justify-between`). */
              <div className="flex flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col items-start gap-3">
                  <span
                    className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-normal ${pillClass}`}
                  >
                    {article.category}
                  </span>
                  <h3
                    className={`font-heading text-lg font-normal leading-snug tracking-tight line-clamp-2 transition-colors duration-200 ${titleClass}`}
                  >
                    {article.title}
                  </h3>
                </div>
                <div className="w-full">
                  {(article.date || article.time) && (
                    <div
                      className={`flex items-baseline justify-between gap-4 border-t py-3 ${metaRule}`}
                    >
                      <span className={`shrink-0 text-base ${metaLabel}`}>
                        Date
                      </span>
                      <span className={`text-right text-base ${metaValue}`}>
                        {article.time
                          ? `${article.date} · ${article.time}`
                          : article.date}
                      </span>
                    </div>
                  )}
                  {article.location && (
                    <div
                      className={`flex items-baseline justify-between gap-4 border-t py-3 ${metaRule}`}
                    >
                      <span className={`shrink-0 text-base ${metaLabel}`}>
                        Location
                      </span>
                      <span className={`text-right text-base ${metaValue}`}>
                        {article.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Post tile — pill / title / excerpt / date, pinned to the foot. */
              <div className="mt-auto">
                <div className="flex flex-col items-start gap-3">
                  <span
                    className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-normal ${pillClass}`}
                  >
                    {article.category}
                  </span>
                  <h3
                    className={`font-heading text-2xl font-medium leading-snug tracking-tight line-clamp-2 transition-colors duration-200 ${titleClass}`}
                  >
                    {article.title}
                  </h3>
                  {(article.date || article.readTime) && (
                    <p
                      className={`text-xs font-normal tracking-wide uppercase ${metaValue}`}
                    >
                      {article.date && (
                        <span className={metaLabel}>
                          {formatDate(article.date)}
                        </span>
                      )}
                      {article.date && article.readTime && " — "}
                      {article.readTime && article.readTime.toUpperCase()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </span>
    </Link>
  );
}

export default function NewsInsightSection({
  articles,
  heading = "The latest from Sognos",
  description = "News, insights and milestones from across care operations, workforce scheduling and the sectors we serve.",
}: {
  articles: NewsInsightArticle[];
  heading?: string;
  description?: string;
}) {
  if (articles.length === 0) return null;

  const tiles = articles.slice(0, TILE_COUNT);
  const [first, second, third, fourth] = tiles;

  return (
    <section className="w-full bg-sognos-tint py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Same centred header block as SolutionsSection and IndustrySection —
            heading over subtext, the section's own control beneath. Was left
            heading / right link at md:text-4xl, which matched neither. */}
        <div className="mb-10 flex w-full flex-col items-center gap-8 text-center lg:mb-12">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading text-balance md:text-5xl">
              {heading}
            </h2>
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-sognos-body text-balance">
                {description}
              </p>
            )}
          </div>
          <SlideFillLink
            href="/knowledge-hub"
            label="View more resources"
            className="max-sm:hidden"
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* Row 1 — 70 / 30. Both rows collapse to one column below `md`. */}
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-[var(--bento-left)_var(--bento-right)]"
            style={
              {
                "--bento-left": "70fr",
                "--bento-right": "30fr",
              } as React.CSSProperties
            }
          >
            {first && <Tile article={first} feature />}
            {/* Top-right (the event) — white. */}
            {second && (
              <Tile
                article={second}
                surface="border border-sognos-line bg-white"
              />
            )}
          </div>

          {/* Row 2 — 50 / 50 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Bottom-left — navy, light copy. */}
            {third && <Tile article={third} surface="bg-sognos-navy" dark />}
            {/* Bottom-right — accent, light copy. */}
            {fourth && (
              <Tile article={fourth} surface="bg-sognos-blue-accent" dark />
            )}
          </div>
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
