// Copy sourced from content/raw/home.md (current rock1builders.com homepage).
// Nov 2026: homepage content optimisation applied from the client's brief (Basecamp, Shweta R.).

export const hero = {
  eyebrow: ["Residences", "Wellness", "Investment"],
  // The page's only <h1>.
  heading: "Buy Property in Montenegro: Dobra Voda, Bar",
  // Styled tagline line, render as <p>, NOT a heading.
  title: "Gateway to Mediterranean Living",
  subtitle: "Where global investors find their next address",
  // Short intro shown under the subtitle.
  intro: "Luxury villas and new build homes in Dobra Voda, Bar, direct from the developer.",
  cta: { label: "Book a Consultation", href: "/contact-us" },
  // Placeholder background — swap for the Rock1 video once it's produced.
  videoSrc: "https://player.vimeo.com/video/1225192387?background=1",
};

export const story = {
  eyebrow: "Our Story",
  // Large heading shown above the body copy in the two-column layout.
  heading: "The Most Beautiful Encounter Between Land and Sea.",
  // Legacy one-liner kept for any component still referencing `statement`.
  statement:
    "For over 25 years and 50+ projects, we've shaped skylines across South India. Now we bring that same care to Europe with Life Bay Montenegro.",
  body1:
    "We offer investors a gateway to the Montenegro real estate market, with low taxes, Euro stability and the prospect of EU membership. For over 25 years, Rock1 Builders has been shaping skylines across South India. With more than fifty completed projects, the company blends thoughtful design with community focus. Every development reflects quality, trust and care, creating spaces where people can live, work and thrive with pride and comfort.",
  body2:
    "Now, Rock1 Builders is taking its expertise to the global stage with Life Bay Montenegro in Dobra Voda. The project features premium sea-view apartments alongside an Ayurvedic wellness centre. Residents gain a beautiful home in one of Europe's most scenic locations, a pathway to a Montenegrin residence permit and strong rental potential. For buyers from the UAE, India, Serbia, Germany and across Europe, Rock1 Builders continues to build with purpose, blending luxury living with lasting value.",
  cta: { label: "Explore", href: "/about-us" },
};

// Full "Gateway to Europe" block from the old homepage (content/raw/home.md:54-86).
export const gateway = {
  eyebrow: "Gateway to Europe",
  question: "Are you planning to build?",
  questionSub:
    "With 25+ years of trust and a proven portfolio across South India and Europe, Rock1 Builders is ready to design and build modern homes that become your home, your investment and your legacy.",
  cta: { label: "Let's Talk", href: "/contact-us" },
  intro: {
    lead: "Life Bay Montenegro",
    rest: " is located on the beautiful Adriatic coast in Dobra Voda and combines modern seaside living with Ayurvedic wellness.",
  },
  body: "It blends modern Mediterranean luxury with ancient Ayurvedic wisdom to offer thoughtfully designed apartments, world-class amenities and a pathway to a Montenegrin residence permit. This is more than a home. It's seaside living, an investment and a sanctuary for the body, mind and spirit.",
  readMore: { label: "Read more", href: "/about-us" },
  stats: [
    { value: "50", suffix: "+", label: "Luxury living spaces and commercials" },
    { value: "2,000", suffix: "+", label: "Satisfied customers" },
  ],
  // Flow-generated images, see content/image-prompts.md; null renders a tinted placeholder.
  tiles: [
    {
      label: "Amenities",
      caption: "Life Bay offers infinity pools, gardens, wellness centers, and concierge services.",
      tone: "#8a7a64",
      image: "/images/gateway/amenities.webp" as string | null,
    },
    {
      label: "Wellness",
      caption: "Residents enjoy seaside yoga, Ayurvedic retreats, cultural events, and fine dining.",
      tone: "#9c5b3c",
      image: "/images/gateway/wellness.webp" as string | null,
    },
    {
      label: "Connectivity",
      caption:
        "About an hour from Podgorica Airport and 1.5 hours from Tivat Airport, with easy access to highways, beaches and shopping hubs.",
      tone: "#46596a",
      image: "/images/gateway/connectivity.webp" as string | null,
    },
    {
      label: "Sustainability",
      caption: "Green design with solar power, rainwater harvesting, and landscaped gardens ensures sustainability.",
      tone: "#6b6f4e",
      image: "/images/gateway/sustainability.webp" as string | null,
    },
    {
      label: "Family",
      caption: "Inclusive design, playgrounds, community events, and secure environment support families.",
      tone: "#7d6a5a",
      image: "/images/gateway/family.webp" as string | null,
    },
  ],
};

// FAQs from the old homepage (questions: content/raw/home.md:254-266; answers from the live page's accordion).
// Needs client/legal review before launch: the return figure (8–12%), the Schengen claim (visa-free travel
// normally comes with citizenship, not residency) and the residency benefits are kept verbatim from the old site.
// Nov 2026 brief kept all five answers unchanged; only the intro was updated.
export const faqs = {
  eyebrow: "FAQs",
  title: "Frequently asked questions",
  intro: "The questions we hear most about buying property in Montenegro and Life Bay.",
  cta: { label: "Speak with our advisor", href: "/contact-us" },
  items: [
    {
      question: "What makes Life Bay Montenegro unique among European properties?",
      answer:
        "Life Bay Montenegro is Europe's first integrated Ayurvedic wellness resort apartment complex. It blends modern Mediterranean architecture with 5,000-year-old Ayurvedic healing principles, creating a sanctuary where wellness, investment, and luxury living coexist by the Adriatic Sea.",
    },
    {
      question: "Can international buyers invest in Life Bay Montenegro?",
      answer:
        "Yes. Life Bay welcomes international investors. Foreign nationals can own property in Montenegro with full freehold rights, making it one of the most accessible and secure real estate markets in Europe for overseas buyers.",
    },
    {
      question: "What are the investment returns I can expect?",
      answer:
        "Life Bay offers flexible rental opportunities with an estimated 8–12% annual gross return through short-term vacation rentals. Professional property management ensures consistent occupancy, transparent reporting, and seamless maintenance, all handled for you.",
    },
    {
      question: "Does buying at Life Bay provide European residency benefits?",
      answer:
        "Yes. Investing in Life Bay can make you eligible for Montenegrin residency, which includes access to free education, healthcare, and future pension benefits. Montenegro's residency pathway also provides visa-free access to the Schengen Zone and growing advantages as the nation moves toward EU membership.",
    },
    {
      question: "How is Life Bay connected to major European cities?",
      answer:
        "Life Bay is just an hour from Podgorica Airport and 1.5 hours from Tivat Airport, with direct flights to major European cities. It's close to beaches, heritage sites, and the new highway connecting Montenegro to continental Europe.",
    },
  ],
};

// "Let's Create Something Exceptional Together!" from the old homepage (content/raw/home.md:170-184).
export const contactCta = {
  eyebrow: "Where vision meets home",
  title: "Let's create something exceptional together.",
  intro: "Reach out to us, we're here to craft the perfect solution for your home.",
  primary: { label: "Speak with our advisor", href: "/contact-us" },
  // Nov 2026 brief: WhatsApp button next to "Speak with our advisor".
  // TODO: confirm the client's WhatsApp number (digits only, country code first).
  whatsapp: { label: "WhatsApp us", href: "https://wa.me/917994040740" },
  secondary: [{ label: "Explore investment options", href: "/projects/ocean-crest" }],
  // Montenegro villa brochure (Sept 2026, Ocean Crest Adriatic). The old site offered its brochure only in
  // this block on Home, About Us and About Montenegro, so those pages pass `brochure` to ContactCta.
  brochure: { label: "Download brochure", href: "/documents/ocean-crest-adriatic-villa-brochure.pdf" },
  // Shown after the phone numbers, which come from Site settings (all three offices, as in the footer).
  details: [
    { label: "Mail us", value: "enquiry@rock1builders.com", href: "mailto:enquiry@rock1builders.com" },
    { label: "Head office", value: "Rock1 Builders D.O.O (LLC), Mainski Put BB, Budva, Montenegro", href: null as string | null },
  ],
};

// "Our Projects": homepage block (content/raw/home.md:118-168) plus every project page (content/raw/project-*.md).
// Images are AI-generated illustrations of each documented brief (see content/image-prompts.md), so the
// section carries an "illustrative" note. Swap in real project photography when the client supplies it.
export type ProjectStatus = "Newly Launched" | "Ongoing" | "Completed";

export type ProjectItem = {
  name: string;
  subtitle?: string;
  location: string;
  region: "Montenegro" | "India";
  status: ProjectStatus;
  category: string;
  stat: { value: string; label: string };
  summary: string;
  // Optional shorter copy for the homepage project card; falls back to `summary` when absent.
  cardSummary?: string;
  description: string;
  slug: string;
  href: string;
  tone: string;
  image: string | null;
};

// Display order of the status groups on the Projects page and in the menu.
export const projectStatuses: ProjectStatus[] = ["Newly Launched", "Ongoing", "Completed"];

export const projects: {
  eyebrow: string;
  homeHeading: string;
  pageHeading: string;
  stripExtras: string[];
  intro: string;
  items: ProjectItem[];
} = {
  eyebrow: "Our Projects",
  // Homepage "Our Projects" section H2 (Nov 2026 brief).
  homeHeading: "Property for Sale in Montenegro",
  // /projects page heading, drawn from the client's own intro line below.
  pageHeading: "From signature residences to premium resort spaces",
  // Decorative Montenegro images shown between the project thumbnails in the /projects hero strip.
  // The hero strip shows 10 images: every project, padded out with these extras.
  // They fade away as the projects fly into the grid; they are not projects and are not linked.
  stripExtras: [
    "/images/why/nature.webp",
    "/images/gateway/wellness.webp",
    "/images/why/tourism.webp",
    "/images/gateway/connectivity.webp",
  ],
  intro:
    "Each project reflects Rock1 Builders' commitment to quality, design and value. In Montenegro, choose luxury villas and sea-view apartments in Dobra Voda, Bar. In India, explore our completed signature residences and resorts.",
  items: [
    {
      name: "Life Bay",
      location: "Dobra Voda, Montenegro",
      region: "Montenegro" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Ongoing" as ProjectStatus,
      category: "Residential",
      stat: { value: "17", label: "Apartments" },
      summary: "Premium sea-view apartments in Montenegro's Bar Riviera.",
      description:
        "A strategic development in Dobra Voda designed for the fast-growing real estate and tourism market of the Bar Riviera. Modern, high-quality apartments with sea views, a swimming pool and car parking, backed by strong rental demand and Montenegro's favourable climate.",
      slug: "life-bay",
      href: "/projects/life-bay",
      tone: "#46596a",
      image: "/images/projects/life-bay/render.webp" as string | null,
    },
    {
      name: "Ocean Crest",
      subtitle: "New Build Townhomes & Villas",
      location: "Bar Riviera, Dobra Voda",
      region: "Montenegro" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Newly Launched" as ProjectStatus,
      category: "Villas & Townhouses",
      // Nov 2026 brief says 23 units; the blog post says 20 villas. Confirm with the client.
      stat: { value: "23", label: "Units" },
      summary: "Luxury villas in Montenegro with private sea-view infinity pools. Standalone villas are built on demand.",
      cardSummary:
        "Luxury villas in Montenegro with private sea-view infinity pools, in Dobra Voda on the Bar Riviera. Standalone villas built on demand.",
      description:
        "Modern architecture, comfort and a refined Mediterranean lifestyle, minutes from Dobra Voda beach and Bar Old Town. Townhouse and villa types range from 32 m² to 170.7 m², with sea-view infinity pools, landscaped Mediterranean gardens and an Ayurveda wellness centre next door at Life Bay.",
      slug: "ocean-crest",
      href: "/projects/ocean-crest",
      tone: "#5b6b73",
      // Real render from the client's 3D film (was an AI illustration).
      image: "/images/projects/ocean-crest/frontage.webp" as string | null,
    },
    {
      name: "Royal Habitat",
      location: "Ernakulam, Kerala",
      region: "India" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Completed" as ProjectStatus,
      category: "Luxury Residence",
      stat: { value: "10,000", label: "Sq. ft." },
      summary: "A 10,000 sq. ft. residence on a 20,000 sq. m plot.",
      description:
        "Six grand bedrooms, a home theatre, an executive office and an indoor water fountain, surrounded by a landscaped garden, fruit orchard and private swimming pool.",
      slug: "royal-habitat",
      href: "/projects/royal-habitat",
      tone: "#7d6a5a",
      image: "/images/projects/royal-habitat/hero.webp" as string | null,
    },
    {
      name: "Rock Star Vazhakkala",
      location: "Vazhakkala, Kochi",
      region: "India" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Completed" as ProjectStatus,
      category: "Luxury Villa",
      stat: { value: "10,000", label: "Sq. ft." },
      summary: "A 10,000 sq. ft. luxury villa on 15,000 sq. m of prime land.",
      description:
        "Five spacious bedrooms, a home theatre, an office and a children's playhouse, with landscaped gardens, a private play area and a garage for five cars.",
      slug: "rock-star-vazhakkala",
      href: "/projects/rock-star-vazhakkala",
      tone: "#6b6f4e",
      image: "/images/projects/rock-star-vazhakkala/night.webp" as string | null,
    },
    {
      name: "Rock Valley",
      location: "Kakkanad, Kerala",
      region: "India" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Completed" as ProjectStatus,
      category: "Villa",
      stat: { value: "4,000", label: "Sq. ft." },
      summary: "A 4,000 sq. ft. premium residence in the heart of Kakkanad.",
      description:
        "A four-bedroom villa on 10,000 sq. m with a private swimming pool, home theatre, office space and a lush garden: urban luxury in a peaceful natural setting.",
      slug: "rock-valley",
      href: "/projects/rock-valley",
      tone: "#8a7a64",
      image: "/images/projects/rock-valley/hero.webp" as string | null,
    },
    {
      name: "Misty Blue",
      location: "Munnar, Kerala",
      region: "India" as "Montenegro" | "India",
      // Grouping from the old site's Project menu (Ongoing / Completed / Newly Launched).
      status: "Completed" as ProjectStatus,
      category: "Resort",
      stat: { value: "35", label: "Executive rooms" },
      summary: "Munnar's first and only lake resort.",
      description:
        "A five-star resort in the misty hills of Munnar with a swimming pool, wellness and spa centre, multi-cuisine restaurant, barbecue zone, private pond and lake, and an open-air amphitheatre.",
      slug: "misty-blue",
      href: "/projects/misty-blue",
      tone: "#4f5d56",
      image: "/images/projects/misty-blue/hero.webp" as string | null,
    },
    {
      name: "The Grand Manor",
      location: "Kakkanad, Kochi",
      region: "India" as "Montenegro" | "India",
      status: "Completed" as ProjectStatus,
      category: "Luxury Mansion",
      stat: { value: "2003", label: "Completed" },
      summary: "One of our first luxury mansions, crafted in premium Nilambur teak.",
      description:
        "Completed in 2003 in Kakkanad, Kochi, and crafted using premium Nilambur teak, one of the finest and most prestigious timbers in the world.",
      slug: "grand-manor",
      href: "/projects/grand-manor",
      tone: "#7a5a3e",
      image: "/images/projects/grand-manor/elevation.webp" as string | null,
    },
  ],
};

// "Why Choose Montenegro" from the old homepage (content/raw/home.md:88-114).
export const whyMontenegro = {
  eyebrow: "Why Choose Montenegro",
  title: "Is Montenegro the Best Country to Invest in Real Estate?",
  intro:
    "Montenegro is a rising star in European real estate, combining strong growth potential with investor-friendly policies and affordable living. Its expanding infrastructure, stable governance and EU accession prospects are why more international buyers choose to buy property in Montenegro.",
  // Flow-generated images, see content/image-prompts.md; null renders a tinted placeholder.
  reasons: [
    {
      title: "Thriving Economy with High GDP Growth",
      description:
        "Montenegro's rapidly growing economy and expanding infrastructure make it one of Europe's most promising real estate markets.",
      tone: "#46596a",
      image: "/images/why/economy.webp" as string | null,
    },
    {
      title: "Attractive Tax Benefits & Low Living Costs",
      description:
        "With low taxes and an affordable lifestyle, Montenegro offers exceptional value and appeal for investors, residents, and retirees alike.",
      tone: "#9c5b3c",
      image: "/images/why/tax-living.webp" as string | null,
    },
    {
      title: "Political Stability & EU Accession Prospects",
      // Old site said "by 2025"; Nov 2026 brief sets the 2028 target.
      description:
        "A politically stable nation on track for EU membership, targeted for 2028, supporting long-term security and property value.",
      tone: "#8a7a64",
      image: "/images/why/stability.webp" as string | null,
    },
    {
      title: "Mediterranean Haven of Natural Beauty",
      description:
        "Breathtaking coastlines, mountains and lakes create an idyllic setting for a Mediterranean lifestyle and long-term investment.",
      tone: "#6b6f4e",
      image: "/images/why/nature.webp" as string | null,
    },
    {
      title: "A Year-Round Tourist Hotspot",
      description:
        "Montenegro's growing popularity as a travel destination supports strong rental demand for well-located property.",
      tone: "#46596a",
      image: "/images/why/tourism.webp" as string | null,
    },
    {
      title: "Mild Climate & Great Quality of Life",
      description: "With 250+ sunny days, Montenegro offers a healthy, relaxed lifestyle amid stunning scenery.",
      tone: "#7d6a5a",
      image: "/images/why/climate.webp" as string | null,
    },
  ],
};

export const services = {
  eyebrow: "Our Services",
  title: "Premium Residences. Expertly Managed.",
  intro:
    "A new standard of coastal living on the Adriatic, where Mediterranean elegance meets modern design, crafted for comfort and investment confidence.",
  cta: { label: "Know more", href: "/our-services" },
  items: [
    {
      title: "Property Development & Investment Management",
      // Compact label + tag for the centre card; full title stays for alt text and SEO.
      short: "Development & Investment",
      tag: "Build · Invest · Own",
      description:
        "We craft new build homes and commercial spaces built for long-term value. Every project is supported by expert investment management that ensures effortless ownership and lasting confidence.",
      tone: "#6b6f4e",
      images: { left: "/images/services/development-left.webp", right: "/images/services/development-right.webp" },
    },
    {
      title: "Residency Management Services",
      short: "Residency Management",
      tag: "Residence permit",
      description:
        "We help clients apply for a Montenegrin residence permit and manage premium resort properties with ease. Each service is designed to deliver seamless processes, dependable management and exceptional lifestyle experiences.",
      tone: "#9c5b3c",
      images: { left: "/images/services/residency-left.webp", right: "/images/services/residency-right.webp" },
    },
    {
      title: "Property Rental Management Assistance",
      short: "Rental Management",
      tag: "Hassle-free income",
      description:
        "We offer property rental management assistance, handling tenant sourcing, rent collection, maintenance, and legal support, ensuring your property remains occupied, well-maintained, and generates steady, hassle-free rental income.",
      tone: "#46596a",
      images: { left: "/images/services/rental-left.webp", right: "/images/services/rental-right.webp" },
    },
  ],
};