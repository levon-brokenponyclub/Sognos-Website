import SognoscareHero from "@/components/sections/sognoscare/Hero";
import SognoscareProblems from "@/components/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/sections/sognoscare/Features";
import SognoscareEditions from "@/components/sections/sognoscare/Editions";
import SognoscareProof from "@/components/sections/sognoscare/Proof";
import SognoscareStories from "@/components/sections/sognoscare/Stories";
import SognoscareCompliance from "@/components/sections/sognoscare/Compliance";
import SognoscareIntegration from "@/components/sections/sognoscare/Integration";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "SognosCare — Care Operations & Compliance | Sognos",
  description:
    "Manage service delivery, maintain compliance, and report with confidence — all in one platform built for care providers.",
};

export default function SognosCarePage() {
  return (
    <>
      <SognoscareHero />
      <SognoscareProblems />
      <SognoscareFeatures />
      <SognoscareEditions />
      <SognoscareProof />
      <SognoscareStories />
      <SognoscareCompliance />
      <SognoscareIntegration />
      <CTASection
        headline="Ready to see SognosCare in action?"
        subtext="Book a personalised demo and see how SognosCare handles your specific service delivery, compliance, and reporting requirements."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
