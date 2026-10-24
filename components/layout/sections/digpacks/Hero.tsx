"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

const HEADLINE = "Proven in UK healthcare. Shaped for Australia and New Zealand.";
const SUBTEXT =
  "Sognos is partnering with DigPacks to bring Microsoft-based applications, automation and AI capabilities from the NHS and public sector to health, social and community care organisations across Australia and New Zealand.";

export default function DigPacksHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { openModal } = useBookDemo();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], prefersReducedMotion ? [1, 1] : [1, 0]);

  return (
    <section
      ref={heroRef}
      data-header-dark
      className="relative overflow-hidden bg-sognos-digpacks-dark"
    >
      <motion.div style={{ y, opacity }} className="will-change-transform">
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-0 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
            DigPacks × Sognos
          </p>

          <h1 className="mx-auto mt-4 max-w-5xl font-heading font-normal text-white leading-14 text-5xl tracking-tight text-balance lg:text-6xl lg:leading-20">
            {HEADLINE}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            {SUBTEXT}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal("digpacks")}
              className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-digpacks-dark transition-opacity hover:opacity-90"
            >
              Book a Demo
            </button>
            <Link
              href="#solutions"
              className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
            >
              Explore the solutions
              <span aria-hidden="true">&#8595;</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-6">
          <div className="relative grid aspect-[2.4/1] w-full overflow-hidden rounded-lg bg-sognos-digpacks-gradient md:grid-cols-[1fr_auto]">
            {/* Partner lockup */}
            <div className="flex flex-col items-center justify-center gap-5 px-6">
              <Image
                src="/images/digpacks/digpacks-logo-white.webp"
                alt="DigPacks"
                width={1470}
                height={353}
                priority
                className="h-10 w-auto sm:h-12 lg:h-14"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                in partnership with
              </span>
              <Image
                src="/logos/sognos-logo.svg"
                alt="Sognos"
                width={110}
                height={30}
                className="h-7 w-auto brightness-0 invert sm:h-8 lg:h-10"
              />
            </div>
            <div className="relative hidden aspect-[4/5] h-full md:block">
              <Image
                src="/images/digpacks/nurse.png"
                alt="Healthcare worker using a tablet"
                fill
                sizes="(max-width: 1152px) 40vw, 380px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
