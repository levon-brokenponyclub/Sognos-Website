import { defineField, defineType } from "sanity";

export const customerStory = defineType({
  name: "customerStory",
  title: "Customer Story",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "company",
      group: "details",
      title: "Company name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      group: "details",
      title: "Slug",
      type: "slug",
      options: { source: "company", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      group: "details",
      title: "Story title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      group: "details",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "date",
      group: "details",
      title: "Publish date",
      type: "date",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "readTime",
      group: "details",
      title: "Read time (e.g. '4 min read')",
      type: "string",
    }),
    defineField({
      name: "order",
      group: "details",
      title: "Display order (lower = earlier in prev/next)",
      type: "number",
      validation: (R) => R.required().integer(),
    }),
    defineField({
      name: "heroImage",
      group: "media",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "companyLogo",
      group: "media",
      title: "Company logo (white/inverted preferred)",
      type: "image",
    }),
    defineField({
      name: "productLogo",
      group: "media",
      title: "Product logo (SognosCare / SognosRoster)",
      type: "image",
    }),
    defineField({
      name: "quote",
      group: "content",
      title: "Pull quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "quoteAuthor",
      group: "content",
      title: "Quote author (Name, Role - Company)",
      type: "string",
    }),
    defineField({
      name: "sidebar",
      group: "content",
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
      group: "media",
      title: "Downloadable PDF",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "body",
      group: "content",
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
