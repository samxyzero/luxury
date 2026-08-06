"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import type { SiteSettings } from "@/types/content";

interface HeroProps {
  hero: SiteSettings["hero"];
  businessName: string;
  whatsapp: string;
  mapsUrl: string;
}

const SIDE_IMAGE = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80";
const ACCENT_IMAGE = "https://images.unsplash.com/photo-1628428989131-5a838e23caac?auto=format&fit=crop&w=700&q=80";

const wordmarkClass =
  "block font-display font-medium uppercase text-gold leading-[0.84] tracking-tight text-[clamp(3.25rem,9.5vw,8.25rem)]";

function splitWordmark(businessName: string) {
  const [first, ...rest] = businessName.split(" ");
  const second = rest.join(" ") || first;
  return { first, second };
}

export default function Hero({ hero, businessName, whatsapp, mapsUrl }: HeroProps) {
  const quoteHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Luxury Enterprises, I'd like to get a quote."
  )}`;
  const { first, second } = splitWordmark(businessName);

  const cta = (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <a
        href={quoteHref}
        target="_blank"
        rel="noopener noreferrer"
        className="label border border-ink px-6 py-3.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
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
  );

  const rating = (
    <div className="flex items-center gap-2 text-sm text-ink-muted">
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-gold" />
        ))}
      </div>
      <span>5.0 &middot; Google Reviews</span>
    </div>
  );

  const tagline = (
    <div>
      <span className="label text-ink-muted">{hero.eyebrow}</span>
      <p className="mt-4 max-w-[15rem] text-sm leading-relaxed tracking-wide text-ink-muted uppercase">
        {hero.subheadline}
      </p>
    </div>
  );

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-[104px] pb-16 lg:pt-32 lg:pb-24">
      {/* Desktop editorial collage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto hidden max-w-[1500px] px-10 lg:block xl:px-16"
      >
        <h1 className={wordmarkClass + " text-center"}>{first}</h1>

        <div className="relative mt-[-2vw] grid grid-cols-12 items-center">
          <span className={wordmarkClass + " col-span-12 col-start-1 row-start-1 text-center"}>
            {second}
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 col-span-5 col-start-5 row-start-1 aspect-[4/3] shadow-soft-lg"
          >
            <Image
              src={hero.image}
              alt={`Elegant interior furnished by ${businessName}`}
              fill
              priority
              className="object-cover"
              sizes="45vw"
            />
            <CornerMarks tone="gold" inset={16} />
          </motion.div>
        </div>

        <div className="relative mt-8 grid grid-cols-12 items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="col-span-3"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={SIDE_IMAGE}
                alt="Furnished bedroom detail"
                fill
                className="object-cover"
                sizes="25vw"
              />
              <CornerMarks tone="gold" inset={10} size={16} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="col-span-4 space-y-6"
          >
            {tagline}
            {cta}
            {rating}
          </motion.div>

          <div className="col-span-3" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="col-span-2 col-start-11 w-36 justify-self-end"
          >
            <div className="relative aspect-[3/5]">
              <Image
                src={ACCENT_IMAGE}
                alt="Curtain fabric detail"
                fill
                className="object-cover"
                sizes="15vw"
              />
              <CornerMarks tone="gold" inset={8} size={14} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile / tablet stacked version */}
      <div className="px-6 sm:px-8 lg:hidden">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center font-display font-medium uppercase leading-[0.85] tracking-tight text-gold text-[clamp(3rem,15vw,5rem)]"
        >
          <span className="block">{first}</span>
          <span className="block">{second}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="relative mt-8 aspect-[4/3] w-full"
        >
          <Image
            src={hero.image}
            alt={`Elegant interior furnished by ${businessName}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <CornerMarks tone="gold" inset={14} />
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] w-full">
            <Image src={SIDE_IMAGE} alt="Furnished bedroom detail" fill className="object-cover" sizes="50vw" />
            <CornerMarks tone="gold" inset={8} size={14} />
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image src={ACCENT_IMAGE} alt="Curtain fabric detail" fill className="object-cover" sizes="50vw" />
            <CornerMarks tone="gold" inset={8} size={14} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 space-y-6"
        >
          {tagline}
          {cta}
          {rating}
        </motion.div>
      </div>
    </section>
  );
}
