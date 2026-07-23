"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Brian Kasmara",
    role: "Technical Consultant",
    image: "/images/team/Brian-Kasmara.webp",
    quote:
      "As a technical consultant I appreciate the challenges that come every day. It discourages having a narrow view and encourages puzzle-solving with others. It's common that we are required to innovate within the Field Services space and as a result, we have a team that is highly supportive and willing to share knowledge across different areas.",
  },
  {
    name: "Mrigul Arora aka Mac",
    role: "Business Analyst",
    image: "/images/team/Mrigul-Arora.webp",
    quote:
      "Working at Sognos is a true delight. The vibrant atmosphere fosters creativity, allowing me to explore innovative ideas freely. Moreover, the infectious enthusiasm of my seniors towards achieving greatness is truly inspiring. It's not just a job; it's a journey towards excellence.",
  },
  {
    name: "Mayank Raval",
    role: "Dynamics 365 CE Technical Lead",
    image: "/images/team/Mayank-Raval.webp",
    quote:
      "I appreciate working with Sognos for its dynamic environment, where innovation thrives, and the opportunity to contribute to cutting-edge solutions allows for continuous learning and professional growth. I also appreciate the work-life balance and flexibility with my working hours that Sognos offers. It's not just a job; it's a journey of both professional and personal growth within a group that feels like family.",
  },
  {
    name: "Rishit Patel",
    role: "Dynamics 365 Technical Consultant",
    image: "/images/team/Rishit-Patel.webp",
    quote:
      "At Sognos, I am empowered to unravel the complexities of business processes to streamline field services. They value my knowledge and expertise, making the work I do alongside our customers intuitive and impactful.",
  },
  {
    name: "Arayen Desai",
    role: "Dynamics 365 Technical Consultant",
    image: "/images/team/Arayen-Desai.webp",
    quote:
      "At Sognos, I've discovered more than just a workplace; it's a close-knit family dedicated to fostering improvement and reaching for excellence together. Every day, we turn challenges into opportunities, creating a thriving environment where success is a collective journey.",
  },
];

export default function LifeAtSognos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="w-full overflow-hidden border-b border-sognos-line bg-sognos-navy">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-12 pb-10 lg:grid-cols-2 lg:gap-16">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            Life at Sognos
          </h2>
          <p className="max-w-sm font-heading font-medium text-white/80 lg:justify-self-end">
            Hear directly from the people who build and deliver Sognos every day.
          </p>
        </div>

        <div className="grid gap-4 lg:min-h-[520px] lg:grid-cols-[0.72fr_1fr_1.1fr]">
          {/* Col 1 - testimonial list */}
          <div
            role="tablist"
            aria-label="Employee testimonials"
            className="rounded-lg bg-gray-100 p-4 lg:p-6"
          >
            {TESTIMONIALS.map((tab, i) => (
              <button
                key={tab.name}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-controls="life-at-sognos-panel"
                onClick={() => setActiveIndex(i)}
                className="group flex w-full items-center gap-3 border-t border-gray-300 py-4 text-left first:border-t-0"
              >
                <Image
                  src={tab.image}
                  alt={tab.name}
                  width={70}
                  height={70}
                  loading="lazy"
                  className={`h-11 w-11 shrink-0 rounded-full object-cover transition-opacity duration-200 ${
                    i === activeIndex ? "opacity-100" : "opacity-45"
                  }`}
                />
                <span className="min-w-0">
                  <span
                    className={`block truncate font-heading text-base font-semibold leading-snug tracking-tight text-sognos-body transition-opacity duration-200 ${
                      i === activeIndex ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    {tab.name}
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-xs text-sognos-body transition-opacity duration-200 ${
                      i === activeIndex ? "opacity-60" : "opacity-25"
                    }`}
                  >
                    {tab.role}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Col 2 - active employee image */}
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-sognos-navy">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sognos-navy/85 via-sognos-navy/35 to-transparent p-7">
              <div className="w-fit rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                  {active.name}
                </p>
                <p className="text-xs text-white/70">{active.role}</p>
              </div>
            </div>
          </div>

          {/* Col 3 - quote */}
          <div
            id="life-at-sognos-panel"
            role="tabpanel"
            className="flex min-h-[420px] flex-col justify-between rounded-lg bg-sognos-navy p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex h-full flex-col justify-between"
              >
                <p className="font-heading text-xl font-normal leading-snug tracking-tight text-white lg:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="text-sm font-semibold text-white">
                    {active.name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    {active.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quote icon */}
            <svg
              viewBox="0 0 39 32"
              fill="none"
              className="w-7 h-6 text-white/20 mt-6 self-end"
              aria-hidden="true"
            >
              <path
                d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
