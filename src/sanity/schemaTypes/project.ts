import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "page", title: "Project page" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Card on the home and projects pages
    defineField({ name: "name", type: "string", group: "card", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      description: "The page address: /projects/<slug>. Changing it breaks existing links.",
      type: "slug",
      group: "card",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string", group: "card" }),
    defineField({ name: "location", type: "string", group: "card", validation: (r) => r.required() }),
    defineField({
      name: "region",
      type: "string",
      group: "card",
      options: { list: ["Montenegro", "India"], layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      group: "card",
      options: { list: ["Newly Launched", "Ongoing", "Completed"], layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", description: "e.g. Luxury villas, Apartments.", type: "string", group: "card" }),
    defineField({
      name: "stat",
      description: "The headline figure on the card.",
      type: "object",
      group: "card",
      fields: [
        defineField({ name: "value", type: "string" }),
        defineField({ name: "label", type: "string" }),
      ],
    }),
    defineField({ name: "summary", type: "text", rows: 2, group: "card", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4, group: "card" }),
    defineField({ name: "image", title: "Card image", type: "photo", group: "card" }),
    defineField({ name: "tone", description: "Placeholder colour while the image loads, e.g. #8a7a64.", type: "string", group: "card" }),
    defineField({ name: "order", description: "Lower numbers show first.", type: "number", group: "card" }),

    // Project page
    defineField({ name: "tagline", type: "string", group: "page" }),
    defineField({
      name: "overview",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "lists",
      title: "Feature lists",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          type: "object",
          name: "detailList",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "string" })] }),
          ],
        }),
      ],
    }),
    defineField({
      name: "villas",
      title: "Villa types",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          type: "object",
          name: "villaType",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "size", type: "string" }),
            defineField({
              name: "specs",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "spec",
                  fields: [defineField({ name: "label", type: "string" }), defineField({ name: "value", type: "string" })],
                  preview: { select: { title: "label", subtitle: "value" } },
                }),
              ],
            }),
            defineField({ name: "plans", title: "Floor plans", type: "array", of: [defineArrayMember({ type: "photo" })] }),
          ],
        }),
      ],
    }),
    defineField({ name: "downloads", type: "array", group: "page", of: [defineArrayMember({ type: "download" })] }),
    defineField({
      name: "floorPlans",
      type: "object",
      group: "page",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "pdf", type: "download" }),
        defineField({ name: "pages", type: "array", of: [defineArrayMember({ type: "photo" })] }),
      ],
    }),
    defineField({ name: "sitePlan", type: "photo", group: "page" }),

    // Media
    defineField({ name: "heroImage", type: "photo", group: "media" }),
    defineField({ name: "logo", type: "photo", group: "media" }),
    defineField({ name: "heroVideo", description: "Muted background film at the top of the page.", type: "video", group: "media" }),
    defineField({ name: "bandVideo", description: "Muted film band further down the page.", type: "video", group: "media" }),
    defineField({ name: "film", description: "Main film with sound and controls.", type: "video", group: "media" }),
    defineField({ name: "videos", type: "array", group: "media", of: [defineArrayMember({ type: "video" })] }),
    defineField({ name: "stills", type: "array", group: "media", of: [defineArrayMember({ type: "photo" })] }),
    defineField({ name: "photos", description: "Grid that opens full-screen.", type: "array", group: "media", of: [defineArrayMember({ type: "photo" })] }),
    defineField({ name: "brochure", title: "Brochure pages", type: "array", group: "media", of: [defineArrayMember({ type: "photo" })] }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "status", media: "image" } },
});
