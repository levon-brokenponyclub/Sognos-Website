import { defineField, defineType } from "sanity";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "document",
  groups: [
    { name: "bookDemo", title: "Book a Demo", default: true },
    { name: "logos", title: "Logo Block" },
    { name: "stats", title: "Stat Blocks" },
  ],
  fields: [
    defineField({
      name: "bookDemoHeading",
      title: "Heading",
      type: "string",
      group: "bookDemo",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "bookDemoDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "bookDemo",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "logoBlockHeading",
      title: "Block heading",
      description: "E.g. \"Powered by Microsoft\"",
      type: "string",
      group: "logos",
    }),
    defineField({
      name: "logos",
      title: "Platform logos",
      type: "array",
      group: "logos",
      of: [
        {
          type: "object",
          name: "logo",
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
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "numericValue",
              title: "Numeric value",
              type: "number",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix (e.g. % or ×)",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "variant",
              title: "Style variant",
              type: "string",
              options: {
                list: [
                  { title: "Light (white background)", value: "light" },
                  { title: "Dark (prussian blue)", value: "dark" },
                  { title: "Blue (accent)", value: "blue" },
                ],
                layout: "radio",
              },
              initialValue: "light",
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "numericValue" },
          },
        },
      ],
      validation: (R) => R.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: "CTA Section" }),
  },
});
