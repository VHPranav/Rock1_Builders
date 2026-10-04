"use server";

import { Resend } from "resend";
import { footer } from "@/content/site";

// Contact form → Resend. Configure in .env.local (see .env.example):
//   RESEND_API_KEY      required
//   CONTACT_TO_EMAIL    inbox that receives enquiries (defaults to the footer address)
//   CONTACT_FROM_EMAIL  sender on a domain verified in Resend; the default onboarding@resend.dev
//                       only delivers to the Resend account owner, so it is for testing only.

export type ContactField = "name" | "email" | "phone" | "interest" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  // Echoed back on error so the form keeps what the visitor typed.
  fields?: Partial<Record<ContactField, string>>;
  submittedAt?: number;
};

const interests = ["Life Bay Montenegro", "Ocean Crest villas", "European residency", "Property management", "Something else"];
const limits: Record<ContactField, number> = { name: 120, email: 200, phone: 40, interest: 60, message: 4000 };

// Bots tend to submit instantly; people take longer than this to fill the form in.
const MIN_FILL_MS = 3000;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function sendEnquiry(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const fields = Object.fromEntries(
    (Object.keys(limits) as ContactField[]).map((key) => [key, String(formData.get(key) ?? "").trim()]),
  ) as Record<ContactField, string>;
  const submittedAt = Date.now();

  // Spam traps: a hidden field people never see, and a minimum time on the form. Pretend it worked.
  const startedAt = Number(formData.get("startedAt"));
  if (String(formData.get("company") ?? "") !== "" || !startedAt || submittedAt - startedAt < MIN_FILL_MS) {
    return { status: "success", message: "Thank you. Your enquiry has been sent.", submittedAt };
  }

  const errors: ContactState["errors"] = {};
  if (!fields.name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (fields.phone && !/^[+()\d\s.-]{6,}$/.test(fields.phone)) errors.phone = "Please enter a valid phone number.";
  if (!fields.message) errors.message = "Please enter a message.";
  if (!interests.includes(fields.interest)) fields.interest = "Something else";
  for (const key of Object.keys(limits) as ContactField[]) {
    if (fields[key].length > limits[key]) errors[key] = "This is too long.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, fields, submittedAt };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return {
      status: "error",
      message: `Sorry, the form isn't available right now. Please email us at ${footer.email}.`,
      fields,
      submittedAt,
    };
  }

  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone || "Not given"],
    ["Interested in", fields.interest],
  ];
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", fields.message].join("\n");
  const html = `
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([label, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(fields.message)}</p>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin-top:24px">Sent from the contact form on rock1builders.com. Reply to this email to answer ${escapeHtml(fields.name)} directly.</p>`;

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Rock1 Builders website <onboarding@resend.dev>",
    to: (process.env.CONTACT_TO_EMAIL || footer.email).split(",").map((address) => address.trim()),
    replyTo: fields.email,
    subject: `Website enquiry: ${fields.interest} – ${fields.name}`,
    text,
    html,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return {
      status: "error",
      message: `Sorry, your enquiry couldn't be sent. Please try again or email us at ${footer.email}.`,
      fields,
      submittedAt,
    };
  }

  return { status: "success", message: "Thank you. Your enquiry has been sent; we'll be in touch shortly.", submittedAt };
}
