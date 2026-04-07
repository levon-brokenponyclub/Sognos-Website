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
      <span className="text-accent">on one intelligent platform.</span>
    </>
  ),
  subtext = "Built for regulated industries who need to spend less time on admin and more time on outcomes.",
  primaryCTA = navCTA.primary,
  secondaryCTA = { name: "View platform", href: "#" },
}: HeroProps) {
  return (
    <section className="relative flex flex-col bg-gradient-hero overflow-hidden text-white border-10 border-b-0 rounded-2xl border-white min-h-[80vh] lg:h-[90vh]">
      <FlowCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-16 border-x border-white/10 border-dashed sm:px-8 sm:py-20 lg:px-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-0 items-stretch flex-1">
          {/* Col 1 — headline, subtext, CTAs */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl text-center font-heading font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-left lg:text-5xl">
              {headline}
            </h1>

            <p className="mt-6 text-base text-white/80 text-center sm:text-lg lg:text-left lg:max-w-4/5">
              {subtext}
            </p>

            <div className="mt-8 flex flex-row items-center justify-center gap-3 lg:justify-start">
              <Link
                href={primaryCTA.href}
                className="inline-flex items-start justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-neutral-100"
              >
                {primaryCTA.name}
              </Link>
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-start justify-center rounded-md px-8 py-3 text-sm font-medium text-white border border-white/0 transition-colors hover:bg-accent hover:border-accent"
              >
                {secondaryCTA.name}
              </Link>
            </div>
          </div>

          {/* Col 2 — social proof */}
          <div className="flex flex-col">
            {/* Social proof */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6 lg:items-start lg:justify-end lg:p-8">

              {/* Stat */}
              <div>
                <p className="text-3xl font-heading font-semibold tracking-tight text-white">1,100+</p>
                <p className="text-sm text-white/50 mt-1 leading-snug">workers coordinated daily across active deployments</p>
              </div>

              <div className="h-px bg-white/10" />

              {/* Avatars + rating */}
              <div className="flex items-center divide-x divide-white/15">
                {/* Avatar stack */}
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

                {/* Stars + label */}
                <div className="pl-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" aria-hidden="true">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                      </svg>
                    ))}
                    <span className="ml-1.5 text-sm font-semibold text-white">4.9</span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/50">Rated by operations leaders</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
