import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { allProjectsQuery } from '@/lib/queries'
import { createImageUrlBuilder } from '@sanity/image-url'
import { BlobOrange1, BlobTeal, BlobMustard } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore our portfolio of cost consultancy projects across London, the South East and Scotland.',
}

const builder = createImageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

type Project = {
  _id: string
  title: string
  slug: { current: string }
  clientType?: string
  projectType?: string
  location?: string
  budget?: string
  role?: string
  status?: string
  summary?: string
  featuredImage?: any
  publishedDate?: string
  featured?: boolean
}

export default async function OurWorkPage() {
  const projects: Project[] = await client.fetch(allProjectsQuery)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-peach overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobOrange1 className="absolute -top-20 -right-32 w-[450px] h-[450px] text-orange blend-multiply opacity-25 blob-animate-1" />
          <BlobTeal className="absolute -bottom-20 left-0 w-[350px] h-[350px] text-teal blend-multiply opacity-20 blob-animate-2" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">Our work</p>
          <h1 className="mt-4 max-w-3xl">Projects we&apos;re proud of</h1>
          <p className="mt-6 text-lg max-w-2xl">
            A selection of projects where we&apos;ve helped architects,
            contractors and homeowners manage their costs effectively.
          </p>
        </div>
      </section>

      {/* Projects Grid or Coming Soon */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/our-work/${project.slug.current}`}
                  className="group service-card block overflow-hidden"
                >
                  {project.featuredImage && (
                    <div className="relative h-56 -mx-[2.5rem] -mt-[2.5rem] mb-6 overflow-hidden rounded-t-[var(--radius-card)]">
                      <Image
                        src={urlFor(project.featuredImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {project.projectType && (
                      <span className="text-xs font-semibold tracking-wider uppercase text-orange !opacity-100">
                        {project.projectType}
                      </span>
                    )}
                    {project.location && (
                      <span className="text-xs text-ink/40 !opacity-100">
                        {project.location}
                      </span>
                    )}
                    {project.status && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full !opacity-100 ${
                        project.status === 'completed'
                          ? 'bg-teal/10 text-teal'
                          : project.status === 'in-progress'
                          ? 'bg-orange/10 text-orange'
                          : 'bg-mustard/10 text-mustard-dark'
                      }`}>
                        {project.status === 'pre-construction'
                          ? 'Pre-construction'
                          : project.status === 'in-progress'
                          ? 'In Progress'
                          : 'Completed'}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2">{project.title}</h3>
                  {project.summary && (
                    <p className="text-sm line-clamp-3">{project.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-peach rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
                <BlobMustard className="w-10 h-10 text-mustard blend-multiply opacity-60" />
              </div>
              <h3 className="mb-3">Projects coming soon</h3>
              <p className="max-w-md mx-auto">
                We&apos;re putting together our portfolio. Check back soon to
                see examples of our work.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 lg:py-32 bg-peach-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Our clients</p>
            <h2 className="mt-4">Trusted by leading practices</h2>
          </div>

          {/* Architect clients */}
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-6 text-center !opacity-100">
              Architects
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 items-center justify-items-center">
              {Array.from({ length: 14 }, (_, i) => (
                <div key={`arch-${i}`} className="relative h-12 w-full flex items-center justify-center">
                  <Image
                    src={`/images/wordpress/arch-client-${String(i + 1).padStart(2, '0')}.png`}
                    alt={`Architecture client ${i + 1}`}
                    width={120}
                    height={48}
                    className="object-contain h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contractor clients */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-6 text-center !opacity-100">
              Contractors
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              {[
                'Maro-Construction-Logo.png',
                'Eco-Construction-Scotland-Logo.png',
                'Sygnet-Style-logo.png',
                'Hawksmore-Construction-Logo.png',
                'Highline-homes-logo.png',
                'OakTree-Renovations-Logo.png',
              ].map((logo, i) => (
                <div key={logo} className="relative h-12 w-full flex items-center justify-center">
                  <Image
                    src={`/images/wordpress/${logo}`}
                    alt={`Contractor client ${i + 1}`}
                    width={120}
                    height={48}
                    className="object-contain h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
