"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchCollegeBriefing,
  type CollegeBriefing,
} from "@/lib/college-briefing-api";
import {
  OS_EMERALD,
  OS_GOLD,
  OS_ORANGE,
  OS_SURFACE,
  osCardPrimary,
  osCardSoft,
  osSectionLabel,
} from "@/lib/os-design-system";

const DEST: Record<string, string> = {
  recruiting: "/app/recruiting",
  team: "/app/team",
  "player-selection": "/app/player-selection",
  "find-players": "/app/find-players",
  schedule: "/app/schedule",
  communication: "/app/communication",
  trends: "/app/trends",
  settings: "/app/settings",
  program: "/app/program",
};

function urgencyColor(urgency: string): string {
  if (urgency === "high") return OS_ORANGE;
  if (urgency === "medium") return OS_GOLD;
  return OS_EMERALD;
}

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ActionLink({
  destination,
  label,
}: {
  destination: string;
  label: string;
}) {
  const href = DEST[destination] ?? "/app";
  return (
    <Link
      href={href}
      className="inline-flex rounded-lg px-3 py-2 text-sm font-bold"
      style={{
        background: "rgba(236,105,26,0.12)",
        border: "1px solid rgba(236,105,26,0.35)",
        color: OS_ORANGE,
      }}
    >
      {label}
    </Link>
  );
}

export function CollegeBriefingSection() {
  const [briefing, setBriefing] = useState<CollegeBriefing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setBriefing(await fetchCollegeBriefing());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load briefing.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading && !briefing) {
    return (
      <div className="flex justify-center py-16 text-sm text-[#EC691A]">
        Loading briefing…
      </div>
    );
  }

  return (
    <div className="space-y-6" style={{ maxWidth: 1100 }}>
      <header
        style={{
          ...osCardPrimary,
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <span
              className="inline-flex size-9 items-center justify-center rounded-[10px] text-lg font-bold"
              style={{
                background: "rgba(236,105,26,0.12)",
                border: "1px solid rgba(236,105,26,0.35)",
                color: OS_ORANGE,
              }}
              aria-hidden
            >
              ★
            </span>
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
              Today’s Briefing
            </h1>
          </div>
          <p className="max-w-2xl text-sm text-white/80">
            What deserves attention, what decision needs to be made, and what to
            do next — for your college golf program.
          </p>
          {briefing ? (
            <p className="mt-3 text-xs text-white/70">
              {briefing.coach_name}
              {briefing.program_status.program_name
                ? ` · ${briefing.program_status.program_name}`
                : ""}{" "}
              · Last refreshed {formatTime(briefing.generated_at)}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-extrabold text-white"
          style={{ background: OS_ORANGE }}
        >
          {loading ? "Refreshing…" : null}
          Refresh Briefing
        </button>
      </header>

      {error ? (
        <div
          role="alert"
          style={{
            ...osCardSoft,
            borderColor: "rgba(248,113,113,0.35)",
            background: "rgba(127,29,29,0.25)",
          }}
        >
          <p className="text-sm text-red-100">{error}</p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-3 rounded-lg px-3 py-2 text-sm font-bold text-white"
            style={{ background: OS_ORANGE }}
          >
            Retry Briefing
          </button>
        </div>
      ) : null}

      {briefing ? (
        <>
          <section>
            <h2 style={osSectionLabel}>Program status</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  label: "Current roster",
                  value: briefing.program_status.roster_note,
                  href: "/app/team",
                },
                {
                  label: "Available players",
                  value: briefing.program_status.available_note,
                  href: "/app/team",
                },
                {
                  label: "Upcoming tournament",
                  value: briefing.program_status.tournament_note,
                  href: "/app/schedule",
                },
                {
                  label: "Recruiting pipeline",
                  value: `${briefing.program_status.pipeline_count} active`,
                  href: "/app/recruiting",
                },
                {
                  label: "Today’s priorities",
                  value: `${briefing.priorities.length} focus item${briefing.priorities.length === 1 ? "" : "s"}`,
                  href: "#priorities",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={osCardSoft}
                  className="block transition hover:border-[rgba(236,105,26,0.35)]"
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/60">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-white">
                    {item.value}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section id="priorities">
            <h2 style={osSectionLabel}>Today’s priorities</h2>
            {briefing.priorities.length === 0 ? (
              <div style={osCardSoft}>
                <p className="text-sm text-white/80">
                  No urgent coaching priorities were identified from the
                  available evidence.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-3">
                {briefing.priorities.map((p, i) => (
                  <article
                    key={p.id}
                    style={{
                      ...osCardSoft,
                      borderTop: `3px solid ${urgencyColor(p.urgency)}`,
                      background: OS_SURFACE,
                    }}
                    className="flex flex-col gap-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
                        style={{
                          color: OS_ORANGE,
                          background: "rgba(236,105,26,0.12)",
                          border: "1px solid rgba(236,105,26,0.35)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p
                          className="text-[11px] font-extrabold uppercase tracking-[0.06em]"
                          style={{ color: urgencyColor(p.urgency) }}
                        >
                          {p.urgency} priority
                        </p>
                        <h3 className="text-base font-extrabold text-white">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white/55">
                        Evidence
                      </p>
                      <p className="mt-1 text-sm text-white">{p.evidence}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white/55">
                        Why it matters
                      </p>
                      <p className="mt-1 text-sm text-white">{p.why_it_matters}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white/55">
                        Recommended action
                      </p>
                      <p className="mt-1 mb-2 text-sm text-white">{p.action}</p>
                      <ActionLink destination={p.destination} label="Open →" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 style={osSectionLabel}>Positive momentum</h2>
            <div style={osCardSoft}>
              {briefing.positive_momentum.length === 0 ? (
                <p className="text-sm text-white/80">
                  No verified positive momentum signals are available yet.
                </p>
              ) : (
                <ul className="space-y-2 text-sm text-white">
                  {briefing.positive_momentum.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span className="text-white/70"> — {item.evidence}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section>
              <h2 style={osSectionLabel}>Recruiting activity</h2>
              <div style={osCardSoft}>
                {briefing.recruiting_activity.length === 0 ? (
                  <p className="text-sm text-white/80">
                    No recruiting activity signals yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {briefing.recruiting_activity.map((item) => (
                      <li
                        key={item.title}
                        className="flex flex-wrap items-start justify-between gap-2"
                      >
                        <div>
                          <p className="font-bold text-white">{item.title}</p>
                          <p className="text-sm text-white/70">{item.evidence}</p>
                        </div>
                        <ActionLink
                          destination={item.destination}
                          label="View"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section>
              <h2 style={osSectionLabel}>Upcoming events</h2>
              <div style={osCardSoft}>
                <ul className="space-y-3">
                  {briefing.upcoming_events.map((item) => (
                    <li key={item.title}>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-sm text-white/70">{item.context}</p>
                      {item.destination ? (
                        <div className="mt-2">
                          <ActionLink
                            destination={item.destination}
                            label="Open schedule"
                          />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-white/55">
                  Event types: Practice · Qualifying · Tournament · Campus Visit
                  · Recruit Visit · Travel
                </p>
              </div>
            </section>
          </div>

          <section>
            <h2 style={osSectionLabel}>Data gaps</h2>
            <div style={osCardSoft}>
              <ul className="list-disc space-y-2 pl-5 text-sm text-white/75">
                {briefing.data_gaps.map((gap) => (
                  <li key={gap.label}>
                    <strong className="text-white">{gap.label}</strong> —{" "}
                    {gap.explanation}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
