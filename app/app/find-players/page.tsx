"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

const SUGGESTED = [
  "2028 players with improving scoring average",
  "Strong academics + verified GolfCoachOS profile",
  "Female recruits with driver speed 100+ mph",
  "In-state juniors open to campus visits",
];

const RECENT = [
  "Class of 2027 · Mid-Atlantic · H.I. under 2",
  "Committed-open · Tournament volume 8+",
];

/**
 * Find Players — coach-facing recruit discovery UX.
 * Transparent criteria only; no opaque AI search.
 */
export default function FindPlayersPage() {
  const [q, setQ] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [location, setLocation] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const interpreted = useMemo(() => {
    const parts: string[] = [];
    if (q.trim()) parts.push(`Keywords: ${q.trim()}`);
    if (gradYear) parts.push(`Graduation year: ${gradYear}`);
    if (location.trim()) parts.push(`Location: ${location.trim()}`);
    if (verifiedOnly) parts.push("Verified / shared GolfCoachOS profile preferred");
    return parts;
  }, [q, gradYear, location, verifiedOnly]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: OS_ORANGE }}
          >
            Find Players
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">
            Find players
          </h1>
          <p className="mt-2 max-w-2xl text-text-mid">
            Structured filters, saved recruiting profiles, and transparent match
            reasons. Reverse Search explains every criterion before results.
          </p>
        </div>
        <Link
          href="/app/reverse-search"
          className="rounded-lg px-4 py-2.5 text-sm font-extrabold text-white"
          style={{ background: OS_ORANGE }}
        >
          Reverse Search →
        </Link>
      </header>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Search</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, school, coach, or keywords"
          className="w-full rounded-xl border border-white/15 bg-[#0B1220] px-4 py-3.5 text-base text-white outline-none focus:border-[rgba(236,105,26,0.5)]"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-sm text-text-mid">
            Grad year
            <input
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              placeholder="2028"
              className="mt-1 w-full rounded-lg border border-white/15 bg-[#0B1220] px-3 py-2 text-white"
            />
          </label>
          <label className="text-sm text-text-mid">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="State / region"
              className="mt-1 w-full rounded-lg border border-white/15 bg-[#0B1220] px-3 py-2 text-white"
            />
          </label>
          <label className="mt-6 flex items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />
            Verified shared profiles only
          </label>
        </div>
        {interpreted.length > 0 ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/80">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/50">
              Interpreted criteria
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {interpreted.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="mt-4 text-sm text-text-mid">
          Player discovery index is not connected yet. Use invites + board today;
          this shell is ready for transparent search results cards (photo, grad
          year, average, trend, verified status, why matched, missing info).
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section style={osCardSoft}>
          <h2 style={osSectionLabel}>Suggested searches</h2>
          <ul className="space-y-2">
            {SUGGESTED.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setQ(s)}
                  className="text-left text-sm text-[#EC691A] hover:underline"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section style={osCardSoft}>
          <h2 style={osSectionLabel}>Recent & saved profiles</h2>
          <ul className="space-y-2 text-sm text-text-mid">
            {RECENT.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-text-low">
            Saved recruiting profiles persist when coach preference storage lands.
          </p>
        </section>
      </div>

      <section>
        <h2 style={osSectionLabel}>Result card contract</h2>
        <article style={osCardSoft} className="max-w-xl">
          <div className="flex gap-4">
            <div className="size-16 shrink-0 rounded-xl bg-white/10" />
            <div>
              <p className="font-bold text-white">Player name</p>
              <p className="text-sm text-text-mid">
                Grad year · Location · Current average · Trend
              </p>
              <p className="mt-1 text-xs text-[#EC691A]">
                Verified · Coach · Shared profile status
              </p>
              <p className="mt-2 text-sm text-white">
                Why this player matched — explicit criteria only
              </p>
              <p className="mt-1 text-xs text-text-low">
                Possible missing information listed honestly
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg border border-white/15 px-2 py-1 text-xs text-text-mid">
                  View profile
                </span>
                <span className="rounded-lg border border-white/15 px-2 py-1 text-xs text-text-mid">
                  Add to recruiting board
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
