"use client";

// Production-candidate — an editorial-spread alternative to the current
// three-card TeamSection grid. Each leader gets a magazine-style row:
//
//   • Portrait on one side, text on the other, alternating per row so the
//     eye zigzags down the page instead of scanning a grid.
//   • A large muted index numeral ("01") anchors the top of each text
//     column — the structural signature of the section. Same tabular-nums
//     display-face energy that the timeline uses for its years, but here
//     the number is *background weight*, not the hero.
//   • The hero *is* a personal signature line, set in AngelList display
//     face at pull-quote scale. Everything else — role, body, meta chips,
//     action row — reads as supporting metadata around that one line.
//
// Motion is scoped: per-row reveal on enter (fade + 24px lift), portrait
// hover scale, no scroll-linked effects. The signature line is what
// carries the visual weight, not motion.
//
// Radius is `rounded` (4px) throughout, per CLAUDE.md §2. Sits on
// bg-sognos-tint (same surface family as the current TeamSection, so this
// slots into the About page without disturbing surrounding rhythm).
//
// Copy is mocked. Signature lines and meta chips are invented.

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

type Leader = {
  name: string;
  role: string;
  image: string;
  signature: string;
  meta: string[];
  body: string;
  linkedin: string;
};

const LEADERS: Leader[] = [
  {
    name: "Kunal Joshi",
    role: "Managing Director & Co-founder",
    image: "/images/team/Kunal.webp",
    signature: "Focus on the frontline. Everything else follows.",
    meta: ["Sydney", "Co-founder", "20+ years"],
    body: "Kunal sets Sognos's strategic direction and drives the company's healthcare-first focus. Executive MBA from AGSM, M.Tech from Swinburne. Two decades in the Australian technology sector.",
    linkedin: "https://www.linkedin.com/in/kunal-joshi/",
  },
  {
    name: "Rick Vosila",
    role: "Chief Commercial Officer & Co-founder",
    image: "/images/team/Rick.webp",
    signature: "Software the people doing the work actually use.",
    meta: ["Sydney", "Co-founder", "40-year operator"],
    body: "Rick leads commercial strategy and customer partnerships. A 40-year veteran of the Australian tech sector across FMCG, industrial services and higher ed. Bachelor of Commerce + MBA. Proud Rotarian.",
    linkedin: "https://www.linkedin.com/in/vosila/",
  },
  {
    name: "Miloni Mehta",
    role: "Microsoft D365 & Power Platform Practice Lead",
    image: "/images/team/Miloni.webp",
    signature: "Ship it. Learn. Ship it better.",
    meta: ["Sydney", "Field Service specialist", "Marathon runner"],
    body: "Miloni architects Sognos's Dynamics 365 and Power Platform practice. Master's in Data Analytics from UTS. First half marathon: 2023 Sydney Marathon — raising money for children on the Autism Spectrum.",
    linkedin: "https://www.linkedin.com/in/miloni-mehta/",
  },
];

// House ease — matches AboutStoryTimeline + AnimatedEyebrow.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeaderRow({ leader, index }: { leader: Leader; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const shown = inView || !!prefersReducedMotion;

  // Alternating layout — Kunal (0) portrait right, Rick (1) left, Miloni
  // (2) right. Symmetry keeps the section coherent, alternation keeps the
  // eye moving.
  const portraitRight = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 24,
      }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.65,
        ease: EASE_OUT,
        delay: prefersReducedMotion ? 0 : 0.05,
      }}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Portrait */}
      <div
        className={`lg:col-span-5 ${portraitRight ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="group relative aspect-[3/4] w-full overflow-hidden rounded bg-sognos-line">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Text column */}
      <div
        className={`flex flex-col lg:col-span-7 ${portraitRight ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Structural index numeral — huge, muted, editorial. The section
            signature. Uses heading-color at low alpha so it reads on tint
            without competing with the name below. */}
        <span
          aria-hidden="true"
          className="font-heading text-6xl font-light leading-none tabular-nums text-sognos-heading/10 md:text-8xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name */}
        <h3 className="mt-5 font-heading text-3xl font-medium leading-none tracking-tight text-sognos-heading md:text-4xl">
          {leader.name}
        </h3>

        {/* Role */}
        <p className="mt-3 text-base font-normal text-sognos-muted">
          {leader.role}
        </p>

        {/* Signature — the hero. Display face at pull-quote scale, hung
            off a short vertical accent bar so it reads as a marked-up
            quote without needing " marks. */}
        <div className="mt-7 flex gap-4 lg:gap-5">
          <span
            aria-hidden="true"
            className="mt-1.5 h-14 w-[3px] shrink-0 bg-sognos-blue-accent md:mt-2 md:h-16"
          />
          <p className="max-w-lg font-heading text-xl font-normal leading-snug tracking-tight text-sognos-heading text-balance md:text-2xl">
            {leader.signature}
          </p>
        </div>

        {/* Body */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-sognos-body">
          {leader.body}
        </p>

        {/* Meta chips — small caps-ish tags. Bordered white plates on tint
            for legibility. */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {leader.meta.map((tag) => (
            <li
              key={tag}
              className="rounded border border-sognos-line bg-white px-2.5 py-1 text-xs font-medium text-sognos-body"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Action row — echoes the dashed-bounded row from the existing
            TeamSection card (same design language, different scale). */}
        <div className="mt-8 flex max-w-md items-center justify-between gap-x-6 border-y border-dashed border-sognos-line py-3">
          <button
            type="button"
            className="group/bio inline-flex items-center gap-2 text-base font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent"
          >
            Read profile
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/bio:translate-x-0.5"
            >
              &rarr;
            </span>
          </button>
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="flex size-7 items-center justify-center rounded bg-white text-sognos-heading transition-colors hover:bg-sognos-blue-accent hover:text-white"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutLeadershipEditorial() {
  return (
    <section className="bg-sognos-tint py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header — full-width, editorial. Not the sticky
            left-column pattern TeamSection uses; this section is a
            different treatment on purpose. */}
        <div className="max-w-2xl">
          <AnimatedEyebrow className="flex w-fit" textClassName="text-sognos-muted">
            Leadership
          </AnimatedEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-snug tracking-tight text-sognos-heading text-balance md:text-4xl">
            The people building it.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sognos-body md:text-lg">
            A small senior team of operators, engineers and specialists —
            deep in Field Service, deeper in what the frontline actually
            needs.
          </p>
        </div>

        {/* Editorial spread */}
        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {LEADERS.map((leader, i) => (
            <LeaderRow key={leader.name} leader={leader} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
