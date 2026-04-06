"use client";

import type React from "react";
import Image from "next/image";
import { OrbitingCircles } from "@/components/ui/OrbitingCircles";

// ─── Icon bubble wrapper ──────────────────────────────────────────────────────

function IconBubble({
  children,
  bg = "bg-white/90",
  size = "md",
}: {
  children: React.ReactNode;
  bg?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8 p-1.5" : "h-10 w-10 p-2";
  return (
    <div className={`${dim} ${bg} flex items-center justify-center rounded-full shadow-md`}>
      {children}
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export default function IconOrbit() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
      {/* Center node */}
      <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
        <span className="font-heading text-xl font-semibold text-brand tracking-tight">S</span>
      </div>

      {/* Orbit ring */}
      <div className="absolute rounded-full border border-sognos-border-subtle" style={{ width: 320, height: 320 }} aria-hidden="true" />

      {/* Outer orbit — 4 logos, equally spaced at 90° */}
      <OrbitingCircles iconSize={40} radius={160} duration={30} speed={1}>
        <IconBubble bg="bg-white/90">
          <Image src="/logos/PowerApps_scalable.svg" width={24} height={24} alt="Power Apps" />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Image src="/logos/PowerAutomate_scalable.svg" width={24} height={24} alt="Power Automate" />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Image src="/logos/PowerPages_scalable.svg" width={24} height={24} alt="Power Pages" />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Image src="/logos/PowerPlatform_scalable.svg" width={24} height={24} alt="Power Platform" />
        </IconBubble>
      </OrbitingCircles>
    </div>
  );
}
