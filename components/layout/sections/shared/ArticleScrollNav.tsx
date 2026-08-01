"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ArticleSection } from "@/lib/portableText";

export type { ArticleSection };

// Shared scroll-spy nav for article-style pages (customer stories, knowledge
// hub). From lg: full-height vertical line + left-aligned rectangle active
// marker that springs between rows. Below lg: sticky collapsible dropdown.
// Both share one rAF-throttled getDocTop scroll-spy.

// Sticky offset of the mobile bar — must match `top-20` below (80px = the
// navbar's h-20 content row).
const MOBILE_BAR_TOP = 80;
// Clearance between a scrolled-to heading and whatever sits above it.
const SCROLL_GAP = 16;
// Desktop has no mobile bar; this is the original tuned offset.
const DESKTOP_SCROLL_OFFSET = 112;
// Viewport y at which a heading counts as the current section.
const SPY_CHECKPOINT = 140;

// Viewport y a heading should sit at once scrolled to. Below lg the sticky bar
// overlays the top of the article, so clear its height; derive that from the
// bar's own box rather than its current (possibly unstuck) position so the
// answer is the same wherever the click happens. offsetParent is null when the
// bar is display:none (lg and up).
function landingOffset(bar: HTMLDivElement | null): number {
  return bar && bar.offsetParent !== null
    ? MOBILE_BAR_TOP + bar.offsetHeight + SCROLL_GAP
    : DESKTOP_SCROLL_OFFSET;
}

export default function ArticleScrollNav({
  sections,
  label = "In This Article",
  showTrack = true,
  variant = "light",
}: {
  sections: ArticleSection[];
  label?: string;
  showTrack?: boolean;
  variant?: "light" | "dark";
}) {
  const colors =
    variant === "dark"
      ? {
          label: "text-white/40",
          inactive: "text-white/50 group-hover:text-white/80",
          active: "text-white",
          marker: "bg-white",
          track: "bg-white/10",
          panelBg: "bg-sognos-navy",
          panelText: "text-white/70",
          panelBorder: "border-white/10",
        }
      : {
          label: "text-sognos-muted",
          inactive: "text-gray-400 group-hover:text-gray-600",
          active: "text-sognos-blue-accent",
          marker: "bg-sognos-blue-accent",
          track: "bg-sognos-line",
          panelBg: "bg-white",
          panelText: "text-sognos-body",
          panelBorder: "border-sognos-line",
        };
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef(0);
  const mobileBarRef = useRef<HTMLDivElement>(null);

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
        // Checkpoint must sit at or below where a clicked heading lands, or the
        // section you just jumped to reads as not-yet-reached and the previous
        // one stays highlighted. Desktop keeps its original 140.
        const checkpoint =
          window.scrollY +
          Math.max(SPY_CHECKPOINT, landingOffset(mobileBarRef.current) + 1);
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
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      landingOffset(mobileBarRef.current);
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (sections.length === 0) return null;

  return (
    <>
      {/* ── Mobile / tablet: sticky collapsible dropdown ──
          top-20 matches the 80px navbar content row (h-20 in Navbar.tsx);
          z-40 sits under the z-50 header so the peeking bar covers it. */}
      <div
        ref={mobileBarRef}
        className={`relative lg:hidden sticky top-20 z-40 ${colors.panelBg}`}
      >
        {/* Toggle row */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          className={`relative z-10 flex w-full items-center justify-between border-b ${colors.panelBorder} py-4 ${colors.panelBg}`}
        >
          <span className={`text-sm font-medium ${colors.label}`}>{label}</span>
          <ChevronDown
            size={16}
            className={`${colors.label} transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Links panel. Absolutely positioned so opening overlays the article
            rather than pushing it down mid-read.

            Animates grid-template-rows 0fr→1fr rather than the FooterColumns
            height:0→"auto" pattern. Framer measures an "auto" keyframe by
            reflowing and then calling window.scrollTo() to restore position —
            that restore lands after scrollToSection() and cancels its smooth
            scroll, so tapping a link closed the panel but never moved. The fr
            interpolation needs no measurement, so the scroll survives. */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ gridTemplateRows: "0fr", opacity: 0 }}
              animate={{ gridTemplateRows: "1fr", opacity: 1 }}
              exit={{ gridTemplateRows: "0fr", opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute inset-x-0 top-full grid ${colors.panelBg}`}
            >
              <div className="overflow-hidden">
                {sections.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        scrollToSection(item.id);
                        setMobileOpen(false);
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className={`block w-full border-b ${colors.panelBorder} py-4 text-left text-sm font-medium transition-colors duration-200 ${
                        isActive ? colors.active : colors.panelText
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop: sticky sidebar rail ── */}
      <nav
        aria-label="Article sections"
        className="relative hidden lg:block w-full shrink-0"
      >
        {showTrack && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-px ${colors.track}`}
          />
        )}
        <p className={`mb-5 pl-4 text-xs font-semibold uppercase tracking-[0.08em] ${colors.label}`}>
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
                aria-current={isActive ? "location" : undefined}
                className="group relative flex w-full items-center py-2 pl-4 text-left"
              >
                {isActive && (
                  <motion.span
                    layoutId="article-rail-marker"
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 ${colors.marker}`}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  />
                )}
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive ? colors.active : colors.inactive
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
