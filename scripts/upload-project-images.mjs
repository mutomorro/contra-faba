import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const client = createClient({
  projectId: 'bbfankjm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const imgDir = resolve('public/images/wordpress')

async function uploadImage(filename) {
  const filepath = resolve(imgDir, filename)
  const buffer = readFileSync(filepath)
  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(`  Uploaded: ${filename} -> ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const projects = [
  {
    slug: 'crossbasket-spa-and-wellness',
    featuredImage: 'Crossbasket-Spa-and-Wellness.jpg',
  },
  {
    slug: 'battersea-renovation',
    featuredImage: 'Battersea-copy.png',
  },
  {
    slug: 'wandsworth-renovation',
    featuredImage: 'Wandsworth.jpeg',
  },
  {
    slug: 'tufnell-park-renovation',
    featuredImage: 'Tufnell.jpeg',
  },
  {
    slug: 'ravenscourt-renovation',
    featuredImage: 'Ravenscourt.jpeg',
  },
  {
    slug: 'limehouse-retreat',
    featuredImage: 'Limehouse48of107.jpg',
    gallery: [
      'Limehouse48of107.jpg',
      'Limehouse49of107.jpg',
      'Limehouse50of107.jpg',
      'Limehouse66of107.jpg',
      'Limehouse84of107.jpg',
      'limehouse86of107.jpg',
      'Limehouse100of107.jpg',
      'Limehouse105of107.jpg',
      'Limehouse107of107.jpg',
      'Limehouse108of2.jpg',
    ],
  },
  {
    slug: 'hammersmith-renovation',
    featuredImage: 'DSC00219.jpg',
    gallery: [
      'DSC00219.jpg',
      'DSC00159.jpg',
      'DSC00082.jpg',
      'DSC00218.jpg',
      'DSC00059.jpg',
      'DSC00006.jpg',
    ],
  },
]

async function main() {
  for (const proj of projects) {
    console.log(`\nProcessing: ${proj.slug}`)

    // Find the document
    const doc = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{_id}`,
      { slug: proj.slug }
    )
    if (!doc) {
      console.log(`  SKIP: No document found for ${proj.slug}`)
      continue
    }

    // Upload featured image
    const featured = await uploadImage(proj.featuredImage)

    // Upload gallery images if any
    let gallery = undefined
    if (proj.gallery) {
      gallery = []
      for (const img of proj.gallery) {
        const uploaded = await uploadImage(img)
        gallery.push({ ...uploaded, _key: Math.random().toString(36).slice(2, 10) })
      }
    }

    // Patch the document
    const patch = client.patch(doc._id).set({ featuredImage: featured })
    if (gallery) {
      patch.set({ gallery })
    }
    await patch.commit()
    console.log(`  Patched: ${doc._id}`)
  }

  console.log('\nDone!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
