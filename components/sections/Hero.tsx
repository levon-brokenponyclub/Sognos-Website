import Link from "next/link";
import { navCTA } from "@/lib/navigation";
import FlowCanvas from "@/components/ui/FlowCanvas";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string; href: string };
  secondaryCTA?: { name: string; href: string };
};

export default function Hero({
  headline = (
    <>
      Run your entire service operation
      <br className="hidden sm:block" />
      on one intelligent platform.
    </>
  ),
  subtext = "Built for regulated industries who need to spend less time on admin and more time on outcomes.",
  primaryCTA = navCTA.primary,
  secondaryCTA = { name: "View platform", href: "#" },
}: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center p-0 overflow-hidden text-neutral-200 antialiased relative bg-white">
      {/* Particle canvas background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <FlowCanvas />
      </div>

      {/* Gradient border wrapper */}
      <div
        className="relative z-10 w-full mx-auto"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.05) 100%)",
        }}
      >
        {/* Main card */}
        <div className="rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] relative">
          {/* Corner markers */}
          <div className="hidden lg:block absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 z-20 pointer-events-none" />
          <div className="hidden lg:block absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 z-20 pointer-events-none" />
          <div className="hidden lg:block absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 z-20 pointer-events-none" />
          <div className="hidden lg:block absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 z-20 pointer-events-none" />

          {/* Left panel — headline, copy, CTAs */}
          <div className="lg:col-span-7 bg-white text-neutral-900 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Architectural grid lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/10 -translate-x-1/2 z-0 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-black/10 -translate-y-1/2 z-0 pointer-events-none" />
            <div className="absolute top-[60%] left-1/2 w-[110%] aspect-square rounded-full border border-black/10 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
            <div className="absolute top-[60%] left-1/2 w-[200%] h-[1px] bg-black/10 -translate-x-1/2 -translate-y-1/2 rotate-[35deg] z-0 origin-center pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Top label */}
              <div className="text-xs font-medium tracking-widest uppercase text-neutral-400">
                Sognos Platform
              </div>

              {/* Centre — headline */}
              <div className="my-auto py-12 lg:py-16">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none font-light text-black">
                  {headline}
                </h1>
                <p className="mt-6 text-base text-neutral-500 sm:text-xl max-w-xl font-light">
                  {subtext}
                </p>
                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                  <Link
                    href={primaryCTA.href}
                    className="inline-flex items-center justify-center rounded-md bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    {primaryCTA.name}
                  </Link>
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center justify-center rounded-md border border-black/20 px-8 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5"
                  >
                    {secondaryCTA.name}
                  </Link>
                </div>
              </div>

              {/* Bottom rule */}
              <div className="flex items-center gap-4 border-t border-black/10 pt-6 w-full max-w-md">
                <div className="w-8 h-[2px] bg-black/20" />
                <span className="text-xs font-medium tracking-widest uppercase text-neutral-400">
                  AI-Powered Service Operations
                </span>
              </div>
            </div>
          </div>

          {/* Right column — stat panels */}
          <div className="lg:col-span-5 flex flex-col border-t border-white/5 lg:border-t-0 lg:border-l border-black/20">
            {/* Top panel — SognosCare */}
            <div
              className="flex-1 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group transition-colors duration-500"
              style={{ background: "var(--sognos-edition-teal)" }}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

              <div className="relative z-10 mt-auto mb-12 lg:mb-20">
                <div className="text-8xl lg:text-9xl font-medium tracking-tighter leading-none mb-1 text-black">
                  100<span className="text-4xl lg:text-5xl">%</span>
                </div>
                <div className="text-lg lg:text-xl font-normal tracking-tight text-black/80">
                  Compliance Assured
                </div>
              </div>

              <div className="relative z-10 border-t border-black/20 pt-6 flex justify-between items-center mt-auto">
                <span className="text-xs font-medium tracking-widest uppercase text-black/60">
                  SognosCare Core
                </span>
              </div>
            </div>

            {/* Bottom panel — SognosRoster */}
            <div
              className="flex-1 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group transition-colors duration-500 border-t border-white/10"
              style={{ background: "var(--sognos-brand)" }}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

              <div className="relative z-10 mt-auto mb-12 lg:mb-20">
                <div className="text-8xl lg:text-9xl font-medium tracking-tighter leading-none mb-1 text-white">
                  24
                  <span className="text-4xl lg:text-5xl text-white/60">/7</span>
                </div>
                <div className="text-lg lg:text-xl font-normal tracking-tight text-white/80">
                  Optimised Scheduling
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6 flex justify-between items-center mt-auto">
                <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                  SognosRoster Core
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
