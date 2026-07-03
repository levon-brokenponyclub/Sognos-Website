"use client";

import { useEffect, useRef, useState } from "react";

export default function PlaceholderBox({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const ratio = size.h ? (size.w / size.h).toFixed(2) : "—";

  return (
    <div
      ref={ref}
      className={`relative flex h-full min-h-[260px] w-full items-center justify-center rounded-xl border-2 border-dashed ${className}`}
    >
      <div className="text-center leading-tight">
        <div className="text-sm font-medium">{size.w} × {size.h}</div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.08em] opacity-70">aspect {ratio} : 1</div>
      </div>
    </div>
  );
}
