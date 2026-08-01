import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
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
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
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
                    S.listItem()
                      .title("CTA Section")
                      .id("ctaSection")
                      .child(
                        S.document()
                          .schemaType("ctaSection")
                          .documentId("ctaSection"),
                      ),
                    S.listItem()
                      .title("Footer")
                      .id("footer")
                      .child(
                        S.document()
                          .schemaType("footer")
                          .documentId("footer"),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Products")
              .id("products")
              .child(
                S.list()
                  .title("Products")
                  .items([
                    S.listItem()
                      .title("SognosCare")
                      .id("sognoscarePage")
                      .child(
                        S.document()
                          .schemaType("sognoscarePage")
                          .documentId("sognoscarePage"),
                      ),
                    S.listItem()
                      .title("SognosRoster")
                      .id("sognosrosterPage")
                      .child(
                        S.document()
                          .schemaType("sognosrosterPage")
                          .documentId("sognosrosterPage"),
                      ),
                    S.divider(),
                    S.listItem()
                      .title("Editions")
                      .id("editions")
                      .child(
                        S.documentTypeList("edition")
                          .title("SognosCare Editions")
                          .defaultOrdering([
                            { field: "order", direction: "asc" },
                            { field: "name", direction: "asc" },
                          ]),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Pages")
              .id("pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Legals")
                      .id("legals")
                      .child(
                        S.documentTypeList("legalPage")
                          .title("Legals")
                          .defaultOrdering([
                            { field: "title", direction: "asc" },
                          ]),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Posts")
              .id("posts")
              .child(
                S.list()
                  .title("Posts")
                  .items([
                    S.listItem()
                      .title("Customer Stories")
                      .id("customerStories")
                      .child(
                        S.documentTypeList("customerStory")
                          .title("Customer Stories")
                          .defaultOrdering([
                            { field: "order", direction: "asc" },
                          ]),
                      ),
                    S.listItem()
                      .title("Knowledge Hub")
                      .id("knowledgeHub")
                      .child(
                        S.documentTypeList("knowledgePost")
                          .title("Knowledge Hub")
                          .defaultOrdering([
                            { field: "date", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("Events")
                      .id("events")
                      .child(
                        S.documentTypeList("event")
                          .title("Events")
                          .defaultOrdering([
                            { field: "date", direction: "desc" },
                          ]),
                      ),
                  ]),
              ),
          ]),
    }),
    colorInput(),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
});
