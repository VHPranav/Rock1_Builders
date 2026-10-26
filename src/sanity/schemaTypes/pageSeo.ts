import { defineField, defineType } from "sanity";

// SEO for fixed pages (Home, About Us, …). Projects and news posts carry their own SEO field.
export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({ name: "page", description: "e.g. Home, About Us.", type: "string", validation: (r) => r.required() }),
    defineField({ name: "path", description: "e.g. / or /about-us. Must match the page address.", type: "string", validation: (r) => r.required() }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "page", subtitle: "path" } },
});
