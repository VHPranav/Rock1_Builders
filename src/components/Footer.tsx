import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { footer } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-deep text-white">
      {/* Full-bleed background */}
      {footer.image ? (
        <Image src={footer.image} alt="" fill quality={85} sizes="100vw" className="-z-20 object-cover" />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#5b6b73,#2a3136_60%,#14171a)]" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

      {/* Oversized wordmark along the bottom, behind the card */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(2.5rem,6vw,4.5rem)] -z-10 select-none text-center text-[clamp(6rem,30vw,28rem)] font-medium uppercase leading-[0.75] tracking-[-0.04em] text-white/15"
      >
        {footer.wordmark}
      </p>

      {/* Menu card */}
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <nav aria-label="Footer" className="w-full max-w-md bg-ink-deep/90 p-8 backdrop-blur-sm sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">Menu</p>
          <ul className="mt-5 space-y-1">
            {footer.primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-3xl leading-tight tracking-[-0.02em] transition-colors hover:text-white/60 sm:text-4xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-[auto_1fr] gap-x-10 gap-y-2 text-sm">
            <ul className="space-y-2">
              {footer.secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${footer.email}`} className="text-white/70 transition-colors hover:text-white">
                  {footer.email}
                </a>
              </li>
              {footer.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="text-white/70 transition-colors hover:text-white">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/45">{phone.region}</span>{" "}
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-white/70">{footer.prompt}</p>
          <Button href={footer.cta.href} variant="light" className="mt-5 w-full justify-center">
            {footer.cta.label}
          </Button>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-3 px-[clamp(1.25rem,6vw,6rem)] pb-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/70 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>© {year} Rock1 Builders</span>
          {footer.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="max-w-md sm:text-right">{footer.address}</p>
      </div>
    </footer>
  );
}
