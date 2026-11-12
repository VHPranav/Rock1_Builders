import type { Metadata } from "next";
import BlogFaqs from "@/components/BlogFaqs";
import ContactCta from "@/components/ContactCta";
import EuropeanAdvantage from "@/components/EuropeanAdvantage";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MontenegroMap from "@/components/MontenegroMap";
import PageHero from "@/components/PageHero";
import WhyMontenegro from "@/components/WhyMontenegro";
import { absolute, JsonLd } from "@/lib/schema";
import { getMontenegroPage, getSeo, seoMetadata } from "@/sanity/content";

export const generateMetadata = (): Promise<Metadata> => seoMetadata("/about-montenegro");

export default async function MontenegroPage() {
  const [pageSeo, montenegroPage] = await Promise.all([getSeo("/about-montenegro"), getMontenegroPage()]);
  const { glance } = montenegroPage;
  return (
    <>
      <JsonLd
        path="/about-montenegro"
        name="About Montenegro"
        description={pageSeo.description ?? ""}
        nodes={
          glance.faqs.length
            ? [
                {
                  "@type": "FAQPage",
                  "@id": `${absolute("/about-montenegro")}#faq`,
                  mainEntity: glance.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
                },
              ]
            : []
        }
      />
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={montenegroPage.eyebrow} title={montenegroPage.title} intro={montenegroPage.intro} image={montenegroPage.image} video={montenegroPage.video} />

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

        <MontenegroMap />
        <WhyMontenegro data={montenegroPage.propertyTypes} />

        {/* Montenegro at a glance: cards, then key facts and FAQs side by side */}
        <EuropeanAdvantage data={glance}>
          <div className="mt-24 grid gap-16 border-t border-ink/15 pt-16 sm:mt-32 md:grid-cols-2 md:gap-12">
            <div>
              <table className="w-full border-t border-ink/15 text-left">
                <thead>
                  <tr className="border-b border-ink/15">
                    <th scope="col" className="py-4 pr-6 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                      Fact
                    </th>
                    <th scope="col" className="py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink/55">
                      Montenegro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {glance.facts.map((fact) => (
                    <tr key={fact.label} data-reveal className="border-b border-ink/15 align-top">
                      <th scope="row" className="w-2/5 py-4 pr-6 text-base font-medium">
                        {fact.label}
                      </th>
                      <td className="py-4 text-base leading-relaxed text-ink/75">{fact.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {glance.faqs.length > 0 && (
              <div className="[&>section]:mt-0">
                <BlogFaqs items={glance.faqs} />
              </div>
            )}
          </div>
        </EuropeanAdvantage>

        <ContactCta brochure intro={montenegroPage.contactIntro} />
      </main>
      <Footer />
    </>
  );
}
