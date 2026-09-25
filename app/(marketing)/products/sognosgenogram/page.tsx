import type { Metadata } from "next";
import GenogramHero from "@/components/sections/sognosgenogram/Hero";
import ProductDrawer from "@/components/ui/ProductDrawer";
import GenogramProblems from "@/components/sections/sognosgenogram/Problems";
import GenogramFeatures from "@/components/sections/sognosgenogram/Features";
import GenogramStories from "@/components/sections/sognosgenogram/Stories";
import CTASection from "@/components/sections/CTASection";
import ProductSubNav from "@/components/ui/ProductSubNav";
import type { SubNavSection } from "@/components/ui/ProductSubNav";
import { getGenogramPageContent } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGenogramPageContent();
  return {
    title: data?.seo.title ?? "SognosGenogram - Relationship & Family Context Platform | Sognos",
    description: data?.seo.description ?? "Map family structures, support networks, and relationship histories directly into case records. SognosGenogram gives every worker the relational context they need.",
  };
}

const DEFAULT_SECTIONS: SubNavSection[] = [
  { label: "What it solves", id: "problems" },
  { label: "Features", id: "features" },
  { label: "Customer Stories", id: "stories" },
  { label: "Download Datasheet", id: "datasheet", href: "/datasheets/SognosGenogram-datasheet.pdf", download: true },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

function buildSections(
  subNav: { label: string; id: string; href?: string }[],
  datasheetUrl?: string,
): SubNavSection[] {
  return subNav.map((item) => {
    if (item.id === "datasheet") {
      return { ...item, href: datasheetUrl ?? item.href ?? "/datasheets/SognosGenogram-datasheet.pdf", download: true };
    }
    return item;
  });
}

export default async function SognosGenogramPage() {
  const data = await getGenogramPageContent();

  const sections =
    data && data.subNav.length > 0
      ? buildSections(data.subNav, data.datasheetUrl)
      : DEFAULT_SECTIONS;

  return (
    <>
      <GenogramHero
        headline={data?.hero.headline}
        subtext={data?.hero.subtext}
        logoSrc={data?.hero.logoSrc}
      />
      <ProductDrawer
        secondaryLabel="Other Products"
        currentProduct="sognosgenogram"
        peekTitle={data?.productDrawer.peekTitle ?? "What SognosGenogram Solves"}
        peekDescription={data?.productDrawer.peekDescription ?? "Standard case management captures what happened. SognosGenogram captures who is involved and what that means for service delivery."}
        drawerTitle={data?.productDrawer.drawerTitle ?? "Other Products"}
        drawerDescription={data?.productDrawer.drawerDescription ?? "Explore the full Sognos platform."}
      />
      <ProductSubNav
        productName="SognosGenogram"
        logoSrc="/logos/sognos-genogram-logo-color.svg"
        sections={sections}
      />
      <GenogramProblems
        header={data?.problemsHeader}
        problems={data?.problems}
      />
      <GenogramFeatures
        header={data?.featuresHeader}
        features={data?.features}
      />
      <GenogramStories stories={data?.featuredStories} />
      <CTASection
        headline={data?.cta.headline ?? "Ready to bring relationship context into your case records?"}
        subtext={data?.cta.subtext ?? "Book a call and we'll show you how SognosGenogram fits into your existing care operations."}
        primaryCTA={data?.cta.primaryCTA ?? { label: "Book a Demo", href: "/contact" }}
        secondaryCTA={data?.cta.secondaryCTA ?? { label: "Contact Sales", href: "/contact" }}
        defaultProduct="sognosgenogram"
      />
    </>
  );
}
