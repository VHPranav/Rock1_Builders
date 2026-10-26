import { defineArrayMember, defineField, defineType } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", description: "e.g. EU accession, Buyer notice.", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "paragraphs", title: "Body", type: "array", of: [defineArrayMember({ type: "text", rows: 4 })] }),
    defineField({ name: "video", type: "video" }),
    defineField({ name: "source", type: "link" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date" } },
});
