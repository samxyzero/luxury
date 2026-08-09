"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  whatsapp: string;
  mapsUrl: string;
  /** Shown as the photograph's caption — grounds the brand in a real place. */
  location: string;
}

const ease = [0.4, 0, 0.2, 1] as const;

/** Single staggered entrance: eyebrow, headline, paragraph, buttons, caption. */
const rise = (step: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.08 * step, ease },
});

/** Hairline with a gold sliver travelling down it — the page's one loop. */
function ScrollCue({
  tone,
  animate,
  className = "",
}: {
  tone: "paper" | "ink";
  animate: boolean;
  className?: string;
}) {
  return (
    <span aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className={`label ${tone === "paper" ? "text-paper/75" : "text-ink-muted"}`}>
        Scroll
      </span>
      <span
        className={`relative block h-9 w-px overflow-hidden ${
          tone === "paper" ? "bg-paper/25" : "bg-stone"
        }`}
      >
        {animate && (
          <motion.span
            animate={{ y: ["-100%", "80%", "260%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-3 bg-gold"
          />
        )}
      </span>
    </span>
  );
}

/**
 * Deliberately just the statement and the photograph — every figure and proof
 * point lives in the stats strip directly beneath, so the hero makes the promise
 * and the next section evidences it.
 *
 * One set of markup, two treatments: mobile lays the copy over the photograph,
 * desktop moves it onto flat paper beside it. Keeping it to one block means the
 * page still has exactly one h1.
 */
export default function Hero({ hero, whatsapp, mapsUrl, location }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;

  return (
    <section id="top" className="relative isolate bg-paper">
      <div className="group absolute inset-0 overflow-hidden lg:left-1/2">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
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

        {/* Desktop only. The first feathers the paper→photograph seam so the two
            halves read as one composition rather than a butt joint; the second
            grounds the now full-height crop and carries the caption. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-paper/70 to-transparent lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 hidden h-56 bg-gradient-to-t from-navy/85 to-transparent lg:block"
        />
      </div>

      <motion.p
        {...rise(4)}
        className="label absolute bottom-10 right-6 z-10 hidden items-center gap-2 text-paper/85 lg:flex lg:right-12"
      >
        <MapPin className="h-3.5 w-3.5 text-gold" />
        {location}
      </motion.p>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-2">
          {/* svh rather than vh so mobile browser chrome collapsing doesn't make
              the hero jump. The lopsided desktop padding pushes the optical
              centre below the fixed header instead of behind it. */}
          <div className="relative flex min-h-svh flex-col justify-end pt-32 pb-28 lg:justify-center lg:pt-36 lg:pr-14 lg:pb-16">
            <motion.div {...rise(0)} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-gold lg:text-ink-muted">{hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              {...rise(1)}
              className="mt-7 font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight text-balance text-paper sm:text-5xl lg:text-[3.5rem] lg:text-ink xl:text-6xl 2xl:text-[4.5rem]"
            >
              {hero.headline}{" "}
              {/* Own line, so the two halves of the statement read as a couplet
                  rather than the accent landing wherever the text happens to wrap. */}
              <em className="block font-normal italic text-gold lg:text-gold-dim">
                {hero.highlight}
              </em>
            </motion.h1>

            <motion.p
              {...rise(2)}
              className="mt-7 max-w-lg text-base leading-relaxed text-pretty text-paper/80 lg:text-ink-muted"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              {...rise(3)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {/* max-lg / lg rather than a base value overridden at lg: the two
                  never apply at once, so the result can't depend on cascade order. */}
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
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

            {/* Quiet cue so a full-height hero hands off to the stats rather than
                stopping dead. Sits on the photograph on mobile, on paper on desktop. */}
            <motion.span
              {...rise(5)}
              className="absolute right-0 bottom-10 lg:hidden"
            >
              <ScrollCue tone="paper" animate={!reduceMotion} />
            </motion.span>
            <motion.span
              {...rise(5)}
              className="absolute bottom-10 left-0 hidden lg:block"
            >
              <ScrollCue tone="ink" animate={!reduceMotion} />
            </motion.span>
          </div>
        </div>
      </Container>
    </section>
  );
}
