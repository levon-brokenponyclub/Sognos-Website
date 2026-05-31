"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

export interface SubNavSection {
  label: string;
  id: string;
  href?: string;
}

interface ProductSubNavProps {
  productName: string;
  logoSrc: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  sections: SubNavSection[];
}

export default function ProductSubNav({
  productName,
  logoSrc,
  logoAlt,
  logoWidth = 140,
  logoHeight = 28,
  sections,
}: ProductSubNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);
  const dockedRef = useRef(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [scrollNavHidden, setScrollNavHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { openModal } = useBookDemo();

  // Track which section is in view for active highlight
  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  // Auto-scroll the nav so the active link is visible on mobile
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    const link = nav.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
    if (!link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    // Scroll so the active link is roughly centred in the nav
    const offset = linkRect.left - navRect.left - navRect.width / 2 + linkRect.width / 2;
    nav.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeId]);

  // Listen for scroll-hide nav state from Navbar so the docked subnav yields space when header returns.
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ hidden: boolean }>;
      setScrollNavHidden(Boolean(ce.detail?.hidden));
    };
    window.addEventListener("sognos:scrollNavHidden", handler);
    return () => window.removeEventListener("sognos:scrollNavHidden", handler);
  }, []);

  // "Handoff" behavior with the fixed header:
  // - While not docked: keep the sub-nav sticky *below* the header.
  // - When it reaches the header: dock it at the very top and request the header hide.
  useEffect(() => {
    const el = barRef.current;
    const sentinel = sentinelRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      // Use the sentinel (normal flow) to determine how close the sub-nav is to the header.
      // This avoids the sticky element "locking" its rect.top and preventing push from updating.
      const probe = sentinel ?? el;
      const probeRect = probe.getBoundingClientRect();

      // Push ramps from 0 → headerH as the sub-nav area moves into the header zone.
      const overlap = headerH - probeRect.top;
      const push = Math.max(0, Math.min(headerH, overlap));
      document.documentElement.style.setProperty(
        "--sognos-header-push",
        `${push}px`,
      );

      // Dock once the header has been fully pushed out.
      const nextDocked = push >= headerH - 0.5;

      // While we're pushing, reduce the sub-nav's sticky offset so it moves up with the header.
      // This creates the "sub-nav pushes header away" feel.
      const offsetPx = nextDocked ? 0 : Math.max(0, headerH - push);
      document.documentElement.style.setProperty(
        "--sognos-header-offset",
        `${offsetPx}px`,
      );

      if (nextDocked !== dockedRef.current) {
        dockedRef.current = nextDocked;
        setDocked(nextDocked);
        window.dispatchEvent(
          new CustomEvent("sognos:productSubnavDocked", {
            detail: { docked: nextDocked },
          }),
        );
      }

      // Reveal the logo only once the bar is actually at top:0 (docked).
      // Keep the state stable to avoid extra renders on scroll.
      setLogoVisible((prev) => (prev === nextDocked ? prev : nextDocked));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      // Ensure header is restored when leaving the page/component unmounts.
      document.documentElement.style.removeProperty("--sognos-header-offset");
      document.documentElement.style.removeProperty("--sognos-header-push");
      window.dispatchEvent(
        new CustomEvent("sognos:productSubnavDocked", {
          detail: { docked: false },
        }),
      );
    };
  }, []);

  return (
    <>
      {/* Normal-flow probe so header push can be computed even when the bar is sticky. */}
      <div ref={sentinelRef} aria-hidden className="h-px" />

      <motion.div
        ref={barRef}
        key="product-subnav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="sticky inset-x-0 z-50 bg-white border-b border-gray-200 pointer-events-auto transition-[top] duration-300"
        style={{ top: docked && scrollNavHidden ? 0 : "var(--sognos-header-offset, 0px)" }}
        data-product-subnav
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center h-18 gap-6">
            {/* Left identity (logo) will be revisited once interaction is approved. */}
            <div className="flex items-center">
              <span className="sr-only">{productName}</span>
              {logoVisible && (
                <Image
                  src={logoSrc}
                  alt={logoAlt ?? productName}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-auto w-36 hidden"
                />
              )}
            </div>

            {/* Section links */}
            <nav
              ref={navRef}
              className="flex flex-1 items-center gap-0 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible"
              aria-label={`${productName} sections`}
            >
              {sections.map(({ label, id, href }) => {
                const isActive = activeId === id;
                return (
                  <Link
                    key={id}
                    href={href ?? `#${id}`}
                    data-section-id={id}
                    className={`relative px-4 h-18 flex items-center text-sm whitespace-nowrap shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-brand font-medium"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="subnav-indicator"
                        className="absolute bottom-0 inset-x-4 h-0.5 bg-brand rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Book a Demo button */}
            <button
              onClick={() => openModal()}
              className="ml-auto hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand/90 transition-colors duration-200 shrink-0"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
