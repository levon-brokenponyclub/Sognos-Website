"use client";

import Link from "next/link";
import { navCTA } from "@/lib/navigation";
import FlowCanvas from "@/components/ui/FlowCanvas";
import { motion, Variants } from "framer-motion";

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
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-4 py-32 lg:p-12 overflow-hidden text-neutral-200 antialiased relative">
      <div className="absolute inset-0 z-0 opacity-40">
        <FlowCanvas />
      </div>

      <div
        className="relative z-10 w-full max-w-[1400px] rounded-xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.05) 100%)",
        }}
      >
        {/* Main Widescreen Card */}
        <div
          className="bg-brand/90 backdrop-blur-2xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] relative"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)" }}
        >
          {/* Corner Markers */}
          <div className="hidden lg:block absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 z-20 pointer-events-none"></div>
          <div className="hidden lg:block absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 z-20 pointer-events-none"></div>
          <div className="hidden lg:block absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 z-20 pointer-events-none"></div>
          <div className="hidden lg:block absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 z-20 pointer-events-none"></div>

          {/* Left Panel */}
          <div className="lg:col-span-7 bg-[#E5E7EB]/5 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Architectural Grid Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 -translate-x-1/2 z-0"></div>
            <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-white/5 -translate-y-1/2 z-0"></div>
            <div className="absolute top-[60%] left-1/2 w-[110%] aspect-square rounded-full border border-white/5 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
            <div className="absolute top-[60%] left-1/2 w-[200%] h-[1px] bg-white/5 -translate-x-1/2 -translate-y-1/2 rotate-[35deg] z-0 origin-center pointer-events-none"></div>

            {/* Content Wrapper Z-10 */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Top Left Logo/Id */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-xs font-medium tracking-widest uppercase text-white/50"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                SYS V.880
              </motion.div>

              {/* Center Huge Typography */}
              <div className="my-auto py-12 lg:py-16">
                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none font-light text-white flex flex-col"
                >
                  {headline}
                </motion.h1>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-base text-white/60 sm:text-xl max-w-xl font-light"
                >
                  {subtext}
                </motion.p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex flex-col items-start justify-start gap-4 sm:flex-row"
                >
                  <Link
                    href={primaryCTA.href}
                    className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white text-center"
                  >
                    {primaryCTA.name}
                  </Link>
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center justify-center rounded-md border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 text-center"
                  >
                    {secondaryCTA.name}
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Left Footer */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-8 hidden sm:flex"
              >
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 w-full max-w-md">
                  <div className="w-8 h-[2px] bg-accent"></div>
                  <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                    PLATFORM READINESS
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column Panels */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/5 lg:divide-y-0 lg:divide-x-0 border-t border-white/5 lg:border-t-0 lg:border-l border-white/10 bg-[#0A0A0C]/50 backdrop-blur-md">
            {/* Top Right Panel (Accent Color) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex-1 bg-accent/10 border-b border-accent/20 text-white p-8 lg:p-12 relative flex flex-col justify-between group overflow-hidden transition-colors duration-500 hover:bg-accent/20"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
              <div className="relative z-10 flex justify-end">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-accent"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="relative z-10 mt-12 mb-12 lg:mt-auto lg:mb-20">
                <div className="text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tighter leading-none mb-2 text-accent">
                  100<span className="text-4xl xl:text-5xl">%</span>
                </div>
                <div className="text-lg lg:text-xl font-normal tracking-tight opacity-90 text-white/90">
                  Compliance Assured
                </div>
              </div>
              <div className="relative z-10 border-t border-white/10 pt-6 flex justify-between items-center mt-auto">
                <span className="text-xs font-medium tracking-widest uppercase opacity-80 text-white/50">
                  SognosCare Core
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/50 group-hover:text-accent group-hover:translate-x-2 transition-transform duration-300"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom Right Panel (Dark) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex-1 bg-[#16181D]/80 text-white p-8 lg:p-12 relative flex flex-col justify-between group overflow-hidden transition-colors duration-500 hover:bg-[#1C1F26]"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
              <div className="relative z-10 flex justify-end">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/40 group-hover:text-white transition-colors duration-300"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              <div className="relative z-10 mt-12 mb-12 lg:mt-auto lg:mb-20">
                <div className="text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tighter leading-none mb-2 text-white">
                  24
                  <span className="text-4xl xl:text-5xl text-white/60">/7</span>
                </div>
                <div className="text-lg lg:text-xl font-normal tracking-tight text-white/80">
                  Optimised Scheduling
                </div>
              </div>
              <div className="relative z-10 border-t border-white/10 pt-6 flex justify-between items-center mt-auto">
                <span className="text-xs font-medium tracking-widest uppercase text-white/50">
                  SognosRoster Core
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/50 group-hover:text-white group-hover:translate-x-2 transition-transform duration-300"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
