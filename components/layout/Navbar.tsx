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
const DARK_HERO_PATHS = new Set([
  "/",
  "/products/sognoscare",
  "/products/sognosroster",
  "/products/sognosgenogram",
  "/company/about",
]);

// ── Light / dark theme seam ────────────────────────────────────────────────────

type NavVariant = "light" | "dark";

interface NavTheme {
  text: string;
  hoverPill: string;
  navGroup: string;
  logoFilter: string;
  primaryBtn: string;
  secondaryText: string;
  dropdownCard: string;
  mobilePanel: string;
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
const SLIDE = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

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

// ── Mobile sub-panel content ───────────────────────────────────────────────────

function MobileSubContent({
  group,
  onLinkClick,
}: {
  group: NavGroup;
  onLinkClick: () => void;
}) {
  const linkCols = getLinkCols(group);
  const featuredItems = linkCols[0]?.items.slice(0, 2) ?? [];

  return (
    <>
      {linkCols.map((col, i) => (
        <div key={i}>
          {col.heading && (
            <div className="bg-gray-50 px-6 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {col.heading}
              </p>
            </div>
          )}
          {col.items.map((item) => (
            <div key={item.href} className="border-b border-gray-100">
              <Link
                href={item.href}
                onClick={onLinkClick}
                className="block px-6 py-4 text-xl font-medium text-gray-900 hover:text-sognos-blue-accent transition-colors duration-150"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      ))}

      {featuredItems.length > 0 && (
        <div className="mx-4 my-4 rounded-2xl bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF] p-5">
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onLinkClick}>
                <div className="mb-2 h-14 w-14 rounded-lg bg-sognos-navy-dark/90" />
                <p className="text-sm font-medium leading-snug text-gray-900">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ── Inline SVG helpers ────────────────────────────────────────────────────────

function IconClose() {
  return (
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
  );
}

function IconArrowLeft() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── Mobile footer (shared between Level 1 and Level 2) ───────────────────────

function MobileFooter({
  onBookDemo,
  onContactSales,
}: {
  onBookDemo: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
  onContactSales: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-gray-100 flex gap-2 p-3">
      <Link
        href="#book-demo"
        onClick={onBookDemo}
        className="flex flex-1 items-center justify-center h-14 rounded-lg text-sm font-semibold bg-sognos-navy-dark text-white transition-colors duration-150 hover:bg-sognos-navy-dark/90"
      >
        {navCTA.primary.name}
      </Link>
      <Link
        href={navCTA.secondary.href}
        onClick={onContactSales}
        className="flex flex-1 items-center justify-center h-14 rounded-lg text-sm font-semibold bg-gray-100 text-gray-900 transition-colors duration-150 hover:bg-gray-200"
      >
        {navCTA.secondary.name}
      </Link>
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
  const [mobilePanel, setMobilePanel] = useState<"root" | string>("root");
  const [scrollState, setScrollState] = useState<"top" | "hidden" | "peek">(
    "top",
  );

  // Tracks slide direction so entering panel animates from the right side
  const mobilePanelDirectionRef = useRef<"forward" | "back">("forward");

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
  const panelWidthMV = useMotionValue(0);
  const lastActiveGroupRef = useRef<NavGroup | null>(null);

  const activeGroup = nav.find(
    (g) => g.label === openMenu && (g.megaMenu || g.items),
  );
  const activeSubGroup = nav.find((g) => g.label === mobilePanel);
  if (activeGroup) lastActiveGroupRef.current = activeGroup;
  const displayGroup = lastActiveGroupRef.current;

  // ── Transparent-over-hero derived state ───────────────────────────────────────
  const useTransparent =
    transparentOverHero !== undefined
      ? transparentOverHero
      : DARK_HERO_PATHS.has(pathname);

  const isTransparent = useTransparent && scrollState === "top";
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
    const rawWidth = panelWidths.current[openMenu] ?? 400;
    const targetWidth = Math.min(rawWidth, containerRect.width - 2 * EDGE);

    const center =
      triggerRect.left - containerRect.left + triggerRect.width / 2;
    const targetX = Math.max(
      EDGE,
      Math.min(
        center - targetWidth / 2,
        containerRect.width - targetWidth - EDGE,
      ),
    );

    if (prefersReducedMotion || prevOpenMenuRef.current === null) {
      panelX.set(targetX);
      panelWidthMV.set(targetWidth);
    } else {
      animate(panelX, targetX, DROPDOWN_SPRING);
      animate(panelWidthMV, targetWidth, DROPDOWN_SPRING);
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
    }, 60);
  };

  const closeOnHover = () => {
    if (intentTimerRef.current) {
      clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 100);
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
    setMobilePanel("root");
    openModal();
  };

  // ── Mobile panel navigation ───────────────────────────────────────────────────

  const closeMobile = () => {
    setMobileOpen(false);
    setMobilePanel("root");
  };

  const goToSubPanel = (label: string) => {
    mobilePanelDirectionRef.current = "forward";
    setMobilePanel(label);
  };

  const goToRoot = () => {
    mobilePanelDirectionRef.current = "back";
    setMobilePanel("root");
  };

  // ── Derived ───────────────────────────────────────────────────────────────────

  const headerHidden = scrollState === "hidden" && !openMenu && !mobileOpen;
  const activePillLabel = hovered ?? openMenu;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Backdrop blur — desktop only (menu-open) ──────────────────────────── */}
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
        {/* ── Inner positioning context — max-w-7xl ── */}
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
                    setMobilePanel("root");
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
          <motion.div
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={closeOnHover}
            initial={false}
            animate={
              openMenu !== null
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 4 }
            }
            transition={
              openMenu !== null
                ? { duration: 0.15, ease: "easeOut" }
                : { duration: 0.1, ease: "easeIn" }
            }
            className="absolute top-full mt-2 left-0 z-50 hidden lg:block"
            style={{
              x: panelX,
              width: panelWidthMV,
              pointerEvents: openMenu !== null ? "auto" : "none",
            }}
          >
            <div
              className={[
                "rounded-2xl p-8 overflow-hidden",
                t.dropdownCard,
              ].join(" ")}
            >
              <AnimatePresence mode="wait">
                {displayGroup && (
                  <motion.div
                    key={openMenu ?? displayGroup.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}
                  >
                    <DropdownContent group={displayGroup} onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        {/* END positioning context */}
      </header>

      {/* ── Mobile full-screen overlay (two-level slide) ─────────────────────── */}
      <AnimatePresence onExitComplete={() => setMobilePanel("root")}>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[51] bg-white flex flex-col overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {mobilePanel === "root" ? (
                /* ── Level 1: Root panel ─────────────────────────────────── */
                <motion.div
                  key="root"
                  initial={{
                    x:
                      mobilePanelDirectionRef.current === "back"
                        ? "-100%"
                        : 0,
                  }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={SLIDE}
                  className="absolute inset-0 flex flex-col bg-white"
                >
                  {/* Header */}
                  <div className="shrink-0 flex h-20 items-center justify-between border-b border-gray-100 px-6">
                    <Link href="/" onClick={closeMobile} className="shrink-0">
                      <Image
                        src="/logos/sognos-logo.svg"
                        alt="Sognos"
                        width={160}
                        height={40}
                        className="h-7 w-auto"
                        style={{ filter: "none" }}
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={closeMobile}
                      aria-label="Close menu"
                      className="p-2 text-gray-900"
                    >
                      <IconClose />
                    </button>
                  </div>

                  {/* Nav list */}
                  <div className="flex-1 overflow-y-auto">
                    {nav.map((group) => {
                      const hasDropdown = !!(group.megaMenu || group.items);
                      return (
                        <div
                          key={group.label}
                          className="border-b border-gray-100"
                        >
                          {hasDropdown ? (
                            <button
                              type="button"
                              onClick={() => goToSubPanel(group.label)}
                              className="flex w-full items-center justify-between px-6 py-5"
                            >
                              <span className="text-xl font-medium text-gray-900">
                                {group.label}
                              </span>
                              <span className="text-gray-900">
                                <IconArrowRight />
                              </span>
                            </button>
                          ) : (
                            <Link
                              href={group.href ?? "#"}
                              onClick={closeMobile}
                              className="flex w-full items-center justify-between px-6 py-5"
                            >
                              <span className="text-xl font-medium text-gray-900">
                                {group.label}
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <MobileFooter
                    onBookDemo={onBookDemoClick}
                    onContactSales={closeMobile}
                  />
                </motion.div>
              ) : (
                /* ── Level 2: Sub-panel ──────────────────────────────────── */
                <motion.div
                  key={mobilePanel}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={SLIDE}
                  className="absolute inset-0 flex flex-col bg-white"
                >
                  {/* Header */}
                  <div className="shrink-0 flex h-20 items-center justify-between border-b border-gray-100 px-6">
                    <button
                      type="button"
                      onClick={goToRoot}
                      className="flex items-center gap-2 text-sm font-medium text-gray-900"
                    >
                      <IconArrowLeft />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={closeMobile}
                      aria-label="Close menu"
                      className="p-2 text-gray-900"
                    >
                      <IconClose />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto">
                    {activeSubGroup && (
                      <MobileSubContent
                        group={activeSubGroup}
                        onLinkClick={closeMobile}
                      />
                    )}
                  </div>

                  {/* Footer */}
                  <MobileFooter
                    onBookDemo={onBookDemoClick}
                    onContactSales={closeMobile}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
