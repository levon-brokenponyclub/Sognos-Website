import Image from "next/image";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/layout/sections/ProductFeaturesScroll";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: "risk-management",
    image: "/images/digpacks/risk-management.png",
    name: "Risk Management",
    tagline: "Move from fragmented registers to visible, accountable action",
    description:
      "Bring assessments, actions, evidence, approvals, reminders and reporting into one configurable workflow. The solution can help organisations apply more consistent assessment processes, assign ownership clearly, retain supporting evidence, identify overdue reviews and improve visibility across services, sites and teams.",
  },
  {
    id: "safety-lens",
    image: "/images/digpacks/safety-lens.png",
    name: "Safety Lens",
    tagline: "A clearer starting point for environmental risk assessment",
    description:
      "Safety Lens, part of Ligature Risk Management app, uses an app-integrated Copilot to analyse photographs of rooms or service environments and prepare a structured draft environmental risk assessment. It may be relevant to hospital-in-the-home, residential aged care, Supported Independent Living, mental health, disability and community service environments. It supports trained staff and does not replace professional judgement, consent, privacy controls or accountable approval.",
  },
  {
    id: "people-hr",
    image: "/images/digpacks/people-and-hr.png",
    name: "People & HR Management",
    tagline: "Give employees one clearer way to access routine people services",
    description:
      "Selected DigPacks people and HR workflows can support personal information changes, leave and flexible-working requests, onboarding processes, structured approvals, audit history and guided employee self-service. Sognos is assessing which capabilities can be localised without dependence on NHS-specific systems and how they can complement established HR, payroll and workforce platforms.",
  },
  {
    id: "vaccination-hub",
    image: "/images/digpacks/vaccination-hub.png",
    name: "Vaccination Hub",
    tagline: "Bring bookings, records and reporting into one workflow",
    description:
      "Vaccination Hub supports clinic and appointment management, employee self-service booking, real-time availability, recording of vaccinations received externally, secure records and program reporting. Any local implementation would need to reflect Australian or New Zealand immunisation, privacy, record-keeping and reporting requirements.",
  },
  {
    id: "privacy-impact-assessment",
    image: "/images/digpacks/privacy-impact-assessment.png",
    name: "Privacy Impact Assessment",
    tagline: "Make privacy by design a visible, auditable process",
    description:
      "Sognos and DigPacks are adapting the UK privacy-assessment capability into a Privacy Impact Assessment workflow for Australia and New Zealand. It can support structured assessment questions, clear review stages, privacy-risk and mitigation records, approvals, reminders, audit history and an AI agent that guides users through the process. Responsibility for privacy decisions remains with authorised people.",
  },
  {
    id: "it-service-management",
    image: "/images/digpacks/it-service-management.png",
    name: "IT Service Management",
    tagline: "Reduce repeated support work without reducing access to support",
    description:
      "The IT Service Management capability and FixIT Agent can provide one place to raise and track requests, clearer categorisation and ownership, access to approved support information, guided self-service, AI-assisted responses and escalation when human support is required. The objective is to reduce simple repeatable work so IT teams can focus on complex support, cybersecurity and service continuity.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function DigPacksSolutions() {
  const features: ScrollFeature[] = SOLUTIONS.map((s) => ({
    id: s.id,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
    visual: (
      <div
        key={s.id}
        className="relative h-full min-h-[280px] w-full overflow-hidden rounded-lg"
      >
        <Image
          src={s.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      </div>
    ),
  }));

  return (
    <ProductFeaturesScroll
      header={{
        eyebrow: "Solutions",
        heading: "Solutions for today’s operational pressure",
      }}
      features={features}
      accentBorderClass="border-sognos-digpacks-base"
      accentTextClass="text-sognos-digpacks-base"
      enableVisuals
    />
  );
}
