import DigPacksHero from "@/components/layout/sections/digpacks/Hero";
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
  {
    label: "Download",
    id: "download",
    href: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=dIv2xQ42w0yPgwCF_6izmX_i53x-rohEmvUHAV32Ee5UNEZXVEpVQVZLWkVaUTJCSk5GMTg1Q1pESy4u&route=shorturl",
    external: true,
  },
  { label: "Schedule a Call", id: "calendar", href: "/contact" },
];

export default function DigPacksPage() {
  return (
    <>
      <DigPacksHero />
      {/* Sub-nav — white, pins under the navbar after the hero. */}
      <ProductSubNav
        productName="DigPacks"
        sections={SECTIONS}
        variant="sticky"
        logoSrc="/images/digpacks/digpacks-logo-full.webp"
        markClass="decoration-sognos-digpacks-base"
      />
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
