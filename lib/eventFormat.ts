// Shared by the Knowledge Hub archive and the homepage's event tile.
//
// Events are stored as a UTC instant, and the audience is Australian, so both
// parts of the display are pinned to Sydney rather than left to the viewer's
// locale. Without the timezone the 17 September breakfast reads as the 16th
// to anyone west of Perth. Server-side only — a Client Component formatting
// these would run against the viewer's own timezone instead.
const EVENT_DATE = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const EVENT_TIME = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatEventDate(date: string): string {
  return EVENT_DATE.format(new Date(date));
}

/** e.g. "8:30 am - 10:30 am", or just the start when the event has no end. */
export function formatEventTime(date: string, endDate?: string | null): string {
  const start = EVENT_TIME.format(new Date(date));
  return endDate ? `${start} - ${EVENT_TIME.format(new Date(endDate))}` : start;
}

/** "17 Sep 2026 · 8:30 am - 10:30 am · Microsoft, North Sydney" — the same
 *  composition `EventRail` builds inline in KnowledgeHubArchive.tsx. */
export function formatEventMeta(event: {
  date: string;
  endDate?: string | null;
  location?: string | null;
}): string {
  return [
    formatEventDate(event.date),
    formatEventTime(event.date, event.endDate),
    event.location,
  ]
    .filter(Boolean)
    .join(" · ");
}
