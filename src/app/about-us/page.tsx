import type { Metadata } from "next";
import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import EuropeanAdvantage from "@/components/EuropeanAdvantage";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import RevealWords from "@/components/RevealWords";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { about } from "@/content/pages";

export const metadata: Metadata = {
  title: "About Us – Rock1 Builders",
  description: about.intro,
};

// Initials tile, kept for any team member without a portrait.
function Monogram({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .replace(/^K\.\s*/, "K ")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3);
  return (
    <div aria-hidden="true" className={`grid place-items-center bg-ink/[0.06] font-light tracking-[-0.03em] text-ink/70 ${className}`}>
      {initials}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <main className="bg-linen text-ink">
        <Header overLight />
        <PageHero eyebrow={about.eyebrow} title={about.title} intro={about.intro} image={about.image} video={about.video} />

        {/* Story */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <Eyebrow className="md:col-span-4">Rock1 Builders</Eyebrow>
            <div className="space-y-8 md:col-span-8">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} data-reveal className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-snug tracking-[-0.01em]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Project film (YouTube, loads on click) */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] pb-24 sm:pb-32">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Eyebrow>{about.film.eyebrow}</Eyebrow>
            <h2 data-reveal="words" className="text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.08] tracking-[-0.02em]">
              <RevealWords text={about.film.title} />
            </h2>
          </div>
          <YouTubeEmbed id={about.film.youtubeId} title={about.film.videoTitle} />
        </section>

        <EuropeanAdvantage />

        {/* Trust */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <Eyebrow>{about.trust.eyebrow}</Eyebrow>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
            <h2 data-reveal="words" className="text-balance text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em] md:col-span-7">
              <RevealWords text={about.trust.title} />
            </h2>
            <p data-reveal className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg md:col-span-4 md:col-start-9">
              {about.trust.intro}
            </p>
          </div>
          <ul className="mt-16 grid border-t border-ink/15 md:grid-cols-3">
            {about.trust.pillars.map((pillar) => (
              <li key={pillar.title} data-reveal className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <h3 className="text-xl font-medium tracking-[-0.01em] sm:text-2xl">{pillar.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-ink/70">{pillar.text}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-12 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {about.trust.facts.map((fact) => (
              <li key={fact} data-reveal className="flex gap-4 text-base leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-current" />
                {fact}
              </li>
            ))}
          </ul>
        </section>

        {/* Leadership */}
        <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
          <Eyebrow>{about.ceo.eyebrow}</Eyebrow>
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
            <div data-reveal className="md:col-span-4">
              {/* Team portraits share one style (Flow-edited from the client's photos; see content/image-prompts.md) */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink/[0.06]">
                <Image
                  src={about.ceo.photo}
                  alt={about.ceo.name}
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p data-reveal className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60 sm:text-sm">{about.ceo.role}</p>
              <h2 data-reveal="words" className="mt-4 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em]">
                <RevealWords text={about.ceo.name} />
              </h2>
              <div className="mt-8 space-y-5">
                {about.ceo.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} data-reveal className="text-base leading-relaxed text-ink/75 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 sm:mt-32">
            <Eyebrow>{about.team.eyebrow}</Eyebrow>
            <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-3">
              {about.team.members.map((member) => (
                <li key={member.name}>
                  <div data-reveal>
                    {member.photo ? (
                      <div className="relative aspect-[4/5] overflow-hidden bg-ink/[0.06]">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          quality={85}
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <Monogram name={member.name} className="aspect-[4/5] text-[clamp(2.5rem,5vw,4rem)]" />
                    )}
                  </div>
                  <p data-reveal className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">{member.role}</p>
                  <h3 data-reveal className="mt-2 text-xl font-medium tracking-[-0.01em] sm:text-2xl">{member.name}</h3>
                  <p data-reveal className="mt-3 text-base leading-relaxed text-ink/70">{member.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactCta brochure />
      </main>
      <Footer />
    </>
  );
}
