"use client";

import { ArrowRight } from "lucide-react";
import { useEventRegistration } from "@/lib/EventRegistrationContext";

type Variant = "primary" | "card" | "ghost-on-dark";

interface RegisterButtonProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D96FC] hover:bg-[#1A87E3] text-white font-semibold py-3 px-6 text-sm transition-colors",
  card: "flex items-center justify-between rounded-lg bg-[#1D96FC] hover:bg-[#1A87E3] text-white font-semibold py-5 px-6 text-base transition-colors w-full h-full",
  "ghost-on-dark":
    "inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-white/90 text-prussian-blue-800 font-semibold py-3 px-6 text-sm transition-colors",
};

export default function RegisterButton({
  variant = "primary",
  label = "Register now",
  className = "",
}: RegisterButtonProps) {
  const { openModal } = useEventRegistration();
  return (
    <button
      type="button"
      onClick={openModal}
      className={`${variants[variant]} ${className}`.trim()}
    >
      <span>{label}</span>
      <ArrowRight size={18} aria-hidden />
    </button>
  );
}
