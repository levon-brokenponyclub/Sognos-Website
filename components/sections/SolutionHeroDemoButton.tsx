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
      className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-black"
    >
      {label}
    </button>
  );
}
