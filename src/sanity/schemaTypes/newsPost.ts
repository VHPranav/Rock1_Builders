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
    defineField({ name: "image", description: "Shown beside the post. Without an image or video, a dark panel is shown instead.", type: "photo" }),
    defineField({
      name: "panelText",
      title: "Dark panel text",
      description: "Short line on the dark panel when there is no image or video, e.g. Important update for existing and prospective buyers.",
      type: "string",
    }),
    defineField({ name: "video", type: "video" }),
    defineField({ name: "source", type: "link" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date" } },
});
