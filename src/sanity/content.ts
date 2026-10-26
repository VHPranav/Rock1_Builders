// Site content from Sanity, in the same shapes the components used when it lived in src/content/.
// Fields left empty in Sanity fall back to the values in src/content/, so a missing field never blanks a page.
// Text that is not in the CMS (navigation, About, Services, Montenegro pages, legal) still comes from src/content/.

import type { Metadata } from "next";
import type { GalleryImage } from "@/components/GalleryGrid";
import { contactCta, faqs, gateway, hero, type ProjectItem, projects, story } from "@/content/home";
import type { GalleryGroup, NewsPost } from "@/content/pages";
import type { ProjectDetail } from "@/content/projectDetails";
import { seo as sheetSeo } from "@/content/seo";
import { footer } from "@/content/site";
import { sanityFetch } from "./live";

// ---------- helpers

// Sanity returns null for empty fields; the components expect them to be absent.
type NoNulls<T> = T extends null ? undefined : T extends (infer U)[] ? NoNulls<U>[] : T extends object ? { [K in keyof T]: NoNulls<T[K]> } : T;
function stripNulls<T>(value: T): NoNulls<T> {
  if (Array.isArray(value)) return value.map(stripNulls) as NoNulls<T>;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).filter(([, v]) => v !== null).map(([k, v]) => [k, stripNulls(v)]),
    ) as NoNulls<T>;
  }
  return value as NoNulls<T>;
}

async function fetchContent<T>(query: string, params: Record<string, string> = {}): Promise<T | undefined> {
  const { data } = await sanityFetch({ query, params, stega: false });
  return (stripNulls(data) ?? undefined) as T | undefined;
}

// Code defaults first, then every field Sanity has.
const merge = <T extends object>(fallback: T, data: Partial<T> | undefined): T => ({ ...fallback, ...data });

// ---------- GROQ fragments

const photo = `{"src": asset->url, "caption": coalesce(caption, alt), description, ratio, wide}`;
const sized = `{"src": asset->url, "alt": alt, "caption": coalesce(caption, alt), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}`;
const download = `{label, "href": coalesce(file.asset->url, href)}`;
const link = `{label, href}`;

// ---------- site settings (contact details, footer)

export type SiteSettings = typeof footer & { defaultOgImage?: string };

export async function getSettings(): Promise<SiteSettings> {
  const data = await fetchContent<Partial<SiteSettings>>(`*[_id == "siteSettings"][0]{
    email,
    phones[]{region, display, tel},
    address,
    socials[]${link},
    "image": footerImage.asset->url,
    "prompt": footerPrompt,
    "cta": footerCta${link},
    "defaultOgImage": defaultOgImage.asset->url
  }`);
  return merge<SiteSettings>(footer, data);
}

// ---------- projects

export type Project = ProjectItem & {
  // The project's real photograph or render: its page hero image, else the card image.
  photo: string | null;
};

export async function getProjects(): Promise<Project[]> {
  const items =
    (await fetchContent<Omit<Project, "href">[]>(`*[_type == "project" && defined(slug.current)] | order(order asc, name asc){
      name, subtitle, location, region, status, category, stat, summary, description, tone,
      "slug": slug.current,
      "image": image.asset->url,
      "photo": coalesce(heroImage.asset->url, image.asset->url)
    }`)) ?? [];
  return items.map((item) => ({ ...item, image: item.image ?? null, photo: item.photo ?? null, href: `/projects/${item.slug}` }));
}

// Projects block text (heading, intro) with the project list from Sanity.
export async function getProjectsSection() {
  return { ...projects, items: await getProjects() };
}

export type ProjectsSection = Awaited<ReturnType<typeof getProjectsSection>>;

export async function getProjectDetail(slug: string): Promise<ProjectDetail | undefined> {
  return fetchContent<ProjectDetail>(
    `*[_type == "project" && slug.current == $slug][0]{
      tagline,
      "overview": coalesce(overview, [description]),
      lists[]{title, items},
      villas[]{name, size, specs[]{label, value}, "plans": plans[]${sized}},
      "heroImage": heroImage.asset->url,
      "logo": logo${sized},
      heroVideo{src, "poster": poster.asset->url},
      bandVideo{src, "poster": poster.asset->url, label},
      film{title, src, "poster": poster.asset->url, uploadDate, duration},
      videos[]{title, duration, uploadDate, youtubeId, src, "poster": poster.asset->url},
      "stills": stills[]${photo},
      "photos": photos[]${photo},
      "brochure": brochure[]${photo},
      sitePlan{"src": asset->url + "?w=1600", "full": asset->url, caption},
      "downloads": downloads[]${download},
      floorPlans{title, "pdf": pdf${download}, "pages": pages[]{"src": asset->url, caption}}
    }`,
    { slug },
  );
}

// ---------- home page

export async function getHome() {
  const data = await fetchContent<{
    hero?: Partial<typeof hero>;
    story?: Partial<typeof story>;
    gateway?: Partial<Omit<typeof gateway, "tiles">> & { tiles?: { label: string; caption: string; image?: string }[] };
    faqs?: Partial<typeof faqs>;
    contactCta?: Partial<typeof contactCta>;
  }>(`*[_id == "homePage"][0]{
    hero{eyebrow, title, subtitle, "cta": cta${link}, videoSrc},
    story{eyebrow, heading, body1, body2, "cta": cta${link}},
    gateway{
      eyebrow, question, questionSub, "cta": cta${link}, intro, body, "readMore": readMore${link},
      stats[]{value, suffix, label},
      tiles[]{label, caption, "image": image.asset->url}
    },
    faqs{eyebrow, title, intro, "cta": cta${link}},
    contactCta{eyebrow, title, intro, "brochure": brochure${download}}
  }`);
  const faqItems = await fetchContent<(typeof faqs)["items"]>(`*[_type == "faq"] | order(order asc){question, answer}`);

  const { tiles, ...gatewayData } = data?.gateway ?? {};
  return {
    hero: merge(hero, data?.hero),
    story: merge(story, data?.story),
    gateway: {
      ...merge(gateway, gatewayData),
      tiles: tiles
        ? tiles.map((tile, i) => ({ ...tile, tone: gateway.tiles[i]?.tone ?? "#46596a", image: tile.image ?? null }))
        : gateway.tiles,
    },
    faqs: { ...merge(faqs, data?.faqs), items: faqItems?.length ? faqItems : faqs.items },
    contactCta: merge(contactCta, data?.contactCta),
  };
}

export type Home = Awaited<ReturnType<typeof getHome>>;

export async function getContactCta() {
  const data = await fetchContent<Partial<typeof contactCta>>(
    `*[_id == "homePage"][0].contactCta{eyebrow, title, intro, "brochure": brochure${download}}`,
  );
  return merge(contactCta, data);
}

// ---------- newsroom and gallery

export async function getNews(): Promise<NewsPost[]> {
  // Undated notices sort after dated posts.
  return (
    (await fetchContent<NewsPost[]>(`*[_type == "newsPost" && defined(slug.current)] | order(coalesce(date, "0000") desc){
      "slug": slug.current, category, date, title, summary, "paragraphs": coalesce(paragraphs, []),
      "video": video{"id": youtubeId, title, duration, uploadDate},
      "source": source${link}
    }`)) ?? []
  );
}

export async function getGallery(): Promise<GalleryGroup[]> {
  return (
    (await fetchContent<GalleryGroup[]>(`*[_type == "galleryGroup"] | order(order asc){
      "id": coalesce(id.current, _id), label, place, description,
      "images": coalesce(images[]${photo}, [])
    }`)) ?? []
  ).map((group) => ({ ...group, images: group.images.filter((image): image is GalleryImage => !!image.src) }));
}

// ---------- SEO

type PageSeo = { title?: string; description?: string; focusKeyword?: string; ogImage?: string };

// Page SEO from Sanity (Page SEO entries, or a project's SEO tab), else the SEO sheet values in src/content/seo.ts.
export async function getSeo(path: string): Promise<PageSeo> {
  const data = await fetchContent<PageSeo>(
    `coalesce(
      *[_type == "pageSeo" && path == $path][0].seo,
      *[_type == "project" && "/projects/" + slug.current == $path][0].seo
    ){title, description, focusKeyword, "ogImage": ogImage.asset->url}`,
    { path },
  );
  return { ...sheetSeo[path], ...data };
}

export async function seoMetadata(path: string): Promise<Metadata> {
  const page = await getSeo(path);
  return {
    ...(page.title ? { title: page.title } : {}),
    ...(page.description ? { description: page.description } : {}),
    ...(page.focusKeyword ? { keywords: [page.focusKeyword] } : {}),
    // A page's openGraph replaces the layout's, so repeat its other fields.
    ...(page.ogImage
      ? { openGraph: { url: "./", type: "website", siteName: "Rock1 Builders", locale: "en_GB", images: [{ url: page.ogImage }] } }
      : {}),
  };
}
