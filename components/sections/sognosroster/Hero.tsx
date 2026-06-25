import Image from "next/image";
import Link from "next/link";

const HEADLINE = "The right worker - for every job - in real time.";
const SUBTEXT =
  "Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team.";

export default function SognosRosterHero() {
  return (
    <section
      data-header-dark
      className="relative overflow-hidden bg-sognos-roster-dark"
    >
      <div className="mx-auto max-w-7xl px-6 pt-40 pb-0 text-center lg:px-10">
        {/* Eyebrow */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.08em]"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          SognosRoster
        </p>

        {/* Headline */}
        <h1
          className="mx-auto mt-6 max-w-[1100px] font-heading text-balance text-white text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em]"
        >
          {HEADLINE}
        </h1>

        {/* Subtext */}
        <p
          className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {SUBTEXT}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Book a Demo — UNWIRED for now (no onClick) */}
          <button
            type="button"
            className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-[#0A1629] transition-opacity hover:opacity-90"
          >
            Book a Demo
          </button>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
          >
            Learn More
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </div>

      {/* Placeholder visual — bleeds off the bottom like Embed's product image. */}
      <div className="mx-auto mt-16 max-w-6xl px-6 lg:px-10">
        <div className="relative aspect-[2.4/1] w-full overflow-hidden rounded-t-2xl bg-sognos-roster-gradient">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logos/sognos-roster-logo.svg"
              alt="SognosRoster"
              width={220}
              height={48}
              priority
              className="h-12 w-auto sm:h-14 lg:h-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
