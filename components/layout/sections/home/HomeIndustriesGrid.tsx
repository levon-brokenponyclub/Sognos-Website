import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import IndustryCard from "@/components/layout/sections/industries/IndustryCard";
import { INDUSTRIES } from "@/lib/constants";
import type { IndustryStatData } from "@/components/layout/sections/industries/IndustryStat";

// Hover stats, from the HSC "Photo + stat" mockup. ILLUSTRATIVE: no source
// yet — confirm or replace with real figures before launch.
const STATS: Record<string, IndustryStatData> = {
  "health-social-care": { label: "Visits delivered on time", value: 97, suffix: "%" },
  "facilities-management": { label: "SLA response met", value: 98, suffix: "%" },
  "local-government": { label: "Cases closed on time", value: 94, suffix: "%" },
  "industrial-services": { label: "First-visit completion", value: 92, suffix: "%" },
  "energy-utilities": { label: "Inspections current", value: 100, suffix: "%" },
};

// Home · Industries — Inspector option A "Split" on Sognos tint (2026-11-02):
// label, heading and description, then the five industries as a 2 + 3 grid
// (two wide cards, three below) in the slider's card styling (IndustryCard),
// photos at 16:10, each with the HSC stat on hover. One column on phones.

export default function HomeIndustriesGrid() {
  return (
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.head}>
          <SectionLabel>Industries</SectionLabel>
          <h2 className={`${TYPE.h2} text-sognos-heading`}>
            Purpose-built for service-intensive sectors
          </h2>
          <p className={`${TYPE.lede} text-sognos-body`}>
            Sectors where coordinating people, compliance and service delivery
            is the whole operational problem.
          </p>
        </div>
        <div className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-6 lg:gap-4`}>
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard
              key={ind.slug}
              industry={ind}
              stat={STATS[ind.slug]}
              className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
              mediaClassName="aspect-[16/10]"
              sizes={i < 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
