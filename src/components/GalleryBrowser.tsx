"use client";

import { useRef, useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryGroup } from "@/content/pages";

// Gallery page: project tabs over the masonry grid. "All" shows every group in order.
export default function GalleryBrowser({ groups }: { groups: GalleryGroup[] }) {
  const [active, setActive] = useState("all");
  const topRef = useRef<HTMLDivElement>(null);
  // Switching tabs returns to the top of the gallery (the new set is usually a different height).
  const choose = (id: string) => {
    setActive(id);
    // After the new set renders: the old scroll position may now be past the end of the page.
    requestAnimationFrame(() => {
      const top = (topRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "instant" });
    });
  };
  const total = groups.reduce((n, group) => n + group.images.length, 0);
  const shown = active === "all" ? groups : groups.filter((group) => group.id === active);
  const tabs = [{ id: "all", label: "All", count: total }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.images.length }))];

  return (
    <>
      <div ref={topRef} aria-hidden="true" />
      <div className="sticky top-0 z-20 border-y border-ink/10 bg-linen/90 backdrop-blur-sm">
        <div
          role="tablist"
          aria-label="Projects"
          className="flex gap-1 overflow-x-auto px-[clamp(1.25rem,6vw,6rem)] py-3 [scrollbar-width:none]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => choose(tab.id)}
              className={`shrink-0 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors sm:text-xs ${
                active === tab.id ? "bg-ink-deep text-white" : "text-ink/65 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {tab.label} <span className={active === tab.id ? "text-white/55" : "text-ink/40"}>{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pb-32">
        {shown.map((group) => (
          <section key={group.id} aria-labelledby={`gallery-${group.id}`} className="pt-14">
            <div className="flex items-baseline justify-between gap-6 px-[clamp(1.25rem,6vw,6rem)]">
              <h2 id={`gallery-${group.id}`} className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-light tracking-[-0.02em]">
                {group.label}
              </h2>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/50 sm:text-xs">
                {group.place} · {group.images.length}
              </p>
            </div>
            {/* Keyed so the viewer resets when switching tabs */}
            <GalleryGrid
              key={`${active}-${group.id}`}
              images={group.images}
              className="mt-6 columns-1 gap-2 px-[clamp(1.25rem,6vw,6rem)] sm:columns-2 lg:columns-3"
            />
          </section>
        ))}
      </div>
    </>
  );
}
