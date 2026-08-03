"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  KnowledgeHubSearchDialog,
  type KnowledgeHubSearchItem,
} from "@/components/ui/knowledge-hub-search-dialog";

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

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${day}, ${year}`;
}

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
          <div className="h-full w-full bg-gray-200/70" />
        )}
      </div>
      <div className="mt-4 flex flex-col flex-1">
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
  events: "/events",
  milestones: "/knowledge-hub/milestones",
};

// The navbar is a fixed 80px at every breakpoint — see the note in CLAUDE.md.
const NAVBAR_HEIGHT_PX = 80;

function Tile({
  href,
  eyebrow,
  title,
  meta,
  lead = false,
}: {
  href: string;
  eyebrow?: string | null;
  title: string;
  meta?: string | null;
  lead?: boolean;
}) {
  return (
    <Link
      href={href}
      // `border` is scaffold only — it exists so the tiles are visible while
      // the structure is reviewed, and goes when the surfaces land.
      className={`flex flex-col border border-sognos-line p-4 ${
        lead ? "min-h-[420px]" : "min-h-[180px]"
      }`}
    >
      <div
        aria-hidden="true"
        data-slot="thumb"
        className={lead ? "flex-1" : ""}
      />
      <div className="mt-auto flex flex-col gap-1">
        {eyebrow && <span data-slot="eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        {meta && <p data-slot="meta">{meta}</p>}
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
          <p>{title}</p>
          <span data-slot="eyebrow">{format}</span>
        </div>
        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <p data-slot="meta">{date}</p>
          <span className="shrink-0 sm:opacity-0 sm:group-hover:opacity-100">
            {action}
          </span>
        </div>
      </Link>
    </li>
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
  if (items.length === 0) return <p data-slot="empty">{emptyLabel}</p>;

  return (
    <div className="flex flex-col gap-4">
      {items.map((e) => (
        <Tile
          key={e.slug}
          href={e.href}
          eyebrow={e.format}
          title={e.title}
          meta={`${e.date} · ${e.location}`}
          lead
        />
      ))}
    </div>
  );
}

function SectionShell({
  id,
  heading,
  viewAllHref,
  children,
}: {
  id: SectionId;
  heading: string;
  /** Omit and no link renders — the heading simply sits alone. */
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-kh-section={id} className="scroll-mt-32">
      {/* `items-end` rather than `items-center`: the link sits on the
          heading's baseline, which is where the reference puts it, and a
          centred link floats above it once the heading is display size. */}
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2>{heading}</h2>
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
          <h1>{title}</h1>
          {description && <p>{description}</p>}
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
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 lg:gap-24 lg:py-24">
        {/* News — lead left, three stacked right. Four items is the section;
            the rest live behind "View all". */}
        <SectionShell id="news" heading="News" viewAllHref={VIEW_ALL.news}>
          {newsLead ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <Tile
                href={newsLead.href}
                eyebrow={newsLead.category}
                title={newsLead.title}
                meta={
                  newsLead.publishedAt ? formatDate(newsLead.publishedAt) : null
                }
                lead
              />
              <div className="flex flex-col gap-4">
                {newsRest.slice(0, 3).map((a) => (
                  <Tile
                    key={a.slug}
                    href={a.href}
                    eyebrow={a.category}
                    title={a.title}
                    meta={a.publishedAt ? formatDate(a.publishedAt) : null}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p data-slot="empty">No news yet.</p>
          )}
        </SectionShell>

        {/* Insights — one row of three. */}
        <SectionShell
          id="insights"
          heading="Insights"
          viewAllHref={VIEW_ALL.insights}
        >
          {insights.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {insights.slice(0, INSIGHTS_LIMIT).map((a) => (
                <Tile
                  key={a.slug}
                  href={a.href}
                  eyebrow={a.category}
                  title={a.title}
                  meta={a.publishedAt ? formatDate(a.publishedAt) : null}
                />
              ))}
            </div>
          ) : (
            <p data-slot="empty">No insights yet.</p>
          )}
        </SectionShell>

        {/* Events & Webinars — two label-rail blocks on one anchor, both
            showing upcoming items only. */}
        <SectionShell
          id="events"
          heading="Events & Webinars"
          viewAllHref={VIEW_ALL.events}
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
                  <div
                    aria-hidden="true"
                    data-slot="thumb"
                    className="relative aspect-[9/5] w-full overflow-hidden border border-sognos-line md:max-w-[22.5rem] md:shrink-0"
                  />
                  <div className="max-w-[32.5rem] space-y-3 md:space-y-6">
                    {/* Icon-led date above the title, then the chip and a
                        second date below it — the reference carries both. */}
                    {a.publishedAt && (
                      <p className="inline-flex items-center gap-1">
                        <span aria-hidden="true" data-slot="calendar-icon" />
                        <span data-slot="meta">
                          {formatDate(a.publishedAt)}
                        </span>
                      </p>
                    )}
                    <h3>{a.title}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span data-slot="eyebrow">{a.category}</span>
                      {a.readTime && <span data-slot="meta">{a.readTime}</span>}
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
            <p data-slot="empty">No milestones yet.</p>
          )}
        </SectionShell>
      </div>
    </>
  );
}
