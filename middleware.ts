import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COLLEGE_COACH_SESSION_COOKIE } from "@/lib/college-coach-session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COLLEGE_COACH_SESSION_COOKIE)?.value;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
