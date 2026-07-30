import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * Case studies. The file name is the slug, so `limehouse-retreat.md` becomes
 * /our-work/limehouse-retreat/.
 *
 * Every field below was exported verbatim from the Sanity dataset this site
 * previously used, so nothing was retyped or paraphrased in the move.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      projectType: z.string(),
      location: z.string(),
      budget: z.string(),
      role: z.string(),
      status: z.enum(['pre-construction', 'in-progress', 'completed']),
      summary: z.string(),
      /** Which client group commissioned the work — reserved for future filtering. */
      clientType: z.enum(['architects', 'contractors', 'homeowners']),
      featured: z.boolean().default(false),
      publishedDate: z.coerce.date(),
      featuredImage: image(),
      featuredImageAlt: z.string(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          })
        )
        .optional(),
    }),
})

/**
 * Services. `order` drives display sequence on /services/ so the list can be
 * reordered without renaming files (which would change nothing publicly, but
 * ordering by filename is a trap waiting to be sprung).
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      order: z.number().int().positive(),
      summary: z.string(),
      includes: z.array(z.string()).min(1),
      accent: z.enum(['orange', 'teal', 'mustard']),
      illustration: image().optional(),
      illustrationAlt: z.string().optional(),
      /** Shown in the four-card grid on the homepage. */
      onHomepage: z.boolean().default(false),
      /** Shorter copy used for the homepage card, where space is tight. */
      homepageSummary: z.string().optional(),
      /**
       * The WordPress site listed six services on /services/ but advertised a
       * different set of four on the homepage — Contract Administration appeared
       * only on the homepage and had no detail page anywhere. That inconsistency
       * is preserved rather than papered over with invented copy; set this true
       * once real copy exists for it.
       */
      listOnServicesPage: z.boolean().default(true),
    }),
})

export const collections = { projects, services }
