import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { contactPage } from "@/content/pages";
import { footer } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact – Rock1 Builders",
  description: contactPage.intro,
};

export default function ContactPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={contactPage.eyebrow} title={contactPage.title} intro={contactPage.intro} />

        {/* Details + form */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-6">
            <div className="space-y-10 md:col-span-4">
              <div data-reveal>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">Email</p>
                <a href={`mailto:${footer.email}`} className="mt-3 block break-words text-lg underline-offset-4 hover:underline sm:text-xl">
                  {footer.email}
                </a>
              </div>
              <div data-reveal>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">Phone</p>
                <ul className="mt-3 space-y-2">
                  {footer.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a href={`tel:${phone.tel}`} className="text-lg underline-offset-4 hover:underline sm:text-xl">
                        {phone.display}
                      </a>{" "}
                      <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink/50">{phone.region}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">Head office</p>
                <p className="mt-3 max-w-xs text-lg leading-snug sm:text-xl">{footer.address}</p>
              </div>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Eyebrow>{contactPage.formTitle}</Eyebrow>
              <div data-reveal className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] pb-32">
          <Eyebrow>Office locations</Eyebrow>
          <ul className="mt-12 grid border-t border-ink/15 md:grid-cols-3">
            {contactPage.offices.map((office) => (
              <li key={office.city} data-reveal className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <div data-reveal="image" className="relative mb-8 aspect-[4/3] overflow-hidden bg-ink/10">
                  <Image src={office.image} alt={`${office.city} ${office.role.toLowerCase()}`} fill quality={85} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">{office.role}</p>
                <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.02em]">{office.city}</h2>
                <p className="mt-6 max-w-xs text-base leading-relaxed text-ink/75">{office.address}</p>
                <a href={`tel:${office.phone.tel}`} className="mt-4 inline-block text-base underline-offset-4 hover:underline">
                  {office.phone.display}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
