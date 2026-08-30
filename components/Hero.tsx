"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Magnetic from "@/components/fx/Magnetic";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  whatsapp: string;
  mapsUrl: string;
  /** Grounds the brand in a real place, set as the photograph's caption. */
  location: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** One staggered entrance shared by every element in the composition. */
const rise = (step: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.85 + step * 0.09, ease: EASE },
});

/**
 * Folded cloth, drawn rather than photographed: alternating hard and soft
 * stops make the light catch on ridges, so the panels read as hanging fabric
 * instead of flat blocks sliding apart.
 */
const DRAPE =
  "repeating-linear-gradient(90deg, #16130f 0px, #1f1a14 14px, #0b0a09 30px, #16130f 44px)";

/**
 * The headline is a doorway.
 *
 * "Spaces made for" sits above an arch-cropped photograph, "Comfort." crosses
 * back over its lower edge, and on load two curtain panels draw apart to reveal
 * the room behind — the business is furnishing, so the page opens the way a
 * window treatment does.
 *
 * The arch is a `<span>` rather than a `<div>` so the whole composition can live
 * inside the single `<h1>`: the accessible name still reads "Spaces made for
 * Comfort.", uninterrupted.
 */
export default function Hero({ hero, whatsapp, mapsUrl, location }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;

  // With motion suppressed the curtains would sit closed over the photograph
  // forever, so they are simply never rendered.
  const curtains = !reduceMotion;

  return (
    <section id="top" className="bg-void relative isolate overflow-hidden">
      {/* A single warm pool of light behind the arch. Everything else on the
          page is flat, so this is what gives the hero depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[min(90vw,52rem)] w-[min(90vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(240,163,58,0.18) 0%, rgba(192,86,58,0.08) 45%, transparent 70%)",
        }}
      />

      <Container className="flex min-h-svh flex-col pt-24 pb-8 sm:pt-32">
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* Wraps rather than running to the gutters: the full eyebrow is
              wider than a 360px phone, and the whole composition is centred. */}
          <motion.p
            {...rise(0)}
            className="mono-label text-ash flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center"
          >
            <span className="bg-saffron h-1 w-1 shrink-0 rounded-full" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 flex flex-col items-center text-center sm:mt-8">
            <span className="mask-line block">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
                className="font-display lead-tight text-bone block text-[clamp(2.5rem,8.5vw,6rem)] font-medium"
              >
                {hero.headline}
              </motion.span>
            </span>

            {/* The window. Height is viewport-relative so the whole composition
                — statement, photograph and the enquiry bar beneath it — still
                lands on one screen, on a phone as well as a laptop. */}
            <span className="arch relative mt-5 block h-[clamp(11rem,30vh,25rem)] w-[clamp(10rem,26vw,22rem)] overflow-hidden sm:mt-7 sm:h-[clamp(13rem,38vh,25rem)] sm:w-[clamp(11rem,26vw,22rem)]">
              <motion.span
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.4, delay: 0.5, ease: EASE }}
                className="block h-full w-full"
              >
                <Image
                  src={hero.image}
                  alt="A bedroom furnished by Luxury Enterprises"
                  fill
                  priority
                  sizes="(min-width: 640px) 32vw, 60vw"
                  className="object-cover"
                />
              </motion.span>

              {/* Warms the photograph into the palette and keeps the overlapping
                  word legible whatever the crop happens to contain. */}
              <span
                aria-hidden
                className="absolute inset-0 block"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,10,9,0.92) 0%, rgba(11,10,9,0.15) 45%, rgba(11,10,9,0.35) 100%)",
                }}
              />

              {curtains && (
                <>
                  <motion.span
                    aria-hidden
                    initial={{ x: 0 }}
                    animate={{ x: "-101%" }}
                    transition={{ duration: 1.9, delay: 0.45, ease: EASE }}
                    className="absolute inset-y-0 left-0 block w-1/2"
                    style={{ backgroundImage: DRAPE }}
                  />
                  <motion.span
                    aria-hidden
                    initial={{ x: 0 }}
                    animate={{ x: "101%" }}
                    transition={{ duration: 1.9, delay: 0.45, ease: EASE }}
                    className="absolute inset-y-0 right-0 block w-1/2"
                    style={{ backgroundImage: DRAPE }}
                  />
                  {/* The seam catches the light for exactly as long as the
                      panels are touching. */}
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.9, scaleY: 1 }}
                    animate={{ opacity: 0, scaleY: 0.2 }}
                    transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
                    className="bg-saffron absolute inset-y-0 left-1/2 block w-px -translate-x-1/2"
                  />
                </>
              )}

              <span className="border-smoke arch pointer-events-none absolute inset-0 block border" />
            </span>

            {/* Crosses back over the photograph — the one place on the site
                where type breaks the image plane. */}
            <span className="mask-line relative z-10 block -mt-[0.42em]">
              <motion.em
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: EASE }}
                className="font-display lead-tight text-saffron block text-[clamp(3rem,11vw,8rem)] font-normal italic"
              >
                {hero.highlight}
              </motion.em>
            </span>
          </h1>
        </div>

        {/* Everything transactional collects in one bar at the foot of the
            screen, so the composition above it stays purely an image. */}
        <div className="border-smoke mt-8 grid gap-6 border-t pt-6 sm:mt-10 sm:gap-8 sm:pt-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <motion.p
            {...rise(1)}
            className="text-ash max-w-md text-sm leading-relaxed text-pretty lg:col-span-5"
          >
            {hero.subheadline}
          </motion.p>

          {/* Tighter padding below sm so both calls to action stay on one row —
              wrapping them is what pushed the enquiry below the fold on a
              phone, which is the last thing this bar should do. */}
          <motion.div
            {...rise(2)}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 lg:col-span-4 lg:justify-center"
          >
            <Magnetic>
              <a
                href={quoteHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Chat"
                className="mono-label bg-saffron text-void hover:bg-bone inline-flex items-center gap-2 rounded-full px-5 py-4 transition-colors duration-500 sm:px-7"
              >
                {hero.ctaPrimaryLabel}
              </a>
            </Magnetic>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label border-smoke text-bone hover:border-bone inline-flex items-center gap-2 rounded-full border px-5 py-4 transition-colors duration-500 sm:px-7"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {hero.ctaSecondaryLabel}
            </a>
          </motion.div>

          {/* The right padding is reserved for the floating WhatsApp button,
              which is fixed to this corner and would otherwise sit on top of
              the caption. */}
          <motion.div
            {...rise(3)}
            className="flex items-center gap-5 lg:col-span-3 lg:justify-end lg:pr-20"
          >
            <a
              href="#ranges"
              aria-label="Skip to the ranges"
              className="border-smoke text-ash hover:border-saffron hover:text-saffron flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500"
            >
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </a>
            <span className="mono-label text-slate hidden sm:block">{location}</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
