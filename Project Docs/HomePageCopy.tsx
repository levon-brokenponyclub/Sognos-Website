export const homePageCopy = {
  hero: {
    headline:
      "First in field service management for complex, compliance-heavy operations.",
    subtext:
      "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
    primaryCTA: "Book Your Free Assessment",
    secondaryCTA: "View Customer Stories",
  },
  howSognosWorks: {
    title: "One connected platform. From referral to resolution.",
    description:
      "Bring intake, rostering, field execution, and reporting into one operational loop with Dynamics 365 + AI.",
    tabs: [
      {
        label: "Manage demand",
        description:
          "Capture referrals, requests, and case details in one place with structured workflows and full audit history.",
      },
      {
        label: "Coordinate workforce",
        description:
          "Match the right worker to the right task using skills, availability, location, and compliance requirements.",
      },
      {
        label: "Track outcomes",
        description:
          "Measure utilisation, service quality, and compliance in real time with dashboards built for operational teams.",
      },
    ],
  },
  productSection: {
    heading:
      "Built for organisations where service quality and compliance cannot fail.",
    care: {
      byline: "Care operations and compliance, unified",
      body: "Support safer care delivery with connected client records, service workflows, and funding-ready reporting.",
    },
    roster: {
      byline: "Workforce scheduling built for real-world complexity",
      body: "Coordinate field teams with live scheduling, dispatch, and visibility across every shift, site, and service.",
    },
    together: {
      byline: "When care and workforce run as one",
      body: "Connect intake, staffing, delivery, and outcomes without manual handoffs or disconnected systems.",
    },
  },
  solutions: {
    title: "Solutions",
    subtitle: "Designed for how service organisations actually operate",
    description:
      "From field service and CRM to customer insights, customer service, and Power Platform automation, Sognos delivers practical outcomes on Dynamics 365.",
  },
  customerStories: {
    title: "Customer Stories",
    description:
      "See how organisations across health, local government, industrial services, and utilities improve efficiency and service delivery with Sognos.",
  },
  industries: {
    title: "Industries",
    subtitle: "Purpose-built for service-intensive sectors",
    description:
      "We support teams managing complex field operations, strict compliance obligations, and high customer expectations.",
  },
  proof: {
    title: "Results organisations can point to",
    description:
      "Sognos combines operational expertise with Microsoft technology to deliver measurable improvements in service performance and control.",
  },
  insights: {
    title: "Insights & Updates",
    subtitle: "What’s shaping service operations right now",
    description:
      "Explore practical guidance, customer stories, and Sognos updates across Dynamics 365, AI, and field service transformation.",
  },
  cta: {
    headline: "Ready to modernise your service operations?",
    subtext:
      "Book a free assessment to map your current workflows, identify quick wins, and plan a practical path to go-live.",
    primaryCTA: "Book Your Free Assessment",
    secondaryCTA: "Contact Us",
  },
} as const;

export type HomePageCopy = typeof homePageCopy;

