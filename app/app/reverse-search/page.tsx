"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

/**
 * Reverse Search — describe ideal recruit, interpret criteria, then search.
 * Never opaque AI: always show editable interpreted criteria + match reasons.
 */
export default function ReverseSearchPage() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [criteria, setCriteria] = useState<string[]>([]);

  const example =
    "We need a 2028 female player with strong academics, improving tournament results, excellent practice habits and driver speed above 100 mph.";

  function interpret(text: string): string[] {
    const out: string[] = [];
    const t = text.toLowerCase();
    const year = text.match(/20\d{2}/)?.[0];
    if (year) out.push(`Graduation year: ${year}`);
    if (/\bfemale\b|\bwomen'?s\b/.test(t)) out.push("Gender: female / women’s program fit");
    if (/\bmale\b|\bmen'?s\b/.test(t)) out.push("Gender: male / men’s program fit");
    if (/academic/.test(t)) out.push("Academics: strong academic profile required");
    if (/improv/.test(t) || /tournament/.test(t))
      out.push("Performance: improving tournament results");
    if (/practice/.test(t)) out.push("Habits: excellent practice habits");
    if (/100\s*mph|driver/.test(t)) out.push("Physical: driver speed above 100 mph");
    if (out.length === 0 && text.trim()) {
      out.push(`Free-text intent: ${text.trim().slice(0, 160)}`);
    }
    return out;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = interpret(prompt);
    setCriteria(parsed);
    setSubmitted(true);
  }

  const canSearch = submitted && criteria.length > 0;

  const editableList = useMemo(() => criteria, [criteria]);

  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Reverse Search
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Describe your ideal recruit
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          We turn your description into editable criteria, then search. Every
          match must explain why — no opaque AI results.
        </p>
      </header>

      <form onSubmit={onSubmit} style={osCardSoft} className="space-y-4">
        <label className="block text-sm text-text-mid">
          Ideal recruit description
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder={example}
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#0B1220] px-4 py-3 text-base text-white outline-none focus:border-[rgba(236,105,26,0.5)]"
          />
        </label>
        <button
          type="button"
          className="text-sm text-[#EC691A] hover:underline"
          onClick={() => setPrompt(example)}
        >
          Use example description
        </button>
        <div>
          <button
            type="submit"
            className="rounded-lg px-4 py-2.5 text-sm font-extrabold text-white"
            style={{ background: OS_ORANGE }}
          >
            Interpret criteria
          </button>
        </div>
      </form>

      {submitted ? (
        <section style={osCardSoft}>
          <h2 style={osSectionLabel}>Interpreted criteria</h2>
          <p className="mb-3 text-sm text-text-mid">
            Edit before searching. Remove anything that should not constrain
            results.
          </p>
          <ul className="space-y-2">
            {editableList.map((line, index) => (
              <li key={`${line}-${index}`} className="flex gap-2">
                <input
                  value={line}
                  onChange={(e) => {
                    const next = [...criteria];
                    next[index] = e.target.value;
                    setCriteria(next);
                  }}
                  className="flex-1 rounded-lg border border-white/15 bg-[#0B1220] px-3 py-2 text-sm text-white"
                />
                <button
                  type="button"
                  className="rounded-lg border border-white/15 px-2 text-xs text-text-mid"
                  onClick={() =>
                    setCriteria(criteria.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={!canSearch}
            className="mt-4 rounded-lg px-4 py-2.5 text-sm font-extrabold text-white disabled:opacity-50"
            style={{ background: OS_ORANGE }}
            onClick={() => {
              window.alert(
                "Player discovery index is not connected yet. Criteria are ready for transparent search when the index ships.",
              );
            }}
          >
            Search with these criteria
          </button>
          <p className="mt-3 text-xs text-text-low">
            Result cards will include: Why this player matched + Possible missing
            information for each row.
          </p>
        </section>
      ) : null}

      <p className="text-sm text-text-mid">
        <Link href="/app/find-players" className="text-[#EC691A] hover:underline">
          ← Back to Find Players
        </Link>
      </p>
    </div>
  );
}
