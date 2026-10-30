// Site content from Sanity, in the same shapes the components used when it lived in src/content/.
// Fields left empty in Sanity fall back to the values in src/content/, so a missing field never blanks a page.
// Text that is not in the CMS (navigation, About, Services, Montenegro pages, legal) still comes from src/content/.

import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import type { GalleryImage } from "@/components/GalleryGrid";
import { contactCta, faqs, gateway, hero, type ProjectItem, projects, services, story, whyMontenegro } from "@/content/home";
import { type MapPlace, montenegroMap } from "@/content/montenegroMap";
import {
  about,
  blogPage,
  contactPage,
  europeanAdvantage,
  type GalleryGroup,
  galleryPage,
  legalPage,
  montenegroPage,
  type NewsPost,
  newsroom,
  servicesPage,
} from "@/content/pages";
import type { ProjectDetail } from "@/content/projectDetails";
import { seo as sheetSeo } from "@/content/seo";
import { footer } from "@/content/site";
import { dataset, projectId } from "./env";
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
  const [items, headings] = await Promise.all([getProjects(), getListingHeadings()]);
  return { ...projects, ...headings.projects, items };
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

// ---------- blog

export type BlogImage = { src: string; alt?: string; caption?: string; width: number; height: number };

export type BlogPost = {
  slug: string;
  title: string;
  category?: string;
  // ISO date
  date: string;
  excerpt: string;
  image?: BlogImage;
};

export type BlogPostDetail = BlogPost & { body: PortableTextBlock[] };

const blogCard = `"slug": slug.current, title, category, date, excerpt, "image": image${sized}`;

// Newest first.
export async function getBlogPosts(): Promise<BlogPost[]> {
  return (
    (await fetchContent<BlogPost[]>(`*[_type == "blogPost" && defined(slug.current)] | order(date desc, _createdAt desc){${blogCard}}`)) ?? []
  ).map((post) => (post.image?.src ? post : { ...post, image: undefined }));
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | undefined> {
  const post = await fetchContent<BlogPostDetail>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      ${blogCard},
      "body": coalesce(body[]{..., _type == "photo" => ${sized}}, [])
    }`,
    { slug },
  );
  if (!post) return undefined;
  return post.image?.src ? post : { ...post, image: undefined };
}

// ---------- SEO

type PageSeo = { title?: string; description?: string; focusKeyword?: string; ogImage?: string };

// Page SEO from Sanity (Page SEO entries, or a project's SEO tab), else the SEO sheet values in src/content/seo.ts.
export async function getSeo(path: string): Promise<PageSeo> {
  const data = await fetchContent<PageSeo>(
    `coalesce(
      *[_type == "pageSeo" && path == $path][0].seo,
      *[_type == "project" && "/projects/" + slug.current == $path][0].seo,
      *[_type == "blogPost" && "/blog/" + slug.current == $path][0].seo
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

// ---------- fixed pages (About Us, Our Services, About Montenegro, Legal, Contact Us, page headings)

// Sanity image → CDN URL, from its asset reference ("image-<id>-<w>x<h>-<ext>").
const imageUrl = (ref: string) => {
  const [, id, size, ext] = ref.split("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${ext}`;
};

type SanityImage = { _type?: string; asset?: { _ref?: string }; [key: string]: unknown };

// A raw Sanity document in the shape the components expect: images become URL strings, `photo` images
// become { src, caption, … }, and Sanity's own fields (_type, _key, …) are dropped.
function toContent(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toContent).filter((v) => v !== undefined);
  if (!value || typeof value !== "object") return value;
  const obj = value as SanityImage;
  if (obj.asset?._ref) {
    const src = imageUrl(obj.asset._ref);
    if (obj._type !== "photo") return src;
    const { caption, alt, description, ratio, wide } = obj;
    return stripNulls({ src, caption: caption ?? alt, description, ratio, wide });
  }
  if (obj._type === "image" || obj._type === "photo") return undefined; // image field with no file
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k, v]) => !k.startsWith("_") && v !== null)
      .map(([k, v]) => [k, toContent(v)])
      .filter(([, v]) => v !== undefined),
  );
}

// Code values first, then every top-level field the Sanity document has.
async function fromSanity<T extends object>(query: string, fallback: T): Promise<T> {
  const { data } = await sanityFetch({ query, stega: false });
  return { ...fallback, ...(toContent(data) as Partial<T> | undefined) };
}

// The European Advantage section is stored with About Us but loaded on its own (getEuropeanAdvantage).
export async function getAbout() {
  return fromSanity(`*[_id == "aboutPage"][0]{..., "europeanAdvantage": null}`, about);
}

export async function getEuropeanAdvantage() {
  return fromSanity(`*[_id == "aboutPage"][0].europeanAdvantage`, europeanAdvantage);
}

export async function getServicesPage() {
  return fromSanity(`*[_id == "servicesPage"][0]{..., "section": null}`, servicesPage);
}

// The three services, shown on the Home page and Our Services.
export async function getServicesSection() {
  return fromSanity(`*[_id == "servicesPage"][0].section`, services);
}
export type ServicesSection = typeof services;

export async function getMontenegroPage() {
  return fromSanity(`*[_id == "montenegroPage"][0]{eyebrow, title, intro, image, video, body}`, montenegroPage);
}

// Map heading and places from Sanity; zoom areas, labels and credits stay in src/content/montenegroMap.ts.
export async function getMontenegroMap() {
  const data = await fromSanity(`*[_id == "montenegroPage"][0]{"places": places, "heading": map}`, {
    places: montenegroMap.places as MapPlace[],
    heading: { eyebrow: montenegroMap.eyebrow, title: montenegroMap.title, intro: montenegroMap.intro },
  });
  return { ...montenegroMap, ...data.heading, places: data.places.map((place) => ({ ...place, image: place.image ?? null })) };
}
export type MontenegroMapData = Awaited<ReturnType<typeof getMontenegroMap>>;

export async function getLegalPage() {
  return fromSanity(`*[_id == "legalPage"][0]`, legalPage);
}

export async function getContactPage() {
  return fromSanity(`*[_id == "contactPage"][0]`, contactPage);
}

export async function getWhyMontenegro() {
  const data = await fromSanity(`*[_id == "homePage"][0].whyMontenegro`, whyMontenegro);
  return { ...data, reasons: data.reasons.map((reason) => ({ ...reason, image: reason.image ?? null })) };
}

// Headings above the lists on Projects, Gallery, Newsroom and Blog.
export async function getListingHeadings() {
  const fallback = {
    projects: { eyebrow: projects.eyebrow, pageHeading: projects.pageHeading, intro: projects.intro, stripExtras: projects.stripExtras },
    gallery: { eyebrow: galleryPage.eyebrow, title: galleryPage.title, intro: galleryPage.intro },
    newsroom: { eyebrow: newsroom.eyebrow, title: newsroom.title, intro: newsroom.intro },
    blog: blogPage,
  };
  const data = await fromSanity(`*[_id == "listingPages"][0]`, fallback);
  return {
    projects: { ...fallback.projects, ...data.projects },
    gallery: { ...fallback.gallery, ...data.gallery },
    newsroom: { ...fallback.newsroom, ...data.newsroom },
    blog: { ...fallback.blog, ...data.blog },
  };
}

// Instagram reels section on the Newsroom page. Links are cleaned to https://www.instagram.com/<p|reel>/<code>/.
export async function getNewsroomInstagram() {
  const data = await fromSanity(`*[_id == "listingPages"][0].instagram`, {
    eyebrow: "Instagram",
    title: "From our Instagram",
    intro: "",
    cta: { label: "Follow @rock1global", href: "https://www.instagram.com/rock1global" } as { label: string; href: string } | undefined,
    posts: [] as { url: string }[],
  });
  const posts = data.posts
    .map(({ url }) => url?.match(/instagram\.com\/(p|reels?)\/([\w-]+)/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map(([, kind, code]) => ({ code, url: `https://www.instagram.com/${kind === "p" ? "p" : "reel"}/${code}/` }));
  return { ...data, posts };
}
