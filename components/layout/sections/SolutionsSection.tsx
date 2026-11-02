// Home · Solutions — Inspector option D "Graphic cards (Frontline)"
// (2026-11-02): header with the "Explore all Solutions" link, then the first
// four solutions as bordered white cards on white (How Sognos Works above is
// tint), each with its motion
// graphic (home/SolutionVisuals.tsx) above the name, body and Explore.
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import SolutionVisual, {
  SolutionsBackgroundProvider,
} from "@/components/layout/sections/home/SolutionVisuals";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

type SolutionRow = {
  id: string;
  label: string; // sticky gutter label
  href: string;
  headline: string;
  body: string;
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
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    headline: "A complete client relationship record",
    body: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    headline: "Turn service data into operational intelligence",
    body: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    headline: "Consistent service quality at every touchpoint",
    body: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
  },
];

export default function SolutionsSection({
  heading = "Solutions that extend the platform",
  description = "Supporting engagements that extend SognosCare and SognosRoster — from field service and CRM through to Power Platform and rapid deployment.",
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section id="solutions" className={`bg-white ${LAYOUT.section}`}>
      <SolutionsBackgroundProvider>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionLabel>Solutions</SectionLabel>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>{heading}</h2>
              <p className={`${TYPE.lede} text-sognos-body`}>{description}</p>
            </div>
            <Link
              href="/solutions"
              className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-sognos-line bg-white px-5 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
            >
              Explore all Solutions
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {SOLUTIONS.map((s, i) => (
              <Link
                key={s.id}
                href={s.href}
                className="group flex flex-col gap-5 rounded-lg border border-sognos-line bg-white p-3 transition-colors hover:border-sognos-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
              >
                {/* Panel: the motion graphic at 90% in a 224px frame. */}
                <div className="overflow-hidden rounded [&>div]:aspect-auto [&>div]:h-56 [&>div]:p-5 [&>div>div]:scale-90">
                  <SolutionVisual id={s.id} index={i} />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3">
                  <h3 className={`${TYPE.h3Small} text-sognos-heading`}>{s.label}</h3>
                  <p className={`mt-2 line-clamp-3 ${TYPE.small} text-sognos-body`}>{s.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-sognos-heading group-hover:text-sognos-blue-accent">
                    Explore
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SolutionsBackgroundProvider>
    </section>
  );
}
