# Kinetic Edge High Performance Centre

Website for **Kinetic Edge High Performance Centre**, Chennai.
Train Better. Perform Better.

Live: <https://kinetic-edge-wine.vercel.app> · Intended domain: `kineticedge.in` (not assumed live)

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on <http://localhost:3000> |
| `npm run build` | Production build — all 13 routes prerender as static HTML |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react.

---

## The content rules

This site is deliberately conservative about facts. **Nothing on it may be invented.**
The following are absent by design, not by oversight — do not add them without verified data:

- athlete counts, member counts, medal totals, success or recovery rates
- years of experience, staff qualifications, certifications, registration numbers
- Google ratings, review counts, testimonials, case studies
- an email address (none exists — phone and WhatsApp are the contact routes)
- separate opening hours or a separate phone number for Centre 02 (only its address was
  supplied, on 28 Aug 2026; the hours shown are verified for Centre 01 only)
- prices, awards, or partners other than Hundred (VALD Performance was removed on 25 Sep 2026)
- a testimonial from Sankar Muthusamy (the source has a placeholder; `testimonial` stays null)
- upcoming workshops

Three rules that are easy to get wrong:

1. **Competitions are not partners.** The eight competitions in `data/competitions.ts` are
   events Kinetic Edge athletes compete at. They must never appear under "Trusted Partners"
   or imply affiliation. Hundred is the only confirmed partner. The competitions list is
   not currently rendered — the client asked for it to be removed.
2. **Athlete alt text is generated, never written.** `athleteAlt()` in
   `data/athletes.ts` builds alt text from the verified fields. The previous site
   hand-wrote alt tags and credited some athletes with other athletes' results. Do not
   reintroduce hand-written alt text there.
3. **The athlete ambassador is not a service.** Sankar Muthusamy's section says that he
   represents Kinetic Edge, and carries no booking or consultation call to action.
4. **Nothing is printed on an athlete's photograph.** The sport, the result count and the
   caption all live in the panel beside the image. Every athlete crop puts the head in the
   upper third, so anything laid over the frame lands on a face.

Placeholder **images** are fine. Placeholder **facts** are not.

---

## Where the content lives

Nothing repeated is hardcoded in JSX. All of it is typed data:

| File | Holds |
| --- | --- |
| `data/site.ts` | Verified business data, navigation (generated from services), links, hours, both addresses |
| `data/centres.ts` | The two centres — performance and rehabilitation |
| `data/services.ts` | The four services: card copy, page copy and blocks |
| `data/method.ts` | The Kinetic Edge System — Assess → Plan → Train → Track → Improve — plus the rehab and distance pathways |
| `data/programmes.ts` | The five programmes and the four audiences |
| `data/ambassadors.ts` | Athlete ambassadors — one card each; testimonial deliberately null |
| `data/team.ts` | Verified names and roles; expertise lines only where the source states one |
| `data/athletes.ts` | Athletes and their verified results, with generated alt text |
| `data/competitions.ts` | Where athletes compete (not partners; not currently rendered) |
| `data/partners.ts` | Hundred, the apparel sponsor |
| `data/collaborations.ts` | Camps, workshops, assessments and representations, 2023–2025 — the whole of KE Education |
| `data/story.ts` | 2020 → today timeline, the homepage About summary |
| `data/faq.ts` | Services and contact FAQs |
| `data/images.ts` | Every photograph slot — see [IMAGES.md](IMAGES.md) |
| `public/images/` | `centre/` the training floor and building, `founders/` Deepak and the pair, `athletes/` the athletes, `team/` portraits |

Shared types are in `lib/types.ts`.

### Athletes

`data/athletes.ts` holds each athlete, their sport, their photograph and every verified
result, read off the congratulation posters the client supplied on 25 Sep 2026. Add an
athlete or a result there and the homepage preview and `/athletes` both render it — **no
component changes are needed.**

The strongest result goes first in each athlete's list: that is the one the card leads
with, and the rest open in their profile.

---

## Structure

```
app/                    Routes. Every page prerenders statically.
  services/[slug]/      The four service pages, from data/services.ts. The six
                        earlier slugs 308-redirect to them (next.config.ts).
components/
  layout/               Header, MobileNav, Footer, WhatsAppFab
  sections/             Page-level sections, all data-driven
  ui/                   Primitives — SectionLabel, CTAButton, Figure, FAQAccordion…
  forms/                EnquiryForm
data/                   All content (see table above)
lib/                    Types, metadata helper, class helper
public/brand/           Logo assets
```

### Design system

Tokens live in `app/globals.css` (Tailwind v4 `@theme`). Two things worth knowing:

- **Accent switching.** Sections set `data-accent="performance"` or `data-accent="rehab"`,
  which swaps `--accent` between brand blue and rehabilitation teal. Components use
  `bg-accent` / `text-accent` and stay identical in both contexts.
- **`--accent-ink`.** The brand blue `#1385D6` only reaches 3.96:1 on white, below WCAG AA.
  Small text and filled buttons on light surfaces use the deeper `--accent-ink` (5.4:1);
  the brand blue itself still carries rules, marks and dark surfaces. The same applies to
  teal. Every route was verified to have zero AA text-contrast failures.

---

## The enquiry form

There is no backend, so the form does not pretend to send anything. It composes the
enquiry and opens WhatsApp with the details pre-filled — which is also the primary
conversion route for this business.

To connect a backend later, set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` to a URL that accepts a
JSON `POST`. The form then submits to it and reports a real success or failure. No other
change is required.

---

## Accessibility and SEO

Verified during the build, across all 13 routes:

- exactly one `h1` per page, no skipped heading levels
- no missing `alt`, no `href="#"`, no duplicate `id`s, no broken internal links
- no horizontal overflow at 360 / 768 / 1440 px
- all interactive targets ≥ 24×24 CSS px
- no WCAG AA text-contrast failures
- no hydration warnings and no console errors
- keyboard-operable mobile menu, athlete profile dialog (focus trap, Escape, focus
  restore, scroll lock — shared in `lib/useModal.ts`) and services dropdown
- `prefers-reduced-motion` honoured — animations collapse to instant state changes, the
  profile morph is dropped in favour of a plain fade, and the brand entrance never runs
- no photograph rendered at less than ~80% of itself, and no text over a face

### The hero

Three photographs of the same room, one per breakpoint — portrait below 768, landscape from
768 to 1023, and the original desktop frame from 1024. `ArtDirectedImage` renders them as a
`<picture>` against Next's image optimiser, so exactly one file is fetched and preloaded at
any width. Verified at 375, 390, 430, 768, 820, 1024, 1440 and 1920.

### Image performance

A first view on a phone is one photograph: the hero, as AVIF at the width that screen
actually needs. Everything else is lazy, nothing is preloaded except the hero frame for
the matching breakpoint, no file is fetched twice, and every frame reserves its space
before it loads — measured CLS is 0. Each image fades in from a 14px placeholder in
`data/blur.ts` (`npm run blur` regenerates it) rather than opening onto an empty box.

Static assets are cached for a week with a month of stale-while-revalidate; without that
header Vercel serves `/public` as `max-age=0` and a returning visitor revalidates every
photograph on the page.

### Image ratios

Every supplied slot in `data/images.ts` records its intrinsic `width`/`height`, and
`<Figure ratio="natural">` renders the photograph at its own shape. Most of the supplied
files are 2:3 phone photographs; before this, fixed landscape frames were showing 42–60% of
several of them, including the founder portrait in the 2020 chapter. Use a fixed ratio only
where the composition needs a band, and give the block a narrower column rather than
cropping harder — see `ServiceBlocks`.

### Motion notes

- The site opens with a brand entrance: the KE mark resolves on night, a hairline draws
  under it, and the plate wipes upward off the hero. It leaves as soon as the document is
  ready, with a 700ms floor and a hard 1.8s ceiling, plays once per tab, and is hidden in
  CSS — never painted — for a returning visitor or under `prefers-reduced-motion`.
  `components/motion/BrandLoader.tsx`.

- Reveals are driven by `lib/useRevealInView.ts`, never Framer's `whileInView` — the app
  runs on `domAnimation`, which does not include the viewport feature.
- `RevealMask` observes an unclipped wrapper and animates `clip-path` on the element
  inside it. Chrome does not reliably update an observer with a `rootMargin` when the
  target itself is fully clipped; observing the clipped element left every image frame
  empty for two seconds.
- The athlete profile morph needs layout animations, which `domAnimation` lacks. It loads
  the full bundle on demand from `lib/motion-features.ts`, in its own chunk, so no other
  page pays for it.

Per-route metadata, canonicals, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`,
and JSON-LD: `SportsActivityLocation` site-wide, plus `BreadcrumbList`, `Service` and
`FAQPage` where they apply — built only from verified fields.

---

## What is designed to be added later

The layouts already accommodate these; they are simply absent until real data exists:
athletes training and being tested (the eight remaining image slots in
[IMAGES.md](IMAGES.md) — jump and force-plate testing, the rehabilitation rooms, remote
coaching and a full team photograph), video of the centre, Sankar Muthusamy's approved
testimonial, further athlete results and ambassadors, portraits and expertise lines for
the rest of the team, Centre 02 hours, an email address, physiotherapy registration
number, return-to-sport case studies, pricing, Google Business Profile, upcoming education
programmes, and additional verified partners.
