import KnowledgeHubArchive, {
  type Article,
  type UpcomingEvent,
} from "@/components/layout/sections/KnowledgeHubArchive";
import {
  getKnowledgePostArchive,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatEventDate, formatEventTime } from "@/lib/eventFormat";

export const metadata = {
  title: "Knowledge Hub - Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export const revalidate = 60;

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Customer stories are deliberately not fetched: they have their own
  // archive at /customer-stories and no longer appear in the Knowledge Hub.
  // Upcoming only. Past events and webinars belong on the Events & Webinars
  // archive, so there is no reason to fetch them here.
  const [posts, events] = await Promise.all([
    getKnowledgePostArchive(),
    getUpcomingEvents(),
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

  // Formatted here rather than in the archive: that is a Client Component, and
  // date formatting done there would run against the viewer's timezone.
  const upcomingEvents: UpcomingEvent[] = events.map((e) => ({
    slug: e.slug,
    format: e.format,
    title: e.title,
    href: `/events/${e.slug}`,
    date: formatEventDate(e.date),
    time: formatEventTime(e.date, e.endDate),
    location: e.location ?? e.meta ?? "",
    image: e.heroImage
      ? urlFor(e.heroImage).width(1200).auto("format").url()
      : "",
  }));

  return (
    <KnowledgeHubArchive
      articles={articles}
      upcomingEvents={upcomingEvents}
      initialCategory={category ?? null}
      title="Knowledge Hub"
      description="News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
    />
  );
}
