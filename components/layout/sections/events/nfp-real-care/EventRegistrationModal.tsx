"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEventRegistration } from "@/lib/EventRegistrationContext";
import EventRegistrationForm from "./EventRegistrationForm";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function EventRegistrationModal() {
  const { isOpen, closeModal } = useEventRegistration();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const firstFocusable = drawer?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key !== "Tab" || !drawer) return;

      const focusables = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-brand/60 backdrop-blur-xs"
            onClick={closeModal}
          />

          <motion.div
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-registration-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-100 mx-auto max-w-2xl max-h-[90svh] flex flex-col bg-white rounded-t-lg overflow-hidden"
          >
            <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Close registration form"
            >
              <X size={18} />
            </button>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <span id="event-registration-title" className="sr-only">
                Register for NFP Real Care
              </span>
              <EventRegistrationForm onClose={closeModal} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
