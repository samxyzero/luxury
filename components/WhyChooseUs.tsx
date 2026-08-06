import {
  Award,
  Clock3,
  Handshake,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import type { SiteSettings } from "@/types/content";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Premium Quality, Always",
    description:
      "Every product is chosen for durability, comfort and lasting finish.",
  },
  {
    icon: Handshake,
    title: "Trusted by Hotels & Homes",
    description:
      "From family bedrooms to resort suites, our work speaks for itself.",
  },
  {
    icon: Sparkles,
    title: "Elegant, Curated Range",
    description:
      "Refined fabrics and finishes selected for a genuinely premium feel.",
  },
  {
    icon: Clock3,
    title: "On-Time, Every Time",
    description:
      "Dependable delivery and installation timelines you can plan around.",
  },
  {
    icon: Award,
    title: "7+ Years of Expertise",
    description:
      "Deep experience furnishing homes, hotels and commercial projects.",
  },
  {
    icon: Truck,
    title: "End-to-End Service",
    description:
      "Consultation, delivery and installation handled by one dedicated team.",
  },
];

interface WhyChooseUsProps {
  stats: SiteSettings["stats"];
}

export default function WhyChooseUs({ stats }: WhyChooseUsProps) {
  return (
    <section className="bg-navy py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-paper/55">Why Choose Us</span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
            The Trusted Name in Premium Furnishing
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-16 grid grid-cols-2 divide-x divide-stone-on-navy border-y border-stone-on-navy lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="px-6 py-10 first:pl-0 sm:px-10">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 2) * 0.1}>
              <div className="flex items-start gap-4 border-t border-stone-on-navy pt-6">
                <reason.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-display text-lg font-medium text-paper">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/60">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
