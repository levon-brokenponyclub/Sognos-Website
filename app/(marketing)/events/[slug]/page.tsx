"use no memo";

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  HeartHandshake,
  Smartphone,
  ShieldCheck,
  Eye,
  Users,
  BrainCircuit,
  Workflow,
  Building2,
  CalendarDays,
  MapPin,
  Mic,
  CheckCircle,
  Star,
  Clock,
  BarChart2,
  Zap,
  Award,
  Globe,
  Navigation,
} from "lucide-react";
import {
  getAllEventSlugs,
  getEventBySlug,
} from "@/lib/sanity/queries";
import RegisterButton from "@/components/sections/events/nfp-real-care/RegisterButton";

const ICON_MAP: Record<string, LucideIcon> = {
  HeartHandshake,
  Smartphone,
  ShieldCheck,
  Eye,
  Users,
  BrainCircuit,
  Workflow,
  Building2,
  CalendarDays,
  MapPin,
  Mic,
  CheckCircle,
  Star,
  Clock,
  BarChart2,
  Zap,
  Award,
  Globe,
  Navigation,
};

function getIcon(name?: string): LucideIcon {
  return (name && ICON_MAP[name]) || Users;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
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
    title: event.seo.title ?? event.title,
    description: event.seo.description,
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

  const registerUrl =
    event.registrationOpen ? event.eventMeta.registerUrl : undefined;

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-hero pt-28 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl lg:text-5xl font-normal leading-heading tracking-heading text-white">
                {event.hero.heading ?? event.title}
              </h1>
              {event.hero.subtitle && (
                <p className="mt-5 font-heading text-lg lg:text-xl text-[#8E9EBB] tracking-heading">
                  {event.hero.subtitle}
                </p>
              )}
              {event.hero.description && (
                <p className="mt-6 text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl">
                  {event.hero.description}
                </p>
              )}

              {event.partners.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3 lg:gap-4 max-w-lg">
                  {event.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="flex flex-col gap-2 rounded-lg bg-white border border-white/10 p-2"
                    >
                      {partner.logoUrl && (
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          width={180}
                          height={40}
                          className="h-22 w-auto object-contain"
                        />
                      )}
                      {partner.label && (
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#8E9EBB] text-center">
                          {partner.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {event.hero.imageUrl && (
              <div className="relative aspect-[3/2] w-full lg:justify-self-end rounded-lg overflow-hidden">
                <Image
                  src={event.hero.imageUrl}
                  alt={event.hero.heading ?? event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority
                />
              </div>
            )}
          </div>

          {/* Event meta cards */}
          <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {event.eventMeta.date && (
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <CalendarDays
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    When
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    {event.eventMeta.date}
                    {event.eventMeta.time && (
                      <>
                        <br />
                        {event.eventMeta.time}
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {event.eventMeta.venueName && (
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <MapPin
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Where
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    {event.eventMeta.venueName}
                    {event.eventMeta.venueAddress.map((line) => (
                      <span key={line}>
                        <br />
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {event.eventMeta.capacity && (
              <div className="flex items-start gap-3 rounded-lg bg-white p-5">
                <Users
                  className="text-[#1D96FC] shrink-0 mt-0.5"
                  size={22}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Places limited
                  </p>
                  <p className="mt-1 text-sm font-medium text-prussian-blue-800 leading-snug">
                    {event.eventMeta.capacity}
                  </p>
                </div>
              </div>
            )}

            {registerUrl && (
              <RegisterButton variant="card" label="Register now" href={registerUrl} />
            )}
          </div>
        </div>
      </section>

      {/* CHALLENGE + WHY ATTEND */}
      {(event.challenge.intro ||
        event.challenge.bullets.length > 0 ||
        event.whyAttend.items.length > 0) && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {(event.challenge.intro || event.challenge.bullets.length > 0) && (
              <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <Users size={16} aria-hidden />
                  The Challenge
                </div>
                {event.challenge.intro && (
                  <p className="mt-5 text-base text-sognos-text-body leading-relaxed">
                    {event.challenge.intro}
                  </p>
                )}
                {event.challenge.callout && (
                  <p className="mt-5 font-heading text-lg font-medium text-prussian-blue-800 tracking-heading">
                    {event.challenge.callout}
                  </p>
                )}
                {event.challenge.bullets.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {event.challenge.bullets.map(({ icon, text }) => {
                      const Icon = getIcon(icon);
                      return (
                        <li key={text} className="flex items-start gap-3">
                          <span className="shrink-0 w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#1D96FC]">
                            <Icon size={18} aria-hidden />
                          </span>
                          <span className="text-sm lg:text-base text-prussian-blue-800 leading-snug pt-1">
                            {text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {event.challenge.closing && (
                  <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                    {event.challenge.closing}
                  </p>
                )}
              </div>
            )}

            {(event.whyAttend.heading || event.whyAttend.items.length > 0) && (
              <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <Workflow size={16} aria-hidden />
                  Why Attend
                </div>
                {event.whyAttend.heading && (
                  <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                    {event.whyAttend.heading}
                  </h2>
                )}
                {event.whyAttend.intro && (
                  <p className="mt-4 text-sm text-sognos-text-body leading-relaxed">
                    {event.whyAttend.intro}
                  </p>
                )}
                {event.whyAttend.items.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-3 lg:gap-4">
                    {event.whyAttend.items.map(({ icon, title }) => {
                      const Icon = getIcon(icon);
                      return (
                        <div
                          key={title}
                          className="flex items-start gap-4 rounded-lg bg-white p-5"
                        >
                          <span className="shrink-0 w-10 h-10 rounded-lg bg-[#1D96FC]/10 flex items-center justify-center text-[#1D96FC]">
                            <Icon size={20} aria-hidden />
                          </span>
                          <p className="text-sm lg:text-base font-medium text-prussian-blue-800 leading-snug pt-1.5">
                            {title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                {event.whyAttend.closing && (
                  <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                    {event.whyAttend.closing}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SPEAKER + AGENDA */}
      {(event.speaker.name || event.agenda.items.length > 0) && (
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {event.speaker.name && (
              <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <Mic size={16} aria-hidden />
                  Guest Speaker
                </div>
                <div className="mt-6 flex items-start gap-5">
                  {event.speaker.headshotUrl && (
                    <div className="relative w-24 h-24 lg:w-28 lg:h-28 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={event.speaker.headshotUrl}
                        alt={event.speaker.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-2xl font-medium text-prussian-blue-800 tracking-heading">
                      {event.speaker.name}
                      {event.speaker.credentials && (
                        <> {event.speaker.credentials}</>
                      )}
                    </h3>
                    {event.speaker.role && (
                      <p className="mt-1 text-sm font-medium text-[#1D96FC]">
                        {event.speaker.role}
                      </p>
                    )}
                  </div>
                </div>
                {event.speaker.bio.length > 0 && (
                  <div className="mt-6 space-y-4 text-sm text-sognos-text-body leading-relaxed">
                    {event.speaker.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {event.agenda.items.length > 0 && (
              <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <CalendarDays size={16} aria-hidden />
                  Event Agenda
                </div>
                {event.agenda.timeRange && (
                  <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                    {event.agenda.timeRange}
                  </h2>
                )}
                <ol className="mt-6 relative">
                  <span
                    className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1D96FC]/30"
                    aria-hidden
                  />
                  {event.agenda.items.map(({ time, item }) => (
                    <li
                      key={time}
                      className="relative grid grid-cols-[16px_1fr] gap-x-4 pl-0 pb-5 last:pb-0"
                    >
                      <span
                        className="mt-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1D96FC] shrink-0"
                        aria-hidden
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1D96FC]">
                          {time}
                        </p>
                        <p className="mt-0.5 text-sm text-prussian-blue-800 leading-snug">
                          {item}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {/* WHO SHOULD ATTEND + ABOUT SOGNOS */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {(event.whoShouldAttend.heading ||
            event.whoShouldAttend.roles.length > 0) && (
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                <Users size={16} aria-hidden />
                Who Should Attend
              </div>
              {event.whoShouldAttend.heading && (
                <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                  {event.whoShouldAttend.heading}
                </h2>
              )}
              {event.whoShouldAttend.roles.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {event.whoShouldAttend.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center rounded-lg bg-white border border-[#1D96FC]/20 px-3 py-1.5 text-xs font-semibold text-prussian-blue-800"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
              {event.whoShouldAttend.description && (
                <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
                  {event.whoShouldAttend.description}
                </p>
              )}
            </div>
          )}

          {/* About Sognos — static company block */}
          <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
              <Building2 size={16} aria-hidden />
              About Sognos
            </div>
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg bg-white px-4 py-3">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0">
                <span className="bg-[#F25022]" />
                <span className="bg-[#7FBA00]" />
                <span className="bg-[#00A4EF]" />
                <span className="bg-[#FFB900]" />
              </div>
              <span className="text-sm font-semibold text-prussian-blue-800 leading-tight">
                Microsoft
                <br />
                Solutions Partner
              </span>
            </div>
            <p className="mt-6 text-sm text-sognos-text-body leading-relaxed">
              Sognos is a Microsoft-native business solutions partner working
              with health, social and community care organisations across
              Australia and New Zealand. We support providers delivering complex
              frontline services, including mental health, disability, aged care,
              community health, psychosocial support and mobile care teams.
            </p>
            <p className="mt-4 text-sm text-sognos-text-body leading-relaxed">
              What makes Sognos different is our focus on real service delivery:
              care coordination, compliance, rostering, workforce visibility and
              reducing admin burden for frontline teams. Built on Microsoft
              Dynamics 365, Power Platform and AI, our solutions are designed to
              work within the Microsoft ecosystem while supporting the way care
              is actually delivered.
            </p>
            <p className="mt-4 text-sm font-medium text-prussian-blue-800">
              Sognos was recently recognised as a finalist in the 2026 Impact
              Awards.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO GET THERE */}
      {(event.directions.heading || event.directions.paragraphs.length > 0) && (
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1D96FC]">
                  <MapPin size={16} aria-hidden />
                  How to Get There
                </div>
                {event.directions.heading && (
                  <h2 className="mt-3 font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
                    {event.directions.heading}
                  </h2>
                )}
                {event.directions.paragraphs.length > 0 && (
                  <div className="mt-5 space-y-4 text-sm text-sognos-text-body leading-relaxed">
                    {event.directions.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
              {(event.eventMeta.mapsEmbedUrl ||
                event.eventMeta.mapsDirectionsUrl) && (
                <div className="flex flex-col gap-3">
                  {event.eventMeta.mapsEmbedUrl && (
                    <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden bg-white">
                      <iframe
                        title={`Map: ${event.directions.heading ?? "Event venue"}`}
                        src={event.eventMeta.mapsEmbedUrl}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {event.eventMeta.mapsDirectionsUrl && (
                    <a
                      href={event.eventMeta.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-gray-50 text-prussian-blue-800 font-semibold py-3 px-4 text-sm transition-colors"
                    >
                      <Navigation size={16} aria-hidden />
                      <span>Get directions</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA BANNER */}
      {registerUrl && (
        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-lg bg-prussian-blue-800 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Users size={22} aria-hidden />
                </span>
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-medium text-white tracking-heading">
                    {event.footerCta.heading ?? "Ready to join the conversation?"}
                  </h2>
                  {event.footerCta.description && (
                    <p className="mt-1.5 text-sm text-[#8E9EBB]">
                      {event.footerCta.description}
                    </p>
                  )}
                </div>
              </div>
              <RegisterButton variant="primary" label="Register now" href={registerUrl} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
