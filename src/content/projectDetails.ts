import type { GalleryImage } from "@/components/GalleryGrid";

// Extended content for /projects/[slug], from each old project page (content/raw/project-*.md).
// The short fields (name, location, stat, summary, image) live in projects.items in home.ts.

export type DetailList = { title: string; items: string[] };
export type Photo = { src: string; caption: string; wide?: boolean };
export type VillaType = {
  name: string;
  size: string;
  specs: { label: string; value: string }[];
  plans?: { src: string; caption: string; width: number; height: number }[];
};

type ProjectDetail = {
  // Line shown above the old project pages' titles.
  tagline?: string;
  overview: string[];
  lists?: DetailList[];
  villas?: VillaType[];
  // Real photography and client media (design/originals/old-site and design/originals/client).
  heroImage?: string;
  logo?: { src: string; alt: string; width: number; height: number };
  heroVideo?: { src: string; poster: string };
  bandVideo?: { src: string; poster: string; label: string };
  film?: { title: string; src: string; poster: string };
  // Films about the project: YouTube (click to play) or a self-hosted MP4 with controls.
  videos?: { title: string; duration: string; youtubeId?: string; src?: string; poster?: string }[];
  stills?: Photo[];
  // Further photographs, in a grid that opens full-screen (The Grand Manor).
  photos?: GalleryImage[];
  brochure?: Photo[];
  sitePlan?: { src: string; full: string; caption: string };
  downloads?: { label: string; href: string }[];
  // Architect's floor plan PDF, shown page by page with its download button.
  floorPlans?: { title: string; pdf: { label: string; href: string }; pages: { src: string; caption: string }[] };
};

export const projectDetails: Record<string, ProjectDetail> = {
  "life-bay": {
    logo: { src: "/images/logos/life-bay-montenegro.webp", alt: "Life Bay Montenegro", width: 1119, height: 513 },
    heroImage: "/images/projects/life-bay/render.webp",
    // The old page's "Download Detail.PDF" (Montenegro-Brochure.pdf, also linked from Home, About Us and About Montenegro).
    downloads: [{ label: "Download the Life Bay brochure (PDF)", href: "/documents/life-bay-montenegro-brochure.pdf" }],
    floorPlans: {
      title: "Phase 1 floor plans",
      pdf: { label: "Download Phase 1 floor plans (PDF)", href: "/documents/life-bay-phase-1-floor-plans.pdf" },
      pages: [
        { src: "/images/projects/life-bay/floor-plans/01.webp", caption: "Basement: parking, lift and lobby" },
        { src: "/images/projects/life-bay/floor-plans/02.webp", caption: "Ground floor: suites, pool, Ayurveda centre and lobby" },
        { src: "/images/projects/life-bay/floor-plans/03.webp", caption: "First floor" },
        { src: "/images/projects/life-bay/floor-plans/04.webp", caption: "Second floor" },
        { src: "/images/projects/life-bay/floor-plans/05.webp", caption: "Third floor" },
      ],
    },
    // 8 s Google Flow film made from the real render (design/flow/life-bay-start-frame.jpg), muted.
    bandVideo: {
      src: "/videos/life-bay.mp4",
      poster: "/images/projects/life-bay/film-poster.webp",
      label: "Life Bay apartment building in Dobra Voda, late-afternoon light",
    },
    // Pages from the Life Bay brochure, as shown on the old project page.
    brochure: [
      { src: "/images/projects/life-bay/brochure-0007.webp", caption: "Your home, your blueprint" },
      { src: "/images/projects/life-bay/brochure-0012.webp", caption: "Studio apartment floor plan" },
      { src: "/images/projects/life-bay/brochure-0012-1.webp", caption: "Studio apartment floor plan, alternative layout" },
      { src: "/images/projects/life-bay/brochure-0013.webp", caption: "1-bedroom apartment floor plan" },
      { src: "/images/projects/life-bay/brochure-0014.webp", caption: "Ayurveda by the Adriatic" },
      { src: "/images/projects/life-bay/brochure-0015.webp", caption: "Amenities" },
      { src: "/images/projects/life-bay/brochure-0017.webp", caption: "Property management services" },
    ],
    overview: [
      "The Life Bay residential project by Rock1 Builders is a strategic development in Dobra Voda, Montenegro, designed to capitalise on the rapidly expanding real estate and tourism market in the Bar Riviera.",
      "Leveraging the region's competitive property pricing and high demand for coastal rentals, the project offers investors modern, high-quality apartments featuring sea views and essential amenities like a swimming pool and car parking.",
      "The development provides a compelling investment proposition, with Montenegro's favourable climate and growing tourism sector driving strong potential rental yields.",
      "The development is backed by the credibility and track record of Rock1 Builders, who also developed the acclaimed Broad Bean Resort & Spa in Munnar.",
    ],
  },
  "ocean-crest": {
    tagline: "The Crown of Luxury Living",
    logo: { src: "/images/logos/ocean-crest-adriatic.webp", alt: "Ocean Crest Adriatic", width: 359, height: 198 },
    // 11 s of the exterior renders (32-43 s of the client's 3D film), muted, for the hero background.
    heroVideo: { src: "/videos/ocean-crest-hero.mp4", poster: "/images/projects/ocean-crest/hero-poster.webp" },
    film: {
      title: "Ocean Crest Adriatic in 3D",
      src: "/videos/ocean-crest-3d.mp4",
      poster: "/images/projects/ocean-crest/frontage.webp",
    },
    // Stills taken from the client's 3D film (real project renders).
    stills: [
      { src: "/images/projects/ocean-crest/render-two-storey.webp", caption: "Two-storey villa with private pool", wide: true },
      { src: "/images/projects/ocean-crest/exterior.webp", caption: "Villa building exterior" },
      { src: "/images/projects/ocean-crest/entrance.webp", caption: "Ground-floor entrance" },
      { src: "/images/projects/ocean-crest/living.webp", caption: "Living and kitchen" },
      { src: "/images/projects/ocean-crest/bedroom.webp", caption: "Bedroom with sea view" },
      { src: "/images/projects/ocean-crest/render-single-storey.webp", caption: "Single-storey villa with private pool", wide: true },
    ],
    sitePlan: {
      src: "/images/projects/ocean-crest/site-plan.webp",
      full: "/images/projects/ocean-crest/site-plan-full.webp",
      caption: "Ocean Crest Adriatic Phase II site plan: Blocks A and B with pools, beside the Phase I apartment block and 3-bedroom villa.",
    },
    downloads: [{ label: "Download the villa brochure (PDF)", href: "/documents/ocean-crest-adriatic-villa-brochure.pdf" }],
    floorPlans: {
      title: "Phase II floor plans",
      pdf: { label: "Download Phase II floor plans (PDF)", href: "/documents/ocean-crest-adriatic-phase-ii-floor-plans.pdf" },
      pages: [
        { src: "/images/projects/ocean-crest/floor-plans/01.webp", caption: "Block A, ground floor" },
        { src: "/images/projects/ocean-crest/floor-plans/02.webp", caption: "Block A, first floor" },
        { src: "/images/projects/ocean-crest/floor-plans/03.webp", caption: "Block A, second floor" },
        { src: "/images/projects/ocean-crest/floor-plans/04.webp", caption: "Block B, ground floor" },
        { src: "/images/projects/ocean-crest/floor-plans/05.webp", caption: "Block B, first floor" },
      ],
    },
    overview: [
      "Ocean Crest is a thoughtfully designed residential project that brings together modern architecture, comfort, and a refined lifestyle. Crafted with attention to detail and quality construction, it offers elegant living spaces designed for both functionality and sophistication.",
      "Inspired by serene coastal surroundings and contemporary design principles, Ocean Crest creates a peaceful environment while keeping residents connected to essential urban conveniences, ideal for families and individuals seeking a balance of luxury and tranquillity.",
      "The project reflects a commitment to excellence, offering a lifestyle that combines comfort, style, and long-term value in a truly distinctive address.",
    ],
    lists: [
      {
        title: "Location highlights",
        items: [
          "Close to Europe's longest medicinal sand beach in Ulcinj",
          "Minutes from the beautiful Dobra Voda beach",
          "Near the historical Bar Old Town, rich in culture and heritage",
          "Close to the scenic Skadar Lake, a natural wonder",
          "Bar City is an upcoming hub with a major shipping port and direct railway connectivity to Belgrade",
          "Strategic location with an upcoming 4-lane highway connecting to Europe",
        ],
      },
      {
        title: "Connectivity & accessibility",
        items: [
          "Podgorica airport: 60 km (1 hour drive)",
          "Albania airport: 150 km (1.5 hour drive)",
          "Dobra Voda city centre: 2 km",
          "Nearby beach: 2 km",
          "Bar city: 8.5 km",
          "Supermarket, hotels and more: 800 m",
        ],
      },
      {
        title: "Major European cities (flight times)",
        items: [
          "Vienna, Austria: 2 hours",
          "Milan, Italy: 1.5 hours",
          "Istanbul, Turkey: 2 hours",
          "Belgrade, Serbia: 1 hour",
          "Zagreb, Croatia: 1.5 hours",
        ],
      },
      {
        title: "Amenities",
        items: [
          "Infinity swimming pool with sea views",
          "Landscaped Mediterranean sea-view garden",
          "Covered and outdoor parking",
          "Secure cycle storage and maintenance area",
          "Elegant lobby with comfortable seating areas",
          "An exclusive Ayurveda wellness centre at Life Bay Apartments, adjacent to the villas",
        ],
      },
      {
        title: "Additional services",
        items: [
          "Assist in arranging professional resort management companies to handle tourist rental services and property maintenance",
          "Airport transfer arrangements",
          "Tourist information and activity booking",
          "Car rental and local transportation assistance",
        ],
      },
    ],
    villas: [
      {
        name: "Villa Type A",
        size: "170.7 m² (1,837 sq. ft.)",
        specs: [
          { label: "Land", value: "350 m² (3,767 sq. ft.)" },
          { label: "Bedrooms", value: "4" },
          { label: "Parking", value: "2-car garage" },
          { label: "Pool", value: "Sea-view infinity pool" },
          { label: "Interiors", value: "Fully furnished, customisable on demand" },
          { label: "Optional", value: "Home theatre or health club" },
        ],
        plans: [
          { src: "/images/projects/ocean-crest/plan-a-ground.webp", caption: "Ground floor", width: 547, height: 725 },
          { src: "/images/projects/ocean-crest/plan-a-first.webp", caption: "First floor", width: 547, height: 750 },
        ],
      },
      {
        name: "Villa Type B",
        size: "120 m² (1,290 sq. ft.)",
        specs: [
          { label: "Land", value: "300 m² (3,229 sq. ft.)" },
          { label: "Bedrooms", value: "3" },
          { label: "Parking", value: "1-car garage" },
          { label: "Pool", value: "Sea-view infinity pool" },
          { label: "Interiors", value: "Semi-furnished" },
        ],
        plans: [
          { src: "/images/projects/ocean-crest/plan-b-ground.webp", caption: "Ground floor", width: 1294, height: 1486 },
        ],
      },
      {
        name: "Villa Type C",
        size: "71 m² (764 sq. ft.)",
        specs: [
          { label: "Building", value: "71 m² (764 sq. ft.)" },
          { label: "Ground floor", value: "Living, dining, kitchen and parking (32 m²)" },
          { label: "First floor", value: "2 bedrooms, 2 bathrooms and balcony (39 m²)" },
          { label: "Parking", value: "Yes" },
          { label: "Sea view", value: "Optional" },
          { label: "Land", value: "Private garden" },
        ],
        plans: [
          { src: "/images/projects/ocean-crest/plan-c-ground.webp", caption: "Ground floor", width: 754, height: 1318 },
          { src: "/images/projects/ocean-crest/plan-c-first.webp", caption: "First floor", width: 686, height: 1290 },
        ],
      },
      {
        name: "Villa Type D",
        size: "32 m² (345 sq. ft.)",
        specs: [
          { label: "Land", value: "60 m² (undivided share)" },
          { label: "Layout", value: "Balcony, living, dining and kitchenette" },
          { label: "Units", value: "One on the ground floor, one on the first floor, outside staircase" },
          { label: "Parking", value: "Yes" },
        ],
        plans: [
          { src: "/images/projects/ocean-crest/plan-d-ground.webp", caption: "Ground floor", width: 796, height: 1466 },
          { src: "/images/projects/ocean-crest/plan-d-first.webp", caption: "First floor", width: 800, height: 1508 },
        ],
      },
    ],
  },
  "royal-habitat": {
    tagline: "The Crown of Luxury Living",
    heroImage: "/images/projects/royal-habitat/hero.webp",
    stills: [
      { src: "/images/projects/royal-habitat/garden.webp", caption: "The villa across its landscaped lawn", wide: true },
      { src: "/images/projects/royal-habitat/entrance-sign.webp", caption: "Entrance" },
      { src: "/images/projects/royal-habitat/courtyard.webp", caption: "Indoor water court" },
      { src: "/images/projects/royal-habitat/atrium.webp", caption: "Double-height living room" },
      { src: "/images/projects/royal-habitat/kitchen.webp", caption: "Kitchen" },
      { src: "/images/projects/royal-habitat/living.webp", caption: "Lounge" },
      { src: "/images/projects/royal-habitat/dusk.webp", caption: "The villa at dusk", wide: true },
    ],
    overview: [
      "Occupying an expansive 20,000 sq. metre plot, Royal Habitat is a 10,000 sq. ft. architectural masterpiece featuring six grand bedrooms, a lavish home theatre, an executive office, and a breathtaking indoor water fountain.",
      "The property is surrounded by a landscaped garden, fruit orchard, and private swimming pool, offering the perfect harmony of elegance and serenity. Royal Habitat is the ultimate symbol of prestige and modern royal comfort.",
    ],
  },
  "rock-star-vazhakkala": {
    heroImage: "/images/projects/rock-star-vazhakkala/night.webp",
    stills: [
      { src: "/images/projects/rock-star-vazhakkala/dusk.webp", caption: "The bungalow at dusk", wide: true },
      { src: "/images/projects/rock-star-vazhakkala/living.webp", caption: "Living room" },
      { src: "/images/projects/rock-star-vazhakkala/veranda.webp", caption: "Garden veranda" },
      { src: "/images/projects/rock-star-vazhakkala/garden.webp", caption: "Landscaped garden" },
      { src: "/images/projects/rock-star-vazhakkala/office.webp", caption: "Office room" },
      { src: "/images/projects/rock-star-vazhakkala/night-side.webp", caption: "Evening lighting", wide: true },
    ],
    overview: [
      "Set on 15,000 square metres of prime land, this estate boasts a 10,000 sq. ft. luxury bungalow designed for elite living, with five spacious bedrooms, a dedicated home theatre, an office room, and a children's playhouse.",
      "Its landscaped gardens, private play area, and garage for five cars enhance its grandeur. Perfect for family comfort and entertainment, the property embodies modern architecture, privacy, and elegance.",
    ],
  },
  "rock-valley": {
    tagline: "Modern Luxury Home",
    heroImage: "/images/projects/rock-valley/hero.webp",
    stills: [
      { src: "/images/projects/rock-valley/side.webp", caption: "The four-bedroom residence", wide: true },
      { src: "/images/projects/rock-valley/porch.webp", caption: "Garden porch" },
      { src: "/images/projects/rock-valley/terrace.webp", caption: "Terrace" },
      { src: "/images/projects/rock-valley/stairs.webp", caption: "Staircase hall" },
      { src: "/images/projects/rock-valley/living.webp", caption: "Living room" },
    ],
    overview: [
      "Located in the heart of Kakkanad, Rock Valley spans 10,000 sq. metres with a 4,000 sq. ft. premium residence.",
      "The four-bedroom villa includes a private swimming pool, home theatre, office space, and a lush garden for leisure. Designed with contemporary aesthetics, it offers urban luxury within a peaceful natural setting.",
    ],
  },
  "grand-manor": {
    tagline: "One of our first luxury mansions",
    heroImage: "/images/projects/grand-manor/elevation.webp",
    stills: [
      { src: "/images/projects/grand-manor/landscaping.webp", caption: "Landscaped garden", wide: true },
      { src: "/images/projects/grand-manor/covered-courtyard.webp", caption: "Covered courtyard" },
      { src: "/images/projects/grand-manor/dining.webp", caption: "Dining" },
      { src: "/images/projects/grand-manor/dining-ceiling.webp", caption: "Teak dining ceiling" },
      { src: "/images/projects/grand-manor/drawing-room-2.webp", caption: "Drawing room" },
      { src: "/images/projects/grand-manor/master-bedroom.webp", caption: "Master bedroom", wide: true },
    ],
    photos: [
      { src: "/images/projects/grand-manor/drawing-room.webp", caption: "Drawing room", ratio: "portrait" },
      { src: "/images/projects/grand-manor/dining-2.webp", caption: "Dining and lounge", ratio: "landscape" },
      { src: "/images/projects/grand-manor/kitchen.webp", caption: "Kitchen", ratio: "landscape" },
      { src: "/images/projects/grand-manor/office-room.webp", caption: "Office room", ratio: "landscape" },
      { src: "/images/projects/grand-manor/bedroom.webp", caption: "Bedroom", ratio: "landscape" },
      { src: "/images/projects/grand-manor/bedroom-2.webp", caption: "Bedroom", ratio: "landscape" },
      { src: "/images/projects/grand-manor/bathroom.webp", caption: "Bathroom", ratio: "portrait" },
      { src: "/images/projects/grand-manor/bathroom-2.webp", caption: "Bathroom", ratio: "landscape" },
    ],
    overview: [
      "The Grand Manor in Kakkanad, Kochi, completed in 2003, is one of Rock1 Builders' first luxury mansions.",
      "It is crafted using premium Nilambur teak, a luxurious and expensive timber widely regarded as one of the finest and most prestigious in the world.",
    ],
  },
  "misty-blue": {
    heroImage: "/images/projects/misty-blue/hero.webp",
    videos: [{ title: "The Legacy of Misty Blue", duration: "5:40", youtubeId: "IWejp-mLw_U" }],
    stills: [
      { src: "/images/projects/misty-blue/lake.webp", caption: "Munnar's first lake resort", wide: true },
      { src: "/images/projects/misty-blue/room.webp", caption: "Executive room" },
      { src: "/images/projects/misty-blue/room-media.webp", caption: "Executive room" },
      { src: "/images/projects/misty-blue/suite.webp", caption: "Suite" },
      { src: "/images/projects/misty-blue/aerial.webp", caption: "The resort from above" },
    ],
    overview: [
      "Nestled amidst the misty hills of Munnar, Misty Blue redefines luxury and tranquillity. Spread across a beautifully landscaped garden, this five-star resort features 35 executive rooms, a swimming pool, a wellness and spa centre, a multi-cuisine restaurant, and a dedicated barbecue zone.",
      "Guests can unwind by the private pond and serene lake, or enjoy cultural evenings at the open-air amphitheatre. With panoramic views of lush greenery, Misty Blue stands as Munnar's first and only lake resort.",
    ],
  },
};

// The real photograph or render for a project, used wherever a project is pictured.
export function projectPhoto(slug: string, fallback: string | null): string | null {
  return projectDetails[slug]?.heroImage ?? fallback;
}
