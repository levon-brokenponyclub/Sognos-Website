const FEATURES = [
  {
    name: "Case Management",
    description:
      "End-to-end case lifecycle — from referral and assessment through to service delivery, review, and closure.",
  },
  {
    name: "Service Delivery Tracking",
    description:
      "Real-time visibility into scheduled and completed services, with variance tracking, alerts, and mobile access.",
  },
  {
    name: "Compliance & Audit Trail",
    description:
      "Every action logged. Every document versioned. Every funding rule enforced at the point of care, not retrospectively.",
  },
  {
    name: "Reporting & Analytics",
    description:
      "Operational dashboards and funding-body reports generated automatically — not manually assembled from spreadsheets.",
  },
  {
    name: "Copilot AI",
    description:
      "AI-assisted documentation, anomaly detection, and insights surfaced where staff are already working — inside Dynamics 365.",
  },
  {
    name: "Power Platform Automation",
    description:
      "Low-code automation for approvals, escalations, and notifications — configurable to your organisation's workflows.",
  },
];

export default function SognoscareFeatures() {
  return (
    <section className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Everything a care operation needs
          </h2>
          <p className="text-lg text-sognos-text-body">
            SognosCare brings the full operational stack into one platform — case
            management, compliance, reporting, and AI insight.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.name}
              className="rounded-xl border border-(--sognos-card-border) bg-white p-6"
            >
              <h3 className="mb-2 text-sm font-semibold text-sognos-text-heading">
                {feature.name}
              </h3>
              <p className="text-sm leading-relaxed text-sognos-text-body">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
