const OUTCOMES = [
  {
    heading: "Nothing falls through",
    body: "Every job tracked from plan to completion — automatically",
  },
  {
    heading: "Staff arrive prepared",
    body: "They have what they need before they leave, not after they call",
  },
  {
    heading: "Reporting takes minutes",
    body: "Not a day piecing together spreadsheets from three systems",
  },
  {
    heading: "Decisions made with confidence",
    body: "Because you trust what you're looking at",
  },
] as const;

const STATS = [
  { number: "1,100+", label: "Staff on one platform" },
  { number: "10 sec", label: "Down from 25 minutes" },
  { number: "10,000+", label: "Assets tracked in the field" },
  { number: "5,000", label: "Contracts fully self-managing" },
] as const;

export default function HomepageOutcomes() {
  return (
    <section className="w-full bg-wh-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-wh-text-soft mb-4">
            Outcomes
          </p>
          <h2 className="font-heading text-wh-text font-medium tracking-tight leading-[1.1] text-[clamp(1.75rem,4vw,2.75rem)] max-w-xl">
            What changes when everything is connected
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-start">

          {/* Left: outcome statements */}
          <div className="flex flex-col gap-px border border-wh-border rounded-wh-md overflow-hidden">
            {OUTCOMES.map(({ heading, body }) => (
              <div key={heading} className="flex flex-col gap-2 p-6 bg-wh-card border-b border-wh-border last:border-b-0">
                <h3 className="font-heading text-wh-text font-medium text-lg leading-snug">
                  {heading}
                </h3>
                <p className="text-wh-text-muted text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ number, label }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-wh-md border border-wh-border bg-wh-card p-6"
              >
                <span className="font-heading text-wh-text font-medium tracking-tight leading-none text-[clamp(1.75rem,4vw,2.5rem)]">
                  {number}
                </span>
                <span className="text-xs text-wh-text-muted leading-snug">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
