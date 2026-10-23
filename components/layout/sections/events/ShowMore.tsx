"use client";

import { useState } from "react";

// Keeps long Sanity content on the page without letting it dominate the
// layout: the first `visible` children render, the rest sit behind a toggle.
// Nothing is dropped — every item is in the DOM once expanded.
export default function ShowMore({
  children,
  visible,
  moreLabel = "Show more",
  lessLabel = "Show less",
  className = "",
}: {
  children: React.ReactNode[];
  visible: number;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const hidden = children.length - visible;

  return (
    <>
      <div className={className}>
        {open ? children : children.slice(0, visible)}
      </div>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sognos-blue-accent hover:underline"
        >
          {open ? lessLabel : `${moreLabel} (${hidden})`}
        </button>
      )}
    </>
  );
}
