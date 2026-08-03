import Image from "next/image";
import Link from "next/link";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";

// SCAFFOLD — structure only. No surfaces, radius, type scale or icon
// treatment yet.
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
// Two things the reference has that the data does not: every tile carries a
// 104×104 icon, and the non-feature tiles carry a descriptive paragraph.
// `NewsInsightArticle` has `category`, `date` and `readTime` and no excerpt, so
// those slots are marked and left empty rather than filled with something that
// only looks right.

export type NewsInsightArticle = {
  slug?: string;
  category: string;
  title: string;
  href: string;
  image: string;
  date?: string;
  readTime?: string;
};

const TILE_COUNT = 4;

function Tile({
  article,
  feature = false,
}: {
  article: NewsInsightArticle;
  feature?: boolean;
}) {
  return (
    <Link
      href={article.href}
      // `border` is scaffold only — it exists so the tiles are visible while
      // the layout is reviewed, and goes when the surfaces land. `min-h` is
      // the reference's own.
      className="relative flex min-h-[340px] flex-col overflow-hidden border border-sognos-line"
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

            {/* `mt-auto` pins the copy to the foot of the tile whatever height
                it runs to — the reference's own arrangement. */}
            <div className="mt-auto">
              <h3>{article.title}</h3>
              {/* Copy slot — empty until there is an excerpt to put in it. The
                  feature tile has no paragraph in the reference either. */}
              {!feature && <p data-slot="excerpt" />}
            </div>
          </div>
        </div>
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

  const tiles = articles.slice(0, TILE_COUNT);
  const [first, second, third, fourth] = tiles;

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start lg:mb-12">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading text-balance md:text-4xl">
            The latest from Sognos
          </h2>
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
            {second && <Tile article={second} />}
          </div>

          {/* Row 2 — 50 / 50 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {third && <Tile article={third} />}
            {fourth && <Tile article={fourth} />}
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
