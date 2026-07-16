"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  acceptInviteToBoard,
  fetchCoachInbox,
  type InboxInvite,
} from "@/lib/college-coach-client";

export default function InboxPage() {
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
        <h1 className="font-display text-3xl font-bold text-white">
          Invite inbox
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Players who invited your coach email via GolfCoachOS. Accepting adds
          them to your recruiting board and keeps the shared player record
          linked.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-text-mid">Loading invites…</p>
      ) : invites.length === 0 ? (
        <div className="card-surface p-6 text-sm text-text-mid">
          No active invites for your email yet. When a junior invites you from
          GolfCoachOS, the shared player record appears here — not via cold
          search.
        </div>
      ) : (
        <ul className="space-y-3">
          {invites.map((invite) => (
            <li
              key={invite.id}
              className="card-surface flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="font-semibold text-white">{invite.player_name}</p>
                <p className="mt-1 text-sm text-text-mid">
                  {invite.school_program || "Program not specified"}
                  {invite.on_board ? " · Already on board" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/app/players/${encodeURIComponent(invite.access_token)}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-emerald-400/40"
                >
                  Open shared record
                </Link>
                {!invite.on_board ? (
                  <button
                    type="button"
                    disabled={busyId === invite.id}
                    onClick={() => void onAccept(invite)}
                    className="btn-primary px-4 py-2 text-sm disabled:opacity-60"
                  >
                    {busyId === invite.id ? "Adding…" : "Add to board"}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
