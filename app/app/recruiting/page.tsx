"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  acceptInviteToBoard,
  fetchCoachInbox,
  fetchPipeline,
  removePipelineCard,
  updatePipelineCard,
  type InboxInvite,
  type PipelineCard,
} from "@/lib/college-coach-client";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

const STAGE_LABELS: Record<string, string> = {
  prospect: "Prospect",
  watching: "Watching",
  contacted: "Contacted",
  evaluating: "Evaluating",
  offer: "Offer",
  committed: "Committed",
  archived: "Archived",
};

export default function RecruitingPage() {
  const [stages, setStages] = useState<string[]>([]);
  const [cards, setCards] = useState<PipelineCard[]>([]);
  const [invites, setInvites] = useState<InboxInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [pipeline, inbox] = await Promise.all([
        fetchPipeline(),
        fetchCoachInbox(),
      ]);
      setStages(pipeline.stages ?? []);
      setCards(pipeline.cards ?? []);
      setInvites(inbox.invites ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load recruiting.");
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

  const newShares = invites.filter((i) => !i.on_board);

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

  async function onAccept(invite: InboxInvite) {
    setBusyId(invite.id);
    try {
      await acceptInviteToBoard(invite.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add to board.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Recruiting
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Recruiting board
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Pipeline, next action, and shared GolfCoachOS records — never mixed
          with the active team roster.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section>
        <h2 style={osSectionLabel}>New shares</h2>
        {loading ? (
          <p className="text-sm text-text-mid">Loading…</p>
        ) : newShares.length === 0 ? (
          <div style={osCardSoft}>
            <p className="text-sm text-text-mid">
              No new profile shares waiting. Inbox also lives under{" "}
              <Link
                href="/app/communication"
                className="text-[#EC691A] hover:underline"
              >
                Communication
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {newShares.map((invite) => (
              <li key={invite.id} style={osCardSoft}>
                <p className="font-bold text-white">{invite.player_name}</p>
                <p className="mt-1 text-sm text-text-mid">
                  {invite.school_program ?? "School unset"} · Shared profile
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyId === invite.id}
                    onClick={() => void onAccept(invite)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
                    style={{ background: OS_ORANGE }}
                  >
                    {busyId === invite.id ? "Adding…" : "Add to board"}
                  </button>
                  <Link
                    href={`/app/players/${encodeURIComponent(invite.access_token)}`}
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-text-mid hover:text-white"
                  >
                    View profile
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 style={osSectionLabel}>Pipeline</h2>
        {loading ? (
          <p className="text-sm text-text-mid">Loading board…</p>
        ) : cards.length === 0 ? (
          <div style={osCardSoft}>
            <p className="text-sm text-text-mid">
              Board is empty. Accept a share above or find players to evaluate.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {stages
              .filter(
                (s) => s !== "archived" || (byStage.get(s)?.length ?? 0) > 0,
              )
              .map((stage) => (
                <section key={stage} style={osCardSoft}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                    {STAGE_LABELS[stage] ?? stage}
                    <span className="ml-2 text-white/40">
                      {byStage.get(stage)?.length ?? 0}
                    </span>
                  </h3>
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
                            Status: {STAGE_LABELS[card.stage] ?? card.stage}
                          </p>
                          <p className="mt-1 text-xs text-text-mid">
                            {card.player?.graduation_year
                              ? `Class of ${card.player.graduation_year}`
                              : "Grad year unset"}
                            {card.player?.handicap_index != null
                              ? ` · H.I. ${card.player.handicap_index}`
                              : ""}
                          </p>
                          <p className="mt-2 text-[11px] text-white/45">
                            Next action · Last contact · Assigned coach · Match
                            quality — fields expand with schema
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <select
                              className="rounded-lg border border-white/15 bg-[#0B1220] px-2 py-1 text-xs text-white"
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
                                className="rounded-lg border border-white/15 px-2 py-1 text-xs font-semibold text-[#EC691A]"
                              >
                                View profile
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
      </section>
    </div>
  );
}
