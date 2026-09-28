"""Extract content from rock1builders.com pages into Markdown + an image manifest."""
"""Usage: python scripts/extract_content.py content/raw  (needs beautifulsoup4 + lxml)"""
import json, re, sys, time, urllib.request
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment

OUT = Path(sys.argv[1])
UA = "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/128 Safari/537.36"
BASE = "https://rock1builders.com"

PAGES = {
    "home": "/",
    "about-us": "/about-us/",
    "our-services": "/our-services/",
    "gallery": "/gallery/",
    "contact-us": "/contact-us/",
    "about-montenegro": "/about-montenegro/",
    "newsroom": "/newsroom/",
    "legal": "/legal/",
    "project-life-bay-montenegro": "/works/life-bay-montenegro/",
    "project-rock-star-vazhakkala": "/works/rock-star-vazhakkalla/",
    "project-misty-blue": "/works/misty-blue/",
    "project-rock-valley-kakkanad": "/works/rock-valley-kakkanad/",
    "project-royal-habitat": "/works/royal-habitat/",
    "project-ocean-crest": "/works/ocean-crest/",
}

SKIP_TAGS = {"script", "style", "noscript", "svg", "form", "iframe", "template", "link", "meta"}
HEADINGS = {f"h{i}": i for i in range(1, 7)}
IMG_EXT = re.compile(r"\.(jpe?g|png|webp|gif|avif|svg)(\?|$)", re.I)


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace"), r.geturl()


def clean(t):
    return re.sub(r"\s+", " ", t).strip()


def img_src(el):
    for a in ("data-lazyload", "data-src", "data-lazy-src", "src"):
        v = el.get(a)
        if v and not v.startswith("data:"):
            return v
    return None


def bg_images(el):
    urls = []
    style = el.get("style", "")
    urls += re.findall(r"url\(['\"]?([^'\")]+)", style)
    for a in ("data-bg", "data-background", "data-lazyload", "data-image"):
        v = el.get(a)
        if v and IMG_EXT.search(v):
            urls.append(v)
    return [u for u in urls if IMG_EXT.search(u)]


class Extractor:
    def __init__(self, images):
        self.lines, self.images, self.seen_text = [], images, set()

    def add_img(self, url, alt, page, kind="img"):
        url = url.split("?")[0]
        if "/wp-content/" not in url:
            return
        self.lines.append(f"![{alt}]({url})" + ("  <!-- background -->" if kind == "bg" else ""))
        rec = self.images.setdefault(url, {"alt": alt, "pages": []})
        if page not in rec["pages"]:
            rec["pages"].append(page)

    def emit(self, text):
        # Elementor often renders the same block twice (desktop/mobile); drop exact repeats of long text
        key = text.lower()
        if len(text) > 40 and key in self.seen_text:
            return
        self.seen_text.add(key)
        self.lines.append(text)

    def walk(self, el, page):
        if isinstance(el, Comment) or not getattr(el, "name", None):
            return
        if el.name in SKIP_TAGS:
            return
        for u in bg_images(el):
            self.add_img(u, "", page, "bg")
        if el.get("data-to-value"):
            # animated counter: the real number lives in the attribute; the text is the start value
            self.lines.append(f"**{el['data-to-value']}**")
            return
        strs = [x for x in el.stripped_strings]
        if len(strs) > 2 and all(len(x) == 1 for x in strs):
            # per-letter animated label (e.g. "f i n d o u t"): rejoin with its real whitespace
            t = clean(el.get_text(""))
            href = el.get("href") or (el.find_parent("a") or {}).get("href") if el.name != "a" else el.get("href")
            self.emit(f"[{t}]({href})" if href else t)
            return
        if el.name == "img":
            src = img_src(el)
            if src:
                self.add_img(src, clean(el.get("alt", "")), page)
            return
        if el.name in HEADINGS:
            t = clean(el.get_text(" "))
            if t:
                self.emit("#" * HEADINGS[el.name] + " " + t)
            return
        if el.name == "a" and el.get("href") and clean(el.get_text(" ")) and not el.find(["img", "h1", "h2", "h3", "h4", "p", "div"]):
            t = clean(el.get_text(" "))
            href = el["href"]
            if len(t) < 60:
                self.emit(f"[{t}]({href})")
                return
        if el.name == "li":
            t = clean(el.get_text(" "))
            if t and not el.find(["img", "h1", "h2", "h3", "h4", "ul", "ol"]):
                self.emit("- " + t)
                return
        has_direct_text = any(isinstance(c, NavigableString) and not isinstance(c, Comment) and c.strip() for c in el.children)
        if has_direct_text and not el.find(["h1", "h2", "h3", "h4", "h5", "h6", "img", "li", "p", "div"]):
            t = clean(el.get_text(" "))
            if t:
                self.emit(t)
            return
        for c in el.children:
            self.walk(c, page)


def to_md(root, page, images):
    ex = Extractor(images)
    ex.walk(root, page)
    out, prev = [], None
    for l in ex.lines:
        if l != prev:
            out.append(l)
        prev = l
    return "\n\n".join(out) + "\n"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    images, index, global_done = {}, [], False
    for slug, path in PAGES.items():
        try:
            html, final = fetch(path)
        except Exception as e:
            print(f"FAIL {slug}: {e}")
            continue
        soup = BeautifulSoup(html, "lxml")
        title = clean(soup.title.get_text()) if soup.title else ""
        desc = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
        main_el = soup.find(id="pxl-content-main") or soup.find("main") or soup.body
        banner = soup.find(id="pxl-page-title-elementor")
        banner_md = ("<!-- page title banner -->\n\n" + to_md(banner, slug, images) + "\n<!-- /page title banner -->\n\n") if banner and slug != "home" else ""
        header = f"---\nslug: {slug}\nsource: {final}\ntitle: {title!r}\ndescription: {(desc.get('content') if desc else '')!r}\n---\n\n"
        (OUT / f"{slug}.md").write_text(header + banner_md + to_md(main_el, slug, images), encoding="utf-8")
        if not global_done:
            parts = []
            for sel, name in (("pxl-header-elementor", "Header / Navigation"), ("pxl-footer-elementor", "Footer")):
                el = soup.find(id=sel)
                if el:
                    parts.append(f"# {name}\n\n" + to_md(el, "_global", images))
            (OUT / "_global-header-footer.md").write_text(f"---\nsource: {final}\n---\n\n" + "\n\n".join(parts), encoding="utf-8")
            global_done = True
        index.append({"slug": slug, "source": final, "title": title})
        print(f"ok   {slug:40s} {final}")
        time.sleep(0.5)
    (OUT / "images.json").write_text(json.dumps(images, indent=2), encoding="utf-8")
    (OUT / "pages.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    print(f"\n{len(index)} pages, {len(images)} unique images")


main()
