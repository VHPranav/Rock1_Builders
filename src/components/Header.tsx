"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import NavMega from "@/components/NavMega";
import SiteMenu from "@/components/SiteMenu";
import { nav } from "@/content/site";

// Desktop link style: small mono capitals with an underline that draws in on hover / current page.
const linkClass =
  "whitespace-nowrap bg-[linear-gradient(currentColor,currentColor)] bg-left-bottom bg-no-repeat pb-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[length:100%_1px] xl:text-xs";

// `overLight`: the page starts on a light background (no dark hero), so the header is ink from the top.
export default function Header({ overLight = false }: { overLight?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuUsed, setMenuUsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Desktop dropdown: label of the open item, and whether any has opened yet (defers its images).
  const [mega, setMega] = useState<string | null>(null);
  const [megaLoaded, setMegaLoaded] = useState(false);
  const megaTimer = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Transparent over the hero; a solid linen bar once scrolled. Slides away while scrolling down past
  // the hero and returns on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > window.innerHeight * 0.6 && y > lastY);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const openMega = (label: string | null) => {
    window.clearTimeout(megaTimer.current);
    setMega(label);
    if (label) setMegaLoaded(true);
  };
  // A short grace period so moving the pointer from the link down into the panel doesn't close it.
  const closeMegaSoon = () => {
    window.clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setMega(null), 140);
  };
  const closeMega = useCallback(() => {
    window.clearTimeout(megaTimer.current);
    setMega(null);
  }, []);

  useEffect(() => {
    if (!mega) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = headerRef.current?.querySelector<HTMLElement>(`[data-mega-trigger="${mega}"]`);
      closeMega();
      trigger?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega, closeMega]);
  const toggle = () => {
    setMenuUsed(true);
    setOpen((value) => !value);
  };

  // White over the hero or the open (dark) menu; ink on the scrolled linen bar or a light page.
  const solid = (scrolled || mega !== null) && !open;
  const inkText = solid || (overLight && !open);

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeMegaSoon}
        onMouseEnter={() => window.clearTimeout(megaTimer.current)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMega();
        }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          solid ? "border-ink/10 bg-linen text-ink" : `border-transparent bg-transparent ${inkText ? "text-ink" : "text-white"}`
        } ${hidden && !open && !mega ? "-translate-y-full" : ""}`}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 px-[clamp(1.25rem,4vw,3rem)] py-4 lg:grid-cols-[1fr_auto_1fr] lg:py-5">
          {/* Logo, left */}
          {/* Both logo versions are stacked; the white one shows over the hero and the open menu */}
          <Link data-reveal href="/" onClick={close} className="relative block justify-self-start" aria-label="Rock1 Builders home">
            <Image
              src="/images/logos/rock1-builders.webp"
              alt=""
              width={830}
              height={334}
              priority
              sizes="160px"
              className={`h-10 w-auto transition-opacity duration-500 sm:h-12 ${inkText ? "opacity-100" : "opacity-0"}`}
            />
            <Image
              src="/images/logos/rock1-builders-white.webp"
              alt=""
              width={830}
              height={334}
              priority
              sizes="160px"
              className={`absolute inset-0 h-10 w-auto transition-opacity duration-500 sm:h-12 ${inkText ? "opacity-0" : "opacity-100"}`}
            />
          </Link>

          {/* Menu, centre (desktop). Items with children open a full-width panel (NavMega) on hover or
              keyboard focus; Escape, leaving the header or hovering the dimmed page closes it. */}
          <nav data-reveal aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
              {nav.map((item) => {
                const current =
                  pathname === item.href || (item.children?.some((child) => child.href === pathname) ?? false);
                const expanded = mega === item.label;
                return (
                  <li key={item.label} onMouseEnter={() => openMega(item.children ? item.label : null)}>
                    <Link
                      href={item.href}
                      data-mega-trigger={item.children ? item.label : undefined}
                      onFocus={() => openMega(item.children ? item.label : null)}
                      // The panel sits after the header actions in the DOM, so Tab / ↓ jump straight into it.
                      onKeyDown={(event) => {
                        if (!item.children || !expanded) return;
                        if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey)) {
                          const first = document.querySelector<HTMLElement>(`#mega-${item.label.toLowerCase()} a`);
                          if (first) {
                            event.preventDefault();
                            first.focus();
                          }
                        }
                      }}
                      aria-current={pathname === item.href ? "page" : undefined}
                      aria-expanded={item.children ? expanded : undefined}
                      aria-controls={item.children ? `mega-${item.label.toLowerCase()}` : undefined}
                      className={`${linkClass} inline-flex items-center gap-1.5 ${current || expanded ? "bg-[length:100%_1px]" : "bg-[length:0%_1px]"}`}
                    >
                      {item.label}
                      {item.children && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 10 6"
                          className={`h-1.5 w-2.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        >
                          <path d="M1 1l4 4 4-4" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions, right */}
          <div data-reveal className="flex items-center justify-self-end gap-4 sm:gap-5">
            <button
              type="button"
              className="font-mono text-[0.7rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline xl:text-xs"
            >
              EN
            </button>
            {/* Wrapper does the hiding: Button's own inline-flex would override `hidden` */}
            <div className="hidden sm:block">
              <Button href="/contact-us" variant={inkText ? "dark" : "light"} className="!px-5 !py-3">
                Enquire
              </Button>
            </div>
            {/* Below lg the inline links collapse into the full-screen menu */}
            <button
              ref={toggleRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid size-10 place-items-center rounded-full transition-colors lg:hidden ${
                inkText ? "bg-ink/10 hover:bg-ink/20" : "bg-white/20 backdrop-blur-md hover:bg-white/35"
              }`}
            >
              {/* Two lines that cross into an X while open */}
              <span aria-hidden="true" className="relative block h-[7px] w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-[3px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-[3px] -rotate-45" : "top-[6px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Full-width dropdown panels (desktop) */}
        <div className="hidden lg:block">
          {nav
            .filter((item) => item.children)
            .map((item) => (
              <NavMega
                key={item.label}
                id={`mega-${item.label.toLowerCase()}`}
                kind={item.href === "/projects" ? "projects" : "links"}
                links={item.children}
                open={mega === item.label}
                loaded={megaLoaded}
                pathname={pathname}
                onNavigate={closeMega}
              />
            ))}
        </div>
      </header>

      {/* Dims the page under an open panel; hovering or clicking it closes the panel */}
      <div
        aria-hidden="true"
        onMouseEnter={closeMegaSoon}
        onClick={closeMega}
        className={`fixed inset-0 z-40 hidden bg-ink-deep/35 backdrop-blur-[2px] transition-opacity duration-500 lg:block ${
          mega ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <SiteMenu open={open} loadImages={menuUsed} onClose={close} toggleRef={toggleRef} />
    </>
  );
}
