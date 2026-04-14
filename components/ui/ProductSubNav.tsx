"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SubNavSection {
  label: string;
  id: string;
}

interface ProductSubNavProps {
  productName: string;
  sections: SubNavSection[];
}

export default function ProductSubNav({
  productName,
  sections,
}: ProductSubNavProps) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Show sub-nav once the sentinel (bottom of hero) scrolls out of view
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

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

  return (
    <>
      {/* Sentinel placed at end of hero — triggers sub-nav visibility */}
      <div ref={sentinelRef} aria-hidden />

      <AnimatePresence>
        {visible && (
          <motion.div
            key="product-subnav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[85px] inset-x-0 z-40 bg-white border-b border-gray-200 pointer-events-auto"
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-center justify-between h-11">
                {/* Product name */}
                <span className="text-sm font-semibold text-gray-900">
                  {productName}
                </span>

                {/* Section links */}
                <nav className="flex items-center gap-0">
                  {sections.map(({ label, id }) => {
                    const isActive = activeId === id;
                    return (
                      <Link
                        key={id}
                        href={`#${id}`}
                        className={`relative px-4 h-11 flex items-center text-sm transition-colors duration-200 ${
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
