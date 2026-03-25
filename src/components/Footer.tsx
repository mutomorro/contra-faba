import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-teal text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo-white.png"
              alt="Contra Faba"
              width={180}
              height={32}
              className="h-7 w-auto mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-md !opacity-100">
              Cost consultants for the construction industry. Working across
              London, the South East and Scotland for architects, contractors
              and homeowners.
            </p>

            {/* Tech partners */}
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4 !opacity-100">
                Technology Partners
              </p>
              <div className="flex items-center gap-6">
                <span className="text-white/40 text-sm font-medium !opacity-100">CostX</span>
                <span className="text-white/40 text-sm font-medium !opacity-100">BCIS</span>
                <span className="text-white/40 text-sm font-medium !opacity-100">Monday.com</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6 !text-white/30">
              Contact
            </h4>
            <address className="not-italic text-sm text-white/60 space-y-3 [&>p]:!opacity-100">
              <p>27 Old Gloucester Street</p>
              <p>London WC1N 3AX</p>
              <div className="pt-2 space-y-2">
                <p>
                  <span className="text-white/30">London:</span>{' '}
                  <a href="tel:02046141084" className="hover:text-peach transition-colors">
                    020 4614 1084
                  </a>
                </p>
                <p>
                  <span className="text-white/30">Glasgow:</span>{' '}
                  <a href="tel:01414619997" className="hover:text-peach transition-colors">
                    0141 461 9997
                  </a>
                </p>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6 !text-white/30">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/our-work', label: 'Our Work' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-peach transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 !opacity-100">
            &copy; {new Date().getFullYear()} Contra Faba Ltd. Registered in
            England &amp; Wales: 12848166
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
