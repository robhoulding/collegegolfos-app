# CollegeGolfOS shell — next schema requirements

This document captures verification findings that must be addressed **before**
Player Selection, Team Intelligence, or other AI layers.

## Roster vs recruiting pipeline (required)

The current `/app/roster` page is a **temporary shell** listing active
`CoachRecruitingPipeline` prospects. It is **not** the college program’s
current team roster.

Required lifecycle (separate from pipeline stage):

1. Prospect (recruiting board)
2. Committed
3. Signed
4. Incoming
5. Active roster
6. Redshirt / inactive
7. Graduated / transferred / departed

Suggested future models (do not invent AI features until these exist):

- `ProgramRosterMembership` — program-scoped, with `status` enum above
- `CoachRecruitingPipelineStageEvent` — stage history for board moves
- Keep `CoachRecruitingPipeline` for recruiting board only

## Permissions today vs needed

| Control | Today | Needed next |
|---------|-------|-------------|
| App `/app/*` | Cookie session middleware | Keep |
| Shared player | Token + invite email match | Keep; tighten invite claim |
| Account create | Any valid email can upsert `CollegeCoachProfile` | Optional: require pending invite or verified .edu |
| Program ACL | Coach-scoped (each coach’s pipeline) | Program-scoped staff roles for shared inbox/board |
| Stage history | Not stored | `StageEvent` table |
| Current roster | Not modeled | `ProgramRosterMembership` |

## Stage history

`CoachRecruitingPipeline` stores only current `stage` + `notes`.
Add append-only history before analytics/intelligence.

## Public directory

`/programs` remains the public search surface and must stay unchanged in
behaviour for indexing and deep links from GolfCoachOS.
