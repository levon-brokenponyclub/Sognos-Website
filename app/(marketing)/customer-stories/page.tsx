import Link from "next/link";
import { Clock } from "lucide-react";

export const metadata = {
  title: "Customer Stories — Sognos",
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
  image: string;
  logo: string;
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
    image: "/images/customers/flourish-australia.avif",
    logo: "/logos/flourish-australia-logo.png",
    productLogo: "/logos/sognos-care-logo.svg",
  },
  {
    slug: "auckland-airport",
    company: "Auckland Airport",
    title:
      "Auckland Airport: Expanding Digital Capabilities with Microsoft Dynamics 365 and Power Platform",
    date: "2024-06-10",
    readTime: "4 min read",
    image: "/images/customers/auckland-airport.webp",
    logo: "/logos/auckland-airport-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "penrith-city-council",
    company: "Penrith City Council",
    title:
      "Penrith City Council: Transforming Field Operations with a Custom Dynamics 365 Solution",
    date: "2024-03-20",
    readTime: "3 min read",
    image: "/images/customers/penrith-city-council.png",
    logo: "/logos/penrith-city-council-logo.png",
    productLogo: "/logos/sognos-roster-logo.svg",
  },
  {
    slug: "gentari",
    company: "Gentari Solar Australia",
    title:
      "Gentari Solar Australia: End-to-End Asset Management with Microsoft Dynamics 365 Field Service",
    date: "2024-11-05",
    readTime: "4 min read",
    image: "/images/customers/gentari.webp",
    logo: "/logos/gentari-logo-rect.webp",
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

function StoryCard({ story }: { story: StoryCard }) {
  return (
    <Link
      href={`/customer-stories/${story.slug}`}
      className="group flex flex-col bg-white rounded-lg p-2"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
        <img
          src={story.image}
          alt={story.company}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Logo — customer only, centered */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
          <img
            src={story.logo}
            alt={story.company}
            className="h-14 w-auto max-w-[180px] object-contain brightness-0 invert"
          />
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Meta */}
      <div className="mt-2 shrink-0 bg-gray-200/70 rounded-lg p-7">
        <h3 className="font-heading text-xl lg:text-xl font-medium text-prussian-blue-800 line-clamp-2 leading-normal group-hover:text-prussian-blue-800/70 transition-colors duration-200">
          {story.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-prussian-blue-800/80">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-prussian-blue-800/80" />
            {formatDate(story.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {story.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomersPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-gradient-hero pb-18 pt-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full" />
            Customer Stories
          </div>
          <div className="max-w-3xl text-center">
            <h1 className="mx-auto mb-6 font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
              Real outcomes from real organisations
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80">
              See how organisations across health, transport, local government,
              and energy use Sognos to transform their service operations.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-gray-200/70 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {STORIES.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
