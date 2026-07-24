import Image from "next/image";
import Link from "next/link";
import {
  ClipboardCheck,
  FileText,
  Headphones,
  MapPinned,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PRODUCTS } from "@/lib/constants";

type PlatformProduct = {
  name: string;
  href?: string;
  byline: string;
  description: string;
  logo: string;
  bgImage: string;
  accent: string;
};

const PRODUCTS_DEPLOYED: PlatformProduct[] = [
  {
    name: PRODUCTS.care.name,
    href: PRODUCTS.care.href,
    byline: "One platform. From intake to outcome.",
    description:
      "Care operations, compliance records, funding rules, and service delivery workflows connected in one Dynamics 365 foundation.",
    logo: "/logos/sognos-care-logo.svg",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1663089870095-c231a534ac31?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#1d96fc",
  },
  {
    name: PRODUCTS.roster.name,
    href: PRODUCTS.roster.href,
    byline: "The right worker, for every job, in real time.",
    description:
      "Scheduling, routing, skill matching, availability, and compliance checks brought into the same operational data layer.",
    logo: "/logos/sognos-roster-logo.svg",
    bgImage: "/images/home/industries/industrial-services.jpg",
    accent: "#59bbf7",
  },
  {
    name: PRODUCTS.genogram.name,
    href: PRODUCTS.genogram.href,
    byline: "Family context built into every record.",
    description:
      "Relationship maps, support networks, and case context available directly inside the records your teams already use.",
    logo: "/logos/SognosGenogram-logo.svg",
    bgImage:
      "https://images.unsplash.com/photo-1674629358478-bff878ed9727?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#91278c",
  },
];

const PRODUCT_META: Record<string, PlatformProduct> = {
  SognosCare: {
    name: PRODUCTS.care.name,
    href: PRODUCTS.care.href,
    byline: PRODUCTS.care.tagline,
    description: PRODUCTS.care.description,
    logo: "/logos/sognos-care-logo.svg",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1663089870095-c231a534ac31?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#1d96fc",
  },
  SognosRoster: {
    name: PRODUCTS.roster.name,
    href: PRODUCTS.roster.href,
    byline: PRODUCTS.roster.tagline,
    description: PRODUCTS.roster.description,
    logo: "/logos/sognos-roster-logo.svg",
    bgImage: "/images/home/industries/industrial-services.jpg",
    accent: "#59bbf7",
  },
  "SognosGenogram": {
    name: PRODUCTS.genogram.name,
    href: PRODUCTS.genogram.href,
    byline: PRODUCTS.genogram.tagline,
    description: PRODUCTS.genogram.description,
    logo: "/logos/SognosGenogram-logo.svg",
    bgImage:
      "https://images.unsplash.com/photo-1674629358478-bff878ed9727?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#91278c",
  },
};

const USE_CASES = [
  { label: "Customer service", icon: Headphones },
  { label: "Referral intake", icon: FileText },
  { label: "Workforce scheduling", icon: Users },
  { label: "Care delivery", icon: ClipboardCheck },
  { label: "Field operations", icon: MapPinned },
  { label: "Compliance reporting", icon: ShieldCheck },
  { label: "System integration", icon: Network },
];

function ProductCard({ product }: { product: PlatformProduct }) {
  const card = (
    <div className="relative isolate h-full min-h-[430px] overflow-hidden rounded-lg bg-black">
      <Image
        src={product.bgImage}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="scale-105 object-cover object-center opacity-80 transition-[scale,filter] duration-800 motion-safe:group-hover:scale-100 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-sognos-navy-dark/45 transition-colors duration-500 group-hover:bg-sognos-navy-dark/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

      <div className="relative z-10 flex h-full min-h-[430px] flex-col p-8 md:p-9">
        <div className="max-w-sm">
          <Image
            src={product.logo}
            alt={product.name}
            width={180}
            height={44}
            className="h-10 w-auto max-w-[200px] object-contain brightness-0 invert"
          />
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            {product.byline}
          </p>
        </div>

        <div className="mt-auto pr-16">
          <p className="text-base leading-relaxed text-white/75">
            {product.description}
          </p>
        </div>

        <div className="absolute right-6 bottom-6">
          <div className="relative isolate flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
              style={{ backgroundColor: product.accent }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="relative text-white"
            >
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product.href) return card;

  return (
    <Link href={product.href} className="group block h-full">
      {card}
    </Link>
  );
}

export default function IndustryPlatformSection({
  industryName,
  productNames,
}: {
  industryName: string;
  productNames: readonly string[];
}) {
  const industryProductCards = productNames
    .map((name) => PRODUCT_META[name])
    .filter((product): product is PlatformProduct => Boolean(product));

  const cards = PRODUCTS_DEPLOYED.map(
    (product) =>
      industryProductCards.find((item) => item.name === product.name) ??
      product,
  );

  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
        <h2 className="font-heading text-4xl font-normal leading-[1.08] tracking-tight text-white/80 text-balance md:text-5xl">
          <span className="text-white">One platform to run {industryName}</span>{" "}
          end-to-end
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}

        <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-lg bg-sognos-navy-dark p-6 text-center md:flex-row md:gap-4">
          <h3 className="shrink-0 font-heading text-2xl font-medium leading-tight tracking-tight text-white">
            Built on Dynamics 365 Field Service
          </h3>
          <p className="text-base leading-relaxed text-white/65 md:text-lg">
            Built on Microsoft Dynamics 365 Field Service, with Copilot AI for
            intelligent scheduling and Power Platform for workflow automation
            and reporting.
          </p>
        </div>

        <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-lg bg-sognos-navy-dark p-6 text-center md:flex-row md:gap-4">
          <h3 className="shrink-0 font-heading text-2xl font-medium leading-tight tracking-tight text-white">
            Connected across Microsoft Cloud
          </h3>
          <p className="text-base leading-relaxed text-white/65 md:text-lg">
            Sognos connects Dynamics 365, Dataverse, Power Apps, Power
            Automate, Power BI, and secure integration patterns into one
            governed operating platform.
          </p>
        </div>

        <div className="col-span-full mt-10 flex flex-col gap-8 text-center lg:mt-14">
          <h3 className="font-heading text-3xl font-normal leading-tight tracking-tight text-white">
            Example use cases
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:justify-center">
            {USE_CASES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-left text-base font-medium leading-relaxed text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.055] text-white/80">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
