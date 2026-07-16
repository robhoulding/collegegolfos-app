"use client";

import { useEffect, useState } from "react";
import {
  fetchCollegeCoachMe,
  type CollegeCoachMe,
} from "@/lib/college-coach-client";

export default function SettingsPage() {
  const [me, setMe] = useState<CollegeCoachMe | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [programId, setProgramId] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollegeCoachMe()
      .then((profile) => {
        setMe(profile);
        setName(profile.name ?? "");
        setTitle(profile.title ?? "");
        setProgramId(profile.golf_program_id ?? "");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not load profile.");
      });
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/college/coach/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title: title || null,
          golf_program_id: programId.trim() || null,
        }),
      });
      const data = (await response.json()) as CollegeCoachMe & { error?: string };
      if (!response.ok) throw new Error(data.error || "Save failed");
      setMe(data);
      setMessage("Program affiliation saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Coach profile and program affiliation. Verification workflow expands
          next — this shell stores the link used across Team and Program.
        </p>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {message}
        </p>
      ) : null}

      <form onSubmit={onSave} className="card-surface max-w-xl space-y-4 p-6">
        <label className="block text-sm">
          <span className="text-text-mid">Display name</span>
          <input
            className="mt-1 w-full rounded-xl border border-white/15 bg-bg-base px-3 py-2 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-text-mid">Title</span>
          <input
            className="mt-1 w-full rounded-xl border border-white/15 bg-bg-base px-3 py-2 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Head Coach, Assistant Coach…"
          />
        </label>
        <label className="block text-sm">
          <span className="text-text-mid">Golf program id</span>
          <input
            className="mt-1 w-full rounded-xl border border-white/15 bg-bg-base px-3 py-2 font-mono text-sm text-white"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            placeholder="From /programs detail URL or API"
          />
        </label>
        {me?.program ? (
          <p className="text-sm text-text-mid">
            Currently linked:{" "}
            <span className="text-white">{me.program.institution_name}</span>
          </p>
        ) : null}
        <p className="text-xs text-text-low">
          Email (permissions key): {me?.email ?? "—"} · Verified:{" "}
          {me?.verified ? "yes" : "no"}
        </p>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save affiliation"}
        </button>
      </form>
    </div>
  );
}
