"use client";

import { type FormEvent, useState } from "react";
import { footer } from "@/content/site";

// Enquiry form. There is no mail backend yet, so submitting opens the visitor's email app with the
// message addressed to the enquiry inbox and pre-filled. Swap `onSubmit` for a server action or form
// service (e.g. Resend, Formspree) when one is set up.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const lines = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Interested in: ${data.get("interest") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ];
    const subject = `Website enquiry from ${name}`;
    window.location.href = `mailto:${footer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-ink/35 focus:border-ink";
  const label = "font-mono text-xs uppercase tracking-[0.14em] text-ink/60";

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Name</span>
        <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="Optional" />
      </label>
      <label className="block">
        <span className={label}>Interested in</span>
        <select name="interest" className={`${field} appearance-none`} defaultValue="Life Bay Montenegro">
          <option>Life Bay Montenegro</option>
          <option>Ocean Crest villas</option>
          <option>European residency</option>
          <option>Property management</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message</span>
        <textarea name="message" required rows={4} className={`${field} resize-none`} placeholder="How can we help?" />
      </label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 bg-ink-deep px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 18 14" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M1 0v8h15M12 4l4 4-4 4" />
          </svg>
          Send enquiry
        </button>
        <p aria-live="polite" className="text-sm text-ink/60">
          {sent ? "Your email app should open with the message ready to send." : "Opens your email app with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
