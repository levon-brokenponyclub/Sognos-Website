import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart2,
  BrainCircuit,
  Building2,
  CalendarDays,
  CalendarPlus,
  CheckCircle,
  Clock,
  Eye,
  Globe,
  HeartHandshake,
  MapPin,
  Mic,
  MonitorPlay,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { EventPageData } from "@/lib/sanity/queries";
import {
  formatEventDateLong,
  formatEventTime,
  formatEventTimeZone,
} from "@/lib/eventFormat";
import EventSectionNav from "./EventSectionNav";
import ShowMore from "./ShowMore";
import { ShareIcons } from "@/components/layout/sections/customer-stories/StoryMetaRail";

// Single event page — /events/[slug]. Hero (details + action left, image
// right), a sticky section menu listing only sections with content, then the
// content column beside a sticky event card. One template carries every state:
// upcoming with registration open, registration closed, and past (online →
// Watch recording, in person → upcoming events). Every Sanity field renders;
// long content sits behind Show more rather than being dropped.

type State = "upcoming" | "closed" | "past";

// Visible counts before Show more.
const ROLES_VISIBLE = 6;
const BIO_VISIBLE = 1;

const ICONS: Record<string, LucideIcon> = {
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
};
const icon = (name?: string) => ICONS[name ?? ""] ?? CheckCircle;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EventPageTemplate({ event }: { event: EventPageData }) {
  const meta = event.eventMeta ?? {};
  const online = event.mode
    ? event.mode === "online"
    : event.format === "Webinar";
  const state: State = event.isPast
    ? "past"
    : event.registrationOpen && meta.registerUrl
      ? "upcoming"
      : "closed";
  const recordingHref = event.recordingSlug
    ? `/knowledge-hub/${event.recordingSlug}`
    : null;
  const speakers = event.speakers ?? [];
  const noun = online ? "webinar" : "event";

  // Only sections with content get a section and a menu item.
  const has = {
    challenge: Boolean(
      event.challenge?.intro ||
      event.challenge?.callout ||
      event.challenge?.bullets?.length,
    ),
    why: Boolean(event.whyAttend?.intro || event.whyAttend?.items?.length),
    speaker: speakers.length > 0,
    agenda: Boolean(event.agenda?.items?.length),
    who: Boolean(
      event.whoShouldAttend?.roles?.length ||
      event.whoShouldAttend?.description,
    ),
    directions: Boolean(
      event.directions?.paragraphs?.length ||
      meta.venueAddress?.length ||
      meta.mapsEmbedUrl,
    ),
  };
  const sections = [
    has.challenge && { id: "challenge", label: "The Challenge" },
    has.why && { id: "why-attend", label: "Why Attend" },
    has.speaker && {
      id: "speaker",
      label: speakers.length > 1 ? "Speakers" : "Speaker",
    },
    has.agenda && { id: "agenda", label: "Agenda" },
    has.who && { id: "who-should-attend", label: "Who Should Attend" },
    has.directions && {
      id: "getting-there",
      label: online ? "How to Join" : "Getting There",
    },
    { id: "about", label: "About Sognos" },
  ].filter((s): s is { id: string; label: string } => Boolean(s));

  // Date and time come from the structured `date` / `endDate` fields (Sydney
  // time); the Event Details display strings override them when filled in.
  const dateText =
    meta.date ??
    (event.date ? formatEventDateLong(event.date, event.timezone) : undefined);
  const timeText =
    meta.time ??
    (event.date
      ? `${formatEventTime(event.date, event.endDate, event.timezone)} ${formatEventTimeZone(event.date, event.timezone)}`.trim()
      : event.agenda?.timeRange);
  const details = [
    dateText && { icon: CalendarDays, label: "Date", value: dateText },
    timeText && { icon: Clock, label: "Time", value: timeText },
    (meta.venueName || event.location) && {
      icon: online ? MonitorPlay : MapPin,
      label: online ? "Where" : "Venue",
      value: meta.venueName ?? event.location,
    },
    meta.capacity?.trim() && {
      icon: Users,
      label: "Capacity",
      value: meta.capacity.trim(),
    },
  ].filter((d): d is { icon: LucideIcon; label: string; value: string } =>
    Boolean(d),
  );

  return (
    <main className="bg-white">
      {/* ── Hero — details + action left, image right ── */}
      <section className="bg-sognos-navy pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/events"
            className="text-sm font-medium text-white/50 transition-colors hover:text-white/75"
          >
            ← Events &amp; Webinars
          </Link>
          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-3">
              <StatusPills format={event.format} state={state} />
              <h1 className="mt-5 font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl">
                {event.hero?.heading ?? event.title}
              </h1>
              {event.hero?.subtitle && (
                <p className="mt-5 text-lg leading-relaxed text-white/80">
                  {event.hero.subtitle}
                </p>
              )}
              <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-white/20 pt-6 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/50"
                    />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm text-white">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryAction
                  state={state}
                  online={online}
                  registerUrl={meta.registerUrl}
                  recordingHref={recordingHref}
                  dark
                />
                {state !== "past" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:border-white/50"
                  >
                    <CalendarPlus aria-hidden="true" className="h-4 w-4" /> Add
                    to calendar
                  </button>
                )}
              </div>
            </div>
            {event.heroImage && (
              <div className="relative aspect-[16/10] overflow-hidden rounded lg:col-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <EventSectionNav sections={sections} />

      {state === "past" && (
        <div className="border-b border-sognos-line bg-sognos-tint">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm text-sognos-body">
            <span>
              This {noun} has ended.{" "}
              {online
                ? "The recording is available on demand."
                : "Browse what's coming up next."}
            </span>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-medium"
            >
              Upcoming events{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Body — content 8 / sticky card 4 ── */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <div className="lg:sticky lg:top-40">
              <SideCard
                event={event}
                details={details}
                state={state}
                online={online}
                recordingHref={recordingHref}
              />
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:row-start-1">
            {/* Intro — the hero description, moved out of the hero to keep it
                compact. Falls back to the listing excerpt when unset. */}
            {(event.hero?.description ?? event.excerpt) && (
              <p className="text-lg leading-relaxed text-sognos-heading md:text-xl">
                {event.hero?.description ?? event.excerpt}
              </p>
            )}

            {has.challenge && (
              <Block id="challenge" title="The Challenge">
                {event.challenge?.intro && <Para>{event.challenge.intro}</Para>}
                {event.challenge?.callout && (
                  <p className="my-6 border-l-2 border-sognos-blue-accent pl-5 font-heading text-xl font-medium tracking-tight text-sognos-heading">
                    {event.challenge.callout}
                  </p>
                )}
                {!!event.challenge?.bullets?.length && (
                  <ul className="grid gap-3 lg:gap-4">
                    {event.challenge.bullets.map((b) => {
                      const Icon = icon(b.icon);
                      return (
                        <li
                          key={b.text}
                          className="flex items-start gap-4 rounded border border-sognos-line p-5"
                        >
                          <Icon
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-sognos-blue-accent"
                          />
                          <span className="text-base leading-relaxed text-sognos-heading">
                            {b.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {event.challenge?.closing && (
                  <Para className="mt-6">{event.challenge.closing}</Para>
                )}
              </Block>
            )}

            {has.why && (
              <Block
                id="why-attend"
                title="Why Attend"
                subheading={event.whyAttend?.heading}
              >
                {event.whyAttend?.intro && <Para>{event.whyAttend.intro}</Para>}
                {!!event.whyAttend?.items?.length && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:gap-4">
                    {event.whyAttend.items.map((w) => {
                      const Icon = icon(w.icon);
                      return (
                        <li
                          key={w.title}
                          className="rounded border border-sognos-line p-5"
                        >
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-sognos-blue-accent"
                          />
                          <p className="mt-4 text-base leading-snug text-sognos-heading">
                            {w.title}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {event.whyAttend?.closing && (
                  <Para className="mt-6">{event.whyAttend.closing}</Para>
                )}
              </Block>
            )}

            {has.speaker && (
              <Block
                id="speaker"
                title={speakers.length > 1 ? "Speakers" : "Speaker"}
              >
                <div className="flex flex-col gap-10">
                  {speakers.map((sp) => (
                    <div
                      key={sp.name}
                      className="grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)]"
                    >
                      {sp.headshot && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={sp.headshot}
                          alt=""
                          className="aspect-square w-40 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                          {sp.name}
                          {sp.credentials && (
                            <span className="ml-2 text-base font-normal text-sognos-muted">
                              {sp.credentials}
                            </span>
                          )}
                        </p>
                        {sp.role && (
                          <p className="mt-1 text-sognos-muted">{sp.role}</p>
                        )}
                        {!!sp.bio?.length && (
                          <div className="mt-5">
                            <ShowMore
                              visible={BIO_VISIBLE}
                              moreLabel="Read full bio"
                              lessLabel="Hide bio"
                              className="flex flex-col gap-4"
                            >
                              {sp.bio.map((p) => (
                                <p
                                  key={p}
                                  className="text-base leading-relaxed text-sognos-body"
                                >
                                  {p}
                                </p>
                              ))}
                            </ShowMore>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {has.agenda && (
              <Block
                id="agenda"
                title="Agenda"
                subheading={event.agenda?.timeRange}
              >
                <ol className="border-t border-sognos-line">
                  {event.agenda?.items?.map((a) => (
                    <li
                      key={a.time + a.item}
                      className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-sognos-line py-4 text-base"
                    >
                      <span className="tabular-nums text-sognos-muted">
                        {a.time}
                      </span>
                      <span className="text-sognos-heading">{a.item}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {has.who && (
              <Block
                id="who-should-attend"
                title="Who Should Attend"
                subheading={event.whoShouldAttend?.heading}
              >
                {event.whoShouldAttend?.description && (
                  <Para>{event.whoShouldAttend.description}</Para>
                )}
                {!!event.whoShouldAttend?.roles?.length && (
                  <div className="mt-6">
                    <ShowMore
                      visible={ROLES_VISIBLE}
                      moreLabel="Show all roles"
                      className="flex flex-wrap gap-2"
                    >
                      {event.whoShouldAttend.roles.map((r) => (
                        <span
                          key={r}
                          className="rounded border border-sognos-line px-3 py-1.5 text-sm text-sognos-body"
                        >
                          {r}
                        </span>
                      ))}
                    </ShowMore>
                  </div>
                )}
              </Block>
            )}

            {has.directions && (
              <Block
                id="getting-there"
                title={online ? "How to Join" : "Getting There"}
                subheading={event.directions?.heading}
              >
                <div
                  className={`grid gap-6 rounded border border-sognos-line p-6 ${meta.mapsEmbedUrl ? "md:grid-cols-2" : ""}`}
                >
                  <div>
                    {!online && meta.venueName && (
                      <p className="font-medium text-sognos-heading">
                        {meta.venueName}
                      </p>
                    )}
                    {meta.venueAddress?.map((l) => (
                      <p key={l} className="text-sognos-body">
                        {l}
                      </p>
                    ))}
                    {event.directions?.paragraphs?.map((p) => (
                      <p
                        key={p}
                        className="mt-4 text-base leading-relaxed text-sognos-body first:mt-0"
                      >
                        {p}
                      </p>
                    ))}
                    {meta.mapsDirectionsUrl && (
                      <a
                        href={meta.mapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        Get directions{" "}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  {meta.mapsEmbedUrl && (
                    <iframe
                      src={meta.mapsEmbedUrl}
                      title="Venue map"
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded border-0"
                    />
                  )}
                </div>
              </Block>
            )}

            <Block id="about" title="About Sognos">
              <Para>
                Sognos builds field service and care operations software on
                Microsoft Dynamics 365 — SognosCare, SognosRoster and
                SognosGenogram — helping health, care and service organisations
                coordinate their workforce and stay compliant.
              </Para>
            </Block>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      {(event.footerCta?.heading || event.footerCta?.description) && (
        <section className="bg-sognos-navy py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            {event.footerCta?.heading && (
              <h2 className="max-w-3xl font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                {state === "past"
                  ? `Missed the ${noun}?`
                  : event.footerCta.heading}
              </h2>
            )}
            {event.footerCta?.description && state !== "past" && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                {event.footerCta.description}
              </p>
            )}
            <div className="mt-8">
              <PrimaryAction
                state={state}
                online={online}
                registerUrl={meta.registerUrl}
                recordingHref={recordingHref}
                dark
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ── Pieces ────────────────────────────────────────────────────────────────────

function Block({
  id,
  title,
  subheading,
  children,
}: {
  id: string;
  title: string;
  subheading?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      data-event-section={id}
      className="mt-14 border-t border-sognos-line pt-10 lg:mt-16"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
        {title}
      </p>
      {subheading && (
        <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-sognos-heading md:text-3xl">
          {subheading}
        </h2>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Para({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-base leading-relaxed text-sognos-body md:text-lg ${className}`}
    >
      {children}
    </p>
  );
}

function StatusPills({ format, state }: { format?: string; state: State }) {
  const status =
    state === "past"
      ? "Past"
      : state === "closed"
        ? "Registration closed"
        : "Upcoming";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {format && (
        <span className="rounded border border-white/20 px-2.5 py-1 text-xs text-white/80">
          {format}
        </span>
      )}
      <span
        className={`rounded px-2.5 py-1 text-xs font-medium ${
          state === "upcoming"
            ? "bg-amber-300 text-sognos-heading"
            : "bg-white/10 text-white/80"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function PrimaryAction({
  state,
  online,
  registerUrl,
  recordingHref,
  dark = false,
}: {
  state: State;
  online: boolean;
  registerUrl?: string;
  /** Linked Knowledge Hub recording; past online events without one fall
   *  back to the webinar recordings list. */
  recordingHref: string | null;
  dark?: boolean;
}) {
  const solid = dark
    ? "bg-white text-sognos-navy hover:bg-white/90"
    : "bg-sognos-navy text-white hover:bg-sognos-blue-accent";
  const base = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${solid}`;

  if (state === "upcoming")
    return (
      <a
        href={registerUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        Register now <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    );
  if (state === "closed")
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm ${
          dark
            ? "border-white/20 text-white/50"
            : "border-sognos-line text-sognos-muted"
        }`}
      >
        Registration closed
      </span>
    );
  return online ? (
    <Link href={recordingHref ?? "/events#webinars"} className={base}>
      <MonitorPlay aria-hidden="true" className="h-4 w-4" />{" "}
      {recordingHref ? "Watch recording" : "Browse recordings"}
    </Link>
  ) : (
    <Link href="/events" className={base}>
      View upcoming events <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}

function SideCard({
  event,
  details,
  state,
  online,
  recordingHref,
}: {
  event: EventPageData;
  details: { icon: LucideIcon; label: string; value: string }[];
  state: State;
  online: boolean;
  recordingHref: string | null;
}) {
  return (
    <div className="rounded border border-sognos-line bg-white p-6 lg:p-8">
      <dl className="flex flex-col gap-4">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-sognos-muted"
            />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-sognos-heading">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-sognos-line pt-6">
        {/* Primary action and the shared copy-link / share icons (same
            control as customer stories and KH posts), inline. */}
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 [&>*]:w-full">
            <PrimaryAction
              state={state}
              online={online}
              registerUrl={event.eventMeta?.registerUrl}
              recordingHref={recordingHref}
            />
          </div>
          <ShareIcons postUrl={`https://sognos.com.au/events/${event.slug}`} />
        </div>
        {state === "upcoming" && online && (
          <p className="mt-3 text-center text-xs text-sognos-muted">
            Joining link sent on registration.
          </p>
        )}
      </div>

      {!!event.partners?.length && (
        <div className="mt-6 border-t border-sognos-line pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
            In partnership with
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {event.partners.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-full items-center justify-center rounded border border-sognos-line bg-white p-3">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-full w-auto object-contain"
                    />
                  ) : (
                    <span className="text-sm text-sognos-heading">
                      {p.name}
                    </span>
                  )}
                </div>
                {p.label && (
                  <span className="text-center text-xs text-sognos-muted">
                    {p.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
