import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

const STATS = [
  { value: "10,000+", label: "hours saved annually" },
  { value: "20,000+", label: "referrals & applications processed each year" },
  { value: "Up to 85%", label: "reduction in manual processing time" },
  {
    value: "4,500",
    label: "staff supported at Berkshire Healthcare NHS Foundation Trust",
  },
];

// Products Inspector · Problem A (stats form), product tone: statement, then
// four ruled stats on the DigPacks base. Text stays full white for AA.
export default function DigPacksOutcomes() {
  return (
    <section
      id="outcomes"
      className={`bg-sognos-digpacks-base text-white ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <SectionLabel tone="dark" markerClassName="bg-white" className="text-white">
            Real outcomes in the UK
          </SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>
            Start faster, adapt easily and integrate with what you already have
            through DigPacks accelerator solutions.
          </h2>
          <p className={`${TYPE.lede} text-white`}>
            Outcomes achieved by DigPacks across NHS and public-sector
            engagements.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value} className="border-t-2 border-white pt-5">
              <p className="font-heading text-4xl text-white md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-white">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
