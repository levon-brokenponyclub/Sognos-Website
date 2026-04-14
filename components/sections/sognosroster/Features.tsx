const FEATURES = [
  {
    name: "Intelligent Scheduling",
    description:
      "Demand-driven roster generation — services are matched to workers based on skills, certifications, location, and availability in a single pass.",
  },
  {
    name: "Skills & Compliance Matching",
    description:
      "Every worker allocation is validated against qualification requirements, compliance certifications, and client-specific preferences before it's confirmed.",
  },
  {
    name: "Route Optimisation",
    description:
      "Travel time and geography are factored into every schedule — reducing drive time, fuel cost, and lateness across field-based services.",
  },
  {
    name: "Real-Time Adjustments",
    description:
      "When plans change — sick leave, service additions, cancellations — SognosRoster reoptimises the affected day in minutes and notifies workers automatically.",
  },
  {
    name: "Mobile Worker App",
    description:
      "Field staff see their schedule, accept shifts, record attendance, and capture notes from their phone — no paper, no manual entry.",
  },
  {
    name: "Copilot AI Optimisation",
    description:
      "AI surfaces scheduling inefficiencies, predicts demand gaps, and recommends workforce actions — embedded directly in the Dynamics 365 environment.",
  },
];

export default function SognoscareRosterFeatures() {
  return (
    <section id="features" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Built for the full scheduling lifecycle
          </h2>
          <p className="text-lg text-sognos-text-body">
            From initial roster generation through to real-time adjustments and
            field execution — SognosRoster handles the full operational loop.
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
