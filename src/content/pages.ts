// Inner-page content, from the old site (content/raw/*.md). Leftover WordPress theme filler and dead
// links ("Watch video!", "View Full Profile", "Click Here" with no target) are dropped.
//
// Needs client/legal review before launch (kept as the old site states it):
// - "guaranteed" yields and 8–12% / 8–10% return figures,
// - "immediate eligibility" for residency, while the Newsroom notice says the qualifying amount was revised,
// - Our Services says 16+ completed projects while About / Home say 50+ landmark projects.

import type { GalleryImage } from "@/components/GalleryGrid";
import clientGallery from "@/content/gallery.json";

export type GalleryGroup = { id: string; label: string; place: string; description?: string; images: GalleryImage[] };

export const about = {
  eyebrow: "About Us",
  // Nov 2026 brief: the H1 carries the search phrase; the tagline stays the large styled line.
  heading: "Rock1 Builders: Real Estate & Property Developer in Montenegro",
  title: "Twenty-five years of trust.",
  intro:
    "We have been property developers since 1996, with 50+ projects in South India and now offer Montenegro property for sale in Dobra Voda, Bar.",
  image: "/images/why/stability.webp",
  // 8 s Google Flow film made from the image above (watermark cropped); see content/image-prompts.md.
  video: { src: "/videos/about-us.mp4", poster: "/images/pages/about-us-film-poster.webp" } as { src: string; poster: string } | undefined,
  story: [
    "Our proven track record spans South India, where we have successfully promoted and delivered townships, residential apartments, and commercial spaces. This sustained effort has resulted in over 50 landmark projects, shaping the urban landscape and creating lasting value for countless families and investors.",
    "We believe that true development is not merely about constructing buildings; it is about crafting enduring ecosystems where life can thrive. This core philosophy, together with a relentless passion for excellence, is what drives us to look beyond established borders.",
    "Today, that experience is focused on the Adriatic coast. In Dobra Voda, near Bar, we are building two projects: Life Bay, with 17 sea-view Montenegro apartments, and Ocean Crest, a collection of Montenegro villas for sale with private sea-view infinity pools. Both are managed by our team in Budva.",
  ],
  trust: {
    eyebrow: "Trust",
    title: "A pioneering real estate & property developer with a 25-year proven record.",
    intro:
      "Our commitment is to develop a long-lasting relationship with every client, providing a full set of services to secure your financial future.",
    pillars: [
      {
        title: "Proven legacy",
        text: "Building trust, one landmark at a time: over 50 projects delivered across South India over 25 years. Our history is a testament to unwavering reliability and timeless design.",
      },
      {
        title: "Global quality",
        text: "We bring our passion for excellence to the world stage. Projects like Life Bay and Ocean Crest in Montenegro cultivate spaces that lift the spirit, built to international standards.",
      },
      {
        title: "Complete solution",
        text: "End-to-end asset management, legal compliance, and full support for international buyers, from choosing where to buy a house in Montenegro to applying for a residence permit.",
      },
    ],
    facts: [
      "An international company with offices in Budva (Montenegro), Dubai, and India.",
      "Local expertise and on-ground project management in Montenegro.",
      "Complete legal and documentation support for every international transaction.",
      "Over 25 years in business, delivering communities built with care and trust.",
    ],
  },
  // Project film from the "Invest in Montenegro" YouTube channel; the old site linked it from the footer.
  film: {
    eyebrow: "The film",
    title: "See Rock1 Builders in Montenegro.",
    description: "A short film about Rock1 Builders and our projects in Dobra Voda, Bar.",
    youtubeId: "PfVaq7U5rBs",
    videoTitle: "Rock 1 Builders Project Video",
    // From the YouTube video page, for the video's structured data.
    uploadDate: "2025-10-28T03:47:37-07:00",
    duration: "2:53",
  },
  ceo: {
    eyebrow: "Leadership",
    role: "CEO & Executive Director",
    name: "K. Bawa Salim",
    photo: "/images/team/bawa-salim-portrait.webp",
    bio: [
      "K. Bawa Salim is a multifaceted entrepreneur from Kerala, the southernmost state in India. Kerala is one of the world's most sought-after tourism destinations and enjoys human development indices comparable to many developed nations.",
      "His entrepreneurial journey in tourism and real estate spans more than 25 years of innovative thinking and success, beginning with the launch of Vintage Properties Pvt. Ltd. in 1996. Today, he leads Rock1 Builders and its expansion into Montenegro.",
      "He holds a Bachelor's degree in Economics, an Integrated Management Certification from the District Industrial Centre, Government of India, and an Export-Import Certificate from a reputed institute in Ahmedabad, Gujarat.",
    ],
  },
  team: {
    eyebrow: "Our core team",
    members: [
      {
        name: "Shekhar D'Costa",
        photo: "/images/team/shekhar-dcosta-portrait.webp",
        role: "Project Coordinator",
        bio: "With over 37 years of experience, including as Deputy General Manager at the State Bank of India, Mr. D'Costa brings deep expertise in finance, operations, compliance, risk management, HR, and administration. He oversees project execution, financial management, customer relations, and overall coordination in Montenegro.",
      },
      {
        name: "Shahid Salim",
        photo: "/images/team/shahid-salim-portrait.webp",
        role: "Regional Manager",
        bio: "He ensures operational excellence and seamless project delivery across all teams. His leadership, strategic planning, and commitment to efficiency keep projects running smoothly, deadlines met, and client expectations consistently achieved across the region.",
      },
      {
        name: "Mahmut Vukovic",
        photo: "/images/team/mahmut-vukovic-portrait.webp",
        role: "Project Advisor",
        bio: "He provides local expertise and strategic guidance, supporting project planning and execution with deep industry knowledge to ensure smooth coordination, informed decisions, and adherence to global standards. Through careful analysis and practical experience, he contributes to delivering efficient, high-quality projects that meet organisational and client expectations.",
      },
    ],
  },
  // Nov 2026 brief: FAQ section before the contact block.
  faqs: {
    eyebrow: "FAQs",
    title: "Frequently asked questions",
    intro: "",
    cta: { label: "Speak with our advisor", href: "/contact-us" },
    items: [
      {
        question: "Who is Rock1 Builders?",
        answer:
          "Rock1 Builders is a real estate and property developer with roots going back to 1996. It has completed more than 50 projects in South India and is now building Life Bay and Ocean Crest in Dobra Voda, Bar, Montenegro, with its head office in Budva.",
      },
      {
        question: "What Montenegro property for sale does Rock1 Builders offer?",
        answer:
          "Sea-view Montenegro apartments at Life Bay (17 apartments) and Montenegro villas for sale at Ocean Crest (23 villas and townhouses), both in Dobra Voda, near Bar.",
      },
      {
        question: "Can foreigners buy a house in Montenegro?",
        answer:
          "Yes, foreign buyers can own apartments and houses in Montenegro on the same terms as locals, with full ownership once the purchase is registered in the cadastre. Our team supports international buyers at every step.",
      },
      {
        question: "Where are Rock1 Builders' offices?",
        answer: "Our head office is in Budva, Montenegro, and we also have offices in Dubai and India.",
      },
    ],
  },
  // Contact block intro on this page (the other pages use the Home page's).
  contactIntro: "Reach out to us, we're here to help you find the right home in Montenegro.",
};

// Shared by About Us and About Montenegro.
export const europeanAdvantage = {
  eyebrow: "The European Advantage",
  title: "Montenegro is the smart investment in Europe.",
  intro:
    "A tangible asset in a euro-using country on the path to EU membership, and a smooth, supported pathway to a Montenegrin residence permit. Backed by Rock1's 25 years of trust, this is your world-class asset on the tax-friendly Adriatic coast.",
  pillars: [
    {
      title: "A pathway to residency in Montenegro",
      text: "Secure your family's future in Europe. Owning property in Montenegro can make you eligible for a temporary residence permit, and we support the entire process with full legal and immigration assistance: a smooth route to a base in a strategically connected European country.",
      image: "/images/gateway/connectivity.webp",
    },
    {
      title: "Rental income potential",
      text: "A secure, tangible asset in an emerging European market. Our professional, hassle-free property management helps you earn rental income from Montenegro's booming tourism and its path toward EU accession.",
      image: "/images/why/economy.webp",
    },
    {
      title: "World-class Adriatic lifestyle",
      text: "Invest in a life of quality, minutes from the stunning Dobra Voda beach and historic Bar Old Town, our Montenegro apartments and villas offer timeless design in a country known for its magnificent climate, culture, and natural beauty.",
      image: "/images/why/climate.webp",
    },
  ],
};

export const servicesPage = {
  eyebrow: "Our Services",
  title: "Building trust through quality and value.",
  intro:
    "Our difference is a proven ability to create assets that enhance lifestyles and secure our clients' financial future.",
  image: "/images/services/residency-left.webp",
  video: { src: "/videos/our-services.mp4", poster: "/images/pages/our-services-film-poster.webp" } as { src: string; poster: string } | undefined,
  body: [
    "In addition to our 25-year legacy of award-winning projects across India, our expertise extends to cultivating high-yield European investments, providing comprehensive property management, and ensuring a seamless process for European residency.",
    "Whether you are looking for an asset that provides passive income or a long-term base in Europe, what excites us is creating spaces that deliver both financial return and peace of mind. As professional developers and asset managers, we build trust one landmark at a time.",
  ],
  stats: [
    { value: "1996", suffix: "", label: "Since" },
    { value: "16", suffix: "+", label: "Completed projects" },
    { value: "3", suffix: "", label: "Countries" },
    { value: "8–10", suffix: "%", label: "Projected returns" },
  ],
};

export const montenegroPage = {
  eyebrow: "About Montenegro",
  // The page's H1 (Nov 2026 brief).
  title: "Property in Montenegro: Living on the Adriatic Coast",
  intro:
    "Montenegro, the Black Mountain, is an exquisite jewel on the Adriatic coast: dramatic fjords, UNESCO-protected medieval towns, and sun-drenched beaches.",
  image: "/images/gateway/wellness.webp",
  video: { src: "/videos/about-montenegro.mp4", poster: "/images/pages/about-montenegro-film-poster.webp" } as { src: string; poster: string } | undefined,
  body: [
    "More than a breathtaking destination, Montenegro stands as one of Europe's most promising property markets. As a long-term candidate for EU membership with an economy that uses the Euro, it offers a rare blend of stability, low taxation, and growth potential.",
    "For buyers, property in Montenegro is not simply a home; it is a long-term asset and a pathway to a Montenegrin residence permit.",
  ],
  // Replaces "Why Choose Montenegro" on this page (Nov 2026 brief); same card design and images.
  propertyTypes: {
    eyebrow: "Property types",
    title: "Types of Property in Montenegro",
    intro:
      "Montenegro's coast offers everything from entry-level apartments in towns like Bar to luxury coastal properties around the Bay of Kotor.",
    reasons: [
      {
        title: "Contemporary and modern apartments",
        description:
          "Modern apartments are a popular first purchase on the coast. Many are contemporary apartments in new buildings with sea views, pools and parking, while modern luxury apartments add wellness and concierge services.",
        tone: "#5b6b73",
        image: "/images/why/economy.webp" as string | null,
      },
      {
        title: "Entry-level and first-time buyer homes",
        description:
          "Studios and one-bedroom apartments make good entry-level homes. As first-time buyer homes, they are easier to furnish, rent out and look after from abroad.",
        tone: "#9c5b3c",
        image: "/images/why/tax-living.webp" as string | null,
      },
      {
        title: "Mediterranean villas and houses",
        description:
          "Traditional stone Mediterranean homes and modern Mediterranean villas, often with terraces, gardens and pools, line the hillsides above the sea. A classic Mediterranean house among olive trees is part of the coast's charm.",
        tone: "#8a7a64",
        image: "/images/why/stability.webp" as string | null,
      },
      {
        title: "Luxury coastal homes and beach houses",
        description:
          "Luxury coastal homes and luxury beach houses for sale are concentrated around Budva, Tivat and the Bay of Kotor, close to marinas and five-star resorts.",
        tone: "#6b6f4e",
        image: "/images/why/nature.webp" as string | null,
      },
      {
        title: "Seaside residences",
        description:
          "Seaside residences close to the beach attract summer visitors, giving owners the option of holiday rental income when they are not using the home.",
        tone: "#46596a",
        image: "/images/why/tourism.webp" as string | null,
      },
      {
        title: "Modern coastal homes on the Bar Riviera",
        description:
          "In Dobra Voda, Rock1 Builders offers modern coastal homes: sea-view apartments at Life Bay and villas with private infinity pools at Ocean Crest.",
        tone: "#7d6a5a",
        image: "/images/why/climate.webp" as string | null,
      },
    ],
  },
  // Replaces "The European Advantage" on this page (Nov 2026 brief). The three cards keep the live site's
  // wording ("no change" in the brief), so they are this page's own copy, not the shared About Us block.
  glance: {
    eyebrow: "Montenegro at a glance",
    title: "Key facts for international buyers",
    intro: "The essentials buyers ask about before choosing property in Montenegro.",
    pillars: [
      {
        title: "The gateway to European residency",
        text: "Secure your family's European future. Property ownership provides eligibility for a European Residency Permit, and we support the entire process with full legal and immigration assistance: a smooth route to a permanent base in a strategically connected European country.",
        image: "/images/gateway/connectivity.webp",
      },
      {
        title: "High-yield European investment",
        text: "A secure, high-performing financial asset in an emerging European market. We project annual gross yields of 8% to 12% through our professional, hassle-free property management, leveraging Montenegro's booming tourism and its path toward EU accession.",
        image: "/images/why/economy.webp",
      },
      {
        title: "World-class Adriatic lifestyle",
        text: "Invest in a life of quality, backed by Rock1's 25 years of trusted delivery. Minutes from the stunning Dobra Voda beach and historic Bar Old Town: a world-class asset with timeless design, in a country known for its magnificent climate, culture, and natural beauty.",
        image: "/images/why/climate.webp",
      },
    ],
    facts: [
      { label: "Currency", value: "Euro (€)" },
      { label: "EU status", value: "Candidate country; membership targeted for 2028" },
      { label: "Location", value: "Adriatic coast, between Croatia and Albania" },
      { label: "Capital", value: "Podgorica" },
      { label: "International airports", value: "Podgorica and Tivat" },
      { label: "Climate", value: "250+ sunny days a year" },
      { label: "Foreign ownership", value: "Foreigners can buy apartments and houses on the same terms as locals" },
      { label: "Residency", value: "Owning property can support an application for a temporary residence permit" },
    ],
    // Shown beside the facts table, in the same section.
    faqs: [
      {
        question: "Can foreigners buy property in Montenegro?",
        answer:
          "Yes, foreign buyers can own apartments and houses on the same terms as locals, with full ownership once the purchase is registered in the cadastre.",
      },
      {
        question: "What types of property in Montenegro can I buy?",
        answer:
          "Apartments of every size, from studios to modern luxury apartments, as well as houses and villas. Some land, such as agricultural land, has restrictions for foreign buyers.",
      },
      {
        question: "Where is Dobra Voda?",
        answer: "Dobra Voda (Dobre Vode) is a coastal village on the Bar Riviera, just south of the town of Bar in southern Montenegro.",
      },
    ],
  },
  // Contact block intro on this page (the other pages use the Home page's).
  contactIntro: "Reach out to us. We're here to help you find the right home in Montenegro.",
};

export const galleryPage = {
  eyebrow: "Gallery",
  title: "List Of Completed Projects",
  intro: "Renders of our developments on Montenegro's Bar Riviera, and photographs of the residences, resorts and offices we have built in Kerala.",
  // Montenegro renders first; the Kerala groups are the client's photo sets (src/content/gallery.json,
  // built by scripts/build-gallery.py from design/originals/gallery).
  groups: [
    {
      id: "montenegro",
      label: "Montenegro",
      place: "Bar Riviera",
      images: [
        { src: "/images/projects/ocean-crest/render-two-storey.webp", caption: "Ocean Crest, Bar Riviera", ratio: "landscape" },
        { src: "/images/projects/ocean-crest/living.webp", caption: "Ocean Crest, living and kitchen", ratio: "portrait" },
        { src: "/images/projects/life-bay/render.webp", caption: "Life Bay, Dobra Voda", ratio: "portrait" },
        { src: "/images/projects/ocean-crest/render-single-storey.webp", caption: "Ocean Crest villa with private pool", ratio: "landscape" },
        { src: "/images/projects/ocean-crest/bedroom.webp", caption: "Ocean Crest, sea-view bedroom", ratio: "portrait" },
        { src: "/images/projects/ocean-crest/exterior.webp", caption: "Ocean Crest, villa building", ratio: "landscape" },
        { src: "/images/projects/ocean-crest/entrance.webp", caption: "Ocean Crest, entrance", ratio: "landscape" },
      ] as GalleryImage[],
    },
    ...(clientGallery as GalleryGroup[]),
  ],
};

export type NewsPost = {
  slug: string;
  category: string;
  // ISO date; leave out when the source gives none.
  date?: string;
  title: string;
  summary: string;
  paragraphs: string[];
  image?: { src: string; alt?: string };
  // Line on the dark panel when the post has no image or video.
  panelText?: string;
  // uploadDate is the YouTube publish date, for the video's structured data.
  video?: { id: string; title: string; duration: string; uploadDate: string };
  source?: { label: string; href: string };
};

// Blog listing heading; the posts themselves live only in Sanity.
export const blogPage = {
  eyebrow: "Insights",
  title: "Notes on building, buying and living by the Adriatic.",
  intro: "Articles and guides from our team on Montenegro property, residency and Mediterranean living.",
};

export const newsroom = {
  eyebrow: "Rock1 Builders",
  title: "Newsroom",
  intro: "Company news, project updates and events from Rock1 Builders in Montenegro, the UAE and India.",
  // Newest first.
  posts: [
    {
      slug: "eu-preparing-montenegro-accession-treaty",
      category: "EU accession",
      date: "2026-10-01",
      title: "The EU is already preparing Montenegro's accession treaty",
      summary:
        "Speaking in Montenegro, European Commission President Ursula von der Leyen said the EU has begun preparing Montenegro's accession treaty, one of her strongest messages yet on enlargement.",
      paragraphs: [
        "An accession treaty is one of the last formal steps on the road to EU membership: it sets out the terms on which a country joins and is then ratified by the member states and the candidate.",
        "Montenegro already uses the euro and is widely seen as one of the most advanced candidates for membership. For buyers on the Adriatic coast, a clearer path into the EU means greater stability, easier movement and stronger long-term demand for property.",
        "Our team can talk you through what this means for Life Bay and Ocean Crest, and for residency questions as the process moves forward.",
      ],
      video: {
        id: "l2hjot_kaBw",
        title: "Ursula von der Leyen: EU Is Already Preparing Montenegro's Accession Treaty",
        duration: "4:52",
        uploadDate: "2026-10-01T12:17:40-07:00",
      },
      source: { label: "Video: EU Debates (eudebates.tv)", href: "https://www.youtube.com/watch?v=l2hjot_kaBw" },
    },
    {
      slug: "residency-investment-update",
      category: "Buyer notice",
      title: "Important update for existing and prospective buyers",
      summary:
        "The minimum real estate investment that qualifies for residency eligibility has been revised by the Montenegrin authorities as part of the EU accession process.",
      paragraphs: [
        "Due to recent regulatory changes associated with Montenegro's EU accession process, the minimum qualifying real estate investment amount required for residency eligibility has been revised by local authorities.",
        "With Montenegro's confirmed EU accession pathway, property values and tourism demand are expected to continue increasing, further strengthening the long-term investment potential of the market.",
        "Clients considering residency applications may contact our office at the time of project completion for the latest guidance and eligibility requirements.",
      ],
    },
  ] as NewsPost[],
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Have a question? We'll guide you every step of the way.",
  intro: "Write to us, call any of our offices, or leave your details and an advisor will get back to you.",
  formTitle: "Drop a line",
  offices: [
    {
      city: "Montenegro",
      role: "Headquarters",
      // The old site's Montenegro photo showed Brașov, Romania; Flow image of the Budva coast until the client sends one.
      image: "/images/gateway/connectivity.webp",
      address: "Rock1 Builders D.O.O (LLC), Mainski Put BB, Budva Municipality, Budva, Montenegro",
      phone: { display: "+382 6811 29 28", tel: "+38268112928" },
    },
    {
      city: "Dubai",
      role: "Corporate office",
      image: "/images/offices/dubai.webp",
      address: "Burj Al Salam Building, above Grand Sheraton, Sheikh Zayed Road, P.O. Box 73310, Dubai, UAE",
      phone: { display: "+971 529 217 302", tel: "+971529217302" },
    },
    {
      city: "India",
      role: "Regional office",
      image: "/images/offices/india.webp",
      address: "SRA 44, APJ Abdul Kalam Road, Malayidam, Thuruthu Post, Ernakulam 683561",
      phone: { display: "+91 79940 40740", tel: "+917994040740" },
    },
  ],
};

export const legalPage = {
  eyebrow: "Legal",
  title: "Legal documents.",
  intro:
    "Should you choose to proceed, these are the legal terms we will be bound by when we enter into an agreement. Kindly review them thoroughly before you proceed.",
  // Scans from the old Legal page. The company registration copy has a private individual's ID number,
  // home address and personal email blacked out (original in design/originals/old-site/legal/).
  documents: [
    { src: "/images/legal/title-deed-1.webp", caption: "Title deed extract (List nepokretnosti 2580), Dobra Voda, page 1", ratio: "document" },
    { src: "/images/legal/title-deed-2.webp", caption: "Title deed extract (List nepokretnosti 2580), Dobra Voda, page 2", ratio: "document" },
    { src: "/images/legal/company-registration.webp", caption: "Company registration, Rock1 Builders D.O.O., Central Register of Business Entities", ratio: "document" },
    { src: "/images/legal/tax-registration.webp", caption: "Tax registration (PIB), Revenue and Customs Administration, Budva", ratio: "document" },
    {
      src: "/images/legal/certificate-of-incorporation-1996.webp",
      caption: "Certificate of Incorporation – Vintage Properties Pvt. Ltd. (1996)",
      description: "Original Certificate of Incorporation issued on 28 February 1996, evidencing the incorporation of Vintage Properties Pvt. Ltd., Kerala.",
      ratio: "document",
    },
    { src: "/images/legal/misty-blue-trade-mark.webp", caption: "Misty Blue trade mark certificate, Government of India", ratio: "document" },
  ] as GalleryImage[],
};
