import DigPacksHero from "@/components/layout/sections/digpacks/Hero";
import DigPacksPartnership from "@/components/layout/sections/digpacks/Partnership";
import DigPacksOutcomes from "@/components/layout/sections/digpacks/Outcomes";
import DigPacksSolutions from "@/components/layout/sections/digpacks/Solutions";
import DigPacksWhy from "@/components/layout/sections/digpacks/Why";
import DigPacksAssetBooker from "@/components/layout/sections/digpacks/AssetBooker";
import ProductSubNav from "@/components/ui/ProductSubNav";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title:
    "DigPacks × Sognos - Proven in UK Healthcare, Shaped for Australia and New Zealand | Sognos",
  description:
    "Sognos is partnering with DigPacks to bring Microsoft-based applications, automation and AI capabilities from the NHS and public sector to health, social and community care organisations across Australia and New Zealand.",
};

const SECTIONS = [
  { label: "Outcomes", id: "outcomes" },
  { label: "Solutions", id: "features" },
  { label: "Why DigPacks", id: "why" },
  { label: "Asset Booker", id: "asset-booker" },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default function DigPacksPage() {
  return (
    <>
      <DigPacksHero />
      <ScrollReveal>
        <DigPacksPartnership />
      </ScrollReveal>
      <div className="bg-sognos-digpacks-dark flex justify-center px-6 pt-20 pb-16 md:pt-28">
        <ProductSubNav productName="DigPacks" sections={SECTIONS} />
      </div>
      <ScrollReveal>
        <DigPacksOutcomes />
      </ScrollReveal>
      <ScrollReveal>
        <DigPacksSolutions />
      </ScrollReveal>
      <ScrollReveal>
        <DigPacksWhy />
      </ScrollReveal>
      <ScrollReveal>
        <DigPacksAssetBooker />
      </ScrollReveal>
    </>
  );
}
