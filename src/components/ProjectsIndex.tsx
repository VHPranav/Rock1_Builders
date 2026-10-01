"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import RevealWords from "@/components/RevealWords";
import { projects } from "@/content/home";

type Item = (typeof projects.items)[number];

const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";
const FLY_MS = 1450;
const STAGGER_MS = 65;
const GAP = 6;
const TARGET_STRIP_COUNT = 10;

// Rows alternate two wide tiles, then up to four narrow ones.
function toRows(items: Item[]) {
  const rows: Item[][] = [];
  for (let i = 0, r = 0; i < items.length; r++) {
    const size = r % 2 === 0 ? 2 : 4;
    rows.push(items.slice(i, i + size));
    i += size;
  }
  return rows;
}

// Per-row layout. The project images are 16:9, so in a 4:5 tile they render ~2.2x the tile's width
// (cover-cropped by height); `sizes` reflects that drawn width so the right resolution is fetched.
function rowLayout(count: number) {
  if (count <= 2)
    return { cols: "sm:grid-cols-2", aspect: "aspect-[16/10]", sizes: "(min-width: 640px) 52vw, 112vw" };
  return {
    cols: "sm:grid-cols-2 lg:grid-cols-4",
    aspect: "aspect-[16/10] sm:aspect-[4/5]",
    sizes: "(min-width: 1024px) 54vw, (min-width: 640px) 104vw, 112vw",
  };
}

// Strip slot size: 10 images taking 100% of viewport width (100vw) with rich, prominent dimensions.
function slotSize(count: number) {
  const vw = typeof window !== "undefined" ? document.documentElement.clientWidth || window.innerWidth : 1440;
  const totalGap = GAP * Math.max(0, count - 1);
  const width = Math.max(60, (vw - totalGap) / count);
  // Elegant portrait proportion; capped at 30% viewport height to leave ample room for hero text
  const maxH = typeof window !== "undefined" ? Math.round(window.innerHeight * 0.3) : 260;
  const height = Math.min(maxH, Math.round((width * 4) / 3));
  return { width, height };
}

export default function ProjectsIndex() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro: the hero shows a strip of 10 portrait thumbnails along the bottom of the screen: the six
  // projects, spread evenly among 4 decorative Montenegro images, spanning 100%vw. Scrolling down flies
  // each project into its grid cell (a FLIP animation) while decorative images fade away; scrolling back
  // up to the top reverses it. Laid out before paint so the strip shows first. Skipped on phones and for reduced motion.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 640) {
      container.dataset.intro = "grid";
      return;
    }

    const tiles = [...container.querySelectorAll<HTMLElement>("figure[data-tile]")];
    const extras = [...container.querySelectorAll<HTMLElement>("figure[data-extra]")];
    let state: "strip" | "grid" = "grid";
    let settleTimer = 0;

    // Interleave: across the 10 slots, place the k projects as evenly as possible with extras.
    const sequence = () => {
      const k = tiles.length;
      const targetTotal = TARGET_STRIP_COUNT;
      const neededExtras = Math.max(0, targetTotal - k);
      const activeExtras = extras.slice(0, neededExtras);
      extras.slice(neededExtras).forEach((extra) => {
        extra.style.display = "none";
      });

      const total = k + activeExtras.length;
      const order: { el: HTMLElement; project: boolean }[] = [];
      let p = 0;
      let e = 0;
      for (let t = 0; t < total; t++) {
        const project = Math.floor(((t + 1) * k) / total) > Math.floor((t * k) / total);
        if (project && p < tiles.length) {
          order.push({ el: tiles[p++], project: true });
        } else if (e < activeExtras.length) {
          order.push({ el: activeExtras[e++], project: false });
        } else if (p < tiles.length) {
          order.push({ el: tiles[p++], project: true });
        }
      }
      return order;
    };

    const toStrip = (animate: boolean) => {
      const order = sequence();
      const slot = slotSize(order.length);
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const totalWidth = order.length * slot.width + (order.length - 1) * GAP;
      const startLeft = Math.max(0, (vw - totalWidth) / 2);
      const slotTop = window.innerHeight - slot.height;
      const home = container.getBoundingClientRect();
      window.clearTimeout(settleTimer);
      state = "strip";
      container.dataset.intro = "strip";

      order.forEach(({ el, project }, t) => {
        const slotLeft = startLeft + t * (slot.width + GAP);
        // On the way back the last slot fills first, mirroring the flight down.
        const delay = animate ? (order.length - 1 - t) * (STAGGER_MS / 2) : 0;

        if (!project) {
          // Decorative image: placed directly in the slot, faded in.
          el.style.left = `${slotLeft - home.left}px`;
          el.style.top = `${slotTop - home.top}px`;
          el.style.width = `${slot.width}px`;
          el.style.height = `${slot.height}px`;
          el.style.transition = animate
            ? `opacity 700ms ${EASE} ${delay + 500}ms, transform 900ms ${EASE} ${delay + 500}ms`
            : "none";
          el.style.opacity = "1";
          el.style.transform = "none";
          return;
        }

        // Project tile: measured from its untransformed box (link wrapper position + figure offset
        // size), scaled evenly to cover the slot and centre-cropped with clip-path. No squashing.
        const box = (el.parentElement as HTMLElement).getBoundingClientRect();
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const scale = Math.max(slot.width / width, slot.height / height);
        const cropX = (width - slot.width / scale) / 2;
        const cropY = (height - slot.height / scale) / 2;
        el.style.transformOrigin = "0 0";
        el.style.transition = animate
          ? `transform ${FLY_MS}ms ${EASE} ${delay}ms, clip-path ${FLY_MS}ms ${EASE} ${delay}ms`
          : "none";
        el.style.transform = `translate(${slotLeft - box.left - cropX * scale}px, ${slotTop - box.top - cropY * scale}px) scale(${scale})`;
        el.style.clipPath = `inset(${cropY}px ${cropX}px ${cropY}px ${cropX}px)`;
      });
    };

    const toGrid = () => {
      if (state === "grid") return;
      state = "grid";
      container.dataset.intro = "grid";
      tiles.forEach((tile, i) => {
        const delay = i * STAGGER_MS;
        tile.style.transition = `transform ${FLY_MS}ms ${EASE} ${delay}ms, clip-path ${FLY_MS}ms ${EASE} ${delay}ms`;
        tile.style.transform = "none";
        tile.style.clipPath = "inset(0px 0px 0px 0px)";
      });
      extras.forEach((extra, i) => {
        const delay = i * (STAGGER_MS / 2);
        extra.style.transition = `opacity 650ms ${EASE} ${delay}ms, transform 850ms ${EASE} ${delay}ms`;
        extra.style.opacity = "0";
        extra.style.transform = "translateY(2rem) scale(0.96)";
      });
      // Once landed, drop the inline styles so hover and layout behave normally.
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (state !== "grid") return;
        tiles.forEach((tile) => {
          tile.style.transition = "";
          tile.style.transform = "";
          tile.style.clipPath = "";
          tile.style.transformOrigin = "";
        });
      }, FLY_MS + tiles.length * STAGGER_MS + 50);
    };

    // Direction-aware triggers: down (wheel, scroll, swipe, keys) goes to the grid; up while at the
    // very top goes back to the strip. Focusing a project by keyboard also lands the grid.
    const atTop = () => window.scrollY <= 2;
    let lastY = window.scrollY;
    let touchY = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) toGrid();
      else if (event.deltaY < 0 && atTop() && state === "grid") toStrip(true);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 2) toGrid();
      else if (y < lastY && y <= 2 && state === "grid") toStrip(true);
      lastY = y;
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      const dragged = touchY - event.touches[0].clientY;
      if (dragged > 6) toGrid();
      else if (dragged < -6 && atTop() && state === "grid") toStrip(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) toGrid();
      else if (["ArrowUp", "PageUp", "Home"].includes(event.key) && atTop() && state === "grid") toStrip(true);
    };
    const onFocusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement).closest("li")) toGrid();
    };
    const onResize = () => {
      if (state === "strip") toStrip(false);
    };

    if (window.scrollY <= 40) toStrip(false);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    container.addEventListener("focusin", onFocusIn);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      container.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  let tileIndex = 0;

  return (
    <div ref={containerRef} data-intro="pending" className="projects-index relative px-[clamp(1.25rem,6vw,6rem)]">
      {/* Decorative strip images (desktop/tablet only; positioned by the intro script) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {projects.stripExtras.map((src) => (
          <figure key={src} data-extra className="absolute overflow-hidden bg-ink/10 opacity-0">
            <Image src={src} alt="" fill quality={85} sizes="(min-width: 1024px) 15vw, 25vw" className="object-cover" />
          </figure>
        ))}
      </div>

      {/* Hero: centred in the space between the header and the strip */}
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pb-8 pt-24 text-center sm:min-h-[calc(100svh-18rem)] sm:pb-6 sm:pt-28">
        <p data-reveal className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
          {projects.eyebrow}
        </p>
        <h1 data-reveal="words" className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
          <RevealWords text={projects.pageHeading} />
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
          {projects.intro}
        </p>
      </div>

      {/* Grid: starts below the strip with balanced spacing for image formation */}
      <div className="space-y-12 pb-32 pt-6 sm:mt-[24rem] lg:mt-[26rem] sm:space-y-16">
        {toRows(projects.items).map((row, r) => {
          const layout = rowLayout(row.length);
          return (
            <ul key={r} className={`grid gap-x-2 gap-y-12 ${layout.cols}`}>
              {row.map((item) => {
                const i = tileIndex++;
                return (
                  <li key={item.name}>
                    <Link href={item.href} className="group block">
                      <figure data-tile className={`relative overflow-hidden bg-ink/10 ${layout.aspect}`}>
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={`${item.name}, ${item.location}`}
                            fill
                            quality={85}
                            sizes={layout.sizes}
                            priority={i < 6}
                            className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0" style={{ background: item.tone }} />
                        )}
                      </figure>
                      <div className="project-caption mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <h2 className="text-base font-medium tracking-[-0.01em] sm:text-lg">
                          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                            {item.name}
                          </span>
                        </h2>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/55 sm:text-right sm:text-[0.7rem]">
                          {item.category} · {item.location}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
