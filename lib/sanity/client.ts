import { createClient } from "next-sanity";
import type { FilteredResponseQueryOptions } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Whether a Sanity project is configured via env vars. When false (e.g. local
 * builds or CI without secrets) the client short-circuits every fetch to
 * `null` so pages fall back to their bundled default content instead of
 * crashing the build.
 */
export const isSanityConfigured = Boolean(projectId);

const baseClient = createClient({
  // `createClient` throws on a missing/invalid projectId, so fall back to a
  // syntactically-valid placeholder when unconfigured. It is never used to
  // make a request because `isSanityConfigured` gates every fetch below.
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export const client = baseClient;

// Keys used for logic, dates, URLs or icon lookups — never stega-encoded.
const STEGA_SKIP_KEYS = new Set([
  "slug",
  "mode",
  "format",
  "timezone",
  "date",
  "endDate",
  "registerUrl",
  "mapsEmbedUrl",
  "mapsDirectionsUrl",
  "recordingSlug",
  "heroImage",
  "logo",
  "headshot",
  "icon",
  "time",
  // Knowledge Hub posts: category is compared against "Newsletter"; the rest
  // are URLs or raw HTML.
  "category",
  "newsletterHtml",
  "href",
  "link",
]);

/**
 * Draft-mode client: reads drafts with the server-only Viewer token. Only used
 * when Next.js draft mode is on (Studio → Preview). Never cached.
 */
export const previewClient = baseClient.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "drafts",
  useCdn: false,
  // Invisible field references for Presentation's click-to-edit overlays.
  // Fields the code reads as values (not displayed text) stay clean.
  stega: {
    enabled: true,
    studioUrl: "/studio",
    filter: (props) => {
      const key = props.sourcePath.at(-1);
      if (typeof key === "string" && STEGA_SKIP_KEYS.has(key)) return false;
      return props.filterDefault(props);
    },
  },
});

const shouldLogSanityIssues = process.env.NODE_ENV !== "production";

/**
 * Safe wrapper around `client.fetch`. Returns `null` when Sanity is not
 * configured or the request fails, letting callers fall back to defaults.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, unknown> = {},
  options?: FilteredResponseQueryOptions,
): Promise<T | null> {
  if (!isSanityConfigured) {
    if (shouldLogSanityIssues) {
      console.warn(
        "[sanityFetch] Sanity is not configured. NEXT_PUBLIC_SANITY_PROJECT_ID is missing or .env.local could not be loaded.",
      );
    }
    return null;
  }
  try {
    return await baseClient.fetch<T>(query, params, options);
  } catch (error) {
    if (shouldLogSanityIssues) {
      console.error("[sanityFetch] Request failed", {
        query,
        params,
        error,
      });
    }
    return null;
  }
}
