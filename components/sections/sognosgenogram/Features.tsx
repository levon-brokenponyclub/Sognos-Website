const FEATURES = [
  {
    title: "Interactive genogram builder",
    body: "Create structured family and relationship maps directly within a case record using standard clinical genogram notation - without leaving the platform.",
  },
  {
    title: "Support network mapping",
    body: "Identify formal and informal supports, map relationship nature (supportive, strained, absent), and flag who is actively involved in the client's life.",
  },
  {
    title: "Risk and protective factor tagging",
    body: "Tag relationships with clinical context - who provides stability, who presents risk, and which connections need monitoring or intervention.",
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
    body: "Generate a plain-language summary of the family and support picture from the genogram data - ready to include in reports, referrals, or handover notes.",
  },
];

export default function GenogramFeatures() {
  return (
    <section id="features" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start gap-4">
          <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-4 pr-5 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
            <span
              aria-hidden
              className="animate-shine pointer-events-none absolute inset-0 rounded-full"
              style={
                {
                  padding: "1px",
                  background:
                    "conic-gradient(from var(--shine-angle), transparent 0deg, rgba(9,18,42,0.75) 60deg, transparent 120deg, transparent 360deg)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  ["--shine-duration" as string]: "7s",
                } as React.CSSProperties
              }
            />
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Features
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-text-heading tracking-tight">
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
              <h2 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                {feature.title}
              </h2>
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
