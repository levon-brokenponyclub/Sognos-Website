"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  radius = 160,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const animDuration = duration / speed;

  return (
    <>
      {items.map((child, i) => {
        const angle = (360 / count) * i;
        // Stagger delay so icons spread evenly around the orbit
        const delay = -(animDuration / count) * i;

        return (
          <div
            key={i}
            className={cn(
              "absolute flex items-center justify-center rounded-full",
              className
            )}
            style={
              {
                width: iconSize,
                height: iconSize,
                "--orbit-radius": `${radius}px`,
                "--orbit-angle": `${angle}deg`,
                "--orbit-duration": `${animDuration}s`,
                "--orbit-delay": `${delay}s`,
                animation: `orbit${reverse ? "-reverse" : ""} var(--orbit-duration) linear var(--orbit-delay) infinite`,
              } as React.CSSProperties
            }
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
