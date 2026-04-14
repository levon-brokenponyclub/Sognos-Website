import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import SognoscareRosterProblems from "@/components/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/sections/sognosroster/Features";
import SognoscareRosterAdvantages from "@/components/sections/sognosroster/Advantages";
import SognoscareRosterProof from "@/components/sections/sognosroster/Proof";
import SognoscareRosterStories from "@/components/sections/sognosroster/Stories";
import SognoscareRosterIntegration from "@/components/sections/sognosroster/Integration";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "SognosRoster — Workforce Scheduling & Optimisation | Sognos",
  description:
    "Allocate the right people, at the right time, to the right services — automatically. Built for complex service operations.",
};

const SECTIONS = [
  { label: "Problems", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Advantages", id: "advantages" },
  { label: "Proof", id: "proof" },
  { label: "Stories", id: "stories" },
  { label: "Integration", id: "integration" },
];

export default function SognoscareRosterPage() {
  return (
    <>
      <SognoscareRosterHero />
      <ProductSubNav productName="SognosRoster" sections={SECTIONS} />
      <SognoscareRosterProblems />
      <SognoscareRosterFeatures />
      <SognoscareRosterAdvantages />
      <SognoscareRosterProof />
      <SognoscareRosterStories />
      <SognoscareRosterIntegration />
      <CTASection
        headline="Ready to automate your workforce scheduling?"
        subtext="Book a personalised demo and see how SognosRoster handles your specific scheduling volume, skills requirements, and real-time operational demands."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
