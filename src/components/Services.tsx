"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { services } from "@/content/home";
import RevealWords from "@/components/RevealWords";

const items = services.items;
// Portion of each transition spent holding still, so every slide rests before the next wipe.
const HOLD = 0.2;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Panel({ src, tone, label }: { src: string | null; tone: string; label: string }) {
  if (src) return <Image src={src} alt="" fill quality={85} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />;
  return (
    <div
      className="flex h-full w-full items-end p-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60"
      style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${tone} 55%, #e9e4dc), ${tone})` }}
    >
      {label}
    </div>
  );
}

// `onServicesPage`: rendered on /our-services itself, where links back to that page would go nowhere,
// so the "Know more" button is dropped and the service bars lead to the contact page instead.
export default function Services({ onServicesPage = false }: { onServicesPage?: boolean }) {
  const target = onServicesPage ? "/contact-us" : services.cta.href;
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = clamp(-track.getBoundingClientRect().top / scrollable) * (items.length - 1);

      // Slide 0 is the base layer; each later slide wipes in over the previous one.
      for (let i = 1; i < items.length; i++) {
        const local = clamp((progress - (i - 1) - HOLD / 2) / (1 - HOLD));
        const hidden = (1 - ease(local)) * 100;
        // Opposite directions: left half rises from the bottom, right half drops from the top.
        leftRefs.current[i]?.style.setProperty("clip-path", `inset(${hidden}% 0 0 0)`);
        rightRefs.current[i]?.style.setProperty("clip-path", `inset(0 0 ${hidden}% 0)`);
        // The card wipes in as one piece, rising from the bottom.
        cardRefs.current[i]?.style.setProperty("clip-path", `inset(${hidden}% 0 0 0)`);
      }
      setActive(Math.round(progress));
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

  return (
    <section className="bg-linen text-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-4 text-center sm:px-8 sm:pb-28">
        {/* <p data-reveal className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
          {services.eyebrow}
        </p> */}
        <h2 data-reveal="words" className="mt-8 text-balance text-3xl leading-[1.12] tracking-[-0.02em] sm:mt-10 sm:text-5xl lg:text-[4rem]">
          <RevealWords text={services.title} />
        </h2>
        <p data-reveal className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/70 sm:text-lg">{services.intro}</p>
        {/* On /our-services itself the button is dropped; the service cards lead to the contact page */}
        {!onServicesPage && (
          <div data-reveal className="mt-10">
            <Button href={services.cta.href}>{services.cta.label}</Button>
          </div>
        )}
      </div>

      {/* Pinned split-screen: one viewport of scroll per service */}
      <div ref={trackRef} className="relative" style={{ height: `${items.length * 100}svh` }}>
        <div className="sticky top-0 grid h-svh grid-rows-2 overflow-hidden md:grid-cols-2 md:grid-rows-1">
          {(["left", "right"] as const).map((side) => (
            <div key={side} className="relative overflow-hidden">
              {items.map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    (side === "left" ? leftRefs : rightRefs).current[i] = el;
                  }}
                  className="absolute inset-0 will-change-[clip-path]"
                  style={{
                    zIndex: i,
                    clipPath: i === 0 ? "none" : side === "left" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
                  }}
                >
                  <Panel src={item.images[side]} tone={item.tone} label={`${item.title} — ${side} image`} />
                </div>
              ))}
            </div>
          ))}

          {/* Centre cards: one per service, stacked in a single grid cell and wiped in with the images */}
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-4">
            {/* Sized like the reference: 37.5vw × 7.5vw, clamped for phones and very wide screens */}
            <div className="pointer-events-auto grid w-[clamp(20rem,46vw,52rem)] max-w-full">
              {items.map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  inert={i !== active}
                  className="col-start-1 row-start-1 will-change-[clip-path]"
                  style={{ zIndex: i, clipPath: i === 0 ? "none" : "inset(100% 0 0 0)" }}
                >
                  {/* The whole bar is the link */}
                  <Link
                    href={target}
                    aria-label={`${item.title} — ${onServicesPage ? "enquire" : "find out more"}`}
                    className="group flex flex-col justify-between gap-5 p-[clamp(1.2rem,2vw,2rem)] text-white"
                    style={{ backgroundColor: item.tone }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[clamp(1.1rem,1.6vw,1.75rem)] font-semibold leading-[1.1]">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                          {item.short}
                        </span>
                      </h3>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 10"
                        className="mt-1 size-[clamp(0.6rem,0.8vw,0.9rem)] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      >
                        <path d="M1 9 9 1M3 1h6v6" />
                      </svg>
                    </div>

                    <p className="text-[clamp(0.8rem,1vw,1rem)] leading-relaxed text-white/80">
                      {item.description}
                    </p>

                    <div className="flex items-end justify-between gap-4 font-mono text-[clamp(0.6rem,0.75vw,0.8rem)] uppercase tracking-[0.14em] text-white/60">
                      <p>Montenegro</p>
                      <p className="text-right">{item.tag}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
