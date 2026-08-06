import Reveal from "@/components/Reveal";
import type { Partner } from "@/types/content";

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  return (
    <section className="border-y border-stone bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label text-center text-ink-muted">Trusted Brand Partners</p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap justify-center divide-x divide-stone"
        >
          {partners.map((partner) => (
            <span
              key={partner.id}
              className="px-8 py-2 font-display text-lg text-ink-muted sm:text-xl"
            >
              {partner.name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
