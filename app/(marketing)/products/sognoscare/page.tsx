import SognoscareHero from "@/components/sections/sognoscare/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
import SognoscareProblems from "@/components/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/sections/sognoscare/Features";
import SognoscareEditions from "@/components/sections/sognoscare/Editions";
import SognoscareAdvantages from "@/components/sections/sognoscare/Advantages";
import SognoscareStories from "@/components/sections/sognoscare/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";
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
      <ProductDrawer
        secondaryLabel="Other Products"
        currentProduct="sognoscare"
        peekTitle={content.productDrawer.peekTitle}
        peekDescription={content.productDrawer.peekDescription}
        drawerTitle={content.productDrawer.drawerTitle}
        drawerDescription={content.productDrawer.drawerDescription}
      />
      <ProductSubNav
        productName="SognosCare"
        logoSrc="/logos/sognos-care-logo-color.svg"
        sections={content.subNav}
      />
      <SognoscareProblems
        header={content.problemsHeader}
        problems={content.problems}
      />
      <SognoscareFeatures
        header={content.featuresHeader}
        features={content.features}
      />
      <SognoscareEditions
        header={content.editionsHeader}
        editions={content.editions}
      />
      <SognoscareAdvantages
        header={content.advantagesHeader}
        advantages={content.advantages}
      />
      <SognoscareStories stories={content.featuredStories} />
      <CTASection
        headline={content.cta.headline}
        subtext={content.cta.subtext}
        primaryCTA={content.cta.primaryCTA}
        secondaryCTA={content.cta.secondaryCTA}
        defaultProduct="sognoscare"
      />
    </>
  );
}
