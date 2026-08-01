"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

const STEP_DURATION = 5000;

const BLOCKS = [
  {
    title: "Manage demand",
    label: "Intake and triage",
    copy: "Built for care teams delivering complex services across communities, homes and frontline environments.",
    href: "/products/sognoscare",
  },
  {
    title: "Coordinate workforce",
    label: "Planning and delivery",
    copy: "Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field.",
    href: "/products/sognosroster",
  },
  {
    title: "Track outcomes",
    label: "Insight and improvement",
    copy: "Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people.",
    href: "/solutions/customer-insights",
  },
] as const;

export default function HowSognosWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % BLOCKS.length);
    }, STEP_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, cycleKey, prefersReducedMotion]);

  function selectStep(index: number) {
    setActiveIndex(index);
    setCycleKey((current) => current + 1);
  }

  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <AnimatedEyebrow className="justify-center">
            How Sognos works
          </AnimatedEyebrow>
          <h2 className="mt-4 font-angellist text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            Healthcare First. Field Services Always. AI at the Centre.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sognos-body">
            One connected process takes service demand from first contact to
            coordinated delivery and measurable outcomes.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-prussian-blue-800/10 px-4 py-3 sm:gap-5 sm:px-6">
              <Image
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                width={96}
                height={96}
                className="h-8 w-auto"
              />
              <div
                aria-hidden="true"
                className="h-8 w-px bg-sognos-navy/30"
              />
              <Image
                src="/logos/Microsoft-Solutions-Partner-Logo.webp"
                alt="Microsoft Solutions Partner"
                width={480}
                height={113}
                className="h-22 w-auto"
              />
              <div
                aria-hidden="true"
                className="h-8 w-px bg-sognos-navy/30"
              />
              <Image
                src="/logos/copilot-logo.svg"
                alt="Microsoft Copilot"
                width={128}
                height={128}
                className="h-11 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-12 hidden md:block lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-4 right-[16.666%] left-[16.666%] h-px bg-sognos-line"
          >
            <motion.div
              className="h-full origin-left bg-sognos-blue-accent"
              animate={{
                scaleX: activeIndex / (BLOCKS.length - 1),
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
            />
          </div>

          <div
            role="group"
            aria-label="Sognos process steps"
            className="relative grid grid-cols-3"
          >
            {BLOCKS.map(({ title, label }, index) => {
              const isActive = activeIndex === index;
              const isComplete = activeIndex > index;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-pressed={isActive}
                  className="group flex flex-col items-center text-center"
                >
                  <span
                    className={[
                      "relative flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300",
                      isActive
                        ? "border-sognos-blue-accent bg-sognos-blue-accent text-white"
                        : isComplete
                          ? "border-sognos-blue-accent bg-white text-sognos-blue-accent"
                          : "border-sognos-line bg-white text-sognos-muted group-hover:border-sognos-blue-accent group-hover:text-sognos-blue-accent",
                    ].join(" ")}
                  >
                    {isComplete ? (
                      <Check className="size-3.5" strokeWidth={2} />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={[
                      "mt-1 text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-sognos-heading"
                        : "text-sognos-muted group-hover:text-sognos-heading",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-3 lg:gap-8">
          {BLOCKS.map(({ title, label, copy, href }, index) => {
            const isActive = activeIndex === index;
            const isComplete = activeIndex > index;

            return (
              <article
                key={title}
                className={[
                  "relative flex min-h-[310px] flex-col overflow-hidden rounded transition-[background-color,border-color,box-shadow] duration-300",
                  isActive
                    ? "border-sognos-blue-accent bg-sognos-blue-accent shadow-(--sognos-shadow-md)"
                    : "border-sognos-line bg-white hover:border-sognos-blue-accent/45",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-label={`Show step ${index + 1}: ${title}`}
                  aria-pressed={isActive}
                  className={[
                    "absolute inset-0 z-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4",
                    isActive
                      ? "focus-visible:outline-white"
                      : "focus-visible:outline-sognos-blue-accent",
                  ].join(" ")}
                >
                  <span className="sr-only">{title}</span>
                </button>

                <div
                  className={[
                    "pointer-events-none relative h-1 w-full overflow-hidden",
                    isActive ? "bg-white/25" : "bg-sognos-line",
                  ].join(" ")}
                >
                  {isComplete && (
                    <div className="absolute inset-0 bg-sognos-blue-accent" />
                  )}
                  {isActive && (
                    <motion.div
                      key={`${activeIndex}-${cycleKey}`}
                      className="absolute inset-y-0 left-0 bg-white"
                      initial={{ width: prefersReducedMotion ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: prefersReducedMotion
                          ? 0
                          : STEP_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>

                <div className="pointer-events-none relative z-10 flex h-full flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={[
                        "text-xs font-semibold uppercase tracking-widest transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-sognos-muted",
                      ].join(" ")}
                    >
                       {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "text-xs md:hidden",
                        isActive ? "text-white/70" : "text-sognos-muted",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                  </div>

                  <h3
                    className={[
                      "mt-8 font-angellist text-2xl font-normal tracking-tight",
                      isActive ? "text-white" : "text-sognos-heading",
                    ].join(" ")}
                  >
                    {title}
                  </h3>
                  <p
                    className={[
                      "mt-3 max-w-sm text-base leading-relaxed",
                      isActive ? "text-white/85" : "text-sognos-body",
                    ].join(" ")}
                  >
                    {copy}
                  </p>

                  <Link
                    href={href}
                    className={[
                      "group pointer-events-auto relative z-20 mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-white hover:text-white/75"
                        : "text-sognos-heading hover:text-sognos-blue-accent",
                    ].join(" ")}
                  >
                    Learn more
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
