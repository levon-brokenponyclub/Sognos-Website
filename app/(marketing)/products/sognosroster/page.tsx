import SognoscareRosterHero from "@/components/layout/sections/sognosroster/Hero";
import ProductTrustStrip from "@/components/layout/sections/ProductTrustStrip";
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
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default function SognoscareRosterPage() {
  return (
    <>
      <SognoscareRosterHero />
      <ScrollReveal>
        <ProductTrustStrip />
      </ScrollReveal>
      <div className="bg-sognos-roster-dark flex justify-center px-6 pt-20 pb-16 md:pt-28">
        <ProductSubNav productName="SognosRoster" sections={SECTIONS} />
      </div>
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
