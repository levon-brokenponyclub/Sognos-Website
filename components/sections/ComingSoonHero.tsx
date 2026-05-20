import Image from "next/image";
import FlowCanvas from "@/components/ui/FlowCanvas";

export default function ComingSoonHero() {
  return (
    <section className="relative flex flex-col bg-white overflow-hidden text-white h-[100svh] lg:h-[100vh] p-2">
      <div className="bg-gradient-hero h-full overflow-hidden text-white rounded-2xl relative">
        <FlowCanvas
          colors={[
            "rgba(150, 206, 254, 0.45)",
            "rgba(29, 150, 252, 0.5)",
            "rgba(15, 80, 135, 0.55)",
          ]}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 30% 0%, #1d96fc 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-8 lg:px-6">
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-2 lg:px-0">
              <Image
                src="/logos/sognos-logo.svg"
                alt="Sognos"
                width={220}
                height={57}
                priority
                className="mb-14 h-10 w-auto lg:h-13 brightness-0 invert"
              />
              <h1 className="text-3xl font-heading font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
                Something exciting coming soon!
              </h1>
              <p className="mt-6 max-w-5xl text-balance text-lg text-white/80 lg:text-[22px]">
                Allocate the right people, at the right time, to the right
                services — automatically. Putting real-time optimisation in the
                hands of your operations team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
