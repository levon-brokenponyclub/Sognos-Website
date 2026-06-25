import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import SognoscareRosterProblems from "@/components/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/sections/sognosroster/Features";
import SognoscareRosterAdvantages from "@/components/sections/sognosroster/Advantages";
import SognoscareRosterStories from "@/components/sections/sognosroster/Stories";
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
      <ProductSubNav productName="SognosRoster" sections={SECTIONS} />
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
