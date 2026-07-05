import GenogramHero from "@/components/layout/sections/sognosgenogram/Hero";
import ProductTrustStrip from "@/components/layout/sections/ProductTrustStrip";
import GenogramProblems from "@/components/layout/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/layout/sections/sognosgenogram/Features";
import GenogramStories from "@/components/layout/sections/sognosgenogram/Stories";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Sognos Genogram - Relationship & Family Context Platform | Sognos",
  description:
    "Map family structures, support networks, and relationship histories directly into case records. Sognos Genogram gives every worker the relational context they need.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Customer Stories", id: "stories" },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default function SognosGenogramPage() {
  return (
    <>
      <GenogramHero />
      <ScrollReveal>
        <ProductTrustStrip />
      </ScrollReveal>
      <div className="bg-sognos-genogram-dark flex justify-center px-6 pt-20 pb-16 md:pt-28">
        <ProductSubNav productName="Sognos Genogram" sections={SECTIONS} />
      </div>
      <ScrollReveal>
        <GenogramProblems />
      </ScrollReveal>
      <ScrollReveal>
        <GenogramFeatures />
      </ScrollReveal>
      <ScrollReveal>
        <GenogramStories />
      </ScrollReveal>
    </>
  );
}
