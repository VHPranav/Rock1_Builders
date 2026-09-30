import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink-deep text-white">
      {/* Full-bleed background */}
      {footer.image ? (
        <Image src={footer.image} alt="" fill quality={85} sizes="100vw" className="-z-20 object-cover object-center" />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#5b6b73,#2a3136_60%,#14171a)]" />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-ink-deep/95" />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* Top rule */}
        <div className="border-t border-white/10 pt-16 sm:pt-20 lg:pt-24" />

        {/* Four-column layout */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 pb-16 sm:pb-20">

          {/* ── Col 1: Brand ── */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-semibold tracking-[-0.02em]">Rock1 Builders</span>
            </Link>
            <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-white/80">
              Building lives, communities, and legacies — across South India and now on the shores of Europe.
            </p>
            {/* Social icon buttons */}
            <div className="mt-8 flex items-center gap-4">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex size-9 items-center justify-center border border-white/30 transition-colors hover:border-white/60 hover:bg-white/10"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/80 transition-colors group-hover:text-white">
                    {social.label.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">Navigation</p>
            <ul className="mt-6 space-y-3.5">
              {footer.primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Quick Links ── */}
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">Quick Links</p>
            <ul className="mt-6 space-y-3.5">
              {footer.secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">Contact</p>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {footer.email}
                </a>
              </li>
              {footer.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="group flex flex-col gap-0.5">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50">
                      {phone.region}
                    </span>
                    <span className="text-sm text-white/80 transition-colors group-hover:text-white">
                      {phone.display}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <p className="text-sm leading-relaxed text-white/55">{footer.address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/50">
            © {year} Rock1 Builders. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white/75"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
