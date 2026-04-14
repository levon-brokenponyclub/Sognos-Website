import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function SognoscareRosterHero() {
  return (
    <section
      data-header-dark
      className="relative bg-prussian-blue-950 pt-36 pb-28 overflow-hidden"
    >
      {/* Subtle radial glow — shifted right to differentiate from SognosCare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, var(--color-cornflower-ocean-900) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-(--sognos-accent)" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              SognosRoster
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
            Workforce scheduling built for complex service operations
          </h1>

          {/* Value prop */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/60">
            Allocate the right people, at the right time, to the right services —
            automatically. SognosRoster removes the manual effort from rostering and
            puts real-time optimisation in the hands of your operations team.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <AnimatedButton href="/contact" variant="white">
              Book a Demo
            </AnimatedButton>
            <Link
              href="#features"
              className="text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
            >
              See capabilities →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
