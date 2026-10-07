"""Convert the client's gallery photos (design/originals/gallery/<FOLDER>/) to web-sized WebP in
public/images/gallery/<group>/ and write src/content/gallery.json for the gallery page.

Run: python3 scripts/build-gallery.py
"""

import json
import os
import re

from PIL import Image, ImageOps

SRC = "design/originals/gallery"
OUT = "public/images/gallery"
MAX = 2000  # longest side, px

# Folder → group id, label and place line. Order here is the order on the page.
GROUPS = [
    ("ROYAL HABITAT", "royal-habitat", "Royal Habitat", "Kerala"),
    ("ROCK STAR VAZHAKKALLA", "rock-star-vazhakkala", "Rock Star Vazhakkala", "Kochi, Kerala"),
    ("MISTY BLUE", "misty-blue", "Misty Blue", "Munnar, Kerala"),
    ("ROCK VALLEY", "rock-valley", "Rock Valley", "Kakkanad, Kerala"),
    ("kochi office inaugration January 2006", "kochi-office-2006", "Kochi office inauguration", "January 2006"),
]

# The Grand Manor's photos are on its project page (public/images/projects/grand-manor), not here.
DESCRIPTIONS = {}

# Near-identical frames left out (same shot taken in a row).
SKIP = {
    "ROCK VALLEY": {"IMG_5342.JPG", "IMG_5344.JPG"},
    "ROCK STAR VAZHAKKALLA": {"08.jpg", "09.jpg", "10.jpg", "13.jpg"},
}


def natural(name):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", name)]


def label(name):
    # The Grand Manor files are named by room ("DINING_CEILING.JPG" → "Dining ceiling").
    stem = re.sub(r"[_-]?\d*$", "", os.path.splitext(name)[0]).replace("_", " ").strip().lower()
    stem = (
        stem.replace("coverd courty yard", "covered courtyard")
        .replace("drawing", "drawing room")
        .replace("bed", "bedroom")
        .replace("toilet", "bathroom")
    )
    return stem[:1].upper() + stem[1:]


manifest = []
for folder, gid, name, place in GROUPS:
    src = os.path.join(SRC, folder)
    if not os.path.isdir(src):
        continue
    os.makedirs(os.path.join(OUT, gid), exist_ok=True)
    files = sorted((f for f in os.listdir(src) if f.lower().endswith((".jpg", ".jpeg", ".png"))), key=natural)
    images = []
    for i, f in enumerate(f for f in files if f not in SKIP.get(folder, set())):
        im = ImageOps.exif_transpose(Image.open(os.path.join(src, f))).convert("RGB")
        im.thumbnail((MAX, MAX), Image.LANCZOS)
        out = f"{gid}/{i + 1:02d}.webp"
        im.save(os.path.join(OUT, out), quality=80, method=6)
        caption = f"{name}, {label(f).lower()}" if gid == "grand-manor" else name
        images.append({"src": f"/images/gallery/{out}", "caption": caption, "ratio": "landscape" if im.width >= im.height else "portrait"})
    entry = {"id": gid, "label": name, "place": place, "images": images}
    if gid in DESCRIPTIONS:
        entry["description"] = DESCRIPTIONS[gid]
    manifest.append(entry)
    print(gid, len(images))

with open("src/content/gallery.json", "w") as fh:
    json.dump(manifest, fh, indent=1, ensure_ascii=False)
