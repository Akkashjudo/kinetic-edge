# Kinetic Edge High Performance Centre

Website for **Kinetic Edge High Performance Centre**, Mogappair East, Chennai.
Built for Performance. Engineered for Recovery.

Live: <https://kinetic-edge-one.vercel.app> · Intended domain: `kineticedge.in` (not assumed live)

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
| `npm run build` | Production build — all 14 routes prerender as static HTML |
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
- an address for Centre 02 (none has been supplied — it is presented as an *environment*, never a location, and never appears on a map)
- prices, awards, sponsors, or partners other than VALD Performance
- upcoming workshops

Two rules that are easy to get wrong:

1. **Competitions are not partners.** The eight competitions in `data/competitions.ts` are
   events Kinetic Edge athletes compete at. They must never appear under "Trusted Partners"
   or imply affiliation. VALD Performance is the only confirmed partner.
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
| `data/site.ts` | Verified business data, navigation, links, hours, address |
| `data/centres.ts` | The two-environment model (Performance / Rehabilitation) |
| `data/services.ts` | The six service pages, category split, services marquee |
| `data/method.ts` | Assess → Prescribe → Monitor → Re-test, plus the rehab and online pathways |
| `data/programmes.ts` | P/01–P/03 and the audience index |
| `data/team.ts` | Verified names and roles only |
| `data/athlete-results.ts` | Verified competition results — **currently empty, see below** |
| `data/competitions.ts` | Where athletes compete (not partners) |
| `data/partners.ts` | VALD Performance |
| `data/education.ts` | The past workshop |
| `data/story.ts` | 2020 → today timeline |
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

While the array is empty, `/athletes` still stands on verified content — the competitions
Kinetic Edge athletes compete at.

---

## Structure

```
app/                    Routes. Every page prerenders statically.
  services/[slug]/      The six service pages, from data/services.ts
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

Verified during the build, across all 14 routes:

- exactly one `h1` per page, no skipped heading levels
- no missing `alt`, no `href="#"`, no duplicate `id`s, no broken internal links
- no horizontal overflow at 360 / 768 / 1440 px
- all interactive targets ≥ 24×24 CSS px
- no WCAG AA text-contrast failures
- no hydration warnings and no console errors
- keyboard-operable mobile menu (focus trap, Escape, focus restore) and services dropdown
- `prefers-reduced-motion` honoured — animations collapse to instant state changes, and
  the marquees become static wrapped lists rather than scrolling

Per-route metadata, canonicals, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`,
and JSON-LD: `SportsActivityLocation` site-wide, plus `BreadcrumbList`, `Service` and
`FAQPage` where they apply — built only from verified fields.

---

## What is designed to be added later

The layouts already accommodate these; they are simply absent until real data exists:
Centre 02 address, an email address, testimonials, founder and staff photographs and
credentials, physiotherapy registration number, rehab centre photography, return-to-sport
case studies, pricing, additional sports, Google Business Profile, upcoming education
events, and additional verified partners.
