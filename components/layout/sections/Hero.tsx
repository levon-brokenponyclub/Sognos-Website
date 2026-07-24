"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string };
  secondaryCTA?: { name: string; href: string };
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero({
  headline = (
    <>
      Your entire service operation,
      <br />
      run on one intelligent platform.
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = { name: "Book a Demo" },
  secondaryCTA = { name: "Explore products", href: "/products" },
}: HeroProps) {
  const { openModal } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-sognos-navy pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6 text-left lg:text-center">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1128px] font-heading font-normal text-white text-5xl tracking-tight text-balance lg:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-[655px] text-lg leading-[1.5] text-white/70 max-md:text-base"
        >
          {subtext}
        </motion.p>
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Book a Demo — matches SognosCare hero pill */}
          <button
            type="button"
            onClick={() => openModal()}
            className="rounded-sm bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-all duration-300 hover:bg-sognos-blue-accent hover:text-white"
          >
            {primaryCTA.name}
          </button>
          <Link
            href={secondaryCTA.href}
            className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
          >
            {secondaryCTA.name}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
