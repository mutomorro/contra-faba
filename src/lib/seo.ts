import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'

export interface SeoImage {
  /** Root-relative or absolute URL of the share image. */
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Cut text to fit a meta description without breaking a word in half.
 *
 * Google shows roughly 155-160 characters. A hard `.slice(0, 155)` leaves a
 * half-word at the end of the snippet ("...with modern eleg"), which reads as a
 * mistake. This cuts at the last space and adds an ellipsis only when it cut.
 */
export function fitDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s-]+$/, '')}…`
}

/**
 * Build a 1200x630 JPEG share card from a content image, so a shared case study
 * shows that project's photograph rather than the generic brand card.
 * JPEG rather than WebP because some link unfurlers still reject WebP.
 */
export async function shareImage(src: ImageMetadata, alt: string): Promise<SeoImage> {
  const img = await getImage({ src, width: 1200, height: 630, fit: 'cover', format: 'jpg' })
  return { src: img.src, alt, width: 1200, height: 630 }
}
