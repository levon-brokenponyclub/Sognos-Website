"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface SubNavSection {
  label: string;
  id: string;
  href?: string;
}

interface ProductSubNavProps {
  productName: string;
  sections: SubNavSection[];
}

export default function ProductSubNav({ productName, sections }: ProductSubNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // scroll-spy active highlight
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
      {sections.map(({ label, id, href }) => {
        const isActive = activeId === id;
        return (
          <Link
            key={id}
            href={href ?? `#${id}`}
            data-section-id={id}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-base transition-colors duration-200 ${
              isActive ? "text-[#03112f] font-medium" : "text-white"
            }`}
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
    </nav>
  );
}
