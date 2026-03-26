import type { Metadata } from 'next'
import Image from 'next/image'
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
            Founded on a passion for precision and a commitment to transparency,
            Contra Faba began with a simple idea: effective cost management
            transforms projects. From humble beginnings, we&apos;ve grown into a
            trusted partner for contractors, architects, and homeowners, offering
            tailored cost consulting solutions that pave the way for project
            success.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Our approach</p>
              <h2 className="mt-4">Built on experience, driven by values</h2>
              <div className="mt-8 space-y-6">
                <p>
                  At Contra Faba, we believe that great outcomes are achieved
                  through open communication and mutual trust. We take a
                  hands-on, collaborative approach &mdash; engaging with you from
                  the initial consultation to the final review &mdash; to ensure
                  that every decision is informed by accurate data and market
                  insights.
                </p>
                <p>
                  Our friendly and professional team is dedicated to guiding you
                  through the complexities of cost management with clarity and
                  care.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl relative overflow-hidden">
                <Image
                  src="/images/wordpress/DSCF4166-HDR.jpg"
                  alt="Contra Faba project site"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32 bg-peach-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-3xl relative overflow-hidden">
                <Image
                  src="/images/wordpress/Jamie-Gould-Contra-Faba-Headshot.png"
                  alt="Jamie Gould - Contra Faba"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-label">Leadership</p>
              <h2 className="mt-4">Jamie Gould</h2>
              <div className="mt-8 space-y-6">
                <p>
                  Contra Faba is led by Jamie Gould, whose passion for cost
                  management and commitment to excellence have been the driving
                  force behind our work.
                </p>
                <p>
                  While Jamie is the primary consultant, he collaborates with a
                  network of experienced professionals, ensuring you benefit from
                  a broad spectrum of expertise &mdash; all while maintaining a
                  personal touch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With (expanded) */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Who we work with</p>
            <h2 className="mt-4">Tailored to your needs</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: 'Architects',
                description:
                  'At Contra Faba, we collaborate closely with architects to ensure your creative vision is supported by sound financial planning. We integrate cost insights from the earliest design stages, ensuring that every aesthetic and functional decision aligns with your budget. Our proactive approach helps you balance innovation with practicality, so you can deliver designs that are both inspiring and economically viable.',
                accent: 'bg-orange',
              },
              {
                title: 'Contractors',
                description:
                  'For contractors, our services provide detailed cost breakdowns and robust budgeting strategies that empower you to submit competitive bids and manage resources effectively. We work hand-in-hand with your team to identify cost-saving opportunities and maintain strict financial oversight throughout the project lifecycle. With our clear communication and timely reporting, you gain the transparency and support needed to keep your projects on schedule and within budget.',
                accent: 'bg-teal',
              },
              {
                title: 'Homeowners',
                description:
                  'Understanding that home projects are deeply personal, we offer a friendly and transparent service tailored to your unique needs. From initial feasibility studies to final cost control, our approach is designed to keep you informed and confident about your investment. We provide comprehensive guidance to ensure that every decision \u2014 whether it\u2019s a renovation or new construction \u2014 is made with clear financial insight, allowing you to realise your dream project with peace of mind.',
                accent: 'bg-mustard',
              },
            ].map((client) => (
              <div key={client.title} className="service-card">
                <div className={`w-3 h-3 rounded-full ${client.accent} mb-6`} />
                <h3 className="mb-3">{client.title}</h3>
                <p className="leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="py-24 lg:py-32 bg-peach-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Where we work</p>
              <h2 className="mt-4">London, Glasgow &amp; beyond</h2>
              <p className="mt-8 leading-relaxed">
                Based in London and Glasgow, Contra Faba serves clients
                throughout the South East and extends its specialised services to
                Scotland, including the Highlands. Our flexible approach enables
                us to bring our expertise to a broad geographical area.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl relative overflow-hidden">
                <Image
                  src="/images/wordpress/Locations-Contra-Faba.png"
                  alt="Contra Faba locations - London and Glasgow"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-cream">
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
                  'We maintain the highest standards of honesty and transparency in every interaction.',
                accent: 'bg-teal',
              },
              {
                title: 'Collaboration',
                description:
                  'We work closely with you, ensuring a seamless, cooperative process from start to finish.',
                accent: 'bg-orange',
              },
              {
                title: 'Innovation',
                description:
                  'We continuously seek smarter, more efficient ways to manage your costs.',
                accent: 'bg-mustard',
              },
              {
                title: 'Client-centricity',
                description:
                  'Your goals are our goals, and we tailor every solution to meet your unique needs.',
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
          <div className="max-w-2xl mb-12">
            <p className="section-label !text-orange-light">Sustainability</p>
            <h2 className="mt-4 !text-white">Sustainable building practices</h2>
            <p className="mt-6 !text-white/60 leading-relaxed !opacity-100">
              At Contra Faba, we recognise the critical role that cost
              consultants play in promoting sustainable construction. We are
              committed to integrating environmentally responsible practices into
              every project, ensuring that sustainability is not just an
              aspiration but a tangible part of the building process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sustainable Material Choices',
                description:
                  'We actively promote the use of sustainable, locally sourced, and low-carbon materials by providing detailed cost comparisons and lifecycle assessments.',
              },
              {
                title: 'Reducing Construction Waste',
                description:
                  'We incorporate waste-conscious strategies in our estimating and quantity surveying processes to optimise material usage and minimise unnecessary waste.',
              },
              {
                title: 'Energy Efficiency & Low-Carbon Solutions',
                description:
                  'We encourage energy-efficient design and construction methods by advising on cost-effective ways to incorporate passive design principles, renewable technologies, and energy-saving solutions.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-teal-light/10 rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold !text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm !text-white/60 leading-relaxed !opacity-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
