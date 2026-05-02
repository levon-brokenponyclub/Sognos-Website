import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import SognoscareRosterProblems from "@/components/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/sections/sognosroster/Features";
import SognoscareRosterAdvantages from "@/components/sections/sognosroster/Advantages";
import SognoscareRosterStories from "@/components/sections/sognosroster/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "SognosRoster — Workforce Scheduling & Optimisation | Sognos",
  description:
    "Allocate the right people, at the right time, to the right services — automatically. Built for complex service operations.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Key Advantages", id: "advantages" },
  { label: "Customer Stories", id: "stories" },
  { label: "Schedule a Call", id: "calendar" },
];

export default function SognoscareRosterPage() {
  return (
    <>
      <SognoscareRosterHero />
      <ProductSubNav productName="SognosRoster" sections={SECTIONS} />
      <SognoscareRosterProblems />
      <SognoscareRosterFeatures />
      <SognoscareRosterAdvantages />
      <SognoscareRosterStories />
      <CTASection
        headline="Ready to automate your workforce scheduling?"
        subtext="Book a personalised demo and see how SognosRoster handles your specific scheduling volume, skills requirements, and real-time operational demands."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
