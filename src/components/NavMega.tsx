"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import { projects, projectStatuses } from "@/content/home";
import { projectDetails } from "@/content/projectDetails";

// Full-width dropdown under the header: links on the left, a large preview on the right that follows
// whichever link is hovered or focused. Images mount only once the panel has been opened (`loaded`).

type PanelLink = { label: string; href: string; description?: string; image?: string; documents?: string[] };

type NavMegaProps = {
  id: string;
  kind: "projects" | "links";
  links?: PanelLink[];
  open: boolean;
  loaded: boolean;
  pathname: string;
  onNavigate: () => void;
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

// Projects use their real photography where the project page has it.
export const projectPreviews = projects.items.map((item) => ({
  ...item,
  preview: projectDetails[item.slug]?.heroImage ?? item.image,
}));

export default function NavMega({ id, kind, links = [], open, loaded, pathname, onNavigate }: NavMegaProps) {
  const [active, setActive] = useState(0);

  const entries =
    kind === "projects"
      ? projectStatuses.flatMap((status) => projectPreviews.filter((item) => item.status === status))
      : links;

  // Stagger for the list as the panel opens.
  const delay = (i: number) => ({ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" });
  const rise = `transition-[opacity,translate] duration-700 ${EASE} ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;

  const row = (index: number, href: string, children: React.ReactNode) => (
    <Link
      href={href}
      onClick={onNavigate}
      onMouseEnter={() => setActive(index)}
      onFocus={() => setActive(index)}
      aria-current={pathname === href ? "page" : undefined}
      className={`group/row grid grid-cols-[1fr_auto_auto] items-baseline gap-x-5 border-b border-ink/10 py-3.5 transition-colors duration-300 ${
        active === index ? "text-ink" : "text-ink/45 hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );

  const arrow = (index: number) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 14"
      className={`h-3 w-4 transition-[opacity,translate] duration-500 ${EASE} ${active === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M1 7h15M12 3l4 4-4 4" />
    </svg>
  );

  let index = 0;

  return (
    <div
      id={id}
      // Wipes down from the header; `inert` keeps the hidden panel out of the tab order and screen readers.
      inert={!open}
      className={`absolute inset-x-0 top-full border-b border-ink/10 bg-linen text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] transition-[clip-path] duration-700 ${EASE} ${
        open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
    >
      <div className="grid grid-cols-12 gap-8 px-[clamp(1.25rem,4vw,3rem)] pb-10 pt-8 xl:gap-12">
        {/* Links */}
        <div className="col-span-5 flex flex-col 2xl:col-span-4">
          {kind === "projects" ? (
            projectStatuses.map((status) => {
              const group = projectPreviews.filter((item) => item.status === status);
              return (
                <div key={status} className={`mb-6 ${rise}`} style={delay(projectStatuses.indexOf(status))}>
                  <p className="mb-1 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/50">
                    <span aria-hidden="true" className="size-1 rotate-45 bg-current" />
                    {status}
                  </p>
                  <ul>
                    {group.map((item) => {
                      const i = index++;
                      return (
                        <li key={item.slug}>
                          {row(
                            i,
                            item.href,
                            <>
                              <span className="text-xl tracking-[-0.01em] xl:text-2xl">{item.name}</span>
                              <span className="text-right font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/45">{item.location}</span>
                              {arrow(i)}
                            </>,
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : (
            <ul className={rise} style={delay(0)}>
              {links.map((link) => {
                const i = index++;
                return (
                  <li key={link.href}>
                    {row(
                      i,
                      link.href,
                      <>
                        <span className="col-span-2">
                          <span className="block text-2xl tracking-[-0.01em] xl:text-3xl">{link.label}</span>
                          {link.description && <span className="mt-1.5 block max-w-sm text-sm leading-relaxed text-ink/55">{link.description}</span>}
                        </span>
                        {arrow(i)}
                      </>,
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {kind === "projects" && (
            <div className={`mt-auto pt-2 ${rise}`} style={delay(4)}>
              <Button href="/projects" variant="dark" className="!px-5 !py-3">
                All projects · {projects.items.length}
              </Button>
            </div>
          )}
        </div>

        {/* Preview: every image is stacked and cross-faded so switching is instant */}
        <div className={`col-span-7 2xl:col-span-8 ${rise}`} style={delay(1)}>
          <div className="relative aspect-[16/9] max-h-[min(56vh,34rem)] w-full overflow-hidden bg-ink/10">
            {loaded &&
              entries.map((entry, i) => {
                const src = "preview" in entry ? entry.preview : entry.image;
                if (!src) return null;
                // Document scans: a row of pages, slightly fanned, on a quiet ground.
                if ("documents" in entry && entry.documents) {
                  return (
                    <div
                      key={entry.href}
                      aria-hidden={active !== i}
                      className={`absolute inset-0 flex items-center justify-center gap-[3%] bg-ink/[0.06] px-[8%] transition-[opacity,scale] duration-1000 ${EASE} ${
                        active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                      }`}
                    >
                      {entry.documents.map((doc, d) => (
                        <div
                          key={doc}
                          className={`relative aspect-[1500/1941] h-[66%] bg-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.4)] ${
                            d === 0 ? "-rotate-3" : d === 2 ? "rotate-3" : "-translate-y-2"
                          }`}
                        >
                          <Image src={doc} alt="" fill quality={85} sizes="18vw" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  );
                }
                const isDocument = src.startsWith("/images/legal/");
                return (
                  <div
                    key={entry.href}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-[opacity,scale] duration-1000 ${EASE} ${
                      active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    } ${isDocument ? "bg-white" : ""}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      quality={85}
                      sizes="(min-width: 1280px) 62vw, 55vw"
                      className={isDocument ? "object-contain p-6" : "object-cover"}
                    />
                  </div>
                );
              })}

            {/* Caption for page links: the page name in the corner, over a soft gradient */}
            {kind === "links" &&
              links.map((link, i) => {
                const isDocument = link.image?.startsWith("/images/legal/");
                return (
                  <p
                    key={link.href}
                    aria-hidden={active !== i}
                    className={`absolute bottom-0 left-0 m-5 inline-flex items-center gap-3 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-[opacity,translate] duration-700 ${EASE} ${
                      isDocument ? "bg-ink-deep text-white" : "bg-linen/90 text-ink backdrop-blur-sm"
                    } ${active === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                  >
                    <span aria-hidden="true" className="size-1 rotate-45 bg-current" />
                    {link.label}
                  </p>
                );
              })}

            {/* Caption for projects: status, name, stat and summary over a soft gradient */}
            {kind === "projects" && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                {entries.map((entry, i) => {
                    if (!("preview" in entry)) return null;
                    return (
                      <div
                        key={entry.slug}
                        aria-hidden={active !== i}
                        className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-6 text-white transition-[opacity,translate] duration-700 ${EASE} xl:p-8 ${
                          active === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="max-w-md">
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/75">
                            {entry.status} · {entry.category}
                          </p>
                          <p className="mt-2 text-3xl font-light tracking-[-0.02em] xl:text-4xl">{entry.name}</p>
                          <p className="mt-2 text-sm text-white/80">{entry.summary}</p>
                        </div>
                        <p className="flex shrink-0 items-baseline gap-2">
                          <span className="text-4xl font-light tracking-[-0.02em] xl:text-5xl">{entry.stat.value}</span>
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/70">{entry.stat.label}</span>
                        </p>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
