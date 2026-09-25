@AGENTS.md

# Kinetic Edge — working rules

Read [README.md](README.md) first. The content rules below are not style preferences;
breaking one puts a false claim on a real business's website.

## Never invent

If a fact is not in `data/`, it does not exist. Do not add athlete or member counts, medal
totals, success or recovery rates, years of experience, staff qualifications or
certifications, registration numbers, ratings, review counts, testimonials, case studies,
prices, awards, sponsors, or upcoming events.

Specifically absent, and to stay absent until the client supplies them:

- **No email address.** Contact is phone and WhatsApp only.
- **No separate hours or phone number for Centre 02.** Its address *was* supplied on
  28 Aug 2026 and is published; the hours on the site are verified for Centre 01 only.
- **One partner: Hundred (apparel sponsor).** VALD Performance was removed on
  25 Sep 2026 at the client's request — do not reintroduce the logo, the copy or the
  asset. The competitions in `data/competitions.ts` are competitions, not partners; never
  merge the two or relabel one as the other. That list is currently unrendered, also at
  the client's request.
- **No workshops or events.** The X-Plosive Plyometric Workshop 2.0 was removed on
  25 Sep 2026 and KE Education is the collaborations record only.

Placeholder images are fine. Placeholder facts are not. Never substitute a stock or
generated portrait for a real member of staff or athlete.

## Athletes

`data/athletes.ts` holds every athlete and their verified results, read off the
congratulation posters the client supplied. Add results there and the homepage preview and
`/athletes` both render them — no component changes.

Never invent or upgrade a placing, add a year the source does not state, or aggregate
anything into medal totals, athlete counts or success rates.

Alt text is **generated** by `athleteAlt()` from the verified fields. Never hand-write it,
and never carry alt text over from the previous site: several old tags credited one
athlete with another athlete's result.

**Nothing is ever printed on top of an athlete.** Every athlete photograph is a portrait
crop from a poster and every head sits in the upper third of the frame, so a sport chip, a
result count or a caption positioned over the image lands on a face at every breakpoint.
It did. The photograph carries no text, no badge and no scrim; all of it lives in the
information panel beside it. See `components/sections/AthleteGallery.tsx`.

**The athlete ambassador is not a service.** Sankar Muthusamy's section states that he
represents Kinetic Edge. It carries no booking, consultation or coaching call to action —
removed 25 Sep 2026.

## Architecture

- Content goes in `data/`, typed against `lib/types.ts`. Never hardcode repeated content
  in page JSX.
- Photographs go through `data/images.ts` and the `Figure` component. Never hardcode an
  image path in a component. See [IMAGES.md](IMAGES.md).
- After adding or replacing anything in `/public/images`, run `npm run blur`. It
  regenerates `data/blur.ts`, the 14px placeholder every image fades in from; without an
  entry the frame opens onto an empty box.
- Two slots that show the SAME file on one page must declare the same `sizes`, or the
  browser fetches that photograph twice at two widths. `PORTRAIT_SIZES` in `TeamCard` is
  shared for exactly this reason. A service page's `breakImageKey` must never equal its
  `imageKey`, for the same reason and because it showed the visitor one picture twice.
- Every supplied slot records its intrinsic `width`/`height`, and `<Figure ratio="natural">`
  uses them so the photograph is shown whole. Reach for a fixed ratio only when the
  composition genuinely needs a band, and check what it costs first — most of the supplied
  files are 2:3 phone photographs, and a 16:10 frame was throwing away 58% of one of them.
- Server components by default. Add `"use client"` only where state, effects or Framer
  Motion actually require it.

## Three things that will bite you

**Reduced motion and hydration.** `useReducedMotion()` resolves differently on the server
and the client. Never branch the *rendered tree* on it — that is a hydration mismatch.
Keep the markup identical and vary only the `transition` duration. See the comment at the
top of `components/ui/Reveal.tsx`.

**Accent contrast.** `--accent` is the brand colour and is for rules, marks and dark
surfaces. For small text and filled buttons on light surfaces use `--accent-ink`; the raw
brand blue is only 3.96:1 on white and fails WCAG AA.

**The hero is three photographs, not one crop.** `heroMobile` below 768, `heroTablet` from
768 to 1023, and `hero` — the desktop frame — from 1024. They are separate shots of the
same room, and the section's min-height is tuned per breakpoint so each is shown at close
to its own ratio. **The desktop frame is not to be changed, repositioned or re-cropped.**

`ArtDirectedImage` renders this as a `<picture>`, which is the only markup that fetches one
of three. Two rules hold it together: never swap it for `next/image` (one `<img>` cannot do
art direction, and three `<Image>`s with `hidden`/`block` all download, because Chrome
fetches an eager image inside a `display:none` ancestor); and keep every `media` range
**mutually exclusive**, because `<picture>` takes the first match but `<link rel="preload">`
fires on every match — overlapping ranges preloaded all three frames on one screen.

**Never observe an element you have hidden.** Chrome does not reliably update an
IntersectionObserver that has a `rootMargin` while the target's own `clip-path` (or a
scale-to-nothing transform) hides it. `RevealMask` therefore observes an unclipped wrapper
and animates the clip on a child. Observing the clipped element left every image frame
empty for two seconds until the watchdog forced it.

## Caching

Everything under `/public` is served by Vercel as `max-age=0, must-revalidate` unless
`headers()` in `next.config.ts` says otherwise — and the image optimiser inherits that
header, so the AVIF it generates was being revalidated on every page view too. The rule
there gives `/images`, `/brand` and `/og.png` a week of freshness with a month of
stale-while-revalidate, and `images.minimumCacheTTL` keeps generated variants for 30 days
instead of the 60-second default. Do not use `immutable`: these files get swapped by hand.

## Before calling a change done

- `npx tsc --noEmit` and `npm run build` both clean
- no console errors and no hydration warnings
- no horizontal overflow at 360 / 768 / 1440 px
- one `h1` per page, no skipped heading levels
- interactive targets ≥ 24×24 px, AA text contrast holds
- no photograph showing less than ~80% of itself, and no text over a face
