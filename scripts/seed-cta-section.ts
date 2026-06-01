/**
 * One-off seed: populates the CTA Section singleton with current code values.
 *
 * Usage: pnpm seed:cta-section
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces the singleton.
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { DEFAULT_CTA_CONTENT } from "../lib/content/ctaSection";

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

async function run() {
  console.log(`Seeding CTA Section to ${projectId}/${dataset}\n`);

  const logos: Array<{
    _key: string;
    _type: "logo";
    alt: string;
    image: { _type: "image"; asset: { _type: "reference"; _ref: string } };
  }> = [];
  for (const logo of DEFAULT_CTA_CONTENT.logos) {
    const assetId = await uploadImage(logo.src);
    logos.push({
      _key: randomUUID().slice(0, 12),
      _type: "logo",
      alt: logo.alt,
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
  }

  const stats = DEFAULT_CTA_CONTENT.stats.map((stat) => ({
    _key: randomUUID().slice(0, 12),
    _type: "stat",
    ...stat,
  }));

  await client.createOrReplace({
    _id: "ctaSection",
    _type: "ctaSection",
    bookDemoHeading: DEFAULT_CTA_CONTENT.bookDemoHeading,
    bookDemoDescription: DEFAULT_CTA_CONTENT.bookDemoDescription,
    logoBlockHeading: DEFAULT_CTA_CONTENT.logoBlockHeading,
    logos,
    stats,
  });

  console.log("Done. CTA Section singleton seeded.");
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
