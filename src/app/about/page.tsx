import type { Metadata } from 'next'
import { BlobTeal, BlobMustard, BlobOrange1, BlobOrange2, BlobBean } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Contra Faba - cost consultants for the construction industry led by Jamie Gould.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-peach overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobTeal className="absolute -top-20 -right-32 w-[400px] h-[400px] text-teal blend-multiply opacity-30 blob-animate-2" />
          <BlobMustard className="absolute -bottom-20 left-0 w-[300px] h-[300px] text-mustard blend-multiply opacity-20 blob-animate-3" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">About us</p>
          <h1 className="mt-4 max-w-3xl">Taking the beans out of counting</h1>
          <p className="mt-6 text-lg max-w-2xl">
            Contra Faba was founded with a clear mission: to provide transparent,
            reliable cost consultancy that puts clients first.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Our story</p>
              <h2 className="mt-4">Built on experience, driven by values</h2>
              <div className="mt-8 space-y-6">
                <p>
                  Contra Faba was established to offer a fresh, client-centred
                  approach to cost consultancy in the construction industry.
                  Founded by Jamie Gould, our practice brings together deep
                  industry experience with a modern, collaborative methodology.
                </p>
                <p>
                  We believe that effective cost management is the foundation of
                  every successful construction project. By providing clear,
                  honest advice from the earliest stages, we help our clients
                  make informed decisions that protect their investments.
                </p>
                <p>
                  Based in London with strong ties to Glasgow and the Scottish
                  Highlands, we serve architects, contractors and homeowners
                  across the South East of England and Scotland.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-peach rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <BlobOrange1 className="absolute top-8 right-4 w-44 h-44 text-orange blend-multiply opacity-60 blob-animate-1" />
                  <BlobTeal className="absolute bottom-8 left-4 w-52 h-52 text-teal blend-multiply opacity-40 blob-animate-3" />
                  <BlobMustard className="absolute top-1/3 left-1/4 w-36 h-36 text-mustard blend-multiply opacity-50 blob-animate-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-peach-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Our values</p>
            <h2 className="mt-4">What guides us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Integrity',
                description:
                  'We provide honest, transparent advice. Our recommendations are always in our clients\' best interest, even when it means giving news they might not want to hear.',
                accent: 'bg-teal',
              },
              {
                title: 'Collaboration',
                description:
                  'We work as an extension of your team, not as outsiders. The best outcomes come from close partnership and open communication.',
                accent: 'bg-orange',
              },
              {
                title: 'Innovation',
                description:
                  'We embrace modern tools and methodologies to deliver better, faster results. Technology like CostX and BCIS helps us stay ahead.',
                accent: 'bg-mustard',
              },
              {
                title: 'Client-centricity',
                description:
                  'Every project is different, every client is unique. We tailor our approach to fit your specific needs, budget and timeline.',
                accent: 'bg-teal',
              },
            ].map((value) => (
              <div key={value.title} className="service-card">
                <div className={`w-3 h-3 rounded-full ${value.accent} mb-6`} />
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="relative py-24 lg:py-32 bg-teal overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobBean className="absolute -bottom-16 -right-16 w-[300px] h-[300px] text-teal-light opacity-30 blob-animate-3" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label !text-orange-light">Sustainability</p>
            <h2 className="mt-4 !text-white">Building a more sustainable future</h2>
            <p className="mt-6 !text-white/60 leading-relaxed !opacity-100">
              We&apos;re committed to promoting sustainable practices in
              construction. From recommending sustainable materials to advising
              on waste reduction and energy efficiency, we help our clients make
              choices that are good for both their budget and the planet.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
