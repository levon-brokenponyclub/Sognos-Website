import { defineField, defineType } from "sanity";

export const sognosgenogramPage = defineType({
  name: "sognosgenogramPage",
  title: "SognosGenogram Page",
  type: "document",
  fields: [
    defineField({
      name: "datasheet",
      title: "Datasheet PDF",
      type: "file",
      options: { accept: "application/pdf" },
      description: "Upload the product datasheet. This powers the Download Datasheet button in the sub-nav.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "SognosGenogram Page" }),
  },
});
