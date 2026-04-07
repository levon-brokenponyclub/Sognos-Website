"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GAP = 20;
const VIDEO_SRC =
  "https://www.shutterstock.com/shutterstock/videos/3740674987/preview/stock-footage-people-back-or-volunteer-with-tshirt-for-donation-non-profit-organization-or-community-service-in.webm";

const caseStudies = [
  {
    company: "Meridian Care Group",
    industry: "Health & Social Care",
    logo: "/logos/penrith-city-council-logo.png",
    stat1: "↑ 43%",
    stat1Label: "Care worker utilisation",
    stat2: "18",
    stat2Label: "Locations live",
    quote:
      "Sognos gave us full visibility across every site. Scheduling that used to take hours now happens automatically.",
    author: "Sarah Mitchell",
    role: "Director of Operations",
    href: "/customers/meridian-care-group",
  },
  {
    company: "Summit FM Solutions",
    industry: "Facilities Management",
    logo: "/logos/flourish-australia-logo.png",
    stat1: "−28%",
    stat1Label: "Missed service visits",
    stat2: "3 days",
    stat2Label: "Deployment to go-live",
    quote:
      "The scheduling overhaul paid for itself in the first quarter. Our field teams finally have a system that works.",
    author: "James Holt",
    role: "Head of Field Operations",
    href: "/customers/summit-fm",
  },
  {
    company: "Lakeshore Council",
    industry: "Local Government",
    logo: "/logos/auckland-airport-logo.png",
    stat1: "100%",
    stat1Label: "CQC compliance",
    stat2: "12 mo",
    stat2Label: "Consecutive clean audits",
    quote:
      "We've moved from reactive to proactive compliance. Inspectors comment on it every visit.",
    author: "Claire Donovan",
    role: "Service Delivery Manager",
    href: "/customers/lakeshore-council",
  },
  {
    company: "Apex Industrial Services",
    industry: "Industrial Services",
    logo: "/images/logos/apex-industrial.svg",
    stat1: "2.4×",
    stat1Label: "Faster scheduling cycle",
    stat2: "↓ 19%",
    stat2Label: "Overtime costs",
    quote:
      "From request to worker allocation used to take days. Now it's measured in minutes.",
    author: "Tom Adeyemi",
    role: "Operations Director",
    href: "/customers/apex-industrial",
  },
  {
    company: "Clearfield Energy",
    industry: "Energy & Utilities",
    logo: "/images/logos/clearfield-energy.svg",
    stat1: "−31%",
    stat1Label: "Compliance incidents",
    stat2: "↑ 37%",
    stat2Label: "First-time fix rate",
    quote:
      "Sognos connected our compliance, scheduling and reporting into one place. The efficiency gains were immediate.",
    author: "Rachel Osei",
    role: "VP of Service Operations",
    href: "/customers/clearfield-energy",
  },
];

export default function CustomerStories() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 626;
    return (
      (trackRef.current.scrollWidth - GAP * (caseStudies.length - 1)) /
      caseStudies.length
    );
  }, []);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = viewportRef.current.clientWidth;
      setMaxDrag(Math.min(0, -(trackWidth - containerWidth)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    const cardWidth = getCardWidth();
    const idx = Math.round(-latest / (cardWidth + GAP));
    setActiveIndex(Math.max(0, Math.min(idx, caseStudies.length - 1)));
  });

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const step = (dir: 1 | -1) => {
    const cardWidth = getCardWidth();
    const next = x.get() - dir * (cardWidth + GAP);
    animate(x, Math.max(Math.min(next, 0), maxDrag), {
      type: "spring",
      damping: 30,
      stiffness: 300,
    });
  };

  return (
    <section className="w-full border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-l border-dashed border-sognos-border-subtle">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Customer Stories
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Outcomes in the field
          </p>
        </div>

        {/* Slider */}
        <div ref={viewportRef} className="mx-auto max-w-7xl">
          <motion.div
            ref={trackRef}
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.05}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {caseStudies.map((item, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[82vw] lg:w-[626px] h-[480px] rounded-xl overflow-hidden"
              >
                {/* Video background */}
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={VIDEO_SRC}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/65" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-4 pt-8">
                  {/* Top: industry + company */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-white/80">
                      {item.industry}
                    </p>
                    <p className="text-sm font-medium text-white mt-1">
                      {item.company}
                    </p>
                  </div>

                  {/* Bottom card */}
                  <div className="bg-white rounded-lg px-5 py-5">
                    {/* Client logo */}
                    <div className="mb-4 h-14 flex items-center">
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="h-full w-auto max-w-[140px] object-contain object-left"
                      />
                    </div>

                    {/* Stat blocks */}
                    <div className="flex divide-x divide-neutral-100 mb-4">
                      <div className="flex-1 pr-4">
                        <p className="text-2xl font-bold leading-none text-neutral-900">
                          {item.stat1}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          {item.stat1Label}
                        </p>
                      </div>
                      <div className="flex-1 pl-4">
                        <p className="text-2xl font-bold leading-none text-neutral-900">
                          {item.stat2}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          {item.stat2Label}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-neutral-100 mb-4" />

                    {/* Quote */}
                    <p className="text-sm leading-relaxed text-neutral-700">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Author + CTA */}
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">
                          {item.author}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {item.role}
                        </p>
                      </div>
                      <a
                        href={item.href}
                        className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-900 underline underline-offset-2 hover:opacity-60 transition-opacity"
                      >
                        Read the case study
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 8L8 2M8 2H3.5M8 2v4.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="hidden sm:flex items-center gap-2 justify-end">
          <button
            onClick={() => step(-1)}
            aria-label="Previous slide"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next slide"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-neutral-900 text-white hover:bg-neutral-700 hover:border-neutral-700 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
