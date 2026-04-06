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
    <section className="relative flex flex-col bg-gradient-hero overflow-hidden text-white border-10 border-b-0 rounded-2xl border-white h-[90vh]">
      <FlowCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-2 py-30 border-x border-white/10 border-dashed sm:px-12 lg:px-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-0 items-stretch flex-1">
          {/* Col 1 — headline, subtext, CTAs */}
          <div className="flex flex-col justify-center">
            <h1 className="text-h1 font-heading font-normal leading-heading tracking-heading text-white sm:text-6xl lg:text-5xl">
              {headline}
            </h1>

            <p className="mt-6 max-w-4/5 text-base text-white/80 sm:text-xl">
              {subtext}
            </p>

            <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
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

          {/* Col 2 — two equal-height rows */}
          <div className="flex flex-col gap-0">
            {/* Row 1 */}
            <div className="flex-1 p-8 flex flex-col justify-between hero-standblock">
              {/*<h3 className="text-lg font-semibold text-white">
                Placeholder heading one
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Supporting copy for this card. Describe the key benefit or
                feature in one or two concise sentences.
              </p>*/}
            </div>

            {/* Row 2 */}
            <div className="flex-1 p-8 flex flex-col justify-end">
              <h3 className="text-lg font-semibold text-white">
                Placeholder heading two
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Supporting copy for this card. Describe the key benefit or
                feature in one or two concise sentences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
