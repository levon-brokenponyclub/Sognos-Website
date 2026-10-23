import type { UpcomingEvent } from "@/components/layout/sections/KnowledgeHubArchive";
import type { EventListing } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatEventDate, formatEventTime } from "@/lib/eventFormat";

// `event` document → card data, shared by the Knowledge Hub and /events.
// Server-side only: date formatting is pinned to Sydney in lib/eventFormat.
export function toUpcomingEvent(e: EventListing): UpcomingEvent {
  return {
    slug: e.slug,
    format: e.format,
    title: e.title,
    href: `/events/${e.slug}`,
    date: formatEventDate(e.date, e.timezone),
    time: formatEventTime(e.date, e.endDate, e.timezone),
    location: e.location ?? e.meta ?? "",
    image: e.heroImage
      ? urlFor(e.heroImage).width(1200).auto("format").url()
      : "",
    excerpt: e.excerpt ?? null,
    online: e.mode ? e.mode === "online" : e.format === "Webinar",
    registerUrl:
      e.registrationOpen && !e.isPast ? (e.registerUrl ?? null) : null,
  };
}
