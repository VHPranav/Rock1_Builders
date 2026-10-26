import type { MetadataRoute } from "next";
import { contentUpdated, siteUrl } from "@/content/site";
import { getProjects } from "@/sanity/content";

const pages = ["", "/about-us", "/about-montenegro", "/our-services", "/projects", "/gallery", "/newsroom", "/contact-us", "/legal"];

// Legal scans are reference material, so they rank below the main pages.
const priority = (path: string) => (path === "" ? 1 : path === "/legal" ? 0.4 : 0.8);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date(contentUpdated);
  const projects = await getProjects();
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, lastModified, priority: priority(path) })),
    ...projects.map((item) => ({ url: `${siteUrl}/projects/${item.slug}`, lastModified, priority: 0.7 })),
  ];
}
