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
    metric: "↑ 43%",
    description: "Increase in care worker utilisation across 18 locations",
  },
  {
    company: "Summit FM Solutions",
    industry: "Facilities Management",
    metric: "−28%",
    description: "Reduction in missed service visits after scheduling overhaul",
  },
  {
    company: "Lakeshore Council",
    industry: "Local Government",
    metric: "100%",
    description: "CQC compliance maintained across 12 consecutive months",
  },
  {
    company: "Apex Industrial Services",
    industry: "Industrial Services",
    metric: "2.4×",
    description: "Faster scheduling cycle from request to worker allocation",
  },
  {
    company: "Clearfield Energy",
    industry: "Energy & Utilities",
    metric: "−31%",
    description: "Reduction in compliance incidents year-on-year",
  },
];

export default function HowItWorks() {
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

  // Derive active index from drag position
  useMotionValueEvent(x, "change", (latest) => {
    const cardWidth = getCardWidth();
    const idx = Math.round(-latest / (cardWidth + GAP));
    setActiveIndex(Math.max(0, Math.min(idx, caseStudies.length - 1)));
  });

  // Play the active slide's video; pause all others
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
    <section aria-label="Case studies" className="py-20 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-[1320px] px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-425 mb-3 uppercase tracking-widest">
              Case Studies
            </p>
            <h2 className="text-4xl font-medium leading-tight">
              Outcomes in the field
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
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
      </div>

      {/* Slider — starts at container left, 2nd slide overflows right of viewport */}
      <div ref={viewportRef} className="mx-auto max-w-[1320px] px-6">
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
              className="relative flex-shrink-0 min-w-[82vw] lg:min-w-[626px] h-[425px] rounded-xl overflow-hidden"
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

              {/* Persistent dark overlay — ensures top text is always readable */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Top: industry + company on video */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                    {item.industry}
                  </p>
                  <p className="text-sm font-medium text-white/80 mt-1">
                    {item.company}
                  </p>
                </div>

                {/* Bottom: white stat container */}
                <div
                  style={{
                    background: "white",
                    borderRadius: 8,
                    padding: "35px 20px",
                  }}
                >
                  <p className="text-5xl font-semibold text-neutral-900">
                    {item.metric}
                  </p>
                  <p className="text-base text-neutral-500 mt-2 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
