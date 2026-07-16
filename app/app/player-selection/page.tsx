"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  fetchPipeline,
  type PipelineCard,
} from "@/lib/college-coach-client";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

/**
 * Signature coaching workflow: who should compete.
 * Coach always makes the final decision — no AI auto-select.
 */
export default function PlayerSelectionPage() {
  const [cards, setCards] = useState<PipelineCard[]>([]);
  const [tournament, setTournament] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [decisionNote, setDecisionNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPipeline()
      .then((data) => {
        setCards(
          (data.cards ?? []).filter((c) =>
            ["evaluating", "offer", "committed", "watching"].includes(c.stage),
          ),
        );
      })
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  }, []);

  const selectedCards = useMemo(
    () => cards.filter((c) => selected.has(c.id)),
    [cards, selected],
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Player Selection
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Who should compete
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Select tournament → choose players → compare evidence → record the
          staff decision. AI never makes the final call.
        </p>
      </header>

      <ol className="grid gap-3 md:grid-cols-4">
        {[
          "1. Select tournament",
          "2. Choose players",
          "3. Compare evidence",
          "4. Record decision",
        ].map((step) => (
          <li key={step} style={osCardSoft} className="text-sm font-semibold text-white">
            {step}
          </li>
        ))}
      </ol>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Select tournament</h2>
        <input
          value={tournament}
          onChange={(e) => setTournament(e.target.value)}
          placeholder="e.g. Conference opener — Travel roster due Friday"
          className="mt-1 w-full rounded-xl border border-white/15 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-[rgba(236,105,26,0.5)]"
        />
        <p className="mt-2 text-xs text-text-low">
          Live tournament calendar connects when Schedule is wired.
        </p>
      </section>

      <section>
        <h2 style={osSectionLabel}>Choose players</h2>
        {loading ? (
          <p className="text-sm text-text-mid">Loading candidates…</p>
        ) : cards.length === 0 ? (
          <div style={osCardSoft}>
            <p className="text-sm text-text-mid">
              No evaluating / committed candidates yet. Add recruits on{" "}
              <Link href="/app/recruiting" className="text-[#EC691A] hover:underline">
                Recruiting
              </Link>{" "}
              or load Team membership once roster schema lands.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {cards.map((card) => {
              const name = card.player
                ? `${card.player.first_name} ${card.player.last_name}`
                : "Unknown";
              const on = selected.has(card.id);
              return (
                <li key={card.id}>
                  <button
                    type="button"
                    onClick={() => toggle(card.id)}
                    className="w-full text-left"
                    style={{
                      ...osCardSoft,
                      borderColor: on
                        ? "rgba(236,105,26,0.45)"
                        : "rgba(255,255,255,0.10)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-white">{name}</p>
                        <p className="mt-1 text-xs text-text-mid">
                          {card.stage} · Grad {card.player?.graduation_year ?? "—"} ·
                          H.I. {card.player?.handicap_index ?? "—"}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          color: on ? OS_ORANGE : "rgba(255,255,255,0.5)",
                          border: `1px solid ${on ? "rgba(236,105,26,0.45)" : "rgba(255,255,255,0.15)"}`,
                        }}
                      >
                        {on ? "Selected" : "Select"}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Compare & decide</h2>
        <p className="text-sm text-text-mid">
          Selected:{" "}
          <strong className="text-white">{selectedCards.length}</strong>
          {tournament ? (
            <>
              {" "}
              for <strong className="text-white">{tournament}</strong>
            </>
          ) : null}
        </p>
        <ul className="mt-3 space-y-1 text-sm text-white">
          {selectedCards.map((c) => (
            <li key={c.id}>
              {c.player
                ? `${c.player.first_name} ${c.player.last_name}`
                : "Unknown"}
            </li>
          ))}
        </ul>
        <textarea
          value={decisionNote}
          onChange={(e) => setDecisionNote(e.target.value)}
          rows={3}
          placeholder="Staff decision notes (coach decides — never auto-finalized)"
          className="mt-4 w-full rounded-xl border border-white/15 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-[rgba(236,105,26,0.5)]"
        />
        <button
          type="button"
          className="mt-3 rounded-lg px-4 py-2.5 text-sm font-extrabold text-white opacity-80"
          style={{ background: OS_ORANGE }}
          onClick={() => {
            window.alert(
              "Decision log will persist when selection events are schema-backed. Your note stays local for now.",
            );
          }}
        >
          Record final decision
        </button>
        <p className="mt-2 text-xs text-text-low">
          Guardrail: no automated travel roster. The coaching staff confirms
          every lineup.
        </p>
      </section>
    </div>
  );
}
