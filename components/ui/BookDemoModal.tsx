"use client";

import { useBookDemo } from "@/lib/BookDemoContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export default function BookDemoModal() {
  const { isOpen, defaultProduct, closeModal } = useBookDemo();

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

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl max-h-[98vh] overflow-y-auto bg-white rounded-lg relative">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <CTASection defaultProduct={defaultProduct} hideStats bare />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
