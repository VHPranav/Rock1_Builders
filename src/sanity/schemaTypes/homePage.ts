import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Our story" },
    { name: "gateway", title: "Gateway to Europe" },
    { name: "faqs", title: "FAQs" },
    { name: "contact", title: "Contact block" },
  ],
  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "subtitle", type: "string" }),
        defineField({ name: "cta", title: "Button", type: "link" }),
        defineField({ name: "videoSrc", title: "Background video URL", type: "url" }),
      ],
    }),
    defineField({
      name: "story",
      type: "object",
      group: "story",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body1", title: "First paragraph", type: "text", rows: 5 }),
        defineField({ name: "body2", title: "Second paragraph", type: "text", rows: 5 }),
        defineField({ name: "cta", title: "Button", type: "link" }),
      ],
    }),
    defineField({
      name: "gateway",
      type: "object",
      group: "gateway",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "question", type: "string" }),
        defineField({ name: "questionSub", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "Button", type: "link" }),
        defineField({
          name: "intro",
          type: "object",
          fields: [
            defineField({ name: "lead", description: "Highlighted opening words.", type: "string" }),
            defineField({ name: "rest", type: "text", rows: 3 }),
          ],
        }),
        defineField({ name: "body", type: "text", rows: 4 }),
        defineField({ name: "readMore", title: "Read more link", type: "link" }),
        defineField({
          name: "stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "stat",
              fields: [
                defineField({ name: "value", type: "string" }),
                defineField({ name: "suffix", type: "string" }),
                defineField({ name: "label", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
        defineField({
          name: "tiles",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "tile",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "caption", type: "text", rows: 2 }),
                defineField({ name: "image", type: "photo" }),
              ],
              preview: { select: { title: "label", media: "image" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqs",
      type: "object",
      group: "faqs",
      description: "The questions themselves live under FAQs in the sidebar.",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Button", type: "link" }),
      ],
    }),
    defineField({
      name: "contactCta",
      title: "Contact block",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({ name: "brochure", type: "download" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
