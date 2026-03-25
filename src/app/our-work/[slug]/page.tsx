import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { getProject, getProjectSlugs } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-20 md:py-28">
          <Link
            href="/our-work"
            className="text-sm text-white/50 hover:text-white/80 transition-colors mb-6 inline-block"
          >
            &larr; Back to Our Work
          </Link>
          <span className="block text-brand-gold font-semibold text-sm uppercase tracking-wider mb-3 capitalize">
            {project.clientType}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-balance max-w-3xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Featured image */}
      {project.featuredImage && (
        <section className="container-site -mt-8 mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(project.featuredImage).width(1200).height(675).url()}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding-sm">
        <div className="container-site">
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:text-brand-navy prose-a:text-brand-gold">
            {project.description && (
              <PortableText value={project.description} />
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section-padding-sm">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden"
                >
                  <Image
                    src={urlFor(image).width(600).height(375).url()}
                    alt={image.alt || `Gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-off-white">
        <div className="container-site section-padding text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy text-balance">
            Interested in working together?
          </h2>
          <p className="mt-3 text-brand-slate max-w-md mx-auto">
            Get in touch to discuss how we can help with your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-md hover:bg-brand-gold-light transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
