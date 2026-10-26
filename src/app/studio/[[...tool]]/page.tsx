import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Studio is a client-side app; build the shell once.
export const dynamic = "force-static";

export const metadata: Metadata = { ...studioMetadata, title: "Rock1 Builders CMS" };
export { viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
