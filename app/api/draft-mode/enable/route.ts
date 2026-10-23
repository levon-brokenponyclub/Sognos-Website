import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity/client";

// Turns on Next.js draft mode after validating the short-lived secret the
// Studio's Preview action creates, then redirects to the requested page.
// Needs SANITY_API_READ_TOKEN (Viewer) to read the secret and drafts.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
