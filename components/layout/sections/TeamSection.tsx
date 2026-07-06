"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Kunal Joshi",
    role: "Managing Director & Co-Founder",
    image: "/images/team/Kunal.webp",
    bio: "As the Managing Director & Co-Founder of Sognos, Kunal brings visionary leadership and a strategic mindset to drive the company forward. With a profound understanding of both business and technology, Kunal is dedicated to guiding Sognos towards achieving its goals and exceeding client expectations.\n\nWith a career spanning over 20 years in the technology sector, Kunal has a proven track record of driving growth and innovation. His leadership style emphasises collaboration, creativity, and a customer-centric approach, ensuring that Sognos remains at the forefront of the industry. Alongside his vision for Sognos's customers, Kunal also drives each member of the Sognos family to identify and pursue their individual career and personal growth.\n\nKunal holds a Master in Technology from Swinburne University and an Executive MBA from AGSM. He continuously explores new avenues for business expansion and product development.",
    linkedin: "https://www.linkedin.com/in/kunal-joshi/",
  },
  {
    name: "Rick Vosila",
    role: "Chief Commercial Officer & Co-Founder",
    image: "/images/team/Rick.webp",
    bio: "Rick is a co-founding director of Sognos Solutions. Together with co-founder Kunal Joshi, Rick recognised a gap in the Microsoft business applications partner ecosystem for a Field Service Management specialist integrator back in 2016 - the genesis of Sognos, and what places us today as the premier Field Service Management consultants in the Microsoft ecosystem in Australia.\n\nA 40-year veteran in the Australian tech sector, Rick has held C-suite roles in global multinational organisations across FMCG, Industrial Services, IT, and Higher Education. He holds both a Bachelor of Commerce and an MBA, bringing together training and experience to drive strategy and execution excellence.\n\nOutside of work, Rick is a proud Rotarian, working to serve communities and individuals in need through the reach, scale, and capacity of Rotary International.",
    linkedin: "https://www.linkedin.com/in/vosila/",
  },
  {
    name: "Miloni Mehta",
    role: "Microsoft D365 & Power Platform Practice Lead",
    image: "/images/team/Miloni.webp",
    bio: "As the Microsoft D365 & Power Platform Practice Lead for Sognos, Miloni has made a career of solving business problems by applying innovative solutions in the Microsoft technology suite. Her goal: delivering exceptional outcomes for our customers across Healthcare, Services, Utilities, and Facility Maintenance.\n\nMiloni's in-depth experience with Dynamics 365 Field Service and her ability to architect and design end-to-end, business requirement-oriented solutions is a real advantage for the businesses Sognos partners with. Her leadership extends beyond project delivery - she is dedicated to nurturing talent and fostering a culture of continuous learning.\n\nMiloni holds a Master's in Data Analytics from the University of Technology, Sydney. She is also an emerging runner who completed her first half marathon at the 2023 Sydney Marathon, raising money for children on the Autism Spectrum - with plans to run her first full marathon soon.",
    linkedin: "https://www.linkedin.com/in/miloni-mehta/",
  },
];

// Shared slider pattern (docs/SLIDER_PATTERN.md): 10s per item.
const AUTOPLAY_MS = 10000;
// Crossfade timing — 300ms, CSS-default `ease` (cubic-bezier .25,.1,.25,1).
const FADE = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

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

// Renders desktop nav+card only at ≥lg, else the mobile slider — a hard DOM
// swap (not CSS hidden). Returns null pre-mount → SSR/first paint = desktop.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

// ── Desktop — sticky nav + per-item eased rail + crossfading card ──
function DesktopLeadership() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const itemStartRef = useRef<number | null>(null); // ts current item became active
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    function frame(now: number) {
      if (itemStartRef.current === null) itemStartRef.current = now;
      let elapsed = now - itemStartRef.current;

      // Autoplay: advance when the current item's 10s window elapses.
      if (elapsed >= AUTOPLAY_MS) {
        const next = (activeRef.current + 1) % TEAM.length;
        activeRef.current = next;
        setActive(next);
        itemStartRef.current = now;
        elapsed = 0;
      }

      // Per-item eased reveal: translateY -100% (reset) → 0% (full), easeOutCubic
      // (fast early, decelerating). Resets every item change.
      const p = Math.min(elapsed / AUTOPLAY_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (barRef.current) {
        barRef.current.style.transform = `translateY(-${(1 - eased) * 100}%) translateZ(0)`;
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Manual click: jump to item i, restart its 10s window (rail snaps back to
  // "just started" and the autoplay interval resets from now).
  const select = (i: number) => {
    activeRef.current = i;
    setActive(i);
    itemStartRef.current = null;
  };

  const member = TEAM[active];
  const bioLead = member.bio.split("\n\n")[0];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-16 lg:grid-cols-[300px_1fr]">
        {/* Nav — one continuous track + single translateY overlay (per-item reveal) */}
        <nav aria-label="Leadership team" className="relative lg:self-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[4px] w-[2px] overflow-hidden bg-sognos-line"
          >
            <div
              ref={barRef}
              className="absolute inset-0 bg-sognos-blue-accent"
              style={{ transform: "translateY(-100%) translateZ(0)" }}
            />
          </div>

          <div className="flex flex-col">
            {TEAM.map((m, i) => {
              const isActive = i === active;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => select(i)}
                  aria-current={isActive}
                  className="group relative flex items-center py-5 pl-8 text-left"
                >
                  {/* Active marker — springs between rows via layoutId; offset
                      into the gap between the 2px rail (left-0) and the name
                      (pl-8) so it never overlaps the rail fill. */}
                  {isActive && (
                    <motion.span
                      layoutId="team-nav-marker"
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-2.5 w-2.5 outline-4 outline-white -translate-y-1/2 bg-sognos-blue-accent"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 300,
                      }}
                    />
                  )}
                  <span
                    className={`text-sm font-medium transition-colors duration-300" ${
                      isActive
                        ? "text-sognos-blue-accent"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Card — crossfades on member change */}
        <div className="overflow-hidden rounded border border-sognos-line bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={member.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              <div className="flex min-h-[340px] col-span-2 flex-col justify-between p-8 lg:p-10 lg:min-h-105">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-gray-100 text-sognos-navy transition-colors hover:bg-gray-200"
                >
                  <LinkedInIcon />
                </a>
                <div>
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                    {member.role}
                  </p>
                  <p className="mt-6 line-clamp-4 text-base leading-relaxed text-sognos-body">
                    {bioLead}
                  </p>
                </div>
              </div>

              <div className="relative min-h-[340px] w-full bg-gray-100 lg:min-h-105">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Mobile — peeking slide carousel (SLIDER_PATTERN Shape 2 / ProductCustomerStories) ──
function MobileLeadership() {
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true }),
  );
  const [emblaRef] = useEmblaCarousel(
    { loop: false, align: "start", containScroll: "trimSnaps" },
    [autoplay.current],
  );

  return (
    <div className="overflow-hidden pb-16" ref={emblaRef}>
      <div className="flex" style={{ paddingLeft: "1.5rem" }}>
        {TEAM.map((m, i) => (
          <div
            key={m.name}
            className={`min-w-0 shrink-0 basis-[70%] max-w-[380px]${
              i < TEAM.length - 1 ? " mr-6" : ""
            }`}
          >
            <div className="overflow-hidden rounded-lg border border-sognos-line bg-white">
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover object-top"
                  sizes="70vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-medium tracking-tight text-sognos-heading">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  {m.role}
                </p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded bg-gray-100 text-sognos-navy transition-colors hover:bg-gray-200"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
        <div
          aria-hidden="true"
          className="shrink-0"
          style={{ width: "1.5rem" }}
        />
      </div>
    </div>
  );
}

export default function TeamSection() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pb-16">
        <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
          Meet our senior leadership team
        </h2>
      </div>

      {/* Hard DOM swap at lg (1024px) — not CSS-hidden. Pre-mount → desktop. */}
      {isMobile === true ? <MobileLeadership /> : <DesktopLeadership />}
    </section>
  );
}
