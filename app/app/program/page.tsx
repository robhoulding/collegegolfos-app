"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchCollegeCoachMe,
  type CollegeCoachMe,
} from "@/lib/college-coach-client";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

const SECTIONS = [
  {
    title: "Program overview",
    body: "Institution, association, division, and public program identity.",
  },
  {
    title: "Conference & ranking",
    body: "Conference affiliation and ranking context (connect when data is available).",
  },
  {
    title: "Coaching staff",
    body: "Head coach and assistant coaches for this program.",
  },
  {
    title: "Recruiting philosophy",
    body: "How this staff evaluates fit — academics, scoring, character, development.",
  },
  {
    title: "Program values",
    body: "Culture and standards families should understand.",
  },
  {
    title: "Travel squad & scholarships",
    body: "Travel squad size and scholarship structure for planning.",
  },
  {
    title: "Roster by class",
    body: "Freshmen through graduate — linked to Team membership.",
  },
  {
    title: "Graduating seniors & incoming class",
    body: "Exit class and next class for roster continuity.",
  },
  {
    title: "Recruiting priorities",
    body: "What the staff is hunting this cycle — feeds Find Players.",
  },
] as const;

export default function ProgramPage() {
  const [me, setMe] = useState<CollegeCoachMe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollegeCoachMe()
      .then(setMe)
      .catch(() => setMe(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Program
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          {loading
            ? "Program identity"
            : me?.program?.institution_name ?? "Program identity"}
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          The identity of your golf program — like an academy profile in
          GolfCoachOS. Staff, philosophy, roster shape, and recruiting
          priorities in one place.
        </p>
      </header>

      <section style={osCardSoft}>
        <h2 style={osSectionLabel}>Linked affiliation</h2>
        {me?.program ? (
          <div className="space-y-1 text-sm text-white">
            <p className="text-lg font-bold">{me.program.institution_name}</p>
            <p className="text-text-mid">
              {me.program.association}
              {me.program.division ? ` · ${me.program.division}` : ""} ·{" "}
              {me.program.gender_category}
            </p>
            <p className="text-text-mid">
              Coach: {me.name}
              {me.title ? ` · ${me.title}` : ""}
              {me.verified ? " · Verified" : " · Verification pending"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-text-mid">
            No GolfProgram linked yet.{" "}
            <Link href="/app/settings" className="text-[#EC691A] hover:underline">
              Complete affiliation in Settings
            </Link>
          </p>
        )}
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <article key={section.title} style={osCardSoft}>
            <h2 className="font-semibold text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-text-mid">{section.body}</p>
            <p className="mt-3 text-xs text-white/50">
              Editable fields arrive with program profile schema — shell layout
              only.
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/app/team"
          className="rounded-lg px-3 py-2 text-sm font-bold"
          style={{
            background: "rgba(236,105,26,0.12)",
            border: "1px solid rgba(236,105,26,0.35)",
            color: OS_ORANGE,
          }}
        >
          Open Team →
        </Link>
        <Link
          href="/programs"
          className="rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-text-mid hover:text-white"
        >
          Public program directory
        </Link>
      </div>
    </div>
  );
}
