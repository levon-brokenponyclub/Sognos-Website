/**
 * One-off seed: populates the Site Settings singleton with current code values.
 *
 * Usage: pnpm seed:site-settings
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces the singleton.
 */

import { randomUUID } from "crypto";
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

function getErrorStatus(error: unknown): number | undefined {
  return typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as { statusCode?: unknown }).statusCode === "number"
    ? (error as { statusCode: number }).statusCode
    : undefined;
}

// ─── Source values (mirror current code) ─────────────────────────────────────

const SITE_TITLE =
  "Sognos — Field Service Innovations with Microsoft Dynamics";

const META_DESCRIPTION =
  "Sognos combines care management and workforce scheduling on Microsoft Dynamics 365.";

const RESPONSE_TIME_HEADING = "Within 1 business day";

const RESPONSE_TIME_BODY =
  "Our team is based in Australia. We respond to all enquiries promptly during business hours.";

const OFFICES = [
  {
    region: "Australia",
    label: "Head Office",
    entity: "Sognos Solutions Pty Ltd",
    address: ["Level 17, 1 Denison Street", "North Sydney NSW 2060, Australia"],
    phone: "+61 2 8527 3608",
    email: "contact@sognos.com.au",
  },
  {
    region: "New Zealand",
    label: "Office",
    entity: "Sognos Solutions NZ Limited",
    address: [
      "Ground Level, 155 Fanshawe Street",
      "Auckland 1010, New Zealand",
    ],
    phone: "+64 9 802 0402",
    email: "contact@sognos.co.nz",
  },
  {
    region: "India",
    label: "Offshore Delivery Centre",
    entity: "Sognos Solutions India Limited",
    address: [
      "713, Silver Radiance, 2 Science City Rd",
      "Ahmedabad 380060, India",
    ],
    phone: "+91 93160 908408",
    email: "contact@sognos.in",
  },
];

const ABN = "53 611 121 870";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/sognos-solutions-pty-ltd";

// ─── Run ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`Seeding Site Settings to ${projectId}/${dataset}\n`);

  const offices = OFFICES.map((office) => ({
    _key: randomUUID().slice(0, 12),
    _type: "office",
    ...office,
  }));

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: SITE_TITLE,
    metaDescription: META_DESCRIPTION,
    responseTimeHeading: RESPONSE_TIME_HEADING,
    responseTimeBody: RESPONSE_TIME_BODY,
    offices,
    abn: ABN,
    linkedinUrl: LINKEDIN_URL,
  });

  console.log("Done. Site Settings singleton seeded.");
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
