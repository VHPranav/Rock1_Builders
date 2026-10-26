"use server";

import { updateTag } from "next/cache";
import { parseTags } from "next-sanity/live";

// Called by <SanityLive /> when published content changes. The default action marks the cache stale,
// so the first visitor after a publish still sees the old version; updateTag expires it at once, so the
// next request (including the open page's refresh) renders the new content.
export async function expireSanityTags(unsafeTags: unknown): Promise<"refresh"> {
  const { tags } = parseTags(unsafeTags);
  for (const tag of tags) updateTag(tag);
  return "refresh";
}
