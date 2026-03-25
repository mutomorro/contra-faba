interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="group p-8 rounded-xl bg-white border border-brand-light-grey hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-brand-navy mb-3">{title}</h3>
      <p className="text-brand-slate text-sm leading-relaxed">{description}</p>
    </div>
  );
}
