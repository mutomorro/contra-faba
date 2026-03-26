import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BlobMustard, BlobOrange1, BlobTeal } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Our cost consultancy services: feasibility estimates, cost estimating, budget development, cost control, quantity surveying, and value engineering.',
}

const services = [
  {
    title: 'Feasibility Estimates',
    subtitle: 'Is your project viable?',
    description:
      'Our Feasibility Estimates provide a preliminary look at project costs and financial viability, offering an early snapshot that helps determine if your project is worth pursuing. This service lays the groundwork by quickly assessing economic feasibility, so you can move forward with confidence.',
    features: [
      'High-level cost assessments',
      'Budget benchmarking',
      'Risk identification',
      'Early-stage value engineering',
    ],
    accent: 'bg-orange',
    accentLight: 'bg-orange/10',
    image: '/images/wordpress/Feasability-Estimates.png',
  },
  {
    title: 'Cost Estimating',
    subtitle: 'Know your numbers',
    description:
      'Cost Estimating delivers a detailed forecast of project expenses based on a comprehensive analysis of materials, labour, and market conditions. By providing accurate, data-driven figures, this service helps you plan effectively and make informed decisions throughout the project lifecycle.',
    features: [
      'Elemental cost breakdowns',
      'Material and labour pricing',
      'Specification analysis',
      'Cost comparison reports',
    ],
    accent: 'bg-teal',
    accentLight: 'bg-teal/10',
    image: '/images/wordpress/Cost-Estimating.png',
  },
  {
    title: 'Budget Development & Cost Planning',
    subtitle: 'Plan with clarity',
    description:
      'Budget Development & Cost Planning creates a structured financial roadmap for your project, ensuring that funds are allocated efficiently at every stage. This service offers clarity and control over your budget, reducing the risk of unexpected expenses and keeping your project on track.',
    features: [
      'Structured financial roadmaps',
      'Stage-by-stage fund allocation',
      'Contingency planning',
      'Cost benchmarking against targets',
    ],
    accent: 'bg-mustard',
    accentLight: 'bg-mustard/10',
    image: '/images/wordpress/Budget-Planning.png',
  },
  {
    title: 'Cost Control & Monitoring',
    subtitle: 'Stay on budget',
    description:
      'Cost Control & Monitoring focuses on tracking expenditures in real time, comparing actual spending against your planned budget. This proactive service enables timely adjustments, ensuring that your project remains financially sound from start to finish.',
    features: [
      'Real-time expenditure tracking',
      'Budget vs actual reporting',
      'Variance analysis',
      'Timely corrective recommendations',
    ],
    accent: 'bg-orange',
    accentLight: 'bg-orange/10',
    image: '/images/wordpress/Cost-Control-Monitoring.png',
  },
  {
    title: 'Quantity Surveying',
    subtitle: 'Full project oversight',
    description:
      'Quantity Surveying involves the precise measurement and quantification of all project components, from materials to labour. By ensuring that every element is accurately accounted for, this service supports reliable budgeting and helps minimize waste.',
    features: [
      'Bill of quantities preparation',
      'Tender documentation',
      'Interim valuations',
      'Final account settlement',
    ],
    accent: 'bg-teal',
    accentLight: 'bg-teal/10',
    image: '/images/wordpress/Limehouse108of2.jpg',
  },
  {
    title: 'Value Engineering',
    subtitle: 'Maximise your investment',
    description:
      'Value Engineering is a strategic approach to enhancing your project\u2019s value by identifying cost-effective alternatives without sacrificing quality. Through detailed analysis and collaborative exploration, this service optimises design and construction decisions, maximising the overall return on your investment.',
    features: [
      'Cost-effective alternative analysis',
      'Design optimisation reviews',
      'Quality-cost balance assessment',
      'Investment return maximisation',
    ],
    accent: 'bg-mustard',
    accentLight: 'bg-mustard/10',
    image: '/images/wordpress/DSCF3829.jpg',
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
            At Contra Faba, we offer a comprehensive suite of cost consulting
            solutions designed to guide your project from initial concept to
            completion. Whether you&apos;re a contractor, architect, or homeowner,
            our services provide clarity, control, and confidence in every stage
            of your project.
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
                className="service-card overflow-hidden"
              >
                {service.image && (
                  <div className="relative h-56 -mx-[2.5rem] -mt-[2.5rem] mb-8 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
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
