import type { Metadata } from 'next'
import { BlobOrange1, BlobTeal, BlobMustard } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore our portfolio of cost consultancy projects across London, the South East and Scotland.',
}

export default function OurWorkPage() {
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

      {/* Coming Soon */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-peach rounded-full mx-auto mb-6 flex items-center justify-content relative overflow-hidden">
              <BlobMustard className="w-10 h-10 text-mustard blend-multiply opacity-60" />
            </div>
            <h3 className="mb-3">Projects coming soon</h3>
            <p className="max-w-md mx-auto">
              We&apos;re putting together our portfolio. Check back soon to
              see examples of our work.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
