"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// One footer link group. Below `sm` it collapses into an accordion (existing
// behaviour); from `sm` the links are always visible.

type FooterLinkGroupProps = {
  title: string;
  links: { label: string; href: string }[];
};

const LINK =
  "inline-flex min-h-11 items-center text-sm text-sognos-body transition-colors duration-200 hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent sm:min-h-0 sm:py-1";

export default function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  const [open, setOpen] = useState(false);
  const list = (
    <ul className="flex flex-col sm:gap-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={LINK}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label={title} className="border-b border-sognos-line sm:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-sognos-blue-accent sm:hidden"
      >
        <span className="font-heading text-base font-normal text-sognos-heading">
          {title}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="size-4 shrink-0 text-sognos-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {/* Mobile: accordion */}
      <div className="sm:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden pb-3"
            >
              {list}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* sm+: plain heading, links always visible */}
      <div className="hidden sm:block">
        <p className="font-heading text-base font-normal text-sognos-heading">
          {title}
        </p>
        <div className="mt-4">{list}</div>
      </div>
    </nav>
  );
}
