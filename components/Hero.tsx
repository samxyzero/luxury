"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  whatsapp: string;
  mapsUrl: string;
}

export default function Hero({ hero, whatsapp, mapsUrl }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;

  return (
    <section id="top" className="grid pt-[88px] lg:min-h-[100svh] lg:grid-cols-2 lg:pt-24">
      <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-8 sm:py-20 lg:order-1 lg:px-16 lg:py-24 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-ink-muted">{hero.eyebrow}</span>
          </div>

          <h1 className="mt-7 font-display text-5xl font-medium leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[3.5rem] xl:text-6xl">
            {hero.headline} <em className="font-normal italic text-gold-dim">{hero.highlight}</em>
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label border border-ink px-7 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {hero.ctaPrimaryLabel}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group label inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-gold-dim"
            >
              <MapPin className="h-4 w-4" />
              {hero.ctaSecondaryLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-14 flex items-center gap-2 border-t border-stone pt-6 text-sm text-ink-muted">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold" />
              ))}
            </div>
            <span>5.0 &middot; Google Reviews &middot; Pokhara, Nepal</span>
          </div>
        </motion.div>
      </div>

      <div className="relative order-1 h-[52vh] sm:h-[60vh] lg:order-2 lg:h-auto">
        <Image
          src={hero.image}
          alt="Elegant furnished interior by Luxury Enterprises"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <CornerMarks tone="gold" inset={16} />
      </div>
    </section>
  );
}
