# CollegeGolfOS Build Instructions

Canonical product/build prompts for CollegeGolfOS Coach Workspace evolution.

Use these documents as Cursor build prompts. Implement in order unless a later prompt explicitly supersedes an earlier navigation or architecture decision.

| # | Document | Status |
|---|----------|--------|
| 1 | [Phase Two — Coach Workspace](./build-prompts/01-PHASE_TWO_COACH_WORKSPACE.md) | Implemented (shell) |
| 2 | [Team Practice, Workouts & Individual Development](./build-prompts/02-TEAM_PRACTICE.md) | Next build pass |
| 3 | [Nutrition Readiness™ (Physical Pillar)](./build-prompts/03-NUTRITION_READINESS.md) | Shared module — scaffold when Physical Pillar lands |

## Non-negotiables (all phases)

1. **One shared player record** — `PlayerProfile` via `golfcoachos-api`. No CollegeGolfOS player DB.
2. **Reuse GolfCoachOS practice, drill, schedule, Four Pillars, and evaluation logic** wherever possible.
3. **No duplicate drill library** or disconnected college-only practice database unless the existing structure cannot support team sessions.
4. **Coach retains final control** over practice plans and player-selection decisions.
5. **No raw AI in the UI.** Intelligence is layered after workflows and normalized data contracts exist.
6. **Coaching in Context™** — every screen answers: what deserves attention, what decision is needed, what to do next.

## Current Coach Workspace navigation (target)

After Team Practice lands, primary nav order is:

1. Today’s Briefing  
2. Team  
3. Team Practice  
4. Player Selection  
5. Tournaments  
6. Recruiting  
7. Find Players  
8. Development  
9. Communication  
10. Trends  
11. Program  
12. Settings  

Team Practice is a primary operating area — not buried under Development.

## Related docs

- [`OS_DESIGN_SYSTEM.md`](./OS_DESIGN_SYSTEM.md) — shared OS tokens and nav philosophy  
- [`SHELL_NEXT_SCHEMA.md`](./SHELL_NEXT_SCHEMA.md) — schema notes for the shell  
