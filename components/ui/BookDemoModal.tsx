"use client";

import { useEffect } from "react";
import { useBookDemo } from "@/lib/BookDemoContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export default function BookDemoModal() {
  const { isOpen, defaultProduct, closeModal } = useBookDemo();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeModal}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-3xl max-h-[90svh] flex flex-col bg-white rounded-t-lg overflow-hidden"
          >
            {/* Handle bar */}
            <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <CTASection defaultProduct={defaultProduct} hideStats bare />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
