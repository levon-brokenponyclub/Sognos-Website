"use client";

import type { BlockStyleProps } from "sanity";

// Replaces Sanity's default blockquote preview, which nests a <div> inside a
// <p> and triggers a React hydration warning in the Studio.
export function BlockquoteStyle({ children }: BlockStyleProps) {
  return (
    <blockquote
      style={{
        margin: 0,
        paddingLeft: "0.75rem",
        borderLeft: "3px solid var(--card-border-color)",
        fontStyle: "italic",
      }}
    >
      {children}
    </blockquote>
  );
}
