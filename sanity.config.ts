import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  name: "sognos",
  title: "Sognos CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("SognosCare Page")
              .id("sognoscarePage")
              .child(
                S.document()
                  .schemaType("sognoscarePage")
                  .documentId("sognoscarePage"),
              ),
            S.listItem()
              .title("SognosRoster Page")
              .id("sognosrosterPage")
              .child(
                S.document()
                  .schemaType("sognosrosterPage")
                  .documentId("sognosrosterPage"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
});
