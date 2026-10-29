import { defineField, defineType } from "sanity";

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

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "settings", title: "Settings" },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      group: "details",
      title: "Title (Studio label)",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      group: "details",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      group: "details",
      title: "Excerpt",
      description: "Short summary for listing cards and meta",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "format",
      group: "details",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Breakfast event", value: "Breakfast event" },
          { title: "Workshop", value: "Workshop" },
          { title: "Webinar", value: "Webinar" },
          { title: "Conference", value: "Conference" },
          { title: "Roundtable", value: "Roundtable" },
          { title: "Panel discussion", value: "Panel discussion" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "date",
      group: "details",
      title: "Start date / time",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      group: "details",
      title: "End date / time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      group: "details",
      title: "Location (short display string)",
      type: "string",
      placeholder: "Microsoft, North Sydney",
    }),
    defineField({
      name: "meta",
      group: "details",
      title: "Meta (one-line display string)",
      type: "string",
      placeholder: "Thu 17 Sep • North Sydney",
    }),
    defineField({
      name: "registrationOpen",
      group: "settings",
      title: "Registration open",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInBanner",
      group: "settings",
      title: "Show in header announcement banner",
      description:
        "Displays this event in the site-wide banner until its end date. If several are on, the latest by start date wins.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "playbackUrl",
      group: "settings",
      title: "Playback URL",
      description:
        "Link to the event recording. Shown on the site only after the event has ended. YouTube and Vimeo links play on the page; other links (Teams, Stream, Zoom) open in a new tab.",
      type: "url",
      validation: (R) => R.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "playbackLabel",
      group: "settings",
      title: "Playback button label",
      type: "string",
      placeholder: "Watch the recording",
      hidden: ({ parent }) => !parent?.playbackUrl,
    }),
    defineField({
      name: "heroImage",
      group: "details",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
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
    defineField({
      name: "hero",
      group: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (R) => R.required(),
        }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "description",
          title: "Description paragraph",
          type: "text",
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: "partners",
      group: "hero",
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
      name: "eventMeta",
      group: "hero",
      title: "Event Details",
      type: "object",
      fields: [
        defineField({
          name: "date",
          title: "Date display string",
          type: "string",
          placeholder: "Thursday 17 September",
        }),
        defineField({
          name: "time",
          title: "Time display string",
          type: "string",
          placeholder: "8.30 am – 10.30 am",
        }),
        defineField({ name: "venueName", title: "Venue name", type: "string" }),
        defineField({
          name: "venueAddress",
          title: "Venue address lines",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "capacity",
          title: "Capacity display string",
          type: "string",
          placeholder: "35 attendees",
        }),
        defineField({
          name: "registerUrl",
          title: "Register URL",
          type: "url",
          validation: (R) =>
            R.uri({ scheme: ["http", "https"] }).warning(
              "Add the registration URL",
            ),
        }),
        defineField({
          name: "mapsEmbedUrl",
          title: "Google Maps embed URL",
          type: "url",
        }),
        defineField({
          name: "mapsDirectionsUrl",
          title: "Google Maps directions URL",
          type: "url",
        }),
      ],
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
      name: "speaker",
      group: "content",
      title: "Guest Speaker",
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
      title: "Getting There",
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
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "meta",
      media: "heroImage",
    },
  },
});
