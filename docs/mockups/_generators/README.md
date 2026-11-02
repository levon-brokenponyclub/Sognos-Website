# Mockup generators

Python scripts that build every page in `docs/mockups/`. The HTML is generated output, so change a page by editing its script here and re-running it, not by editing the HTML.

## Rebuild everything

From the redesign repo root:

```bash
bash docs/mockups/_generators/build_all.sh
```

Python 3.12+ is needed; only the standard library is used. Each script also writes the SognosCare pages (`docs/mockups/sognoscare/`), because they share one base (`build_mockups.py`).

## What builds what

| Script | Pages |
|---|---|
| `build_mockups.py` | SognosCare pages; also the shared base: shell, type scale, feature visuals |
| `build_footer_a.py`, `build_footer.py` | `footer/`, `home/footer.html`, shared footer fragment |
| `build_products.py` | `products/` (Inspector, A/B/C directions, Asset Booker, Genogram advantages) |
| `build_frontline.py` / `build_frontline_insp.py` | `frontline/` section files / Inspector page + options |
| `build_hsc.py` / `build_hsc_insp.py` | `health-social-care/` section files / Inspector page + options |
| `build_kh_insp.py` (uses `build_kh.py`) | `knowledge-hub/` Inspector page + options |
| `build_cs_insp.py` (uses `build_cs.py`) | `customer-stories/archive.html` + options |
| `build_home_insp.py` (uses `build_home.py`, `home_extras.py`) | `home/` Inspector page + options |
| `build_home_stack.py` | `home/hero-stack.html`: hero, trust logos and stacking product cards, after angellist.com |
| `build_finance.py` | `finance-operations/options.html`: Finance &amp; Operations audit plus 2–3 layout options per section (live prod copy) |

## Shared modules

- `products_inspector.py` — the Inspector drawer.
- `products_editor.py` — the Colours editor.
- `products_tones.py` — tone swatches, including the Sognos brand colours.
- `products_chrome.py` — header and footer rows.
- `products_cards.py` — Editorial card options and story stage.
- `archive_insp.py` — builder for section-slot pages.
- `rail.py` — Rail switch.
- `asset_booker.py` — DigPacks Asset Booker section.
- `logo_mask.py` — footer wordmark.

## History

These scripts were lost when a temporary folder was cleared on 2026-11-02. They were rebuilt from the session history and checked against the existing mockups: running them reproduces every page. The only differences were the two most recent changes (the Genogram "Key Advantages" link and the Asset Booker graphic switch), which the Inspector pages had not yet been regenerated with.
