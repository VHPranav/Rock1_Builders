"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { projectPreviews } from "@/components/NavMega";
import { projects, projectStatuses } from "@/content/home";
import { footer, menu, nav } from "@/content/site";

type SiteMenuProps = {
  open: boolean;
  // Images load only once the menu has been opened, so a closed menu costs nothing.
  loadImages: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

// The same items as the desktop navigation (Home first).
const items = nav;

// Full-screen menu below lg, styled like the desktop dropdown panels: linen, thin rules, About and
// Projects expand in place (pages with a thumbnail and description; projects as swipeable photo cards).
export default function SiteMenu({ open, loadImages, onClose, toggleRef }: SiteMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

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
      [toggle, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([tabindex='-1'])") ?? [])].filter(
        (el): el is HTMLElement => !!el && !el.closest("[inert]"),
      );
    focusables()[1]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
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

  const rowText = "text-[clamp(1.75rem,7vw,3rem)] font-light leading-[1.1] tracking-[-0.03em]";

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
      className="fixed inset-0 z-40 overflow-y-auto bg-linen text-ink lg:hidden"
      style={{
        clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        visibility: open ? "visible" : "hidden",
        // Opening: wipe down. Closing: wipe up, then hide once the wipe has finished.
        transition: open
          ? "clip-path 900ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s"
          : "clip-path 700ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear 700ms",
      }}
    >
      <div className="flex min-h-full flex-col gap-12 px-[clamp(1.25rem,6vw,3rem)] pb-10 pt-24 sm:pt-28">
        <nav aria-label="Main">
          <ul className="border-t border-ink/10">
            {items.map((item, i) => {
              const children = "children" in item ? item.children : undefined;
              const isOpen = expanded === item.label;
              const current = pathname === item.href || (children?.some((child) => child.href === pathname) ?? false);
              const style = { "--i": i } as CSSProperties;

              if (!children) {
                return (
                  <li key={item.label} className="overflow-hidden border-b border-ink/10">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`menu-link flex items-center justify-between py-3 ${rowText}`}
                      style={style}
                    >
                      <span className="inline-block">{item.label}</span>
                      {current && <span aria-hidden="true" className="size-2 rotate-45 bg-current" />}
                    </Link>
                  </li>
                );
              }

              const panelId = `menu-${item.label.toLowerCase()}`;
              return (
                <li key={item.label} className="border-b border-ink/10">
                  <div className="overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={`menu-link flex w-full items-center justify-between py-3 text-left ${rowText}`}
                      style={style}
                    >
                      <span className="inline-flex items-center gap-4">
                        {item.label}
                        {current && <span aria-hidden="true" className="size-2 rotate-45 bg-current" />}
                      </span>
                      {/* Plus that turns into a minus */}
                      <span aria-hidden="true" className="relative size-4 shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-500 ${EASE} ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </div>

                  {/* Expanding panel: grid rows animate from 0fr to 1fr */}
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-700 ${EASE} ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className={`pb-6 transition-opacity duration-500 ${isOpen ? "opacity-100 delay-150" : "opacity-0"}`}>
                        {item.href === "/projects" ? (
                          <>
                            {/* One swipeable row in status order (Newly Launched, Ongoing, Completed) */}
                            <ul className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                              {projectStatuses.flatMap((status) => projectPreviews.filter((project) => project.status === status)).map((project) => (
                                <li key={project.slug} className="w-[min(70vw,18rem)] shrink-0 snap-start">
                                  <Link href={project.href} onClick={onClose} className="group block">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                                      {loadImages && project.preview && (
                                        <Image
                                          src={project.preview}
                                          alt=""
                                          fill
                                          quality={85}
                                          sizes="(min-width: 640px) 18rem, 70vw"
                                          className={`object-cover transition-[scale] duration-700 ${EASE} group-active:scale-[1.03]`}
                                        />
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
                                      <p className="absolute left-3 top-3 inline-flex items-center gap-2 bg-linen/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink">
                                        <span aria-hidden="true" className="size-1 rotate-45 bg-current" />
                                        {project.status}
                                      </p>
                                      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-white">
                                        <span>
                                          <span className="block text-xl tracking-[-0.01em]">{project.name}</span>
                                          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/75">{project.location}</span>
                                        </span>
                                        <span className="flex shrink-0 items-baseline gap-1">
                                          <span className="text-2xl font-light tracking-[-0.02em]">{project.stat.value}</span>
                                          <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/75">{project.stat.label}</span>
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5">
                              <Button href="/projects" variant="dark" className="!px-5 !py-3" onClick={onClose}>
                                All projects · {projects.items.length}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <ul>
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  aria-current={pathname === child.href ? "page" : undefined}
                                  className="grid grid-cols-[4.5rem_1fr] items-center gap-4 py-2.5"
                                >
                                  <span className={`relative aspect-square overflow-hidden ${child.documents ? "bg-white" : "bg-ink/10"}`}>
                                    {loadImages && child.image && (
                                      <Image
                                        src={child.image}
                                        alt=""
                                        fill
                                        quality={85}
                                        sizes="72px"
                                        className={child.documents ? "object-contain p-1.5" : "object-cover"}
                                      />
                                    )}
                                  </span>
                                  <span>
                                    <span className="block text-xl tracking-[-0.01em]">{child.label}</span>
                                    {child.description && (
                                      <span className="mt-0.5 block text-sm leading-snug text-ink/55">{child.description}</span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact + call to action */}
        <div className="menu-fade mt-auto grid gap-8 text-sm sm:grid-cols-2">
          <div className="space-y-2">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/50">Contact</p>
            <a href={`mailto:${footer.email}`} className="block break-words text-ink/80 transition-colors hover:text-ink">
              {footer.email}
            </a>
            {footer.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="block text-ink/80 transition-colors hover:text-ink">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/45">{phone.region}</span>{" "}
                {phone.display}
              </a>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/50">Head office</p>
            <p className="leading-relaxed text-ink/80">{footer.address}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Button href={menu.cta.href} variant="dark" className="w-full justify-center" onClick={onClose}>
              {menu.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
