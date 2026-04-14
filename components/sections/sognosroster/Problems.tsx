const PROBLEMS = [
  {
    problem: "Manual rostering consumes weeks every month",
    solution:
      "SognosRoster automates scheduling from demand — matching workers to services based on skills, availability, location, and compliance rules.",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    problem: "Skills matching is error-prone at scale",
    solution:
      "Every shift is matched against worker qualifications, compliance certifications, and client preferences — automatically, before it hits the roster.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    problem: "Real-time changes break the day's schedule",
    solution:
      "When a worker calls in sick or a service is added at short notice, SognosRoster reoptimises in minutes — not hours — and notifies the right people automatically.",
    iconPath:
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function SognoscareRosterProblems() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Rostering at scale is still a manual problem
          </h2>
          <p className="text-lg text-sognos-text-body">
            Most workforce scheduling tools add complexity without removing the
            manual work. SognosRoster is built for the operational reality of
            complex, high-volume service environments.
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
