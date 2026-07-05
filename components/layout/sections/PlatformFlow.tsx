import {
  ClipboardText,
  CalendarCheck,
  Truck,
  ChartLine,
} from "@phosphor-icons/react/dist/ssr";

const STEPS = [
  {
    icon: ClipboardText,
    label: "Plan",
    description: "Work is captured once and shared with everyone who needs it",
  },
  {
    icon: CalendarCheck,
    label: "Schedule",
    description: "The right person gets the right job, automatically",
  },
  {
    icon: Truck,
    label: "Deliver",
    description: "Work happens with full visibility as it goes",
  },
  {
    icon: ChartLine,
    label: "Improve",
    description: "Every outcome feeds back into better decisions",
  },
] as const;

export default function PlatformFlow() {
  return (
    <section className="w-full bg-wh-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-wh-text-soft mb-4">
            How it works
          </p>
          <h2 className="font-heading text-wh-text font-medium tracking-tight leading-[1.1] text-[clamp(1.75rem,4vw,2.75rem)]">
            Sognos connects everything into one flow
          </h2>
          <p className="mt-4 text-wh-text-muted text-base lg:text-lg leading-relaxed">
            Progress doesn't come from juggling systems. What you plan feeds directly into what gets scheduled. What gets scheduled is tracked as it happens.
          </p>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ icon: Icon, label, description }, i) => (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-wh-md border border-wh-border bg-wh-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-wh-sm border border-wh-border bg-wh-bg flex items-center justify-center shrink-0">
                  <Icon size={18} weight="regular" className="text-wh-text" />
                </div>
                <span className="text-xs font-semibold text-wh-text-soft">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-wh-text font-medium text-lg mb-2">
                  {label}
                </h3>
                <p className="text-wh-text-muted text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
