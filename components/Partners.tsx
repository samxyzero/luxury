import Container from "@/components/ui/Container";
import Marquee from "@/components/fx/Marquee";
import type { Partner } from "@/types/content";

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  if (partners.length === 0) return null;

  return (
    <section className="bg-void border-smoke border-t py-16 sm:py-20">
      <Container>
        <p className="mono-label text-slate text-center">Brands We Work With</p>
      </Container>

      {/* Scrolled rather than wrapped, so the row stays balanced however many
          names the supplier list happens to hold. */}
      <Marquee duration={38} className="mt-8">
        {partners.map((partner) => (
          <span
            key={partner.id}
            className="font-display text-ash/40 shrink-0 px-8 text-2xl font-medium sm:text-3xl"
          >
            {partner.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
