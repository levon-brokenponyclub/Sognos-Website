"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Picks the footer for the current route: the homepage gets HomeFooter
// (Home Inspector rows, 2026-11-02), every other page the site footer.
// Both arrive pre-rendered from the server layout, which cannot read the
// pathname itself.
export default function FooterSwitch({ home, other }: { home: ReactNode; other: ReactNode }) {
  return usePathname() === "/" ? home : other;
}
