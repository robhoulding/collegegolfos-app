"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  acceptInviteToBoard,
  fetchCoachInbox,
  type InboxInvite,
} from "@/lib/college-coach-client";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

export default function CommunicationPage() {
  const [invites, setInvites] = useState<InboxInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoachInbox();
      setInvites(data.invites ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load inbox.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

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
          Communication
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Communication
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Profile shares, staff notes, and family/player messages. Invite inbox
          is the first connected channel.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section>
        <h2 style={osSectionLabel}>Invite inbox</h2>
        {loading ? (
          <p className="text-sm text-text-mid">Loading…</p>
        ) : invites.length === 0 ? (
          <div style={osCardSoft}>
            <p className="text-sm text-text-mid">
              No invites yet. Players invite your coach email from GolfCoachOS.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {invites.map((invite) => (
              <li key={invite.id} style={osCardSoft}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{invite.player_name}</p>
                    <p className="mt-1 text-sm text-text-mid">
                      {invite.school_program ?? "School unset"} ·{" "}
                      {invite.on_board ? "On board" : "New share"} · Views{" "}
                      {invite.view_count}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/app/players/${encodeURIComponent(invite.access_token)}`}
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-[#EC691A]"
                    >
                      View profile
                    </Link>
                    {!invite.on_board ? (
                      <button
                        type="button"
                        disabled={busyId === invite.id}
                        onClick={() => void onAccept(invite)}
                        className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
                        style={{ background: OS_ORANGE }}
                      >
                        {busyId === invite.id ? "Adding…" : "Add to recruiting"}
                      </button>
                    ) : (
                      <Link
                        href="/app/recruiting"
                        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-text-mid"
                      >
                        Open board
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Staff messaging</h2>
        <p className="text-sm text-text-mid">
          Assistant coach notes and internal threads will surface here and on
          Today’s Briefing priorities — without making inbox the default landing
          focus.
        </p>
      </section>
    </div>
  );
}
