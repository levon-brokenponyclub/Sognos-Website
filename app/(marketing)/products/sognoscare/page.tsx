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
  { label: "Schedule a Call", id: "calendar" },
];

export default function SognosCarePage() {
  return (
    <>
      <SognoscareHero />
      <ProductDrawer
        secondaryHref="#editions"
        secondaryLabel="Explore editions"
        peekTitle="What SognosCare Solves"
        peekDescription="Manage cases, track service delivery, meet compliance obligations, and report with confidence — end-to-end."
        drawerTitle="Expanded Content"
        drawerDescription="Tap the handle to see this section"
      >
        <div className="space-y-6">
          <div className="p-6 bg-gray-200/70 rounded-lg">
            <h4 className="font-heading text-lg font-medium text-prussian-blue-800 mb-3">Placeholder Drawer Content</h4>
            <p className="text-sm text-sognos-text-body mb-4">
              This is the expanded state of the ProductDrawer. Replace this with actual content from the product page.
            </p>
            <ul className="space-y-2 text-sm text-sognos-text-body">
              <li>• Key feature 1</li>
              <li>• Key feature 2</li>
              <li>• Key feature 3</li>
            </ul>
          </div>
        </div>
      </ProductDrawer>
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
