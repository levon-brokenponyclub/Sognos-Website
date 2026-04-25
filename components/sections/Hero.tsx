import Link from "next/link";
import { navCTA } from "@/lib/navigation";
import FlowCanvas from "@/components/ui/FlowCanvas";
import AnimatedButton from "@/components/ui/AnimatedButton";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string; href: string };
  secondaryCTA?: { name: string; href: string };
};

export default function Hero({
  headline = (
    <>
      Your entire service operation
      <br className="hidden sm:block" />
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(145deg, #1d8ded 0%, #52a9ff 100%)",
        }}
      >
        run on one intelligent platform.
      </span>
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = navCTA.primary,
  secondaryCTA = { name: "Talk to us", href: "#" },
}: HeroProps) {
  return (
    <section
      data-header-dark
      className="relative flex flex-col bg-gradient-hero overflow-hidden text-white min-h-[100vh] lg:h-157.5"
    >
      <FlowCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-25 pb-6 border-x border-white/10 border-dashed sm:px-8 sm:pt-27.5 sm:pb-20 lg:px-6 lg:pt-25 lg:pb-0">
        <div className="flex flex-1 flex-col justify-between gap-14 py-8 lg:py-8 mt-12">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className="text-4xl font-heading font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
              {headline}
            </h1>

            <p className="mt-6 max-w-5xl text-balance text-2xl text-white/80">
              {subtext}
            </p>

            <div className="mt-10 flex flex-row items-center justify-center gap-3">
              <AnimatedButton href={primaryCTA.href} variant="white">
                {primaryCTA.name}
              </AnimatedButton>
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-start justify-center rounded-md px-8 py-3 font-medium text-white border border-white/0 transition-colors hover:bg-white/10 hover:border-white/20"
              >
                {secondaryCTA.name}
              </Link>
            </div>
          </div>

          <div className="mx-auto flex w-full flex-row justify-between items-center gap-6">
            <div className="inline-flex items-center gap-5 rounded-full bg-prussian-blue-800/10 px-6 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                className="h-7 w-auto"
              />
              <div className="h-7 w-px bg-white/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Sognos-Solutions-Solutions-Partner.webp"
                alt="Microsoft Solutions Partner"
                className="h-8 w-auto"
              />
              <div className="h-9 w-px bg-white/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/copilot-logo.png"
                alt="Microsoft Copilot"
                className="h-9 w-auto"
              />
            </div>

            <div className="flex items-center divide-x divide-white/15">
              <div className="flex -space-x-2.5 pr-4">
                {[
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
                  "https://randomuser.me/api/portraits/men/75.jpg",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full border-2 border-white/20 object-cover"
                    style={{ zIndex: i + 1 }}
                  />
                ))}
              </div>

              <div className="pl-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#FACC15"
                      aria-hidden="true"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-white">
                    4.9
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-white/50">
                  Rated by operations leaders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
