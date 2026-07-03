/**
 * Refreshes the `body` field on the migrated Knowledge Hub posts in Sanity
 * using the full WordPress content extracted by `extract-post-bodies.py`.
 *
 * Handles inline images: any `_inlineImagePending` block in the JSON is
 * downloaded from the source URL, uploaded to Sanity as an image asset,
 * and replaced with a real `inlineImage` block in-position.
 *
 * Only patches `body` — leaves slug, title, category, hero, excerpt, etc.
 * untouched.
 *
 * Usage:
 *   python3 scripts/extract-post-bodies.py   # writes knowledge-post-bodies.json
 *   pnpm refresh:knowledge-posts             # patches Sanity
 */

import { readFileSync } from "fs";
import { basename } from "path";
import { join } from "path";
import { randomUUID } from "crypto";
import { execFileSync } from "child_process";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

// The old sognos.com.au site is behind Vercel BotID on the public edge, but
// the LiteSpeed origin at 192.250.232.12 serves the same paths without a
// challenge. We resolve directly to the origin and ignore the cert mismatch.
const ORIGIN_IP = "192.250.232.12";
const ORIGIN_HOSTS = new Set(["sognos.com.au", "www.sognos.com.au"]);

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

const BODIES_PATH = join(process.cwd(), "scripts", "knowledge-post-bodies.json");

type PortableBlock = Record<string, unknown> & {
  _type?: string;
  _key?: string;
  src?: string;
  alt?: string;
};

const shortKey = () => randomUUID().replace(/-/g, "").slice(0, 12);

const uploadCache = new Map<string, string>();

function fetchViaCurl(src: string): Buffer {
  const url = new URL(src);
  const args: string[] = [
    "-sS",
    "-L",
    "--fail",
    "-H",
    "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "-o",
    "-",
  ];
  if (ORIGIN_HOSTS.has(url.hostname)) {
    args.push("-k", "--resolve", `${url.hostname}:443:${ORIGIN_IP}`);
  }
  args.push(src);
  return execFileSync("curl", args, { maxBuffer: 32 * 1024 * 1024 });
}

async function uploadImageFromUrl(src: string): Promise<string> {
  const cached = uploadCache.get(src);
  if (cached) return cached;

  const buf = fetchViaCurl(src);
  const filename = decodeURIComponent(basename(new URL(src).pathname)) || "image";

  const asset = await client.assets.upload("image", buf, { filename });
  uploadCache.set(src, asset._id);
  return asset._id;
}

async function resolveInlineImages(body: PortableBlock[]): Promise<PortableBlock[]> {
  const out: PortableBlock[] = [];
  for (const block of body) {
    if (block._type === "_inlineImagePending" && typeof block.src === "string") {
      try {
        const assetId = await uploadImageFromUrl(block.src);
        out.push({
          _type: "inlineImage",
          _key: block._key ?? shortKey(),
          asset: { _type: "reference", _ref: assetId },
          alt: block.alt || "Sognos",
        });
      } catch (err) {
        console.warn(`\n    ⚠ image upload failed: ${block.src} — ${(err as Error).message}`);
        // Skip the image on failure — text-only body is better than a broken block.
      }
    } else {
      out.push(block);
    }
  }
  return out;
}

async function main() {
  const bodies = JSON.parse(readFileSync(BODIES_PATH, "utf8")) as Record<
    string,
    PortableBlock[]
  >;

  const slugs = Object.keys(bodies);
  console.log(
    `Refreshing body content for ${slugs.length} posts in ${projectId}/${dataset}\n`,
  );

  for (const slug of slugs) {
    const id = `kp-${slug}`;
    const rawBody = bodies[slug];
    const pendingImages = rawBody.filter((b) => b._type === "_inlineImagePending").length;

    process.stdout.write(
      `→ ${slug}  (${rawBody.length} blocks${pendingImages ? `, ${pendingImages} img` : ""})  `,
    );

    const existing = await client.getDocument(id);
    if (!existing) {
      console.log("SKIPPED — document not found");
      continue;
    }

    const body = await resolveInlineImages(rawBody);
    await client.patch(id).set({ body }).commit();
    console.log("✓");
  }

  console.log(`\nDone. ${slugs.length} posts refreshed. ${uploadCache.size} images uploaded.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
