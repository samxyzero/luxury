import {
  Building2,
  Home,
  Layers,
  LifeBuoy,
  MessageCircle,
  Package,
  Ruler,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Service } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  "building-2": Building2,
  ruler: Ruler,
  layers: Layers,
  package: Package,
  "message-circle": MessageCircle,
  truck: Truck,
  wrench: Wrench,
  "life-buoy": LifeBuoy,
};

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-ink-muted">Our Services</span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Full-Service Furnishing, Start to Finish
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            We don&apos;t just supply furnishings — we guide every step, from first
            consultation to final installation.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 border-t border-l border-stone sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.08}>
                <div className="h-full border-r border-b border-stone p-8 sm:p-10">
                  <Icon className="h-6 w-6 text-gold-dim" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
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
