"use client";

import { useId, useState } from "react";

type Faq = { question: string; answer: string };

// FAQ accordion at the end of a blog post, styled like the home page FAQs: one answer open at a time.
export default function BlogFaqs({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby={`${baseId}-heading`} className="mt-16">
      <h2 id={`${baseId}-heading`} className="text-balance text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.12] tracking-[-0.02em]">
        Frequently asked questions
      </h2>
      <ul className="mt-8 border-t border-ink/15">
        {items.map((item, i) => {
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
                  className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                >
                  <span className="text-lg leading-snug tracking-[-0.01em] transition-colors group-hover:text-ink/70 sm:text-xl">
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
                  <p className="max-w-[62ch] whitespace-pre-line pb-6 pr-10 text-base leading-relaxed text-ink/70 sm:text-lg">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
