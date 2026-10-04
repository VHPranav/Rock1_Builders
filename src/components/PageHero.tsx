import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import ParallaxLayer from "@/components/ParallaxLayer";
import RevealWords from "@/components/RevealWords";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
};

// Opening section for inner pages on linen: label, word-reveal heading, intro beside it, and an
// optional wide image that rises in and drifts inside its frame.
export default function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  return (
    <section className="px-[clamp(1.25rem,6vw,6rem)] pt-36 sm:pt-44">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <h1
          data-reveal="words"
          className="text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.03em] md:col-span-8"
        >
          <RevealWords text={title} />
        </h1>
        {intro && (
          <p data-reveal className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg md:col-span-4">
            {intro}
          </p>
        )}
      </div>
      {image && (
        <figure data-reveal="image" className="relative mt-14 aspect-[4/3] overflow-hidden sm:mt-20 sm:aspect-[21/9]">
          <ParallaxLayer>
            <Image src={image} alt="" fill priority quality={85} sizes="100vw" className="object-cover" />
          </ParallaxLayer>
        </figure>
      )}
    </section>
  );
}
