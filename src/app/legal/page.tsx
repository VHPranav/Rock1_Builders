import type { Metadata } from "next";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { legalPage } from "@/content/pages";
import { footer } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal – Rock1 Builders",
  description: legalPage.intro,
};

export default function LegalPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={legalPage.eyebrow} title={legalPage.title} intro={legalPage.intro} />

        <section className="px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-20">
          <GalleryGrid
            images={legalPage.documents}
            captions="below"
            className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          />
          <div data-reveal className="mt-16 flex flex-col gap-6 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-ink/65">
              Certified copies are shared with prospective and existing buyers on request. Our team will send the
              documents and answer any questions before you proceed.
            </p>
            <Button href={`mailto:${footer.email}?subject=${encodeURIComponent("Document request")}`} variant="ghost">
              Request certified copies
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
