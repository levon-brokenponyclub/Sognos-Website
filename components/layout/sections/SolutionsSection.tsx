"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Solution = {
  id: string;
  label: string;
  href: string;
  title: string;
  copy: string;
  image: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "frontline",
    label: "Frontline",
    href: "/solutions/frontline",
    title: "End-to-end field service management",
    copy: "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office.",
    image: "/product/feature-01.webp",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    image: "/product/feature-02.webp",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    image: "/product/feature-03.webp",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    image: "/product/feature-04.webp",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — so every issue is owned, actioned, and closed on time.",
    image: "/product/feature-05.webp",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages built into the Sognos platform so your team can customise workflows without writing code.",
    image: "/product/feature-06.webp",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment in four weeks — pre-built configuration, training, and go-live support included.",
    image: "/product/feature-01.webp",
  },
];

export default function SolutionsSection() {
  const [activeId, setActiveId] = useState(SOLUTIONS[0].id);
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
        const checkpoint = window.scrollY + 140;
        let found = SOLUTIONS[0].id;
        for (const s of SOLUTIONS) {
          const el = refs.current.get(s.id);
          if (!el) continue;
          if (getDocTop(el) <= checkpoint) found = s.id;
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
  }, []);

  function scrollToSolution(id: string) {
    const el = refs.current.get(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="solutions"
      className="w-full bg-white border-b border-sognos-line"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex gap-16 xl:gap-20 items-start">
          {/* Sticky scroll-spy rail */}
          <nav
            aria-label="Solutions navigation"
            className="hidden lg:block w-44 xl:w-54 shrink-0 sticky top-[100px] z-10"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
              Solutions
            </p>
            <div className="space-y-0.5">
              {SOLUTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSolution(s.id)}
                  aria-selected={activeId === s.id}
                  className="group flex items-center gap-x-2.5 py-2 text-left w-full"
                >
                  <span className="relative flex size-2 flex-none items-center justify-center">
                    {activeId === s.id ? (
                      <motion.span
                        layoutId="solutions-rail-bullet"
                        className="absolute inset-0 rounded-full bg-current text-sognos-blue-accent"
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 300,
                        }}
                      />
                    ) : (
                      <span className="size-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-gray-400" />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
                      activeId === s.id
                        ? "text-sognos-blue-accent"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right column: heading + flowing cards */}
          <div className="flex-1 min-w-0">
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-body tracking-[-0.03em] max-w-2xl">
                One intelligent platform for demand, workforce, and outcomes
              </h2>
            </div>

            <div className="space-y-8 lg:space-y-12">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.id}
                  ref={(el) => {
                    if (el) refs.current.set(s.id, el);
                    else refs.current.delete(s.id);
                  }}
                  className="scroll-m-28 grid md:grid-cols-[1fr_minmax(0,360px)] items-stretch gap-8 md:gap-10 lg:gap-12 md:min-h-[380px] lg:min-h-[450px]"
                >
                  {/* Image column — left */}
                  <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={s.image}
                      alt=""
                      width={1312}
                      height={918}
                      sizes="(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Text column — right */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl md:text-3xl font-medium text-sognos-body tracking-tight leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-600">
                      {s.copy}
                    </p>
                    <Link
                      href={s.href}
                      className="mt-2 inline-flex w-fit items-center gap-x-2 text-sm font-medium text-sognos-blue-accent transition-opacity hover:opacity-70"
                    >
                      Explore {s.label}
                      <svg
                        className="size-3"
                        viewBox="0 0 12 13"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
