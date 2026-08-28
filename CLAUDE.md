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
- **No address for Centre 02.** It is an *environment*, never a location. It must never
  appear on a map, in an address block, or in directions.
- **Only one partner: VALD Performance.** The competitions in `data/competitions.ts` are
  competitions, not partners — never merge the two sections or relabel one as the other.

Placeholder images are fine. Placeholder facts are not. Never substitute a stock or
generated portrait for a real member of staff.

## Athlete results

`data/athlete-results.ts` is empty on purpose — 21 verified results exist but were not
available at build time. Add them to that array and every downstream surface renders
without component changes.

Alt text for results is **generated** by `resultAlt()` from the verified fields. Never
hand-write it, and never carry alt text over from the previous site: several old tags
credited one athlete with another athlete's result.

## Architecture

- Content goes in `data/`, typed against `lib/types.ts`. Never hardcode repeated content
  in page JSX.
- Photographs go through `data/images.ts` and the `Figure` component. Never hardcode an
  image path in a component. See [IMAGES.md](IMAGES.md).
- Server components by default. Add `"use client"` only where state, effects or Framer
  Motion actually require it.

## Two things that will bite you

**Reduced motion and hydration.** `useReducedMotion()` resolves differently on the server
and the client. Never branch the *rendered tree* on it — that is a hydration mismatch.
Keep the markup identical and vary only the `transition` duration. See the comment at the
top of `components/ui/Reveal.tsx`.

**Accent contrast.** `--accent` is the brand colour and is for rules, marks and dark
surfaces. For small text and filled buttons on light surfaces use `--accent-ink`; the raw
brand blue is only 3.96:1 on white and fails WCAG AA.

## Before calling a change done

- `npx tsc --noEmit` and `npm run build` both clean
- no console errors and no hydration warnings
- no horizontal overflow at 360 / 768 / 1440 px
- one `h1` per page, no skipped heading levels
- interactive targets ≥ 24×24 px, AA text contrast holds
