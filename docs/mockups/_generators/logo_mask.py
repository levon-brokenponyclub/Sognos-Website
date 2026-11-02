"""Sognos wordmark as a data-URI CSS mask. A file:// page can't load url(...svg)
into mask-image (CORS-mode fetch), so the footer graphic rendered empty in Dia.
WM_CSS defines .sg-wm; the element supplies the fill via `background`."""
import re
import urllib.parse
from pathlib import Path

_svg = (Path(__file__).resolve().parents[3] / "public/logos/sognos-logo.svg").read_text()
_svg = re.sub(r'fill="url\(#paint[^"]*\)"', 'fill="black"', _svg)
_svg = re.sub(r"<radialGradient.*?</radialGradient>", "", _svg, flags=re.S)
_uri = "data:image/svg+xml," + urllib.parse.quote(_svg, safe=" =:/,.-")
WM_CSS = f".sg-wm{{-webkit-mask:url(\"{_uri}\") center top/100% auto no-repeat;mask:url(\"{_uri}\") center top/100% auto no-repeat}}"
