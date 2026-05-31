import SognoscareHero from "@/components/sections/sognoscare/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
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
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default function SognosCarePage() {
  return (
    <>
      <SognoscareHero />
      <ProductDrawer
        secondaryLabel="Other Products"
        currentProduct="sognoscare"
        peekTitle="What SognosCare Solves"
        peekDescription="Manage cases, track service delivery, meet compliance obligations, and report with confidence — end-to-end."
        drawerTitle="Other Products"
        drawerDescription="Explore the full Sognos platform."
      />
      <ProductSubNav
        productName="SognosCare"
        logoSrc="/logos/sognos-care-logo-color.svg"
        sections={SECTIONS}
      />
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
        defaultProduct="sognoscare"
      />
    </>
  );
}
