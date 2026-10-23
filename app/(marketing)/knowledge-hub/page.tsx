import KnowledgeHubArchive, {
  type Article,
} from "@/components/layout/sections/KnowledgeHubArchive";
import {
  getEventArchive,
  getKnowledgePostArchive,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { toUpcomingEvent } from "@/lib/eventListing";

export const metadata = {
  title: "Knowledge Hub - Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export const revalidate = 60;

const PAST_EVENTS_LIMIT = 3;

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Customer stories are deliberately not fetched: they have their own
  // archive at /customer-stories and no longer appear in the Knowledge Hub.
  // Upcoming events, plus the newest past (non-webinar) events for the Events
  // rail's Past tab. Past webinars are the Webinar recording posts instead.
  const [posts, events, eventArchive] = await Promise.all([
    getKnowledgePostArchive(),
    getUpcomingEvents(),
    getEventArchive(),
  ]);

  const articles: Article[] = posts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    href: `/knowledge-hub/${p.slug}`,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
    industry: p.industry ?? null,
    useCase: p.useCase ?? null,
    publishedAt: p.date ?? null,
    readTime: p.readTime ?? null,
    author: p.author ?? null,
  }));

  const upcomingEvents = events.map(toUpcomingEvent);
  const pastEvents = eventArchive
    .filter((e) => e.isPast && e.format !== "Webinar")
    .slice(0, PAST_EVENTS_LIMIT)
    .map((e) => ({ ...toUpcomingEvent(e), registerUrl: null }));

  return (
    <KnowledgeHubArchive
      articles={articles}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
      initialCategory={category ?? null}
      title="Knowledge Hub"
      description="News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
    />
  );
}
