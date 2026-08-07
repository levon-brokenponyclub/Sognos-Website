// SCAFFOLD (2026-08-07 rebuild) — direct copy of Routable's "Payment
// Operations Worldwide" global-payouts section (routable.com/lp mass-payouts
// page). Sticky gutter label left + image/text row pairs. No alternation —
// image always left, text right.
//
// Hardcoded values from the reference (tokenize in Refine):
// - Section padding: pt-14 md:pt-28 pb-0 (reference has lg:pt-164 — custom
//   scale value on their build, ~41rem; omitted, md:pt-28 kept as top step)
// - Container spacing: space-y-[3.875rem] md:space-y-16 lg:space-y-32
// - Header block max-width: 39.25rem (inline style)
// - Row: flex-col lg:flex-row, gap-4 md:gap-6 lg:gap-8, pb-12 md:pb-24
//   (last:pb-0)
// - Sticky label: lg:sticky lg:top-24 lg:w-48, text-base font-normal,
//   lg:-translate-x-2
// - Row content grid: sm:grid-cols-2 gap-6, sm:max-w-[66.25rem], xl:pr-8
// - Row image: rounded bg-transparent, native 1554×1320
// - Row text col: justify-self-end sm:max-w-[23.625rem]
// - Row inner spacing: space-y-4 lg:space-y-6 (h3→body→link)
// - Row H3: reference text-h3 lg:text-h5 — mapped to closest system step
//   text-2xl md:text-3xl (visual match; reference h5 ≈ 28-30px)
// - Body: text-base, opacity-80
// - Link: text-base dark, arrow translate-x-1 on hover
//
// Row headline italics (Routable italicizes one word per H2) skipped in
// scaffold — Refine decision per headline.
import Image from "next/image";
import Link from "next/link";

type SolutionRow = {
  id: string;
  label: string; // sticky gutter label
  href: string;
  headline: string;
  body: string;
  image: string;
};

// First 4 solutions only (2026-08-07 call). Remaining 3 (Customer Service,
// Power Platform, Quick Start) surface elsewhere / later.
const SOLUTIONS: SolutionRow[] = [
  {
    id: "frontline",
    label: "Frontline",
    href: "/solutions/frontline",
    headline: "End-to-end field service management",
    body: "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office.",
    image: "/dev/Instant-Payouts-Visual-Static.avif",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    headline: "A complete client relationship record",
    body: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    image: "/dev/International-Payouts-Visual-Static.avif",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    headline: "Turn service data into operational intelligence",
    body: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    image: "/dev/Domestic-Payouts-Visual-Static.avif",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    headline: "Consistent service quality at every touchpoint",
    body: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    image: "/dev/Instant-Payouts-Visual-Static.avif",
  },
];

function ExploreLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-block">
      <div className="group inline-flex items-center gap-x-2 text-base text-sognos-heading">
        <div>{label}</div>
        <div className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </div>
      </div>
    </Link>
  );
}

export default function SolutionsSection({
  heading = "Solutions that extend the platform",
  description = "Supporting engagements that extend SognosCare and SognosRoster — from field service and CRM through to Power Platform and rapid deployment.",
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section
      id="solutions"
      className="overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl space-y-[3.875rem] px-6 md:space-y-16 lg:space-y-32">
        {/* Header — H2 + body + section-level explore link, centered. Block
            capped at 39.25rem per reference. */}
        <div className="flex w-full flex-col items-center">
          <div
            className="flex flex-col items-center space-y-3 text-center md:space-y-6"
            style={{ maxWidth: "39.25rem" }}
          >
            <h2 className="relative z-10 w-full font-heading text-4xl font-medium tracking-tight leading-tight text-sognos-heading text-balance md:text-5xl">
              {heading}
            </h2>
            <div className="w-full opacity-80">
              <p className="text-base leading-relaxed text-sognos-body">
                {description}
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="-mb-4 inline-flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="pb-2 md:pb-4">
                  <ExploreLink href="/solutions" label="Explore all Solutions" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked rows — sticky gutter label left, image + text grid right */}
        <div>
          {SOLUTIONS.map((s) => (
            <div
              key={s.id}
              className="relative flex flex-col items-start justify-between gap-4 pb-12 last:pb-0 md:gap-6 md:pb-24 lg:flex-row lg:gap-8"
            >
              {/* Sticky gutter label */}
              <div className="z-10 shrink-0 lg:sticky lg:top-24 lg:w-48">
                <div className="relative z-10 flex items-center gap-x-2 lg:-translate-x-2">
                  <div className="text-base font-normal text-sognos-heading">
                    {s.label}
                  </div>
                </div>
              </div>

              {/* Image + text pair */}
              <div className="grid flex-1 items-center gap-6 sm:max-w-[66.25rem] sm:grid-cols-2 xl:pr-8">
                <div className="relative overflow-hidden rounded bg-transparent">
                  <div className="relative z-10 w-full">
                    <Image
                      src={s.image}
                      alt=""
                      width={1554}
                      height={1320}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="w-full justify-self-end sm:max-w-[23.625rem]">
                  <div className="space-y-5 lg:space-y-9">
                    <div className="space-y-4 lg:space-y-6">
                      <h3 className="relative z-10 font-heading text-2xl font-medium tracking-tight leading-tight text-sognos-heading md:text-3xl">
                        {s.headline}
                      </h3>
                      <div className="text-base leading-relaxed text-sognos-body opacity-80 max-sm:!mt-3">
                        {s.body}
                      </div>
                      <div className="flex flex-col gap-4 max-lg:!mt-5 lg:flex-row lg:items-center lg:gap-7">
                        <ExploreLink href={s.href} label={`Explore ${s.label}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
