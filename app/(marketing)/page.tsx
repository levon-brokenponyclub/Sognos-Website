import Hero from "@/components/layout/sections/Hero";
import HomeProductStack from "@/components/layout/sections/home/HomeProductStack";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import HowSognosWorks from "@/components/layout/sections/HowSognosWorks";
// import ProductsSection from "@/components/layout/sections/ProductsSection"; // parked — coming back after Solutions Pass
import IndustryOthersSlider from "@/components/layout/sections/industries/IndustryOthersSlider";
import HomeCtaBand from "@/components/layout/sections/home/HomeCtaBand";
import SolutionsSection from "@/components/layout/sections/SolutionsSection";
import type { NewsInsightArticle } from "@/components/layout/sections/NewsInsightSection";
import HomeNewsList from "@/components/layout/sections/home/HomeNewsList";
import HomeStoryColumns from "@/components/layout/sections/home/HomeStoryColumns";
import {
  getKnowledgePostArchive,
  getUpcomingEvents,
  type EventListing,
  type KnowledgePostArchive,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatEventDate, formatEventTime } from "@/lib/eventFormat";

export const revalidate = 60;

function postToArticle(p: KnowledgePostArchive): NewsInsightArticle {
  return {
    slug: p.slug,
    kind: "post",
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    href: `/knowledge-hub/${p.slug}`,
    date: p.date,
    readTime: p.readTime ?? undefined,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
  };
}

function eventToArticle(e: EventListing): NewsInsightArticle {
  return {
    slug: e.slug,
    kind: "event",
    // The event's own format ("Breakfast event", "Webinar", …) — same pill
    // content EventCard/PastEventRow use in KnowledgeHubArchive.tsx.
    category: e.format,
    title: e.title,
    href: `/events/${e.slug}`,
    // Pre-formatted here (Server Component), timezone-pinned — the two-row
    // Date/Location meta the event tile renders, matching EventCard.
    date: formatEventDate(e.date, e.timezone),
    time: formatEventTime(e.date, e.endDate, e.timezone),
    location: e.location ?? undefined,
    excerpt: e.excerpt ?? undefined,
    image: e.heroImage
      ? urlFor(e.heroImage).width(720).auto("format").url()
      : "",
  };
}

export default async function HomePage() {
  const [posts, upcomingEvents] = await Promise.all([
    getKnowledgePostArchive(),
    getUpcomingEvents(),
  ]);

  // One card per type, in a fixed order — Insights leads as the feature
  // tile, then the soonest upcoming event, then News and Milestone. `posts`
  // is already `order(date desc)`, so the first match per category is the
  // latest of that category; `upcomingEvents` is `order(date asc)`, so its
  // first entry is the soonest. Any missing type just leaves its tile out —
  // `NewsInsightSection` already renders whatever it's given.
  const newsArticles: NewsInsightArticle[] = [
    posts.find((p) => p.category === "Insights"),
    upcomingEvents[0],
    posts.find((p) => p.category === "News"),
    posts.find((p) => p.category === "Milestone"),
  ]
    .filter((item): item is KnowledgePostArchive | EventListing =>
      Boolean(item),
    )
    .map((item) =>
      "format" in item ? eventToArticle(item) : postToArticle(item),
    );

  return (
    <>
      {/* Home — hero-stack mockup port (2026-11-02). Hero · navy, with the
          trust row passed as a child (LogoStrip is an async Server Component
          and Hero a Client Component). */}
      <Hero>
        <LogoStrip variant="hero" />
      </Hero>
      {/* Product stack · stacking cards on the hero's navy (white / tint) */}
      <HomeProductStack />
      {/* How Sognos Works · current deck (tint) */}
      <HowSognosWorks />
      {/* <ProductsSection /> — parked pending review, coming back after Solutions Pass */}
      {/* Solutions · D graphic cards (white) */}
      <SolutionsSection />
      {/* CTA band · C editorial (white) */}
      <HomeCtaBand />
      {/* Industries · G photo slider (tint) */}
      <IndustryOthersSlider tone="tint" heading="Purpose-built for service-intensive sectors" />
      {/* Customer Stories · D expanding stories (navy-deep) */}
      <HomeStoryColumns />
      {/* News & Insights · C editorial rows (tint) */}
      <HomeNewsList articles={newsArticles} />
    </>
  );
}
