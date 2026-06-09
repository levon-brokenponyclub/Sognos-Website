import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowSognosWorks from "@/components/sections/HowSognosWorks";
import SognosCareCard from "@/components/sections/SognosCareCard";
import IndustrySection from "@/components/sections/IndustrySection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import SognosRosterCard from "@/components/sections/SognosRosterCard";
import NewsInsightSection, {
  type NewsInsightArticle,
} from "@/components/sections/NewsInsightSection";
import CTABand from "@/components/sections/CTABand";
import { getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getKnowledgePostArchive();
  const newsArticles: NewsInsightArticle[] = posts.map((p) => ({
    category: p.category,
    title: p.title,
    href: `/knowledge-hub/${p.slug}`,
    date: p.date,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
  }));

  return (
    <>
      {/* Home framework — section order mapped from Cohere Home.html */}
      <Hero /> {/* Hero · "Own your AI" */}
      <LogoStrip /> {/* "Trusted by industry leaders and developers worldwide" */}
      <HowSognosWorks /> {/* "Safe. Flexible. Independent." — 3 blocks */}
      <SognosCareCard /> {/* "Your sovereign AI workplace" */}
      <SognosRosterCard /> {/* "Developer resources" */}
      <IndustrySection /> {/* "Powering progress across industries" */}
      <SolutionsSection /> {/* "Our models. Your business." */}
      <NewsInsightSection articles={newsArticles} /> {/* "The latest news" */}
      <CTABand /> {/* "Ready to put AI to work?" — Book a Demo band */}
    </>
  );
}
