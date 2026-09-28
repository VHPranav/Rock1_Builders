import Button from "@/components/Button";
import { story } from "@/content/home";
import RevealWords from "@/components/RevealWords";

export default function OurStory() {
  return (
    <section className="bg-linen px-4 py-24 text-ink sm:px-8 sm:py-36 lg:py-44">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <p data-reveal className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
          {story.eyebrow}
        </p>

        <h2 data-reveal="words" className="mt-8 max-w-[22ch] text-balance text-3xl leading-[1.12] tracking-[-0.02em] sm:mt-10 sm:text-5xl lg:text-[4rem]">
          <RevealWords text={story.statement} />
        </h2>

        <div data-reveal className="mt-10 sm:mt-12">
          <Button href={story.cta.href}>{story.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
