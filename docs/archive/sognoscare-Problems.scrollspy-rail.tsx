"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type ProblemItem = {
  number: string;
  label?: string; // short rail label — falls back to problem text if absent (e.g. Sanity data)
  problem: string;
  problemDetail: string;
  solution: string;
};

type SectionHeader = { eyebrow?: string; heading: string; intro?: string };

interface SognoscareProblemsProps {
  header?: SectionHeader;
  problems?: readonly ProblemItem[];
  subNav?: React.ReactNode;
}

const DEFAULT_HEADER: SectionHeader = {
  heading: "Care providers shouldn't operate like this",
  intro:
    "Fragmented systems, manual compliance, and disconnected data are the default for most care organisations. SognosCare fixes the root causes, not the symptoms.",
};

const DEFAULT_PROBLEMS: readonly ProblemItem[] = [
  {
    number: "01",
    label: "Disconnected systems",
    problem: "Referrals and records spread across disconnected tools",
    problemDetail:
      "Care plans, progress notes, incidents, and service agreements living in separate systems means staff spend more time finding information than delivering care.",
    solution:
      "One structured system for the full case lifecycle - intake, assessment, goal tracking, service agreements, progress notes, and reviews in a single workflow accessible to everyone who needs it.",
  },
  {
    number: "02",
    label: "After-the-fact compliance",
    problem: "Compliance is documented after the fact, not built in",
    problemDetail:
      "NDIS audits, Aged Care Quality Standards, and the new Support at Home model require evidence at every step. Most systems can't produce it without manual assembly.",
    solution:
      "Automated audit trails, funding rule enforcement, and compliance reporting built into every workflow - not bolted on retrospectively. Audit-ready by default.",
  },
  {
    number: "03",
    label: "Manual reporting",
    problem: "Month-end reporting consumes staff time it shouldn't",
    problemDetail:
      "Funding-body reports shouldn't take two days and three people to assemble. That time belongs to the people you support, not to spreadsheets.",
    solution:
      "Real-time dashboards and automated reports across funding bodies, compliance frameworks, and operational metrics - generated, not assembled. Staff focus on care.",
  },
  {
    number: "04",
    label: "Siloed workforce",
    problem: "Workforce and care management don't talk to each other",
    problemDetail:
      "When rostering runs in a separate system, visit records don't match care plans, coordinators reconcile discrepancies daily, and nothing is where it should be.",
    solution:
      "SognosCare and SognosRoster share the same data layer - visit records, care plans, and participant history stay in sync automatically, without manual reconciliation.",
  },
];

const PROBLEM_BG = "var(--sognos-care-dark)";

const cardMotion = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SognoscareProblems({
  header = DEFAULT_HEADER,
  problems = DEFAULT_PROBLEMS,
  subNav,
}: SognoscareProblemsProps = {}) {
  const [activeId, setActiveId] = useState(problems[0]?.number ?? "");
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    function getDocTop(el: HTMLElement): number {
      let top = 0;
      let cur: HTMLElement | null = el;
      while (cur) {
        top += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return top;
    }
    let rafId = 0;
    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const checkpoint = window.scrollY + 160;
        let found = problems[0]?.number ?? "";
        for (const p of problems) {
          const el = refs.current.get(p.number);
          if (!el) continue;
          if (getDocTop(el) <= checkpoint) found = p.number;
        }
        setActiveId(found);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToProblem(num: string) {
    const el = refs.current.get(num);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="problems"
      className="overflow-clip pt-6 pb-10 md:pt-16 md:pb-16"
      style={{ backgroundColor: PROBLEM_BG }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Centred header */}
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-y-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight tracking-tight text-white text-balance">
            {header.heading}
          </h2>
          {header.intro && (
            <p className="text-lg text-white/70 text-pretty">{header.intro}</p>
          )}
        </div>

        {subNav && <div className="mt-20 flex justify-center">{subNav}</div>}

        {/* Rail + flowing cards */}
        <div className="mt-16 flex items-start gap-12 xl:gap-16">
          {/* Sticky scroll-spy rail */}
          <nav
            aria-label="What we solve navigation"
            className="sticky top-[120px] z-10 hidden w-56 shrink-0 lg:block"
          >
            <p className="mb-5 font-heading text-xl font-medium leading-tight tracking-tight text-white">
              What We Solve
            </p>
            <div className="space-y-0.5">
              {problems.map((p) => {
                const isActive = activeId === p.number;
                return (
                  <button
                    key={p.number}
                    type="button"
                    onClick={() => scrollToProblem(p.number)}
                    aria-selected={isActive}
                    className="group flex w-full items-center gap-x-3 py-2 text-left"
                  >
                    <span className="relative flex size-2 flex-none items-center justify-center">
                      {isActive ? (
                        <motion.span
                          layoutId="problem-rail-bullet"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        />
                      ) : (
                        <span className="size-1.5 rounded-full bg-white/30 transition-colors group-hover:bg-white/50" />
                      )}
                    </span>
                    <span className={`font-mono text-xs ${isActive ? "text-white/70" : "text-white/40"}`}>
                      {p.number}
                    </span>
                    <span
                      className={`truncate font-heading text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/70"
                      }`}
                    >
                      {p.label ?? p.problem}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right column — one block per question */}
          <div className="min-w-0 flex-1 space-y-12 lg:space-y-16">
            {problems.map((item) => (
              <motion.div
                key={item.number}
                ref={(el) => {
                  if (el) refs.current.set(item.number, el as HTMLElement);
                  else refs.current.delete(item.number);
                }}
                variants={cardMotion}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="scroll-m-28"
              >
                {/* Question heading */}
                <h3 className="font-heading text-2xl font-normal leading-tight tracking-tight text-white text-balance lg:text-3xl">
                  {item.problem}
                </h3>

                {/* Problem | Solution cards */}
                <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
                  {/* Problem — plain, filled */}
                  <div className="rounded-2xl bg-white/[0.04] p-6 md:p-8 lg:p-10">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
                      The Problem
                    </span>
                    <p className="mt-3 text-base leading-relaxed text-white/70">
                      {item.problemDetail}
                    </p>
                  </div>

                  {/* Solution — numbered, accent left border */}
                  <div className="rounded-2xl border-l-2 border-sognos-blue-accent bg-white/[0.08] p-6 md:p-8 lg:p-10">
                    <span className="block font-heading text-3xl font-medium leading-none text-sognos-blue-accent">
                      {item.number}
                    </span>
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
                      The Solution
                    </span>
                    <p className="mt-3 text-base leading-relaxed text-white/85">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
