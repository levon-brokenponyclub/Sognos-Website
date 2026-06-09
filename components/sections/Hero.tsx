"use client";

import Image from "next/image";
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

// Cohere Home slot: "Own your AI" hero — centered, staggered fade-up, solid pill + underlined link.
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
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(145deg, #4aa6ff 0%, #9bcaff 100%)",
        }}
      >
        run on one intelligent platform.
      </span>
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = { name: "Book a Demo" },
  secondaryCTA = { name: "Explore products", href: "/products" },
}: HeroProps) {
  const { openModal } = useBookDemo();

  return (
    <section
      data-header-dark
      className="relative isolate flex items-center overflow-hidden bg-prussian-blue-900 text-white"
      style={{
        minHeight:
          "max(560px, min(760px, calc(100dvh - var(--news-banner-height, 0px) - 90px)))",
      }}
    >
      <Image
        src="/images/herobg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 text-center md:py-40 lg:px-10">
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1128px] font-heading font-normal text-white text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.02] -tracking-[1.2px] text-balance"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.15)" }}
        >
          {headline}
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-[655px] text-lg leading-[1.5] text-white/80 max-md:text-base"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.1)" }}
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
            className="inline-flex w-fit items-center justify-center border-b border-white/40 pb-1.5 text-base font-medium text-white transition-colors hover:border-white"
          >
            {secondaryCTA.name}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
