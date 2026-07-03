import Hero from "@/components/sections/Hero";
import HomeProductCards from "@/components/sections/HomeProductCards";
import LogoStrip from "@/components/sections/LogoStrip";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HowSognosWorks from "@/components/sections/HowSognosWorks";
import IndustrySection from "@/components/sections/IndustrySection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import NewsInsightSection, {
  type NewsInsightArticle,
} from "@/components/sections/NewsInsightSection";
import CustomerStories from "@/components/sections/CustomerStories";
import { getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getKnowledgePostArchive();
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
      <ScrollReveal y={40} duration={0.7}>
        <LogoStrip /> {/* "Trusted by industry leaders and professionals worldwide" */}
      </ScrollReveal>
      <HowSognosWorks /> {/* "Safe. Flexible. Independent." — 3 blocks */}
      <IndustrySection /> {/* "Powering progress across industries" */}
      <SolutionsSection /> {/* "Our models. Your business." */}
      <NewsInsightSection articles={newsArticles} /> {/* "The latest news" */}
      <CustomerStories /> {/* Embla gutter-inset slider, product-dark palette */}
    </>
  );
}
