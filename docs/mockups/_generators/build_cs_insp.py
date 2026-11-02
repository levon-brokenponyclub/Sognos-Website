"""Customer Stories archive mockup with the products Inspector drawer + options gallery.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/customer-stories docs/mockups/products
Cuts build_cs.py's three archive options into sections; each section picks its own
layout in the Inspector (presets A / B / C set them all). Built by archive_insp.py.
Writes customer-stories/archive.html + options.html.
"""
import runpy
import sys
from pathlib import Path

CARE, OUT_DIR, PR_DIR = sys.argv[1:4]
HERE = Path(__file__).parent
sys.argv = [sys.argv[0], CARE, OUT_DIR]
CS = runpy.run_path(str(HERE / "build_cs.py"))
sys.argv = [sys.argv[0], CARE, PR_DIR]
BP = runpy.run_path(str(HERE / "build_products.py"))  # library mode: no files written
AR = runpy.run_path(str(HERE / "archive_insp.py"))
page = CS["page"]
page.__globals__["OUT"] = Path(OUT_DIR)
bar, split, EMPTY = AR["bar_to_section"], AR["split"], CS["EMPTY"]

sa = split(bar(CS["OPT_A"], '<div class="sticky top-20 z-40 border-y', "</div></div>"),
           [("hero", '<section class="bg-white pt-36 pb-16'), ("filter", '<section class="sticky top-20'), ("grid", '<section class="bg-tint')], (EMPTY,))
sb = split(CS["OPT_B"], [("hero", '<section class="bg-white pt-36 pb-10'), ("index", '<section class="bg-white pb-24">')], (EMPTY,))
sc = split(bar(CS["OPT_C"], '<div class="sticky top-20 z-40 border-b', "</div></div>"),
           [("hero", '<section class="relative bg-care-dark'), ("filter", '<section class="sticky top-20'), ("bento", '<section class="bg-tint')], (EMPTY,))

SLOTS = [  # (key, label, [(variant, label, html)], allow_off)
    ("hero", "Hero", [("a", "A · Grid + filter", sa["hero"]), ("b", "B · Index + rail", sb["hero"]), ("c", "C · Spotlight + bento", sc["hero"])], False),
    ("filter", "Industry filter", [("a", "A · Grid + filter", sa["filter"]), ("c", "C · Spotlight + bento", sc["filter"])], True),
    ("stories", "Stories", [("a", "A · Grid + filter", sa["grid"]), ("b", "B · Index + rail", sb["index"]), ("c", "C · Spotlight + bento", sc["bento"])], False),
]
PRESETS = [
    ("a", "A · Grid + filter", {"hero": "a", "filter": "a", "stories": "a"}),
    ("b", "B · Index + rail", {"hero": "b", "filter": "off", "stories": "b"}),
    ("c", "C · Spotlight + bento", {"hero": "c", "filter": "c", "stories": "c"}),
]
PAGE_JS = CS["JS"].replace('let s = null; try { s = localStorage.getItem("sognos-cs-opt"); } catch {} if (s) pick(s);', "")
NOTE = """Customer Stories archive + Inspector, 2026-10-26. Each section picks its own layout (same as the product pages); presets A Grid + filter / B Index + rail / C Spotlight + bento set them all.
Layouts per section use the archive option names - A Grid + filter / B Index + rail / C Spotlight + bento. Hero: A search + featured story / B title only / C navy spotlight carousel. Industry filter: A chips + label / C chips / Off. Stories: A card grid / B index + rail / C bento.
Search + industry filters span whichever layouts are shown. Live copy; * = proposed industry. Card image = approved StoryCardImage option C.
Every section: tone swatches + Colours; header states; footer rows; colour theme (SognosCare default). options.html shows every section layout stacked."""
n = AR["build"](page=page, BP=BP, out_dir=OUT_DIR, index_name="archive.html", pkey="cs", name="Customer Stories", slots=SLOTS, presets=PRESETS,
                base_css=CS["CI_CSS"], page_js=PAGE_JS, root_attr="data-cs-opt", empty=EMPTY, prefix="sognos-cs-v3-", note=NOTE, crumb="Customer Stories",
                opt_note="Every Customer Stories section layout stacked (hero A-C, industry filter, stories A-C), per-block tone, colour theme, footer rows. Composition: archive.html (Inspector).")
print(f"wrote customer-stories/archive.html + options.html ({n} blocks)")
