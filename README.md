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
- prices, awards, or partners other than VALD Performance and Hundred
- a testimonial from Sankar Muthusamy (the source has a placeholder; `testimonial` stays null)
- upcoming workshops

Two rules that are easy to get wrong:

1. **Competitions are not partners.** The eight competitions in `data/competitions.ts` are
   events Kinetic Edge athletes compete at. They must never appear under "Trusted Partners"
   or imply affiliation. VALD Performance and Hundred are the only confirmed partners. The
   competitions list is not currently rendered — the client asked for it to be removed.
2. **Athlete alt text is generated, never written.** `resultAlt()` in
   `data/athlete-results.ts` builds alt text from the verified fields on each result. The
   previous site hand-wrote alt tags and credited some athletes with other athletes'
   results. Do not reintroduce hand-written alt text there.

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
| `data/athlete-results.ts` | Verified competition results — **currently empty, see below** |
| `data/competitions.ts` | Where athletes compete (not partners; not currently rendered) |
| `data/partners.ts` | VALD Performance and Hundred |
| `data/education.ts` | KE Education — focus areas and the past workshop |
| `data/collaborations.ts` | Camps, workshops, assessments and representations, 2023–2025 |
| `data/story.ts` | 2020 → today timeline, the homepage About summary |
| `data/faq.ts` | Services and contact FAQs |
| `data/images.ts` | Every photograph slot — see [IMAGES.md](IMAGES.md) |

Shared types are in `lib/types.ts`.

### ⚠ Athlete results are not populated

`data/athlete-results.ts` is intentionally an empty array. 21 verified results exist but
were not available when this was built, and nothing was invented to fill the gap.

Everything downstream is already wired: add the result objects to that array and the
homepage proof section, the `/athletes` results grid, sport filters and featured editorial
cards all begin rendering. **No component changes are needed.** The file documents the
exact shape to use.

While the array is empty, the homepage results section renders nothing at all, and
`/athletes` stands on the athlete ambassadors instead.

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
- `prefers-reduced-motion` honoured — animations collapse to instant state changes, and
  the profile morph is dropped in favour of a plain fade

### Motion notes

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
the 21 verified athlete results, Sankar Muthusamy's approved testimonial, further athlete
ambassadors, photographs for the eighteen empty image slots (hero first), portraits and
expertise lines for the rest of the team, Centre 02 hours and interior photography, an
email address, physiotherapy registration number, return-to-sport case studies, pricing,
Google Business Profile, upcoming education programmes, and additional verified partners.
