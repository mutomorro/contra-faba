import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Contra Faba, led by Jamie Gould. Expert cost consultants for the construction industry, working across London, the South East and Scotland.",
};

const values = [
  {
    title: "Integrity",
    description:
      "We maintain the highest standards of honesty and transparency in every interaction.",
  },
  {
    title: "Collaboration",
    description:
      "We work closely with you, ensuring a seamless, cooperative process from start to finish.",
  },
  {
    title: "Innovation",
    description:
      "We continuously seek smarter, more efficient ways to manage your costs.",
  },
  {
    title: "Client-Centricity",
    description:
      "Your goals are our goals, and we tailor every solution to meet your unique needs.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white">
        <div className="container-site py-20 md:py-28">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance max-w-3xl">
            Founded on a passion for precision
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Contra Faba began with a simple idea: effective cost management
            transforms projects. From humble beginnings, we&apos;ve grown into a
            trusted partner for contractors, architects, and homeowners.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="Leadership"
                title="Jamie Gould"
                description="Contra Faba is led by Jamie Gould, whose passion for cost management and commitment to excellence have been the driving force behind our work."
              />
              <p className="text-brand-slate leading-relaxed">
                While Jamie is the primary consultant, he collaborates with a
                network of experienced professionals, ensuring you benefit from
                a broad spectrum of expertise - all while maintaining a personal
                touch.
              </p>
            </div>
            <div className="bg-brand-off-white rounded-2xl aspect-[4/5] flex items-center justify-center">
              {/* TODO: Replace with Jamie's headshot from Sanity or static image */}
              <p className="text-brand-mid-grey text-sm">Jamie&apos;s photo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="section-padding bg-brand-off-white">
        <div className="container-site">
          <SectionHeading
            label="Our approach"
            title="Open communication and mutual trust"
            description="We take a hands-on, collaborative approach - engaging with you from the initial consultation to the final review - to ensure that every decision is informed by accurate data and market insights."
          />
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-site">
          <SectionHeading
            label="Our values"
            title="What drives us"
            description="Our mission is to empower you with clear, actionable cost insights and strategic planning that keep your projects on track."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={value.title} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we work */}
      <section className="section-padding bg-brand-navy text-white">
        <div className="container-site">
          <SectionHeading
            light
            label="Where we work"
            title="London and Glasgow"
            description="Based in London and Glasgow, Contra Faba serves clients throughout the South East and extends its specialised services to Scotland, including the Highlands."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <div className="p-6 rounded-xl border border-white/10">
              <h3 className="font-semibold text-lg mb-2">London</h3>
              <p className="text-white/60 text-sm">
                020 4614 1084
                <br />
                Covering London &amp; the South East
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10">
              <h3 className="font-semibold text-lg mb-2">Glasgow</h3>
              <p className="text-white/60 text-sm">
                0141 461 9997
                <br />
                Covering Scotland &amp; the Highlands
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
