import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function GenogramHero() {
  return (
    <section
      data-header-dark
      className="relative overflow-hidden bg-prussian-blue-950 pb-24 pt-36"
    >
      {/* Purple radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 0%, #92278d 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#92278d]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Sognos Genogram
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
              Understand the people behind every case
            </h1>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/60">
              Map family structures, support networks, and relationship histories
              directly into case records — so every worker has the context they
              need, from the moment they open a file.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton href="/contact" variant="white">
                Book a Demo
              </AnimatedButton>
              <AnimatedButton href="#features" variant="transparent">
                See capabilities →
              </AnimatedButton>
            </div>
          </div>

          {/* Logo lockup */}
          <div className="flex items-center justify-center lg:justify-end">
            <div
              className="flex items-center justify-center rounded-2xl border border-[#92278d]/30 bg-[#92278d]/10 p-12"
            >
              <Image
                src="/logos/SognosGenogram-logo.svg"
                alt="Sognos Genogram"
                width={240}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
