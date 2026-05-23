import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon).*)"],
};

export default function middleware(req: NextRequest) {
  const consent = req.cookies.get("cookie_consent")?.value ?? "unset";

  // Forward consent state as a request header so server components can read it
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-cookie-consent", consent);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}
