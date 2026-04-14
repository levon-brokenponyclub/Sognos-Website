const PROBLEMS = [
  {
    problem: "Fragmented case records",
    solution:
      "One system for referrals, assessments, service plans, and progress notes — accessible to everyone who needs it, when they need it.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    problem: "Compliance risk across funding models",
    solution:
      "Automated audit trails, funding rule enforcement, and compliance reporting built into every workflow — not bolted on after the fact.",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    problem: "Manual reporting that consumes staff time",
    solution:
      "Real-time dashboards and automated reports across funding bodies, compliance frameworks, and operational metrics — generated, not assembled.",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

export default function SognoscareProblems() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Built for the complexity of care
          </h2>
          <p className="text-lg text-sognos-text-body">
            Care providers operate in one of the most demanding environments —
            fragmented systems, compliance pressure, and high stakes for the people
            they serve.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {PROBLEMS.map((item) => (
            <div key={item.problem} className="flex flex-col gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-cornflower-ocean-50)">
                <svg
                  className="h-5 w-5 text-brand"
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
              <div>
                <h3 className="mb-2 text-base font-semibold text-sognos-text-heading">
                  {item.problem}
                </h3>
                <p className="text-sm leading-relaxed text-sognos-text-body">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
