"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

// A heading counts as current once it has scrolled above this line (px from the top of the viewport).
const ACTIVE_LINE = 160;

// Blog post contents: highlights the section being read and jumps to a section on click.
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | undefined>(headings[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | undefined = headings[0]?.id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
      }
      // At the very bottom the last sections can never reach the line, so mark the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = headings.at(-1)?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <details open className="group/toc border border-ink/15 bg-white/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink">Table of contents</span>
        <span aria-hidden="true" className="text-ink/50 transition-transform group-open/toc:rotate-180">
          ↓
        </span>
      </summary>
      <ol className="space-y-0.5 border-t border-ink/15 py-4">
        {headings.map(({ id, text }) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => jump(event, id)}
                aria-current={current ? "location" : undefined}
                className={`flex gap-3 border-l-2 py-1.5 pl-[calc(1.5rem-2px)] pr-6 text-[0.95rem] leading-snug transition-colors ${
                  current ? "border-ink-deep bg-ink/5 text-ink" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                <span aria-hidden="true" className={current ? "text-ink" : "text-ink/30"}>
                  →
                </span>
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
