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
import { JsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd
        path="/"
        name="Rock1 Builders – Gateway to Mediterranean Living in Montenegro"
        description="Luxury residences and Europe's first Ayurvedic wellness resort at Life Bay Montenegro, from Rock1 Builders."
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
