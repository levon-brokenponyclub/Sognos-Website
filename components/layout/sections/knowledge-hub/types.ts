import type { Article } from "@/components/layout/sections/KnowledgeHubArchive";

// Knowledge Hub Inspector port (2026-11-02) — data shapes shared by the
// sections in this folder. Built server-side in app/(marketing)/knowledge-hub.

/** A post, with a wide image for the slots that render past 720px. */
export type KhPost = Article & { imageLarge: string };

/** A row in "Past events & recordings": a past event or a Webinar post. */
export type KhPastItem = {
  key: string;
  kind: "event" | "recording";
  title: string;
  href: string;
  /** "17" / "Sep" — the event date block, or the recording's short date. */
  day: string;
  month: string;
  tag: string;
  excerpt?: string | null;
  image: string;
};

/** Grid tabs → post category values. Milestones and events are their own sections. */
export const KH_TABS = [
  { id: "all", label: "All", category: null },
  { id: "news", label: "News", category: "News" },
  { id: "insights", label: "Insights", category: "Insights" },
  { id: "newsletters", label: "Newsletters", category: "Newsletter" },
] as const;

export type KhTabId = (typeof KH_TABS)[number]["id"];

export const GRID_CATEGORIES: readonly string[] = ["News", "Insights", "Newsletter"];

/** Case-insensitive search across the given text fields; empty query matches. */
export function matches(query: string, ...parts: (string | null | undefined)[]) {
  if (!query) return true;
  return parts.filter(Boolean).join(" ").toLowerCase().includes(query);
}

// Newsletters are full email HTML pages, so they open in a new tab
// (same rule as KnowledgeHubArchive's `newsletterLinkProps`).
export function newsletterLinkProps(category: string) {
  return category === "Newsletter"
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent";
