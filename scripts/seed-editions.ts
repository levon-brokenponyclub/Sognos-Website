/**
 * One-off seed: populates the 6 SognosCare Edition documents from
 * `lib/content/editions.ts`.
 *
 * Usage: pnpm seed:editions
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces each `edition.${slug}` document.
 *
 * Customer story references: each edition declares `customerStorySlugs` —
 * the script queries `customerStory` documents by slug and attaches refs.
 * If a slug can't be resolved, it is skipped (logged) so the edition can
 * still seed without manual fixes.
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import {
  DEFAULT_EDITIONS,
  type EditionContent,
} from "../lib/content/editions";

loadEnv({ path: ".env.local", quiet: true });
loadEnv({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID missing");
if (!token) throw new Error("SANITY_API_WRITE_TOKEN missing");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PUBLIC = join(process.cwd(), "public");

function getErrorStatus(error: unknown): number | undefined {
  return typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as { statusCode?: unknown }).statusCode === "number"
    ? (error as { statusCode: number }).statusCode
    : undefined;
}

// ─── Asset upload (in-memory cache by publicPath) ─────────────────────────────

const uploadedAssets = new Map<string, string>();

async function uploadImage(publicPath: string): Promise<string> {
  const cached = uploadedAssets.get(publicPath);
  if (cached) return cached;

  const absPath = join(PUBLIC, publicPath.replace(/^\//, ""));
  if (!existsSync(absPath)) throw new Error(`Image not found: ${absPath}`);

  const data = readFileSync(absPath);
  const asset = await client.assets.upload("image", data, {
    filename: basename(absPath),
  });
  uploadedAssets.set(publicPath, asset._id);
  console.log(`  uploaded image: ${publicPath} → ${asset._id}`);
  return asset._id;
}

const key = () => randomUUID().slice(0, 12);

// ─── Customer story resolution ────────────────────────────────────────────────

type CustomerStoryRow = { _id: string; slug: string };

async function loadCustomerStoryMap(): Promise<Map<string, string>> {
  const rows: CustomerStoryRow[] = await client.fetch(
    `*[_type == "customerStory" && defined(slug.current)]{ _id, "slug": slug.current }`,
  );
  const map = new Map<string, string>();
  for (const row of rows) map.set(row.slug, row._id);
  return map;
}

type ResolvedStories = {
  refs: Array<{ _key: string; _type: "reference"; _ref: string }>;
  resolved: string[];
  missing: string[];
};

function resolveCustomerStoryRefs(
  slugs: string[],
  storyMap: Map<string, string>,
): ResolvedStories {
  const refs: ResolvedStories["refs"] = [];
  const resolved: string[] = [];
  const missing: string[] = [];

  for (const slug of slugs) {
    const id = storyMap.get(slug);
    if (id) {
      refs.push({ _key: key(), _type: "reference", _ref: id });
      resolved.push(slug);
    } else {
      missing.push(slug);
    }
  }

  return { refs, resolved, missing };
}

// ─── Document builder ─────────────────────────────────────────────────────────

async function buildEditionDoc(
  edition: EditionContent,
  storyMap: Map<string, string>,
) {
  const [cardLogoAssetId, heroLogoAssetId, gradientAssetId] = await Promise.all(
    [
      uploadImage(edition.cardLogo),
      uploadImage(edition.heroLogoWhite),
      uploadImage(edition.gradient),
    ],
  );

  const stories = resolveCustomerStoryRefs(
    edition.customerStorySlugs,
    storyMap,
  );

  const doc = {
    _id: `edition.${edition.slug}`,
    _type: "edition",
    name: edition.name,
    slug: { _type: "slug" as const, current: edition.slug },
    order: edition.order,
    seo: edition.seo,

    cardLogo: {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: cardLogoAssetId },
    },
    cardTagline: edition.cardTagline,
    cardDescription: edition.cardDescription,

    accentHex: edition.accentHex,
    heroLogoWhite: {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: heroLogoAssetId },
    },
    gradient: {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: gradientAssetId },
    },
    heroTagline: edition.heroTagline,
    heroDescription: edition.heroDescription,

    problems: edition.problems.map((p) => ({
      _key: key(),
      _type: "object" as const,
      ...p,
    })),
    features: edition.features.map((f) => ({
      _key: key(),
      _type: "object" as const,
      ...f,
    })),
    advantages: edition.advantages,
    aiTools: edition.aiTools,
    proofQuotes: edition.proofQuotes.map((q) => ({
      _key: key(),
      _type: "object" as const,
      ...q,
    })),

    customerStories: stories.refs,
  };

  return { doc, stories };
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log(
    `Seeding ${DEFAULT_EDITIONS.length} editions to ${projectId}/${dataset}\n`,
  );

  console.log("Loading customer-story slug map…");
  const storyMap = await loadCustomerStoryMap();
  console.log(`  found ${storyMap.size} customerStory document(s)\n`);

  const seeded: string[] = [];
  const missingByEdition: Array<{ slug: string; missing: string[] }> = [];

  for (const edition of DEFAULT_EDITIONS) {
    console.log(`→ ${edition.slug}`);
    const { doc, stories } = await buildEditionDoc(edition, storyMap);

    if (stories.resolved.length) {
      console.log(
        `  resolved customerStory refs: ${stories.resolved.join(", ")}`,
      );
    }
    if (stories.missing.length) {
      console.log(
        `  ! unresolved customerStory slugs (skipped): ${stories.missing.join(
          ", ",
        )}`,
      );
      missingByEdition.push({
        slug: edition.slug,
        missing: stories.missing,
      });
    }
    if (
      !stories.resolved.length &&
      !stories.missing.length &&
      edition.customerStorySlugs.length === 0
    ) {
      console.log("  no customerStory refs declared — leaving empty");
    }

    await client.createOrReplace(doc);
    seeded.push(edition.slug);
    console.log(`  ✓ ${edition.slug}\n`);
  }

  console.log("─────────────────────────────────────────────");
  console.log(`Seeded ${seeded.length} edition(s):`);
  for (const slug of seeded) console.log(`  • ${slug}`);

  if (missingByEdition.length) {
    console.log("\nUnresolved customerStory references:");
    for (const entry of missingByEdition) {
      console.log(`  • ${entry.slug} → ${entry.missing.join(", ")}`);
    }
    console.log(
      "  Link these manually in the Studio, or run migrate:customer-stories first.",
    );
  } else {
    console.log("\nAll declared customerStory references resolved.");
  }
}

run().catch((error: unknown) => {
  const status = getErrorStatus(error);
  if (status === 403) {
    console.error(
      "Seed failed: SANITY_API_WRITE_TOKEN does not have create permissions for this dataset.",
    );
  } else {
    console.error(error);
  }
  process.exit(1);
});
