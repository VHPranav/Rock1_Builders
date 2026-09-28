"use client";

import { useEffect, useRef } from "react";

// Photo parallax inside a frame (the frame needs `relative overflow-hidden`). Same motion as the
// Gateway tiles: the layer is 12% taller at each end (124% of the frame) and slides ±9% of its own
// height (±11% of the frame) as the frame crosses the viewport, so no edge ever shows.
export default function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const frameEl = layer?.parentElement;
    if (!layer || !frameEl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = frameEl.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      // -1 when the frame is entering from below, 1 when it's leaving at the top.
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
    <div ref={ref} className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform">
      {children}
    </div>
  );
}
