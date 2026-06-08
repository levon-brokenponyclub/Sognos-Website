/**
 * Typed content for the six SognosCare editions.
 *
 * This module mirrors the `edition` Sanity schema (sanity/schemas/edition.ts).
 * Image fields are kept as `/public` paths — `scripts/seed-editions.ts`
 * uploads them as Sanity assets at seed time.
 *
 * Notes on field provenance vs the per-page `EditionData` shape
 * (components/sections/sognoscare/EditionPageTemplate.tsx):
 * - `accentTextClass`, `accentBgClass`, `accentBorderClass` are derived at
 *   render time from `accentHex` — they are NOT mirrored in the schema.
 * - `caseStudy` on each page is replaced by `customerStories: []` here. The
 *   seed script resolves references against existing `customerStory` docs
 *   by slug (logging any unresolved matches).
 * - `cardLogo`, `cardTagline`, and `cardDescription` are sourced from
 *   `SOGNOSCARE_EDITIONS` in `lib/constants.ts` — they drive the parent
 *   /products/sognoscare slider card and sticky sub-nav.
 * - `heroLogoWhite` is sourced from the `EDITION_LOGOS` map inside
 *   `EditionPageTemplate.tsx` (keyed by edition name).
 */

export type EditionSeo = {
  title: string;
  description: string;
};

export type EditionProblem = {
  label: string;
  description: string;
};

export type EditionFeature = {
  title: string;
  description: string;
};

export type EditionProofQuote = {
  quote: string;
  attribution: string;
};

export type EditionContent = {
  /** Stable id segment — used to build `edition.${slug}` document ids. */
  slug: string;
  /** Display order in the SognosCare editions slider (1-based). */
  order: number;
  name: string;
  seo: EditionSeo;

  // ─── Parent-page card (SognosCare editions slider) ────────────────────────
  cardLogo: string;
  cardTagline: string;
  cardDescription: string;

  // ─── Hero & theme ─────────────────────────────────────────────────────────
  /** Six-character hex, e.g. `#36b19a`. */
  accentHex: string;
  heroLogoWhite: string;
  gradient: string;
  heroTagline: string;
  heroDescription: string;

  // ─── Content ──────────────────────────────────────────────────────────────
  problems: EditionProblem[];
  features: EditionFeature[];
  advantages: string[];
  aiTools: string[];
  proofQuotes: EditionProofQuote[];

  // ─── Customer story reference resolution ──────────────────────────────────
  /**
   * Slugs of `customerStory` documents to feature on this edition page,
   * in display order. Resolved to references at seed time by the seed
   * script. Empty array = no featured stories.
   */
  customerStorySlugs: string[];
};

export const DEFAULT_EDITIONS: EditionContent[] = [
  {
    slug: "disability-mental-health",
    order: 1,
    name: "Disability & Mental Health",
    seo: {
      title: "SognosCare for Disability & Mental Health | Sognos",
      description:
        "Purpose-built for NDIS and psychosocial support providers. Smart systems to support participant goals, reduce admin, and stay NDIS-compliant.",
    },
    cardLogo: "/logos/sognoscare-edition-dmh.svg",
    cardTagline: "NDIS, psychosocial support, and participant outcome tracking",
    cardDescription:
      "Plan around participant goals, manage incidents, and streamline progress notes - with NDIS funding rules and Quality & Safeguards requirements enforced at every step.",
    accentHex: "#36b19a",
    heroLogoWhite: "/logos/sognoscare-edition-dmh-white.svg",
    gradient: "/images/sognoscare/gradient-1.png",
    heroTagline: "Purpose-built for psychosocial providers.",
    heroDescription:
      "Smart systems to support participant goals, reduce admin, and stay NDIS-compliant - all built on Microsoft using the latest AI technology.",
    problems: [
      {
        label: "Endless admin and disconnected systems",
        description:
          "Teams juggle multiple platforms for referrals, notes, and compliance - creating errors and burning time.",
      },
      {
        label: "NDIS compliance headaches",
        description:
          "Keeping up with Quality & Safeguards requirements across every participant record is manual and error-prone.",
      },
      {
        label: "Missed or delayed support due to scheduling gaps",
        description:
          "Without real-time workforce visibility, participants fall through the cracks when workers are unavailable.",
      },
      {
        label: "No visibility of goals, outcomes or risk",
        description:
          "Managers lack a consolidated view of participant progress, risk flags, and outcome achievement.",
      },
      {
        label: "Limited support for mobile teams",
        description:
          "Outreach workers and support coordinators can't access or update records in the field.",
      },
      {
        label: "Billing and claims errors",
        description:
          "Manual NDIS claim processing leads to underclaiming, errors, and payment delays.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything a NDIS or psychosocial support provider needs - pre-configured, compliant, and ready to deploy.",
      },
      {
        title: "Intake & Onboarding",
        description:
          "Referrals, assessments, consent forms, and participant records from day one.",
      },
      {
        title: "Recovery Planning & Goal Tracking",
        description:
          "Personalised plans, goal progress notes, and outcome reporting built in.",
      },
      {
        title: "Rostering & Mobile Workforce",
        description:
          "Smart scheduling, NDIS-compliant shift matching, and mobile access for workers.",
      },
      {
        title: "Compliance & Reporting",
        description:
          "Auditing templates, mandatory reporting workflows, and quality indicator dashboards.",
      },
      {
        title: "Billing & Claims",
        description:
          "Plan management automation, NDIS price guide enforcement, and bulk claim submission.",
      },
      {
        title: "Secure Communication",
        description:
          "Encrypted messaging and document sharing between coordinators, workers, and participants.",
      },
    ],
    advantages: [
      "Built 100% on Microsoft Dynamics 365 and Power Platform",
      "Seamlessly integrates with Power Platform + AI Copilot",
      "Mobile-first design for outreach and clinic teams",
      "Reduces admin by up to 40%",
      "Keeps you audit-ready and person-centred at every step",
      "Pre-configured NDIS funding rules and Quality & Safeguards workflows",
      "Goal tracking and outcome reporting aligned to NDIS plans",
      "Restrictive practice authorisation workflows built in",
    ],
    aiTools: [
      "Copilot-style note automation",
      "AI triage and intake assistants",
      "Predictive alerts for risks and disengagement",
    ],
    proofQuotes: [
      {
        quote:
          "Admin time down 40%. Compliance up. And staff finally feel supported.",
        attribution: "Head of Service Delivery, Mental Health Provider",
      },
      {
        quote:
          "We used to rely on spreadsheets and gut feel. Now we've got clarity across every service and location.",
        attribution: "CEO, Disability Organisation",
      },
    ],
    customerStorySlugs: ["penrith-city-council"],
  },
  {
    slug: "allied-health",
    order: 2,
    name: "Allied Health",
    seo: {
      title: "SognosCare for Allied Health | Sognos",
      description:
        "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place - with mobile-first access for allied health practitioners.",
    },
    cardLogo: "/logos/sognoscare-edition-ahc.svg",
    cardTagline:
      "Mobile therapy , referral management, and multi-disciplinary records",
    cardDescription:
      "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place - with mobile-first access designed for practitioners who work across multiple sites.",
    accentHex: "#fea65d",
    heroLogoWhite: "/logos/sognoscare-edition-ahc-white.svg",
    gradient: "/images/sognoscare/gradient-2.png",
    heroTagline: "Unified therapy, referrals, and multidisciplinary records.",
    heroDescription:
      "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place - with mobile-first access designed for practitioners who work across multiple sites.",
    problems: [
      {
        label: "Fragmented referral management",
        description:
          "Referrals arrive through multiple channels and are tracked manually, leading to delays and missed appointments.",
      },
      {
        label: "Manual scheduling for multi-site practitioners",
        description:
          "Coordinating practitioner rosters across sites and disciplines is time-consuming and prone to gaps.",
      },
      {
        label: "Inconsistent clinical documentation",
        description:
          "Different practitioners use different formats, making it impossible to maintain a single view of the client.",
      },
      {
        label: "No visibility of caseload and capacity",
        description:
          "Practice managers can't see real-time capacity across disciplines, leading to over- or under-utilisation.",
      },
      {
        label: "Poor integration between clinical and billing",
        description:
          "Clinical records and billing systems are disconnected, causing claim errors and revenue leakage.",
      },
      {
        label: "Limited mobile access for field practitioners",
        description:
          "Practitioners can't access or update records between appointments or at community sites.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything an allied health practice needs - from referral intake to outcome measurement.",
      },
      {
        title: "Referral & Intake Management",
        description:
          "Centralise referrals from all sources, triage by priority, and assign to the right practitioner automatically.",
      },
      {
        title: "Multi-disciplinary Care Records",
        description:
          "Shared client records accessible by all treating practitioners - with discipline-specific note templates.",
      },
      {
        title: "Practitioner Scheduling & Rostering",
        description:
          "Coordinate schedules across disciplines and sites, with skills-based matching and conflict detection.",
      },
      {
        title: "Clinical Documentation & Notes",
        description:
          "Structured note templates for each discipline, with AI-assisted documentation and outcome tracking.",
      },
      {
        title: "Billing & Medicare Claims",
        description:
          "Automated Medicare, health fund, and NDIS claim generation with bulk submission and reconciliation.",
      },
      {
        title: "Outcomes Measurement",
        description:
          "Track clinical outcomes against validated measures and generate reports for funders and accreditors.",
      },
    ],
    advantages: [
      "Purpose-built for allied health practice workflows",
      "Integrates with Medicare, NDIS, and health fund billing",
      "Mobile-first for practitioners working across multiple sites",
      "Reduces time-to-treatment from referral",
      "Structured documentation that keeps you audit-ready",
      "Shared records visible to all disciplines in the care team",
      "Outcome measurement built in for evidence-based practice",
      "Group session and program management out of the box",
    ],
    aiTools: [
      "Copilot-style clinical note automation",
      "AI-assisted intake triage and priority scoring",
      "Smart scheduling and capacity recommendations",
    ],
    proofQuotes: [
      {
        quote:
          "Our referral wait time dropped by 35% in the first quarter after going live.",
        attribution: "Practice Manager, Allied Health Group",
      },
      {
        quote:
          "Finally a system that understands how we work - not the other way around.",
        attribution: "Director of Services, Allied Health Provider",
      },
    ],
    customerStorySlugs: ["penrith-city-council"],
  },
  {
    slug: "hospital-in-the-home",
    order: 3,
    name: "Hospital in the Home",
    seo: {
      title: "SognosCare for Hospital in the Home | Sognos",
      description:
        "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.",
    },
    cardLogo: "/logos/SognosCare-HITH-Logo.svg",
    cardTagline: "Hospital-level care, delivered at home",
    cardDescription:
      "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.",
    accentHex: "#c6da4c",
    heroLogoWhite: "/logos/SognosCare-HITH-Logo-White.svg",
    gradient: "/images/sognoscare/gradient-1.png",
    heroTagline: "Hospital-level care, delivered at home.",
    heroDescription:
      "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.",
    problems: [
      {
        label: "Manual clinical scheduling",
        description:
          "Coordinating nurses, clinicians, patient visits, travel, and availability is often managed across disconnected systems.",
      },
      {
        label: "Disconnected hospital-to-home care coordination",
        description:
          "Managing discharge pathways, home-based treatment plans, clinician schedules, and ongoing patient monitoring across teams creates operational gaps and delays.",
      },
      {
        label: "Fragmented patient communication",
        description:
          "Patients, carers, clinicians, and coordinators use different channels, making it difficult to maintain a unified care record.",
      },
      {
        label: "Limited visibility of patient care delivery",
        description:
          "Hospital and community teams lack real-time visibility of visit status, clinical updates, risks, and escalations.",
      },
      {
        label: "Paper-based clinical notes and reporting",
        description:
          "Clinicians complete notes in the field that may be entered later, creating delays, gaps, and incomplete records.",
      },
      {
        label: "Difficulty demonstrating safe care at home",
        description:
          "Proving care was delivered safely, on time, and in line with clinical governance requirements is difficult without structured records.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything a Hospital in the Home provider needs to coordinate home-based treatment, mobile clinicians, and patient care delivery.",
      },
      {
        title: "Hospital-to-Home Care Coordination",
        description:
          "Coordinate discharge pathways, home-based treatment plans, clinician schedules, and ongoing patient monitoring across hospital and community care teams from a single connected system.",
      },
      {
        title: "Clinical Scheduling & Rostering",
        description:
          "Match nurses and clinicians to patient visits based on availability, location, skills, and treatment requirements.",
      },
      {
        title: "Home-Based Clinical Care",
        description:
          "Track scheduled visits, treatments, observations, wound care, medication administration, and escalation activity delivered in the home.",
      },
      {
        title: "Mobile Clinical Documentation",
        description:
          "Mobile-first clinical notes for nurses and clinicians in the field, with structured records for reporting and review.",
      },
      {
        title: "Hospital in the Home Compliance",
        description:
          "Pre-configured workflows to support clinical governance, audit readiness, incident management, and reporting requirements.",
      },
      {
        title: "Care Team Communication",
        description:
          "Provide patients, carers, hospital teams, and community clinicians with shared visibility of schedules, updates, and care activity.",
      },
    ],
    advantages: [
      "Pre-configured for Hospital in the Home care delivery",
      "Tracks clinical visits, risks, and escalations in real time",
      "Mobile-first for clinicians delivering care in the field",
      "Automates reporting to reduce administrative burden",
      "Supports acute, post-acute, and virtual ward care models",
      "Demonstrates safe care delivery with structured records",
      "GPS-verified service delivery for transparent visit tracking",
      "Shared visibility across the hospital, clinician, and care teams",
    ],
    aiTools: [
      "AI-assisted visit preparation and clinical note drafting",
      "Smart clinician scheduling based on treatment needs and travel time",
      "Automated risk flagging for missed visits, escalations, and follow-up gaps",
    ],
    proofQuotes: [
      {
        quote:
          "We finally have one system for discharge coordination, clinician scheduling, and in-home documentation.",
        attribution: "Operations Lead, Hospital in the Home Provider",
      },
      {
        quote:
          "Our teams can see what has happened, what is scheduled next, and where risks are emerging without chasing updates across systems.",
        attribution: "Clinical Services Manager, Hospital in the Home Program",
      },
    ],
    customerStorySlugs: [],
  },
  {
    slug: "support-at-home",
    order: 4,
    name: "Support at Home",
    seo: {
      title: "SognosCare for Support at Home | Sognos",
      description:
        "Manage client services, budgets, and care workers while staying ahead of the new Support at Home program - funding model changes tracked and compliance pre-configured.",
    },
    cardLogo: "/logos/sognoscare-edition-sah.svg",
    cardTagline: "Support at Home reform, and client independence",
    cardDescription:
      "Manage client services, budgets, and care workers while staying ahead of the Support at Home program - with funding model changes tracked and compliance pre-configured.",
    accentHex: "#ff8184",
    heroLogoWhite: "/logos/sognoscare-edition-sah-white.svg",
    gradient: "/images/sognoscare/gradient-3.png",
    heroTagline: "Support at Home reform, and independence.",
    heroDescription:
      "Manage client services, budgets, and care workers while staying ahead of the new Support at Home program.",
    problems: [
      {
        label: "Manual care worker scheduling",
        description:
          "Coordinating care worker rosters against client schedules is done manually, creating gaps and missed visits.",
      },
      {
        label: "Complex Support at Home compliance",
        description:
          "Adapting to the new Support at Home program while maintaining current operations stretches every team.",
      },
      {
        label: "Fragmented client communication",
        description:
          "Clients, families, and care managers use different channels, making it impossible to maintain a unified record.",
      },
      {
        label: "No real-time visibility of service budgets",
        description:
          "Budget tracking is done in spreadsheets, leading to overspend, underspend, and funding disputes.",
      },
      {
        label: "Paper-based progress notes and reporting",
        description:
          "Care workers complete paper notes in the field that are entered manually - late, lost, or incomplete.",
      },
      {
        label: "Difficulty demonstrating consumer-directed care",
        description:
          "Proving that care plans genuinely reflect client goals and preferences is difficult without structured records.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything a home care provider needs to manage packages, schedule workers, and stay compliant.",
      },
      {
        title: "Client & Package Management",
        description:
          "Manage Home Care Packages, Support at Home registrations, and client profiles from a single record.",
      },
      {
        title: "Care Worker Scheduling & Rostering",
        description:
          "Match care workers to client visits based on skills, location, availability, and compliance status.",
      },
      {
        title: "Budget Tracking & Funding Management",
        description:
          "Track funding balances in real time against approved budgets, with alerts before overspend occurs.",
      },
      {
        title: "Progress Notes & Reporting",
        description:
          "Mobile-first progress notes for care workers in the field, with automated compliance reporting.",
      },
      {
        title: "Support at Home Compliance",
        description:
          "Pre-configured workflows for the new Support at Home program, including classification and contribution management.",
      },
      {
        title: "Client & Family Portal",
        description:
          "Give clients and families visibility of their care plan, scheduled visits, and funding usage.",
      },
    ],
    advantages: [
      "Pre-configured for the new Support at Home program requirements",
      "Tracks funding budgets in real time with overspend alerts",
      "Mobile-first for care workers completing visits in the field",
      "Automates compliance reporting to reduce month-end burden",
      "Supports both self-directed and provider-managed care models",
      "Demonstrates person-centred care with structured goal records",
      "GPS-verified service delivery for transparent billing",
      "Care partner and family portal for shared visibility",
    ],
    aiTools: [
      "AI-assisted care plan generation from client assessments",
      "Predictive budget alerts before funding is exhausted",
      "Automated progress note generation from voice or structured input",
    ],
    proofQuotes: [
      {
        quote:
          "We transitioned to Support at Home with zero compliance issues. The pre-configured workflows did the heavy lifting.",
        attribution: "General Manager, Home Care Provider",
      },
      {
        quote:
          "Our care workers love the mobile app. They spend less time on admin and more time with clients.",
        attribution: "Operations Manager, In-Home Support Organisation",
      },
    ],
    customerStorySlugs: ["penrith-city-council"],
  },
  {
    slug: "residential-aged-care",
    order: 5,
    name: "Residential Aged Care",
    seo: {
      title: "SognosCare for Residential Aged Care | Sognos",
      description:
        "From care planning and progress documentation to staff coordination and resident outcome reporting - built for residential providers who need to demonstrate quality against the Aged Care Quality Standards.",
    },
    cardLogo: "/logos/sognoscare-edition-rac.svg",
    cardTagline: "Care planning, clinical documentation, and compliance",
    cardDescription:
      "From care planning to staff coordination and resident reporting - built for residential providers demonstrating quality against Aged Care Quality Standards.",
    accentHex: "#c49aff",
    heroLogoWhite: "/logos/sognoscare-edition-rac-white.svg",
    gradient: "/images/sognoscare/gradient-4.png",
    heroTagline: "Planning, documentation, and compliance.",
    heroDescription:
      "From care planning and progress documentation to staff coordination and resident outcome reporting - built for providers.",
    problems: [
      {
        label: "Complex resident care planning",
        description:
          "Care plans are updated infrequently, stored across systems, and rarely reflect current resident needs.",
      },
      {
        label: "Manual clinical documentation burden",
        description:
          "Nursing staff spend excessive time on progress notes instead of resident-facing care.",
      },
      {
        label: "Aged Care Quality Standards compliance gaps",
        description:
          "Preparing for and responding to accreditation audits takes weeks of manual evidence gathering.",
      },
      {
        label: "Staff coordination across shifts",
        description:
          "Handovers are verbal or paper-based, leading to information loss and inconsistent care delivery.",
      },
      {
        label: "Poor reporting for AN-ACC funding",
        description:
          "Acuity data is not captured consistently, resulting in underclaiming and lost revenue.",
      },
      {
        label: "Limited family and resident visibility",
        description:
          "Families have no visibility of resident care, raising concerns and increasing administrative burden on staff.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything a residential aged care provider needs to manage residents, staff, and compliance.",
      },
      {
        title: "Resident Care Planning",
        description:
          "Structured, person-centred care plans linked to goals, preferences, and health history.",
      },
      {
        title: "Clinical Documentation & Progress Notes",
        description:
          "Discipline-specific note templates with AI assistance to reduce time-on-documentation for nursing staff.",
      },
      {
        title: "Staff Scheduling & Rostering",
        description:
          "Shift-based rostering with skills matching, ratio compliance, and real-time gap alerts.",
      },
      {
        title: "AN-ACC & Funding Management",
        description:
          "Capture acuity data consistently to support AN-ACC classification and maximise funding accuracy.",
      },
      {
        title: "Quality Standards Compliance",
        description:
          "Pre-built evidence frameworks mapped to all eight Aged Care Quality Standards for audit-ready reporting.",
      },
      {
        title: "Family & Resident Communication",
        description:
          "Secure portal for families to view care updates, scheduled activities, and resident wellbeing records.",
      },
    ],
    advantages: [
      "Pre-configured against all eight Aged Care Quality Standards",
      "Tracks AN-ACC acuity data to maximise funding accuracy",
      "Reduces documentation burden on nursing staff by up to 40%",
      "Real-time compliance dashboards for continuous quality monitoring",
      "Supports continuous improvement cycles with structured evidence capture",
      "Structured handover records to eliminate information loss across shifts",
      "Family and representative communication tools embedded",
      "Resident lifestyle and preference tracking for person-centred care",
    ],
    aiTools: [
      "Copilot-style clinical documentation and progress notes",
      "Predictive risk alerts for resident deterioration",
      "Automated quality indicator reporting for accreditation",
    ],
    proofQuotes: [
      {
        quote:
          "Our audit results have never been better - and we spend half the time preparing for them.",
        attribution: "Director of Nursing, Residential Aged Care Facility",
      },
      {
        quote:
          "We finally have a complete picture of every resident's care journey across every shift.",
        attribution: "Operations Director, Residential Aged Care Provider",
      },
    ],
    customerStorySlugs: ["penrith-city-council"],
  },
  {
    slug: "child-and-family-services",
    order: 6,
    name: "Child & Family Services",
    seo: {
      title: "SognosCare for Child & Family Services | Sognos",
      description:
        "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.",
    },
    cardLogo: "/logos/SognosCare-C&FS-Logo.svg",
    cardTagline: "Connected care for vulnerable children and families",
    cardDescription:
      "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.",
    accentHex: "#ff6db4",
    heroLogoWhite: "/logos/SognosCare-C&FS-Logo-White.svg",
    gradient: "/images/sognoscare/gradient-1.png",
    heroTagline: "Connected care for vulnerable children and families.",
    heroDescription:
      "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.",
    problems: [
      {
        label: "Disconnected family and case records",
        description:
          "Child, family, placement, and case information is often spread across multiple systems, documents, and teams.",
      },
      {
        label: "Limited visibility of family relationships and risks",
        description:
          "Understanding complex family structures, relationships, risks, and support networks is difficult without connected relationship mapping.",
      },
      {
        label: "Manual case management processes",
        description:
          "Case notes, referrals, assessments, and approvals are often managed manually, creating delays and administrative burden.",
      },
      {
        label: "Fragmented communication across services",
        description:
          "Case workers, carers, families, and partner agencies use disconnected channels, making coordinated service delivery difficult.",
      },
      {
        label: "Paper-based field documentation",
        description:
          "Frontline workers complete notes and assessments in the field that may be delayed, incomplete, or duplicated later.",
      },
      {
        label: "Difficulty demonstrating compliance and outcomes",
        description:
          "Tracking interventions, safety plans, visits, and case activity across long-running family engagements is difficult without structured records.",
      },
    ],
    features: [
      {
        title: "Core Features",
        description:
          "Everything child and family service providers need to manage cases, family relationships, frontline teams, and compliance obligations.",
      },
      {
        title: "Family Relationship Mapping",
        description:
          "Built around SognosGenogram, visualise complex family structures, kinship relationships, carers, guardians, and support networks from a connected family record.",
      },
      {
        title: "Case Management & Service Coordination",
        description:
          "Manage referrals, assessments, case plans, interventions, appointments, visits, and ongoing family support activities within a single system.",
      },
      {
        title: "Mobile Frontline Workflows",
        description:
          "Enable case workers and frontline teams to securely access case records, complete notes, update assessments, and manage visits from the field.",
      },
      {
        title: "Safety Plans & Risk Tracking",
        description:
          "Track safety concerns, incidents, wellbeing risks, case escalations, and intervention activities with structured workflows and visibility across teams.",
      },
      {
        title: "Compliance & Reporting",
        description:
          "Support audit readiness with configurable workflows, activity tracking, digital records, approvals, and reporting across child and family programs.",
      },
      {
        title: "Connected Communication & Collaboration",
        description:
          "Provide shared visibility across case workers, carers, families, and partner organisations to improve coordination and continuity of care.",
      },
    ],
    advantages: [
      "Built around SognosGenogram for connected family visibility",
      "Maps complex family, kinship, and care relationships visually",
      "Mobile-first for frontline workers managing cases in the field",
      "Tracks safety plans, risks, and interventions in real time",
      "Reduces administrative burden across long-running casework",
      "Supports connected service delivery across teams and agencies",
      "Structured case records improve compliance and reporting",
      "Shared visibility across families, carers, and frontline teams",
    ],
    aiTools: [
      "AI-assisted case note drafting and assessment summaries",
      "Smart risk flagging across safety plans and escalation activity",
      "Automated reporting across child and family program outcomes",
    ],
    proofQuotes: [
      {
        quote:
          "We finally have one system for case management, family relationships, and frontline documentation.",
        attribution: "Operations Lead, Child & Family Services Provider",
      },
      {
        quote:
          "Our teams can see the full family picture - relationships, risks, and case history - without chasing records across systems.",
        attribution: "Service Manager, Child & Family Services Program",
      },
    ],
    customerStorySlugs: [],
  },
];
