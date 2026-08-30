import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import Marquee from "@/components/fx/Marquee";
import type { SiteSettings, Partner } from "@/types/content";

interface LedgerProps {
  stats: SiteSettings["stats"];
  partners: Partner[];
}

/**
 * The first light section on the page, and the only one that is purely
 * numbers. Coming straight off two full-bleed photographs, the tonal flip does
 * more to sell the claim than any amount of styling would — the figures are
 * simply on the record, in daylight.
 */
export default function Ledger({ stats, partners }: LedgerProps) {
  return (
    <section className="bg-bone text-void py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow index={2} tone="void">
            By the Numbers
          </Eyebrow>
          <p className="mono-label text-slate">
            Residential &middot; Hotels &middot; Resorts &middot; Hospitality
          </p>
        </div>

        {/* One-pixel gaps over a dark fill: the rules are the gaps themselves,
            so the grid stays hairline-thin at every breakpoint without a stack
            of border-side overrides. */}
        <div className="bg-void/12 mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.08} className="bg-bone px-1 py-8 sm:px-8">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone="void"
              />
            </Reveal>
          ))}
        </div>
      </Container>

      {partners.length > 0 && (
        <div className="border-void/12 mt-16 border-t pt-10">
          <Container>
            {/* These are suppliers we stock, not clients — calling them
                "trusted by" would misrepresent the relationship. */}
            <p className="mono-label text-slate text-center">Brands We Work With</p>
          </Container>

          {/* Wordmarks scroll rather than wrap: a fixed row would either crowd
              on mobile or leave a gap on desktop as the list changes length. */}
          <Marquee duration={38} className="mt-6">
            {partners.map((partner) => (
              <span
                key={partner.id}
                className="font-display text-void/30 shrink-0 px-8 text-2xl font-medium sm:text-3xl"
              >
                {partner.name}
              </span>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
