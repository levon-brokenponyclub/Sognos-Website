import { defineField, defineType, type SanityDocument } from "sanity";
import { AutoSlugInput } from "../components/AutoSlugInput";
import { EventVenueInput } from "../components/EventVenueInput";
import { FutureOnlyToggle, isEventPast } from "../components/FutureOnlyToggle";
import { RegistrationOpenInput } from "../components/RegistrationOpenInput";
import { DEFAULT_EVENT_TIMEZONE, EVENT_TIMEZONES } from "../../lib/eventFormat";

// Event model for /events/[slug] (template: hero, sticky section menu, content
// + sticky event card) and the /events index. Structured fields match the
// production schema so both sites read the same documents; the redesign adds
// `mode`, `speakers[]` and `recording`.

const ICON_OPTIONS = [
  { title: "HeartHandshake", value: "HeartHandshake" },
  { title: "Smartphone", value: "Smartphone" },
  { title: "ShieldCheck", value: "ShieldCheck" },
  { title: "Eye", value: "Eye" },
  { title: "Users", value: "Users" },
  { title: "BrainCircuit", value: "BrainCircuit" },
  { title: "Workflow", value: "Workflow" },
  { title: "Building2", value: "Building2" },
  { title: "CalendarDays", value: "CalendarDays" },
  { title: "MapPin", value: "MapPin" },
  { title: "Mic", value: "Mic" },
  { title: "CheckCircle", value: "CheckCircle" },
  { title: "Star", value: "Star" },
  { title: "Clock", value: "Clock" },
  { title: "BarChart2", value: "BarChart2" },
  { title: "Zap", value: "Zap" },
  { title: "Award", value: "Award" },
  { title: "Globe", value: "Globe" },
];

// Online events hide the venue / map fields. Mirrors the page: an unset Type
// counts as online for Webinars.
function isOnline(document?: SanityDocument) {
  return (
    document?.mode === "online" ||
    (!document?.mode && document?.format === "Webinar")
  );
}

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "post", title: "Post Details", default: true },
    { name: "event", title: "Event Details" },
    { name: "content", title: "Content" },
    { name: "speakers", title: "Speakers" },
    { name: "overrides", title: "Display Overrides" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      group: "post",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      group: "post",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      components: { input: AutoSlugInput },
      description: "Page URL: /events/<slug>.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      group: "post",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary used in listings and meta descriptions.",
    }),
    defineField({
      name: "format",
      group: "post",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Breakfast event", value: "Breakfast event" },
          { title: "Webinar", value: "Webinar" },
          { title: "Conference", value: "Conference" },
          { title: "Roundtable", value: "Roundtable" },
          { title: "Event", value: "Event" },
        ],
        layout: "radio",
      },
      initialValue: "Event",
      description:
        "The eyebrow shown above the title. A webinar is an event for every purpose that matters here — it has a date, it can be upcoming, and it belongs in the same archive — so this only changes the label, never the behaviour.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "heroImage",
      group: "post",
      title: "Featured image",
      type: "image",
      description:
        "Hero image on the event page and the image on listing cards.",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      group: "event",
      title: "Event date",
      type: "datetime",
      description:
        "Enter the start in the event's local time — use the timezone switcher if it isn't Sydney.",
      options: {
        displayTimeZone: DEFAULT_EVENT_TIMEZONE,
        allowTimeZoneSwitch: true,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "endDate",
      group: "event",
      title: "End time",
      type: "datetime",
      options: {
        displayTimeZone: DEFAULT_EVENT_TIMEZONE,
        allowTimeZoneSwitch: true,
      },
      description:
        "Optional. When set, listings show a range — “8:30 am – 10:30 am”. Leave empty for a start time only.",
      validation: (R) =>
        R.min(R.valueOfField("date")).warning(
          "The end time is before the start time.",
        ),
    }),
    defineField({
      name: "timezone",
      group: "event",
      title: "Timezone",
      description:
        "Times on the site display in this timezone, with its label (e.g. AEDT, AWST).",
      type: "string",
      options: { list: [...EVENT_TIMEZONES], layout: "dropdown" },
      initialValue: DEFAULT_EVENT_TIMEZONE,
    }),
    defineField({
      name: "mode",
      group: "event",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "In person", value: "in-person" },
          { title: "Online", value: "online" },
        ],
        layout: "radio",
      },
      description:
        "In person shows the venue, map and directions fields; Online hides them.",
      initialValue: "in-person",
    }),
    defineField({
      name: "registrationOpen",
      group: "event",
      title: "Registration open",
      type: "boolean",
      components: { input: RegistrationOpenInput },
      validation: (R) =>
        R.custom((value, { document }) =>
          value === true && isEventPast(document?.date, document?.endDate)
            ? "This event has ended — switch this off."
            : true,
        ),
      initialValue: true,
    }),
    defineField({
      name: "showInBanner",
      group: "event",
      title: "Show in header announcement banner",
      description:
        "Displays this event in the site-wide banner until its end date. If several are on, the latest by start date wins.",
      type: "boolean",
      components: { input: FutureOnlyToggle },
      validation: (R) =>
        R.custom((value, { document }) =>
          value === true && isEventPast(document?.date, document?.endDate)
            ? "This event has ended — switch this off."
            : true,
        ),
      initialValue: false,
    }),
    defineField({
      name: "recording",
      group: "event",
      title: "Recording",
      description:
        "Knowledge Hub post with the recording. Shown as Watch recording once the event has passed.",
      // Only once registration has closed or the event is over.
      hidden: ({ document }) =>
        document?.registrationOpen !== false &&
        !isEventPast(document?.date, document?.endDate),
      type: "reference",
      to: [{ type: "knowledgePost" }],
      options: { filter: 'category == "Webinar"' },
    }),
    defineField({
      name: "partners",
      group: "event",
      title: "Partners / Co-hosts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Partner name",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "label",
              title: "Label (shown below logo)",
              type: "string",
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
    defineField({
      name: "location",
      group: "event",
      title: "Location",
      type: "string",
      description:
        'Short venue line for listings, e.g. "Microsoft, North Sydney".',
      hidden: ({ document }) => isOnline(document),
    }),
    defineField({
      name: "eventMeta",
      group: "event",
      title: "Venue, capacity & registration",
      type: "object",
      // Rendered flat (no box) so these read as part of the Event Details tab.
      components: { field: (props) => props.children, input: EventVenueInput },
      fields: [
        defineField({
          name: "venueAddress",
          title: "Venue address lines",
          hidden: ({ document }) => isOnline(document),
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "mapsEmbedUrl",
          title: "Google Maps embed URL",
          description: "Filled in from the address; edit to override.",
          hidden: ({ document }) => isOnline(document),
          type: "url",
        }),
        defineField({
          name: "mapsDirectionsUrl",
          title: "Google Maps directions URL",
          description: "Filled in from the address; edit to override.",
          hidden: ({ document }) => isOnline(document),
          type: "url",
        }),
        defineField({
          name: "capacity",
          title: "Capacity",
          description: "Optional, e.g. “35 attendees”.",
          type: "string",
        }),
        defineField({
          name: "registerUrl",
          title: "Register URL",
          // Edited inside the Registration open block (RegistrationOpenInput).
          hidden: true,
          type: "url",
          validation: (R) =>
            R.uri({ scheme: ["http", "https"] }).warning(
              "Add the registration URL",
            ),
        }),
      ],
    }),
    defineField({
      name: "overview",
      group: "content",
      title: "Overview",
      description: "Intro paragraph at the top of the event page.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "challenge",
      group: "content",
      title: "Challenge Section",
      type: "object",
      fields: [
        defineField({
          name: "intro",
          title: "Intro paragraph",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "callout",
          title: "Callout heading (bold line)",
          type: "string",
        }),
        defineField({
          name: "bullets",
          title: "Bullet points",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ICON_OPTIONS, layout: "dropdown" },
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (R) => R.required(),
                }),
              ],
              preview: { select: { title: "text", subtitle: "icon" } },
            },
          ],
        }),
        defineField({
          name: "closing",
          title: "Closing paragraph",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "whyAttend",
      group: "content",
      title: "Why Attend Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          type: "string",
        }),
        defineField({
          name: "intro",
          title: "Intro paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "items",
          title: "Attend reasons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ICON_OPTIONS, layout: "dropdown" },
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (R) => R.required(),
                }),
              ],
              preview: { select: { title: "title", subtitle: "icon" } },
            },
          ],
        }),
        defineField({
          name: "closing",
          title: "Closing paragraph",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "agenda",
      group: "content",
      title: "Agenda",
      type: "object",
      fields: [
        defineField({
          name: "timeRange",
          title: "Time range display string",
          type: "string",
          placeholder: "8.30 am – 11.00 am",
        }),
        defineField({
          name: "items",
          title: "Agenda items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "time",
                  title: "Time",
                  type: "string",
                  validation: (R) => R.required(),
                }),
                defineField({
                  name: "item",
                  title: "Description",
                  type: "string",
                  validation: (R) => R.required(),
                }),
              ],
              preview: { select: { title: "time", subtitle: "item" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whoShouldAttend",
      group: "content",
      title: "Who Should Attend",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "roles",
          title: "Role tags",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "description",
          title: "Description paragraph",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "directions",
      group: "content",
      title: "Getting there / How to join",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Venue heading",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Directions paragraphs (one item per paragraph)",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),
    defineField({
      name: "speakers",
      group: "speakers",
      title: "Speakers",
      description:
        "One or more speakers. Overrides the legacy single speaker when set.",
      type: "array",
      of: [
        {
          type: "object",
          name: "eventSpeaker",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "credentials",
              title: "Post-nominals / credentials",
              type: "string",
              placeholder: "OAM, B.A. (Hons. Psych)",
            }),
            defineField({
              name: "role",
              title: "Role and organisation",
              type: "string",
            }),
            defineField({
              name: "headshot",
              title: "Headshot",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "bio",
              title: "Bio paragraphs (one item per paragraph)",
              type: "array",
              of: [{ type: "text" }],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "headshot" },
          },
        },
      ],
    }),
    defineField({
      name: "speaker",
      group: "speakers",
      title: "Guest Speaker (legacy single)",
      description:
        "Kept for the production site, which still reads this field. New events: use Speakers below.",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({
          name: "credentials",
          title: "Post-nominals / credentials",
          type: "string",
          placeholder: "OAM, B.A. (Hons. Psych)",
        }),
        defineField({
          name: "role",
          title: "Role and organisation",
          type: "string",
        }),
        defineField({
          name: "headshot",
          title: "Headshot",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "bio",
          title: "Bio paragraphs (one item per paragraph)",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),
    defineField({
      name: "hero",
      group: "overrides",
      title: "Hero",
      type: "object",
      // Rendered flat so the fields read as part of the tab.
      components: { field: (props) => props.children },
      fields: [
        defineField({
          name: "heading",
          title: "Hero heading",
          description:
            "Optional. Replaces the title in the event hero and on event cards. Leave empty to use Title.",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Hero subtitle",
          description: "Optional. Leave empty to use Excerpt.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "displayDate",
      group: "overrides",
      title: "Date display override",
      description:
        "Optional. Leave empty to show Event date, e.g. “Thursday 17 September 2026”.",
      type: "string",
    }),
    defineField({
      name: "displayTime",
      group: "overrides",
      title: "Time display override",
      description:
        "Optional. Leave empty to show Event date → End time in the event's timezone, e.g. “8:30 am - 10:30 am AEST”.",
      type: "string",
    }),
    defineField({
      name: "displayVenueName",
      group: "overrides",
      title: "Venue name override",
      description: "Optional. Leave empty to show Location.",
      hidden: ({ document }) => isOnline(document),
      type: "string",
    }),
    defineField({
      name: "meta",
      group: "overrides",
      title: "Display meta",
      type: "string",
      description:
        'Short line shown in the announcement banner and listings, e.g. "Thu 17 Sep • North Sydney". Leave empty to compose it from date and location.',
    }),
    defineField({
      name: "footerCta",
      group: "cta",
      title: "Footer CTA Banner",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "seo",
      group: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta title", type: "string" }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Event date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "heroImage" },
  },
});
