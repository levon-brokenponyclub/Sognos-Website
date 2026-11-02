#!/usr/bin/env bash
# Regenerate every mockup page. Run from the redesign repo root:
#   bash docs/mockups/_generators/build_all.sh
# Order matters: the footer fragment is built first and injected into page-level mockups.
set -euo pipefail
G="$(cd "$(dirname "$0")" && pwd)"
M=docs/mockups
run() { echo "· $(basename "$1")"; python3 -I "$@" > /dev/null; }
run "$G/build_footer_a.py" $M/sognoscare $M/footer       # footer options + shared footer fragment
run "$G/build_footer.py" $M/sognoscare $M/footer         # footer/index.html, home/footer.html
run "$G/build_home.py" $M/sognoscare $M/home             # legacy home section files (01/02)
run "$G/build_frontline.py" $M/sognoscare $M/frontline   # Frontline section files 01-07
run "$G/build_hsc.py" $M/sognoscare $M/frontline $M/health-social-care   # HSC section files
run "$G/build_products.py" $M/sognoscare $M/products     # products index + care / roster / genogram / digpacks
run "$G/build_frontline_insp.py" $M/sognoscare $M/frontline $M/products
run "$G/build_hsc_insp.py" $M/sognoscare $M/frontline $M/health-social-care $M/products
run "$G/build_kh_insp.py" $M/sognoscare $M/knowledge-hub $M/products
run "$G/build_cs_insp.py" $M/sognoscare $M/customer-stories $M/products
run "$G/build_home_insp.py" $M/sognoscare $M/home $M/products
run "$G/build_home_stack.py"                              # home/hero-stack.html (angellist.com study)
run "$G/build_finance.py"                                 # finance-operations/options.html (audit + options)
echo "done"
