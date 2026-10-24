import Link from "next/link";
import { Clock } from "lucide-react";
import StoryCardImage from "@/components/ui/StoryCardImage";

export const metadata = {
  title: "Customer Stories - Sognos",
  description:
    "See how organisations across health, transport, local government, and energy use Sognos to transform their service operations.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type StoryCard = {
  slug: string;
  company: string;
  title: string;
  date: string;
  readTime: string;
  logo: string;
  /** Brand colours for the card image — sampled from each logo; Auckland
   *  Airport supplied (#141c6b). Confirm the rest against brand guides. */
  brand: string;
  accent?: string;
  productLogo?: string;
};

const STORIES: StoryCard[] = [
  {
    slug: "flourish-australia",
    company: "Flourish Australia",
    title:
      "Flourish Australia: Transforming Service Operations with Microsoft Dynamics 365",
    date: "2024-08-13",
    readTime: "5 min read",
    logo: "/logos/flourish-australia-logo.png",
    brand: "#01a77f",
    accent: "#9be3c9",
    productLogo: "/logos/sognos-care-logo.svg",
  },
  {
    slug: "auckland-airport",
    company: "Auckland Airport",
    title:
      "Auckland Airport: Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform",
    date: "2024-06-10",
    readTime: "4 min read",
    logo: "/logos/auckland-airport-logo.png",
    brand: "#141c6b",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "penrith-city-council",
    company: "Penrith City Council",
    title:
      "Penrith City Council: Transforming Field Operations with a Custom Dynamics 365 Solution",
    date: "2024-03-20",
    readTime: "3 min read",
    logo: "/logos/penrith-city-council-logo.png",
    brand: "#f66622",
    accent: "#ffc29f",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "gentari",
    company: "Gentari Solar Australia",
    title:
      "Gentari Solar Australia: End-to-End Asset Management with Microsoft Dynamics 365 Field Service",
    date: "2024-11-05",
    readTime: "4 min read",
    logo: "/logos/gentari-logo-rect.webp",
    brand: "#3b1a6e",
    accent: "#02c9e9",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "all-purpose-pumps",
    company: "All Purpose Pumps",
    title:
      "All Purpose Pumps: From System Repair to Strategic Technology Partnership",
    date: "2024-05-15",
    readTime: "4 min read",
    logo: "/logos/all-purpose-pumps-logo.webp",
    brand: "#e68220",
    accent: "#ffd9a8",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "asset-security-concepts",
    company: "Asset Security Concepts",
    title:
      "Asset Security Concepts: A Unified Platform for Growth with Dynamics 365 and Business Central",
    date: "2024-04-22",
    readTime: "4 min read",
    logo: "/logos/asc-logo.webp",
    brand: "#0569a5",
    accent: "#7cc4ee",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "neca",
    company: "NECA",
    title:
      "NECA: Transforming Operations with Microsoft Dynamics 365 and Power Platform",
    date: "2024-02-10",
    readTime: "4 min read",
    logo: "/logos/neca-logo.webp",
    brand: "#035dad",
    accent: "#7fb3e6",
  },
  {
    slug: "natural-power-solutions",
    company: "Natural Power Solutions",
    title:
      "Natural Power Solutions: End-to-End Digital Transformation with Dynamics 365",
    date: "2024-01-18",
    readTime: "4 min read",
    logo: "/logos/nps-logo.webp",
    brand: "#0269b3",
    accent: "#f0b400",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Card ─────────────────────────────────────────────────────────────────────

// Archive card. No card surface — image, mono meta row, title, Read More,
// sitting directly on the section background.
function StoryCard({ story }: { story: StoryCard }) {
  return (
    <Link
      href={`/customer-stories/${story.slug}`}
      className="group flex flex-col"
    >
      <StoryCardImage
        logo={story.logo}
        company={story.company}
        brand={story.brand}
        accent={story.accent}
        className="aspect-[16/9]"
      />

      <div className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sognos-muted">
        <span className="border border-sognos-line px-2 py-1">
          Customer Story
        </span>
        <span>{formatDate(story.date)}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <Clock size={12} aria-hidden="true" />
          {story.readTime}
        </span>
      </div>

      <h3 className="mt-3 font-heading text-lg lg:text-xl font-normal leading-snug tracking-tight text-sognos-heading text-balance transition-colors duration-200 group-hover:text-sognos-blue-accent">
        {story.title}
      </h3>

      <span className="mt-4 text-sm font-medium text-sognos-body transition-colors duration-200 group-hover:text-sognos-blue-accent">
        Read More{" "}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

// ─── Featured list item (right column) ────────────────────────────────────────

// One card for all three featured slots so they read as a family. The lead
// stacks image over text; the other two run image-left / text-right. Grid rows
// are auto, so the lead's image flexes to match the two stacked beside it.
function FeaturedCard({
  story,
  lead = false,
}: {
  story: StoryCard;
  lead?: boolean;
}) {
  return (
    <Link
      href={`/customer-stories/${story.slug}`}
      className={`group flex h-full ${
        lead ? "flex-col" : "flex-col lg:flex-row"
      }`}
    >
      <StoryCardImage
        logo={story.logo}
        company={story.company}
        brand={story.brand}
        accent={story.accent}
        className={
          lead
            ? "min-h-[16rem] flex-1 lg:min-h-[26rem]"
            : "aspect-[16/9] w-full shrink-0 lg:aspect-auto lg:h-full lg:w-1/2"
        }
      />

      {/* Text column — under the image on the lead, beside it on the other two */}
      <div
        className={
          lead
            ? "mt-5"
            : "mt-5 flex min-w-0 flex-1 flex-col justify-center lg:mt-0 lg:pl-5"
        }
      >
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sognos-muted">
          <span className="border border-sognos-line px-2 py-1">
            Customer Story
          </span>
          <span>{formatDate(story.date)}</span>
        </div>

        <h3
          className={`mt-3 font-heading font-normal leading-snug tracking-tight text-sognos-heading text-balance transition-colors duration-200 group-hover:text-sognos-blue-accent ${
            lead ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
          }`}
        >
          {story.title}
        </h3>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FEATURED_COUNT = 3;

export default function CustomersPage() {
  // First three for now — a `featured` flag in Sanity replaces this later.
  const [featuredLead, ...featuredRest] = STORIES.slice(0, FEATURED_COUNT);
  // Archive excludes whatever the featured block already showed.
  const rest = STORIES.slice(FEATURED_COUNT);

  return (
    <>
      {/* Hero — headline and subcopy match the Knowledge Hub treatment, then a
          featured block: one lead story left, the remaining two stacked right. */}
      <section className="bg-white pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-heading font-normal text-sognos-heading text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
            Customer Stories
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sognos-body">
            See how organisations across health, transport, local government,
            and energy use Sognos to transform their service operations.
          </p>

          {/* Two equal columns, two rows; the lead spans both on the left.
              Rows are auto rather than the fixed heights the reference uses —
              titles here run to three lines and would clip. The lead's image
              flexes instead, so its card still matches the column height. */}
          <div className="mt-16 grid gap-3 lg:mt-20 lg:grid-cols-2 lg:grid-rows-2 lg:gap-4">
            <div className="lg:row-span-2">
              <FeaturedCard story={featuredLead} lead />
            </div>
            {featuredRest.map((story) => (
              <FeaturedCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 font-heading text-center text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
            Explore more stories
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
