// Copies "Why Choose Montenegro" from the import holding document into the Home page, unless the Home page
// already has one, then removes the holding document. Run after importing .sanity/pages.ndjson:
//   npx sanity exec scripts/sanity-merge-why.ts --with-user-token

import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-10-26" });

const scratch = await client.getDocument<{ whyMontenegro: unknown }>("import.whyMontenegro");
if (!scratch) {
  console.log("Nothing to merge: import.whyMontenegro not found.");
} else {
  await client.patch("homePage").setIfMissing({ whyMontenegro: scratch.whyMontenegro }).commit();
  await client.delete("import.whyMontenegro");
  console.log("Added Why Choose Montenegro to the Home page.");
}
