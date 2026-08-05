"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import type { GalleryItem } from "@/types/content";

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2 text-navy-600 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span className="h-px w-8 bg-gold-500" />
            Gallery
            <span className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy-950">
            Projects We&apos;re Proud Of
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === category
                  ? "bg-gradient-to-r from-navy-700 to-navy-600 text-white shadow-[0_8px_20px_-6px_rgba(35,43,100,0.5)]"
                  : "border border-navy-900/12 text-navy-700 hover:bg-navy-950/5"
              }`}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {filtered.map((item, i) => {
            const globalIndex = items.findIndex((g) => g.id === item.id);
            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => setActiveIndex(globalIndex)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl break-inside-avoid"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  width={700}
                  height={i % 3 === 0 ? 900 : 560}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300">
                    <Expand className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                  <span className="mt-1 text-left font-display text-base text-white">
                    {item.caption}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
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
