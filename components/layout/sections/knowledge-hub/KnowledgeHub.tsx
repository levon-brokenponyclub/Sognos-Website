"use client";

import { useEffect, useState } from "react";
import type { UpcomingEvent } from "@/components/layout/sections/KnowledgeHubArchive";
import KhHero from "./KhHero";
import KhPostGrid from "./KhPostGrid";
import KhEvents from "./KhEvents";
import KhNewsletterBand from "./KhNewsletterBand";
import KhMilestones from "./KhMilestones";
import { GRID_CATEGORIES, KH_TABS, matches, type KhPastItem, type KhPost, type KhTabId } from "./types";

// Knowledge Hub — Inspector port (2026-11-02), docs/mockups/knowledge-hub:
// Hero 1 (light + featured) · Tabs · Mixed grid · Events 1 (upcoming + past,
// rail) · Newsletter dark band · Milestone rows. The hero search filters the
// grid, past events and milestones together; the tabs filter the grid.

const NAVBAR_HEIGHT_PX = 80;

export default function KnowledgeHub({
  title,
  description,
  posts,
  upcoming,
  past,
  initialCategory,
}: {
  title: string;
  description?: string;
  /** Newest first. */
  posts: KhPost[];
  upcoming?: UpcomingEvent;
  /** Newest first. */
  past: KhPastItem[];
  /** `?category=` — a grid category preselects its tab; events and milestones scroll. */
  initialCategory: string | null;
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<KhTabId>(
    () => KH_TABS.find((t) => t.category && t.category === initialCategory)?.id ?? "all",
  );

  useEffect(() => {
    const target =
      initialCategory === "Events" || initialCategory === "Webinar"
        ? "events"
        : initialCategory === "Milestone"
          ? "milestones"
          : null;
    const el = target && document.querySelector<HTMLElement>(`[data-kh-section="${target}"]`);
    if (!el) return;
    const band = document.querySelector<HTMLElement>("[data-kh-band]");
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX - (band?.offsetHeight ?? 0),
    });
  }, [initialCategory]);

  const q = query.trim().toLowerCase();
  // Featured: the latest News or Insights post (never a newsletter).
  const featured = posts.find((p) => p.category === "News" || p.category === "Insights");
  const category = KH_TABS.find((t) => t.id === tab)?.category;

  const grid = posts.filter(
    (p) =>
      p !== featured &&
      GRID_CATEGORIES.includes(p.category) &&
      (!category || p.category === category) &&
      matches(q, p.title, p.excerpt, p.industry, p.useCase, p.author),
  );
  const pastShown = past.filter((i) => matches(q, i.title, i.excerpt, i.tag));
  const milestones = posts.filter(
    (p) => p.category === "Milestone" && matches(q, p.title, p.excerpt),
  );
  const latestNewsletter = posts.find((p) => p.category === "Newsletter");

  return (
    <>
      <KhHero title={title} description={description} featured={featured} query={query} onQuery={setQuery} />
      <KhPostGrid posts={grid} tab={tab} onTab={setTab} searching={q !== ""} />
      <KhEvents upcoming={upcoming} past={pastShown} searching={q !== ""} />
      <KhNewsletterBand latest={latestNewsletter} />
      <KhMilestones posts={milestones} />
    </>
  );
}
