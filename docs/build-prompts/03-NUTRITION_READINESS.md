# Nutrition Readiness™ — Physical Pillar Build Prompt

Shared module for the GolfCoachOS ecosystem. Scaffold once; reuse across products.

**Brand identity:** Nutrition Readiness™ (not “Nutrition Tracker”).

Fits alongside:

- Physical Readiness
- Mental Readiness
- Skill Readiness
- Performance Readiness
- **Nutrition Readiness**

Reusable across:

- GolfCoachOS
- GolfAcademyOS
- JuniorGolfOS
- VarsityGolfOS
- CollegeGolfOS

Design it as a shared component. Do not rebuild the UI or business logic per product.

---

## What this is / is not

This is **NOT** a calorie-counting application.

This is **NOT** a medical nutrition platform.

It is a **Nutrition Readiness™** system designed to help coaches understand whether a player's eating habits are supporting training, recovery and competition.

The purpose is not to record every meal.

The purpose is to help coaches answer:

- Is nutrition supporting development?
- Is nutrition limiting performance?
- What habits deserve attention?
- What should improve next?

Do not build this as a competitor to MyFitnessPal, Cronometer, or food-logging apps.

---

## CORE DESIGN PHILOSOPHY

Follow the same architecture used throughout GolfCoachOS.

Information → Context → Intelligence → Coach Decision → Player Action

Do not overwhelm users with nutritional science.

Focus on practical coaching decisions.

---

## NUTRITION OVERVIEW

The Nutrition section should begin with an AI-generated overview card.

Example layout:

**Nutrition Readiness**

Overall Status: Green / Yellow / Red

AI Summary: Overall eating habits generally support health but recovery and tournament fueling appear inconsistent.

Priority Areas:

- Recovery Nutrition
- Hydration
- Competition Fueling

Coach Recommendation: Improve post-training protein intake and hydration before tournament rounds.

The overview should always answer: **What matters most?**

---

## SECTION 1 — DAILY HABITS

Capture general lifestyle habits rather than detailed food logging.

Suggested questions:

- Breakfast frequency
- Fruit intake
- Vegetable intake
- Protein intake
- Daily hydration
- Sugary drink frequency
- Fast food frequency
- Meal consistency
- Late-night eating
- Sleep and eating consistency

Each question should use simple multiple-choice answers.

Avoid requiring exact calorie counts.

---

## SECTION 2 — COMPETITION FUELING

Build a golf-specific competition questionnaire.

Capture:

- Typical pre-round breakfast
- Time before tee time
- Food consumed before competition
- Hydration before round
- Nutrition during round
- Water intake
- Electrolytes
- Snacks
- Sports nutrition
- Energy level on front nine
- Energy level on back nine
- Mental focus late in round
- Cramping
- Fatigue
- Post-round recovery meal

This section should help identify habits affecting tournament performance.

---

## SECTION 3 — TRAINING AND PRACTICE NUTRITION

Questions:

- Meal before practice
- Hydration before practice
- Food during practice
- Hydration during practice
- Protein after practice
- Recovery meal timing
- General energy during training

Coach should quickly identify poor fueling habits.

---

## SECTION 4 — STRENGTH AND CONDITIONING

Optional fields:

- Height
- Weight
- Training frequency
- Strength sessions per week
- Conditioning sessions
- Recovery sessions

Optional goals:

- Gain muscle
- Maintain weight
- Lose body fat
- Improve recovery
- Increase energy

Using accepted sports nutrition equations, estimate:

- Daily calorie requirements
- Estimated protein needs
- Estimated carbohydrate range
- Estimated hydration target

These values should be educational estimates only.

Clearly label them as estimates.

Never present them as medical prescriptions.

---

## SECTION 5 — SUPPLEMENTS

Optional checklist.

Examples:

- Protein
- Creatine
- Electrolytes
- Vitamin D
- Iron
- Omega-3
- Multivitamin
- Other
- Prefer not to answer

Do not recommend supplements automatically.

---

## SECTION 6 — PLAYER GOALS

Coach and player select priorities.

Examples:

- Improve hydration
- Improve breakfast consistency
- Tournament nutrition
- Recovery nutrition
- Increase protein
- Energy stability
- Body composition
- Strength support
- Confidence around nutrition

Store goals longitudinally.

---

## AI ANALYSIS

The AI should not simply summarize answers.

It should interpret habits.

Output structure:

- Current Nutrition Status
- What appears to be working well
- Potential performance limitations
- Possible impact on:
  - Recovery
  - Energy
  - Strength gains
  - Practice quality
  - Tournament endurance
  - Late-round focus
  - Overall physical development
- Top Three Priorities
- Suggested coach discussion
- Suggested player action
- Suggested educational resources

Do not diagnose.

Do not prescribe medical diets.

Use language such as:

- Current habits suggest...
- May benefit from...
- Consider improving...
- Discuss with a registered sports dietitian if appropriate...

---

## COACH DASHBOARD

The coach should see concise readiness indicators.

- Nutrition
- Hydration
- Competition Fueling
- Recovery
- Daily Habits

Green / Yellow / Red

Clicking each opens detailed history.

---

## PLAYER EXPERIENCE

Players should never feel punished.

Use positive coaching language.

Show:

- Current Status
- Small Improvements
- Next Habit
- Progress Over Time
- Milestones

Examples:

- Breakfast eaten five consecutive days
- Hydration goal reached
- Tournament fueling improved
- Recovery nutrition improved

Avoid calorie obsession.

---

## LONGITUDINAL TRACKING

Track trends over time.

Examples:

- Breakfast consistency improving
- Hydration improving
- Competition fueling declining
- Recovery improving
- Protein intake more consistent

Generate trend graphs where useful.

---

## MEAL PHOTO SUPPORT (Future)

Design extension points.

Future workflow:

Player uploads meal photo.

AI estimates:

- Calories
- Protein
- Carbohydrates
- Fat
- Vegetables
- Hydration quality
- Meal quality

Store estimated nutrition summary.

Do not permanently rely on image analysis.

Keep image optional.

---

## TOURNAMENT NUTRITION PLAN

Create a reusable planning tool.

Example:

Tournament — Saturday — 7:30 Tee Time

Breakfast — 6:00 — Water, Banana, Eggs, Oatmeal

During Round — Hole 5 Banana · Hole 10 Energy Bar · Hole 14 Electrolytes

Post Round — Protein Shake · Lunch · Recovery

Coach may assign tournament nutrition plans.

Player checks completion.

---

## INTEGRATION

Nutrition should connect to:

- Physical Readiness
- Recovery
- Practice Quality
- Competition Performance
- Tournament Preparation
- Growth
- Strength
- Hydration
- Travel
- Wellness
- Mental Energy

Never operate as an isolated module.

---

## DESIGN

Maintain existing Physical Pillar styling.

- Dark theme
- Premium cards
- Simple icons
- Minimal data entry
- High readability

Nutrition should feel like another coaching pillar — not another app.

---

## SAFETY

Nutrition guidance is educational.

- Never diagnose
- Never prescribe medical nutrition therapy
- Never recommend restrictive diets
- Never encourage unhealthy weight loss

If responses indicate significant concerns, recommend consultation with an appropriately qualified healthcare professional or registered sports dietitian.

---

## FUTURE ARCHITECTURE

Design the module as a shared reusable component so it can appear in:

- GolfCoachOS
- VarsityGolfOS
- CollegeGolfOS
- Professional GolfOS

without rebuilding the UI or business logic.

---

## SUCCESS CRITERIA

The finished module should help coaches answer:

- Is this athlete fueling development appropriately?
- What habits deserve attention?
- How might nutrition be influencing performance?
- What is the single most important habit to improve next?

The module should feel like **Coaching in Context™**, not a nutrition app.
