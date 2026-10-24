import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { presentationResolve } from "./sanity/presentation/resolve";
import { colorInput } from "@sanity/color-input";
import { schemas } from "./sanity/schemas";
import { PREVIEW_PATHS, PreviewAction } from "./sanity/actions/PreviewAction";

// import.meta.env only exists under Vite (the standalone `sanity dev`
// server); Next's tsconfig has no ImportMetaEnv typing for it.
const viteEnv = (
  import.meta as unknown as { env?: Record<string, string | undefined> }
).env;

export default defineConfig({
  name: "sognos",
  title: "Sognos CMS",
  // Shared by two bundlers: the embedded /studio route in the Next.js app
  // (Turbopack, exposes NEXT_PUBLIC_* via process.env) and the standalone
  // `sanity dev` Vite server (exposes SANITY_STUDIO_* via import.meta.env).
  // Cast to unknown first — Next's tsconfig has no ImportMetaEnv typing.
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    viteEnv?.SANITY_STUDIO_PROJECT_ID!,
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    viteEnv?.SANITY_STUDIO_DATASET ??
    "production",
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
                        S.document().schemaType("footer").documentId("footer"),
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
                          .filter(
                            '_type == "knowledgePost" && category != "Newsletter"',
                          )
                          .defaultOrdering([
                            { field: "date", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("Newsletters")
                      .id("newsletters")
                      .child(
                        S.documentTypeList("knowledgePost")
                          .title("Newsletters")
                          .filter(
                            '_type == "knowledgePost" && category == "Newsletter"',
                          )
                          .initialValueTemplates([
                            S.initialValueTemplateItem(
                              "knowledgePost-newsletter",
                            ),
                          ])
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
    presentationTool({
      // Same origin as the embedded Studio; reuses the events draft-mode routes.
      previewUrl: {
        initial: "/events",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: presentationResolve,
    }),
    visionTool(),
  ],
  document: {
    // Events and Knowledge Hub posts get a Preview action (draft mode) next
    // to Publish.
    actions: (prev, context) =>
      context.schemaType in PREVIEW_PATHS ? [...prev, PreviewAction] : prev,
  },
  schema: {
    types: schemas,
    templates: (prev) => [
      ...prev,
      {
        id: "knowledgePost-newsletter",
        title: "Newsletter",
        schemaType: "knowledgePost",
        value: { category: "Newsletter" },
      },
    ],
  },
});
