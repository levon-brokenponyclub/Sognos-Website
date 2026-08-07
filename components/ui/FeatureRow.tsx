// SCAFFOLD → refined 2026-08-07 to Routable's tighter pattern
// (routable.com/product/cross-border-payments). Panel image fills edge-to-edge
// (no padding — the image IS the panel content). Text column is constrained
// to ~410px so long lines don't stretch on ultrawide. H2 sized down one step
// from the section header so it reads as a sub-item, not a section title.
//
// Day-1 supports variant="mockup" only. Server Component.
import type { ReactNode } from "react";
import Link from "next/link";

export type FeatureRowVariant = "mockup"; // extend later: "cutout" | "centered" | "checklist"

export type FeatureRowProps = {
  eyebrow?: string;
  headline: string;
  body: string;
  href: string;
  ctaLabel?: string;
  media: ReactNode;
  tint?: string;
  mediaSide?: "left" | "right";
  variant?: FeatureRowVariant;
};

export default function FeatureRow({
  eyebrow,
  headline,
  body,
  href,
  ctaLabel,
  media,
  tint = "bg-sognos-tint",
  mediaSide = "right",
  variant: _variant = "mockup",
}: FeatureRowProps) {
  const label = ctaLabel ?? `Explore ${eyebrow ?? headline}`;

  return (
    <div className="grid items-center gap-12 py-10 md:grid-cols-2 md:py-16 lg:gap-10">
      {/* Media panel — image fills edge-to-edge, no padding. Aspect locks
          panel height so text side sits centered against a consistent block. */}
      <div
        className={`relative aspect-[628/441] w-full overflow-hidden rounded ${tint} ${
          mediaSide === "left" ? "md:order-first" : "md:order-last"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {media}
        </div>
      </div>

      {/* Text side — constrained column, centered inside its grid cell */}
      <div className="flex justify-center">
        <div className="w-full max-w-[25.625rem]">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-body/70">
              {eyebrow}
            </p>
          )}
          <h3 className="font-heading text-2xl font-medium leading-tight tracking-tight text-sognos-heading md:text-3xl">
            {headline}
          </h3>
          <p className="mt-4 max-w-[22.125rem] text-base md:text-lg leading-relaxed text-sognos-body">
            {body}
          </p>
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-1.5 text-base font-medium text-sognos-blue-accent transition-opacity hover:opacity-70"
          >
            {label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
