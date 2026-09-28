"use client";

import { useId, useState } from "react";
import Button from "@/components/Button";
import { faqs } from "@/content/home";

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="bg-linen px-[clamp(1.25rem,6vw,6rem)] py-24 text-ink sm:py-32">
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-6">
        {/* Intro, pinned while the list scrolls on desktop */}
        <div className="md:sticky md:top-16 md:col-span-4 md:self-start">
          <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-current" />
            {faqs.eyebrow}
          </p>
          <h2 className="mt-6 text-balance text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em]">
            {faqs.title}
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/70 sm:text-lg">{faqs.intro}</p>
          <Button href={faqs.cta.href} className="mt-8">
            {faqs.cta.label}
          </Button>
        </div>

        {/* Accordion: one answer open at a time */}
        <ul className="border-t border-ink/15 md:col-span-7 md:col-start-6">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={item.question} className="border-b border-ink/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-8"
                  >
                    <span className="text-lg leading-snug tracking-[-0.01em] transition-colors group-hover:text-ink/70 sm:text-xl lg:text-2xl">
                      {item.question}
                    </span>
                    {/* Plus that turns into a cross */}
                    <span
                      aria-hidden="true"
                      className={`relative mt-1.5 size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </button>
                </h3>
                {/* Height animates via grid rows 0fr -> 1fr */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-[62ch] pb-8 pr-10 text-base leading-relaxed text-ink/70 sm:text-lg">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
