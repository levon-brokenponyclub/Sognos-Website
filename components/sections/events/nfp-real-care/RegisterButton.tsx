import { ArrowRight } from "lucide-react";

type Variant = "primary" | "card" | "ghost-on-dark";

interface RegisterButtonProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

const EVENTBRITE_URL =
  "https://www.eventbrite.com.au/e/designing-services-around-real-lives-not-system-boundaries-tickets-1998319066120";

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
  return (
    <a
      href={EVENTBRITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variants[variant]} ${className}`.trim()}
    >
      <span>{label}</span>
      <ArrowRight size={18} aria-hidden />
    </a>
  );
}
