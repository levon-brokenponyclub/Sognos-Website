"use client";

import { useEffect, useState } from "react";

// Sticky section menu under the event hero. Same band as the Knowledge Hub's
// (dotted rule, bullet on the current item, scroll-spy) so the two read as one
// family. Items are passed in by the page — only sections with Sanity content.
const NAVBAR_HEIGHT_PX = 80;

export default function EventSectionNav({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  const goTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(
      `[data-event-section="${id}"]`,
    );
    if (!el) return;
    const band = document.querySelector<HTMLElement>("[data-event-band]");
    const offset = NAVBAR_HEIGHT_PX + (band?.offsetHeight ?? 0);
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const nodes = sections
      .map((s) =>
        document.querySelector<HTMLElement>(`[data-event-section="${s.id}"]`),
      )
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        const id = visible?.target.getAttribute("data-event-section");
        if (id) setActive(id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div
      data-event-band
      className="sticky top-20 z-20 border-b border-dotted border-sognos-line bg-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          role="tablist"
          aria-label="Event sections"
          className="scrollbar-hide flex gap-6 overflow-x-auto"
        >
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={s.id}
                onClick={() => goTo(s.id)}
                className="flex shrink-0 items-center gap-2 py-4"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-sognos-blue-accent" : "bg-transparent"
                  }`}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
