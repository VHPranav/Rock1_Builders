// Interactive map of Montenegro (About Montenegro page): our projects plus cities, airports, beaches
// and sights. Coordinates are WGS84 [longitude, latitude]. Destination images are Google Flow renders
// (content/image-prompts.md, "Montenegro map destinations"); `image: null` shows a placeholder.

export type PlaceKind = "project" | "city" | "airport" | "beach" | "sight";

export type MapPlace = {
  id: string;
  name: string;
  kind: PlaceKind;
  coordinates: [number, number];
  description: string;
  image: string | null;
  // Projects link to their page and carry a status line.
  href?: string;
  note?: string;
  // Put the name on the left of the pin where it would collide with a neighbour.
  labelLeft?: boolean;
};

export const placeKinds: { kind: PlaceKind; label: string }[] = [
  { kind: "project", label: "Our projects" },
  { kind: "city", label: "Cities & towns" },
  { kind: "beach", label: "Beaches" },
  { kind: "sight", label: "Nature & sights" },
  { kind: "airport", label: "Airports" },
];

// Distances in the panel are measured from Life Bay.
export const mapOrigin = "life-bay";

export const montenegroMap = {
  eyebrow: "Explore Montenegro",
  title: "Where we build, and what's around it.",
  intro:
    "Our developments sit on the Bar Riviera, within easy reach of the Bay of Kotor, the mountains of the north and two international airports. Select a place to see it.",
  // Wider area the map flies in from (the "Europe" step of the breadcrumb): [west, south, east, north].
  region: [13.6, 39.6, 24.4, 45.6] as [number, number, number, number],
  // Zoom presets: [west, south, east, north] in degrees.
  views: [
    { id: "all", label: "All Montenegro", bounds: [18.4, 41.84, 20.4, 43.58] },
    { id: "coast", label: "The coast", bounds: [18.45, 41.85, 19.45, 42.55] },
    { id: "bay", label: "Bay of Kotor", bounds: [18.5, 42.36, 18.86, 42.52] },
  ] as { id: string; label: string; bounds: [number, number, number, number] }[],
  places: [
    {
      id: "life-bay",
      name: "Life Bay",
      kind: "project",
      coordinates: [19.1385, 42.0408],
      labelLeft: true,
      note: "Ongoing · 20 apartments",
      description:
        "Sea-view apartments with a pool and parking in Dobra Voda on the Bar Riviera, beside an Ayurveda wellness centre, a first for Montenegro.",
      image: "/images/projects/life-bay/render.webp",
      href: "/projects/life-bay",
    },
    {
      id: "ocean-crest",
      name: "Ocean Crest",
      kind: "project",
      coordinates: [19.156, 42.0485],
      note: "Newly launched · 35 villas",
      description:
        "Coastal villas with private sea-view infinity pools, 2 km from Dobra Voda beach and minutes from Bar, with the Life Bay wellness centre next door.",
      image: "/images/projects/ocean-crest/frontage.webp",
      href: "/projects/ocean-crest",
    },
    {
      id: "podgorica",
      name: "Podgorica",
      kind: "city",
      coordinates: [19.2594, 42.4304],
      description:
        "Montenegro's capital and business centre on the Morača river, with the country's main international airport about an hour's drive from Dobra Voda.",
      image: "/images/map/podgorica.webp",
    },
    {
      id: "kotor",
      name: "Kotor",
      kind: "city",
      coordinates: [18.7712, 42.4247],
      description:
        "A UNESCO World Heritage walled town at the head of the Bay of Kotor: Venetian squares, St Tryphon's Cathedral and fortress walls climbing the mountain behind.",
      image: "/images/map/kotor.webp",
    },
    {
      id: "budva",
      name: "Budva",
      kind: "city",
      coordinates: [18.8403, 42.2911],
      description:
        "The heart of the Budva Riviera: a walled old town on a small peninsula, a marina and some of the Adriatic's liveliest beaches.",
      image: "/images/gateway/connectivity.webp",
    },
    {
      id: "bar",
      name: "Bar",
      labelLeft: true,
      kind: "city",
      coordinates: [19.1003, 42.0931],
      description:
        "Montenegro's main port, with ferries to Italy, a direct railway to Belgrade and the hilltop ruins of Stari Bar. About 8.5 km from our projects.",
      image: "/images/map/bar.webp",
    },
    {
      id: "ulcinj",
      name: "Ulcinj",
      kind: "city",
      coordinates: [19.2244, 41.9294],
      description:
        "Montenegro's southernmost town: a hilltop old town over the sea, and the gateway to Velika Plaža, Europe's longest medicinal sand beach.",
      image: "/images/map/ulcinj.webp",
    },
    {
      id: "tivat",
      name: "Tivat",
      kind: "city",
      coordinates: [18.6961, 42.4364],
      description: "Home of Porto Montenegro, a superyacht marina lined with waterfront residences, restaurants and shops.",
      image: "/images/why/economy.webp",
    },
    {
      id: "herceg-novi",
      name: "Herceg Novi",
      kind: "city",
      coordinates: [18.5375, 42.4531],
      description:
        "A town of stairways and gardens at the entrance to the Bay of Kotor, known for its mimosa, mild winters and old fortresses.",
      image: "/images/map/herceg-novi.webp",
    },
    {
      id: "zabljak",
      name: "Žabljak",
      labelLeft: true,
      kind: "city",
      coordinates: [19.1236, 43.1542],
      description:
        "The highest town in the Balkans and gateway to Durmitor National Park: snow-capped peaks, glacial lakes and winter skiing.",
      image: "/images/map/zabljak.webp",
    },
    {
      id: "podgorica-airport",
      name: "Podgorica Airport",
      kind: "airport",
      coordinates: [19.2519, 42.3594],
      note: "TGD",
      description: "Montenegro's main international airport, about 60 km (around an hour by car) from Dobra Voda.",
      image: "/images/map/podgorica-airport.webp",
    },
    {
      id: "tivat-airport",
      name: "Tivat Airport",
      kind: "airport",
      coordinates: [18.7233, 42.4047],
      note: "TIV",
      description: "International airport on the Bay of Kotor serving the coast, with seasonal flights from across Europe.",
      image: "/images/map/tivat-airport.webp",
    },
    {
      id: "velika-plaza",
      name: "Velika Plaža",
      kind: "beach",
      coordinates: [19.315, 41.885],
      description:
        "Ulcinj's Long Beach: about 12 km of fine sand, Europe's longest medicinal sand beach, a short drive from our projects.",
      image: "/images/map/velika-plaza.webp",
    },
    {
      id: "sveti-stefan",
      name: "Sveti Stefan",
      kind: "beach",
      coordinates: [18.8917, 42.2556],
      description:
        "The iconic 15th-century island village joined to the shore by a sandbar, with pink-sand beaches on either side.",
      image: "/images/why/tourism.webp",
    },
    {
      id: "perast",
      name: "Perast",
      kind: "sight",
      coordinates: [18.6989, 42.4864],
      description:
        "A baroque stone village on the Bay of Kotor, its palazzi facing the islet church of Our Lady of the Rocks.",
      image: "/images/why/stability.webp",
    },
    {
      id: "lovcen",
      name: "Lovćen",
      kind: "sight",
      coordinates: [18.8392, 42.3994],
      description:
        "National park crowned by the Njegoš Mausoleum, with views over the Bay of Kotor and the Adriatic from its summit.",
      image: "/images/map/lovcen.webp",
    },
    {
      id: "skadar",
      name: "Skadar Lake",
      kind: "sight",
      coordinates: [19.2, 42.24],
      description:
        "The largest lake in the Balkans: a national park of water lilies, birdlife and wine villages such as Virpazar, a short drive from the coast.",
      image: "/images/why/nature.webp",
    },
    {
      id: "ostrog",
      name: "Ostrog Monastery",
      kind: "sight",
      coordinates: [19.0297, 42.675],
      description:
        "A white monastery built into a sheer cliff high above the Bjelopavlići plain, one of the most visited pilgrimage sites in the Balkans.",
      image: "/images/map/ostrog.webp",
    },
    {
      id: "tara",
      name: "Tara Canyon",
      kind: "sight",
      coordinates: [19.2942, 43.1489],
      description:
        "The Đurđevića Tara Bridge spans one of Europe's deepest canyons, a centre for rafting and ziplining in the north.",
      image: "/images/map/tara.webp",
    },
  ] as MapPlace[],
  // Faint labels for the surrounding sea and countries.
  labels: [
    { text: "Adriatic Sea", coordinates: [18.75, 41.95] as [number, number], sea: true },
    { text: "Croatia", coordinates: [18.47, 42.62] as [number, number] },
    { text: "Bosnia & Herzegovina", coordinates: [18.75, 43.25] as [number, number] },
    { text: "Serbia", coordinates: [20.05, 43.45] as [number, number] },
    { text: "Kosovo", coordinates: [20.35, 42.75] as [number, number] },
    { text: "Albania", coordinates: [19.75, 42.0] as [number, number] },
  ],
  credit:
    "Imagery: Sentinel-2 cloudless 2016 by EOX (contains modified Copernicus Sentinel data), CC BY 4.0. Borders: geoBoundaries (CC BY 4.0), Natural Earth.",
};
