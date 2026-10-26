import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { apiVersion, dataset, projectId } from "./env";

const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });

// sanityFetch caches each query under Sanity's sync tags. <SanityLive /> (in the root layout) listens for
// published changes and revalidates just those tags, so edits go live without a rebuild or webhook.
export const { sanityFetch, SanityLive } = defineLive({ client });
