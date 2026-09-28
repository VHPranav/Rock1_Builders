import Button from "@/components/Button";
import { contactCta } from "@/content/home";
import RevealWords from "@/components/RevealWords";

// Thin-line drawing of a stepped hillside building in perspective (decorative). It stretches to fill the
// frame's right side; non-scaling strokes keep every line 1px however it stretches.
function BuildingLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 600"
      preserveAspectRatio="none"
      className="h-full w-full text-ink/25 [&_path]:[vector-effect:non-scaling-stroke]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Upper terrace block */}
      <path d="M150 600V190l150-80 100 40" />
      <path d="M300 110v490" />
      {/* Middle terrace block, stepping down */}
      <path d="M40 600V330l110-58" />
      <path d="M150 330l150-80 100 40" />
      {/* Lower terrace block */}
      <path d="M0 470l150-80 100 40 150-80" />
      {/* Balcony slab lines */}
      <path d="M150 460l150-80M150 530l150-80" />
    </svg>
  );
}

export default function ContactCta() {
  return (
    <section className="bg-linen px-[clamp(1.25rem,6vw,6rem)] py-24 text-ink sm:py-32">
      <div className="relative overflow-hidden border border-ink/15">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[30%] md:block">
          <BuildingLines />
        </div>

        <div className="relative px-[clamp(1.5rem,5vw,5rem)] pb-12 pt-[clamp(4rem,9vw,8rem)] md:w-[72%]">
          <p data-reveal className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
            {contactCta.eyebrow}
          </p>
          <h2 data-reveal="words" className="mt-6 max-w-[22ch] text-balance text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.08] tracking-[-0.02em]">
            <RevealWords text={contactCta.title} />
          </h2>
          <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">{contactCta.intro}</p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-2">
            <Button href={contactCta.primary.href}>{contactCta.primary.label}</Button>
            {contactCta.secondary.map((link) => (
              <Button key={link.label} href={link.href} variant="ghost">
                {link.label}
              </Button>
            ))}
          </div>

          <dl className="mt-[clamp(4rem,8vw,7rem)] grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-12">
            {contactCta.details.map((item, i) => (
              // Phone and email share a row; the longer head office address gets its own.
              <div data-reveal key={item.label} className={i === 2 ? "sm:col-span-2" : undefined}>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/55">{item.label}</dt>
                <dd className="mt-2 text-base leading-snug">
                  {item.href ? (
                    <a href={item.href} className="underline-offset-4 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
