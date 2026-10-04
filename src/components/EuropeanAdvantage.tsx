import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import ParallaxLayer from "@/components/ParallaxLayer";
import RevealWords from "@/components/RevealWords";
import { europeanAdvantage } from "@/content/pages";

// "The European Advantage": shared by About Us and About Montenegro.
export default function EuropeanAdvantage() {
  return (
    <section className="px-[clamp(1.25rem,6vw,6rem)] py-24 sm:py-32">
      <Eyebrow>{europeanAdvantage.eyebrow}</Eyebrow>
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <h2
          data-reveal="words"
          className="text-balance text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em] md:col-span-7"
        >
          <RevealWords text={europeanAdvantage.title} />
        </h2>
        <p data-reveal className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg md:col-span-4 md:col-start-9">
          {europeanAdvantage.intro}
        </p>
      </div>

      <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3">
        {europeanAdvantage.pillars.map((pillar) => (
          <li key={pillar.title}>
            <figure data-reveal="image" className="relative aspect-[4/5] overflow-hidden">
              <ParallaxLayer>
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 38vw, 116vw"
                  className="object-cover"
                />
              </ParallaxLayer>
            </figure>
            <h3 data-reveal className="mt-6 text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl">
              {pillar.title}
            </h3>
            <p data-reveal className="mt-3 text-base leading-relaxed text-ink/70">
              {pillar.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
