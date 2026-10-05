import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GalleryBrowser from "@/components/GalleryBrowser";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { galleryPage } from "@/content/pages";

export const metadata: Metadata = {
  title: "Gallery – Rock1 Builders",
  description: galleryPage.intro,
};

export default function GalleryPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={galleryPage.eyebrow} title={galleryPage.title} intro={galleryPage.intro} />
        <div className="mt-16">
          <GalleryBrowser groups={galleryPage.groups} />
        </div>
      </main>
      <Footer />
    </>
  );
}
