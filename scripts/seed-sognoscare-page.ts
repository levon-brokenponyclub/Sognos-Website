/**
 * One-off seed: populates the SognosCare Page singleton with current code values.
 *
 * Usage: pnpm seed:sognoscare-page
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces the singleton.
 * Note: `editions` and `featuredStories` reference arrays are left empty —
 * wire them up in the Studio (or via a follow-up edition seed).
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { DEFAULT_SOGNOSCARE_PAGE_CONTENT } from "../lib/content/sognoscarePage";

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

async function run() {
  console.log(`Seeding SognosCare Page to ${projectId}/${dataset}\n`);

  const content = DEFAULT_SOGNOSCARE_PAGE_CONTENT;

  const heroLogoAssetId = await uploadImage(content.hero.logoSrc);

  await client.createOrReplace({
    _id: "sognoscarePage",
    _type: "sognoscarePage",
    seo: content.seo,
    hero: {
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: heroLogoAssetId },
      },
      headline: content.hero.headline,
      subtext: content.hero.subtext,
    },
    productDrawer: content.productDrawer,
    subNav: content.subNav.map((s) => ({ _key: key(), _type: "object", ...s })),
    problemsHeader: content.problemsHeader,
    problems: content.problems.map((p) => ({
      _key: key(),
      _type: "object",
      ...p,
    })),
    featuresHeader: content.featuresHeader,
    features: content.features.map((f) => ({
      _key: key(),
      _type: "object",
      ...f,
    })),
    editionsHeader: content.editionsHeader,
    advantagesHeader: content.advantagesHeader,
    advantages: content.advantages,
    storiesHeader: content.storiesHeader,
    cta: content.cta,
  });

  console.log("Done. SognosCare Page singleton seeded.");
  console.log(
    "Note: link `editions` and (optionally) `featuredStories` references in the Studio.",
  );
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
