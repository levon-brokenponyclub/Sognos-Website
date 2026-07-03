#!/usr/bin/env python3
"""
Extract full post bodies from the WordPress WXR export and convert them to
Sanity Portable Text (JSON) for the 18 Knowledge Hub posts already migrated.

Reads:  Project Docs/Site Content/Knowledge Hub/sognossolutions.WordPress.2026-06-11.xml
Writes: scripts/knowledge-post-bodies.json

Schema (matches sanity/schemas/knowledgePost.ts):
- styles:  normal | h2 | blockquote
- lists:   bullet | number
- marks:   em | strong | link
"""

import json
import re
import uuid
import xml.etree.ElementTree as ET
from pathlib import Path
from bs4 import BeautifulSoup, Comment, NavigableString, Tag

ROOT = Path(__file__).resolve().parent.parent
WXR = ROOT / "Project Docs" / "Site Content" / "Knowledge Hub" / "sognossolutions.WordPress.2026-06-11.xml"
OUT = ROOT / "scripts" / "knowledge-post-bodies.json"

NS = {
    "wp": "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
}

# XML slug -> migrated Sanity slug (for the 6 that were shortened during migration)
SLUG_ALIAS = {
    "sognos-solutions-celebrates-9-years-of-growth-innovation-and-microsoft-dynamics-365-expertise": "sognos-9-years",
    "sognos-solutions-moves-to-new-office-in-north-sydney": "north-sydney-office",
    "sognos-solutions-expands-to-new-zealand-with-official-launch-at-microsoft-house-in-auckland": "new-zealand-launch",
    "new-beginnings-office-premises-in-india": "india-office",
    "sognos-at-fsm-summit-2024-driving-the-future-of-field-service-in-sydney": "fsm-summit-2024",
    "sognos-webinar-series-reinventing-patient-and-participant-care": "participant-care-webinar",
}

MIGRATED_SLUGS = {
    "admin-overload-in-care-why-its-burning-out-frontline-workers",
    "aged-care-reform-2025-26-what-providers-need-to-do-now",
    "compliance-without-the-paperwork-finding-the-right-ndis-reporting-tools-for-your-organisation",
    "data-residency-in-australian-healthcare-sorting-fact-from-fiction",
    "from-chaos-to-control-modernising-field-services",
    "innovation-in-aged-care-what-australia-can-learn-from-systems-already-under-strain",
    "mental-health-and-disability-workforce-burnout-a-growing-crisis",
    "mobile-care-app-solutions-empowering-your-frontline-workforce-with-dataverse",
    "power-apps-in-action-customising-your-fsm-for-industry-specific-needs",
    "reducing-administrative-burden-through-automated-compliance-tracking",
    "smarter-facilities-management-with-dynamics-365",
    "the-aged-care-quality-standards-whats-changing-in-2026-and-how-to-implement",
} | set(SLUG_ALIAS.values())

# The webinar post's raw WXR body is 12 words + a Vimeo URL — the current
# curated migration is more informative. Skip refresh for these.
SKIP_REFRESH = {
    "participant-care-webinar",
}

INLINE_TAGS = {"a", "b", "strong", "i", "em", "span", "u", "small", "sup", "sub"}


def short_key() -> str:
    return uuid.uuid4().hex[:12]


def normalize_text(s: str) -> str:
    if not s:
        return ""
    s = s.replace("\xa0", " ").replace("&nbsp;", " ")
    s = re.sub(r"[\r\n\t]+", " ", s)
    s = re.sub(r" {2,}", " ", s)
    return s


def build_spans(node: Tag, active_marks: list[str], mark_defs: list[dict]) -> list[dict]:
    """Walk an inline-flow node and emit Portable Text spans."""
    spans: list[dict] = []

    def push(text: str, marks: list[str]) -> None:
        if not text:
            return
        # Merge with previous span if marks match and last is a span
        if spans and spans[-1].get("_type") == "span" and spans[-1]["marks"] == marks:
            spans[-1]["text"] += text
        else:
            spans.append({"_type": "span", "_key": short_key(), "text": text, "marks": list(marks)})

    def walk(el, marks: list[str]) -> None:
        if isinstance(el, NavigableString):
            push(normalize_text(str(el)), marks)
            return
        if not isinstance(el, Tag):
            return

        name = el.name.lower()

        if name == "br":
            push(" ", marks)
            return

        if name in ("b", "strong"):
            new_marks = marks + (["strong"] if "strong" not in marks else [])
            for c in el.children:
                walk(c, new_marks)
            return

        if name in ("i", "em"):
            new_marks = marks + (["em"] if "em" not in marks else [])
            for c in el.children:
                walk(c, new_marks)
            return

        if name == "a":
            href = (el.get("href") or "").strip()
            if not href or href.startswith("#"):
                for c in el.children:
                    walk(c, marks)
                return
            key = short_key()
            mark_defs.append({"_key": key, "_type": "link", "href": href})
            new_marks = marks + [key]
            for c in el.children:
                walk(c, new_marks)
            return

        # Any other inline wrapper (span, u, small, etc.) — recurse without new marks
        for c in el.children:
            walk(c, marks)

    for child in node.children:
        walk(child, list(active_marks))

    # Trim leading/trailing whitespace across spans
    if spans:
        spans[0]["text"] = spans[0]["text"].lstrip()
        spans[-1]["text"] = spans[-1]["text"].rstrip()
        spans = [s for s in spans if s["text"]]

    return spans


def block(style: str, spans: list[dict], mark_defs: list[dict], list_item: str | None = None) -> dict:
    b = {
        "_type": "block",
        "_key": short_key(),
        "style": style,
        "markDefs": mark_defs,
        "children": spans,
    }
    if list_item:
        b["listItem"] = list_item
        b["level"] = 1
    return b


def convert_paragraph(el: Tag, style: str = "normal", list_item: str | None = None) -> dict | None:
    mark_defs: list[dict] = []
    spans = build_spans(el, [], mark_defs)
    if not spans:
        return None
    return block(style, spans, mark_defs, list_item)


def convert_html(html: str) -> list[dict]:
    """Convert WordPress HTML to Portable Text blocks."""
    # Strip Gutenberg block comments and any HTML comment before parsing.
    html = re.sub(r"<!--.*?-->", "", html or "", flags=re.DOTALL)

    # Convert double <br> sequences (used as paragraph breaks in some
    # WordPress classic-editor posts) into real paragraph boundaries.
    html = re.sub(r"(?:<br\s*/?>\s*){2,}", "</p><p>", html, flags=re.IGNORECASE)

    soup = BeautifulSoup(f"<div>{html}</div>", "html.parser")

    # Drop any remaining Comment nodes bs4 might have kept.
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()

    # Strip inline styles / word-copy attrs
    for tag in soup.find_all(True):
        for attr in list(tag.attrs.keys()):
            if attr.startswith(("aria-", "data-")) or attr in ("style", "class", "dir", "lang"):
                del tag.attrs[attr]

    blocks: list[dict] = []

    def image_placeholder(img_tag: Tag, caption: str = "") -> dict | None:
        src = (img_tag.get("src") or "").strip()
        if not src:
            return None
        alt = (img_tag.get("alt") or "").strip() or caption.strip() or "Sognos"
        return {
            "_type": "_inlineImagePending",
            "_key": short_key(),
            "src": src,
            "alt": alt,
        }

    def handle(el: Tag) -> None:
        name = el.name.lower() if el.name else ""

        if name in ("h1", "h2", "h3"):
            blk = convert_paragraph(el, style="h2")
            if blk:
                blocks.append(blk)
            return

        if name == "p":
            blk = convert_paragraph(el, style="normal")
            if blk:
                blocks.append(blk)
            return

        if name == "img":
            ph = image_placeholder(el)
            if ph:
                blocks.append(ph)
            return

        if name == "figure":
            # A <figure> may contain nested <figure> siblings (gallery) or a
            # single <img> + optional <figcaption>.
            for inner_fig in el.find_all("figure", recursive=False):
                handle(inner_fig)
            for img in el.find_all("img", recursive=False):
                caption_el = el.find("figcaption", recursive=False)
                caption = caption_el.get_text(" ", strip=True) if caption_el else ""
                ph = image_placeholder(img, caption)
                if ph:
                    blocks.append(ph)
            return

        if name == "blockquote":
            # Blockquote may contain its own <p>s
            paras = el.find_all("p", recursive=False)
            if paras:
                for p in paras:
                    blk = convert_paragraph(p, style="blockquote")
                    if blk:
                        blocks.append(blk)
            else:
                blk = convert_paragraph(el, style="blockquote")
                if blk:
                    blocks.append(blk)
            return

        if name in ("ul", "ol"):
            kind = "bullet" if name == "ul" else "number"
            for li in el.find_all("li", recursive=False):
                blk = convert_paragraph(li, style="normal", list_item=kind)
                if blk:
                    blocks.append(blk)
            return

        if name in ("div", "section", "article"):
            for c in el.children:
                if isinstance(c, Tag):
                    handle(c)
                elif isinstance(c, NavigableString):
                    txt = normalize_text(str(c))
                    if txt.strip():
                        blocks.append(
                            block(
                                "normal",
                                [{"_type": "span", "_key": short_key(), "text": txt.strip(), "marks": []}],
                                [],
                            )
                        )
            return

        # Fallback: any orphaned inline flow becomes a paragraph
        if el.get_text(strip=True):
            blk = convert_paragraph(el, style="normal")
            if blk:
                blocks.append(blk)

    root = soup.div
    # WordPress content sometimes has bare text nodes and orphan inline tags
    # (e.g. a stray <a>) between paragraphs. Buffer them into a paragraph and
    # only flush on true block-level elements.
    buffer_defs: list[dict] = []
    buffer_wrapper = BeautifulSoup("<p></p>", "html.parser").p

    def flush_buffer() -> None:
        nonlocal buffer_defs, buffer_wrapper
        if list(buffer_wrapper.children):
            spans = build_spans(buffer_wrapper, [], buffer_defs)
            if spans:
                blocks.append(block("normal", spans, buffer_defs))
        buffer_defs = []
        buffer_wrapper = BeautifulSoup("<p></p>", "html.parser").p

    for child in list(root.children):
        if isinstance(child, NavigableString):
            buffer_wrapper.append(NavigableString(str(child)))
            continue
        if isinstance(child, Tag):
            if child.name and child.name.lower() in INLINE_TAGS:
                buffer_wrapper.append(child.extract())
            else:
                flush_buffer()
                handle(child)
    flush_buffer()

    return blocks


def main() -> None:
    tree = ET.parse(WXR)
    channel = tree.getroot().find("channel")

    out: dict[str, list[dict]] = {}
    seen: set[str] = set()

    for item in channel.findall("item"):
        ptype_el = item.find("wp:post_type", NS)
        if ptype_el is None or ptype_el.text != "post":
            continue
        if item.find("wp:status", NS).text != "publish":
            continue

        xml_slug = item.find("wp:post_name", NS).text or ""
        target_slug = SLUG_ALIAS.get(xml_slug, xml_slug)
        if target_slug not in MIGRATED_SLUGS:
            continue
        if target_slug in SKIP_REFRESH:
            print(f"  · {target_slug:<70} skipped (raw XML thinner than current)")
            continue

        content_el = item.find("content:encoded", NS)
        html = content_el.text if content_el is not None else ""
        blocks = convert_html(html or "")

        out[target_slug] = blocks
        seen.add(target_slug)
        print(f"  ✓ {target_slug:<70} {len(blocks):>3} blocks  (from '{xml_slug}')")

    missing = MIGRATED_SLUGS - seen - SKIP_REFRESH
    if missing:
        print("\n  ⚠  Not found in WXR:")
        for s in sorted(missing):
            print(f"     - {s}")

    OUT.write_text(json.dumps(out, indent=2))
    print(f"\nWrote {OUT.relative_to(ROOT)}  —  {len(out)} posts")


if __name__ == "__main__":
    main()
