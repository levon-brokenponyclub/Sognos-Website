"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

export default function FooterColumns({ columns }: { columns: FooterColumn[] }) {
  const [openCols, setOpenCols] = useState<Set<string>>(new Set());

  const toggle = (title: string) => {
    setOpenCols((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  return (
    <div className="flex flex-1 flex-col md:contents">
      {columns.map((column) => {
        const isOpen = openCols.has(column.title);
        return (
          <div key={column.title} className="border-b border-white/10 last:border-b-0 md:border-0 md:flex md:flex-1 md:min-w-0 md:flex-col md:gap-y-4">

            {/* Row header */}
            <button
              type="button"
              onClick={() => toggle(column.title)}
              className="flex w-full items-center justify-between py-4 text-left md:cursor-default md:py-0 md:pointer-events-none"
            >
              <span className="text-lg font-medium text-white">{column.title}</span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-4 w-4 shrink-0 text-white/40 md:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            {/* Mobile links — animated */}
            <div className="md:hidden">
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-y-2 pb-4">
                      {column.links.map((link) => (
                        <Link
                          key={`${column.title}-${link.href}`}
                          href={link.href}
                          className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop links — always visible */}
            <div className="hidden md:flex md:flex-col md:gap-y-2">
              {column.links.map((link) => (
                <Link
                  key={`${column.title}-${link.href}`}
                  href={link.href}
                  className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}
