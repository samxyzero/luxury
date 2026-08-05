"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Star } from "lucide-react";
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
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt="Elegant furnished interior by Luxury Enterprises"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/40" />
        <div className="bg-grain absolute inset-0 opacity-40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-navy max-w-3xl rounded-3xl p-6 sm:p-10 lg:p-12"
        >
          <div className="flex items-center gap-2 text-gold-300 text-xs sm:text-sm font-medium tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-400" />
            {hero.eyebrow}
          </div>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white">
            {hero.headline}{" "}
            <span className="text-gradient-gold">{hero.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm sm:text-base font-semibold text-navy-950 shadow-[0_12px_30px_-8px_rgba(201,162,75,0.65)]"
            >
              {hero.ctaPrimaryLabel}
            </motion.a>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass-light flex items-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white"
            >
              <MapPin className="h-4 w-4" />
              {hero.ctaSecondaryLabel}
            </motion.a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-white/80 text-sm">
            <div className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400" />
              ))}
            </div>
            <span>5.0 · Google Reviews · Pokhara, Nepal</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
