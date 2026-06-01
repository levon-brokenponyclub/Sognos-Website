import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "columns", title: "Columns" },
    { name: "bottom", title: "Bottom bar" },
  ],
  fields: [
    defineField({
      name: "brandLogo",
      title: "Brand logo",
      type: "image",
      group: "brand",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      group: "brand",
    }),
    defineField({
      name: "platformLogos",
      title: "Platform logos",
      type: "array",
      group: "brand",
      of: [
        {
          type: "object",
          name: "platformLogo",
          fields: [
            defineField({
              name: "image",
              title: "Logo image",
              type: "image",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "columns",
      title: "Link columns",
      type: "array",
      group: "columns",
      of: [
        {
          type: "object",
          name: "column",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "link",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (R) => R.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Path or URL",
                      type: "string",
                      validation: (R) => R.required(),
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "acknowledgement",
      title: "Acknowledgement of Country",
      type: "text",
      rows: 5,
      group: "bottom",
    }),
    defineField({
      name: "copyrightSuffix",
      title: "Copyright suffix",
      description: "E.g. \"All rights reserved\"",
      type: "string",
      group: "bottom",
    }),
    defineField({
      name: "legalLinks",
      title: "Legal links (bottom row)",
      type: "array",
      group: "bottom",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "href",
              title: "Path or URL",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
