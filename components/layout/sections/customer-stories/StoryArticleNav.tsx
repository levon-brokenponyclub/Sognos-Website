"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type ArticleSection = { id: string; label: string };

// Scroll-spy rail for the customer-story body. Structure + detection logic
// reuse the Solutions page rail verbatim (getDocTop checkpoint at scrollY+140,
// rAF-throttled) — re-sourced from the article's h2 headings.
export default function StoryArticleNav({
  sections,
  label = "In This Article",
}: {
  sections: ArticleSection[];
  label?: string;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const rafRef = useRef(0);

  useEffect(() => {
    if (sections.length === 0) return;

    function getDocTop(el: HTMLElement): number {
      let top = 0;
      let cur: HTMLElement | null = el;
      while (cur) {
        top += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return top;
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const checkpoint = window.scrollY + 140;
        let found = sections[0]?.id ?? "";
        for (const s of sections) {
          const el = document.getElementById(s.id);
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
      cancelAnimationFrame(rafRef.current);
    };
  }, [sections]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Article sections"
      className="hidden lg:block w-44 xl:w-54 shrink-0"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
        {label}
      </p>
      <div className="space-y-0.5">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            aria-selected={activeId === item.id}
            className="group flex items-center gap-x-2.5 py-2 text-left w-full"
          >
            <span className="relative flex size-2 flex-none items-center justify-center">
              {activeId === item.id ? (
                <motion.span
                  layoutId="article-rail-bullet"
                  className="absolute inset-0 rounded-full bg-current text-sognos-blue-accent"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              ) : (
                <span className="size-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-gray-400" />
              )}
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                activeId === item.id
                  ? "text-sognos-blue-accent"
                  : "text-gray-400 group-hover:text-gray-600"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
