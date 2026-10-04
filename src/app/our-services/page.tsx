import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import StatsBand from "@/components/StatsBand";
import { servicesPage } from "@/content/pages";

export const metadata: Metadata = {
  title: "Our Services – Rock1 Builders",
  description: servicesPage.intro,
};

export default function ServicesPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={servicesPage.eyebrow} title={servicesPage.title} intro={servicesPage.intro} image={servicesPage.image} />

        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <Eyebrow className="md:col-span-4">What we do</Eyebrow>
            <div className="space-y-8 md:col-span-8">
              {servicesPage.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} data-reveal className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-snug tracking-[-0.01em]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* The homepage's services section: intro plus the pinned split-screen wipe */}
        <Services />

        <StatsBand stats={servicesPage.stats} />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
