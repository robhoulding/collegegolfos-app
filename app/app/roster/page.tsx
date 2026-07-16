"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchCollegeCoachMe,
  fetchPipeline,
  type CollegeCoachMe,
  type PipelineCard,
} from "@/lib/college-coach-client";

/**
 * College "roster" shell = recruiting pipeline players (active stages)
 * plus program affiliation context. Not the junior-coach GolfCoachOS roster.
 */
export default function RosterPage() {
  const [me, setMe] = useState<CollegeCoachMe | null>(null);
  const [cards, setCards] = useState<PipelineCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCollegeCoachMe(), fetchPipeline()])
      .then(([profile, pipeline]) => {
        if (cancelled) return;
        setMe(profile);
        setCards(
          (pipeline.cards ?? []).filter((c) => c.stage !== "archived"),
        );
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load roster.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">Roster</h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Active recruiting roster for this college coach account. Built from
          shared player records already on your board — not a separate database.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section className="card-surface p-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
          Program context
        </h2>
        {loading ? (
          <p className="mt-2 text-sm text-text-mid">Loading…</p>
        ) : me?.program ? (
          <p className="mt-2 text-sm text-white">
            {me.program.institution_name} · {me.program.association}
            {me.program.division ? ` ${me.program.division}` : ""} ·{" "}
            {me.program.gender_category}
          </p>
        ) : (
          <p className="mt-2 text-sm text-text-mid">
            No program linked yet.{" "}
            <Link href="/app/settings" className="text-emerald-400 hover:underline">
              Set affiliation
            </Link>
          </p>
        )}
      </section>

      {loading ? null : cards.length === 0 ? (
        <div className="card-surface p-6 text-sm text-text-mid">
          Roster is empty. Accept invites and keep players on active board stages
          to populate this list.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-text-low">
              <tr>
                <th className="px-4 py-3 font-semibold">Player</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">Grad</th>
                <th className="px-4 py-3 font-semibold">H.I.</th>
                <th className="px-4 py-3 font-semibold">Record</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => {
                const name = card.player
                  ? `${card.player.first_name} ${card.player.last_name}`.trim()
                  : "Unknown";
                return (
                  <tr key={card.id} className="border-t border-white/8">
                    <td className="px-4 py-3 font-medium text-white">{name}</td>
                    <td className="px-4 py-3 text-text-mid">{card.stage}</td>
                    <td className="px-4 py-3 text-text-mid">
                      {card.player?.graduation_year ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-text-mid">
                      {card.player?.handicap_index ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {card.invite?.access_token ? (
                        <Link
                          href={`/app/players/${encodeURIComponent(card.invite.access_token)}`}
                          className="font-semibold text-emerald-400 hover:underline"
                        >
                          Open
                        </Link>
                      ) : (
                        <span className="text-text-low">No invite link</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
