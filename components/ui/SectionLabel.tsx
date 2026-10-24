import { cn } from "@/lib/utils";

// Section label after angellist.com's left-rail labels: 18px, regular weight,
// sentence case, with the brand's square marker sized to the text (0.66em).
// The marker carries the accent; the text stays readable — accent-blue text
// on white is ~3.1:1. `tone="dark"` on navy surfaces. `sticky` pins it in the
// rail below the navbar + section bar. Introduced on SognosCare (2026-10-24).
export default function SectionLabel({
  children,
  tone = "light",
  sticky = false,
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  sticky?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-lg leading-[1.6]",
        tone === "dark" ? "text-white/80" : "text-sognos-heading",
        sticky && "lg:sticky lg:top-36",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="block size-[0.66em] shrink-0 bg-sognos-blue-accent"
      />
      {children}
    </p>
  );
}
