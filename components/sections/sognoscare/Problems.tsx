const PROBLEMS = [
  {
    number: "01",
    problem: "Referrals and records spread across disconnected tools",
    problemDetail:
      "Care plans, progress notes, incidents, and service agreements living in separate systems means staff spend more time finding information than delivering care.",
    solution:
      "One structured system for the full case lifecycle — intake, assessment, goal tracking, service agreements, progress notes, and reviews in a single workflow accessible to everyone who needs it.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    number: "02",
    problem: "Compliance is documented after the fact, not built in",
    problemDetail:
      "NDIS audits, Aged Care Quality Standards, and the new Support at Home model require evidence at every step. Most systems can't produce it without manual assembly.",
    solution:
      "Automated audit trails, funding rule enforcement, and compliance reporting built into every workflow — not bolted on retrospectively. Audit-ready by default.",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    number: "03",
    problem: "Month-end reporting consumes staff time it shouldn't",
    problemDetail:
      "Funding-body reports shouldn't take two days and three people to assemble. That time belongs to the people you support, not to spreadsheets.",
    solution:
      "Real-time dashboards and automated reports across funding bodies, compliance frameworks, and operational metrics — generated, not assembled. Staff focus on care.",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    number: "04",
    problem: "Workforce and care management don't talk to each other",
    problemDetail:
      "When rostering runs in a separate system, visit records don't match care plans, coordinators reconcile discrepancies daily, and nothing is where it should be.",
    solution:
      "SognosCare and SognosRoster share the same data layer — visit records, care plans, and participant history stay in sync automatically, without manual reconciliation.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export default function SognoscareProblems() {
  return (
    <section id="problems" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Care providers shouldn&apos;t operate like this
          </h2>
          <p className="text-lg text-sognos-text-body">
            Fragmented systems, manual compliance, and disconnected data are the
            default for most care organisations. SognosCare fixes the root causes,
            not the symptoms.
          </p>
        </div>

        {/* Problem/solution rows */}
        <div className="flex flex-col gap-4">
          {PROBLEMS.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={item.number}
                className="grid overflow-hidden rounded-2xl lg:grid-cols-2"
              >
                {/* Problem panel */}
                <div
                  className={`flex flex-col justify-between bg-prussian-blue-900 p-8 lg:p-10 ${
                    isEven ? "lg:order-last" : ""
                  }`}
                >
                  <span className="font-heading text-6xl font-normal leading-none text-white/10">
                    {item.number}
                  </span>
                  <div className="mt-8">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/8">
                      <svg
                        className="h-5 w-5 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={item.iconPath}
                        />
                      </svg>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold leading-snug text-white">
                      {item.problem}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/55">
                      {item.problemDetail}
                    </p>
                  </div>
                </div>

                {/* Solution panel */}
                <div
                  className={`flex flex-col justify-center border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-8 lg:p-10 ${
                    isEven ? "lg:order-first" : ""
                  }`}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
                    The fix
                  </p>
                  <p className="text-base leading-relaxed text-sognos-text-body">
                    {item.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
