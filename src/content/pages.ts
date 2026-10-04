// Inner-page content, from the old site (content/raw/*.md). Leftover WordPress theme filler and dead
// links ("Watch video!", "View Full Profile", "Click Here" with no target) are dropped.
//
// Needs client/legal review before launch (kept as the old site states it):
// - "guaranteed" yields and 8–12% / 8–10% return figures,
// - "immediate eligibility" for residency, while the Newsroom notice says the qualifying amount was revised,
// - Our Services says 16+ completed projects while About / Home say 50+ landmark projects.

import type { GalleryImage } from "@/components/GalleryGrid";

export const about = {
  eyebrow: "About Us",
  title: "Twenty five years of trust. Your gateway to global wealth.",
  intro:
    "For over 25 years, Rock1 Builders has been more than a property developer. We have been a custodian of trust and a pioneer of architectural quality.",
  image: "/images/why/stability.webp",
  // 8 s Google Flow film made from the image above (watermark cropped); see content/image-prompts.md.
  video: { src: "/videos/about-us.mp4", poster: "/images/pages/about-us-film-poster.webp" } as { src: string; poster: string } | undefined,
  story: [
    "Our unblemished track record spans South India, where we have successfully promoted and delivered townships, residential apartments, and commercial spaces. This sustained effort has resulted in over 50 landmark projects, shaping the urban landscape and creating lasting value for countless families and investors.",
    "We believe that true development is not merely about constructing buildings; it is about crafting enduring ecosystems where life can thrive. This core philosophy, a relentless passion for excellence, is what drives us to look beyond established borders.",
  ],
  trust: {
    eyebrow: "Trust",
    title: "A pioneering developer with a 25-year unblemished record.",
    intro:
      "Our commitment is to develop a long-lasting relationship with every client, providing a full set of services to secure your financial future.",
    pillars: [
      {
        title: "Proven legacy",
        text: "Building trust, one landmark at a time: over 50 projects delivered across South India over 25 years. Our history is a testament to unwavering reliability and timeless design.",
      },
      {
        title: "Global quality",
        text: "We bring our passion for excellence to the world stage. Projects like Life Bay Montenegro cultivate spaces that lift the spirit, built to international standards.",
      },
      {
        title: "Complete solution",
        text: "End-to-end asset management, legal compliance, and full support for securing your family's European residency.",
      },
    ],
    facts: [
      "A globally owned company with offices in Montenegro, Dubai, and India.",
      "Local expertise and on-ground project management in Montenegro.",
      "Complete legal and documentation support for every international transaction.",
      "Over 25 years in business, delivering communities built with care and trust.",
    ],
  },
  // Project film from the "Invest in Montenegro" YouTube channel; the old site linked it from the footer.
  film: {
    eyebrow: "The film",
    title: "See Rock1 Builders in Montenegro.",
    youtubeId: "PfVaq7U5rBs",
    videoTitle: "Rock 1 Builders Project Video",
  },
  ceo: {
    eyebrow: "Leadership",
    role: "CEO & Executive Director",
    name: "K. Bawa Salim",
    photo: "/images/team/bawa-salim.webp",
    bio: [
      "Salim Bawa is a multifaceted entrepreneur from Kerala, the southernmost state in India. Kerala is one of the world's most sought-after tourism destinations and enjoys human development indices comparable to many developed nations.",
      "His entrepreneurial journey in tourism and real estate spans 25 years of innovative thinking and success, beginning with the launch of Vintage Properties Pvt. Ltd. in 1996.",
      "He holds a Bachelor's degree in Economics, an Integrated Management Certification from the District Industrial Centre, Government of India, and an Export Import Certificate from a reputed institute in Ahmedabad, Gujarat.",
    ],
  },
  team: {
    eyebrow: "Our core team",
    members: [
      {
        name: "Shekhar D'Costa",
        photo: "/images/team/shekhar-dcosta.webp",
        role: "Project Coordinator",
        bio: "With over 37 years of experience, including as Deputy General Manager at the State Bank of India, Mr. D'Costa brings deep expertise in finance, operations, compliance, risk management, HR, and administration. He oversees project execution, financial management, customer relations, and overall coordination in Montenegro.",
      },
      {
        name: "Shahid Salim",
        photo: "/images/team/shahid-salim.webp",
        role: "Regional Manager",
        bio: "Ensures operational excellence and seamless project delivery across all teams. His leadership, strategic planning, and commitment to efficiency keep projects running smoothly, deadlines met, and client expectations consistently achieved across the region.",
      },
      {
        name: "Mahmut Vukovic",
        photo: "/images/team/mahmut-vukovic.webp",
        role: "Project Advisor",
        bio: "Provides local expertise and strategic guidance, supporting project planning and execution with deep industry knowledge to ensure smooth coordination, informed decisions, and adherence to global standards. Through careful analysis and practical experience, he contributes to delivering efficient, high-quality projects that meet organisational and client expectations.",
      },
    ],
  },
};

// Shared by About Us and About Montenegro.
export const europeanAdvantage = {
  eyebrow: "The European Advantage",
  title: "Montenegro is the smart investment in Europe.",
  intro:
    "A high-yield financial return and a smooth, supported pathway to European residency. Backed by Rock1's 25 years of trust, this is your world-class asset on the tax-friendly Adriatic coast.",
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
      text: "Minutes from the stunning Dobra Voda beach and historic Bar Old Town: a world-class asset with timeless design, in a country known for its magnificent climate, culture, and natural beauty.",
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
  title: "Montenegro real estate investment guide.",
  intro:
    "Montenegro, the Black Mountain, is an exquisite jewel on the Adriatic coast: dramatic fjords, UNESCO-protected medieval towns, and sun-drenched beaches.",
  image: "/images/gateway/wellness.webp",
  video: { src: "/videos/about-montenegro.mp4", poster: "/images/pages/about-montenegro-film-poster.webp" } as { src: string; poster: string } | undefined,
  body: [
    "More than a breathtaking destination, Montenegro stands as Europe's most compelling investment frontier. As a long-term candidate for EU membership with an economy that uses the Euro, it offers a rare blend of stability, low taxation, and growth potential.",
    "For the discerning investor, buying property here is not simply buying a home; it is securing a profitable, world-class asset and a valuable European residency.",
  ],
};

export const galleryPage = {
  eyebrow: "Gallery",
  title: "The spaces we build.",
  intro: "Renders of our developments on Montenegro's Bar Riviera, and photographs of the residences and resorts we have completed in Kerala.",
  // Real project photography from the old site (design/originals/old-site), Montenegro renders first.
  images: [
    { src: "/images/projects/ocean-crest/render-two-storey.webp", caption: "Ocean Crest, Bar Riviera", ratio: "landscape" },
    { src: "/images/projects/ocean-crest/living.webp", caption: "Ocean Crest, living and kitchen", ratio: "portrait" },
    { src: "/images/projects/life-bay/render.webp", caption: "Life Bay, Dobra Voda", ratio: "portrait" },
    { src: "/images/projects/ocean-crest/render-single-storey.webp", caption: "Ocean Crest villa with private pool", ratio: "landscape" },
    { src: "/images/projects/ocean-crest/bedroom.webp", caption: "Ocean Crest, sea-view bedroom", ratio: "portrait" },
    { src: "/images/projects/rock-star-vazhakkala/night.webp", caption: "Rock Star, Vazhakkala", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hero.webp", caption: "Royal Habitat", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9117.webp", caption: "Royal Habitat, garden court", ratio: "portrait" },
    { src: "/images/projects/misty-blue/lake.webp", caption: "Misty Blue, Munnar", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9293.webp", caption: "Royal Habitat at night", ratio: "landscape" },
    { src: "/images/projects/misty-blue/fountain-pool.webp", caption: "Misty Blue pool", ratio: "portrait" },
    { src: "/images/projects/rock-valley/hero.webp", caption: "Rock Valley, Kakkanad", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/3.webp", caption: "Royal Habitat, water court", ratio: "landscape" },
    { src: "/images/projects/rock-star-vazhakkala/dusk.webp", caption: "Rock Star at dusk", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9030.webp", caption: "Royal Habitat, glass bridge", ratio: "portrait" },
    { src: "/images/projects/misty-blue/aerial.webp", caption: "Misty Blue from above", ratio: "portrait" },
    { src: "/images/projects/rock-valley/gable.webp", caption: "Rock Valley, garden porch", ratio: "portrait" },
    { src: "/images/projects/royal-habitat/1.webp", caption: "Royal Habitat from above", ratio: "landscape" },
    { src: "/images/projects/rock-star-vazhakkala/living.webp", caption: "Rock Star, living room", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a8939.webp", caption: "Royal Habitat, atrium stair", ratio: "portrait" },
    { src: "/images/projects/misty-blue/suite.webp", caption: "Misty Blue suite", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9264.webp", caption: "Royal Habitat", ratio: "landscape" },
    { src: "/images/projects/rock-valley/living.webp", caption: "Rock Valley, living room", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9124.webp", caption: "Royal Habitat, courtyard room", ratio: "portrait" },
    { src: "/images/projects/rock-star-vazhakkala/drive.webp", caption: "Rock Star, garden drive", ratio: "landscape" },
    { src: "/images/projects/misty-blue/cottage-dusk.webp", caption: "Misty Blue cottages at dusk", ratio: "portrait" },
    { src: "/images/projects/royal-habitat/hu6a9347.webp", caption: "Royal Habitat, screened facade", ratio: "landscape" },
    { src: "/images/projects/rock-star-vazhakkala/veranda.webp", caption: "Rock Star, veranda", ratio: "landscape" },
    { src: "/images/projects/misty-blue/pool.webp", caption: "Misty Blue infinity pool", ratio: "portrait" },
    { src: "/images/projects/royal-habitat/hu6a8990.webp", caption: "Royal Habitat, stone and timber", ratio: "portrait" },
    { src: "/images/projects/rock-valley/terrace.webp", caption: "Rock Valley, terrace", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9281.webp", caption: "Royal Habitat by night", ratio: "landscape" },
    { src: "/images/projects/misty-blue/bedroom.webp", caption: "Misty Blue bedroom", ratio: "landscape" },
    { src: "/images/projects/rock-star-vazhakkala/office.webp", caption: "Rock Star, office room", ratio: "landscape" },
    { src: "/images/projects/royal-habitat/hu6a9014.webp", caption: "Royal Habitat, upper gallery", ratio: "portrait" },
    { src: "/images/projects/rock-valley/porch.webp", caption: "Rock Valley, porch", ratio: "landscape" },
  ] as GalleryImage[],
};

export const newsroom = {
  eyebrow: "Newsroom",
  title: "Updates for buyers and investors.",
  intro: "Announcements on our projects, regulations and the Montenegrin market.",
  posts: [
    {
      slug: "residency-investment-update",
      category: "Buyer notice",
      title: "Important update for existing and prospective buyers",
      paragraphs: [
        "Due to recent regulatory changes associated with Montenegro's EU accession process, the minimum qualifying real estate investment amount required for residency eligibility has been revised by local authorities.",
        "With Montenegro's confirmed EU accession pathway, property values and tourism demand are expected to continue increasing, further strengthening the long-term investment potential of the market.",
        "Clients considering residency applications may contact our office at the time of project completion for the latest guidance and eligibility requirements.",
      ],
    },
  ],
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
    { src: "/images/legal/vat-registration.webp", caption: "VAT (PDV) registration, Revenue and Customs Administration, Budva", ratio: "document" },
    { src: "/images/legal/certificate-of-incorporation.webp", caption: "Certificate of Incorporation, Vintage Properties Pvt. Ltd., Kerala", ratio: "document" },
    { src: "/images/legal/misty-blue-trade-mark.webp", caption: "Misty Blue trade mark certificate, Government of India", ratio: "document" },
  ] as GalleryImage[],
};
