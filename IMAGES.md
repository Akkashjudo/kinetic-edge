# Image slots

Every photograph on the site is referenced through [`data/images.ts`](data/images.ts).
Components never hardcode an image path.

## How to add a photograph

1. Save the file into `/public/images/…` (WebP preferred, sized per the brief below).
2. In `data/images.ts`, change that slot's `src` from `null` to the public path.
3. Rewrite that slot's `alt` to describe the photograph you actually supplied.

Until `src` is set, the slot renders a branded placeholder plate at the exact final crop
and aspect ratio — so dropping the photograph in shifts nothing on the page.

**Placeholder images are fine. Placeholder facts are not.** Never caption a placeholder
with an invented athlete, result, credential or statistic, and never use a stock or
AI-generated portrait to stand in for a real member of staff.

## Slots (21)

| Key | Status | What the photograph should be |
| --- | --- | --- |
| `hero` | needed | Wide, low-light cinematic frame of real athlete training. Landscape 21:9, min 2400px wide. Leave clear space on the left third for the headline. |
| `brandIntro` | needed | Portrait 4:5 coaching moment — coach observing, athlete under load. Min 1400px wide. |
| `performanceCentre` | needed | The performance floor: racks, platforms, turf. Landscape 4:3, min 2000px wide. |
| `rehabCentre` | needed | The clinical space: plinth, assessment area, rehab equipment. Landscape 4:3, min 2000px wide. |
| `strengthTraining` | needed | Barbell work, side-on, coach in frame. Landscape 3:2, min 1800px wide. |
| `sprinting` | needed | Sprint / acceleration frame, panned or frozen. Landscape 3:2, min 1800px wide. |
| `athleteDevelopment` | needed | Group of developing athletes mid-session. Landscape 3:2, min 1800px wide. |
| `jumpTesting` | needed | Jump test in progress with the testing setup visible. Landscape 3:2, min 1800px wide. |
| `forcePlate` | needed | Force plates in use, screen or tablet readout visible. Landscape 3:2, min 1800px wide. |
| `valdTesting` | needed | VALD hardware in use during a testing session. Landscape 3:2, min 1800px wide. |
| `physiotherapy` | needed | Hands-on assessment or treatment in the clinical space. Landscape 3:2, min 1800px wide. |
| `rehabilitation` | needed | Rehab under load — bridging the clinical and performance environments. Landscape 3:2, min 1800px wide. |
| `returnToSport` | needed | On-field or on-court reconditioning, sport-specific. Landscape 3:2, min 1800px wide. |
| `mobility` | needed | Mobility / recovery session, calm and clinical. Landscape 3:2, min 1800px wide. |
| `onlineCoaching` | needed | Athlete training with a programme on a phone or tablet. Landscape 3:2, min 1800px wide. |
| `founder` | needed | Founder portrait, coaching context preferred. Portrait 4:5, min 1200px wide. |
| `teamGroup` | needed | Full team on the performance floor. Landscape 16:9, min 2200px wide. |
| `athletesHero` | needed | Competition frame — the strongest single image available. Landscape 21:9, min 2400px wide. |
| `workshop` | needed | Workshop delivery — presenting, or attendees around a testing setup. Landscape 3:2, min 1800px wide. |
| `facility` | needed | Exterior or entrance of Centre 01. Landscape 4:3, min 1800px wide. |
| `facilityInterior` | needed | Wide interior showing the scale of the floor. Landscape 16:9, min 2200px wide. |

## Athlete result images

Result photographs are not listed here — each one lives on its own result object in
[`data/athlete-results.ts`](data/athlete-results.ts) as an `image` path. Their alt text is
**generated** from the verified fields on that object by `resultAlt()`, never written by
hand. That is deliberate: it is what prevents one athlete being credited with another
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
