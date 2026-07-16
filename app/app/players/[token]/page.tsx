"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type SafePlayerView = {
  access?: {
    coach_name?: string;
    coach_email?: string;
    school_program?: string | null;
    invited_for?: string;
    expires_at?: string | null;
  };
  primary_coach_name?: string | null;
  player?: {
    first_name?: string;
    last_name?: string;
    handicap_index?: number | null;
    stage_classification?: string | null;
    graduation_year?: number | null;
    competitive_level?: string | null;
    home_club?: string | null;
    academics?: {
      overall_gpa?: number | null;
      sat_score?: number | null;
      act_score?: number | null;
    } | null;
  };
  tournament_scores?: Array<{
    id: string;
    event_name?: string | null;
    event_date: string;
    gross_score?: number | null;
    score_to_par?: number | null;
    finish_position?: string | null;
  }>;
  redacted?: Record<string, boolean>;
  error?: string;
};

export default function SharedPlayerPage() {
  const params = useParams<{ token: string }>();
  const token = decodeURIComponent(params.token ?? "");
  const [data, setData] = useState<SafePlayerView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch(`/api/players/recruiter-view?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        const json = (await res.json()) as SafePlayerView;
        if (!res.ok) {
          throw new Error(
            json.error ||
              (res.status === 403
                ? "Access denied for this recruiting link."
                : "Could not load player."),
          );
        }
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
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-100"
        >
          <p className="font-semibold">Access denied</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-red-100/80">
            Links must be active, unexpired, and addressed to your signed-in
            coach email.
          </p>
        </div>
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
              Recruiting snapshot
            </h2>
            <p className="text-sm text-white">
              Stage: {data.player?.stage_classification || "Unset"}
            </p>
            <p className="text-sm text-white">
              Grad year: {data.player?.graduation_year ?? "—"}
            </p>
            <p className="text-sm text-white">
              Handicap index: {data.player?.handicap_index ?? "—"}
            </p>
            <p className="text-sm text-white">
              Level: {data.player?.competitive_level || "—"}
            </p>
            <p className="text-sm text-white">
              GPA / SAT / ACT:{" "}
              {data.player?.academics?.overall_gpa ?? "—"} /{" "}
              {data.player?.academics?.sat_score ?? "—"} /{" "}
              {data.player?.academics?.act_score ?? "—"}
            </p>
          </section>
          <section className="card-surface space-y-2 p-5 md:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
              Recent tournament scores
            </h2>
            {data.tournament_scores && data.tournament_scores.length > 0 ? (
              <ul className="space-y-2 text-sm text-text-mid">
                {data.tournament_scores.map((row) => (
                  <li key={row.id}>
                    <span className="text-white">
                      {row.event_name || "Event"}
                    </span>
                    {" · "}
                    {new Date(row.event_date).toLocaleDateString()}
                    {row.gross_score != null ? ` · ${row.gross_score}` : ""}
                    {row.finish_position ? ` · ${row.finish_position}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-text-mid">No tournament scores shared.</p>
            )}
            <p className="pt-2 text-xs text-text-low">
              Private coach notes, family messages, medical screening, billing,
              and internal AI content are not exposed on this view.
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
