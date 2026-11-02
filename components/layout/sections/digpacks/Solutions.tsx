import DigPacksFeatureVisual, {
  DigPacksVisualsProvider,
} from "@/components/layout/sections/digpacks/FeatureVisuals";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: "risk-management",
    name: "Risk Management",
    tagline: "Move from fragmented registers to visible, accountable action",
    description:
      "Bring assessments, actions, evidence, approvals, reminders and reporting into one configurable workflow. The solution can help organisations apply more consistent assessment processes, assign ownership clearly, retain supporting evidence, identify overdue reviews and improve visibility across services, sites and teams.",
  },
  {
    id: "safety-lens",
    name: "Safety Lens",
    tagline: "A clearer starting point for environmental risk assessment",
    description:
      "Safety Lens, part of Ligature Risk Management app, uses an app-integrated Copilot to analyse photographs of rooms or service environments and prepare a structured draft environmental risk assessment. It may be relevant to hospital-in-the-home, residential aged care, Supported Independent Living, mental health, disability and community service environments. It supports trained staff and does not replace professional judgement, consent, privacy controls or accountable approval.",
  },
  {
    id: "people-hr",
    name: "People & HR Management",
    tagline: "Give employees one clearer way to access routine people services",
    description:
      "Selected DigPacks people and HR workflows can support personal information changes, leave and flexible-working requests, onboarding processes, structured approvals, audit history and guided employee self-service. Sognos is assessing which capabilities can be localised without dependence on NHS-specific systems and how they can complement established HR, payroll and workforce platforms.",
  },
  {
    id: "vaccination-hub",
    name: "Vaccination Hub",
    tagline: "Bring bookings, records and reporting into one workflow",
    description:
      "Vaccination Hub supports clinic and appointment management, employee self-service booking, real-time availability, recording of vaccinations received externally, secure records and program reporting. Any local implementation would need to reflect Australian or New Zealand immunisation, privacy, record-keeping and reporting requirements.",
  },
  {
    id: "privacy-impact-assessment",
    name: "Privacy Impact Assessment",
    tagline: "Make privacy by design a visible, auditable process",
    description:
      "Sognos and DigPacks are adapting the UK privacy-assessment capability into a Privacy Impact Assessment workflow for Australia and New Zealand. It can support structured assessment questions, clear review stages, privacy-risk and mitigation records, approvals, reminders, audit history and an AI agent that guides users through the process. Responsibility for privacy decisions remains with authorised people.",
  },
  {
    id: "it-service-management",
    name: "IT Service Management",
    tagline: "Reduce repeated support work without reducing access to support",
    description:
      "The IT Service Management capability and FixIT Agent can provide one place to raise and track requests, clearer categorisation and ownership, access to approved support information, guided self-service, AI-assisted responses and escalation when human support is required. The objective is to reduce simple repeatable work so IT teams can focus on complex support, cybersecurity and service continuity.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

// Products Inspector · Features B "Bento", product-tint tone: the first
// solution spans 2×2, the rest fill a 3-column grid of 23rem rows. Visuals
// are the DigPacks motion graphics (Inspector "Motion graphic" panels).
export default function DigPacksSolutions() {
  return (
    <DigPacksVisualsProvider>
      <section
        id="features"
        className={`bg-sognos-digpacks-soft ${LAYOUT.section} ${LAYOUT.anchor}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex max-w-3xl flex-col gap-4">
            <SectionLabel markerClassName="bg-sognos-digpacks-base">Solutions</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>
              Solutions for today’s operational pressure
            </h2>
          </div>

          {/* Rows size to the tiles; the lead tile spans two rows and its
              panel grows to fill them. Panels are tall enough that no
              graphic is cropped. */}
          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {SOLUTIONS.map((s, i) => {
              const big = i === 0;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className={`flex scroll-mt-36 flex-col gap-5 overflow-hidden rounded border border-sognos-line bg-white p-3 ${
                    big ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative h-[480px] shrink-0 overflow-hidden rounded sm:h-[420px] ${
                      big ? "lg:h-auto lg:min-h-[360px] lg:flex-1" : "lg:h-[360px]"
                    }`}
                  >
                    {/* The lead graphic scales up to fill its taller panel. */}
                    <div className={`absolute inset-0 ${big ? "lg:scale-[1.4]" : ""}`}>
                      <DigPacksFeatureVisual id={s.id} index={i} />
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 px-3 pb-3">
                    <p className="text-sm font-medium text-sognos-digpacks-ink">{s.tagline}</p>
                    <h3 className={`${big ? TYPE.h3 : TYPE.h3Small} text-sognos-heading`}>
                      {s.name}
                    </h3>
                    <p className={`${big ? "max-w-[60ch]" : "line-clamp-3"} ${TYPE.small} text-sognos-body`}>
                      {s.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </DigPacksVisualsProvider>
  );
}
