import { footer, siteUrl } from "@/content/site";
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

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rock1 Builders",
  url: siteUrl,
  logo: `${siteUrl}/images/logos/rock1-builders.webp`,
  email: footer.email,
  address: { "@type": "PostalAddress", streetAddress: "Mainski Put BB", addressLocality: "Budva", addressCountry: "ME" },
  contactPoint: footer.phones.map((phone) => ({ "@type": "ContactPoint", telephone: phone.tel, contactType: "sales", areaServed: phone.region })),
  sameAs: footer.socials.filter((social) => social.label !== "YouTube").map((social) => social.href),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
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
