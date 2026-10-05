"use client";

import Image from "next/image";
import { useState } from "react";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  // Corner label on the thumbnail.
  label?: string;
};

// Click-to-play YouTube video: shows the thumbnail until clicked, then loads the player from
// youtube-nocookie.com, so nothing from YouTube loads (or sets cookies) until the visitor asks for it.
export default function YouTubeEmbed({ id, title, label = "Watch the film" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div data-reveal="image" className="relative aspect-video overflow-hidden bg-ink-deep">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 text-white" aria-label={`Play video: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sand text-ink-deep transition-transform duration-500 group-hover:scale-110 sm:size-24">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-7 sm:size-8" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-[0.14em] sm:bottom-8 sm:left-8">{label}</span>
        </button>
      )}
    </div>
  );
}
