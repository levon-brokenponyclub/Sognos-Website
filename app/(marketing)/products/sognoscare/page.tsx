import SognoscareHero from "@/components/layout/sections/sognoscare/Hero";
import SognoscareProblems from "@/components/layout/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/layout/sections/sognoscare/Features";
import SognoscareEditions from "@/components/layout/sections/sognoscare/Editions";
import SognoscareAdvantages from "@/components/layout/sections/sognoscare/Advantages";
import SognoscareStories from "@/components/layout/sections/sognoscare/Stories";
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
  // Hero trust logos hidden on the product pages (2026-11-02).
  const content = await getSognoscarePageContent();

  return (
    <>
      <SognoscareHero
        logoSrc={content.hero.logoSrc}
        headline={content.hero.headline}
        subtext={content.hero.subtext}
      />
      {/* Sub-nav — white, pins under the navbar after the hero. */}
      <ProductSubNav
        productName="SognosCare"
        sections={content.subNav}
        variant="sticky"
        logoSrc="/logos/sognos-care-logo-color.svg"
        markClass="decoration-sognos-care-base"
      />
      <SognoscareProblems />
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
