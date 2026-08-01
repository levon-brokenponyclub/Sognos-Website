"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

// Fades the routed content in on each client-side navigation.
//
// Deliberately a CSS animation rather than a Framer `AnimatePresence`. This
// wrapper contains the whole routed page, so anything that can strand it at
// opacity 0 blanks it. The previous `mode="wait"` version did exactly that:
// the router commits the pathname change and swaps `children` in one render,
// so AnimatePresence's exit cycle raced the commit. On routes slow enough to
// commit — the customer story and knowledge hub article templates — the exit
// tween landed on the element already holding the new page, and no enter
// animation followed. The page stayed invisible until a reload, which worked
// only because `initial={false}` skipped the hidden state on first mount.
// It also wrapped the Navbar back then, so the whole site went with it.
//
// The CSS version cannot fail closed: `animation-fill-mode` stays `none`, so
// the element's base opacity of 1 applies whenever the animation is absent,
// cancelled, or interrupted. Reduced motion is handled in the stylesheet.
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // The server-rendered page must paint immediately — fading it in would hold
  // LCP back by the length of the animation — so the route we entered on is
  // the one route that never animates. The trade-off is that navigating back
  // to it later also skips the fade; that beats a slower first paint on every
  // visit.
  const [entryPathname] = useState(pathname);

  return (
    // key restarts the animation on every navigation.
    <div
      key={pathname}
      className={pathname === entryPathname ? undefined : "page-fade-in"}
    >
      {children}
    </div>
  );
}
