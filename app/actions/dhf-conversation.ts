"use server";

import { createClient } from "@supabase/supabase-js";

export type DhfConversationInput = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  interests: string[];
  improvement: string;
};

export type DhfConversationResult = { ok: true } | { ok: false; error: string };

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function dhfConversation(
  input: DhfConversationInput,
): Promise<DhfConversationResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim();
  const company = input.company.trim();

  if (!firstName || !lastName || !email) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Database is not configured." };
  }

  const { error } = await supabase.from("dhf_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    company: company || null,
    phone: input.phone || null,
    interests: input.interests,
    improvement: input.improvement || null,
  });

  if (error) {
    return { ok: false, error: error.message ?? "Submission failed." };
  }

  return { ok: true };
}
