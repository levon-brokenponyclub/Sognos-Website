"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export interface SubNavSection {
  label: string;
  id: string;
  href?: string;
  download?: boolean;
}

interface ProductSubNavProps {
  productName: string;
  sections: SubNavSection[];
  /** `pill` (default) renders in place; `bar` portals into the Navbar's
   *  section-bar slot, after routable.com/product/payouts. */
  variant?: "pill" | "bar";
}

// scroll-spy: the section crossing the middle band of the viewport is active.
function useActiveSection(sections: SubNavSection[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);
  return activeId;
}

export default function ProductSubNav({
  productName,
  sections,
  variant = "pill",
}: ProductSubNavProps) {
  return variant === "bar" ? (
    <SectionBar productName={productName} sections={sections} />
  ) : (
    <PillNav productName={productName} sections={sections} />
  );
}

// ── Bar ─────────────────────────────────────────────────────────────────────
// Full-width secondary bar hung under the fixed header: dashed hairlines,
// product name left, plain 14px section links right. Takes the header's
// colour state via `group/header` + `data-scrolled` — transparent over the
// dark hero, navy once scrolled. Dark-header pages only for now (SognosCare).
// Below lg it collapses to a disclosure.

const NAVBAR_SLOT_ID = "navbar-subnav";
const noopSubscribe = () => () => {};

function SectionBar({
  productName,
  sections,
}: Omit<ProductSubNavProps, "variant">) {
  const activeId = useActiveSection(sections);
  // The slot lives in the Navbar (layout); resolve it after hydration.
  const slot = useSyncExternalStore(
    noopSubscribe,
    () => document.getElementById(NAVBAR_SLOT_ID),
    () => null,
  );
  const detailsRef = useRef<HTMLDetailsElement>(null);
  if (!slot) return null;

  const links = sections.filter((s) => !s.download);
  const downloads = sections.filter((s) => s.download && s.href);
  const closeDisclosure = () => detailsRef.current?.removeAttribute("open");

  return createPortal(
    <nav
      aria-label={`${productName} sections`}
      className="text-white transition-colors duration-300 group-data-[scrolled=true]/header:bg-sognos-navy-dark"
    >
      {/* Desktop */}
      <div className="border-y border-dashed border-white/10 max-lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-12 px-6 py-3 text-sm leading-normal">
          <a href="#top" className="font-medium hover:text-sognos-blue-accent">
            {productName}
          </a>
          <ul className="flex items-center gap-x-3 xl:gap-x-6">
            {links.map(({ label, id, href }) => (
              <li key={id}>
                <Link
                  href={href ?? `#${id}`}
                  aria-current={activeId === id ? "true" : undefined}
                  className="text-white/75 transition-colors duration-200 hover:text-white aria-[current=true]:text-sognos-blue-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
            {downloads.map(({ label, id, href }) => (
              <li key={id}>
                <a
                  href={href}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-sognos-blue-accent"
                >
                  {label}
                  <span aria-hidden="true">&darr;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile disclosure */}
      <details
        ref={detailsRef}
        className="group/disclosure border-y border-dashed border-white/10 open:bg-sognos-navy-dark lg:hidden"
      >
        <summary className="mx-auto flex min-h-11 max-w-7xl cursor-pointer list-none items-center justify-between px-6 text-sm font-medium [&::-webkit-details-marker]:hidden">
          {productName}
          <span
            aria-hidden="true"
            className="transition-transform group-open/disclosure:rotate-180"
          >
            &#9662;
          </span>
        </summary>
        <ul className="mx-auto max-w-7xl px-6 pb-3">
          {links.map(({ label, id, href }) => (
            <li key={id}>
              <Link
                href={href ?? `#${id}`}
                onClick={closeDisclosure}
                aria-current={activeId === id ? "true" : undefined}
                className="block py-2.5 text-base text-white/75 aria-[current=true]:text-sognos-blue-accent"
              >
                {label}
              </Link>
            </li>
          ))}
          {downloads.map(({ label, id, href }) => (
            <li key={id}>
              <a
                href={href}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-base font-medium"
              >
                {label} <span aria-hidden="true">&darr;</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </nav>,
    slot,
  );
}

// ── Pill (default) ──────────────────────────────────────────────────────────

function PillNav({
  productName,
  sections,
}: Omit<ProductSubNavProps, "variant">) {
  const activeId = useActiveSection(sections);
  const navRef = useRef<HTMLElement>(null);

  // keep active link in view on mobile
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    const link = nav.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
    if (!link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offset =
      linkRect.left - navRect.left - navRect.width / 2 + linkRect.width / 2;
    nav.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className="mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain scroll-smooth rounded-full bg-white/10 p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible"
      aria-label={`${productName} sections`}
    >
      {sections
        .filter((s) => !s.download)
        .map(({ label, id, href }) => {
        const isActive = activeId === id;
        const className = `relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-base transition-colors duration-200 ${
          isActive ? "text-[#03112f] font-medium" : "text-white"
        }`;

        return (
          <Link
            key={id}
            href={href ?? `#${id}`}
            data-section-id={id}
            className={className}
          >
            {isActive && (
              <motion.span
                layoutId="subnav-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
      {sections
        .filter((s) => s.download && s.href)
        .map((s) => (
          <a
            key={s.id}
            href={s.href!}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base text-white transition-colors duration-200 hover:bg-white/20"
          >
            {s.label}
          </a>
        ))}
    </nav>
  );
}
