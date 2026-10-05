"""Stitch Sentinel-2 cloudless 2016 tiles (EOX, CC BY 4.0) into the map's satellite images.

Tiles live in design/map/tiles-z<zoom>/<y>_<x>.jpg (Web Mercator, 256 px). Outputs go to
public/images/map/satellite/ and their geographic bounds to src/content/geo/satellite.json, which the
map uses to place each image in its projection.

Run: python3 scripts/build-map-satellite.py
"""

import json
import math
import os

from PIL import Image

OUT_DIR = "public/images/map/satellite"
META = "src/content/geo/satellite.json"


def tile_lon(x, z):
    return x / 2**z * 360 - 180


def tile_lat(y, z):
    n = math.pi - 2 * math.pi * y / 2**z
    return math.degrees(math.atan(math.sinh(n)))


def lonlat_to_px(lon, lat, z):
    n = 2**z * 256
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def stitch(z):
    folder = f"design/map/tiles-z{z}"
    keys = [tuple(map(int, f[:-4].split("_"))) for f in os.listdir(folder) if f.endswith(".jpg")]
    ys = sorted({y for y, _ in keys})
    xs = sorted({x for _, x in keys})
    image = Image.new("RGB", (len(xs) * 256, len(ys) * 256))
    for y, x in keys:
        try:
            tile = Image.open(f"{folder}/{y}_{x}.jpg").convert("RGB")
        except OSError:
            continue
        image.paste(tile, ((x - xs[0]) * 256, (y - ys[0]) * 256))
    return image, xs[0], ys[0], z


def crop(stitched, bounds, max_width, name, quality):
    image, x0, y0, z = stitched
    west, south, east, north = bounds
    left, top = lonlat_to_px(west, north, z)
    right, bottom = lonlat_to_px(east, south, z)
    box = (round(left - x0 * 256), round(top - y0 * 256), round(right - x0 * 256), round(bottom - y0 * 256))
    part = image.crop(box)
    if part.width > max_width:
        part = part.resize((max_width, round(part.height * max_width / part.width)), Image.LANCZOS)
    part.save(f"{OUT_DIR}/{name}.webp", quality=quality, method=6)
    # Report the exact bounds of the cropped pixels, so placement is pixel-accurate.
    n = 2**z * 256
    def lon(px):
        return px / n * 360 - 180
    def lat(py):
        return math.degrees(math.atan(math.sinh(math.pi - 2 * math.pi * py / n)))
    gx0, gy0 = box[0] + x0 * 256, box[1] + y0 * 256
    gx1, gy1 = box[2] + x0 * 256, box[3] + y0 * 256
    size = os.path.getsize(f"{OUT_DIR}/{name}.webp")
    print(f"{name}: {part.width}x{part.height}, {size // 1024} KB")
    return {"src": f"/images/map/satellite/{name}.webp", "bounds": [lon(gx0), lat(gy1), lon(gx1), lat(gy0)]}


os.makedirs(OUT_DIR, exist_ok=True)
meta = {"credit": "Sentinel-2 cloudless 2016 by EOX IT Services GmbH (contains modified Copernicus Sentinel data 2016), CC BY 4.0"}

if os.path.isdir("design/map/tiles-z8"):
    meta["region"] = crop(stitch(8), [12.6, 38.6, 25.4, 46.6], 2048, "region", 72)

detail = stitch(12)
meta["country"] = crop(detail, [18.4, 41.84, 20.4, 43.58], 3072, "country", 70)
meta["coast"] = crop(detail, [18.45, 41.85, 19.45, 42.55], 3200, "coast", 72)

with open(META, "w") as f:
    json.dump(meta, f, indent=1)
