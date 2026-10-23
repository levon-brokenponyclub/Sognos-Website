import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// Exits preview. `redirect` must be a same-site path.
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const to = request.nextUrl.searchParams.get("redirect") ?? "/";
  redirect(to.startsWith("/") && !to.startsWith("//") ? to : "/");
}
