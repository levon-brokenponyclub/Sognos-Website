"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { appendToCsv } from "@/lib/csv-logger";

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

  const apiKey =
    process.env.RESEND_API_KEY ??
    process.env.RESEND ??
    process.env["Resend"];

  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured. Please contact us directly.",
    };
  }

  const lines = [
    "New DHF conversation request from the Sognos website.",
    "",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Phone: ${input.phone || "Not provided"}`,
    `Interested in: ${input.interests.length ? input.interests.join(", ") : "Not specified"}`,
    "",
    "What they're looking to improve:",
    input.improvement || "Not provided",
  ];

  try {
    const resend = new Resend(apiKey);
    const { error: emailError } = await resend.emails.send({
      from: "Sognos DHF <onboarding@resend.dev>",
      to: ["levongravett@gmail.com"],
      replyTo: email,
      subject: `DHF Conversation: ${firstName} ${lastName} — ${company}`,
      text: lines.join("\n"),
    });

    if (emailError) {
      return { ok: false, error: emailError.message ?? "Email send failed." };
    }

    // Write to Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from("dhf_submissions").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        company: company || null,
        phone: input.phone || null,
        interests: input.interests,
        improvement: input.improvement || null,
      });
    }

    // Also write to CSV as local backup
    appendToCsv("dhf-conversation.csv", {
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      company,
      phone: input.phone,
      interests: input.interests.join("; "),
      improvement: input.improvement,
    });

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unexpected error.",
    };
  }
}
