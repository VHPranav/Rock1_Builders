import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import EuropeanAdvantage from "@/components/EuropeanAdvantage";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import WhyMontenegro from "@/components/WhyMontenegro";
import { montenegroPage } from "@/content/pages";

export const metadata: Metadata = {
  title: "About Montenegro – Rock1 Builders",
  description: montenegroPage.intro,
};

export default function MontenegroPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={montenegroPage.eyebrow} title={montenegroPage.title} intro={montenegroPage.intro} image={montenegroPage.image} />

        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <Eyebrow className="md:col-span-4">The Black Mountain</Eyebrow>
            <div className="space-y-8 md:col-span-8">
              {montenegroPage.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} data-reveal className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-snug tracking-[-0.01em]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <WhyMontenegro />
        <EuropeanAdvantage />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
