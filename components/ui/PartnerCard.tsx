// Extracted from AboutPartnersSlider.tsx (2026-08-07) so ProductsSection
// can reuse the exact same card without duplicating markup. Two-layer
// crossfade: resting shows type/tagline top + logo bottom-left; hover lifts
// the logo up and fades a description in beneath it. Persistent pill sits
// bottom-right anchored, label swaps on hover.
import Image from "next/image";
import Link from "next/link";

export type PartnerCardData = {
  name: string;         // for aria-label
  logo: string;
  type: string;         // resting-state headline (tagline for products, "type" for partners)
  href: string;
  description: string;  // hover-state body
};

type Props = {
  partner: PartnerCardData;
  /** External partner sites open in a new tab; internal product/solution
   *  pages don't. Defaults to internal. */
  external?: boolean;
  /** Label pair for the bottom-right pill. Defaults to Learn more → Visit Website
   *  which matches the About-page partners usage. */
  pillLabels?: { resting: string; hover: string };
};

function IconArrowUpRight() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function PartnerCard({
  partner,
  external = false,
  pillLabels = { resting: "Learn more", hover: "Visit Website" },
}: Props) {
  const commonClasses =
    "group relative flex min-h-[160px] shrink-0 snap-start basis-full flex-col overflow-hidden rounded border border-sognos-line bg-sognos-tint p-5 transition-colors duration-300 hover:border-sognos-blue-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sognos-blue-accent sm:basis-[calc((100%-12px)/2)] md:min-h-[244px] lg:basis-[calc((100%-32px)/3)] lg:p-7";

  const inner = (
    <>
      {/* Resting layer — type on top, logo bottom-left. Fades out on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col p-5 transition-opacity duration-300 group-hover:opacity-0 motion-reduce:transition-none lg:p-7"
      >
        <h3 className="max-w-[220px] font-heading text-lg font-medium leading-snug tracking-tight text-sognos-heading">
          {partner.type}
        </h3>
        <span className="mt-auto flex h-11 max-w-[55%] items-center">
          <Image
            src={partner.logo}
            alt=""
            width={160}
            height={44}
            className="h-auto max-h-11 w-auto max-w-full object-contain"
          />
        </span>
      </span>

      {/* Hover layer — logo lifts to the top-left, description fades in. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none lg:p-7"
      >
        <span className="flex h-11 max-w-[55%] items-center">
          <Image
            src={partner.logo}
            alt=""
            width={160}
            height={44}
            className="h-auto max-h-11 w-auto max-w-full object-contain"
          />
        </span>
        <p className="mt-4 pr-4 text-sm leading-snug text-sognos-body line-clamp-4">
          {partner.description}
        </p>
      </span>

      {/* Persistent pill — label swaps on hover. Anchored bottom-right so
          width change extends leftward without shifting anything. */}
      <span className="pointer-events-none absolute bottom-5 right-5 flex shrink-0 items-center gap-x-1 whitespace-nowrap rounded border border-sognos-line bg-white px-2 py-0.5 text-xs font-medium text-sognos-body transition-colors duration-300 group-hover:border-sognos-blue-accent group-hover:bg-sognos-blue-accent group-hover:text-white lg:bottom-7 lg:right-7">
        <span className="group-hover:hidden">{pillLabels.resting}</span>
        <span className="hidden group-hover:inline">{pillLabels.hover}</span>
        <span
          aria-hidden="true"
          className="inline-flex w-0 shrink-0 overflow-hidden transition-[width] duration-200 ease-out group-hover:w-3.5"
        >
          <IconArrowUpRight />
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        data-card
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className={commonClasses}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link data-card href={partner.href} aria-label={partner.name} className={commonClasses}>
      {inner}
    </Link>
  );
}
