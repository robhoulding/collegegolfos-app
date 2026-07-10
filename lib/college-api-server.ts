import { LINKS } from "@/lib/links";
import type {
  ProgramDetail,
  ProgramSearchFilters,
  ProgramSearchResponse,
} from "@/lib/college-api-types";
import { serverApiSecret } from "@/lib/server-api-secret";

export type CollegeApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

function buildSearchQuery(filters: ProgramSearchFilters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value == null || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

async function collegeApiFetch<T>(path: string): Promise<CollegeApiResult<T>> {
  const secret = serverApiSecret();
  if (!secret) {
    return {
      ok: false,
      status: 503,
      error:
        "College program search is not configured. Add BASE44_SHARED_SECRET to .env.local (same value as golfcoachos-api).",
    };
  }

  const url = `${LINKS.apiBase}${path}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "x-base44-secret": secret,
      },
      cache: "no-store",
    });

    const text = await response.text();
    let data: T | { error?: string };
    try {
      data = JSON.parse(text) as T | { error?: string };
    } catch {
      return {
        ok: false,
        status: response.status || 502,
        error: "College API returned an invalid response.",
      };
    }

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data != null &&
        "error" in data &&
        typeof data.error === "string"
          ? data.error
          : `College API error (${response.status})`;
      return { ok: false, status: response.status, error: message };
    }

    return { ok: true, data: data as T };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Network error";
    return {
      ok: false,
      status: 502,
      error: `Could not reach GolfCoachOS API: ${detail}`,
    };
  }
}

export async function searchCollegePrograms(
  filters: ProgramSearchFilters = {},
): Promise<CollegeApiResult<ProgramSearchResponse>> {
  return collegeApiFetch<ProgramSearchResponse>(
    `/api/college/programs/search${buildSearchQuery(filters)}`,
  );
}

export async function getCollegeProgram(
  programId: string,
): Promise<CollegeApiResult<ProgramDetail>> {
  return collegeApiFetch<ProgramDetail>(
    `/api/college/programs/${encodeURIComponent(programId)}`,
  );
}
