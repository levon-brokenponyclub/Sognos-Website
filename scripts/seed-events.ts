/**
 * One-off seed: creates the NFP Real Care event document in Sanity.
 *
 * Listing-level only. The event page at /events/nfp-real-care stays hand-built —
 * its agenda, speakers and icon-driven bullets are not migrated here. This
 * exists so the event can be listed and featured from the CMS.
 *
 * Idempotent: uses createOrReplace against a fixed _id, so re-running updates
 * the same document rather than creating duplicates.
 *
 * Usage: pnpm tsx scripts/seed-events.ts
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

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

async function uploadImage(publicPath: string): Promise<string> {
  const absPath = join(PUBLIC, publicPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    throw new Error(`Image not found: ${absPath}`);
  }
  const asset = await client.assets.upload("image", readFileSync(absPath), {
    filename: basename(absPath),
  });
  console.log(`  uploaded image: ${publicPath} → ${asset._id}`);
  return asset._id;
}

// Mirrors the hand-built page's metadata and lib/upcomingEvent.ts.
const NFP_REAL_CARE = {
  _id: "event-nfp-real-care",
  slug: "nfp-real-care",
  title: "Designing Services Around Real Lives, Not System Boundaries",
  excerpt:
    "A breakfast event for NFP leaders in health, social and community care. Thursday 17 September, Microsoft, North Sydney. Places limited to 35 attendees.",
  // 8.30am start, Sydney is UTC+10 in September.
  date: "2026-09-17T08:30:00+10:00",
  location: "Microsoft, North Sydney",
  meta: "Thu 17 Sep • North Sydney",
  heroImage: "/images/events/nfp-real-care/MSFT-header-img.png",
};

async function run() {
  console.log(`Seeding events to ${projectId}/${dataset}\n`);

  const assetId = await uploadImage(NFP_REAL_CARE.heroImage);

  const doc = {
    _id: NFP_REAL_CARE._id,
    _type: "event",
    title: NFP_REAL_CARE.title,
    slug: { _type: "slug", current: NFP_REAL_CARE.slug },
    excerpt: NFP_REAL_CARE.excerpt,
    date: NFP_REAL_CARE.date,
    location: NFP_REAL_CARE.location,
    meta: NFP_REAL_CARE.meta,
    registrationOpen: true,
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
  };

  await client.createOrReplace(doc);
  console.log(`\n✓ ${NFP_REAL_CARE._id} — ${NFP_REAL_CARE.title}`);
  console.log("Done.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
