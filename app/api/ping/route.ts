import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Keep-alive ping for the free-tier Supabase project. Free projects pause
// after 7 days of no activity; .github/workflows/supabase-keepalive.yml
// hits this route every 3 days to keep it awake.

export async function GET(request: Request) {
  // Simple auth check — reject requests without the secret header.
  const authHeader = request.headers.get("x-ping-secret");
  if (authHeader !== process.env.PING_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Same env vars and fallback order as getSupabaseClient() in
  // app/actions/event-registration.ts — keep the two in step.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  try {
    const supabase = createClient(url, key);

    // Lightweight query — just checks the connection is alive.
    const { error } = await supabase
      .from("_ping")
      .select("1")
      .limit(1)
      .maybeSingle();

    // Table not existing is fine — we just want to touch the DB.
    if (error && !error.message.includes("does not exist")) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      message: "Supabase is awake",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
