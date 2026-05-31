import { INDUSTRIES } from "./constants";

export type IndustryContent = {
  slug: string;
  hero: { headline: string; subtext: string };
  challenges: { title: string; body: string }[];
  howSognosHelpsIntro?: string;
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
        body: "NDIS, aged care, and state-level regulations require evidence of service delivery, participant outcomes, and audit-ready records - at all times.",
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
        body: "SognosCare embeds compliance checks, audit trails, and outcome recording directly into service delivery - so evidence exists without extra admin effort.",
      },
      {
        title: "Intelligent workforce matching",
        body: "SognosRoster matches workers to participants automatically, factoring skills, compliance status, travel time, and continuity of care.",
      },
      {
        title: "Reporting without the overhead",
        body: "Generate funder and regulatory reports from live operational data - no manual compilation, no reconciliation.",
      },
    ],
  },
  {
    slug: "facilities-management",
    hero: {
      headline: "Field operations that run on time",
      subtext:
        "Sognos helps facilities management organisations dispatch field teams, track SLA performance, and deliver consistently - across every client and site.",
    },
    challenges: [
      {
        title: "SLA compliance is non-negotiable",
        body: "Missed response windows, incomplete jobs, and unverified attendance create contract risk and erode client trust.",
      },
      {
        title: "Field visibility is limited",
        body: "Operations managers work from yesterday's data. Real-time job status, worker location, and completion rates are guesswork.",
      },
      {
        title: "Scheduling at scale is manual",
        body: "Coordinating hundreds of field workers across clients, sites, and shift patterns is a time-consuming process that breaks under pressure.",
      },
    ],
    howSognosHelpsIntro:
      "Keep operations moving with connected facilities management solutions built on Dynamics 365.",
    howSognosHelps: [
      {
        title: "Connected field operations",
        body: "Manage jobs, assets, workers and service requests in one platform with Dynamics 365.",
      },
      {
        title: "Real-time operational visibility",
        body: "Track job status, workforce activity and service delivery as work happens.",
      },
      {
        title: "Smarter scheduling and dispatch",
        body: "Optimise schedules automatically based on availability, workload and travel time.",
      },
      {
        title: "Mobile-first workforce management",
        body: "Give field teams access to jobs, updates and reporting from anywhere.",
      },
      {
        title: "Compliance and audit readiness",
        body: "Capture field activity, inspections and service records in real time.",
      },
      {
        title: "Built on Microsoft Dynamics 365",
        body: "Connect field service, customer service, reporting and operations across Microsoft.",
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
        body: "Council services are expected to be transparent and auditable - but records are often scattered, incomplete, or stored in systems that can't report effectively. Budget pressure is constant.",
      },
      {
        title: "Workforce coordination across departments",
        body: "Field teams, case workers, and contractors operate under separate systems. Coordinating them for a single service delivery is unnecessarily complex.",
      },
      {
        title: "Reporting to multiple stakeholders",
        body: "Elected officials, executive teams, and funding bodies all need different views of the same operational data - and getting there takes hours of manual work.",
      },
    ],
    howSognosHelpsIntro:
      "Keep local government operations moving on Microsoft Dynamics 365.",
    howSognosHelps: [
      {
        title: "Connected field service management",
        body: "Manage work orders, service requests, assets and field teams in one Dynamics 365 platform.",
      },
      {
        title: "Smarter scheduling and routing",
        body: "Plan crews, shifts and routes based on workload, location, availability and priority.",
      },
      {
        title: "Mobile access for field workers",
        body: "Give teams real-time job details, service updates and reporting tools from anywhere.",
      },
      {
        title: "Asset maintenance and inspections",
        body: "Track maintenance history, inspections, faults, warranties and service records across community assets.",
      },
      {
        title: "Predictive maintenance alerts",
        body: "Reduce paperwork, avoid critical incidents and act before outages or failures occur.",
      },
      {
        title: "Performance and KPI tracking",
        body: "Measure response times, resolution rates, service quality and operational efficiency.",
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
        body: "Hundreds of workers across multiple sites, shifts, and contractors - getting the right people in the right place requires coordination that manual tools can't handle.",
      },
      {
        title: "Asset and job linkage is complex",
        body: "Field workers need to know what asset they're servicing, what history it has, and what tools or parts are required - and that information rarely reaches them efficiently.",
      },
      {
        title: "Real-time changes disrupt the schedule",
        body: "Equipment failures, absenteeism, and emergency callouts break carefully constructed schedules. Reoptimisation takes hours when it should take minutes.",
      },
    ],
    howSognosHelps: [
      {
        title: "Demand-driven scheduling at scale",
        body: "SognosRoster generates and optimises schedules for large field workforces automatically - factoring skills, location, shift constraints, and workload.",
      },
      {
        title: "Asset-linked job management",
        body: "Attach asset records, service history, and work instructions to jobs so field workers arrive informed and ready.",
      },
      {
        title: "Real-time reoptimisation",
        body: "When the schedule breaks, SognosRoster recalculates and reassigns in real time - minimising disruption and maintaining output.",
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
        body: "Regulatory obligations, safety standards, and licensing requirements mean every job must be performed by the right person with the right qualifications - and evidenced.",
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
    howSognosHelpsIntro:
      "Keep critical field operations moving on Microsoft Dynamics 365.",
    howSognosHelps: [
      {
        title: "Connected field service management",
        body: "Manage work orders, maintenance activity and field operations in one platform.",
      },
      {
        title: "Intelligent scheduling and dispatch",
        body: "Assign the right technician based on skills, location and availability.",
      },
      {
        title: "Predictive maintenance and monitoring",
        body: "Identify issues earlier and reduce unplanned outages using connected asset data.",
      },
      {
        title: "Mobile workforce operations",
        body: "Give field teams access to jobs, service history and reporting from anywhere.",
      },
      {
        title: "Compliance and operational reporting",
        body: "Track inspections, maintenance and regulatory requirements in real time.",
      },
      {
        title: "Built on Microsoft Dynamics 365",
        body: "Connect field service, customer operations and reporting across Microsoft.",
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
