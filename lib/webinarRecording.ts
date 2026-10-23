import type {
  Article,
  WebinarItem,
} from "@/components/layout/sections/KnowledgeHubArchive";
import { formatDate } from "@/lib/formatDate";

// Plain module (not the "use client" archive) so both the Knowledge Hub
// archive and the server-rendered /events page can call it.
/** A Webinar-category Knowledge Hub post as a past (on-demand) webinar card. */
export function toWebinarRecording(a: Article): WebinarItem {
  return {
    slug: a.slug,
    format: "Webinar",
    title: a.title,
    href: a.href,
    date: a.publishedAt ? formatDate(a.publishedAt) : "",
    time: "",
    location: "On demand",
    image: a.image,
    excerpt: a.excerpt,
    status: "past",
    tag: a.industry,
  };
}
