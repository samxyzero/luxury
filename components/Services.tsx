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
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import SectionLink from "@/components/SectionLink";
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
  /** Rendered heading tag — pages pass "h1", sections within a page keep "h2". */
  as?: "h1" | "h2";
  footerLink?: { href: string; label: string };
}

export default function Services({
  services,
  as: Heading = "h2",
  footerLink,
}: ServicesProps) {
  return (
    <section id="services" className="bg-void py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Our Services</Eyebrow>
          <RevealText
            as={Heading}
            text="Full-service furnishing, start to finish"
            accent={["start", "to", "finish"]}
            className="lead-tight font-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium text-balance"
          />
          <Reveal delay={0.12}>
            <p className="text-ash mt-7 text-lg leading-relaxed text-pretty">
              We don&apos;t just supply furnishings — we guide every step, from first
              consultation to final installation.
            </p>
          </Reveal>
        </div>

        {/* Hairline cells made from one-pixel gaps over a dark fill, so the grid
            never doubles its borders where cells meet. */}
        <div className="bg-smoke mt-14 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Reveal
                key={service.id}
                delay={(i % 3) * 0.08}
                className="bg-void group hover:bg-char h-full transition-colors duration-500"
              >
                <div className="flex h-full flex-col p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="text-saffron h-6 w-6 transition-transform duration-500 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                    <span className="mono-label text-slate">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-bone mt-8 text-2xl font-medium">
                    {service.title}
                  </h3>
                  <p className="text-ash mt-3 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href}>{footerLink.label}</SectionLink>
          </div>
        )}
      </Container>
    </section>
  );
}
