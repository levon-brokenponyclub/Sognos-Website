"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  bubbleClassName?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * "brand"       = brand bg + white icon bubble (default)
   * "white"       = white bg + brand icon bubble
   * "transparent" = transparent bg + border + brand icon bubble
   */
  variant?: "white" | "brand" | "transparent";
}

export default function AnimatedButton({
  href,
  children,
  className,
  bubbleClassName,
  onClick,
  variant = "brand",
}: AnimatedButtonProps) {
  const containerClass =
    variant === "white"
      ? "bg-white text-sognos-blue-accent"
      : variant === "transparent"
      ? "bg-transparent text-sognos-blue-accent border border-[rgba(18,36,84,0.2)]"
      : "bg-sognos-blue-accent text-white";

  const bubbleClass =
    variant === "brand" ? "bg-white text-sognos-blue-accent" : "bg-sognos-blue-accent text-white";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center text-sm font-semibold rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer",
        containerClass,
        className
      )}
    >
        <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
          {children}
        </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          bubbleClass,
          bubbleClassName
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}
