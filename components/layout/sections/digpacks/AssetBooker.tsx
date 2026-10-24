"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";

const FORM_URL =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=dIv2xQ42w0yPgwCF_6izmX_i53x-rohEmvUHAV32Ee5UNEZXVEpVQVZLWkVaUTJCSk5GMTg1Q1pESy4u&route=shorturl";
const DIGPACKS_URL = "https://www.digpacks.co.uk/knowledge-base/asset-booker/";
const IMAGE = "/images/digpacks/Asset-Booker.jpg";
const IMAGE_ALT = "Asset Booker resource booking interface";

// Bottom drawer, per the project's Framer Motion drawer pattern: fading
// backdrop, spring panel, body scroll locked while open.
function AssetBookerDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="asset-booker-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end bg-sognos-navy-dark/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="asset-booker-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="mx-auto flex max-h-[80vh] w-full max-w-7xl flex-col rounded-t-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 justify-end px-6 pt-4 pb-2">
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full bg-sognos-tint text-sognos-muted transition-colors hover:text-sognos-heading"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-10 lg:px-16">
              <div className="mx-auto mb-8 max-w-3xl border-b border-sognos-line pb-8 text-center">
                <h2
                  id="asset-booker-title"
                  className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl"
                >
                  What is Asset Booker?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-sognos-body">
                  Asset Booker is a simple resource booking solution designed to
                  help organisations manage shared spaces, equipment and other
                  bookable assets in one place. Teams can check availability and
                  book desks, meeting rooms, clinical spaces, equipment, parking
                  and other shared resources, while administrators get better
                  visibility over bookings and utilisation.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-sognos-body">
                  It helps reduce double bookings, manual coordination and
                  spreadsheet-based processes, while making it easier for people
                  to find and reserve what they need. Asset Booker can also be
                  configured around the way your organisation works, including
                  your locations, resources and booking rules.
                </p>
              </div>

              <Image
                src={IMAGE}
                alt={IMAGE_ALT}
                width={1024}
                height={572}
                className="mx-auto h-auto w-full max-w-4xl rounded-lg"
              />

              <div className="mx-auto mt-8 max-w-4xl border-t border-sognos-line pt-6">
                <p className="mb-3 text-sm text-sognos-muted">
                  Find out more about Asset Booker on the DigPacks website.
                </p>
                <a
                  href={DIGPACKS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sognos-digpacks-base transition-opacity hover:opacity-70"
                >
                  Asset Booker - DigPacks
                  <ArrowRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DigPacksAssetBooker() {
  const [open, setOpen] = useState(false);

  return (
    <section id="asset-booker" className="bg-sognos-tint py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sognos-digpacks-base">
              Try it free
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              Make shared resource booking simpler with Asset Booker
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-sognos-body">
              <p>
                Asset Booker gives your teams one place to book and manage
                shared resources, from desks and meeting rooms to equipment,
                parking and specialist spaces. Real-time availability, visual
                floorplans and configurable booking controls make it easier for
                people to find and reserve what they need, while giving
                administrators greater visibility over how resources are being
                used.
              </p>
              <p>
                Built for the Microsoft environment, Asset Booker comes with
                step-by-step installation and setup guidance to help you get
                started.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sognos-digpacks-base px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
              >
                Download Asset Booker for free
                <ArrowRight size={16} aria-hidden />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                className="inline-flex items-center gap-1.5 text-base font-medium text-sognos-heading transition-colors hover:text-sognos-digpacks-base"
              >
                What is Asset Booker?
                <ChevronDown size={16} aria-hidden />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src={IMAGE}
              alt={IMAGE_ALT}
              width={1024}
              height={572}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>

      <AssetBookerDrawer open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
