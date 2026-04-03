const steps = [
  {
    step: 1,
    title: "Capture service demand",
    description:
      "Service requests, referrals, and assessments are captured directly into SognosCare — creating a structured record for every service that needs to be delivered.",
    product: "SognosCare",
  },
  {
    step: 2,
    title: "Coordinate services and workflows",
    description:
      "SognosCare orchestrates the full service lifecycle — assigning cases, triggering workflows, and ensuring every service requirement is tracked from intake to delivery.",
    product: "SognosCare",
  },
  {
    step: 3,
    title: "Schedule and optimise workforce",
    description:
      "SognosRoster automatically matches available, qualified staff to each service — factoring in location, skills, compliance requirements, and real-time availability.",
    product: "SognosRoster",
  },
  {
    step: 4,
    title: "Deliver services in the field",
    description:
      "Field staff access their schedule and service details in real time. Every visit, task, and interaction is recorded — creating a live picture of delivery.",
    product: "SognosCare + SognosRoster",
  },
  {
    step: 5,
    title: "Record outcomes and compliance",
    description:
      "Outcomes, notes, and compliance checkpoints are captured at the point of delivery — feeding directly into your reporting, audit trails, and funding claims.",
    product: "SognosCare",
  },
  {
    step: 6,
    title: "Optimise performance with AI insights",
    description:
      "AI-powered insights surface patterns across your operations — highlighting inefficiencies, compliance gaps, and workforce utilisation opportunities so you can act before they become problems.",
    product: "Copilot AI",
  },
];

const platformStack = [
  "Built on Microsoft Dynamics 365",
  "Enhanced with Copilot AI",
  "Powered by Power Platform automation",
];

export default function HowItWorks() {
  return (
    <section aria-label="How Sognos works">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>How it works</h2>
          <p>
            From service demand to delivery to optimisation — Sognos manages the full cycle of
            service operations in one connected platform.
          </p>
        </header>

        <ol role="list" aria-label="Service operations workflow">
          {steps.map((item) => (
            <li key={item.step}>
              <span aria-label={`Step ${item.step}`}>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span aria-label="Product">{item.product}</span>
              </div>
            </li>
          ))}
        </ol>

        <ul role="list" aria-label="Platform foundation">
          {platformStack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
