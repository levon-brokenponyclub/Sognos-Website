import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";

// Dark navy quote callout for major statements from named sources. Renders
// inside the article prose column (inherits its max-width) — no width here.
export default function QuoteCallout({
  text,
  author,
  role,
  photo,
}: {
  text?: string;
  author?: string;
  role?: string;
  photo?: SanityImageSource;
}) {
  if (!text) return null;
  const photoUrl = photo
    ? urlFor(photo).width(80).height(80).fit("crop").auto("format").url()
    : null;

  return (
    <div className="my-10 rounded-lg bg-sognos-navy p-8 lg:p-10">
      <p className="font-heading text-lg font-medium leading-snug text-white md:text-xl">
        <span aria-hidden="true" className="text-white/30">
          &ldquo;
        </span>
        {text}
      </p>
      {(author || role || photoUrl) && (
        <div className="mt-6 flex items-center gap-3">
          {photoUrl && (
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={photoUrl}
                alt={author ?? ""}
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
          )}
          {(author || role) && (
            <div>
              {author && (
                <p className="text-sm font-semibold text-white">{author}</p>
              )}
              {role && (
                <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/60">
                  {role}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
