// Copy sourced from content/raw/home.md (current rock1builders.com homepage).

export const hero = {
  eyebrow: ["Residences", "Wellness", "Investment"],
  title: "Gateway to Mediterranean Living",
  subtitle: "Where global investors find their next address",
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
    "For over 25 years, Rock Builders has been shaping skylines across South India. With more than fifty completed projects, the company blends thoughtful design with community focus. Every development reflects quality, trust, and care, creating spaces where people can live, work, and thrive with pride and comfort.",
  body2:
    "Now, Rock Builders is taking its expertise to the global stage with Life Bay Montenegro. The project features luxury apartments alongside Europe's first Ayurvedic wellness resort. Residents gain a beautiful home in one of Europe's most scenic locations, plus European residency and strong rental potential. Rock Builders continues to build with purpose, blending luxury living with lasting value.",
  cta: { label: "Explore", href: "/about-us" },
};

// Full "Gateway to Europe" block from the old homepage (content/raw/home.md:54-86).
export const gateway = {
  eyebrow: "Gateway to Europe",
  question: "Are you planning to build?",
  questionSub: "With 25+ years of trust and a proven portfolio across South India and Europe, Rock Builders is ready to turn your vision into a home, an investment, and a legacy.",
  cta: { label: "Let's Talk", href: "/contact-us" },
  intro: {
    lead: "Life Bay Montenegro",
    rest: " is located on the beautiful Adriatic coast and is Europe's first residential resort that combines modern living with Ayurvedic wellness.",
  },
  body: "It blends modern Mediterranean luxury with ancient Ayurvedic wisdom to offer thoughtfully designed apartments, world-class amenities, and a pathway to European residency. This is more than a home. It's a lifestyle, an investment, and a sanctuary for the body, mind, and spirit.",
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
      caption: "Easy access to airports, highways, beaches, European cities, and shopping hubs.",
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
export const faqs = {
  eyebrow: "FAQs",
  title: "Frequently asked questions",
  intro: "The questions we hear most about Life Bay Montenegro.",
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
  secondary: [
    { label: "Explore investment options", href: "/works/ocean-crest" },
    // Brochure still lives on the current WordPress site; move it into /public when the domain switches over.
    { label: "Download brochure", href: "https://rock1builders.com/wp-content/uploads/2025/10/Montenegro-Brochure.pdf" },
  ],
  details: [
    { label: "Call us (India)", value: "+91 79940 40740", href: "tel:+917994040740" },
    // Old site lists "rock1builder.com" (no s); confirm with the client before launch.
    { label: "Mail us", value: "enquiry@rock1builder.com", href: "mailto:enquiry@rock1builder.com" },
    { label: "Head office", value: "Rock1 Builders D.O.O (LLC), Mainski Put BB, Budva, Montenegro", href: null as string | null },
  ],
};

// "Our Projects": homepage block (content/raw/home.md:118-168) plus every project page (content/raw/project-*.md).
// Images are AI-generated illustrations of each documented brief (see content/image-prompts.md), so the
// section carries an "illustrative" note. Swap in real project photography when the client supplies it.
export const projects = {
  eyebrow: "Our Projects",
  imageNote: "Images are illustrative",
  intro:
    "Each project reflects Rock1 Builders' commitment to quality, design, and value. From signature residential developments to premium resort spaces, every detail is crafted to enhance lifestyles.",
  items: [
    {
      name: "Life Bay",
      location: "Dobra Voda, Montenegro",
      category: "Residential",
      stat: { value: "20", label: "Apartments" },
      summary: "Premium sea-view apartments in Montenegro's Bar Riviera.",
      description:
        "A strategic development in Dobra Voda designed for the fast-growing real estate and tourism market of the Bar Riviera. Modern, high-quality apartments with sea views, a swimming pool and car parking, backed by strong rental demand and Montenegro's favourable climate.",
      href: "/works/life-bay-montenegro",
      tone: "#46596a",
      image: "/images/projects/life-bay.webp" as string | null,
    },
    {
      name: "Ocean Crest",
      location: "Bar Riviera, Montenegro",
      category: "Villas",
      stat: { value: "35", label: "Villas" },
      summary: "Premium coastal villas with private sea-view infinity pools.",
      description:
        "Modern architecture, comfort and a refined coastal lifestyle, minutes from Dobra Voda beach and Bar Old Town. Villa types from 32 m² to 170.7 m², with sea-view infinity pools, landscaped Mediterranean gardens and an Ayurveda wellness centre next door at Life Bay.",
      href: "/works/ocean-crest",
      tone: "#5b6b73",
      image: "/images/projects/ocean-crest.webp" as string | null,
    },
    {
      name: "Royal Habitat",
      location: "India",
      category: "Luxury Residence",
      stat: { value: "10,000", label: "Sq. ft." },
      summary: "A 10,000 sq. ft. residence on a 20,000 sq. m plot.",
      description:
        "Six grand bedrooms, a home theatre, an executive office and an indoor water fountain, surrounded by a landscaped garden, fruit orchard and private swimming pool.",
      href: "/works/royal-habitat",
      tone: "#7d6a5a",
      image: "/images/projects/royal-habitat.webp" as string | null,
    },
    {
      name: "Rock Star Vazhakkala",
      location: "Vazhakkala, Kerala",
      category: "Luxury Villa",
      stat: { value: "10,000", label: "Sq. ft." },
      summary: "A 10,000 sq. ft. luxury villa on 15,000 sq. m of prime land.",
      description:
        "Five spacious bedrooms, a home theatre, an office and a children's playhouse, with landscaped gardens, a private play area and a garage for five cars.",
      href: "/works/rock-star-vazhakkalla",
      tone: "#6b6f4e",
      image: "/images/projects/rock-star-vazhakkala.webp" as string | null,
    },
    {
      name: "Rock Valley",
      location: "Kakkanad, Kerala",
      category: "Villa",
      stat: { value: "4,000", label: "Sq. ft." },
      summary: "A 4,000 sq. ft. premium residence in the heart of Kakkanad.",
      description:
        "A four-bedroom villa on 10,000 sq. m with a private swimming pool, home theatre, office space and a lush garden: urban luxury in a peaceful natural setting.",
      href: "/works/rock-valley-kakkanad",
      tone: "#8a7a64",
      image: "/images/projects/rock-valley.webp" as string | null,
    },
    {
      name: "Misty Blue",
      location: "Munnar, Kerala",
      category: "Resort",
      stat: { value: "35", label: "Executive rooms" },
      summary: "Munnar's first and only lake resort.",
      description:
        "A five-star resort in the misty hills of Munnar with a swimming pool, wellness and spa centre, multi-cuisine restaurant, barbecue zone, private pond and lake, and an open-air amphitheatre.",
      href: "/works/misty-blue",
      tone: "#4f5d56",
      image: "/images/projects/misty-blue.webp" as string | null,
    },
  ],
};

// "Why Choose Montenegro" from the old homepage (content/raw/home.md:88-114).
export const whyMontenegro = {
  eyebrow: "Why Choose Montenegro",
  title: "Why Choose Montenegro.",
  intro:
    "A rising star in European real estate, Montenegro combines strong growth potential with investor-friendly policies and affordable living. Its expanding infrastructure, stable governance, and EU prospects create a secure environment for profitable and lasting investments.",
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
      // Old site said "on track for EU membership by 2025"; the date has passed, so it's dropped here.
      description:
        "A politically stable nation on track for EU membership, ensuring long-term security and strong property appreciation potential.",
      tone: "#8a7a64",
      image: "/images/why/stability.webp" as string | null,
    },
    {
      title: "Mediterranean Haven of Natural Beauty",
      description: "Breathtaking coastlines, mountains, and lakes create an idyllic setting for both living and investment.",
      tone: "#6b6f4e",
      image: "/images/why/nature.webp" as string | null,
    },
    {
      title: "A Year-Round Tourist Hotspot",
      description: "Montenegro's growing popularity as a travel destination fuels high rental yields and property demand.",
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
  title: "Premium Living. Expertly Managed.",
  intro:
    "A new standard of luxury on the Adriatic coast, where Mediterranean elegance meets modern design, crafted for comfort and investment confidence.",
  cta: { label: "Know more", href: "/our-services" },
  items: [
    {
      title: "Property Development & Investment Management",
      // Compact label + tag for the centre card; full title stays for alt text and SEO.
      short: "Development & Investment",
      tag: "Build · Invest · Own",
      description: "We craft modern living and commercial spaces built for long-term value. Every project is supported by expert investment management that ensures effortless ownership, steady returns, and lasting confidence.",
      tone: "#6b6f4e",
      images: { left: "/images/services/development-left.webp", right: "/images/services/development-right.webp" },
    },
    {
      title: "Residency Management Services",
      short: "Residency Management",
      tag: "EU residency",
      description: "We help clients secure European residency and manage premium resort properties with ease. Each service is designed to deliver seamless processes, strong returns, and exceptional lifestyle experiences.",
      tone: "#9c5b3c",
      images: { left: "/images/services/residency-left.webp", right: "/images/services/residency-right.webp" },
    },
    {
      title: "Property Rental Management Assistance",
      short: "Rental Management",
      tag: "Hassle-free income",
      description: "We offer property rental management assistance, handling tenant sourcing, rent collection, maintenance, and legal support, ensuring your property remains occupied, well-maintained, and generates steady, hassle-free rental income.",
      tone: "#46596a",
      images: { left: "/images/services/rental-left.webp", right: "/images/services/rental-right.webp" },
    },
  ],
};
