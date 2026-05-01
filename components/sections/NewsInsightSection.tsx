"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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

type Article = {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

const ARTICLES: Article[] = [
  {
    category: "Milestone",
    title:
      "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    excerpt:
      "Today marks a major milestone – 9 years of Sognos Solutions. Since our founding in Australia, our journey through digital transformation has been shaped by bold thinking, trusted partnerships, and a passion for delivering impactful technology solutions.",
    href: "https://sognos.com.au/sognos-solutions-celebrates-9-years-of-growth-innovation-and-microsoft-dynamics-365-expertise/",
    image: "/images/news/sognos-9-years.webp",
  },
  {
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    excerpt:
      "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.",
    href: "https://sognos.com.au/sognos-solutions-moves-to-new-office-in-north-sydney/",
    image: "/images/news/north-sydney-office.webp",
  },
  {
    category: "News",
    title:
      "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    excerpt:
      "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This expansion was marked by a milestone event at Microsoft's Auckland offices.",
    href: "https://sognos.com.au/sognos-solutions-expands-to-new-zealand-with-official-launch-at-microsoft-house-in-auckland/",
    image: "/images/news/new-zealand-launch.webp",
  },
  {
    category: "News",
    title: "New Beginnings | Office Premises in India",
    excerpt:
      "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India — expanding our delivery capability and global footprint.",
    href: "https://sognos.com.au/new-beginnings-office-premises-in-india/",
    image: "/images/news/india-office.webp",
  },
  {
    category: "Events",
    title:
      "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    excerpt:
      "The Field Service Management (FSM) Summit 2024 in Sydney brought together industry innovators. Sognos participated as a Microsoft partner specialising in field service technology.",
    href: "https://sognos.com.au/sognos-at-fsm-summit-2024-driving-the-future-of-field-service-in-sydney/",
    image: "/images/news/fsm-summit-2024.webp",
  },
  {
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    excerpt:
      "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    href: "https://sognos.com.au/sognos-webinar-series-reinventing-patient-and-participant-care/",
    image: "/images/news/participant-care-webinar.webp",
  },
];

// Doubled for seamless infinite loop
const LOOPED_ARTICLES = [...ARTICLES, ...ARTICLES];

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white p-2 transition-shadow duration-200 hover:shadow-md"
    >
      {/* Image — fixed height */}
      <div className="h-48 lg:h-64 w-full shrink-0 overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-1">
        {/* Badge */}
        {/* <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            BADGE_STYLES[article.category] ??
            "bg-neutral-50 text-neutral-600 border-neutral-100"
          }`}
        >
          {article.category}
        </span> */}

        {/* Title — fixed 3-line height for cross-card alignment */}
        <h3 className="mt-3 h-auto lg:h-[4.5rem] overflow-hidden font-heading text-xl lg:text-2xl font-medium text-prussian-blue-800 leading-snug tracking-tight line-clamp-3">
          {article.title}
        </h3>

        {/* Excerpt — fixed 2-line height for cross-card alignment */}
        {/*  <p className="mt-3 h-12 overflow-hidden text-sm leading-relaxed text-sognos-text-body line-clamp-2">
          {article.excerpt}
        </p> */}

        {/* Spacer + Read more always at bottom */}
        <div className="flex-1" />
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 group-hover:text-brand/70">
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

export default function NewsInsightSection() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const maxDragRef = useRef(0);
  const cardWidthRef = useRef(0);
  const periodRef = useRef(0); // width of one full set = ARTICLES.length * (cardWidth + GAP)
  const [maxDrag, setMaxDrag] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Autoplay refs
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
      const cw = isMobile
        ? containerWidth
        : (containerWidth - GAP) / 2;
      cardWidthRef.current = cw;
      setCardWidth(cw);
      periodRef.current = ARTICLES.length * (cw + GAP);
      const trackWidth = trackRef.current.scrollWidth;
      const md = Math.min(0, -(trackWidth - containerWidth));
      maxDragRef.current = md;
      setMaxDrag(md);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  return (
    <section className="w-full bg-prussian-blue-800 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-8 lg:gap-12">
          {/* Left column — h2 and button, aligned top */}
          <div className="w-full lg:w-[35%] lg:shrink-0 flex flex-col items-center lg:items-start gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              News &amp; Insights
            </div>
            <h2 className="text-3xl md:text-4xl text-white text-center lg:text-left font-heading font-medium tracking-tight">
              News &amp; Insights
            </h2>
            <div className="mt-2 lg:mt-6 hidden lg:block">
              <AnimatedButton href="/knowledge-hub" variant="white">
                Visit Blog
              </AnimatedButton>
            </div>
          </div>

          {/* Right column — strip wrapper, overflow-hidden clips right arrow */}
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
                {LOOPED_ARTICLES.map((article, i) => (
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

            {/* Prev — left edge, vertically centered */}
            <button
              onClick={() => handleStep(-1)}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Next — right edge, half-clipped by overflow-hidden */}
            <button
              onClick={() => handleStep(1)}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <ArrowRight size={16} />
            </button>

            {/* Mobile arrows — below cards, button left, arrows right */}
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
