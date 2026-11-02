"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import type { UpcomingEvent } from "@/components/layout/sections/KnowledgeHubArchive";
import { FOCUS, type KhPastItem } from "./types";

// Events & Webinars · option 1 "Upcoming + past", tone auto (tint), label in
// the left rail: the next event as a large card (details left, image right),
// then past events and webinar recordings as rows. Two rows show until
// "Load more"; a search shows every match. No upcoming event → past only.

const VISIBLE = 2;

function UpcomingCard({ event }: { event: UpcomingEvent }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-3 rounded-lg bg-white p-3 md:grid-cols-2 lg:gap-4">
      <div className="flex flex-col justify-between gap-10 p-5 lg:p-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-sognos-tint px-3 py-1 text-xs font-medium text-sognos-heading">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
            Upcoming &middot; {event.format}
          </p>
          <h3 className={`mt-6 ${TYPE.h3} text-balance text-sognos-heading`}>{event.title}</h3>
        </div>
        <div>
          <dl className="divide-y divide-sognos-line border-y border-sognos-line text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-sognos-muted">Date</dt>
              <dd className="text-right text-sognos-heading">
                {event.date}
                {event.time && <span className="text-sognos-muted"> &middot; {event.time}</span>}
              </dd>
            </div>
            {event.location && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-sognos-muted">Where</dt>
                <dd className="text-right text-sognos-heading">{event.location}</dd>
              </div>
            )}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {event.registerUrl && (
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center rounded-full bg-sognos-heading px-6 text-sm font-medium text-white transition-colors hover:bg-sognos-blue-accent ${FOCUS}`}
              >
                Register
              </a>
            )}
            <Link
              href={event.href}
              className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sognos-heading hover:text-sognos-roster-ink ${FOCUS}`}
            >
              Event details <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative min-h-[300px] overflow-hidden rounded bg-sognos-tint md:min-h-[400px]">
        {event.image && (
          <Image src={event.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        )}
      </div>
    </div>
  );
}

function PastRow({ item }: { item: KhPastItem }) {
  const recording = item.kind === "recording";
  return (
    <li>
      <Link
        href={item.href}
        className={`group grid grid-cols-[4rem_1fr] gap-4 border-b border-sognos-line py-6 transition-colors hover:bg-white sm:grid-cols-[4.5rem_1fr_10rem] sm:gap-6 sm:px-3 ${FOCUS}`}
      >
        {recording ? (
          <span className="pt-1 text-sm text-sognos-muted tabular-nums">
            {item.day} {item.month}
          </span>
        ) : (
          <span className="flex size-14 flex-col items-center justify-center rounded bg-sognos-blue-accent text-white">
            <span className="text-lg leading-none">{item.day}</span>
            <span className="text-[10px] tracking-widest uppercase">{item.month}</span>
          </span>
        )}
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-widest text-sognos-roster-ink uppercase">{item.tag}</p>
          <h3 className={`mt-1 ${TYPE.h3Small} text-balance text-sognos-heading group-hover:text-sognos-roster-ink md:text-xl`}>
            {item.title}
          </h3>
          {recording && item.excerpt && (
            <p className={`mt-1 line-clamp-1 ${TYPE.small} text-sognos-body`}>{item.excerpt}</p>
          )}
        </div>
        <div className="relative hidden aspect-[3/2] overflow-hidden rounded bg-white sm:block">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="160px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          )}
        </div>
      </Link>
    </li>
  );
}

export default function KhEvents({
  upcoming,
  past,
  searching,
}: {
  upcoming?: UpcomingEvent;
  /** Already filtered by search. */
  past: KhPastItem[];
  searching: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (!upcoming && past.length === 0) return null;
  const shown = open || searching ? past : past.slice(0, VISIBLE);

  return (
    <section data-kh-section="events" className={`${LAYOUT.anchor} bg-sognos-tint ${LAYOUT.section}`}>
      <div className={`mx-auto max-w-7xl px-6 ${LAYOUT.rail}`}>
        <div className={LAYOUT.railLabel}>
          <SectionLabel sticky>Events &amp; Webinars</SectionLabel>
        </div>
        <div className={LAYOUT.content}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${TYPE.h2} text-sognos-heading`}>Events &amp; Webinars</h2>
            <Link
              href="/events"
              className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-sognos-line bg-white px-4 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-heading ${FOCUS}`}
            >
              View all events <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className={LAYOUT.gap}>
            {upcoming && <UpcomingCard event={upcoming} />}
            {past.length > 0 && (
              <>
                <p className={`${upcoming ? "mt-16" : ""} text-lg text-sognos-heading`}>
                  Past events &amp; recordings
                </p>
                <ul className="mt-4 border-t border-sognos-line">
                  {shown.map((item) => (
                    <PastRow key={item.key} item={item} />
                  ))}
                </ul>
                {!open && !searching && past.length > VISIBLE && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className={`min-h-11 rounded-full border border-sognos-line bg-white px-6 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-heading ${FOCUS}`}
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
