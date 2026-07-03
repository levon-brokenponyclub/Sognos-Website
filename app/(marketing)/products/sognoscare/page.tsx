import SognoscareHero from "@/components/sections/sognoscare/Hero";
import ProductTrustStrip from "@/components/sections/ProductTrustStrip";
import SognoscareProblems from "@/components/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/sections/sognoscare/Features";
import SognoscareEditions from "@/components/sections/sognoscare/Editions";
import SognoscareAdvantages from "@/components/sections/sognoscare/Advantages";
import SognoscareStories from "@/components/sections/sognoscare/Stories";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getSognoscarePageContent } from "@/lib/sanity/queries";

export async function generateMetadata() {
  const content = await getSognoscarePageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function SognosCarePage() {
  const content = await getSognoscarePageContent();

  return (
    <>
      <SognoscareHero
        logoSrc={content.hero.logoSrc}
        headline={content.hero.headline}
        subtext={content.hero.subtext}
      />
      <ScrollReveal>
        <ProductTrustStrip className="bg-sognos-care-dark" />
      </ScrollReveal>
      <SognoscareProblems
        subNav={<ProductSubNav productName="SognosCare" sections={content.subNav} />}
      />
      <SognoscareFeatures
        header={content.featuresHeader}
        features={content.features}
      />
      <ScrollReveal>
        <SognoscareEditions editions={content.editions} />
      </ScrollReveal>
      <ScrollReveal>
        <SognoscareAdvantages
          header={content.advantagesHeader}
          advantages={content.advantages}
        />
      </ScrollReveal>
      <ScrollReveal>
        <SognoscareStories stories={content.featuredStories} />
      </ScrollReveal>
    </>
  );
}
