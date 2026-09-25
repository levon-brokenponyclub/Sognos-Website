import type { Metadata } from "next";
import SognoscareRosterHero from "@/components/sections/sognosroster/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
import SognoscareRosterProblems from "@/components/sections/sognosroster/Problems";
import SognoscareRosterFeatures from "@/components/sections/sognosroster/Features";
import SognoscareRosterAdvantages from "@/components/sections/sognosroster/Advantages";
import SognoscareRosterStories from "@/components/sections/sognosroster/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";
import type { SubNavSection } from "@/components/ui/ProductSubNav";
import { getSognosrosterPageContent } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSognosrosterPageContent();
  return {
    title: data?.seo.title ?? "SognosRoster - Workforce Scheduling & Optimisation | Sognos",
    description: data?.seo.description ?? "Allocate the right people, at the right time, to the right services - automatically. Built for complex service operations.",
  };
}

const DEFAULT_SECTIONS: SubNavSection[] = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Key Advantages", id: "advantages" },
  { label: "Customer Stories", id: "stories" },
  { label: "Download Datasheet", id: "datasheet", href: "/datasheets/SognosRoster-datasheet.pdf", download: true },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

function buildSections(
  subNav: { label: string; id: string; href?: string }[],
  datasheetUrl?: string,
): SubNavSection[] {
  return subNav.map((item) => {
    if (item.id === "datasheet") {
      return { ...item, href: datasheetUrl ?? item.href, download: true };
    }
    return item;
  });
}

export default async function SognoscareRosterPage() {
  const data = await getSognosrosterPageContent();

  const sections =
    data && data.subNav.length > 0
      ? buildSections(data.subNav, data.datasheetUrl)
      : DEFAULT_SECTIONS;

  return (
    <>
      <SognoscareRosterHero
        headline={data?.hero.headline}
        subtext={data?.hero.subtext}
        logoSrc={data?.hero.logoSrc}
      />
      <ProductDrawer
        secondaryLabel="Other Products"
        currentProduct="sognosroster"
        peekTitle={data?.productDrawer.peekTitle ?? "What SognosRoster Solves"}
        peekDescription={data?.productDrawer.peekDescription ?? "Manual rostering can't keep up with shifting demand, complex skill matching, and last-minute changes."}
        drawerTitle={data?.productDrawer.drawerTitle ?? "Other Products"}
        drawerDescription={data?.productDrawer.drawerDescription ?? "Explore the full Sognos platform."}
      />
      <ProductSubNav
        productName="SognosRoster"
        logoSrc="/logos/sognos-roster-logo-color.svg"
        sections={sections}
      />
      <SognoscareRosterProblems
        header={data?.problemsHeader}
        problems={data?.problems}
      />
      <SognoscareRosterFeatures
        header={data?.featuresHeader}
        features={data?.features}
      />
      <SognoscareRosterAdvantages
        advantages={data?.advantages}
      />
      <SognoscareRosterStories
        stories={data?.featuredStories}
      />
      <CTASection
        headline={data?.cta.headline ?? "Ready to automate your workforce scheduling?"}
        subtext={data?.cta.subtext ?? "Book a personalised demo and see how SognosRoster handles your specific scheduling volume, skills requirements, and real-time operational demands."}
        primaryCTA={data?.cta.primaryCTA ?? { label: "Book a Demo", href: "/contact" }}
        secondaryCTA={data?.cta.secondaryCTA ?? { label: "Contact Sales", href: "/contact" }}
        defaultProduct="sognosroster"
      />
    </>
  );
}
