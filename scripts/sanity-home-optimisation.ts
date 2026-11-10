// Nov 2026 homepage content optimisation: copies the updated text from src/content/home.ts into the published
// Sanity documents, field by field. Images and every field not in the brief are left as they are.
//
//   npx sanity exec scripts/sanity-home-optimisation.ts -- --dry      → lists the changes, writes nothing
//   npx sanity exec scripts/sanity-home-optimisation.ts --with-user-token
//
// Safe to run again: it only sets values.

import { getCliClient } from "sanity/cli";
import { faqs, gateway, hero, projects, services, story, whyMontenegro } from "../src/content/home";

const dry = process.argv.includes("--dry");
const client = getCliClient({ apiVersion: "2026-10-26" });

const tile = (label: string) => gateway.tiles.find((t) => t.label === label)!;
const reason = (title: string) => whyMontenegro.reasons.find((r) => r.title === title)!;
const service = (short: string) => services.items.find((s) => s.short === short)!;
const project = (slug: string) => projects.items.find((p) => p.slug === slug)!;

const homePage = {
  "hero.heading": hero.heading,
  "hero.intro": hero.intro,
  "story.body1": story.body1,
  "story.body2": story.body2,
  "gateway.questionSub": gateway.questionSub,
  "gateway.intro.rest": gateway.intro.rest,
  "gateway.body": gateway.body,
  'gateway.tiles[label=="Connectivity"].caption': tile("Connectivity").caption,
  "faqs.intro": faqs.intro,
  "whyMontenegro.title": whyMontenegro.title,
  "whyMontenegro.intro": whyMontenegro.intro,
  ...Object.fromEntries(
    ["Political Stability & EU Accession Prospects", "Mediterranean Haven of Natural Beauty", "A Year-Round Tourist Hotspot"].map((title) => [
      `whyMontenegro.reasons[title=="${title}"].description`,
      reason(title).description,
    ]),
  ),
};

const servicesPage = {
  "section.title": services.title,
  "section.intro": services.intro,
  'section.items[short=="Development & Investment"].description': service("Development & Investment").description,
  'section.items[short=="Residency Management"].tag': service("Residency Management").tag,
  'section.items[short=="Residency Management"].description': service("Residency Management").description,
};

const listingPages = {
  "projects.intro": projects.intro,
  "projects.homeHeading": projects.homeHeading,
};

const oceanCrest = project("ocean-crest");
const projectChanges: Record<string, Record<string, string>> = {
  "ocean-crest": {
    subtitle: oceanCrest.subtitle!,
    category: oceanCrest.category,
    "stat.value": oceanCrest.stat.value,
    summary: oceanCrest.summary,
    cardSummary: oceanCrest.cardSummary!,
    description: oceanCrest.description,
  },
  "royal-habitat": { location: project("royal-habitat").location, summary: project("royal-habitat").summary },
  "rock-star-vazhakkala": { location: project("rock-star-vazhakkala").location },
};

async function main() {
  const ids = await client.fetch<{ slug: string; _id: string }[]>(
    `*[_type == "project" && slug.current in $slugs && !(_id in path("drafts.**"))]{"slug": slug.current, _id}`,
    { slugs: Object.keys(projectChanges) },
  );
  const patches: [string, Record<string, string>][] = [
    ["homePage", homePage],
    ["servicesPage", servicesPage],
    ["listingPages", listingPages],
    ...ids.map(({ slug, _id }) => [_id, projectChanges[slug]] as [string, Record<string, string>]),
  ];
  const missing = Object.keys(projectChanges).filter((slug) => !ids.some((id) => id.slug === slug));
  if (missing.length) console.warn(`Projects not found in Sanity: ${missing.join(", ")}`);

  for (const [id, set] of patches) {
    console.log(`\n${id}`);
    for (const [path, value] of Object.entries(set)) console.log(`  ${path}: ${value.slice(0, 90)}${value.length > 90 ? "…" : ""}`);
  }
  if (dry) return console.log("\nDry run: nothing written.");

  const tx = client.transaction();
  for (const [id, set] of patches) tx.patch(id, (patch) => patch.set(set));
  await tx.commit();
  console.log("\nDone: Sanity updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
