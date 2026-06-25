"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui/AnimatedButton";
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
    <section className="relative overflow-hidden bg-sognos-navy-dark pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1128px] font-heading font-normal text-white text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.02] -tracking-[1.2px] text-balance"
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
          <AnimatedButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
            variant="white"
          >
            {primaryCTA.name}
          </AnimatedButton>
          <Link
            href={secondaryCTA.href}
            className="inline-flex w-fit items-center justify-center border-b border-white/30 pb-1.5 text-base font-medium text-white/70 transition-colors hover:border-white hover:text-white"
          >
            {secondaryCTA.name}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
