import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GalleryBrowser from "@/components/GalleryBrowser";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { galleryPage } from "@/content/pages";
import { JsonLd } from "@/lib/schema";
import { getGallery, getSeo, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/gallery");

export default async function GalleryPage() {
  const [pageSeo, groups] = await Promise.all([getSeo("/gallery"), getGallery()]);
  return (
    <>
      <JsonLd path="/gallery" name="Gallery" description={pageSeo.description ?? ""} type="CollectionPage" />
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={galleryPage.eyebrow} title={galleryPage.title} intro={galleryPage.intro} />
        <div className="mt-16">
          <GalleryBrowser groups={groups} />
        </div>
      </main>
      <Footer />
    </>
  );
}
