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
            /* S.listItem()
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
            S.divider(), */
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.listItem()
              .title("Customer Stories")
              .id("customerStories")
              .child(
                S.documentTypeList("customerStory")
                  .title("Customer Stories")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            S.listItem()
              .title("Knowledge Hub")
              .id("knowledgeHub")
              .child(
                S.documentTypeList("knowledgePost")
                  .title("Knowledge Hub")
                  .defaultOrdering([{ field: "date", direction: "desc" }]),
              ),
            S.listItem()
              .title("Global Content")
              .id("globalContent")
              .child(
                S.list()
                  .title("Global Content")
                  .items([
                    S.listItem()
                      .title("Logo Strip")
                      .id("logoStrip")
                      .child(
                        S.document()
                          .schemaType("logoStrip")
                          .documentId("logoStrip"),
                      ),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
});
