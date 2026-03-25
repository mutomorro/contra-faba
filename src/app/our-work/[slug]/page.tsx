import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { projectBySlugQuery, allProjectsQuery } from '@/lib/queries'
import { createImageUrlBuilder } from '@sanity/image-url'
import { PortableText } from 'next-sanity'
import { BlobOrange1, BlobTeal } from '@/components/BlobShapes'

const builder = createImageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: { current: string } }[]>(
    allProjectsQuery
  )
  return projects.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary ?? '',
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-peach overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobOrange1 className="absolute -top-20 -right-32 w-[450px] h-[450px] text-orange blend-multiply opacity-25 blob-animate-1" />
          <BlobTeal className="absolute -bottom-20 left-0 w-[350px] h-[350px] text-teal blend-multiply opacity-20 blob-animate-2" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm opacity-60">
            <Link href="/our-work" className="hover:opacity-100 transition">
              Our Work
            </Link>
            <span>/</span>
            <span>{project.title}</span>
          </nav>

          {project.clientType && (
            <p className="section-label">{project.clientType}</p>
          )}
          <h1 className="mt-4 max-w-3xl">{project.title}</h1>
          {project.summary && (
            <p className="mt-6 text-lg max-w-2xl">{project.summary}</p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {project.featuredImage && (
        <section className="bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] shadow-lg">
              <Image
                src={urlFor(project.featuredImage)
                  .width(1400)
                  .height(788)
                  .url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      {project.description && (
        <section className="py-24 lg:py-32 bg-cream">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 prose prose-lg">
            <PortableText value={project.description} />
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24 lg:pb-32 bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-12">Gallery</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"
                >
                  <Image
                    src={urlFor(img).width(800).height(600).url()}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="pb-24 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/our-work" className="btn-secondary">
            &larr; Back to Our Work
          </Link>
        </div>
      </section>
    </>
  )
}
