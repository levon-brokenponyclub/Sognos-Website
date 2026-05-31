/**
 * One-off seed: uploads the current client logos into the Logo Strip singleton.
 *
 * Usage: pnpm tsx scripts/seed-logo-strip.ts
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { DEFAULT_LOGOS } from "../lib/content/logoStrip";

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
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getErrorStatus(error: unknown): number | undefined {
  return typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as { statusCode?: unknown }).statusCode === "number"
    ? (error as { statusCode: number }).statusCode
    : undefined;
}

async function withRetry<T>(label: string, task: () => Promise<T>, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const status = getErrorStatus(error);
      if (attempt === attempts || (status && status < 500)) break;
      console.warn(`  retrying ${label} after ${status ?? "error"} (${attempt}/${attempts})`);
      await sleep(attempt * 1000);
    }
  }

  throw lastError;
}

const uploadedAssets = new Map<string, string>();

async function uploadImage(publicPath: string): Promise<string> {
  const cached = uploadedAssets.get(publicPath);
  if (cached) return cached;

  const absPath = join(PUBLIC, publicPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    throw new Error(`Image not found: ${absPath}`);
  }

  const data = readFileSync(absPath);
  const asset = await withRetry(`image upload ${publicPath}`, () =>
    client.assets.upload("image", data, { filename: basename(absPath) }),
  );
  uploadedAssets.set(publicPath, asset._id);
  console.log(`  uploaded image: ${publicPath} → ${asset._id}`);
  return asset._id;
}

async function run() {
  console.log(`Seeding Logo Strip to ${projectId}/${dataset}\n`);

  const logos: Array<{
    _key: string;
    alt: string;
    image: {
      _type: "image";
      asset: { _type: "reference"; _ref: string };
    };
  }> = [];
  for (const logo of DEFAULT_LOGOS) {
    const assetId = await uploadImage(logo.src);
    logos.push({
      _key: randomUUID().slice(0, 12),
      alt: logo.alt,
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
  }

  await withRetry("logo strip document", () =>
    client.createOrReplace({
      _id: "logoStrip",
      _type: "logoStrip",
      logos,
    }),
  );

  console.log(`Done. Seeded ${logos.length} logos.`);
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
