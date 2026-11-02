import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Experience — Finance & Operations only (2026-11-02): the Problem section's
// sticky-rail layout and sizing (`SolutionProblem`) on the brand accent.
// Heading, intro and outro hold in a sticky column (5) beside numbered
// customer rows (7); the long "Dynamics 365 Finance & Operations" chip sits
// under the name, as Problem's chip does for long solution names.
//
// Text is full white: white on the accent is ~3:1, so no alpha on top.

export default function SolutionExperience({
  name,
  intro,
  customers,
  outro,
}: {
  name: string;
  intro: string;
  customers: readonly string[];
  outro: string;
}) {
  return (
    <section className={`bg-sognos-blue-accent ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 lg:sticky lg:top-36">
              <SectionLabel className="text-white" markerClassName="bg-white">
                Experience
              </SectionLabel>
              <h2 className={`${TYPE.h2} text-white`}>
                {name} delivery in complex organisations
              </h2>
              <p className={`${TYPE.lede} text-white`}>{intro}</p>
              <p className={`${TYPE.lede} text-white`}>{outro}</p>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {customers.map((customer, i) => (
              <li
                key={customer}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-white/30 py-10 last:border-b sm:grid-cols-[4rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-5xl font-light tabular-nums text-white/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`${TYPE.h3} text-white`}>{customer}</h3>
                <span className="col-start-2 inline-flex h-8 items-center gap-1.5 self-start justify-self-start rounded-full bg-white px-4 text-xs font-medium whitespace-nowrap text-sognos-heading">
                  &#10003; Dynamics 365 Finance &amp; Operations
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
