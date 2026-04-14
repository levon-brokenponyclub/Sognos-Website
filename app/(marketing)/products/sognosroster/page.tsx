import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import SognoscareRosterProblems from "@/components/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/sections/sognosroster/Features";
import SognoscareRosterProof from "@/components/sections/sognosroster/Proof";
import SognoscareRosterStories from "@/components/sections/sognosroster/Stories";
import SognoscareRosterIntegration from "@/components/sections/sognosroster/Integration";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "SognosRoster — Workforce Scheduling & Optimisation | Sognos",
  description:
    "Allocate the right people, at the right time, to the right services — automatically. Built for complex service operations.",
};

export default function SognoscareRosterPage() {
  return (
    <>
      <SognoscareRosterHero />
      <SognoscareRosterProblems />
      <SognoscareRosterFeatures />
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
