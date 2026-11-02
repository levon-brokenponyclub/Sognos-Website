import Image from "next/image";
import Link from "next/link";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Home · CTA band — option E2 "Platform orbit" (docs/mockups/home/
// cta-options.html, after 21st.dev ruixen.ui stack-feature-section),
// 2026-11-02: a full-width navy band, no outer section padding. Copy
// left; on the right the Microsoft platform Sognos is built on orbits a
// Sognos hub in three dotted rings that run off the band. Flat white chips
// with a white/10 edge (no shadows). Rings turn slowly (`.cta-orbit-*` in
// globals.css), alternating direction, logos upright; still under reduced
// motion.

const PLATFORM = [
  { name: "Dynamics 365", logo: "/logos/Dynamics365.svg" },
  { name: "Microsoft Copilot", logo: "/logos/copilot-logo.svg" },
  { name: "Power BI", logo: "/logos/platform/PowerBI_scalable.svg" },
  { name: "Power Apps", logo: "/logos/platform/PowerApps_scalable.svg" },
  { name: "Power Automate", logo: "/logos/platform/PowerAutomate_scalable.svg" },
  { name: "Power Pages", logo: "/logos/platform/PowerPages_scalable.svg" },
  { name: "Dataverse", logo: "/logos/platform/Dataverse_scalable.svg" },
  { name: "Power Platform", logo: "/logos/PowerPlatform_scalable.svg" },
  { name: "Microsoft", logo: "/logos/Microsoft-icon-logo.svg" },
] as const;

// Radius, chip count, seconds per turn, chip size (px).
const RINGS = [
  { radius: 170, count: 4, seconds: 90, size: 60 },
  { radius: 290, count: 6, seconds: 120, size: 64 },
  { radius: 410, count: 8, seconds: 150, size: 72 },
] as const;

// Chip positions around each ring, the platform list repeated to fill them.
let next = 0;
const ORBIT = RINGS.map((ring, ri) => ({
  ...ring,
  reverse: ri % 2 === 1,
  chips: Array.from({ length: ring.count }, (_, j) => {
    const angle = (2 * Math.PI * j) / ring.count + ri * 0.4;
    return {
      ...PLATFORM[next++ % PLATFORM.length],
      key: `${ri}-${j}`,
      x: ring.radius * Math.cos(angle) - ring.size / 2,
      y: ring.radius * Math.sin(angle) - ring.size / 2,
    };
  }),
}));

const VIEW = 460; // half the rings' SVG box

function Orbit() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-1/2 right-24 origin-top-left max-lg:scale-[0.62] lg:right-[120px]"
    >
      <svg
        className="absolute"
        style={{ left: -VIEW, top: -VIEW }}
        width={VIEW * 2}
        height={VIEW * 2}
        viewBox={`${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}`}
      >
        {RINGS.map((r) => (
          <circle
            key={r.radius}
            r={r.radius}
            fill="none"
            stroke="rgb(255 255 255 / 0.28)"
            strokeWidth={1.5}
            strokeDasharray="2 7"
            strokeLinecap="round"
          />
        ))}
      </svg>
      {ORBIT.map((ring) => (
        <div
          key={ring.radius}
          className="cta-orbit-ring absolute top-0 left-0"
          style={{
            animationDuration: `${ring.seconds}s`,
            animationDirection: ring.reverse ? "reverse" : "normal",
          }}
        >
          {ring.chips.map((chip) => (
            <span
              key={chip.key}
              className="cta-orbit-chip absolute flex items-center justify-center rounded-full border border-white/10 bg-white"
              style={{
                width: ring.size,
                height: ring.size,
                left: chip.x,
                top: chip.y,
                animationDuration: `${ring.seconds}s`,
                // Opposite of the ring, so the logo stays upright.
                animationDirection: ring.reverse ? "normal" : "reverse",
              }}
            >
              <Image
                src={chip.logo}
                alt=""
                width={40}
                height={40}
                className="h-auto w-[55%]"
              />
            </span>
          ))}
        </div>
      ))}
      <span className="absolute -top-22 -left-22 flex size-44 items-center justify-center rounded-full border border-white/10 bg-white">
        <Image src="/logos/sognos-logo.svg" alt="" width={112} height={29} className="h-7 w-auto" />
      </span>
    </div>
  );
}

export default function HomeCtaBand() {
  return (
    <section
      aria-labelledby="home-cta-heading"
      className="relative overflow-hidden bg-sognos-navy text-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 md:py-24 lg:col-span-7">
          <h2
            id="home-cta-heading"
            className={`${TYPE.h2} text-white`}
          >
            <span className="block">Stop managing complexity.</span>
            <span className="block">Start delivering outcomes.</span>
          </h2>
          <p className={`mt-4 ${TYPE.lede} text-white/75`}>
            A 30-minute walkthrough with a Sognos specialist, on your own
            service model. Built on the Microsoft platform you already trust.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* Hover/press pass (emil-design-eng, 2026-11-02): colour on a
                short ease, the press scale on its own 160ms ease-out so it
                answers the finger at once; Tailwind v4 already gates `hover:`
                to hover-capable pointers. */}
            <SolutionHeroDemoButton className="min-h-12 bg-white px-7 py-0 text-sognos-heading transition-[background-color,color,scale] duration-[200ms,200ms,160ms] ease-[cubic-bezier(.23,1,.32,1)] hover:bg-sognos-blue-accent hover:text-white hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[.97] motion-reduce:active:scale-100" />
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:opacity-80 active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Talk to Sales
              {/* The arrow leans the way it points on hover. */}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0"
              >
                &#8599;
              </span>
            </Link>
          </div>
        </div>
        <div className="relative h-[340px] max-lg:overflow-hidden lg:col-span-5 lg:h-auto">
          <Orbit />
        </div>
      </div>
    </section>
  );
}
