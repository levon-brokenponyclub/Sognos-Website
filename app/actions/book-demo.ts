"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export type BookDemoInput = {
  fullName: string;
  email: string;
  company: string;
  product: string;
  date: number | null;
  month: number | null; // 0-indexed
  year: number | null;
  time: string | null;
};

export type BookDemoResult = { ok: true } | { ok: false; error: string };

const PRODUCT_LABELS: Record<string, string> = {
  sognoscare: "SognosCare",
  sognosroster: "SognosRoster",
  sognosgenogram: "Sognos Genogram",
  "not-sure": "Not sure yet",
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function bookDemo(input: BookDemoInput): Promise<BookDemoResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const company = input.company.trim();
  const product = input.product.trim();

  if (!fullName || !email || !company || !product) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const apiKey =
    process.env.RESEND_API_KEY ?? process.env.RESEND ?? process.env["Resend"];
  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured. Please contact us directly.",
    };
  }
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Database is not configured." };
  }

  const productLabel = PRODUCT_LABELS[product] ?? product;
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthName = input.month != null ? MONTHS[input.month] : "Unknown";
  const yearStr = input.year ?? "Unknown";
  const requestedSlot =
    input.date && input.time
      ? `${monthName} ${input.date}, ${yearStr} at ${input.time}`
      : null;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Sognos Demo Bookings <website@sognos.com.au>",
      to: [
        "levongravett@gmail.com",
        "Paula@sognos.com.au",
        "matthew.thelmo@sognos.com.au",
        "reem@sognos.com.au",
        "contact@sognos.com.au",
      ],
      replyTo: email,
      subject: `Demo booking: ${fullName} — ${company}`,
      text: [
        "New demo booking from the Sognos website.",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Product of interest: ${productLabel}`,
        `Requested slot: ${requestedSlot}`,
      ].join("\n"),
    });

    if (error) {
      return { ok: false, error: error.message ?? "Email send failed." };
    }

    const { error: dbError } = await supabase
      .from("book_demo_submissions")
      .insert({
        full_name: fullName,
        email,
        company,
        product: productLabel,
        requested_slot: requestedSlot,
      });

    if (dbError) {
      return { ok: false, error: dbError.message ?? "Submission failed." };
    }

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unexpected error.",
    };
  }
}
