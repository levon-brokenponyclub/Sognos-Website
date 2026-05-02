import GenogramHero from "@/components/sections/sognosgenogram/Hero";
import GenogramProblems from "@/components/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/sections/sognosgenogram/Features";
import GenogramIntegration from "@/components/sections/sognosgenogram/Integration";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "Sognos Genogram — Relationship & Family Context Platform | Sognos",
  description:
    "Map family structures, support networks, and relationship histories directly into case records. Sognos Genogram gives every worker the relational context they need.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Integration", id: "integration" },
  { label: "Schedule a Call", id: "calendar" },
];

export default function SognosGenogramPage() {
  return (
    <>
      <GenogramHero />
      <ProductSubNav productName="Sognos Genogram" sections={SECTIONS} />
      <GenogramProblems />
      <GenogramFeatures />
      <GenogramIntegration />
      <CTASection
        headline="Ready to bring relationship context into your case records?"
        subtext="Book a call and we&apos;ll show you how Sognos Genogram fits into your existing care operations."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
