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
  stats: SiteSettings["stats"];
}

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Hero({ hero, whatsapp, mapsUrl, stats }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;
  const badgeStat = stats.find((s) => s.id === "projects") ?? stats[0];

  return (
    <section id="top" className="grid pt-[88px] lg:min-h-[100svh] lg:grid-cols-2 lg:pt-24">
      <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-8 sm:py-20 lg:order-1 lg:px-16 lg:py-24 xl:px-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="label text-ink-muted">{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="mt-7 font-display text-6xl font-medium leading-[1.03] tracking-tight text-ink sm:text-7xl lg:text-[4rem] xl:text-[4.75rem]"
          >
            {hero.headline.split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))}
            <motion.em
              variants={wordVariants}
              className="inline-block font-normal italic text-gold-dim"
            >
              {hero.highlight}
            </motion.em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-7 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="mt-14 flex items-center gap-2 border-t border-stone pt-6 text-sm text-ink-muted"
          >
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold" />
              ))}
            </div>
            <span>5.0 &middot; Google Reviews &middot; Pokhara, Nepal</span>
          </motion.div>
        </div>
      </div>

      <div className="relative order-1 h-[58vh] px-6 pb-10 pt-6 sm:h-[68vh] sm:px-8 lg:order-2 lg:h-auto lg:p-10 xl:p-14">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative h-full w-full"
        >
          <div className="relative h-full w-full overflow-hidden">
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

          {badgeStat && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-4 top-4 bg-navy px-5 py-4 sm:right-6 sm:top-6"
            >
              <p className="font-display text-2xl font-medium text-paper sm:text-3xl">
                {badgeStat.value}
                <span className="text-gold">{badgeStat.suffix}</span>
              </p>
              <p className="label mt-1 max-w-[8rem] text-paper/60">{badgeStat.label}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -bottom-8 -left-4 hidden w-[46%] bg-paper p-3 shadow-soft-lg sm:block lg:-bottom-10 lg:-left-8"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?auto=format&fit=crop&w=900&q=80"
                alt="Serene bedroom furnished by Luxury Enterprises"
                fill
                className="object-cover"
                sizes="30vw"
              />
              <CornerMarks tone="paper" inset={8} size={16} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
