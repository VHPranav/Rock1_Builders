"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import RevealWords from "@/components/RevealWords";
import { story } from "@/content/home";

export default function OurStory() {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = frame.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - mid) / (mid + r.height / 2)));
      layer.style.transform = `translate3d(0, ${(progress * -9).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-linen text-ink py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ── Left: portrait parallax image ── */}
        <div
          ref={frameRef}
          className="relative aspect-[3/4] overflow-hidden"
        >
          <div
            ref={layerRef}
            className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"
          >
            <Image
              src="/images/gateway/wellness.webp"
              alt="Ayurvedic wellness at Life Bay Montenegro"
              fill
              quality={85}
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Subtle right-edge vignette so text doesn't crash into the photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-linen/30 hidden lg:block pointer-events-none" />
        </div>

        {/* ── Right: content ── */}
        <div className="flex flex-col justify-center lg:pl-4">
          {/* Eyebrow */}
          <p
            data-reveal
            className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm text-ink/60"
          >
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
            {story.eyebrow}
          </p>

          {/* Heading */}
          <h2
            data-reveal="words"
            className="mt-8 text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.025em]"
          >
            <RevealWords text={story.heading} />
          </h2>

          {/* Divider */}
          <div data-reveal className="mt-10 h-px w-12 bg-ink/25" />

          {/* Body – paragraph 1 */}
          <p data-reveal className="mt-8 max-w-[52ch] text-base leading-relaxed text-ink/70 sm:text-lg sm:leading-relaxed">
            {story.body1}
          </p>

          {/* Body – paragraph 2 */}
          <p data-reveal className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink/70 sm:text-lg sm:leading-relaxed">
            {story.body2}
          </p>

          {/* CTA – outlined style matching the reference */}
          <div data-reveal className="mt-12">
            <Link
              href={story.cta.href}
              className="group inline-flex items-center gap-4 border border-ink/40 px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-linen"
            >
              {story.cta.label}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 8"
                className="w-6 h-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
