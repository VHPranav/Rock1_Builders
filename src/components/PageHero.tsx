import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import ParallaxLayer from "@/components/ParallaxLayer";
import RevealWords from "@/components/RevealWords";

type PageHeroProps = {
  eyebrow: string;
  // SEO heading: when set it is the page's <h1> and the title below becomes a styled line.
  heading?: string;
  title: string;
  intro?: string;
  image?: string;
  // Muted loop shown in place of the image (Flow films made from the page's image).
  video?: { src: string; poster: string };
};

// Opening section for inner pages on linen: label, word-reveal heading, intro beside it, and an
// optional wide image that rises in and drifts inside its frame.
export default function PageHero({ eyebrow, heading, title, intro, image, video }: PageHeroProps) {
  const Title = heading ? "p" : "h1";
  return (
    <section className="px-[clamp(1.25rem,6vw,6rem)] pt-36 sm:pt-44">
      <Eyebrow>{eyebrow}</Eyebrow>
      {heading && (
        <h1 data-reveal className="mt-6 text-base font-medium tracking-[-0.01em] text-ink/80 sm:text-lg">
          {heading}
        </h1>
      )}
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <Title
          data-reveal="words"
          className="text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.03em] md:col-span-8"
        >
          <RevealWords text={title} />
        </Title>
        {intro && (
          <p data-reveal className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg md:col-span-4">
            {intro}
          </p>
        )}
      </div>
      {video ? (
        <figure data-reveal="image" className="relative mt-14 aspect-[4/3] overflow-hidden bg-ink/10 sm:mt-20 sm:aspect-[21/9]">
          <video
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
        </figure>
      ) : image && (
        <figure data-reveal="image" className="relative mt-14 aspect-[4/3] overflow-hidden sm:mt-20 sm:aspect-[21/9]">
          <ParallaxLayer>
            <Image src={image} alt="" fill priority quality={85} sizes="100vw" className="object-cover" />
          </ParallaxLayer>
        </figure>
      )}
    </section>
  );
}
