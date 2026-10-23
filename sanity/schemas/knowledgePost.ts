import { defineField, defineType } from "sanity";
import { HtmlFileInput } from "../components/HtmlFileInput";
import { BlockquoteStyle } from "../components/BlockquoteStyle";
import { CategoryInput } from "../components/CategoryInput";

const CATEGORY_OPTIONS = [
  "Milestone",
  "News",
  "Events",
  "Webinar",
  "Insights",
  "Newsletter", // hidden from the radio by CategoryInput; set by the Newsletters template
] as const;

const INDUSTRY_OPTIONS = [
  "Health & Social Care",
  "Facilities Management",
  "Local Government",
  "Industrial Services",
  "Energy & Utilities",
] as const;

const imageFields = [
  defineField({
    name: "alt",
    title: "Alt text",
    type: "string",
    validation: (R) => R.required(),
  }),
  defineField({ name: "caption", title: "Caption", type: "string" }),
  defineField({
    name: "link",
    title: "Link URL",
    description: "Optional — makes the image clickable (opens in a new tab).",
    type: "url",
    validation: (R) => R.uri({ scheme: ["http", "https", "mailto"] }),
  }),
];

export const knowledgePost = defineType({
  name: "knowledgePost",
  title: "Knowledge Hub Post",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "taxonomy", title: "Taxonomy" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "title",
      group: "details",
      title: "Title",
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
      name: "category",
      group: "details",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((c) => ({ title: c, value: c })),
        layout: "radio",
      },
      // Newsletters keep category "Newsletter" (set by the Studio template)
      // but it is not a selectable option, so the field is hidden on them.
      hidden: ({ document }) => document?.category === "Newsletter",
      components: { input: CategoryInput },
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
      title: "Read time (e.g. '3 min read')",
      type: "string",
    }),
    defineField({
      name: "author",
      group: "details",
      title: "Author",
      type: "string",
      initialValue: "Sognos Solutions",
    }),
    defineField({
      name: "excerpt",
      group: "details",
      title: "Excerpt (used on archive cards)",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
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
      name: "industry",
      group: "taxonomy",
      title: "Industry (optional)",
      type: "string",
      options: {
        list: INDUSTRY_OPTIONS.map((i) => ({ title: i, value: i })),
      },
    }),
    defineField({
      name: "useCase",
      group: "taxonomy",
      title: "Use case (optional, free text)",
      type: "string",
    }),
    defineField({
      name: "newsletterHtml",
      group: "content",
      title: "Newsletter HTML",
      description:
        "Paste the full email HTML, or upload the exported .html file.",
      type: "text",
      rows: 12,
      hidden: ({ document }) => document?.category !== "Newsletter",
      components: { input: HtmlFileInput },
      validation: (R) =>
        R.custom((value, { document }) =>
          document?.category === "Newsletter" && !value
            ? "Newsletter HTML is required"
            : true,
        ),
    }),
    defineField({
      name: "body",
      group: "content",
      title: "Body",
      type: "array",
      hidden: ({ document }) => document?.category === "Newsletter",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Small", value: "small" },
            { title: "Large", value: "large" },
            { title: "Heading 2", value: "h2" },
            {
              title: "Blockquote",
              value: "blockquote",
              component: BlockquoteStyle,
            },
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
          title: "Image",
          options: { hotspot: true },
          fields: imageFields,
        },
        {
          type: "object",
          name: "imageRow",
          title: "Image row (2–3 images)",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              description: "Shown side by side, cropped to 3:4 portrait.",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: imageFields,
                },
              ],
              validation: (R) => R.required().min(2).max(3),
            }),
          ],
          preview: {
            select: { images: "images", media: "images.0" },
            prepare: ({ images, media }) => ({
              title: `Image row (${images?.length ?? 0})`,
              media,
            }),
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
