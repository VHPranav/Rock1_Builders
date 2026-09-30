"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { gateway } from "@/content/home";
import RevealWords from "@/components/RevealWords";

// Scattered collection layout on a 12-column grid (desktop). Each tile has its own column,
// offset, parallax speed and download size; text blocks fill the gaps between them.
// `sizes` is the drawn width: the parallax layer is 124% tall, so photos render ~16% wider than the frame. Mobile: staggered 2 columns.
const tileLayout = [
  { place: "md:col-start-3 md:col-span-4 md:row-start-1", aspect: "aspect-[4/5]", speed: 0, sizes: "(min-width: 768px) 34vw, 52vw" },
  { place: "md:col-start-10 md:col-span-3 md:row-start-2 md:mt-[4vw]", aspect: "aspect-[4/5]", speed: -0.06, sizes: "(min-width: 768px) 26vw, 52vw" },
  { place: "md:col-start-5 md:col-span-3 md:row-start-2 md:mt-[12vw]", aspect: "aspect-[5/6]", speed: 0.05, sizes: "(min-width: 768px) 26vw, 52vw" },
  { place: "md:col-start-1 md:col-span-3 md:row-start-2 md:mt-[6vw]", aspect: "aspect-[4/5]", speed: -0.04, sizes: "(min-width: 768px) 26vw, 52vw" },
  { place: "md:col-start-3 md:col-span-3 md:row-start-3 md:mt-[2vw]", aspect: "aspect-square", speed: 0.07, sizes: "(min-width: 768px) 26vw, 52vw" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
      <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
      {children}
    </p>
  );
}

function Stat({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  return (
    <div data-reveal>
      <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none tracking-[-0.03em]">
        {value}
        <span className="text-ink/40">{suffix}</span>
      </p>
      <p className="mt-3 max-w-[16ch] font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-ink/60 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function Gateway() {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const fromCentre = r.top + r.height / 2 - mid;
        // Tile drift: offset from viewport centre, so each tile sits at its layout position when centred.
        el.style.transform = `translate3d(0, ${(fromCentre * tileLayout[i].speed).toFixed(1)}px, 0)`;

        // Photo parallax inside the frame: -1 (tile entering from below) to 1 (leaving at the top).
        // The layer is 12% taller at each end (124% of the frame); ±9% of the layer is ±11% of the frame, so no edge shows.
        const inner = innerRefs.current[i];
        if (inner) {
          const progress = Math.max(-1, Math.min(1, fromCentre / (mid + r.height / 2)));
          inner.style.transform = `translate3d(0, ${(progress * -9).toFixed(2)}%, 0)`;
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const [stat1, stat2] = gateway.stats;

  return (
    <section className="bg-linen px-[clamp(1.25rem,6vw,6rem)] py-24 text-ink sm:py-32">
      <Eyebrow>{gateway.eyebrow}</Eyebrow>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-8 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {/* Intro beside the lead tile */}
        <div data-reveal className="col-span-2 max-w-md md:col-start-9 md:col-span-4 md:row-start-1 md:mt-[4vw] md:self-start">
          <p className="text-lg leading-relaxed sm:text-xl lg:text-2xl lg:leading-snug">
            <strong className="font-semibold">{gateway.intro.lead}</strong>
            {gateway.intro.rest}
          </p>
        </div>

        {/* First stat tucked under the eyebrow, bottom-left of the lead tile */}
        <div className="max-md:order-last md:col-start-1 md:col-span-2 md:row-start-1 md:self-end">
          <Stat {...stat1} />
        </div>

        {gateway.tiles.map((tile, i) => (
          <div
            key={tile.label}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`${tileLayout[i].place} ${i % 2 ? "max-md:mt-16" : ""} will-change-transform`}
          >
            <figure data-reveal="image" className={`group relative ${tileLayout[i].aspect} overflow-hidden`}>
              {/* Parallax layer: taller than the frame so the photo can slide inside it */}
              <div
                ref={(el) => {
                  innerRefs.current[i] = el;
                }}
                className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"
              >
                {tile.image ? (
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    quality={85}
                    sizes={tileLayout[i].sizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ background: `linear-gradient(165deg, color-mix(in srgb, ${tile.tone} 45%, #e9e4dc), ${tile.tone})` }}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/40" />
              <figcaption className="absolute inset-0 grid place-items-center px-3 text-center text-[clamp(1.25rem,2.2vw,2.75rem)] font-medium tracking-[-0.02em] text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
                {tile.label}
              </figcaption>
            </figure>
            <p data-reveal className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink/70 sm:text-base">{tile.caption}</p>
          </div>
        ))}

        {/* Longer description in the gap between the scattered tiles */}
        <div data-reveal className="col-span-2 max-w-lg md:col-start-6 md:col-span-4 md:row-start-3 md:mt-[10vw] md:pl-[2vw]">
          <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{gateway.body}</p>
          <Link
            href={gateway.readMore.href}
            className="mt-5 inline-block border-b border-ink/60 pb-1 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:border-transparent"
          >
            {gateway.readMore.label}
          </Link>
        </div>

        <div className="max-md:order-last md:col-start-10 md:col-span-3 md:row-start-3 md:mt-[20vw] md:justify-self-end">
          <Stat {...stat2} />
        </div>

        <div className="col-span-2 flex flex-col items-center pt-16 text-center md:col-span-12 md:row-start-4 md:pt-[10vw]">
          <h2 data-reveal="words" className="text-balance text-3xl leading-[1.12] tracking-[-0.02em] sm:text-5xl lg:text-[4rem]">
            <RevealWords text={gateway.question} />
          </h2>
          <p data-reveal className="mt-6 max-w-[50ch] text-balance text-base leading-relaxed text-ink/65 sm:text-lg">
            {gateway.questionSub}
          </p>
          <div data-reveal className="mt-10 sm:mt-12">
            <Button href={gateway.cta.href}>{gateway.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
