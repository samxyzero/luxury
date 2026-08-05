import { Award, Clock3, Handshake, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import type { SiteSettings } from "@/types/content";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Premium Quality, Always",
    description: "Every product is chosen for durability, comfort and lasting finish.",
  },
  {
    icon: Handshake,
    title: "Trusted by Hotels & Homes",
    description: "From family bedrooms to resort suites, our work speaks for itself.",
  },
  {
    icon: Sparkles,
    title: "Elegant, Curated Range",
    description: "Refined fabrics and finishes selected for a genuinely premium feel.",
  },
  {
    icon: Clock3,
    title: "On-Time, Every Time",
    description: "Dependable delivery and installation timelines you can plan around.",
  },
  {
    icon: Award,
    title: "15+ Years of Expertise",
    description: "Deep experience furnishing homes, hotels and commercial projects.",
  },
  {
    icon: Truck,
    title: "End-to-End Service",
    description: "Consultation, delivery and installation handled by one dedicated team.",
  },
];

interface WhyChooseUsProps {
  stats: SiteSettings["stats"];
}

export default function WhyChooseUs({ stats }: WhyChooseUsProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-navy-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Why Choose Us
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            The Trusted Name in Premium Furnishing
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 rounded-3xl glass-navy px-6 py-10">
          {stats.map((stat) => (
            <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 3) * 0.1}>
              <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-300 text-navy-950">
                  <reason.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{reason.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
