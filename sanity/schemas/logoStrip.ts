import { defineField, defineType } from "sanity";

export const logoStrip = defineType({
  name: "logoStrip",
  title: "Logo Strip",
  type: "document",
  fields: [
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Logo image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Logo Strip" }),
  },
});
