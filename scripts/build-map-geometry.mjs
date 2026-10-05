// Builds src/content/geo/montenegro.json from the geoBoundaries ADM0 outline (CC BY 4.0,
// design/map/geoBoundaries-MNE-ADM0.geojson): simplified with Douglas–Peucker so the map ships small.
// Run: node scripts/build-map-geometry.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { geoArea } from "d3-geo";

const TOLERANCE = 0.0012; // degrees (about 100–130 m), keeps the Bay of Kotor's shape

function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1e-12;
    let max = 0;
    let index = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * points[i][0] - dx * points[i][1] + bx * ay - by * ax) / len;
      if (d > max) {
        max = d;
        index = i;
      }
    }
    if (max > tolerance && index > 0) {
      keep[index] = 1;
      stack.push([a, index], [index, b]);
    }
  }
  return points.filter((_, i) => keep[i]).map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);
}

const source = JSON.parse(readFileSync("design/map/geoBoundaries-MNE-ADM0.geojson", "utf8"));
const geometry = source.features[0].geometry;
const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
// Rings are closed (first point = last), so split each at the point farthest from its start and
// simplify the two halves; otherwise Douglas–Peucker sees a zero-length baseline.
function simplifyRing(ring) {
  let far = 0;
  let best = -1;
  ring.forEach(([x, y], i) => {
    const d = Math.hypot(x - ring[0][0], y - ring[0][1]);
    if (d > best) {
      best = d;
      far = i;
    }
  });
  const first = simplify(ring.slice(0, far + 1), TOLERANCE);
  const second = simplify(ring.slice(far), TOLERANCE);
  return [...first, ...second.slice(1)];
}

const simplified = polygons.map((rings) => rings.map(simplifyRing));

// d3-geo treats a polygon whose area exceeds a hemisphere as "everything but this shape", so make
// sure each polygon winds the way d3 expects (clockwise exterior).
function rewind(feature) {
  if (geoArea(feature) > 2 * Math.PI) {
    feature.geometry.coordinates = feature.geometry.type === "Polygon"
      ? feature.geometry.coordinates.map((ring) => ring.slice().reverse())
      : feature.geometry.coordinates.map((poly) => poly.map((ring) => ring.slice().reverse()));
  }
  return feature;
}

const country = rewind({
  type: "Feature",
  properties: { name: "Montenegro" },
  geometry: { type: "MultiPolygon", coordinates: simplified },
});

// Skadar Lake, traced by hand (approximate shoreline): the boundary data doesn't separate lakes.
const lake = rewind({
  type: "Feature",
  properties: { name: "Skadar Lake" },
  geometry: {
    type: "Polygon",
    coordinates: [[
      // North shore, north-west to south-east, then the south shore back
      [19.07, 42.32], [19.13, 42.31], [19.2, 42.3], [19.27, 42.275], [19.34, 42.245], [19.41, 42.2], [19.47, 42.14],
      [19.51, 42.09], [19.49, 42.06], [19.43, 42.075], [19.36, 42.105], [19.29, 42.135], [19.22, 42.16], [19.16, 42.195],
      [19.11, 42.225], [19.09, 42.25], [19.07, 42.29], [19.07, 42.32],
    ]],
  },
});

writeFileSync(
  "src/content/geo/montenegro.json",
  JSON.stringify({ source: "geoBoundaries ADM0 (CC BY 4.0), simplified", country, lake }),
);
console.log("points", simplified.flat(1).reduce((n, ring) => n + ring.length, 0), "bytes", readFileSync("src/content/geo/montenegro.json").length);
