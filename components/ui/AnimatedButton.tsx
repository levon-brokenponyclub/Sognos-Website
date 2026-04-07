"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** "white" = white bg + brand icon circle. "brand" = brand bg + white icon circle. */
  variant?: "white" | "brand";
}

export default function AnimatedButton({
  href,
  children,
  className,
  variant = "brand",
}: AnimatedButtonProps) {
  const isWhite = variant === "white";

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center text-sm font-semibold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer",
        isWhite ? "bg-white text-brand" : "bg-brand text-white",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          isWhite ? "bg-brand text-white" : "bg-white text-brand"
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}
