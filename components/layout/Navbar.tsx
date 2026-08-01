"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { nav, navCTA, type NavGroup } from "@/lib/navigation";
import { useBookDemo } from "@/lib/BookDemoContext";
import { UPCOMING_EVENT } from "@/lib/upcomingEvent";
import type { FeaturedNavItem, FeaturedNavMap } from "@/lib/featuredNav";

// ── Transparent-over-hero: paths whose first section is a dark hero ────────────
const DARK_HERO_PATHS = new Set([
  "/",
  "/contact",
  "/products/sognoscare",
  "/products/sognosroster",
  "/products/sognosgenogram",
]);
// Dynamic-route prefixes whose pages always render a dark hero.
const DARK_HERO_PATH_PREFIXES = ["/customer-stories/"];

// Lives in a plain module so the server-side layout can read it too — see
// lib/upcomingEvent.ts.

const BANNER_HEIGHT_CLASS = "top-11 md:top-11";
const BANNER_STORAGE_KEY = `navbar-banner-dismissed:${UPCOMING_EVENT.href}:${UPCOMING_EVENT.meta}`;
const BANNER_SPACE_CLASS = "h-11";

// ── Light / dark theme seam ────────────────────────────────────────────────────

type NavVariant = "light" | "dark";

interface NavTheme {
  text: string;
  activeText: string;
  hoverPill: string;
  navGroup: string;
  logoFilter: string;
  primaryBtn: string;
  secondaryText: string;
  hamburger: string;
}

const THEMES: Record<NavVariant, NavTheme> = {
  light: {
    text: "text-sognos-heading hover:text-sognos-heading",
    activeText: "text-white",
    hoverPill: "bg-sognos-navy-dark",
    navGroup: "bg-gray-100 rounded-full p-2",
    logoFilter: "none",
    primaryBtn:
      "bg-sognos-navy-dark text-white hover:bg-sognos-blue-accent hover:text-white",
    secondaryText: "text-sognos-heading hover:text-sognos-heading",
    hamburger: "text-sognos-heading/60 hover:text-sognos-heading",
  },
  dark: {
    text: "text-white hover:text-sognos-heading",
    activeText: "text-sognos-heading",
    hoverPill: "bg-white",
    navGroup: "bg-white/5 rounded-full p-2",
    logoFilter: "brightness(0) invert(1)",
    primaryBtn:
      "bg-white text-sognos-navy-dark hover:bg-sognos-blue-accent hover:text-white",
    secondaryText: "text-white hover:text-white",
    hamburger: "text-white/80 hover:text-white",
  },
};

// Mobile panel slide
const SLIDE = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

// ── Helpers ────────────────────────────────────────────────────────────────────

function getLinkCols(group: NavGroup) {
  return (group.megaMenu ?? []).filter((col) => col.items.length > 0);
}

// ── Desktop dropdown content ───────────────────────────────────────────────────

function IconArrowUpRight() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// Single image-backed block: full-bleed photo, copy and arrow over it. The
// reference has no scrim, but the hero images here are light enough that white
// text needs one — hence the gradient.
function FeaturedPromo({
  item,
  onClose,
}: {
  item: FeaturedNavItem;
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="group/feat w-[26rem] shrink-0"
    >
      <div className="relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-lg bg-sognos-navy">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="416px"
          className="object-cover transition-transform duration-500 group-hover/feat:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        <div className="relative z-10 flex items-end justify-between gap-4 p-5">
          <div className="min-w-0">
            <p className="font-heading text-lg font-medium leading-snug text-white">
              {item.title}
            </p>
            {item.description && (
              <p className="mt-1.5 text-sm leading-snug text-white/80">
                {item.description}
              </p>
            )}
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white bg-white text-sognos-navy transition-colors duration-200 group-hover/feat:bg-transparent group-hover/feat:text-white">
            <IconArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedColumn({
  items,
  onClose,
}: {
  items: FeaturedNavItem[];
  onClose: () => void;
}) {
  return (
    <div className="w-[26rem] shrink-0 rounded-lg bg-gray-50 p-6">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
        Featured
      </p>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group/feat flex items-start gap-4"
          >
            <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-sognos-navy">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="112px"
                className="object-cover transition-transform duration-500 group-hover/feat:scale-105"
              />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-medium leading-snug text-sognos-heading transition-colors duration-200 group-hover/feat:text-sognos-blue-accent">
                {item.title}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DropdownContent({
  group,
  onClose,
  featured = {},
}: {
  group: NavGroup;
  onClose: () => void;
  featured?: FeaturedNavMap;
}) {
  const linkCols = getLinkCols(group);
  // Groups absent from the map keep the gradient panel.
  const featuredGroup = featured[group.label];
  const featuredItems = featuredGroup?.items ?? [];
  return (
    <div className="flex gap-12">
      {linkCols.map((col, i) => (
        <div key={i} className="w-52 shrink-0">
          {col.heading && (
            <h4 className="mb-4 text-xs font-normal uppercase tracking-widest text-sognos-muted">
              {col.heading}
            </h4>
          )}
          <ul>
            {col.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-base text-gray-900 hover:text-sognos-blue-accent transition-colors duration-150"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {featuredGroup?.variant === "promo" && featuredItems[0] ? (
        <FeaturedPromo item={featuredItems[0]} onClose={onClose} />
      ) : featuredItems.length > 0 ? (
        <FeaturedColumn items={featuredItems} onClose={onClose} />
      ) : (
        <div className="w-[26rem] shrink-0 min-h-[320px] rounded-lg bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]" />
      )}
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
        <div className="mx-4 my-4 rounded-lg bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF] p-5">
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
        className="flex flex-1 items-center justify-center h-14 rounded-lg text-base font-normal bg-sognos-navy-dark text-white transition-colors duration-150 hover:bg-sognos-blue-accent hover:text-white"
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
  featured = {},
}: {
  variant?: NavVariant;
  transparentOverHero?: boolean;
  /** Keyed by nav group label; resolved server-side — see lib/featuredNav.ts. */
  featured?: FeaturedNavMap;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [hovered, setHovered] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"root" | string>("root");
  const [scrolled, setScrolled] = useState(false);
  // Measured dimensions of the active dropdown content — drives CSS transition on card
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  // Mobile slide direction — state (not ref) because it drives motion.div animation values during render
  const [mobilePanelDirection, setMobilePanelDirection] = useState<
    "forward" | "back"
  >("forward");
  // Desktop content directional slide — state (not ref) because it drives motion.div animation values during render
  const [slideDirection, setSlideDirection] = useState<"forward" | "back">(
    "forward",
  );
  // Tracks current open item's nav index so direction can be computed on switch
  const prevOpenIndexRef = useRef<number>(-1);

  const headerRef = useRef<HTMLElement>(null);
  // Hidden off-screen divs that render each DropdownContent at natural size
  const measurerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const intentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref mirror of openMenu for use inside timer callbacks without stale closure
  const openMenuRef = useRef<string | null>(null);
  useEffect(() => {
    openMenuRef.current = openMenu;
  }, [openMenu]);
  const activeGroup = nav.find(
    (g) => g.label === openMenu && (g.megaMenu || g.items),
  );
  const activeSubGroup = nav.find((g) => g.label === mobilePanel);

  // ── Transparent-over-hero derived state ───────────────────────────────────────
  const useTransparent =
    transparentOverHero !== undefined
      ? transparentOverHero
      : variant === "dark" ||
        DARK_HERO_PATHS.has(pathname) ||
        DARK_HERO_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Content theme is fixed per page — never flips on scroll.
  const t = useTransparent ? THEMES.dark : THEMES.light;
  // Only the bar background changes on scroll (dark-hero pages).
  const barTransparent = useTransparent && !scrolled;

  // Banner runs opposite the hero so it always separates from what is below it:
  // white over a dark hero, navy over a light one. Text and borders have to flip
  // with the background, not just the fill.
  const bannerTheme = useTransparent
    ? {
        bar: "bg-white border-white/0",
        text: "text-sognos-heading",
        chipBorder: "border-sognos-muted",
      }
    : {
        bar: "bg-sognos-navy-dark border-white/15",
        text: "text-white",
        chipBorder: "border-white/60",
      };

  // ── Measure dropdown dimensions ───────────────────────────────────────────────
  // Runs synchronously before paint so card dimensions are correct from first frame

  useLayoutEffect(() => {
    if (!openMenu) return;
    const el = measurerRefs.current.get(openMenu);
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setDropdownWidth(width);
    setDropdownHeight(height);
  }, [openMenu]);

  // ── Scroll state — bar bg swap + banner hide ─────────────────────────────────

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
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
    prevOpenIndexRef.current = -1;
    setOpenMenu(null);
    setHovered(null);
  };

  // Set slide direction and update prevOpenIndexRef before calling setOpenMenu
  const recordDirection = (label: string) => {
    const newIndex = nav.findIndex((g) => g.label === label);
    setSlideDirection(
      prevOpenIndexRef.current === -1 || newIndex > prevOpenIndexRef.current
        ? "forward"
        : "back",
    );
    prevOpenIndexRef.current = newIndex;
  };

  const openOnHover = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openMenuRef.current === label) return;
    // Already open on another item — switch immediately, no intent delay
    if (openMenuRef.current !== null) {
      if (intentTimerRef.current) {
        clearTimeout(intentTimerRef.current);
        intentTimerRef.current = null;
      }
      recordDirection(label);
      setOpenMenu(label);
      return;
    }
    if (intentTimerRef.current) clearTimeout(intentTimerRef.current);
    intentTimerRef.current = setTimeout(() => {
      recordDirection(label);
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
    setMobilePanelDirection("forward");
    setMobilePanel(label);
  };

  const goToRoot = () => {
    setMobilePanelDirection("back");
    setMobilePanel("root");
  };

  // ── Derived ───────────────────────────────────────────────────────────────────

  const bannerDismissed = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleChange = () => onStoreChange();

      window.addEventListener("storage", handleChange);
      window.addEventListener("navbar-banner-dismissed", handleChange);

      return () => {
        window.removeEventListener("storage", handleChange);
        window.removeEventListener("navbar-banner-dismissed", handleChange);
      };
    },
    () => {
      if (typeof window === "undefined") {
        return false;
      }
      return window.localStorage.getItem(BANNER_STORAGE_KEY) === "true";
    },
    () => false,
  );

  const activePillLabel = hovered ?? openMenu;
  // Banner hides on scroll (translate-y) and navbar shifts up to top-0
  const bannerScrolledAway = bannerDismissed || scrolled;
  const bannerOffsetClass = bannerScrolledAway ? "top-0" : BANNER_HEIGHT_CLASS;

  const dismissBanner = () => {
    window.localStorage.setItem(BANNER_STORAGE_KEY, "true");
    window.dispatchEvent(new Event("navbar-banner-dismissed"));
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {!bannerDismissed && <div aria-hidden="true" className={BANNER_SPACE_CLASS} />}

      {/* ── Announcement banner ─────────────────────────────────────────────── */}
      {!bannerDismissed && (
        <div
          className={[
            "fixed inset-x-0 top-0 z-[60] border-b",
            bannerTheme.bar,
            bannerTheme.text,
            "transition-transform duration-300 ease-in-out",
            scrolled ? "-translate-y-full" : "translate-y-0",
          ].join(" ")}
        >
          {/* One centred group: label, event name, then the CTA. The segmented
              panels (border-r / border-l dividers and the tinted backings) are
              gone, as is UPCOMING_EVENT.meta — the constant is still read by
              BANNER_STORAGE_KEY, so nothing is orphaned by hiding it here. */}
          <div className="max-w-7xl mx-auto relative flex h-11 w-full items-center px-2">
            {/* Mobile — chip plus a right-to-left marquee of the title. The
                title is duplicated for a seamless loop, so the visible copies
                are hidden from assistive tech and a single sr-only copy carries
                the text. */}
            <Link
              href={UPCOMING_EVENT.href}
              onClick={dismissBanner}
              className="flex min-w-0 flex-1 items-center gap-2 self-stretch md:hidden"
            >
              <span
                className={`shrink-0 inline-flex border ${bannerTheme.chipBorder} rounded px-2 py-0.5 text-xxs font-medium uppercase tracking-wider align-middle`}
              >
                {UPCOMING_EVENT.label}
              </span>

              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="banner-marquee-track" aria-hidden="true">
                  <span className="whitespace-nowrap pr-10 text-xxs font-medium">
                    {UPCOMING_EVENT.title}
                  </span>
                  <span className="whitespace-nowrap pr-10 text-xxs font-medium">
                    {UPCOMING_EVENT.title}
                  </span>
                </div>
                <span className="sr-only">{UPCOMING_EVENT.title}</span>
              </div>
            </Link>

            {/* Desktop — centred group with the CTA */}
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex">
              <span
                className={`shrink-0 inline-flex border ${bannerTheme.chipBorder} rounded px-2.5 py-1 text-sm font-normal uppercase tracking-wider align-middle md:text-xs`}
              >
                {UPCOMING_EVENT.label}
              </span>

              <span className="truncate text-sm font-medium">
                {UPCOMING_EVENT.title}
              </span>

              <Link
                href={UPCOMING_EVENT.href}
                onClick={dismissBanner}
                className="group/cta flex shrink-0 items-center gap-1.5 text-sm font-medium underline decoration-dotted transition-colors duration-200 hover:text-sognos-blue-accent"
              >
                View event
                <svg
                  className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <button
              type="button"
              onClick={dismissBanner}
              className="ml-2 flex shrink-0 items-center px-2 transition-opacity hover:opacity-70"
              aria-label="Close announcement banner"
            >
              <IconClose />
            </button>
          </div>
        </div>
      )}

      {/* ── Backdrop blur — desktop only (menu-open) ──────────────────────────── */}
      <div
        aria-hidden="true"
        className={[
          "hidden lg:block fixed inset-x-0 z-40 min-h-screen w-full pointer-events-none",
          bannerOffsetClass,
          "backdrop-blur-[30px] transition-opacity duration-300 ease-in-out",
          openMenu ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          WebkitMaskImage: "linear-gradient(black, black, transparent)",
          maskImage: "linear-gradient(black, black, transparent)",
        }}
      />

      {/* ── Header — hides on scroll-down, peeks on scroll-up ─────────────────── */}
      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 z-50",
          bannerOffsetClass,
          "transition-[top,background-color,border-color] duration-300 ease-in-out",
          "border-b",
          scrolled
            ? useTransparent
              ? "border-sognos-navy"
              : "border-sognos-line"
            : "border-transparent",
          useTransparent
            ? barTransparent
              ? "bg-transparent"
              : "bg-sognos-navy-dark"
            : "bg-white",
        ].join(" ")}
      >
        {/* ── Inner positioning context — max-w-7xl ── */}
        <div className="relative mx-auto max-w-7xl px-6">
          {/* ── Hidden measurers — always in DOM, off-screen ────────────────── */}
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
                  className="p-6"
                  style={{ width: "max-content" }}
                >
                  <DropdownContent
                    group={group}
                    onClose={() => {}}
                    featured={featured}
                  />
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
                "hidden lg:flex items-center justify-self-center gap-0.5 h-14",
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
                        onMouseEnter={() => {
                          setHovered(group.label);
                          openOnHover(group.label);
                        }}
                        onClick={() => {
                          if (isOpen) {
                            closeAll();
                          } else {
                            recordDirection(group.label);
                            setOpenMenu(group.label);
                          }
                        }}
                        className={[
                          "relative px-4 py-2.5 text-base font-normal cursor-pointer rounded-full tracking-tight transition-colors duration-200",
                          isActive ? t.activeText : t.text,
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
                          "relative block px-4 py-3 text-base font-medium rounded-full tracking-tight transition-colors duration-200",
                          isActive ? t.activeText : t.text,
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
                {/* <Link
                  href={navCTA.secondary.href}
                  onClick={closeAll}
                  className={[
                    "inline-flex items-center h-10 px-4 text-base font-normal rounded-full transition-colors duration-150",
                    t.secondaryText,
                  ].join(" ")}
                >
                  {navCTA.secondary.name}
                </Link> */}
                <Link
                  href="#book-demo"
                  onClick={onBookDemoClick}
                  className={[
                    "inline-flex items-center justify-center h-12 rounded-sm px-4 text-base font-normal tracking-tight transition-colors duration-200",
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
        </div>
        {/* END inner container */}

        {/* ── Desktop dropdown panel ────────────────────────────────────────────
            Mounted outside max-w-7xl so inset-x-0 is relative to the full header
            (viewport width). Fixed key keeps the motion.div alive across item
            switches — only AnimatePresence mounts/unmounts on open ↔ closed.   */}
        <AnimatePresence>
          {openMenu !== null && (
            <motion.div
              key="dropdown-panel"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.9, rotateX: -10 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, rotateX: 0 }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, rotateX: -10 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
              }
              style={{ transformOrigin: "top center", perspective: 800 }}
              className="absolute inset-x-0 top-full z-50 hidden lg:flex justify-center pointer-events-none mt-4"
            >
              {/* Card — re-enables pointer events; CSS transitions width + height */}
              <div
                onMouseEnter={cancelCloseTimer}
                onMouseLeave={closeOnHover}
                className="pointer-events-auto relative overflow-hidden rounded-lg bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                style={{
                  width: dropdownWidth || undefined,
                  height: dropdownHeight || undefined,
                  transition: prefersReducedMotion
                    ? "none"
                    : "width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Content directional slide — popLayout so exit+enter overlap */}
                <AnimatePresence mode="popLayout">
                  {activeGroup && (
                    <motion.div
                      key={openMenu}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x:
                                slideDirection === "forward"
                                  ? 200
                                  : -200,
                            }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x:
                                slideDirection === "forward"
                                  ? -200
                                  : 200,
                            }
                      }
                      transition={
                        prefersReducedMotion ? { duration: 0 } : SLIDE
                      }
                    >
                      <div className="p-6">
                        <DropdownContent
                          group={activeGroup}
                          onClose={closeAll}
                          featured={featured}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            className={[
              "lg:hidden fixed inset-x-0 bottom-0 z-[51] bg-white flex flex-col overflow-hidden",
              bannerOffsetClass,
            ].join(" ")}
          >
            <AnimatePresence mode="wait">
              {mobilePanel === "root" ? (
                /* ── Level 1: Root panel ─────────────────────────────────── */
                <motion.div
                  key="root"
                  initial={{
                    x: mobilePanelDirection === "back" ? "-100%" : 0,
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
