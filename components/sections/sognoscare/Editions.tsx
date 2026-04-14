import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Edition = {
  name: string;
  accentHex: string;
  accentTextClass: string;
  accentBgClass: string;
  subtitle: string;
  description: string;
  href: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const EDITIONS: Edition[] = [
  {
    name: "Disability & Mental Health",
    accentHex: "#009982",
    accentTextClass: "text-(--sognos-edition-green)",
    accentBgClass: "bg-(--sognos-edition-green)",
    subtitle: "Support for NDIS and psychosocial teams",
    description:
      "Plan around participant goals, manage incidents and streamline progress notes — all while staying aligned with funding rules and reducing admin strain.",
    href: "#",
  },
  {
    name: "Allied Health",
    accentHex: "#ff9233",
    accentTextClass: "text-(--sognos-edition-orange)",
    accentBgClass: "bg-(--sognos-edition-orange)",
    subtitle: "Purpose-built for therapy and community health teams",
    description:
      "Manage referrals, coordinate schedules and record multi-disciplinary notes in one place — with mobile-first access to keep your workforce productive in the field.",
    href: "#",
  },
  {
    name: "Support at Home",
    accentHex: "#ff666b",
    accentTextClass: "text-(--sognos-edition-coral)",
    accentBgClass: "bg-(--sognos-edition-coral)",
    subtitle: "Designed for in-home aged care providers",
    description:
      "Support client independence while managing services, budgets and care workers — built to help providers prepare for the new Support at Home funding model.",
    href: "#",
  },
  {
    name: "Residential Aged Care",
    accentHex: "#a666ff",
    accentTextClass: "text-(--sognos-edition-purple)",
    accentBgClass: "bg-(--sognos-edition-purple)",
    subtitle: "Simplify resident care, clinical workflows and facility ops",
    description:
      "From care planning and documentation to staff coordination, we help residential providers deliver quality care while meeting compliance requirements.",
    href: "#",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SparkleRays({ hex }: { hex: string }) {
  return (
    <svg
      width="48"
      height="20"
      viewBox="0 0 48 20"
      fill="none"
      className="mb-3"
      aria-hidden
    >
      <line x1="8"  y1="18" x2="12" y2="8"  stroke={hex} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="14" x2="18" y2="4"  stroke={hex} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="12" x2="24" y2="2"  stroke={hex} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="31" y1="14" x2="30" y2="4"  stroke={hex} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="18" x2="36" y2="8"  stroke={hex} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CareIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="white"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Heart */}
      <path d="M24 41C24 41 5 28.5 5 16C5 10.477 9.477 6 15 6C18.5 6 21.5 7.8 24 11C26.5 7.8 29.5 6 33 6C38.523 6 43 10.477 43 16C43 28.5 24 41 24 41Z" />
      {/* Hands cupped inside */}
      <path d="M16 24V21C16 19.895 16.895 19 18 19H20" />
      <path d="M32 24V21C32 19.895 31.105 19 30 19H28" />
      <path d="M20 19H28" />
      <path d="M19 25C19 27 21.238 28.5 24 28.5C26.762 28.5 29 27 29 25" />
    </svg>
  );
}

function EditionCard({ edition }: { edition: Edition }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl">
      {/* Dark header */}
      <div className="flex flex-col items-center bg-prussian-blue-900 px-6 pb-8 pt-8 text-center">
        <SparkleRays hex={edition.accentHex} />
        <CareIcon />
        <h3 className={`mt-5 text-lg font-semibold leading-snug ${edition.accentTextClass}`}>
          {edition.name}
        </h3>
        <p className="mt-2 text-sm leading-snug text-white/80">
          {edition.subtitle}
        </p>
      </div>

      {/* White body */}
      <div className="flex flex-1 flex-col justify-between bg-white px-6 py-6">
        <p className="text-sm leading-relaxed text-sognos-text-body">
          {edition.description}
        </p>
      </div>

      {/* Accent CTA */}
      <Link
        href={edition.href}
        className={`block px-6 py-4 text-center text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 ${edition.accentBgClass}`}
      >
        Book a Demo
      </Link>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SognoscareEditions() {
  return (
    <section id="editions" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-3 font-heading text-4xl font-normal text-sognos-text-heading">
            Choose the Right SognosCare Edition for Your Service
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-sognos-text-body">
            SognosCare offers four tailored editions to meet the needs of diverse
            care providers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EDITIONS.map((edition) => (
            <EditionCard key={edition.name} edition={edition} />
          ))}
        </div>
      </div>
    </section>
  );
}
