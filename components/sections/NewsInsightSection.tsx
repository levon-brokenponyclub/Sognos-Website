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

const GAP = 20;

type Article = {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  imageBg: string; // gradient fallback until real images exist
};

const ARTICLES: Article[] = [
  {
    category: "Milestone",
    title:
      "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    excerpt:
      "Today marks a major milestone — 9 years of Sognos. From a small team with a bold idea to a platform serving organisations across Australia, New Zealand, and beyond.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
  },
  {
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    excerpt:
      "We're thrilled to share that Sognos Solutions has officially moved to a new office in North Sydney — a space built to match our next chapter of growth.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #1a2e1a 0%, #16a34a 100%)",
  },
  {
    category: "News",
    title:
      "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    excerpt:
      "Sognos Solutions is proud to announce the official launch of our New Zealand operations — bringing our platform to service organisations across the Tasman.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #1f1635 0%, #7c3aed 100%)",
  },
  {
    category: "News",
    title: "New Beginnings | Office Premises in India",
    excerpt:
      "As we continue to grow and evolve, we are excited to announce the opening of our new office in India — expanding our delivery capability and global footprint.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #2d1a0e 0%, #ea580c 100%)",
  },
  {
    category: "Events",
    title:
      "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    excerpt:
      "The Field Service Management Summit 2024 in Sydney brought together industry leaders to explore what's next in field service — and Sognos was there.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #1a1a2e 0%, #0891b2 100%)",
  },
  {
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    excerpt:
      "Watch the playback of our webinar with Microsoft and Flourish Australia — exploring how field service management is transforming participant care delivery.",
    href: "/resources",
    imageBg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  },
];

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
      className="group flex-shrink-0 flex flex-col overflow-hidden rounded-2xl border border-sognos-border-subtle bg-white transition-shadow hover:shadow-md w-[280px] sm:w-[320px] lg:w-[340px] h-[420px]"
    >
      {/* Image / placeholder */}
      <div
        className="h-44 w-full flex-shrink-0"
        style={{ background: article.imageBg }}
        aria-hidden="true"
      />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Badge */}
        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            BADGE_STYLES[article.category] ??
            "bg-neutral-50 text-neutral-600 border-neutral-100"
          }`}
        >
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-heading text-[15px] font-medium leading-snug tracking-tight text-neutral-900 line-clamp-3">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-neutral-500 line-clamp-2 flex-1">
          {article.excerpt}
        </p>

        {/* Read more */}
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors group-hover:text-brand/70">
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
  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 360;
    return (
      (trackRef.current.scrollWidth - GAP * (ARTICLES.length - 1)) /
      ARTICLES.length
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
    setActiveIndex(Math.max(0, Math.min(idx, ARTICLES.length - 1)));
  });

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
            Industries
            <br />
            Built for service-intensive operations
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
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
            {ARTICLES.map((article, i) => (
              <ArticleCard key={i} article={article} />
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-neutral-900 text-white hover:bg-neutral-700 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
