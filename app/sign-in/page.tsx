"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signInCollegeCoach } from "@/lib/college-coach-client";
import { LINKS } from "@/lib/links";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/app";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInCollegeCoach({ email, name: name || undefined });
      router.push(next.startsWith("/") ? next : "/app");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-5 py-16 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
        College coach
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        Sign in
      </h1>
      <p className="mt-3 text-text-mid">
        Use the same email juniors invite you with. This opens your CollegeGolfOS
        Coach Workspace — Today’s Briefing, Team, Recruiting, and shared player
        records.
      </p>

      <form onSubmit={onSubmit} className="card-surface mt-8 space-y-4 p-6">
        <label className="block text-sm">
          <span className="text-text-mid">Work email</span>
          <input
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-white/15 bg-bg-base px-3 py-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-text-mid">Name (optional)</span>
          <input
            className="mt-1 w-full rounded-xl border border-white/15 bg-bg-base px-3 py-2 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full px-4 py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Enter workspace"}
        </button>
      </form>

      <p className="mt-6 text-sm text-text-mid">
        <Link href={LINKS.home} className="text-emerald-400 hover:underline">
          ← Home
        </Link>
        {" · "}
        <Link href={LINKS.programs} className="hover:text-white">
          Program search
        </Link>
      </p>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="px-5 py-16 text-text-mid">Loading…</main>}>
      <SignInForm />
    </Suspense>
  );
}
