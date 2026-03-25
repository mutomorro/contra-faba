import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our project portfolio. Cost consultancy work across architecture, construction, and residential projects.",
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function OurWorkPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-20 md:py-28">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Our Work
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance max-w-3xl">
            Projects we&apos;re proud of
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            A selection of projects where we&apos;ve helped architects, contractors,
            and homeowners manage their costs effectively.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding">
        <div className="container-site">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-mid-grey text-lg">
                Projects coming soon. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/our-work/${project.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-brand-off-white mb-4">
                    {project.featuredImage && (
                      <Image
                        src={urlFor(project.featuredImage)
                          .width(600)
                          .height(375)
                          .url()}
                        alt={project.featuredImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                        {project.clientType}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-slate line-clamp-2">
                    {project.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
