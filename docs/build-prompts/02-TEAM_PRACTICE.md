# CollegeGolfOS Additional Build Prompt

## Team Practice, Workouts and Individual Development

The current CollegeGolfOS architecture correctly includes recruiting, roster management, player selection and team operations.

One essential college-program workflow is still missing:

**Team Practice.**

College golf practice is not simply twelve individual players completing separate assignments.

College programs operate through:

- shared team practice
- group workouts
- competitive games
- qualifying
- team standards
- tournament preparation
- structured weekly schedules
- individual development inside the team environment

CollegeGolfOS must support both:

1. Team performance and culture
2. Individual player development

This is not a secondary feature.

Team Practice should become a major operating area within CollegeGolfOS.

---

## IMPORTANT

Before building:

1. Inspect the existing schedule, practice, drill-library, physical, tournament, player-development and communication architecture.
2. Reuse existing GolfCoachOS practice entities, drills, player priorities, Four Pillars, scheduling and evaluation logic wherever possible.
3. Do not create a disconnected college-only practice database unless the existing structure cannot support team sessions.
4. Preserve individual player histories.
5. Extend the architecture to support team, group and individual layers inside the same practice session.

---

## NAVIGATION UPDATE

Update the CollegeGolfOS Coach Workspace navigation to:

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

Team Practice should not be buried inside Development.

It is a central daily workflow for a college coaching staff.

---

## CORE PRACTICE MODEL

Every college team-practice session should support three connected levels:

### TEAM OBJECTIVE

What the entire team must improve or prepare for.

Examples:

- tournament preparation
- wedge scoring
- driving under pressure
- course management
- wind performance
- match-play preparation
- competitive resilience
- putting under consequence
- short-game conversion
- recovery after competition

### TRAINING GROUPS

How the team is divided during the session.

Examples:

- travel squad
- development group
- qualifying group
- short-game priority
- wedge-control priority
- putting priority
- freshmen
- upperclassmen
- players returning from competition
- players with individual modifications

### INDIVIDUAL PRIORITY

What each player specifically needs to improve inside the shared team session.

Examples:

- improve 70–90 yard proximity
- improve driver start-line control
- improve reset routine after a poor shot
- improve putting speed control
- improve decision-making from rough
- maintain physical modification
- rehearse tournament-specific strategy

The architecture should allow one shared team session to contain different individual objectives.

---

## TEAM PRACTICE PAGE

Create a dedicated Team Practice workspace with the following primary views:

1. Weekly Plan
2. Practice Builder
3. Practice Library
4. Competitive Games
5. Player Assignments
6. Practice Results
7. Team Trends

---

## WEEKLY PLAN

Create a visual weekly planning experience.

The coach should be able to schedule:

- team practice
- individual practice
- strength workout
- mobility or recovery session
- qualifying
- practice round
- team meeting
- film or strategy review
- travel
- tournament
- academic block
- player review

Support calendar and list views.

Each event should show:

- date
- time
- location
- event type
- staff owner
- participating players
- team or individual designation
- status
- preparation requirements

Allow coaches to build a complete weekly team-performance plan rather than isolated calendar events.

---

## PRACTICE BUILDER

Create a structured Team Practice Builder.

The coach should define:

### SESSION BASICS

- title
- date
- duration
- location
- coach responsible
- participating players
- team objective
- upcoming tournament connection
- available facilities
- weather or indoor context
- intensity
- whether the session influences player selection

### SESSION BLOCKS

Allow the coach to assemble blocks such as:

- physical warm-up
- technical preparation
- team skill block
- station work
- competitive game
- qualifying component
- individual-priority block
- course-management scenario
- pressure-performance block
- cooldown
- team review

Each block should include:

- duration
- objective
- instructions
- assigned players or groups
- scoring method
- success standard
- required equipment
- coach responsible
- evidence captured

Use drag-and-drop ordering if it fits the existing UI system.

Do not require drag-and-drop if a simpler structured builder is more reliable.

### PRACTICE TEMPLATE EXAMPLE

Team Objective:  
Improve wedge scoring from 60–110 yards.

Session:

1. Dynamic warm-up — 10 minutes
2. Team distance-calibration block — 20 minutes
3. Three rotating wedge stations — 30 minutes
4. Partner competitive game — 25 minutes
5. Individual priority block — 20 minutes
6. Pressure finish — 10 minutes
7. Team review — 5 minutes

Each player may have a different target within the same session.

---

## TRAINING GROUPS

Allow coaches to create temporary and saved practice groups.

Examples:

- Travel Team
- Qualifying Group
- Development Group
- Wedge Group
- Putting Group
- Speed Group
- Recovery Group
- Freshmen
- Upperclassmen

A player may belong to different groups across different sessions.

Do not permanently label players by weakness.

Group names and membership should be coach-controlled.

---

## PLAYER ASSIGNMENTS

Within each team practice, allow individualized overlays.

Each player assignment may include:

- current development priority
- assigned practice station
- measurable target
- technical or tactical cue
- mental routine priority
- physical modification
- coach note
- required reflection
- evidence source
- follow-up date

The player should see only their own assignment and team-visible session content.

They should not see private comparisons or staff-only evaluation notes.

---

## COMPETITIVE GAMES

Create a dedicated Competitive Games library.

Support formats such as:

- individual points
- partner competition
- team versus team
- match play
- stroke play
- best ball
- alternate shot
- worst-ball scramble
- pressure ladder
- consequence putting
- up-and-down challenge
- wedge combine
- fairways-and-greens challenge
- target-zone competition
- travel-team points
- beat-the-standard challenge

Each game should define:

- objective
- number of players
- group structure
- duration
- scoring method
- success standard
- tie-break process
- whether the result affects qualifying or selection
- required data capture

Not every game should influence selection.

Require the coach to designate this before the session.

---

## PRACTICE LIBRARY

Reuse the GolfCoachOS drill and practice library where possible.

Extend it with college-specific filters:

- team
- group
- individual
- skill category
- mental
- physical
- performance
- tournament preparation
- qualifying
- competitive game
- indoor
- outdoor
- course access
- limited facility
- time available
- number of players

Allow coaches to save:

- single drills
- practice blocks
- full team sessions
- weekly practice templates

---

## TEAM PRACTICE RESULTS

After the session, capture results at three levels.

### TEAM RESULT

- team objective achieved or not achieved
- team score
- team standard
- overall coach observation
- what improved
- what remains weak
- what should carry into the next session

### GROUP RESULT

- group name
- performance result
- standard achieved
- coach observation
- next adjustment

### PLAYER RESULT

- individual target
- result
- quality rating
- player reflection
- coach observation
- development-plan impact
- whether follow-up is needed

Do not require the coach to write twelve individual reports after every practice.

Use an exception-based workflow.

---

## POST-PRACTICE REVIEW

Default review flow:

1. Team Summary
2. Group Summary
3. Player Exceptions
4. Next Practice Adjustment

Player Exceptions should focus on players who:

- exceeded expectations
- reached a goal
- showed a meaningful decline
- require follow-up
- need a modified assignment
- displayed a repeated pattern
- may need staff discussion

Allow optional individual notes for all players, but do not force them.

---

## PLAYER REFLECTION

Allow players to submit a short post-practice reflection.

Suggested fields:

- practice quality: 1–5
- focus quality: 1–5
- competitive commitment: 1–5
- what improved
- what needs work
- confidence entering the next event
- optional message to coach

Reuse existing GolfCoachOS practice-rating logic where possible.

---

## TEAM PRACTICE AND PLAYER DEVELOPMENT

Connect team practice directly to each player’s longitudinal development record.

A team-practice result may update:

- current priority
- assigned work
- practice history
- Skill Pillar
- Mental Pillar
- Physical Pillar
- Performance Pillar
- coach observations
- player timeline
- selection evidence
- tournament preparation status

Do not create a separate disconnected record of team-practice activity.

---

## TEAM PRACTICE AND PLAYER SELECTION

Some practices may influence lineup or travel decisions.

Allow the coach to designate:

- does not influence selection
- informational only
- contributes to qualifying
- contributes to coach evaluation
- direct selection event

If it influences selection, store:

- criteria
- results
- evidence source
- date
- coach observations
- weighting, if used
- decision relevance

Do not automatically convert every practice score into selection evidence.

---

## TEAM PRACTICE AND TOURNAMENTS

Allow a practice session to be linked to an upcoming tournament.

When linked, support:

- course characteristics
- expected weather
- format
- lineup size
- yardage
- green conditions
- rough conditions
- wind exposure
- strategic priorities
- likely scoring demands

The Practice Builder should be able to surface relevant preparation options without automatically generating the final plan.

Example:

Upcoming tournament:  
Long course with firm greens and frequent crosswinds.

Suggested planning categories:

- long-iron approach play
- flighted shots
- wedge play from firm lies
- lag putting
- wind decision-making
- recovery shots
- course-strategy scenarios

The coach selects what is appropriate.

---

## TEAM WORKOUTS

Create a connected Team Performance Schedule for physical training.

Support:

- strength
- speed
- mobility
- recovery
- testing
- conditioning
- warm-up
- return-to-performance modification
- travel recovery

A workout can be:

- full team
- group
- individual
- modified individual

Workout fields:

- session title
- objective
- duration
- staff owner
- exercises
- sets and repetitions
- intensity
- player assignments
- individual modifications
- completion
- athlete feedback
- staff notes

---

## ROLE-SPECIFIC ACCESS

Strength and conditioning staff should be able to:

- build workouts
- assign groups
- add individual modifications
- review completion
- communicate availability status

Golf coaches should see:

- player available
- limited
- modified
- unavailable
- expected return window where permitted

Golf coaches should not automatically see private medical detail.

Medical staff permissions must remain separate from performance-coach permissions.

---

## SCHEDULE INTEGRATION

Team Practice, workouts, qualifying, tournaments and team meetings should all live within one connected program schedule.

Support filtering by:

- full team
- training group
- individual player
- coaching staff
- support staff
- practice
- workout
- qualifying
- tournament
- travel
- meeting

Players should see a personalized schedule containing:

- team events
- assigned group events
- individual assignments
- travel
- tournament
- required meetings
- workouts

---

## COACH BRIEFING INTEGRATION

Update Today’s Briefing to include team-practice and workout intelligence.

Possible briefing items:

- today’s team practice
- practice plan not yet published
- three players missing assignments
- upcoming qualifying
- team workout modified
- player unavailable
- tournament-preparation block incomplete
- practice reflections awaiting review
- positive team-practice momentum
- team standard reached
- player development breakthrough

Each priority should contain:

- evidence
- why it matters
- one next action
- direct destination

Do not show raw AI output.

Do not build the AI agent yet if the intelligence layer remains deferred.

Create the UI and normalized data contracts so intelligence can be added later.

---

## TEAM TRENDS

Create future-ready views for:

- practice completion
- team-practice quality
- team standards achieved
- competitive-game results
- qualifying trends
- player-development progress
- group performance
- practice-to-tournament transfer
- workout completion
- player availability

Do not add decorative charts.

Only visualize information that supports a coaching decision.

---

## PRACTICE CULTURE

The product should reinforce team culture without turning culture into a simplistic score.

Allow coaches to define:

- team standards
- practice expectations
- attendance expectations
- communication standards
- competitive behaviours
- preparation standards
- reflection expectations

Track specific behaviours and completion.

Avoid unsupported labels such as:

- bad attitude
- not coachable
- poor character

Require observable evidence and staff-only notes for sensitive evaluations.

---

## MOBILE EXPERIENCE

College practice often happens away from a desktop.

The Team Practice workflow must work well on:

- phone
- tablet
- laptop

Mobile priorities:

- open today’s practice
- check attendance
- view groups
- record results
- add coach observations
- adjust player assignments
- review player reflections
- mark session complete

Do not require dense desktop tables for courtside or course-side use.

---

## PHASE ONE DELIVERABLES

Build or scaffold:

1. Team Practice navigation
2. Weekly Plan
3. Practice Builder
4. Session blocks
5. Training groups
6. Player assignments
7. Competitive Games library
8. Practice templates
9. Team results
10. Group results
11. Player exception review
12. Player reflection
13. Team workout foundation
14. Shared schedule integration
15. Tournament preparation connection
16. Player-selection evidence designation
17. Coach Briefing data placeholders
18. Mobile practice workflow
19. Loading, empty and error states
20. Architecture report

Do not build advanced AI practice generation in this phase.

Do not build medical diagnosis, injury prediction or automated player selection.

---

## AI-READY DATA CONTRACTS

Create or extend normalized structures similar to:

### TeamPracticeSession

- id
- program_id
- title
- objective
- date
- start_time
- duration
- location
- session_type
- tournament_id
- staff_owner_id
- influences_selection
- status

### PracticeBlock

- id
- session_id
- order
- block_type
- title
- objective
- duration
- instructions
- success_standard
- scoring_method

### PracticeGroup

- id
- session_id
- name
- purpose

### PracticeGroupMember

- group_id
- player_id

### PlayerPracticeAssignment

- id
- session_id
- player_id
- group_id
- development_priority
- target
- coach_note
- physical_modification
- reflection_required

### PracticeResult

- id
- session_id
- scope_type
- scope_id
- metric
- result
- target
- achieved
- evidence_source

### PlayerPracticeReflection

- id
- session_id
- player_id
- practice_quality
- focus_quality
- competitive_commitment
- improvement
- next_priority
- message_to_coach

### TeamWorkoutSession

- id
- program_id
- title
- objective
- date
- duration
- staff_owner_id
- status

These are conceptual structures.

Inspect the existing schema before creating new entities.

Reuse existing schedule, assignment, observation and drill entities when they can support the workflow cleanly.

---

## ACCEPTANCE CRITERIA

The work is complete when:

- Team Practice is a primary CollegeGolfOS area
- coaches can build a full team session
- one session can contain team, group and individual objectives
- practices can include competitive games
- players can receive individual assignments inside a shared session
- coaches can record team results without writing twelve full reports
- player exceptions can be documented efficiently
- practice results connect to longitudinal player records
- practices can be linked to tournaments
- selected sessions can contribute to player-selection evidence
- team workouts and physical modifications are supported
- private medical details remain protected
- practices and workouts appear in the shared schedule
- the mobile workflow is practical
- no duplicate drill library or player record is created
- AI is not required for the core workflow to function

---

## IMPLEMENTATION REPORT

After the build pass, report:

1. Existing practice and scheduling architecture discovered
2. Components reused
3. Entities reused
4. New entities proposed or created
5. Files changed
6. Routes created
7. Team, group and individual practice logic
8. Player-development integration
9. Tournament integration
10. Selection-evidence integration
11. Workout and support-staff permissions
12. Mobile behaviour
13. Current limitations
14. Data required before practice intelligence is added
15. Confirmation that no duplicate player or drill system was created
16. Confirmation that the coach retains final control over practice and selection decisions

---

## FINAL PRODUCT PRINCIPLE

College team practice must serve two purposes at the same time:

**Build the team.**

**Develop the individual.**

CollegeGolfOS should help coaches create shared standards, competition and culture while preserving each player’s individual development priorities.

Without Team Practice, CollegeGolfOS is primarily a recruiting and roster platform.

With Team Practice, workouts, qualifying, tournaments and individual development connected, it becomes an operating system for the entire college golf program.
