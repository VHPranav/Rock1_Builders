import type { StructureResolver } from "sanity/structure";

// Sidebar order in the Studio. Home page and Site settings open straight into their one document.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Rock1 Builders")
    .items([
      S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("newsPost").title("Newsroom"),
      S.documentTypeListItem("galleryGroup").title("Gallery"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      S.documentTypeListItem("pageSeo").title("Page SEO"),
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
