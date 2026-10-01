"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import SiteMenu from "@/components/SiteMenu";
import { menu } from "@/content/site";

// Inline desktop nav: the logo covers Home and the Enquire button covers Contact.
const inlineLinks = menu.links.filter((link) => link.href !== "/" && link.href !== "/contact-us");

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuUsed, setMenuUsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
  const toggle = () => {
    setMenuUsed(true);
    setOpen((value) => !value);
  };

  // White over the hero or the open (dark) menu; ink on the scrolled linen bar.
  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          solid ? "border-ink/10 bg-linen text-ink" : "border-transparent bg-transparent text-white"
        } ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 px-[clamp(1.25rem,4vw,3rem)] py-4 lg:grid-cols-[1fr_auto_1fr] lg:py-5">
          {/* Logo, left */}
          <Link data-reveal href="/" onClick={close} className="justify-self-start leading-none" aria-label="Rock1 Builders home">
            <span className="block text-xl font-medium uppercase tracking-[0.2em] sm:text-2xl">Rock1</span>
            <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.5em] sm:text-[0.6rem]">Builders</span>
          </Link>

          {/* Menu, centre (desktop) */}
          <nav data-reveal aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1.25rem,2.2vw,2.25rem)]">
              {inlineLinks.map((link) => {
                const current = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`whitespace-nowrap bg-[linear-gradient(currentColor,currentColor)] bg-left-bottom bg-no-repeat pb-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[length:100%_1px] xl:text-xs ${
                        current ? "bg-[length:100%_1px]" : "bg-[length:0%_1px]"
                      }`}
                    >
                      {link.label}
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
              <Button href="/contact-us" variant={solid ? "dark" : "light"} className="!px-5 !py-3">
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
                solid ? "bg-ink/10 hover:bg-ink/20" : "bg-white/20 backdrop-blur-md hover:bg-white/35"
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
      </header>

      <SiteMenu open={open} loadImages={menuUsed} onClose={close} toggleRef={toggleRef} />
    </>
  );
}
