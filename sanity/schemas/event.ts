import { defineField, defineType } from "sanity";

// Listing-level model for events. The bespoke event pages (currently
// /events/nfp-real-care) stay hand-built — their agenda, speakers and
// icon-driven bullets are not modelled here. This exists so events can be
// listed and featured from the CMS: the Knowledge Hub dropdown's featured
// column, the announcement banner, and the Events category in the archive.
//
// `body` is present but optional, so a future pass can move page content in
// without a schema migration.
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "Must match the route under /events — the page itself is hand-built.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary used in listings and meta descriptions.",
    }),
    defineField({
      name: "date",
      title: "Event date",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'For example "Microsoft, North Sydney".',
    }),
    defineField({
      name: "meta",
      title: "Display meta",
      type: "string",
      description:
        'Short line shown in the announcement banner and listings, e.g. "Thu 17 Sep • North Sydney". Leave empty to compose it from date and location.',
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "registrationOpen",
      title: "Registration open",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Unused for now — the event pages are hand-built. Here so page content can move to the CMS later without a migration.",
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
