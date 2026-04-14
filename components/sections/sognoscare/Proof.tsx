const STATS = [
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
    value: "60%",
    label: "Reduction in admin time",
    context: "Per care worker, across active deployments",
    theme: "light",
  },
  {
    value: "2,500+",
    label: "Participants managed",
    context: "Across active SognosCare deployments",
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
      "Our compliance auditors used to dread reporting periods. Now every document, every progress note, every incident is timestamped and in one place. We passed our last three audits without a single finding.",
    role: "Quality & Compliance Manager",
    organisation: "NDIS Service Organisation",
  },
] as const;

// ─── Stat tile ────────────────────────────────────────────────────────────────

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

// ─── Testimonial tile ─────────────────────────────────────────────────────────

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
        <p
          className={`text-sm font-semibold ${
            dark ? "text-white" : "text-prussian-blue-900"
          }`}
        >
          {testimonial.role}
        </p>
        <p
          className={`mt-1 text-sm ${
            dark ? "text-white/60" : "text-prussian-blue-900/60"
          }`}
        >
          {testimonial.organisation}
        </p>
      </footer>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SognoscareProof() {
  return (
    <section className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              Results
            </p>
            <h2 className="font-heading text-4xl font-normal text-brand">
              Results care providers can point to
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-sognos-text-body lg:justify-self-end">
            SognosCare is built for care providers who need to demonstrate
            outcomes — to funding bodies, auditors, and the people they serve.
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
