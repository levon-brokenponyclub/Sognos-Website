import Link from "next/link";
import { ClipboardText, UsersThree, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

// Cohere Home slot: "Safe. Flexible. Independent." — 3-block grid.
// Sognos content; same three-column layout structure.
const BLOCKS = [
  {
    Icon: ClipboardText,
    title: "Manage demand",
    copy: "SognosCare captures every referral, care plan and service request — triaged, assigned and compliance-tracked from day one.",
    href: "/products/sognoscare",
  },
  {
    Icon: UsersThree,
    title: "Coordinate workforce",
    copy: "SognosRoster matches the right worker to every job in real time — factoring skills, location, availability and compliance.",
    href: "/products/sognosroster",
  },
  {
    Icon: ChartLineUp,
    title: "Track outcomes",
    copy: "Live dashboards surface utilisation, compliance and costs across every service, site and workforce team.",
    href: "/solutions/customer-insights",
  },
] as const;

export default function HowSognosWorks() {
  return (
    <section className="w-full bg-background py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-normal tracking-tight text-sognos-heading md:text-4xl">
          Demand. Workforce. Outcomes.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
          {BLOCKS.map(({ Icon, title, copy, href }) => (
            <div key={title} className="flex flex-col">
              <Icon size={40} weight="thin" className="text-sognos-heading" />
              <h3 className="mt-5 font-heading text-2xl font-normal tracking-tight text-sognos-heading">
                {title}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-sognos-body">
                {copy}
              </p>
              <Link
                href={href}
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-sognos-heading transition-opacity hover:opacity-70"
              >
                Learn more
                <svg className="size-3" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                  <path
                    d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
