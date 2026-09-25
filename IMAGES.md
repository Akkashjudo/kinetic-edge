# Image slots

Every photograph on the site is referenced through [`data/images.ts`](data/images.ts).
Components never hardcode an image path.

## How to add a photograph

1. Save the file into `/public/images/…` (WebP preferred, sized per the brief below).
2. In `data/images.ts`, change that slot's `src` from `null` to the public path.
3. **Set `width` and `height` to the file's intrinsic pixel size.** They are what
   `<Figure ratio="natural">` uses to show the photograph whole; without them it falls back
   to the caller's frame and crops.
4. Rewrite that slot's `alt` to describe the photograph you actually supplied.
5. Run `npm run blur`. It regenerates `data/blur.ts`, the tiny placeholder each frame
   fades in from, for everything in `/public/images` — team portraits and athlete
   photographs included.

### Choosing a frame

Prefer `ratio="natural"`. A fixed ratio is a decision to throw part of the photograph away,
and most of what the client supplies is shot on a phone at 2:3 — a 16:10 frame keeps 42% of
one of those. Where a composition genuinely needs a band, narrow the column instead of
cropping harder, and never point a portrait slot at a landscape frame or the reverse.

Nothing is ever laid over a photograph of a person: no chip, no badge, no caption, no
scrim. Every athlete and founder crop puts the head in the upper third of the frame.

Until `src` is set, the slot renders a branded placeholder plate at the exact final crop
and aspect ratio — so dropping the photograph in shifts nothing on the page. Where a
section would otherwise show a plate and no honest photograph exists, that section is
built to run without an image instead — see `FeatureSplit`'s optional `imageKey`.

**Placeholder images are fine. Placeholder facts are not.** Never caption a placeholder
with an invented athlete, result, credential or statistic, and never use a stock or
AI-generated portrait to stand in for a real member of staff.

## Slots (22 — 14 supplied, 8 still needed)

| Key | Status | Photograph |
| --- | --- | --- |
| `hero` | supplied | The floor, looking down the turf lane. A frame with athletes mid-session would be stronger still: landscape 21:9, min 2400px wide, clear space on the left third for the headline. |
| `brandIntro` | supplied | The founders representing Kinetic Edge at a sports science conclave. |
| `performanceCentre` | supplied | Centre 01 exterior. A frame of the training floor itself (racks, platforms, turf) would be a stronger fit here when one exists. |
| `rehabCentre` | supplied | Exterior of the rehabilitation centre. An interior frame (plinth, assessment area, rehab equipment) would still be worth adding as a second slot. |
| `strengthTraining` | supplied | The strength floor. A frame of an athlete under the bar, coach in shot, would be a stronger fit when one exists. |
| `sprinting` | supplied | The turf lane. An athlete accelerating down it would be the stronger frame. |
| `athleteDevelopment` | supplied | The floor. A group of developing athletes mid-session would be a stronger fit. |
| `jumpTesting` | **needed** | Jump test in progress with the testing setup visible. Landscape 3:2, min 1800px wide. |
| `forcePlate` | **needed** | Force plates in use, screen or tablet readout visible. Landscape 3:2, min 1800px wide. |
| `physiotherapy` | **needed** | Hands-on assessment or treatment in the clinical space. Landscape 3:2, min 1800px wide. |
| `rehabilitation` | **needed** | Rehab under load — bridging the clinical and performance environments. Landscape 3:2, min 1800px wide. |
| `returnToSport` | **needed** | On-field or on-court reconditioning, sport-specific. Landscape 3:2, min 1800px wide. |
| `mobility` | **needed** | Mobility / recovery session, calm and clinical. Landscape 3:2, min 1800px wide. |
| `onlineCoaching` | **needed** | Athlete training with a programme on a phone or tablet. Landscape 3:2, min 1800px wide. |
| `founder` | supplied | Founder portrait at the centre. |
| `foundersTogether` | supplied | The two founders together. |
| `coachTrack` | supplied | Coach trackside. |
| `teamGroup` | **needed** | Full team on the performance floor. Landscape 16:9, min 2200px wide. |
| `athletesHero` | supplied | The floor. A competition frame of a Kinetic Edge athlete would be the stronger image here: landscape 21:9, min 2400px wide. |
| `facility` | supplied | Exterior of Centre 01. |
| `centreBuilding` | supplied | The building from the street. |
| `facilityInterior` | supplied | Wide interior of the floor. |

## Athlete photographs

Athlete photographs are not listed here — each one lives on its athlete in
[`data/athletes.ts`](data/athletes.ts), with its intrinsic width and height. The current
set are crops taken from the congratulation posters the client supplied, at 900×1125.

Their alt text is **generated** from the verified fields by `athleteAlt()`, never written
by hand. That is deliberate: it is what prevents one athlete being credited with another
athlete's result, which is how the previous site went wrong.

## Team photographs

Team portraits are optional `image` paths on [`data/team.ts`](data/team.ts). A member
without a photograph renders their initials on a branded plate.

## Brand assets already in place

| File | Use |
| --- | --- |
| `public/brand/ke-mark.svg` | Vector KE monogram, traced from the supplied artwork |
| `public/brand/ke-mark.png` | Raster monogram, transparent background |
| `public/brand/ke-lockup.png` | Full lockup (mark + wordmark), transparent |
| `public/og.png` | 1200×630 social sharing card |
| `app/icon.png`, `app/apple-icon.png` | Favicon and home-screen icon |
