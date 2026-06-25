import GenogramHero from "@/components/sections/sognosgenogram/Hero";
import GenogramProblems from "@/components/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/sections/sognosgenogram/Features";
import GenogramStories from "@/components/sections/sognosgenogram/Stories";
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
      <ProductSubNav productName="Sognos Genogram" sections={SECTIONS} />
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
