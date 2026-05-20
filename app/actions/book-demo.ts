"use server";

import { Resend } from "resend";

export type BookDemoInput = {
  fullName: string;
  email: string;
  company: string;
  product: string;
  date: number | null;
  time: string | null;
};

export type BookDemoResult = { ok: true } | { ok: false; error: string };

const PRODUCT_LABELS: Record<string, string> = {
  sognoscare: "SognosCare",
  sognosroster: "SognosRoster",
  sognosgenogram: "Sognos Genogram",
  "not-sure": "Not sure yet",
};

export async function bookDemo(input: BookDemoInput): Promise<BookDemoResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const product = input.product.trim();

  if (!fullName || !email || !company || !product) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured. Please contact us directly.",
    };
  }

  const productLabel = PRODUCT_LABELS[product] ?? product;
  const requestedSlot =
    input.date && input.time
      ? `May ${input.date}, 2026 at ${input.time}`
      : "Not specified";

  const lines = [
    "New demo booking from the Sognos website.",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Product of interest: ${productLabel}`,
    `Requested slot: ${requestedSlot}`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Sognos Demo Bookings <onboarding@resend.dev>",
      to: ["levongravett@gmail.com"],
      replyTo: email,
      subject: `Demo booking: ${fullName} — ${company}`,
      text: lines.join("\n"),
    });

    if (error) {
      return { ok: false, error: error.message ?? "Email send failed." };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unexpected error.",
    };
  }
}
