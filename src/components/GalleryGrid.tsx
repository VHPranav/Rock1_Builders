"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; caption: string; ratio?: keyof typeof ratios };

// "page" fits brochure spreads, "document" fits A4 scans (shown whole on white).
const ratios = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  page: "aspect-[1931/1574]",
  document: "aspect-[1500/1941] bg-white",
} as const;

type GalleryGridProps = {
  images: GalleryImage[];
  className?: string;
  // "below" keeps captions visible under each image (documents, brochure pages).
  captions?: "hover" | "below";
};

// Masonry gallery; each image opens a full-screen viewer (arrows / Esc / click outside to close).
export default function GalleryGrid({
  images,
  className = "columns-1 gap-2 px-[clamp(1.25rem,6vw,6rem)] pb-32 pt-16 sm:columns-2 lg:columns-3",
  captions = "hover",
}: GalleryGridProps) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const show = useCallback((i: number) => setOpen((i + images.length) % images.length), [images.length]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") show(open + 1);
      if (event.key === "ArrowLeft") show(open - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, show]);

  const current = open !== null ? images[open] : null;

  return (
    <>
      <ul className={className}>
        {images.map((image, i) => (
          <li key={image.src} className="mb-2 break-inside-avoid">
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => show(i)}
              className="group block w-full text-left"
              aria-label={`View ${image.caption}`}
            >
              <figure>
                <div data-reveal="image" className={`relative overflow-hidden bg-ink/10 ${ratios[image.ratio ?? "landscape"]}`}>
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 52vw, 100vw"
                    className={`${image.ratio === "document" ? "object-contain" : "object-cover"} transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`}
                  />
                  {captions === "hover" && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {image.caption}
                    </figcaption>
                  )}
                </div>
                {captions === "below" && (
                  <figcaption data-reveal className="mt-3 text-sm leading-snug text-ink/70">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => {
          const last = open;
          close();
          if (last !== null) triggerRefs.current[last]?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        aria-label="Image viewer"
        className="m-0 h-full max-h-none w-full max-w-none bg-ink-deep/95 p-0 text-white backdrop:bg-black/60"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] sm:px-8">
              <span>
                {current.caption} <span className="text-white/45">· {open! + 1} / {images.length}</span>
              </span>
              <button type="button" onClick={() => dialogRef.current?.close()} className="underline-offset-4 hover:underline">
                Close
              </button>
            </div>
            <div
              className="relative mx-5 flex-1 sm:mx-20"
              onClick={(event) => {
                if (event.target === event.currentTarget) dialogRef.current?.close();
              }}
            >
              <Image key={current.src} src={current.src} alt={current.caption} fill quality={85} sizes="100vw" className="object-contain" />
            </div>
            <div className="flex justify-between px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] sm:px-8">
              <button type="button" onClick={() => show(open! - 1)} className="underline-offset-4 hover:underline">
                Previous
              </button>
              <button type="button" onClick={() => show(open! + 1)} className="underline-offset-4 hover:underline">
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
