import Link from "next/link";

type CTASectionProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
};

export default function CTASection({
  headline = "Ready to transform your service operations?",
  subtext = "See how Sognos can unify your care management and workforce scheduling — and what that means for your organisation.",
  primaryCTA = { label: "Book a Demo", href: "/contact" },
  secondaryCTA = { label: "Contact Sales", href: "/contact" },
}: CTASectionProps) {
  return (
    <section className="w-full">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        <div className="rounded-2xl border border-sognos-border-subtle bg-neutral-900 px-10 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Get started
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-heading font-medium tracking-tight text-white">
            {headline}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
            {subtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>

          <p className="mt-5 text-xs text-neutral-600">
            No commitment required. Our assessments are free, confidential, and
            specific to your operations.
          </p>
        </div>
      </div>
    </section>
  );
}
