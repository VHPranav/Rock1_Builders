import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO defaults" },
  ],
  fields: [
    defineField({ name: "email", type: "string", group: "contact", validation: (r) => r.email() }),
    defineField({
      name: "phones",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "phone",
          fields: [
            defineField({ name: "region", type: "string" }),
            defineField({ name: "display", title: "Number as shown", type: "string" }),
            defineField({ name: "tel", title: "Number to dial", description: "Digits only, with country code, e.g. +38268112928.", type: "string" }),
          ],
          preview: { select: { title: "region", subtitle: "display" } },
        }),
      ],
    }),
    defineField({ name: "address", type: "text", rows: 2, group: "contact" }),
    defineField({ name: "socials", title: "Social links", type: "array", group: "contact", of: [defineArrayMember({ type: "link" })] }),

    defineField({ name: "footerImage", type: "photo", group: "footer" }),
    defineField({ name: "footerPrompt", type: "string", group: "footer" }),
    defineField({ name: "footerCta", title: "Footer button", type: "link", group: "footer" }),

    defineField({ name: "defaultOgImage", title: "Default share image", description: "1200 × 630.", type: "image", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
