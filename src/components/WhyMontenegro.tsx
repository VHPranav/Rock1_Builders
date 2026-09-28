import Image from "next/image";
import ParallaxLayer from "@/components/ParallaxLayer";
import { whyMontenegro } from "@/content/home";
import RevealWords from "@/components/RevealWords";

export default function WhyMontenegro() {
  return (
    <section className="bg-linen px-[clamp(1.25rem,6vw,6rem)] py-24 text-ink sm:py-32">
      <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-6">
        {/* Sticky column: label pinned top, statement pinned bottom, while the cards scroll past */}
        <div className="md:col-span-5 md:self-start md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-between md:py-16">
          <p data-reveal className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
            {whyMontenegro.eyebrow}
          </p>

          <div className="mt-10 md:mt-0 md:pr-[4vw]">
            <h2 data-reveal="words" className="text-balance text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.12] tracking-[-0.02em]">
              <RevealWords text={whyMontenegro.title} />
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">{whyMontenegro.intro}</p>
          </div>
        </div>

        {/* Cards */}
        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:col-span-7 md:py-16">
          {whyMontenegro.reasons.map((reason) => (
            <li key={reason.title} className="group">
              <figure data-reveal="image" className="relative aspect-[4/5] overflow-hidden">
                <ParallaxLayer>
                  {reason.image ? (
                    <Image
                      src={reason.image}
                      alt=""
                      fill
                      quality={85}
                      sizes="(min-width: 768px) 30vw, (min-width: 640px) 52vw, 103vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ background: `linear-gradient(165deg, color-mix(in srgb, ${reason.tone} 45%, #e9e4dc), ${reason.tone})` }}
                    />
                  )}
                </ParallaxLayer>
              </figure>
              <h3 data-reveal className="mt-5 text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">{reason.title}</h3>
              <p data-reveal className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ink/65 sm:text-base">{reason.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
