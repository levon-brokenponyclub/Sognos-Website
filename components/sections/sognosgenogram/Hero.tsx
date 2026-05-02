import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";
import FlowCanvas from "@/components/ui/FlowCanvas";

export default function GenogramHero() {
  return (
    <section
      data-header-dark
      className="relative flex flex-col bg-white overflow-hidden text-white h-[100svh] lg:h-[100vh] p-2"
    >
      <div className="bg-gradient-hero h-full overflow-hidden text-white rounded-2xl relative">
        <FlowCanvas
          colors={[
            "rgba(212, 158, 209, 0.45)",
            "rgba(146, 39, 141, 0.5)",
            "rgba(82, 22, 79, 0.55)",
          ]}
        />

        {/* Purple radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 30% 0%, #92278d 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-8 lg:px-6">
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-2 lg:px-0">
              <Image
                src="/logos/SognosGenogram-logo.svg"
                alt="Sognos Genogram"
                width={220}
                height={48}
                priority
                className="mb-14 h-10 w-auto lg:h-13"
              />
              <h1 className="text-3xl font-heading font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
                Family context. Built into every record.
              </h1>
              <p className="mt-6 max-w-5xl text-balance text-lg text-white/80 lg:text-[22px]">
                Manage cases, track service delivery, meet compliance
                obligations, and report with confidence — in one platform built
                end-to-end for care.
              </p>
            </div>
          </div>

          {/* Bottom bar — hidden, replaced by ProductDrawer */}
          <div className="hidden relative z-10 pb-4 lg:pb-0">
            <div className="relative bg-white max-w-6xl flex justify-between items-center gap-14 mx-auto rounded-t-md px-8 py-7 pb-5">
              <div className="flex flex-col gap-2 max-w-xl">
                <h2 className="text-left font-heading text-2xl md:text-[22px] font-medium tracking-normal text-prussian-blue-800">
                  What SognosGenogram Solves
                </h2>
                <p className="text-left text-base text-prussian-blue-800/75 text-balance">
                  Standard case management captures what happened. Sognos
                  Genogram captures who is involved, and what that means for
                  service delivery.
                </p>
              </div>

              <div className="flex flex-row gap-2">
                <AnimatedButton href="/contact">Book a Demo</AnimatedButton>
                <Link
                  href="#features"
                  className="inline-flex items-start justify-center rounded-md px-8 py-3 font-medium text-prussian-blue-800 border border-white/0 transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  See capabilities
                </Link>
              </div>

              {/* Concave curve transitions */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -left-[20px] h-[20px] w-[20px] bg-white"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 0% 0%, transparent 19px, black 20px)",
                  maskImage:
                    "radial-gradient(circle at 0% 0%, transparent 19px, black 20px)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -right-[20px] h-[20px] w-[20px] bg-white"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 100% 0%, transparent 19px, black 20px)",
                  maskImage:
                    "radial-gradient(circle at 100% 0%, transparent 19px, black 20px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
