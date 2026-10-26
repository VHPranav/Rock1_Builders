import { defineField, defineType } from "sanity";

// Shared building blocks used inside documents.

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "URL or path",
      description: "A page path like /contact-us, or a full URL.",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      description: "Describe the image for screen readers and Google.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "ratio",
      description: "Shape of the frame in gallery grids.",
      type: "string",
      options: { list: ["landscape", "portrait", "page", "document"], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "wide", description: "Span two columns in photo grids.", type: "boolean" }),
  ],
});

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "youtubeId", title: "YouTube ID", description: "The part after watch?v= in the YouTube link.", type: "string" }),
    defineField({ name: "src", title: "Self-hosted file", description: "Path to an MP4 in /public/videos, if not on YouTube.", type: "string" }),
    defineField({ name: "poster", type: "photo" }),
    defineField({ name: "label", description: "Caption shown over muted film bands.", type: "string" }),
    defineField({ name: "duration", description: "Length as shown, e.g. 4:52. Used by Google.", type: "string" }),
    defineField({
      name: "uploadDate",
      description: "When the video was published, e.g. 2026-10-01T12:17:40-07:00. Used by Google.",
      type: "string",
    }),
  ],
  preview: { select: { title: "title", subtitle: "youtubeId" } },
});

export const download = defineType({
  name: "download",
  title: "Download",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "file", description: "Upload a PDF…", type: "file", options: { accept: "application/pdf" } }),
    defineField({ name: "href", description: "…or give a path in /public/documents.", type: "string" }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      validation: (r) => r.max(65).warning("Google usually cuts titles after about 60 characters."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160).warning("Google usually cuts descriptions after about 155 characters."),
    }),
    defineField({ name: "focusKeyword", type: "string" }),
    defineField({ name: "ogImage", title: "Share image", description: "1200 × 630. Falls back to the site default.", type: "image" }),
  ],
});

export const objectTypes = [link, photo, video, download, seo];
