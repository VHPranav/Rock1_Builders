import { defineArrayMember, defineField, defineType } from "sanity";

// Articles on /blog ("Insights" in the footer). Each post has its own page at /blog/<slug>.
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "post", title: "Post", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "post", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      description: "The page address: /blog/<slug>. Changing it breaks existing links.",
      type: "slug",
      group: "post",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", description: "e.g. Investment, Montenegro living.", type: "string", group: "post" }),
    defineField({ name: "date", title: "Published", type: "date", group: "post", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Cover image", description: "Shown on the blog card and at the top of the post.", type: "photo", group: "post" }),
    defineField({
      name: "excerpt",
      description: "One or two sentences for the blog card and search results.",
      type: "text",
      rows: 3,
      group: "post",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      description: "Headings (H2) are listed in the post's table of contents.",
      type: "array",
      group: "post",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({ type: "photo" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});
