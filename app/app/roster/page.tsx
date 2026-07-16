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
 * IMPORTANT: This page is NOT the college program’s current team roster.
 * It lists active recruiting-pipeline prospects only.
 * Current team / signed / transfer lifecycle is a required next schema step.
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
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-300">
          Temporary shell view
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Recruiting pipeline list
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Active board prospects only — not your current college team roster.
          Prospects on the board are not treated as signed or active roster
          athletes. A separate program roster lifecycle is required before Team
          Intelligence.
        </p>
      </header>

      <section className="card-surface space-y-2 border-amber-400/20 p-5 text-sm text-text-mid">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-amber-300">
          Required next data model
        </h2>
        <p>
          Distinguish at minimum: recruit → committed → signed → incoming →
          active roster → redshirt/inactive → graduated / transferred /
          departed. Do not expand Player Selection or Team Intelligence until
          that separation exists.
        </p>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section className="card-surface p-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
          Program affiliation context
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
          No active pipeline prospects. Accept invites from the inbox and keep
          players on non-archived board stages to populate this list.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-text-low">
              <tr>
                <th className="px-4 py-3 font-semibold">Prospect</th>
                <th className="px-4 py-3 font-semibold">Pipeline stage</th>
                <th className="px-4 py-3 font-semibold">Grad</th>
                <th className="px-4 py-3 font-semibold">H.I.</th>
                <th className="px-4 py-3 font-semibold">Shared record</th>
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
