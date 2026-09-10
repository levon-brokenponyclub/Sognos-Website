"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FORM_URL =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=zIacJ9kc00WXQ1urUsPpDulf4UJd2PdFji36B-5lP_pURVRWMEVTMkdOMlZWSzZFUEtRSU9JUUg1US4u";
const DIGPACKS_URL = "https://www.digpacks.co.uk/knowledge-base/asset-booker/";

const ASSET_BOOKER_ALT = "Asset Booker resource booking interface";

function AssetBookerDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-99 bg-brand/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-100 bg-gray-100 rounded-t-2xl max-w-7xl mx-auto shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-4 pb-3 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300 absolute left-1/2 -translate-x-1/2 top-4" />
              <div />
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-prussian-blue-800/50 hover:text-prussian-blue-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="mx-auto px-6 lg:px-16 pb-10">
                <div className="py-4 text-center max-w-4xl mx-auto mb-6 border-b border-sognos-border-subtle">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-4">
                    What is Asset Booker?
                  </h2>
                  <p className="mt-2 text-lg text-sognos-text-body max-w-2xl mx-auto leading-relaxed">
                    Asset Booker is a simple resource booking solution designed
                    to help organisations manage shared spaces, equipment and
                    other bookable assets in one place. Teams can check
                    availability and book desks, meeting rooms, clinical spaces,
                    equipment, parking and other shared resources, while
                    administrators get better visibility over bookings and
                    utilisation.
                  </p>
                  <p className="mt-4 text-lg text-sognos-text-body max-w-2xl mx-auto leading-relaxed">
                    It helps reduce double bookings, manual coordination and
                    spreadsheet-based processes, while making it easier for
                    people to find and reserve what they need. Asset Booker can
                    also be configured around the way your organisation works,
                    including your locations, resources and booking rules.
                  </p>
                </div>

                <div className="mb-8">
                  <Image
                    src="/images/Digpacks/Asset-Booker.jpg"
                    alt={ASSET_BOOKER_ALT}
                    width={1024}
                    height={572}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="border-t border-sognos-border-subtle pt-6">
                  <p className="text-sm text-sognos-text-muted mb-3">
                    Find out more about Asset Booker by visiting the Digpack
                    website
                  </p>
                  <a
                    href={DIGPACKS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D96FC] hover:opacity-70 transition-opacity"
                  >
                    Asset Booker - DigPacks
                    <ArrowRight size={14} aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AssetBooker() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Asset Booker Spotlight */}
      <section className="py-16 lg:py-20 border-t border-sognos-border-subtle border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Text */}
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1D96FC]/10 text-[#1D96FC] text-xs font-semibold uppercase tracking-widest px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D96FC]" aria-hidden />
                DigPacks
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-medium text-prussian-blue-800 tracking-tight leading-tight mb-6">
                Make shared resource booking simpler with Asset Booker
              </h2>
              <div className="space-y-4 text-base lg:text-lg text-sognos-text-body leading-relaxed mb-8">
                <p>
                  Asset Booker gives your teams one place to book and manage
                  shared resources, from desks and meeting rooms to equipment,
                  parking and specialist spaces. Real-time availability, visual
                  floorplans and configurable booking controls make it easier
                  for people to find and reserve what they need, while giving
                  administrators greater visibility over how resources are
                  being used.
                </p>
                <p>
                  Built for the Microsoft environment, Asset Booker comes with
                  step-by-step installation and setup guidance to help you get
                  started.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-prussian-blue-800 hover:text-[#1D96FC] transition-colors"
                  aria-expanded={drawerOpen}
                >
                  What is Asset Booker?
                  <ChevronDown size={14} aria-hidden />
                </button>
                <a
                  href="#asset-booker-download"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D96FC] hover:opacity-70 transition-opacity"
                >
                  See how simple it is to get started with DigPacks
                  <ArrowRight size={14} aria-hidden />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/Digpacks/Asset-Booker.jpg"
                alt={ASSET_BOOKER_ALT}
                width={1024}
                height={572}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section
        id="asset-booker-download"
        className="py-12 lg:py-16 bg-gray-200/70"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-sognos-text-muted mb-3">
            Want to see what a DigPacks solution looks like in practice?
          </p>
          <p className="text-lg text-sognos-text-body max-w-2xl mx-auto leading-relaxed mb-6">
            Download Asset Booker for free and explore a practical solution
            built to simplify an everyday operational challenge.
          </p>
          <p className="text-sognos-text-muted mb-8">Ready to try it?</p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D96FC] hover:bg-[#1a85e0] text-white font-semibold text-sm px-6 py-3.5 transition-colors"
          >
            Download Asset Booker for free
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Drawer */}
      <AssetBookerDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
