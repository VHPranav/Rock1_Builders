import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GalleryBrowser from "@/components/GalleryBrowser";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { JsonLd } from "@/lib/schema";
import { getGallery, getListingHeadings, getSeo, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/gallery");

export default async function GalleryPage() {
  const [pageSeo, groups, { gallery: galleryPage }] = await Promise.all([getSeo("/gallery"), getGallery(), getListingHeadings()]);
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
