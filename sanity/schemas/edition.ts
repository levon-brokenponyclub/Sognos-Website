import { defineField, defineType } from "sanity";

const seoFields = [
  defineField({ name: "title", title: "Browser title", type: "string" }),
  defineField({ name: "description", title: "Meta description", type: "text", rows: 2 }),
];

const problemFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
];

const featureFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
];

const proofQuoteFields = [
  defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
  defineField({ name: "attribution", title: "Attribution (role, organisation)", type: "string" }),
];

export const edition = defineType({
  name: "edition",
  title: "SognosCare Edition",
  type: "document",
  groups: [
    { name: "meta", title: "Meta" },
    { name: "card", title: "Parent-page card" },
    { name: "hero", title: "Edition hero & theme", default: true },
    { name: "content", title: "Page content" },
    { name: "customerStory", title: "Customer Story" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Edition name",
      type: "string",
      group: "meta",
      description:
        "Used as the card label on /products/sognoscare and as the H1 fallback on the edition page.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "name", maxLength: 96 },
      description: "Becomes /products/sognoscare/editions/[slug].",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "Display order (lower = earlier in slider)",
      type: "number",
      group: "meta",
      validation: (R) => R.integer(),
    }),
    defineField({
      name: "seo",
      title: "SEO / Metadata",
      type: "object",
      group: "meta",
      fields: seoFields,
    }),

    // ─── Parent-page card (SognosCare editions slider) ──────────────────────
    defineField({
      name: "cardLogo",
      title: "Card logo (colour)",
      type: "image",
      group: "card",
      description: "Used in the slider card on /products/sognoscare and in the sticky sub-nav.",
    }),
    defineField({
      name: "cardTagline",
      title: "Card tagline",
      type: "string",
      group: "card",
    }),
    defineField({
      name: "cardDescription",
      title: "Card description",
      type: "text",
      rows: 3,
      group: "card",
    }),

    // ─── Edition hero & theme ───────────────────────────────────────────────
    defineField({
      name: "accentHex",
      title: "Accent colour (hex, e.g. #00A98F)",
      type: "string",
      group: "hero",
      description:
        "Drives FlowCanvas tints, accent text/border/bg, and the parent-page card colour. Six-character hex.",
      validation: (R) =>
        R.regex(/^#([0-9a-fA-F]{6})$/, { name: "hex colour" }).required(),
    }),
    defineField({
      name: "heroLogoWhite",
      title: "Hero logo (white / inverted)",
      type: "image",
      group: "hero",
    }),
    defineField({
      name: "gradient",
      title: "Gradient background image",
      type: "image",
      group: "hero",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero tagline",
      type: "string",
      group: "hero",
      description: "Shown above the H1 on the edition page hero.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    // ─── Page content ───────────────────────────────────────────────────────
    defineField({
      name: "problems",
      title: "Problems (What it solves)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: problemFields,
          preview: { select: { title: "label", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: featureFields,
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "advantages",
      title: "Advantages",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "aiTools",
      title: "AI tools",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "proofQuotes",
      title: "Proof quotes",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: proofQuoteFields,
          preview: { select: { title: "attribution", subtitle: "quote" } },
        },
      ],
    }),

    // ─── Customer Story ─────────────────────────────────────────────────────
    defineField({
      name: "customerStories",
      title: "Customer Stories",
      type: "array",
      group: "customerStory",
      of: [{ type: "reference", to: [{ type: "customerStory" }] }],
      description:
        "Select one or more Customer Story documents to feature on this edition page. The first reference is used as the headline story.",
      validation: (R) => R.unique(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Name (A→Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "cardTagline", media: "cardLogo" },
  },
});
