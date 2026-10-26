import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryGroup = defineType({
  name: "galleryGroup",
  title: "Gallery album",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "id", title: "Anchor", description: "Used in the URL: /gallery#<anchor>.", type: "slug", options: { source: "label" } }),
    defineField({ name: "place", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "images", type: "array", of: [defineArrayMember({ type: "photo" })], options: { layout: "grid" } }),
    defineField({ name: "order", description: "Lower numbers show first.", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "place", media: "images.0" } },
});
