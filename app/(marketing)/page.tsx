import Hero from "@/components/layout/sections/Hero";
import HomeProductCards from "@/components/layout/sections/HomeProductCards";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HowSognosWorks from "@/components/layout/sections/HowSognosWorks";
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
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function HomePage() {
  // HeadlineCTA is a Client Component, so its logos are resolved here. Same
  // Sanity source CTASection uses for its "Powered by Microsoft" block.
  const [posts, cta] = await Promise.all([
    getKnowledgePostArchive(),
    getCtaSectionContent(),
  ]);
  const newsArticles: NewsInsightArticle[] = posts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    href: `/knowledge-hub/${p.slug}`,
    date: p.date,
    readTime: p.readTime ?? undefined,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
  }));

  return (
    <>
      {/* Home framework — section order mapped from Cohere Home.html */}
      <Hero /> {/* Hero · navy, text block only */}
      <HomeProductCards /> {/* 3-product AngelList cards (Care / Roster / Genogram) — peeks above fold */}
      {/* <ScrollReveal y={40} duration={0.7}> */}
        <LogoStrip /> {/* "Trusted by industry leaders and professionals worldwide" */}
      {/* </ScrollReveal> */}
      <HowSognosWorks /> {/* "Safe. Flexible. Independent." — 3 blocks */}
      <IndustrySection /> {/* "Powering progress across industries" */}
      <HeadlineCTA platformLogos={cta.logos} />{" "}
      {/* Navy statement CTA — platform orbit + per-word blur reveal */}
      <SolutionsSection /> {/* "Our models. Your business." */}
      <CustomerStories /> {/* Embla gutter-inset slider, product-dark palette */}
      <NewsInsightSection articles={newsArticles} /> {/* "The latest news" */}
    </>
  );
}
