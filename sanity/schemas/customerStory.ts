import { defineField, defineType } from "sanity";

export const customerStory = defineType({
  name: "customerStory",
  title: "Customer Story",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "company", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Story title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (e.g. '4 min read')",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display order (lower = earlier in prev/next)",
      type: "number",
      validation: (R) => R.required().integer(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Company logo (white/inverted preferred)",
      type: "image",
    }),
    defineField({
      name: "productLogo",
      title: "Product logo (SognosCare / SognosRoster)",
      type: "image",
    }),
    defineField({
      name: "brandColor",
      title: "Brand colour",
      description:
        "Client brand colour used as the background for the customer-story card and pull-quote. Leave empty to fall back to the default product tone.",
      type: "color",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "quote",
      title: "Pull quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote author (Name, Role - Company)",
      type: "string",
    }),
    defineField({
      name: "sidebar",
      title: "Sidebar fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "downloadFile",
      title: "Downloadable PDF",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Emphasis", value: "em" },
              { title: "Strong", value: "strong" },
            ],
          },
        },
        {
          type: "image",
          name: "inlineImage",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
        },
        {
          type: "object",
          name: "calloutBlock",
          title: "Callout block",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
            defineField({
              name: "color",
              title: "Colour",
              type: "string",
              description:
                "Background tone. Leave empty to fall back to the brand blue accent.",
              options: {
                layout: "radio",
                list: [
                  { title: "Orange", value: "orange" },
                  { title: "Teal", value: "teal" },
                  { title: "Blue", value: "blue" },
                  { title: "Purple", value: "purple" },
                  { title: "Coral", value: "coral" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "text", subtitle: "color" },
          },
        },
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [
            defineField({
              name: "text",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
            defineField({
              name: "author",
              title: "Author (optional)",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Role / title (optional)",
              type: "string",
            }),
          ],
          preview: { select: { title: "text" } },
        },
        {
          type: "object",
          name: "quoteCallout",
          title: "Quote Callout (dark block)",
          fields: [
            defineField({
              name: "text",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
            defineField({
              name: "author",
              title: "Author (optional)",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Role / title (optional)",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Author photo (optional)",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "text" } },
        },
        {
          type: "object",
          name: "statRow",
          title: "Stat Row",
          fields: [
            defineField({
              name: "stats",
              title: "Stats",
              type: "array",
              validation: (R) => R.min(2).max(4),
              of: [
                {
                  type: "object",
                  name: "stat",
                  fields: [
                    defineField({
                      name: "number",
                      title: 'Number / value (e.g. "95%")',
                      type: "string",
                      validation: (R) => R.required(),
                    }),
                    defineField({
                      name: "label",
                      title: "Label / description",
                      type: "string",
                      validation: (R) => R.required(),
                    }),
                  ],
                  preview: { select: { title: "number", subtitle: "label" } },
                },
              ],
            }),
          ],
          preview: {
            select: { first: "stats.0.number", count: "stats.length" },
            prepare: ({ first, count }) => ({
              title: `Stat Row (${count ?? 0} stats)`,
              subtitle: first,
            }),
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "company", subtitle: "title", media: "heroImage" },
  },
});
