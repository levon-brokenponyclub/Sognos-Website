import { defineField, defineType } from "sanity";

const CATEGORY_OPTIONS = [
  "Milestone",
  "News",
  "Events",
  "Webinar",
  "Insights",
] as const;

const INDUSTRY_OPTIONS = [
  "Health & Social Care",
  "Facilities Management",
  "Local Government",
  "Industrial Services",
  "Energy & Utilities",
] as const;

export const knowledgePost = defineType({
  name: "knowledgePost",
  title: "Knowledge Hub Post",
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
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((c) => ({ title: c, value: c })),
        layout: "radio",
      },
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
      title: "Read time (e.g. '3 min read')",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Sognos Solutions",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (used on archive cards)",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry (optional)",
      type: "string",
      options: {
        list: INDUSTRY_OPTIONS.map((i) => ({ title: i, value: i })),
      },
    }),
    defineField({
      name: "useCase",
      title: "Use case (optional, free text)",
      type: "string",
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
            { title: "Blockquote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Emphasis", value: "em" },
              { title: "Strong", value: "strong" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (R) =>
                      R.uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
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
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
    },
  },
});
