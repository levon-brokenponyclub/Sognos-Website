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
    <section className="relative flex flex-col bg-gradient-brand overflow-hidden text-white border-10 border-b-0 rounded-2xl border-white">
      <FlowCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-30 border-x border-white/10 border-dashed sm:px-12 lg:px-16 lg:py-48">
        {/* Vertically centred content */}
        <div className="flex flex-1 flex-col">
          <div className="max-w-2xl">
            <h1 className="text-h1 font-heading font-normal leading-heading tracking-heading text-white sm:text-6xl lg:text-5xl">
              {headline}
            </h1>

            <p className="mt-6 text-base text-white/60 sm:text-xl">{subtext}</p>

            <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
              <Link
                href={primaryCTA.href}
                className="inline-flex items-start justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-neutral-100"
              >
                {primaryCTA.name}
              </Link>
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-start justify-center rounded-md border border-white/80 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {secondaryCTA.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
