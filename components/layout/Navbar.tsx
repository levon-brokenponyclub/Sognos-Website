"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { nav, navCTA, type MegaColumn, type NavItem } from "@/lib/navigation";

// ─── Constants ─────────────────────────────────────────────────────────────────

type Direction = "ltr" | "rtl";

const SHELL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EXIT_EASE = [0.7, 0, 0.84, 0] as [number, number, number, number];
const STAGGER_STEP = 0.038;
const ITEM_X = 6;
const CONTENT_X = 84;

// ─── Animation helpers ─────────────────────────────────────────────────────────

const contentVariants = {
  enter: (dir: Direction) => ({
    opacity: 0,
    x: dir === "rtl" ? CONTENT_X : -CONTENT_X,
  }),
  center: { opacity: 1, x: 0 },
  exit: (dir: Direction) => ({
    opacity: 0,
    x: dir === "rtl" ? -CONTENT_X : CONTENT_X,
  }),
};

const mobilePanelVariants = {
  enter: { opacity: 0, x: 26 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: SHELL_EASE },
  },
  exit: {
    opacity: 0,
    x: -18,
    transition: { duration: 0.2, ease: EXIT_EASE },
  },
};

function flatIndex(
  colIdx: number,
  rowIdx: number,
  columns: MegaColumn[],
): number {
  const before = columns
    .slice(0, colIdx)
    .reduce((sum, col) => sum + 1 + col.items.length, 0);
  return before + rowIdx + 1;
}

function itemDelay(
  colIdx: number,
  rowIdx: number,
  columns: MegaColumn[],
  direction: Direction,
): number {
  const total = columns.reduce((sum, col) => sum + 1 + col.items.length, 0);
  let flat = flatIndex(colIdx, rowIdx, columns);
  if (direction === "rtl") flat = total - 1 - flat;
  return Math.max(0, flat) * STAGGER_STEP;
}

function itemInitial(direction: Direction) {
  return { opacity: 0, x: direction === "rtl" ? ITEM_X : -ITEM_X, y: 4 };
}

function itemTransition(
  colIdx: number,
  rowIdx: number,
  columns: MegaColumn[],
  direction: Direction,
): Transition {
  return {
    duration: 0.18,
    ease: "easeOut",
    delay: itemDelay(colIdx, rowIdx, columns, direction),
  };
}

// ─── Icon meta (keyed by product name) ─────────────────────────────────────────

type ProductMeta = { bg: string; path: string; color: string };

const PRODUCT_META: Record<string, ProductMeta> = {
  SognosCare: {
    bg: "bg-rose-50",
    color: "text-rose-500",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  SognosRoster: {
    bg: "bg-blue-50",
    color: "text-blue-600",
    path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  "AI Agents": {
    bg: "bg-violet-50",
    color: "text-violet-500",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  Quickstart: {
    bg: "bg-amber-50",
    color: "text-amber-500",
    path: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
};

// ─── Icon components ───────────────────────────────────────────────────────────

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.span
      className="inline-flex text-current"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: SHELL_EASE }}
      aria-hidden
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </motion.span>
  );
}

function ChevronRight({
  className = "w-3.5 h-3.5 text-gray-300",
}: {
  className?: string;
}) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

// ─── Column renderers ──────────────────────────────────────────────────────────

function FeatureItems({
  items,
  onClose,
  colIdx,
  columns,
  direction,
}: {
  items: NavItem[];
  onClose: () => void;
  colIdx: number;
  columns: MegaColumn[];
  direction: Direction;
}) {
  return (
    <ul className="space-y-0.5 mt-1">
      {items.map((item, rowIdx) => {
        const meta = PRODUCT_META[item.name];
        return (
          <motion.li
            key={item.name}
            initial={itemInitial(direction)}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={itemTransition(colIdx, rowIdx, columns, direction)}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              {meta && (
                <div
                  className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <svg
                    className={`w-4 h-4 ${meta.color}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={meta.path}
                    />
                  </svg>
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-brand transition-colors duration-200">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                )}
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}

function SimpleItems({
  items,
  onClose,
  colIdx,
  columns,
  direction,
}: {
  items: NavItem[];
  onClose: () => void;
  colIdx: number;
  columns: MegaColumn[];
  direction: Direction;
}) {
  return (
    <ul className="space-y-0.5 mt-1">
      {items.map((item, rowIdx) => (
        <motion.li
          key={item.name}
          initial={itemInitial(direction)}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={itemTransition(colIdx, rowIdx, columns, direction)}
        >
          <Link
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight />
            {item.name}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}

function MegaCol({
  col,
  colIdx,
  onClose,
  columns,
  direction,
}: {
  col: MegaColumn;
  colIdx: number;
  onClose: () => void;
  columns: MegaColumn[];
  direction: Direction;
}) {
  const isEmpty = col.items.length === 0;
  const isEmptyCol3 = colIdx === 2 && isEmpty;

  return (
    <div
      className={`mega-col py-6 space-y-1 ${isEmptyCol3 ? "bg-slate-100" : "bg-white"}`}
    >
      {!isEmpty && (
        <>
          <motion.h4
            initial={itemInitial(direction)}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={itemTransition(colIdx, -1, columns, direction)}
            className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
          >
            {col.heading}
          </motion.h4>
          {col.variant === "feature" ? (
            <FeatureItems
              items={col.items}
              onClose={onClose}
              colIdx={colIdx}
              columns={columns}
              direction={direction}
            />
          ) : (
            <SimpleItems
              items={col.items}
              onClose={onClose}
              colIdx={colIdx}
              columns={columns}
              direction={direction}
            />
          )}
        </>
      )}
    </div>
  );
}

// ─── Mobile helpers ────────────────────────────────────────────────────────────

function getMobilePanelId(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("ltr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState("root");
  const [mobileHistory, setMobileHistory] = useState<string[]>([]);
  const [colorMode, setColorMode] = useState<"dark" | "light">("dark");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef<number>(-1);

  // Click-outside closes desktop menu
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        activeIndexRef.current = -1;
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  // Body scroll lock when mobile open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Scroll-driven dark/light colour detection
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = headerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const probeY = rect.top + rect.height / 2;
        let mode: "dark" | "light" = "light";
        document.querySelectorAll("[data-header-dark]").forEach((section) => {
          const r = section.getBoundingClientRect();
          if (probeY >= r.top && probeY <= r.bottom) mode = "dark";
        });
        setColorMode(mode);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Hover-intent delay
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      activeIndexRef.current = -1;
    }, 200);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleTriggerEnter = (label: string, index: number) => {
    cancelClose();
    if (activeIndexRef.current !== -1 && index !== activeIndexRef.current) {
      setDirection(index > activeIndexRef.current ? "rtl" : "ltr");
    }
    activeIndexRef.current = index;
    setOpenMenu(label);
  };

  const toggleMenu = (label: string, index: number) => {
    cancelClose();
    if (openMenu === label) {
      setOpenMenu(null);
      activeIndexRef.current = -1;
    } else {
      if (activeIndexRef.current !== -1 && index !== activeIndexRef.current) {
        setDirection(index > activeIndexRef.current ? "rtl" : "ltr");
      }
      activeIndexRef.current = index;
      setOpenMenu(label);
    }
  };

  const closeAll = () => {
    cancelClose();
    setOpenMenu(null);
    activeIndexRef.current = -1;
  };

  // Mobile helpers
  const drillTo = (panelId: string) => {
    setMobileHistory((h) => [...h, mobilePanel]);
    setMobilePanel(panelId);
  };

  const drillBack = () => {
    setMobileHistory((h) => {
      const next = [...h];
      const prev = next.pop() ?? "root";
      setMobilePanel(prev);
      return next;
    });
  };

  const openMobile = () => {
    cancelClose();
    closeAll();
    setMobilePanel("root");
    setMobileHistory([]);
    setMobileOpen(true);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobilePanel("root");
    setMobileHistory([]);
  };

  const mobileTitle =
    mobilePanel === "root"
      ? "Menu"
      : (nav.find((g) => getMobilePanelId(g.label) === mobilePanel)?.label ??
        mobilePanel);

  const activeGroup = nav.find((g) => g.label === openMenu && g.megaMenu);
  const activeSimpleGroup = nav.find(
    (g) => g.label === openMenu && !g.megaMenu && g.items,
  );

  const linkClass =
    colorMode === "dark"
      ? "text-white/80 hover:text-white"
      : "text-[rgb(18_35_72/0.75)] hover:text-brand";

  const ctaClass =
    colorMode === "dark"
      ? "bg-white text-brand hover:opacity-90"
      : "bg-brand text-white hover:bg-brand-dark";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none"
    >
      {/* ── Nav bar ── */}
      <div
        className={[
          "pointer-events-auto w-full px-6",
          "transition-[background-color,border-color] duration-300",
          colorMode === "light"
            ? "bg-white border-b border-sognos-border"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between h-17">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              onClick={closeAll}
            >
              <Image
                src="/logos/sognos-logo.svg"
                alt="Sognos"
                width={160}
                height={40}
                className="h-10 w-auto transition-[filter] duration-300"
                style={
                  colorMode === "dark"
                    ? { filter: "brightness(0) invert(1)" }
                    : undefined
                }
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {nav.map((group, groupIndex) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (group.megaMenu || group.items) {
                      handleTriggerEnter(group.label, groupIndex);
                    } else {
                      scheduleClose();
                    }
                  }}
                  onMouseLeave={() => scheduleClose()}
                >
                  {group.megaMenu || group.items ? (
                    <button
                      type="button"
                      aria-expanded={openMenu === group.label}
                      onClick={() => toggleMenu(group.label, groupIndex)}
                      className={`flex items-center gap-1 font-medium px-4 py-2 rounded-md text-sm transition-colors duration-300 ${
                        openMenu === group.label
                          ? "opacity-100"
                          : "opacity-80 hover:opacity-100"
                      } ${linkClass}`}
                    >
                      {group.label}
                      <ChevronDown open={openMenu === group.label} />
                    </button>
                  ) : (
                    <Link
                      href={group.href}
                      className={`font-medium px-4 py-2 rounded-md text-sm opacity-80 hover:opacity-100 transition-colors duration-300 ${linkClass}`}
                      onClick={closeAll}
                    >
                      {group.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={navCTA.secondary.href}
                className={`text-sm font-medium transition-colors duration-300 opacity-80 hover:opacity-100 ${linkClass}`}
                onClick={closeAll}
              >
                {navCTA.secondary.name}
              </Link>
              <Link
                href={navCTA.primary.href}
                className={`inline-flex items-center px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${ctaClass}`}
                onClick={closeAll}
              >
                {navCTA.primary.name}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors duration-200 ${
                colorMode === "dark"
                  ? "text-white/80 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={mobileOpen ? closeMobile : openMobile}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  className="w-5 h-5"
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
                  className="w-5 h-5"
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
      </div>

      {/* ── Desktop mega panel ── */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            key="mega-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: SHELL_EASE }}
            className="mega-panel absolute inset-x-0 top-full bg-white border-t border-b border-gray-200 shadow-sm"
            onMouseEnter={cancelClose}
            onMouseLeave={() => scheduleClose()}
          >
            <div className="mx-auto max-w-7xl px-6">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={openMenu}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { duration: 0.26, ease: SHELL_EASE },
                    opacity: { duration: 0.16, ease: "easeOut" },
                  }}
                  className="mega-panel-open grid grid-cols-3 gap-0"
                >
                  {activeGroup.megaMenu!.map((col, colIdx) => (
                    <MegaCol
                      key={`${activeGroup.label}-col-${colIdx}`}
                      col={col}
                      colIdx={colIdx}
                      onClose={closeAll}
                      columns={activeGroup.megaMenu!}
                      direction={direction}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop simple dropdown (Company) ── */}
      <AnimatePresence>
        {activeSimpleGroup && (
          <motion.div
            key={`simple-${activeSimpleGroup.label}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: SHELL_EASE }}
            className="mega-panel absolute top-full bg-white border-t border-b border-gray-200 shadow-sm rounded-b-lg min-w-50"
            style={{ left: "auto" }}
            onMouseEnter={cancelClose}
            onMouseLeave={() => scheduleClose()}
          >
            <div className="px-3 py-3">
              {activeSimpleGroup.items!.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors duration-200"
                >
                  <ChevronRight />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drilldown overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden fixed top-17 inset-x-0 bottom-0 bg-white z-50 flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Sticky drilldown header */}
            <div className="sticky top-0 bg-white z-10 flex items-center h-12 px-4 border-b border-gray-100 shrink-0">
              {mobileHistory.length > 0 && (
                <button
                  onClick={drillBack}
                  className="p-1.5 -ml-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 shrink-0 mr-2"
                  aria-label="Back"
                >
                  <ChevronLeft />
                </button>
              )}
              <span className="text-sm font-semibold text-gray-900">
                {mobileTitle}
              </span>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobilePanel}
                  variants={mobilePanelVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* ROOT panel */}
                  {mobilePanel === "root" && (
                    <div className="px-3 py-3 space-y-0.5">
                      {nav.map((group) => {
                        const hasSub = !!(group.megaMenu || group.items);
                        const panelId = getMobilePanelId(group.label);
                        return hasSub ? (
                          <button
                            key={group.label}
                            type="button"
                            onClick={() => drillTo(panelId)}
                            className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                          >
                            {group.label}
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </button>
                        ) : (
                          <Link
                            key={group.label}
                            href={group.href}
                            onClick={closeMobile}
                            className="block px-3 py-3 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            {group.label}
                          </Link>
                        );
                      })}
                      <div className="px-1 pt-4 pb-2">
                        <Link
                          href={navCTA.primary.href}
                          onClick={closeMobile}
                          className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors duration-200"
                        >
                          {navCTA.primary.name}
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Sub-panels — uses `items` flat list when available, mega columns as fallback */}
                  {nav
                    .filter((g) => g.megaMenu || g.items)
                    .map((group) => {
                      const panelId = getMobilePanelId(group.label);
                      if (mobilePanel !== panelId) return null;

                      // Flat list — preferred when group.items is defined
                      if (group.items) {
                        return (
                          <div key={panelId} className="px-3 py-3 space-y-0.5">
                            {group.items.map((item) => {
                              const meta = PRODUCT_META[item.name];
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobile}
                                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                >
                                  {meta && (
                                    <div
                                      className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}
                                    >
                                      <svg
                                        className={`w-4 h-4 ${meta.color}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d={meta.path}
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                    {item.description && (
                                      <div className="text-xs text-gray-500 mt-0.5">
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        );
                      }

                      // Mega columns fallback (e.g. Why Sognos, Knowledge Hub)
                      return (
                        <div key={panelId}>
                          {group
                            .megaMenu!.filter((col) => col.items.length > 0)
                            .map((col, i) => (
                              <div
                                key={i}
                                className={`px-3 py-5 ${i > 0 ? "border-t border-gray-100" : ""}`}
                              >
                                <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                  {col.heading}
                                </p>
                                <div className="space-y-0.5">
                                  {col.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={closeMobile}
                                      className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors duration-200"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom CTA bar (visible on all sub-panels) */}
            {mobilePanel !== "root" && (
              <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-4">
                <Link
                  href={navCTA.secondary.href}
                  onClick={closeMobile}
                  className="block text-center text-sm font-medium text-gray-700 hover:text-gray-900 mb-3"
                >
                  {navCTA.secondary.name}
                </Link>
                <Link
                  href={navCTA.primary.href}
                  onClick={closeMobile}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors duration-200"
                >
                  {navCTA.primary.name}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
