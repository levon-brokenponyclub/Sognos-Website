import { INDUSTRIES } from "./constants";

export type IndustryContent = {
  slug: string;
  hero: { headline: string; subtext: string };
  challenges: { title: string; body: string }[];
  howSognosHelps: { title: string; body: string }[];
};

export const INDUSTRIES_CONTENT: IndustryContent[] = [
  {
    slug: "health-social-care",
    hero: {
      headline: "Service operations built for care",
      subtext:
        "From disability support to aged care, Sognos helps health and social care providers coordinate delivery, maintain compliance, and scale with confidence.",
    },
    challenges: [
      {
        title: "Compliance pressure is constant",
        body: "NDIS, aged care, and state-level regulations require evidence of service delivery, participant outcomes, and audit-ready records — at all times.",
      },
      {
        title: "Workforce complexity is high",
        body: "Matching support workers to participants based on skills, qualifications, location, and relationship history is a daily coordination challenge.",
      },
      {
        title: "Admin load crowds out care time",
        body: "Documentation, reporting, and scheduling tasks consume significant capacity that should be directed toward participant outcomes.",
      },
    ],
    howSognosHelps: [
      {
        title: "Compliance built into every workflow",
        body: "SognosCare embeds compliance checks, audit trails, and outcome recording directly into service delivery — so evidence exists without extra admin effort.",
      },
      {
        title: "Intelligent workforce matching",
        body: "SognosRoster matches workers to participants automatically, factoring skills, compliance status, travel time, and continuity of care.",
      },
      {
        title: "Reporting without the overhead",
        body: "Generate funder and regulatory reports from live operational data — no manual compilation, no reconciliation.",
      },
    ],
  },
  {
    slug: "facilities-management",
    hero: {
      headline: "Field operations that run on time",
      subtext:
        "Sognos helps facilities management organisations dispatch field teams, track SLA performance, and deliver consistently — across every client and site.",
    },
    challenges: [
      {
        title: "SLA compliance is non-negotiable",
        body: "Missed response windows, incomplete jobs, and unverified attendance create contract risk and erode client trust.",
      },
      {
        title: "Field visibility is limited",
        body: "Operations managers work from yesterday&apos;s data. Real-time job status, worker location, and completion rates are guesswork.",
      },
      {
        title: "Scheduling at scale is manual",
        body: "Coordinating hundreds of field workers across clients, sites, and shift patterns is a time-consuming process that breaks under pressure.",
      },
    ],
    howSognosHelps: [
      {
        title: "Automated SLA tracking and alerting",
        body: "SognosRoster monitors every job against its SLA and flags issues before breaches occur — not after.",
      },
      {
        title: "Live field operations dashboard",
        body: "See job status, worker location, and schedule adherence in real time — from dispatch through completion.",
      },
      {
        title: "Demand-driven scheduling",
        body: "SognosRoster generates optimised schedules automatically based on job load, worker availability, and travel efficiency.",
      },
    ],
  },
  {
    slug: "local-government",
    hero: {
      headline: "Service delivery that stands up to scrutiny",
      subtext:
        "Sognos helps local government teams coordinate frontline services, manage cases with full accountability, and produce the audit records that regulators and leadership require.",
    },
    challenges: [
      {
        title: "Accountability without visibility",
        body: "Council services are expected to be transparent and auditable — but records are often scattered, incomplete, or stored in systems that can&apos;t report effectively.",
      },
      {
        title: "Workforce coordination across departments",
        body: "Field teams, case workers, and contractors operate under separate systems. Coordinating them for a single service delivery is unnecessarily complex.",
      },
      {
        title: "Reporting to multiple stakeholders",
        body: "Elected officials, executive teams, and funding bodies all need different views of the same operational data — and getting there takes hours of manual work.",
      },
    ],
    howSognosHelps: [
      {
        title: "Full audit trails on every case",
        body: "SognosCare records every action, decision, and document change against the case record — producing an audit trail that&apos;s always ready.",
      },
      {
        title: "Cross-department workforce coordination",
        body: "SognosRoster coordinates field teams and contractors across services with a single scheduling and dispatch layer.",
      },
      {
        title: "Configurable stakeholder reporting",
        body: "Build role-specific dashboards and scheduled reports so every stakeholder gets the view they need without manual data compilation.",
      },
    ],
  },
  {
    slug: "industrial-services",
    hero: {
      headline: "Large-scale field operations, without the coordination overhead",
      subtext:
        "Sognos helps industrial service providers coordinate large workforces, manage asset-linked work, and maintain operational output across complex multi-site environments.",
    },
    challenges: [
      {
        title: "Large workforces are hard to coordinate",
        body: "Hundreds of workers across multiple sites, shifts, and contractors — getting the right people in the right place requires coordination that manual tools can&apos;t handle.",
      },
      {
        title: "Asset and job linkage is complex",
        body: "Field workers need to know what asset they&apos;re servicing, what history it has, and what tools or parts are required — and that information rarely reaches them efficiently.",
      },
      {
        title: "Real-time changes disrupt the schedule",
        body: "Equipment failures, absenteeism, and emergency callouts break carefully constructed schedules. Reoptimisation takes hours when it should take minutes.",
      },
    ],
    howSognosHelps: [
      {
        title: "Demand-driven scheduling at scale",
        body: "SognosRoster generates and optimises schedules for large field workforces automatically — factoring skills, location, shift constraints, and workload.",
      },
      {
        title: "Asset-linked job management",
        body: "Attach asset records, service history, and work instructions to jobs so field workers arrive informed and ready.",
      },
      {
        title: "Real-time reoptimisation",
        body: "When the schedule breaks, SognosRoster recalculates and reassigns in real time — minimising disruption and maintaining output.",
      },
    ],
  },
  {
    slug: "energy-utilities",
    hero: {
      headline: "Compliant, reliable service across critical networks",
      subtext:
        "Sognos helps energy and utilities organisations manage asset-intensive delivery, coordinate compliance-heavy field operations, and maintain service continuity under pressure.",
    },
    challenges: [
      {
        title: "Compliance requirements are severe",
        body: "Regulatory obligations, safety standards, and licensing requirements mean every job must be performed by the right person with the right qualifications — and evidenced.",
      },
      {
        title: "Asset-intensive operations are hard to track",
        body: "Thousands of assets, varied service schedules, and distributed field teams make it difficult to maintain visibility across the network.",
      },
      {
        title: "Field continuity under pressure",
        body: "Grid events, emergency callouts, and contractor dependencies create rapid changes to operational plans that manual scheduling cannot absorb.",
      },
    ],
    howSognosHelps: [
      {
        title: "Skills and compliance matching",
        body: "SognosRoster only assigns workers who meet the certification, licensing, and competency requirements for each job — enforced automatically.",
      },
      {
        title: "Asset-linked service management",
        body: "Connect field jobs to asset records so every work order carries the history, specifications, and compliance requirements of what&apos;s being serviced.",
      },
      {
        title: "Rapid reoptimisation for grid events",
        body: "SognosRoster reoptimises schedules in real time when priority jobs emerge — maintaining coverage and response times across the network.",
      },
    ],
  },
];

export function getIndustryContent(slug: string): IndustryContent | undefined {
  return INDUSTRIES_CONTENT.find((i) => i.slug === slug);
}

export function getIndustryMeta(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
