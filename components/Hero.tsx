"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import Container from "@/components/ui/Container";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  whatsapp: string;
  mapsUrl: string;
  stats: SiteSettings["stats"];
}

const ease = [0.4, 0, 0.2, 1] as const;

/** Fades a block in on load, staggered by `delay`. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
});

export default function Hero({ hero, whatsapp, mapsUrl, stats }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;
  const badgeStat = stats.find((s) => s.id === "projects") ?? stats[0];

  return (
    <section
      id="top"
      // Sits on the same vertical rhythm as every other section rather than
      // forcing 100svh, which left an oversized gap before the next block.
      className="bg-paper pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <motion.div {...rise(0)} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-ink-muted">{hero.eyebrow}</span>
            </motion.div>

            {/* Animated as one block, not per-word: word-splitting broke text
                selection, forced &nbsp; between words and stopped the headline
                wrapping naturally. */}
            <motion.h1
              {...rise(0.08)}
              className="mt-7 font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl"
            >
              {hero.headline}{" "}
              <em className="font-normal italic text-gold-dim">{hero.highlight}</em>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-navy px-7 py-4 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
              >
                {hero.ctaPrimaryLabel}
              </a>
              {/* py-3.5 is purely a hit-area fix: as a bare inline link this
                  was an 18px-tall tap target, under the 44px minimum. */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group label inline-flex items-center gap-2 py-3.5 text-ink transition-colors duration-300 hover:text-gold-dim"
              >
                <MapPin className="h-4 w-4" />
                {hero.ctaSecondaryLabel}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            <motion.div
              {...rise(0.32)}
              className="mt-12 flex items-center gap-2.5 border-t border-stone pt-6 text-sm text-ink-muted"
            >
              <span className="flex text-gold" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                ))}
              </span>
              <span>Rated 5.0 on Google Reviews &middot; Pokhara, Nepal</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={hero.image}
                alt="Interior furnished by Luxury Enterprises"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <CornerMarks tone="gold" inset={16} />
            </div>

            {/* Flat navy block, no shadow and no negative offset — the previous
                card used shadow-soft-lg (used nowhere else on the site) and
                hung outside the section, colliding with the strip below. */}
            {badgeStat && (
              <motion.div
                {...rise(0.4)}
                className="absolute bottom-0 left-0 bg-navy px-6 py-5"
              >
                <p className="font-display text-3xl font-medium leading-none text-paper sm:text-4xl">
                  {badgeStat.value}
                  <span className="text-gold">{badgeStat.suffix}</span>
                </p>
                <p className="label mt-2 max-w-36 text-paper/70">{badgeStat.label}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
