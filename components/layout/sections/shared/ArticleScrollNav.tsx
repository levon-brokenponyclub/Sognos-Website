"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ArticleSection } from "@/lib/portableText";

export type { ArticleSection };

// Shared scroll-spy rail for article-style pages (customer stories, knowledge
// hub). Full-height vertical line + left-aligned rectangle active marker that
// springs between rows. getDocTop checkpoint at scrollY+140, rAF-throttled.
export default function ArticleScrollNav({
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
      className="relative hidden lg:block w-44 xl:w-54 shrink-0"
    >
      {/* Full-height vertical rail line (light gray track) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-sognos-line"
      />
      <p className="mb-5 pl-4 text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
        {label}
      </p>
      <div className="space-y-0.5">
        {sections.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-selected={isActive}
              className="group relative flex w-full items-center py-2 pl-4 text-left"
            >
              {/* Active marker — rectangle on the rail, springs between rows */}
              {isActive && (
                <motion.span
                  layoutId="article-rail-marker"
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 bg-sognos-blue-accent"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-sognos-blue-accent"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
