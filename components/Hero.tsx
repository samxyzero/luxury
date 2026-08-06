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

const ACCENT_IMAGE =
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80";

const ease = [0.4, 0, 0.2, 1] as const;

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

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-[104px] pb-16 lg:pt-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-12 lg:items-stretch lg:gap-x-10 xl:gap-x-16">
        {/* Text column */}
        <div className="order-2 flex flex-col justify-center gap-8 px-6 py-12 sm:px-8 lg:order-1 lg:col-span-5 lg:px-0 lg:py-0 lg:pl-12 xl:pl-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="label text-ink-muted"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-display font-medium uppercase leading-[0.92] tracking-tight text-gold text-[clamp(2.75rem,5.6vw,4.75rem)]"
          >
            <span className="block">{first}</span>
            <span className="block">{second}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="max-w-md text-base leading-relaxed text-ink-muted"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex flex-wrap items-center gap-x-7 gap-y-4"
          >
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
          </motion.div>
        </div>

        {/* Image column */}
        <div className="relative order-1 px-6 sm:px-8 lg:order-2 lg:col-span-7 lg:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative h-[56vh] w-full shadow-soft-lg sm:h-[64vh] lg:h-full lg:min-h-[calc(100vh-112px)]"
          >
            <Image
              src={hero.image}
              alt={`Elegant interior furnished by ${businessName}`}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <CornerMarks tone="paper" inset={20} />
          </motion.div>

          {/* Peeking accent image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="absolute -top-8 right-14 hidden aspect-[4/5] w-32 shadow-soft-lg lg:block xl:right-20 xl:w-40"
          >
            <Image
              src={ACCENT_IMAGE}
              alt="Furnished interior detail"
              fill
              className="object-cover"
              sizes="15vw"
            />
            <CornerMarks tone="gold" inset={8} size={16} />
          </motion.div>

          {/* Credential card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="relative z-10 mt-6 flex w-full flex-col gap-4 bg-navy px-8 py-7 text-paper sm:absolute sm:bottom-0 sm:left-6 sm:mt-0 sm:w-72 lg:left-0 lg:w-80"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                ))}
              </div>
              <span className="text-sm text-paper/70">5.0 &middot; Google Reviews</span>
            </div>
            <div className="h-px w-10 bg-gold" />
            <p className="label text-gold">Trusted by Homes &amp; Hotels</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
