// Shared by the Knowledge Hub archive, the homepage's event tile, /events and
// /events/[slug].
//
// Events are stored as a UTC instant and displayed in the event's own
// timezone (`event.timezone`), falling back to Sydney — the audience is
// Australian, and without a timezone the 17 September breakfast reads as the
// 16th to anyone west of Perth. Server-side only — a Client Component
// formatting these would run against the viewer's own timezone instead.

export const DEFAULT_EVENT_TIMEZONE = "Australia/Sydney";

/** Timezones offered on the event schema. IANA ids, so DST is handled. */
export const EVENT_TIMEZONES = [
  { title: "Sydney / Canberra (AEST/AEDT)", value: "Australia/Sydney" },
  { title: "Melbourne (AEST/AEDT)", value: "Australia/Melbourne" },
  { title: "Hobart (AEST/AEDT)", value: "Australia/Hobart" },
  { title: "Brisbane (AEST)", value: "Australia/Brisbane" },
  { title: "Adelaide (ACST/ACDT)", value: "Australia/Adelaide" },
  { title: "Darwin (ACST)", value: "Australia/Darwin" },
  { title: "Perth (AWST)", value: "Australia/Perth" },
  { title: "Auckland (NZST/NZDT)", value: "Pacific/Auckland" },
] as const;

const cache = new Map<string, Intl.DateTimeFormat>();
function formatter(
  key: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const id = `${key}|${timeZone}`;
  let f = cache.get(id);
  if (!f) {
    f = new Intl.DateTimeFormat("en-AU", { timeZone, ...options });
    cache.set(id, f);
  }
  return f;
}

const tz = (timeZone?: string | null) => timeZone || DEFAULT_EVENT_TIMEZONE;

/** e.g. "17 Sep 2026" */
export function formatEventDate(
  date: string,
  timeZone?: string | null,
): string {
  return formatter("date", tz(timeZone), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/** e.g. "Thursday 17 September 2026" — the event page's Date row. */
export function formatEventDateLong(
  date: string,
  timeZone?: string | null,
): string {
  return formatter("dateLong", tz(timeZone), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/** e.g. "AEST" / "AWST" for the event's start, so the label follows DST. */
export function formatEventTimeZone(
  date: string,
  timeZone?: string | null,
): string {
  return (
    formatter("tz", tz(timeZone), { timeZoneName: "short" })
      .formatToParts(new Date(date))
      .find((p) => p.type === "timeZoneName")?.value ?? ""
  );
}

/** e.g. "8:30 am - 10:30 am", or just the start when the event has no end. */
export function formatEventTime(
  date: string,
  endDate?: string | null,
  timeZone?: string | null,
): string {
  const f = formatter("time", tz(timeZone), {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const start = f.format(new Date(date));
  return endDate ? `${start} - ${f.format(new Date(endDate))}` : start;
}

/** "17 Sep 2026 · 8:30 am - 10:30 am · Microsoft, North Sydney" — the same
 *  composition `EventRail` builds inline in KnowledgeHubArchive.tsx. */
export function formatEventMeta(event: {
  date: string;
  endDate?: string | null;
  location?: string | null;
  timezone?: string | null;
}): string {
  return [
    formatEventDate(event.date, event.timezone),
    formatEventTime(event.date, event.endDate, event.timezone),
    event.location,
  ]
    .filter(Boolean)
    .join(" · ");
}
