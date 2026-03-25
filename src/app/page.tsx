import Link from 'next/link'
import Hero from '@/components/Hero'
import { BlobTeal, BlobOrange1 } from '@/components/BlobShapes'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">What we do</p>
            <h2 className="mt-4">Popular services</h2>
            <p className="mt-4 mx-auto">
              We offer a range of services designed for architects, contractors
              and homeowners to help them manage their project costs effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Feasibility Estimates',
                description:
                  'For when you want a ballpark estimate to check the feasibility of your project.',
                icon: '📐',
              },
              {
                title: 'Detailed Cost Estimates',
                description:
                  'For when you have detailed drawings and material specifications and need detailed costs.',
                icon: '📊',
              },
              {
                title: 'Quantity Surveying',
                description:
                  'For when you want someone to manage the whole process - from inception to completion.',
                icon: '📋',
              },
              {
                title: 'Contract Administration',
                description:
                  'For when you need someone to manage the contract management process for you.',
                icon: '📑',
              },
            ].map((service) => (
              <div key={service.title} className="service-card group">
                <div className="w-12 h-12 rounded-xl bg-peach flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24 lg:py-32 bg-peach-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Who we work with</p>
            <h2 className="mt-4">Tailored to your needs</h2>
            <p className="mt-4 mx-auto">
              We collaborate with a diverse range of clients. Our adaptable
              approach ensures that regardless of your role or project size, you
              receive expert guidance and personalised attention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Architects',
                description:
                  'We integrate cost insights from the earliest design stages, ensuring every aesthetic and functional decision aligns with your budget.',
                accent: 'bg-orange',
              },
              {
                title: 'Contractors',
                description:
                  'We work hand-in-hand with your team to identify cost-saving opportunities and maintain strict financial oversight throughout the project lifecycle.',
                accent: 'bg-teal',
              },
              {
                title: 'Homeowners',
                description:
                  'From initial feasibility studies to final cost control, our approach is designed to keep you informed and confident about your investment.',
                accent: 'bg-mustard',
              },
            ].map((client) => (
              <div key={client.title} className="client-card">
                <div className={`w-3 h-3 rounded-full ${client.accent} mb-6`} />
                <h3 className="mb-4">{client.title}</h3>
                <p className="text-sm leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-teal overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobTeal className="absolute -top-20 -right-20 w-[400px] h-[400px] text-teal-light opacity-40 blob-animate-1" />
          <BlobOrange1 className="absolute -bottom-20 -left-20 w-[300px] h-[300px] text-orange opacity-15 blob-animate-2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="!text-white max-w-2xl mx-auto">
            Ready to take control of your project costs?
          </h2>
          <p className="mt-6 !text-white/60 max-w-lg mx-auto !opacity-100">
            Get in touch to discuss how we can help you manage your next project
            with confidence.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-peach text-teal font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-white transition-all hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
