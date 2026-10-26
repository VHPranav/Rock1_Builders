// Turns the content in src/content/ into a Sanity import file (NDJSON).
// Images are referenced from /public and uploaded by the import itself.
//
//   npx tsx scripts/sanity-export.ts            → writes .sanity/import.ndjson
//   npx sanity dataset import .sanity/import.ndjson production --replace
//
// Documents get fixed IDs (project-life-bay, faq-1, …), so running it again updates them instead of
// creating duplicates. Videos and PDFs stay in /public and are stored as paths.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { contactCta, faqs, gateway, hero, projects, story } from "@/content/home";
import { galleryPage, newsroom } from "@/content/pages";
import { projectDetails } from "@/content/projectDetails";
import { seo } from "@/content/seo";
import { defaultOgImage, footer } from "@/content/site";

const root = process.cwd();
const missing: string[] = [];
let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(4, "0")}`;

type Doc = Record<string, unknown> & { _id: string; _type: string };
type Img = { src: string; caption?: string; alt?: string; description?: string; ratio?: string; wide?: boolean };

// /images/foo.webp → an image object the import uploads from public/.
function image(src: string | null | undefined, extra: Omit<Img, "src"> = {}, type = "photo") {
  if (!src) return undefined;
  const file = path.join(root, "public", src);
  if (!existsSync(file)) {
    missing.push(src);
    return undefined;
  }
  const { caption, description, ratio, wide } = extra;
  return clean({
    _type: type,
    _sanityAsset: `image@${pathToFileURL(file).href}`,
    ...(type === "photo" ? { alt: extra.alt ?? caption ?? "", caption, description, ratio, wide } : {}),
  });
}

const photos = (list: Img[] | undefined) =>
  list?.map((p) => image(p.src, p)).filter(Boolean).map((p) => ({ ...p, _key: key() }));

const link = (l: { label: string; href: string } | undefined) => l && { _type: "link", label: l.label, href: l.href };
const download = (d: { label: string; href: string } | undefined) => d && { _type: "download", label: d.label, href: d.href };
const keyed = <T extends object>(list: T[] | undefined, type?: string) =>
  list?.map((item) => ({ ...(type ? { _type: type } : {}), ...item, _key: key() }));

type VideoIn = {
  title?: string;
  label?: string;
  src?: string;
  poster?: string;
  youtubeId?: string;
  id?: string;
  duration?: string;
  uploadDate?: string;
};
const video = (v: VideoIn | undefined, fallbackTitle = "") =>
  v &&
  clean({
    _type: "video",
    title: v.title ?? v.label ?? fallbackTitle,
    label: v.label,
    youtubeId: v.youtubeId ?? v.id,
    src: v.src,
    poster: image(v.poster, { alt: v.title ?? v.label ?? fallbackTitle }),
    duration: v.duration,
    uploadDate: v.uploadDate,
  });

const seoField = (pagePath: string) => {
  const s = seo[pagePath];
  return s && { _type: "seo", title: s.title, description: s.description, focusKeyword: s.focusKeyword };
};

// Drop undefined values so the import doesn't store empty fields.
function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.filter((v) => v !== undefined).map(clean) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).filter(([, v]) => v !== undefined).map(([k, v]) => [k, clean(v)]),
    ) as T;
  }
  return value;
}

const docs: Doc[] = [];

// Site settings
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  email: footer.email,
  phones: keyed(footer.phones, "phone"),
  address: footer.address,
  socials: keyed(footer.socials, "link"),
  footerImage: image(footer.image, { alt: "Rock1 Builders" }),
  footerPrompt: footer.prompt,
  footerCta: link(footer.cta),
  defaultOgImage: image(defaultOgImage, {}, "image"),
});

// Home page
docs.push({
  _id: "homePage",
  _type: "homePage",
  hero: { eyebrow: hero.eyebrow, title: hero.title, subtitle: hero.subtitle, cta: link(hero.cta), videoSrc: hero.videoSrc },
  story: { eyebrow: story.eyebrow, heading: story.heading, body1: story.body1, body2: story.body2, cta: link(story.cta) },
  gateway: {
    eyebrow: gateway.eyebrow,
    question: gateway.question,
    questionSub: gateway.questionSub,
    cta: link(gateway.cta),
    intro: gateway.intro,
    body: gateway.body,
    readMore: link(gateway.readMore),
    stats: keyed(gateway.stats, "stat"),
    tiles: gateway.tiles.map((t) => ({
      _type: "tile",
      _key: key(),
      label: t.label,
      caption: t.caption,
      image: image(t.image, { alt: t.label, caption: t.caption }),
    })),
  },
  faqs: { eyebrow: faqs.eyebrow, title: faqs.title, intro: faqs.intro, cta: link(faqs.cta) },
  contactCta: { eyebrow: contactCta.eyebrow, title: contactCta.title, intro: contactCta.intro, brochure: download(contactCta.brochure) },
});

// FAQs
faqs.items.forEach((f, i) => docs.push({ _id: `faq-${i + 1}`, _type: "faq", question: f.question, answer: f.answer, order: (i + 1) * 10 }));

// Projects (card from home.ts + page from projectDetails.ts)
projects.items.forEach((p, i) => {
  const d = projectDetails[p.slug] ?? { overview: [] };
  docs.push({
    _id: `project-${p.slug}`,
    _type: "project",
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    subtitle: p.subtitle,
    location: p.location,
    region: p.region,
    status: p.status,
    category: p.category,
    stat: p.stat,
    summary: p.summary,
    description: p.description,
    image: image(p.image, { alt: `${p.name}, ${p.location}` }),
    tone: p.tone,
    order: (i + 1) * 10,

    tagline: d.tagline,
    overview: d.overview,
    lists: keyed(
      d.lists?.map((l) => ({ title: l.title, items: l.items })),
      "detailList",
    ),
    villas: d.villas?.map((v) => ({
      _type: "villaType",
      _key: key(),
      name: v.name,
      size: v.size,
      specs: keyed(v.specs, "spec"),
      plans: photos(v.plans),
    })),
    downloads: d.downloads?.map((x) => ({ ...download(x), _key: key() })),
    floorPlans: d.floorPlans && {
      title: d.floorPlans.title,
      pdf: download(d.floorPlans.pdf),
      pages: photos(d.floorPlans.pages),
    },
    // The full-size site plan; the CDN makes the smaller version.
    sitePlan: d.sitePlan && image(d.sitePlan.full, { caption: d.sitePlan.caption }),

    heroImage: image(d.heroImage, { alt: p.name }),
    logo: d.logo && image(d.logo.src, { alt: d.logo.alt }),
    heroVideo: video(d.heroVideo, `${p.name} hero film`),
    bandVideo: video(d.bandVideo, `${p.name} film`),
    film: video(d.film),
    videos: d.videos?.map((v) => ({ ...video(v), _key: key() })),
    stills: photos(d.stills),
    photos: photos(d.photos),
    brochure: photos(d.brochure),

    seo: seoField(p.href),
  });
});

// Newsroom
newsroom.posts.forEach((post) =>
  docs.push({
    _id: `news-${post.slug}`,
    _type: "newsPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    category: post.category,
    date: post.date,
    summary: post.summary,
    paragraphs: post.paragraphs,
    video: video(post.video),
    source: link(post.source),
  }),
);

// Gallery
galleryPage.groups.forEach((g, i) =>
  docs.push({
    _id: `gallery-${g.id}`,
    _type: "galleryGroup",
    label: g.label,
    id: { _type: "slug", current: g.id },
    place: g.place,
    description: g.description,
    images: photos(g.images),
    order: (i + 1) * 10,
  }),
);

// Page SEO for fixed pages (project pages carry their own)
const pageNames: Record<string, string> = {
  "/": "Home",
  "/about-us": "About Us",
  "/about-montenegro": "About Montenegro",
  "/our-services": "Our Services",
  "/projects": "Projects",
  "/gallery": "Gallery",
  "/newsroom": "Newsroom",
  "/contact-us": "Contact Us",
  "/legal": "Legal",
};
Object.keys(seo)
  .filter((p) => !p.startsWith("/projects/"))
  .forEach((p) =>
    docs.push({
      _id: `pageSeo-${p === "/" ? "home" : p.slice(1).replaceAll("/", "-")}`,
      _type: "pageSeo",
      page: pageNames[p] ?? p,
      path: p,
      seo: seoField(p),
    }),
  );

const outDir = path.join(root, ".sanity");
mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, "import.ndjson");
writeFileSync(out, docs.map((d) => JSON.stringify(clean(d))).join("\n") + "\n");

const counts = docs.reduce<Record<string, number>>((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
const images = docs.map((d) => JSON.stringify(d).split("_sanityAsset").length - 1).reduce((a, b) => a + b, 0);
console.log(`Wrote ${docs.length} documents to ${path.relative(root, out)}`, counts);
console.log(`${images} image references`);
if (missing.length) console.warn(`Missing images (skipped):\n  ${[...new Set(missing)].join("\n  ")}`);
