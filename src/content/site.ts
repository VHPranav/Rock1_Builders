// Site-wide content, from the old site's footer (content/raw/_global-header-footer.md).

export const footer = {
  // Flow-generated background, see content/image-prompts.md; null renders a dark placeholder.
  image: "/images/footer/footer.webp" as string | null,
  wordmark: "Rock1",
  primaryLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Services", href: "/our-services" },
    { label: "About Montenegro", href: "/about-montenegro" },
    { label: "Contact", href: "/contact-us" },
  ],
  secondaryLinks: [
    { label: "Gallery", href: "/gallery" },
    { label: "Newsroom", href: "/newsroom" },
    { label: "Legal", href: "/legal" },
  ],
  prompt: "Would you like to learn more about our projects and expertise?",
  cta: { label: "Contact us", href: "/contact-us" },
  // Old site lists "rock1builder.com" (no s); confirm with the client before launch.
  email: "enquiry@rock1builder.com",
  phones: [
    { region: "Montenegro", display: "+382 6811 29 28", tel: "+38268112928" },
    { region: "India", display: "+91 79940 40740", tel: "+917994040740" },
    { region: "UAE", display: "+971 529 217 302", tel: "+971529217302" },
  ],
  address: "Rock1 Builders D.O.O (LLC), Mainski Put BB, Budva, Montenegro",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/rock1global" },
    { label: "Facebook", href: "https://www.facebook.com/share/1D1J87sqNZ/" },
    // Old site links a single video, not a channel; swap for the channel URL if there is one.
    { label: "YouTube", href: "https://www.youtube.com/watch?v=PfVaq7U5rBs" },
  ],
};
