"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  KnowledgeHubSearchDialog,
  type KnowledgeHubSearchItem,
} from "@/components/ui/knowledge-hub-search-dialog";
import { formatDate } from "@/lib/formatDate";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  industry: string | null;
  useCase: string | null;
  publishedAt?: string | null;
  readTime?: string | null;
  author?: string | null;
};

/** One upcoming event row. Strings, already formatted — this is a Client
 *  Component, so the timezone-sensitive formatting happens on the server. */
export type UpcomingEvent = {
  slug: string;
  format: string;
  title: string;
  href: string;
  /** e.g. "17 Sep 2026" */
  date: string;
  /** e.g. "8:30 am - 10:30 am", or just the start when the event has no end. */
  time: string;
  location: string;
  image: string;
};

/** The most recent customer story, for the dark band. */
export type FeaturedStory = {
  slug: string;
  company: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string | null;
  image: string;
  logo: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// `CATEGORIES`, `PillSelection`, `resolveSelection`, `pillClass` and
// `INITIAL_ARTICLE_LIMIT` all belonged to the pill filter row and are gone with
// it. They are in KnowledgeHubArchive.backup.tsx if the filtering comes back.

function ArticleMeta({
  publishedAt,
  readTime,
}: {
  publishedAt?: string | null;
  readTime?: string | null;
}) {
  if (!publishedAt && !readTime) return null;
  return (
    <p className="mt-10 text-xs font-base tracking-wide text-sognos-heading uppercase">
      {publishedAt && (
        <span className="text-sognos-muted">{formatDate(publishedAt)}</span>
      )}
      {publishedAt && readTime && " — "}
      {readTime && readTime.toUpperCase()}
    </p>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col pb-4 border-b border-gray-200"
    >
      <div className="relative max-h-52 aspect-[16/10] w-full overflow-hidden rounded">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </div>
      {/* 32px, rising to 36px from lg — the reference's own image-to-content
          gap (`space-y-8 lg:space-y-[2.25rem]` on routable.com/resources). The
          16px this replaced was what made the cards read tight. */}
      <div className="mt-8 flex flex-col flex-1 lg:mt-9">
        <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 h-6.5 py-1 text-xs font-normal text-sognos-body">
          {article.category}
        </span>
        <h3 className="mt-4 font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading line-clamp-2 transition-colors group-hover:text-sognos-blue-accent">
          {article.title}
        </h3>
        <ArticleMeta
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />
      </div>
    </Link>
  );
}

// ─── Archive ──────────────────────────────────────────────────────────────────

// Anchored archive after routable.com/resources.
//
// Page shape, in order:
//   1. Dark header — centred title, the lead post as a large card, then a
//      three-up row beneath it. All on one dark surface, above the tabs.
//   2. Sticky tab band, dotted rule beneath, current section marked by a
//      bullet.
//   3. News, Insights, Events & Webinars, Milestones. All always rendered.
//
// The tabs do **not** show and hide sections. Every section is always in the
// document and a tab scrolls to it — the reference's behaviour, and the reason
// the bullet needs a scroll-spy rather than click state: a reader can reach a
// section by scrolling, and the tab has to follow.
//
// Sections come from `knowledgePost.category`, which is the existing content
// model — News, Insights and Milestone are three of its five values. The other
// two, Events and Webinar, are `event` documents instead and arrive as
// `upcomingEvents`, split on `format`.
//
// **Customer stories are deliberately absent.** They have their own archive at
// /customer-stories and no longer surface here, including in search.
//
// Each section has its own shape rather than one shared grid, because they
// carry different things:
//   News              lead left, three stacked right
//   Insights          one row of three, capped
//   Events & Webinars two label-rail blocks — the events one card-led, the
//                     webinars one a row list after the careers job board
//   Milestones        full-width stacked rows, image left
//
// Still scaffold for surfaces: no fill, radius or type scale. Structure final.
//
// The pill filter row and its `?category=` filtering are in
// KnowledgeHubArchive.backup.tsx. `ArticleCard` above is untouched — both
// article detail pages import it for their related rows.

type SectionId = "news" | "insights" | "events" | "milestones";

const TABS: readonly { id: SectionId; label: string }[] = [
  { id: "news", label: "News" },
  { id: "insights", label: "Insights" },
  { id: "events", label: "Events & Webinars" },
  { id: "milestones", label: "Milestones" },
];

const FEATURED_COUNT = 3;
const INSIGHTS_LIMIT = 3;

// Where each section's "View all" goes. **None of these routes exist yet** —
// they are listed in one place so building them is a matter of creating the
// pages, not hunting for links.
//
// The three under /knowledge-hub sit in the same segment as
// /knowledge-hub/[slug], so each one is reachable only while no post claims
// that slug. If that is a risk worth avoiding they should move to the top
// level instead.
const VIEW_ALL: Record<SectionId, string> = {
  news: "/knowledge-hub/news",
  insights: "/knowledge-hub/insights",
  // No "View all" for events — they live in this section rather than a
  // separate archive, so there is nowhere to send a reader. Kept in the map so
  // the decision is visible rather than an omission.
  events: "/events",
  milestones: "/knowledge-hub/milestones",
};

// The navbar is a fixed 80px at every breakpoint — see the note in CLAUDE.md.
const NAVBAR_HEIGHT_PX = 80;

// Same card language as `ArticleCard` above — bordered, no fill, image over
// chip over clamped title, with the date and read-time meta line pushed to the
// bottom by `flex-1`. The tinted-fill treatment this replaced was a second card
// language on the same page, which is the thing the pass is meant to remove.
//
// `lead` changes exactly one value: the image loses `ArticleCard`'s `max-h-52`
// cap so it can fill the taller column. Type stays standard — every title on
// the page is `text-lg`, so the sizes can be judged once the whole page is in.
function Tile({
  href,
  eyebrow,
  title,
  meta,
  readTime,
  image,
  lead = false,
  filled = false,
}: {
  href: string;
  eyebrow?: string | null;
  title: string;
  /** Already formatted — the date line. */
  meta?: string | null;
  readTime?: string | null;
  image?: string | null;
  lead?: boolean;
  filled?: boolean;
}) {
  // Two surfaces, after the reference's own two card types:
  //   filled  — grey panel, everything inset. `p-6 md:p-8`, and `lg:p-14` on
  //             the lead, matching routable.com's `p-6 md:p-8 lg:p-[3.5rem]`.
  //   plain   — no fill, content flush, separated by a rule.
  // Radius is `rounded` rather than the reference's 4px: house rule wins.
  const surface = filled
    ? `rounded bg-white p-6 md:p-8 ${lead ? "lg:p-14" : ""}`
    : "border-b border-sognos-line pb-4";
  const showImage = lead || !!image;
  // 24px inside a filled panel — the reference's `mb-6`. The plain card keeps
  // the wider 32/36px gap, which is what it uses with no padding to help it.
  const contentGap = showImage ? (filled ? "mt-6" : "mt-8 lg:mt-9") : "";

  return (
    <Link href={href} className={`group flex flex-col ${surface}`}>
      {showImage && (
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden rounded ${
            lead ? "" : "max-h-52"
          }`}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-sognos-tint" />
          )}
        </div>
      )}
      <div className={`${contentGap} flex flex-1 flex-col`}>
        {eyebrow && (
          <span className="inline-flex h-6.5 w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
            {eyebrow}
          </span>
        )}
        <h3 className="mt-4 font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading line-clamp-2 transition-colors group-hover:text-sognos-blue-accent">
          {title}
        </h3>
        {(meta || readTime) && (
          /* `mt-auto` in a filled panel: the meta line sits on the card's
             bottom padding however tall the title runs, which is what keeps a
             column of stacked panels aligned. The plain card has no floor to
             sit on, so it keeps the fixed gap. */
          <p
            className={`text-xs font-base tracking-wide uppercase text-sognos-heading ${
              filled ? "mt-auto pt-8" : "mt-10"
            }`}
          >
            {meta && <span className="text-sognos-muted">{meta}</span>}
            {meta && readTime && " — "}
            {readTime && readTime.toUpperCase()}
          </p>
        )}
      </div>
    </Link>
  );
}

// Twelve-column split with a label rail, the shape Advantages, OpenRoles and
// the product pages all use.
function RailBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
          {label}
        </p>
      </div>
      <div className="lg:col-[3/-1]">{children}</div>
    </div>
  );
}

/** A finished event or webinar as a single row, after the careers job board —
 *  title and format left, date right, action revealing on hover.
 *
 *  Not used on this page: the Knowledge Hub shows upcoming items only. It is
 *  exported for the Events & Webinars archive, which is where past ones belong
 *  and which is the reason this is not deleted. Move it to a shared module if a
 *  third caller appears. */
export function PastEventRow({
  href,
  title,
  format,
  date,
  action = "Watch",
}: {
  href: string;
  title: string;
  format: string;
  date: string;
  action?: string;
}) {
  return (
    <li className="border-t border-sognos-line first:border-t-0">
      <Link
        href={href}
        className="group grid gap-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:py-6"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <p className="font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
            {title}
          </p>
          <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
            {format}
          </span>
        </div>
        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <p className="text-sm text-sognos-muted">{date}</p>
          <span className="shrink-0 sm:opacity-0 sm:group-hover:opacity-100">
            {action}
          </span>
        </div>
      </Link>
    </li>
  );
}

// Two-column card — image beside the copy rather than above it. A deliberate
// divergence from the reference, which stacks: an event carries a date, a time
// and a place as well as a title, and stacked that reads as a long column of
// small facts under a large image. Side by side it reads as one row.
//
// Every surface value is `Tile`'s, unchanged — fill inverted against the band,
// `rounded`, `p-14`, `text-2xl` title, `text-sm` meta. Only the arrangement
// differs.
export function EventCard({
  href,
  format,
  title,
  meta,
  image,
  onTint = false,
}: {
  href: string;
  format: string;
  title: string;
  meta: string;
  image?: string | null;
  onTint?: boolean;
}) {
  const surface = onTint ? "bg-white" : "bg-sognos-tint";
  return (
    <Link
      href={href}
      // 0.6/1 rather than an even split: the image is atmosphere, the date and
      // place are the decision. Copy gets the room.
      className={`group grid overflow-hidden rounded ${surface} md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]`}
    >
      {/* Two variants, decided by whether an image exists:
          — with a usable image, the photo runs full bleed
          — without one, a solid navy panel carrying the format, rather than an
            empty grey box. A bad photo is worse than no photo, so the solid
            variant has to stand on its own.
          Square-ish on mobile where it sits above the copy; on md it stretches
          to whatever height the copy sets, so the two columns stay level. */}
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:h-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-sognos-navy p-8">
            <span className="font-heading text-lg font-normal leading-snug tracking-tight text-white/90">
              {format}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start justify-center gap-3 p-8 lg:p-14">
        <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
          {format}
        </span>
        <h3 className="font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
          {title}
        </h3>
        <p className="text-sm text-sognos-muted">{meta}</p>
      </div>
    </Link>
  );
}

// Cards only. Anything past lives on the Events & Webinars archive, so there
// is no row treatment to fall back to here — see `PastEventRow` above, which
// that page will use.
function EventRail({
  items,
  emptyLabel,
}: {
  items: UpcomingEvent[];
  emptyLabel: string;
}) {
  if (items.length === 0)
    return <p className="text-sognos-muted">{emptyLabel}</p>;

  return (
    <div className="flex flex-col gap-4">
      {items.map((e) => (
        <EventCard
          key={e.slug}
          href={e.href}
          format={e.format}
          title={e.title}
          meta={`${e.date} · ${e.time} · ${e.location}`}
          image={e.image}
        />
      ))}
    </div>
  );
}

function SectionShell({
  id,
  heading,
  viewAllHref,
  tinted = false,
  children,
}: {
  id: SectionId;
  heading: string;
  /** Omit and no link renders — the heading simply sits alone. */
  viewAllHref?: string;
  /** Alternating band background, after the reference. Each section owns a
   *  full-width surface rather than sharing one continuous white column —
   *  that banding is what separates the sections without needing rules. */
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-kh-section={id}
      className={`scroll-mt-32 ${tinted ? "bg-gray-100" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* `items-end` rather than `items-center`: the link sits on the
            heading's baseline, which is where the reference puts it, and a
            centred link floats above it once the heading is display size. */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            {heading}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              data-slot="view-all"
              className="group inline-flex shrink-0 items-center gap-2"
            >
              View all
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function KnowledgeHubArchive({
  articles,
  upcomingEvents = [],
  initialCategory = null,
  title,
  description,
}: {
  articles: Article[];
  upcomingEvents?: UpcomingEvent[];
  /** Retained so `?category=` links land on a sensible section. The pill
   *  filtering it used to drive is not rebuilt. */
  initialCategory?: string | null;
  title: string;
  description?: string;
}) {
  const [active, setActive] = useState<SectionId>("news");

  // `window.scrollTo` rather than `scrollIntoView`. The latter did nothing
  // here — it resolves against whatever scrolling box it decides owns the
  // element, and on this page that is not the window. Computing the target
  // from the element's own rect is unambiguous, and it lets the offset account
  // for the navbar plus the sticky band instead of relying on `scroll-mt`
  // matching them.
  const goTo = (id: SectionId) => {
    const el = document.querySelector<HTMLElement>(`[data-kh-section="${id}"]`);
    if (!el) return;
    const band = document.querySelector<HTMLElement>("[data-kh-band]");
    const offset = NAVBAR_HEIGHT_PX + (band?.offsetHeight ?? 0);
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  // Scroll-spy. The tabs anchor rather than filter, so the bullet has to
  // follow the reader — clicking is only one of the ways a section becomes
  // current.
  useEffect(() => {
    const nodes = TABS.map((t) =>
      document.querySelector<HTMLElement>(`[data-kh-section="${t.id}"]`),
    ).filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        const id = visible?.target.getAttribute("data-kh-section");
        if (id) setActive(id as SectionId);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (initialCategory !== "Events" && initialCategory !== "Webinar") return;
    goTo("events");
  }, [initialCategory]);

  // Split on the post category. These are three of the five values
  // `knowledgePost.category` allows; the other two are now `event` documents.
  const news = articles.filter((a) => a.category === "News");
  const insights = articles.filter((a) => a.category === "Insights");
  const milestones = articles.filter((a) => a.category === "Milestone");

  // `event` documents only, split on `format` — a webinar is an event with a
  // date, the same document type, so the label is all that separates them.
  //
  // Upcoming only. Past events and webinars belong on the Events & Webinars
  // archive rather than here: this page is what is coming up, and a finished
  // event in that position reads as an invitation to something that has
  // already happened. The legacy `knowledgePost`s carrying an `Events` or
  // `Webinar` category are write-ups of past ones, so they are not surfaced
  // here either.
  const events = upcomingEvents.filter((e) => e.format !== "Webinar");
  const webinars = upcomingEvents.filter((e) => e.format === "Webinar");

  // The dark header's lead card and the three-up beneath it. The newest posts
  // regardless of category; no customer story.
  const [heroPost, ...restForFeatured] = articles;
  const featuredPosts = restForFeatured.slice(0, FEATURED_COUNT);

  const [newsLead, ...newsRest] = news;

  // Search crosses the sections rather than searching within one. Customer
  // stories are not indexed — they are not part of this archive.
  const articleSearchItems: KnowledgeHubSearchItem[] = articles.map((a) => ({
    href: a.href,
    title: a.title,
    category: a.category,
    meta: [a.publishedAt ? formatDate(a.publishedAt) : null, a.readTime]
      .filter(Boolean)
      .join(" · "),
    image: a.image,
    keywords: [a.excerpt, a.industry, a.useCase, a.author],
  }));

  const eventSearchItems: KnowledgeHubSearchItem[] = upcomingEvents.map(
    (e) => ({
      href: e.href,
      title: e.title,
      category: e.format,
      meta: `${e.date} · ${e.location}`,
      image: e.image,
      keywords: [e.format, e.time],
    }),
  );

  const searchItems = [...articleSearchItems, ...eventSearchItems];
  const recentSearchItems = [articleSearchItems[0], eventSearchItems[0]].filter(
    (i): i is KnowledgeHubSearchItem => Boolean(i),
  );

  return (
    <>
      {/* 1 — dark header: title, hero card, featured three-up. */}
      <section className="bg-sognos-navy-darkest text-white">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 text-center lg:pt-40">
          <h1 className="mx-auto max-w-4xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </div>

        {heroPost && (
          <div className="mx-auto max-w-7xl px-6 pb-16">
            <Link
              href={heroPost.href}
              className="flex flex-col border border-white/20 p-4"
            >
              <div
                aria-hidden="true"
                data-slot="thumb"
                className="min-h-[280px]"
              />
              <div className="mt-4 flex flex-col gap-1">
                <span data-slot="eyebrow">{heroPost.category}</span>
                <h2>{heroPost.title}</h2>
                {heroPost.publishedAt && (
                  <p data-slot="meta">{formatDate(heroPost.publishedAt)}</p>
                )}
              </div>
            </Link>

            {featuredPosts.length > 0 && (
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                {featuredPosts.map((a) => (
                  <Link
                    key={a.slug}
                    href={a.href}
                    className="flex flex-col gap-2 border-t border-dotted border-white/30 pt-6"
                  >
                    <h3>{a.title}</h3>
                    {a.publishedAt && (
                      <p data-slot="meta">{formatDate(a.publishedAt)}</p>
                    )}
                    <span data-slot="eyebrow">{a.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 2 — tab band, sticky under the navbar. */}
      <div
        data-kh-band
        className="sticky top-20 z-20 border-b border-dotted border-sognos-line bg-white"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6">
          <div
            role="tablist"
            aria-label="Knowledge Hub"
            className="scrollbar-hide flex min-w-0 flex-1 gap-6 overflow-x-auto"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={tab.id}
                  onClick={() => goTo(tab.id)}
                  className="flex shrink-0 items-center gap-2 py-4"
                >
                  {/* Bullet marks the current section. Always rendered so the
                      label does not shift sideways as the selection moves. */}
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-sognos-blue-accent" : "bg-transparent"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="shrink-0">
            <KnowledgeHubSearchDialog
              items={searchItems}
              recentItems={recentSearchItems}
            />
          </div>
        </div>
      </div>

      {/* 3 — every section, always rendered, in tab order. */}
      {/* 3 — every section is its own full-width band. Backgrounds alternate
          so the sections read as separate surfaces, after the reference. */}
      <div>
        {/* News — lead left, three stacked right. Four items is the section;
            the rest live behind "View all". */}
        <SectionShell id="news" heading="News" viewAllHref={VIEW_ALL.news} tinted>
          {newsLead ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <Tile
                href={newsLead.href}
                eyebrow={newsLead.category}
                title={newsLead.title}
                meta={
                  newsLead.publishedAt ? formatDate(newsLead.publishedAt) : null
                }
                readTime={newsLead.readTime}
                image={newsLead.image}
                lead
                filled
              />
              {/* `[&>a]:flex-1` — the three cards divide the lead card's
                  height between them so both columns end level. The reference
                  achieves this with fixed 187px rows; stretching is the same
                  result and survives a title wrapping to two lines. */}
              <div className="flex flex-col gap-4 [&>a]:flex-1">
                {newsRest.slice(0, 3).map((a) => (
                  <Tile
                    key={a.slug}
                    href={a.href}
                    eyebrow={a.category}
                    title={a.title}
                    meta={a.publishedAt ? formatDate(a.publishedAt) : null}
                    readTime={a.readTime}
                    filled
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sognos-muted">No news yet.</p>
          )}
        </SectionShell>

        {/* Insights — one row of three. */}
        <SectionShell
          id="insights"
          heading="Insights"
          viewAllHref={VIEW_ALL.insights}
        >
          {/* `ArticleCard`, not `Tile` — it is the existing grid card, it
              already carries image, chip, clamped title and the date and
              read-time meta line, and both article detail pages render it.
              Reusing it keeps the three surfaces identical. */}
          {insights.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {insights.slice(0, INSIGHTS_LIMIT).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-sognos-muted">No insights yet.</p>
          )}
        </SectionShell>

        {/* Events & Webinars — two label-rail blocks on one anchor, both
            showing upcoming items only. */}
        <SectionShell
          id="events"
          heading="Events & Webinars"
          tinted
        >
          <div className="flex flex-col gap-16">
            <RailBlock label="Events">
              <EventRail items={events} emptyLabel="No upcoming events." />
            </RailBlock>
            <RailBlock label="Webinars">
              <EventRail items={webinars} emptyLabel="No upcoming webinars." />
            </RailBlock>
          </div>
        </SectionShell>

        {/* Milestones — full-width stacked rows, image left. Dotted rules
            between rather than boxed cards, per the reference's post list. */}
        <SectionShell
          id="milestones"
          heading="Milestones"
          viewAllHref={VIEW_ALL.milestones}
        >
          {milestones.length > 0 ? (
            <div className="grid gap-y-8">
              <div
                aria-hidden="true"
                className="border-t border-dotted border-sognos-line"
              />
              {milestones.map((a) => (
                <Link
                  key={a.slug}
                  href={a.href}
                  className="group space-y-4 border-b border-dotted border-sognos-line pb-6 md:flex md:items-center md:space-x-6 md:space-y-0 md:pb-8 lg:space-x-[4.5rem]"
                >
                  {/* 9/5 and capped at 22.5rem — the reference's own. */}
                  <div className="relative aspect-[9/5] w-full overflow-hidden rounded bg-white md:max-w-[22.5rem] md:shrink-0">
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-sognos-line" />
                    )}
                  </div>
                  <div className="max-w-[32.5rem] space-y-3 md:space-y-6">
                    {/* Icon-led date above the title, then the chip and a
                        second date below it — the reference carries both. */}
                    {a.publishedAt && (
                      <p className="inline-flex items-center gap-2 text-sm text-sognos-muted">
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                        >
                          <rect x="3" y="5" width="18" height="16" rx="2" />
                          <path d="M8 3v4M16 3v4M3 11h18" />
                        </svg>
                        {formatDate(a.publishedAt)}
                      </p>
                    )}
                    <h3 className="font-heading text-lg font-normal leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
                      {a.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
                        {a.category}
                      </span>
                      {a.readTime && (
                        <span className="text-sm text-sognos-muted">
                          {a.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Arrow, pushed to the far edge and sliding on hover. */}
                  <span
                    aria-hidden="true"
                    className="hidden h-9 w-9 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-3 md:block lg:ml-auto"
                    data-slot="arrow"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sognos-muted">No milestones yet.</p>
          )}
        </SectionShell>
      </div>
    </>
  );
}
