// Second import: the fixed pages (About Us, Our Services, About Montenegro, Legal, Contact Us, page headings)
// and the Home page's "Why Choose Montenegro" section. Never overwrites content edited in Sanity.
//
//   npx tsx scripts/sanity-export-pages.ts                                   → writes .sanity/pages.ndjson
//   npx sanity dataset import .sanity/pages.ndjson --dataset production --missing   (new documents only)
//   npx sanity exec scripts/sanity-merge-why.ts --with-user-token            (adds Why Montenegro to the Home page)

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { projects, services, whyMontenegro } from "@/content/home";
import { montenegroMap } from "@/content/montenegroMap";
import { about, contactPage, europeanAdvantage, galleryPage, legalPage, montenegroPage, newsroom, servicesPage } from "@/content/pages";

const root = process.cwd();
const missing: string[] = [];
let n = 0;
const key = () => `p${(n++).toString(36).padStart(4, "0")}`;

// /images/foo.webp → an image the import uploads from public/.
function image(src: string | null | undefined, extra: Record<string, unknown> = {}, type = "image") {
  if (!src) return undefined;
  const file = path.join(root, "public", src);
  if (!existsSync(file)) {
    missing.push(src);
    return undefined;
  }
  return { _type: type, _sanityAsset: `image@${pathToFileURL(file).href}`, ...extra };
}
const keyed = <T extends object>(type: string, list: T[], map: (item: T) => object = (item) => item) =>
  list.map((item) => ({ _type: type, _key: key(), ...map(item) }));
const film = (video: { src: string; poster: string } | undefined) => video && { src: video.src, poster: image(video.poster) };

// Drop undefined values so the import doesn't store empty fields.
function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.filter((v) => v !== undefined).map(clean) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined).map(([k, v]) => [k, clean(v)])) as T;
  }
  return value;
}

const docs: Record<string, unknown>[] = [
  {
    _id: "aboutPage",
    _type: "aboutPage",
    eyebrow: about.eyebrow,
    title: about.title,
    intro: about.intro,
    image: image(about.image),
    video: film(about.video),
    story: about.story,
    trust: { ...about.trust, pillars: keyed("pillar", about.trust.pillars) },
    film: about.film,
    ceo: { ...about.ceo, photo: image(about.ceo.photo) },
    team: { eyebrow: about.team.eyebrow, members: keyed("member", about.team.members, (m) => ({ ...m, photo: image(m.photo) })) },
    europeanAdvantage: {
      ...europeanAdvantage,
      pillars: keyed("advantage", europeanAdvantage.pillars, (p) => ({ ...p, image: image(p.image) })),
    },
  },
  {
    _id: "servicesPage",
    _type: "servicesPage",
    eyebrow: servicesPage.eyebrow,
    title: servicesPage.title,
    intro: servicesPage.intro,
    image: image(servicesPage.image),
    video: film(servicesPage.video),
    body: servicesPage.body,
    stats: keyed("stat", servicesPage.stats),
    section: {
      eyebrow: services.eyebrow,
      title: services.title,
      intro: services.intro,
      cta: { _type: "link", ...services.cta },
      items: keyed("service", services.items, (s) => ({ ...s, images: { left: image(s.images.left), right: image(s.images.right) } })),
    },
  },
  {
    _id: "montenegroPage",
    _type: "montenegroPage",
    eyebrow: montenegroPage.eyebrow,
    title: montenegroPage.title,
    intro: montenegroPage.intro,
    image: image(montenegroPage.image),
    video: film(montenegroPage.video),
    body: montenegroPage.body,
    map: { eyebrow: montenegroMap.eyebrow, title: montenegroMap.title, intro: montenegroMap.intro },
    places: keyed("place", montenegroMap.places, (p) => ({ ...p, image: image(p.image) })),
  },
  {
    _id: "legalPage",
    _type: "legalPage",
    eyebrow: legalPage.eyebrow,
    title: legalPage.title,
    intro: legalPage.intro,
    documents: legalPage.documents.map((d) =>
      ({ ...image(d.src, { alt: d.caption, caption: d.caption, description: d.description, ratio: d.ratio }, "photo"), _key: key() }),
    ),
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: contactPage.eyebrow,
    title: contactPage.title,
    intro: contactPage.intro,
    formTitle: contactPage.formTitle,
    offices: keyed("office", contactPage.offices, (o) => ({ ...o, image: image(o.image) })),
  },
  {
    _id: "listingPages",
    _type: "listingPages",
    projects: {
      eyebrow: projects.eyebrow,
      pageHeading: projects.pageHeading,
      intro: projects.intro,
      stripExtras: projects.stripExtras.map((src) => ({ ...image(src), _key: key() })),
    },
    gallery: { eyebrow: galleryPage.eyebrow, title: galleryPage.title, intro: galleryPage.intro },
    newsroom: { eyebrow: newsroom.eyebrow, title: newsroom.title, intro: newsroom.intro },
  },
  // Holds the Why Montenegro section (with its uploaded images) until sanity-merge-why.ts copies it into the Home page.
  {
    _id: "import.whyMontenegro",
    _type: "importScratch",
    whyMontenegro: { ...whyMontenegro, reasons: keyed("reason", whyMontenegro.reasons, (r) => ({ ...r, image: image(r.image) })) },
  },
];

mkdirSync(path.join(root, ".sanity"), { recursive: true });
writeFileSync(path.join(root, ".sanity/pages.ndjson"), docs.map((d) => JSON.stringify(clean(d))).join("\n") + "\n");
const images = docs.map((d) => JSON.stringify(d).split("_sanityAsset").length - 1).reduce((a, b) => a + b, 0);
console.log(`Wrote ${docs.length} documents, ${images} image references to .sanity/pages.ndjson`);
if (missing.length) console.warn(`Missing images (skipped):\n  ${[...new Set(missing)].join("\n  ")}`);
