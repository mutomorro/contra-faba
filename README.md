# Contra Faba

Cost consultants for the construction industry. A static site built with Astro,
content in markdown, hosted on Netlify.

## Tech stack

| | |
|---|---|
| Framework | Astro 7 (static output) |
| Content | Markdown in `src/content/`, validated by Zod schemas |
| Styling | Tailwind CSS v4 |
| Hosting | Netlify |
| Forms | Netlify Forms (no backend, no API keys) |
| JS shipped | ~0.5 KB inline, for the mobile menu toggle |

There is no CMS and no database. Content is edited by changing markdown files in
this repo — see [Editing content](#editing-content).

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:4321. `npm run build` writes static output to
`dist/`, `npm run preview` serves that build, and `npm run check` type-checks the
Astro templates.

## Editing content

### Case studies

One markdown file per project in `src/content/projects/`. **The filename is the
URL slug** — `limehouse-retreat.md` becomes `/our-work/limehouse-retreat/`, so
renaming a file changes a live URL.

```yaml
---
title: Limehouse Retreat
projectType: Couples Retreat      # free text, shown as "Type"
location: London
budget: £1m
role: Pre/Post Contract QS
status: completed                 # pre-construction | in-progress | completed
clientType: homeowners            # architects | contractors | homeowners
featured: true
publishedDate: 2025-02-06
featuredImage: ../../assets/projects/limehouse-retreat-01.jpg
featuredImageAlt: Describe the image for screen readers and search engines
summary: >-
  One or two sentences. Shown on the card and at the top of the detail page.
gallery:                          # optional
  - src: ../../assets/projects/limehouse-retreat-02.jpg
    alt: Describe this image too
---

Anything typed below the frontmatter becomes body copy on the detail page.
None of the current projects have any — they came across from the old CMS as
summary-only — so adding a few paragraphs here is the single biggest content win
available.
```

`status` controls which section of `/our-work/` the project appears in. The
section headings and their intro copy live in `src/lib/site.ts`.

### Services

One file per service in `src/content/services/`. `order` sets the sequence on
`/services/`; `onHomepage: true` puts it in the homepage's four-card grid with
its shorter `homepageSummary`.

`listOnServicesPage: false` exists for one reason: the old WordPress site
advertised Contract Administration on the homepage but never listed it among the
six services, and had no copy for it. That inconsistency was preserved rather
than papered over with invented text. Write real copy for
`contract-administration.md` and flip the flag to `true`.

### Contact details, navigation, phone numbers

All in `src/lib/site.ts` — one place, used by the header, footer, contact page
and the structured data.

### Images

Drop new images in `src/assets/` and reference them with a relative path from the
markdown file. Astro generates responsive WebP at build time, so commit images at
a sensible size (2400px on the longest edge is plenty) rather than
camera-resolution originals.

`scripts/process-images.sh` documents how the current set was produced from the
WordPress originals. `scripts/generate-brand-assets.mjs` regenerates the favicon
set and the Open Graph share image from the logo.

## URLs

The five URLs inherited from WordPress are preserved **exactly**, including their
trailing slashes:

```
/  /about/  /services/  /our-work/  /contact/
```

`trailingSlash: 'always'` in `astro.config.mjs` and `pretty_urls = false` in
`netlify.toml` are both load-bearing for this. Changing either introduces a
redirect on every indexed URL and moves the canonical. Don't.

The seven `/our-work/<slug>/` case-study pages are new — WordPress showed all
projects on the single `/our-work/` page, which still carries their full content.

## Deployment

Netlify builds from this repo: `npm run build`, publish `dist`. Redirects and
headers are in `netlify.toml`.

### Domain cutover and DNS migration

See **[docs/dns-migration.md](docs/dns-migration.md)** for the full runbook,
including a complete pre-migration backup of the DNS zone.

Two separate jobs, to be done in this order and not together:

1. **Go live** — point `contrafaba.com` at Netlify by changing two A/CNAME records
   inside SiteGround's existing zone. The A-record TTL is 300s, so this propagates
   in ~5 minutes and rolls back just as fast.
2. **Move DNS to Infomaniak** — where the domain is already registered. This is a
   nameserver change, governed by the registry's 48-hour NS TTL, so it cannot be
   rolled back quickly. Pre-stage the whole zone at Infomaniak first and leave the
   SiteGround zone intact until propagation completes, so both nameserver sets
   return identical answers and the switch is invisible.

The email records (`MX`, SPF, DMARC, and especially the 410-character DKIM key at
`google._domainkey`) are Google Workspace and must survive both phases untouched.
The DKIM record is the highest-risk item: DNS splits it across two 255-character
strings, it is one logical record, and getting it wrong degrades deliverability
silently rather than causing a visible outage.

## Outstanding

- [x] ~~Privacy and Terms drafts~~ — reviewed and approved 30 July 2026. Retention
      is now stated as 24 months for enquiries and 6 years after project completion;
      governing law is England and Wales; data-protection contact is by phone or
      post. **If analytics or a captcha are ever added, the privacy notice must be
      updated in the same change** — it currently states the site does no tracking,
      which is true and must stay true.
- [ ] **12 of the 14 architect logos are unidentified.** They were uploaded to
      WordPress as undated screenshots. Only `arch-client-09` (Delve Architects)
      and `arch-client-11` (HOKO Design) could be matched. The rest carry empty
      alt text, which marks them decorative — accessible, but they'd be worth
      naming. Names go in `archNames` in `src/pages/our-work/index.astro`.
- [ ] **No public email address.** The previous build showed
      `hello@contrafaba.com`, which appears nowhere on the WordPress site and
      could not be verified, so it was left out. Add a real one to
      `src/lib/site.ts` if one exists.
- [ ] Set the Netlify Forms notification recipient for the `enquiry` form.
- [ ] Case-study detail pages have no body copy (see above).
- [ ] No analytics. Add a privacy-preserving option (Plausible, Fathom, or
      Netlify Analytics) if wanted — the privacy notice currently states, truthfully,
      that the site does no tracking, so it must be updated alongside.
- [ ] The old Sanity project (`bbfankjm`) and the Vercel project are both still
      live and now unused. Delete once this is in production.
- [ ] `.git` history still contains the 292MB of original images. Removing them
      needs a history rewrite and force-push — a deliberate decision, not done.
