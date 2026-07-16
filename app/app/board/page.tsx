"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  fetchPipeline,
  removePipelineCard,
  updatePipelineCard,
  type PipelineCard,
} from "@/lib/college-coach-client";

const STAGE_LABELS: Record<string, string> = {
  prospect: "Prospect",
  watching: "Watching",
  contacted: "Contacted",
  evaluating: "Evaluating",
  offer: "Offer",
  committed: "Committed",
  archived: "Archived",
};

export default function BoardPage() {
  const [stages, setStages] = useState<string[]>([]);
  const [cards, setCards] = useState<PipelineCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPipeline();
      setStages(data.stages ?? []);
      setCards(data.cards ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load board.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const byStage = useMemo(() => {
    const map = new Map<string, PipelineCard[]>();
    for (const stage of stages) map.set(stage, []);
    for (const card of cards) {
      const list = map.get(card.stage) ?? [];
      list.push(card);
      map.set(card.stage, list);
    }
    return map;
  }, [cards, stages]);

  async function onStageChange(card: PipelineCard, stage: string) {
    try {
      await updatePipelineCard(card.id, { stage });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update stage.");
    }
  }

  async function onRemove(card: PipelineCard) {
    try {
      await removePipelineCard(card.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove card.");
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">
          Recruiting board
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Pipeline stages for invited / saved players. No cold directory search —
          every card ties to a shared GolfCoachOS player id.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-text-mid">Loading board…</p>
      ) : cards.length === 0 ? (
        <div className="card-surface p-6 text-sm text-text-mid">
          Board is empty. Accept an invite from the inbox to create the first
          pipeline card.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {stages
            .filter((s) => s !== "archived" || (byStage.get(s)?.length ?? 0) > 0)
            .map((stage) => (
              <section key={stage} className="card-surface p-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
                  {STAGE_LABELS[stage] ?? stage}
                  <span className="ml-2 text-text-mid">
                    {byStage.get(stage)?.length ?? 0}
                  </span>
                </h2>
                <ul className="mt-3 space-y-3">
                  {(byStage.get(stage) ?? []).map((card) => {
                    const name = card.player
                      ? `${card.player.first_name} ${card.player.last_name}`.trim()
                      : "Unknown player";
                    return (
                      <li
                        key={card.id}
                        className="rounded-xl border border-white/10 bg-black/20 p-3"
                      >
                        <p className="font-semibold text-white">{name}</p>
                        <p className="mt-1 text-xs text-text-mid">
                          {card.player?.graduation_year
                            ? `Class of ${card.player.graduation_year}`
                            : "Grad year unset"}
                          {card.player?.handicap_index != null
                            ? ` · H.I. ${card.player.handicap_index}`
                            : ""}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <select
                            className="rounded-lg border border-white/15 bg-bg-base px-2 py-1 text-xs text-white"
                            value={card.stage}
                            onChange={(e) =>
                              void onStageChange(card, e.target.value)
                            }
                          >
                            {stages.map((s) => (
                              <option key={s} value={s}>
                                {STAGE_LABELS[s] ?? s}
                              </option>
                            ))}
                          </select>
                          {card.invite?.access_token ? (
                            <Link
                              href={`/app/players/${encodeURIComponent(card.invite.access_token)}`}
                              className="rounded-lg border border-white/15 px-2 py-1 text-xs font-semibold text-emerald-400"
                            >
                              Record
                            </Link>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => void onRemove(card)}
                            className="rounded-lg border border-white/15 px-2 py-1 text-xs text-text-mid hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}
