import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cost consultancy services including feasibility estimates, detailed cost estimates, quantity surveying, and contract administration.",
};

const services = [
  {
    title: "Feasibility Estimates",
    description:
      "For when you want a ballpark estimate to check the feasibility of your project. We provide early-stage cost guidance to help you understand whether your project vision aligns with your budget, allowing informed decisions before committing significant resources.",
    features: [
      "Early-stage budget assessment",
      "High-level cost breakdown",
      "Risk and contingency guidance",
      "Budget viability report",
    ],
  },
  {
    title: "Detailed Cost Estimates",
    description:
      "For when you have detailed drawings and material specifications and need detailed costs. We produce comprehensive cost documents based on your design information, giving you the financial clarity needed to move forward with confidence.",
    features: [
      "Full elemental cost breakdown",
      "Material and labour cost analysis",
      "Benchmark comparisons",
      "Specification review",
    ],
  },
  {
    title: "Quantity Surveying",
    description:
      "For when you want someone to manage the whole process - from inception to completion. We provide end-to-end cost management, ensuring your project stays on budget throughout every stage of delivery.",
    features: [
      "Cost planning at each design stage",
      "Tender documentation and analysis",
      "Monthly valuations and reporting",
      "Final account settlement",
    ],
  },
  {
    title: "Contract Administration",
    description:
      "For when you need someone to manage the contract management process for you. We administer the contract between you and your contractor, ensuring fair and transparent project delivery.",
    features: [
      "Contract setup and management",
      "Payment certification",
      "Variation management",
      "Dispute resolution support",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-20 md:py-28">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance max-w-3xl">
            Tailored cost consultancy for every stage
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            We offer a range of services designed for architects, contractors
            and homeowners to help them manage their project costs effectively.
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section className="section-padding">
        <div className="container-site space-y-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="text-brand-gold font-semibold text-sm mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy mb-4">
                  {service.title}
                </h2>
                <p className="text-brand-slate leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="text-brand-gold font-semibold text-sm hover:text-brand-gold-light transition-colors"
                >
                  Discuss this service &rarr;
                </Link>
              </div>
              <div className={`bg-brand-off-white rounded-xl p-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-mid-grey mb-4">
                  What&apos;s included
                </h4>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-brand-slate"
                    >
                      <svg
                        className="w-5 h-5 text-brand-gold shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-off-white">
        <div className="container-site section-padding text-center">
          <SectionHeading
            align="center"
            title="Not sure which service you need?"
            description="Get in touch and we'll help you work out the best approach for your project."
          />
          <Link
            href="/contact"
            className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-md hover:bg-brand-gold-light transition-colors"
          >
            Talk to Us
          </Link>
        </div>
      </section>
    </>
  );
}
