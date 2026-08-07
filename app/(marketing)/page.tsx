import Image from "next/image";
import Hero from "@/components/layout/sections/Hero";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HowSognosWorks from "@/components/layout/sections/HowSognosWorks";
// import ProductsSection from "@/components/layout/sections/ProductsSection"; // parked — coming back after Solutions Pass
import IndustrySection from "@/components/layout/sections/IndustrySection";
import HeadlineCTA from "@/components/layout/sections/HeadlineCTA";
import SolutionsSection from "@/components/layout/sections/SolutionsSection";
import NewsInsightSection, {
  type NewsInsightArticle,
} from "@/components/layout/sections/NewsInsightSection";
import CustomerStories from "@/components/layout/sections/CustomerStories";
import {
  getCtaSectionContent,
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
    date: formatEventDate(e.date),
    time: formatEventTime(e.date, e.endDate),
    location: e.location ?? undefined,
    excerpt: e.excerpt ?? undefined,
    image: e.heroImage
      ? urlFor(e.heroImage).width(720).auto("format").url()
      : "",
  };
}

export default async function HomePage() {
  // HeadlineCTA is a Client Component, so its logos are resolved here. Same
  // Sanity source CTASection uses for its "Powered by Microsoft" block.
  const [posts, cta, upcomingEvents] = await Promise.all([
    getKnowledgePostArchive(),
    getCtaSectionContent(),
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
    .map((item) => ("format" in item ? eventToArticle(item) : postToArticle(item)));

  return (
    <>
      {/* Home framework — section order mapped from Cohere Home.html */}
      {/* Hero · navy. The trust strip is passed as a child so it renders
          inside the hero section; `LogoStrip` is an async Server Component and
          `Hero` is a Client Component, so it cannot be imported there. */}
      <Hero
        centerpiece={
          // PLACEHOLDER motion image — Routable payouts UI visual, cropped by
          // the 2.4:1 panel. Swap for the real Sognos motion asset.
          <Image
            src="/dev/Instant-Payouts-Visual-Static.avif"
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        }
      >
        <LogoStrip showTitle={false} />
      </Hero>
      <ScrollReveal>
        {/* Merged narrative section: HIW header states the thesis, product
            cards answer "with what", timer deck answers "how it flows". */}
        <HowSognosWorks />
      </ScrollReveal>
      {/* <ProductsSection /> — parked pending review, coming back after Solutions Pass */}
      <SolutionsSection /> {/* What extends those products — 7 stacked FeatureRows */}
      <HeadlineCTA platformLogos={cta.logos} />{" "}
      {/* Navy statement CTA — platform orbit + per-word blur reveal */}
      <IndustrySection /> {/* Where those solutions apply — 5-card sector rail */}
      <CustomerStories /> {/* Embla gutter-inset slider, product-dark palette */}
      <NewsInsightSection articles={newsArticles} /> {/* "The latest news" */}
    </>
  );
}
