const STATS = [
  {
    value: "40%",
    label: "Reduction in scheduling time",
    context: "Average across SognosRoster deployments",
    theme: "light",
  },
  {
    value: "99%",
    label: "Compliance audit pass rate",
    context: "Across SognosCare regulated clients",
    theme: "dark",
  },
  {
    value: "3×",
    label: "Faster reporting cycle",
    context: "Compared to manual processes",
    theme: "light",
  },
  {
    value: "1,100+",
    label: "Workers coordinated daily",
    context: "Across active SognosRoster clients",
    theme: "brand",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Sognos gave us one system for everything — care management, rostering, compliance. We went from three disconnected tools to one platform that actually reflects how we operate.",
    role: "Operations Director",
    organisation: "Health & Social Care Provider",
  },
  {
    quote:
      "SognosRoster cut our manual scheduling from two days a week to a couple of hours. The AI matching means we're not just filling shifts — we're putting the right people in the right place.",
    role: "Workforce Manager",
    organisation: "NDIS Service Organisation",
  },
] as const;

// ─── Stat tile ─────────────────────────────────────────────────────────────

function StatTile({ stat }: { stat: (typeof STATS)[number] }) {
  const themes = {
    light: "bg-white border border-sognos-border-subtle text-neutral-900",
    dark: "bg-neutral-900 text-white",
    brand: "bg-brand text-white",
  };

  const contextColor = {
    light: "text-neutral-400",
    dark: "text-neutral-500",
    brand: "text-white/60",
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-7 h-full ${themes[stat.theme]}`}
    >
      <p
        className={`text-sm font-medium leading-snug ${
          stat.theme === "light" ? "text-neutral-500" : "text-white/70"
        }`}
      >
        {stat.label}
      </p>
      <div>
        <p className="font-heading text-5xl font-semibold tracking-tight leading-none">
          {stat.value}
        </p>
        <p className={`mt-2 text-xs ${contextColor[stat.theme]}`}>
          {stat.context}
        </p>
      </div>
    </div>
  );
}

// ─── Testimonial tile ───────────────────────────────────────────────────────

function TestimonialTile({
  testimonial,
  dark = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-7 h-full ${
        dark
          ? "bg-neutral-900 text-white"
          : "bg-white border border-sognos-border-subtle"
      }`}
    >
      {/* Quote mark */}
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        aria-hidden="true"
        className={dark ? "text-neutral-700" : "text-neutral-200"}
      >
        <path
          d="M0 22V13.6C0 5.87 4.1 1.4 12.3 0l1.4 2.4C9.8 3.47 7.77 5.6 7.1 9H12V22H0zm16 0V13.6C16 5.87 20.1 1.4 28.3 0l1.4 2.4C25.8 3.47 23.77 5.6 23.1 9H28V22H16z"
          fill="currentColor"
        />
      </svg>

      <blockquote className="mt-4 flex-1">
        <p
          className={`text-[15px] leading-relaxed ${
            dark ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-6">
        <p
          className={`text-sm font-semibold ${dark ? "text-white" : "text-neutral-900"}`}
        >
          {testimonial.role}
        </p>
        <p
          className={`text-xs mt-0.5 ${dark ? "text-neutral-500" : "text-neutral-400"}`}
        >
          {testimonial.organisation}
        </p>
      </footer>
    </div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

export default function ProofSection() {
  return (
    <section className="w-full border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Results
            <br />
            Results organisations can point to
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* Bento grid — 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {/* Row 1 */}
          {/* Stat: 40% — col 1 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[0]} />
          </div>

          {/* Testimonial 1 — cols 2–3 */}
          <div className="sm:col-span-2 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[0]} />
          </div>

          {/* Stat: 99% dark — col 4 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[1]} />
          </div>

          {/* Row 2 */}
          {/* Stat: 3× — col 1 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[2]} />
          </div>

          {/* Stat: 1,100+ brand — col 2 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[3]} />
          </div>

          {/* Testimonial 2 dark — cols 3–4 */}
          <div className="sm:col-span-2 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[1]} dark />
          </div>
        </div>
      </div>
    </section>
  );
}
