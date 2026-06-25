"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useReducedMotion,
} from "framer-motion";
import { nav, navCTA, type NavGroup } from "@/lib/navigation";
import { useBookDemo } from "@/lib/BookDemoContext";

// ── Transparent-over-hero: paths whose first section is a dark hero ────────────
// Navbar derives transparentOverHero from pathname (shared layout can't pass per-page props).
// `transparentOverHero` prop overrides this when explicitly provided.
const DARK_HERO_PATHS = new Set([
  "/",
  "/products/sognoscare",
  "/products/sognosroster",
  "/products/sognosgenogram",
]);

// ── Light / dark theme seam ────────────────────────────────────────────────────
// `dark` values are used for the transparent-at-top state on dark-hero pages.
// `light` values are used when the bar is solid (scrolled, or non-dark-hero pages).

type NavVariant = "light" | "dark";

interface NavTheme {
  text: string; // nav link base colour
  hoverPill: string; // sliding highlight bg
  navGroup: string; // persistent bg behind centered nav group (includes rounded-full p-1)
  logoFilter: string; // CSS filter for logo img
  primaryBtn: string; // Book a Demo button
  secondaryText: string; // Contact Sales link
  dropdownCard: string; // dropdown card bg + border + shadow (always light for readability)
  mobilePanel: string; // mobile drawer (always solid for readability)
  mobileDivider: string;
  hamburger: string;
}

const THEMES: Record<NavVariant, NavTheme> = {
  light: {
    text: "text-sognos-heading/75 hover:text-sognos-heading",
    hoverPill: "bg-sognos-navy-dark",
    navGroup: "bg-gray-100 rounded-full p-1",
    logoFilter: "none",
    primaryBtn: "bg-sognos-navy-dark text-white hover:bg-sognos-navy-dark/90",
    secondaryText: "text-sognos-heading/65 hover:text-sognos-heading",
    dropdownCard:
      "bg-white border border-gray-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_3px_6px_rgba(34,42,53,0.04),0_8px_24px_rgba(34,42,53,0.04)]",
    mobilePanel:
      "bg-white border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    mobileDivider: "border-gray-100",
    hamburger: "text-sognos-heading/60 hover:text-sognos-heading",
  },
  dark: {
    // Used when bar is transparent over a dark hero (at scrollState "top").
    // Dropdown + mobile panel stay light regardless (always readable).
    text: "text-white/80 hover:text-white",
    hoverPill: "bg-white/20",
    navGroup: "bg-white/10 rounded-full p-1",
    logoFilter: "brightness(0) invert(1)",
    primaryBtn: "bg-white text-sognos-navy-dark hover:bg-white/90",
    secondaryText: "text-white/65 hover:text-white",
    dropdownCard:
      "bg-white border border-gray-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_3px_6px_rgba(34,42,53,0.04),0_8px_24px_rgba(34,42,53,0.04)]",
    mobilePanel:
      "bg-white border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    mobileDivider: "border-gray-100",
    hamburger: "text-white/80 hover:text-white",
  },
};

const DROPDOWN_SPRING = {
  type: "spring" as const,
  bounce: 0.15,
  duration: 0.4,
};
const EDGE = 8;

// ── Helpers ────────────────────────────────────────────────────────────────────

function getLinkCols(group: NavGroup) {
  return (group.megaMenu ?? []).filter((col) => col.items.length > 0);
}

// ── Desktop dropdown content ───────────────────────────────────────────────────

function DropdownContent({
  group,
  onClose,
}: {
  group: NavGroup;
  onClose: () => void;
}) {
  const linkCols = getLinkCols(group);
  return (
    <div className="flex gap-8">
      {linkCols.map((col, i) => (
        <div key={i} className="w-max">
          {col.heading && (
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {col.heading}
            </h4>
          )}
          <ul>
            {col.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-lg text-gray-900 hover:text-sognos-blue-accent transition-colors duration-150"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="w-48 min-h-[280px] rounded-2xl bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]" />
    </div>
  );
}

// ── Mobile accordion item ──────────────────────────────────────────────────────

function AccordionItem({
  group,
  isOpen,
  onToggle,
  onLinkClick,
}: {
  group: NavGroup;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  const linkCols = getLinkCols(group);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="flex items-center gap-2.5">
          <AnimatePresence>
            {isOpen && (
              <motion.span
                key="dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-block h-2 w-2 shrink-0 rounded-full bg-orange-400"
              />
            )}
          </AnimatePresence>
          <span className="text-2xl font-medium text-gray-900">
            {group.label}
          </span>
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="ml-4 h-5 w-5 shrink-0 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pb-6">
              {linkCols.map((col, i) => (
                <div key={i}>
                  {col.heading && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {col.heading}
                    </p>
                  )}
                  <ul className="space-y-0.5">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onLinkClick}
                          className="block py-1.5 text-base text-gray-700 hover:text-sognos-blue-accent transition-colors duration-150"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="h-28 rounded-2xl bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

export default function Navbar({
  variant = "light",
  transparentOverHero,
}: {
  variant?: NavVariant;
  transparentOverHero?: boolean;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [hovered, setHovered] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [scrollState, setScrollState] = useState<"top" | "hidden" | "peek">(
    "top",
  );

  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const measurerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const panelWidths = useRef<Record<string, number>>({});
  const prevOpenMenuRef = useRef<string | null>(null);

  const intentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const openMenuRef = useRef<string | null>(null);
  useEffect(() => {
    openMenuRef.current = openMenu;
  }, [openMenu]);

  const panelX = useMotionValue(0);
  const [panelWidth, setPanelWidth] = useState(0);

  const activeGroup = nav.find(
    (g) => g.label === openMenu && (g.megaMenu || g.items),
  );

  // ── Transparent-over-hero derived state ───────────────────────────────────────
  // Prop overrides pathname-based detection when explicitly provided.
  // Bar stays transparent at scrollState "top" regardless of whether a dropdown is open
  // (backdrop blur provides visual separation; no colour-switch on open).
  const useTransparent =
    transparentOverHero !== undefined
      ? transparentOverHero
      : DARK_HERO_PATHS.has(pathname);

  const isTransparent = useTransparent && scrollState === "top";

  // Effective theme: dark content values when transparent, light when solid
  const t = isTransparent ? THEMES.dark : THEMES.light;

  // ── Measure all panel widths ──────────────────────────────────────────────────

  useLayoutEffect(() => {
    const measure = () => {
      nav.forEach((group) => {
        const el = measurerRefs.current.get(group.label);
        if (el)
          panelWidths.current[group.label] = el.getBoundingClientRect().width;
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Animate panel position + size ─────────────────────────────────────────────

  useLayoutEffect(() => {
    if (!openMenu) {
      prevOpenMenuRef.current = null;
      return;
    }
    const containerEl = containerRef.current;
    const triggerEl = triggerRefs.current.get(openMenu);
    if (!containerEl || !triggerEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const triggerRect = triggerEl.getBoundingClientRect();
    const targetWidth = panelWidths.current[openMenu] ?? 400;

    const center =
      triggerRect.left - containerRect.left + triggerRect.width / 2;
    const targetX = Math.max(
      EDGE,
      Math.min(
        center - targetWidth / 2,
        containerRect.width - targetWidth - EDGE,
      ),
    );

    setPanelWidth(targetWidth);
    if (prefersReducedMotion || prevOpenMenuRef.current === null) {
      panelX.set(targetX);
    } else {
      animate(panelX, targetX, DROPDOWN_SPRING);
    }

    prevOpenMenuRef.current = openMenu;
  }, [openMenu, prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Three-state scroll ────────────────────────────────────────────────────────

  useEffect(() => {
    let ticking = false;
    lastScrollYRef.current = window.scrollY;
    const HIDE_AFTER = 80;
    const DELTA_MIN = 6;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      if (y < 8) {
        setScrollState("top");
        lastScrollYRef.current = y;
      } else if (Math.abs(delta) > DELTA_MIN) {
        if (delta > 0 && y > HIDE_AFTER) setScrollState("hidden");
        else if (delta < 0) setScrollState("peek");
        lastScrollYRef.current = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ── Click-outside closes desktop dropdown ─────────────────────────────────────

  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setHovered(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  // ── Scroll closes desktop dropdown ───────────────────────────────────────────

  useEffect(() => {
    if (!openMenu) return;
    const onScroll = () => {
      if (intentTimerRef.current) {
        clearTimeout(intentTimerRef.current);
        intentTimerRef.current = null;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setOpenMenu(null);
      setHovered(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu]);

  // ── Hover intent timers ───────────────────────────────────────────────────────

  const closeAll = () => {
    if (intentTimerRef.current) {
      clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(null);
    setHovered(null);
  };

  const openOnHover = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openMenuRef.current === label) return;
    if (openMenuRef.current !== null) {
      if (intentTimerRef.current) {
        clearTimeout(intentTimerRef.current);
        intentTimerRef.current = null;
      }
      setOpenMenu(label);
      return;
    }
    if (intentTimerRef.current) clearTimeout(intentTimerRef.current);
    intentTimerRef.current = setTimeout(() => {
      setOpenMenu(label);
      intentTimerRef.current = null;
    }, 100);
  };

  const closeOnHover = () => {
    if (intentTimerRef.current) {
      clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 150);
  };

  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // ── Book demo ─────────────────────────────────────────────────────────────────

  const { openModal } = useBookDemo();

  const onBookDemoClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeAll();
    setMobileOpen(false);
    setOpenAccordion(null);
    openModal();
  };

  // ── Derived ───────────────────────────────────────────────────────────────────

  const headerHidden = scrollState === "hidden" && !openMenu && !mobileOpen;
  const activePillLabel = hovered ?? openMenu;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Backdrop blur — desktop (menu-open) ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className={[
          "hidden lg:block fixed inset-x-0 top-0 z-40 min-h-screen w-full pointer-events-none",
          "backdrop-blur-[30px] transition-opacity duration-300 ease-in-out",
          openMenu ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          WebkitMaskImage: "linear-gradient(black, black, transparent)",
          maskImage: "linear-gradient(black, black, transparent)",
        }}
      />

      {/* ── Backdrop blur — mobile ────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={[
          "lg:hidden fixed inset-x-0 top-0 z-40 min-h-screen w-full pointer-events-none",
          "backdrop-blur-[30px] transition-opacity duration-300 ease-in-out",
          mobileOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          WebkitMaskImage:
            "linear-gradient(black 0%, black 72%, transparent 100%)",
          maskImage: "linear-gradient(black 0%, black 72%, transparent 100%)",
        }}
      />

      {/* ── Header — full-width, flush, square ───────────────────────────────── */}
      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-50",
          "transition-[transform,opacity,background-color,box-shadow] duration-300 ease-in-out",
          headerHidden
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
          isTransparent
            ? "bg-transparent"
            : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]",
        ].join(" ")}
      >
        {/* ── Inner positioning context — max-w-7xl; containerRef stays same width ── */}
        {/* CRITICAL: containerRef must remain max-w-7xl so triggerRect - containerRect */}
        {/* math for dropdown x positioning is unchanged from the capsule layout.       */}
        <div ref={containerRef} className="relative mx-auto max-w-7xl px-6">
          {/* ── Hidden measurer ─────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -9999,
              top: 0,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {nav
              .filter((g) => !!(g.megaMenu || g.items))
              .map((group) => (
                <div
                  key={group.label}
                  ref={(el) => {
                    if (el) measurerRefs.current.set(group.label, el);
                    else measurerRefs.current.delete(group.label);
                  }}
                  className="p-8"
                  style={{ width: "max-content" }}
                >
                  <DropdownContent group={group} onClose={() => {}} />
                </div>
              ))}
          </div>

          {/* ── Content row — 80px tall, 3-col grid ─────────────────────────── */}
          <div className="h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
            {/* col 1: logo */}
            <Link
              href="/"
              onClick={closeAll}
              className="justify-self-start shrink-0"
            >
              <Image
                src="/logos/sognos-logo.svg"
                alt="Sognos"
                width={160}
                height={40}
                className="h-7 w-auto transition-[filter] duration-300"
                style={{ filter: t.logoFilter }}
              />
            </Link>

            {/* col 2: desktop nav — Aceternity hover-pill */}
            <nav
              className={[
                "hidden lg:flex items-center justify-self-center gap-0.5",
                t.navGroup,
              ].join(" ")}
              onMouseLeave={() => {
                setHovered(null);
                closeOnHover();
              }}
            >
              {nav.map((group) => {
                const hasDropdown = !!(group.megaMenu || group.items);
                const isActive = activePillLabel === group.label;
                const isOpen = openMenu === group.label;

                return (
                  <div key={group.label} className="relative">
                    {hasDropdown ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        ref={(el) => {
                          if (el) triggerRefs.current.set(group.label, el);
                          else triggerRefs.current.delete(group.label);
                        }}
                        onMouseEnter={() => {
                          setHovered(group.label);
                          openOnHover(group.label);
                        }}
                        onClick={() =>
                          isOpen ? closeAll() : setOpenMenu(group.label)
                        }
                        className={[
                          "relative px-4 py-3 text-base font-medium cursor-pointer rounded-full tracking-[-0.002em] transition-colors duration-200",
                          isActive ? "text-white" : t.text,
                        ].join(" ")}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-hover-pill"
                            className={[
                              "absolute inset-0 rounded-full",
                              t.hoverPill,
                            ].join(" ")}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.4,
                            }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {group.label}
                          <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="h-3.5 w-3.5 shrink-0 opacity-60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={group.href ?? "#"}
                        onClick={closeAll}
                        onMouseEnter={() => setHovered(group.label)}
                        className={[
                          "relative block px-4 py-3 text-base font-medium rounded-full tracking-[-0.002em] transition-colors duration-200",
                          isActive ? "text-white" : t.text,
                        ].join(" ")}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-hover-pill"
                            className={[
                              "absolute inset-0 rounded-full",
                              t.hoverPill,
                            ].join(" ")}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.4,
                            }}
                          />
                        )}
                        <span className="relative z-10">{group.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* col 3: desktop CTAs + mobile hamburger */}
            <div className="flex items-center gap-x-2 justify-self-end">
              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-x-1">
                <Link
                  href={navCTA.secondary.href}
                  onClick={closeAll}
                  className={[
                    "inline-flex items-center h-14 px-4 text-sm font-medium rounded-full transition-colors duration-150",
                    t.secondaryText,
                  ].join(" ")}
                >
                  {navCTA.secondary.name}
                </Link>
                <Link
                  href="#book-demo"
                  onClick={onBookDemoClick}
                  className={[
                    "inline-flex items-center justify-center h-14 rounded-full px-5 text-sm font-medium transition-colors duration-150",
                    t.primaryBtn,
                  ].join(" ")}
                >
                  {navCTA.primary.name}
                </Link>
              </div>

              {/* Book a Demo — tablet portrait + phone landscape (sm → lg) */}
              <Link
                href="#book-demo"
                onClick={onBookDemoClick}
                className={[
                  "hidden sm:inline-flex lg:hidden items-center justify-center h-14 rounded-full px-4 text-sm font-medium transition-colors duration-150",
                  t.primaryBtn,
                ].join(" ")}
              >
                {navCTA.primary.name}
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => {
                  closeAll();
                  if (mobileOpen) {
                    setMobileOpen(false);
                    setOpenAccordion(null);
                  } else {
                    setMobileOpen(true);
                  }
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={[
                  "lg:hidden p-2 -mr-1 rounded-full transition-colors duration-150",
                  t.hamburger,
                ].join(" ")}
              >
                {mobileOpen ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* END content row */}

          {/* ── Single desktop dropdown panel ─────────────────────────────── */}
          {/* Always uses light dropdownCard for readability regardless of bar state */}
          <AnimatePresence>
            {openMenu !== null && activeGroup && (
              <motion.div
                key="desktop-dropdown"
                onMouseEnter={cancelCloseTimer}
                onMouseLeave={closeOnHover}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 left-0 z-50 hidden lg:block"
                style={{ x: panelX, width: panelWidth || undefined }}
              >
                <div
                  className={[
                    "rounded-2xl p-8 overflow-hidden",
                    t.dropdownCard,
                  ].join(" ")}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={openMenu}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: prefersReducedMotion ? 1 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}
                    >
                      <DropdownContent group={activeGroup} onClose={closeAll} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Mobile panel — always solid (light theme) for readability ──── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-panel"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={[
                  "lg:hidden absolute left-0 right-0 md:left-auto md:w-[380px] top-full mt-2",
                  "overflow-hidden rounded-2xl",
                  THEMES.light.mobilePanel,
                ].join(" ")}
              >
                <div className="px-6">
                  {nav.map((group) => (
                    <AccordionItem
                      key={group.label}
                      group={group}
                      isOpen={openAccordion === group.label}
                      onToggle={() =>
                        setOpenAccordion((v) =>
                          v === group.label ? null : group.label,
                        )
                      }
                      onLinkClick={() => {
                        setMobileOpen(false);
                        setOpenAccordion(null);
                      }}
                    />
                  ))}
                </div>
                <div
                  className={[
                    "space-y-3 border-t px-6 pb-6 pt-5",
                    THEMES.light.mobileDivider,
                  ].join(" ")}
                >
                  <Link
                    href="#book-demo"
                    onClick={onBookDemoClick}
                    className={[
                      "block w-full rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors duration-200",
                      THEMES.light.primaryBtn,
                    ].join(" ")}
                  >
                    {navCTA.primary.name}
                  </Link>
                  <Link
                    href={navCTA.secondary.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenAccordion(null);
                    }}
                    className="block text-center text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
                  >
                    {navCTA.secondary.name}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* END positioning context */}
      </header>
    </>
  );
}
