"use client";

import { useBookDemo } from "@/lib/BookDemoContext";

export default function SolutionHeroDemoButton({
  label = "Book a Demo",
}: {
  label?: string;
}) {
  const { openModal } = useBookDemo();
  return (
    <button
      type="button"
      onClick={() => openModal()}
      className="inline-flex items-center justify-center rounded-full bg-sognos-blue-accent px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
    >
      {label}
    </button>
  );
}
