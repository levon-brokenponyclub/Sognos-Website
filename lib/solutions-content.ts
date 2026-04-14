import { SOLUTIONS } from "./constants";

export type SolutionContent = {
  slug: string;
  hero: { headline: string; subtext: string };
  whatItSolves: { intro: string; painPoints: { title: string; body: string }[] };
  capabilities: { title: string; body: string }[];
  platform: { label: string; description: string };
  worksWithCare: boolean;
  worksWithRoster: boolean;
};

export const SOLUTIONS_CONTENT: SolutionContent[] = [
  {
    slug: "field-service",
    hero: {
      headline: "Coordinate field teams without the chaos",
      subtext:
        "Dispatch the right people to the right jobs — automatically. Sognos Field Service gives your operations team full visibility and control without manual scheduling.",
    },
    whatItSolves: {
      intro:
        "Most field service problems come from the same place: disconnected systems, manual dispatch, and no real-time view of what&apos;s happening on the ground.",
      painPoints: [
        {
          title: "Scheduling delays and mismatches",
          body: "Manual rostering creates bottlenecks. The wrong person gets sent to a job, and fixing it takes hours of phone calls.",
        },
        {
          title: "SLA compliance under pressure",
          body: "Without automated tracking, SLA breaches are only visible after they&apos;ve happened — not when there&apos;s still time to act.",
        },
        {
          title: "No real-time ground visibility",
          body: "Operations teams work from stale information. Job status, location, and worker availability are all guesswork.",
        },
      ],
    },
    capabilities: [
      { title: "Intelligent job dispatch", body: "Automatically match jobs to the right field worker based on skills, location, and availability." },
      { title: "SLA tracking and alerts", body: "Monitor response and resolution times in real time. Get alerted before a breach occurs." },
      { title: "Live field visibility", body: "See every job, every worker, and every status update on a single operations dashboard." },
      { title: "Mobile worker app", body: "Field workers receive job details, capture attendance, and submit completion data from their phone." },
      { title: "Asset and equipment linking", body: "Attach assets to jobs so field workers arrive with the right information and tools." },
      { title: "Operational reporting", body: "Understand performance across teams, regions, and job types with configurable reports." },
    ],
    platform: {
      label: "Dynamics 365 Field Service",
      description:
        "Built on Microsoft Dynamics 365 Field Service, with Copilot AI for intelligent scheduling and Power Platform for workflow automation and reporting.",
    },
    worksWithCare: false,
    worksWithRoster: true,
  },
  {
    slug: "customer-relationship-management",
    hero: {
      headline: "One place for every client relationship",
      subtext:
        "Centralise client records, service history, and interactions so your team always has the context they need — and nothing falls through the cracks.",
    },
    whatItSolves: {
      intro:
        "When client data lives in spreadsheets, inboxes, and disconnected systems, relationships suffer and service quality drops.",
      painPoints: [
        {
          title: "Fragmented client records",
          body: "Contact details in one system, service history in another, notes in email. Your team wastes time reconstructing context before every interaction.",
        },
        {
          title: "Missed follow-ups and handoffs",
          body: "Without structured pipelines and task tracking, client commitments get dropped — especially across team handoffs.",
        },
        {
          title: "No unified service history",
          body: "Clients repeat themselves. Workers can&apos;t see what was promised, delivered, or escalated before their involvement.",
        },
      ],
    },
    capabilities: [
      { title: "Unified contact management", body: "Every client, contact, and relationship in one structured record — accessible by your whole team." },
      { title: "Service history timeline", body: "See every interaction, case, and delivery milestone in a chronological view per client." },
      { title: "Pipeline and engagement tracking", body: "Track where each client relationship is in their journey and what actions are needed next." },
      { title: "Communication logging", body: "Automatically capture emails, calls, and meetings against the correct record." },
      { title: "Automated follow-up workflows", body: "Trigger tasks, reminders, and notifications at the right points in the relationship lifecycle." },
      { title: "Relationship reporting", body: "Understand engagement levels, service frequency, and relationship health across your client base." },
    ],
    platform: {
      label: "Dynamics 365 Sales & Customer Service",
      description:
        "Built on Microsoft Dynamics 365 Sales and Customer Service modules, with Copilot AI for relationship intelligence and Power Platform for workflow automation.",
    },
    worksWithCare: true,
    worksWithRoster: true,
  },
  {
    slug: "customer-insights",
    hero: {
      headline: "Understand your service demand before it happens",
      subtext:
        "Surface patterns in client behaviour, service demand, and operational outcomes so your team can make decisions with data — not instinct.",
    },
    whatItSolves: {
      intro:
        "Reactive operations are expensive. When you can&apos;t see patterns in your data, every surge in demand and every compliance risk catches you off guard.",
      painPoints: [
        {
          title: "No visibility into demand patterns",
          body: "Service requests spike unpredictably. Without analytics, you can&apos;t prepare capacity in advance or understand what&apos;s driving the change.",
        },
        {
          title: "Decisions based on gut feel",
          body: "Team leaders make workforce and resource decisions without structured data — and often get it wrong.",
        },
        {
          title: "Data locked in separate systems",
          body: "Useful information exists across your CRM, scheduling, and case management tools — but it&apos;s never in one place when you need it.",
        },
      ],
    },
    capabilities: [
      { title: "Demand analytics", body: "Track service request volumes, types, and timing to understand what&apos;s driving your workload." },
      { title: "Outcome tracking", body: "Measure what gets delivered against what was planned — at client, team, and service level." },
      { title: "Segment analysis", body: "Understand which client groups, regions, or services have the highest demand, cost, or risk." },
      { title: "Predictive demand signals", body: "Use AI-driven signals to anticipate resource needs before demand peaks hit." },
      { title: "Custom dashboards", body: "Build role-specific views so every team sees the metrics that matter to their function." },
      { title: "Data export and integration", body: "Push insights to Power BI, Excel, or your existing reporting stack." },
    ],
    platform: {
      label: "Dynamics 365 Customer Insights",
      description:
        "Built on Microsoft Dynamics 365 Customer Insights, with Copilot AI for pattern recognition and Power BI for interactive dashboards and reporting.",
    },
    worksWithCare: true,
    worksWithRoster: true,
  },
  {
    slug: "customer-experience",
    hero: {
      headline: "Consistent service across every interaction",
      subtext:
        "Deliver the same standard of care and communication at every touchpoint — so clients always know what to expect and your team always knows what to do.",
    },
    whatItSolves: {
      intro:
        "Poor client experience rarely comes from one bad moment. It comes from inconsistent processes, disconnected handoffs, and no feedback loop.",
      painPoints: [
        {
          title: "Inconsistent service handoffs",
          body: "When clients move between workers, teams, or channels, context gets lost — and the client feels it.",
        },
        {
          title: "No feedback loop",
          body: "Without structured satisfaction tracking, you find out about service failures from complaints — not from data.",
        },
        {
          title: "Standards that exist on paper only",
          body: "Service guidelines are documented but not enforced. Quality depends on the individual, not the system.",
        },
      ],
    },
    capabilities: [
      { title: "Service standard enforcement", body: "Embed service protocols into workflows so the right steps happen automatically — regardless of who&apos;s involved." },
      { title: "Omnichannel interaction tracking", body: "See every client touchpoint — calls, emails, portal, in-person — in a single timeline." },
      { title: "Client satisfaction surveys", body: "Trigger feedback requests at key moments and collect structured responses against each service record." },
      { title: "Satisfaction scoring", body: "Track NPS, CSAT, or custom satisfaction metrics at client and cohort level over time." },
      { title: "Escalation management", body: "Surface at-risk clients and trigger intervention workflows before dissatisfaction becomes a complaint." },
      { title: "Experience reporting", body: "Understand service quality trends across teams, regions, and client segments." },
    ],
    platform: {
      label: "Dynamics 365 Customer Service & Customer Voice",
      description:
        "Built on Microsoft Dynamics 365 Customer Service with Customer Voice for feedback, Copilot AI for interaction summarisation, and Power Automate for process enforcement.",
    },
    worksWithCare: true,
    worksWithRoster: true,
  },
  {
    slug: "customer-service",
    hero: {
      headline: "Resolve cases faster with unified tracking",
      subtext:
        "Give your service team a single place to log, track, and close every case — with full context, SLA visibility, and a complete audit trail.",
    },
    whatItSolves: {
      intro:
        "Case management fails when information is scattered. Without a single system, resolution slows, accountability disappears, and clients feel the gap.",
      painPoints: [
        {
          title: "Scattered case data",
          body: "Cases are logged in email, phone notes, and spreadsheets. No one has a complete picture — especially when a case changes hands.",
        },
        {
          title: "Slow resolution times",
          body: "Without routing logic or SLA tracking, cases queue unpredictably. The loudest client gets attention — not the most urgent case.",
        },
        {
          title: "No audit trail",
          body: "When something goes wrong, there&apos;s no way to reconstruct what happened, who was responsible, or what was promised.",
        },
      ],
    },
    capabilities: [
      { title: "Unified case management", body: "Log, categorise, and track every case from first contact to resolution in a single system." },
      { title: "Intelligent case routing", body: "Automatically assign cases to the right person based on type, priority, team capacity, and skill." },
      { title: "SLA monitoring", body: "Set response and resolution targets per case type. Surface breaches before they happen." },
      { title: "Knowledge base integration", body: "Surface relevant articles and resolution guides while workers are actively handling a case." },
      { title: "Escalation workflows", body: "Trigger escalation paths automatically when cases breach thresholds or remain unresolved." },
      { title: "Resolution reporting", body: "Track resolution rates, handling time, and SLA compliance across teams and case types." },
    ],
    platform: {
      label: "Dynamics 365 Customer Service",
      description:
        "Built on Microsoft Dynamics 365 Customer Service, with Copilot AI for case summarisation and suggested responses, and Power Automate for routing and escalation logic.",
    },
    worksWithCare: true,
    worksWithRoster: false,
  },
  {
    slug: "power-platform",
    hero: {
      headline: "Extend your operations with low-code tools",
      subtext:
        "Build custom apps, automate workflows, and connect your systems without a development team. Power Platform turns your operational needs into working solutions — fast.",
    },
    whatItSolves: {
      intro:
        "Most operations teams have process gaps that generic software doesn&apos;t cover. Power Platform closes those gaps without the cost or complexity of custom development.",
      painPoints: [
        {
          title: "Rigid out-of-the-box systems",
          body: "Standard software doesn&apos;t fit your exact process. Workarounds pile up and the gap between how you work and how the system works keeps growing.",
        },
        {
          title: "Integration gaps between tools",
          body: "Your systems don&apos;t talk to each other. Data moves by hand, errors accumulate, and your team spends time on data transfer rather than service delivery.",
        },
        {
          title: "Automation backlog",
          body: "Everyone knows which manual tasks could be automated. Nobody has the budget or bandwidth to build the solutions.",
        },
      ],
    },
    capabilities: [
      { title: "Power Apps", body: "Build custom-fit apps for your specific operational workflows — without writing code." },
      { title: "Power Automate", body: "Automate repetitive processes: approvals, notifications, data sync, and cross-system triggers." },
      { title: "Power BI", body: "Build rich, interactive dashboards that pull from Dynamics, Excel, or any connected data source." },
      { title: "Custom connectors", body: "Integrate with external systems — NDIS portals, payroll, scheduling tools — via pre-built or custom connectors." },
      { title: "Process automation", body: "Replace manual steps in scheduling, case management, and compliance with automated flows." },
      { title: "Self-service tools", body: "Give clients, workers, and managers the access they need without requiring IT involvement." },
    ],
    platform: {
      label: "Microsoft Power Platform",
      description:
        "Built entirely on the Microsoft Power Platform — Power Apps, Power Automate, Power BI, and Power Pages — with Copilot AI embedded throughout for intelligent process suggestions.",
    },
    worksWithCare: true,
    worksWithRoster: true,
  },
  {
    slug: "quick-start",
    hero: {
      headline: "Live in weeks, not months",
      subtext:
        "A fixed-scope, fast-track implementation of Sognos that gets your core operations running quickly — without the risk or cost of a long enterprise project.",
    },
    whatItSolves: {
      intro:
        "Enterprise software implementations have a reputation for running over time and over budget. Quick Start is built to break that pattern.",
      painPoints: [
        {
          title: "Implementation risk and length",
          body: "Long, open-ended projects drain internal resources, delay ROI, and increase the chance of scope creep and failure.",
        },
        {
          title: "Complexity before confidence",
          body: "Organisations get locked into a full platform before they&apos;ve validated whether it fits their operation. Quick Start lets you start smaller.",
        },
        {
          title: "Slow time to value",
          body: "Most software projects spend months in setup before delivering any operational benefit. That&apos;s months of cost with no return.",
        },
      ],
    },
    capabilities: [
      { title: "Pre-configured templates", body: "Start from a production-ready configuration tuned for your sector — not a blank canvas." },
      { title: "Guided implementation", body: "A structured delivery playbook keeps the project on track from kickoff to go-live." },
      { title: "Training and enablement", body: "Your team is ready to use the system on day one — not weeks after go-live." },
      { title: "Data migration support", body: "Structured migration of your existing client, case, and worker data into the new system." },
      { title: "Go-live support", body: "Dedicated support during your first live period so issues are caught and resolved quickly." },
      { title: "Hypercare period", body: "Extended post-launch support gives your team confidence as they settle into the new system." },
    ],
    platform: {
      label: "Dynamics 365 + Power Platform",
      description:
        "Delivered on Microsoft Dynamics 365 with Power Platform, configured for your sector using Sognos&apos;s proven implementation approach — reducing time, risk, and cost.",
    },
    worksWithCare: true,
    worksWithRoster: true,
  },
];

export function getSolutionContent(slug: string): SolutionContent | undefined {
  return SOLUTIONS_CONTENT.find((s) => s.slug === slug);
}

export function getSolutionMeta(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
