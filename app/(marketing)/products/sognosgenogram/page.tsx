import GenogramHero from "@/components/sections/sognosgenogram/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
import GenogramProblems from "@/components/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/sections/sognosgenogram/Features";
import GenogramStories from "@/components/sections/sognosgenogram/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";

export const metadata = {
  title: "Sognos Genogram — Relationship & Family Context Platform | Sognos",
  description:
    "Map family structures, support networks, and relationship histories directly into case records. Sognos Genogram gives every worker the relational context they need.",
};

const SECTIONS = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Customer Stories", id: "stories" },
  { label: "Schedule a Call", id: "calendar" },
];

export default function SognosGenogramPage() {
  return (
    <>
      <GenogramHero />
      <ProductDrawer
        secondaryHref="#features"
        secondaryLabel="See capabilities"
        peekTitle="What Sognos Genogram Solves"
        peekDescription="Standard case management captures what happened. Sognos Genogram captures who is involved and what that means for service delivery."
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
      <ProductSubNav productName="Sognos Genogram" sections={SECTIONS} />
      <GenogramProblems />
      <GenogramFeatures />
      <GenogramStories />
      <CTASection
        headline="Ready to bring relationship context into your case records?"
        subtext="Book a call and we&apos;ll show you how Sognos Genogram fits into your existing care operations."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
