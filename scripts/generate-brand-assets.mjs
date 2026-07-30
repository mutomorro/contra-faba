/**
 * Generates the favicon set, the trimmed nav logo, and the social share image.
 *
 * The source logo.png carries roughly 28% empty padding on every edge, which is
 * why the nav logo previously had to be scaled to 3x to look right. Trimming to
 * the content bounds lets the header size it honestly.
 *
 * Run with: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const SRC_LOGO = 'src/assets/brand/logo.png'
const SRC_LOGO_WHITE = 'src/assets/brand/logo-white.png'

const PEACH = '#FCE8DB'
const TEAL = '#03333D'

await mkdir('public', { recursive: true })

// ---------------------------------------------------------------------------
// 1. Trim the logos to their content bounds
// ---------------------------------------------------------------------------
for (const [src, out] of [
  [SRC_LOGO, 'src/assets/brand/logo-trimmed.png'],
  [SRC_LOGO_WHITE, 'src/assets/brand/logo-white-trimmed.png'],
]) {
  const before = await sharp(src).metadata()
  await sharp(src).trim({ threshold: 1 }).toFile(out)
  const after = await sharp(out).metadata()
  console.log(
    `trimmed ${src}: ${before.width}x${before.height} -> ${after.width}x${after.height}`
  )
}

// ---------------------------------------------------------------------------
// 2. Favicon — the bean mark alone, drawn as SVG so it scales cleanly.
//    Path is the same 'mark' shape used by BlobShapes.astro.
// ---------------------------------------------------------------------------
const MARK_PATH =
  'M50,5 C75,5 90,25 90,55 C90,85 75,115 50,115 C25,115 10,90 10,65 C10,35 25,5 50,5Z'

// The mark path's real ink bounds are x 10..90, y 5..115 inside its 100x120
// viewBox — not the viewBox itself. Centring on the viewBox leaves the shape
// visibly high and small, so the transform is derived from the ink bounds.
const INK = { x: 10, y: 5, w: 80, h: 110 }
const CANVAS = 128
const TARGET_H = 92 // leaves ~18px breathing room top and bottom
const SCALE = TARGET_H / INK.h
const TX = (CANVAS - INK.w * SCALE) / 2 - INK.x * SCALE
const TY = (CANVAS - INK.h * SCALE) / 2 - INK.y * SCALE

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">
  <rect width="${CANVAS}" height="${CANVAS}" rx="24" fill="${TEAL}"/>
  <g transform="translate(${TX.toFixed(2)} ${TY.toFixed(2)}) scale(${SCALE.toFixed(4)})">
    <path d="${MARK_PATH}" fill="${PEACH}"/>
  </g>
</svg>
`
await writeFile('public/favicon.svg', faviconSvg)
console.log('wrote public/favicon.svg')

const faviconBuffer = Buffer.from(faviconSvg)
for (const size of [16, 32, 180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`
  await sharp(faviconBuffer, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(`public/${name}`)
  console.log(`wrote public/${name}`)
}

// ---------------------------------------------------------------------------
// 3. Open Graph share image (1200x630)
//    Built from shapes + the real logo, so no font rendering is involved and
//    the output cannot silently fall back to a substitute typeface.
// ---------------------------------------------------------------------------
const OG_W = 1200
const OG_H = 630

const blobs = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${PEACH}"/>
  <g style="mix-blend-mode:multiply">
    <g transform="translate(880 -120) scale(1.05)">
      <path d="M390,270Q350,370,250,410Q150,450,90,360Q30,270,80,180Q130,90,230,60Q330,30,380,130Q430,230,410,250Z" fill="${TEAL}" opacity="0.9"/>
    </g>
    <g transform="translate(950 150) scale(0.9)">
      <path d="M420,260Q390,360,300,410Q210,460,130,390Q50,320,70,220Q90,120,180,70Q270,20,360,80Q450,140,440,200Z" fill="#E4A108" opacity="0.85"/>
    </g>
    <g transform="translate(900 330) scale(0.85)">
      <path d="M425,250Q400,350,310,400Q220,450,140,390Q60,330,70,240Q80,150,160,90Q240,30,330,75Q420,120,435,185Z" fill="#F04E23" opacity="0.9"/>
    </g>
  </g>
</svg>
`

const logoTrimmed = await sharp('src/assets/brand/logo-trimmed.png')
  .resize({ width: 620, withoutEnlargement: true })
  .toBuffer()
const logoMeta = await sharp(logoTrimmed).metadata()

await sharp(Buffer.from(blobs))
  .composite([
    { input: logoTrimmed, left: 90, top: Math.round((OG_H - (logoMeta.height ?? 0)) / 2) },
  ])
  .png()
  .toFile('public/og-image.png')
console.log(`wrote public/og-image.png (${OG_W}x${OG_H})`)

// ---------------------------------------------------------------------------
// 4. Web manifest
// ---------------------------------------------------------------------------
await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Contra Faba',
      short_name: 'Contra Faba',
      description: 'Cost consultants for the construction industry',
      start_url: '/',
      display: 'browser',
      background_color: PEACH,
      theme_color: TEAL,
      icons: [
        { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  ) + '\n'
)
console.log('wrote public/site.webmanifest')
