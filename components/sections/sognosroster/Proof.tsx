const STATS = [
  {
    value: "40%",
    label: "Reduction in scheduling time",
    context: "Average across SognosRoster deployments",
    theme: "dark",
  },
  {
    value: "1,100+",
    label: "Workers coordinated daily",
    context: "Across active SognosRoster clients",
    theme: "brand",
  },
  {
    value: "95%",
    label: "Shift coverage rate",
    context: "Including same-day changes and callouts",
    theme: "light",
  },
  {
    value: "< 1hr",
    label: "Average reoptimisation time",
    context: "For disrupted schedules on the day",
    theme: "light",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "SognosRoster cut our manual scheduling from two days a week to a couple of hours. The AI matching means we're not just filling shifts — we're putting the right people in the right place.",
    role: "Workforce Manager",
    organisation: "NDIS Service Organisation",
  },
  {
    quote:
      "We used to have a team of three doing nothing but scheduling. Now two of them spend their time on workforce development and the third handles exceptions. The work SognosRoster eliminated was real.",
    role: "Head of Operations",
    organisation: "Facilities Management Provider",
  },
] as const;

function StatTile({ stat }: { stat: (typeof STATS)[number] }) {
  const themes = {
    light: "bg-white border border-(--sognos-card-border) text-prussian-blue-900",
    dark: "bg-prussian-blue-900 text-white",
    brand: "bg-brand text-white",
  };
  const contextColor = {
    light: "text-prussian-blue-900/60",
    dark: "text-white/60",
    brand: "text-white/80",
  };

  return (
    <div
      className={`flex h-full min-h-52 flex-col justify-between rounded-xl p-8 ${themes[stat.theme]}`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-widest ${
          stat.theme === "light" ? "text-prussian-blue-900/50" : "text-white/60"
        }`}
      >
        {stat.label}
      </p>
      <div className="mt-8">
        <p className="mb-2 font-heading text-6xl font-semibold leading-none tracking-tight">
          {stat.value}
        </p>
        <p className={`text-sm leading-relaxed ${contextColor[stat.theme]}`}>
          {stat.context}
        </p>
      </div>
    </div>
  );
}

function TestimonialTile({
  testimonial,
  dark = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-full min-h-52 flex-col justify-between rounded-xl p-8 ${
        dark
          ? "bg-prussian-blue-900 text-white"
          : "bg-white border border-(--sognos-card-border)"
      }`}
    >
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        aria-hidden
        className={`mb-6 ${dark ? "text-white/20" : "text-prussian-blue-900/15"}`}
      >
        <path
          d="M0 22V13.6C0 5.87 4.1 1.4 12.3 0l1.4 2.4C9.8 3.47 7.77 5.6 7.1 9H12V22H0zm16 0V13.6C16 5.87 20.1 1.4 28.3 0l1.4 2.4C25.8 3.47 23.77 5.6 23.1 9H28V22H16z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="flex-1">
        <p
          className={`text-base font-medium leading-relaxed ${
            dark ? "text-white/80" : "text-prussian-blue-800"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>
      <footer className="mt-6">
        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-prussian-blue-900"}`}>
          {testimonial.role}
        </p>
        <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-prussian-blue-900/60"}`}>
          {testimonial.organisation}
        </p>
      </footer>
    </div>
  );
}

export default function SognoscareRosterProof() {
  return (
    <section id="proof" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              Results
            </p>
            <h2 className="font-heading text-4xl font-normal text-brand">
              Results workforce managers can measure
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-sognos-text-body lg:justify-self-end">
            SognosRoster is built for organisations that need to demonstrate
            efficiency — fewer scheduling hours, better coverage, and a workforce
            that&apos;s always in the right place.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <StatTile stat={STATS[0]} />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[0]} />
          </div>
          <div>
            <StatTile stat={STATS[1]} />
          </div>
          <div>
            <StatTile stat={STATS[2]} />
          </div>
          <div>
            <StatTile stat={STATS[3]} />
          </div>
          <div className="md:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[1]} dark />
          </div>
        </div>
      </div>
    </section>
  );
}
