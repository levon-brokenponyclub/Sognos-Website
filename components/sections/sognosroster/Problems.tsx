const PROBLEMS = [
  {
    number: "01",
    problem: "Manual rostering consumes weeks every month",
    problemDetail:
      "Workforce managers in high-volume environments spend 20–30% of their week on scheduling. Spreadsheets, phone calls, and calendar juggling are the norm — and the first disruption unravels everything.",
    solution:
      "Demand-driven roster generation — services are matched to workers based on skills, availability, location, and compliance status automatically, from the moment a service request is confirmed.",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    number: "02",
    problem: "Skills matching is error-prone at scale",
    problemDetail:
      "Checking that every worker holds the right qualifications, active certifications, and client-specific clearances manually at volume is a compliance liability — and it breaks down when things move fast.",
    solution:
      "Every worker allocation is validated against qualification requirements, compliance certifications, and client preferences before it's confirmed — automatically, at the point of scheduling.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    number: "03",
    problem: "Real-time changes break the day's schedule",
    problemDetail:
      "A sick-leave call at 6am can trigger hours of phone calls to find a replacement. The cascading effect — travel rerouting, coverage gaps, client notifications — compounds through the whole day.",
    solution:
      "When plans change — sick leave, service additions, cancellations — SognosRoster reoptimises the affected day in minutes and notifies the right workers automatically. No phone cascade.",
    iconPath:
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    number: "04",
    problem: "Disconnected systems mean workforce data lives in spreadsheets",
    problemDetail:
      "When rostering runs separately from care management, visit records don't match care plans, coordinators reconcile discrepancies daily, and nothing is where regulators expect it to be.",
    solution:
      "SognosRoster and SognosCare share the same data layer. Visit records, care plans, and participant history stay in sync automatically — without manual reconciliation or duplicate entry.",
    iconPath:
      "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
  },
];

export default function SognoscareRosterProblems() {
  return (
    <section id="problems" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Workforce scheduling shouldn&apos;t work like this
          </h2>
          <p className="text-lg text-sognos-text-body">
            Manual rostering, compliance risks, and disconnected data are the
            default for most service operations. SognosRoster fixes the root
            causes, not the symptoms.
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
