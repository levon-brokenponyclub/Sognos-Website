"use server";

import { createClient } from "@supabase/supabase-js";

export type ContactInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  reason: string;
  product: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const { firstName, lastName, email, phone } = input;

  if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Database is not configured." };

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    organisation: input.organisation.trim() || null,
    reason: input.reason || null,
    product: input.product || null,
    message: input.message.trim() || null,
  });

  if (error) return { ok: false, error: error.message ?? "Submission failed." };

  return { ok: true };
}
