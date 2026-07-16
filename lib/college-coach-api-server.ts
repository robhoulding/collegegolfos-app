import { LINKS } from "@/lib/links";
import type { CollegeCoachSession } from "@/lib/college-coach-session";
import { serverApiSecret } from "@/lib/server-api-secret";

export type UpstreamResult = {
  data: unknown;
  status: number;
  ok: boolean;
};

export async function collegeCoachApiFetch(
  path: string,
  options: {
    method?: string;
    session?: CollegeCoachSession | null;
    body?: string;
    headers?: Record<string, string>;
  } = {},
): Promise<Response> {
  const secret = serverApiSecret();
  if (!secret) {
    throw new Error("BASE44_SHARED_SECRET is not configured.");
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "x-base44-secret": secret,
    ...(options.headers ?? {}),
  };
  if (options.session?.email) {
    headers["x-base44-user-email"] = options.session.email;
  }
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${LINKS.apiBase}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body,
    cache: "no-store",
  });
}

export async function readUpstreamJson(
  response: Response,
): Promise<UpstreamResult> {
  const text = await response.text();
  let data: unknown = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: "Invalid upstream response." };
  }
  return { data, status: response.status, ok: response.ok };
}
