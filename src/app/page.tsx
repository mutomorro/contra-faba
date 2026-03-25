import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    title: "Feasibility Estimates",
    description:
      "For when you want a ballpark estimate to check the feasibility of your project.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: "Detailed Cost Estimates",
    description:
      "For when you have detailed drawings and material specifications and need detailed costs.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 10h4V3H3v7zm0 11h4v-7H3v7zm6 0h4V12H9v9zm6 0h4v-4h-4v4zm-6-18v6h4V3H9zm6 0v9h4V3h-4z" />
      </svg>
    ),
  },
  {
    title: "Quantity Surveying",
    description:
      "For when you want someone to manage the whole process - from inception to completion.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Contract Administration",
    description:
      "For when you need someone to manage the contract management process for you.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

const audiences = [
  {
    title: "Architects",
    description:
      "We integrate cost insights from the earliest design stages, ensuring every aesthetic and functional decision aligns with your budget.",
  },
  {
    title: "Contractors",
    description:
      "We work hand-in-hand with your team to identify cost-saving opportunities and maintain strict financial oversight throughout the project lifecycle.",
  },
  {
    title: "Homeowners",
    description:
      "From initial feasibility studies to final cost control, our approach is designed to keep you informed and confident about your investment.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Cost Consultants
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight">
              Cost consultants for the construction industry
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
              At Contra Faba, we understand that managing costs is essential to
              your project&apos;s success. We provide tailored solutions that drive
              efficiency, optimise budgets, and ensure transparent communication
              throughout your project lifecycle.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-md hover:bg-brand-gold-light transition-colors text-center"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-md hover:border-white/40 hover:bg-white/5 transition-all text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-site">
          <SectionHeading
            label="What we do"
            title="Popular services"
            description="We offer a range of services designed for architects, contractors and homeowners to help them manage their project costs effectively."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section-padding">
        <div className="container-site">
          <SectionHeading
            label="Who we work with"
            title="Tailored to your needs"
            description="We collaborate with a diverse range of clients. Our adaptable approach ensures that regardless of your role or project size, you receive expert guidance and personalised attention."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((audience) => (
              <div key={audience.title} className="relative">
                <div className="w-1 h-12 bg-brand-gold rounded-full mb-6" />
                <h3 className="text-xl font-semibold text-brand-navy mb-3">
                  {audience.title}
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white">
        <div className="container-site section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-balance">
            Ready to take control of your project costs?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Get in touch to discuss how we can help you manage your next
            project with confidence.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-md hover:bg-brand-gold-light transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
