"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type RecruiterView = {
  access?: {
    coach_name?: string;
    coach_email?: string;
    school_program?: string | null;
    invited_for?: string;
  };
  primary_coach_name?: string | null;
  player?: {
    first_name?: string;
    last_name?: string;
    handicap_index?: number | null;
    stage_classification?: string | null;
  };
  error?: string;
};

/**
 * Shared player record shell inside CollegeGolfOS.
 * Uses the same recruiter-view API as GolfCoachOS magic links,
 * gated to the signed-in college coach email.
 */
export default function SharedPlayerPage() {
  const params = useParams<{ token: string }>();
  const token = decodeURIComponent(params.token ?? "");
  const [data, setData] = useState<RecruiterView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch(`/api/players/recruiter-view?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        const json = (await res.json()) as RecruiterView;
        if (!res.ok) throw new Error(json.error || "Could not load player.");
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Load failed.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const playerName = data?.player
    ? `${data.player.first_name ?? ""} ${data.player.last_name ?? ""}`.trim()
    : data?.access?.invited_for || "Player";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">
            Shared player record
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">
            {loading ? "Loading…" : playerName}
          </h1>
        </div>
        <Link
          href="/app/inbox"
          className="text-sm font-semibold text-text-mid hover:text-white"
        >
          ← Back to inbox
        </Link>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {data && !error ? (
        <div className="grid gap-4 md:grid-cols-2">
          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
              Access
            </h2>
            <p className="text-sm text-text-mid">
              Invited as {data.access?.coach_name} · {data.access?.coach_email}
            </p>
            <p className="text-sm text-text-mid">
              Program note: {data.access?.school_program || "—"}
            </p>
            <p className="text-sm text-text-mid">
              Development coach: {data.primary_coach_name || "—"}
            </p>
          </section>
          <section className="card-surface space-y-2 p-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
              Snapshot
            </h2>
            <p className="text-sm text-white">
              Stage: {data.player?.stage_classification || "Unset"}
            </p>
            <p className="text-sm text-white">
              Handicap index: {data.player?.handicap_index ?? "—"}
            </p>
            <p className="mt-3 text-xs text-text-low">
              Full metrics, scores, and team messages are available in the API
              payload. Richer recruiter UI can reuse GolfCoachOS RecruiterPlayerView
              next — shell permission gate is in place here.
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
