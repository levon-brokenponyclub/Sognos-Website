import GenogramHero from "@/components/sections/sognosgenogram/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
import GenogramProblems from "@/components/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/sections/sognosgenogram/Features";
import GenogramStories from "@/components/sections/sognosgenogram/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "SognosGenogram - Relationship & Family Context Platform | Sognos",
  description:
    "Map family structures, support networks, and relationship histories directly into case records. SognosGenogram gives every worker the relational context they need.",
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
      <ProductDrawer
        secondaryLabel="Other Products"
        currentProduct="sognosgenogram"
        peekTitle="What SognosGenogram Solves"
        peekDescription="Standard case management captures what happened. SognosGenogram captures who is involved and what that means for service delivery."
        drawerTitle="Other Products"
        drawerDescription="Explore the full Sognos platform."
      />
      <ProductSubNav
        productName="SognosGenogram"
        logoSrc="/logos/sognos-genogram-logo-color.svg"
        sections={SECTIONS}
      />
      <GenogramProblems />
      <GenogramFeatures />
      <GenogramStories />
      <CTASection
        headline="Ready to bring relationship context into your case records?"
        subtext="Book a call and we'll show you how SognosGenogram fits into your existing care operations."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
        defaultProduct="sognosgenogram"
      />
    </>
  );
}
