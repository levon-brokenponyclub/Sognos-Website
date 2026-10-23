// No longer a Client Component: the stepper's state went with it, and the only
// interactive part left is TimerCardDeck, which owns its own client boundary.
import Image from "next/image";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";
import TimerCardDeck, {
  type TimerCard,
} from "@/components/layout/sections/shared/TimerCardDeck";

// Matches the reference's 8s dwell rather than the 5s this section used, since
// the deck's countdown ring now shows the interval and 5s reads as hurried at
// that size.
const STEP_DURATION = 8000;

const BLOCKS = [
  {
    title: "Manage demand",
    label: "Intake and triage",
    copy: "Built for care teams delivering complex services across communities, homes and frontline environments.",
    href: "/products/sognoscare",
    image: "/images/how-it-works/howitworks01.webp",
    // Test: step one's panel is a Lottie rather than the still. The JSON is
    // 1440×1024 against a 2.79:1 panel, so it letterboxes until one or the
    // other is re-cut — see the changelog.
    animation: "/animations/hiw01.json",
  },
  {
    title: "Coordinate workforce",
    label: "Planning and delivery",
    copy: "Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field.",
    href: "/products/sognosroster",
    image: "/images/how-it-works/howitworks02.webp",
  },
  {
    title: "Track outcomes",
    label: "Insight and improvement",
    copy: "Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people.",
    href: "/solutions/customer-insights",
    image: "/images/how-it-works/howitworks03.webp",
  },
] as const;

// The deck's own shape. `label` is now unused — it existed only for the
// stepper — but is left on BLOCKS as the copy is worth keeping if a labelled
// treatment returns.
const CARDS: readonly TimerCard[] = BLOCKS.map((b, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: b.title,
  description: b.copy,
  // No `href`, so no "Learn more". `TimerCardDeck` renders that link only when
  // a card carries one, so dropping it here removes the CTA from these cards
  // without touching the deck — which ProductCustomerStories and LottiePanel
  // also use. `href` stays on BLOCKS, so this is one line to put back.
  // href: b.href,
  // Alt is the step it illustrates — the panel is not decorative, it is the
  // slide's content.
  image: { src: b.image, alt: b.title },
  animation: "animation" in b ? { src: b.animation } : undefined,
}));

export default function HowSognosWorks() {
  return (
    <section className="w-full bg-sognos-tint py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center flex flex-col gap-4">
          <AnimatedEyebrow className="justify-center">
            How Sognos works
          </AnimatedEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-5xl">
            Healthcare First. Field Services Always. AI at the Centre.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-normal text-sognos-body md:text-lg">
            One connected process takes service demand from first contact to
            coordinated delivery and measurable outcomes.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-prussian-blue-800/10 px-4 py-3 sm:gap-5 sm:px-6">
              <Image
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                width={96}
                height={96}
                className="h-11 w-auto"
              />
              <div
                aria-hidden="true"
                className="h-8 w-px bg-sognos-navy/30"
              />
              <Image
                src="/logos/Microsoft-Solutions-Partner-Logo.webp"
                alt="Microsoft Solutions Partner"
                width={480}
                height={113}
                className="h-22 w-auto"
              />
              <div
                aria-hidden="true"
                className="h-8 w-px bg-sognos-navy/30"
              />
              <Image
                src="/logos/copilot-logo.svg"
                alt="Microsoft Copilot"
                width={128}
                height={128}
                className="h-11 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Auto-advancing deck after middesk.com. The deck owns its own timing
            and active state now that the stepper it used to drive is gone. */}
        <div className="mt-10 md:mt-12 lg:mt-16">
          {/* All three panel images are 2720×976 — the panel takes their own
              ratio so nothing is cropped. */}
          <TimerCardDeck
            cards={CARDS}
            autoplayMs={STEP_DURATION}
            panelAspect="2720 / 976"
          />
        </div>
      </div>
    </section>
  );
}
