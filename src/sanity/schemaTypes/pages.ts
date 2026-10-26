import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton documents for the fixed pages. Field names match src/content/ so empty fields fall back to it.

const text = (name: string, title?: string, rows = 3) => defineField({ name, title, type: "text", rows });
const str = (name: string, title?: string, description?: string) => defineField({ name, title, type: "string", description });
const img = (name: string, title?: string) => defineField({ name, title, type: "image", options: { hotspot: true } });
const paragraphs = (name: string, title = "Paragraphs") =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "text", rows: 4 })] });
const heading = [str("eyebrow", "Eyebrow", "Small label above the heading."), str("title"), text("intro")];
const pageFilm = defineField({
  name: "video",
  title: "Hero film",
  type: "object",
  description: "Muted film in the page header. The file stays in /public/videos.",
  fields: [str("src", "Film file", "e.g. /videos/about-us.mp4"), img("poster", "Poster image")],
});
const preview = (title: string) => ({ prepare: () => ({ title }) });

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us page",
  type: "document",
  groups: [
    { name: "intro", title: "Intro", default: true },
    { name: "trust", title: "Trust" },
    { name: "people", title: "Leadership & team" },
    { name: "advantage", title: "European Advantage" },
  ],
  fields: [
    ...heading.map((f) => ({ ...f, group: "intro" })),
    { ...img("image", "Header image"), group: "intro" },
    { ...pageFilm, group: "intro" },
    { ...paragraphs("story", "Our story"), group: "intro" },
    defineField({
      name: "trust",
      type: "object",
      group: "trust",
      fields: [
        ...heading,
        defineField({
          name: "pillars",
          type: "array",
          of: [defineArrayMember({ type: "object", name: "pillar", fields: [str("title"), text("text")] })],
        }),
        defineField({ name: "facts", type: "array", of: [defineArrayMember({ type: "string" })] }),
      ],
    }),
    defineField({
      name: "film",
      title: "Company film (YouTube)",
      type: "object",
      group: "trust",
      fields: [
        str("eyebrow"),
        str("title"),
        str("youtubeId", "YouTube ID", "The part after watch?v= in the YouTube link."),
        str("videoTitle", "Video title"),
        str("uploadDate", "Upload date", "e.g. 2025-10-28T03:47:37-07:00. Used by Google."),
        str("duration", "Duration", "e.g. 2:53. Used by Google."),
      ],
    }),
    defineField({
      name: "ceo",
      title: "CEO",
      type: "object",
      group: "people",
      fields: [str("eyebrow"), str("role"), str("name"), img("photo"), paragraphs("bio", "Biography")],
    }),
    defineField({
      name: "team",
      title: "Core team",
      type: "object",
      group: "people",
      fields: [
        str("eyebrow"),
        defineField({
          name: "members",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "member",
              fields: [str("name"), str("role"), img("photo"), text("bio", "Biography", 4)],
              preview: { select: { title: "name", subtitle: "role", media: "photo" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "europeanAdvantage",
      title: "European Advantage",
      description: "Shown on About Us and About Montenegro.",
      type: "object",
      group: "advantage",
      fields: [
        ...heading,
        defineField({
          name: "pillars",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "advantage",
              fields: [str("title"), text("text", "Text", 4), img("image")],
              preview: { select: { title: "title", media: "image" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: preview("About Us page"),
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Our Services page",
  type: "document",
  groups: [
    { name: "page", title: "Page", default: true },
    { name: "services", title: "Services" },
  ],
  fields: [
    ...heading.map((f) => ({ ...f, group: "page" })),
    { ...img("image", "Header image"), group: "page" },
    { ...pageFilm, group: "page" },
    { ...paragraphs("body"), group: "page" },
    defineField({
      name: "stats",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [str("value"), str("suffix", "Suffix", "e.g. + or %"), str("label")],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "section",
      title: "Services section",
      description: "The three services, shown on the Home page and this page.",
      type: "object",
      group: "services",
      fields: [
        ...heading,
        defineField({ name: "cta", title: "Button (Home page)", type: "link" }),
        defineField({
          name: "items",
          title: "Services",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "service",
              fields: [
                str("title"),
                str("short", "Short title", "Shown on the centre card."),
                str("tag", "Tag line"),
                text("description", "Description", 4),
                str("tone", "Placeholder colour", "e.g. #6b6f4e"),
                defineField({ name: "images", type: "object", fields: [img("left", "Left image"), img("right", "Right image")] }),
              ],
              preview: { select: { title: "title", media: "images.left" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: preview("Our Services page"),
});

export const montenegroPage = defineType({
  name: "montenegroPage",
  title: "About Montenegro page",
  type: "document",
  groups: [
    { name: "page", title: "Page", default: true },
    { name: "map", title: "Map" },
  ],
  fields: [
    ...heading.map((f) => ({ ...f, group: "page" })),
    { ...img("image", "Header image"), group: "page" },
    { ...pageFilm, group: "page" },
    { ...paragraphs("body"), group: "page" },
    defineField({ name: "map", title: "Map heading", type: "object", group: "map", fields: heading }),
    defineField({
      name: "places",
      title: "Map places",
      type: "array",
      group: "map",
      of: [
        defineArrayMember({
          type: "object",
          name: "place",
          fields: [
            str("name"),
            str("id", "ID", "Short unique name, e.g. kotor. A project's ID must match its page address (life-bay)."),
            defineField({
              name: "kind",
              type: "string",
              options: { list: ["project", "city", "beach", "sight", "airport"], layout: "radio", direction: "horizontal" },
            }),
            defineField({
              name: "coordinates",
              description: "Longitude, then latitude, e.g. 19.1385 and 42.0408.",
              type: "array",
              of: [defineArrayMember({ type: "number" })],
              validation: (r) => r.length(2),
            }),
            text("description"),
            img("image"),
            str("note", "Status line", "Projects only, e.g. Ongoing · 17 apartments."),
            str("href", "Link", "Projects only, e.g. /projects/life-bay."),
            defineField({ name: "labelLeft", title: "Label on the left", description: "Use when the name overlaps a neighbour.", type: "boolean" }),
          ],
          preview: { select: { title: "name", subtitle: "kind", media: "image" } },
        }),
      ],
    }),
  ],
  preview: preview("About Montenegro page"),
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    ...heading,
    defineField({ name: "documents", type: "array", of: [defineArrayMember({ type: "photo" })], options: { layout: "grid" } }),
  ],
  preview: preview("Legal page"),
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Us page",
  type: "document",
  fields: [
    ...heading,
    str("formTitle", "Form heading"),
    defineField({
      name: "offices",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "office",
          fields: [
            str("city"),
            str("role", "Office type", "e.g. Headquarters"),
            img("image"),
            text("address", "Address", 2),
            defineField({
              name: "phone",
              type: "object",
              fields: [str("display", "Number as shown"), str("tel", "Number to dial", "Digits with country code, e.g. +38268112928.")],
            }),
          ],
          preview: { select: { title: "city", subtitle: "role", media: "image" } },
        }),
      ],
    }),
  ],
  preview: preview("Contact Us page"),
});

export const listingPages = defineType({
  name: "listingPages",
  title: "Page headings",
  type: "document",
  description: "Headings above the lists on Projects, Gallery and Newsroom.",
  fields: [
    defineField({
      name: "projects",
      type: "object",
      fields: [
        str("eyebrow"),
        str("pageHeading", "Projects page heading"),
        text("intro", "Intro (Projects page and Home page section)"),
        defineField({
          name: "stripExtras",
          title: "Extra header images",
          description: "Decorative images shown between the project photos in the Projects page header.",
          type: "array",
          of: [defineArrayMember({ type: "image" })],
          options: { layout: "grid" },
        }),
      ],
    }),
    defineField({ name: "gallery", type: "object", fields: heading }),
    defineField({ name: "newsroom", type: "object", fields: heading }),
  ],
  preview: preview("Page headings"),
});

export const pageTypes = [aboutPage, servicesPage, montenegroPage, legalPage, contactPage, listingPages];
