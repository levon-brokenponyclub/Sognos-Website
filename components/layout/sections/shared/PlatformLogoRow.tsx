import Image from "next/image";
import { MICROSOFT_PLATFORM_LOGOS } from "@/lib/constants";

// Static "powered by" proof row — the Microsoft stack Sognos as a whole is
// built on. Deliberately not a marquee: CTASection animates the same set as a
// scrolling track, which reads as "trusted by". Held still here so it reads as
// architecture instead.
export default function PlatformLogoRow({
  heading = "Powered by",
  variant = "dark",
}: {
  heading?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div>
      {/* <p
        className={`mb-6 text-xs font-semibold uppercase tracking-widest ${
          isDark ? "text-white/50" : "text-sognos-muted"
        }`}
      >
        {heading}
      </p> */}
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-6 sm:gap-x-10">
        {MICROSOFT_PLATFORM_LOGOS.map((logo) => (
          <li key={logo.alt} className="flex items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={40}
              height={40}
              className="h-7 w-auto object-contain sm:h-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
