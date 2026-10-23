import type { Metadata } from "next";
import {
  EventRail,
  RailBlock,
  WebinarRail,
  type WebinarItem,
} from "@/components/layout/sections/KnowledgeHubArchive";
import { toWebinarRecording } from "@/lib/webinarRecording";
import { getEventArchive, getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { toUpcomingEvent } from "@/lib/eventListing";

export const metadata: Metadata = {
  title: "Events & Webinars - Sognos",
  description:
    "Upcoming events and webinars from Sognos, plus recordings of past sessions.",
};

export const revalidate = 60;

// The full Events & Webinars archive — the Knowledge Hub section's "View all".
// Same rails and cards as the Knowledge Hub, uncapped:
//   Events    upcoming + past `event` documents (non-webinar)
//   Webinars  upcoming webinar events + every Webinar recording post
export default async function EventsPage() {
  const [events, posts] = await Promise.all([
    getEventArchive(),
    getKnowledgePostArchive(),
  ]);

  // The archive query is newest-first; upcoming reads soonest-first.
  const isWebinar = (format: string) => format === "Webinar";
  const upcomingEvents = events
    .filter((e) => !e.isPast && !isWebinar(e.format))
    .reverse()
    .map(toUpcomingEvent);
  const pastEvents = events
    .filter((e) => e.isPast && !isWebinar(e.format))
    .map(toUpcomingEvent);

  const upcomingWebinars: WebinarItem[] = events
    .filter((e) => !e.isPast && isWebinar(e.format))
    .reverse()
    .map((e) => ({ ...toUpcomingEvent(e), status: "upcoming" }));
  const pastWebinars: WebinarItem[] = posts
    .filter((p) => p.category === "Webinar")
    .map((p) =>
      toWebinarRecording({
        slug: p.slug,
        category: p.category,
        title: p.title,
        excerpt: p.excerpt,
        href: `/knowledge-hub/${p.slug}`,
        image: p.heroImage
          ? urlFor(p.heroImage).width(720).auto("format").url()
          : "",
        industry: p.industry ?? null,
        useCase: p.useCase ?? null,
        publishedAt: p.date ?? null,
      }),
    );

  return (
    <main className="bg-white">
      <section className="bg-sognos-navy pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="max-w-3xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Events &amp; Webinars
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Join us in person or online — and catch up on past webinars on
            demand.
          </p>
        </div>
      </section>

      <section className="bg-sognos-tint py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6">
          <RailBlock id="events" label="Events">
            <EventRail upcoming={upcomingEvents} past={pastEvents} />
          </RailBlock>
          <RailBlock id="webinars" label="Webinars">
            <WebinarRail upcoming={upcomingWebinars} past={pastWebinars} />
          </RailBlock>
        </div>
      </section>
    </main>
  );
}
