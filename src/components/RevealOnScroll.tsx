"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks every [data-reveal] element [data-revealed] the first time it reaches the viewport, staggering
// elements that arrive together in reading order. A data attribute (not a class) is used so React
// re-renders never strip it. Re-scans on every route change, since the layout (and this component)
// persists across client-side navigation, and watches for elements added later (e.g. gallery tabs).
export default function RevealOnScroll() {
  const pathname = usePathname();

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

    // Pick up [data-reveal] elements rendered after this scan (tab switches, expanding panels).
    const mutations = new MutationObserver((records) => {
      let added = false;
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const found = node.matches("[data-reveal]:not([data-revealed])") ? [node] : [];
          found.push(...node.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
          found.forEach((el) => {
            if (pending.has(el)) return;
            pending.add(el);
            observer.observe(el);
            added = true;
          });
        });
      }
      if (added && !raf) raf = requestAnimationFrame(sweep);
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    // Reveal whatever is already on screen right away, rather than waiting for the observer's first
    // callback (which can lag, leaving above-the-fold text hidden until the first scroll).
    raf = requestAnimationFrame(sweep);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
