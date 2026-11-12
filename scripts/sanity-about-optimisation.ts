// Nov 2026 About Us content optimisation: copies the updated text from src/content/pages.ts into the published
// About Us document in Sanity, field by field. Images, the film and every field not in the brief are left as they are.
// The European Advantage block is shared with About Montenegro, so it changes there too.
//
//   npx sanity exec scripts/sanity-about-optimisation.ts -- --dry      → lists the changes, writes nothing
//   npx sanity exec scripts/sanity-about-optimisation.ts --with-user-token
//
// Safe to run again: it only sets values.

import { getCliClient } from "sanity/cli";
import { about, europeanAdvantage } from "../src/content/pages";

const dry = process.argv.includes("--dry");
const client = getCliClient({ apiVersion: "2026-10-26" });

const pillar = (title: string) => about.trust.pillars.find((p) => p.title === title)!;
const member = (name: string) => about.team.members.find((m) => m.name === name)!;

const set: Record<string, unknown> = {
  heading: about.heading,
  title: about.title,
  intro: about.intro,
  story: about.story,
  "trust.title": about.trust.title,
  'trust.pillars[title=="Global quality"].text': pillar("Global quality").text,
  'trust.pillars[title=="Complete solution"].text': pillar("Complete solution").text,
  "trust.facts": about.trust.facts,
  "film.description": about.film.description,
  "ceo.bio": about.ceo.bio,
  'team.members[name=="Shahid Salim"].bio': member("Shahid Salim").bio,
  'team.members[name=="Mahmut Vukovic"].bio': member("Mahmut Vukovic").bio,
  faqs: {
    ...about.faqs,
    cta: { _type: "link", ...about.faqs.cta },
    items: about.faqs.items.map((item, i) => ({ _type: "faqItem", _key: `faq${i + 1}`, ...item })),
  },
  contactIntro: about.contactIntro,
  "europeanAdvantage.intro": europeanAdvantage.intro,
  // By position: two of the three card headings change too.
  ...Object.fromEntries(
    europeanAdvantage.pillars.flatMap((p, i) => [
      [`europeanAdvantage.pillars[${i}].title`, p.title],
      [`europeanAdvantage.pillars[${i}].text`, p.text],
    ]),
  ),
};

async function main() {
  const current = await client.fetch<{ titles: string[] }>(`*[_id == "aboutPage"][0]{"titles": europeanAdvantage.pillars[].title}`);
  console.log(`European Advantage cards in Sanity now: ${current?.titles?.join(" | ")}`);

  console.log("\naboutPage");
  for (const [path, value] of Object.entries(set)) {
    const text = typeof value === "string" ? value : JSON.stringify(value);
    console.log(`  ${path}: ${text.slice(0, 90)}${text.length > 90 ? "…" : ""}`);
  }
  if (dry) return console.log("\nDry run: nothing written.");

  await client.patch("aboutPage").set(set).commit();
  console.log("\nDone: Sanity updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
