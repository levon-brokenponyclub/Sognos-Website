import ProductHero, {
  type HeroTrustLogo,
} from "@/components/layout/sections/product/ProductHero";

export type { HeroTrustLogo };

interface SognoscareHeroProps {
  logoSrc?: string;
  headline?: string;
  subtext?: string;
  /** Resolved server-side from the product trust-logo set. */
  trustLogos?: HeroTrustLogo[];
}

const DEFAULTS = {
  logoSrc: "/logos/sognos-care-logo.svg",
  headline: "One platform. From intake to outcome",
  subtext:
    "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
};

export default function SognoscareHero({
  logoSrc = DEFAULTS.logoSrc,
  headline = DEFAULTS.headline,
  subtext = DEFAULTS.subtext,
  trustLogos = [],
}: SognoscareHeroProps = {}) {
  return (
    <ProductHero
      product="care"
      logoSrc={logoSrc}
      headline={headline}
      subtext={subtext}
      photoSrc="/product/sognos-care-hero-img.png"
      video={{
        mp4: "/videos/sognoscare-hero.mp4",
        webm: "/videos/sognoscare-hero.webm",
        poster: "/videos/sognoscare-hero-poster.jpg",
      }}
      tagline="Care operations & compliance platform"
      trustLogos={trustLogos}
    />
  );
}
