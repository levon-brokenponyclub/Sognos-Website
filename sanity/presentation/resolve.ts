import { defineDocuments, defineLocations } from "sanity/presentation";

// Presentation tool — events only for now.
//   mainDocuments: browsing /events/<slug> in the preview selects that event.
//   locations: an open event lists the pages it appears on.
export const presentationResolve = {
  mainDocuments: defineDocuments([
    {
      route: "/events/:slug",
      filter: `_type == "event" && slug.current == $slug`,
    },
  ]),
  locations: {
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
