# CollegeGolfOS

College coach recruiting hub for the **GolfCoachOS ecosystem**.

- **Domain:** [collegegolfos.com](https://collegegolfos.com)
- **Sibling sites:** [GolfCoachOS](https://golfcoachos.com) · JuniorGolfOS · GolfAcademyOS · [VarsityGolfOS](https://www.varsitygolfos.com) · CollegeGolfOS
- **API (shared):** `golfcoachos-api` on Vercel

## Status

**Product shell (pre-AI).** Public program search remains live. College coaches can:

| Area | Route | Notes |
|------|-------|--------|
| Sign in | `/sign-in` | Email upsert → `CollegeCoachProfile` |
| Overview | `/app` | Shell checklist + counts |
| Invite inbox | `/app/inbox` | `PlayerRecruiterAccess` by coach email |
| Recruiting board | `/app/board` | `CoachRecruitingPipeline` stages |
| Roster | `/app/roster` | Active board players + program context |
| Shared player | `/app/players/[token]` | Same recruiter-view API, email-gated |
| Program link | `/app/settings` | `golf_program_id` affiliation |
| Program search | `/programs` | Directory (unchanged) |

Intelligence / match scoring is intentionally **not** populated yet.

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires `BASE44_SHARED_SECRET` in `.env.local` (same value as golfcoachos-api).

## Architecture rules

1. **One shared player record** — `PlayerProfile` in golfcoachos-api (no CollegeGolfOS player DB).
2. **Invite-only access** — no cold player search in v1.
3. **Permissions** — cookie session + email must match invite `coach_email`.
4. **Search connection** — program directory search is the public search surface.
5. **Roster ≠ junior coach roster** — college roster = recruiting pipeline + program affiliation.

## Deploy (Vercel)

1. Push `collegegolfos-app` and `golfcoachos-api` college coach routes.
2. Ensure college schema is applied (health: `college_schema: true`).
3. Domain `collegegolfos.com` (+ `www`).
