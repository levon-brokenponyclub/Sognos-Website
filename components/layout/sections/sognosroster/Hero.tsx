import ProductHero, {
  type HeroTrustLogo,
} from "@/components/layout/sections/product/ProductHero";

export default function SognosRosterHero({
  trustLogos = [],
}: { trustLogos?: HeroTrustLogo[] } = {}) {
  return (
    <ProductHero
      product="roster"
      logoSrc="/logos/sognos-roster-logo.svg"
      headline="The right worker - for every job"
      subtext="Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team."
      photoSrc="/product/RosterBg.avif"
      tagline="Workforce scheduling & optimisation engine"
      trustLogos={trustLogos}
    />
  );
}
