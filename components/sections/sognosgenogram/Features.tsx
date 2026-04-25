const FEATURES = [
  {
    title: "Interactive genogram builder",
    body: "Create structured family and relationship maps directly within a case record using standard clinical genogram notation — without leaving the platform.",
  },
  {
    title: "Support network mapping",
    body: "Identify formal and informal supports, map relationship nature (supportive, strained, absent), and flag who is actively involved in the client's life.",
  },
  {
    title: "Risk and protective factor tagging",
    body: "Tag relationships with clinical context — who provides stability, who presents risk, and which connections need monitoring or intervention.",
  },
  {
    title: "Embedded in the case record",
    body: "Genograms are part of the case record, not a separate attachment. Every worker on the case sees the same relationship picture, in context, when they need it.",
  },
  {
    title: "Historical snapshots",
    body: "Capture how a client's network changes over time. Compare relationship maps across different periods to understand how circumstances have evolved.",
  },
  {
    title: "Copilot AI narrative",
    body: "Generate a plain-language summary of the family and support picture from the genogram data — ready to include in reports, referrals, or handover notes.",
  },
];

export default function GenogramFeatures() {
  return (
    <section id="features" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
            Capabilities
          </p>
          <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
            Everything you need to map relationships that matter
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl border border-(--sognos-card-border) bg-white p-8"
            >
              <div className="mb-4 h-1 w-8 rounded-full bg-[#92278d]" />
              <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-sognos-text-body">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
