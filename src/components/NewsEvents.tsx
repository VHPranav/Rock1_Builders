"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { InstagramEmbed, useInstagramEmbeds } from "@/components/InstagramEmbeds";
import type { NewsEvent } from "@/sanity/content";

const mono = "font-mono text-xs uppercase tracking-[0.14em]";

const day = (iso: string, withYear: boolean) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear && { year: "numeric" }),
    timeZone: "UTC",
  });

// "31 Oct – 1 Nov 2026", or "12 Nov 2026" for a one-day event.
const dateRange = (startDate: string, endDate?: string) =>
  endDate && endDate !== startDate ? `${day(startDate, false)} – ${day(endDate, true)}` : day(startDate, true);

// Today as YYYY-MM-DD, comparable with Sanity's date strings.
const isoToday = () => new Date().toISOString().slice(0, 10);
const noChange = () => () => {};

// Events grid with an Upcoming / Past toggle. `today` comes from the server so the first render matches,
// then the browser's own date takes over (the page can be cached for a while). Events without a date
// show under both tabs; the toggle only appears once some events have dates.
export default function NewsEvents({ events, today: serverToday }: { events: NewsEvent[]; today: string }) {
  const today = useSyncExternalStore(noChange, isoToday, () => serverToday);
  const ends = (event: NewsEvent) => event.endDate ?? event.startDate;

  const upcoming = events.filter((event) => !ends(event) || ends(event)! >= today);
  const past = events.filter((event) => !ends(event) || ends(event)! < today);
  const dated = events.some((event) => event.startDate);
  const [choice, setChoice] = useState<"upcoming" | "past" | null>(null);
  const tab = choice ?? (upcoming.length || !past.length ? "upcoming" : "past");
  const shown = dated ? (tab === "upcoming" ? upcoming : past) : events;
  useInstagramEmbeds([tab]);

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcoming.length },
    { id: "past", label: "Past events", count: past.length },
  ] as const;

  return (
    <>
      {dated && (
        <div role="group" aria-label="Show events" className="flex gap-2">
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              type="button"
              aria-pressed={tab === id}
              disabled={!count}
              onClick={() => setChoice(id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                tab === id ? "border-ink-deep bg-ink-deep text-white" : "border-ink/20 text-ink hover:border-ink/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <ul className="col-span-full mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((event, i) => (
          <li key={event.instagram?.code ?? event.image ?? i} className="group">
            {event.instagram ? (
              // The post's own player, cropped to its 4:5 media: the profile bar above and the caption bar below are hidden.
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-deep">
                <InstagramEmbed post={event.instagram} className="-mt-[54px] [&_.instagram-media]:!border-0" />
              </div>
            ) : (
              event.image && (
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                  <Image
                    src={event.image}
                    alt={event.title ?? ""}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )
            )}
            {event.startDate && <p className={`mt-5 text-ink/60 ${mono}`}>{dateRange(event.startDate, event.endDate)}</p>}
            {event.title && <h3 className={`${event.startDate ? "mt-2" : "mt-5"} text-lg leading-snug tracking-[-0.01em]`}>{event.title}</h3>}
            {event.venue && <p className="mt-1 text-sm leading-relaxed text-ink/60">{event.venue}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
