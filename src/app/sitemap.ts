import type { MetadataRoute } from "next";
import { projects } from "@/content/home";
import { siteUrl } from "@/content/site";

const pages = ["", "/about-us", "/about-montenegro", "/our-services", "/projects", "/gallery", "/newsroom", "/contact-us", "/legal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, priority: path === "" ? 1 : 0.8 })),
    ...projects.items.map((item) => ({ url: `${siteUrl}/projects/${item.slug}`, priority: 0.7 })),
  ];
}
