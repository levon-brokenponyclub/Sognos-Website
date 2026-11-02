import ProductHero, {
  type HeroTrustLogo,
} from "@/components/layout/sections/product/ProductHero";

export default function GenogramHero({
  trustLogos = [],
}: { trustLogos?: HeroTrustLogo[] } = {}) {
  return (
    <ProductHero
      product="genogram"
      logoSrc="/logos/SognosGenogram-logo.svg"
      headline="Family context. Built into every record."
      subtext="Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care."
      photoSrc="/product/GenoBg.avif"
      tagline="Relationship & family context platform"
      trustLogos={trustLogos}
    />
  );
}
