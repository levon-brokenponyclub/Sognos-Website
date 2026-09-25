import { defineField, defineType } from "sanity";

const seoFields = [
  defineField({ name: "title", title: "Browser title", type: "string" }),
  defineField({ name: "description", title: "Meta description", type: "text", rows: 2 }),
];

const heroFields = [
  defineField({ name: "logo", title: "Product logo (white)", type: "image", options: { hotspot: false } }),
  defineField({ name: "headline", title: "Headline (H1)", type: "string" }),
  defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
];

const productDrawerFields = [
  defineField({ name: "peekTitle", title: "Peek title", type: "string" }),
  defineField({ name: "peekDescription", title: "Peek description", type: "text", rows: 3 }),
  defineField({ name: "drawerTitle", title: "Drawer title", type: "string" }),
  defineField({ name: "drawerDescription", title: "Drawer description", type: "text", rows: 3 }),
];

const subNavSectionFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "id", title: "Section ID (anchor target)", type: "string" }),
  defineField({ name: "href", title: "External href (overrides anchor)", type: "string" }),
];

const sectionHeaderFields = [
  defineField({ name: "eyebrow", title: "Eyebrow / pill label", type: "string" }),
  defineField({ name: "heading", title: "Heading", type: "string" }),
  defineField({ name: "intro", title: "Intro copy", type: "text", rows: 3 }),
];

const ctaButtonFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Href", type: "string" }),
];

export const sognosgenogramPage = defineType({
  name: "sognosgenogramPage",
  title: "SognosGenogram Page",
  type: "document",
  groups: [
    { name: "meta", title: "Meta" },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections", default: true },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "SEO / Metadata",
      type: "object",
      group: "meta",
      fields: seoFields,
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: heroFields,
    }),
    defineField({
      name: "productDrawer",
      title: "Product Drawer",
      type: "object",
      group: "hero",
      fields: productDrawerFields,
    }),
    defineField({
      name: "subNav",
      title: "Product Sub-Nav (anchor links)",
      type: "array",
      group: "hero",
      of: [{ type: "object", fields: subNavSectionFields, preview: { select: { title: "label", subtitle: "id" } } }],
    }),
    defineField({
      name: "datasheet",
      title: "Datasheet PDF",
      type: "file",
      group: "meta",
      options: { accept: "application/pdf" },
      description: "Upload the product datasheet. This powers the Download Datasheet button in the sub-nav.",
    }),
    defineField({
      name: "problemsHeader",
      title: "Problems — section header",
      type: "object",
      group: "sections",
      fields: sectionHeaderFields,
    }),
    defineField({
      name: "problems",
      title: "Problems (pain points)",
      type: "array",
      group: "sections",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({
      name: "featuresHeader",
      title: "Features — section header",
      type: "object",
      group: "sections",
      fields: sectionHeaderFields,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "sections",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (R) => R.required() }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({
      name: "storiesHeader",
      title: "Customer Stories — section header",
      type: "object",
      group: "sections",
      fields: sectionHeaderFields,
    }),
    defineField({
      name: "featuredStories",
      title: "Featured customer stories",
      type: "array",
      group: "sections",
      of: [{ type: "reference", to: [{ type: "customerStory" }] }],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
        defineField({ name: "primaryCTA", title: "Primary CTA", type: "object", fields: ctaButtonFields }),
        defineField({ name: "secondaryCTA", title: "Secondary CTA", type: "object", fields: ctaButtonFields }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "SognosGenogram Page" }),
  },
});
