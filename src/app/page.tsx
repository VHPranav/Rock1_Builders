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
import { seo, seoMetadata } from "@/content/seo";
import { JsonLd } from "@/lib/schema";

export const metadata: Metadata = seoMetadata("/");

export default function Home() {
  return (
    <>
      <JsonLd
        path="/"
        name={seo["/"].title}
        description={seo["/"].description}
      />
      <main>
        <Header />
        <Hero />
        <OurStory />
        <Services />
        <Gateway />
        <WhyMontenegro />
        <Projects />
        <ContactCta brochure />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
