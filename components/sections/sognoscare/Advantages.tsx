const ADVANTAGES = [
  {
    number: "01",
    title: "Built for regulated care. Not adapted from generic CRM.",
    body: "NDIS progress note requirements, Aged Care Quality Standards, Home Care Package rules, and the new Support at Home funding model are pre-configured — not customised after the fact. Your compliance framework is the platform, not an add-on.",
    detail: [
      "NDIS Quality & Safeguards Commission",
      "Aged Care Quality Standards",
      "Support at Home Program",
      "State community services frameworks",
    ],
  },
  {
    number: "02",
    title: "The Microsoft ecosystem. Not another silo.",
    body: "SognosCare runs on Microsoft Dynamics 365, connecting to Outlook, Teams, SharePoint, and Power BI — tools your staff already use. There's no new app to adopt, no separate login, and no manual data bridge between your operating platform and your communication tools.",
    detail: [
      "Dynamics 365 native — not an integration",
      "Microsoft Teams coordination built in",
      "Power BI for advanced analytics",
      "Azure security and data residency",
    ],
  },
  {
    number: "03",
    title: "Implemented by people who know care.",
    body: "Sognos implementations are led by consultants with direct care sector experience. We don't need to learn your industry vocabulary, your funding model quirks, or your compliance obligations — we've already worked with them.",
    detail: [
      "Care sector specialists, not generalist consultants",
      "Edition-specific implementation methodology",
      "Ongoing product roadmap for Australian care reforms",
      "Dedicated support for regulatory changes",
    ],
  },
] as const;

export default function SognoscareAdvantages() {
  return (
    <section id="advantages" className="bg-prussian-blue-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
            Why SognosCare
          </p>
          <h2 className="mb-5 font-heading text-4xl font-normal leading-snug text-white">
            Generic tools weren&apos;t designed for this
          </h2>
          <p className="text-lg text-white/55">
            Most platforms in the market are adapted from general-purpose CRM or
            project management tools. SognosCare was designed from the ground up for
            regulated care operations in Australia.
          </p>
        </div>

        {/* Advantage panels */}
        <div className="grid gap-0 divide-y divide-white/[0.08] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {ADVANTAGES.map((adv) => (
            <div key={adv.number} className="flex flex-col gap-6 px-0 py-10 lg:px-10 lg:py-0 first:lg:pl-0 last:lg:pr-0">
              <span className="font-heading text-6xl font-normal leading-none text-white/10">
                {adv.number}
              </span>
              <div>
                <h3 className="mb-4 text-lg font-semibold leading-snug text-white">
                  {adv.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {adv.body}
                </p>
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
