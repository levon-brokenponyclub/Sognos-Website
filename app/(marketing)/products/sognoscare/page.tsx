import SognoscareHero from "@/components/layout/sections/sognoscare/Hero";
import { getProductTrustLogos } from "@/components/layout/sections/ProductTrustStrip";
import SognoscareProblems from "@/components/layout/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/layout/sections/sognoscare/Features";
import SognoscareEditions from "@/components/layout/sections/sognoscare/Editions";
import SognoscareAdvantages from "@/components/layout/sections/sognoscare/Advantages";
import SognoscareStories from "@/components/layout/sections/sognoscare/Stories";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getSognoscarePageContent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export async function generateMetadata() {
  const content = await getSognoscarePageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function SognosCarePage() {
  const [content, logos] = await Promise.all([
    getSognoscarePageContent(),
    getProductTrustLogos(),
  ]);
  const trustLogos = logos.map((logo) => ({
    alt: logo.alt,
    src: urlFor(logo.image).width(360).auto("format").url(),
  }));

  return (
    <>
      {/* Section bar — portals into the Navbar's slot under the 80px bar. */}
      <ProductSubNav
        productName="SognosCare"
        sections={content.subNav}
        variant="bar"
      />
      <SognoscareHero
        logoSrc={content.hero.logoSrc}
        headline={content.hero.headline}
        subtext={content.hero.subtext}
        trustLogos={trustLogos}
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
