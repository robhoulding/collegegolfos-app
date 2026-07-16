"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  MATCH_DIMENSIONS,
  type MatchDimensionKey,
} from "@/lib/match-dimensions";
import { cn } from "@/lib/utils";

export type ProgramSearchParams = {
  q?: string;
  gender?: string;
  association?: string;
  division?: string;
  state?: string;
  athletic_data_tier?: string;
  major?: string;
  public_private?: string;
  max_net_cost?: string;
  campus_vibe?: string;
  match_priority?: string;
};

type Props = {
  initial: ProgramSearchParams;
};

export function ProgramSearchForm({ initial }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q ?? "");
  const [gender, setGender] = useState(initial.gender ?? "");
  const [association, setAssociation] = useState(initial.association ?? "");
  const [division, setDivision] = useState(initial.division ?? "");
  const [state, setState] = useState(initial.state ?? "");
  const [athleticDataTier, setAthleticDataTier] = useState(
    initial.athletic_data_tier ?? "",
  );
  const [major, setMajor] = useState(initial.major ?? "");
  const [publicPrivate, setPublicPrivate] = useState(initial.public_private ?? "");
  const [maxNetCost, setMaxNetCost] = useState(initial.max_net_cost ?? "");
  const [matchPriority, setMatchPriority] = useState(
    initial.match_priority ?? "",
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (gender) params.set("gender", gender);
    if (association) params.set("association", association);
    if (division) params.set("division", division);
    if (state.trim()) params.set("state", state.trim());
    if (athleticDataTier) params.set("athletic_data_tier", athleticDataTier);
    if (major.trim()) params.set("major", major.trim());
    if (publicPrivate) params.set("public_private", publicPrivate);
    if (maxNetCost.trim()) params.set("max_net_cost", maxNetCost.trim());
    if (matchPriority) params.set("match_priority", matchPriority);
    const qs = params.toString();
    router.push(qs ? `/programs?${qs}` : "/programs");
  }

  const activeDimension = MATCH_DIMENSIONS.find((d) => d.key === matchPriority);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="card-surface p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">
          Match priorities
        </p>
        <p className="mt-1 text-sm text-text-mid">
          What matters most right now? Results sort to emphasize that dimension
          until personalized match scores launch.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {MATCH_DIMENSIONS.map((dim) => {
            const active = matchPriority === dim.key;
            return (
              <button
                key={dim.key}
                type="button"
                onClick={() =>
                  setMatchPriority(active ? "" : (dim.key as MatchDimensionKey))
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200"
                    : "border-white/10 text-text-mid hover:border-white/20 hover:text-white",
                )}
              >
                {dim.shortLabel}
              </button>
            );
          })}
        </div>
        {activeDimension ? (
          <p className="mt-3 text-xs text-text-low">{activeDimension.description}</p>
        ) : null}
      </div>

      <div className="card-surface grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
        <label className="block md:col-span-2 lg:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            School name
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search institutions…"
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Program
          </span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white"
          >
            <option value="">All</option>
            <option value="men">Men&apos;s</option>
            <option value="women">Women&apos;s</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Association
          </span>
          <select
            value={association}
            onChange={(e) => setAssociation(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white"
          >
            <option value="">All</option>
            <option value="NCAA">NCAA</option>
            <option value="NAIA">NAIA</option>
            <option value="NJCAA">NJCAA</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Division
          </span>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white"
          >
            <option value="">All</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            State / province
          </span>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. CA"
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Intended major
          </span>
          <input
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="e.g. Business"
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            School type
          </span>
          <select
            value={publicPrivate}
            onChange={(e) => setPublicPrivate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white"
          >
            <option value="">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Max net cost / year
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={maxNetCost}
            onChange={(e) => setMaxNetCost(e.target.value)}
            placeholder="e.g. 35000"
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-low">
            Athletic data
          </span>
          <select
            value={athleticDataTier}
            onChange={(e) => setAthleticDataTier(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-bg-base px-3 py-2 text-sm text-white"
          >
            <option value="">All</option>
            <option value="high_confidence">High confidence only</option>
            <option value="limited_match_data">Limited data</option>
          </select>
        </label>

        <div className="flex items-end md:col-span-2 lg:col-span-3">
          <button type="submit" className="btn-primary px-6 py-2.5 text-sm">
            Search programs
          </button>
        </div>
      </div>
    </form>
  );
}
