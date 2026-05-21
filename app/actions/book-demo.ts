"use server";

import { createClient } from "@supabase/supabase-js";

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

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Database is not configured." };
  }

  const productLabel = PRODUCT_LABELS[product] ?? product;
  const requestedSlot =
    input.date && input.time
      ? `May ${input.date}, 2026 at ${input.time}`
      : null;

  const { error } = await supabase.from("book_demo_submissions").insert({
    full_name: fullName,
    email,
    company,
    product: productLabel,
    requested_slot: requestedSlot,
  });

  if (error) {
    return { ok: false, error: error.message ?? "Submission failed." };
  }

  return { ok: true };
}
