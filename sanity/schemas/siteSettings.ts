import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      description: "Used as the default <title> across the site",
      type: "string",
      group: "seo",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "Default meta description for pages without their own",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (R) => R.required().max(300),
    }),
    defineField({
      name: "responseTimeHeading",
      title: "Response time heading",
      description: "Headline shown on the contact page response card",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "responseTimeBody",
      title: "Response time body",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          name: "office",
          fields: [
            defineField({
              name: "region",
              title: "Region",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "label",
              title: "Label (e.g. Head Office)",
              type: "string",
            }),
            defineField({
              name: "entity",
              title: "Legal entity",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "address",
              title: "Address lines",
              type: "array",
              of: [{ type: "string" }],
              validation: (R) => R.min(1).required(),
            }),
            defineField({
              name: "phone",
              title: "Phone",
              type: "string",
            }),
            defineField({
              name: "email",
              title: "Email",
              type: "string",
              validation: (R) =>
                R.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                  name: "email",
                  invert: false,
                }),
            }),
          ],
          preview: {
            select: { title: "region", subtitle: "entity" },
          },
        },
      ],
    }),
    defineField({
      name: "abn",
      title: "ABN",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "contact",
      validation: (R) =>
        R.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
