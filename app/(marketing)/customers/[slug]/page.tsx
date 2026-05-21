import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SidebarField = {
  label: string;
  value: string;
};

type CustomerStory = {
  company: string;
  description: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  logo?: string;
  productLogo?: string;
  quote?: string;
  quoteAuthor?: string;
  sidebar: SidebarField[];
  body: React.ReactNode;
};

// ─── Stories ──────────────────────────────────────────────────────────────────

const STORIES: Record<string, CustomerStory> = {
  "flourish-australia": {
    company: "Flourish Australia",
    description:
      "Leading not-for-profit organisation supporting people with lived experience of mental health issues to live fulfilling, independent lives.",
    title:
      "Flourish Australia: Transforming Service Operations with Microsoft Dynamics 365",
    date: "2024-08-13",
    readTime: "5 min read",
    image: "/images/customers/flourish-australia.avif",
    logo: "/logos/flourish-australia-logo.png",
    productLogo: "/logos/sognos-care-logo.svg",
    quote:
      "Congratulations and WELL DONE to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud — THANK YOU!",
    quoteAuthor: "Susan McCarthy, Chief Operating Officer — Flourish Australia",
    sidebar: [
      { label: "Industry", value: "Healthcare — Mental Health" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "1,100+ staff" },
      { label: "Product", value: "SognosCare" },
    ],
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Flourish Australia is a leading not-for-profit organisation supporting
          people with lived experience of mental health issues to live
          fulfilling, independent lives. With more than 1,100 staff across
          Australia, Flourish delivers a wide range of community-based services,
          employment support, and recovery-focused programs.
        </p>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Situation
        </h2>
        <p>
          Flourish Australia's legacy Client Information Management System
          (CIMS) had reached end of life and was no longer meeting the
          organisation's needs. The team was dealing with significant
          administrative overhead caused by double handling of data and manual
          processes. Non-standard processes and poor data quality were impacting
          funder reporting and participant support, while multiple siloed
          systems were managing critical operational and service-delivery
          functions with no unified view.
        </p>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Solution
        </h2>
        <p>
          Flourish Australia partnered with Sognos to design and implement a
          modern, cloud-based solution built on Microsoft Dynamics 365 and Power
          Platform. The new system — known internally as{" "}
          <em>Flourish Connect</em> — serves as the central operational platform
          for the organisation, consolidating multiple business functions into a
          single source of truth.
        </p>
        <p>
          Flourish Connect manages everything from support operations and
          stakeholder engagement to participant self-service, marketing, and
          feedback management — delivering seamless visibility tailored to each
          user's role and context.
        </p>
        <p>Key capabilities delivered include:</p>
        <ul>
          <li>
            Configurable modules for Enquiry, Intake, Support Delivery, Billing,
            and Claiming — integrated with the NDIS PRODA Portal
          </li>
          <li>
            Custom Program Profiles and Assessment Tools to support program
            flexibility and future growth
          </li>
          <li>
            Advanced reporting using SSRS and Power BI for accurate funder and
            stakeholder insights
          </li>
          <li>
            Seamless integration with T1-HR, T1-Finance, Emplive Payroll, and
            Rostering systems
          </li>
          <li>
            Stakeholder and Participant Insights dashboards for Sales and
            Continuous Improvement teams
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Impact
        </h2>
        <p>
          The implementation has delivered measurable improvements across the
          organisation:
        </p>
        <ul>
          <li>
            Supporting over 1,100 users across the Flourish Australia network
          </li>
          <li>
            A single source of truth for all operational and reporting needs,
            eliminating the data silos that previously hampered decision-making
          </li>
          <li>
            Significant reduction in redundant manual steps, improving team
            productivity and freeing time for direct participant support
          </li>
          <li>
            High configurability that allows Flourish to adapt and extend the
            solution as organisational needs evolve
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Looking Ahead
        </h2>
        <p>
          With Dynamics 365 and Power Platform at its core, Flourish Australia
          now has a unified digital foundation to support innovation, continuous
          improvement, and sustainable growth — ensuring technology keeps pace
          with its mission to support mental health recovery across Australia.
        </p>
      </div>
    ),
  },

  "auckland-airport": {
    company: "Auckland Airport",
    description:
      "New Zealand's largest and busiest airport, serving as a critical gateway for international and domestic travel and freight.",
    title:
      "Auckland Airport: Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform",
    date: "2024-06-10",
    readTime: "4 min read",
    image: "/images/customers/auckland-airport.webp",
    logo: "/logos/auckland-airport-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "Thank you to the Sognos team — hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    quoteAuthor: "Anthony Hart, Operations Delivery Lead — Auckland Airport",
    sidebar: [
      { label: "Industry", value: "Transport" },
      { label: "State", value: "Auckland, New Zealand" },
      { label: "Size", value: "350+ staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Auckland Airport is New Zealand's largest and busiest airport, serving
          as a critical gateway for international and domestic travel and
          freight. As a key piece of national infrastructure, the airport is
          committed to innovation and operational excellence to meet the
          evolving needs of passengers, airlines, and stakeholders.
        </p>
        <p>
          Following a successful Dynamics 365 implementation, Auckland Airport
          engaged Sognos as their strategic Microsoft Dynamics 365 partner to
          drive continuous improvement and progressively expand platform
          capabilities across Dynamics 365 and Power Platform — replacing legacy
          applications with modern, cloud-based tools.
        </p>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Situation
        </h2>
        <ul>
          <li>System reaching end of life with a tight delivery timeline</li>
          <li>
            Central system for Operations and Engineering Services to manage
            faults across all engineering assets
          </li>
          <li>
            Manual rules and processes for managing and scheduling faults — from
            inception through cost recovery and regulatory reporting
          </li>
          <li>
            Legacy system siloed from GIS, EAM, Incident Management, Risk
            Management, Finance, and Emergency Management systems
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Solution
        </h2>
        <ul>
          <li>
            Custom-built scheduling workflow to automatically assign jobs for
            asset fault management and maintenance based on fault type,
            priority, and technician capabilities and skillsets
          </li>
          <li>
            End-to-end Fault Management solution built on Dynamics 365 Field
            Service — managing faults from logging, diagnosis, auto-routing,
            scheduling, and mobile capture through to cost recovery and
            regulatory reporting
          </li>
          <li>
            Integrated with JDE CAM, IMPAC Risk Management, Incident Management,
            ArcGIS, and Emergency Management systems
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Impact
        </h2>
        <ul>
          <li>System delivered within timeline and budget</li>
          <li>
            100% business and end-user adoption of the newly implemented system
          </li>
          <li>
            The entire Operations and Engineering Services team now uses the
            platform to manage all engineering assets across Airside and
            Landside
          </li>
          <li>
            End-to-end integrated system eliminating silos across six previously
            disconnected platforms
          </li>
          <li>
            Continuous Improvement mode established — with ongoing investment in
            new features and capability expansion
          </li>
        </ul>
      </div>
    ),
  },

  "penrith-city-council": {
    company: "Penrith City Council",
    description:
      "Local government council in New South Wales, Australia, transforming field operations management with a custom Dynamics 365 solution.",
    title:
      "Penrith City Council: Transforming Field Operations with a Custom Dynamics 365 Solution",
    date: "2024-03-20",
    readTime: "3 min read",
    image: "/images/customers/penrith-city-council.png",
    logo: "/logos/penrith-city-council-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    quoteAuthor:
      "Claire Donovan, Service Delivery Manager — Penrith City Council",
    sidebar: [
      { label: "Industry", value: "City Council — Public Sector" },
      { label: "State", value: "New South Wales, Australia" },
      { label: "Size", value: "300 Technicians" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Deloitte Digital subcontracted Sognos to deliver a fully custom
          solution for Penrith City Council, enabling their Field Operations
          team to manage day-to-day Resource Crew movements — a task that had
          previously consumed significant coordinator time with no guarantee of
          data accuracy.
        </p>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Situation
        </h2>
        <ul>
          <li>
            Entirely manual process to move team members between crews —
            coordinators previously refused to use the Field Service solution
            due to excessive manual overhead
          </li>
          <li>
            Each movement required manually creating and cancelling jobs, taking
            at least 25 minutes per movement with no accuracy guarantee
          </li>
          <li>No reliable tracking of movements, jobs, or timesheets</li>
          <li>
            End-to-end chaos between field technicians, coordinators, and the
            back-office team
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Solution
        </h2>
        <ul>
          <li>
            Custom workflows to automatically manage jobs when team members move
            across different crews
          </li>
          <li>
            A custom 3-click interface for coordinators to record movements — a
            task that previously took 25+ minutes now completed in under 10
            seconds
          </li>
          <li>
            Custom Day Sheet Report providing coordinators with full visibility
            of day-to-day operations
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Impact
        </h2>
        <ul>
          <li>
            Coordinators who had previously refused the solution now actively
            use it
          </li>
          <li>
            Accurate timesheets and time entries generated automatically through
            workflow automation
          </li>
          <li>
            Drastic increase in coordinator productivity — all manual operations
            eliminated
          </li>
        </ul>
      </div>
    ),
  },

  gentari: {
    company: "Gentari Solar Australia",
    description:
      "Clean energy leader accelerating the transition to net zero, managing large-scale solar farms and over 10,000 individual assets across Australia.",
    title:
      "Gentari Solar Australia: End-to-End Asset Management with Microsoft Dynamics 365 Field Service",
    date: "2024-11-05",
    readTime: "4 min read",
    image: "/images/customers/gentari.webp",
    logo: "/logos/gentari-logo-rect.webp",
    productLogo: "/logos/sognos-roster-logo.svg",
    quote:
      "Dynamics 365 Field Service has not disappointed us in any of our key requirements. It has been over a year for us to use the system and the techs love it, and so do we.",
    quoteAuthor: "Operations Team — Gentari Solar Australia",
    sidebar: [
      { label: "Industry", value: "Renewable Energy" },
      { label: "State", value: "National, Australia" },
      { label: "Size", value: "30–50 staff" },
      { label: "Product", value: "SognosRoster" },
    ],
    body: (
      <div className="prose prose-lg max-w-none text-sognos-text-body">
        <p>
          Gentari Solar Australia, formerly known as Wirsol Energy, is a clean
          energy leader focused on accelerating the transition to net zero.
          Across Australia, Gentari owns and operates large-scale solar farms,
          managing over 10,000 individual assets spread across multiple sites.
          With a mix of in-house technicians and subcontractor teams, Gentari
          required a modern platform to track preventive maintenance, streamline
          workflows, and provide real-time field visibility.
        </p>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Challenge
        </h2>
        <ul>
          <li>Full asset history visibility needed for each component</li>
          <li>
            Automated maintenance scheduling required to reduce manual admin
          </li>
          <li>
            Mobile-friendly tools needed for technicians across remote sites
          </li>
          <li>
            A single platform required to replace manual processes and
            disconnected systems
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Solution
        </h2>
        <p>
          Partnering with Sognos, Gentari implemented Microsoft Dynamics 365
          Field Service — delivering a connected, end-to-end platform that:
        </p>
        <ul>
          <li>Centralises asset records and service histories</li>
          <li>Automates preventive maintenance routines</li>
          <li>Enables real-time data capture via mobile devices</li>
          <li>Improves scheduling efficiency and operational oversight</li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          The Results
        </h2>
        <ul>
          <li>
            Improved efficiency through automation of routine maintenance tasks
          </li>
          <li>
            Higher technician satisfaction, with easy-to-use mobile tools in the
            field
          </li>
          <li>
            Complete operational visibility from asset record to service history
          </li>
          <li>Better decision-making with data captured in real time</li>
        </ul>

        <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800 my-3">
          Looking Ahead
        </h2>
        <p>
          With Sognos as their strategic technology partner, Gentari continues
          to expand the capabilities of their Dynamics 365 platform — replacing
          legacy systems, improving workflows, and unlocking new opportunities
          for innovation in renewable energy operations.
        </p>
      </div>
    ),
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${day}${suffix} ${d.toLocaleDateString("en-AU", { month: "long" })} ${d.getFullYear()}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = STORIES[slug];

  if (!story) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl text-prussian-blue-800">
            Story not found
          </p>
          <Link
            href="/customers"
            className="mt-4 inline-block text-sm text-brand hover:underline"
          >
            Back to Customer Stories
          </Link>
        </div>
      </main>
    );
  }

  const postUrl = `https://sognos.com.au/customers/${slug}`;

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gray-200/70 pb-12 pt-14 md:pb-18 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:justify-between lg:gap-40">
            {/* Left */}
            <div className="lg:w-1/2 lg:max-w-[32.5rem]">
              {/* Back */}
              <Link
                href="/customers"
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-prussian-blue-800/60 transition-colors hover:text-prussian-blue-800"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to Customer Stories
              </Link>

              {/* Title */}
              <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight text-prussian-blue-800 lg:text-4xl xl:text-4xl">
                {story.title}
              </h1>

              {/* Author + share */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-14">
                {/* Company logo / name */}
                {/* Category + date */}
                <div className="mb-5 flex items-center gap-3">
                  {/* <span className="inline-flex items-center rounded border border-prussian-blue-800/20 bg-prussian-blue-800/5 px-2 py-1 text-xs font-medium text-prussian-blue-800">
                    Customer Story
                  </span> */}
                  <span className="text-sm text-prussian-blue-800/60">
                    {formatDate(story.date)}
                  </span>
                </div>

                {/* Share */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-prussian-blue-800/60">
                    Share
                  </span>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M7.44 5C7.44 5.81 6.95 6.55 6.19 6.85 5.44 7.16 4.57 6.98 4.01 6.39 3.44 5.81 3.28 4.94 3.61 4.19 3.94 3.45 4.69 2.98 5.5 3c1.08.03 1.94.92 1.94 2ZM7.5 8.48H3.5V21h4V8.48Zm6.32 0H9.84V21h3.82v-6.57c0-3.66 4.77-3.96 4.77 0V21H22.5v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${postUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
                    aria-label="Share on X"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 21 20"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M15.67 1.875H18.43L12.4 8.758l7.09 9.367h-5.55L9.6 12.444l-4.97 5.681H1.87l6.44-7.363L1.51 1.875H7.2l3.93 5.192 4.54-5.192Zm-.97 15.6h1.53L6.37 3.438H4.73l10.97 14.037Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2H17.5V2.14C17.17 2.1 15.94 2 14.64 2 11.93 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Dotted divider */}
              <div className="mt-5 border-t border-dashed border-prussian-blue-800/20" />
            </div>

            {/* Right — image */}
            <div className="overflow-hidden rounded-lg h-100 max-h-100 w-full lg:w-1/2 lg:shrink-0 relative flex flex-col">
              <img
                src={story.image}
                alt={story.company}
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 35vw"
              />
              {/* Logos — left: product + customer */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
                <div className="flex items-center gap-6">
                  <img
                    src={story.productLogo ?? "/logos/sognos-logo.svg"}
                    alt="Sognos product"
                    className="h-14 w-auto object-contain brightness-0 invert"
                  />
                  {story.logo && (
                    <>
                      <span className="text-5xl font-regular font-heading text-white">
                        +
                      </span>
                      <img
                        src={story.logo}
                        alt={story.company}
                        className="h-14 w-auto max-w-[190px] object-contain brightness-0 invert"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Gradient overlay — top dark fading down + bottom dark fading up */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      {story.quote && (
        <section className="bg-brand py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <blockquote>
              <p className="font-heading text-lg lg:text-[26px] font-normal leading-snug tracking-tight text-white">
                &ldquo;{story.quote}&rdquo;
              </p>
              {story.quoteAuthor && (
                <footer className="mt-6 text-sm font-semibold text-white/80">
                  {story.quoteAuthor}
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:pb-32 lg:pt-16">
        <div className="grid grid-cols-2 gap-22 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-25 lg:self-start max-w-65 w-65">
            <div className="">
              <h3 className="font-heading text-xl lg:text-xl font-medium text-prussian-blue-800">
                {story.company}
              </h3>
              <p className="mt-3 text-md leading-relaxed text-sognos-body">
                {story.description}
              </p>

              <div className="my-6 h-px bg-neutral-200" />

              <div className="space-y-5">
                {story.sidebar.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="shrink-0 text-sm text-prussian-blue-800">
                      {field.label}
                    </span>
                    <span className="text-right text-sm text-sognos-body">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Article body */}
          <div className="flex-1">{story.body}</div>
        </div>
      </div>
    </main>
  );
}
