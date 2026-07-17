"use server";

import { Resend } from "resend";
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
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function submitContact(
  input: ContactInput,
): Promise<ContactResult> {
  const { firstName, lastName, email, phone } = input;

  if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
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
  if (!supabase) return { ok: false, error: "Database is not configured." };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Sognos <website@sognos.com.au>",
      to: [
        "matthew.thelmo@sognos.com.au",
        "reem@sognos.com.au",
        "contact@sognos.com.au",
      ],
      replyTo: email,
      subject: `New contact form submission: ${firstName} ${lastName} — ${input.organisation}`,
      text: [
        "New contact form submission from the Sognos website.",
        "",
        `First Name: ${firstName.trim()}`,
        `Last Name: ${lastName.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `Organisation: ${input.organisation.trim() || "Not provided"}`,
        `Reason: ${input.reason || "Not provided"}`,
        `Product: ${input.product || "Not provided"}`,
        `Message: ${input.message.trim() || "Not provided"}`,
      ].join("\n"),
    });

    if (error) {
      return { ok: false, error: error.message ?? "Email send failed." };
    }

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        organisation: input.organisation.trim() || null,
        reason: input.reason || null,
        product: input.product || null,
        message: input.message.trim() || null,
      });

    if (dbError) {
      return { ok: false, error: dbError.message ?? "Submission failed." };
    }

    return { ok: true };
  } catch (e) {
    console.error("Contact form submission failed", e);
    return {
      ok: false,
      error: "Message could not be sent right now. Please try again.",
    };
  }
}
