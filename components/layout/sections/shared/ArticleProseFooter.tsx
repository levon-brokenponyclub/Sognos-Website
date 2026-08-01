import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShareIcons } from "@/components/layout/sections/customer-stories/StoryMetaRail";
import { cn } from "@/lib/utils";

type ArticleProseFooterProps = {
  backHref: string;
  backLabel: string;
  postUrl: string;
  className?: string;
  variant?: "light" | "dark";
};

export default function ArticleProseFooter({
  backHref,
  backLabel,
  postUrl,
  className,
  variant = "light",
}: ArticleProseFooterProps) {
  const isDark = variant === "dark";
  return (
    <footer
      className={cn(
        "mt-6 flex flex-col gap-8 pt-8 sm:flex-row sm:items-center",
        isDark ? "border-t border-white/10" : "border-t border-sognos-line",
        className,
      )}
    >
      <Link
        href={backHref}
        className={cn(
          "group inline-flex w-fit flex-row-reverse items-center gap-3 text-sm font-medium",
          isDark ? "text-white/70" : "text-sognos-heading",
        )}
      >
        <span className="underline-offset-2 group-hover:underline">
          {backLabel}
        </span>
        <span
          className={cn(
            "flex size-8 items-center justify-center overflow-hidden rounded-sm border transition-colors duration-300",
            isDark
              ? "border-white/20 hover:bg-white hover:text-sognos-navy group-hover:bg-white group-hover:text-sognos-navy"
              : "border-sognos-line group-hover:bg-sognos-navy group-hover:text-white",
          )}
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </span>
      </Link>

      <div className="sm:ml-auto">
        <ShareIcons postUrl={postUrl} />
      </div>
    </footer>
  );
}
