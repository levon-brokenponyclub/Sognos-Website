import { defineField, defineType } from "sanity";

const heroFields = [
  defineField({ name: "headline", title: "Headline", type: "string" }),
  defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
];

const problemFields = [
  defineField({ name: "number", title: "Number (01, 02…)", type: "string" }),
  defineField({ name: "problem", title: "Problem headline", type: "string" }),
  defineField({ name: "problemDetail", title: "Problem detail", type: "text", rows: 3 }),
  defineField({ name: "solution", title: "Solution (The Fix)", type: "text", rows: 3 }),
  defineField({ name: "iconPath", title: "SVG icon path", type: "string" }),
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

const statFields = [
  defineField({ name: "value", title: "Value (e.g. 40%)", type: "string" }),
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "context", title: "Context line", type: "string" }),
  defineField({
    name: "theme",
    title: "Theme",
    type: "string",
    options: { list: ["light", "dark", "brand"] },
  }),
];

const testimonialFields = [
  defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
  defineField({ name: "role", title: "Role / Title", type: "string" }),
  defineField({ name: "organisation", title: "Organisation", type: "string" }),
];

const storyFields = [
  defineField({ name: "company", title: "Company name", type: "string" }),
  defineField({ name: "companySize", title: "Worker count (e.g. 350+)", type: "string" }),
  defineField({ name: "industry", title: "Industry", type: "string" }),
  defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
  defineField({ name: "author", title: "Author name", type: "string" }),
  defineField({ name: "role", title: "Author role & organisation", type: "string" }),
  defineField({ name: "href", title: "Case study href", type: "string" }),
];

export const sognosrosterPage = defineType({
  name: "sognosrosterPage",
  title: "SognosRoster Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: heroFields,
    }),
    defineField({
      name: "problems",
      title: "Problems (What It Solves)",
      type: "array",
      of: [{ type: "object", fields: problemFields }],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "object", fields: featureFields }],
    }),
    defineField({
      name: "stats",
      title: "Stats (Proof section)",
      type: "array",
      of: [{ type: "object", fields: statFields }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials (Proof section)",
      type: "array",
      of: [{ type: "object", fields: testimonialFields }],
    }),
    defineField({
      name: "stories",
      title: "Customer Stories",
      type: "array",
      of: [{ type: "object", fields: storyFields }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "SognosRoster Page" }),
  },
});
