const pillars = [
  {
    id: "care",
    label: "Care Management",
    description:
      "Track service delivery, manage cases, and maintain compliance — all in one place. SognosCare gives you the structure to deliver services consistently and report with confidence.",
  },
  {
    id: "workforce",
    label: "Workforce Coordination",
    description:
      "Schedule the right people to the right services at the right time. SognosRoster optimises your workforce in real time — reducing gaps, improving utilisation, and cutting manual scheduling effort.",
  },
  {
    id: "platform",
    label: "One Intelligent Platform",
    description:
      "Both products run on Microsoft Dynamics 365 — giving you a single system of record for services, people, outcomes, and compliance. No silos. No manual reconciliation.",
  },
];

export default function WhatIsSognos() {
  return (
    <section aria-label="What Sognos is">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>What is Sognos?</h2>
          <p>
            Sognos is an AI-powered service operations platform that unifies care management and
            workforce coordination — enabling organisations to deliver services efficiently,
            coordinate complex workforces, and maintain compliance.
          </p>
        </header>

        <ul role="list">
          {pillars.map((pillar) => (
            <li key={pillar.id}>
              <h3>{pillar.label}</h3>
              <p>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
