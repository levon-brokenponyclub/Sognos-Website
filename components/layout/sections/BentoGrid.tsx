import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";
import type { HomeFeedItem } from "@/lib/sanity/queries";

// Mixed-size feed grid, after middesk.com's "Fluent in trust" bento. One tile
// per feed item, sized by position rather than by content, so the shape of the
// section is stable while what fills it changes.
//
// Server Component: nothing here needs state, and keeping it off the client
// means the Sanity image URLs are built at request time rather than shipped.

const TILE_COUNT = 6;

// Spans for the desktop 4-column grid, by index. Traced against CSS grid's
// auto-placement:
//
//   row 1 │ ┌─────────────┐ ┌─────────────┐
//   row 2 │ │      0      │ └─────1───────┘  ← 0 spans both rows
//         │ │  (2 × 2)    │ ┌──2──┐ ┌──3──┐
//   row 3 │ └─────────────┘ ┌──4──┐ ┌──5──┐
//
// The last tile widens to close the row when the count leaves a hole —
// without it, five items leave half of row 3 empty and the section reads as
// broken rather than short. This is why the spans are a function of the feed
// and not a fixed list of class names.
function spanFor(index: number, total: number): string {
  if (index === 0) return "md:col-span-2 md:row-span-2";

  const isLast = index === total - 1;
  const startsARow = index === 4;

  // A trailing tile that would sit alone on the final row takes the width of
  // both slots instead.
  if (isLast && startsARow) return "md:col-span-4";

  if (index === 1 || index === 4 || index === 5) return "md:col-span-2";
  return "md:col-span-1";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function imageUrl(item: HomeFeedItem, width: number): string | null {
  if (!item.image) return null;
  return urlFor(item.image).width(width).auto("format").url();
}

// The upcoming event. Navy rather than a photo card, because the point of the
// tile is that something is happening — the date has to be the loudest thing
// on it, and it cannot be if it is sitting on an arbitrary photograph.
function EventTile({ item, feature }: { item: HomeFeedItem; feature: boolean }) {
  return (
    <Link
      href={item.href}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-sognos-navy p-6 lg:p-8"
    >
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-x-2 rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          {item.eyebrow}
        </span>
        <h3
          className={`font-heading font-normal leading-heading tracking-heading text-white ${
            feature ? "text-2xl lg:text-quote" : "text-xl"
          }`}
        >
          {item.title}
        </h3>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
          <span className="inline-flex items-center gap-x-2">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
          {item.meta && (
            <span className="inline-flex items-center gap-x-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {item.meta}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-white underline-offset-4 group-hover:underline">
          Register &rarr;
        </span>
      </div>
    </Link>
  );
}

// Everything that is not an event: the photo fills the tile and the copy sits
// over it.
//
// One treatment at every size, rather than a photo-backed feature and
// image-band-above-text small tiles. The band version forces the tile's height
// to follow its image — a 16/9 band in a 608px-wide tile is 342px on its own —
// and under a row-sizing rule that keeps rows equal, the tallest tile then
// sets the height of every row in the grid. Filling instead means the image
// takes whatever height the slot gives it and the grid stays the shape it was
// designed as.
function ContentTile({
  item,
  feature,
}: {
  item: HomeFeedItem;
  feature: boolean;
}) {
  const src = imageUrl(item, feature ? 1200 : 720);

  return (
    <Link
      href={item.href}
      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-lg bg-sognos-navy p-5 lg:p-6"
    >
      {src && (
        <Image
          src={src}
          alt=""
          fill
          sizes={feature ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      {/* Legibility floor for white copy over an unknown photograph. Weighted
          to the foot of the tile, which is the only place copy sits. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-sognos-navy via-sognos-navy/60 to-sognos-navy/10"
      />
      <div className="relative flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
          {item.eyebrow}
        </span>
        <h3
          className={`font-heading font-normal leading-heading tracking-heading text-white ${
            feature ? "text-2xl lg:text-quote" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <TileMeta item={item} />
      </div>
    </Link>
  );
}

function TileMeta({ item }: { item: HomeFeedItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
      <span>{formatDate(item.date)}</span>
      {item.meta && (
        <span className="inline-flex items-center gap-x-2">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {item.meta}
        </span>
      )}
    </div>
  );
}

export default function BentoGrid({
  items,
  heading = "The latest from Sognos",
  href = "/knowledge-hub",
  label = "See more on the blog",
}: {
  items: HomeFeedItem[];
  heading?: string;
  href?: string;
  label?: string;
}) {
  const tiles = items.slice(0, TILE_COUNT);
  if (tiles.length === 0) return null;

  return (
    <section id="latest" className="w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        <div className="flex items-end justify-between gap-6 pb-10">
          <h2 className="font-heading text-3xl font-light tracking-tight text-sognos-heading md:text-6xl">
            {heading}
          </h2>
          <SlideFillLink href={href} label={label} className="shrink-0" />
        </div>

        {/* A fixed row height rather than `auto-rows-fr`. `fr` keeps rows equal
            but sizes them to the tallest tile, so one long title or one large
            image silently doubles the height of the whole section. Fixing the
            row makes the bento a fixed shape that content fits into, which is
            the point of a bento. The feature spans two of them. Single column
            below `md`, where a fixed height would crop the copy. */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[220px] lg:gap-4">
          {tiles.map((item, i) => {
            const feature = i === 0;
            return (
              <div
                key={item.id}
                // `min-h` only below `md`, where the grid is a single column
                // and there is no row height to fill.
                className={`min-h-[220px] md:min-h-0 ${spanFor(i, tiles.length)}`}
              >
                {item.kind === "event" ? (
                  <EventTile item={item} feature={feature} />
                ) : (
                  <ContentTile item={item} feature={feature} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
