"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";

const FORM_URL =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=dIv2xQ42w0yPgwCF_6izmX_i53x-rohEmvUHAV32Ee5UNEZXVEpVQVZLWkVaUTJCSk5GMTg1Q1pESy4u&route=shorturl";
const DIGPACKS_URL = "https://www.digpacks.co.uk/knowledge-base/asset-booker/";
const IMAGE = "/images/digpacks/Asset-Booker.jpg";
const IMAGE_ALT = "Asset Booker resource booking interface";
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const FOCUS_DARK =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-digpacks-base";

const noopSubscribe = () => () => {};

// ── Booking motion graphic (mockup: asset_booker.py) ─────────────────────────
// Loop every 1.5s: resource selected → 10:30 slot picked → booked toast →
// next resource. Runs once in view; static "booked" state under reduced motion.
const RESOURCES = [
  ["Desk", "Desk 2.14 · Second floor"],
  ["Meeting room", "Room 3B · 6 seats"],
  ["Parking", "Bay 12 · Level -1"],
  ["Equipment", "Projector kit 04"],
] as const;
const SLOTS = [
  ["09:00 - 10:30", "Booked"],
  ["10:30 - 12:00", "Available"],
  ["14:00 - 16:00", "Available"],
] as const;

function BookingGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const still = !!useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView || still) return;
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, [inView, still]);
  const step = still ? 2 : tick % 4;
  const res = still ? 0 : Math.floor(tick / 4) % RESOURCES.length;
  const picked = step === 1 || step === 2;
  const name = RESOURCES[res][1];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative w-full max-w-md rounded border border-sognos-line bg-white p-5 text-left"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-sognos-heading">
          Asset Booker &middot; Book a resource
        </p>
        <span className="text-xs text-sognos-muted">Mon 5 Jan</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {RESOURCES.map(([label], i) => (
          <span
            key={label}
            className={`rounded-full border px-3 py-1 text-xs transition-colors duration-300 motion-reduce:transition-none ${
              i === res
                ? "border-sognos-digpacks-base bg-sognos-digpacks-base text-white"
                : "border-sognos-line text-sognos-heading"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-sognos-muted">Selected</p>
      <p className="font-heading text-xl text-sognos-heading">{name}</p>
      <ul className="mt-3 space-y-1.5">
        {SLOTS.map(([time, state], i) => {
          const on = i === 1 && picked;
          return (
            <li
              key={time}
              className={`flex items-center justify-between gap-3 rounded border px-3 py-2 transition-colors duration-300 motion-reduce:transition-none ${
                on
                  ? "border-sognos-digpacks-base bg-sognos-digpacks-soft"
                  : "border-sognos-line"
              }`}
            >
              <span className="text-sm tabular-nums text-sognos-heading">
                {time}
              </span>
              <span
                className={`text-xs ${
                  state === "Booked"
                    ? "text-sognos-muted"
                    : on && step === 2
                      ? "text-sognos-digpacks-ink"
                      : "text-emerald-700"
                }`}
              >
                {on && step === 2 ? "Booked \u2713" : state}
              </span>
            </li>
          );
        })}
      </ul>
      <div
        className={`absolute inset-x-5 -bottom-5 flex items-center gap-3 rounded bg-sognos-digpacks-dark px-4 py-3 text-white transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          step === 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
          &#10003;
        </span>
        <span className="text-xs">{name} booked &middot; 10:30</span>
      </div>
    </div>
  );
}

// Right-side panel (Products Inspector mockup): DigPacks header with close,
// scrolling body, and a "Find out more" foot that stays in view. Fading
// backdrop, spring panel, body scroll locked, Esc closes, focus goes to the
// close button and back to the trigger. Portalled to <body>: the section sits
// in a transformed ScrollReveal, which would trap a `fixed` overlay.
function AssetBookerDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, onClose]);

  // Client-only (no portal target on the server); avoids a hydration mismatch.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="asset-booker-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-sognos-navy-dark/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="asset-booker-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-sognos-line px-6 py-4">
              <Image
                src="/images/digpacks/digpacks-logo-full.webp"
                alt="DigPacks"
                width={1470}
                height={353}
                className="h-7 w-auto"
              />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className={`flex size-10 items-center justify-center rounded-full bg-sognos-tint text-sognos-heading transition-colors hover:bg-sognos-line ${FOCUS_DARK}`}
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-10">
              <h2
                id="asset-booker-title"
                className="font-heading text-3xl font-normal tracking-tight text-sognos-heading"
              >
                What is Asset Booker?
              </h2>
              <p className={`mt-4 ${TYPE.body} text-sognos-body`}>
                Asset Booker is a simple resource booking solution designed to
                help organisations manage shared spaces, equipment and other
                bookable assets in one place. Teams can check availability and
                book desks, meeting rooms, clinical spaces, equipment, parking
                and other shared resources, while administrators get better
                visibility over bookings and utilisation.
              </p>
              <p className={`mt-4 ${TYPE.body} text-sognos-body`}>
                It helps reduce double bookings, manual coordination and
                spreadsheet-based processes, while making it easier for people
                to find and reserve what they need. Asset Booker can also be
                configured around the way your organisation works, including
                your locations, resources and booking rules.
              </p>
              <Image
                src={IMAGE}
                alt={IMAGE_ALT}
                width={1024}
                height={572}
                className="mt-8 h-auto w-full rounded border border-sognos-line"
              />
            </div>

            {/* Foot — always in view, whatever the body scroll. */}
            <div className="shrink-0 border-t border-sognos-line bg-white px-6 py-5 md:px-10">
              <p className="text-sm text-sognos-muted">
                Find out more about Asset Booker on the DigPacks website.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={DIGPACKS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-sognos-digpacks-base px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 ${FOCUS_DARK}`}
                >
                  Find out more
                  <ArrowRight size={14} aria-hidden />
                </a>
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sognos-heading transition-opacity hover:opacity-80 ${FOCUS_DARK}`}
                >
                  Download Asset Booker for free
                  <ArrowRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// Products Inspector · Stories / CTA C (Asset Booker) on the DigPacks base,
// laid out like Outcomes: label, section-size heading and lede (max-w-xl, 7)
// beside the booking motion graphic (5), then a hairline-ruled row with the setup note and
// both CTAs.
// Copy stays full white for AA.
export default function DigPacksAssetBooker() {
  const [open, setOpen] = useState(false);
  // Stable, so the drawer's open effect (focus, scroll lock) runs once.
  const close = useCallback(() => setOpen(false), []);

  return (
    <section
      id="asset-booker"
      className={`bg-sognos-digpacks-base text-white ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-24">
          <div className="flex max-w-xl flex-col gap-4 lg:col-span-7">
            <SectionLabel
              tone="dark"
              markerClassName="bg-white"
              className="text-white"
            >
              Try it free
            </SectionLabel>
            <h2 className={`${TYPE.h2} text-white`}>
              Make shared resource booking simpler with Asset Booker
            </h2>
            <p className={`${TYPE.lede} text-white`}>
              Asset Booker gives your teams one place to book and manage shared
              resources, from desks and meeting rooms to equipment, parking and
              specialist spaces. Real-time availability, visual floorplans and
              configurable booking controls make it easier for people to find
              and reserve what they need, while giving administrators greater
              visibility over how resources are being used.
            </p>
          </div>

          {/* Section graphic: the booking loop on a lighter inset panel. */}
          <div className="flex justify-center rounded bg-white/15 px-6 pt-10 pb-14 md:px-8 lg:col-span-5">
            <BookingGraphic />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/20 pt-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <p className={`${TYPE.small} max-w-md text-white lg:col-span-5`}>
            Built for the Microsoft environment, Asset Booker comes with
            step-by-step installation and setup guidance to help you get
            started.
          </p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-x-6 lg:col-span-7 lg:justify-end">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-heading transition-opacity hover:opacity-90 ${FOCUS}`}
            >
              Download Asset Booker for free
              <ArrowRight size={16} aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-base font-medium text-white transition-opacity hover:opacity-80 ${FOCUS}`}
            >
              What is Asset Booker?
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <AssetBookerDrawer open={open} onClose={close} />
    </section>
  );
}
