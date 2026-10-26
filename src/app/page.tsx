import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import Gateway from "@/components/Gateway";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import WhyMontenegro from "@/components/WhyMontenegro";
import { getHome, getProjectsSection, getSeo, seoMetadata } from "@/sanity/content";
import { JsonLd } from "@/lib/schema";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/");

export default async function Home() {
  const [pageSeo, home, projects] = await Promise.all([getSeo("/"), getHome(), getProjectsSection()]);
  return (
    <>
      <JsonLd
        path="/"
        name={pageSeo.title ?? ""}
        description={pageSeo.description ?? ""}
      />
      <main>
        <Header />
        <Hero hero={home.hero} />
        <OurStory story={home.story} />
        <Services />
        <Gateway gateway={home.gateway} />
        <WhyMontenegro />
        <Projects projects={projects} />
        <ContactCta brochure />
        <Faqs faqs={home.faqs} />
      </main>
      <Footer />
    </>
  );
}
