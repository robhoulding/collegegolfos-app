# Shared Operating System design system

Applies to: JuniorGolfOS · GolfCoachOS · GolfAcademyOS · VarsityGolfOS · CollegeGolfOS

## Principles

1. **Today's Briefing** is always the default landing (top-left / first nav item).
2. Navigation follows the same mental model; only the *role* and domain nouns change.
3. Cards, typography, accent orange (`#EC691A`), navy surfaces, and action patterns stay familiar.
4. The **shared player record** never forks — products consume the same GolfCoachOS identity.
5. Intelligence is layered *after* operating workflows are clear.

## Canonical nav order

| Slot | CollegeGolfOS | GolfCoachOS (analogy) |
|------|---------------|------------------------|
| 1 | Today's Briefing | Coach / Director Briefing |
| 2 | Team | Players / Roster |
| 3 | Recruiting | (academy Business / pipeline) |
| 4 | Player Selection | Competition decisions |
| 5 | Find Players | Library / discovery |
| 6 | Schedule | Calendar |
| 7 | Communication | Messages |
| 8 | Trends | Trends |
| 9 | Settings | Settings |

## Tokens

See `lib/os-design-system.ts` in collegegolfos-app (source of truth for Phase Two).
Copy or publish as a shared package when VarsityGolfOS lands.
