#!/usr/bin/env node
/**
 * Forensic SEO check over the built site in dist/. Run after `npm run build`:
 *
 *   npm run seo-check
 *
 * Exits non-zero on any failure, so it can gate a deploy.
 *
 * Why this exists: the Mutomorro migration (see the "SEO Incident Log: Trailing
 * Slash and Migration Recovery" in Craft) lost most of its search traffic to
 * faults that every page-by-page eyeball missed - a canonical that disagreed
 * with the served URL, og tags absent on whole page types, and hub pages that
 * rendered no links to their own children. Its standing rule is "never declare
 * SEO work complete without forensic verification". This is that verification,
 * re-runnable, testing relationships between pages as well as each page alone.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const ORIGIN = 'https://contrafaba.com'

if (!existsSync(DIST)) {
  console.error('dist/ not found - run `npm run build` first.')
  process.exit(1)
}

const failures = []
const warnings = []
const fail = (page, msg) => failures.push(`${page}: ${msg}`)
const warn = (page, msg) => warnings.push(`${page}: ${msg}`)

// --- Collect built pages ------------------------------------------------------
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'))
const pages = new Map() // URL path -> html
for (const file of htmlFiles) {
  const rel = '/' + relative(DIST, file).replace(/\\/g, '/')
  const path = rel === '/404.html' ? '/404' : rel.replace(/index\.html$/, '')
  pages.set(path, readFileSync(file, 'utf8'))
}

// Everything served from dist that a link could legitimately point at.
const servedFiles = new Set(walk(DIST).map((f) => '/' + relative(DIST, f).replace(/\\/g, '/')))

// --- Helpers ------------------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}=("([^"]*)"|'([^']*)')`, 'i'))
  if (m) return decode(m[2] ?? m[3])
  // A bare boolean attribute (Astro writes alt="" as `alt`) is present-but-empty.
  return new RegExp(`\\s${name}(?=[\\s>/])`, 'i').test(tag) ? '' : undefined
}
const metaContent = (html, key, keyAttr = 'name') => {
  const re = new RegExp(`<meta[^>]*\\s${keyAttr}="${key}"[^>]*>`, 'gi')
  const tags = html.match(re) ?? []
  return tags.map((t) => attr(t, 'content'))
}
const linkHref = (html, rel) =>
  (html.match(new RegExp(`<link[^>]*rel="${rel}"[^>]*>`, 'gi')) ?? []).map((t) => attr(t, 'href'))
const text = (s) => decode(s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())

// --- Sitemap ------------------------------------------------------------------
const sitemapUrls = new Set()
for (const f of servedFiles) {
  if (/^\/sitemap-\d+\.xml$/.test(f)) {
    const xml = readFileSync(join(DIST, f), 'utf8')
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(m[1])
  }
}
if (sitemapUrls.size === 0) fail('sitemap', 'no URLs found in sitemap-*.xml')

const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8')
if (!/Sitemap:\s*https:\/\/contrafaba\.com\/sitemap-index\.xml/.test(robots))
  fail('robots.txt', 'does not advertise the sitemap index')
if (/Disallow:\s*\/_astro/i.test(robots))
  fail('robots.txt', 'blocks /_astro/ - Google must be able to fetch CSS/JS/images to render')

// --- Per-page checks ----------------------------------------------------------
const titles = new Map()
const descriptions = new Map()
const inboundLinks = new Map() // path -> count of pages linking to it

for (const [path, html] of pages) {
  const is404 = path === '/404'
  const robotsMeta = metaContent(html, 'robots')[0] ?? ''
  const noindex = /noindex/i.test(robotsMeta)
  const url = ORIGIN + path

  // lang
  if (!/<html[^>]*lang="en-GB"/.test(html)) fail(path, 'html lang is not en-GB')

  // title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/g) ?? []
  if (titleMatch.length !== 1) fail(path, `expected 1 <title>, found ${titleMatch.length}`)
  const title = titleMatch[0] ? text(titleMatch[0]) : ''
  if (title.length < 15 || title.length > 65) warn(path, `title is ${title.length} chars: "${title}"`)
  if (!noindex) titles.set(title, [...(titles.get(title) ?? []), path])

  // description
  const descs = metaContent(html, 'description')
  if (descs.length !== 1) fail(path, `expected 1 meta description, found ${descs.length}`)
  const desc = descs[0] ?? ''
  if (!noindex && (desc.length < 70 || desc.length > 160))
    warn(path, `description is ${desc.length} chars (aim 70-160)`)
  if (!noindex) descriptions.set(desc, [...(descriptions.get(desc) ?? []), path])

  // canonical + og:url agree, self-reference, trailing slash
  const canon = linkHref(html, 'canonical')
  const ogUrl = metaContent(html, 'og:url', 'property')
  if (!is404) {
    if (canon.length !== 1) fail(path, `expected 1 canonical, found ${canon.length}`)
    else {
      if (canon[0] !== url) fail(path, `canonical ${canon[0]} is not self-referencing ${url}`)
      if (!canon[0].endsWith('/')) fail(path, `canonical ${canon[0]} lacks trailing slash`)
    }
    if (ogUrl[0] !== canon[0]) fail(path, `og:url ${ogUrl[0]} disagrees with canonical ${canon[0]}`)
  }

  // sitemap membership must mirror indexability
  if (!is404) {
    if (noindex && sitemapUrls.has(url)) fail(path, 'noindex page is listed in the sitemap')
    if (!noindex && !sitemapUrls.has(url)) fail(path, 'indexable page missing from the sitemap')
  }

  // social cards
  for (const p of ['og:title', 'og:description', 'og:image', 'og:image:alt', 'og:type']) {
    if (metaContent(html, p, 'property').length !== 1) fail(path, `missing/duplicate ${p}`)
  }
  const ogImage = metaContent(html, 'og:image', 'property')[0]
  if (ogImage) {
    if (!ogImage.startsWith(ORIGIN + '/')) fail(path, `og:image not absolute on our origin: ${ogImage}`)
    else if (!servedFiles.has(ogImage.slice(ORIGIN.length)))
      fail(path, `og:image does not exist in dist: ${ogImage}`)
  }
  if (metaContent(html, 'twitter:card')[0] !== 'summary_large_image')
    fail(path, 'twitter:card is not summary_large_image')

  // favicon Google can use in results (needs >= 48px, multiple of 48)
  if (!/<link[^>]*rel="icon"[^>]*sizes="(48x48|96x96|144x144|192x192)"/.test(html))
    fail(path, 'no favicon link at a Google-usable size (48/96/144/192px)')

  // headings
  const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? []
  if (h1s.length !== 1) fail(path, `expected 1 <h1>, found ${h1s.length}`)

  // images
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (attr(img, 'alt') === undefined) fail(path, `img without alt: ${img.slice(0, 90)}`)
    if (!attr(img, 'width') || !attr(img, 'height'))
      warn(path, `img without intrinsic width/height (CLS risk): ${attr(img, 'src')?.slice(0, 60)}`)
  }

  // JSON-LD parses, and its URLs point somewhere real
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data
    try {
      data = JSON.parse(m[1])
    } catch (e) {
      fail(path, `JSON-LD does not parse: ${e.message}`)
      continue
    }
    const json = JSON.stringify(data)
    for (const u of json.match(/https:\/\/contrafaba\.com\/[^"#]*/g) ?? []) {
      const p = u.slice(ORIGIN.length)
      const exists = pages.has(p) || servedFiles.has(p)
      if (!exists) fail(path, `JSON-LD references a URL that does not exist: ${u}`)
    }
  }

  // internal links: resolve, carry the trailing slash, never redirect
  for (const a of html.match(/<a\b[^>]*>/g) ?? []) {
    let href = attr(a, 'href')
    if (!href || /^(mailto:|tel:|#)/.test(href)) continue
    if (href.startsWith(ORIGIN)) href = href.slice(ORIGIN.length) || '/'
    if (/^https?:/.test(href)) continue
    const bare = href.split('#')[0].split('?')[0]
    if (!bare) continue
    if (!pages.has(bare) && !servedFiles.has(bare)) {
      fail(
        path,
        pages.has(bare + '/')
          ? `internal link without trailing slash (would redirect): ${href}`
          : `broken internal link: ${href}`
      )
      continue
    }
    if (pages.has(bare) && !bare.endsWith('/'))
      fail(path, `internal link without trailing slash (would redirect): ${href}`)
    if (bare !== path) inboundLinks.set(bare, (inboundLinks.get(bare) ?? 0) + 1)
  }
}

for (const [t, ps] of titles) if (ps.length > 1) fail(ps.join(', '), `duplicate title "${t}"`)
for (const [d, ps] of descriptions) if (ps.length > 1) fail(ps.join(', '), `duplicate description`)

// --- Relationship checks ------------------------------------------------------
// Every indexable page needs at least one internal link to it in server HTML -
// sitemap-only discovery is how the Mutomorro hubs went unnoticed for months.
for (const u of sitemapUrls) {
  const p = u.slice(ORIGIN.length)
  if (p !== '/' && !inboundLinks.get(p)) fail(p, 'orphan - no internal page links to it')
}

// Hub -> children: every case study must be linked from /our-work/, and every
// service detail page from /services/.
const hubs = [
  { hub: '/our-work/', prefix: '/our-work/' },
  { hub: '/services/', prefix: '/services/' },
]
for (const { hub, prefix } of hubs) {
  const html = pages.get(hub) ?? ''
  const children = [...pages.keys()].filter((p) => p.startsWith(prefix) && p !== prefix)
  for (const child of children) {
    if (!html.includes(`href="${child}"`)) fail(hub, `hub does not link to its child ${child}`)
  }
}

// --- Report -------------------------------------------------------------------
console.log(`Checked ${pages.size} pages, ${sitemapUrls.size} sitemap URLs.\n`)
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`)
  for (const w of warnings) console.log('  ~ ' + w)
  console.log()
}
if (failures.length) {
  console.log(`FAILURES (${failures.length}):`)
  for (const f of failures) console.log('  x ' + f)
  process.exit(1)
}
console.log('All checks passed.')
