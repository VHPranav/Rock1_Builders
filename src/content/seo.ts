// Meta titles, descriptions and focus keywords per page, from the SEO team's "Meta Tags" sheet:
// https://docs.google.com/spreadsheets/d/1w4TvX_LEgb7DUrPNNjTqL60XTJbfyLKJDe5L9GZZjA8/edit?gid=231819030
// Titles are used as-is (no "– Rock1 Builders" suffix is added).

import type { Metadata } from "next";

type PageSeo = { focusKeyword: string; title: string; description: string };

export const seo: Record<string, PageSeo> = {
  "/": {
    focusKeyword: "buy property in montenegro",
    title: "Buy Property in Montenegro - Bar, Dobra Voda | Rock1 Builders",
    description:
      "Buy luxury villas, modern apartments and seaside residences in Montenegro, Europe. Embrace coastal living and explore holiday home investment opportunities.",
  },
  "/about-us": {
    focusKeyword: "About Us",
    title: "Property Developer in Montenegro | Rock1 Builders",
    description:
      "Explore property for sale in Montenegro, including premium apartments and villas, backed by 25+ years of property development experience.",
  },
  "/about-montenegro": {
    focusKeyword: "property in montenegro",
    title: "Luxury Property in Montenegro | Coastal Living & Investment",
    description:
      "Looking for luxury property in Montenegro? Explore sea-view villas, modern apartments and premium coastal homes in Bar and Dobra Voda.",
  },
  "/legal": {
    focusKeyword: "Our Legal documents",
    title: "Our Legal Documents for Property Buyers in Montenegro",
    description:
      "Make an informed property decision in Montenegro. Review title deed extracts, company registration and tax documentation before proceeding.",
  },
  "/our-services": {
    focusKeyword: "montenegro property",
    title: "Montenegro Property Services | Investment & Rental Management",
    description:
      "Investing in Montenegro? Know property investment, rental management and residency assistance for a smoother European property ownership journey.",
  },
  "/projects": {
    focusKeyword: "Our Projects",
    title: "Property Projects in Montenegro & Kerala | Villas & Apartments",
    description:
      "With 25+ years of experience and 50+ completed projects, explore luxury apartments in Montenegro and premium residential developments across India.",
  },
  "/projects/life-bay": {
    focusKeyword: "life bay",
    title: "Buy Dobra Voda Apartments | Life Bay Projects in Montenegro",
    description:
      "Looking for sea-view apartments in Montenegro? Explore premium residences in Dobra Voda with a swimming pool, parking and Adriatic coastal living.",
  },
  "/projects/royal-habitat": {
    focusKeyword: "Royal Habitat",
    // The sheet says "in Montenegro", but Royal Habitat is a completed project in India.
    title: "Luxury Villa & Private Residence | Royal Habitat in India",
    description:
      "Looking for a luxurious home away from home? Experience Royal Habitat, with a private pool, fruit orchard and elegant spaces for relaxing getaways.",
  },
  "/projects/rock-star-vazhakkala": {
    focusKeyword: "Rock Star Vazhakkala",
    title: "Luxury Villa Development in Kochi, Kerala | Rock1 Builders",
    description:
      "From Kerala to Montenegro, explore Rock Star Vazhakkala, a completed luxury villa project showcasing Rock1 Builders’ residential development experience.",
  },
  "/projects/rock-valley": {
    focusKeyword: "Rock Valley",
    title: "Rock Valley | Luxury Villa Project in Kakkanad, Kochi",
    description:
      "From Kerala to Montenegro, explore Rock Valley, a 4,000 sq. ft. luxury villa in Kakkanad, featuring contemporary design, a private pool and premium leisure spaces.",
  },
  "/projects/misty-blue": {
    focusKeyword: "Misty Blue",
    title: "Misty Blue | Luxury Resort Project in Munnar, Kerala",
    description:
      "From Munnar’s misty blue hills to Montenegro’s Adriatic coast, our journey in property development continues with luxury residences and resort projects.",
  },
  "/projects/grand-manor": {
    focusKeyword: "Grand Manor",
    title: "Grand Manor | Luxury Mansion in Kakkanad, Kochi",
    description:
      "Dreaming of an exceptional residence? Explore Grand Manor, a premium mansion in Kakkanad, Kochi, showcasing our property development experience in India and Montenegro.",
  },
  "/gallery": {
    focusKeyword: "Our Gallery",
    title: "Luxury Villas & Apartments Gallery | Rock1 Builders",
    description:
      "Looking for luxury home inspiration? Explore our gallery of villas with infinity pools, elegant interiors and modern apartments across Kerala and Montenegro.",
  },
  "/newsroom": {
    focusKeyword: "real estate market",
    title: "Montenegro Real Estate News & Market Updates | Rock1 Builders",
    description:
      "Stay updated on Montenegro's property market, EU accession progress, residency regulations and the latest developments shaping real estate investment.",
  },
  "/blog": {
    focusKeyword: "montenegro property insights",
    title: "Insights on Montenegro Property & Investment | Rock1 Builders",
    description:
      "Articles and guides from Rock1 Builders on buying property in Montenegro, residency, the Adriatic market and Mediterranean living.",
  },
  "/contact-us": {
    focusKeyword: "Contact Rock 1 Builders",
    title: "Montenegro Property Enquiries & Consultations | Rock1 Builders",
    description:
      "Planning a property investment in Montenegro? Get in touch to discuss available properties, land enquiries and your real estate goals.",
  },
};

// Title, description and keywords for a page in the sheet; pages not in it (e.g. Ocean Crest) get nothing here.
export function seoMetadata(path: string): Metadata {
  const page = seo[path];
  return page ? { title: page.title, description: page.description, keywords: [page.focusKeyword] } : {};
}
