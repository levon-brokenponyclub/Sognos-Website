"use server";

import { Resend } from "resend";
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
const EVENT_LABEL = "NFP Real Care";

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
    return { ok: false, error: "Registration is not configured." };
  }

  try {
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
      if (error.code === "23505") {
        return {
          ok: false,
          error:
            "This email address is already registered for this event. Please contact us if you need to make changes.",
        };
      }
      return { ok: false, error: error.message ?? "Registration failed." };
    }

    const resend = new Resend(apiKey);
    const { error: emailError } = await resend.emails.send({
      from: "Sognos Events <website@sognos.com.au>",
      to: [
        "matthew.thelmo@sognos.com.au",
        "reem@sognos.com.au",
        "contact@sognos.com.au",
        "events@sognos.com.au",
      ],
      replyTo: email,
      subject: `Event registration: ${firstName} ${surname} - ${companyName}`,
      text: [
        `New ${EVENT_LABEL} registration from the Sognos website.`,
        "",
        `First name: ${firstName}`,
        `Surname: ${surname}`,
        `Company: ${companyName}`,
        `Job title: ${jobTitle}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Dietary requirements: ${dietary || "Not provided"}`,
      ].join("\n"),
    });

    if (emailError) {
      return {
        ok: false,
        error: emailError.message ?? "Registration email failed.",
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("Event registration failed", e);
    return {
      ok: false,
      error:
        "Registration could not be submitted right now. Please try again.",
    };
  }
}
