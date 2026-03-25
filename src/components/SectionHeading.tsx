interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center mx-auto" : ""}`}
    >
      {label && (
        <p
          className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
            light ? "text-brand-gold-light" : "text-brand-gold"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-semibold text-balance ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-brand-slate"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
