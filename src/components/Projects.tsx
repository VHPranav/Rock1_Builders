"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { projects } from "@/content/home";
import { projectPhoto } from "@/content/projectDetails";

const items = projects.items;
// Expo-out: quick start, long gentle settle. Shared by the crossfade and the strip slide.
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Scroll position inside the pinned track picks the project.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = Math.min(0.9999, Math.max(0, -track.getBoundingClientRect().top / scrollable)) * items.length;
      setActive(Math.floor(progress));
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

  // Slide the strip so the active project sits in the centre.
  const centreStrip = useCallback(() => {
    const strip = stripRef.current;
    const rail = railRef.current;
    const item = itemRefs.current[active];
    if (!strip || !rail || !item) return;
    const offset = strip.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
    rail.style.transform = `translate3d(${offset}px, 0, 0)`;
  }, [active]);

  useEffect(() => {
    centreStrip();
    window.addEventListener("resize", centreStrip);
    return () => window.removeEventListener("resize", centreStrip);
  }, [centreStrip]);

  // Jump to a project by scrolling to the start of its stretch of the track.
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const segment = (track.offsetHeight - window.innerHeight) / items.length;
    window.scrollTo({ top: track.offsetTop + segment * (i + 0.05), behavior: "smooth" });
  };

  const current = items[active];

  return (
    <section aria-label={projects.eyebrow} className="bg-ink-deep text-white">
      <div ref={trackRef} className="relative" style={{ height: `${items.length * 100}svh` }}>
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* Stacked full-bleed backgrounds, crossfaded */}
          {items.map((item, i) => (
            <div
              key={item.name}
              aria-hidden={i !== active}
              className="absolute inset-0"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(1.06)",
                transition: `opacity 900ms ${EASE}, transform 1600ms ${EASE}`,
              }}
            >
              {projectPhoto(item.slug, item.image) ? (
                <Image src={projectPhoto(item.slug, item.image)!} alt="" fill quality={85} sizes="100vw" className="object-cover" />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${item.tone} 70%, #d9d2c6), ${item.tone} 55%, #14171a)` }}
                />
              )}
            </div>
          ))}
          {/* Legibility: 90% black at the bottom, still 65% at mid-screen where the description starts, clear at the top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 via-50% to-transparent" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/60 to-transparent" />

          <div className="relative flex h-full flex-col px-[clamp(1.25rem,6vw,6rem)] pt-8 [text-shadow:0_1px_14px_rgb(0_0_0/0.45)] sm:pt-10">
            {/* Top row */}
            <div className="flex items-start justify-between gap-8">
              <div data-reveal>
                <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
                  <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
                  {projects.eyebrow}
                </p>
              </div>
              <p data-reveal className="hidden max-w-sm text-right text-base leading-relaxed text-white/75 md:block">{projects.intro}</p>
            </div>

            {/* Active project, re-mounted per project so it animates in */}
            <div key={current.name} className="mt-auto grid gap-8 pb-28 md:grid-cols-12 md:items-end md:gap-6 md:pb-32">
              <div className="animate-[rise_900ms_cubic-bezier(0.16,1,0.3,1)] md:col-span-7">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-white/70">
                  {current.status} · {current.category} · {current.location}
                </p>
                <h3 className="mt-3 text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
                  {current.name}
                </h3>
                {current.subtitle && (
                  <p className="mt-2 text-base font-light text-white/80 sm:text-lg">
                    {current.subtitle}
                  </p>
                )}
                <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">{current.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <p className="flex items-baseline gap-3">
                    <span className="text-4xl font-light tracking-[-0.02em] sm:text-5xl">{current.stat.value}</span>
                    <span className="font-mono text-sm uppercase tracking-[0.14em] text-white/70">{current.stat.label}</span>
                  </p>
                  <Button href={current.href} variant="light">
                    Know more
                  </Button>
                </div>
              </div>
              <p className="hidden animate-[rise_1100ms_cubic-bezier(0.16,1,0.3,1)] text-base leading-relaxed text-white/75 md:col-span-4 md:col-start-9 md:block lg:text-lg">
                {current.description}
              </p>
            </div>
          </div>

          {/* Project strip */}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-[clamp(1.25rem,3vw,2rem)] [text-shadow:0_1px_14px_rgb(0_0_0/0.5)]">
            <div ref={stripRef} className="overflow-hidden">
              <div ref={railRef} className="flex" style={{ transition: `transform 900ms ${EASE}` }}>
                {items.map((item, i) => (
                  <button
                    key={item.name}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active}
                    className={`w-[clamp(10rem,18vw,16rem)] shrink-0 px-4 pb-4 text-center transition-colors duration-500 ${i === active ? "text-white" : "text-white/45 hover:text-white/75"
                      }`}
                  >
                    <span className="block truncate text-base font-medium">{item.name}</span>
                    <span className="mt-1 block truncate font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-80">
                      {item.location}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress: faint margin-to-margin baseline, filled to (current project / total) */}
            <div
              aria-hidden="true"
              className="relative mx-[clamp(1.25rem,6vw,6rem)] h-[2px] overflow-hidden bg-white/20"
            >
              <div
                className="absolute inset-0 origin-left bg-white/95"
                style={{ transform: `scaleX(${(active + 1) / items.length})`, transition: `transform 900ms ${EASE}` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
