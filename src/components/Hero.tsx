import Link from 'next/link'
import {
  BlobOrange1,
  BlobTeal,
  BlobMustard,
} from '@/components/BlobShapes'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-peach">
      {/* Two-column grid: text left, blobs right */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left column - text content */}
          <div className="md:col-span-7 lg:col-span-7">
            <p className="section-label animate-fade-up">Cost Consultants</p>

            <h1 className="mt-4 animate-fade-up-delay-1">
              Cost consultants for the construction industry
            </h1>

            <p className="mt-6 text-lg leading-relaxed opacity-75 animate-fade-up-delay-2">
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

          {/* Right column - spacer to prevent text overlapping blobs */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5" />
        </div>
      </div>

      {/* Oversized blobs anchored to the right side */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Blob 1 - Teal (largest, top-right) */}
        <BlobTeal
          className="absolute -top-[10%] -right-[12%] w-[500px] h-[500px] md:w-[580px] md:h-[580px] lg:w-[650px] lg:h-[650px] text-teal blend-multiply opacity-90 blob-animate-1"
        />

        {/* Blob 2 - Mustard (medium, mid-right) */}
        <BlobMustard
          className="absolute top-[20%] -right-[8%] w-[420px] h-[420px] md:w-[480px] md:h-[480px] lg:w-[550px] lg:h-[550px] text-mustard blend-multiply opacity-85 blob-animate-2"
        />

        {/* Blob 3 - Orange (medium-large, bottom-right) */}
        <BlobOrange1
          className="absolute -bottom-[8%] -right-[10%] w-[400px] h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] text-orange blend-multiply opacity-90 blob-animate-3"
        />
      </div>
    </section>
  )
}
