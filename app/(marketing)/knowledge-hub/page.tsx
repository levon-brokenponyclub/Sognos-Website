import KnowledgeHubArchive, {
  type Article,
  type FeaturedStory,
  type UpcomingEvent,
} from "@/components/layout/sections/KnowledgeHubArchive";
import {
  getCustomerStoryArchive,
  getKnowledgePostArchive,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "Knowledge Hub - Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export const revalidate = 60;

// Events are stored as a UTC instant, and the audience is Australian, so both
// parts of the display are pinned to Sydney rather than left to the viewer's
// locale. Without the timezone the 17 September breakfast reads as the 16th to
// anyone west of Perth.
const EVENT_DATE = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const EVENT_TIME = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const STORY_DATE = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [posts, events, stories] = await Promise.all([
    getKnowledgePostArchive(),
    getUpcomingEvents(),
    getCustomerStoryArchive(),
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
  const upcomingEvents: UpcomingEvent[] = events.map((e) => {
    const start = EVENT_TIME.format(new Date(e.date));
    const end = e.endDate ? EVENT_TIME.format(new Date(e.endDate)) : null;
    return {
      slug: e.slug,
      format: e.format,
      title: e.title,
      href: `/events/${e.slug}`,
      date: EVENT_DATE.format(new Date(e.date)),
      // A range only when there is an end to range to. Composed here rather
      // than in the card so the card never has to reason about the absence.
      time: end ? `${start} - ${end}` : start,
      location: e.location ?? e.meta ?? "",
      image: e.heroImage
        ? urlFor(e.heroImage).width(1200).auto("format").url()
        : "",
    };
  });

  // Newest story — the archive query already orders by date descending.
  const latest = stories[0];
  const featuredStory: FeaturedStory | null = latest
    ? {
        slug: latest.slug,
        company: latest.company,
        title: latest.title,
        excerpt: latest.description,
        date: STORY_DATE.format(new Date(latest.date)),
        readTime: latest.readTime ?? null,
        image: latest.heroImage
          ? urlFor(latest.heroImage).width(1200).auto("format").url()
          : "",
        logo: latest.companyLogo
          ? urlFor(latest.companyLogo).width(360).auto("format").url()
          : "",
      }
    : null;

  return (
    <KnowledgeHubArchive
      articles={articles}
      upcomingEvents={upcomingEvents}
      featuredStory={featuredStory}
      initialCategory={category ?? null}
      title="Knowledge Hub"
      description="News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
    />
  );
}
