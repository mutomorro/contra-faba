import Link from 'next/link'
import {
  BlobOrange1,
  BlobOrange2,
  BlobTeal,
  BlobMustard,
  BlobBean,
} from '@/components/BlobShapes'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-peach">
      {/* Organic SVG blobs with floating animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large orange blob - top left */}
        <BlobOrange1
          className="absolute -top-32 -left-24 w-[420px] h-[420px] text-orange blend-multiply opacity-90 blob-animate-1"
        />

        {/* Large teal blob - top right */}
        <BlobTeal
          className="absolute -top-20 -right-24 w-[520px] h-[520px] text-teal blend-multiply opacity-90 blob-animate-2"
        />

        {/* Mustard blob - mid right, overlapping teal */}
        <BlobMustard
          className="absolute top-[15%] -right-8 w-[440px] h-[440px] text-mustard blend-multiply opacity-85 blob-animate-3"
        />

        {/* Second orange blob - bottom right */}
        <BlobOrange2
          className="absolute bottom-[-5%] right-[15%] w-[380px] h-[380px] text-orange blend-multiply opacity-80 blob-animate-4"
        />

        {/* Subtle teal accent - bottom left */}
        <BlobBean
          className="absolute -bottom-16 left-[10%] w-[250px] h-[250px] text-teal blend-multiply opacity-30 blob-animate-2"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="section-label animate-fade-up">Cost Consultants</p>

          <h1 className="mt-4 animate-fade-up-delay-1">
            Cost consultants for the construction industry
          </h1>

          <p className="mt-6 text-lg leading-relaxed animate-fade-up-delay-2">
            At Contra Faba, we understand that managing costs is essential to
            your project&apos;s success. We provide tailored solutions that
            drive efficiency, optimise budgets, and ensure transparent
            communication throughout your project lifecycle.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-delay-3">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
