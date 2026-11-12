// Nov 2026 About Montenegro content optimisation: copies the updated text from src/content/pages.ts and
// src/content/montenegroMap.ts into the published About Montenegro document in Sanity.
// The new "Types of property" and "at a glance" cards reuse the images already in Sanity (Home's Why Montenegro
// cards and the European Advantage cards), in the same order as the code. Map places and every other field are left as they are.
//
//   npx sanity exec scripts/sanity-montenegro-optimisation.ts -- --dry      → lists the changes, writes nothing
//   npx sanity exec scripts/sanity-montenegro-optimisation.ts --with-user-token
//
// Safe to run again: it only sets values.

import { getCliClient } from "sanity/cli";
import { montenegroMap } from "../src/content/montenegroMap";
import { montenegroPage } from "../src/content/pages";

const dry = process.argv.includes("--dry");
const client = getCliClient({ apiVersion: "2026-10-26" });

type SanityImage = { _type: string; asset: { _ref: string }; [key: string]: unknown } | null;

async function main() {
  const images = await client.fetch<{ why: SanityImage[]; advantage: SanityImage[] }>(`{
    "why": *[_id == "homePage"][0].whyMontenegro.reasons[].image,
    "advantage": *[_id == "aboutPage"][0].europeanAdvantage.pillars[].image
  }`);
  // An image field only, without the gallery fields a `photo` might carry.
  const image = (img: SanityImage | undefined) => (img?.asset?._ref ? { _type: "image", asset: { _type: "reference", _ref: img.asset._ref } } : undefined);

  const { propertyTypes, glance } = montenegroPage;
  const set: Record<string, unknown> = {
    title: montenegroPage.title,
    body: montenegroPage.body,
    "map.intro": montenegroMap.intro,
    "map.note": montenegroMap.note,
    propertyTypes: {
      eyebrow: propertyTypes.eyebrow,
      title: propertyTypes.title,
      intro: propertyTypes.intro,
      reasons: propertyTypes.reasons.map((card, i) => ({
        _type: "card",
        _key: `type${i + 1}`,
        title: card.title,
        description: card.description,
        ...(image(images.why?.[i]) && { image: image(images.why?.[i]) }),
      })),
    },
    glance: {
      eyebrow: glance.eyebrow,
      title: glance.title,
      intro: glance.intro,
      pillars: glance.pillars.map((pillar, i) => ({
        _type: "pillar",
        _key: `glance${i + 1}`,
        title: pillar.title,
        text: pillar.text,
        ...(image(images.advantage?.[i]) && { image: image(images.advantage?.[i]) }),
      })),
      facts: glance.facts.map((fact, i) => ({ _type: "fact", _key: `fact${i + 1}`, ...fact })),
      faqs: glance.faqs.map((faq, i) => ({ _type: "faqItem", _key: `faq${i + 1}`, ...faq })),
    },
    contactIntro: montenegroPage.contactIntro,
  };

  console.log(`Images found: ${images.why?.filter(Boolean).length ?? 0} Why Montenegro, ${images.advantage?.filter(Boolean).length ?? 0} European Advantage`);
  console.log("\nmontenegroPage");
  for (const [path, value] of Object.entries(set)) {
    const text = typeof value === "string" ? value : JSON.stringify(value);
    console.log(`  ${path}: ${text.slice(0, 90)}${text.length > 90 ? "…" : ""}`);
  }
  if (dry) return console.log("\nDry run: nothing written.");

  await client.patch("montenegroPage").set(set).commit();
  console.log("\nDone: Sanity updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
