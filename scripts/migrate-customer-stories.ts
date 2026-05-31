/**
 * One-off migration: seeds the 8 hardcoded customer stories into Sanity.
 *
 * Usage: pnpm tsx scripts/migrate-customer-stories.ts
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces docs by deterministic _id.
 */

import { readFileSync, existsSync } from "fs";
import { basename, join } from "path";
import { createClient } from "@sanity/client";
import type { IdentifiedSanityDocumentStub } from "@sanity/client";
import { randomUUID } from "crypto";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local", quiet: true });
loadEnv({ quiet: true });

// ─── Config ──────────────────────────────────────────────────────────────────

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

async function withRetry<T>(
  label: string,
  task: () => Promise<T>,
  attempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const status = getErrorStatus(error);
      if (attempt === attempts || (status && status < 500)) break;
      const delay = attempt * 1000;
      console.warn(`  retrying ${label} after ${status ?? "error"} (${attempt}/${attempts})`);
      await sleep(delay);
    }
  }

  throw lastError;
}

// ─── Body item types ─────────────────────────────────────────────────────────

type BodyItem =
  | { type: "p"; text: string; emRanges?: [string, string][] }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; file: string; alt: string };

type StoryInput = {
  slug: string;
  order: number;
  company: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  heroImage: string;
  companyLogo?: string;
  productLogo?: string;
  quote?: string;
  quoteAuthor?: string;
  sidebar: { label: string; value: string }[];
  downloadFile?: string;
  body: BodyItem[];
};

type SanityReference = {
  _type: "reference";
  _ref: string;
};

type SanityImageValue = {
  _type: "image";
  asset: SanityReference;
};

type SanityFileValue = {
  _type: "file";
  asset: SanityReference;
};

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: [];
  children: PortableTextSpan[];
  listItem?: "bullet";
  level?: 1;
};

type InlineImageBlock = {
  _type: "inlineImage";
  _key: string;
  asset: SanityReference;
  alt: string;
};

type CustomerStoryBodyBlock = PortableTextBlock | InlineImageBlock;

// ─── Image upload (dedup by SHA via Sanity) ──────────────────────────────────

const uploadedAssets = new Map<string, string>();

async function uploadImage(publicPath: string): Promise<string> {
  if (uploadedAssets.has(publicPath)) return uploadedAssets.get(publicPath)!;

  const absPath = join(PUBLIC, publicPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    throw new Error(`Image not found: ${absPath}`);
  }

  const data = readFileSync(absPath);
  const filename = basename(absPath);
  const asset = await withRetry(`image upload ${publicPath}`, () =>
    client.assets.upload("image", data, { filename }),
  );
  uploadedAssets.set(publicPath, asset._id);
  console.log(`  uploaded image: ${publicPath} → ${asset._id}`);
  return asset._id;
}

async function uploadFile(publicPath: string): Promise<string> {
  if (uploadedAssets.has(publicPath)) return uploadedAssets.get(publicPath)!;

  const absPath = join(PUBLIC, publicPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }

  const data = readFileSync(absPath);
  const filename = basename(absPath);
  const asset = await withRetry(`file upload ${publicPath}`, () =>
    client.assets.upload("file", data, { filename }),
  );
  uploadedAssets.set(publicPath, asset._id);
  console.log(`  uploaded file: ${publicPath} → ${asset._id}`);
  return asset._id;
}

// ─── Portable Text builders ──────────────────────────────────────────────────

function block(
  style: "normal" | "h2",
  children: PortableTextSpan[],
  listItem?: "bullet",
): PortableTextBlock {
  return {
    _type: "block",
    _key: randomUUID().slice(0, 12),
    style,
    markDefs: [],
    children,
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

function span(text: string, marks: string[] = []): PortableTextSpan {
  return {
    _type: "span",
    _key: randomUUID().slice(0, 12),
    text,
    marks,
  };
}

function paragraph(text: string, emRanges?: [string, string][]) {
  if (!emRanges || emRanges.length === 0) {
    return block("normal", [span(text)]);
  }
  // Split text into runs around em ranges
  const children: PortableTextSpan[] = [];
  let cursor = 0;
  for (const [start, end] of emRanges) {
    const startIdx = text.indexOf(start, cursor);
    if (startIdx < 0) {
      children.push(span(text.slice(cursor)));
      cursor = text.length;
      break;
    }
    if (startIdx > cursor) children.push(span(text.slice(cursor, startIdx)));
    const endIdx =
      start === end ? startIdx : text.indexOf(end, startIdx + start.length);
    if (endIdx < 0) throw new Error(`Unclosed em range: ${start} -> ${end}`);
    children.push(span(text.slice(startIdx, endIdx + end.length), ["em"]));
    cursor = endIdx + end.length;
  }
  if (cursor < text.length) children.push(span(text.slice(cursor)));
  return block("normal", children);
}

async function imageBlock(
  file: string,
  alt: string,
): Promise<InlineImageBlock> {
  const assetId = await uploadImage(file);
  return {
    _type: "inlineImage",
    _key: randomUUID().slice(0, 12),
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

async function buildBody(
  items: BodyItem[],
): Promise<CustomerStoryBodyBlock[]> {
  const out: CustomerStoryBodyBlock[] = [];
  for (const item of items) {
    if (item.type === "p") {
      out.push(paragraph(item.text, item.emRanges));
    } else if (item.type === "h2") {
      out.push(block("h2", [span(item.text)]));
    } else if (item.type === "ul") {
      for (const li of item.items) {
        out.push(block("normal", [span(li)], "bullet"));
      }
    } else if (item.type === "img") {
      out.push(await imageBlock(item.file, item.alt));
    }
  }
  return out;
}

// ─── Story data ──────────────────────────────────────────────────────────────

const STORIES: StoryInput[] = [
  {
    slug: "flourish-australia",
    order: 1,
    company: "Flourish Australia",
    title:
      "Flourish Australia: Transforming Service Operations with Microsoft Dynamics 365",
    description:
      "Leading not-for-profit organisation supporting people with lived experience of mental health issues to live fulfilling, independent lives.",
    date: "2024-08-13",
    readTime: "5 min read",
    heroImage: "/images/customers/flourish-australia.avif",
    companyLogo: "/logos/flourish-australia-logo.png",
    productLogo: "/logos/sognos-care-logo.svg",
    quote:
      "Congratulations and WELL DONE to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    quoteAuthor: "Susan McCarthy, Chief Operating Officer - Flourish Australia",
    sidebar: [
      { label: "Industry", value: "Healthcare - Mental Health" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "1,100+ staff" },
      { label: "Product", value: "SognosCare" },
    ],
    downloadFile: "/customer-stories/Sognos_Flourish_Customer-Story.pdf",
    body: [
      {
        type: "p",
        text: "Flourish Australia is a leading not-for-profit organisation supporting people with lived experience of mental health issues to live fulfilling, independent lives. With more than 1,100 staff across Australia, Flourish delivers a wide range of community-based services, employment support, and recovery-focused programs.",
      },
      {
        type: "img",
        file: "/images/customers/flourish-australia-1.avif",
        alt: "Flourish Australia team",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "p",
        text: "Flourish Australia's legacy Client Information Management System (CIMS) had reached end of life and was no longer meeting the organisation's needs. The team was dealing with significant administrative overhead caused by double handling of data and manual processes. Non-standard processes and poor data quality were impacting funder reporting and participant support, while multiple siloed systems were managing critical operational and service-delivery functions with no unified view.",
      },
      {
        type: "img",
        file: "/images/customers/flourish-australia-2.avif",
        alt: "Flourish Australia operations",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "Flourish Australia partnered with Sognos to design and implement a modern, cloud-based solution built on Microsoft Dynamics 365 and Power Platform. The new system - known internally as Flourish Connect - serves as the central operational platform for the organisation, consolidating multiple business functions into a single source of truth.",
        emRanges: [["Flourish Connect", "Flourish Connect"]],
      },
      {
        type: "p",
        text: "Flourish Connect manages everything from support operations and stakeholder engagement to participant self-service, marketing, and feedback management - delivering seamless visibility tailored to each user's role and context.",
      },
      { type: "p", text: "Key capabilities delivered include:" },
      {
        type: "ul",
        items: [
          "Configurable modules for Enquiry, Intake, Support Delivery, Billing, and Claiming - integrated with the NDIS PRODA Portal",
          "Custom Program Profiles and Assessment Tools to support program flexibility and future growth",
          "Advanced reporting using SSRS and Power BI for accurate funder and stakeholder insights",
          "Seamless integration with T1-HR, T1-Finance, Emplive Payroll, and Rostering systems",
          "Stakeholder and Participant Insights dashboards for Sales and Continuous Improvement teams",
        ],
      },
      {
        type: "img",
        file: "/images/customers/flourish-australia-3.avif",
        alt: "Flourish Australia platform",
      },
      { type: "h2", text: "The Impact" },
      {
        type: "p",
        text: "The implementation has delivered measurable improvements across the organisation:",
      },
      {
        type: "ul",
        items: [
          "Supporting over 1,100 users across the Flourish Australia network",
          "A single source of truth for all operational and reporting needs, eliminating the data silos that previously hampered decision-making",
          "Significant reduction in redundant manual steps, improving team productivity and freeing time for direct participant support",
          "High configurability that allows Flourish to adapt and extend the solution as organisational needs evolve",
        ],
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "p",
        text: "With Dynamics 365 and Power Platform at its core, Flourish Australia now has a unified digital foundation to support innovation, continuous improvement, and sustainable growth - ensuring technology keeps pace with its mission to support mental health recovery across Australia.",
      },
    ],
  },
  {
    slug: "auckland-airport",
    order: 2,
    company: "Auckland Airport",
    title:
      "Auckland Airport: Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform",
    description:
      "New Zealand's largest and busiest airport, serving as a critical gateway for international and domestic travel and freight.",
    date: "2024-06-10",
    readTime: "4 min read",
    heroImage: "/images/customers/auckland-airport.webp",
    companyLogo: "/logos/auckland-airport-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "Thank you to the Sognos team - hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    quoteAuthor: "Anthony Hart, Operations Delivery Lead - Auckland Airport",
    sidebar: [
      { label: "Industry", value: "Transport" },
      { label: "State", value: "Auckland, New Zealand" },
      { label: "Size", value: "350+ staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "Auckland Airport is New Zealand's largest and busiest airport, serving as a critical gateway for international and domestic travel and freight. As a key piece of national infrastructure, the airport is committed to innovation and operational excellence to meet the evolving needs of passengers, airlines, and stakeholders.",
      },
      {
        type: "p",
        text: "Following a successful Dynamics 365 implementation, Auckland Airport engaged Sognos as their strategic Microsoft Dynamics 365 partner to drive continuous improvement and progressively expand platform capabilities across Dynamics 365 and Power Platform - replacing legacy applications with modern, cloud-based tools.",
      },
      {
        type: "img",
        file: "/images/customers/auckland-airport-1.webp",
        alt: "Auckland Airport",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "System reaching end of life with a tight delivery timeline",
          "Central system for Operations and Engineering Services to manage faults across all engineering assets",
          "Manual rules and processes for managing and scheduling faults - from inception through cost recovery and regulatory reporting",
          "Legacy system siloed from GIS, EAM, Incident Management, Risk Management, Finance, and Emergency Management systems",
        ],
      },
      {
        type: "img",
        file: "/images/customers/auckland-airport-2.webp",
        alt: "Auckland Airport operations",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "Custom-built scheduling workflow to automatically assign jobs for asset fault management and maintenance based on fault type, priority, and technician capabilities and skillsets",
          "End-to-end Fault Management solution built on Dynamics 365 Field Service - managing faults from logging, diagnosis, auto-routing, scheduling, and mobile capture through to cost recovery and regulatory reporting",
          "Integrated with JDE CAM, IMPAC Risk Management, Incident Management, ArcGIS, and Emergency Management systems",
        ],
      },
      {
        type: "img",
        file: "/images/customers/auckland-airport-3.webp",
        alt: "Auckland Airport field service",
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "System delivered within timeline and budget",
          "100% business and end-user adoption of the newly implemented system",
          "The entire Operations and Engineering Services team now uses the platform to manage all engineering assets across Airside and Landside",
          "End-to-end integrated system eliminating silos across six previously disconnected platforms",
          "Continuous Improvement mode established - with ongoing investment in new features and capability expansion",
        ],
      },
    ],
  },
  {
    slug: "penrith-city-council",
    order: 3,
    company: "Penrith City Council",
    title:
      "Penrith City Council: Transforming Field Operations with a Custom Dynamics 365 Solution",
    description:
      "Local government council in New South Wales, Australia, transforming field operations management with a custom Dynamics 365 solution.",
    date: "2024-03-20",
    readTime: "3 min read",
    heroImage: "/images/customers/penrith-city-council.png",
    companyLogo: "/logos/penrith-city-council-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    quoteAuthor:
      "Claire Donovan, Service Delivery Manager - Penrith City Council",
    sidebar: [
      { label: "Industry", value: "City Council - Public Sector" },
      { label: "State", value: "New South Wales, Australia" },
      { label: "Size", value: "300 Technicians" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "Deloitte Digital subcontracted Sognos to deliver a fully custom solution for Penrith City Council, enabling their Field Operations team to manage day-to-day Resource Crew movements - a task that had previously consumed significant coordinator time with no guarantee of data accuracy.",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "Entirely manual process to move team members between crews - coordinators previously refused to use the Field Service solution due to excessive manual overhead",
          "Each movement required manually creating and cancelling jobs, taking at least 25 minutes per movement with no accuracy guarantee",
          "No reliable tracking of movements, jobs, or timesheets",
          "End-to-end chaos between field technicians, coordinators, and the back-office team",
        ],
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "Custom workflows to automatically manage jobs when team members move across different crews",
          "A custom 3-click interface for coordinators to record movements - a task that previously took 25+ minutes now completed in under 10 seconds",
          "Custom Day Sheet Report providing coordinators with full visibility of day-to-day operations",
        ],
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "Coordinators who had previously refused the solution now actively use it",
          "Accurate timesheets and time entries generated automatically through workflow automation",
          "Drastic increase in coordinator productivity - all manual operations eliminated",
        ],
      },
    ],
  },
  {
    slug: "gentari",
    order: 4,
    company: "Gentari Solar Australia",
    title:
      "Gentari Solar Australia: End-to-End Asset Management with Microsoft Dynamics 365 Field Service",
    description:
      "Clean energy leader accelerating the transition to net zero, managing large-scale solar farms and over 10,000 individual assets across Australia.",
    date: "2024-11-05",
    readTime: "4 min read",
    heroImage: "/images/customers/gentari.webp",
    companyLogo: "/logos/gentari-logo-rect.webp",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "Dynamics 365 Field Service has not disappointed us in any of our key requirements. It has been over a year for us to use the system and the techs love it, and so do we.",
    quoteAuthor: "Operations Team - Gentari Solar Australia",
    sidebar: [
      { label: "Industry", value: "Renewable Energy" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "30–50 staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "Gentari Solar Australia, formerly known as Wirsol Energy, is a clean energy leader focused on accelerating the transition to net zero. Across Australia, Gentari owns and operates large-scale solar farms, managing over 10,000 individual assets spread across multiple sites. With a mix of in-house technicians and subcontractor teams, Gentari required a modern platform to track preventive maintenance, streamline workflows, and provide real-time field visibility.",
      },
      {
        type: "img",
        file: "/images/customers/gentari-1.webp",
        alt: "Gentari solar farm",
      },
      { type: "h2", text: "The Challenge" },
      {
        type: "ul",
        items: [
          "Full asset history visibility needed for each component",
          "Automated maintenance scheduling required to reduce manual admin",
          "Mobile-friendly tools needed for technicians across remote sites",
          "A single platform required to replace manual processes and disconnected systems",
        ],
      },
      {
        type: "img",
        file: "/images/customers/gentari-2.webp",
        alt: "Gentari field operations",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "Partnering with Sognos, Gentari implemented Microsoft Dynamics 365 Field Service - delivering a connected, end-to-end platform that:",
      },
      {
        type: "ul",
        items: [
          "Centralises asset records and service histories",
          "Automates preventive maintenance routines",
          "Enables real-time data capture via mobile devices",
          "Improves scheduling efficiency and operational oversight",
        ],
      },
      {
        type: "img",
        file: "/images/customers/gentari-3.webp",
        alt: "Gentari asset management",
      },
      { type: "h2", text: "The Results" },
      {
        type: "ul",
        items: [
          "Improved efficiency through automation of routine maintenance tasks",
          "Higher technician satisfaction, with easy-to-use mobile tools in the field",
          "Complete operational visibility from asset record to service history",
          "Better decision-making with data captured in real time",
        ],
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "p",
        text: "With Sognos as their strategic technology partner, Gentari continues to expand the capabilities of their Dynamics 365 platform - replacing legacy systems, improving workflows, and unlocking new opportunities for innovation in renewable energy operations.",
      },
    ],
  },
  {
    slug: "all-purpose-pumps",
    order: 5,
    company: "All Purpose Pumps",
    title:
      "All Purpose Pumps: From System Repair to Strategic Technology Partnership",
    description:
      "Leading Australian provider of water and wastewater pumping solutions, offering design, manufacturing, installation, and servicing for commercial, industrial, and residential applications.",
    date: "2024-05-15",
    readTime: "4 min read",
    heroImage: "/images/customers/all-purpose-pumps.webp",
    companyLogo: "/logos/all-purpose-pumps-logo.webp",
    productLogo: "/logos/sognos-roster-logo.svg",
    sidebar: [
      { label: "Industry", value: "Pumping Solutions - Install & Maintain" },
      { label: "State", value: "Victoria, Australia" },
      { label: "Size", value: "100–150 staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "All Purpose Pumps (APP) is a leading Australian provider of water and wastewater pumping solutions, offering design, manufacturing, installation, and servicing for commercial, industrial, and residential applications. With a strong focus on quality, reliability, and innovation, APP supports customers nationwide with end-to-end pumping solutions.",
      },
      {
        type: "img",
        file: "/images/customers/all-purpose-pumps-1.webp",
        alt: "All Purpose Pumps",
      },
      {
        type: "h2",
        text: "From System Repair to Strategic Technology Partnership",
      },
      {
        type: "p",
        text: "Sognos first partnered with All Purpose Pumps to repair and stabilise their heavily customised Dynamics 365 CRM system, which had become difficult to manage and upgrade. When the time came to transition to the new Unified Interface as part of the 2020 Wave 1 upgrade, the extent of the existing customisations made a direct upgrade risky. Sognos worked closely with APP to deliver a safe, strategic migration path - ensuring minimal disruption and maximum platform stability.",
      },
      {
        type: "p",
        text: "Building on this success, Sognos then implemented Dynamics 365 Field Service, integrated with APP's Sales CRM, to manage day-to-day service and installation operations. This transformation provided APP with complete end-to-end visibility of customers, prospects, and operational activities.",
      },
      {
        type: "p",
        text: "Today, APP's team is able to proactively manage every aspect of customer engagement - from initial sales interactions to post-installation service - with confidence and efficiency.",
      },
      {
        type: "img",
        file: "/images/customers/all-purpose-pumps-2.webp",
        alt: "All Purpose Pumps operations",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "Discrete systems with no unified view",
          "Manual and inconsistent processes to create quotes",
          "Agreements being managed in Excel files",
          "Running behind schedule for PM jobs",
          "Quote to Work Order process was not in one system, adding delays, inconsistencies, and inefficiency",
        ],
      },
      {
        type: "img",
        file: "/images/customers/all-purpose-pumps-3.webp",
        alt: "All Purpose Pumps field service",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "Dynamics 365 Field Service deployed on top of their existing Dynamics 365 for Sales solution",
          "Integration with the back-end inventory system to give dispatchers visibility of van stock and main warehouses",
          "APP is also in the process of replacing their current ERP with Business Central, with Sognos's support",
        ],
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "Single source of truth for information",
          "Ability to execute end-to-end service process in one system",
          "Better customer experience",
          "Agreements helped schedulers to efficiently manage agreements once set up",
          "Integration with backend system gave right visibility to each department",
          "Visibility of inventory for technicians and dispatchers",
        ],
      },
    ],
  },
  {
    slug: "asset-security-concepts",
    order: 6,
    company: "Asset Security Concepts",
    title:
      "Asset Security Concepts: A Unified Platform for Growth with Dynamics 365 and Business Central",
    description:
      "National provider of advanced security solutions across Australia, part of the global SECOM Group.",
    date: "2024-04-22",
    readTime: "4 min read",
    heroImage: "/images/customers/asc.webp",
    companyLogo: "/logos/asc-logo.webp",
    productLogo: "/logos/sognos-roster-logo.svg",
    sidebar: [
      { label: "Industry", value: "Intelligent Security Solutions" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "50–70 staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "Asset Security Concepts (ASC), a member of the global SECOM Group, is a national provider of advanced security solutions across Australia. As their operations expanded rapidly, ASC faced growing complexity across key business functions. With accounting, inventory, and scheduling all managed through disconnected systems - ranging from Excel spreadsheets to physical whiteboards - they needed a centralised, scalable solution to streamline operations and support their nationwide growth.",
      },
      {
        type: "img",
        file: "/images/customers/asc-1.webp",
        alt: "Asset Security Concepts",
      },
      { type: "h2", text: "A Unified Platform for Growth" },
      {
        type: "p",
        text: "ASC partnered with Sognos to implement Microsoft Dynamics 365 Field Service and Business Central, delivering a seamless, end-to-end platform to unify their core business processes. The solution provided a single source of truth, eliminating manual inefficiencies, reducing duplication, and ensuring consistency across finance, inventory, field service scheduling, and operations.",
      },
      {
        type: "p",
        text: "Now over two years into their Dynamics journey, ASC continues to evolve with confidence. The integrated solution has empowered users at every level to operate efficiently and accurately, with built-in controls and workflows that “just work”.",
      },
      {
        type: "img",
        file: "/images/customers/asc-2.webp",
        alt: "ASC security operations",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "Broken systems for ERP and Field Service Management",
          "Inability to push jobs to technicians",
          "Massive issues with visibility leading to delays, misleading data, inconsistencies, and inefficiency",
          "Used whiteboards to schedule jobs",
          "Job costing and accounting was a major issue due to various discrete systems",
        ],
      },
      {
        type: "img",
        file: "/images/customers/asc-3.webp",
        alt: "ASC field technician",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "An end-to-end solution of Dynamics 365 Field Service integrated with Dynamics 365 Business Central",
          "A single database underneath ERP and Field Service Management to provide complete visibility in real time",
        ],
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "Visibility for management, customers, employees, and technicians",
          "Streamlined processes",
          "Advanced reporting and analytics",
          "Increased productivity due to automated smart processes",
          "Nearly zero paper-based work",
          "Job profitability visibility with the detailed Job Costing Module",
        ],
      },
    ],
  },
  {
    slug: "neca",
    order: 7,
    company: "NECA",
    title:
      "NECA: Transforming Operations with Microsoft Dynamics 365 and Power Platform",
    description:
      "Australia's peak industry body representing over 6,000 electrical and communications contracting businesses.",
    date: "2024-02-10",
    readTime: "4 min read",
    heroImage: "/images/customers/neca.webp",
    companyLogo: "/logos/neca-logo.webp",
    sidebar: [
      { label: "Industry", value: "Not for Profit" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "300+ staff" },
      {
        label: "Products",
        value: "Dynamics 365 Sales, Dynamics NAV, Self Service Portal",
      },
    ],
    body: [
      {
        type: "p",
        text: "The National Electrical and Communications Association (NECA) is Australia's peak industry body representing the interests of over 6,000 electrical and communications contracting businesses. NECA provides a broad range of essential services to its members, including Industrial Relations, Workplace Health & Safety, Technical Knowledge Base support, Registered Training Organisation training, and apprentice training through its Group Training Organisations.",
      },
      {
        type: "img",
        file: "/images/customers/neca-1.webp",
        alt: "NECA",
      },
      {
        type: "h2",
        text: "Transforming Operations with Microsoft Dynamics 365",
      },
      {
        type: "p",
        text: "NECA engaged Sognos to enhance operational efficiency and member service delivery through a strategic implementation of Microsoft Dynamics 365 and the Power Platform. The successful deployment has given NECA confidence in their long-term investment in the Microsoft ecosystem.",
      },
      {
        type: "p",
        text: "Sognos is now NECA's strategic partner for Dynamics 365, supporting continuous improvement and helping NECA expand its digital footprint by modernising and integrating key business processes.",
      },
      {
        type: "img",
        file: "/images/customers/neca-2.webp",
        alt: "NECA operations",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "Multiple legacy systems",
          "Disjointed systems leading to multiple sources of truth",
          "Increasing member base with limited staff leading to growing member frustrations due to ever-growing turnaround time",
          "Manual payment systems - no online payments for offered services",
        ],
      },
      {
        type: "img",
        file: "/images/customers/neca-3.webp",
        alt: "NECA team",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "Fully integrated end-to-end system with Dynamics 365 Sales at the centre, supported by Dynamics NAV and a client Self Service Portal",
          "Single sign-on for all employees",
          "Online payment integrated in the Client Self Service Portals",
          "Ad hoc and predefined reports for general users, managers, and executives",
        ],
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "Single source of truth",
          "Client Self Service Portal decreasing redundant activities across disjointed systems",
          "Better employee productivity",
          "Increased visibility of business and employees for management",
          "Faster reconciliation in NAV due to integrated CRM and online payment system",
        ],
      },
    ],
  },
  {
    slug: "natural-power-solutions",
    order: 8,
    company: "Natural Power Solutions",
    title:
      "Natural Power Solutions: End-to-End Digital Transformation with Dynamics 365",
    description:
      "Premier provider for designing, building, and construction of customised, bespoke power protection solutions in Australia and New Zealand.",
    date: "2024-01-18",
    readTime: "4 min read",
    heroImage: "/images/customers/nps.webp",
    companyLogo: "/logos/nps-logo.webp",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "The experience of working with Sognos has been very positive. Their skills, their knowledge, their capabilities and their ability to translate our needs, our requirements into a technical solution has been second to nobody else.",
    quoteAuthor: "Daniel Sargent, Head of Sales - Natural Power Solutions",
    sidebar: [
      { label: "Industry", value: "Power & Lighting Protection" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "30–50 staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: [
      {
        type: "p",
        text: "Natural Power Solutions (NPS) is a premier provider for designing, building, and construction of customised, bespoke power protection solutions in Australia and New Zealand.",
      },
      { type: "h2", text: "The Situation" },
      {
        type: "ul",
        items: [
          "Over 5,000 PM contracts being managed via Excel",
          "Failure to adhere to promised dates",
          "No visibility of Work Order statuses",
          "Assets managed via MS Excel, no visibility of service history",
        ],
      },
      { type: "h2", text: "The Solution" },
      {
        type: "ul",
        items: [
          "Deliver an end-to-end digital solution that streamlined business processes from lead generation through to invoicing",
          "Provide a 360-degree view of each customer to support a premium customer experience",
          "Integrate Microsoft Dynamics 365 Sales, Field Service, Power BI, Power App, and MYOB",
        ],
      },
      { type: "h2", text: "The Impact" },
      {
        type: "ul",
        items: [
          "Pro-active PM renewals",
          "System self-managing long-term PM contracts",
          "Visibility of work in pipeline to plan accordingly",
          "End-to-end service history visibility for assets",
          "Increased sales due to advanced reporting",
          "Sales and service team have a single source of truth",
          "End-to-end process management from quoting to Work Order execution to invoicing",
        ],
      },
    ],
  },
];

// ─── Run migration ───────────────────────────────────────────────────────────

async function imageRef(file?: string): Promise<SanityImageValue | undefined> {
  if (!file) return undefined;
  const id = await uploadImage(file);
  return { _type: "image", asset: { _type: "reference", _ref: id } };
}

async function fileRef(file?: string): Promise<SanityFileValue | undefined> {
  if (!file) return undefined;
  const id = await uploadFile(file);
  return { _type: "file", asset: { _type: "reference", _ref: id } };
}

async function run() {
  console.log(
    `Migrating ${STORIES.length} customer stories to ${projectId}/${dataset}\n`,
  );

  for (const story of STORIES) {
    console.log(`→ ${story.slug}`);

    const heroImage = await imageRef(story.heroImage);
    const companyLogo = await imageRef(story.companyLogo);
    const productLogo = await imageRef(story.productLogo);
    const downloadFile = await fileRef(story.downloadFile);
    const body = await buildBody(story.body);

    const doc: IdentifiedSanityDocumentStub = {
      _id: `cs-${story.slug}`,
      _type: "customerStory",
      company: story.company,
      slug: { _type: "slug", current: story.slug },
      title: story.title,
      description: story.description,
      date: story.date,
      readTime: story.readTime,
      order: story.order,
      heroImage,
      companyLogo,
      productLogo,
      quote: story.quote,
      quoteAuthor: story.quoteAuthor,
      sidebar: story.sidebar.map((s) => ({
        _key: randomUUID().slice(0, 12),
        ...s,
      })),
      downloadFile,
      body,
    };

    // Strip undefined fields
    const cleanDoc = Object.fromEntries(
      Object.entries(doc).filter(([, value]) => value !== undefined),
    ) as IdentifiedSanityDocumentStub;

    await withRetry(`document ${story.slug}`, () =>
      client.createOrReplace(cleanDoc),
    );
    console.log(`  ✓ ${story.slug}\n`);
  }

  console.log(`Done. ${STORIES.length} stories migrated.`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorStatus(error: unknown): number | undefined {
  return isRecord(error) && typeof error.statusCode === "number"
    ? error.statusCode
    : undefined;
}

run().catch((err: unknown) => {
  if (getErrorStatus(err) === 403) {
    console.error(
      "Migration failed: SANITY_API_WRITE_TOKEN does not have create permissions for this dataset.",
    );
    console.error("Create a Sanity token with Editor permissions and rerun.");
  } else {
    console.error(err);
  }
  process.exit(1);
});
