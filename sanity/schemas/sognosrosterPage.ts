import { defineField, defineType } from "sanity";

const seoFields = [
  defineField({ name: "title", title: "Browser title", type: "string" }),
  defineField({ name: "description", title: "Meta description", type: "text", rows: 2 }),
];

const heroFields = [
  defineField({
    name: "logo",
    title: "Product logo (white)",
    type: "image",
    options: { hotspot: false },
  }),
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
  defineField({
    name: "href",
    title: "External href (overrides anchor)",
    type: "string",
    description: "Use only for off-page links such as /contact.",
  }),
];

const sectionHeaderFields = [
  defineField({ name: "eyebrow", title: "Eyebrow / pill label", type: "string" }),
  defineField({ name: "heading", title: "Heading", type: "string" }),
  defineField({ name: "intro", title: "Intro copy", type: "text", rows: 3 }),
];

const problemFields = [
  defineField({ name: "number", title: "Number (01, 02…)", type: "string" }),
  defineField({ name: "problem", title: "Problem headline", type: "string" }),
  defineField({ name: "problemDetail", title: "Problem detail", type: "text", rows: 3 }),
  defineField({ name: "solution", title: "Solution (The Fix)", type: "text", rows: 3 }),
  defineField({ name: "iconPath", title: "SVG icon path (d attribute)", type: "string" }),
];

const featureFields = [
  defineField({ name: "id", title: "ID (slug, no spaces)", type: "string" }),
  defineField({ name: "name", title: "Feature name", type: "string" }),
  defineField({ name: "tagline", title: "Tagline (short)", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
  defineField({
    name: "capabilities",
    title: "Capabilities (bullet points)",
    type: "array",
    of: [{ type: "string" }],
  }),
];

const ctaButtonFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Href", type: "string" }),
];

const ctaFields = [
  defineField({ name: "headline", title: "Headline", type: "string" }),
  defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
  defineField({
    name: "primaryCTA",
    title: "Primary CTA",
    type: "object",
    fields: ctaButtonFields,
  }),
  defineField({
    name: "secondaryCTA",
    title: "Secondary CTA",
    type: "object",
    fields: ctaButtonFields,
  }),
];

export const sognosrosterPage = defineType({
  name: "sognosrosterPage",
  title: "SognosRoster Page",
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
      description: "Upload the product datasheet. This powers the Datasheet download button in the sub-nav.",
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
      title: "Problems (What It Solves)",
      type: "array",
      group: "sections",
      of: [{ type: "object", fields: problemFields, preview: { select: { title: "problem", subtitle: "number" } } }],
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
      of: [{ type: "object", fields: featureFields, preview: { select: { title: "name", subtitle: "tagline" } } }],
    }),
    defineField({
      name: "advantagesHeader",
      title: "Advantages — section header",
      type: "object",
      group: "sections",
      fields: sectionHeaderFields,
    }),
    defineField({
      name: "advantages",
      title: "Advantages (bullet items)",
      type: "array",
      group: "sections",
      of: [{ type: "string" }],
      description: "Plain strings — laid out in the Key Advantages bento grid.",
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
      description: "Optional. If omitted, the page falls back to the global story rotation.",
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      group: "cta",
      fields: ctaFields,
    }),
  ],
  preview: {
    prepare: () => ({ title: "SognosRoster Page" }),
  },
});
