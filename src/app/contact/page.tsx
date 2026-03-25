import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Contra Faba. Cost consultants based in London and Glasgow, serving the construction industry.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-20 md:py-28">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance max-w-3xl">
            Let&apos;s talk about your project
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Whether you&apos;re at the early stages of planning or already in
            delivery, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy mb-6">
                Get in touch
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-mid-grey mb-2">
                    London Office
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    27 Old Gloucester Street
                    <br />
                    London WC1N 3AX
                  </p>
                  <a
                    href="tel:02046141084"
                    className="text-brand-gold text-sm font-medium mt-2 inline-block hover:text-brand-gold-light transition-colors"
                  >
                    020 4614 1084
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-mid-grey mb-2">
                    Glasgow Office
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    Covering Scotland &amp; the Highlands
                  </p>
                  <a
                    href="tel:01414619997"
                    className="text-brand-gold text-sm font-medium mt-2 inline-block hover:text-brand-gold-light transition-colors"
                  >
                    0141 461 9997
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-mid-grey mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@contrafaba.com"
                    className="text-brand-gold text-sm font-medium hover:text-brand-gold-light transition-colors"
                  >
                    info@contrafaba.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-brand-off-white rounded-2xl p-8 md:p-10">
              <h2 className="text-xl font-semibold text-brand-navy mb-6">
                Send us a message
              </h2>
              {/*
                TODO: Wire up form submission.
                Options: Sanity form plugin, Formspree, Resend, or a custom API route.
              */}
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-light-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-light-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-light-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-light-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-gold text-brand-navy font-semibold py-3 rounded-md hover:bg-brand-gold-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
