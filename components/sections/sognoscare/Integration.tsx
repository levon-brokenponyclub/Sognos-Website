import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SognoscareIntegration() {
  return (
    <section id="integration" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl bg-prussian-blue-950">
          <div className="grid lg:grid-cols-2">
            {/* Left — text */}
            <div className="px-10 py-14 lg:px-14 lg:py-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                Better together
              </p>
              <h2 className="mb-5 font-heading text-3xl font-normal text-white lg:text-4xl">
                SognosCare + SognosRoster
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/60">
                SognosCare manages the service — the case, the plan, the compliance
                record. SognosRoster coordinates the workforce that delivers it —
                scheduling, dispatch, and real-time optimisation.
              </p>
              <p className="mb-10 text-base leading-relaxed text-white/60">
                Together, they close the loop from intake to delivery to outcome —
                without the gaps that come from using disconnected systems.
              </p>
              <Link
                href="/products/sognosroster"
                className="group inline-flex items-center gap-2 text-sm font-medium text-(--sognos-accent) transition-colors duration-200 hover:text-white"
              >
                Explore SognosRoster
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right — flow diagram placeholder */}
            <div className="flex items-center justify-center border-l border-white/5 bg-prussian-blue-900/50 px-10 py-14 lg:px-14">
              <div className="flex flex-col items-center gap-3 text-center">
                {/* SognosCare node */}
                <div className="rounded-xl border border-(--sognos-edition-green)/30 bg-(--sognos-edition-green)/10 px-6 py-4">
                  <p className="text-sm font-semibold text-(--sognos-edition-green)">
                    SognosCare
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Case · Plan · Compliance
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-1 text-white/20">
                  <div className="h-6 w-px bg-white/10" />
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                    Hands off
                  </p>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  <div className="h-6 w-px bg-white/10" />
                </div>

                {/* SognosRoster node */}
                <div className="rounded-xl border border-(--sognos-accent)/30 bg-(--sognos-accent)/10 px-6 py-4">
                  <p className="text-sm font-semibold text-(--sognos-accent)">
                    SognosRoster
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Schedule · Dispatch · Optimise
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
