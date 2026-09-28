"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { hero } from "@/content/home";
import RevealWords from "@/components/RevealWords";

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden bg-stone-900 text-white">
      {/* Background video, scaled to cover the viewport like object-fit: cover */}
      <div className="pointer-events-none absolute inset-0">
        <iframe
          src={hero.videoSrc}
          title="Background video"
          allow="autoplay; fullscreen"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setVideoReady(true)}
          className={`absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78svh] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>

      {/* Tint for legibility: light overall wash, heavier at top (nav) and bottom (copy) */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-14 text-center sm:pb-20">
        <p data-reveal className="text-[0.7rem] uppercase tracking-[0.12em] text-white/85 sm:text-xs">
          {hero.eyebrow.join(" - ")}
        </p>
        <h1 data-reveal="words" className="mt-3 max-w-5xl text-4xl font-medium uppercase leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-7xl">
          <RevealWords text={hero.title} />
        </h1>
        <p data-reveal className="mt-4 max-w-md text-sm font-light text-white/80 sm:text-base">{hero.subtitle}</p>
        <div data-reveal className="mt-7">
          <Button href={hero.cta.href} variant="light">
            {hero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
