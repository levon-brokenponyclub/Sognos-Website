import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Products Inspector · Why B "Immersive", deep tone: three panels — the
// reasons, who should start the conversation, and the localisation list on
// the DigPacks gradient.
const WHY = [
  "NHS and healthcare experience you can build on",
  "Solutions built on Microsoft Power Platform, with Copilot and AI",
  "Localisation for Australian and New Zealand regulation, workflows and privacy",
  "Integration with your existing Microsoft and third-party systems",
  "Adoption, training and ongoing improvement",
];

const LISTS = [
  {
    heading: "Who should start the conversation?",
    intro: null,
    items: [
      "Health services & hospitals",
      "Aged care & support at home",
      "Disability & community services",
      "Mental health & wellbeing teams",
      "Government & not-for-profits",
      "IT, Digital, Risk, Quality, People leaders",
    ],
  },
  {
    heading: "Localisation is more than changing terminology.",
    intro: "We work with you to ensure each solution is configured for:",
    items: [
      "Australian & NZ regulatory requirements",
      "Privacy, security & governance",
      "Hosting & data residency",
      "Integration with your systems",
      "Roles, approvals & escalation",
      "Adoption & measurable outcomes",
    ],
  },
];

function Tick({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
        inverse ? "bg-white text-sognos-digpacks-base" : "bg-sognos-digpacks-base text-white"
      }`}
    >
      &#10003;
    </span>
  );
}

const PANEL = "rounded border border-white/20 bg-white/5 p-6 lg:p-8";
const [WHO, LOCAL] = LISTS;

export default function DigPacksWhy() {
  return (
    <section
      id="why"
      className={`bg-sognos-digpacks-deep text-white ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <SectionLabel tone="dark" markerClassName="bg-sognos-digpacks-base">
            Why DigPacks
          </SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>Why DigPacks and Sognos?</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
          <ul className={`space-y-4 text-base ${PANEL}`}>
            {WHY.map((reason) => (
              <li key={reason} className="flex gap-3 text-white">
                <Tick />
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <div className={PANEL}>
            <h3 className={`${TYPE.h3Small} text-white`}>{WHO.heading}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {WHO.items.map((item) => (
                <li key={item} className="flex gap-3 text-white">
                  <Tick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded p-6 text-white lg:p-8"
            style={{
              background:
                "linear-gradient(135deg, var(--sognos-digpacks-base) 0%, #8a1a5e 50%, var(--sognos-digpacks-dark) 100%)",
            }}
          >
            <h3 className={`${TYPE.h3Small} text-white`}>{LOCAL.heading}</h3>
            <p className="mt-2 text-sm text-white">{LOCAL.intro}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {LOCAL.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Tick inverse />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
