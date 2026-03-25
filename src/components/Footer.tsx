import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-site section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contra Faba Ltd</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Cost consultants for the construction industry. Working across
              London, the South East and Scotland for architects, contractors
              and homeowners.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h4>
            <address className="not-italic text-sm text-white/60 space-y-2">
              <p>27 Old Gloucester Street</p>
              <p>London WC1N 3AX</p>
              <p className="pt-2">
                <span className="text-white/40">London:</span>{" "}
                <a href="tel:02046141084" className="hover:text-brand-gold transition-colors">
                  020 4614 1084
                </a>
              </p>
              <p>
                <span className="text-white/40">Glasgow:</span>{" "}
                <a href="tel:01414619997" className="hover:text-brand-gold transition-colors">
                  0141 461 9997
                </a>
              </p>
            </address>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/our-work", label: "Our Work" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Contra Faba Ltd. Registered in
            England &amp; Wales: 12848166
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
