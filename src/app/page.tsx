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

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Hero />
        <OurStory />
        <Services />
        <Gateway />
        <WhyMontenegro />
        <Projects />
        <ContactCta />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
