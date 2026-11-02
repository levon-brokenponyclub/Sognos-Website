import GenogramHero from "@/components/layout/sections/sognosgenogram/Hero";
import { getProductTrustLogos } from "@/components/layout/sections/ProductTrustStrip";
import GenogramProblems from "@/components/layout/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/layout/sections/sognosgenogram/Features";
import GenogramAdvantages from "@/components/layout/sections/sognosgenogram/Advantages";
import GenogramStories from "@/components/layout/sections/sognosgenogram/Stories";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "SognosGenogram - Relationship & Family Context Platform | Sognos",
  description:
    "Map family structures, support networks, and relationship histories directly into case records. SognosGenogram gives every worker the relational context they need.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Key Advantages", id: "advantages" },
  { label: "Customer Stories", id: "stories" },
  { label: "Download Datasheet", id: "datasheet", href: "/datasheets/SognosGenogram-datasheet.pdf", download: true },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default async function SognosGenogramPage() {
  const trustLogos = (await getProductTrustLogos()).map((logo) => ({
    alt: logo.alt,
    src: urlFor(logo.image).width(360).auto("format").url(),
  }));

  return (
    <>
      <GenogramHero trustLogos={trustLogos} />
      {/* Sub-nav — white, pins under the navbar after the hero. */}
      <ProductSubNav
        productName="SognosGenogram"
        sections={SECTIONS}
        variant="sticky"
        logoSrc="/logos/sognos-genogram-logo-color.svg"
        markClass="decoration-sognos-genogram-base"
      />
      <ScrollReveal>
        <GenogramProblems />
      </ScrollReveal>
      <ScrollReveal>
        <GenogramFeatures />
      </ScrollReveal>
      <ScrollReveal>
        <GenogramAdvantages />
      </ScrollReveal>
      <ScrollReveal>
        <GenogramStories />
      </ScrollReveal>
    </>
  );
}
