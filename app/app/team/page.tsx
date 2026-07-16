"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  fetchCollegeCoachMe,
  fetchPipeline,
  type CollegeCoachMe,
  type PipelineCard,
} from "@/lib/college-coach-client";
import {
  ACTIVE_TEAM_STATUSES,
  CLASS_YEARS,
  ROSTER_STATUSES,
} from "@/lib/roster-status";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

type ViewMode = "grid" | "list" | "compare";

/**
 * Team page = current program roster identity.
 * Recruiting board prospects are shown separately and never mixed as Active team.
 */
export default function TeamPage() {
  const [me, setMe] = useState<CollegeCoachMe | null>(null);
  const [cards, setCards] = useState<PipelineCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCollegeCoachMe(), fetchPipeline()])
      .then(([profile, pipeline]) => {
        if (cancelled) return;
        setMe(profile);
        setCards((pipeline.cards ?? []).filter((c) => c.stage !== "archived"));
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load team.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const committedLike = useMemo(
    () =>
      cards.filter((c) =>
        ["committed", "offer"].includes(c.stage.toLowerCase()),
      ),
    [cards],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: OS_ORANGE }}
          >
            Team
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">
            Current roster
          </h1>
          <p className="mt-2 max-w-2xl text-text-mid">
            Separate from recruiting. Active athletes, incoming class, and
            availability — never mixed with board prospects.
          </p>
        </div>
        <Link
          href="/app/program"
          className="rounded-lg px-3 py-2 text-sm font-bold"
          style={{
            background: "rgba(236,105,26,0.12)",
            border: "1px solid rgba(236,105,26,0.35)",
            color: OS_ORANGE,
          }}
        >
          Program identity →
        </Link>
      </header>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Program</h2>
        {loading ? (
          <p className="text-sm text-text-mid">Loading…</p>
        ) : me?.program ? (
          <p className="text-sm text-white">
            {me.program.institution_name} · {me.program.association}
            {me.program.division ? ` ${me.program.division}` : ""} ·{" "}
            {me.program.gender_category}
          </p>
        ) : (
          <p className="text-sm text-text-mid">
            No program linked.{" "}
            <Link href="/app/settings" className="text-[#EC691A] hover:underline">
              Set affiliation
            </Link>
          </p>
        )}
      </section>

      <section className="flex flex-wrap items-center gap-2">
        {(["grid", "list", "compare"] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setView(mode)}
            className="rounded-full px-3 py-1.5 text-sm font-semibold capitalize"
            style={
              view === mode
                ? {
                    background: "rgba(236,105,26,0.15)",
                    color: OS_ORANGE,
                  }
                : { color: "rgba(255,255,255,0.65)" }
            }
          >
            {mode}
          </button>
        ))}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-2 rounded-lg border border-white/15 bg-[#141C2B] px-3 py-1.5 text-sm text-white"
        >
          <option value="all">All statuses</option>
          {ROSTER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="rounded-lg border border-white/15 bg-[#141C2B] px-3 py-1.5 text-sm text-white"
        >
          <option value="all">All classes</option>
          {CLASS_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Active team membership</h2>
        <p className="mb-4 text-sm text-text-mid">
          Live roster membership ({ACTIVE_TEAM_STATUSES.join(", ")}) is not
          stored yet. This shell is ready for class-year roster rows once the
          program roster schema lands — without treating board prospects as
          Active.
        </p>
        <div className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-text-mid">
          No active roster athletes loaded.
          <div className="mt-3">
            <Link
              href="/app/player-selection"
              className="font-semibold text-[#EC691A] hover:underline"
            >
              Open Player Selection →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 style={osSectionLabel}>Incoming / committed (from recruiting)</h2>
        <p className="mb-3 text-sm text-text-mid">
          Shown for planning only — status remains recruiting until signed into
          the program roster.
        </p>
        {loading ? null : committedLike.length === 0 ? (
          <div style={osCardSoft}>
            <p className="text-sm text-text-mid">
              No offer/committed recruits on the board. Manage pipeline in{" "}
              <Link href="/app/recruiting" className="text-[#EC691A] hover:underline">
                Recruiting
              </Link>
              .
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {committedLike.map((card) => (
              <article key={card.id} style={osCardSoft}>
                <p className="font-bold text-white">
                  {card.player
                    ? `${card.player.first_name} ${card.player.last_name}`
                    : "Unknown"}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#EC691A]">
                  {card.stage}
                </p>
                <p className="mt-2 text-sm text-text-mid">
                  Grad {card.player?.graduation_year ?? "—"} · H.I.{" "}
                  {card.player?.handicap_index ?? "—"}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-text-low">
                <tr>
                  <th className="px-4 py-3">Player</th>
                  <th className="px-4 py-3">Recruit status</th>
                  <th className="px-4 py-3">Grad</th>
                  <th className="px-4 py-3">Compare</th>
                </tr>
              </thead>
              <tbody>
                {committedLike.map((card) => (
                  <tr key={card.id} className="border-t border-white/8">
                    <td className="px-4 py-3 font-medium text-white">
                      {card.player
                        ? `${card.player.first_name} ${card.player.last_name}`
                        : "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-text-mid">{card.stage}</td>
                    <td className="px-4 py-3 text-text-mid">
                      {card.player?.graduation_year ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {view === "compare" ? (
                        <span className="text-xs text-text-low">
                          Selection compare arrives with roster membership
                        </span>
                      ) : card.invite?.access_token ? (
                        <Link
                          href={`/app/players/${encodeURIComponent(card.invite.access_token)}`}
                          className="font-semibold text-[#EC691A] hover:underline"
                        >
                          Profile
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {(statusFilter !== "all" || classFilter !== "all") && (
        <p className="text-xs text-text-low">
          Filters ready: {statusFilter}/{classFilter}. Apply when live roster
          rows exist.
        </p>
      )}
    </div>
  );
}
