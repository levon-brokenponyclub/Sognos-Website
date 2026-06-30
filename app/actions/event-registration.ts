"use server";

import { createClient } from "@supabase/supabase-js";

export type EventRegistrationInput = {
  firstName: string;
  surname: string;
  companyName: string;
  jobTitle: string;
  email: string;
  phone: string;
  dietaryRequirements: string;
};

export type EventRegistrationResult =
  | { ok: true }
  | { ok: false; error: string };

const EVENT_SLUG = "nfp-real-care";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function registerForEvent(
  input: EventRegistrationInput,
): Promise<EventRegistrationResult> {
  const firstName = input.firstName.trim();
  const surname = input.surname.trim();
  const companyName = input.companyName.trim();
  const jobTitle = input.jobTitle.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const dietary = input.dietaryRequirements.trim();

  if (!firstName || !surname || !email || !companyName || !jobTitle) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, error: "Registration is not configured." };
  }

  const { error } = await supabase.from("event_registrations").insert({
    event_slug: EVENT_SLUG,
    first_name: firstName,
    surname,
    company_name: companyName,
    job_title: jobTitle,
    email,
    phone: phone || null,
    dietary_requirements: dietary || null,
  });

  if (error) {
    return { ok: false, error: error.message ?? "Registration failed." };
  }

  return { ok: true };
}
