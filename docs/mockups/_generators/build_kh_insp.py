"""Knowledge Hub mockup with the products Inspector drawer + options gallery.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/knowledge-hub docs/mockups/products
Cuts build_kh.py's three page layouts into sections; each section picks its own
layout in the Inspector (presets 1 / 2 / 3 set them all). Built by archive_insp.py.
"""
import runpy
import sys
from pathlib import Path

CARE, OUT_DIR, PR_DIR = sys.argv[1:4]
HERE = Path(__file__).parent
sys.argv = [sys.argv[0], CARE, OUT_DIR]
KH = runpy.run_path(str(HERE / "build_kh.py"))
sys.argv = [sys.argv[0], CARE, PR_DIR]
BP = runpy.run_path(str(HERE / "build_products.py"))  # library mode: no files written
AR = runpy.run_path(str(HERE / "archive_insp.py"))
page = KH["page"]
page.__globals__["OUT"] = Path(OUT_DIR)
bar, split, EMPTY = AR["bar_to_section"], AR["split"], KH["EMPTY"]
TAIL = (f'<div class="mx-auto max-w-7xl px-6">{EMPTY}</div>', EMPTY)

o1 = bar(KH["opt1"](), '<div class="sticky top-20 z-40 border-y', "</div>\n  </div>")
cats = [k for k, _ in KH["SECTIONS"] if k in ("news", "insights", "newsletters") and f'<section data-section="{k}"' in o1]
s1 = split(o1, [("hero", '<section class="bg-white pt-36 pb-16'), ("filter", '<section class="sticky top-20'), *[(k, f'<section data-section="{k}"') for k in cats],
                ("events", '<section data-section="events"'), ("nl", "<section data-nl"), ("milestones", '<section data-section="milestones"')], TAIL)
s2 = split(bar(KH["opt2"](), '<div class="sticky top-20 z-40 border-b', "</div></div>"),
           [("hero", '<section class="relative bg-care-dark pt-36'), ("filter", '<section class="sticky top-20'), ("grid", '<section class="bg-white py-16 md:py-20">'), ("events", '<section data-section="events"')], TAIL)
s3 = split(KH["opt3"](), [("hero", '<section class="bg-white pt-36 pb-10'), ("index", '<section class="bg-white pb-24">')], TAIL)

SLOTS = [  # (key, label, [(variant, label, html)], allow_off)
    ("hero", "Hero", [("a", "1 · Light + featured", s1["hero"]), ("b", "2 · Dark lead + latest", s2["hero"]), ("c", "3 · Title only", s3["hero"])], False),
    ("filter", "Category filter", [("a", "1 · Chips", s1["filter"]), ("b", "2 · Tabs", s2["filter"])], True),
    ("posts", "Posts", [("a", "1 · Category sections", "".join(s1[k] for k in cats)), ("b", "2 · Mixed grid", s2["grid"]), ("c", "3 · Index + rail", s3["index"])], False),
    ("events", "Events & Webinars", [("a", "1 · Upcoming + past", s1["events"]), ("b", "2 · Timeline", s2["events"])], True),
    ("nl", "Newsletter band", [("a", "1 · Dark band", s1["nl"])], True),
    ("milestones", "Milestones", [("a", "1 · Rows", s1["milestones"])], True),
]
PRESETS = [
    ("a", "1 · Synthesia close", {"hero": "a", "filter": "a", "posts": "a", "events": "a", "nl": "a", "milestones": "a"}),
    ("b", "2 · Editorial", {"hero": "b", "filter": "b", "posts": "b", "events": "b", "nl": "off", "milestones": "off"}),
    ("c", "3 · Index + rail", {"hero": "c", "filter": "off", "posts": "c", "events": "off", "nl": "off", "milestones": "off"}),
]
PAGE_JS = KH["JS"].replace('let s = null; try { s = localStorage.getItem("sognos-kh-opt"); } catch {} if (s) pick(s);', "")
NOTE = """Knowledge Hub + Inspector, 2026-10-26. Each section picks its own layout (same as the product pages); presets 1 Synthesia close / 2 Editorial / 3 Index + rail set them all.
Hero: 1 light + search + featured / 2 dark lead + latest / 3 title only. Category filter: 1 chips / 2 tabs / off. Posts: 1 category sections (News, Insights) / 2 mixed grid / 3 index + rail (search, categories, newsletter in the rail).
Events: 1 upcoming + past / 2 timeline / off. Newsletter band: dark band / off. Milestones: rows / off. Search + category filters span whichever layouts are shown. Live Sanity content.
Every section: tone swatches + Colours; header states; footer rows; colour theme (SognosCare default). options.html shows every section layout stacked."""
n = AR["build"](page=page, BP=BP, out_dir=OUT_DIR, pkey="kh", name="Knowledge Hub", slots=SLOTS, presets=PRESETS, base_css=KH["STYLE"].replace('[data-kh-opt="1"]:not(.is-filtering) [data-extra]', '[data-kh-opt]:not(.is-filtering) [data-s="posts"][data-v="a"] [data-extra]').replace('[data-kh-opt="1"]', "[data-kh-opt]"), page_js=PAGE_JS,
                root_attr="data-kh-opt", empty=EMPTY, prefix="sognos-kh-v3-", note=NOTE, crumb="Knowledge Hub",
                opt_note="Every Knowledge Hub section layout stacked (hero 1-3, category filter, posts 1-3, events, newsletter, milestones), per-block tone, colour theme, footer rows. Composition: index.html (Inspector).")
print(f"wrote knowledge-hub/index.html + options.html ({n} blocks)")
