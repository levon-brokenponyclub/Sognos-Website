import KnowledgeHub from "@/components/layout/sections/knowledge-hub/KnowledgeHub";
import type {
  KhPastItem,
  KhPost,
} from "@/components/layout/sections/knowledge-hub/types";
import {
  getEventArchive,
  getKnowledgePostArchive,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { toUpcomingEvent } from "@/lib/eventListing";
import { formatEventDate } from "@/lib/eventFormat";

export const metadata = {
  title: "Knowledge Hub - Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export const revalidate = 60;

// Past events and webinar recordings merged into one newest-first list.
const PAST_LIMIT = 12;

// "2026-04-01" → { day: "1", month: "Apr" } for a recording row.
function shortDate(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return {
    day: String(d.getUTCDate()),
    month: d.toLocaleDateString("en-AU", { month: "short", timeZone: "UTC" }),
  };
}

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Customer stories are deliberately not fetched: they have their own
  // archive at /customer-stories and no longer appear in the Knowledge Hub.
  // Upcoming events, plus past (non-webinar) events for "Past events &
  // recordings". Past webinars are the Webinar recording posts instead.
  const [posts, events, eventArchive] = await Promise.all([
    getKnowledgePostArchive(),
    getUpcomingEvents(),
    getEventArchive(),
  ]);

  const kh: KhPost[] = posts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    href: `/knowledge-hub/${p.slug}`,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
    // The featured card and the grid's lead card render well past 720px.
    imageLarge: p.heroImage
      ? urlFor(p.heroImage).width(1400).auto("format").url()
      : "",
    industry: p.industry ?? null,
    useCase: p.useCase ?? null,
    publishedAt: p.date ?? null,
    readTime: p.readTime ?? null,
    author: p.author ?? null,
  }));

  const past: [number, KhPastItem][] = [
    ...eventArchive
      .filter((e) => e.isPast && e.format !== "Webinar")
      .map((e) => {
        const [day, month] = formatEventDate(e.date, e.timezone).split(" ");
        const ev = toUpcomingEvent(e);
        return [
          Date.parse(e.date),
          {
            key: `event-${e.slug}`,
            kind: "event" as const,
            title: e.title,
            href: ev.href,
            day,
            month,
            tag: [e.format, ev.location].filter(Boolean).join(" · "),
            excerpt: e.excerpt,
            image: ev.image,
          },
        ] as [number, KhPastItem];
      }),
    ...kh
      .filter((a) => a.category === "Webinar" && a.publishedAt)
      .map((a): [number, KhPastItem] => [
        Date.parse(a.publishedAt!),
        {
          key: `recording-${a.slug}`,
          kind: "recording" as const,
          title: a.title,
          href: a.href,
          ...shortDate(a.publishedAt!),
          tag: "Webinar recording",
          excerpt: a.excerpt,
          image: a.image,
        },
      ]),
  ]
    .sort((x, y) => y[0] - x[0])
    .slice(0, PAST_LIMIT);

  return (
    <KnowledgeHub
      title="Knowledge Hub"
      description="News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
      posts={kh}
      upcoming={events[0] ? toUpcomingEvent(events[0]) : undefined}
      past={past.map(([, item]) => item)}
      initialCategory={category ?? null}
    />
  );
}
