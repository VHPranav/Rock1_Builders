import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
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
        <GalleryGrid images={galleryPage.images} />
      </main>
      <Footer />
    </>
  );
}
