"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { footer, menu } from "@/content/site";

type SiteMenuProps = {
  open: boolean;
  // Images load only once the menu has been opened, so a closed menu costs nothing.
  loadImages: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function SiteMenu({ open, loadImages, onClose, toggleRef }: SiteMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // While open: lock page scroll, focus the first link, close on Esc, keep Tab inside the menu
  // (plus the header toggle so it can be closed by keyboard), and hand focus back on close.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbar}px`;
    const toggle = toggleRef.current;

    const focusables = () =>
      [toggle, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(
        (el): el is HTMLElement => !!el,
      );
    focusables()[1]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = "";
      html.style.paddingRight = "";
      toggle?.focus({ preventScroll: true });
    };
  }, [open, onClose, toggleRef]);

  return (
    <div
      ref={panelRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      data-menu
      data-open={open || undefined}
      className="fixed inset-0 z-40 overflow-y-auto bg-ink-deep text-white"
      style={{
        clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        visibility: open ? "visible" : "hidden",
        // Opening: wipe down. Closing: wipe up, then hide once the wipe has finished.
        transition: open
          ? `clip-path 900ms ${EASE}, visibility 0s`
          : `clip-path 700ms ${EASE}, visibility 0s linear 700ms`,
      }}
    >
      <div className="grid min-h-full content-between gap-y-12 px-[clamp(1.25rem,6vw,6rem)] pb-10 pt-28 md:grid-cols-12 md:gap-x-6 md:pt-32">
        {/* Links */}
        <nav aria-label="Main" className="md:col-span-7">
          <p className="menu-fade font-mono text-xs uppercase tracking-[0.14em] text-white/55">Menu</p>
          <ul className="menu-list mt-6">
            {menu.links.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={onClose}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="menu-link block py-1 text-[clamp(2.25rem,5.2vw,4.75rem)] font-light leading-[1.05] tracking-[-0.03em] transition-opacity duration-300"
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className="inline-block">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Preview + contact */}
        <div className="flex flex-col gap-10 md:col-span-4 md:col-start-9 md:justify-end">
          <div className="menu-fade relative hidden aspect-[5/4] overflow-hidden md:block">
            {loadImages &&
              menu.links.map((link, i) => (
                <Image
                  key={link.href}
                  src={link.image}
                  alt=""
                  fill
                  quality={85}
                  sizes="30vw"
                  className="object-cover"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.06)",
                    transition: `opacity 700ms ${EASE}, transform 1200ms ${EASE}`,
                  }}
                />
              ))}
          </div>

          {/* Two columns only on small screens, where the menu is full width; beside the preview they stack */}
          <div className="menu-fade grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-1">
            <div className="space-y-2">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/50">Contact</p>
              <a href={`mailto:${footer.email}`} className="block break-words text-white/80 transition-colors hover:text-white">
                {footer.email}
              </a>
              {footer.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="block text-white/80 transition-colors hover:text-white">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/45">{phone.region}</span>{" "}
                  {phone.display}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/50">Head office</p>
              <p className="leading-relaxed text-white/80">{footer.address}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
                {footer.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="menu-fade">
            <Button href={menu.cta.href} variant="light" className="w-full justify-center">
              {menu.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
