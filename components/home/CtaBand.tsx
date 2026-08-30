import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/fx/Magnetic";
import type { SiteSettings } from "@/types/content";

interface CtaBandProps {
  site: SiteSettings;
}

/**
 * The page ends on full saffron.
 *
 * Everything above it is near-black with the accent used a few pixels at a
 * time, so flooding the closing section with it makes the one block that asks
 * for the enquiry impossible to scroll past without noticing. The contact form
 * itself lives on /contact — this is the invitation, not the paperwork.
 */
export default function CtaBand({ site }: CtaBandProps) {
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi ${site.businessName}, I'd like to talk about furnishing a space.`
  )}`;

  const details = [
    {
      icon: MapPin,
      label: "Showroom",
      value: `${site.address.line1}, ${site.address.city}`,
      href: site.address.mapsUrl,
      external: true,
    },
    {
      icon: Phone,
      label: "Call",
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
      external: false,
    },
  ];

  return (
    <section className="bg-saffron text-void relative overflow-hidden py-24 sm:py-32">
      <Container>
        <Eyebrow index={8} tone="void">
          Get Started
        </Eyebrow>

        <RevealText
          as="h2"
          text="Tell us about your space"
          accent={["your", "space"]}
          accentClassName="font-normal italic text-void/55"
          className="lead-tight font-display mt-8 max-w-5xl text-[clamp(2.75rem,9vw,7rem)] font-medium"
        />

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.15}>
            <p className="text-void/70 max-w-md text-lg leading-relaxed text-pretty">
              One room or an entire property — send a message and we&apos;ll come back
              with fabric options, timelines and a clear quote. No obligation.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Chat"
                className="mono-label bg-void text-bone hover:bg-void/85 inline-flex items-center gap-2.5 rounded-full px-8 py-4.5 transition-colors duration-500"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="mono-label border-void/30 text-void hover:bg-void hover:text-bone inline-flex items-center gap-2.5 rounded-full border px-8 py-4.5 transition-colors duration-500"
            >
              Email Us
            </a>
          </Reveal>
        </div>

        {/* The two cells sit shoulder to shoulder on a wide screen, so the
            second is inset behind a rule — without it the first row's trailing
            arrow reads as part of the second row's label. */}
        <div className="border-void/20 mt-16 grid border-t sm:grid-cols-2">
          {details.map((detail, i) => (
            <a
              key={detail.label}
              href={detail.href}
              {...(detail.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group border-void/20 flex items-center gap-4 border-b py-5 pr-1 sm:border-b-0 ${
                i > 0 ? "sm:border-void/20 sm:border-l sm:pl-8" : "sm:pr-8"
              }`}
            >
              <detail.icon className="text-void/50 h-4 w-4 shrink-0" />
              <span className="mono-label text-void/50 w-24 shrink-0">
                {detail.label}
              </span>
              <span className="group-hover:text-void/60 text-base transition-colors duration-300">
                {detail.value}
              </span>
              <ArrowUpRight className="text-void/40 ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
