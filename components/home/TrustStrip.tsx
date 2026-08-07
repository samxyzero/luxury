import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import type { SiteSettings, Partner } from "@/types/content";

interface TrustStripProps {
  stats: SiteSettings["stats"];
  partners: Partner[];
}

/**
 * Compresses what used to be two full sections (WhyChooseUs + Partners) into a
 * single band, so the homepage states its credentials without a scroll detour.
 */
export default function TrustStrip({ stats, partners }: TrustStripProps) {
  return (
    <section className="border-b border-stone bg-paper-dim py-16 sm:py-20">
      <Container>
        {/* Moved down from the hero, which now carries only the statement and
            the photograph. The sectors read as the first line of the proof. */}
        <Reveal className="mb-12 border-b border-stone pb-8">
          <p className="label text-ink-muted">
            Residential &middot; Hotels &middot; Resorts &middot; Hospitality
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.06}>
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone="ink"
              />
            </Reveal>
          ))}
        </div>

        {partners.length > 0 && (
          <Reveal delay={0.2} className="mt-14 border-t border-stone pt-8">
            {/* These are suppliers we stock, not clients — calling them
                "trusted by" would misrepresent the relationship. */}
            <p className="label text-center text-ink-muted/70">Brands We Work With</p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {partners.map((partner) => (
                <li
                  key={partner.id}
                  className="font-display text-lg font-medium text-ink/45 sm:text-xl"
                >
                  {partner.name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
