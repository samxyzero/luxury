import Reveal from "@/components/Reveal";
import type { Partner } from "@/types/content";

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  const loop = [...partners, ...partners];

  return (
    <section className="relative bg-ivory py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-navy-600">
            Trusted Brand Partners
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-16">
          {loop.map((partner, i) => (
            <span
              key={`${partner.id}-${i}`}
              className="font-display text-2xl sm:text-3xl font-semibold text-navy-900/25 whitespace-nowrap"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
