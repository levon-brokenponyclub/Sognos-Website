"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, navCTA, NavGroup } from "@/lib/navigation";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <header className="relative z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Sognos
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((group: NavGroup) => (
            <div key={group.label} className="relative">
              {group.items ? (
                <>
                  <button
                    onClick={() => handleToggle(group.label)}
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {group.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${openMenu === group.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openMenu === group.label && (
                    <div className="absolute left-0 top-full mt-1 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="block rounded-md px-3 py-2 hover:bg-gray-50"
                        >
                          <span className="block text-sm font-medium text-gray-900">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="block text-xs text-gray-500">{item.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={group.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {group.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA group */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={navCTA.secondary.href}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            {navCTA.secondary.name}
          </Link>
          <Link
            href={navCTA.primary.href}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            {navCTA.primary.name}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-gray-700 lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-6 pb-6 lg:hidden">
          <nav className="mt-4 space-y-1">
            {nav.map((group) => (
              <div key={group.label}>
                {group.items ? (
                  <div>
                    <button
                      onClick={() => handleToggle(group.label)}
                      className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
                    >
                      {group.label}
                      <svg
                        className={`h-4 w-4 transition-transform ${openMenu === group.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openMenu === group.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setOpenMenu(null);
                              setMobileOpen(false);
                            }}
                            className="block py-2 text-sm text-gray-700"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-sm font-medium text-gray-900"
                  >
                    {group.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-6 space-y-3">
            <Link
              href={navCTA.secondary.href}
              onClick={() => setMobileOpen(false)}
              className="block text-center text-sm font-medium text-gray-700"
            >
              {navCTA.secondary.name}
            </Link>
            <Link
              href={navCTA.primary.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {navCTA.primary.name}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
