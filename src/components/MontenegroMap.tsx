import { geoMercator, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countries from "world-atlas/countries-50m.json";
import MontenegroMapClient, { type ProjectedPlace, type Rect } from "@/components/MontenegroMapClient";
import geo from "@/content/geo/montenegro.json";
import satellite from "@/content/geo/satellite.json";
import { montenegroMap } from "@/content/montenegroMap";

// Server half of the map: projects outlines, places and satellite images once (Web Mercator), so the
// browser only receives SVG path strings and coordinates. The client half handles the fly-in, zoom,
// filters, pins and cards.

const WIDTH = 1000;
const NEIGHBOURS = ["Croatia", "Bosnia and Herz.", "Serbia", "Kosovo", "Albania"];

const box = ([w, s, e, n]: number[]): Feature<Geometry> => ({
  type: "Feature",
  properties: {},
  geometry: { type: "MultiPoint", coordinates: [[w, s], [e, n]] },
});

// Base frame: the "All Montenegro" bounds at 1000 units wide.
const projection = geoMercator().fitWidth(WIDTH, box(montenegroMap.views[0].bounds));
const toPath = geoPath(projection);

const rectFor = (bounds: number[]): Rect => {
  const [[x0, y0], [x1, y1]] = toPath.bounds(box(bounds));
  return [x0, y0, x1, y1];
};

type MontenegroMapProps = {
  // Project page variant: the project's place id, the view to land on and its own heading.
  focus?: string;
  landing?: string;
  heading?: { eyebrow: string; title: string; intro: string };
};

export default function MontenegroMap({ focus, landing, heading }: MontenegroMapProps = {}) {
  const topology = countries as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const neighbours = feature(topology, topology.objects.countries).features.filter((f) =>
    NEIGHBOURS.includes(f.properties?.name ?? ""),
  );

  const paths = {
    neighbours: neighbours.map((f) => toPath(f) ?? "").join(" "),
    country: toPath(geo.country as Feature<Geometry>) ?? "",
  };

  const places: ProjectedPlace[] = montenegroMap.places.map((place) => {
    const [x, y] = projection(place.coordinates) ?? [0, 0];
    return { ...place, x, y };
  });

  const labels = montenegroMap.labels.map((label) => {
    const [x, y] = projection(label.coordinates) ?? [0, 0];
    return { text: label.text, sea: "sea" in label && !!label.sea, x, y };
  });

  const views = [
    { id: "region", label: "Europe", rect: rectFor(montenegroMap.region) },
    ...montenegroMap.views.map((view) => ({ id: view.id, label: view.label, rect: rectFor(view.bounds) })),
  ];

  // Satellite rasters placed by their geographic bounds; "coast" is a sharper layer for zooming in.
  const rasters = (["region", "country", "coast"] as const)
    .filter((key) => key in satellite)
    .map((key) => {
      const layer = satellite[key as keyof typeof satellite] as { src: string; bounds: number[] };
      return { id: key, src: layer.src, rect: rectFor(layer.bounds) };
    });

  return (
    <MontenegroMapClient
      paths={paths}
      places={places}
      labels={labels}
      views={views}
      rasters={rasters}
      focus={focus}
      landing={landing}
      heading={heading}
      currentId={focus}
    />
  );
}
