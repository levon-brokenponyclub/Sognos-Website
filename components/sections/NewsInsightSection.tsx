"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";

const GAP = 20;

export type NewsInsightArticle = {
  category: string;
  title: string;
  href: string;
  image: string;
};

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Insights: "bg-violet-50 text-violet-700 border-violet-100",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: NewsInsightArticle }) {
  return (
    <Link
      href={article.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white p-2"
    >
      {/* Image + badge overlay */}
      <div className="relative h-48 lg:h-56 w-full shrink-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-3 left-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            BADGE_STYLES[article.category] ??
            "bg-neutral-50 text-neutral-600 border-neutral-100"
          }`}
        >
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        <h3 className="font-heading text-xl lg:text-xl font-medium text-prussian-blue-800 leading-snug tracking-tight line-clamp-3">
          {article.title}
        </h3>
        <div className="flex-1" />
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#052048] transition-colors duration-200 group-hover:text-[#052048]/70">
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function NewsInsightSection({
  articles,
}: {
  articles: NewsInsightArticle[];
}) {
  const looped = useMemo(() => [...articles, ...articles], [articles]);

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const maxDragRef = useRef(0);
  const cardWidthRef = useRef(0);
  const periodRef = useRef(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seamless infinite loop: teleport x when it crosses set boundaries
  useMotionValueEvent(x, "change", (latest) => {
    const p = periodRef.current;
    if (!p) return;
    if (latest <= -p) x.set(latest + p);
    else if (latest > 0) x.set(latest - p);
  });

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const containerWidth = viewportRef.current.clientWidth;
      const isMobile = window.innerWidth < 1024;
      const cw = isMobile ? containerWidth : (containerWidth - GAP) / 2;
      cardWidthRef.current = cw;
      setCardWidth(cw);
      periodRef.current = articles.length * (cw + GAP);
      const trackWidth = trackRef.current.scrollWidth;
      const md = Math.min(0, -(trackWidth - containerWidth));
      maxDragRef.current = md;
      setMaxDrag(md);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [articles.length]);

  const stepFn = useCallback(
    (dir: 1 | -1) => {
      const next = x.get() - dir * (cardWidthRef.current + GAP);
      animate(x, next, { type: "spring", damping: 30, stiffness: 300 });
    },
    [x],
  );

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    intervalRef.current = setInterval(() => stepFn(1), 4000);
  }, [stopAutoplay, stepFn]);

  const pauseAndResume = useCallback(() => {
    stopAutoplay();
    resumeRef.current = setTimeout(startAutoplay, 5000);
  }, [stopAutoplay, startAutoplay]);

  const handleStep = useCallback(
    (dir: 1 | -1) => {
      stepFn(dir);
      pauseAndResume();
    },
    [stepFn, pauseAndResume],
  );

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-prussian-blue-800 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-12">
          {/* Left column - h2 and button, aligned top */}
          <div className="w-full lg:w-[35%] lg:shrink-0 flex flex-col items-center lg:items-start gap-4">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white text-center lg:text-left tracking-tight mb-0">
              News &amp; Insights
            </h2>
            <div className="mt-2 lg:mt-4 hidden lg:block">
              <AnimatedButton href="/knowledge-hub" variant="white">
                View All
              </AnimatedButton>
            </div>
          </div>

          {/* Right column - strip wrapper, overflow-hidden clips right arrow */}
          <div className="flex-1 min-w-0 relative overflow-hidden">
            {/* Slider viewport */}
            <div ref={viewportRef}>
              <motion.div
                ref={trackRef}
                style={{ x }}
                drag="x"
                dragConstraints={{ left: maxDrag, right: 0 }}
                dragElastic={0.05}
                onDragStart={pauseAndResume}
                className="flex gap-5 cursor-grab active:cursor-grabbing items-stretch"
              >
                {looped.map((article, i) => (
                  <div
                    key={i}
                    className="shrink-0 flex flex-col"
                    style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Prev - left edge, vertically centered */}
            <button
              onClick={() => handleStep(-1)}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Next - right edge, half-clipped by overflow-hidden */}
            <button
              onClick={() => handleStep(1)}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <ArrowRight size={16} />
            </button>

            {/* Mobile arrows - below cards, button left, arrows right */}
            <div className="flex lg:hidden items-center justify-between gap-3 mt-6">
              <AnimatedButton href="/knowledge-hub" variant="white">
                Visit Blog
              </AnimatedButton>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleStep(-1)}
                  aria-label="Previous slide"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-white/40 text-white/80 hover:border-white hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => handleStep(1)}
                  aria-label="Next slide"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-white/40 text-white/80 hover:border-white hover:text-white transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
