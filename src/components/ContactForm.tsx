"use client";

import { useActionState, useEffect, useRef } from "react";
import { type ContactField, type ContactState, sendEnquiry } from "@/app/contact-us/actions";

const initialState: ContactState = { status: "idle", message: "" };

// Enquiry form. Submits to a Server Action that emails the enquiry through Resend
// (src/app/contact-us/actions.ts); replies go straight to the visitor's address.
export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const startedRef = useRef<HTMLInputElement>(null);

  // Time-on-form spam check: stamp when the form becomes usable, and again after each submission.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, [state.submittedAt]);

  const field =
    "mt-2 w-full border-b bg-transparent py-3 text-base outline-none transition-colors placeholder:text-ink/35 focus:border-ink";
  const label = "font-mono text-xs uppercase tracking-[0.14em] text-ink/60";
  const values = state.status === "error" ? state.fields : undefined;
  const fieldProps = (name: ContactField) => ({
    name,
    defaultValue: values?.[name],
    "aria-invalid": state.errors?.[name] ? true : undefined,
    "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
    className: `${field} ${state.errors?.[name] ? "border-red-700" : "border-ink/25"}`,
  });
  const error = (name: ContactField) =>
    state.errors?.[name] && (
      <span id={`${name}-error`} className="mt-2 block text-sm text-red-700">
        {state.errors[name]}
      </span>
    );

  return (
    // Keyed by submission so the echoed values are applied after an error.
    <form key={state.submittedAt ?? 0} action={formAction} className="grid gap-8 sm:grid-cols-2">
      {/* Spam traps: hidden from people and screen readers */}
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <label aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>

      <label className="block">
        <span className={label}>Name</span>
        <input {...fieldProps("name")} required maxLength={120} autoComplete="name" placeholder="Your full name" />
        {error("name")}
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input {...fieldProps("email")} type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" />
        {error("email")}
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input {...fieldProps("phone")} type="tel" maxLength={40} autoComplete="tel" placeholder="Optional" />
        {error("phone")}
      </label>
      <label className="block">
        <span className={label}>Interested in</span>
        <select {...fieldProps("interest")} defaultValue={values?.interest ?? "Life Bay Montenegro"} className={`${field} border-ink/25 appearance-none`}>
          <option>Life Bay Montenegro</option>
          <option>Ocean Crest villas</option>
          <option>European residency</option>
          <option>Property management</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message</span>
        <textarea {...fieldProps("message")} required rows={4} maxLength={4000} placeholder="How can we help?" className={`${fieldProps("message").className} resize-none`} />
        {error("message")}
      </label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 bg-ink-deep px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60"
        >
          <svg aria-hidden="true" viewBox="0 0 18 14" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M1 0v8h15M12 4l4 4-4 4" />
          </svg>
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${state.status === "error" ? "text-red-700" : state.status === "success" ? "text-ink" : "text-ink/60"}`}
        >
          {state.message || "Name, email and message are required."}
        </p>
      </div>
    </form>
  );
}
