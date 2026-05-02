import SognoscareHero from "@/components/sections/sognoscare/Hero";
import SognoscareProblems from "@/components/sections/sognoscare/Problems";
import SognoscareFeatures from "@/components/sections/sognoscare/Features";
import SognoscareEditions from "@/components/sections/sognoscare/Editions";
import SognoscareAdvantages from "@/components/sections/sognoscare/Advantages";
import SognoscareStories from "@/components/sections/sognoscare/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "SognosCare — Care Operations & Compliance | Sognos",
  description:
    "Manage service delivery, maintain compliance, and report with confidence — all in one platform built for care providers.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Editions", id: "editions" },
  { label: "Key Advantages", id: "advantages" },
  { label: "Customer Stories", id: "stories" },
  { label: "Schedule a Call", id: "calendar" },
];

export default function SognosCarePage() {
  return (
    <>
      <SognoscareHero />
      <ProductSubNav productName="SognosCare" sections={SECTIONS} />
      <SognoscareProblems />
      <SognoscareFeatures />
      <SognoscareEditions />
      <SognoscareAdvantages />
      <SognoscareStories />
      <CTASection
        headline="Ready to see SognosCare in action?"
        subtext="Book a personalised demo and see how SognosCare handles your specific service delivery, compliance, and reporting requirements."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
