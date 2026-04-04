import Link from "next/link";

type CTASectionProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "default" | "product";
};

export default function CTASection({
  headline = "Ready to transform your service operations?",
  subtext = "See how Sognos can unify your care management and workforce scheduling — and what that means for your organisation.",
  primaryCTA = { label: "Book a Demo", href: "/contact" },
  secondaryCTA = { label: "Contact Sales", href: "/contact" },
  variant = "default",
}: CTASectionProps) {
  return (
    <section aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div>
          <h2>{headline}</h2>
          <p>{subtext}</p>
          <div>
            <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
            )}
          </div>
          {variant === "default" && (
            <aside aria-label="No commitment messaging">
              <p>
                No commitment required. Our assessments are free, confidential,
                and specific to your operations.
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
