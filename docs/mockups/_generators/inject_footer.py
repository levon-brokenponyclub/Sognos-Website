"""Idempotently inject the shared footer fragment (footer_fragment.html, made
by build_footer_a.py) before </body> of page-level mockups.
  python3 -I inject_footer.py <file.html> [...]
"""
import re
import sys
from pathlib import Path

START, END = "<!-- footer:start -->", "<!-- footer:end -->"
FRAG_PATH = Path(__file__).with_name("footer_fragment.html")


def inject_html(html: str) -> str:
    if not FRAG_PATH.exists():
        return html
    block = f"{START}\n{FRAG_PATH.read_text()}\n{END}\n"
    html = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\n?", "", html, flags=re.S)
    return html.replace("</body>", block + "</body>", 1)


if __name__ == "__main__":
    for p in sys.argv[1:]:
        f = Path(p)
        f.write_text(inject_html(f.read_text()))
        print("injected", p)
