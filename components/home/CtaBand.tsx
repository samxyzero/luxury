import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import type { SiteSettings } from "@/types/content";

interface CtaBandProps {
  site: SiteSettings;
}

/**
 * Closing conversion block. Replaces the full contact form on the homepage —
 * the form itself now lives on /contact.
 */
export default function CtaBand({ site }: CtaBandProps) {
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi ${site.businessName}, I'd like to talk about furnishing a space.`
  )}`;

  return (
    <section className="bg-navy py-20 sm:py-24">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-paper/55">Get Started</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl">
              Tell Us About Your Space
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/60 sm:text-lg">
              One room or an entire property — send a message and we&apos;ll come back with
              fabric options, timelines and a clear quote. No obligation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
            <Button href={whatsappHref} external variant="gold">
              Get a Quote
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
            <Button href={`tel:${site.phone}`} external variant="outlineLight">
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 border-t border-stone-on-navy pt-6">
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-paper/60 transition-colors duration-300 hover:text-gold"
          >
            <MapPin className="h-4 w-4 text-gold" />
            {site.address.line1}, {site.address.city} {site.address.postalCode} — visit the
            showroom
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
