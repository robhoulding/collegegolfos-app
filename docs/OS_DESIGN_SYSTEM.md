# Shared Operating System design system

Applies to: JuniorGolfOS · GolfCoachOS · GolfAcademyOS · VarsityGolfOS · CollegeGolfOS

## Principles

1. **Today's Briefing** is always the default landing (top-left / first nav item).
2. Navigation follows the same mental model; only the *role* and domain nouns change.
3. Cards, typography, accent orange (`#EC691A`), navy surfaces, and action patterns stay familiar.
4. The **shared player record** never forks — products consume the same GolfCoachOS identity.
5. Intelligence is layered *after* operating workflows are clear.

## Canonical nav order

Target CollegeGolfOS order after Team Practice lands (see [`BUILD_INSTRUCTIONS.md`](./BUILD_INSTRUCTIONS.md) and [`build-prompts/02-TEAM_PRACTICE.md`](./build-prompts/02-TEAM_PRACTICE.md)):

| Slot | CollegeGolfOS | GolfCoachOS (analogy) |
|------|---------------|------------------------|
| 1 | Today's Briefing | Coach / Director Briefing |
| 2 | Team | Players / Roster |
| 3 | Team Practice | Practice / assignments |
| 4 | Player Selection | Competition decisions |
| 5 | Tournaments | Competition / events |
| 6 | Recruiting | (academy Business / pipeline) |
| 7 | Find Players | Library / discovery |
| 8 | Development | Four Pillars / player development |
| 9 | Communication | Messages |
| 10 | Trends | Trends |
| 11 | Program | Academy / program settings |
| 12 | Settings | Settings |

Team Practice is a primary operating area — not buried under Development.

## Tokens

See `lib/os-design-system.ts` in collegegolfos-app (source of truth for Phase Two).
Copy or publish as a shared package when VarsityGolfOS lands.
