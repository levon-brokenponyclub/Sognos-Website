"use client";

import Image from "next/image";
import {
  BarChart3,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Landmark,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const verticalLines = Array.from({ length: 21 }, (_, index) => index + 2);
const horizontalLines = Array.from({ length: 9 }, (_, index) => index + 2);

const tiles = [
  {
    label: "Care teams",
    icon: UsersRound,
    className:
      "col-span-2 col-start-1 row-span-2 row-start-1 md:col-span-4 md:col-start-1 md:row-span-4 md:row-start-1 bg-sognos-about-blue-light text-sognos-navy",
    initial: { x: -32, y: -24 },
  },
  {
    label: "Field service",
    icon: BriefcaseBusiness,
    className:
      "col-span-2 col-start-6 row-span-2 row-start-5 md:col-span-4 md:col-start-7 md:row-span-4 md:row-start-2 bg-sognos-navy text-white",
    initial: { y: 32 },
  },
  {
    label: "Connected operations",
    icon: ChartNoAxesCombined,
    className:
      "col-span-2 col-start-5 row-span-2 row-start-9 md:col-span-4 md:col-start-16 md:row-span-4 md:row-start-1 bg-sognos-about-purple-light text-sognos-navy",
    initial: { x: 32, y: -24 },
  },
  {
    label: "Better decisions",
    icon: BarChart3,
    className:
      "col-span-2 col-start-6 row-span-2 row-start-3 md:col-span-4 md:col-start-3 md:row-span-4 md:row-start-6 bg-sognos-about-purple-light text-sognos-navy",
    initial: { y: 32 },
  },
  {
    label: "People first",
    icon: Landmark,
    className:
      "col-span-2 col-start-1 row-span-2 row-start-8 md:col-span-4 md:col-start-18 md:row-span-4 md:row-start-6 bg-sognos-about-amber text-white",
    initial: { x: 32, y: 32 },
  },
] as const;

const images = [
  {
    src: "/images/about/hero-img.webp",
    alt: "Sognos team members collaborating around a laptop",
    className:
      "col-span-4 col-start-3 row-span-2 row-start-3 md:col-span-7 md:col-start-7 md:row-span-4 md:row-start-6",
  },
  {
    src: "/images/about/sognos-team.webp",
    alt: "Sognos team gathered together in the office",
    className:
      "col-span-5 col-start-1 row-span-3 row-start-6 md:col-span-7 md:col-start-9 md:row-span-4 md:row-start-1",
  },
  {
    src: "/images/about/iStock-1391579515-scaled.webp",
    alt: "Frontline team member supporting a community service",
    className:
      "col-span-3 col-start-4 row-span-2 row-start-9 md:col-span-7 md:col-start-16 md:row-span-4 md:row-start-5",
  },
] as const;

const revealTransition = {
  duration: 1.3,
  ease: [0.16, 1, 0.3, 1],
} as const;

export default function AboutHeroGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full overflow-hidden pb-16 pt-9 md:pb-24 md:pt-16 lg:px-12">
      <div className="relative w-full pt-[142.045%] md:pt-[40.84%]">
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-10 gap-0.5 border-2 border-sognos-navy md:grid-cols-22 md:grid-rows-9">
          {verticalLines.map((column) => (
            <i
              key={`vertical-${column}`}
              aria-hidden="true"
              className={`row-span-full row-start-1 w-0.5 -translate-x-0.5 bg-sognos-navy ${column > 7 ? "hidden md:block" : ""}`}
              style={{ gridColumnStart: column }}
            />
          ))}

          {horizontalLines.map((row) => (
            <i
              key={`horizontal-${row}`}
              aria-hidden="true"
              className={`col-span-full col-start-1 h-0.5 -translate-y-0.5 bg-sognos-navy ${row === 10 ? "md:hidden" : ""}`}
              style={{ gridRowStart: row }}
            />
          ))}

          {tiles.map(({ label, icon: Icon, className, initial }, index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { ...initial, opacity: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ...revealTransition, delay: 0.2 + index * 0.1 }}
              className={`relative z-10 flex flex-col items-center justify-center px-3 text-center sm:px-5 ${className}`}
            >
              <Icon
                aria-hidden="true"
                className="size-7 stroke-[1.5] sm:size-9 md:size-10"
              />
              <span className="pt-2 text-xs font-medium sm:pt-5 sm:text-sm md:text-base">
                {label}
              </span>
            </motion.div>
          ))}

          {images.map(({ src, alt, className }, index) => (
            <motion.div
              key={src}
              initial={
                reduceMotion
                  ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
                  : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={{ ...revealTransition, delay: 0.55 + index * 0.18 }}
              className={`relative z-10 overflow-hidden ${className}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 70vw, 34vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
