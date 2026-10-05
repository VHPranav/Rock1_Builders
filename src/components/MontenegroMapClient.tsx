"use client";

import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import RevealWords from "@/components/RevealWords";
import { type MapPlace, mapOrigin, montenegroMap, type PlaceKind, placeKinds } from "@/content/montenegroMap";

export type Rect = [number, number, number, number]; // x0, y0, x1, y1 in projected units
export type ProjectedPlace = MapPlace & { x: number; y: number };
type ViewBox = [number, number, number, number]; // x, y, width, height

type Props = {
  paths: { neighbours: string; country: string };
  places: ProjectedPlace[];
  labels: { text: string; sea: boolean; x: number; y: number }[];
  views: { id: string; label: string; rect: Rect }[];
  rasters: { id: string; src: string; rect: Rect }[];
  // On a project page: start on that project, measure distances from it and land on `landing`.
  focus?: string;
  landing?: string;
  heading?: { eyebrow: string; title: string; intro: string };
  // The place whose page this map is on: its card skips the link back to the same page.
  currentId?: string;
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";
// Always labelled at country scale; the rest show their names when zoomed in, hovered or selected.
const MAJOR = new Set(["podgorica", "kotor", "budva", "bar", "ulcinj", "zabljak"]);

// Space kept clear of the overlay panels when fitting a view (px).
const SAFE = {
  desktop: { left: 320, right: 440, top: 90, bottom: 40 },
  mobile: { left: 24, right: 24, top: 110, bottom: 24 },
};

function distanceKm([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]) {
  const rad = Math.PI / 180;
  const a =
    Math.sin(((lat2 - lat1) * rad) / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// Icons drawn inside the teardrop pins and the filter list (24×24).
const icons: Record<PlaceKind, ReactNode> = {
  project: <path d="M12 3l7 9-7 9-7-9z" />,
  city: <path d="M4 20V10l5-4v4l5-4v4l6-4v14z" />,
  airport: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />,
  beach: <path d="M12 3a9 9 0 0 1 9 8H3a9 9 0 0 1 9-8zm-1 8h2v10h-2z" />,
  sight: <path d="M2 20l7-12 4 6 3-4 6 10z" />,
};

function Pin({ kind, active, compact }: { kind: PlaceKind; active: boolean; compact: boolean }) {
  const project = kind === "project";
  return (
    <svg
      viewBox="0 0 32 42"
      aria-hidden="true"
      className={`drop-shadow-[0_4px_10px_rgb(0_0_0/0.5)] transition-transform duration-500 ${EASE} ${project ? "w-9" : compact ? "w-5" : "w-7"} origin-bottom ${
        active ? "scale-125" : "group-hover:scale-110"
      }`}
    >
      <path
        d="M16 41C16 41 30 26.5 30 16A14 14 0 0 0 2 16C2 26.5 16 41 16 41Z"
        fill={project ? "#e9dcc3" : "#ffffff"}
        fillOpacity={project || active ? 1 : 0.92}
        stroke={active ? "#0f1216" : "rgba(15,18,22,0.25)"}
        strokeWidth={active ? 1.5 : 1}
      />
      <g transform="translate(7 6) scale(0.75)" fill="#0f1216">
        {icons[kind]}
      </g>
    </svg>
  );
}

// Fit a projected rect inside the area left clear by the panels, at the container's aspect ratio.
function fit(rect: Rect, width: number, height: number, safe: { left: number; right: number; top: number; bottom: number }): ViewBox {
  const [x0, y0, x1, y1] = rect;
  const availW = Math.max(120, width - safe.left - safe.right);
  const availH = Math.max(120, height - safe.top - safe.bottom);
  const scale = Math.min(availW / (x1 - x0), availH / (y1 - y0)); // px per unit
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const sx = safe.left + availW / 2;
  const sy = safe.top + availH / 2;
  return [cx - sx / scale, cy - sy / scale, width / scale, height / scale];
}

export default function MontenegroMapClient({
  paths,
  places,
  labels,
  views,
  rasters,
  focus = mapOrigin,
  landing = "all",
  heading = montenegroMap,
  currentId,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0, desktop: true });
  const [viewId, setViewId] = useState("region");
  const [viewBox, setViewBox] = useState<ViewBox | null>(null);
  const current = useRef<ViewBox | null>(null);
  const frame = useRef(0);
  const [kinds, setKinds] = useState<Set<PlaceKind>>(() => new Set(placeKinds.map((k) => k.kind)));
  const [showLabels, setShowLabels] = useState(true);
  const [activeId, setActiveId] = useState(focus);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [detailLoaded, setDetailLoaded] = useState(false);
  const flown = useRef(false);
  const [flying, setFlying] = useState(false);

  const targetFor = useCallback(
    (id: string) => {
      const rect = views.find((view) => view.id === id)?.rect;
      if (!rect || !size.width) return null;
      return fit(rect, size.width, size.height, size.desktop ? SAFE.desktop : SAFE.mobile);
    },
    [views, size],
  );

  const animateTo = useCallback((target: ViewBox, duration: number) => {
    cancelAnimationFrame(frame.current);
    const from = current.current ?? target;
    let start = -1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = (now: number) => {
      if (start < 0) start = now;
      const t = reduce || !duration ? 1 : Math.min(1, (now - start) / duration);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease-in-out cubic
      const next = from.map((v, i) => v + (target[i] - v) * e) as ViewBox;
      current.current = next;
      setViewBox(next);
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  const zoomTo = useCallback(
    (id: string, duration = 1100) => {
      const target = targetFor(id);
      if (!target) return;
      setViewId(id);
      if (id === "coast" || id === "bay") setDetailLoaded(true);
      animateTo(target, duration);
    },
    [targetFor, animateTo],
  );

  // Track the map's size and refit the current view whenever it changes.
  const viewRef = useRef(viewId);
  useEffect(() => {
    viewRef.current = viewId;
  }, [viewId]);
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        desktop: window.matchMedia("(min-width: 1024px)").matches,
      };
      setSize(next);
      const rect = views.find((view) => view.id === viewRef.current)?.rect;
      if (!rect) return;
      cancelAnimationFrame(frame.current);
      const target = fit(rect, next.width, next.height, next.desktop ? SAFE.desktop : SAFE.mobile);
      current.current = target;
      setViewBox(target);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [views]);

  // Fly in from the wider region the first time the map is in view, then load the sharper coast layer.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !size.width) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || flown.current) return;
        flown.current = true;
        setFlying(true);
        zoomTo(landing, 2600);
        window.setTimeout(() => setFlying(false), 2200);
        window.setTimeout(() => setDetailLoaded(true), 2600);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [size.width, zoomTo, landing]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const visible = useMemo(() => places.filter((p) => kinds.has(p.kind)), [places, kinds]);
  const active = places.find((p) => p.id === activeId) ?? places[0];
  // Card photos mount once their place has been shown (and stay for the cross-fade), so the
  // page loads one photo, not all of them.
  const [seenIds, setSeenIds] = useState(() => new Set([active.id]));
  if (!seenIds.has(active.id)) setSeenIds(new Set(seenIds).add(active.id));
  const origin = places.find((p) => p.id === focus) ?? places[0];
  const hovered = hoverId ? places.find((p) => p.id === hoverId) : null;

  const select = (place: ProjectedPlace) => {
    setActiveId(place.id);
    if (viewId === "region") zoomTo(landing);
  };
  const step = (delta: number) => {
    const list = visible.length ? visible : places;
    const index = list.findIndex((p) => p.id === active.id);
    select(list[(index + delta + list.length) % list.length]);
  };
  const toggleKind = (kind: PlaceKind) =>
    setKinds((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });

  const vb = viewBox;
  const scale = vb && size.width ? size.width / vb[2] : 1; // px per projected unit
  const toPx = (x: number, y: number): [number, number] => (vb ? [(x - vb[0]) * scale, (y - vb[1]) * scale] : [-999, -999]);
  const zoomed = viewId === "coast" || viewId === "bay";
  const atRegion = viewId === "region";

  const glass = "border border-white/10 bg-[#0b1118]/70 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md";
  const mono = "font-mono uppercase tracking-[0.14em]";
  const kindLabel = (kind: PlaceKind) => placeKinds.find((k) => k.kind === kind)?.label;

  const card = (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-white/5">
        {places.map((place) =>
          place.image && seenIds.has(place.id) ? (
            <Image
              key={place.id}
              src={place.image}
              alt={place.id === active.id ? place.name : ""}
              fill
              quality={85}
              sizes="(min-width: 1024px) 400px, 100vw"
              loading="lazy"
              className={`object-cover transition-[opacity,scale] duration-700 ${EASE} ${
                place.id === active.id ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ) : null,
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className={`flex items-center gap-2 text-[0.65rem] text-white/60 ${mono}`}>
          {kindLabel(active.kind)}
          {active.note && <span className="text-white/40">· {active.note}</span>}
        </p>
        <h3 className="mt-2 text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-none tracking-[-0.03em]">{active.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">{active.description}</p>
        {active.id !== origin.id && (
          <p className={`mt-3 text-[0.65rem] text-white/45 ${mono}`}>
            ≈ {Math.max(1, Math.round(distanceKm(origin.coordinates, active.coordinates)))} km from {origin.name}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          {active.href && active.id !== currentId ? (
            <Button href={active.href} variant="light" className="!px-4 !py-2.5">
              View {active.name}
            </Button>
          ) : (
            <span />
          )}
          <div className="flex">
            <button type="button" onClick={() => step(-1)} className={`px-2.5 py-2 text-[0.65rem] text-white/60 hover:text-white ${mono}`}>
              ← Prev
            </button>
            <button type="button" onClick={() => step(1)} className={`px-2.5 py-2 text-[0.65rem] text-white/60 hover:text-white ${mono}`}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#0b1118] text-white">
      {/* Heading */}
      <div className="grid gap-8 px-[clamp(1.25rem,6vw,6rem)] pb-12 pt-24 sm:pt-32 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-7">
          <p data-reveal className={`inline-flex items-center gap-3 text-xs text-white/60 sm:text-sm ${mono}`}>
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
            {heading.eyebrow}
          </p>
          <h2 data-reveal="words" className="mt-6 text-balance text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em]">
            <RevealWords text={heading.title} />
          </h2>
        </div>
        <p data-reveal className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg md:col-span-4 md:col-start-9">
          {heading.intro}
        </p>
      </div>

      {/* Map: full bleed */}
      <div ref={mapRef} className="relative h-[72svh] min-h-[520px] overflow-hidden bg-[#0b1824] lg:h-[min(90svh,940px)] lg:min-h-[640px]">
        {vb && (
          <svg viewBox={vb.join(" ")} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              {/* Cooler, slightly darker satellite tone */}
              <filter id="sat-tone" colorInterpolationFilters="sRGB">
                <feColorMatrix type="saturate" values="0.72" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1.02" />
                  <feFuncG type="linear" slope="1.06" />
                  <feFuncB type="linear" slope="1.14" intercept="0.02" />
                </feComponentTransfer>
              </filter>
            </defs>
            {rasters
              .filter((r) => r.id !== "coast" || detailLoaded)
              .map((r) => (
                <image
                  key={r.id}
                  href={r.src}
                  x={r.rect[0]}
                  y={r.rect[1]}
                  width={r.rect[2] - r.rect[0]}
                  height={r.rect[3] - r.rect[1]}
                  preserveAspectRatio="none"
                  filter="url(#sat-tone)"
                />
              ))}
            {/* Dim everything outside Montenegro (fades out at the Europe level) */}
            <path
              d={`M${vb[0] - vb[2]} ${vb[1] - vb[3]}h${vb[2] * 3}v${vb[3] * 3}h${-vb[2] * 3}Z ${paths.country}`}
              fill="#050b12"
              fillOpacity={atRegion ? 0.3 : 0.6}
              fillRule="evenodd"
              style={{ transition: "fill-opacity 900ms" }}
            />
            <path d={paths.neighbours} fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={0.8 / scale} />
            {/* Border with a soft glow */}
            <path d={paths.country} fill="none" stroke="#fff" strokeOpacity={0.22} strokeWidth={7 / scale} strokeLinejoin="round" />
            <path d={paths.country} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={1.6 / scale} strokeLinejoin="round" />
          </svg>
        )}

        {/* Sea and neighbour labels */}
        {vb &&
          labels.map((label) => {
            const [x, y] = toPx(label.x, label.y);
            return (
              <span
                key={label.text}
                aria-hidden="true"
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/50 transition-opacity duration-700 ${mono} ${
                  label.sea ? "text-[0.7rem] italic tracking-[0.35em] sm:text-xs" : "text-[0.6rem]"
                } ${atRegion || !showLabels ? "opacity-0" : "opacity-100"}`}
                style={{ left: x, top: y }}
              >
                {label.text}
              </span>
            );
          })}

        {/* Montenegro label at the Europe level */}
        {vb && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-xl font-light tracking-[-0.01em] text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.8)] transition-opacity duration-700 sm:text-2xl ${
              atRegion ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: toPx(...centre(views))[0], top: toPx(...centre(views))[1] }}
          >
            Montenegro
          </span>
        )}

        {/* Pins */}
        {vb &&
          visible.map((place) => {
            const [x, y] = toPx(place.x, place.y);
            const inView = !atRegion && !flying && x > -20 && x < size.width + 20 && y > -20 && y < size.height + 40;
            const isActive = place.id === active.id;
            const labelled =
              isActive || hoverId === place.id || (showLabels && (place.kind === "project" || zoomed || MAJOR.has(place.id)));
            return (
              <button
                key={place.id}
                type="button"
                onClick={() => select(place)}
                onMouseEnter={() => setHoverId(place.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(place.id)}
                onBlur={() => setHoverId(null)}
                aria-pressed={isActive}
                aria-label={`${place.name}${place.note ? `, ${place.note}` : ""}`}
                tabIndex={inView ? 0 : -1}
                className={`group absolute flex -translate-x-1/2 -translate-y-full items-end transition-opacity duration-500 ${
                  inView ? "opacity-100" : "pointer-events-none opacity-0"
                } ${isActive ? "z-30" : place.kind === "project" ? "z-20" : "z-10 hover:z-40 focus-visible:z-40"}`}
                style={{ left: x, top: y }}
              >
                <Pin kind={place.kind} active={isActive} compact={!zoomed && !isActive && !MAJOR.has(place.id)} />
                <span
                  className={`pointer-events-none absolute bottom-3 whitespace-nowrap text-[0.75rem] font-medium tracking-[-0.01em] text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.95)] transition-opacity duration-300 sm:text-sm ${
                    place.labelLeft ? "right-full mr-1" : "left-full ml-1"
                  } ${labelled ? "opacity-100" : "opacity-0"}`}
                >
                  {place.name}
                </span>
              </button>
            );
          })}

        {/* Hover card (desktop): thumbnail and name above the pin */}
        {vb && hovered && hovered.id !== active.id && size.desktop && (
          <div
            className={`pointer-events-none absolute z-50 flex w-64 items-center gap-3 p-2 ${glass}`}
            style={{ left: toPx(hovered.x, hovered.y)[0], top: toPx(hovered.x, hovered.y)[1] - 52, transform: "translate(-50%, -100%)" }}
          >
            <span className="relative block aspect-[4/3] w-20 shrink-0 overflow-hidden bg-white/10">
              {hovered.image && <Image src={hovered.image} alt="" fill sizes="80px" className="object-cover" />}
            </span>
            <span>
              <span className="block text-sm leading-tight">{hovered.name}</span>
              <span className={`mt-1 block text-[0.6rem] text-white/55 ${mono}`}>{kindLabel(hovered.kind)}</span>
            </span>
          </div>
        )}

        {/* Breadcrumb */}
        <nav aria-label="Map level" className="absolute left-4 top-4 z-40 flex items-center gap-3 sm:left-6 sm:top-6">
          <button
            type="button"
            onClick={() => zoomTo("region", 1600)}
            className={`text-sm transition-colors sm:text-base ${atRegion ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            ↰ Europe
          </button>
          <span aria-hidden="true" className="text-white/40">
            ⋯→
          </span>
          <button
            type="button"
            onClick={() => zoomTo(landing)}
            className={`text-lg font-light tracking-[-0.01em] transition-colors sm:text-2xl ${atRegion ? "text-white/60 hover:text-white" : "text-white"}`}
          >
            Montenegro
          </button>
        </nav>

        {/* Left panel: filters, views and labels (desktop) */}
        <div className="absolute left-6 top-20 z-40 hidden w-64 space-y-3 lg:block">
          <div className={`p-4 ${glass}`}>
            <p className={`mb-3 text-[0.6rem] text-white/50 ${mono}`}>Show on map</p>
            <ul className="space-y-1.5">
              {placeKinds.map((item) => (
                <li key={item.kind}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-white/85 hover:text-white">
                    <input
                      type="checkbox"
                      checked={kinds.has(item.kind)}
                      onChange={() => toggleKind(item.kind)}
                      className="size-3.5 accent-[#e9dcc3]"
                    />
                    <svg viewBox="0 0 24 24" className="size-4 opacity-80" fill="currentColor" aria-hidden="true">
                      {icons[item.kind]}
                    </svg>
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-4 ${glass}`}>
            <p className={`mb-3 text-[0.6rem] text-white/50 ${mono}`}>View</p>
            <ul className="space-y-1">
              {views
                .filter((view) => view.id !== "region")
                .map((view) => (
                  <li key={view.id}>
                    <button
                      type="button"
                      onClick={() => zoomTo(view.id)}
                      aria-pressed={viewId === view.id}
                      className={`flex w-full items-center gap-3 py-1 text-left text-sm transition-colors ${
                        viewId === view.id ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span aria-hidden="true" className={`size-2 rounded-full border ${viewId === view.id ? "border-white bg-white" : "border-white/50"}`} />
                      {view.label}
                    </button>
                  </li>
                ))}
            </ul>
            <label className="mt-4 flex cursor-pointer items-center justify-between border-t border-white/10 pt-3 text-sm text-white/80">
              Show labels
              <input type="checkbox" checked={showLabels} onChange={() => setShowLabels((v) => !v)} className="size-3.5 accent-[#e9dcc3]" />
            </label>
          </div>
        </div>

        {/* Filters and views (mobile): a scrolling row under the breadcrumb */}
        <div className="absolute inset-x-0 top-14 z-40 flex gap-1.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:hidden">
          {placeKinds.map((item) => (
            <button
              key={item.kind}
              type="button"
              onClick={() => toggleKind(item.kind)}
              aria-pressed={kinds.has(item.kind)}
              className={`shrink-0 px-3 py-2 text-[0.6rem] ${mono} ${glass} ${kinds.has(item.kind) ? "text-white" : "text-white/40 line-through"}`}
            >
              {item.label}
            </button>
          ))}
          {views
            .filter((view) => view.id !== "region")
            .map((view) => (
              <button
                key={view.id}
                type="button"
                onClick={() => zoomTo(view.id)}
                aria-pressed={viewId === view.id}
                className={`shrink-0 px-3 py-2 text-[0.6rem] ${mono} ${glass} ${viewId === view.id ? "text-[#e9dcc3]" : "text-white/70"}`}
              >
                {view.label}
              </button>
            ))}
        </div>

        {/* Right card (desktop) */}
        <aside aria-live="polite" className={`absolute bottom-6 right-6 top-6 z-40 hidden w-[400px] overflow-y-auto lg:block ${glass}`}>
          {card}
        </aside>

        <p className={`absolute bottom-2 left-4 z-30 max-w-[70%] text-[0.55rem] tracking-[0.06em] text-white/40 sm:left-6 lg:max-w-[calc(100%-480px)] ${mono}`}>
          {montenegroMap.credit}
        </p>
      </div>

      {/* Card below the map on smaller screens */}
      <aside aria-live="polite" className="border-t border-white/10 lg:hidden">
        {card}
      </aside>
    </section>
  );
}

// Centre of the "All Montenegro" view, for the country label at the Europe level.
function centre(views: { id: string; rect: Rect }[]): [number, number] {
  const rect = views.find((view) => view.id === "all")?.rect ?? [0, 0, 0, 0];
  return [(rect[0] + rect[2]) / 2, (rect[1] + rect[3]) / 2];
}
