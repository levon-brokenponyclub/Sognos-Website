import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
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
      <ProductDrawer
        secondaryHref="#features"
        secondaryLabel="See capabilities"
        peekTitle="What SognosRoster Solves"
        peekDescription="Manual rostering can't keep up with shifting demand, complex skill matching, and last-minute changes."
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
