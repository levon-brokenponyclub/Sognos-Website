import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SognoscareRosterIntegration() {
  return (
    <section id="integration" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-lg bg-sognos-navy">
          <div className="grid lg:grid-cols-2">
            {/* Left - text */}
            <div className="px-10 py-14 lg:px-14 lg:py-16">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 pl-4 pr-5 py-1 text-sm text-white font-medium mb-6">
                <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                Better together
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight mb-6">
                SognosRoster + SognosCare
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/60">
                SognosRoster schedules and dispatches the workforce. SognosCare
                manages the case, the plan, and the compliance record for every
                service they deliver.
              </p>
              <p className="mb-10 text-base leading-relaxed text-white/60">
                Together, they close the loop from workforce allocation to
                service outcome - without the handoff gaps that come from
                disconnected systems.
              </p>
              <Link
                href="/products/sognoscare"
                className="group inline-flex items-center gap-2 text-sm font-medium text-(--sognos-edition-green) transition-colors duration-200 hover:text-white"
              >
                Explore SognosCare
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right - flow diagram */}
            <div className="flex items-center justify-center border-l border-white/5 bg-sognos-navy/50 px-10 py-14 lg:px-14">
              <div className="flex flex-col items-center gap-3 text-center">
                {/* SognosRoster node */}
                <div className="rounded-xl border border-sognos-blue-accent/30 bg-sognos-blue-accent/10 px-6 py-4">
                  <p className="text-sm font-semibold text-sognos-blue-accent">
                    SognosRoster
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Schedule · Dispatch · Optimise
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-1">
                  <div className="h-6 w-px bg-white/10" />
                  <svg
                    className="h-4 w-4 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 pl-4 pr-5 py-1 text-sm text-white font-medium mb-6">
                    <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                    Delivers to
                  </div>
                  <svg
                    className="h-4 w-4 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <div className="h-6 w-px bg-white/10" />
                </div>

                {/* SognosCare node */}
                <div className="rounded-xl border border-(--sognos-edition-green)/30 bg-(--sognos-edition-green)/10 px-6 py-4">
                  <p className="text-sm font-semibold text-(--sognos-edition-green)">
                    SognosCare
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Case · Plan · Compliance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
