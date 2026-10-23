import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventPageTemplate from "@/components/layout/sections/events/EventPageTemplate";
import { getAllEventSlugs, getEventBySlug } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.seo?.title ?? `${event.title} - Sognos`,
    description: event.seo?.description ?? event.excerpt,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  return <EventPageTemplate event={event} />;
}
