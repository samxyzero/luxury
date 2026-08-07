"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  whatsapp: string;
  mapsUrl: string;
  stats: SiteSettings["stats"];
}

const ease = [0.4, 0, 0.2, 1] as const;

/** Single staggered entrance: eyebrow, headline, paragraph, buttons, rating. */
const rise = (step: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.08 * step, ease },
});

const SECTORS = ["Residential", "Hotels", "Resorts", "Hospitality"];

/**
 * One set of markup, two treatments — mobile lays the copy over the photograph,
 * desktop moves it onto flat paper beside it. Keeping it to one block means the
 * page still has exactly one h1.
 */
export default function Hero({ hero, whatsapp, mapsUrl, stats }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;
  const badgeStat = stats.find((s) => s.id === "projects") ?? stats[0];

  return (
    <section id="top" className="relative isolate bg-paper">
      <div className="group absolute inset-0 overflow-hidden lg:left-1/2">
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="relative h-full w-full"
        >
          <Image
            src={hero.image}
            alt="Bedroom furnished by Luxury Enterprises"
            fill
            priority
            className="object-cover transition-transform duration-[1200ms] ease-out lg:group-hover:scale-[1.015]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>

        {/* Mobile only — resolves to solid navy under the copy so contrast comes
            from the scrim, not from whatever the photograph is doing there. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/20 lg:hidden"
        />

        {badgeStat && (
          <motion.div
            {...rise(6)}
            className="absolute bottom-0 left-0 hidden bg-navy px-6 py-5 lg:block"
          >
            <p className="font-display text-3xl font-medium leading-none text-paper">
              {badgeStat.value}
              <span className="text-gold">{badgeStat.suffix}</span>
            </p>
            <p className="label mt-2 text-paper/60">Projects Furnished</p>
          </motion.div>
        )}
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-2">
          <div className="flex min-h-[92svh] flex-col justify-end pt-32 pb-16 lg:min-h-0 lg:justify-center lg:py-28 lg:pr-14 xl:py-32">
            <motion.div {...rise(0)} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-gold lg:text-ink-muted">{hero.eyebrow}</span>
            </motion.div>

            {/* Deliberately a step down from the previous scale — the aim is
                editorial confidence, not advertising drama. */}
            <motion.h1
              {...rise(1)}
              className="mt-6 font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight text-balance text-paper sm:text-5xl lg:text-[3.5rem] xl:text-6xl lg:text-ink"
            >
              {hero.headline}{" "}
              <em className="font-normal italic text-gold lg:text-gold-dim">
                {hero.highlight}
              </em>
            </motion.h1>

            <motion.p
              {...rise(2)}
              className="mt-6 max-w-lg text-base leading-relaxed text-paper/80 lg:text-ink-muted"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              {...rise(3)}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {/* Solid fill vs. a plain text link: an unambiguous primary. */}
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
                // max-lg / lg rather than a base value overridden at lg: the two
                // never apply at once, so the result can't depend on cascade order.
                className="label inline-flex items-center gap-2 px-7 py-4 transition-colors duration-300 max-lg:border max-lg:border-gold max-lg:bg-gold max-lg:text-navy max-lg:hover:border-gold-dim max-lg:hover:bg-gold-dim lg:border lg:border-navy lg:bg-navy lg:text-paper lg:hover:border-navy-dim lg:hover:bg-navy-dim"
              >
                {hero.ctaPrimaryLabel}
              </a>
              {/* py-3.5 keeps this bare link above the 44px tap-target minimum. */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group label inline-flex items-center gap-2 py-3.5 text-paper transition-colors duration-300 hover:text-gold lg:text-ink lg:hover:text-gold-dim"
              >
                <MapPin className="h-4 w-4" />
                {hero.ctaSecondaryLabel}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            <motion.p
              {...rise(4)}
              // Full-strength muted, not /80: at 12px the faded variant measured
              // 3.25:1 on paper, under the 4.5:1 minimum.
              className="label mt-8 text-paper/55 lg:text-ink-muted"
            >
              {SECTORS.join(" · ")}
            </motion.p>

            <motion.div
              {...rise(5)}
              className="mt-6 flex items-center gap-2.5 border-t border-paper/20 pt-6 text-sm text-paper/70 lg:border-stone lg:text-ink-muted"
            >
              <span className="flex text-gold" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold" />
                ))}
              </span>
              <span>5.0 Google Rating &middot; Pokhara</span>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Quiet scroll cue so the hero doesn't stop abruptly. Mobile only —
          on desktop the stats strip is already visible below the fold. */}
      <motion.span
        {...rise(7)}
        aria-hidden
        className="label absolute bottom-6 right-6 text-paper/45 lg:hidden"
      >
        Scroll
      </motion.span>
    </section>
  );
}
