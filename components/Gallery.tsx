"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CornerMarks from "@/components/CornerMarks";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import SectionLink from "@/components/SectionLink";
import type { GalleryItem } from "@/types/content";

interface GalleryProps {
  items: GalleryItem[];
  /** Rendered heading tag — pages pass "h1", homepage sections keep "h2". */
  as?: "h1" | "h2";
  /** Homepage teaser CTA linking to the full page. */
  footerLink?: { href: string; label: string };
}

export default function Gallery({ items, as: Heading = "h2", footerLink }: GalleryProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="label text-ink-muted">Gallery</span>
          </div>
          <Heading className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Projects We&apos;re Proud Of
          </Heading>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-b border-stone py-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`label relative pb-1 transition-colors duration-300 ${
                active === category ? "text-ink" : "text-ink-muted/60 hover:text-ink-muted"
              }`}
            >
              {category}
              {active === category && (
                <motion.span
                  layoutId="gallery-tab-underline"
                  className="absolute -bottom-[1px] left-0 h-px w-full bg-gold"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </button>
          ))}
        </Reveal>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => {
            const globalIndex = items.findIndex((g) => g.id === item.id);
            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => setActiveIndex(globalIndex)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="group relative mb-6 block w-full break-inside-avoid text-left"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    width={700}
                    height={i % 3 === 0 ? 900 : 560}
                    className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/25" />
                  <CornerMarks
                    tone="paper"
                    inset={12}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-ink">{item.caption}</span>
                  <span className="label shrink-0 text-ink-muted">{item.category}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {footerLink && (
          <div className="mt-14">
            <SectionLink href={footerLink.href} tone="ink">
              {footerLink.label}
            </SectionLink>
          </div>
        )}
      </div>

      <GalleryLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
