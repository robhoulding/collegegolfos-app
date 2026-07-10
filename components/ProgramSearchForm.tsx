"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export type ProgramSearchParams = {
  q?: string;
  gender?: string;
  association?: string;
  division?: string;
  state?: string;
  athletic_data_tier?: string;
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

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (gender) params.set("gender", gender);
    if (association) params.set("association", association);
    if (division) params.set("division", division);
    if (state.trim()) params.set("state", state.trim());
    if (athleticDataTier) params.set("athletic_data_tier", athleticDataTier);
    const qs = params.toString();
    router.push(qs ? `/programs?${qs}` : "/programs");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card-surface grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3"
    >
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
    </form>
  );
}
