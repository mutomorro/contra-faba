import type { Metadata } from 'next'
import { BlobTeal, BlobOrange1 } from '@/components/BlobShapes'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Contra Faba. Offices in London and Glasgow, serving architects, contractors and homeowners.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-peach overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlobTeal className="absolute -top-20 -left-20 w-[350px] h-[350px] text-teal blend-multiply opacity-20 blob-animate-1" />
          <BlobOrange1 className="absolute -bottom-32 -right-20 w-[400px] h-[400px] text-orange blend-multiply opacity-20 blob-animate-3" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label">Contact</p>
          <h1 className="mt-4 max-w-3xl">Let&apos;s talk about your project</h1>
          <p className="mt-6 text-lg max-w-2xl">
            Whether you&apos;re at the start of a project or need help with one
            already underway, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8">Get in touch</h2>
              <div className="space-y-8">
                <div className="service-card">
                  <div className="w-3 h-3 rounded-full bg-teal mb-4" />
                  <h3 className="mb-2">London</h3>
                  <address className="not-italic text-sm space-y-1 [&>p]:!opacity-65">
                    <p>27 Old Gloucester Street</p>
                    <p>London WC1N 3AX</p>
                    <p className="pt-2">
                      <a href="tel:02046141084" className="text-teal hover:text-orange transition-colors !opacity-100">
                        020 4614 1084
                      </a>
                    </p>
                  </address>
                </div>

                <div className="service-card">
                  <div className="w-3 h-3 rounded-full bg-orange mb-4" />
                  <h3 className="mb-2">Glasgow</h3>
                  <address className="not-italic text-sm space-y-1 [&>p]:!opacity-65">
                    <p>Serving Scotland including the Highlands</p>
                    <p className="pt-2">
                      <a href="tel:01414619997" className="text-teal hover:text-orange transition-colors !opacity-100">
                        0141 461 9997
                      </a>
                    </p>
                  </address>
                </div>

                <div className="client-card">
                  <h3 className="mb-2">Email us</h3>
                  <p className="text-sm">
                    Drop us a line and we&apos;ll get back to you within 24 hours.
                  </p>
                  <a
                    href="mailto:hello@contrafaba.com"
                    className="inline-block mt-4 text-teal font-medium text-sm hover:text-orange transition-colors"
                  >
                    hello@contrafaba.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-8">Send us a message</h2>
              <div className="service-card">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-peach-dark/30 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-peach-dark/30 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-peach-dark/30 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-2">
                      I am a...
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="w-full px-4 py-3 rounded-lg border border-peach-dark/30 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="architect">Architect</option>
                      <option value="contractor">Contractor</option>
                      <option value="homeowner">Homeowner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-peach-dark/30 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
