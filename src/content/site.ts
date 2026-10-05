// Site-wide content, from the old site's footer (content/raw/_global-header-footer.md).

import { projects, projectStatuses } from "@/content/home";

// `description` and `image` feed the full-width dropdown (link list left, preview right).
type NavLink = { label: string; href: string; note?: string; description?: string; image?: string; documents?: string[] };
type NavItem = NavLink & { children?: NavLink[] };

// Desktop header navigation. Items with `children` open a dropdown on hover or keyboard focus.
export const nav: NavItem[] = [
  // A dedicated Home link (client request), alongside the logo link.
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-us",
    children: [
      {
        label: "About Us",
        href: "/about-us",
        description: "Twenty-five years of trust, our leadership and the team behind Rock1.",
        image: "/images/why/stability.webp",
      },
      {
        label: "About Montenegro",
        href: "/about-montenegro",
        description: "Why Montenegro is Europe's smart investment: the Euro, low taxes and the Adriatic.",
        image: "/images/gateway/wellness.webp",
      },
      {
        label: "Legal",
        href: "/legal",
        description: "Title deeds, company registrations and certificates, open to review.",
        image: "/images/legal/title-deed-1.webp",
        // Shown as a row of scans instead of a photo
        documents: ["/images/legal/title-deed-1.webp", "/images/legal/company-registration.webp", "/images/legal/vat-registration.webp"],
      },
    ],
  },
  { label: "Our Services", href: "/our-services" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All projects", href: "/projects", note: `${projects.items.length}` },
      // Newly Launched, Ongoing, then Completed, as in the old site's Project menu.
      ...projectStatuses.flatMap((status) =>
        projects.items.filter((item) => item.status === status).map((item) => ({ label: item.name, href: item.href, note: status })),
      ),
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact Us", href: "/contact-us" },
];

// Full-screen menu below lg (SiteMenu): it lists the `nav` items above, plus this call to action.
export const menu = {
  cta: { label: "Book a consultation", href: "/contact-us" },
};

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
  email: "enquiry@rock1builders.com",
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
