import SognoscareRosterHero from "@/components/layout/sections/sognosroster/Hero";
import SognoscareRosterProblems from "@/components/layout/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/layout/sections/sognosroster/Features";
import SognoscareRosterAdvantages from "@/components/layout/sections/sognosroster/Advantages";
import SognoscareRosterStories from "@/components/layout/sections/sognosroster/Stories";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "SognosRoster - Workforce Scheduling & Optimisation | Sognos",
  description:
    "Allocate the right people, at the right time, to the right services - automatically. Built for complex service operations.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Key Advantages", id: "advantages" },
  { label: "Customer Stories", id: "stories" },
  { label: "Download Datasheet", id: "datasheet", href: "/datasheets/SognosRoster-datasheet.pdf", download: true },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default async function SognoscareRosterPage() {
  return (
    <>
      {/* Hero trust logos hidden on the product pages (2026-11-02). */}
      <SognoscareRosterHero />
      {/* Sub-nav — white, pins under the navbar after the hero. */}
      <ProductSubNav
        productName="SognosRoster"
        sections={SECTIONS}
        variant="sticky"
        logoSrc="/logos/sognos-roster-logo-color.svg"
        markClass="decoration-sognos-roster-base"
      />
      <ScrollReveal>
        <SognoscareRosterProblems />
      </ScrollReveal>
      <ScrollReveal>
        <SognoscareRosterFeatures />
      </ScrollReveal>
      <ScrollReveal>
        <SognoscareRosterAdvantages />
      </ScrollReveal>
      <ScrollReveal>
        <SognoscareRosterStories />
      </ScrollReveal>
    </>
  );
}
