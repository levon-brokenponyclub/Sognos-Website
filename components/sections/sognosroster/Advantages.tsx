const ADVANTAGES = [
  {
    number: "01",
    title: "Built for regulated service environments. Not generic shift management.",
    body: "Compliance certifications, funding rules, and service agreement requirements are pre-configured in SognosRoster — not customised after the fact. Your regulatory obligations are scheduling preconditions, not afterthoughts.",
    detail: [
      "NDIS workforce compliance rules pre-configured",
      "Aged Care workforce certification tracking",
      "Support at Home service agreement enforcement",
      "State-specific compliance frameworks",
    ],
  },
  {
    number: "02",
    title: "Embedded in Microsoft Dynamics 365. Not another silo.",
    body: "SognosRoster lives inside Dynamics 365 — where your workforce data, case records, and service agreements already are. No new system to adopt, no duplicate data entry, and no integration to maintain between rostering and care management.",
    detail: [
      "Dynamics 365 native — not a bolt-on integration",
      "Shared data layer with SognosCare",
      "Microsoft Teams for shift coordination",
      "Power BI workforce analytics",
    ],
  },
  {
    number: "03",
    title: "Implemented by workforce operations specialists.",
    body: "SognosRoster deployments are led by people who understand complex workforce environments — not generalist consultants learning your industry as they go. Configuration is driven by your actual scheduling patterns and compliance requirements.",
    detail: [
      "Industry specialists, not generalist implementors",
      "Scheduling logic configured to your service model",
      "Workforce change management included",
      "Ongoing support for regulatory updates",
    ],
  },
] as const;

export default function SognoscareRosterAdvantages() {
  return (
    <section id="advantages" className="bg-prussian-blue-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
            Why SognosRoster
          </p>
          <h2 className="mb-5 font-heading text-4xl font-normal leading-snug text-white">
            Generic scheduling tools weren&apos;t built for this
          </h2>
          <p className="text-lg text-white/55">
            Most workforce scheduling platforms are adapted from HR or logistics
            tools. SognosRoster was designed for the operational reality of
            regulated, high-volume service environments.
          </p>
        </div>

        {/* Advantage panels */}
        <div className="grid gap-0 divide-y divide-white/[0.08] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.number}
              className="flex flex-col gap-6 px-0 py-10 lg:px-10 lg:py-0 first:lg:pl-0 last:lg:pr-0"
            >
              <span className="font-heading text-6xl font-normal leading-none text-white/10">
                {adv.number}
              </span>
              <div>
                <h3 className="mb-4 text-lg font-semibold leading-snug text-white">
                  {adv.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{adv.body}</p>
              </div>
              <ul className="mt-auto space-y-2">
                {adv.detail.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-(--sognos-edition-green)"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs text-white/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Microsoft partner callout */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.08] pt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
            Powered by
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {[
              "Microsoft Dynamics 365",
              "Microsoft Copilot",
              "Power Platform",
              "Azure",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-white/40"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
