// Placeholder — swap for a compliance/healthcare video before launch
const COMPLIANCE_VIDEO =
  "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm";

type StatTheme = "dark" | "video" | "light" | "brand";
type Stat = {
  value: string;
  label: string;
  context: string;
  theme: StatTheme;
  image?: string;
};

const STATS: Stat[] = [
  {
    value: "40%",
    label: "Reduction in scheduling",
    context: "Average across SognosRoster deployments",
    theme: "dark",
  },
  {
    value: "99%",
    label: "",
    context: "",
    theme: "video",
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
    image: "/images/industries/health-social-care.webp",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Sognos gave us one system for everything — care management, rostering, compliance. We went from three disconnected tools to one platform that actually reflects how we operate.",
    role: "Operations Director",
    organisation: "Health & Social Care Provider",
    dark: false,
  },
  {
    quote:
      "SognosRoster cut our manual scheduling from two days a week to a couple of hours. The AI matching means we're not just filling shifts — we're putting the right people in the right place.",
    role: "Workforce Manager",
    organisation: "NDIS Service Organisation",
    dark: true,
  },
] as const;

// ─── Stat tile ─────────────────────────────────────────────────────────────

function StatTile({ stat }: { stat: Stat }) {
  const isVideo = stat.theme === "video";

  const bgClass = {
    light: "bg-white border border-sognos-border-subtle text-brand",
    dark: "bg-prussian-blue-800 text-white",
    brand: "bg-brand text-white",
    video: "text-white",
  }[stat.theme];

  const labelColor = {
    light: "text-brand",
    dark: "text-white",
    brand: "text-white",
    video: "text-white",
  }[stat.theme];

  const contextColor = {
    light: "text-brand",
    dark: "text-white",
    brand: "text-white",
    video: "text-white",
  }[stat.theme];

  const valueColor = {
    light: "text-brand",
    dark: "text-white",
    brand: "text-white",
    video: "text-white",
  }[stat.theme];

  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden rounded-lg p-7 h-full ${bgClass}`}
    >
      {/* Video background — no overlay, full opacity */}
      {isVideo && (
        <video
          src={COMPLIANCE_VIDEO}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Image background */}
      {stat.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stat.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-prussian-blue-900/55" />
        </>
      )}

      {/* Content — hide all text for video card */}
      {!isVideo && (
        <>
          {stat.label && (
            <p
              className={`relative text-sm font-medium leading-snug hidden ${labelColor}`}
            >
              {stat.label}
            </p>
          )}
          <div className="relative">
            <p
              className={`font-heading text-6xl font-medium tracking-tight mb-2 leading-none ${valueColor}`}
            >
              {stat.value}
            </p>
            {stat.label && (
              <p
                className={`relative text-lg font-medium leading-snug ${labelColor}`}
              >
                {stat.label}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Testimonial tile ───────────────────────────────────────────────────────

function TestimonialTile({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  const { dark } = testimonial;

  return (
    <div
      className={`flex flex-col justify-end rounded-lg p-7 h-full ${
        dark
          ? "bg-[#1D96FC] text-white"
          : "bg-white border border-sognos-border-subtle"
      }`}
    >
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        aria-hidden="true"
        className={dark ? "text-white" : "text-brand"}
      >
        <path
          d="M0 22V13.6C0 5.87 4.1 1.4 12.3 0l1.4 2.4C9.8 3.47 7.77 5.6 7.1 9H12V22H0zm16 0V13.6C16 5.87 20.1 1.4 28.3 0l1.4 2.4C25.8 3.47 23.77 5.6 23.1 9H28V22H16z"
          fill="currentColor"
        />
      </svg>

      <blockquote className="mt-4 flex-1">
        <p
          className={`text-sm leading-relaxed ${dark ? "text-white" : "text-brand"}`}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-6">
        <p
          className={`text-sm font-semibold ${dark ? "text-white" : "text-brand"}`}
        >
          {testimonial.role}
        </p>
        <p className={`text-xs mt-0.5 ${dark ? "text-white" : "text-brand"}`}>
          {testimonial.organisation}
        </p>
      </footer>
    </div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

export default function ProofSection() {
  return (
    <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-55">
          {/* Row 1 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[0]} />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[0]} />
          </div>
          <div className="lg:col-span-1">
            <StatTile stat={STATS[1]} />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-1">
            <StatTile stat={STATS[2]} />
          </div>
          <div className="lg:col-span-1">
            <StatTile stat={STATS[3]} />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
