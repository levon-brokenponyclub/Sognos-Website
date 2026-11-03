import Hero from "@/components/layout/sections/Hero";
import HomeProductStack from "@/components/layout/sections/home/HomeProductStack";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import HowSognosWorks from "@/components/layout/sections/HowSognosWorks";
// import ProductsSection from "@/components/layout/sections/ProductsSection"; // parked — coming back after Solutions Pass
import HomeIndustriesGrid from "@/components/layout/sections/home/HomeIndustriesGrid";
import HomeCtaBand from "@/components/layout/sections/home/HomeCtaBand";
import SolutionsSection from "@/components/layout/sections/SolutionsSection";
import type { NewsInsightArticle } from "@/components/layout/sections/NewsInsightSection";
import HomeNewsList from "@/components/layout/sections/home/HomeNewsList";
import HomeStorySlider from "@/components/layout/sections/home/HomeStorySlider";
import {
  getKnowledgePostArchive,
  type KnowledgePostArchive,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

// Readable labels for the News & Insights rows (mockup option C).
const CATEGORY_LABEL: Record<string, string> = {
  Webinar: "Webinar recording",
};

function postToArticle(p: KnowledgePostArchive): NewsInsightArticle {
  return {
    slug: p.slug,
    kind: "post",
    category: CATEGORY_LABEL[p.category] ?? p.category,
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

export default async function HomePage() {
  // News & Insights: the latest four posts in any category (`order(date
  // desc)`), as in the mockup's option C.
  const posts = await getKnowledgePostArchive();
  const newsArticles: NewsInsightArticle[] = posts.slice(0, 4).map(postToArticle);

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
      {/* Solutions · C editorial cards, all eight (white) */}
      <SolutionsSection />
      {/* CTA band · E2 platform orbit (navy-dark, full width) */}
      <HomeCtaBand />
      {/* Industries · A split, 2 + 3 grid (tint) */}
      <HomeIndustriesGrid />
      {/* Customer Stories · E testimonial slider (navy) */}
      <HomeStorySlider />
      {/* News & Insights · C editorial rows (tint) */}
      <HomeNewsList articles={newsArticles} />
    </>
  );
}
