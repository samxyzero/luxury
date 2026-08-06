"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Star } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  businessName: string;
  whatsapp: string;
  mapsUrl: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ hero, businessName, whatsapp, mapsUrl }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={`Elegant interior furnished by ${businessName}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/55 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/10 to-transparent" />
        <CornerMarks tone="paper" inset={24} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl border-l-2 border-gold bg-navy/90 p-8 sm:p-12 lg:p-14"
        >
          <div className="flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" />
            <span className="label">{hero.eyebrow}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-medium text-paper sm:text-5xl lg:text-6xl">
            {hero.headline} <span className="text-gold">{hero.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label bg-gold px-7 py-3.5 text-navy transition-colors duration-300 hover:bg-gold-dim"
            >
              {hero.ctaPrimaryLabel}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label flex items-center gap-2 border border-paper/40 px-7 py-3.5 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <MapPin className="h-4 w-4" />
              {hero.ctaSecondaryLabel}
            </a>
          </div>

          <div className="mt-9 flex items-center gap-2 text-sm text-paper/70">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <span>5.0 &middot; Google Reviews &middot; Pokhara, Nepal</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-paper/60"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
