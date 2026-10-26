// Structured data (JSON-LD) for search engines. Each page renders one <JsonLd> with a single @graph:
// Organization and WebSite are defined once per page and every other node points to them by @id,
// so nothing is repeated.

import { defaultOgImage, siteUrl } from "@/content/site";
import { getSettings, type SiteSettings } from "@/sanity/content";

type Node = Record<string, unknown>;

const orgId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const absolute = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path === "/" ? "" : path}`);

const organizationNode = (footer: SiteSettings): Node => ({
  "@type": "Organization",
  "@id": orgId,
  name: "Rock1 Builders",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/images/logos/rock1-builders.webp` },
  email: footer.email,
  address: { "@type": "PostalAddress", streetAddress: "Mainski Put BB", addressLocality: "Budva", addressCountry: "ME" },
  contactPoint: footer.phones.map((phone) => ({ "@type": "ContactPoint", telephone: phone.tel, contactType: "sales", areaServed: phone.region })),
  sameAs: footer.socials.filter((social) => social.label !== "YouTube").map((social) => social.href),
});

const website: Node = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "Rock1 Builders",
  inLanguage: "en-GB",
  publisher: { "@id": orgId },
};

type Crumb = { name: string; path: string };

type PageInput = {
  path: string;
  name: string;
  description: string;
  // WebPage subtype, e.g. AboutPage, ContactPage, CollectionPage.
  type?: string;
  // Parent pages between Home and this one.
  parents?: Crumb[];
  image?: string;
  // Extra nodes on this page (videos, posts, properties); the WebPage lists them as its main content.
  nodes?: Node[];
  // Properties merged into the WebPage node.
  extra?: Node;
};

// "4:52" -> "PT4M52S"
export const isoDuration = (clock: string) => {
  const [h, m, s] = [0, 0, ...clock.split(":").map(Number)].slice(-3);
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s}S`;
};

type VideoInput = { name: string; description: string; uploadDate: string; duration: string; youtubeId?: string; src?: string; poster?: string };

export function videoNode(video: VideoInput, pagePath: string): Node {
  const id = `${absolute(pagePath)}#video-${video.youtubeId ?? video.src?.split("/").pop()?.replace(/\.\w+$/, "")}`;
  return {
    "@type": "VideoObject",
    "@id": id,
    name: video.name,
    description: video.description,
    uploadDate: video.uploadDate,
    duration: isoDuration(video.duration),
    thumbnailUrl: video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : absolute(video.poster ?? defaultOgImage),
    ...(video.youtubeId
      ? { embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`, contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}` }
      : { contentUrl: absolute(video.src ?? "") }),
    publisher: { "@id": orgId },
  };
}

export function pageGraph(
  { path, name, description, type = "WebPage", parents = [], image, nodes = [], extra = {} }: PageInput,
  organization: Node,
): Node {
  const url = absolute(path);
  const crumbs = path === "/" ? [] : [{ name: "Home", path: "/" }, ...parents, { name, path }];
  const breadcrumb: Node | undefined = crumbs.length
    ? {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: absolute(crumb.path) })),
      }
    : undefined;
  const webPage: Node = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": websiteId },
    ...(path === "/" ? { about: { "@id": orgId } } : {}),
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absolute(image) } } : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
    ...extra,
  };
  // Everything else on the page that is not already its main entity.
  const mainId = (webPage.mainEntity as Node | undefined)?.["@id"];
  const parts = nodes.filter((node) => node["@id"] !== mainId);
  if (parts.length) webPage.hasPart = parts.map((node) => ({ "@id": node["@id"] }));
  return { "@context": "https://schema.org", "@graph": [organization, website, webPage, ...(breadcrumb ? [breadcrumb] : []), ...nodes] };
}

export async function JsonLd(props: PageInput) {
  const organization = organizationNode(await getSettings());
  // Escape "<" so text can never close the script tag.
  const json = JSON.stringify(pageGraph(props, organization)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export { absolute, orgId };
