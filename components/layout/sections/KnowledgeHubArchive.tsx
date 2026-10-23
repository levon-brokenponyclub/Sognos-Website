"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProgressButton } from "@/components/layout/sections/shared/TimerCardDeck";
import {
  KnowledgeHubSearchDialog,
  type KnowledgeHubSearchItem,
} from "@/components/ui/knowledge-hub-search-dialog";
import { formatDate } from "@/lib/formatDate";
import { toWebinarRecording } from "@/lib/webinarRecording";

const HERO_AUTOPLAY_MS = 8000;

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
  excerpt?: string | null;
  /** External registration form; only set while registration is open. */
  registerUrl?: string | null;
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

// Newsletters are full email HTML pages, so they open in a new tab.
function newsletterLinkProps(category: string) {
  return category === "Newsletter"
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

// ─── Grid card ────────────────────────────────────────────────────────────────

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      {...newsletterLinkProps(article.category)}
      className="group flex flex-col pb-6 border-b border-sognos-line text-sognos-heading"
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
          <div className="h-full w-full bg-sognos-tint" />
        )}
      </div>
      {/* 32px, rising to 36px from lg — the reference's own image-to-content
          gap (`space-y-8 lg:space-y-[2.25rem]` on routable.com/resources). The
          16px this replaced was what made the cards read tight. */}
      <div className="mt-4 flex flex-col flex-1 lg:mt-6">
        <h3 className="font-heading text-xl font-normal leading-snug tracking-tight text-sognos-heading line-clamp-2 transition-colors group-hover:text-sognos-blue-accent">
          {article.title}
        </h3>
        {/* Pill + date · read time, together at the bottom-left. */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <span className="inline-flex h-6.5 w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
            {article.category}
          </span>
          {(article.publishedAt || article.readTime) && (
            <span className="text-xs font-normal uppercase tracking-wide text-sognos-heading">
              {article.publishedAt && (
                <span className="text-sognos-muted">
                  {formatDate(article.publishedAt)}
                </span>
              )}
              {article.publishedAt && article.readTime && " — "}
              {article.readTime && article.readTime.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Hero selector ──────────────────────────────────────────────────────────

function HeroSelector({ articles }: { articles: Article[] }) {
  const total = articles.length;
  const prefersReducedMotion = useReducedMotion();
  const autoplay = total > 1 && !prefersReducedMotion;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeIndex = Math.min(selectedIndex, total - 1);
  const active = articles[activeIndex];

  useEffect(() => {
    if (!autoplay || paused) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= HERO_AUTOPLAY_MS) {
        setProgress(0);
        setSelectedIndex((i) => (i + 1) % total);
        return;
      }
      setProgress(elapsed / HERO_AUTOPLAY_MS);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paused, selectedIndex, total]);

  const select = useCallback((i: number) => {
    setProgress(0);
    setSelectedIndex(i);
  }, []);

  if (total === 0) return null;

  return (
    <div
      className="mx-auto max-w-7xl px-6 pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Left — article selector */}
        <div className="flex flex-col">
          {articles.map((a, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={a.slug}
                type="button"
                onClick={() => select(i)}
                className={`group relative flex flex-col gap-2 border-t border-white/10 px-5 py-5 text-left transition-colors duration-300 first:border-t-0 ${
                  isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Active accent bar */}
                <span
                  className={`absolute left-0 top-0 h-full w-0.5 transition-colors duration-300 ${
                    isActive ? "bg-sognos-blue-accent" : "bg-transparent"
                  }`}
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {a.category}
                </span>
                <span
                  className={`font-heading text-lg font-normal leading-snug tracking-tight line-clamp-2 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  {a.title}
                </span>
                {a.publishedAt && (
                  <span className="text-xs text-white/30">
                    {formatDate(a.publishedAt)}
                    {a.readTime && ` · ${a.readTime}`}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right — image panel with crossfade */}
        <Link
          href={active.href}
          {...newsletterLinkProps(active.category)}
          className="group relative block aspect-[4/3] overflow-hidden rounded md:aspect-auto md:min-h-[420px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
              className="absolute inset-0"
            >
              {active.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-white/5" />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Overlay copy pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <h2 className="max-w-lg font-heading text-xl font-medium leading-snug tracking-tight text-white md:text-2xl">
                  {active.title}
                </h2>
                {active.excerpt && (
                  <p className="mt-2 max-w-md line-clamp-2 text-sm leading-relaxed text-white/60">
                    {active.excerpt}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Countdown ring */}
          {autoplay && (
            <div className="absolute right-4 top-4">
              <ProgressButton
                paused={paused}
                progress={progress}
                autoplayMs={HERO_AUTOPLAY_MS}
                onToggle={(e) => {
                  e.preventDefault();
                  setPaused((p) => !p);
                }}
              />
            </div>
          )}
        </Link>
      </div>
    </div>
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
//   3. News, Insights, Newsletters, Events & Webinars, Milestones. All always
//      rendered.
//
// The tabs do **not** show and hide sections. Every section is always in the
// document and a tab scrolls to it — the reference's behaviour, and the reason
// the bullet needs a scroll-spy rather than click state: a reader can reach a
// section by scrolling, and the tab has to follow.
//
// Sections come from `knowledgePost.category`, which is the existing content
// model — News, Insights and Milestone are three of its five values. Events and
// Webinars come from `event` documents, arriving as `upcomingEvents` split on
// `format`. The Webinars rail also lists the newest `Webinar` posts (on-demand
// recordings) after any upcoming webinar events.
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

type SectionId = "news" | "insights" | "newsletters" | "events" | "milestones";

const TABS: readonly { id: SectionId; label: string }[] = [
  { id: "news", label: "News" },
  { id: "insights", label: "Insights" },
  { id: "newsletters", label: "Newsletters" },
  { id: "events", label: "Events & Webinars" },
  { id: "milestones", label: "Milestones" },
];

const FEATURED_COUNT = 3;
const INSIGHTS_LIMIT = 3;
const WEBINAR_POSTS_LIMIT = 3;

// Where each section's "View all" goes. **None of these routes exist yet** —
// they are listed in one place so building them is a matter of creating the
// pages, not hunting for links.
//
// The three under /knowledge-hub sit in the same segment as
// /knowledge-hub/[slug], so each one is reachable only while no post claims
// that slug. If that is a risk worth avoiding they should move to the top
// level instead.
const VIEW_ALL: Record<SectionId, string> = {
  news: "/knowledge-hub/category/news",
  insights: "/knowledge-hub/category/insights",
  newsletters: "/knowledge-hub/category/newsletters",
  // Placeholder: /events has no index page yet (only /events/nfp-real-care).
  events: "/events",
  milestones: "/knowledge-hub/category/milestones",
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
    : "border-b border-sognos-line pb-1";
  const showImage = lead || !!image;
  // 24px inside a filled panel — the reference's `mb-6`. The plain card keeps
  // the wider 32/36px gap, which is what it uses with no padding to help it.
  const contentGap = showImage ? (filled ? "mt-6" : "mt-8 lg:mt-9") : "";

  return (
    <Link
      href={href}
      className={`group flex flex-col text-sognos-heading ${surface}`}
    >
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
        <h3
          className={`mt-4 font-heading font-normal leading-snug tracking-tight text-sognos-heading line-clamp-2 transition-colors group-hover:text-sognos-blue-accent ${
            lead ? "text-xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        {(meta || readTime) && (
          /* `mt-auto` in a filled panel: the meta line sits on the card's
             bottom padding however tall the title runs, which is what keeps a
             column of stacked panels aligned. The plain card has no floor to
             sit on, so it keeps the fixed gap. */
          <p
            className={`text-xs font-normal tracking-wide uppercase text-sognos-heading ${
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
export function RailBlock({
  id,
  label,
  viewAllHref,
  children,
}: {
  /** Optional anchor, e.g. /events#webinars. */
  id?: string;
  label: string;
  /** Optional "View all" link under the label. */
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="grid scroll-mt-28 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div className="flex items-baseline justify-between gap-4 lg:col-span-2 lg:sticky lg:top-[100px] lg:block lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
          {label}
        </p>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm lg:mt-3"
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
        className="group grid gap-4 py-4 text-sognos-heading sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:py-6"
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

// Two-column card after the reference: copy on the left, image on the right,
// an even 1fr/1fr split. The meta is a label:value list — "Date" and
// "Location" rows, each with a hairline rule above it and its value
// right-aligned — rather than a single run-on line. Time folds into the Date
// row's value. Format keeps the site's filled-chip pattern (shared with
// `PastEventRow` above) rather than the reference's icon+plain-text eyebrow.
//
// The card is a stretched link (the title's `after:` covers the card) so the
// Register button can be its own external link without nesting anchors.
export function EventCard({
  href,
  format,
  title,
  excerpt,
  date,
  time,
  location,
  image,
  registerUrl,
}: {
  href: string;
  format: string;
  title: string;
  excerpt?: string | null;
  /** e.g. "17 Sep 2026" */
  date: string;
  /** e.g. "8:30 am - 10:30 am" — folded into the Date row's value. */
  time?: string | null;
  location?: string | null;
  image?: string | null;
  /** Shown as a Register button when present. */
  registerUrl?: string | null;
}) {
  return (
    // Content wider than the image (1 / 0.85) — the date and place are the
    // decision; the photo is atmosphere.
    <div className="group relative grid overflow-hidden rounded bg-white text-sognos-heading md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* Copy left. `justify-between` pins the pill+title group to the top and
          the meta + actions to the bottom. Global card padding. */}
      <div className="flex flex-col justify-between gap-8 p-6 lg:p-8">
        <div>
          <span className="inline-flex w-fit items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
            {format}
          </span>
          <h3 className="mt-4 font-heading text-2xl font-normal leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
            <Link href={href} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-sognos-body">
              {excerpt}
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-baseline justify-between gap-4 border-t border-sognos-line py-4">
            <span className="shrink-0 text-base text-sognos-muted">Date</span>
            <span className="text-right text-base text-sognos-heading">
              {time ? `${date} · ${time}` : date}
            </span>
          </div>
          {location ? (
            <div className="flex items-baseline justify-between gap-4 border-t border-sognos-line py-4">
              <span className="shrink-0 text-base text-sognos-muted">
                Location
              </span>
              <span className="text-right text-base text-sognos-heading">
                {location}
              </span>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 border-t border-sognos-line pt-5">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 rounded-full border border-sognos-navy px-4 py-2 text-sm font-medium text-sognos-navy"
            >
              View event
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            {registerUrl && (
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-sognos-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sognos-blue-accent"
              >
                Register
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Image right. With a usable image, the photo runs full bleed; without
          one, a solid navy panel carrying the format. 16/9 on mobile where it
          sits below the copy; on md it stretches to the copy's height. */}
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
    </div>
  );
}

// ─── All / Upcoming / Past tabs ───────────────────────────────────────────────
// Shared by the Events and Webinars rails. Client-side only: both lists are
// already on the page, so a tab just picks which one renders.

type StatusTab = "all" | "upcoming" | "past";

const STATUS_TABS: readonly { id: StatusTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

function StatusTabsRail<T>({
  label,
  noun,
  upcoming,
  past,
  getKey,
  render,
}: {
  /** Accessible name for the tab list, e.g. "Events". */
  label: string;
  /** Plural noun for the empty states, e.g. "events". */
  noun: string;
  upcoming: T[];
  past: T[];
  getKey: (item: T) => string;
  render: (item: T) => React.ReactNode;
}) {
  const [tab, setTab] = useState<StatusTab>("all");
  const items =
    tab === "upcoming"
      ? upcoming
      : tab === "past"
        ? past
        : [...upcoming, ...past];
  const empty =
    tab === "upcoming"
      ? `No upcoming ${noun}.`
      : tab === "past"
        ? `No past ${noun} yet.`
        : `No ${noun} yet.`;

  return (
    <div>
      <div role="tablist" aria-label={label} className="mb-6 flex gap-2">
        {STATUS_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              tab === t.id
                ? "border-sognos-navy bg-sognos-navy text-white"
                : "border-sognos-line bg-white text-sognos-body hover:border-sognos-navy/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="text-sognos-muted">{empty}</p>
      ) : (
        <div className="flex flex-col gap-3 lg:gap-4">
          {items.map((item) => (
            <div key={getKey(item)}>{render(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EventRail({
  upcoming,
  past,
}: {
  upcoming: UpcomingEvent[];
  past: UpcomingEvent[];
}) {
  return (
    <StatusTabsRail
      label="Events"
      noun="events"
      upcoming={upcoming}
      past={past}
      getKey={(e) => e.slug}
      render={(e) => (
        <EventCard
          href={e.href}
          format={e.format}
          title={e.title}
          excerpt={e.excerpt}
          date={e.date}
          time={e.time}
          location={e.location}
          image={e.image}
          registerUrl={e.registerUrl}
        />
      )}
    />
  );
}

// ─── Webinars ──────────────────────────────────────────────────────────────────

type WebinarStatus = "upcoming" | "past";

export type WebinarItem = UpcomingEvent & {
  status: WebinarStatus;
  /** Optional pill under the description — the post's industry. */
  tag?: string | null;
};

// Three tracks after the reference: image with a status ribbon, title and
// description, then the details with the action pinned beneath. Stacks in
// that order below md.
function WebinarCard({ item }: { item: WebinarItem }) {
  const upcoming = item.status === "upcoming";
  return (
    <Link
      href={item.href}
      className="group grid grid-cols-1 gap-6 rounded bg-white p-4 text-sognos-heading md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:p-5 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,13rem)] lg:gap-8"
    >
      {/* Image + ribbon */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-sognos-navy p-5">
            <span className="font-heading text-lg tracking-tight text-white/90">
              Webinar
            </span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded px-2.5 py-1 text-xs font-medium ${
            upcoming
              ? "bg-amber-300 text-sognos-heading"
              : "bg-white text-sognos-heading"
          }`}
        >
          {upcoming ? "Upcoming" : "On demand"}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex min-w-0 flex-col">
        <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-3 line-clamp-3 text-base leading-relaxed text-sognos-body">
            {item.excerpt}
          </p>
        )}
        {item.tag && (
          <span className="mt-5 inline-flex w-fit items-center rounded border border-sognos-blue-accent px-2.5 py-1 text-xs text-sognos-blue-accent">
            {item.tag}
          </span>
        )}
      </div>

      {/* Details + action */}
      <div className="flex flex-col justify-between gap-6 md:col-start-2 lg:col-start-3">
        <dl className="flex flex-col gap-4 text-sm text-sognos-body">
          <div className="flex items-start gap-3">
            <dt className="sr-only">Date</dt>
            <CalendarDays
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-sognos-muted"
            />
            <dd>
              {item.date}
              {item.time && <span className="block">{item.time}</span>}
            </dd>
          </div>
          {item.location && (
            <div className="flex items-start gap-3">
              <dt className="sr-only">Location</dt>
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-sognos-muted"
              />
              <dd>{item.location}</dd>
            </div>
          )}
        </dl>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sognos-blue-accent">
          {upcoming ? "Explore event" : "Watch on demand"}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function WebinarRail({
  upcoming,
  past,
}: {
  upcoming: WebinarItem[];
  past: WebinarItem[];
}) {
  return (
    <StatusTabsRail
      label="Webinars"
      noun="webinars"
      upcoming={upcoming}
      past={past}
      getKey={(item) => `${item.status}-${item.slug}`}
      render={(item) => <WebinarCard item={item} />}
    />
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
      className={`scroll-mt-32 ${tinted ? "bg-sognos-tint" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* `items-end` rather than `items-center`: the link sits on the
            heading's baseline, which is where the reference puts it, and a
            centred link floats above it once the heading is display size. */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance text-sognos-heading md:text-4xl">
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
  pastEvents = [],
  initialCategory = null,
  title,
  description,
}: {
  articles: Article[];
  upcomingEvents?: UpcomingEvent[];
  /** Newest past non-webinar events, for the Events rail's Past tab. */
  pastEvents?: UpcomingEvent[];
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
  const newsletters = articles.filter((a) => a.category === "Newsletter");
  const milestones = articles.filter((a) => a.category === "Milestone");

  // `event` documents only, split on `format` — a webinar is an event with a
  // date, the same document type, so the label is all that separates them.
  //
  // Upcoming only. Past events and webinars belong on the Events & Webinars
  // archive rather than here: this page is what is coming up, and a finished
  // event in that position reads as an invitation to something that has
  // already happened. `Events`-category posts are write-ups of past events and
  // are not surfaced here; `Webinar` posts are recordings and are (below).
  const events = upcomingEvents.filter((e) => e.format !== "Webinar");
  // Upcoming webinar events first, then the newest Webinar posts — recordings
  // stay discoverable after the live session has passed. `articles` is
  // already newest-first.
  const upcomingWebinars: WebinarItem[] = upcomingEvents
    .filter((e) => e.format === "Webinar")
    .map((e) => ({ ...e, status: "upcoming" }));
  const pastWebinars: WebinarItem[] = articles
    .filter((a) => a.category === "Webinar")
    .slice(0, WEBINAR_POSTS_LIMIT)
    .map(toWebinarRecording);

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
      {/* 1 — dark header: sidebar selector + image panel, autoplay. */}
      <section className="relative bg-sognos-navy-darkest text-white">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-10 lg:pt-40">
          <h1 className="max-w-3xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </div>

        {heroPost && <HeroSelector articles={[heroPost, ...featuredPosts]} />}
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
        <SectionShell
          id="news"
          heading="News"
          viewAllHref={VIEW_ALL.news}
          tinted
        >
          {newsLead ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-3 md:gap-x-4">
              {/* Lead — 7/12, spans all 3 rows. Image + title + pill + meta. */}
              <Link
                href={newsLead.href}
                className="group flex flex-col overflow-hidden rounded bg-white p-6 md:col-span-7 md:row-span-3 md:p-8 lg:p-14"
              >
                <div className="relative mb-6 aspect-[3/2] w-full overflow-hidden rounded">
                  {newsLead.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={newsLead.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full bg-sognos-tint" />
                  )}
                </div>
                <h3 className="max-w-[28rem] font-heading text-xl font-medium leading-snug tracking-tight text-sognos-heading transition-colors duration-300 group-hover:text-sognos-blue-accent lg:text-2xl">
                  {newsLead.title}
                </h3>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <span className="inline-flex items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
                    {newsLead.category}
                  </span>
                  {newsLead.publishedAt && (
                    <span className="text-xs uppercase tracking-wide text-sognos-muted">
                      {formatDate(newsLead.publishedAt)}
                    </span>
                  )}
                </div>
              </Link>
              {/* Stacked — 5/12, one per row. Text-only, meta pinned to bottom. */}
              {newsRest.slice(0, 3).map((a) => (
                <Link
                  key={a.slug}
                  href={a.href}
                  className="group flex flex-col overflow-hidden rounded bg-white px-6 py-5 md:col-span-5 md:row-span-1 lg:px-8 lg:py-7"
                >
                  <h3 className="max-w-[25rem] font-heading text-base font-normal leading-snug tracking-tight text-sognos-heading transition-colors duration-300 group-hover:text-sognos-blue-accent">
                    {a.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <span className="inline-flex items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
                      {a.category}
                    </span>
                    {a.publishedAt && (
                      <span className="text-xs uppercase tracking-wide text-sognos-muted">
                        {formatDate(a.publishedAt)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
              {insights.slice(0, INSIGHTS_LIMIT).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-sognos-muted">No insights yet.</p>
          )}
        </SectionShell>

        {/* Newsletters — one row of three, same card as Insights. Cards open
            the email page in a new tab. */}
        <SectionShell
          id="newsletters"
          heading="Newsletters"
          viewAllHref={VIEW_ALL.newsletters}
        >
          {newsletters.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
              {newsletters.slice(0, INSIGHTS_LIMIT).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-sognos-muted">No newsletters yet.</p>
          )}
        </SectionShell>

        {/* Events & Webinars — two label-rail blocks on one anchor, both
            showing upcoming items only. */}
        <SectionShell
          id="events"
          heading="Events & Webinars"
          viewAllHref={VIEW_ALL.events}
          tinted
        >
          <div className="flex flex-col gap-16">
            <RailBlock label="Events" viewAllHref={VIEW_ALL.events}>
              <EventRail upcoming={events} past={pastEvents} />
            </RailBlock>
            <RailBlock
              label="Webinars"
              viewAllHref={`${VIEW_ALL.events}#webinars`}
            >
              <WebinarRail upcoming={upcomingWebinars} past={pastWebinars} />
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
            <div className="flex flex-col">
              {milestones.map((a) => (
                <Link
                  key={a.slug}
                  href={a.href}
                  className="group grid grid-cols-1 items-center gap-6 border-t border-dotted border-sognos-line py-8 text-sognos-heading md:grid-cols-[20rem_minmax(0,1fr)_auto] lg:gap-10 lg:py-10"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded">
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="h-full w-full bg-sognos-tint" />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
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
                    <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-sognos-heading transition-colors duration-200 group-hover:text-sognos-blue-accent">
                      {a.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded bg-sognos-muted/15 px-2.5 py-1 text-xs font-normal text-sognos-body">
                        {a.category}
                      </span>
                      {a.readTime && (
                        <span className="text-sm text-sognos-muted">
                          {a.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sognos-line text-sognos-muted transition-all duration-300 group-hover:border-sognos-blue-accent group-hover:text-sognos-blue-accent md:flex"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10h12M12 6l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
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
