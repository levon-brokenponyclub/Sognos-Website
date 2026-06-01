/**
 * One-off migration: seeds 3 legal pages into Sanity.
 *
 * Usage: pnpm migrate:legals
 * Requires: SANITY_API_WRITE_TOKEN in .env.local
 *
 * Idempotent — re-running replaces docs by deterministic _id (`legal-<slug>`).
 */

import { createClient } from "@sanity/client";
import type { IdentifiedSanityDocumentStub } from "@sanity/client";
import { randomUUID } from "crypto";
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

// ─── Body item types ─────────────────────────────────────────────────────────

type Span =
  | string
  | { strong: string }
  | { em: string }
  | { link: string; href: string };

type BodyItem =
  | { type: "p"; text: string }
  | { type: "p"; spans: Span[] }
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: (string | Span[])[] }
  | { type: "ol"; items: (string | Span[])[] };

type LegalInput = {
  slug: string;
  title: string;
  metaDescription: string;
  badgeLabel: string;
  heroHeading: string;
  heroSubhead: string;
  body: BodyItem[];
  footerNote?: string;
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
  style: "normal" | "h1" | "h2" | "h3";
  markDefs: LinkMarkDef[];
  children: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: 1;
};

// ─── Portable Text builders ──────────────────────────────────────────────────

function span(text: string, marks: string[] = []): PortableTextSpan {
  return {
    _type: "span",
    _key: randomUUID().slice(0, 12),
    text,
    marks,
  };
}

function buildSpans(spans: Span[]) {
  const children: PortableTextSpan[] = [];
  const markDefs: LinkMarkDef[] = [];
  for (const sp of spans) {
    if (typeof sp === "string") children.push(span(sp));
    else if ("strong" in sp) children.push(span(sp.strong, ["strong"]));
    else if ("em" in sp) children.push(span(sp.em, ["em"]));
    else {
      const key = randomUUID().slice(0, 12);
      markDefs.push({ _key: key, _type: "link", href: sp.href });
      children.push(span(sp.link, [key]));
    }
  }
  return { children, markDefs };
}

function block(
  style: "normal" | "h1" | "h2" | "h3",
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
  if (typeof item === "string") return block("normal", [span(item)], [], kind);
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
    } else if (item.type === "h1") out.push(block("h1", [span(item.text)]));
    else if (item.type === "h2") out.push(block("h2", [span(item.text)]));
    else if (item.type === "h3") out.push(block("h3", [span(item.text)]));
    else if (item.type === "ul") {
      for (const li of item.items) out.push(listItemBlock(li, "bullet"));
    } else if (item.type === "ol") {
      for (const li of item.items) out.push(listItemBlock(li, "number"));
    }
  }
  return out;
}

// ─── Contact section shared blocks ───────────────────────────────────────────

const CONTACT_BLOCKS_SHORT: BodyItem[] = [
  { type: "p", text: "If you have questions about our privacy practices, please contact us at:" },
  {
    type: "p",
    spans: [
      { strong: "Sognos Solutions Pty Ltd" },
      " (ABN 53 611 121 870)",
    ],
  },
  {
    type: "p",
    spans: [
      "Email: ",
      {
        link: "contact@sognos.com.au",
        href: "mailto:contact@sognos.com.au",
      },
    ],
  },
];

const CONTACT_BLOCKS_ISMS: BodyItem[] = [
  { type: "p", text: "For any questions, please contact us at:" },
  {
    type: "p",
    spans: [
      { strong: "Sognos Solutions Pty Ltd" },
      " (ABN 53 611 121 870)",
    ],
  },
  {
    type: "p",
    spans: [
      "Email: ",
      {
        link: "contact@sognos.com.au",
        href: "mailto:contact@sognos.com.au",
      },
    ],
  },
];

const CONTACT_BLOCKS_PRIVACY: BodyItem[] = [
  { type: "p", text: "For any questions or notices, please contact us at:" },
  {
    type: "p",
    spans: [
      { strong: "Sognos Solutions Pty Ltd" },
      " (ABN 53 611 121 870)",
    ],
  },
  {
    type: "p",
    spans: [
      "Email: ",
      {
        link: "contact@sognos.com.au",
        href: "mailto:contact@sognos.com.au",
      },
    ],
  },
];

// ─── Legal pages ─────────────────────────────────────────────────────────────

const PAGES: LegalInput[] = [
  // ── Privacy Collection Notice ──────────────────────────────────────────────
  {
    slug: "privacy-collection-notice",
    title: "Privacy Collection Notice",
    metaDescription:
      "How Sognos collects and handles your personal information when you make an enquiry.",
    badgeLabel: "Privacy Collection Notice",
    heroHeading: "Privacy Collection Notice",
    heroSubhead:
      "How Sognos Solutions collects and handles your personal information when you make an enquiry with us.",
    body: [
      {
        type: "p",
        text: "We collect personal information from you so that we can respond to your enquiry and for related purposes set out in our Privacy Policy, available on our website (or on request).",
      },
      {
        type: "p",
        text: "We may disclose this personal information to third parties, including our personnel, related entities, any third parties engaged by us and acting on our behalf and as otherwise set out in our Privacy Policy.",
      },
      {
        type: "p",
        text: "We store personal information in Australia. Where we disclose your personal information to third parties, those third parties may store, transfer or access personal information outside of Australia.",
      },
      {
        type: "p",
        text: "If you do not provide your personal information to us, it may affect our ability to do business with you.",
      },
      {
        type: "p",
        spans: [
          "Please see our ",
          { link: "Privacy Policy", href: "/company/privacy-policy" },
          " for more information about how we collect, store, use and disclose your personal information, including details about overseas disclosure, access, correction, how you can make a privacy-related complaint and our complaint-handling process.",
        ],
      },
      {
        type: "p",
        text: "By providing your personal information to us, you agree to the collection, use, storage and disclosure of that information as described in this privacy collection notice.",
      },
      ...CONTACT_BLOCKS_SHORT,
    ],
  },

  // ── ISMS Policy ────────────────────────────────────────────────────────────
  {
    slug: "isms-policy",
    title: "Information Security Management System (ISMS) Policy",
    metaDescription:
      "Sognos Solutions' commitment to protecting information assets and managing security risks.",
    badgeLabel: "ISMS Policy",
    heroHeading: "Information Security Management System (ISMS) Policy",
    heroSubhead:
      "Sognos Solutions' commitment to protecting information assets and managing security risks in compliance with ISO/IEC 27001:2022.",
    body: [
      { type: "h2", text: "Purpose & Scope" },
      {
        type: "p",
        spans: [
          "This policy defines Sognos Solutions' commitment to protecting information assets and managing security risks in compliance with ISO/IEC 27001:2022, the ",
          { em: "Privacy Act 1988" },
          " (Australia), and the ",
          { em: "Privacy Act 2020" },
          " (New Zealand). It applies to all employees, contractors, and third parties handling company information across Australia and New Zealand.",
        ],
      },
      { type: "h2", text: "Policy Statement" },
      { type: "p", text: "Sognos Solutions is committed to:" },
      {
        type: "ul",
        items: [
          "Safeguarding the confidentiality, integrity, and availability of information assets.",
          "Meeting all legal, regulatory, and contractual obligations, including Australian Privacy Principles and New Zealand Privacy Principles.",
          "Implementing a risk-based approach to prevent unauthorised access, disclosure, alteration, or destruction of information.",
          "Maintaining business continuity through tested plans and resilience measures.",
          "Continually improving the ISMS through monitoring, audits, and management reviews.",
        ],
      },
      { type: "h2", text: "Objectives" },
      {
        type: "ul",
        items: [
          "Ensure compliance with ISO/IEC 27001:2022 and ANZ regulatory requirements.",
          "Protect sensitive data from cyber threats and breaches.",
          "Promote security awareness across the organisation.",
        ],
      },
      { type: "h2", text: "Responsibilities" },
      {
        type: "ul",
        items: [
          [
            { strong: "Senior Management" },
            " — Provide resources and oversight for ISMS implementation.",
          ],
          [
            { strong: "All Staff" },
            " — Comply with ISMS policies and report security incidents promptly.",
          ],
        ],
      },
      { type: "h2", text: "Review" },
      {
        type: "p",
        text: "This policy will be reviewed annually or upon significant changes in business, technology, or regulatory requirements.",
      },
      ...CONTACT_BLOCKS_ISMS,
    ],
  },

  // ── Privacy Policy ─────────────────────────────────────────────────────────
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaDescription:
      "Learn how we collect, use, and protect your personal information.",
    badgeLabel: "Privacy Policy",
    heroHeading: "Your Privacy, Our Priority",
    heroSubhead:
      "This Privacy Policy describes how Sognos collects, uses, and safeguards your information when you use our website and services.",
    body: [
      { type: "h1", text: "Sognos Solutions Pty Ltd – Privacy Policy" },
      {
        type: "p",
        spans: [
          "Sognos Solutions Pty Ltd (ABN 53 611 121 870) (",
          { strong: "we" },
          ", ",
          { strong: "us" },
          " or ",
          { strong: "our" },
          "), understands that protecting your personal information is important. This Privacy Policy sets out our commitment to protecting the privacy of personal information provided to us, or collected by us, when interacting with you.",
        ],
      },
      {
        type: "p",
        spans: [
          "This Privacy Policy takes into account the requirements of the ",
          { em: "Privacy Act 1988" },
          " (Cth) and the Australian Privacy Principles, as well as the ",
          { em: "New Zealand Privacy Act 2020" },
          " and the Information Privacy Principles.",
        ],
      },
      {
        type: "p",
        spans: [
          "This Privacy Policy was last updated on ",
          { strong: "26 May 2026" },
          ".",
        ],
      },

      { type: "h2", text: "The information we collect" },
      {
        type: "p",
        spans: [
          { strong: "Personal information" },
          " is information or an opinion, whether true or not and whether recorded in a material form or not, about an individual who is identified or reasonably identifiable.",
        ],
      },
      {
        type: "p",
        text: "The types of personal information we may collect about you include:",
      },
      {
        type: "ul",
        items: [
          [
            { strong: "Identity Data" },
            " — your name, age and profession.",
          ],
          [
            { strong: "Contact Data" },
            " — your telephone number, address and email.",
          ],
          [
            { strong: "Transaction Data" },
            " — details about payments to you from us and from you to us, and other details of products and services you have purchased from us or we have purchased from you.",
          ],
          [
            { strong: "Technical and Usage Data" },
            " — when you access any of our websites or platforms, details about your internet protocol (IP) address, login data, browser session and geo-location data, statistics on page views and sessions, device and network information, acquisition sources, search queries and/or browsing behaviour, access and use of our website (including through the use of Internet cookies or analytics), and communications with our website.",
          ],
          [
            { strong: "Interaction Data" },
            " — information you provide to us when you participate in any interactive features, including surveys, activities or events.",
          ],
          [
            { strong: "Marketing and Communications Data" },
            " — your preferences in receiving marketing from us and our third parties and your communication preferences.",
          ],
          [
            { strong: "Professional Data" },
            " — where you are a worker of ours or applying for a role with us, your professional history such as your previous positions and professional experience.",
          ],
        ],
      },
      {
        type: "p",
        spans: [
          { strong: "Sensitive information" },
          " is a sub-set of personal information that is given a higher level of protection. Sensitive information means information relating to your racial or ethnic origin, political opinions, religion, trade union or other professional associations or memberships, philosophical beliefs, sexual orientation or practices, criminal records, health information or biometric information. We do not actively request sensitive information about you. If at any time we need to collect sensitive information about you, unless otherwise permitted by law, we will first obtain your consent and we will only use it as required or authorised by law.",
        ],
      },

      { type: "h2", text: "How we collect personal information" },
      {
        type: "p",
        text: "We collect personal information in a variety of ways, including:",
      },
      {
        type: "ul",
        items: [
          "when you provide it directly to us, including face-to-face, over the phone, over email, or online;",
          "when you complete a form, such as registering for any events or newsletters, or responding to surveys;",
          "when you use any website we operate (including from any analytics and cookie providers or marketing providers — see the “Cookies” section below for more detail); or",
          "from publicly available sources, such as LinkedIn.",
        ],
      },

      {
        type: "h2",
        text: "Why we collect, hold, use and disclose personal information",
      },
      {
        type: "p",
        text: "We collect, hold, use and disclose your personal information for the following purposes:",
      },
      {
        type: "ul",
        items: [
          "to do business with you and provide you with our services;",
          "to contact and communicate with you about our business, including in response to any support requests you lodge with us or other enquiries you make with us;",
          "to contact and communicate with you about any enquiries you make with us via any website we operate;",
          "for internal record keeping, administrative, invoicing and billing purposes;",
          "for analytics, market research and business development, including to operate and improve our business, associated applications and associated social media platforms;",
          "for advertising and marketing, including to send you promotional information about our events and experiences and information that we consider may be of interest to you;",
          "to run promotions, competitions and/or offer additional benefits to you;",
          "if you have applied for employment with us, to consider your employment application; and",
          "to comply with our legal obligations or if otherwise required or authorised by law.",
        ],
      },

      {
        type: "h2",
        text: "Our disclosures of personal information to third parties",
      },
      {
        type: "p",
        text: "We will only disclose your personal information to third parties where it is necessary as part of our business, where we have your consent, or where permitted by law. This means that we may disclose personal information to:",
      },
      {
        type: "ul",
        items: [
          "our employees, contractors and/or related entities;",
          "IT service providers, data storage, web-hosting and server providers;",
          "marketing or advertising providers;",
          "professional advisors, bankers, auditors, our insurers and insurance brokers;",
          "our existing or potential agents or business partners;",
          "if we merge with, or are acquired by, another company, or sell all or a portion of our assets, your personal information may be disclosed to our advisers and any prospective purchaser's advisers and may be among the assets transferred;",
          "courts, tribunals and regulatory authorities, in the event you fail to pay for goods or services we have provided to you;",
          "courts, tribunals, regulatory authorities and law enforcement officers, as required or authorised by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights;",
          "third parties to collect and process data, such as analytics providers and cookies; and",
          "any other third parties as required or permitted by law, such as where we receive a subpoena.",
        ],
      },
      { type: "h3", text: "Google Analytics" },
      {
        type: "p",
        text: "We have enabled Google Analytics Advertising Features. We and third-party vendors may use first-party cookies (such as the Google Analytics cookie) or other first-party identifiers, and third-party cookies (such as Google advertising cookies) or other third-party identifiers together. These cookies and identifiers may collect Technical and Usage Data about you.",
      },
      {
        type: "p",
        text: "You can opt-out of Google Analytics Advertising Features including using a Google Analytics Opt-out Browser add-on. To opt-out of personalised ad delivery on the Google content network, please visit Google's Ads Preferences Manager, or if you wish to opt-out permanently even when all cookies are deleted from your browser you can install their plugin. To opt out of interest-based ads on mobile devices, please follow these instructions for your mobile device: on Android, open the Google Settings app on your device and select “ads” to control the settings. On iOS devices with iOS 6 and above, use Apple's advertising identifier. To learn more about limiting ad tracking using this identifier, visit the settings menu on your device.",
      },

      { type: "h2", text: "Overseas disclosure" },
      { type: "h3", text: "Australian Residents" },
      {
        type: "p",
        text: "We store your personal information in Australia. Where we disclose your personal information to third parties, those third parties may store, transfer or access personal information outside of Australia. We will only disclose your personal information overseas in accordance with the Australian Privacy Principles.",
      },
      { type: "h3", text: "New Zealand Residents" },
      {
        type: "p",
        text: "Where we disclose your personal information to third parties, those third parties may store, transfer or access personal information outside of New Zealand, which may not have an equivalent level of data protection laws as those in New Zealand. Before disclosing any personal information to an overseas recipient, we will comply with Information Privacy Principle 12 and only disclose the information if:",
      },
      {
        type: "ol",
        items: [
          [
            "you have authorised the disclosure after we expressly informed you that the overseas recipient may not be required to protect the personal information in a way that, overall, provides comparable safeguards to those in the ",
            { em: "Privacy Act 2020" },
            ";",
          ],
          [
            "we believe the overseas recipient is subject to the ",
            { em: "Privacy Act 2020" },
            ";",
          ],
          [
            "we believe that the overseas recipient is subject to privacy laws that, overall, provide comparable safeguards to those in the ",
            { em: "Privacy Act 2020" },
            ";",
          ],
          "we believe that the overseas recipient is a participant in a prescribed binding scheme;",
          "we believe that the overseas recipient is subject to privacy laws in a prescribed country; or",
          [
            "we otherwise believe that the overseas recipient is required to protect your personal information in a way that, overall, provides comparable safeguards to those in the ",
            { em: "Privacy Act 2020" },
            " (for example pursuant to a data transfer agreement entered into between us and the overseas recipient).",
          ],
        ],
      },

      {
        type: "h2",
        text: "Your rights and controlling your personal information",
      },
      { type: "h3", text: "Your choice" },
      {
        type: "p",
        text: "Please read this Privacy Policy carefully. If you provide personal information to us, you understand we will collect, hold, use and disclose your personal information in accordance with this Privacy Policy. You do not have to provide personal information to us, however, if you do not, it may affect our ability to do business with you.",
      },
      { type: "h3", text: "Information from third parties" },
      {
        type: "p",
        text: "If we receive personal information about you from a third party, we will protect it as set out in this Privacy Policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person's consent to provide the personal information to us.",
      },
      { type: "h3", text: "Restrict and unsubscribe" },
      {
        type: "p",
        text: "To object to processing for direct marketing/unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.",
      },
      { type: "h3", text: "Access" },
      {
        type: "p",
        text: "You may request access to the personal information that we hold about you. An administrative fee may be payable for the provision of such information. Please note, in some situations, we may be legally permitted to withhold access to your personal information. If we cannot provide access to your information, we will advise you as soon as reasonably possible and provide you with the reasons for our refusal and any mechanism available to complain about the refusal. If we can provide access to your information in another form that still meets your needs, then we will take reasonable steps to give you such access.",
      },
      { type: "h3", text: "Correction" },
      {
        type: "p",
        text: "If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to promptly correct any information found to be inaccurate, out of date, incomplete, irrelevant or misleading. Please note, in some situations, we may be legally permitted to not correct your personal information. If we cannot correct your information, we will advise you as soon as reasonably possible and provide you with the reasons for our refusal and any mechanism available to complain about the refusal.",
      },
      { type: "h3", text: "Complaints" },
      {
        type: "p",
        text: "If you wish to make a complaint, please contact us using the details below and provide us with full details of the complaint. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take in response to your complaint. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (if you are an Australian resident), or the Office of the New Zealand Privacy Commissioner (if you are a New Zealand resident).",
      },

      { type: "h2", text: "Storage and security" },
      {
        type: "p",
        text: "We are committed to ensuring that the personal information we collect is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures, to safeguard and secure personal information and protect it from misuse, interference, loss and unauthorised access, modification and disclosure.",
      },
      {
        type: "p",
        text: "While we are committed to security, we cannot guarantee the security of any information that is transmitted to or by us over the Internet. The transmission and exchange of information is carried out at your own risk.",
      },

      { type: "h2", text: "Cookies" },
      {
        type: "p",
        text: "We may use cookies on our website from time to time. Cookies are text files placed in your computer's browser to store your preferences. Cookies, by themselves, do not tell us your email address or other personally identifiable information. However, they do recognise you when you return to our online website and allow third parties to cause our advertisements to appear on your social media and online media feeds as part of our retargeting campaigns. If and when you choose to provide our online website with personal information, this information may be linked to the data stored in the cookie.",
      },
      {
        type: "p",
        text: "You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our website.",
      },

      { type: "h2", text: "Links to other websites" },
      {
        type: "p",
        text: "Our website may contain links to other party's websites. We do not have any control over those websites and we are not responsible for the protection and privacy of any personal information which you provide whilst visiting those websites. Those websites are not governed by this Privacy Policy.",
      },

      { type: "h2", text: "Amendments" },
      {
        type: "p",
        text: "We may, at any time and at our discretion, vary this Privacy Policy by publishing the amended Privacy Policy on our website. We recommend you check our website regularly to ensure you are aware of our current Privacy Policy.",
      },

      ...CONTACT_BLOCKS_PRIVACY,
    ],
    footerNote: "© LegalVision ILP Pty Ltd",
  },
];

// ─── Run ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`Migrating ${PAGES.length} legal pages to ${projectId}/${dataset}\n`);

  for (const page of PAGES) {
    console.log(`→ ${page.slug}`);

    const body = buildBody(page.body);

    const doc: IdentifiedSanityDocumentStub = {
      _id: `legal-${page.slug}`,
      _type: "legalPage",
      title: page.title,
      slug: { _type: "slug", current: page.slug },
      metaDescription: page.metaDescription,
      badgeLabel: page.badgeLabel,
      heroHeading: page.heroHeading,
      heroSubhead: page.heroSubhead,
      body,
      footerNote: page.footerNote,
    };

    const clean = Object.fromEntries(
      Object.entries(doc).filter(([, v]) => v !== undefined),
    ) as IdentifiedSanityDocumentStub;

    await client.createOrReplace(clean);
    console.log(`  ✓ ${page.slug}\n`);
  }

  console.log(`Done. ${PAGES.length} legal pages migrated.`);
}

run().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
