"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, navCTA, type MegaColumn, type NavItem } from "@/lib/navigation";

// ─── Icon helpers ──────────────────────────────────────────────────────────────

const PRODUCT_META: Record<string, { bg: string; path: string }> = {
  "/products/sognoscare": {
    bg: "bg-rose-50",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  "/products/sognosroster": {
    bg: "bg-blue-50",
    path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
};

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
  );
}

function ChevronRight() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-300 flex-shrink-0"
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

// ─── Column renderers ─────────────────────────────────────────────────────────

function FeatureItems({
  items,
  onClose,
}: {
  items: NavItem[];
  onClose: () => void;
}) {
  return (
    <ul className="space-y-0.5 mt-1">
      {items.map((item) => {
        const meta = PRODUCT_META[item.href];
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              {meta && (
                <div
                  className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
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
          </li>
        );
      })}
    </ul>
  );
}

function SimpleItems({
  items,
  onClose,
}: {
  items: NavItem[];
  onClose: () => void;
}) {
  return (
    <ul className="space-y-0.5 mt-1">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MegaCol({
  col,
  colIdx,
  onClose,
}: {
  col: MegaColumn;
  colIdx: number;
  onClose: () => void;
}) {
  const isEmpty = col.items.length === 0;
  const isEmptyCol3 = colIdx === 2 && isEmpty;

  return (
    <div
      className={`mega-col py-6 space-y-1 ${isEmptyCol3 ? "bg-slate-100" : "bg-white"}`}
    >
      {!isEmpty && (
        <>
          <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            {col.heading}
          </h4>
          {col.variant === "feature" ? (
            <FeatureItems items={col.items} onClose={onClose} />
          ) : (
            <SimpleItems items={col.items} onClose={onClose} />
          )}
        </>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Click-outside closes the menu
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  // Hover-intent: delay prevents panel closing when mouse crosses the gap
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleTriggerEnter = (label: string) => {
    cancelClose();
    setOpenMenu(label);
  };

  const handleLeave = () => {
    scheduleClose();
  };

  const toggleMenu = (label: string) => {
    cancelClose();
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const closeAll = () => {
    cancelClose();
    setOpenMenu(null);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 relative bg-white border-b border-gray-200"
    >
      {/* ── Nav bar ── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            onClick={closeAll}
          >
            <img
              src="/logos/sognos-logo.svg"
              alt="Sognos"
              className="h-[40px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((group) => (
              <div
                key={group.label}
                onMouseEnter={() => handleTriggerEnter(group.label)}
                onMouseLeave={handleLeave}
              >
                {group.megaMenu || group.items ? (
                  <button
                    type="button"
                    aria-expanded={openMenu === group.label}
                    onClick={() => toggleMenu(group.label)}
                    className={`flex items-center gap-1 font-light px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                      openMenu === group.label
                        ? "text-brand"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/70"
                    }`}
                  >
                    {group.label}
                    <ChevronDown open={openMenu === group.label} />
                  </button>
                ) : (
                  <Link
                    href={group.href}
                    className="font-light px-4 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50/70 transition-colors duration-200"
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
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              onClick={closeAll}
            >
              {navCTA.secondary.name}
            </Link>
            <Link
              href={navCTA.primary.href}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-dark rounded transition-colors duration-200"
              onClick={closeAll}
            >
              {navCTA.primary.name}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => {
              setMobileOpen((p) => !p);
              setMobileExpanded(null);
            }}
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

      {/* ── Desktop mega panels ── */}
      {nav.map((group) =>
        group.megaMenu && openMenu === group.label ? (
          <div
            key={group.label}
            className="mega-panel absolute inset-x-0 top-full bg-white border-t border-b border-gray-200 shadow-sm"
            onMouseEnter={cancelClose}
            onMouseLeave={handleLeave}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="mega-panel-open grid grid-cols-3 gap-0">
                {group.megaMenu.map((col, colIdx) => (
                  <MegaCol
                    key={`${group.label}-col-${colIdx}`}
                    col={col}
                    colIdx={colIdx}
                    onClose={closeAll}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}

      {/* ── Desktop simple dropdown (Company) ── */}
      {nav.map((group) =>
        !group.megaMenu && group.items && openMenu === group.label ? (
          <div
            key={`simple-${group.label}`}
            className="mega-panel absolute top-full bg-white border-t border-b border-gray-200 shadow-sm rounded-b-lg min-w-[200px]"
            style={{ left: "auto" }}
            onMouseEnter={cancelClose}
            onMouseLeave={handleLeave}
          >
            <div className="px-3 py-3">
              {group.items.map((item) => (
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
          </div>
        ) : null,
      )}

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-6 pb-6">
          <nav className="mt-4 space-y-1">
            {nav.map((group) => (
              <div key={group.label}>
                {group.items ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded((p) =>
                          p === group.label ? null : group.label,
                        )
                      }
                      className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-gray-900"
                    >
                      {group.label}
                      <ChevronDown open={mobileExpanded === group.label} />
                    </button>
                    {mobileExpanded === group.label && (
                      <div className="ml-4 mt-1 mb-2 space-y-1">
                        {(group.megaMenu
                          ? group.megaMenu[0].items
                          : group.items
                        ).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileExpanded(null);
                            }}
                            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm font-medium text-gray-900 hover:text-gray-600"
                  >
                    {group.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={navCTA.secondary.href}
              onClick={() => setMobileOpen(false)}
              className="block text-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {navCTA.secondary.name}
            </Link>
            <Link
              href={navCTA.primary.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark transition-colors duration-200"
            >
              {navCTA.primary.name}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
