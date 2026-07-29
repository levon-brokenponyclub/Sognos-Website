import type { Metadata } from "next";
import Link from "next/link";
import LifeAtSognos from "@/components/layout/sections/LifeAtSognos";
import OpenRoles from "@/components/layout/sections/OpenRoles";
import AboutHeroImage from "@/components/layout/sections/AboutHeroImage";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

export const metadata: Metadata = {
  title: "Careers | Sognos",
  description:
    "Join a community of passionate individuals driving innovation in service operations. Explore opportunities at Sognos.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    title: "Collaborative culture",
    body: "High-trust teams that share knowledge freely across disciplines.",
  },
  {
    title: "Continuous learning",
    body: "Grow your Microsoft Dynamics 365 expertise with real, complex engagements.",
  },
  {
    title: "Work-life balance",
    body: "Flexibility to do your best work while still making time for what matters.",
  },
  {
    title: "Equal opportunity",
    body: "We welcome people of all backgrounds, identities, and abilities.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <AnimatedEyebrow
                dotClassName="bg-sognos-blue-accent"
                textClassName="text-sognos-muted"
              >
                Careers
              </AnimatedEyebrow>
              <h1 className="mt-5 font-heading font-normal text-sognos-header text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
                Join Sognos to drive innovation together.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-sognos-body">
                We&apos;re not just a company - we&apos;re a community of passionate
                individuals committed to driving innovation and creating
                positive change.
              </p>
            </div>
            <div className="flex lg:col-span-5 lg:justify-end">
              <Link
                href="#positions"
                className="inline-flex items-center justify-center rounded-full bg-sognos-navy px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
              >
                Open Positions
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-20">
          <AboutHeroImage />
        </div>
      </section>

      {/* Our People - Our Planet */}
      <section className="w-full bg-sognos-navy-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div className="text-white lg:sticky lg:top-32 lg:self-start">
              <h2 className="font-heading text-5xl font-normal leading-[1.05] tracking-tight text-white text-balance lg:text-4xl">
                Drive innovation together.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
                We&apos;re a community of passionate individuals committed to
                driving innovation and creating positive change. If you thrive
                in a collaborative, high-trust environment and want your work
                to matter, Sognos is built for you.
              </p>
              <Link
                href="#positions"
                className="mt-8 inline-flex items-center justify-center rounded bg-sognos-blue-accent px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
              >
                Meet our leadership team
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex min-h-[255px] flex-col rounded-lg bg-white/[0.055] p-8 text-white sm:min-h-[300px]"
                >
                  <p className="font-mono text-base leading-relaxed tracking-tight text-sognos-blue-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-auto max-w-md">
                    <h3 className="font-heading text-xl font-medium leading-tight tracking-tight text-white lg:text-2xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/65 md:text-lg">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Life at Sognos - testimonial bento grid */}
      <LifeAtSognos />

      {/* Open roles */}
      <OpenRoles />

      {/* Equal opportunity */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-16">
          <p className="text-sm text-sognos-muted max-w-2xl leading-relaxed">
            At Sognos we strive to create an environment of equal opportunity
            regardless of race, gender, sexual orientation, gender identity or
            expression, lifestyle, age, religion, or physical ability.
          </p>
        </div>
      </section>
    </main>
  );
}
