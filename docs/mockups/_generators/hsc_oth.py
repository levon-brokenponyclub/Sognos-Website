
# ── Explore other industries - Frontline "Related" layouts (2026-10-25) ─────
# C: graphic cards (Frontline Related A) - white bordered cards, gallery
# graphic panel, title, clamped description, "Explore" link.
# D: slider (Frontline Related C) - snap track, arrow buttons, sector rule.
# Graphics: Home · Industries gallery set, each on its sector tint.
_OTH_HEAD_ROW = f'<div class="{HEAD}"><h2 class="{T["h2"]} text-heading">Explore other industries</h2></div>'
_EXPLORE = '<span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-accent">Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span></span>'
_SECTOR_RULE = {"facilities-management": "#58b368", "local-government": "#b9b26a", "industrial-services": "#6a9fb5", "energy-utilities": "#8fae5a"}


def _oth_panel(n, s, h="h-56"):
    g = recolour(HOME_IND[re.sub("&amp;", "&", n)], TINTS[s])
    return f'<div class="overflow-hidden rounded [&>.fv]:{h} [&>.fv]:min-h-0 [&>.fv]:p-5 [&>.fv>*]:scale-90">{g}</div>'


OTHERS_CARDS = f"""<section id="other-industries" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Industries")}</div>
      <div class="{CONTENT}">
        {_OTH_HEAD_ROW}
        <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">
            {_oth_panel(n, s)}
            <div class="flex flex-1 flex-col px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>"""

OTHERS_SLIDER = f"""<section id="other-industries" class="bg-tint {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Industries")}</div>
      <div class="{CONTENT}">
        <div class="flex items-end justify-between gap-6">{_OTH_HEAD_ROW}
          <div class="hidden shrink-0 gap-2 md:flex">{"".join(f'<button type="button" data-oth-nav="{d}" aria-label="{"Previous" if d < 0 else "Next"}" class="flex size-11 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-accent">{"&larr;" if d < 0 else "&rarr;"}</button>' for d in (-1, 1))}</div>
        </div>
        <div data-oth-track class="rel-track {GAP} -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 lg:gap-4">
          {"".join(f'''<a href="#" class="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent sm:w-[420px]">
            {_oth_panel(n, s, "h-60")}
            <div class="flex flex-1 flex-col px-3 pb-3"><span class="mb-3 h-1 w-10 rounded-full" style="background:{_SECTOR_RULE[s]}"></span><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{_EXPLORE}</div></div>
          </a>''' for n, s, d in OTHER)}
        </div>
      </div>
    </div>
  </div>
</section>"""

OTH_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-oth-nav]").forEach((b) => b.addEventListener("click", () => {
      const track = b.closest("section").querySelector("[data-oth-track]");
      const step = track.firstElementChild.getBoundingClientRect().width + 16;
      track.scrollBy({ left: step * +b.dataset.othNav, behavior: reduce ? "auto" : "smooth" });
    }));
  })();
</script>"""
