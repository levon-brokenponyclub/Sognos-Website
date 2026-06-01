/**
 * Seeds Knowledge Hub posts into Sanity. Complete set (all 18 posts).
 *
 * Usage: pnpm migrate:knowledge-posts
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces docs by deterministic _id (`kp-<slug>`).
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorStatus(error: unknown): number | undefined {
  return isRecord(error) && typeof error.statusCode === "number"
    ? error.statusCode
    : undefined;
}

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
      console.warn(
        `  retrying ${label} after ${status ?? "error"} (${attempt}/${attempts})`,
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

// ─── Body item types ─────────────────────────────────────────────────────────

type Span =
  | string
  | { strong: string }
  | { link: string; href: string };

type BodyItem =
  | { type: "p"; text: string }
  | { type: "p"; spans: Span[] }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: (string | Span[])[] }
  | { type: "blockquote"; text: string };

type PostInput = {
  slug: string;
  category: "Milestone" | "News" | "Events" | "Webinar" | "Insights";
  title: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  heroImage: string;
  industry?: string;
  useCase?: string;
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

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type LinkMarkDef = { _key: string; _type: "link"; href: string };

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "blockquote";
  markDefs: LinkMarkDef[];
  children: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: 1;
};

// ─── Image upload ────────────────────────────────────────────────────────────

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

async function imageRef(file: string): Promise<SanityImageValue> {
  const id = await uploadImage(file);
  return { _type: "image", asset: { _type: "reference", _ref: id } };
}

// ─── Portable Text builders ──────────────────────────────────────────────────

function span(text: string, marks: string[] = []): PortableTextSpan {
  return {
    _type: "span",
    _key: randomUUID().slice(0, 12),
    text,
    marks,
  };
}

function buildSpans(spans: Span[]): {
  children: PortableTextSpan[];
  markDefs: LinkMarkDef[];
} {
  const children: PortableTextSpan[] = [];
  const markDefs: LinkMarkDef[] = [];
  for (const sp of spans) {
    if (typeof sp === "string") {
      children.push(span(sp));
    } else if ("strong" in sp) {
      children.push(span(sp.strong, ["strong"]));
    } else {
      const key = randomUUID().slice(0, 12);
      markDefs.push({ _key: key, _type: "link", href: sp.href });
      children.push(span(sp.link, [key]));
    }
  }
  return { children, markDefs };
}

function block(
  style: "normal" | "h2" | "blockquote",
  children: PortableTextSpan[],
  markDefs: LinkMarkDef[] = [],
  listItem?: "bullet" | "number",
): PortableTextBlock {
  return {
    _type: "block",
    _key: randomUUID().slice(0, 12),
    style,
    markDefs,
    children,
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

function listItemBlock(
  item: string | Span[],
  kind: "bullet" | "number",
): PortableTextBlock {
  if (typeof item === "string") {
    return block("normal", [span(item)], [], kind);
  }
  const { children, markDefs } = buildSpans(item);
  return block("normal", children, markDefs, kind);
}

function buildBody(items: BodyItem[]): PortableTextBlock[] {
  const out: PortableTextBlock[] = [];
  for (const item of items) {
    if (item.type === "p") {
      if ("spans" in item) {
        const { children, markDefs } = buildSpans(item.spans);
        out.push(block("normal", children, markDefs));
      } else {
        out.push(block("normal", [span(item.text)]));
      }
    } else if (item.type === "h2") {
      out.push(block("h2", [span(item.text)]));
    } else if (item.type === "blockquote") {
      out.push(block("blockquote", [span(item.text)]));
    } else if (item.type === "ul") {
      for (const li of item.items) {
        out.push(listItemBlock(li, "bullet"));
      }
    } else if (item.type === "ol") {
      for (const li of item.items) {
        out.push(listItemBlock(li, "number"));
      }
    }
  }
  return out;
}

// ─── Post data ───────────────────────────────────────────────────────────────

const POSTS: PostInput[] = [
  {
    slug: "sognos-9-years",
    category: "Milestone",
    title:
      "Sognos Solutions Celebrates 9 Years of Growth, Innovation, and Microsoft Dynamics 365 Expertise",
    date: "2025-05-09",
    readTime: "3 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/sognos-9-years.webp",
    excerpt: "Today marks a major milestone – 9 years of Sognos Solutions.",
    body: [
      {
        type: "p",
        text: "Today marks a major milestone – 9 years of Sognos Solutions. Since our founding in Australia, our journey through digital transformation has been shaped by bold thinking, trusted partnerships, and a passion for delivering impactful technology solutions. These efforts help organisations achieve more with Microsoft Dynamics 365 and the Power Platform.",
      },
      {
        type: "p",
        text: "From our early beginnings, Sognos has grown into a global solutions partner. We have a strong presence in Australia, New Zealand, and India. Additionally, there are exciting new opportunities emerging in the United Arab Emirates (UAE).",
      },
      { type: "h2", text: "9 Years of Impact and Digital Transformation" },
      { type: "p", text: "Over nearly a decade, we've achieved:" },
      {
        type: "ul",
        items: [
          "Tailored Microsoft Dynamics 365 solutions across industries in Australia and New Zealand",
          "Expansion into new sectors with innovative digital transformation and intelligent service delivery",
          "A growing international team, including our talented India office. Their energy, expertise, and commitment continue to fuel our success.",
        ],
      },
      { type: "h2", text: "Thank You to Our Clients, Partners, and Team" },
      {
        type: "p",
        text: "This milestone would not have been possible without the trust of our clients. Also, the collaboration of our partners and the dedication of the incredible Sognos Solutions team played a vital role. Together, we've built a track record of delivering field service excellence, operational optimisation, and technology-driven growth.",
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "p",
        text: "As we celebrate 9 years of Sognos Solutions, we remain focused on our mission: helping organisations harness the power of Microsoft Dynamics 365. We aim to optimise operations, overcome field service challenges, and deliver measurable business impact.",
      },
      {
        type: "p",
        text: "Here's to the next chapter of growth, innovation, and digital transformation. We look forward to continuing our journey as a trusted partner for organisations worldwide.",
      },
    ],
  },
  {
    slug: "north-sydney-office",
    category: "News",
    title: "Sognos Solutions Moves to New Office in North Sydney",
    date: "2025-04-07",
    readTime: "2 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/north-sydney-office.webp",
    excerpt:
      "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.",
    body: [
      {
        type: "p",
        text: "We're thrilled to share that Sognos Solutions has officially moved to our new office at 1 Denison Street, North Sydney. The new office offers a great location with ample opportunities.",
      },
      {
        type: "p",
        text: "This move marks an exciting new chapter in our journey. Our new office location allows us to continue to grow and evolve in a space that better reflects our team's energy, culture, and ambition. Located in one of Sydney's most dynamic business precincts, our new office offers a vibrant environment for collaboration, innovation, and connection, complete with panoramic views that inspire.",
      },
      {
        type: "p",
        text: "The relocation supports our ongoing commitment to delivering exceptional service and building strong partnerships, and it gives our team a workplace that fosters creativity and focus.",
      },
      {
        type: "p",
        text: "We extend a sincere thank you to everyone involved in making the transition seamless. Our team managed every detail, from logistics to design, with care, and we're already seeing the positive impact take shape.",
      },
      {
        type: "p",
        text: "We look forward to welcoming our clients, partners, and friends to the new space in the weeks ahead.",
      },
      {
        type: "p",
        text: "Here's to new beginnings, continued growth, and even greater collaboration at Sognos with our new office in North Sydney.",
      },
    ],
  },
  {
    slug: "new-zealand-launch",
    category: "News",
    title:
      "Sognos Solutions Expands to New Zealand with Official Launch at Microsoft House in Auckland",
    date: "2024-12-05",
    readTime: "3 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/new-zealand-launch.webp",
    excerpt:
      "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This expansion was marked by a milestone event at Microsoft's Auckland offices.",
    body: [
      {
        type: "p",
        text: "Sognos Solutions is proud to announce the official launch of Sognos Solutions New Zealand Limited. This New Zealand expansion was marked by a milestone event at Microsoft's Auckland offices (Microsoft House). This exciting expansion strengthens our presence in the region and underscores our commitment to delivering world-class Microsoft Dynamics 365 and Power Platform solutions to organisations across New Zealand.",
      },
      {
        type: "p",
        text: "The launch event brought together an impressive line-up of local organisations, customers, and partners - including APM Group, Auckland Airport, Function10, and Microsoft - who joined us to celebrate this next chapter for Sognos and our New Zealand expansion.",
      },
      {
        type: "h2",
        text: "Introducing SognosCare for Allied Health and Social Care in New Zealand",
      },
      {
        type: "p",
        text: "As part of the New Zealand expansion launch, we were proud to unveil SognosCare, our purpose-built Accelerator solution for the Allied Health and Social Care sector. Designed to empower healthcare providers with digital transformation tools, SognosCare streamlines service delivery, enhances patient and participant care, and improves workforce efficiency. By harnessing the power of Microsoft Cloud and Dynamics 365, SognosCare helps providers deliver more connected, transparent, and impactful care.",
      },
      { type: "h2", text: "A Thank You to Our Partners" },
      {
        type: "p",
        text: "We extend our gratitude to our colleagues at Microsoft New Zealand for hosting this important event. We also thank our customers and partners for their continued support and trust. The turnout, both in-person and online, reflects the strength of our growing New Zealand community and the shared vision we have for transforming service experiences.",
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "p",
        text: "With our New Zealand office now officially launched, Sognos Solutions is excited to partner with organisations across industries - from healthcare and social care to utilities and beyond - to solve field service challenges and enable digital transformation at scale.",
      },
    ],
  },
  {
    slug: "india-office",
    category: "News",
    title: "New Beginnings | Office Premises in India",
    date: "2024-09-11",
    readTime: "2 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/india-office.webp",
    excerpt:
      "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India - expanding our delivery capability and global footprint.",
    body: [
      {
        type: "p",
        text: "As we continue to grow and evolve, we are excited to announce the opening of our new office premises in India. This move is a key part of our ongoing strategy to expand operational capacity and strengthen our service capabilities while retaining our core focus on our existing customer base in Australia and New Zealand.",
      },
      {
        type: "p",
        text: "With its wealth of talent and technological expertise, India provides an ideal environment for operational growth and back-end support as we scale our efforts. While our customer base remains firmly rooted in Australia and New Zealand, these office premises in India will enhance our ability to meet increasing demand and support our teams in delivering exceptional value.",
      },
      {
        type: "p",
        text: "In keeping with traditions, we marked the occasion with a Pooja ceremony, a ritual to invoke blessings for prosperity and success. This cultural gesture reflects our respect for local customs and our commitment to fostering a positive and productive environment as we move forward in our office premises in India.",
      },
      {
        type: "p",
        text: "This new space symbolises a new phase in our journey, where we remain dedicated to serving our existing markets while exploring new growth opportunities.",
      },
      {
        type: "p",
        text: "We are excited about the road ahead and look forward to sharing the benefits of this expansion with our valued clients.",
      },
    ],
  },
  {
    slug: "fsm-summit-2024",
    category: "Events",
    title:
      "Sognos at FSM Summit 2024: Driving the Future of Field Service in Sydney",
    date: "2024-08-30",
    readTime: "4 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/fsm-summit-2024.webp",
    industry: "Facilities Management",
    useCase: "Frontline",
    excerpt:
      "The Field Service Management (FSM) Summit 2024 in Sydney brought together the brightest minds in service innovation, and Sognos Solutions was proud to be part of the conversation.",
    body: [
      {
        type: "p",
        text: "The Field Service Management (FSM) Summit 2024 in Sydney brought together the brightest minds in service innovation, and Sognos Solutions was proud to be part of the conversation. As a trusted Microsoft partner and field service technology specialist, our team joined industry leaders, partners, and peers to explore the next generation of field service transformation.",
      },
      {
        type: "p",
        text: "The FSM Summit Sydney event was packed with valuable insights on automation, customer expectations, workforce challenges, and the impact of AI on field service delivery. For Sognos, it was more than a networking opportunity - it was a reaffirmation of our mission to help clients modernise operations through Microsoft Dynamics 365 and the Power Platform.",
      },
      { type: "h2", text: "Key Takeaways from FSM Summit 2024" },
      {
        type: "ol",
        items: [
          [
            { strong: "AI is no longer on the horizon - it's here." },
            " The field service industry is rapidly embracing AI to optimise scheduling, anticipate equipment failure, and enhance customer experiences. Microsoft's Copilot capabilities were front and centre, reinforcing how intelligent service is becoming the new normal.",
          ],
          [
            { strong: "Data-driven decision-making is the new standard." },
            " From asset performance to technician productivity, FSM leaders are prioritising platforms that deliver real-time insights. As one speaker noted, “If you're not measuring it, you're not managing it.”",
          ],
          [
            { strong: "People-first innovation is critical." },
            " Amid all the tech, there was a strong focus on workforce enablement - ensuring field technicians have the right tools, training, and support to succeed. At Sognos, we're passionate about building systems that empower people as much as they optimise process.",
          ],
        ],
      },
      { type: "h2", text: "The Sognos Team in Action" },
      {
        type: "p",
        text: "It was fantastic to see our leadership team connecting with industry peers and participating in breakout sessions. We showcased how our clients are achieving real results with Dynamics 365 Field Service. We also had the opportunity to strengthen relationships with Microsoft, reaffirming our shared commitment to digital transformation in complex, regulated service industries.",
      },
      {
        type: "blockquote",
        text: "“So great to see this incredible community of service leaders coming together at FSM Summit Sydney. The energy and insight were unmatched.” - Rick Vosila, Co-Founder at Sognos",
      },
      {
        type: "p",
        text: "We left the FSM Summit more energised than ever about the future of field service and the role Sognos will continue to play in shaping it.",
      },
    ],
  },
  {
    slug: "participant-care-webinar",
    category: "Webinar",
    title: "Enhancing Participant Care with Field Service Management",
    date: "2024-08-13",
    readTime: "1 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/participant-care-webinar.webp",
    industry: "Health & Social Care",
    useCase: "Care Operations",
    excerpt:
      "Watch the playback of our webinar with Microsoft and Flourish Australia - exploring how field service management is transforming participant care delivery.",
    body: [
      {
        type: "p",
        text: "Watch the playback of our webinar with Microsoft and Flourish Australia - exploring how field service management is transforming participant care delivery.",
      },
      {
        type: "p",
        text: "In this session we covered how organisations in the health and social care sector are using Microsoft Dynamics 365 Field Service to improve participant outcomes, reduce admin burden, and maintain compliance at scale.",
      },
      {
        type: "p",
        spans: [
          {
            link: "Watch the full webinar on sognos.com.au →",
            href: "https://sognos.com.au/sognos-webinar-series-reinventing-patient-and-participant-care/",
          },
        ],
      },
    ],
  },
  {
    slug: "smarter-facilities-management-with-dynamics-365",
    category: "Insights",
    title: "Smarter facilities management with Dynamics 365",
    date: "2025-04-01",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/smarter-facilities-mngmt-scaled.avif",
    industry: "Facilities Management",
    excerpt:
      "Facilities management can often be an intricate balancing act. You're balancing assets, people, contractors, compliance, and customer expectations across multiple sites, often with work that can't wait until tomorrow.",
    body: [
      {
        type: "p",
        text: "Facilities management can often be an intricate balancing act. You're balancing assets, people, contractors, compliance, and customer expectations across multiple sites - often with work that can't wait until tomorrow.",
      },
      {
        type: "p",
        text: "Legacy systems and disconnected spreadsheets make this harder than it needs to be. When a technician can't see an asset history in the field, or a planner can't match the right skill to the right job, the whole operation slows down. Costs rise. SLAs slip. Customers notice.",
      },
      { type: "h2", text: "What Connected Facilities Management Looks Like" },
      {
        type: "p",
        text: "Microsoft Dynamics 365 Field Service brings the key components of FM together on one platform: work order management, asset tracking, preventive maintenance scheduling, technician dispatch, and real-time reporting. When these are connected, your team sees the full picture - not just their slice of it.",
      },
      {
        type: "p",
        text: "Predictive maintenance capabilities mean you're flagging equipment issues before they become service calls. Intelligent scheduling ensures the right technician arrives with the right parts. Mobile access gives frontline staff what they need without having to call back to base.",
      },
      { type: "h2", text: "Where Sognos Comes In" },
      {
        type: "p",
        text: "Sognos works with facilities management organisations to implement and configure Dynamics 365 Field Service so it reflects the complexity of real operations - multi-site, multi-contractor, and multi-compliance. We don't hand you a platform and walk away. We map your workflows, build the integrations you need, and train your team so adoption actually sticks.",
      },
      {
        type: "p",
        text: "If your team is still stitching together operations across email, spreadsheets, and separate tools, it's worth exploring what a unified platform can do.",
      },
    ],
  },
  {
    slug: "from-chaos-to-control-modernising-field-services",
    category: "Insights",
    title: "From chaos to control: Modernising field services",
    date: "2025-03-15",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/chaos-to-calm-scaled.avif",
    excerpt:
      "Field services do not usually fall into chaos overnight. It creeps in. A handful of urgent jobs arrive, priorities change mid-day, and the schedule gets stitched together with phone calls, spreadsheets, and best guesses.",
    body: [
      {
        type: "p",
        text: "Field services do not usually fall into chaos overnight. It creeps in. A handful of urgent jobs arrive, priorities change mid-day, and the schedule gets stitched together with phone calls, spreadsheets, and best guesses. Before long, what started as a manageable operation becomes something reactive and unpredictable.",
      },
      {
        type: "p",
        text: "This is the pattern we see most often when organisations come to us looking to modernise. The tools they're using were built for simpler times, and the team has been compensating ever since.",
      },
      { type: "h2", text: "The Hidden Cost of Reactive Operations" },
      {
        type: "p",
        text: "Reactive field service operations carry costs that rarely show up in a single line on a report. There's the overtime when the schedule falls apart. The customer that doesn't get called back. The technician driving across town because dispatch didn't have visibility of who was nearby. These are the friction points that erode margin and morale over time.",
      },
      {
        type: "p",
        text: "Modernising doesn't mean ripping everything out at once. It means identifying where visibility breaks down, where decisions are made without enough information, and building toward a model where the right data reaches the right person at the right time.",
      },
      { type: "h2", text: "What the Shift Looks Like in Practice" },
      {
        type: "p",
        text: "Organisations that move from reactive to proactive field service typically see three changes early: scheduling accuracy improves, first-time fix rates go up, and the volume of inbound status calls drops. These aren't abstract improvements - they reflect a team that has the tools to see what's coming before it becomes a problem.",
      },
      {
        type: "p",
        text: "Dynamics 365 Field Service, combined with the right implementation partner, gives field service managers the platform to make that shift. Sognos helps organisations move from chaos to control - one workflow at a time.",
      },
    ],
  },
  {
    slug: "the-aged-care-quality-standards-whats-changing-in-2026-and-how-to-implement",
    category: "Insights",
    title:
      "The aged care quality standards: What's changing in 2026, and how to implement",
    date: "2025-02-20",
    readTime: "6 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/innovation-aged-care-scaled.avif",
    industry: "Health & Social Care",
    excerpt:
      "Under the strengthened Aged Care Quality Standards brought in on November 1, 2025, quality of care is judged less by intent and more by what you can demonstrate in everyday records.",
    body: [
      {
        type: "p",
        text: "Under the strengthened Aged Care Quality Standards brought in on November 1, 2025, quality of care is judged less by intent and more by what you can demonstrate in everyday records. For aged care providers, this is a fundamental shift - one that demands more from your systems, not just your staff.",
      },
      {
        type: "p",
        text: "The revised standards place stronger emphasis on individual outcomes, organisational governance, and evidence of continuous improvement. If your compliance approach still relies on manual documentation and periodic audits, you are carrying risk that you may not yet be able to see.",
      },
      { type: "h2", text: "What the New Standards Require" },
      {
        type: "p",
        text: "The eight revised standards span safety, dignity, care delivery, services and supports, clinical care, food and nutrition, the living environment, and organisational governance. Each standard now requires demonstrable evidence - not just policy documentation, but records of how care decisions were made, reviewed, and acted on in individual cases.",
      },
      {
        type: "p",
        text: "For providers operating across multiple sites or with complex caseloads, the challenge is consistency. A strong outcome in one location means little if documentation practices vary across your organisation.",
      },
      { type: "h2", text: "How Technology Supports Implementation" },
      {
        type: "p",
        text: "Microsoft Dynamics 365, configured for aged care, gives providers a single environment for care plans, progress notes, incident reporting, and audit trails. When the data is structured and searchable, compliance reporting becomes a byproduct of good care delivery - not an additional burden.",
      },
      {
        type: "p",
        text: "SognosCare is built on this foundation, with the workflow design and reporting structures that aged care providers need to meet the strengthened standards and demonstrate continuous improvement to the Aged Care Quality and Safety Commission.",
      },
    ],
  },
  {
    slug: "innovation-in-aged-care-what-australia-can-learn-from-systems-already-under-strain",
    category: "Insights",
    title:
      "Innovation in aged care: What Australia can learn from systems already under strain",
    date: "2025-02-10",
    readTime: "6 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/NDIS-768x513.avif",
    industry: "Health & Social Care",
    excerpt:
      "Australia has entered a new era in aged care. With the rights-based Aged Care Act and the Support at Home program now in place, expectations are shifting from 'having policies' to consistently demonstrating safe, person-centred care.",
    body: [
      {
        type: "p",
        text: "Australia has entered a new era in aged care. With the rights-based Aged Care Act and the Support at Home program now in place, expectations are shifting from 'having policies' to consistently demonstrating safe, person-centred care. This is not a gradual evolution - it is a structural reset.",
      },
      {
        type: "p",
        text: "Other healthcare systems further down this path offer a useful lens. Countries that moved early to rights-based care frameworks faced the same challenges now arriving in Australia: workforce pressure, funding complexity, compliance overhead, and the need for data systems that actually reflect what happens in care.",
      },
      { type: "h2", text: "The Lessons Worth Borrowing" },
      {
        type: "p",
        text: "In systems that have already navigated this transition, several patterns stand out. Providers that invested early in digital care records were better positioned to respond to audit requirements and demonstrate quality outcomes. Those that continued relying on paper or disconnected systems found compliance reporting becoming a separate workstream - which added cost and slowed care teams down.",
      },
      {
        type: "p",
        text: "Workforce management also proved critical. Providers that could match staff skills to participant needs, manage rosters dynamically, and maintain continuity of care performed better on both quality metrics and staff retention.",
      },
      { type: "h2", text: "What This Means for Australian Providers Now" },
      {
        type: "p",
        text: "The reform window is open now. Providers that act on their systems and processes in 2025 will be in a stronger position when the compliance environment tightens further. Waiting for stability in the reform program before investing in capability is a risk - the organisations that adapt early tend to lead on quality outcomes and attract funding accordingly.",
      },
      {
        type: "p",
        text: "Sognos works with aged care providers to implement care management and workforce tools that are built for this environment. If you're assessing what your systems need to handle the next phase of reform, we're worth talking to.",
      },
    ],
  },
  {
    slug: "data-residency-in-australian-healthcare-sorting-fact-from-fiction",
    category: "Insights",
    title:
      "Data residency in Australian healthcare: Sorting fact from fiction",
    date: "2025-01-25",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/data-residency-768x512.avif",
    industry: "Health & Social Care",
    excerpt:
      "A persistent myth in healthcare IT is that data must stay onshore to stay safe. Many providers - especially in mental health, disability, and aged care - are told that hosting data overseas is non-compliant or even illegal.",
    body: [
      {
        type: "p",
        text: "A persistent myth in healthcare IT is that data must stay onshore to stay safe. Many providers - especially in mental health, disability, and aged care - are told that hosting data overseas is non-compliant or even illegal. This claim has shaped procurement decisions, delayed modernisation projects, and led some organisations to maintain expensive on-premises infrastructure well past its useful life.",
      },
      {
        type: "p",
        text: "The reality is more nuanced, and understanding it matters - because acting on misinformation about data residency can cost your organisation both money and agility.",
      },
      { type: "h2", text: "What Australian Law Actually Requires" },
      {
        type: "p",
        text: "The Privacy Act 1988 and the Australian Privacy Principles (APPs) govern how health information is handled. They require that personal information be protected from misuse, interference, and unauthorised access - but they do not mandate that data be stored on Australian soil. The obligation is to ensure adequate protections are in place wherever the data resides.",
      },
      {
        type: "p",
        text: "For cloud services, this means assessing the provider's security controls, certifications, and contractual commitments - not simply their data centre location. Microsoft Azure, for example, holds IRAP assessments across multiple services and operates Australian data centre regions, which satisfies the expectations of most healthcare regulators.",
      },
      { type: "h2", text: "Where Genuine Risk Sits" },
      {
        type: "p",
        text: "Real data risk in healthcare tends to come from access control gaps, unencrypted storage, inadequate audit trails, and poor incident response - not from geography. Providers that focus exclusively on residency while leaving other security fundamentals unaddressed are solving the wrong problem.",
      },
      {
        type: "p",
        text: "Sognos helps health and care organisations assess their data governance posture and implement Microsoft cloud environments that meet regulatory expectations. If your organisation is weighing up cloud adoption and has questions about compliance, we can help you separate fact from fiction.",
      },
    ],
  },
  {
    slug: "compliance-without-the-paperwork-finding-the-right-ndis-reporting-tools-for-your-organisation",
    category: "Insights",
    title:
      "Compliance without the paperwork: Finding the right NDIS reporting tools for your organisation",
    date: "2025-01-15",
    readTime: "6 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/Good-compliance-768x511.avif",
    industry: "Health & Social Care",
    excerpt:
      "If you lead a disability service today, you can feel it - compliance is back at the centre of everything. The NDIS Commission expects every provider to run a working incident management system, document outcomes, and respond to audits with confidence.",
    body: [
      {
        type: "p",
        text: "If you lead a disability service today, you can feel it - compliance is back at the centre of everything. The NDIS Commission expects every provider to run a working incident management system, document outcomes, and respond to audits with confidence. The expectation isn't just that you're compliant. It's that you can prove it.",
      },
      {
        type: "p",
        text: "For many providers, the gap between what the Commission expects and what their current tools can actually produce is significant. Reporting is manual, incident records are inconsistent, and pulling together the data for an audit means hours of work that could have gone into direct support.",
      },
      { type: "h2", text: "What Good NDIS Reporting Tools Actually Do" },
      {
        type: "p",
        text: "The right tools do two things: they make it easy for support workers to capture the right information at the point of care, and they make it easy for managers to report on it without extra effort. When those two things happen, compliance stops being a separate workstream and becomes a byproduct of normal operations.",
      },
      {
        type: "p",
        text: "This means incident management that is genuinely easy to use on a mobile device, progress notes that are structured without being rigid, and reporting dashboards that give management visibility across the whole organisation - not just a snapshot of one program.",
      },
      { type: "h2", text: "Evaluating Your Options" },
      {
        type: "p",
        text: "When assessing NDIS reporting tools, the questions that matter most are not about features lists. They are about fit: Does this tool reflect how your workers actually deliver support? Can it handle your participant mix? Does it connect to your rostering and billing systems, or does it create another silo?",
      },
      {
        type: "p",
        text: "SognosCare is built on Microsoft Dynamics 365 and designed to meet the specific reporting requirements of NDIS providers - from incident management and outcome tracking to audit-ready records and NDIS Commission reporting. If you're evaluating your options, we're worth adding to the list.",
      },
    ],
  },
  {
    slug: "aged-care-reform-2025-26-what-providers-need-to-do-now",
    category: "Insights",
    title: "Aged care reform 2025/26: What providers need to do now",
    date: "2025-01-05",
    readTime: "6 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/aged-care-reform-768x512.avif",
    industry: "Health & Social Care",
    excerpt:
      "Reform has landed. Now the real work begins. The new Aged Care Act and Support at Home program came into force, reshaping how aged care operates, funds and proves quality. It is the most significant structural change in a generation.",
    body: [
      {
        type: "p",
        text: "Reform has landed. Now the real work begins. The new Aged Care Act and Support at Home program came into force, reshaping how aged care operates, funds, and proves quality. It is the most significant structural change in a generation - and providers are now operating inside a compliance environment that rewards organisations that are ready, and exposes those that are not.",
      },
      {
        type: "p",
        text: "The question for providers in 2025 and 2026 is not whether to act, but what to prioritise first.",
      },
      { type: "h2", text: "What the Reform Requires Operationally" },
      {
        type: "p",
        text: "The Support at Home program introduces a new assessment and budget framework that places individual choice at the centre of care planning. For providers, this means care plans need to be more dynamic, service delivery records need to be more granular, and reporting needs to be structured around individual outcomes rather than just service hours.",
      },
      {
        type: "p",
        text: "At the governance level, the new Act strengthens the obligations of approved providers on quality systems, incident management, and continuous improvement. These are not tick-box requirements - they require organisations to demonstrate that their systems actually work as intended.",
      },
      { type: "h2", text: "Where to Start" },
      {
        type: "p",
        text: "Providers who are still running care management on legacy systems or disconnected tools should treat 2025 as the year to address that. The compliance expectations under the new Act are not compatible with manual documentation at scale.",
      },
      {
        type: "p",
        text: "Sognos works with aged care providers to implement SognosCare - a purpose-built care management platform on Microsoft Dynamics 365 - that is designed for exactly this operating environment. If you want to understand what implementation looks like for your organisation, reach out to our team.",
      },
    ],
  },
  {
    slug: "admin-overload-in-care-why-its-burning-out-frontline-workers",
    category: "Insights",
    title: "Admin overload in care: Why it's burning out frontline workers",
    date: "2024-12-10",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/admin-overload-768x405.avif",
    industry: "Health & Social Care",
    excerpt:
      "Across Australia and New Zealand, frontline teams in care and community services are under pressure. Time with people is shrinking as screens take over the workday - and it's pushing good workers out the door.",
    body: [
      {
        type: "p",
        text: "Across Australia and New Zealand, frontline teams in care and community services are under pressure. Time with people is shrinking as screens take over the workday - and it's pushing good workers out the door.",
      },
      {
        type: "p",
        text: "The problem is not that workers have too much to do. The problem is that too much of what they do is not care. It is documentation. Duplicate data entry. Chasing approvals. Filling out forms that no one reads in full. For workers who came into the sector to make a difference for people, this disconnect is demoralising.",
      },
      { type: "h2", text: "The Scale of the Problem" },
      {
        type: "p",
        text: "Research consistently shows that care workers in the NDIS and aged care sectors spend a disproportionate amount of time on administrative tasks relative to direct support time. In some settings, this ratio is close to 1:1. That means for every hour a worker spends with a participant, they spend roughly another hour on paperwork.",
      },
      {
        type: "p",
        text: "This is not sustainable, and it is not inevitable. It is a systems problem - and systems problems can be solved.",
      },
      { type: "h2", text: "What Reducing Admin Actually Requires" },
      {
        type: "p",
        text: "Reducing admin burden for frontline care workers requires rethinking how information is captured and shared - not just digitising existing paper forms. When notes are structured at the point of care on a mobile device, when shift handover happens in the platform rather than via phone, and when compliance reporting is generated automatically from care records, the time equation changes.",
      },
      {
        type: "p",
        text: "SognosCare is designed with frontline workers in mind - mobile-first, structured for compliance, and built to reduce the time between care and documentation. If your team is burning out on admin, let's talk about what better looks like.",
      },
    ],
  },
  {
    slug: "mobile-care-app-solutions-empowering-your-frontline-workforce-with-dataverse",
    category: "Insights",
    title:
      "Mobile care app solutions: Empowering your frontline workforce with Dataverse",
    date: "2024-11-20",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/mobile-care-app-solutions-768x512.avif",
    industry: "Health & Social Care",
    excerpt:
      "Frontline care relies on connection - between people, information, and place. Yet for many teams, mobile tools still slow things down. Coverage drops. Logins fail. Notes get written on paper and entered hours later.",
    body: [
      {
        type: "p",
        text: "Frontline care relies on connection - between people, information, and place. Yet for many teams, mobile tools still slow things down. Coverage drops. Logins fail. Notes get written on paper and entered hours later. The technology meant to support care workers often creates friction instead.",
      },
      {
        type: "p",
        text: "The gap between what mobile tools promise and what they deliver in the field comes down to how they are built and what they are built on. Consumer-grade apps adapted for care often lack the offline capability, data structure, and integration depth that professional care environments require.",
      },
      { type: "h2", text: "Why Dataverse Changes the Equation" },
      {
        type: "p",
        text: "Microsoft Dataverse provides the data layer that makes mobile care apps work the way they should. Information captured in the field - notes, observations, task completions - is stored in a structured format that connects directly to care plans, rostering, compliance records, and reporting. There is no secondary sync required, no manual reconciliation, and no data that exists only on a device.",
      },
      {
        type: "p",
        text: "Offline capability means workers can continue recording in low-signal environments and have their data synced automatically when connectivity returns. For community care workers covering regional or rural areas, this is not a nice-to-have - it is essential.",
      },
      { type: "h2", text: "What This Looks Like in Practice" },
      {
        type: "p",
        text: "Sognos builds mobile care apps on Power Apps and Dataverse that are tailored to the specific workflows of NDIS providers, aged care organisations, and allied health teams. The apps are designed for workers, not system administrators - simple interfaces, structured inputs, and the data connections that matter.",
      },
      {
        type: "p",
        text: "If your frontline team is working around their mobile tools rather than with them, that is a problem worth solving. We can show you what a purpose-built approach looks like for your organisation.",
      },
    ],
  },
  {
    slug: "mental-health-and-disability-workforce-burnout-a-growing-crisis",
    category: "Insights",
    title: "Mental health and disability workforce burnout: A growing crisis",
    date: "2024-11-05",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/Heathcare-burnout_blog-768x576.avif",
    industry: "Health & Social Care",
    excerpt:
      "Across Australia, providers in mental health and disability care are facing a growing crisis. Recruitment is harder. Retention is slipping. Rosters are stretched thin - and the people who remain are carrying more than they should.",
    body: [
      {
        type: "p",
        text: "Across Australia, providers in mental health and disability care are facing a growing crisis. Recruitment is harder. Retention is slipping. Rosters are stretched thin - and the people who remain are carrying more than they should. Burnout is not a future risk in this sector. It is a present reality.",
      },
      {
        type: "p",
        text: "The causes are well documented: high emotional demands, inadequate supervision, excessive administrative burden, and rosters that leave workers feeling like variables rather than people. What is less often discussed is the role that operational systems play in either containing or compounding these pressures.",
      },
      { type: "h2", text: "How Workforce Systems Contribute to Burnout" },
      {
        type: "p",
        text: "When rostering is manual or poorly integrated with care planning, workers absorb the consequences. Last-minute shift changes with no context. Handovers that rely on verbal communication rather than structured records. Inconsistent participant allocations that prevent relationship building.",
      },
      {
        type: "p",
        text: "These are not just inconveniences - they are stressors that compound over weeks and months. Workers who feel unsupported by their systems are more likely to feel unsupported by their organisation.",
      },
      {
        type: "h2",
        text: "What Better Operations Look Like for Workforce Wellbeing",
      },
      {
        type: "p",
        text: "Organisations that invest in connected workforce and care management tools tend to see measurable improvements in workforce stability. Stable rosters reduce uncertainty. Mobile tools that reduce after-hours admin give workers back their time. Structured handovers mean workers arrive prepared, not guessing.",
      },
      {
        type: "p",
        text: "SognosRoster is built to give workforce managers the visibility and control to run stable, sustainable rosters - and to give frontline workers the information they need to do their jobs without additional friction. If workforce stability is a priority for your organisation, let's talk.",
      },
    ],
  },
  {
    slug: "reducing-administrative-burden-through-automated-compliance-tracking",
    category: "Insights",
    title:
      "Reducing Administrative Burden Through Automated Compliance Tracking in Field Service",
    date: "2024-10-15",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/admin-blog-768x576.webp",
    excerpt:
      "In highly regulated industries like utilities, healthcare, and infrastructure, compliance isn't optional - it's a daily operational necessity. Yet many field service organisations still rely on manual compliance tracking.",
    body: [
      {
        type: "p",
        text: "In highly regulated industries like utilities, healthcare, and infrastructure, compliance isn't optional - it's a daily operational necessity. Yet many field service organisations still rely on manual compliance tracking: spreadsheets, printed checklists, and follow-up calls to confirm whether the right steps were taken on the right job.",
      },
      {
        type: "p",
        text: "This approach has a ceiling. As teams grow and job volumes increase, the overhead of manual compliance tracking scales linearly with operations. At some point, it becomes a constraint on growth - or a liability when an audit reveals gaps.",
      },
      { type: "h2", text: "What Automated Compliance Tracking Changes" },
      {
        type: "p",
        text: "Automated compliance tracking embeds the compliance requirements into the work order itself. Technicians complete structured checklists in the field on a mobile device. Required certifications are verified before dispatch. Audit trails are generated automatically as work is completed.",
      },
      {
        type: "p",
        text: "The result is that compliance becomes a byproduct of normal operations rather than a separate reporting exercise. Managers gain real-time visibility across their compliance status, and audit preparation becomes a matter of running a report rather than reconstructing records from multiple systems.",
      },
      { type: "h2", text: "The Right Platform for Regulated Field Service" },
      {
        type: "p",
        text: "Microsoft Dynamics 365 Field Service provides the workflow infrastructure to automate compliance at scale. Sognos configures these capabilities to reflect the specific requirements of your industry - whether that is AS/NZS standards in utilities, care delivery compliance in health, or safety protocols in infrastructure.",
      },
      {
        type: "p",
        text: "If your team is spending more time documenting compliance than delivering service, it is worth exploring what an automated approach can do for your operations.",
      },
    ],
  },
  {
    slug: "power-apps-in-action-customising-your-fsm-for-industry-specific-needs",
    category: "Insights",
    title:
      "Power Apps in Action – Customising Your FSM for Industry-Specific Needs",
    date: "2024-09-25",
    readTime: "5 min read",
    author: "Sognos Solutions",
    heroImage: "/images/news/power-app-blog-2-768x576.webp",
    excerpt:
      "One-size-fits-all rarely works in field service management. Industries like utilities, healthcare, logistics, and infrastructure have unique operational needs, compliance requirements, and customer expectations.",
    body: [
      {
        type: "p",
        text: "One-size-fits-all rarely works in field service management. Industries like utilities, healthcare, logistics, and infrastructure have unique operational needs, compliance requirements, and customer expectations. A platform configured for a utility crew managing high-voltage infrastructure looks very different from one built for a disability support organisation coordinating community care workers.",
      },
      {
        type: "p",
        text: "This is where Power Apps changes what is possible. Rather than forcing your operations into a standard template, Power Apps allows field service platforms to be shaped around your specific workflows - without the cost of custom software development.",
      },
      { type: "h2", text: "What Customisation With Power Apps Looks Like" },
      {
        type: "p",
        text: "Power Apps sits on top of Microsoft Dataverse, which means it connects directly to Dynamics 365 Field Service data. Custom apps can be built for specific roles - a technician app that surfaces only the job information relevant to that worker, a supervisor dashboard built for rapid status review, or a client-facing portal for booking and tracking service requests.",
      },
      {
        type: "p",
        text: "These are not bolt-ons. They are native extensions of the same data platform, which means information captured in a Power App flows immediately into the broader system - no manual exports, no sync delays, no duplicate records.",
      },
      { type: "h2", text: "Industry-Specific Applications Sognos Has Built" },
      {
        type: "p",
        text: "Sognos has built Power Apps customisations for field service clients across facilities management, health and social care, and utilities - including mobile job checklists with industry-specific compliance requirements, technician certification validation, and real-time asset condition reporting.",
      },
      {
        type: "p",
        text: "If your current FSM platform doesn't fit the way your industry actually operates, Power Apps is likely part of the solution. Talk to our team about what a customised approach looks like for your organisation.",
      },
    ],
  },
];

// ─── Run ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log(
    `Migrating ${POSTS.length} knowledge posts to ${projectId}/${dataset}\n`,
  );

  for (const post of POSTS) {
    console.log(`→ ${post.slug}`);

    const heroImage = await imageRef(post.heroImage);
    const body = buildBody(post.body);

    const doc: IdentifiedSanityDocumentStub = {
      _id: `kp-${post.slug}`,
      _type: "knowledgePost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      author: post.author,
      excerpt: post.excerpt,
      heroImage,
      industry: post.industry,
      useCase: post.useCase,
      body,
    };

    const cleanDoc = Object.fromEntries(
      Object.entries(doc).filter(([, value]) => value !== undefined),
    ) as IdentifiedSanityDocumentStub;

    await withRetry(`document ${post.slug}`, () =>
      client.createOrReplace(cleanDoc),
    );
    console.log(`  ✓ ${post.slug}\n`);
  }

  console.log(`Done. ${POSTS.length} posts migrated.`);
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
