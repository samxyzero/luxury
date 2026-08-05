import { Building2, Home, MessageCircle, Ruler, Truck, Wrench, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Service } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  "building-2": Building2,
  ruler: Ruler,
  "message-circle": MessageCircle,
  truck: Truck,
  wrench: Wrench,
};

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-navy-600 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Our Services
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-950">
            Full-Service Furnishing, Start to Finish
          </h2>
          <p className="mt-5 text-base sm:text-lg text-charcoal/70 leading-relaxed">
            We don&apos;t just supply furnishings — we guide every step, from first
            consultation to final installation.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-navy-900/8 bg-white p-8 shadow-[0_10px_30px_-16px_rgba(19,26,58,0.25)] transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-16px_rgba(19,26,58,0.3)]">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-100/60 transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 text-gold-300">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="relative mt-6 font-display text-xl font-semibold text-navy-950">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-sm sm:text-base leading-relaxed text-charcoal/70">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
