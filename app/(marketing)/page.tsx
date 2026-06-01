import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowSognosWorksPreview from "@/components/sections/HowSognosWorksPreview";
import ProductSection from "@/components/sections/ProductSection";
import CustomerStories from "@/components/sections/CustomerStories";
import SolutionsSection from "@/components/sections/SolutionsSection";
import IndustrySection from "@/components/sections/IndustrySection";
import NewsInsightSection, {
  type NewsInsightArticle,
} from "@/components/sections/NewsInsightSection";
import CTASection from "@/components/sections/CTASection";
import { getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getKnowledgePostArchive();
  const newsArticles: NewsInsightArticle[] = posts.map((p) => ({
    category: p.category,
    title: p.title,
    href: `/knowledge-hub/${p.slug}`,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
  }));

  return (
    <>
      <Hero />
      <LogoStrip />
      <HowSognosWorksPreview />
      <ProductSection />
      <SolutionsSection />
      <IndustrySection />
      <CustomerStories />
      <NewsInsightSection articles={newsArticles} />
      <CTASection />
    </>
  );
}
