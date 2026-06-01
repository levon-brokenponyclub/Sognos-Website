/**
 * One-off seed: populates the Footer singleton with current code values.
 *
 * Usage: pnpm seed:footer
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces the singleton.
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { DEFAULT_FOOTER_CONTENT } from "../lib/content/footer";

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

async function imageRef(publicPath: string) {
  const id = await uploadImage(publicPath);
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: id } };
}

async function run() {
  console.log(`Seeding Footer to ${projectId}/${dataset}\n`);

  const brandLogo = await imageRef(DEFAULT_FOOTER_CONTENT.brandLogo);

  const platformLogos = [];
  for (const logo of DEFAULT_FOOTER_CONTENT.platformLogos) {
    platformLogos.push({
      _key: randomUUID().slice(0, 12),
      _type: "platformLogo",
      alt: logo.alt,
      image: await imageRef(logo.src),
    });
  }

  const columns = DEFAULT_FOOTER_CONTENT.columns.map((c) => ({
    _key: randomUUID().slice(0, 12),
    _type: "column",
    title: c.title,
    links: c.links.map((l) => ({
      _key: randomUUID().slice(0, 12),
      _type: "link",
      label: l.label,
      href: l.href,
    })),
  }));

  const legalLinks = DEFAULT_FOOTER_CONTENT.legalLinks.map((l) => ({
    _key: randomUUID().slice(0, 12),
    _type: "link",
    label: l.label,
    href: l.href,
  }));

  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    brandLogo,
    tagline: DEFAULT_FOOTER_CONTENT.tagline,
    platformLogos,
    columns,
    acknowledgement: DEFAULT_FOOTER_CONTENT.acknowledgement,
    copyrightSuffix: DEFAULT_FOOTER_CONTENT.copyrightSuffix,
    legalLinks,
  });

  console.log("Done. Footer singleton seeded.");
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
