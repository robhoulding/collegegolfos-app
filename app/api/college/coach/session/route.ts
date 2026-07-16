import { NextResponse } from "next/server";
import {
  collegeCoachApiFetch,
  readUpstreamJson,
} from "@/lib/college-coach-api-server";
import {
  COLLEGE_COACH_SESSION_COOKIE,
  collegeCoachSessionCookieValue,
  getCollegeCoachSession,
} from "@/lib/college-coach-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCollegeCoachSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return NextResponse.json(session);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : undefined;
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    const upstream = await collegeCoachApiFetch("/api/college/coaches/session", {
      method: "POST",
      body: JSON.stringify({ email, name }),
    });
    const { data, status } = await readUpstreamJson(upstream);
    const payload = data as {
      coach_id?: string;
      user_id?: string;
      email?: string;
      name?: string;
      error?: string;
    };

    if (!upstream.ok || !payload.coach_id) {
      return NextResponse.json(
        { error: payload.error ?? "Could not create college coach session." },
        { status: status || 502 },
      );
    }

    const session = {
      coachId: payload.coach_id,
      userId: payload.user_id || payload.coach_id,
      email: (payload.email || email).toLowerCase(),
      displayName: payload.name?.trim() || "College Coach",
    };

    const response = NextResponse.json(session);
    response.cookies.set(
      COLLEGE_COACH_SESSION_COOKIE,
      collegeCoachSessionCookieValue(session),
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV === "production" ||
          process.env.VERCEL === "1",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      },
    );
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "College coach sign-in failed.",
      },
      { status: 503 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COLLEGE_COACH_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
    path: "/",
    maxAge: 0,
  });
  return response;
}
