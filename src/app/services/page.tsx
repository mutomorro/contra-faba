import type { Metadata } from 'next'
import Link from 'next/link'
import { BlobMustard, BlobOrange1, BlobTeal } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Our cost consultancy services: feasibility estimates, detailed cost estimates, quantity surveying, and contract administration.',
}

const services = [
  {
    title: 'Feasibility Estimates',
    subtitle: 'Is your project viable?',
    description:
      'For when you want a ballpark estimate to check the feasibility of your project. We provide early-stage cost guidance that helps you make informed decisions before committing significant resources.',
    features: [
      'High-level cost assessments',
      'Budget benchmarking',
      'Risk identification',
      'Early-stage value engineering',
    ],
    accent: 'bg-orange',
    accentLight: 'bg-orange/10',
  },
  {
    title: 'Detailed Cost Estimates',
    subtitle: 'Know your numbers',
    description:
      'For when you have detailed drawings and material specifications and need detailed costs. We break down every element of your project to give you a comprehensive, reliable cost picture.',
    features: [
      'Elemental cost breakdowns',
      'Material and labour pricing',
      'Specification analysis',
      'Cost comparison reports',
    ],
    accent: 'bg-teal',
    accentLight: 'bg-teal/10',
  },
  {
    title: 'Quantity Surveying',
    subtitle: 'Full project oversight',
    description:
      'For when you want someone to manage the whole process - from inception to completion. We provide comprehensive quantity surveying services that keep your project on track and on budget.',
    features: [
      'Bill of quantities preparation',
      'Tender documentation',
      'Interim valuations',
      'Final account settlement',
    ],
    accent: 'bg-mustard',
    accentLight: 'bg-mustard/10',
  },
  {
    title: 'Contract Administration',
    subtitle: 'Managing the process',
    description:
      'For when you need someone to manage the contract management process for you. We handle the complex administrative side so you can focus on delivering your project.',
    features: [
      'Contract documentation',
      'Variation management',
      'Payment certification',
      'Dispute resolution support',
    ],
    accent: 'bg-orange',
    accentLight: 'bg-orange/10',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-peach overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobMustard className="absolute -top-32 -right-20 w-[500px] h-[500px] text-mustard blend-multiply opacity-25 blob-animate-1" />
          <BlobOrange1 className="absolute -bottom-32 -left-20 w-[400px] h-[400px] text-orange blend-multiply opacity-20 blob-animate-3" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">Services</p>
          <h1 className="mt-4 max-w-3xl">Expert cost consultancy, tailored to you</h1>
          <p className="mt-6 text-lg max-w-2xl">
            Whether you need a quick feasibility check or full project
            management, we have the expertise to support you at every stage.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
              >
                <div className="lg:col-span-3">
                  <div className={`w-3 h-3 rounded-full ${service.accent} mb-6`} />
                  <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-2 !opacity-100">
                    {service.subtitle}
                  </p>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="leading-relaxed">{service.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <div className={`${service.accentLight} rounded-xl p-6`}>
                    <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-4 !opacity-100">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${service.accent} mt-2 shrink-0`} />
                          <span className="!opacity-70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 bg-teal overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobTeal className="absolute -bottom-20 -right-20 w-[400px] h-[400px] text-teal-light opacity-30 blob-animate-1" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="!text-white max-w-2xl mx-auto">Not sure what you need?</h2>
          <p className="mt-6 !text-white/60 max-w-lg mx-auto !opacity-100">
            Every project is different. Get in touch and we&apos;ll help you
            figure out the right approach for your specific situation.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-peach text-teal font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-white transition-all hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
