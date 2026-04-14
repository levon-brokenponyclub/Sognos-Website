const STANDARDS = [
  {
    label: "NDIS Quality & Safeguards",
    description:
      "Incident management, progress note standards, and participant rights built into every workflow.",
  },
  {
    label: "Aged Care Quality Standards",
    description:
      "Consumer dignity, safe care, and continuous improvement supported across residential and home care.",
  },
  {
    label: "Support at Home Program",
    description:
      "Budgeting, service authorisation, and provider obligations for the new Support at Home funding model.",
  },
  {
    label: "State Community Services",
    description:
      "Adaptable compliance configuration for state-based requirements across jurisdictions.",
  },
];

export default function SognoscareCompliance() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
              Built for regulated care environments
            </h2>
            <p className="mb-8 text-lg text-sognos-text-body">
              SognosCare is designed around the compliance requirements of Australian
              care providers — not adapted from a generic platform. Funding rules,
              audit obligations, and reporting standards are embedded in the
              platform, not managed around it.
            </p>
            <p className="text-sm text-sognos-text-muted">
              Compliance configuration adapts to your funding streams and
              jurisdictional requirements. Custom frameworks available on request.
            </p>
          </div>

          {/* Right — standards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {STANDARDS.map((standard) => (
              <div
                key={standard.label}
                className="rounded-xl border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-(--sognos-edition-green)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-sognos-text-heading">
                    {standard.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-sognos-text-body">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
