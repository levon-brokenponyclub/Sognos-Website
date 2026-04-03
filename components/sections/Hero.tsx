import Link from "next/link";

type HeroProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
};

export default function Hero({
  headline = "Run your entire service operation on one intelligent platform.",
  subtext = "Sognos combines care management and workforce scheduling on Microsoft Dynamics 365 — giving you complete visibility and control across every service you deliver.",
  primaryCTA = { label: "Book Free Assessment", href: "/contact" },
  secondaryCTA = { label: "Explore Platform", href: "/platform" },
}: HeroProps) {
  return (
    <section aria-label="Hero">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-4xl">
          <h1>{headline}</h1>
          <p>{subtext}</p>
          <div>
            <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
          </div>
        </div>
        {/* Visual slot — reserved for product UI mockup (Phase 5) */}
        <div aria-hidden="true" />
      </div>
    </section>
  );
}
