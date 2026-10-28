import type { StructureResolver } from "sanity/structure";

// Sidebar order in the Studio. Single pages (Home, About Us, …, Site settings) open straight into their one document.
export const structure: StructureResolver = (S) => {
  const single = (type: string, title: string) =>
    S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type));
  return S.list()
    .title("Rock1 Builders")
    .items([
      single("homePage", "Home page"),
      single("aboutPage", "About Us"),
      single("servicesPage", "Our Services"),
      single("montenegroPage", "About Montenegro"),
      single("contactPage", "Contact Us"),
      single("legalPage", "Legal"),
      single("listingPages", "Page headings"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("newsPost").title("Newsroom"),
      S.documentTypeListItem("blogPost").title("Blog"),
      S.documentTypeListItem("galleryGroup").title("Gallery"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      S.documentTypeListItem("pageSeo").title("Page SEO"),
      single("siteSettings", "Site settings"),
    ]);
};
