import { defineDocuments, defineLocations } from "sanity/presentation";

// Presentation tool — events and Knowledge Hub posts.
//   mainDocuments: browsing a detail page in the preview selects its document.
//   locations: an open document lists the pages it appears on.
export const presentationResolve = {
  mainDocuments: defineDocuments([
    {
      route: "/events/:slug",
      filter: `_type == "event" && slug.current == $slug`,
    },
    {
      route: "/knowledge-hub/:slug",
      filter: `_type == "knowledgePost" && slug.current == $slug`,
    },
  ]),
  locations: {
    knowledgePost: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc.title || "Untitled post",
                href: `/knowledge-hub/${doc.slug}`,
              },
              { title: "Knowledge Hub", href: "/knowledge-hub" },
            ]
          : [],
      }),
    }),
    event: defineLocations({
      select: { title: "title", heading: "hero.heading", slug: "slug.current" },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc.heading || doc.title || "Untitled event",
                href: `/events/${doc.slug}`,
              },
              { title: "Events & Webinars", href: "/events" },
              { title: "Knowledge Hub", href: "/knowledge-hub#events" },
            ]
          : [],
      }),
    }),
  },
};
