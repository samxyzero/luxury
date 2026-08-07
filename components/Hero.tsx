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

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

/**
 * Two treatments from one set of markup — no duplicated headline, so the page
 * still has exactly one h1.
 *
 * Mobile: the photo fills the viewport and the copy sits on it over a scrim,
 * so image and text read as one composition.
 * Desktop: the photo takes the right half and the copy moves onto flat paper,
 * matching the editorial split used across the rest of the site.
 */
export default function Hero({ hero, whatsapp, mapsUrl, stats }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;
  const badgeStat = stats.find((s) => s.id === "projects") ?? stats[0];

  return (
    <section id="top" className="relative isolate bg-paper">
      <div className="absolute inset-0 lg:left-1/2">
        <Image
          src={hero.image}
          alt="Interior furnished by Luxury Enterprises"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {/* Mobile only. Solid navy at the base where the copy sits, so contrast
            doesn't depend on whatever the photograph happens to be doing. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/20 lg:hidden"
        />
        <CornerMarks tone="gold" inset={20} className="hidden lg:block" />

        {badgeStat && (
          <motion.div
            {...rise(0.45)}
            className="absolute bottom-0 left-0 hidden bg-navy px-7 py-6 lg:block"
          >
            <p className="font-display text-4xl font-medium leading-none text-paper">
              {badgeStat.value}
              <span className="text-gold">{badgeStat.suffix}</span>
            </p>
            <p className="label mt-2 max-w-36 text-paper/70">{badgeStat.label}</p>
          </motion.div>
        )}
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-2">
          <div className="flex min-h-[92svh] flex-col justify-end pt-32 pb-16 lg:min-h-0 lg:justify-center lg:py-32 lg:pr-14 xl:py-36">
            <motion.div {...rise(0)} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-gold lg:text-ink-muted">{hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="mt-6 font-display text-5xl font-medium leading-[1.03] tracking-tight text-balance text-paper sm:text-6xl lg:mt-7 lg:text-ink lg:text-6xl xl:text-7xl"
            >
              {hero.headline}{" "}
              <em className="font-normal italic text-gold lg:text-gold-dim">
                {hero.highlight}
              </em>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-lg text-base leading-relaxed text-paper/80 sm:text-lg lg:mt-7 lg:text-ink-muted"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-10"
            >
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-gold bg-gold px-7 py-4 text-navy transition-colors duration-300 hover:bg-gold-dim hover:border-gold-dim lg:border-navy lg:bg-transparent lg:text-navy lg:hover:bg-navy lg:hover:text-paper"
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

            <motion.div
              {...rise(0.32)}
              className="mt-10 flex items-center gap-2.5 border-t border-paper/20 pt-6 text-sm text-paper/75 lg:mt-12 lg:border-stone lg:text-ink-muted"
            >
              <span className="flex text-gold" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                ))}
              </span>
              <span>Rated 5.0 on Google Reviews &middot; Pokhara, Nepal</span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
