"use client";

import { useEffect } from "react";

// Marks every [data-reveal] element [data-revealed] the first time it reaches the viewport, staggering
// elements that arrive together in reading order. A data attribute (not a class) is used so React
// re-renders never strip it.
export default function RevealOnScroll() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach((el) => (el.dataset.revealed = ""));
      return;
    }

    const reveal = (elements: HTMLElement[]) => {
      elements
        .filter((el) => pending.has(el))
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((el, i) => {
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
          el.dataset.revealed = "";
          pending.delete(el);
          observer.unobserve(el);
        });
      if (!pending.size) window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => reveal(entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement)),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    // A fast jump (scrollbar drag, End key, trackpad fling) can carry an element from below the viewport
    // to above it within one frame, which the observer never reports. Sweep for anything already on or
    // above the reveal line so nothing is left hidden.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const line = window.innerHeight * 0.92;
      reveal([...pending].filter((el) => el.getBoundingClientRect().top < line));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sweep);
    };

    pending.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
