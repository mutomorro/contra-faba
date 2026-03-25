import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { BlobOrange1, BlobTeal, BlobMustard } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore our portfolio of cost consultancy projects across London, the South East and Scotland.',
}

interface Project {
  _id: string
  title: string
  slug: { current: string }
  clientType: string
  summary: string
  featuredImage?: {
    asset: {
      url: string
    }
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(publishedDate desc) {
        _id,
        title,
        slug,
        clientType,
        summary,
        featuredImage {
          asset-> { url }
        }
      }`
    )
  } catch {
    return []
  }
}

export default async function OurWorkPage() {
  const projects = await getProjects()

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

      {/* Projects Grid */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/our-work/${project.slug.current}`}
                  className="group"
                >
                  <article className="service-card h-full flex flex-col">
                    {project.featuredImage?.asset?.url ? (
                      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-peach">
                        <img
                          src={project.featuredImage.asset.url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] rounded-lg mb-6 bg-peach relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                          <BlobOrange1 className="absolute top-4 right-4 w-20 h-20 text-orange blend-multiply opacity-40" />
                          <BlobTeal className="absolute bottom-4 left-4 w-24 h-24 text-teal blend-multiply opacity-30" />
                        </div>
                      </div>
                    )}
                    {project.clientType && (
                      <span className="inline-block self-start text-xs font-semibold tracking-wider uppercase text-orange bg-orange/10 px-3 py-1 rounded-full mb-3">
                        {project.clientType}
                      </span>
                    )}
                    <h3 className="group-hover:text-teal transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm line-clamp-3 flex-1">{project.summary}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-teal mt-4 group-hover:gap-3 transition-all !opacity-100">
                      View project
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </article>
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
    </>
  )
}
