import SognoscareHero from "@/components/layout/sections/sognoscare/Hero";
import ProductTrustStrip from "@/components/layout/sections/ProductTrustStrip";
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
  const content = await getSognoscarePageContent();

  return (
    <>
      {/* Sofia Pro via Adobe Typekit — page-scoped resource load for
          the print-weight-ladder application on SognosCare. React 19
          hoists this into <head> via `precedence`. If Sofia Pro fails
          to render, check the Adobe Fonts domain whitelist for
          localhost:3000 (and prod). */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://use.typekit.net/aoi4bxt.css"
        precedence="default"
      />
      <SognoscareHero
        logoSrc={content.hero.logoSrc}
        headline={content.hero.headline}
        subtext={content.hero.subtext}
      />
      <ScrollReveal>
        <ProductTrustStrip
          className="bg-sognos-care-dark"
          dark
        />
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
