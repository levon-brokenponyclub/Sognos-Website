// Shown only in Next.js draft mode (Studio → Preview).
export default function PreviewBar({ exitHref }: { exitHref: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-sognos-navy py-2 pr-2 pl-4 text-sm text-white">
      <span>Preview · showing draft content</span>
      <a
        href={exitHref}
        className="rounded-full bg-white px-3 py-1 font-medium text-sognos-navy hover:bg-white/90"
      >
        Exit preview
      </a>
    </div>
  );
}
